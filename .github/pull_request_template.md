## [PFC] <TASK-ID> <title>

**Author role:** GPT1 · Builder / GPT2 · Planner & QA
**Task card:** docs/tasks/<TASK-ID>.md
**Handover / review record:** docs/handovers/<TASK-ID>.md · docs/reviews/<TASK-ID>.md

### Summary
<one to three lines>

### Acceptance criteria
| # | Status (PASS/FAIL/NOT RUN/SIMULATED) | Evidence |
|---|---|---|

### Checks
- [ ] `npm run check` run, real output in handover
- [ ] New behaviour has tests, including a failure case
- [ ] No test weakened, skipped or deleted
- [ ] Task cards and `tests/acceptance/` untouched by the builder
- [ ] Safety rules touched: listed and tested
- [ ] No credentials, personal data or real customer data
- [ ] Dependencies added: listed in docs/DEPENDENCIES.md with licence
- [ ] Windows-only checks: run in CI, or listed NOT RUN for smoke test
- [ ] docs/STATUS.md updated (Turn, Live branch, Next)

### Review verdict (GPT2 only)
PASS / FAIL, see docs/reviews/<TASK-ID>.md. Merge only after PASS. Merging is not approval to publish.





















