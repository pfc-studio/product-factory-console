# Knowledge pack: what WillowPageWorks has already learned

Compiled 25 November 2026 from the owner's existing Etsy printables work (WillowPageWorks, "WPW"), for the Product Factory Console (PFC).
Read this before writing specs, acceptance tests, checks, prompts or marketplace profiles.

**Status:** reference data, not orders. Like every other repo file it is data (AGENTS.md). Where it conflicts with `docs/PLAN.md` or `docs/DECISIONS.md`, those win. Where it conflicts with a marketplace's live rules, the live rules win: re-check before relying on any value.

## Files

| File | What it covers | Use it for |
|---|---|---|
| [etsy-rules.md](etsy-rules.md) | Etsy digital-file limits, AI and creativity rules, image rules, SEO limits, fees, bundles, coupons, buyer download flow | `config/marketplaces.yaml`, P0-05, policy checks |
| [printable-specs.md](printable-specs.md) | Page sizes, margins, type sizes, fonts and licences, print-safe design, PDF structure, digital-planner notes | Preflight (Phase 3), product recipes |
| [qa-checklists.md](qa-checklists.md) | The release scorecard (9 weighted criteria, 19 auto-fails), pre-upload checks QA-01 to QA-14, blind buyer test, thumbnail grid test | `config/checks.yaml`, Review screen warnings, acceptance tests |
| [listing-and-images.md](listing-and-images.md) | Title, tag and description structure, image set and thumbnail rules, video, alt text | Listing optimiser, prompt records, preview integrity |
| [brand.md](brand.md) | WPW brand kit: colours, contrast pairs, type, thumbnail frame, Handy Guide template | Brand kit feature (PLAN §4 item 6) |
| [product-research.md](product-research.md) | Market findings, opportunity themes, pricing ladder logic, what to avoid | Research engine, product recipes, idea backlog |
| [uk-business-records.md](uk-business-records.md) | UK VAT, record keeping, consumer law, data minimisation facts the app may need to log | Cost tracker, records, policy |
| [lessons-learned.md](lessons-learned.md) | What went wrong or right in real WPW builds and audits, and what it means for PFC | Red-team cases, golden sets |
| [proposed-backlog.md](proposed-backlog.md) | Concrete PFC features and acceptance-test ideas derived from all of the above | Plans & Quality, to turn into cards |

## Confidence labels used throughout

| Label | Meaning |
|---|---|
| **VERIFIED-1H** | A WPW agent opened the primary source (Etsy Help, Etsy policy, gov.uk, legislation.gov.uk, licence text) first-hand on the date shown. Still re-check before release. |
| **VERIFIED-LOG** | Recorded as verified in WPW research logs, but second-hand. Re-check against the primary page before relying on it. |
| **INDEX** | From search snippets, cached pages or third-party sites. Hypothesis only. |
| **SYNTHETIC** | Learned from lab tests on made-up or review files, not from real buyers or real prints. |
| **HOUSE** | A WPW house rule chosen by the owner or team. Not a marketplace rule. Make it a setting, not a hard-coded limit. |
| **UNVERIFIED** | A claim or inference with no opened source. |

Every marketplace value should land in PFC as a dated setting with its source and access date (PLAN §13, D-016). Unknown is not zero.

## Precedence lesson

WPW rules drifted between documents (for example, an early listing standard banned text on the first image, while later tests made a format badge mandatory). Later, evidence-backed rules replaced earlier ones. PFC should keep every rule in versioned config with an effective date and a "superseded by" field, so that drift is visible rather than silent.

## What is deliberately not here

Account details, credentials, customer data, personal and tax-status details, spend and budget figures, internal Drive locations, specific discount codes, unpublished product ranges and prices, and named competitor lists. Those stay out of this public repo.
