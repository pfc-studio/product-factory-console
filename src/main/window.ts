import { join } from "node:path";
import { BrowserWindow } from "electron";

export async function openWindow(): Promise<BrowserWindow> {
  const window = new BrowserWindow({
    title: "Product Factory Console",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
  });

  await window.loadFile(join(__dirname, "../shell/index.html"));
  return window;
}
