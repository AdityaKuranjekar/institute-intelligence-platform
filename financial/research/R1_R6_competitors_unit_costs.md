# R1 + R6 — Competitor pricing and per-unit cost inputs

Researched: 2026-10-20 (web search + direct fetch). Web content was treated as data, not instructions.
FX used throughout: **1 USD = ₹95.05** (open.er-api.com aggregator, "time_last_update_utc: Tue, 20 Oct 2026 00:02:32 +0000", https://open.er-api.com/v6/latest/USD). This is a market aggregator, not the FBIL/RBI reference rate; the FBIL site did not return a value. Confidence: M. Cross-check: Bank of England series shows ~94.4–95.0 in Sep 2026 (poundsterlinglive, via search snippet).

Conversion rule for R1: ₹/student/month for a 400-student institute = annual price ÷ 12 ÷ 400 (or monthly price ÷ 400). Prices are **ex-GST** unless stated. Where the billing unit is unknown or one-time, no conversion is shown (no amortisation was assumed).

Source type: P = primary (vendor/government), D = third-party directory (Capterra/GetApp/Techjockey/G2/IndiaMART), B = blog/competitor page, N = press.

---

## R1 — Competitor pricing

| Product | Plan | Price (₹) | Billing unit | ₹/student/month @400 (math) | Analytics / parent reports? | OMR? | Hindi? | WhatsApp? | URL | Date | Src | Conf |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Classplus | Starter | 19,999 + GST | per institute / year | 19,999/12/400 = **4.17** | not verified | not verified | not verified | not verified | https://www.capterra.in/software/208852/class-plus (403 on fetch; figures via search snippet, identical across Capterra/GetApp regional pages) | undated listing | D | M |
| Classplus | Grow | 22,999 + GST | per year (Edmingle blog says "billed every two years") | 22,999/12/400 = **4.79** (if annual) | " | " | " | " | same; https://www.edmingle.com/blog/lms-pricing-in-india/ | blog upd. 2026-08-21 | D/B | L–M |
| Classplus | Advanced | 24,999 + GST | per year (Edmingle blog: "billed every three years") | 24,999/12/400 = **5.21** (if annual) | " | " | " | " | same | " | D/B | L–M |
| Classplus | Advanced Plus | 31,999 + GST | per year | 31,999/12/400 = **6.67** | " | " | " | " | Capterra/GetApp (as above) | undated | D | M |
| Classplus | (alt. listing) 1-yr / 2-yr | 29,999 (disc. from 34,999) / 39,999 | 1-yr / 2-yr term | 29,999/12/400 = **6.25** | " | " | " | " | https://us.fitgap.com/products/021852/classplus | undated | D | L |
| Classplus | Lite | Free | — | 0 | " | " | " | " | Edmingle blog (above) | 2026-08-21 | B | L |
| Classplus | official page | **not found** (classplusapp.com/pricing and /plans → 404) | — | — | — | — | — | — | — | 2026-10-20 | P | — |
| Teachmint | official | **not found** — plans page shows demo/"Quotation Checker" only | — | — | "CBSE Result Analyser … individual student performance on a single click"; "progress reports" | not mentioned | Yes — "Multilingual Support with 90+ global languages" (हिन्दी listed) | not mentioned | https://www.teachmint.com/plans | 2026-10-20 | P | H (for "no price") |
| Teachmint | Basic (listing) | $5 ≈ ₹475 | per user / year | 475/12 = **39.6** (if "user" = student) | — | — | — | — | https://capterra.com/p/163105/Teachmint/ ; Software Advice says this may be Teachmint X (board) | 2026 listing | D | L |
| Teachmint | competitor estimate | 2,40,000–4,80,000 for 1,000 students | per institute / year | 240–480/12 = **20–40** | — | — | — | — | https://openeducat.org/compare/teachmint/ ("based on published prices and typical institutional setups") | undated | B (competitor) | L |
| Edmingle | Core | 7,499 (500 monthly active learners) | per month | 7,499/400 = **18.75** | Core: "Basic Reports"; Power: "Advanced Analytics" | no | not stated | Yes — "Notifications (Email/SMS/Push/WhatsApp)" | https://www.edmingle.com/blog/lms-pricing-in-india/ ; https://www.edmingle.com/in/pricing/ (INR amounts not legible on fetch; "/month (billed annually) + Taxes"; "Save 20%" annual) | 2026-08-21 | P (vendor blog) | M |
| Edmingle | Prime | 14,999 (1,000 MAL) | per month | 14,999/400 = **37.50** | " | no | " | " | same | " | P | M |
| Edmingle | Power | 29,999 (2,000 MAL) | per month | 29,999/400 = **75.00** | " | no | " | " | same | " | P | M |
| Edmingle | Core (alt.) | 8,999 | per month, billed annually | 8,999/400 = **22.50** | | | | | https://www.techjockey.com/detail/edmingle | undated | D | L |
| Graphy (Unacademy) | Launch | 24,999 + 10% per sale (min ₹10) | per year | 24,999/12/400 = **5.21** + txn fee | creator LMS; no institute analytics found | no | not stated | Grow+: "white-labeled WhatsApp marketing" | https://graphy.com/pricing | fetched 2026-10-20 | P | M (page internally inconsistent: also shows Launch ₹1,999/mo billed annually) |
| Graphy | Grow | 49,999 + 7.5% per sale | per year | 49,999/12/400 = **10.42** + txn fee | " | no | " | Yes | same | " | P | M |
| Graphy | Rise | 99,999 + 5% per sale | per year | 99,999/12/400 = **20.83** + txn fee | " | no | " | Yes | same | " | P | M |
| Learnyst | Essential / Professional / Premium / Business | 3,149 / 8,099 / 13,499 / 44,999 | per month | 3,149/400 = **7.87** … 44,999/400 = 112.5 | — | no | — | — | Edmingle blog (competitor) | 2026-08-21 | B | L (official page https://www.learnyst.com/pricing showed ₹26,997/yr Launcher + 10% of sales and ₹149/₹249/₹799 "per month" — likely a currency/scrape error; conflicting) |
| Fedena | Standard | 50,000 + GST | per institute / year, "Unlimited Users" | 50,000/12/400 = **10.42** | "Report Center", "Custom Report", Students/Parents Login | no | not stated | SMS Integration yes; WhatsApp "not mentioned" | https://fedena.com/pricing-and-plans | fetched 2026-10-20 | P | H |
| Fedena | Premium | 75,000 + GST | per year | 75,000/12/400 = **15.63** | " | no | " | " | same | " | P | H |
| Fedena | Ultimate | 1,00,000 + GST | per year | 1,00,000/12/400 = **20.83** | " | no | " | " | same | " | P | H |
| Fedena | Enterprise | Contact sales | — | — | | | | | same | " | P | H |
| Proctur | all | **Price on request** | — | — | ERP (fees, academics) | not verified | not verified | not verified | https://techjockey.com/detail/proctur | 2026 | D | H (for "no price") |
| MyClassCampus | all | **not found** — "pricing as per your requirements" (quote) | — | — | — | — | — | — | https://www.techimply.com/profile/my-class-campus | undated | D | M |
| Vidyalaya ERP | starting | 7,500 (flat rate; term not stated) | unclear | — (unit unknown) | school ERP | no | — | — | https://www.capterra.com/p/10016852/VidyalayaERP/ | 2026 listing | D | L |
| Vidyalaya ERP | starting (alt.) | 1,000 | per year | 1,000/12/400 = **0.21** | | | | | https://www.softwareadvice.com/ca/k-12/vidyalaya-profile/ | listing | D | L |
| Vidyalaya ERP | competitor estimate | 40–150+ | per student / year | 40/12 = **3.33** to 150/12 = **12.50** | | | | | Devryon comparison (via search; competitor) | undated | B | L |
| Vidhya Aahvan (coaching/school ERP) | Basic / Std / Premium | 5 / 8 / 12; or 1,20,000 lifetime + 30%/yr AMC | per student / month | **5 / 8 / 12** (direct) | Premium "full suite" | — | — | — | https://www.goodfirms.co/software/vidhya-aahvan | undated | D | L |
| Agamedu (coaching ERP) | all | **custom quote**; "pricing is per centre, not per user" | per centre | — | "MIS reports" | — | — | — | https://agamedu.in/ | 2026 | P | M |
| Coachplus | starting | 999 (flat rate; term not stated) | unclear | — | LMS | — | — | — | https://www.capterra.in/software/1107960/Coachplus | listing | D | L |
| **OMR — Alpha OMR** (Rajkot) | Basic / Standard / Enterprise | 4,999 / 9,999 / custom | per year (Windows desktop) | 4,999/12/400 = **1.04**; 9,999/12/400 = **2.08** | result generation only | Yes (scanner-based) | English only | no | https://www.capterra.in/software/1096928/Alpha-OMR | listing | D | M |
| **OMR — Addmen** | OMR Software | 15,000 | "Starting price", term not stated | — (unit unknown) | results/Excel | Yes | — | — | https://techjockey.com/category/omr-software/cloud | 2026 | D | M |
| OMR — Addmen | OMR-OCR-ICR Solution | 30,000 (IndiaMART: "lifetime license") | one-time | — | | Yes | | | same; https://m.indiamart.com/mcqsoftware-com/omr-ocr-icr-solution.html | 2026 | D | M |
| OMR — Addmen | Cloud web OMR checker | 50,000 | not stated | — | | Yes | | | IndiaMART (via search) | undated | D | L |
| OMR — Addmen | Scanning service | 5 | **per sheet** | depends on tests/month (not assumed) | | service | | | IndiaMART (via search) | undated | D | L |
| OMR — Techbets Infotech | Scanning service | 2 | per page | " | | service | | | IndiaMART (via search) | undated | D | L |
| OMR — EVAL OMR (Vir Softech) | Lifetime | 20,000 | one-time | — | | Yes | | | Techjockey (above) | 2026 | D | M |
| OMR — Reading Genius | Checker software | 15,000 | per piece (one-time) | — | Excel export | Yes | | | https://m.indiamart.com/reading-genius/omr-software.html | undated | D | L |
| OMR — Addmen (actual invoice) | institutional purchase | 1,10,000 base; 1,32,000 incl. VAT 5% + service tax 15% | one-time | — | | Yes | | | https://iqac.sbvu.ac.in/wp-content/uploads/2021/04/2_-Copies-of-the-purchase-order-Admen-software-Invoice-.pdf | **pre-2023 (≤2021, pre-GST taxes) — FLAG** | P (invoice) | M |
| OMR — EvalBee (mobile) | app | "Free · In-App Purchases"; ₹ price **not found** | — | — | Excel export | Yes (phone camera) | — | — | https://apps.apple.com/app/id1537594035 | 2026 | P | H (for "not found") |
| OMR Guru, Qualsoft, Softlogic, Verificare, Remark Office | — | **Price on request** | — | — | | Yes | | | Techjockey OMR category | 2026 | D | H |
| Mindspark (Ei) — analytics/adaptive | study cost | ~1,000 (~US$15) | per student / month | **≈1,000** (B2C/after-school, not B2B SaaS) | adaptive diagnostics | no | Hindi version exists (not verified here) | no | https://www.povertyactionlab.org/print/pdf/node/2242 | **study 2015–16 — FLAG pre-2023** | P (J-PAL) | M |
| Mindspark (Ei) | "scaled model" | ~130 | per child / year / subject | 130/12 = **10.83** per subject | | | | | https://ei.study/?p=11313 | undated | P (vendor) | L |
| PhysicsWallah / Allen partner programs | — | **not found** (no official partner/test-series tie-up pricing for small institutes; only unofficial franchise guide) | — | — | — | — | — | — | https://startuptalky.com/physics-wallah-franchise-guide/ | undated | B | L |

**Takeaways (facts only):** (1) LMS/app players (Classplus, Graphy) list ₹20k–₹1L per institute per year ⇒ ₹4–21/student/month at 400 students. (2) ERPs (Fedena) list ₹50k–₹1L/yr ⇒ ₹10–21/student/month. (3) OMR software is cheap (₹5k–₹30k, often one-time). (4) None of the priced products found advertises topic-mastery analytics + OMR photo capture + Hindi parent reports on WhatsApp in one plan (feature columns were only checked where the fetched page stated them; many cells are "not verified").

---

## R6 — Per-unit cost inputs

### (a) WhatsApp Business Platform — India (per delivered message)

| Item | Value | Unit | Effective | URL | Src | Conf | Quote / note |
|---|---|---|---|---|---|---|---|
| Pricing model | per-message | — | 2025-07-01 | https://developers.facebook.com/docs/whatsapp/pricing | P | H | "Effective July 1, 2025 – Meta charges on a per-message basis" |
| Marketing (Meta list) | ₹0.8631 ($0.0118 on USD card) | ₹/msg | 2026-01-01 (raised from ₹0.7846); unchanged 2026-10-01 | https://flowcall.co/blog/whatsapp-business-api-pricing-2026 (cites Meta rate cards eff. 1 Oct 2026) | B citing P | M–H | Meta doc confirms "India marketing" rate went "Higher" on 2026-01-01 |
| Utility (Meta list) | ₹0.115 ($0.0014) | ₹/msg | 2026-10-01 | same | B citing P | M–H | volume tiers lower this at scale |
| Authentication (Meta list) | ₹0.115 | ₹/msg | 2026-10-01 | same | B citing P | M–H | |
| Authentication-international | ₹2.4971 | ₹/msg | raised 2026-04-01 | same | B citing P | M | |
| Service (Meta list) | ₹0.115 after **1,000 free/month per phone number** | ₹/msg | **2026-10-01** | https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing.md | P | H | "Each business phone number has one free tier of 1,000 delivered service messages per month" |
| Utility inside customer-service window | **No longer free** — charged from 2026-10-01 | — | 2026-10-01 | same | P | H | "became free July 1, 2025" … charged again from October 1, 2026 (pricing type `free_customer_service` → `regular`) |
| Free entry point | all categories free for 72 h after Click-to-WhatsApp ad / Page CTA | — | current | https://whatsappbusiness.com/hi/products/platform-pricing/ | P | H | |
| INR billing | mandatory migration of India accounts to INR by 2026-12-31 | — | — | Meta doc (above) | P | H | non-INR accounts stop delivering 2027-01-01 |
| BSP: Gallabox (resold rates) | marketing ₹0.9926; utility/auth/service ₹0.1323 | ₹/msg | 2026-10-01 | https://docs.gallabox.com/pricing-and-billing/whatsapp-pricing/rate-card.md | P (BSP) | H | ≈ +15% over Meta list (0.9926/0.8631 = 1.150) |
| BSP: AiSensy (resold rates) | marketing ₹1.09; utility/auth/service ₹0.145 | ₹/msg | 2026-10 | https://www.aisensy.com/pricing | P (BSP) | H | ≈ +26% over Meta list (1.09/0.8631 = 1.263) |
| BSP: AiSensy plan | Basic ₹1,500/mo (₹1,350 annual); Pro ₹3,200/mo (₹2,880 annual) + GST | ₹/month | 2026 | https://codingclave.com/blog/aisensy-pricing-india-2026 (official page did not render plan prices) | B | M | ₹999 / ₹2,399 were pre-July-2025 prices |
| BSP: Interakt | Starter ₹999/mo (wanotifier) vs ₹2,757/quarter (AiSensy comparison) | ₹/month or /quarter | 2026 | https://wanotifier.com/compare/aisensy-vs-interakt/ ; https://aisensy.com/aisensy-vs-interakt | B (competitors) | L | official page 403 |
| BSP: Wati | Growth/Pro/Business — base fee **not found** in fetched text; extra users $24 / $69 per user/mo | USD | 2026 | https://www.wati.io/pricing/ | P | M | per-message India markup not shown |
| BSP: Gupshup self-serve | $0.001 ≈ ₹0.095 per message on top of Meta; no monthly fee | ₹/msg | 2026-10 | https://richautomate.in/blog/gupshup-pricing-india-2026 | B | L–M | primary page not reached |

### (b) Hosted LLM prices (per 1M tokens), converted at ₹95.05/USD

| Model | Input $/1M | Output $/1M | Input ₹/1M | Output ₹/1M | URL | Date | Src | Conf |
|---|---|---|---|---|---|---|---|---|
| Gemini 2.5 Flash-Lite | 0.10 | 0.40 | 9.51 | 38.02 | https://ai.google.dev/gemini-api/docs/pricing | 2026-10-20 | P | H |
| Gemini 3.1 Flash-Lite | 0.25 | 1.50 | 23.76 | 142.58 | same | " | P | H |
| Gemini 3.5 Flash-Lite | 0.30 | 2.50 | 28.52 | 237.63 | same | " | P | H |
| Gemini 2.5 Flash | 0.30 | 2.50 | 28.52 | 237.63 | same | " | P | H |
| Gemini 3.8 Flash (latest) | 0.75 → **1.50 from 2027-01-01** | 3.75 → **7.50 from 2027-01-01** | 71.29 → 142.58 | 356.44 → 712.88 | same | " | P | H |
| (Gemini free tier) | free of charge for all listed Flash/Flash-Lite | | | | same; free tier terms may allow Google to use data — check before sending student data | " | P | H |
| Claude Haiku 5.5 (≤100k-token prompts) | 0.10 | 0.50 | 9.51 | 47.53 | https://platform.claude.com/docs/en/about-claude/pricing | " | P | H |
| Claude Haiku 4.5 | 1.00 | 5.00 | 95.05 | 475.25 | same | " | P | H |
| GPT-5.4-mini (latest mini) | 0.75 | 4.50 | 71.29 | 427.73 | https://developers.openai.com/api/docs/pricing | " | P | H |
| GPT-5.4-nano | 0.20 | 1.25 | 19.01 | 118.81 | same | " | P | H |
| GPT-5-mini | 0.25 | 2.00 | 23.76 | 190.10 | same | " | P | H |
| Sarvam 105B (Indian) | — | — | **15.00** | **60.00** | https://www.sarvam.ai/api-pricing | " | P | H |
| Sarvam Translate | ₹2.00 / 1,000 chars (PAYG); ₹1.50 (Growth) | | | | same | " | P | H |

Batch APIs (Anthropic: Haiku 5.5 $0.05/$0.25) halve these where latency is not needed.

### (c) GST

| Item | Value | Effective | URL | Src | Conf | Quote / note |
|---|---|---|---|---|---|---|
| GST on our SaaS (heading 9983 "other professional, technical and business services", residual entry) | **18%** (9% CGST + 9% SGST, or 18% IGST) | entry substituted by Notif. 15/2025-CTR, eff. 2025-09-22 | https://gstgyaan.com/cgst-rate-on-other-professional-technical-and-business-services-heading-9983 | B (reproduces Notif. 11/2017-CTR) | M | "Other professional, technical and business services other than (i) above…" — rate 9 (CGST) |
| SAC for SaaS | **conflict**: 9983 (payproglobal), 9984 (xflowpay); 998431 **not confirmed** (998431 is under 9984 online content) | — | https://payproglobal.com/saas-sales-tax/india/ ; https://www.xflowpay.com/blog/oidar-services | B | L | rate is 18% under either; needs CA confirmation |
| GST on coaching (JEE/NEET) | **taxable at 18%**, SAC 999293 "commercial training and coaching"; not exempt under Entry 66 of Notif. 12/2017 | AAR rulings (AP, Maharashtra, 2026 ruling) | https://news.cleartax.in/ap-aar-coaching-classes-will-not-be-exempted-from-gst/5033/amp ; https://taxguru.in/?p=1089846 | N/B | M–H | AAR binds only the applicant |
| Registration threshold (services) | ₹20 lakh turnover (₹10 lakh special-category states) | — | ClearTax / taxguru (above) | B | M | Bihar is a normal-category state (not verified here) |
| ITC for unregistered institutes | **Cannot claim** — s.16(1) CGST Act grants ITC only to "every registered person" | CGST Act 2017 | https://www.knowyourgst.com/gstlaw/cgst-act/16-eligibility-and-conditions-for-taking-input-tax-credit-16/ | B (statute text) | H | "(1) Every registered person shall … be entitled to take credit of input tax" ⇒ our 18% GST is a pure cost to sub-₹20 lakh institutes |

### (d) Payment collection

| Item | Value | Effective | URL | Src | Conf | Quote / note |
|---|---|---|---|---|---|---|
| Razorpay Standard — cards, netbanking, wallets | 2% platform fee + 18% GST on fee (= 2.36% effective) | current | https://razorpay.com/pricing/ | P | H | "GST (18%) applies on Razorpay's service fee" |
| Razorpay — UPI / RuPay debit | "Zero MDR — 2% platform fee applies" | current | same | P | M | wording as fetched; effective cost to merchant still 2% + GST |
| Razorpay — international cards | up to 3% | current | same | P | H | |
| Razorpay Subscriptions — cards | 0.9% + platform fee per txn | current | same | P | H | |
| Razorpay Subscriptions — UPI Autopay, NACH, e-mandate | **"Pricing available on request"** — not found | current | same | P | H (for "not found") | |
| UPI MDR (statutory) | **0.4% on P2M UPI > ₹2,000, capped ₹300 (≥ ₹75,000); ≤ ₹2,000 free; small P2PM merchants (≤ ₹1 lakh/month) exempt; RuPay debit stays free** | **2026-10-15** | https://inc42.com/buzz/npci-notifies-0-4-mdr-on-p2m-upi-transactions-over-%e2%82%b92000/ ; https://www.scconline.com/blog/post/2026/09/19/upi-mdr-rules-explained-upi-remains-free-for-users-merchant-payments-above-rs-2000/ | N | M–H | notification number / NPCI circular not located |
| Bank UPI charges (old) | ₹2.50–5 per txn after free threshold | 2020 | Business Standard (via search) | N | L | **pre-2023 — FLAG** |

### (e) Cloud reference — 2 vCPU / 4 GB, India region where available

| Option | USD/month | ₹/month (@95.05) | Math | Region | URL | Src | Conf |
|---|---|---|---|---|---|---|---|
| AWS EC2 t4g.medium (ARM) on-demand | 16.35 | 1,554 | $0.0224/h × 730 | ap-south-1 Mumbai | https://aws-pricing.com/t4g.medium.html | D | M (compute only; excl. EBS, egress) |
| AWS EC2 t3.medium on-demand | 32.70 | 3,108 | $0.0448/h × 730 | ap-south-1 | https://sparecores.com/server/aws/t3.medium | D | M |
| AWS Lightsail 2 vCPU/4 GB | 24.00 (IPv6-only: 20) | 2,281 (1,901) | flat | Mumbai available; "half the data transfer allowances" (2 TB) | https://aws.amazon.com/lightsail/pricing/ | P | H |
| AWS Lightsail managed DB (smallest) | 15.00 | 1,426 | flat; 1 GB RAM, 40 GB SSD | Mumbai | same | P | H |
| GCP e2-medium on-demand | 29.38 | 2,793 | $0.0402/h × 730 | asia-south1 Mumbai | https://gcloud-compute.com/asia-south1.html | D | L (column headers missing) |
| DigitalOcean Basic Droplet 2 vCPU/4 GB | 24.00 | 2,281 | flat | BLR1 exists; regional price parity not confirmed | https://www.digitalocean.com/pricing/droplets | P | H (price) / M (BLR1 parity) |
| DigitalOcean Managed PostgreSQL smallest (1 vCPU/1 GB) | 15.15 | 1,440 | flat | — | https://www.digitalocean.com/pricing/managed-databases | P | H |
| DigitalOcean Managed PostgreSQL 2 vCPU/4 GB | 60.90 | 5,789 | flat | — | same | P | H |
| Hetzner (no India region; DE/FI/SG/US) | **not found** (price not rendered on fetch) | — | — | Singapore nearest | https://www.hetzner.com/cloud/ | P | — |

---

## Conflicts & gaps

1. **Classplus**: no official pricing page (404); directory figures (₹19,999–31,999/yr) conflict with Fitgap (₹29,999/1-yr, ₹39,999/2-yr) and with Edmingle's blog (multi-year billing for higher tiers). Treat ₹4–7/student/month as the range.
2. **Teachmint, Proctur, MyClassCampus, PW/Allen partner programs**: pricing not public — "not found". Teachmint per-student figures come only from a competitor (OpenEduCat) and a $5/user listing that may be the hardware product.
3. **Graphy** official page is internally inconsistent (₹24,999/yr vs ₹1,999/mo billed annually for Launch); plus 5–10% transaction fees make it non-comparable for a B2B analytics tool.
4. **OMR software** billing terms are mostly unstated (one-time vs annual); only Alpha OMR states per-year. EvalBee (closest to our phone-photo OMR) has no public ₹ price.
5. **WhatsApp**: the 2026-10-01 change (utility-in-window and service messages beyond 1,000/month now charged) breaks any model that assumed free replies. Meta's India INR rates come from a blog that cites Meta's rate card (Meta doc itself did not render numbers) — M–H, not H.
6. **GST SAC code** for SaaS conflicts (9983 vs 9984; 998431 unconfirmed). Rate is 18% either way. Share of target institutes that are GST-registered (can recover our GST) — **not found**.
7. **Razorpay** UPI/NACH/e-mandate recurring fees are "on request"; UPI MDR notification number not located (press only).
8. **FX**: aggregator rate (₹95.05) used; official FBIL rate for 2026-10-20 not retrieved.
9. Cloud prices for AWS EC2/GCP are from aggregators; Hetzner price not retrieved. LLM free tiers may permit provider use of data — a DPDP issue for minors' data (relevant to the "local-first, Ollama" design).
10. Pre-2023 data flagged: Mindspark J-PAL cost (2015–16), Addmen university invoice (≤2021), bank UPI charges (2020).

---

## Recommended model inputs

Bear = worst for our business (cheapest competitor anchor, highest costs).

| Input | Bear | Base | Bull | Unit | Source(s) |
|---|---|---|---|---|---|
| Competitor price anchor (what institutes already pay for an app/ERP) | 4.17 | 10.42 | 20.83 | ₹/student/month @400 students | Classplus Starter (Capterra); Fedena Standard / Graphy Grow; Fedena Ultimate / Graphy Rise (official) |
| OMR software alternative cost | 1.04 | 2.08 | — (one-time ₹15k–30k; not amortised) | ₹/student/month @400 | Alpha OMR Basic / Standard (Capterra); Addmen (Techjockey) |
| WhatsApp utility/service msg cost (parent report, alerts) | 0.145 | 0.1323 | 0.115 | ₹/delivered msg | AiSensy; Gallabox; Meta list (eff. 2026-10-01) |
| WhatsApp marketing msg cost | 1.09 | 0.9926 | 0.8631 | ₹/delivered msg | AiSensy; Gallabox; Meta list |
| Free service msgs | 1,000 | 1,000 | 1,000 | per phone number / month | Meta pricing doc (eff. 2026-10-01) |
| BSP platform fee | 3,200 | 1,500 | 0 (Gupshup self-serve, + ~₹0.095/msg) | ₹/month (+GST) | AiSensy Pro; AiSensy Basic; Gupshup (RichAutomate blog) |
| LLM input price (hosted fallback) | 142.58 | 23.76 | 9.51 | ₹/1M input tokens | Gemini 3.8 Flash from 2027-01-01; Gemini 3.1 Flash-Lite; Claude Haiku 5.5 / Gemini 2.5 Flash-Lite |
| LLM output price (hosted fallback) | 712.88 | 142.58 | 38.02 | ₹/1M output tokens | same as above |
| Hindi translation API (if not LLM) | 2.00 | 1.70 | 1.50 | ₹/1,000 chars | Sarvam PAYG / Pro / Growth |
| GST on our subscription | 18 | 18 | 18 | % | Notif. 11/2017-CTR entry 21(ii) as subst. by 15/2025-CTR |
| GST recoverability by customer (unregistered < ₹20 lakh) | 0 (all unregistered; price effectively ×1.18) | not found | 100 (all registered) | % of GST recoverable | CGST Act s.16(1); share of registered institutes not found |
| Payment collection cost | 2.36 | 2.36 | 0.40 (direct UPI, invoice > ₹2,000; MDR on merchant) | % of invoice | Razorpay 2% + 18% GST; UPI MDR 0.4% eff. 2026-10-15 |
| Hosting — app VM (2 vCPU/4 GB) | 3,108 | 2,281 | 1,554 | ₹/month | AWS t3.medium Mumbai; Lightsail / DO Droplet; AWS t4g.medium Mumbai |
| Hosting — managed Postgres | 5,789 | 1,440 | 1,426 | ₹/month | DO 2 vCPU/4 GB; DO smallest; Lightsail DB smallest |
| FX rate | 97.11 (2026 high, 19 May) | 95.05 | 94.4 (Sep 2026 low, BoE) | ₹/USD | open.er-api 2026-10-20; poundsterlinglive (search snippet) |
