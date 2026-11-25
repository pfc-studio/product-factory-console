# Lessons learned from real WPW work

Sources: Etsy Listing Quality Standard v1 Appendix A (scoring of three live listings, 19 Nov 2026), Weekly Focus Planner release audits r0–r3, build notes and blind tests (23 Nov 2026), Reading Journal blind test (23 Nov 2026), Care blind thumbnail baseline (19 Nov 2026), Master Research KB v2 §7–8 (23 Nov 2026), Lab keyword and rule-verification records (23 Nov 2026), P001 planner independent audit (13 Nov 2026).
Each lesson ends with what it means for PFC.

## A. Listings that went live without a gate failed

On 19 Nov 2026 three older live listings were scored against the new listing standard. **All three failed, each with 20+ critical fails**, even though the basics were fine (fonts embedded, licence text matched, ZIP structure clean, no website links, AI line present, titles and tags within limits, photos 3000 × 2250 under 1 MB, videos 12–13 s). What failed was the evidence: no research log, no concept card with competitors, no claim map, no logged margin proof or physical print, untested fillable fields (accented and long names), the product name missing from the description, titles not front-loaded with the buyer phrase, too many tags sharing one head phrase, tags repeating the category, no US variants. Those listings were later approved for removal.
→ **PFC:** passing mechanical limits is not enough. The workflow must capture research citations, a claim map and test evidence as first-class records, and Review must show what evidence is missing.

## B. The first real build scored 26.4/100

The Weekly Focus Planner's first audit (23 Nov 2026) failed. Defects a buyer saw: a reflection box ran 3.0 mm past the page and lost its bottom border (both sizes); a stray rule above "Notes" on A4 only, and 4 lines on A4 vs 3 on Letter; guide page 1 had no section number while pages 2–4 did; side margins measured 15.9 mm against a 16 mm nominal; footer 9 mm from trim; text as small as 7–8.5 pt; a cross-sell page naming six products that did not exist yet; "four files" true only in one reading. Three fix rounds later it passed at 81.6.
→ **PFC:** build an overflow check, a per-edition parity check (A4 and Letter have the same elements), a minimum-text-size check, a measured-margin check and a "not-live cross-sell" check into preflight. All of these were scripted in WPW and worked.

## C. A visible format badge is mandatory

Only 1 of 6 main thumbnails passed the blind "is this a digital download, and what format?" test (19 Nov 2026): the one with a "Printable + fillable PDF" badge. An earlier rule had banned text and badges on the first image; the evidence overturned it.
→ **PFC:** main-image checks must detect a format badge (OCR at 250 px) and the badge text must match the files' real format.

## D. Review copies leak into sale material

A "What's inside" image was rendered from the guide's review copy and still showed the review banner and an empty photo frame. Review banners and box labels are useful during review but must never reach a listing image or sold file.
→ **PFC:** mark every build as `review` or `sale`; derived images inherit the source build's status; Review blocks approval if any image comes from a `review` build or a stale hash.

## E. Human edits after QA reopen QA

The owner's final rewrite of guide and listing text (required by Etsy's AI rules) happens *after* the scored check. The audit warned that the Wall scan, placeholder scan, file-name check and licence-text match must be re-run on her edit.
→ **PFC:** approval is bound to exact file and text hashes (PLAN safety rule 4). Any edit invalidates approval and re-runs mechanical checks automatically.

## F. AI suggestions are claims until checked

Of eight AI-suggested tags, five searched into the wrong market (therapy worksheets, hourly schedules, spreadsheets, Filofax organisers) or were not real search terms. A Lab check replaced them.
→ **PFC:** captured AI replies are untrusted drafts. Tag and title suggestions should be checked against what the marketplace search actually shows, with the owner's accept/edit/reject recorded (learning loop).

## G. Gift claims vs licence terms

A blind buyer asked how a "printable gift idea" could be given when the licence forbids giving away the files or printed copies. Another found two pages disagreed on when to tick a box.
→ **PFC:** the claims checker should cross-check listing claims against the licence text and flag internal contradictions between guide, listing and pages.

## H. Rules drift across documents

Margins went 5 mm → 12 mm → 16 mm → 17 mm; minimum text from 6–7 pt to 9 pt; title separators from "no pipes" to pipes; first-image text from "banned" to "badge mandatory"; the AI disclosure wording changed at least twice. Bots sometimes followed an older version.
→ **PFC:** checks, limits and snippets live in versioned config with effective dates and supersession; every product records which rule version it passed.

## I. Hashes and manifests churned

One product's SHA-256 list reached version 12 in a single day, partly because files were re-hashed by hand after each change.
→ **PFC:** generate the manifest automatically at package time, store it with the product version, and tie previews and approvals to it.

## J. Build scripts must be saved

Several reproducible build scripts lived only in temporary space and were lost; some builders produced different bytes from the same source.
→ **PFC:** generators and their versions are part of the product record; reproducibility (same source → same hash) is worth an acceptance test.

## K. Synthetic progress is not release progress

A research log review found many entries were specs or tests on made-up files, while no product had been owner-approved; the same five owner decisions had blocked progress for days.
→ **PFC:** track SPEC / BUILT / TESTED / APPROVED separately; the daily digest should list the owner decisions that block release, in one short list, rather than more specs.

## L. Two engines, two plans

Two research engines produced two conflicting 14-item launch lists for the same shop.
→ **PFC:** one idea backlog with scores and a single source of truth; research outputs feed it rather than creating parallel lists.

## M. Marketplace pages are hard to read automatically

Etsy often blocked automated page loads (HTTP 403 or captcha); search snippets and third-party estimators were used instead and had to be labelled. Prices seen from a foreign locale showed a different currency with VAT.
→ **PFC:** follow PLAN's capture-from-pane approach and terms check; store locale and currency with any captured price; never scrape where terms forbid it.

## N. Things that worked well

- Native A4 and US Letter editions with identical content, plus a 5-page guide per size, as 4 PDFs, no ZIP.
- A "Start here" page as page 1 of the guide, with one help line.
- Per-nation UK bank-holiday labels fetched from gov.uk, with a "check the current list" caveat.
- Self-check scripts that emit JSON (`problems`, `files`, `margins`, `verdict`) and margin sheets.
- OCR of thumbnails at 250 px in both 4:3 and 1:1 crops to prove legibility.
- A blind test recorded *before* reading the builder's notes.
- Scorecard with weights, a floor of 3 per criterion and a hard auto-fail list: it turned vague "quality" into fixable items.
