import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseDocument } from "yaml";
import { z } from "zod";
import {
  checksSchema,
  marketplacesSchema,
  policySchema,
} from "./config-schemas.js";

const millisecondsPerDay = 24 * 60 * 60 * 1000;

function readYaml(directory: string, file: string): unknown {
  let contents: string;
  try {
    contents = readFileSync(join(directory, file), "utf8");
  } catch {
    throw new Error(`${file} (document): could not read the file`);
  }

  const document = parseDocument(contents, { prettyErrors: false });
  const issue = document.errors[0] ?? document.warnings[0];
  if (issue) {
    throw new Error(`${file} (document): invalid YAML (${issue.code})`);
  }
  try {
    return document.toJS();
  } catch {
    throw new Error(`${file} (document): could not resolve YAML values`);
  }
}

function readValidated<Output>(
  directory: string,
  file: string,
  schema: z.ZodType<Output>,
): Output {
  const result = schema.safeParse(readYaml(directory, file));
  if (result.success) return result.data;

  const errors = result.error.issues.map((issue) => {
    const field = issue.path.join(".") || "document";
    return `${file} (${field}): ${issue.message}`;
  });
  throw new Error(errors.join("\n"));
}

export function loadConfig(directory: string, now = new Date()) {
  const { etsy } = readValidated(
    directory,
    "marketplaces.yaml",
    marketplacesSchema,
  );
  const today = Date.parse(now.toISOString().slice(0, 10));
  const daysSinceCheck =
    (today - Date.parse(etsy.effective_date)) / millisecondsPerDay;

  return {
    marketplaces: {
      etsy: { ...etsy, stale: daysSinceCheck > etsy.recheck_after_days },
    },
    policy: readValidated(directory, "policy.yaml", policySchema),
    checks: readValidated(directory, "checks.yaml", checksSchema),
  };
}
