import { copyFile, mkdir } from "node:fs/promises";

const destination = new URL("../dist/shell/", import.meta.url);
await mkdir(destination, { recursive: true });
await copyFile(
  new URL("../src/shell/index.html", import.meta.url),
  new URL("index.html", destination),
);
