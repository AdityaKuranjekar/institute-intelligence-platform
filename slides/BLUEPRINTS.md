# AlphaQ Round 1 deck: slide-by-slide blueprints

Read `DESIGN_SYSTEM.md` first (tokens, components, skeletons S1-S5). Positions use the 12-column grid (cols 1-12, content zone y 1.85-6.75 in). Every number carries an origin tag: **Public**, **Synthetic**, **Model output** (finance), **Illustrative mock-up**.
Content rules: nothing here invents a claim. Numbers come from `SLIDES_BRIEF.md` §3 (verified), `financial/README.md` §3 (workbook cells) or are marked PENDING and must stay out of the deck until `python technical/scripts/deck_numbers.py` shows them.
Deck = Title + 12 content slides + Appendix (A1-A6) + **final slide: AI-use disclosure and citations** (PS Rule 2). Round 1 PDF limit: 12 content slides plus title and appendix. File: `AlphaQ_CaseB_Round1.pdf`.
Mock-ups M1-M10 are specified in `MOCKUPS_PLAN.md`.

---
## Title (dark slide)
- Navy background. Left (cols 1-7): eyebrow "CASE B · THE DATA MOAT", title 36 pt white "AlphaQ: intelligence for the coaching institutes that run on Excel, OMR sheets and WhatsApp", subline 16 pt: "From one upload to a topic map, a weekly support list and a verified Hindi/English parent report. Offline, private, free to run."
- Right (cols 8-12): M2 desktop frame (support-list screen, tilted 0), tag "Illustrative mock-up".
- Bottom-left: AlphaQ logo (white version) + "Round 1 · Nextute × Finance Club IIT Patna". No team member names unless the organisers ask.

## 1. THE PROBLEM (skeleton S1)
- Eyebrow: THE PROBLEM. Title: "Institutes hold the data, but notice a struggling student only after they leave".
- Row of 4 value cards (3 cols each; icon + one sentence):
  1. Teachers: "Do not know which topics each student is weak in until it is too late."
  2. Owners: "Cannot tell which batches or teaching methods actually work."
  3. Parents: "See a marks list and little else, so trust suffers."
  4. Students: "Are noticed only after they stop paying or stop coming."
- Body left (cols 1-7): comparison "Where the data lives today": three small tiles (Paper OMR sheets · Excel and registers · WhatsApp groups) with arrows into a grey "scattered, inconsistent" bar (icon-led, 10 words).
- Body right (cols 8-12): KPI stack: "8-15 %" mid-session dropout or fee default (label "PS baseline, illustrative"), "₹36,000" fees lost per dropout at month 4 (label "PS worked example").
- Constraint chips along the bottom: Price-sensitive owners · Low-tech staff · Patchy internet · Most students are minors.
- Source line: Participant Guide §2, §6, §7.

## 2. OUR SOLUTION (S1)
- Eyebrow: OUR SOLUTION. Title: "One upload turns marks sheets into a topic map, a support list and a parent report".
- Top: 4-step flow, step cards (Teal-tint, numbered): 1 Capture (Excel, CSV, OMR photo) → 2 Understand (topic mastery, question difficulty) → 3 Act (weekly support list with reasons) → 4 Share (Hindi/English parent report).
- Body: four mock-ups aligned under the steps: M1 upload and column-mapping screen, M3 topic heatmap, M2 support list, M5 parent report on a phone frame. All tagged "Illustrative mock-up" until replaced by prototype screenshots.
- Bottom strip chips: Works offline on one laptop · Hindi and English · No paid APIs · Built for the DPDP Act and MoE coaching guidelines.

