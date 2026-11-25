import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test, vi } from "vitest";

const electron = vi.hoisted(() => ({
  BrowserWindow: vi.fn(function () {
    return { loadFile: vi.fn().mockResolvedValue(undefined) };
  }),
}));

vi.mock("electron", () => electron);

test("the main window opens a local blank shell with sandboxed preferences", async () => {
  const modulePath = "../../src/main/window";
  expect(existsSync(join(__dirname, modulePath + ".ts"))).toBe(true);

  const { openWindow } = await import("../../src/main/window.js");
  const window = await openWindow();

  expect(electron.BrowserWindow).toHaveBeenCalledWith({
    title: "Product Factory Console",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
  });
  const [shellPath] = vi.mocked(window.loadFile).mock.calls[0];
  const shell = readFileSync(shellPath, "utf8");
  expect(shell).toContain("default-src 'none'");
  expect(shell).toContain("<title>Product Factory Console</title>");
  expect(shell).toMatch(/<body>\s*<\/body>/u);
});
