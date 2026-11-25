# Printable specifications

Sources: WPW Shop Style Guide (P001 planner, 13–19 Nov 2026), P001 independent audit (13 Nov 2026), WPW Master Research KB v2 (K012, K065–K068, K106, 23 Nov 2026), Weekly Focus Planner build notes v2 and release audits (23 Nov 2026), Meal & Shop planner spec v1 (24 Nov 2026), Lab licensing register (23 Nov 2026), Release scorecard v1 (23 Nov 2026).

## 1. Page sizes (exact)

| Size | mm | PDF points (MediaBox) | px at 300 DPI |
|---|---|---|---|
| A4 | 210 × 297 | 595.276 × 841.89 | 2480 × 3508 |
| US Letter | 215.9 × 279.4 (8.5 × 11 in) | 612 × 792 | 2550 × 3300 |
| A5 | 148 × 210 | 419.53 × 595.28 | 1748 × 2480 |
| Filofax Personal | 95 × 171 | 269.29 × 484.72 | 1122 × 2020 |
| Personal 2-up on A4 landscape | 297 × 210 sheet | 841.89 × 595.28 | 3508 × 2480 |

Tolerance used in WPW tests: deviation over 0.5 pt on any page fails (P001 audit E-3). PFC's `checks.yaml` uses 0.5 mm, which is looser; Plans & Quality should pick one.

**Key lessons**
- A4 and US Letter are separate *editions*, each laid out natively, inside one listing. Letter must never be a stretched or scaled A4 (scorecard C2 score 2).
- A file named "US Letter" can contain A4 pages. Check the size of **every page** in every file, not the first page or the file name (K012, SYNTHETIC).
- Content can reflow differently: a 2-page A4 guide may become 3 pages in Letter (K065). Page counts must be checked per edition and stated per edition.

## 2. Print-safe layout (home printing)

| Rule | Value | Label | Source |
|---|---|---|---|
| Bleed | None. Home printers cannot print to the edge. Keep everything inside the safe area | HOUSE | Style Guide §3 |
| Background | White (or very light). A cream flood inks the whole page; a full-bleed dark header clips on home printers. Use a white header with an inset rule | SYNTHETIC | K065 |
| Minimum margin from trim | **≥ 17 mm** all sides (current rule). The Meal & Shop spec uses 18 mm (1 mm buffer). Earlier rules of 5 mm and 12 mm are superseded | SYNTHETIC / HOUSE | K065; scorecard C2; M02 spec |
| Measured, not nominal | A nominal 16 mm margin measured 15.9 mm at the glyph edge. Measure ink on renders | SYNTHETIC | K065; Weekly Focus build notes |
| Footer | Footer baseline ≥ 15 mm from trim (Weekly Focus v2 measured 15.1 mm; Meal & Shop sets ≥ 19 mm) | HOUSE | Build notes v2; M02 spec |
| Ink check method | Render each page (150–300 DPI) and measure the bounding box of non-background pixels against the margin table; fail if any ink is inside the margin by > 0.3 mm | SYNTHETIC | P001 audit E-6; selfcheck scripts |
| Overflow | Boxes must not run past their container or the page box (a reflection box ran 3.0 mm past the page and lost its bottom border) | SYNTHETIC | Weekly Focus audit H1 |
| Binding (ring or punch) | Inner margin wider than outer; mirrored margins assume double-sided printing. Keep content 3–4 mm inside the inner safe edge for ring arcs. Insert makers commonly use about 15 mm for Personal | HOUSE / UNVERIFIED | Style Guide §3; P001 audit |
| Grey lines | 0.5 pt writing lines at light grey can dither into dotted lines, or print with a colour cast when an RGB grey goes through CMY ink. Prefer darker greys; suggest greyscale printing | UNVERIFIED (not print-tested) | P001 audit #10 |
| Crop marks in a gap | Opposing 3 mm marks in a 6 mm gap overlap and confuse; use vertical-only marks | SYNTHETIC | P001 audit #1 |

Older style-guide margin table (superseded for new work, kept as history): A4 top 12, bottom 15, inner 20, outer 12 mm; A5 10/13/14/9 mm; Personal 8/10/11/7 mm.

## 3. Type

| Rule | Value | Source |
|---|---|---|
| Minimum text size in sold files | **9 pt** for every text run, including calendar headers, labels and badges (an audit failed 7–8.5 pt text) | Weekly Focus audit L4, build notes v2 (23 Nov 2026) |
| Body | 11 pt, line height 1.35 | Brand tokens (23 Nov 2026) |
| Headings | about 20 pt (Meal & Shop spec), labels 10–11 pt, footer 9 pt | M02 spec (24 Nov 2026) |
| Weights | Never Thin, Hairline or Light on tinted grounds or small sizes | Brand tokens |
| Writing lines | 7 mm spacing on A4, 6 mm on A5, 5.5 mm on Personal | Style Guide §3 (HOUSE) |
| Grow writing space, not fonts | Distribute spare height over writing rows rather than scaling fonts | M02 spec |

The older style guide allowed 7–8 pt labels and 6–7 pt footers on smaller sizes; that is superseded by the 9 pt floor for A4/Letter. Re-decide minimums for A5 and Personal if those sizes return.

## 4. Fonts and licences

