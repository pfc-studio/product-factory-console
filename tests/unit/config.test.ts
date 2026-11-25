import {
  appendFileSync,
  copyFileSync,
  cpSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, beforeEach, expect, test } from "vitest";

const root = resolve(__dirname, "../..");
const committed = join(root, "config");
const fixtures = join(root, "tests/fixtures/config");
let configDirectory: string;

beforeEach(() => {
  configDirectory = mkdtempSync(join(tmpdir(), "pfc-config-"));
  cpSync(committed, configDirectory, { recursive: true });
});

afterEach(() => {
  rmSync(configDirectory, { recursive: true, force: true });
});

async function loader() {
  return (await import("../../src/engine/config.js")).loadConfig;
}

test("loads and validates the three committed YAML files", async () => {
  const loadConfig = await loader();
  const config = loadConfig(committed);

  expect(config.marketplaces.etsy.display_name).toBe("Etsy");
  expect(config.policy.version).toEqual(expect.any(Number));
  expect(config.checks.mandatory).toContainEqual(
    expect.objectContaining({ id: "marketplace_limits" }),
  );
});

test.each([
  ["missing-field.yaml", /checks\.yaml.*mandatory\.0\.description/],
  ["wrong-type.yaml", /checks\.yaml.*mandatory\.0\.phase/],
  ["invalid-date.yaml", /checks\.yaml.*effective_date/],
  ["invalid-yaml.yaml", /checks\.yaml.*document/],
])("rejects %s and names the file and field", async (fixture, error) => {
  const loadConfig = await loader();
  copyFileSync(join(fixtures, fixture), join(configDirectory, "checks.yaml"));

  expect(() => loadConfig(configDirectory)).toThrow(error);
});

test("rejects an unknown marketplace key and names the file and key", async () => {
  const loadConfig = await loader();
  copyFileSync(
    join(fixtures, "marketplaces.yaml"),
    join(configDirectory, "marketplaces.yaml"),
  );
  appendFileSync(
    join(configDirectory, "marketplaces.yaml"),
    readFileSync(join(fixtures, "unknown-marketplace.yaml")),
  );

  expect(() => loadConfig(configDirectory)).toThrow(
    /marketplaces\.yaml.*fictional_market/,
  );
});

test("names a missing config file in the read error", async () => {
  const loadConfig = await loader();
  rmSync(join(configDirectory, "policy.yaml"));

  expect(() => loadConfig(configDirectory)).toThrow(/policy\.yaml.*document/);
});

test.each([
  ["2026-10-11T23:59:59Z", false],
  ["2026-10-12T00:00:00Z", true],
])("reports staleness at %s using UTC dates", async (clock, stale) => {
  const loadConfig = await loader();
  copyFileSync(
    join(fixtures, "marketplaces.yaml"),
    join(configDirectory, "marketplaces.yaml"),
  );

  expect(
    loadConfig(configDirectory, new Date(clock)).marketplaces.etsy.stale,
  ).toBe(stale);
});

test("preserves unverified values, nulls and the disclosure rule marker", async () => {
  const loadConfig = await loader();
  copyFileSync(
    join(fixtures, "marketplaces.yaml"),
    join(configDirectory, "marketplaces.yaml"),
  );

  const { etsy } = loadConfig(configDirectory).marketplaces;
  expect(etsy.status).toBe("unverified");
  expect(etsy.limits.title_max_chars).toEqual({
    value: 321,
    verified: false,
    source: null,
    accessed: null,
  });
  expect(etsy.limits.description_max_chars.value).toBeNull();
  expect(etsy.eligibility.ai_disclosure_required).toMatchObject({
    value: "check_current_rules",
    verified: false,
  });
});

test("requires provenance for a field marked verified", async () => {
  const loadConfig = await loader();
  const marketplace = readFileSync(join(fixtures, "marketplaces.yaml"), "utf8");
  writeFileSync(
    join(configDirectory, "marketplaces.yaml"),
    marketplace.replace(
      "value: 321, verified: false",
      "value: 321, verified: true",
    ),
  );

  expect(() => loadConfig(configDirectory)).toThrow(
    /marketplaces\.yaml.*etsy\.limits\.title_max_chars\.source/,
  );
});

test("rejects a disclosure rule marker marked verified", async () => {
  const loadConfig = await loader();
  const marketplace = readFileSync(join(fixtures, "marketplaces.yaml"), "utf8");
  writeFileSync(
    join(configDirectory, "marketplaces.yaml"),
    marketplace.replace(
      "value: check_current_rules, verified: false, source: null, accessed: null",
      "value: check_current_rules, verified: true, source: https://example.invalid, accessed: 2026-10-01",
    ),
  );

  expect(() => loadConfig(configDirectory)).toThrow(
    /marketplaces\.yaml.*etsy\.eligibility\.ai_disclosure_required\.value/,
  );
});

test("marketplace limits are read from YAML and never hard-coded in src", async () => {
  const loadConfig = await loader();
  const { etsy } = loadConfig(committed).marketplaces;
  const values = new Set([
    etsy.recheck_after_days,
    ...Object.values(etsy.limits).map(({ value }) => value),
    etsy.files.max_file_mb.value,
    etsy.files.max_files_per_listing.value,
  ]);
  const numericLiteral =
    /(?<![\w.])(?:0[xob][\da-f_]+|(?:\d[\d_]*(?:\.[\d_]*)?|\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?)(?![\w.])/giu;
  const matches = readdirSync(join(root, "src"), {
    recursive: true,
    withFileTypes: true,
  })
    .filter((entry) => entry.isFile())
    .flatMap((entry) => {
      const file = join(entry.parentPath, entry.name);
      return readFileSync(file, "utf8")
        .split("\n")
        .flatMap((line, index) => {
          const literals = line.match(numericLiteral) ?? [];
          const hasLimit = literals.some((literal) =>
            values.has(Number(literal.replaceAll("_", ""))),
          );
          return hasLimit ? [`${file}:${index + 1}: ${line.trim()}`] : [];
        });
    });

  expect(matches).toEqual([]);
});