## 3. DATA CAPTURE AND ARCHITECTURE (S2 split)
- Eyebrow: CAPTURE AND ARCHITECTURE. Title: "Staff upload what they already have; the system cleans up the mess".
- Left (cols 1-7): architecture diagram (M9): Sources (Excel/CSV, OMR photo, Forms/WhatsApp as designed) → Ingestion (column mapper, OMR reader, row-error preview) → PostgreSQL with one-institute-per-row isolation → Models (difficulty, mastery, risk, range) → Web app (owner, teacher, parent). Status tags on each box: BUILT / DESIGNED.
- Right (cols 8-12), 3 stacked cards:
  - "Excel and CSV": finds the header row, understands English, Hinglish and Devanagari column names, shows each row error before saving. Chip: "12 messy export files tested (Synthetic)".
  - "OMR photo": four corner marks and a QR code identify the test; uncertain bubbles are shown for a one-tap fix.
  - "Built to be cheap and safe": one institute cannot read another's rows (verified on PostgreSQL 16, **Synthetic** test); runs offline on a laptop; infra + AI cost per student per month: take the exact figure from the workbook COGS_Build sheet (plan range ₹3-10; **Model output**; PENDING until read from the sheet).
- Honesty line (bottom, Muted): "Prototype status: Excel/CSV and the data model exist; the OMR reader and web screens are in build. Google Forms and WhatsApp are designed, not built."
- Sources: `technical/contracts/schema.sql`, `datagen` messy exports, `financial/` COGS_Build.

## 4. LEARNING ANALYTICS (S2 split)
- Eyebrow: LEARNING ANALYTICS. Title: "We estimate what each student knows, topic by topic, and say how sure we are".
- Left (cols 1-6): M3 heatmap (students x topics, teal shades; the legend reads not enough data / building / steady / strong). Callout 1 on a batch-wide weak column: "Whole batch low on this topic: probably not taught yet, not student weakness".
- Right (cols 7-12): 3 cards:
  - "Question difficulty with error bars": calibrated difficulty per question; a question the best students get wrong is flagged as a likely wrong answer key. Chip: PENDING (Agent B numbers).
  - "Mastery with honesty": a topic band appears only when there is enough evidence; otherwise it says "not enough data".
  - "Validated on real public data": knowledge-tracing on ASSISTments 2009, our AUC **0.763** vs DKT 0.754 and SAKT 0.725 under the same test protocol (**Public**). Footnote: AKT 0.785 is higher; protocol deviations in the appendix.
- Small chart (bottom right, only after PENDING numbers exist): M8 "recovery vs number of students" curve (**Synthetic**), caption "Small institutes borrow strength from the pool: this is the moat".

## 5. EARLY WARNING (S2 split)
- Eyebrow: EARLY WARNING. Title: "A short, supportive list each week: who to call, why, and what to offer".
- Left (cols 1-7): M2 support list (8 rows: student code, a plain reason chip such as "absent 6 of the last 10 classes", suggested action chip "mentor call"). Names are synthetic. A header badge: "Capped to your mentor capacity".
- Right (cols 8-12): 3 cards:
  - "Reasons, not scores": every flag shows 1-3 plain reasons and a supportive action (mentoring, counselling, remedial session, fee-plan talk).
  - "Kind by design": never a public rank, never a student-facing risk label; a person decides before any outreach.
  - "How good is it?": PENDING (Agent C). Honest line to fill: "At the same weekly workload the model ranks students better than the institute's attendance rule; a quarter of dropouts are sudden and cannot be predicted from academic data."
- Footer chip row: Dropout in the next 30 days · Falling behind · Fee default (adults only).

## 6. PREDICTION AND PARENT REPORT (S2 split)
- Eyebrow: PREDICTION AND REPORT. Title: "An honest percentile range, and a parent report where every number is checked".
- Left (cols 1-6): M4 percentile band funnel (width shrinks month by month), label "likely range, not a single number"; caption: PENDING (Agent C coverage figures). Disclaimer chip: "Range with disclaimer, no rank promises (MoE guidelines)".
- Right (cols 7-12): M5 phone frame with the Hindi report and a second phone with English (small), ticks next to each number ("checked against the data"). Three chips under the phones: "Works with no AI model" · "20 human-written templates" · "Names added after checking".
- Mini-flow under the phones: facts from data → AI wording (optional) → automatic checker (numbers, topics, tone) → template if it fails.
- Honesty line: "Hindi text still needs a native reviewer" (status PENDING). Do not show "500/500 caught" until the independent test passes.

