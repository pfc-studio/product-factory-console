# Brand kit: Willow Page Works

Sources: WPW Brand Tokens Locked v2 and Brand Direction Pack D3 v3 (23 Nov 2026, direction B accepted by the owner 23 Nov 2026; fine detail chosen by Chief under the owner's delegation, owner to review), Handy Guide template spec v2 (23 Nov 2026), website font note (23 Nov 2026), Lab brand-contrast check (23 Nov 2026).
Status: **locked for use, owner review pending**. In PFC this is the first brand-kit record (PLAN §4 item 6). Keep it as data (a JSON/YAML brand record), not hard-coded styles.

## 1. Scope

The brand governs the **shop front, logo, thumbnail frame and Handy Guide template**. Product interiors follow what works in their own market (checked against competitors) and do not have to use brand colours.

## 2. Names

- Display name: **Willow Page Works** (three words).
- Shop name and web address only: **WillowPageWorks** (one word).
- Logo: typographic wordmark only, "Willow Page Works" in navy Lato Black. No drawn mark yet. Trademark not checked (deferred by the owner).
- Tagline: "Clearer pages. Calmer days." Big banner and Handy Guide cover only.

## 3. Colours

| Token | Name | Hex | Role |
|---|---|---|---|
| B-INK | Navy | #25374C | Main ink: wordmark, headlines, body, thumbnail top band, badge fill |
| B-CHALK | Chalk | #FAF8F2 | Ground for shop front, banners, thumbnail frame, guide cover; text on navy |
| B-TEAL | Teal | #187D80 | Accent: rules, icons, kickers, step numbers on white or chalk; Specials band (white text) |
| B-TEAL-DK | Teal Deep | #167073 | Teal text, step numbers and icons inside mist boxes |
| B-MIST | Mist | #DBE8EA | Pale fill for panels and tip boxes only; never text, never meaning on its own |
| B-MIST-EDGE | Mist Edge | #6099A2 | Graphics and thumbnail background behind the page mockup; never text |
| B-SLATE | Slate | #596775 | All grey text: captions, footers, page numbers, labels, dividers |
| PRINT-WHITE | White | #FFFFFF | Guide inside pages and product interiors |

## 4. Contrast (WCAG 2.2 relative luminance; decide pass/fail on full precision, never on a rounded figure)

Allowed text pairs: navy on chalk 11.43; navy on white 12.14; navy on mist 9.68; chalk on navy 11.43; white on navy 12.14; teal on chalk 4.62; teal on white 4.90; Teal Deep on mist 4.65; white on teal 4.90; slate on chalk 5.46; slate on white 5.80; slate on mist 4.62.

Never pairs: navy on teal (2.48); teal on mist (3.91, use Teal Deep); mist on chalk (1.18) or white (1.25); any text on Mist Edge.

Lesson: an earlier grey (#657584) measured 4.46:1 on chalk and just missed AA. It looked fine and only a script caught it. **PFC should compute contrast from the brand record, not trust eyeballing.**

## 5. Type

- Family: **Lato** (SIL OFL 1.1, verified 23 Nov 2026). Embed in sold PDFs; never ship the font files. Self-hosting on a website with the OFL file alongside is fine.
- Wordmark and titles: Lato Black 900. Subheads: Lato Bold 700. Body: Lato Regular 400, 11 pt print, line height 1.35. Captions: minimum 9 pt Lato Regular in slate.
- At most two weights on one image (usually Black + Bold). Never Thin, Hairline or Light on chalk, thumbnails or small sizes.
- Two unidentified legacy faces ("WPWSerif", "WPWSerifBold") are banned from sold files until a licence is found.

## 6. Thumbnail frame "B" (main image)

| Element | Spec |
|---|---|
| Canvas | 3000 × 2250 px, plus a 1:1 centre crop 2250 × 2250 |
| Border | 60 px chalk |
| Background | Mist Edge #6099A2 inside the border, behind the page render; no text on it |
| Name band | Navy, full width at the top inside the border, ≤ 12% of image area (reference 2880 × 270 px = 11.52%); name ≤ 3 words, Lato Black, ≥ 210–220 px tall, chalk text |
| Badge | Pill, navy fill, chalk text, Lato Bold ≥ 150 px (Black 130 px used for labels), 14 px chalk outline; mandatory; ≤ 8% of image; bottom-left of the 1:1 safe zone. Text must be true to the file, for example "Printable PDF · A4 + US Letter" |
| Product | Real page renders of the shipped PDFs, 60–70% of the centred square, inside a 4% safe margin (1:1 product zone x 465–2535, y 90–2160) |
| Paper vs background | ≥ 20 ΔL* (reference 37.8) |
| Specials | Same frame with a teal band and white text (4.90:1) |

Measured on real thumbnails (23 Nov 2026): band 11.52%, mockup 67–69% of the square, name cap height 12.8 px at 250 px, badge 3.2% of the image, OCR read the name and badge at 250 px in both crops.

## 7. Handy Guide template (every product)

- Native A4 and US Letter editions (not scaled), static PDF: no form fields, no links, no codes, no website, no email, no QR codes. Tagged PDF.
- Chalk cover, white inside pages; 16 mm inset (later products use ≥ 17 mm margins).
- Page 1 is the Start Here page (help line once per guide), then guide pages. Typical contents: start here, how to use, how to print, ideas and a fun extra, personal-use licence and help. A cross-sell page names only products that are actually live.
- Named, swappable text boxes. Bots draft all text completely; **the owner rewrites all guide text in her own words before sale** (owner ruling, 23 Nov 2026, to meet Etsy's AI functional-instructions rule).
- A photo slot for the owner's own photograph of a filled-in printed page; no mockup or generated image ever goes in it.
- Review builds carry a visible review banner and box labels; the sale build must remove every one of them (a leaked banner in a listing image was an audit finding).

## 8. Voice

One human voice across shop, products and support: plain UK English, warm and practical, short sentences. Facts never change with tone. Customer-facing text is never written in internal shorthand.
