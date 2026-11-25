import { EventEmitter } from "node:events";
import { writeFile } from "node:fs/promises";
import { app } from "electron";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

vi.mock("node:fs/promises", () => ({ writeFile: vi.fn() }));
vi.mock("node:module", () => ({ createRequire: () => () => {} }));
vi.mock("electron", async () => {
  const { EventEmitter } = await import("node:events");
  return {
    app: Object.assign(new EventEmitter(), {
      commandLine: { hasSwitch: () => false },
      exit: vi.fn(),
      quit: vi.fn(),
    }),
  };
});

const screenshotPath = "pfc-smoke-window.png";

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  vi.useFakeTimers();
  vi.stubEnv("PFC_SMOKE_SCREENSHOT", screenshotPath);
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  app.removeAllListeners();
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

async function startSmoke() {
  const contents = Object.assign(new EventEmitter(), {
    getURL: () => new URL("../../dist/shell/index.html", import.meta.url).href,
    executeJavaScript: vi.fn().mockResolvedValue(""),
    getLastWebPreferences: () => ({
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    }),
    getOSProcessId: () => 123,
    capturePage: vi.fn().mockRejectedValue(new Error("UnknownVizError")),
    beginFrameSubscription: vi.fn(),
    endFrameSubscription: vi.fn(),
    invalidate: vi.fn(),
  });
  const window = Object.assign(new EventEmitter(), {
    webContents: contents,
    isVisible: () => true,
    getTitle: () => "Product Factory Console",
    close: vi.fn(() => window.emit("closed")),
  });
  app.getAppMetrics = () => [{ pid: 123, sandboxed: true }];

  await import("../smoke/window.mjs");
  app.emit("browser-window-created", {}, window);
  contents.emit("did-finish-load");
  await vi.waitFor(() =>
    expect(contents.beginFrameSubscription).toHaveBeenCalled(),
  );
  return {
    window,
    contents,
    present: contents.beginFrameSubscription.mock.calls[0][1],
  };
}

test("captures a full presented frame before closing the verified window", async () => {
  const { window, contents, present } = await startSmoke();
  expect(contents.beginFrameSubscription).toHaveBeenCalledExactlyOnceWith(
    false,
    expect.any(Function),
  );
  expect(contents.invalidate).toHaveBeenCalledOnce();
  expect(contents.capturePage).not.toHaveBeenCalled();
  expect(writeFile).not.toHaveBeenCalled();
  expect(window.close).not.toHaveBeenCalled();

  const png = Buffer.from("fixture screenshot");
  present({ isEmpty: () => false, toPNG: () => png });
  await Promise.resolve();
  expect(contents.endFrameSubscription).not.toHaveBeenCalled();

  await vi.waitFor(() => expect(window.close).toHaveBeenCalledOnce());
  expect(contents.endFrameSubscription).toHaveBeenCalledOnce();
  expect(writeFile).toHaveBeenCalledExactlyOnceWith(screenshotPath, png);
  expect(writeFile).toHaveBeenCalledBefore(window.close);
  expect(app.exit).not.toHaveBeenCalled();
});

test("fails the smoke if the presented frame is empty", async () => {
  const { window, contents, present } = await startSmoke();
  present({ isEmpty: () => true });

  await vi.waitFor(() => expect(app.exit).toHaveBeenCalledExactlyOnceWith(1));
  expect(console.error).toHaveBeenCalledWith(
    "Electron window smoke test failed.",
    expect.objectContaining({ message: "Expected a window screenshot" }),
  );
  expect(contents.endFrameSubscription).toHaveBeenCalledOnce();
  expect(writeFile).not.toHaveBeenCalled();
  expect(window.close).not.toHaveBeenCalled();
});

test("fails the smoke if no frame arrives by the deadline", async () => {
  const { window } = await startSmoke();
  await vi.advanceTimersByTimeAsync(30_000);

  expect(app.exit).toHaveBeenCalledExactlyOnceWith(1);
  expect(console.error).toHaveBeenCalledWith(
    "Electron window smoke test failed.",
    expect.objectContaining({ message: "Window smoke test timed out." }),
  );
  expect(writeFile).not.toHaveBeenCalled();
  expect(window.close).not.toHaveBeenCalled();
});