## 7. PRIVACY AND WELL-BEING (S3 pillars)
- Eyebrow: PRIVACY AND WELL-BEING. Title: "Built for the law: consent first, supportive actions only, no rankings".
- Pillar 1 "Consent": 3-step flow (admission desk checks the parent's ID, consent recorded per purpose, one-tap withdrawal). Chip: DPDP Rules 2025, Rule 10.
- Pillar 2 "Age-aware by design": mini matrix (rows: under 18 / 18+; columns: academic support / dropout / fees): ML, rules only, with our legal basis in 1 line each; M7 consent screen thumbnail. Chip: "Real-data check: academic-only features lose just 0.008 AUC on OULAD (**Public**)".
- Pillar 3 "Well-being": no leaderboards; batch moves never based on performance; banned-words check on every message; counsellor contact field; results private to student and guardian.
- Quote bar (Teal-tint): MoE Coaching Guidelines 2024, cl. 10.2(xi): results "should be used for regular analysis of performance of students and the student whose education performance is deteriorating, should be provided counselling". Short quote only (under 30 words), as in `SLIDES_BRIEF.md` §4.
- Footer: we act as data processor for the institute; no pooling of children's raw data.

## 8. THE DATA MOAT (S3 pillars)
- Eyebrow: THE DATA MOAT. Title: "Every institute makes the next one's models better, without sharing children's data".
- Centre top: flywheel (4 nodes: more institutes → better item bank → sharper insights → better results → more institutes).
- Pillars: 1 "Shared question bank": difficulty estimated across institutes using anchor questions; small batches borrow strength. 2 "Real exam outcomes": institutes enter actual percentiles after the exam, so our internal-to-NTA mapping improves every year. 3 "What works": intervention outcomes show which support action helps which student type.
- Boundary box (white, Red outline, 12 pt): "Never leaves the institute: names, raw responses, attendance, fees. Shared only: question statistics and anonymous totals (groups of 20 or more)."
- Evidence strip: M8 curve (PENDING) + "Limit: scales are comparable across institutes only through shared anchor questions".

## 9. ROI FOR THE INSTITUTE (S4 numbers)
- Eyebrow: ROI FOR THE INSTITUTE. Title: "It pays for itself if it saves three or four students a year".
- KPI row (4 boxes, **Model output**, Base case, 400-student institute): "6.6 %" effective dropout reduction (guide: 25 %) · "2.9x" return counting all benefits · "0.75x" return from fees alone · "3.5" students to save per year to break even.
- Body left: bar chart "Guide vs our model" for dropouts prevented per year (guide: 12 of 48 students; ours: 2.6 of 40, as in `financial/README.md`) with the sentence "Only students who get outreach benefit; month-1 dropouts cannot be caught."
- Body right: stacked card "What the owner gets": fees retained, staff time saved, and "every 1 % admissions uplift adds about ₹2.3 lakh".
- Footer strip: Cost chip "platform cost 0.3 % of a student's fee" · Benefit chip "break-even 3.5 students" · Evidence chip "RCT-based effect, 8 trials, mean 15.8 %" (say "borrowed from other settings").
- Honesty line: "Dropout reduction is borrowed from comparable settings; we have no coaching-specific data yet."

## 10. UNIT ECONOMICS AND PRICING (S4 numbers)
- Eyebrow: UNIT ECONOMICS. Title: "The economics are real, but thinner than the guide's 10x".
- Left: comparison table "Guide vs AlphaQ model" (**Model output**): LTV/CAC 10.7x vs 3.7x · payback 3.1 vs 6 months · contribution margin 66 % vs 78 % · LTV ₹3.53 L vs ₹1.30 L · acquisition cost ₹33,000 vs ₹35,492 · average revenue per institute ₹16,000 vs ₹8,612 per month.
- Right: M10 tornado chart from the workbook Sensitivity sheet (what moves LTV/CAC: price, pilot conversion, churn), caption "price and pilot conversion matter most".
- Segment strip (3 chips): Small 1.5x · Mid 3.7x · Large 9.1x LTV/CAC.
- Pricing line: "List price ₹30 per student per month; ERP anchors we found cost ₹4-21; our case rests on the ROI above, and willingness to pay is still untested."
- Footer strip: scenarios Bear / Base / Bull (Mid): LTV/CAC -0.1x / 3.7x / 24x; "Bear stresses every input at once."

## 11. GO-TO-MARKET AND COMPETITION (S5 roadmap)
- Eyebrow: GO-TO-MARKET. Title: "Start with mid-size institutes in Patna and Lucknow; keep small ones self-serve".
- Timeline bar with 3 stage cards: 1 "Retro-pilot" (their last year's Excel: who left, would we have caught them); 2 "Paid pilot" for one term; 3 "Full onboarding" after conversion. Peak selling window March-June (PS data pack).
- Segment table: Large and mid: field sales (LTV/CAC 9.1x / 3.7x); small: self-serve or channel partners (1.5x).
- Competition row (right): "Generic institute apps sell operations: fees, classes, content. In the listings we checked, topic-level analytics, OMR and compliance records were not shown (several features 'not verified')." Chips: Classplus, Fedena, Edmingle, Teachmint (names from `financial/research/R1_R6_competitors_unit_costs.md`). Our edge: topic analytics, offline, consent and records support.
- Compliance as a feature (3 icons): age-at-enrolment check, no test the day after the weekly off, pro-rata refund calculator (MoE 2024 / Rajasthan Act 2025).

## 12. VALIDATION, LIMITS AND PILOT (S1 table + roadmap)
- Eyebrow: VALIDATION AND LIMITS. Title: "What we proved, what we did not, and how a pilot would settle it".
- Left (cols 1-8): 3-column table. Columns "Proved on public data" / "Shown on synthetic data (pipeline only)" / "Not proven yet", each with status tags:
  - Public: ASSISTments AUC 0.763; OULAD AUC 0.706 (anchor 0.794, ours is lower); academic-only costs 0.008 AUC.
  - Synthetic: PENDING rows (difficulty recovery, early-warning lift, range coverage), tenant isolation, 91 passing tests.
  - Not proven: real institute accuracy, willingness to pay, dropout reduction, Hindi quality at scale, OMR on other sheet layouts.
- Right (cols 9-12): pilot plan card, 3 steps: 2 institutes · one term · staggered start to measure real uplift; success = metrics fixed in advance.
- Strip: "Assumptions we changed from the guide": effective dropout reduction 25 % → 6.6 %; LTV/CAC 10.7x → 3.7x.

---
## Appendix (each page uses the skeleton noted)
- A1 Architecture detail (S2): full diagram, tenant isolation, offline design.
- A2 Cost per student (S4): bottom-up infra + AI cost table (free local run = ₹0 marginal; production assumptions with sources) from `financial` COGS_Build.
- A3 Data model (S1): simplified ERD of the 31 tables, synthetic-data design (4 institutes, years, ground truth).
- A4 Privacy clause table (S1 table): DPDP s.9, Rule 10, Fourth Schedule, MoE and Rajasthan clauses with our design response.
- A5 Financial assumptions and sensitivity (S4): top 10 inputs with low/base/high and source.
- A6 Validation protocol (S1 table): splits, baselines at equal workload, confidence intervals, leakage tests, protocol deviations vs pyKT.

## FINAL SLIDE: AI-USE DISCLOSURE AND CITATIONS (dark or white; mandatory)
- Title: "How we used AI, and what we cited".
- Left card: "AI tools": Claude (planning, code review, documentation), Google Antigravity agents (code generation), Perplexity / Gemini Deep Research (literature and regulation research); "All outputs were reviewed and tested by the team; research claims were checked against primary sources where possible."
- Right card: "Public data and libraries": OULAD (CC BY 4.0), ASSISTments 2009, pyKT benchmark, JEEBench, Noto Sans Devanagari (OFL), LightGBM, Ollama, FastAPI, PostgreSQL; full list in `technical/docs/CITATIONS.md`.
- Bottom: repository link (private until Round 2 submission, then as organisers require), team name AlphaQ, contact.
