import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "vitest";
import { parse } from "yaml";

test("CI runs the quality check on both standard runners for PRs and main pushes", () => {
  const workflowPath = resolve(__dirname, "../../.github/workflows/ci.yml");
  expect(existsSync(workflowPath), "CI workflow is missing").toBe(true);

  const source = readFileSync(workflowPath, "utf8");
  const workflow: unknown = parse(source);
  expect(workflow).toHaveProperty("on", {
    pull_request: null,
    push: { branches: ["main"] },
  });
  expect(workflow).toHaveProperty("permissions", { contents: "read" });
  expect(workflow).toHaveProperty(["jobs", "check", "strategy"], {
    "fail-fast": false,
    matrix: { os: ["windows-latest", "ubuntu-latest"] },
  });
  expect(workflow).toHaveProperty(
    ["jobs", "check", "runs-on"],
    "${{ matrix.os }}",
  );
  expect(workflow).toHaveProperty(
    ["jobs", "check", "steps"],
    [
      {
        uses: expect.stringMatching(/^actions\/checkout@[0-9a-f]{40}$/u),
        with: {
          ref: "${{ github.event.pull_request.head.sha || github.sha }}",
          "persist-credentials": false,
        },
        env: {
          GIT_CONFIG_COUNT: "1",
          GIT_CONFIG_KEY_0: "core.autocrlf",
          GIT_CONFIG_VALUE_0: "false",
        },
      },
      {
        uses: expect.stringMatching(/^actions\/setup-node@[0-9a-f]{40}$/u),
        with: {
          "node-version-file": ".nvmrc",
          "package-manager-cache": false,
        },
      },
      { name: "Report tested revision", run: "git rev-parse HEAD" },
      { name: "Report Node version", run: "node --version" },
      { run: "npm ci" },
      { run: "npm run check" },
    ],
  );
  expect(source).not.toMatch(/\bsecrets\s*(?:\.|\[)/iu);
});
