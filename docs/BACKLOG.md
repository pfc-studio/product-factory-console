# Backlog

Every item from the plan, plus items added at setup. Build in phase order; this is a backlog, not a promise.
GPT2 owns ordering and turns items into task cards (`docs/tasks/<ID>.md`) that meet the definition of ready. Acceptance outlines below are starting points; the task card holds the binding criteria.

**Owner:** GPT1 = Builder builds, GPT2 reviews. GPT2 = Plans & Quality does it, GPT1 does not review unless asked (Ashley or an independent check signs off where noted). A = Ashley.
**Status:** Backlog · Ready (card written) · In progress · In review · Done (awaiting merge) · Done · Parked · Dropped

## Phases

| ID | Phase | Cap | Exit criteria (from plan) | Stop or rethink if | Status |
|---|---|---|---|---|---|
| PH-0 | Setup | 2–3 days | Blank app launches and checks pass | — | In progress |
| PH-1 | Records and Review grid | 3 weeks | Weekly planner listing entered, limit warnings shown, sent back, approved, survives restart | Owner would rather use a spreadsheet | Backlog |
| PH-2 | Make, prompts and panes | 4 weeks | Typed idea → built prompt → reply pasted back → shown on product with prompt version | Round trip slower than current manual process | Backlog |
| PH-3 | Workflow and preflight | 3 weeks | Verified package (A4 PDF, Letter PDF, guide) with manifest; deliberately broken file blocked | — | Backlog |
| PH-4 | Research engine | 3 weeks | Three niches have briefs; at least two changed a decision | Briefs do not change decisions (simplify to checklist) | Backlog |
| PH-5 | Learning loop | 3 weeks | One prompt change proposed, golden-tested, approved by owner, measurably reduced edits | — | Backlog |
| PH-6 | Pro features | As evidence supports | Each feature justified by evidence before it starts | — | Backlog |

## Phase 0: setup tasks

| ID | Item | Owner | Acceptance outline | Status |
|---|---|---|---|---|
| P0-01 | Scaffold: Electron + TypeScript strict, pinned Node and Electron, ESLint, Prettier, Vitest, `npm run check`, blank window | GPT1 | `npm ci` then `npm run check` pass from clean clone; app launches a blank window; versions pinned exactly; lockfile committed; dependency inventory written | Done (awaiting merge) |
| P0-02 | Config loaders: `config/marketplaces.yaml`, `policy.yaml`, `checks.yaml` validated with Zod | GPT1 | Valid files load; invalid or missing field fails with a clear error (test); profile staleness computed from `effective_date` | Done (awaiting merge) |
| P0-03 | CI: GitHub Actions running `npm run check` on `windows-latest` and `ubuntu-latest` | GPT1 | Workflow file runs on PR; free tier only; no secrets needed; failure blocks merge recommendation | Ready |
| P0-04 | Clickable mockup of Make, Workflow, Review (static HTML in `docs/mockup/`) | GPT2 | Opens in a browser offline; three screens match PLAN section 2; Ashley's comments captured in DECISIONS | Ready |
| P0-05 | Verify Etsy rules and limits; date `marketplaces.yaml`; record AI disclosure requirement | GPT2 | Each value has source URL and access date; unverifiable values stay `unverified`; DECISIONS entry | Ready |
| P0-06 | Test harness: hostile text fixtures, fictional weekly planner fixture, `test:e2e` and `test:golden` script stubs | GPT1 (fixtures by GPT2) | Scripts exist and run; fixtures fictional; hostile samples include prompt injection, oversized text, odd Unicode, path tricks | Ready |
| P0-07 | Secrets and data guard in `npm run check` (pattern scan for keys/tokens, blocked file types) | GPT1 | A fake key planted in a temporary test file fails the scan (test); committed fixtures pass | Ready |

## The three screens

| ID | Item | Phase | Owner | Acceptance outline | Status |
|---|---|---|---|---|---|
| SCR-01 | Review grid: cards with preview, title, description, tags, price, check status; inline edit; counts from marketplace profile; inline warnings; Approve, Send back (one-tap reason), Hold | 1 | GPT1 | Weekly planner fixture editable in place; over-limit and duplicate-tag warnings appear; Approve blocked while any mandatory check is FAIL/NOT RUN; actions persist across restart; keyboard-only path works | Backlog |
| SCR-02 | Review compare view: two title or description variants side by side | 1 | GPT1 | Two variants shown with counts and warnings; choose one creates a new listing version | Backlog |
| SCR-03 | Make screen: one box, chips (type, audience, size, style, marketplace), Research first toggle, recent products, Suggestions badge | 2 | GPT1 | Pressing Make creates a product record and starts its workflow; nothing else on page; works offline (no research) with a clear message | Backlog |
| SCR-04 | Workflow simple view: step cards (Research, Spec, Prompt, Generate, Check, Package, Listing, Review) with on/off, pane, prompt version, Ask me / Run automatically | 3 | GPT1 | Each edit creates a workflow version; product records the version that built it; one-tap rollback restores previous version (test) | Backlog |
| SCR-05 | Workflow Pro view: node graph with branches (for example check fail → Generate) | 6 | GPT1 | Graph and list views are the same definition; branch on failure routes correctly; Pro changes presentation only | Backlog |

