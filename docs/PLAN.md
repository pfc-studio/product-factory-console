# Product Factory Console: Plan

A simple console on the surface, a research and self-improvement engine underneath.
Plan dated 25 November 2026. This is the only plan for this project.

The plan is a backlog, not a promise. Build in phase order. Work items, owners and status live in `docs/BACKLOG.md`; assumptions and defaults live in `docs/DECISIONS.md`.

---

## 1. Vision in one paragraph

You open the console and either type what you want to make or tap a few options. The engine researches the niche, builds a spec, prepares prompts, lets you work with ChatGPT or other AIs in side panes, checks the output, packages it and puts it in a review area where you approve titles, descriptions and tags before anything is sold. Every accept, edit and rejection is recorded, so prompts and workflows improve over time with your approval.

**Design rule:** the surface shows three things (Make, Workflow, Review). Anything else lives behind Pro mode or runs quietly in the engine.

**Working assumptions** (recorded with defaults in `docs/DECISIONS.md`): the first product is the undated weekly planner (A4 and US Letter PDF); the first marketplace is Etsy, with others added later; digital downloads only; AI drafting starts as copy and paste between panes, with API connections optional later.

---

## 2. The three screens

### Make (home)
- One box: *What are we making?* Free text, plus chips for product type, audience, size, style, marketplace and a *Research first* toggle.
- Recent products and a Suggestions badge sit below. Nothing else on the page.
- Pressing Make creates a product record and starts its workflow. The owner is pulled in only when a decision is needed.

### Workflow (view and edit)
- Simple view: vertical step cards: Research, Spec, Prompt, Generate, Check, Package, Listing, Review. Each card lets you switch the step on or off, choose the AI pane and prompt version, and pick *Ask me* or *Run automatically*.
- Pro view: node graph with branches, for example if a check fails, return to Generate.
- Every edit creates a new workflow version. Each product records which version built it, and rollback is one tap.

### Review (before sale)
- Card grid: preview, title, description, tags, price, check status.
- Edit in place. Character and tag counts follow the chosen marketplace profile, which is an editable setting, not hard-coded.
- Inline warnings: unsupported claims, missing licences, preview and file mismatch, failed print checks, duplicate tags, banned or risky wording.
- Compare view for two title or description variants side by side.
- Actions: Approve, Send back (with one-tap reason), Hold. Nothing becomes sale-ready until every mandatory check passes.

---

## 3. Engine underneath

### Research engine
- Input: a niche or idea. Output: an opportunity brief with search-suggestion themes, a small sample of live competing listings (date, URL, price, formats, complaint themes), gaps, three product ideas with a score, and a go, hold or stop recommendation.
- Every figure is labelled observed, estimated or unknown. Competitor sales are never invented. Unknown is not zero.
- Sources: panes you capture from, official APIs, your own sales CSVs. No scraping where a site's terms forbid it.
- Briefs expire and are marked stale after a set number of days.

### Workflow engine
- A workflow is a versioned list or graph of steps with typed inputs and outputs.
- Each step has a mode (manual, assisted or automatic), a time limit, a retry rule and a stop condition.
- Failed checks return to the relevant step. They never disappear into an overall score.

### Prompt library
- Every prompt is a versioned record: purpose, template with variables, inputs, expected output format, acceptance checks, and a golden test set of past cases.
- Build and copy: the Make box fills a template from the product spec and copies it into any pane in one tap.
- Capture: select an AI reply in a pane and attach it to the product, with the prompt version recorded.

### Learning loop
- Signals: accepted, edited (with a diff), rejected (with reason), send-back reasons, preflight failures, customer feedback, returns, and imported sales results.
- Weekly, the engine proposes prompt or workflow changes, for example *Title prompt v4 is edited 70% of the time, try v5.*
- A proposal is tested against the golden set before the owner sees it. The owner approves or rejects. Rollback is always available. The engine can never change its own safety rules or approve a sale.
- Honest statistics: with small traffic, results are directional. The console shows sample sizes and never declares a winner from tiny samples.

---

## 4. Additional features and refinements

### Product and listing quality
1. **Product recipes:** reusable templates by product type (planner, tracker, checklist, journal). The weekly planner is recipe one.
2. **Listing optimiser:** generates title, description and tag variants; checks marketplace limits, duplicate and overlapping tags, keyword coverage and readability.
3. **Claims checker:** flags unsupported or risky claims (for example guaranteed results, health claims, before and after prices) and shows the evidence needed.
4. **Marketplace eligibility profile:** per-marketplace rules for AI use disclosure, creativity standards, file types and limits, with an effective date and a re-check warning when it ages.
5. **Preview integrity:** preview images are generated from the exact files in the package. A mismatch blocks approval.
6. **Brand kit:** colours, fonts (with licences), logo rules and tone, reused across every product.
7. **Bundle builder:** combine verified products into a bundle with its own listing.
8. **Customer guide generator:** a short print-and-use guide per product, reviewed before packaging.

