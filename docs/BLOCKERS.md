# Blocker register

Raise a blocker as soon as it is known. A blocked task passes the turn on to the next unblocked task.

| ID | Opened | Task | Description | Owner | Needs Ashley? | Unblock condition | Status |
|---|---|---|---|---|---|---|---|
| B-001 | 2026-11-25 | P0-01 | Electron binary fetch fails in Codex and the Linux shell has no display or xvfb-run. Criterion 5 is not verified live. | GPT2 | Only if Windows smoke test is needed | Run the pinned Electron app or a launch test on a host with the Electron archive and display support. | Open |
| B-002 | 2026-11-25 | P0-01 | Codex has Node v24.22.3 LTS. The newest LTS is v26.13.1, which has not been tested for D-021. | GPT2 | No | Verify on the newest LTS or confirm Node 24 LTS satisfies D-021. | Open |
