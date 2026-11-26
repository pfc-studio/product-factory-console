import {
  appendFileSync,
  copyFileSync,
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, beforeEach, expect, test } from "vitest";
import { findHardCodedLimits } from "./hard-coded-limits.js";

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

  expect(findHardCodedLimits(join(root, "src"), values)).toEqual([]);
});

test("reports literal marketplace limits in source HTML with their file and line", () => {
  const sourceDirectory = join(configDirectory, "src");
  const shellDirectory = join(sourceDirectory, "shell");
  mkdirSync(shellDirectory, { recursive: true });
  const probe = join(shellDirectory, "pfc-limit-probe.html");
  const limitLine = '<input name="listing-title" maxlength="140" />';
  writeFileSync(
    probe,
    [
      limitLine,
      '<input maxlength="1400" />',
      '<span data-size="140.5">item140</span>',
      `  ${limitLine}`,
      "",
    ].join("\r\n"),
  );

  expect(findHardCodedLimits(sourceDirectory, new Set([140]))).toEqual([
    `${probe}:1: ${limitLine}`,
    `${probe}:4: ${limitLine}`,
  ]);
});

test.each([
  "Number(140n)",
  "140n",
  "Number(0x8cn)",
  "Number(0o214n)",
  "Number(0b10001100n)",
  "Number(1_4_0n)",
  "Number(140n.toString())",
  "140",
  "0x8c",
  'Number("140")',
  'parseInt("140", 10)',
])(
  "reports a planted limit written as %s with its file and line",
  (expression) => {
    const sourceDirectory = join(configDirectory, "src");
    mkdirSync(sourceDirectory);
    const probe = join(sourceDirectory, "pfc-limit-probe.ts");
    const limitLine = `export const titleMaxChars = ${expression};`;
    writeFileSync(
      probe,
      `export const scale140n = Number(1_400n) * 0.20;\n${limitLine}\n`,
    );

    expect(findHardCodedLimits(sourceDirectory, new Set([140]))).toEqual([
      `${probe}:2: ${limitLine}`,
    ]);
  },
);

test.each([
  "0x8c.valueOf()",
  "140..valueOf()",
  "0x8c.valueOf() + 0",
  "Number(140n)",
  "70 * 2",
  "1.4e2",
  "0b10001100",
  "0o214",
  "1_40",
  "+'140'",
  "parseInt('140')",
  "parseFloat('140')",
  "Number('14' + '0')",
  "Number('140'.valueOf())",
  "Number('140'['value' + 'Of']())",
  "(Number)('140')",
  "Number['parseInt']('8c', 16)",
  "Number((320).toString(16))",
  "BigInt('0x8c')",
  "Number(0x46n * 2n)",
  "parseInt((70 * 2).toString(16), 16)",
  "-(-70 * 2)",
  "(7 << 2) * 5",
])(
  "reports folded marketplace limit %s in TypeScript and JavaScript",
  (expression) => {
    const sourceDirectory = join(configDirectory, "src");
    mkdirSync(sourceDirectory);
    const limitLine = `export const titleMaxChars = ${expression};`;
    const probes = ["probe.ts", "probe.mjs"].map((name) => {
      const file = join(sourceDirectory, name);
      writeFileSync(file, `// limit probe\n${limitLine}\n`);
      return `${file}:2: ${limitLine}`;
    });

    expect(findHardCodedLimits(sourceDirectory, new Set([140])).sort()).toEqual(
      probes.sort(),
    );
  },
);

test.each([
  "70 * 3",
  "Number('1_40')",
  "parseInt('140', 8)",
  "parseFloat('140.5')",
  "parseInt((64 * 2).toString(16), 10)",
  "'140'",
  "'140'.valueOf()",
  "'140'.toString()",
  "runtimeValue('140')",
  "70 * runtimeValue()",
  "Number(70n * 2)",
  "BigInt('140.5')",
  "Number(70n / 0n)",
  "Number(70n ** -2n)",
  "(1).toString(1400)",
  "Number('141') /* 140 */",
])("leaves non-matching source clear for %s", (expression) => {
  const sourceDirectory = join(configDirectory, "src");
  mkdirSync(sourceDirectory);
  writeFileSync(
    join(sourceDirectory, "probe.mjs"),
    `export const unrelated = ${expression};\n`,
  );

  expect(findHardCodedLimits(sourceDirectory, new Set([140]))).toEqual([]);
});

test("reports the folded limit on the correct line after a Unicode line break", () => {
  const sourceDirectory = join(configDirectory, "src");
  mkdirSync(sourceDirectory);
  const probe = join(sourceDirectory, "probe.mjs");
  const limitLine = "export const titleMaxChars = 70 * 2;";
  writeFileSync(probe, `// limit probe\u2028${limitLine}`);

  expect(findHardCodedLimits(sourceDirectory, new Set([140]))).toEqual([
    `${probe}:2: ${limitLine}`,
  ]);
});