| Rule | Detail | Label | Source |
|---|---|---|---|
| Embed every font | `pdffonts` must show `emb yes` for every font. A non-embedded font is a release auto-fail | VERIFIED (practice) | Scorecard AF-05; QA-04 |
| Never ship font files | Fonts are embedded in sold PDFs; `.ttf`/`.otf` files never go into a customer download (this does not restrict self-hosting fonts on a website) | VERIFIED-1H (OFL text, 23 Nov 2026) | Lab licensing register; brand font note |
| SIL OFL 1.1 | Allows use, embedding and selling documents made with the font; the font may not be sold by itself; reserved font names apply if modified (for example "Lato", "Plex", "Source") | VERIFIED-1H (23 Nov 2026) | https://openfontlicense.org ; google/fonts `ofl/lato` |
| Google Fonts | Open source and usable commercially, including in sold products; most are OFL | VERIFIED-LOG | Google Fonts FAQ https://developers.google.com/fonts/faq |
| DejaVu | Embedding fine; keep licence notices if distributing the font software; never sell it alone | VERIFIED-1H | DejaVu licence page |
| Unknown fonts | A font whose licence cannot be identified stays out of anything sold. Renaming a font is not a new licence | HOUSE | Lab licensing register |
| Adobe Fonts | Permits print PDFs, ebooks and rasterised use, but check the foundry terms per family; editable templates need their own test | VERIFIED-LOG | K106 |
| Canva | Canva's own licence allows Pro content in original finished printables (with a pixel limit for unedited Pro content in electronic publications), but templates containing Pro content may only be sold as Canva links. **WPW rule is stricter: no Canva Pro elements inside sold files; Canva for mockups and listing images only.** Canva fonts may not be extracted or converted | VERIFIED-1H (Canva CLA and Help, 23 Nov 2026) / HOUSE | Lab licensing register; K107 |
| Licence register | Every font and asset: name, source, licence type, licence URL, date checked, permitted use (sold file or mockup only) | HOUSE | Ops Manual §7.3 |

## 5. PDF structure and metadata

| Rule | Detail | Source |
|---|---|---|
| Metadata | PDF Title and Author set to the brand; no personal data or local file paths | QA-14 |
| Product name | One product name everywhere: file name, PDF Title, cover, Start Here heading, image names, and once in the description | Listing Standard B7 |
| Tagged PDF | Possible with a free HTML-to-PDF generator; plain ReportLab output is untagged; reading order can be wrong even with valid tags | K067 (SYNTHETIC) |
| Reproducible builds | Deterministic source → PDF/PNG/ZIP is possible; some builders produced varying hashes; a source change must invalidate every child file | K068 (SYNTHETIC) |
| Static vs other formats | Static print PDF ≠ fillable PDF ≠ Canva template ≠ EPUB ≠ GoodNotes/hyperlinked PDF. Promise only the exact delivered format | K011, K012 |
| No links in Etsy files | WPW static Etsy PDFs carry no link annotations, no URLs, no emails, no QR codes (see qa-checklists.md, the Wall) | Handy Guide spec v2 |
| ZIPs | Not encrypted; `unzip -t` clean; no unsafe paths; a `Start-Here` note at the root if a ZIP is used | Listing Standard B8; K124 |

## 6. Fillable PDFs and digital planners (not yet built by WPW)

- Fillable fields: count fields n/n, check names and tab order, and test a short name, a 24-character name and an accented name (for example Zoë, Siobhán). The file must save, reopen and print, and typed text must match the size shown in photos (Listing Standard B4, HOUSE).
- Hyperlinked planners: check the link objects themselves, not screenshots (missing, wrong or outside links). Rival descriptions sell hyperlinked tabs, page counts and app compatibility (GoodNotes, Notability, Xodo) (K123 SYNTHETIC; teardown 13 Nov 2026 INDEX).
- e-ink devices (Supernote, reMarkable, Kindle Scribe) appear in titles far less often than GoodNotes: a possible gap (INDEX).
- WPW has not built or tested a GoodNotes or Notability file. Device compatibility claims are **UNVERIFIED** and must not appear in listings until tested.

## 7. Dated content (calendars)

- UK bank holidays differ by nation: England and Wales 8, Scotland 9, Northern Ireland 10 in 2027. Always label the region; fetch from the official gov.uk JSON (https://www.gov.uk/bank-holidays.json) at build time and re-fetch at the sale build (VERIFIED-1H, K008; audit residual risk).
- 2027 England and Wales: 1 Jan, 26 Mar, 29 Mar, 3 May, 31 May, 30 Aug, 27 Dec, 28 Dec (VERIFIED, K008). Label substitute days consistently.
- ISO weeks: 2026 has 53 weeks (28 Dec 2026–3 Jan 2027 is 2026-W53); 2027 has 52 (P001 audit, computed).
- Check leap-year handling in any month grid (for example 29 Feb open, 30–31 Feb struck) (M06 blind test).
- Dated products expire in January; pair them with undated versions (teardown, INDEX).
- Monday start and equal Saturday/Sunday space were WPW house choices for UK buyers (Style Guide, HOUSE).

## 8. Buyer printing guidance that worked

Print at "Actual size / 100%", turn off fit-to-page, choose portrait, print one test page first and check the margins, choose the A4 or Letter file that matches your paper, black-and-white printing is fine. Paper: 100–120 gsm for planner pages; 160–200 gsm card for covers; 200 gsm+ matte for art (Weekly Focus guide; owner's own printing notes, P001). A 50 mm scale bar on an instructions page lets buyers check scaling (P001 audit recommendation, not yet tested).
