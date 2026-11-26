import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { after, afterEach, before, beforeEach, test } from "node:test";
import { chromium } from "playwright";

const url = new URL("../../docs/mockup/index.html", import.meta.url).href;
const planner = JSON.parse(
  readFileSync(
    new URL("../fixtures/products/weekly-planner.json", import.meta.url),
    "utf8",
  ),
);
// The prototype shows the unverified profile snapshot from 32a2e1d.
const sampleLimits = { title: 140, tags: 13 };
let browser, context, page;

const heading = (name) => page.getByRole("heading", { name, exact: true });
const button = (name) => page.getByRole("button", { name, exact: true });
const link = (name) => page.getByRole("link", { name, exact: true });

before(async () => {
  browser = await chromium.launch({
    executablePath: process.env.PFC_MOCKUP_CHROMIUM,
  });
});
after(async () => browser?.close());
beforeEach(async () => {
  context = await browser.newContext({ offline: true });
  page = await context.newPage();
  page.setDefaultTimeout(5000);
});
afterEach(async () => context?.close());

test("1. opens from a local file offline with no remote requests or script errors", async () => {
  const remote = [];
  const errors = [];
  page.on("request", (request) => {
    if (/^https?:/i.test(request.url())) remote.push(request.url());
  });
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(url);
  for (const name of ["Workflow", "Review", "Make"]) await link(name).click();
  await heading("What are we making?").waitFor();
  assert.deepEqual(remote, []);
  assert.deepEqual(errors, []);
});

test("2. Make offers one idea box, five chip groups, research, recents and suggestions", async () => {
  await page.goto(url);
  const idea = page.getByRole("textbox", { name: "What are we making?" });
  assert.equal(await page.getByRole("textbox").count(), 1);
  for (const name of [
    "Product type",
    "Audience",
    "Size",
    "Style",
    "Marketplace",
  ]) {
    const group = page.getByRole("group", { name, exact: true });
    const chip = group.getByRole("radio").first();
    await chip.check();
    assert.equal(await chip.isChecked(), true, name);
  }
  const research = page.getByRole("checkbox", { name: "Research first" });
  await research.check();
  assert.equal(await research.isChecked(), true);
  await heading("Recent products").waitFor();
  await page.getByText("Suggestions 1", { exact: true }).waitFor();
  await idea.fill("Daily desk planner");
  await button("Make").click();
  await heading("Workflow").waitFor();
  await page.getByText("Daily desk planner", { exact: true }).waitFor();
});

test("3. all eight Workflow steps have working controls", async () => {
  await page.goto(url);
  await link("Workflow").click();
  await heading("Workflow").waitFor();
  const groups = page.getByRole("group");
  assert.equal(await groups.count(), 8);
  for (const name of [
    "Research",
    "Spec",
    "Prompt",
    "Generate",
    "Check",
    "Package",
    "Listing",
    "Review",
  ]) {
    const group = page.getByRole("group", { name, exact: true });
    const enabled = group.getByRole("checkbox", { name: "On" });
    const pane = group.getByRole("combobox", { name: "Pane" });
    const version = group.getByRole("combobox", { name: "Prompt version" });
    const mode = group.getByRole("combobox", { name: "Mode" });
    await enabled.uncheck();
    assert.equal(await enabled.isChecked(), false);
    await pane.selectOption({ label: "ChatGPT" });
    await version.selectOption({ label: "v2" });
    await mode.selectOption({ label: "Run automatically" });
    assert.deepEqual(await mode.getByRole("option").allTextContents(), [
      "Ask me",
      "Run automatically",
    ]);
    assert.deepEqual(
      await Promise.all([
        pane.inputValue(),
        version.inputValue(),
        mode.inputValue(),
      ]),
      ["ChatGPT", "v2", "Run automatically"],
    );
  }
});

test("4. Review uses the fixture, compares variants and blocks approval for unchecked files", async () => {
  await page.goto(url);
  await link("Review").click();
  const title = page.getByRole("textbox", { name: "Title", exact: true });
  const description = page.getByRole("textbox", {
    name: "Description",
    exact: true,
  });
  const tags = page.getByRole("textbox", { name: "Tags", exact: true });
  assert.equal(await title.inputValue(), planner.title);
  assert.equal(await description.inputValue(), planner.description);
  assert.deepEqual((await tags.inputValue()).split("\n"), planner.tags);
  await page.getByText("£3.49", { exact: true }).waitFor();
  await page.getByRole("figure", { name: "Weekly planner preview" }).waitFor();
  await page
    .getByText(`${planner.tags.length} / ${sampleLimits.tags} tags`, {
      exact: true,
    })
    .waitFor();
  await page.getByText("Etsy profile unverified", { exact: true }).waitFor();
  assert.equal(await button("Approve").isDisabled(), true);
  assert.match(
    await page.getByRole("status", { name: "Review status" }).innerText(),
    /NOT RUN/,
  );
  await button("Compare titles").click();
  await page.getByText(planner.title, { exact: true }).waitFor();
  await page
    .getByText(planner.variants.overLimit.title, { exact: true })
    .waitFor();
  await button("Use alternate title").click();
  assert.equal(await title.inputValue(), planner.variants.overLimit.title);
  await page
    .getByText(
      `${planner.variants.overLimit.title.length} / ${sampleLimits.title} characters`,
      { exact: true },
    )
    .waitFor();
  await page.getByText(/Title exceeds the profile limit/).waitFor();
  await tags.fill(planner.variants.duplicateTag.tags.join("\n"));
  await page.getByText(/Duplicate tag: weekly planner/).waitFor();
  await button("Send back").click();
  await button("Revise listing").click();
  assert.match(
    await page.getByRole("status", { name: "Review status" }).innerText(),
    /Sent back: revise listing/i,
  );
  await button("Hold").click();
  assert.match(
    await page.getByRole("status", { name: "Review status" }).innerText(),
    /On hold/,
  );
  assert.equal(await button("Approve").isDisabled(), true);
});

test("5. keyboard opens all screens and activates Review actions with visible focus", async () => {
  await page.goto(url);
  await page.keyboard.press("Tab");
  assert.equal(
    await link("Make").evaluate(
      (element) => element === document.activeElement,
    ),
    true,
  );
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await heading("Workflow").waitFor();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await heading("Review").waitFor();
  assert.match(
    await page.getByRole("status", { name: "Review status" }).innerText(),
    /NOT RUN/,
  );
  const hold = button("Hold");
  for (let tab = 0; tab < 12; tab++) {
    if (await hold.evaluate((element) => element === document.activeElement))
      break;
    await page.keyboard.press("Tab");
  }
  assert.equal(
    await hold.evaluate((element) => element === document.activeElement),
    true,
  );
  assert.equal(
    await hold.evaluate((element) => getComputedStyle(element).outlineStyle),
    "solid",
  );
  await page.keyboard.press("Enter");
  assert.match(
    await page.getByRole("status", { name: "Review status" }).innerText(),
    /On hold/,
  );
});
