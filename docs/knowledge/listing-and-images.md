# Listing copy, SEO and images

Sources: WPW Listing Copy Template and New Listing Checklist (19 Nov 2026), WPW Etsy Listing Quality Standard v1 (19 Nov 2026), Weekly Focus Planner listing copy v5 and keyword record (23 Nov 2026), Meal & Shop spec v1 (24 Nov 2026), Master Research KB v2 §3–4 (23 Nov 2026), thumbnail measures v4 (23 Nov 2026), preview-image audit (13 Nov 2026).
Most rules here are HOUSE rules backed by the Etsy facts in [etsy-rules.md](etsy-rules.md).

## 1. Title

- ≤ 140 characters (cap, not target); aim for ≤ 15 words where it still reads naturally.
- Front-load the primary buyer phrase from the keyword record (first 3–5 words), then key traits (format, size, start day, audience).
- Every trait in the title must be true in the files.
- Avoid: subjective words (perfect, beautiful, stunning, cute, best), prices, "sale", "free", delivery wording, the shop name, emoji, other brands' trade marks (Canva, Avery, Cricut, GoodNotes unless genuinely compatible and tested), "BESTSELLER", repeated words (plurals count).
- **Drift note:** the 19 Nov standard banned pipes (`|`); the 23 Nov listing that passed the scorecard used pipes as separators. Treat separators as a configurable style choice.
- The URL is set from the first published title, so finalise it before first publish.

Example structure that passed (23 Nov 2026): `<Product name> Printable Planner | Undated Monday Start | A4 & US Letter PDF | <bonus>` (91 characters).

## 2. Tags (13)

| Rule | Check |
|---|---|
| All 13 used, each ≤ 20 characters, letters/numbers/spaces | Count and length |
| Each a phrase of ≥ 2 words | Word count |
| No exact duplicates, no two tags with the same set of word stems, no tag that is just a subset of another | Script (stem sets) |
| No more than 4 tags share a head phrase | Script |
| Don't repeat the category or attribute values | Compare with attributes |
| Cover UK and US variants where they differ (colouring/coloring, planner/organizer) | Keyword record |
| No misleading tags (Canva, editable, fillable, Avery, GoodNotes) unless true | Claim map |
| Every tag comes from a dated keyword record row (phrase, UK/US, source URL, date, competition proxy, where used); the record is < 90 days old | Record check |

**Lessons from real tag work (23 Nov 2026):** five AI-suggested tags were replaced because they searched into the wrong market: "reflection worksheet" → therapy worksheets; "seven day schedule" → hourly schedules; "productivity sheets" → spreadsheet files; "personal organiser" → Filofax ring organisers; "2027 calendar bonus" → "bonus" is not a search term. **PFC should check each tag by looking at what the marketplace search actually returns, not just its length.** No real Etsy search volumes were available (keyword tool plan was insufficient); demand was marked UNVERIFIED.

## 3. Description

The first ~160 characters must contain the primary phrase, what the item is, "digital download" and the main format (Listing Standard D1).

Section order that WPW used and an audit passed:

1. **Opening** (1–2 sentences): what it is, who it's for, the primary phrase, "This printable PDF … is a digital download."
2. **What it does** (short paragraph, human voice).
3. **What's included:** exact counts of files, pages and editions, listed per file with the buyer file name. Must match the package exactly.
4. **How to print and use:** download from the purchase on Etsy.com (a browser, not the app); choose the matching A4 or Letter file; print at Actual size / 100%; write by hand (or which app, if editable).
5. **Please note:** digital download, nothing is posted; exact format (print-only PDF, not editable, not fillable, not interactive, unless it is); print results vary.
6. **Personal use / licence:** identical wording to the licence in the guide.
7. **AI line** (if AI helped), verbatim from the approved text.
8. **Help line:** one fixed sentence pointing to marketplace messages.

Also required: sizes in mm and inches (A4 210 × 297 mm; US Letter 8.5 × 11 in); what is *not* included; no £/$ figures or fixed savings in the description (non-UK and VAT-registered buyers see different totals); no guarantees, reviews or "bestseller" claims; no links, emails or website mentions; UK English; doesn't read like a keyword list.

**Refund wording lesson:** "returns aren't accepted" templates must not hide statutory rights. Prefer "if anything is wrong with your file, message me and I'll put it right" over "no refunds".

