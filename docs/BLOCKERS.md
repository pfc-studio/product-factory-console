# Blocker register

Raise a blocker as soon as it is known. A blocked task passes the turn on to the next unblocked task.

| ID | Opened | Task | Description | Owner | Needs Ashley? | Unblock condition | Status |
|---|---|---|---|---|---|---|---|
| B-001 | 2026-11-25 | P0-01 | The Linux Codex sandbox aborted before a window appeared. The first Windows CI run failed before recording job steps. | GPT1 and GPT2 | No | The [Windows smoke job](https://github.com/pfc-studio/product-factory-console/actions/runs/45681660559/job/139451910076) passed on `42e8fdd`. Its job log confirms a visible, blank, sandboxed window. | Resolved |
| B-002 | 2026-11-25 | P0-01 | Previous pin v24.22.3 failed D-021 and engine-strict installation on the current LTS. | GPT1 | No | GPT2 reproduced engine-strict install, check and build on the committed v26.13.1 pin. | Resolved |
| B-003 | 2026-11-25 | P0-01 | Vitest brings in `lightningcss@1.33.0` and native bindings through Vite. They declare MPL-2.0, which triggers WORKFLOW §10.11. | GPT1 and Ashley | Yes, if retaining the dependency | Record Ashley's explicit approval or remove the MPL-2.0 dependency chain and reproduce the clean checks. | Open |