### Workflow and speed
9. **Compare mode:** send one prompt to two AIs and view the replies side by side.
10. **Batch review:** keyboard shortcuts to approve, send back or hold a queue quickly.
11. **Version diffs:** see what changed since the last approved version, with change notes.
12. **Command palette (Ctrl+K):** jump to any product, prompt, workflow or setting.
13. **Context packs:** one-click project brief and memory text for any new AI chat.
14. **Idea backlog:** park ideas with scores, and let research promote or retire them.
15. **Seasonal planner:** calendar of upcoming seasons and events with lead times, so products are ready before demand.

### Learning and economics
16. **Cost and effort tracker:** AI spend, time and review effort per product, plus contribution after fees (price minus fees minus variable cost).
17. **Sales import:** CSV from the marketplace linked to product versions, feeding the learning loop.
18. **Experiment tracker:** hypothesis, variant, baseline, dates and result, with small-sample warnings.
19. **Refresh and retire suggestions:** flags products with low contribution, repeated defects or outdated content.
20. **Explain this:** every suggestion and score shows its inputs, so the engine is never a black box.

### Trust and resilience
21. **Autosave, crash recovery** and snapshots before every risky step.
22. **Backups:** daily local backup and a tested restore into an isolated folder.
23. **Run log:** every step, prompt version, pane, time and result, with no secrets stored.
24. **Simple and Pro modes** change presentation only, never safety rules.
25. **Accessibility:** keyboard operation, scalable text, high contrast, non-colour status cues.
26. **Offline behaviour:** everything local works without internet or AI. Unavailable features say why.
27. **Digest notifications:** one daily summary of what needs the owner, not constant alerts.

Further features added during setup are listed in `docs/BACKLOG.md` under *Added features* (IDs starting `E-`).

---

## 5. Safety rules (non-negotiable)

1. The console never publishes, spends money or messages customers by itself. The owner approves the exact version.
2. AI output, web pages and messages are untrusted data. They can never change a rule or trigger an action.
3. Mandatory checks (page size, fonts, rights, preview match, claims) must pass. Unknown or not run counts as fail.
4. Approval is bound to the exact files and text. Changing either invalidates it.
5. Each pane has its own session. Credentials stay in the operating system credential store and never in logs, prompts or the repository.
6. Check each site's terms before automating it. Prefer official APIs. Start with copy and paste, not auto-sending.
7. Self-improvement proposals are tested, shown with evidence, approved by the owner, and reversible.
8. Business rules (tax, consumer law, privacy) need real sources and, where it matters, qualified advice. The console does not certify compliance.

---

## 6. Architecture and data

- Electron + TypeScript (strict), SQLite (better-sqlite3), Zod for schemas. Local only. Windows first, portable code.
- **Main process (privileged):** panes, database, workflow runner, policy checks, file vault, logging.
- **Shell UI:** Make, Workflow, Review, panes. Talks to main through a small validated IPC API.
- **Panes:** untrusted web content, one session partition each, no Node access.
- **Preflight service:** reads the generated PDFs independently of the generator and records results.

### Core tables
products, product_versions, files (path, hash), workflows, workflow_versions, steps, runs, prompts, prompt_versions, golden_cases, outputs (linked to prompt version), ratings (accepted, edited, rejected, reason, diff), listings (title, description, tags, price, marketplace, status), marketplace_profiles, research_briefs, sources, ideas, experiments, sales_imports, costs, suggestions (status), backups, settings. Added during setup: approvals (exact file hashes and text hash, invalidated on change), snapshots.

Every record has an ID, timestamps in UTC, a version and an owner. Money is stored in integer minor units, never floating point.

### Repository layout
```
product-factory-console/
  AGENTS.md
  docs/        PLAN.md MEMORY.md STATUS.md BACKLOG.md DECISIONS.md WORKFLOW.md
               BLOCKERS.md DIGEST.md HANDOVER_TEMPLATE.md tasks/ reviews/ handovers/
  config/      marketplaces.yaml policy.yaml checks.yaml
  prompts/     versioned prompt records
  workflows/   versioned workflow definitions
  src/
    main/      db, workflow runner, policy, vault, panes
    preload/   minimal validated bridge
    shell/     Make, Workflow, Review, panes
    engine/    research, drafting, learning, preflight
    shared/    types and schemas
  tests/
    fixtures/  fictional products, hostile text samples
    golden/    prompt regression cases
    acceptance/ acceptance tests written by Plans & Quality
```

