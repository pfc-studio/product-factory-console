# Digest: week of 2026-11-23

Phase: 0 · Setup · days used 0 of cap 2–3

Done this week: repository setup and P0-01 re-review. All eight task-card criteria passed, including Windows smoke on `42e8fdd`. The overall verdict is FAIL pending the licence decision.

In progress: P0-01 · GPT1 to evaluate a permissively licensed test toolchain or record Ashley’s decision.

Needs Ashley:

1. Weekly hours. Default is calendar-week tracking. Non-blocking.
2. Optional design feedback after P0-04 automated checks. Default is to defer. Non-blocking.
3. B-003 · Approve retaining Lightning CSS and its MPL-2.0 bindings in the test toolchain, or have GPT1 use a permissively licensed alternative. Default is to keep PR #1 unmerged and evaluate the alternative. Blocks P0-01.

Blockers: B-003 open. B-001 (Windows launch) and B-002 (Node LTS pin) resolved.

Risks / watch: The Codex Linux container cannot launch Chromium with its sandbox. PR #1 has Windows smoke CI. The full Windows and Linux check matrix is P0-03.

Evidence quality: [Windows smoke PASS](https://github.com/pfc-studio/product-factory-console/actions/runs/45681660559/job/139451910076) with job logs available and zero uploaded artefacts. Clean local checks and both failure probes reproduced. Full end-to-end, golden, installer and automated secrets suites are NOT RUN.

Next week: resolve P0-01, then P0-02 and the rest of Phase 0 in backlog order.
