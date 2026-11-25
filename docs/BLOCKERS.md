# Blocker register

Raise a blocker as soon as it is known. A blocked task passes the turn on to the next unblocked task.

| ID | Opened | Task | Description | Owner | Needs Ashley? | Unblock condition | Status |
|---|---|---|---|---|---|---|---|
| B-001 | 2026-11-25 | P0-01 | Chromium aborted during sandbox setup in Codex. The first [Windows CI run](https://github.com/pfc-studio/product-factory-console/actions/runs/45680984982) failed with no job steps or logs available. | GPT1 and GPT2 | Only if the runner startup diagnostic requires owner access | Obtain a passing automated launch of the PR on a Windows runner with a working sandbox and display. | Open |
| B-002 | 2026-11-25 | P0-01 | Previous pin v24.22.3 failed D-021 and engine-strict installation on the current LTS. All three pins now use v26.13.1. | GPT1 | No | Builder reproduced engine-strict install, check and build on v26.13.1. GPT2 can reproduce these in re-review. | Resolved |