### Tooling
- Node LTS, Electron pinned to an exact version, TypeScript strict.
- better-sqlite3, Zod, Vitest, Playwright for Electron end-to-end tests, ESLint, Prettier, electron-builder.
- Scripts: `dev`, `build`, `check` (format, lint, types, unit tests), `test:e2e`, `test:golden`, `package`.
- PDF checks use an independent library from the generator. Review each new dependency for licence, maintenance and size before adding it.

### Pane security (every pane)
```ts
webPreferences: {
  contextIsolation: true,
  nodeIntegration: false,
  sandbox: true,
  webSecurity: true,
  partition: `persist:pane-${paneId}`
}
```
- Deny permission requests by default and deny new windows.
- Navigation allowlist per pane. Validate all IPC with Zod. Strict content security policy on the shell. No remote code in the shell.

### Prompt record format
```yaml
id: title_v4
purpose: Generate 5 title variants for a printable
variables: [product_name, audience, key_benefit, marketplace]
template: file://prompts/title_v4.txt
output_format: list of 5, each under the marketplace title limit
checks: [length, no_unsupported_claims, no_duplicate_phrases]
golden_set: tests/golden/title/
status: active
parent: title_v3
```

### Workflow definition format
```yaml
id: printable_v1
version: 3
steps:
  - research: {mode: assisted, skip_if: brief_fresh}
  - spec: {mode: assisted}
  - prompt: {mode: manual, pane: ai_chat}
  - generate: {mode: assisted}
  - check: {mode: automatic, on_fail: generate}
  - package: {mode: automatic}
  - listing: {mode: assisted}
  - review: {mode: manual, requires_approval: true}
```

---

## 7. Phased plan with caps and kill criteria

Caps assume a single part-time builder working with Codex. Total cap: about 18 weeks to a useful console, with the first real product package by the end of Phase 3. Caps are in weeks until the owner sets weekly hours (see `docs/DECISIONS.md`).

### Phase 0: Setup (2–3 days)
Repository, pinned tools, AGENTS.md, docs/MEMORY.md, config files, `npm run check`.
**Done when:** a blank app launches and checks pass.

### Phase 1: Records and Review grid (cap 3 weeks)
Product records with versions, Review grid, inline editing, marketplace profile limits, warnings, Approve, Send back, Hold, SQLite persistence.
**Done when:** the owner can enter the weekly planner listing, see limit warnings, send it back and approve it, and everything survives a restart.
**Stop or rethink if:** the owner would rather use a spreadsheet for this.

### Phase 2: Make, prompts and panes (cap 4 weeks)
Make box, chips, prompt library with versions, pane hosting with isolated sessions, build and copy, capture reply.
**Done when:** from a typed idea you get a built prompt, paste the AI reply back, and see it on the product with the prompt version recorded.
**Stop or rethink if:** the round trip is slower than the owner's current manual process.

### Phase 3: Workflow and preflight (cap 3 weeks)
Workflow list view with versions and rollback, step modes, run log. Preflight for the weekly planner: page sizes, fonts, text overflow, A4 and Letter, hash manifest, preview match.
**Done when:** a verified package (A4 PDF, Letter PDF, guide) exists with a manifest, and a deliberately broken file is blocked.

### Phase 4: Research engine (cap 3 weeks)
Opportunity brief, sources register, labels for observed, estimated and unknown, idea backlog, stale warnings.
**Done when:** three niches have briefs, and at least two changed a decision the owner would otherwise have made.
**Stop or rethink if:** briefs do not change decisions. Simplify to a research checklist.

### Phase 5: Learning loop (cap 3 weeks)
Ratings and diffs, golden sets, suggestions with before and after evidence, rollback, cost and effort tracker.
**Done when:** at least one prompt change was proposed, tested on the golden set, approved by the owner, and measurably reduced the owner's edits.

### Phase 6: Pro features (as evidence supports)
Workflow graph, compare mode, batch review, sales import, experiments, seasonal planner, bundles, refresh and retire suggestions.

### Money caps (assumptions; the owner sets their own)
- Development tools: £0 mandatory.
- AI spend: £20 per month hard cap if API access is added.
- Any paid addition needs a written reason and the owner's approval.

---

## 13. Risks and open questions

- **Scope creep:** the feature list is long. Build in phase order and treat Section 4 as a backlog, not a promise.
- **Marketplace rules change:** keep limits and eligibility as dated settings with re-check warnings.
- **Overfitting the learning loop:** with few products, the data is thin. Use golden sets and the owner's judgement, and avoid claiming improvement from a handful of cases.
- **Account and terms risk:** keep AI panes on copy and paste until each site's terms have been checked.
- **Open questions** (defaults recorded in `docs/DECISIONS.md` until the owner decides): which marketplace first, which AIs are used, weekly hours, and whether this stays personal or may become a product later.
