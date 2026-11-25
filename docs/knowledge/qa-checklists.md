# QA checklists and the release gate

Sources: WPW Release Scorecard v1 (Audit, 23 Nov 2026), Ops Manual v1.0 §6.3–6.4 (20 Nov 2026), WPW Etsy Listing Quality Standard v1 (19 Nov 2026), Launch Checklist v3 (23 Nov 2026), Weekly Focus Planner release audits r0–r3 and self-check scripts (23 Nov 2026).
These are WPW house rules (HOUSE) built on the Etsy facts in [etsy-rules.md](etsy-rules.md). They were used on real products. In PFC they belong in `config/checks.yaml` and the Review screen, as editable, versioned settings.

## 1. Release scorecard (one per product)

Nine criteria, each scored 0–5 (whole numbers; score the lowest anchor that honestly fits). Weighted contribution = (score ÷ 5) × weight. Total out of 100, one decimal place.

**PASS needs all of:** zero auto-fails; total ≥ 80; every criterion ≥ 3; a blind buyer test PASS. There is no "pass with conditions" on the gate. A fail is fixed and re-scored. The scorer must not be the builder.

| ID | Criterion | Weight | What 3 (the floor) looks like |
|---|---|---|---|
| C1 | Listing accuracy and file-truth | 12 | Files match every material claim (page count, format, printable vs fillable, sizes, contents); a short claim list exists; no placeholders |
| C2 | File quality and printability | 14 | Opens and prints as described; fonts embedded and licensed; sizes correct; no Canva Pro elements; 100% proofs exist |
| C3 | Buyer guide (Handy Guide + Start Here) | 12 | All six guide elements present (use, edit, print, ideas, fun extra, cross-sell); print and edit steps correct; no placeholders |
| C4 | Marketplace policy and UK consumer law | 12 | Accurate digital-download listing; rights not hidden; AI line correct if needed; no prohibited claims |
| C5 | Channel separation (the Wall) | 8 | Clean of breaches (mostly binary) |
| C6 | SEO, title and tags | 12 | Title ≤ 140; 13 valid unique tags ≤ 20; no stuffing; human voice; digital format clear early in the description |
| C7 | Thumbnails and previews | 12 | Format badge legible at 250 px; previews are real content; grid test PASS. Cannot score above 2 on a live product without a dated competitor grid |
| C8 | Accessibility and readability | 8 | Readable in print and on screen; contrast and type size meet the floor; nothing essential in colour alone |
| C9 | Price, fee and margin | 10 | Worksheet includes VAT on fees; contribution with Offsite Ads (M15) > 0 for core products |

Real example: the Weekly Focus Planner went from 26.4/100 (FAIL, round 0) to 81.6 (PASS, round 3) on 23 Nov 2026 with scores 4,4,4,4,5,4,4,4,4.

## 2. Critical auto-fails (any one = FAIL, whatever the total)

| ID | Auto-fail if… | PFC check type |
|---|---|---|
| AF-01 | A marketplace file or listing points to the seller's own website, domain, emails or website-only codes | String scan (configurable forbidden list) |
| AF-02 | Off-marketplace links, codes or QR codes in marketplace files or listings | Link-annotation + text + QR scan |
| AF-03 | A material claim (title, tags, description, photos, video) does not match the shipped files, including fake or simulated previews | Claim map + preview hash match |
| AF-04 | Copy hides statutory consumer rights (for example a blanket "no refunds") | Phrase scan |
| AF-05 | A font is not embedded, or a sold file contains a Canva Pro or unlicensed element | `pdffonts` + licence register |
| AF-06 | More than 5 upload files, any file over 20 MB, or a corrupt/encrypted/unopenable pack | Package check |
| AF-07 | A named edition's page size is wrong, or content is clipped at 100% | Per-page size + ink-margin check |
| AF-08 | Guide or Start Here missing, or contains placeholders or "owner to write" gaps | Placeholder scan |
| AF-09 | A build stage has no research citation | Workflow record check |
| AF-10 | Price charges VAT the seller may not charge, or is not the approved price | Price vs approved table |
| AF-11 | Required AI disclosure line missing or altered | Exact string match |
| AF-12 | Main thumbnail has no format badge, or the blind/grid test failed | Badge detection (OCR) + test record |
| AF-13 | Essential information unreadable in a home print, or conveyed by colour alone | Greyscale render + contrast check |
| AF-14 | Internal draft codes, "review only" or similar leak into sold files or public copy | String scan |
| AF-15 | Children's products claim "curriculum aligned", or collect child data | Phrase scan |
| AF-16 | Title over 140 characters, any tag over 20, or tag count/duplicates breach the rules | Limits check |
| AF-17 | Margin worksheet omits VAT on platform fees | Cost model check |
| AF-18 | Contribution after a 15% Offsite Ad (M15) is negative | Cost model check |
| AF-19 | Personal data appears in a sold file, listing or evidence pack | PII scan |

