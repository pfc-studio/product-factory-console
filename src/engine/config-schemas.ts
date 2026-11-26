import { z } from "zod";

const date = z.iso.date();
const text = z.string().min(1);
const names = z.array(text);
const count = z.int().nonnegative();
const positiveCount = z.int().positive();
const flag = z.boolean();

function sourced<Value>(value: z.ZodType<Value>) {
  return z
    .strictObject({
      value,
      verified: flag,
      source: text.nullable(),
      accessed: date.nullable(),
    })
    .refine(({ verified, source }) => !verified || source !== null, {
      path: ["source"],
      message: "Verified values need a source",
    })
    .refine(({ verified, accessed }) => !verified || accessed !== null, {
      path: ["accessed"],
      message: "Verified values need an access date",
    });
}

const marketplaceProfile = z.strictObject({
  display_name: text,
  currency: z.string().regex(/^[A-Z]{3}$/u),
  effective_date: date,
  recheck_after_days: positiveCount,
  verify_before_release: flag,
  status: z.enum(["unverified", "verified"]),
  limits: z.strictObject({
    title_max_chars: sourced(positiveCount),
    tags_max_count: sourced(positiveCount),
    tag_max_chars: sourced(positiveCount),
    description_max_chars: sourced(positiveCount.nullable()),
  }),
  files: z.strictObject({
    allowed_types: sourced(names),
    max_file_mb: sourced(z.number().positive().nullable()),
    max_files_per_listing: sourced(positiveCount.nullable()),
  }),
  eligibility: z.strictObject({
    ai_disclosure_required: sourced(
      z.union([flag, z.literal("check_current_rules")]),
    ).refine(({ verified, value }) => !verified || typeof value === "boolean", {
      path: ["value"],
      message: "Verified disclosure rules need a yes or no value",
    }),
    creativity_standards: sourced(text),
  }),
  disclosure_snippet: text.nullable(),
});

export const marketplacesSchema = z.strictObject({ etsy: marketplaceProfile });

export const policySchema = z.strictObject({
  version: positiveCount,
  effective_date: date,
  actions: z.strictObject({
    publish: text,
    spend_money: text,
    message_customers: text,
  }),
  untrusted_sources: names,
  untrusted_can_change_rules: flag,
  untrusted_can_trigger_actions: flag,
  checks: z.strictObject({
    unknown_counts_as: text,
    not_run_counts_as: text,
  }),
  approval: z.strictObject({
    bind_to: names,
    invalidate_on_change: flag,
  }),
  panes: z.strictObject({
    context_isolation: flag,
    node_integration: flag,
    sandbox: flag,
    web_security: flag,
    partition_per_pane: flag,
    deny_permissions_by_default: flag,
    deny_new_windows: flag,
    navigation_allowlist_required: flag,
    auto_send: flag,
  }),
  secrets: z.strictObject({ storage: text, allowed_in: names }),
  learning_loop: z.strictObject({
    may_propose: names,
    may_apply_without_owner: flag,
    may_edit: names,
    requires_golden_test: flag,
    reversible: flag,
    min_cases_for_winner: positiveCount,
  }),
  money: z.strictObject({
    storage: text,
    ai_spend_cap_gbp_per_month: count,
    dev_tools_cap_gbp: count,
  }),
  data: z.strictObject({
    real_customer_data_in_repo: flag,
    research_brief_stale_after_days: positiveCount,
    daily_backup: flag,
  }),
});

const checkSchema = z.strictObject({
  id: text,
  description: text,
  phase: count,
  tolerance_mm: z.number().nonnegative().optional(),
});

export const checksSchema = z.strictObject({
  version: positiveCount,
  effective_date: date,
  mandatory: z.array(checkSchema),
  advisory: z.array(
    checkSchema.extend({ promote_to_mandatory: flag.optional() }),
  ),
  risky_claims: names,
});
