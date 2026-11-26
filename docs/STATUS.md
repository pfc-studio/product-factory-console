# STATUS (the baton)

**Turn:** GPT2 · Plans & Quality (i988)
**Mode:** P0-04 delivered for Chief’s independent review
**Live branch:** `task/P0-04`
**Open PR:** [P0-04 pull request](https://github.com/pfc-studio/product-factory-console/pulls?q=is%3Apr+head%3Atask%2FP0-04) · Chief to review after green checks
**Phase:** 0 · Setup · started 2026-11-25 · cap 2–3 days
**Current task:** P0-04 Clickable mockup of the three screens

## Last done
- 2026-11-26 · GPT2 · [FACT] P0-04 offline prototype delivered for independent review. Author browser checks passed 5/5 and the local quality check passed 75/75. [Evidence](reviews/P0-04.md)
- 2026-11-26 · Chief · [FACT] At 20:22 London, squash-merged [PR #5](https://github.com/pfc-studio/product-factory-console/pull/5) into main as [`32a2e1d`](https://github.com/pfc-studio/product-factory-console/commit/32a2e1d).
- 2026-11-26 · GPT2 · [FACT] P0-06 Builder criterion 3 PASS on `77d3e01`. The independent Windows rerun passed 1/1 and the golden probes behaved as expected. GPT2's three fixture checks passed. The full local check passed 75/75. [Review](reviews/P0-06.md) · [Windows rerun](https://github.com/pfc-studio/product-factory-console/actions/runs/45883432287/job/140149250067)
- 2026-11-26 · GPT1 · [FACT] Delivered the P0-06 harness. Quality checks passed 72/72 locally and on both CI runners. Playwright launched Electron on Windows (1/1), and the empty golden suite reported `0 cases`. [Handover](handovers/P0-06.md) · [Windows launch](https://github.com/pfc-studio/product-factory-console/actions/runs/45883170171/job/140127262278)
- 2026-11-26 · Chief · [FACT] At 19:12 London, squash-merged [PR #4](https://github.com/pfc-studio/product-factory-console/pull/4) into main as [`4525258`](https://github.com/pfc-studio/product-factory-console/commit/4525258).
- 2026-11-26 · GPT2 · [FACT] P0-03 PASS on `4e65b7d`. The independent probe failed at the named assertion on Windows and Ubuntu. Both restored jobs and the clean local check passed 70/70. B-008 is resolved. [Review](reviews/P0-03.md#independent-hosted-reruns)
- 2026-11-26 · GPT2 · [FACT] P0-03 review FAIL on `3bf8e85`. Criteria 1–3 passed. Local probe failed as expected and restored checks passed 70/70. Criterion 4 is NOT RUN for independent hosted reproduction. [Review](reviews/P0-03.md)
- 2026-11-26 · GPT1 · [FACT] Delivered P0-03 with local checks and clean, failing and restored CI evidence on both hosted runners. [Handover](handovers/P0-03.md)
- 2026-11-26 · Chief · [FACT] At 17:30 London, squash-merged [PR #2](https://github.com/pfc-studio/product-factory-console/pull/2) into main as [`cb04656`](https://github.com/pfc-studio/product-factory-console/commit/cb04656).
- 2026-11-26 · GPT2 · P0-02 re-review PASS on `505affa`. All five criteria passed. The HTML, TypeScript, JavaScript and BigInt probes exited 1 with their file and line. The clean check passed 69/69 and the Windows smoke log and screenshot were independently verified. B-007 is resolved. [Review](reviews/P0-02.md#re-review-on-505affa) · [Windows job](https://github.com/pfc-studio/product-factory-console/actions/runs/45853904823/job/140027119926)
- 2026-11-26 · Chief · [FACT] At 03:32 London, authorised one B-007 fix to restore literal source HTML scanning, with a failing-first regression from the review probe. The decision was given in the continuation prompt. [D-026](DECISIONS.md#decisions-and-assumptions)
- 2026-11-26 · GPT1 · [FACT] Restored literal HTML scanning. The planted HTML probe exited 1 and named its file and line. The existing TypeScript, JavaScript and BigInt probes were still rejected. The clean check passed 69/69. [Handover](handovers/P0-02.md#b-007-html-source-scan-addendum)
- 2026-11-26 · GPT2 · [FACT] P0-02 re-review FAIL on `90f8123`. Criteria 1–4, clean check (68/68), B-006 probes and independent Windows smoke passed. Criterion 5 failed because the scan skipped a literal limit in source HTML. B-006 is resolved. GPT2 escalated B-007 after the third failed review. [Review](reviews/P0-02.md#re-review-on-90f8123)
- 2026-11-26 · GPT1 · Replaced the marketplace limit regex with TypeScript AST constant folding. Both B-006 probes failed with their paths and lines. The clean check passed 68/68. [Handover](handovers/P0-02.md#b-006-ast-source-scan-addendum)
- 2026-11-25 · GPT2 · P0-02 re-review FAIL on `3e7c975`. Criteria 1–4 and the independent Windows smoke passed. B-005 is resolved. B-006 tracks the missed numeric literals before property access. [Review](reviews/P0-02.md#re-review-on-3e7c975)
- 2026-11-25 · GPT1 · B-005 fix `0284afa` detects BigInt limits. The planted `Number(140n)` failed the scan with its file and line. Clean check, build and Windows smoke passed. [Handover addendum](handovers/P0-02.md#b-005-source-scan-addendum)
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
1. Chief · Review the [P0-04 prototype](mockup/index.html) and merge the P0-04 PR after green checks. [Author evidence](reviews/P0-04.md)
2. GPT2 · After merge, take [P0-05](tasks/P0-05.md) on `main`.

NEXT → paste the continuation prompt into GPT2 · Plans & Quality (i988) · Codex · branch task/P0-04

## Blockers
[FACT] P0-03 push CI passed on `main` at `4525258`. B-008 is resolved. [CI run](https://github.com/pfc-studio/product-factory-console/actions/runs/45881853759) · [Blocker register](BLOCKERS.md)

[FACT] BR(Ai)NS-dependent verification for P0-06 is NOT RUN. The task card does not require it. [Review](reviews/P0-06.md#scope-and-safety)

[FACT] BR(Ai)NS-dependent verification for P0-04 is NOT RUN. The knowledge guide is absent and the card does not require it. [Author checks](reviews/P0-04.md)

## Needs Ashley
1. Weekly hours (D-008). Set a weekly hours cap or keep calendar-week tracking. Default is calendar-week tracking. Non-blocking.
2. P0-04 design feedback. Try [the prototype](mockup/index.html) and share preferences or defer. Default is to defer. Non-blocking.
3. P0-03 hosted reruns (B-008) · **Resolved.** [FACT] Chief authorised rerunning `45869762967` and then `45869938318` on the free standard hosted runners at 18:50 London on 26 November 2026. Both reruns completed with the expected results. [Decision D-027](DECISIONS.md#decisions-and-assumptions) · [Evidence](reviews/P0-03.md#independent-hosted-reruns)

## Phase tracker
| Phase | Started | Cap | Used | Exit criteria | Result |
|---|---|---|---|---|---|
| 0 | 2026-11-25 | 2–3 days | 0 | Blank app launches and checks pass | — |

## Turn log (newest first, one line each)
- 2026-11-26 · GPT2 · [FACT] Delivered P0-04 for Chief’s review and queued P0-05 after merge.
- 2026-11-26 · Chief · [FACT] Squash-merged PR #5 as `32a2e1d` at 20:22 London.
- 2026-11-26 · GPT2 · [FACT] Independently passed P0-06 Builder criterion 3, added and tested the fixtures, and handed PR #5 to Chief.
- 2026-11-26 · GPT1 · [FACT] Handed draft PR #5 and P0-06 Windows launch evidence to GPT2 on `task/P0-06`.
- 2026-11-26 · Chief · [FACT] Squash-merged PR #4 as `4525258` at 19:12 London.
- 2026-11-26 · GPT2 · [FACT] P0-03 PASS after Chief-authorised Windows and Ubuntu reruns. Closed B-008 and handed PR #4 to Chief for merge.
- 2026-11-26 · GPT2 · [FACT] Recorded P0-03 review FAIL, opened B-008 and retained the review turn pending authorisation for independent hosted reruns.
- 2026-11-26 · GPT1 · [FACT] Handed draft PR #4 and P0-03 CI evidence to GPT2 on `task/P0-03`.
- 2026-11-26 · Chief · [FACT] Squash-merged PR #2 as `cb04656` at 17:30 London.
- 2026-11-26 · GPT2 · P0-02 re-review PASS on `505affa`. B-007 resolved. PR #2 is with Chief for merge, then P0-03 goes to GPT1.
- 2026-11-26 · GPT1 · [FACT] Recorded Chief’s authorisation, restored the B-007 HTML scan with a failing-first test and handed draft PR #2 to GPT2 for independent re-review.
- 2026-11-26 · GPT2 · P0-02 re-review FAIL on `90f8123`. Resolved B-006, escalated B-007 to Ashley and handed P0-03 local preparation to GPT1.
- 2026-11-26 · GPT1 · Fixed B-006 with an AST fold and test-first corpus. Handed draft PR #2 back to GPT2 on `task/P0-02`.
- 2026-11-25 · GPT2 · P0-02 re-review FAIL on `3e7c975`. Resolved B-005, opened B-006 and handed draft PR #2 back to GPT1 on `task/P0-02`.
- 2026-11-25 · GPT1 · Fixed the B-005 source scan and handed draft PR #2 back to GPT2 on `task/P0-02`.
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
