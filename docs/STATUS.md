# STATUS (the baton)

**Turn:** GPT1 · Builder (i9aa)
**Mode:** Blocked pending Ashley
**Live branch:** task/P0-01
**Open PR:** [#1](https://github.com/pfc-studio/product-factory-console/pull/1)
**Phase:** 0 · Setup · started 2026-11-25 · cap 2–3 days
**Current task:** P0-01 Scaffold (card: `docs/tasks/P0-01.md`)

## Last done
- 2026-11-25 · GPT2 · P0-01 re-review FAIL. Seven criteria passed. The fresh Windows smoke failed with `UnknownVizError` on `4813532` after the earlier run on that SHA passed. B-003 remains resolved.
- 2026-11-25 · GPT1 · Recorded Ashley’s approval for the dev-only Lightning CSS dependency and resolved B-003. Verified the Windows smoke run and downloaded its log and screenshot artefact.
- 2026-11-25 · GPT2 · P0-01 re-review FAIL under WORKFLOW §10.11. All eight task-card criteria passed, including the Windows CI launch. B-003 tracks the licence decision.
- 2026-11-25 · GPT1 · Corrected the Node LTS pin and added automated Windows launch verification in PR #1. Strict install, local checks and build passed. The first Windows CI job failed before any steps were recorded.
- 2026-11-25 · GPT2 · P0-01 review FAIL. Clean checks reproduced. D-021 pin correction and live sandboxed launch evidence required.
- 2026-11-25 · GPT1 · P0-01 scaffold and handover prepared. Clean install and quality checks passed. Live launch and newest-LTS verification are open.
- 2026-11-25 · Setup · Repository created with plan, workflow, backlog, decisions and Phase 0 task cards. (No code yet.)

## Next
1. After Ashley approves another fix round under WORKFLOW §10.10, GPT1 reproduces and fixes B-004 on `task/P0-01`, preserves the existing smoke assertions, and hands back the new Windows evidence. See the [review](reviews/P0-01.md#re-review-on-4813532).
2. P0-02 follows the merged scaffold.

NEXT → paste the continuation prompt into GPT1 · Builder (i9aa) · Codex · branch task/P0-01

## Blockers
B-004 (intermittent Windows screenshot capture) blocks P0-01. B-001, B-002 and B-003 are resolved. See [the blocker register](BLOCKERS.md).

## Needs Ashley
1. Weekly hours (D-008). Set a weekly hours cap or keep calendar-week tracking. Default is calendar-week tracking. Non-blocking.
2. P0-04 design feedback. Share preferences after automated checks pass or defer. Default is to defer. Non-blocking.
3. P0-01 has failed three reviews (WORKFLOW §10.10). Approve one focused Builder fix for B-004 on PR #1, or pause P0-01. Default is to pause and keep PR #1 unmerged. Blocks P0-01 and dependent P0-02.

## Phase tracker
| Phase | Started | Cap | Used | Exit criteria | Result |
|---|---|---|---|---|---|
| 0 | 2026-11-25 | 2–3 days | 0 | Blank app launches and checks pass | — |

## Turn log (newest first, one line each)
- 2026-11-25 · GPT2 · P0-01 re-review FAIL on `4813532`. B-004 opened and another fix round awaits Ashley. Handed back to GPT1 on `task/P0-01`.
- 2026-11-25 · GPT1 · Resolved B-003 with Ashley’s approval and verified Windows smoke artefacts. Handed P0-01 to GPT2 on task/P0-01.
- 2026-11-25 · GPT2 · P0-01 re-review FAIL for B-003. Windows CI PASS and original blockers resolved. Handed back to GPT1 on task/P0-01.
- 2026-11-25 · GPT1 · P0-01 fixes and Windows CI evidence handed to GPT2 for re-review on task/P0-01
- 2026-11-25 · GPT2 · P0-01 FAIL handed to GPT1 on task/P0-01
- 2026-11-25 · GPT1 · P0-01 scaffold and evidence handed to GPT2 for review
- 2026-11-25 · Setup · baton handed to GPT1 for P0-01