## Engine

| ID | Item | Phase | Owner | Acceptance outline | Status |
|---|---|---|---|---|---|
| ENG-01 | SQLite schema and migrations for all core tables (PLAN section 6) | 1 | GPT1 | Every record has ID, UTC timestamps, version, owner; money integer minor units (test rejects floats); migrations forward-only and tested | Backlog |
| ENG-02 | Product records with versions | 1 | GPT1 | Edits create new product_versions; history readable; nothing overwritten | Backlog |
| ENG-03 | Approval binding: approval stores file hashes and text hash; any change invalidates it | 1 | GPT1 | Changing one byte or one character after approval sets status back to not approved (test) | Backlog |
| ENG-04 | Validated IPC API (Zod in main); renderer has no DB, file system, shell or secrets access | 1 | GPT1 | Invalid payloads rejected (tests); preload exposes only named functions | Backlog |
| ENG-05 | Prompt library: versioned prompt records (format in PLAN), template variables, checks, golden set link | 2 | GPT1 | New version keeps parent; missing variable fails clearly; records load from `prompts/` | Backlog |
| ENG-06 | Panes: isolated sessions per pane with the plan's webPreferences; deny permissions and new windows; navigation allowlist | 2 | GPT1 | Automated test asserts every pane's settings; off-allowlist navigation blocked; no Node in pane | Backlog |
| ENG-07 | Build and copy: fill a template from the product spec, copy to clipboard for any pane in one tap | 2 | GPT1 | Filled prompt matches golden expected text; prompt version recorded | Backlog |
| ENG-08 | Capture reply: attach selected or pasted AI reply to product with prompt version | 2 | GPT1 | Reply stored as untrusted data, never executed or used as instruction; linked to prompt version | Backlog |
| ENG-09 | Workflow engine: versioned steps with typed inputs/outputs; modes manual/assisted/automatic; time limit, retry rule, stop condition; failed checks return to relevant step | 3 | GPT1 | Failure routes back (test); retries bounded; stop condition halts run; nothing hidden in an overall score | Backlog |
| ENG-10 | Preflight service (independent PDF library): page sizes A4 and US Letter, fonts embedded and licensed, text overflow | 3 | GPT1 | Good fixture passes; each broken fixture (wrong size, missing font, overflow) fails; unknown counts as fail | Backlog |
| ENG-11 | Packaging: A4 PDF, Letter PDF, guide, hash manifest | 3 | GPT1 | Manifest hashes match files; any change breaks verification | Backlog |
| ENG-12 | Weekly planner generator (recipe one output) | 3 | GPT1 | Produces A4 and Letter PDFs passing preflight; deterministic output for same inputs | Backlog |
| ENG-13 | Research engine: opportunity brief (themes, sample listings with date/URL/price/formats/complaints, gaps, 3 ideas with scores, go/hold/stop) | 4 | GPT1 build, GPT2 content | Every figure labelled observed/estimated/unknown; no invented sales; unknown not treated as zero (test) | Backlog |
| ENG-14 | Sources register and brief staleness | 4 | GPT1 | Each source has URL and access date; briefs marked stale after configured days | Backlog |
| ENG-15 | Learning loop: ratings (accepted, edited with diff, rejected with reason), send-back reasons, preflight failures | 5 | GPT1 | Signals recorded per prompt version; diffs stored | Backlog |
| ENG-16 | Weekly proposals tested against golden set before owner sees them; approve/reject; rollback | 5 | GPT1 | Proposal shows before/after evidence and sample size; cannot alter safety rules or checks or approve a sale (tests); rollback restores | Backlog |
| ENG-17 | Honest statistics: sample sizes shown, no winner from tiny samples | 5 | GPT1 | Below threshold shows "directional only" (test) | Backlog |

## Numbered features (PLAN section 4)

