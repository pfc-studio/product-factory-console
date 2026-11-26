import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";
import { loadConfig } from "../../src/engine/config.js";

const fixtures = new URL("../fixtures/", import.meta.url);

function readFixture(path) {
  return readFileSync(new URL(path, fixtures), "utf8");
}

test("weekly planner has 13 unique tags and isolated over-limit and duplicate-tag variants", () => {
  const { title, description, tags, priceMinor, currency, variants } =
    JSON.parse(readFixture("products/weekly-planner.json"));
  const configDirectory = fileURLToPath(
    new URL("../../config/", import.meta.url),
  );
  const { title_max_chars } =
    loadConfig(configDirectory).marketplaces.etsy.limits;

  expect(title.trim()).not.toBe("");
  expect(title.length).toBeLessThanOrEqual(title_max_chars.value);
  expect(description.trim()).not.toBe("");
  expect(tags).toHaveLength(13);
  expect(tags.every((tag) => typeof tag === "string" && tag.trim())).toBe(true);
  expect(new Set(tags).size).toBe(13);
  expect(Number.isSafeInteger(priceMinor)).toBe(true);
  expect(priceMinor).toBeGreaterThan(0);
  expect(currency).toBe("GBP");

  expect(Object.keys(variants.overLimit)).toEqual(["title"]);
  expect(variants.overLimit.title.length).toBeGreaterThan(
    title_max_chars.value,
  );
  expect(Object.keys(variants.duplicateTag)).toEqual(["tags"]);
  expect(variants.duplicateTag.tags).toHaveLength(13);
  expect(new Set(variants.duplicateTag.tags).size).toBe(12);
  expect(variants.duplicateTag.tags.every((tag) => tags.includes(tag))).toBe(
    true,
  );
});

test("hostile files contain each of the six requested input categories", () => {
  expect(readFixture("hostile/prompt-injection.txt")).toMatch(
    /ignore .* directions .*FICTIONAL_FIXTURE_MARKER/i,
  );
  expect(readFixture("hostile/oversized.txt").length).toBeGreaterThan(4096);

  const oddUnicode = readFixture("hostile/mixed-scripts.txt");
  expect(oddUnicode).toMatch(/\p{Script=Latin}/u);
  expect(oddUnicode).toMatch(/\p{Script=Cyrillic}/u);
  expect(oddUnicode).toContain("\u200B");
  expect(oddUnicode).toContain("\u200D");

  const names = JSON.parse(readFixture("hostile/path-traversal-names.json"));
  expect(names).toEqual(
    expect.arrayContaining([
      expect.stringMatching(/^\.\.\/[^/]+$/),
      expect.stringMatching(/^\.\.\\[^\\]+$/),
    ]),
  );

  const markup = readFixture("hostile/html-and-script.txt");
  expect(markup).toMatch(/<p>[^<]+<\/p>/);
  expect(markup).toMatch(/<script>[\s\S]*<\/script>/);

  const [header, record] = readFixture("hostile/malformed.csv")
    .trimEnd()
    .split(/\r?\n/);
  expect(header.split(",")).toHaveLength(2);
  expect(record.split(",")).toHaveLength(3);
});

test("each fixture folder has a README identifying its data as fictional", () => {
  const folders = readdirSync(fixtures, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  for (const folder of [".", ...folders]) {
    expect(readFixture(folder + "/README.md")).toMatch(/\bfictional\b/i);
  }
});