**Gift wording lesson (blind test, 23 Nov 2026):** "printable gift idea" plus a licence saying "do not give away the files or printed copies" confused a buyer. PFC's claims checker should flag gift claims that conflict with the licence text.

## 4. Attributes and category

Choose the most specific category for what the item is; set type = digital files; fill every relevant attribute (colour, occasion, holiday, subject, room, orientation). "Who made it" = I did / designed by the seller; never "handmade" for AI-assisted work.

## 5. Image set

**Target:** 5–10 truthful images at minimum; leaders use ~13 plus a video; the 19 Nov standard aimed for 15–20. "5 clear images beat 9 auto-generated ones" (SYNTHETIC). Every product pixel must come from a real render of the shipped files (hash logged).

Suggested order (merged from the template, the standard and the passing build):
1. **Main thumbnail** (see section 6)
2. **What's included:** every page type with counts, both sizes
3. Real page previews at readable crops (at least one plain, unstyled preview of actual pages)
4. Differentiator close-up (for example the UK bank-holiday page)
5. Sizes and formats chart (A4 and US Letter, finished dimensions)
6. How it works: buy → download on Etsy.com → print at 100% → use; "Digital download, nothing is posted"
7. **Owner's real photo of a filled-in printed page** (unedited apart from crop/resize, real background)
8. Guide preview (rendered from the sale build, never the review copy)
9. Optional: in-use scene, matching items (no prices), 5–15 s page-flip video

**Banned on images:** prices, £ $ %, links, emails, QR codes, discount codes, social handles, reviews, "bestseller", "sale", "free", guarantees, watermarks, review banners, placeholder labels.

**Text on images 2–20 (HOUSE):** at least 76 px tall at 3000 px wide, contrast ≥ 4.5:1, at least 100 px from every edge, ≤ 14 words per image.

**Technical:** masters 3000 × 2250 (4:3) plus a 1:1 2250 × 2250 export; sRGB JPEG, no transparency, under 1 MB for upload; all images the same shape as photo 1.

**Alt text:** one line per image describing the real content (about 100–140 characters worked). Update alt text whenever an image is re-rendered (a stale alt row cost a scorecard point).

## 6. Main thumbnail rules (tested at search-grid size)

| Rule | Value | Label |
|---|---|---|
| Size | 3000 × 2250 (4:3) and a 1:1 centre crop | HOUSE |
| Safe crop | Whole product set inside the centred square with ≥ 4% margin; key piece inside a portrait crop too | SYNTHETIC |
| Fill | Product bounding box covers 60–70% of the centred square | HOUSE |
| Contrast | Paper ≥ 20 L* lighter/darker than the background around it | HOUSE |
| Legibility | Product name readable at 250 px wide; largest product text ≥ 12 px tall at that size; ≤ 3 words in the name | SYNTHETIC |
| **Format badge** | Mandatory, for example "Printable PDF · A4 + US Letter", ≤ 8% of image area, inside the safe zone | SYNTHETIC (1 of 6 mains passed without it) |
| Distinct | No two shop thumbnails share a composition; perceptual-hash distance ≥ 10 between any two | HOUSE |
| Variants | Two variants tested in the 250 px competitor grid; owner approves the pick | HOUSE |
| Depth | Contact shadow, one light direction, slight layering | HOUSE |

What fails at ~170–250 px (SYNTHETIC, many WPW tests): thin lines vanish; long headlines clip; small logos and badges vanish or cover the product; portrait images lose labels in centre crops; four tiny pages lose to one clear product-first page; small "Specials" badges are unreadable.

Leaders (13 Nov 2026 audit, INDEX): planners lead with an iPad mockup or feature slide, worksheets with a collage of real pages under a title banner, journal pages with a flat-lay. All show real interior pages and list file types and sizes. Most fill 10–17 images and 7 of 8 had a video.

## 7. Truthfulness rules that tripped real builds

- A gallery showed only A4 in 6 of 20 scenes although both editions ship (SYNTHETIC). Captions are not proof; hash-lock every image to its source PDF.
- A "What's inside" image still showed the review banner and a placeholder photo frame from the review copy. Re-render all derived images from the sale build.
- "Printed result" photos must show an owner-made print of the exact file revision. Camera EXIF or mockups are not proof.
