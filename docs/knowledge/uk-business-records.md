# UK business, tax and consumer-law facts the app may need

Sources: WPW Master Research KB v2 §6 (23 Nov 2026; several gov.uk and legislation.gov.uk pages opened first-hand that day), WPW Common Rulebook v7.0 finance and care rules (23 Nov 2026), Launch Checklist v3 (23 Nov 2026), Ops Manual v1.0 §7.3–7.4 (20 Nov 2026).
**Not legal or tax advice.** PLAN safety rule 8 applies: the console records facts and decisions; it never certifies compliance. The owner's own registration status is deliberately not recorded here.

## 1. Records to keep (design the data model for both states)

| Situation | Minimum retention | Label | Source |
|---|---|---|---|
| Sole trader / self-assessment | At least 5 years after the 31 January submission deadline of the relevant tax year | VERIFIED-1H (23 Nov 2026) | https://www.gov.uk/self-employed-records/how-long-to-keep-your-records |
| Limited company (HMRC) | At least 6 years from the end of the last company financial year they relate to; longer if a transaction spans periods, an asset lasts over 6 years, a return was late, or HMRC has opened a check | VERIFIED-1H | https://www.gov.uk/running-a-limited-company/company-and-accounting-records |
| Limited company (Companies Act s.388) | Private company 3 years from the date made (HMRC's 6 years is longer) | VERIFIED-1H | https://www.legislation.gov.uk/ukpga/2006/46/section/388 |

**PFC impact:** default retention ≥ 6 years for cost, sales-import and approval records; never auto-delete them; keep from day one even at £0 income.

Backup lessons (VERIFIED-LOG): a spreadsheet CSV export holds only the first sheet and is not a backup of a multi-tab workbook; revision history is not a backup; backups only count once a restore has been tested (NCSC guidance). PLAN §4 item 22 already asks for a tested restore.

## 2. VAT

| Fact | Label | Source |
|---|---|---|
| A seller who is not VAT-registered must not charge UK VAT | VERIFIED-LOG | gov.uk VAT registration guidance |
| Registration threshold £90,000 taxable turnover: rolling 12 months, or expected in the next 30 days; zero-rated sales count | VERIFIED-LOG | gov.uk |
| Printables are generally standard-rated; readable ebooks and guides may be zero-rated e-publications (HMRC Notice 701/10) — decide per product | UNVERIFIED per product | HMRC VAT Notice 701/10 |
| VAT on Etsy and other platform fees is an unrecoverable cost for a non-registered seller; include it in every margin | VERIFIED-LOG | Etsy fee pages; K020 |
| Etsy may collect and remit buyer VAT on digital items; this is not seller income | VERIFIED-LOG | Etsy Help "How VAT Works on Digital Items" |
| EU buyers: sell via the marketplace only (the marketplace accounts for EU VAT on digital sales, assumed); hold direct EU website digital sales until the non-Union OSS position is sorted | ASSUMPTION | WPW finance rule F7 |

**Open conflict:** an older WPW listing standard (19 Nov 2026) set "list price = buyer price ÷ 1.2" on the assumption that Etsy adds VAT for UK buyers; later rules say "do not charge UK VAT" and use approved list prices directly. Plans & Quality should not encode either rule until the owner confirms how list price and buyer price relate on the live shop.

**PFC impact:** each product record should carry a VAT class (standard / zero-rated e-publication / unknown) logged once at pre-publish; the cost tracker should store a "seller VAT-registered?" setting that changes the margin maths; turnover should be tracked against the threshold with a warning.

## 3. Consumer law for digital downloads

| Rule | Label | Source |
|---|---|---|
| Pre-contract information: what it is, total price, that it is a digital download (nothing posted), formats, page size, page count, what is and isn't included, that it is not editable (if so) | VERIFIED-LOG | Consumer Contracts Regulations 2013 information duties; K046 |
| A trader must not begin supplying digital content within the 14-day cancellation period unless the consumer has given express consent **and** acknowledged losing the right to cancel (reg. 37) | VERIFIED-1H (23 Nov 2026) | https://www.legislation.gov.uk/uksi/2013/3134/regulation/37 |
| Own-website checkout: two separate unticked boxes (consent to immediate download; acknowledgement of losing the cancellation right), a confirmation on a durable medium (email), and no download until both are recorded. Etsy uses its own checkout | HOUSE (owner-approved wording) on CCR 2013 regs 16 and 37 | WPW rule F8 |
| Never hide Consumer Rights Act 2015 rights for digital content (satisfactory quality, fit for purpose, as described): no blanket "no refunds" | VERIFIED-LOG | CRA 2015 |
| Advertising: no misleading claims, fake urgency or fake was/now prices | UNVERIFIED this round (CAP Code not re-opened) | CAP Code |
| Treat a multi-product shop as a trader, not a private seller, from the first branded sale (marketplace "trader" field set at go-live) | ASSUMPTION | WPW rule F5 |
| Seller identity and address display is a go-live field; keep it off public drafts | ASSUMPTION | WPW rule F10 |

Website delivery lessons (VERIFIED-LOG): Stripe fulfilment must use webhooks (the redirect is unreliable and may fire twice); a storage presigned URL is a reusable bearer token, so per-order links should be short-lived (60–300 s) and checked by a server. Out of scope for PFC today (D-015), but relevant if PFC ever packages for a website channel.

## 4. Data protection

- Minimise personal data (UK GDPR): keep customer data out of shared files, prompts and AI panes (VERIFIED-LOG; WPW rule F11).
- Children's products: collect no child data or photos; the ICO Children's Code applies to online services likely to be used by children (VERIFIED-LOG, K007).
- A data-protection fee to the ICO may be due for some businesses; the self-assessment decides it (VERIFIED-1H for the fee bands on 23 Nov 2026; whether it applies is for the owner).

**PFC impact:** the sales-import feature should strip buyer names and addresses by default; the run log already must never store secrets (PLAN §4 item 23) and should not store buyer personal data either.

## 5. What the cost tracker should log per product

Price (integer minor units), listing fee (in USD and converted), transaction %, payment % + fixed fee, regulatory %, VAT on fees, Offsite Ads case (on/off, 15% or 12%), AI and tool costs, time spent, and contribution in both the "no ad" and "15% ad" cases, each with the date the fee schedule was checked and a link to a real fee invoice once available.