| ID | Feature | Phase | Owner | Acceptance outline | Status |
|---|---|---|---|---|---|
| F01 | Product recipes (planner, tracker, checklist, journal); weekly planner is recipe one | 3 | GPT1 | Recipe defines spec defaults, workflow and checks; new product from recipe works end to end | Backlog |
| F02 | Listing optimiser: title, description, tag variants; limits; duplicate and overlapping tags; keyword coverage; readability | 2 | GPT1 (rules by GPT2) | Each check has passing and failing fixtures; limits read from profile | Backlog |
| F03 | Claims checker: guaranteed results, health claims, before/after prices; shows evidence needed | 1 | GPT1 (rule list by GPT2) | Each risky-claim fixture flagged with the evidence required; clean copy passes | Backlog |
| F04 | Marketplace eligibility profile: AI disclosure, creativity standards, file types, limits, effective date, re-check warning | 1 | GPT1 (values by GPT2) | Profile older than re-check days warns; values never hard-coded (test greps) | Backlog |
| F05 | Preview integrity: previews generated from exact packaged files; mismatch blocks approval | 3 | GPT1 | Altered preview or file blocks Approve (test) | Backlog |
| F06 | Brand kit: colours, fonts with licences, logo rules, tone | 3 | GPT1 (content by GPT2) | Font without recorded licence fails rights check | Backlog |
| F07 | Bundle builder: verified products only; own listing | 6 | GPT1 | Unverified product cannot be bundled | Backlog |
| F08 | Customer guide generator: short print-and-use guide, reviewed before packaging | 3 | GPT1 (template by GPT2) | Guide included in package only after approval of its text | Backlog |
| F09 | Compare mode: one prompt to two AIs, replies side by side | 6 | GPT1 | Both replies captured with pane and prompt version | Backlog |
| F10 | Batch review: keyboard shortcuts approve / send back / hold | 6 | GPT1 | Full queue operable by keyboard; shortcuts never bypass mandatory checks | Backlog |
| F11 | Version diffs since last approved version, with change notes | 1 | GPT1 | Diff shows text and file-hash changes since last approval | Backlog |
| F12 | Command palette (Ctrl+K) | 2 | GPT1 | Finds any product, prompt, workflow or setting; keyboard and screen-reader accessible | Backlog |
| F13 | Context packs: one-click project brief and memory text for a new AI chat | 2 | GPT1 (text by GPT2) | Pack contains no secrets or personal data (test) | Backlog |
| F14 | Idea backlog with scores; research promotes or retires | 4 | GPT1 | Score shows inputs (F20); promote/retire recorded | Backlog |
| F15 | Seasonal planner with lead times | 6 | GPT1 (calendar data by GPT2) | Dates sourced and dated; lead-time warnings | Backlog |
| F16 | Cost and effort tracker; contribution after fees | 5 | GPT1 | Integer minor units; contribution = price − fees − variable cost (tests incl. rounding) | Backlog |
| F17 | Sales import: marketplace CSV linked to product versions | 6 | GPT1 | Hostile/malformed CSV rejected safely; real data stays outside the repo | Backlog |
| F18 | Experiment tracker with small-sample warnings | 6 | GPT1 | Hypothesis, variant, baseline, dates, result; warning below threshold | Backlog |
| F19 | Refresh and retire suggestions | 6 | GPT1 | Flags low contribution, repeated defects, outdated content, with inputs shown | Backlog |
| F20 | Explain this: every suggestion and score shows its inputs | 4 | GPT1 | No score rendered without its inputs (test) | Backlog |
| F21 | Autosave, crash recovery, snapshots before risky steps | 1 | GPT1 | Kill the process mid-edit; restart restores last autosave (test) | Backlog |
| F22 | Daily local backup and tested restore into an isolated folder | 1 | GPT1 | Restore test opens the backup in a separate folder and matches record counts and hashes | Backlog |
| F23 | Run log: step, prompt version, pane, time, result; no secrets | 3 | GPT1 | Secret-like strings redacted (test) | Backlog |
| F24 | Simple and Pro modes change presentation only | 2 | GPT1 | Same safety outcomes in both modes (test) | Backlog |
| F25 | Accessibility: keyboard, scalable text, high contrast, non-colour status cues | 1 onward | GPT1 (checks by GPT2) | Each screen keyboard-only; status has text/icon not just colour; text scales to 200% | Backlog |
| F26 | Offline behaviour: local works without internet or AI; unavailable features say why | 2 | GPT1 | Network-off e2e run passes; messages explain | Backlog |
| F27 | Digest notifications: one daily summary of what needs the owner | 5 | GPT1 | One notification per day maximum; lists items needing the owner | Backlog |

## Safety rules (PLAN section 5): each has a test and a red-team entry

