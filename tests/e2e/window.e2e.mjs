import { _electron as electron } from "playwright";
import { expect, test } from "playwright/test";

test("launches Product Factory Console", async () => {
  const app = await electron.launch({ args: ["."], chromiumSandbox: true });
  try {
    const window = await app.firstWindow();
    await expect(window).toHaveURL(
      new URL("../../dist/shell/index.html", import.meta.url).href,
    );
    await expect(window).toHaveTitle("Product Factory Console");
  } finally {
    await app.close();
  }
});
