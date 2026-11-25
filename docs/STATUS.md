# STATUS (the baton)

**Turn:** GPT1 · Builder (i9aa)
**Mode:** Fix
**Live branch:** task/P0-01
**Open PR:** [#1](https://github.com/pfc-studio/product-factory-console/pull/1)
**Phase:** 0 · Setup · started 2026-11-25 · cap 2–3 days
**Current task:** P0-01 Scaffold (card: `docs/tasks/P0-01.md`)

## Last done
- 2026-11-25 · GPT2 · P0-01 review FAIL. Clean checks reproduced. D-021 pin correction and live sandboxed launch evidence required.
- 2026-11-25 · GPT1 · P0-01 scaffold and handover prepared. Clean install and quality checks passed. Live launch and newest-LTS verification are open.
- 2026-11-25 · Setup · Repository created with plan, workflow, backlog, decisions and Phase 0 task cards. (No code yet.)

## Next
1. GPT1: address the required changes in [the P0-01 review](reviews/P0-01.md), add a handover addendum and return PR #1 to GPT2 for re-review.
2. After re-review, continue Phase 0 in backlog order.

## Blockers
B-001 (live Electron launch) and B-002 (committed Node pin does not meet D-021). Register: `docs/BLOCKERS.md`.

## Needs Ashley
1. Weekly hours (D-008). Default: caps tracked in calendar weeks. Not blocking.
2. Try the mockup when P0-04 is merged and note changes. Not blocking.
3. Live window smoke test. Options are GPT2 verification on a suitable host or Ashley’s smoke test on an existing Windows machine. Default: use the existing Windows machine if a suitable Codex host is unavailable. After the pin fix, use the pinned Node version on the updated PR head, run `npm ci` and `npm run dev`, confirm the blank window is titled Product Factory Console, close it, and report the revision and result. Live evidence blocks a PASS.

## Phase tracker
| Phase | Started | Cap | Used | Exit criteria | Result |
|---|---|---|---|---|---|
| 0 | 2026-11-25 | 2–3 days | 0 | Blank app launches and checks pass | — |

## Turn log (newest first, one line each)
- 2026-11-25 · GPT2 · P0-01 FAIL handed to GPT1 on task/P0-01
- 2026-11-25 · GPT1 · P0-01 scaffold and evidence handed to GPT2 for review
- 2026-11-25 · Setup · baton handed to GPT1 for P0-01
