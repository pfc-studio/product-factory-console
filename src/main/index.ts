import { app, BrowserWindow } from "electron";
import { openWindow } from "./window.js";

function launchWindow(): void {
  void openWindow().catch((error: unknown) => {
    console.error("Could not open Product Factory Console.", error);
    app.exit(1);
  });
}

void app.whenReady().then(() => {
  launchWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) launchWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
