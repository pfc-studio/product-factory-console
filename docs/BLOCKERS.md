# Blocker register

Raise a blocker as soon as it is known. A blocked task passes the turn on to the next unblocked task.

| ID | Opened | Task | Description | Owner | Needs Ashley? | Unblock condition | Status |
|---|---|---|---|---|---|---|---|
| B-001 | 2026-11-25 | P0-01 | Electron's lazy binary fetch fails in Codex. Direct archive download passed checksum verification, but Chromium aborted during sandbox setup. No display or Xvfb was available. | GPT1 and GPT2 | If the Windows smoke test is needed | Reproduce a live blank window on a host with a working sandbox and display. | Open |
| B-002 | 2026-11-25 | P0-01 | Committed Node v24.22.3 pin fails D-021. A disposable v26.13.1 metadata update passed strict install, check and build. | GPT1 | No | Align the committed Node pins and lockfile, then independently reproduce the checks. | Open |
