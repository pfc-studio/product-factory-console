# Proposed backlog from the WPW knowledge pack

Drafted 25 November 2026 for Plans & Quality to accept, merge, reorder or drop. IDs use the prefix `KN-` to avoid clashing with `P0-`, `E-` and `T-` cards. Each item cites the knowledge file it comes from. Nothing here changes PLAN scope; most items are concrete acceptance tests for features PLAN already lists. All fixtures must be fictional (P0-06).

## Phase 0 inputs

| ID | Proposal | Acceptance test idea | Source |
|---|---|---|---|
| KN-01 | Feed P0-05 with the values in etsy-rules.md §7; add new profile fields (filename_max_chars, images.max_count, video limits, functional_instructions_ai_banned, digital_preview_required, creativity_category, bundles, fees, shop sections) | Each field has value, source URL, access date and verified flag; loader rejects a field without a date; "VERIFIED-LOG" values stay `verified: false` until re-opened | etsy-rules.md |
| KN-02 | Hostile and defective fixtures for P0-06: a fictional planner PDF with (a) one A4 page inside a "Letter" file, (b) a box 3 mm past the page, (c) 7.5 pt text, (d) a non-embedded font, (e) a URL and an email in body text, (f) a link annotation, (g) "TODO" and "review draft", (h) US spellings in UK copy | Each defect is detected by the matching check once it exists; the clean fixture passes | qa-checklists.md, lessons B |
| KN-03 | Add `superseded_by` and `effective_date` to every rule in `checks.yaml` and `policy.yaml` | Loading a superseded rule as active fails validation; product records store the rule-set version they passed | lessons H |

## Phase 1: records and Review grid

| ID | Proposal | Acceptance test idea | Source |
|---|---|---|---|
| KN-10 | Tag validator: 13 tags, ≤ 20 chars, letters/numbers/spaces, ≥ 2 words each, no exact duplicates, no identical stem sets, no subset tags, ≤ 4 sharing a head phrase, not equal to category/attribute values | Table-driven tests, including "printable planner" ⊂ "a4 printable planner" flagged as subset (warning) and a 21-char tag as error | listing-and-images.md §2 |
| KN-11 | Title checks: ≤ 140 chars (error), > 15 words (warning), primary phrase in first 5 words (warning), banned words list (configurable), repeated words incl. plurals | Fixture titles produce the expected error/warning set | listing-and-images.md §1 |
| KN-12 | Description checks: first 160 chars contain primary phrase + "digital download" + format; required sections present in order; no £/$ figures; no links/emails; help line exactly once; AI line exact match when AI used = yes | Missing "digital download" in the opening → warning; altered AI line → mandatory fail | listing-and-images.md §3 |
| KN-13 | Claims checker additions: "no refunds"/"all sales final", "curriculum aligned", guarantees, health/financial outcomes, "bestseller", fake was/now, "handmade" when AI used, gift claims that conflict with a personal-use licence, device claims (GoodNotes etc.) without a tested flag | Each phrase in a fixture raises the right warning with "evidence needed" text | qa-checklists.md AF-04/15; lessons G |
| KN-14 | Creative-input record per product: AI used (yes/no/how), who wrote each text block, diff between AI draft and owner text, owner photo present (yes/no) | Approve is blocked when guide text is byte-identical to the captured AI draft, or when the marketplace profile requires a real photo and none is attached | etsy-rules.md §2; brand.md §7 |
| KN-15 | Evidence checklist on each Review card: research citation, keyword record (< 90 days), claim map, competitor grid (dated), blind test, print proof; missing items shown, not hidden in a score | A product with no research citation cannot be Approved (maps to AF-09) | lessons A |
| KN-16 | Price and cost model: integer minor units; fees from the profile; VAT on fees; contribution with and without a 15% Offsite Ad; warning when the 15% case is negative | With fixture fees (6.5%, 4% + £0.20, 0.48%, £0.16 listing, 20% VAT on fees) P = £4.50 gives M0 £3.48 and M15 £2.67 (±£0.01); the KB's 0.85864 coefficient is resolved or recorded as a known discrepancy | etsy-rules.md §6; uk-business-records.md §5 |
| KN-17 | Scorecard record: nine criteria with weights, 0–5 scores, floor 3, total ≥ 80, auto-fail list, scorer ≠ builder, blind test result | Total 81.6 for scores 4,4,4,4,5,4,4,4,4 with the default weights; any auto-fail → FAIL regardless of total; same person as builder and scorer → error | qa-checklists.md §1–2 |
| KN-18 | Status ladder SPEC → BUILT → TESTED → APPROVED shown separately on each product; digest lists blocking owner decisions | A product with specs only never shows as "ready" | lessons K |

## Phase 2: Make, prompts and panes

| ID | Proposal | Acceptance test idea | Source |
|---|---|---|---|
| KN-20 | Product recipe "undated weekly planner": native A4 + Letter editions, Monday start, 3 product pages + 5-page guide per size, 4 buyer PDFs, guide page 1 = Start here | Recipe produces a spec with page list per edition and a 4-file package plan within limits | product-research.md §8 |
| KN-21 | Prompt records seeded from WPW structures: title (front-load), 13 tags (with "check search results" step), description sections, alt text per image, guide sections (use, edit, print, ideas, fun extra, cross-sell) | Golden cases built from fictional products; outputs checked by KN-10–KN-13 | listing-and-images.md |
| KN-22 | Research brief fields: free alternative, "why buy this instead", locale and currency of every captured price, observed/estimated/unknown label | Brief without a free-alternative entry is "incomplete"; a price without locale fails validation | product-research.md §4, §7 |
| KN-23 | Brand kit record (JSON) from brand.md, with contrast computed from hex values | Contrast tool returns 11.43 for navy on chalk and flags navy on teal (2.48) as never; grey #657584 on chalk fails AA (4.46) | brand.md §4 |

