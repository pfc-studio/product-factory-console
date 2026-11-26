import { spawnSync } from "node:child_process";
import {
  mkdtempSync,
  mkdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, expect, test } from "vitest";

const config = fileURLToPath(
  new URL("../../vitest.golden.config.mjs", import.meta.url),
);
const vitest = fileURLToPath(
  new URL("./vitest.mjs", import.meta.resolve("vitest/package.json")),
);
const modules = fileURLToPath(new URL("../../node_modules", import.meta.url));
let root;

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), "pfc-golden-"));
  mkdirSync(join(root, "tests", "golden"), { recursive: true });
  symlinkSync(modules, join(root, "node_modules"), "junction");
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

function writeCase(path, source) {
  const file = join(root, "tests", path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, source);
}

function runGolden() {
  const run = spawnSync(
    process.execPath,
    [vitest, "run", "--config", config, "--root", root],
    {
      encoding: "utf8",
      timeout: 15_000,
    },
  );
  if (run.error) throw run.error;
  return { status: run.status, output: run.stdout + run.stderr };
}

test("reports zero golden cases and ignores tests outside the golden folder", () => {
  writeCase(
    "unit/outside.test.mjs",
    'throw new Error("Non-golden test was run")',
  );
  const { status, output } = runGolden();

  expect(output).toContain("0 cases");
  expect(output).not.toContain("Non-golden test was run");
  expect(status).toBe(0);
}, 20_000);

test("runs a nested golden case and returns its assertion failure", () => {
  writeCase(
    "golden/title/probe.test.mjs",
    `
    import { expect, test } from "vitest";
    test("fictional golden mismatch", () => expect("Birch").toBe("Elm"));
  `,
  );
  const { status, output } = runGolden();

  expect(output).toContain("fictional golden mismatch");
  expect(output).not.toContain("0 cases");
  expect(status).toBe(1);
}, 20_000);