| ID | Rule | First enforced | Owner | Acceptance outline | Status |
|---|---|---|---|---|---|
| SAF-01 | Never publishes, spends money or messages customers by itself | 1 | GPT1, red-team GPT2 | No code path performs network publish/payment/message; test asserts absence | Backlog |
| SAF-02 | AI output, web pages, messages are untrusted data | 2 | GPT1, red-team GPT2 | Hostile fixtures never change a rule or trigger an action | Backlog |
| SAF-03 | Mandatory checks must pass; unknown or not run is fail | 1 | GPT1, red-team GPT2 | Approve blocked for FAIL, NOT RUN or unknown | Backlog |
| SAF-04 | Approval bound to exact files and text | 1 | GPT1, red-team GPT2 | See ENG-03 | Backlog |
| SAF-05 | Each pane own session; credentials only in OS credential store | 2 | GPT1, red-team GPT2 | Settings test; grep for secrets in logs/DB | Backlog |
| SAF-06 | Check site terms before automating; prefer official APIs; copy and paste first | 2 | GPT2 | Terms check recorded in DECISIONS before any automation task is carded | Backlog |
| SAF-07 | Self-improvement proposals tested, evidenced, owner-approved, reversible | 5 | GPT1, red-team GPT2 | See ENG-16 | Backlog |
| SAF-08 | Business rules need real sources; console does not certify compliance | all | GPT2 | Copy and UI never claim compliance; sources dated | Backlog |

## Process extras (agreed at setup)

| ID | Item | Owner | Where | Status |
|---|---|---|---|---|
| X-01 | Definition of ready before each task | GPT2 | WORKFLOW §4 | Active |
| X-02 | PR cross-review of every delivery | GPT2 | WORKFLOW §7 | Active |
| X-03 | Blocker register | Both | docs/BLOCKERS.md | Active |
| X-04 | Weekly one-page digest for Ashley | GPT2 | docs/DIGEST.md | Active |
| X-05 | Stop-and-ask trigger list | Both | WORKFLOW §10 | Active |
| X-06 | Red-team of safety rules before each phase closes | GPT2 | WORKFLOW §8 | Active |
| X-07 | Baton file and one-line NEXT instruction | Both | docs/STATUS.md | Active |
| X-08 | WIP limit 1; one task per turn; tasks ≤ one session | Both | WORKFLOW §3–4 | Active |
| X-09 | Spec protection: GPT1 never edits task cards or acceptance tests | GPT2 checks | WORKFLOW §4 | Active |
| X-10 | Conflict escalation and three-fail loop guard | Both | WORKFLOW §10–11 | Active |
| X-11 | Phase cap tracking and kill criteria at each close | GPT2 | STATUS, DIGEST | Active |
| X-12 | Automated Windows smoke results and outstanding checks at phase close | GPT2 | DIGEST | Active |
| X-13 | Dependency inventory (`docs/DEPENDENCIES.md`) with licence and reason | GPT1 | created in P0-01 | Done (awaiting merge) |

## Added features (setup suggestions; GPT2 may reorder, Ashley may drop)

| ID | Feature | Phase | Owner | Acceptance outline | Status |
|---|---|---|---|---|---|
| E-01 | Approval audit trail: who, when, which hashes, which profile version | 1 | GPT1 | Every approve/send back/hold recorded and viewable | Backlog |
| E-02 | Asset and font licence register (feeds rights check and brand kit) | 3 | GPT1 (entries by GPT2) | Asset without licence entry fails rights check | Backlog |
| E-03 | Manual upload pack: copy-ready title, description, tags, files and previews in one folder for hand upload (no publishing) | 3 | GPT1 | Pack built only from an approved version; hashes match approval | Backlog |
| E-04 | Print calibration page in the guide (check printer scaling) | 3 | GPT1 (content by GPT2) | Page passes preflight; guide explains use | Backlog |
| E-05 | Diagnostics bundle for bug reports (logs, versions, no secrets or personal data) | 3 | GPT1 | Redaction test passes | Backlog |
| E-06 | Data export to JSON and import into a fresh install | 5 | GPT1 | Round trip matches record counts and hashes | Backlog |
| E-07 | Golden case builder: turn approved outputs into golden cases in one step | 5 | GPT1 | New case appears in `test:golden` run | Backlog |
| E-08 | AI disclosure text snippet per marketplace profile, inserted into listing drafts when required | 2 | GPT1 (text by GPT2) | Inserted when profile requires; flagged if removed | Backlog |
| E-09 | Startup health check: profile staleness, last backup age, failed restore test, pending approvals | 2 | GPT1 | Each condition shows a plain message | Backlog |