## Phase 3: preflight and package

| ID | Proposal | Acceptance test idea | Source |
|---|---|---|---|
| KN-30 | Per-page size check for every page of every file vs declared edition | Fixture KN-02(a) fails, naming file and page | printable-specs.md §1 |
| KN-31 | Measured ink-margin check on renders (default ≥ 17 mm, configurable), plus footer distance | Fixture with content 15.9 mm from trim fails at 17 mm | printable-specs.md §2 |
| KN-32 | Minimum text size check from the PDF text matrix (default 9 pt) | Fixture KN-02(c) fails with the run's size | printable-specs.md §3 |
| KN-33 | Overflow check (layout boxes past container/page) | Fixture KN-02(b) fails | lessons B |
| KN-34 | Edition parity check: A4 and Letter have the same page count and element list | A fixture where Notes has 4 lines on A4 and 3 on Letter warns | lessons B |
| KN-35 | Fonts: all embedded, all in the licence register, no blocked fonts | Fixture KN-02(d) fails; an unregistered but embedded font fails "rights" | printable-specs.md §4 |
| KN-36 | Marketplace-file content scan: configurable forbidden strings (own domain, emails, social handles, website-only codes), link annotations, QR detection on rendered pages, internal codes, placeholders, US spellings for UK products, years on undated pages, help-line count | Fixtures KN-02(e)(f)(g)(h) fail with page references; forbidden-string list loads from a local, non-committed file | qa-checklists.md §3 |
| KN-37 | Package check: ≤ 5 files, each < 20,000,000 bytes, names ≤ 70 chars in the safe charset, ZIPs not encrypted and with safe paths, SHA-256 manifest generated automatically | 6-file package fails; a 71-char name fails; a ZIP with `../` path fails | etsy-rules.md §1 |
| KN-38 | PDF metadata check: Title/Author set; no personal data or local paths | Fixture with `C:\Users\…` in metadata fails | printable-specs.md §5 |
| KN-39 | Build status `review` vs `sale`; derived images inherit status and source hash | A listing image rendered from a review build blocks approval | lessons D |
| KN-40 | Dated content: bank holidays from gov.uk JSON with region labels and fetch date; leap-year sanity in month grids | A calendar built from a fetch older than the configured window warns | printable-specs.md §7 |
| KN-41 | Reproducibility test: same source + generator version → same hash | Two builds of the fixture produce identical SHA-256 | lessons J |

## Phase 3/4: images and thumbnails

| ID | Proposal | Acceptance test idea | Source |
|---|---|---|---|
| KN-50 | Thumbnail checks: 3000 × 2250 + 1:1 export; product inside centred square with 4% margin; fill 60–70%; name ≤ 3 words; OCR of name and badge at 250 px in both crops; badge text matches file format; band ≤ 12%; badge ≤ 8% | A fixture thumbnail without a badge fails (AF-12); badge "fillable" on a static PDF fails | listing-and-images.md §6; brand.md §6 |
| KN-51 | Competitor grid helper: owner captures ≥ 8 (11 preferred) competitor thumbnails with URLs and date; PFC composes the 250 px grid and records the blind PASS/WEAK/FAIL | Grid without dates or with fewer than 8 entries cannot be marked PASS | qa-checklists.md §4 |
| KN-52 | Image text and ban scan (OCR): no prices, %, links, codes, "sale", "free", review banners; text ≥ 76 px at 3000 px wide; ≤ 14 words | Fixture image with "£2.99" fails | listing-and-images.md §5 |
| KN-53 | Perceptual-hash distinctness across a shop's main thumbnails (≥ 10) | Two near-identical fixtures warn | listing-and-images.md §6 |
| KN-54 | Image upload readiness: sRGB JPEG, no alpha, < 1 MB, same aspect as photo 1, alt text present and updated after re-render | A PNG with alpha warns; stale alt (image hash changed since alt written) warns | listing-and-images.md §5 |

## Later phases

| ID | Proposal | Source |
|---|---|---|
| KN-60 | Bundle builder enforces native-bundle rules (≤ 3 listings, one bundle per listing) and compares bundle price with separate full-price orders | etsy-rules.md §5; product-research.md §5 |
| KN-61 | Sales import strips buyer personal data by default | uk-business-records.md §4 |
| KN-62 | Records retention default ≥ 6 years; no auto-delete of cost, sales or approval records; restore test of backups | uk-business-records.md §1 |
| KN-63 | Per-product VAT class field and VAT-registered setting in the cost model; turnover vs threshold warning | uk-business-records.md §2 |
| KN-64 | Fillable-PDF test helper (short, 24-character and accented names; save, reopen, print) for when fillable recipes arrive | printable-specs.md §6 |
| KN-65 | Hyperlink planner checks (all internal links resolve; no external links) and a "device tested" flag before any GoodNotes/Notability claim | printable-specs.md §6 |

## Questions for the owner (Plans & Quality to raise via Chief)

1. Page-size tolerance: 0.5 pt (WPW tests) or 0.5 mm (current `checks.yaml`)?
2. Should the WPW thresholds (17 mm margins, 9 pt text, badge mandatory, 60–70% fill) be PFC defaults, or only the WPW brand profile?
3. How list price relates to buyer price on the live Etsy shop (see uk-business-records.md §2 open conflict).