**Not auto-fails** (record as Gate E / pre-publish items): the owner has not yet rewritten the guide text; the trader field is not yet set; a physical print test is outstanding (if the 100% digital proof passed); Offsite Ads status unconfirmed (model the 15% case).

## 3. Pre-upload checks QA-01 to QA-14

| ID | Check | Applies to |
|---|---|---|
| QA-01 | File count ≤ 5 per Etsy listing; each file ≤ 20 MB | Packs |
| QA-02 | Start-Here note present (ZIP root or page 1 of the guide), with the correct help line for the channel | Buyer packs |
| QA-03 | Every page matches the declared size (A4, A5, US Letter) | PDFs |
| QA-04 | All fonts embedded; each font in the licence register | PDFs |
| QA-05 | Every internal link and tab resolves; fillable fields named and tab-ordered | Planners, forms |
| QA-06 | Forbidden strings for marketplace files: own domain, social handle, any email pattern, website-only codes | Marketplace files + copy |
| QA-07 | Forbidden strings for website files: the marketplace's name (case-insensitive) | Website files |
| QA-08 | No Canva Pro or stock element inside a sold file (asset log cross-check) | Sold files |
| QA-09 | Thumbnail 3000 × 2250 (4:3) and a 1:1 export present; format badge present | Listing images |
| QA-10 | Key words legible when scaled to 250 px wide | Listing images |
| QA-11 | AI line verbatim; title ≤ 140; 13 tags ≤ 20 | Listing copy |
| QA-12 | Prices match the approved price table | Copy |
| QA-13 | UK English; no placeholder text (`TODO`, `lorem`, `[… TO WRITE]`) | All |
| QA-14 | PDF Title/Author set to the brand; no personal data or file paths in metadata | PDFs |

### Scan lists WPW actually used (self-check scripts, 23 Nov 2026)

- **Wall/link grep:** `http`, `www`, `@`, marketplace name, own brand domain, `code`, `QR`, `.com`, `.co.uk`, `gov.uk` (source lines need care), website-only discount codes, internal SKU codes, internal agent codes, `scan me`, `discount`.
- **Placeholder grep:** `TBD`, `lorem`, `XX`, `placeholder`, `owner to`, `TODO`, `[ASM]`, `[UNV]`, `{{`, `}}`, `review draft`, `will sit here`, `box-label`.
- **US spelling grep (for UK copy):** color, favorite, gray, center, catalog, organiz-, recogniz-, prioritiz-, favor, personaliz-, jewelry, mom.
- **Undated check:** no four-digit years on pages sold as undated (allow-list the bonus calendar page).
- **Not-live cross-sell:** guide must not name products that are not yet in the shop.
- **Help line count:** exactly once per guide.
- **Minimum text size:** every text run ≥ 9 pt (from the PDF text matrix).
- **Overflow:** no layout box past its container.
- **Ink margins:** measured on renders.

All scan lists must be configurable per brand and channel. Keep brand-specific strings (domains, codes) in local, non-committed config.

## 4. Blind buyer test

- **Who:** someone who did not design the thumbnail or write the guide.
- **Thumbnail test (TH8):** place the main thumbnail in a grid with at least 8 (11+ preferred) real, current competitor thumbnails from a search for the primary phrase, each scaled to 250 px wide. One glance: *What is it? Physical or digital download? What format?*
  - **PASS** = identified as a digital download *and* its format. **WEAK** = digital but format unclear. **FAIL** = read as physical or unclear. Only PASS proceeds.
  - Baseline on 19 Nov 2026: only 1 of 6 WPW mains passed, the one with a "Printable + fillable PDF" badge. **Lesson: a visible format badge is mandatory.**
- **Files test:** open the buyer files only (no notes) and record clear / confusing / defective, then "does it do the job?" and "would I buy at this price?". Record before reading the builder's notes.
- Log the grid date and competitor URLs; competitor listings change.

## 5. Gates per product (A to E)

| Gate | Done when |
|---|---|
| A Research verified | Demand signal, keyword record, competitor comparison (≥ 5 live rivals plus any free alternative), price model, thumbnail evidence |
| B Owner decision | Brand, go-ahead and format decided by the owner |
| C Specification | Product code, formats, page sizes, contents, keywords, price model, licence check, compliance flags, tests to pass |
| D Build and verify | File checks pass; thumbnail blind test PASS with a visible format badge; independent sign-off; scorecard PASS |
| E Go-live | Pre-publish items done (owner's own guide rewrite, owner's photo, AI line true, trader field), the owner's go-live words recorded; checked again 24 hours after going live |

## 6. Rules about evidence

- "Done" only with a link, file or logged decision. Unknown or not run counts as fail.
- Re-run the mechanical scans (Wall, placeholders, file names, licence text) after **any** human edit, including the owner's final rewrite.
- Hash every buyer file (SHA-256) and tie each preview image to the hash of the file it was rendered from.
- A practice or prototype file can be built early for learning but is never listed or sold.
