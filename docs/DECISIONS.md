# Decisions and assumptions

Each entry: ID, date, status (Assumed default · Decided · Superseded), decision, reason, who can change it, revisit trigger.
Assumed defaults are used until Ashley decides. Changing a Decided entry is a stop-and-ask item.

| ID | Date | Status | Decision / default | Reason | Changed by | Revisit when |
|---|---|---|---|---|---|---|
| D-001 | 2026-11-25 | Decided | This is the only project. `docs/PLAN.md` is the only plan. | Owner instruction | Ashley | — |
| D-002 | 2026-11-25 | Decided | Two roles: GPT1 · Builder (i9aa) builds; GPT2 · Plans & Quality (i988) plans, writes acceptance tests, reviews and tests. Neither passes its own work. | Independent review | Ashley | — |
| D-003 | 2026-11-25 | Decided | Shared space: private GitHub repo `product-factory-console` on GitHub account `pfc-studio` (https://github.com/pfc-studio/product-factory-console). Repo is the source of truth; chat memory is not. | Accounts cannot see each other's chats | Ashley | — |
| D-004 | 2026-11-25 | Assumed default | First marketplace: Etsy. Others later via new profiles. | Plan assumption | Ashley | Before Phase 1 close |
| D-005 | 2026-11-25 | Assumed default | First product: undated weekly planner, A4 and US Letter PDF, plus guide. | Plan assumption | Ashley | Before Phase 3 |
| D-006 | 2026-11-25 | Assumed default | Digital downloads only. | Plan assumption | Ashley | — |
| D-007 | 2026-11-25 | Assumed default | AI panes are copy and paste. No auto-sending and no API keys. ChatGPT pane first; other AIs configurable as panes. | Safety rule 6; terms risk | Ashley | After each site's terms are checked (SAF-06) |
| D-008 | 2026-11-25 | Assumed default | Weekly hours not yet set: caps are tracked in weeks of calendar time from phase start. | Open question | Ashley | When Ashley states weekly hours |
| D-009 | 2026-11-25 | Decided | Target: Windows first, portable code. Codex runs on Linux, so Windows-only checks run in CI (`windows-latest`) or are listed NOT RUN for Ashley's Windows smoke test. | Plan section 6 | Ashley | — |
| D-010 | 2026-11-25 | Assumed default | Licence: none chosen. No LICENSE file; all rights reserved by default; repo private. Choosing a licence is Ashley's decision. | Open question: personal tool or product later | Ashley | If the console may become a product |
| D-011 | 2026-11-25 | Decided | Coding happens in Codex on each account, connected to the shared repo. GPT2 runs tests through Codex on the same repo. ChatGPT project chats are for planning, research and copy; they hand repository writes to Codex. | Only Codex writes to the repo | Ashley | — |
| D-012 | 2026-11-25 | Decided | WIP limit 1: one task in progress, at most one open build PR. One task per turn. | Keeps hand-offs simple | Ashley | — |
| D-013 | 2026-11-25 | Decided | Ashley merges PRs (one click) after a GPT2 PASS. A merge is approval to proceed, not approval to publish. | Human control point; tools may not merge | Ashley | — |
| D-014 | 2026-11-25 | Decided | Money caps: development tools £0; AI spend £20/month hard cap only if API access is added; any paid addition needs a written reason and Ashley's approval. | Plan section 7 | Ashley | — |
| D-015 | 2026-11-25 | Decided | Out of scope: finance ledger, multi-user, cloud sync, local models, plugins. | Plan memory | Ashley | — |
| D-016 | 2026-11-25 | Assumed default | Marketplace profile values in `config/marketplaces.yaml` are unverified until GPT2 completes P0-05. Re-check days: 90. Research brief stale after 30 days. | Rules change | GPT2 proposes, Ashley confirms | Each release; when a profile ages past re-check |
| D-017 | 2026-11-25 | Assumed default | AI disclosure on Etsy: to be checked in P0-05. Until then treat as required and include a disclosure snippet. | Safer default | Ashley | P0-05 result |
| D-018 | 2026-11-25 | Assumed default | Small-sample threshold: no winner declared with fewer than 30 cases per variant; below that results are "directional only". | Honest statistics | GPT2 proposes, Ashley confirms | Phase 5 |
| D-019 | 2026-11-25 | Assumed default | Phase cap overrun trigger: more than 25 per cent over cap is a stop-and-ask item. | Kill criteria | Ashley | — |
| D-020 | 2026-11-25 | Decided | GitHub Actions CI on the free tier is allowed (£0). Nothing that needs a paid plan. | Money cap | Ashley | If free minutes run out |
| D-021 | 2026-11-25 | Assumed default | Node: current LTS at Phase 0, pinned in `.nvmrc` and `engines`. Electron: exact version pinned at Phase 0. | Reproducibility | GPT1 proposes, GPT2 checks | Each phase close |
| D-022 | 2026-11-25 | Assumed default | Timestamps stored in UTC; dates shown to Ashley in Europe/London. Currency GBP for Ashley's costs; listing prices in the marketplace's currency, integer minor units. | Plan section 6 | Ashley | — |
