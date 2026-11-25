# Product Factory Console

A Windows-first desktop console for making digital printable products: a simple surface (Make, Workflow, Review) over a research and self-improvement engine.

Private repository. No licence has been chosen (all rights reserved).

## How this repository is run
Two AI roles build it with the owner, Ashley, approving:
- **GPT1 · Builder** designs and writes the code.
- **GPT2 · Planner & QA** writes task cards and acceptance tests, reviews and tests every change, and checks research, marketplace rules and listing quality.

Neither passes its own work. Ashley merges each PR after a PASS and decides anything in the stop-and-ask list.

## Start here
| File | What it is |
|---|---|
| `docs/STATUS.md` | The baton: whose turn, what is next, what needs Ashley |
| `docs/WORKFLOW.md` | How the two roles hand off, review, red-team and escalate |
| `docs/PLAN.md` | The plan: vision, screens, engine, features, safety rules, architecture, phases, risks |
| `docs/BACKLOG.md` | Every work item with phase, owner, acceptance outline and status |
| `docs/DECISIONS.md` | Decisions and assumed defaults |
| `docs/MEMORY.md` | Short project memory for any AI chat |
| `docs/DIGEST.md` | Weekly one-page digest for Ashley |
| `docs/BLOCKERS.md` | Blocker register |
| `AGENTS.md` | Rules for Codex |
| `config/` | Marketplace profiles, policy and checks (editable settings, not facts) |

## Commands (from Phase 0)
`npm ci` · `npm run check` · `npm run dev` · `npm run test:e2e` · `npm run test:golden` · `npm run package`
