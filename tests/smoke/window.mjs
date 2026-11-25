import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { app } from "electron";

const title = "Product Factory Console";
const shellUrl = new URL("../../dist/shell/index.html", import.meta.url).href;
const deadline = setTimeout(
  () => fail(new Error("Window smoke test timed out.")),
  30_000,
);
let verified = false;

function fail(error) {
  clearTimeout(deadline);
  console.error("Electron window smoke test failed.", error);
  app.exit(1);
}

async function capturePresentedFrame(contents) {
  // The page load event can precede the compositor's first frame.
  try {
    return await new Promise((resolve) => {
      // End the subscription after Electron's native callback has returned.
      contents.beginFrameSubscription(false, (image) =>
        setImmediate(resolve, image),
      );
      contents.invalidate();
    });
  } finally {
    contents.endFrameSubscription();
  }
}

async function verifyWindow(window) {
  const contents = window.webContents;

  assert.ok(window.isVisible(), "Expected a visible window");
  assert.equal(window.getTitle(), title);
  assert.equal(contents.getURL(), shellUrl);
  assert.equal(
    await contents.executeJavaScript("document.body.innerHTML.trim()"),
    "",
  );

  const preferences = contents.getLastWebPreferences();
  assert.equal(preferences.contextIsolation, true);
  assert.equal(preferences.nodeIntegration, false);
  assert.equal(preferences.sandbox, true);
  assert.equal(preferences.webSecurity, true);
  assert.equal(app.commandLine.hasSwitch("no-sandbox"), false);

  if (process.platform === "win32") {
    const rendererPid = contents.getOSProcessId();
    const renderer = app.getAppMetrics().find(({ pid }) => pid === rendererPid);
    assert.equal(
      renderer?.sandboxed,
      true,
      "Expected a sandboxed renderer process",
    );
  }

  const screenshotPath = process.env.PFC_SMOKE_SCREENSHOT;
  if (screenshotPath) {
    const screenshot = await capturePresentedFrame(contents);
    assert.ok(!screenshot.isEmpty(), "Expected a window screenshot");
    await writeFile(screenshotPath, screenshot.toPNG());
  }

  window.once("closed", () => {
    verified = true;
    clearTimeout(deadline);
    console.log(
      `Visible, blank sandboxed window titled "${title}" opened and closed.`,
    );
    setImmediate(() => app.quit());
  });
  window.close();
}

app.on("before-quit", (event) => {
  if (verified) return;
  event.preventDefault();
  fail(new Error("The app quit before the window could be verified."));
});

app.once("browser-window-created", (_event, window) => {
  window.webContents.once("did-finish-load", () => {
    void verifyWindow(window).catch(fail);
  });
});

// Load the same package entry point as `electron .`.
try {
  createRequire(import.meta.url)("../..");
} catch (error) {
  fail(error);
}
