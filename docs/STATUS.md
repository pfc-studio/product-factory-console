# STATUS (the baton)

**Turn:** GPT1 · Builder (i9aa)
**Mode:** Fix after review
**Live branch:** task/P0-02
**Open PR:** [#2](https://github.com/pfc-studio/product-factory-console/pull/2) · draft
**Phase:** 0 · Setup · started 2026-11-25 · cap 2–3 days
**Current task:** P0-02 Config loaders (card: `docs/tasks/P0-02.md`)

## Last done
- 2026-11-25 · GPT2 · P0-02 review FAIL on `73bee2a`. Criteria 1–4 and the independent Windows smoke passed. Criterion 5 missed a hard-coded limit written as `Number(140n)`. [Review](reviews/P0-02.md)
- 2026-11-25 · GPT1 · P0-02 config loaders and test evidence ready for independent review. [Handover](handovers/P0-02.md)
- 2026-11-25 · Chief · Squash-merged [PR #1](https://github.com/pfc-studio/product-factory-console/pull/1) as [`620a283`](https://github.com/pfc-studio/product-factory-console/commit/620a283) and deleted `task/P0-01`.
- 2026-11-25 · GPT2 · P0-01 re-review PASS on `0f1e21a`. All eight criteria passed, including the independently rerun Windows smoke. B-004 is resolved. [Review](reviews/P0-01.md#re-review-on-0f1e21a) · [Windows job](https://github.com/pfc-studio/product-factory-console/actions/runs/45694670138/job/139505678136)
- 2026-11-25 · GPT1 · Used Chief’s authorisation for one B-004 fix. Added a capture guard and switched the Windows smoke to a presented frame. Local checks passed. See the [handover](handovers/P0-01.md#b-004-windows-screenshot-addendum) and [Windows evidence](https://github.com/pfc-studio/product-factory-console/pull/1#b-004-final-head-windows-evidence).
- 2026-11-25 · GPT2 · P0-01 re-review FAIL. Seven criteria passed. The fresh Windows smoke failed with `UnknownVizError` on `4813532` after the earlier run on that SHA passed. B-003 remains resolved.
- 2026-11-25 · GPT1 · Recorded Ashley’s approval for the dev-only Lightning CSS dependency and resolved B-003. Verified the Windows smoke run and downloaded its log and screenshot artefact.
- 2026-11-25 · GPT2 · P0-01 re-review FAIL under WORKFLOW §10.11. All eight task-card criteria passed, including the Windows CI launch. B-003 tracks the licence decision.
- 2026-11-25 · GPT1 · Corrected the Node LTS pin and added automated Windows launch verification in PR #1. Strict install, local checks and build passed. The first Windows CI job failed before any steps were recorded.
- 2026-11-25 · GPT2 · P0-01 review FAIL. Clean checks reproduced. D-021 pin correction and live sandboxed launch evidence required.
- 2026-11-25 · GPT1 · P0-01 scaffold and handover prepared. Clean install and quality checks passed. Live launch and newest-LTS verification are open.
- 2026-11-25 · Setup · Repository created with plan, workflow, backlog, decisions and Phase 0 task cards. (No code yet.)

## Next
1. GPT1 · Fix B-005 on `task/P0-02`, record the failing and passing scan probes in the handover addendum and return PR #2 for GPT2 review. [Reproduction](reviews/P0-02.md#required-rework)

NEXT → paste the continuation prompt into GPT1 · Builder (i9aa) · Codex · branch task/P0-02

## Blockers
B-005 blocks P0-02. The source scan misses a hard-coded limit written with a BigInt literal. [Blocker register](BLOCKERS.md)

## Needs Ashley
1. Weekly hours (D-008). Set a weekly hours cap or keep calendar-week tracking. Default is calendar-week tracking. Non-blocking.
2. P0-04 design feedback. Share preferences after automated checks pass or defer. Default is to defer. Non-blocking.

## Phase tracker
| Phase | Started | Cap | Used | Exit criteria | Result |
|---|---|---|---|---|---|
| 0 | 2026-11-25 | 2–3 days | 0 | Blank app launches and checks pass | — |

## Turn log (newest first, one line each)
- 2026-11-25 · GPT2 · P0-02 review FAIL on `73bee2a`. Opened B-005 and handed PR #2 back to GPT1 on `task/P0-02`.
- 2026-11-25 · GPT1 · Handed P0-02 to GPT2 for independent review on `task/P0-02`.
- 2026-11-25 · Chief · Squash-merged PR #1 as `620a283`.
- 2026-11-25 · GPT2 · P0-01 PASS after independent Windows smoke. B-004 resolved. P0-02 handed to GPT1 on `main` after PR #1 merges.
- 2026-11-25 · GPT1 · Implemented Chief’s one authorised B-004 fix and handed P0-01 back to GPT2 on `task/P0-01`.
- 2026-11-25 · GPT2 · P0-01 re-review FAIL on `4813532`. B-004 opened and another fix round awaits Ashley. Handed back to GPT1 on `task/P0-01`.
- 2026-11-25 · GPT1 · Resolved B-003 with Ashley’s approval and verified Windows smoke artefacts. Handed P0-01 to GPT2 on task/P0-01.
- 2026-11-25 · GPT2 · P0-01 re-review FAIL for B-003. Windows CI PASS and original blockers resolved. Handed back to GPT1 on task/P0-01.
- 2026-11-25 · GPT1 · P0-01 fixes and Windows CI evidence handed to GPT2 for re-review on task/P0-01
- 2026-11-25 · GPT2 · P0-01 FAIL handed to GPT1 on task/P0-01
- 2026-11-25 · GPT1 · P0-01 scaffold and evidence handed to GPT2 for review
- 2026-11-25 · Setup · baton handed to GPT1 for P0-01
