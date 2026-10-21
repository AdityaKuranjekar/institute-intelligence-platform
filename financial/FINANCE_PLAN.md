# The Data Moat — Financial Model & Business Implementation Plan
Case B · Nextute × Finance Club IIT Patna · 2026

Weight: 30% of the score. Rubric: Revenue model & unit economics 20% · Market & go-to-market 10%.
Requirements: Round 1 — Excel/Google Sheets, **live formulas**, listed assumptions, ≥1 sensitivity. Round 2 — 3-year projection, scenarios, sensitivities.

---

## 0. STARTING PROMPT FOR THE FINANCE CHAT (copy everything inside the box)

```
You are my CFO, pricing strategist and a sceptical case-competition judge, helping me build a financial model and business case I intend to win with, and that must also hold up in front of real coaching-institute owners who might buy the product.

THE CASE (Nextute Edtech × Finance Club IIT Patna, Case B "The Data Moat"):
We are building an AI-powered Institute Intelligence Platform (SaaS) for small and mid-sized coaching institutes in India (JEE/NEET first; Tier-2/3 cities like Patna, Lucknow, Kota, Indore). It captures messy data (OMR photos, Excel, WhatsApp), shows topic-level weakness per student, flags students likely to drop out or default on fees early (with reasons and supportive actions), predicts exam percentile ranges, and sends Hindi/English parent reports. The value to the institute: fewer mid-session dropouts (fees saved), better results (more admissions next year), parent trust, less staff time.

THE GUIDE'S BASELINE (deliberately naive — judges expect us to challenge it):
- Institute: 400 students (range 150–2,000), fee ₹60,000/yr (₹30k–1.5L), paid in instalments over ~10 months; 8–15% mid-session dropout/default, highest in first 4–5 months.
- Naive ROI: 12% dropout around month 4, each costs ₹36,000 remaining fees; platform prevents 25% of dropouts → saves ₹4.32L vs cost ₹1.92L at ₹40/student/month → 2.25x.
- Naive unit economics: revenue ₹16,000/institute/month, infra+AI ₹6/student, support ₹3,000/institute/month, contribution ₹10,600/month, CAC ₹25,000 + onboarding ₹8,000, payback ~3.1 months, 3% monthly churn → LTV ≈ ₹3.5L, LTV/CAC ≈ 10x.
- Ranges to explore: price ₹20–80/student/month; CAC ₹15–30k; sales cycle 3–8 weeks peaking March–June; onboarding ₹5–10k; infra+AI ₹3–10/student/month; logo churn 2–5%/month.
- Revenue models to consider: per-student SaaS, tiered plans, freemium + AI add-ons, outcome-linked pricing, parent subscription (B2B2C), marketplace/upsell, anonymised benchmarks.
Judges explicitly ask: Will owners really pay ₹40/student? Will we really prevent 25% of dropouts and how would we prove it? What happens to churn after exam season? What does onboarding a low-tech institute cost? They want ranges, scenarios and evidence. Teams that state assumptions and limitations score higher than teams that oversell.

I am attaching FINANCE_PLAN.md — the full plan for the model. Treat it as the source of truth and improve it.

HOW I WANT YOU TO WORK WITH ME:
1. Attack every assumption like a hostile judge and like a stingy institute owner in Patna. Tell me which numbers are weakest.
2. When an assumption needs real evidence (competitor prices, salaries, CAC benchmarks, GST, WhatsApp/LLM prices, market size, fee levels, dropout rates), do NOT guess. Write me a precise research prompt for Perplexity or Gemini Deep Research: what to find, preferred sources (official, filings, pricing pages, Tracxn/Inc42/Entrackr, government data), and the exact table format to return. I will paste results back.
3. When I paste research, update the assumption table with low/base/high + source, and say what is still unverified.
4. Help me design the spreadsheet: sheet by sheet, row by row, with the exact formulas (Excel/Google Sheets syntax), named ranges, and checks. Everything must be driven from one Assumptions sheet — no hard-coded numbers in calculations.
5. Help me design primary research: an interview script and a short survey for real coaching owners (willingness to pay, current tools, dropout numbers), because real evidence beats any assumption.
6. Keep answers precise, in tables where useful.

Start by: (a) listing the 10 weakest points in the guide's naive model, (b) proposing the sheet structure of our model, and (c) giving me the first 6 research prompts to run.
```

---

## 1. What the judges want to see
1. A model that **challenges** the guide's 2.25x ROI and 10x LTV/CAC with ranges, not one optimistic number.
2. Live formulas, a clean Assumptions sheet, scenarios (Bear/Base/Bull), sensitivities (tornado + 2-way data tables).
3. Institute ROI **and** platform unit economics, linked (same price, same dropout-reduction assumption).
4. Seasonality — Indian coaching is a calendar business (admissions Mar–Jun, exams Jan–May, post-exam churn).
5. A 3-year P&L and cash view with headcount, so CAC and support are not magic numbers.
6. Evidence: sources for each assumption, plus ideally a few real owner interviews.
7. Consistency with the tech deck: cost per student in the model = cost per student from the tech plan.

---

## 2. Spreadsheet structure (sheet by sheet)

| # | Sheet | Contents |
|---|---|---|
| 1 | Cover | Name, version, how to use, colour legend (blue inputs, black formulas, green links), scenario selector |
| 2 | Assumptions | Every input with Low / Base / High / Source / Confidence; scenario switch via `CHOOSE` or `INDEX` |
| 3 | Pricing | Tier definitions, per-student prices, minimums, annual-prepay discount, GST, add-ons |
| 4 | Institute_ROI | One institute's economics with and without the platform (by segment: small/mid/large) |
| 5 | Unit_Econ | Per-institute monthly revenue, COGS, contribution, CAC, payback, LTV, LTV/CAC — per segment |
| 6 | COGS_Build | Infra + LLM + WhatsApp + OMR + support cost per student, derived bottom-up (matches tech plan) |
| 7 | Seasonality | Monthly index for active students, new-sales capacity, churn by month |
| 8 | Cohorts | Monthly acquisition cohorts × months → active institutes and students (36 months) |
| 9 | Headcount_Opex | Sales reps, CSMs, engineers, founders, salaries, hiring plan, tools, marketing |
| 10 | PnL_3yr | Monthly + annual: revenue, gross margin, opex, EBITDA |
| 11 | Cash | Burn, runway, funding need, break-even month |
| 12 | Scenarios | Bear/Base/Bull outputs side by side |
| 13 | Sensitivity | Tornado on key outputs; 2-way tables (price × dropout reduction, churn × CAC) |
| 14 | Market | TAM/SAM/SOM bottom-up |
| 15 | Checks | Balance checks, no negative students, churn ≤ 100%, totals reconcile, flags in red |
| 16 | Sources | Every source with link and date accessed |

---

## 3. Assumptions to model (start values — replace with researched values)

### 3.1 Institute side
| Input | Low | Base | High | Note / evidence needed |
|---|---|---|---|---|
| Students per institute (by segment) | 150 | 400 | 2,000 | Segment model: small <250, mid 250–800, large >800 |
| Annual fee per student | ₹30k | ₹60k | ₹1.5L | Varies by city tier & exam |
| Fee collection pattern | upfront | 3–4 instalments | monthly | Upfront payers = no fee saved on dropout (big edge case) |
| Refund policy on leaving | none | partial | pro-rata | Changes what a dropout actually costs |
| Mid-session dropout rate | 8% | 12% | 15% | Guide range; try to verify |
| Dropout timing curve | — | peak months 3–5 | — | Drives remaining-fee value |
| Share of dropouts that are "preventable" | 30% | 50% | 70% | Relocation/illness/switch-to-Kota are not |
| Intervention success rate on preventable, flagged | 20% | 35% | 50% | Needs evidence; ties to model recall |
| Model recall at chosen threshold | 50% | 65% | 80% | From tech metrics |
| → Effective dropout reduction | — | ≈ 0.5 × 0.65 × 0.35 ≈ 11% | — | **Base is far below the guide's 25%** — this is your credibility moment |
| Admission uplift from better results/parent trust | 0% | 2% | 5% | Second value lever |
| Staff hours saved per month | 10 | 25 | 50 | × hourly cost |
| Institute's cost of acting (mentor time) | — | ₹ per intervention | — | Real cost, include it |

### 3.2 Platform side
| Input | Low | Base | High | Note |
|---|---|---|---|---|
| Price per active student/month | ₹20 | ₹30–40 | ₹80 | Test via interviews + competitor pricing |
| Minimum monthly fee per institute | ₹2,000 | ₹3,000 | ₹5,000 | Protects small accounts |
| Billing months per year | 10 | 10–11 | 12 | Off-season billing is unlikely; model it |
| Annual prepay discount | 10% | 15% | 20% | Improves cash and churn |
| GST on SaaS | 18% | 18% | 18% | Price shown ex-GST; owners feel the inclusive price |
| Payment collection delay / bad debt | 1% | 3% | 8% | Small businesses pay late |
| Infra + AI cost / student / month | ₹3 | ₹5 | ₹10 | From COGS_Build |
| WhatsApp parent messages / student / month | 2 | 4 | 8 | × per-message price (research) |
| Payment gateway fee | 0% | 2% | 2% | |
| CSM: institutes per CSM | 30 | 50 | 80 | Drives support cost |
| Sales rep: deals/month in season | 3 | 6 | 10 | Drives CAC |
| CAC per institute | ₹15k | ₹25k | ₹40k | Build bottom-up from rep salary + travel + demos |
| Onboarding cost per institute | ₹5k | ₹8k | ₹15k | Data migration + training; low-tech staff = higher |
| Free pilot duration | 0 | 1 month | 2 months | Cost without revenue |
| Monthly logo churn (in-season) | 1.5% | 3% | 5% | |
| Post-exam churn spike (Apr–Jun) | 5% | 10% | 20% | Separate line — judges asked about this |
| Expansion (more students/upsell) | 0% | 5%/yr | 15%/yr | NRR |
| Channel partner commission | 0% | 15–20% of yr-1 revenue | 30% | If using resellers/test-series vendors |

---

## 4. Key calculations (formulas to implement)

**Institute ROI (per segment)**
- Dropouts/year = Students × DropoutRate
- Avg remaining fee lost per dropout = Σ over months (share of dropouts in month m × remaining instalments after m) — adjust for upfront payers and refund policy
- Dropouts prevented = Dropouts × Preventable% × Recall × InterventionSuccess
- Fees saved = Prevented × Avg remaining fee
- + Admission uplift value = Students × Uplift% × Fee × Gross margin of institute
- + Staff time saved = Hours × ₹/hour × 12
- − Platform cost (incl. GST if institute cannot claim input credit) − intervention cost
- ROI = Total value / Platform cost; also **break-even dropouts prevented** = Platform cost / Avg remaining fee (powerful slide: "you need to save just N students a year")

**Unit economics (per institute, monthly)**
- Revenue = MAX(Min fee, ActiveStudents × Price) × (1 − discount)
- COGS = ActiveStudents × (infra+AI + WhatsApp) + gateway% × Revenue
- Gross margin; Support = CSM cost / institutes per CSM; Contribution = Revenue − COGS − Support
- CAC (fully loaded) = (sales salaries + travel + marketing) / new institutes
- Payback = (CAC + Onboarding + pilot cost) / Contribution
- LTV = Contribution × gross-margin-adjusted lifetime, lifetime from **seasonal** churn (compute via cohort survival, not 1/churn)
- LTV/CAC; NRR

**3-year projection**
- New institutes/month = Reps × Deals per rep × Seasonality index (Mar–Jun high)
- Cohort survival with monthly churn + post-exam spike
- Active students = Institutes × Students × monthly student-seasonality index
- Opex from hiring plan; EBITDA; cash; break-even month; funding needed

---

## 5. Scenarios & sensitivity
- **Bear:** ₹25 price, 6% effective dropout reduction, 5% churn + 20% post-exam spike, CAC ₹35k
- **Base:** researched values
- **Bull:** ₹45 price, 15% reduction, 2% churn, CAC ₹18k, channel partners live
- **Tornado** on: price, dropout reduction, churn, CAC, students per institute, infra+AI cost, post-exam churn
- **2-way tables:** Price × Dropout reduction → institute ROI; Churn × CAC → LTV/CAC; Price × Institutes/rep → Year-3 EBITDA
- Show the **minimum conditions for the business to work** (e.g., "LTV/CAC > 3 needs churn < 4% and CAC < ₹30k")

---

## 6. Pricing & packaging to test
| Tier | Contents | Price idea |
|---|---|---|
| Free / Starter | CSV/OMR upload, test-level reports, up to 1 batch | ₹0 — feeds the data moat |
| Pro (core) | Topic heatmap, at-risk list, parent reports (template) | ₹25–35/student/month |
| Premium (AI) | GenAI parent reports in Hindi/English via WhatsApp, rank range, study plans | +₹10–20 |
| Add-ons | Benchmark reports, test-series integration | per use |
| Outcome-linked option | Lower base + bonus per retained student vs last year baseline | Pilot only (attribution disputes) |
| Parent premium (B2B2C) | Detailed weekly insight for parents | Only if institute agrees; revenue share |

Also model: **per-batch flat price** and **annual per-institute plan** — small owners often prefer a fixed number to per-student billing.

---

## 7. Go-to-market (10%)
- **Beachhead:** JEE/NEET institutes with 250–800 students in Patna → Bihar Tier-2 (Gaya, Muzaffarpur, Bhagalpur) → Lucknow/Kanpur → Kota/Indore/Jaipur.
- **Why Patna first:** home-ground (IIT Patna), dense market, Hindi-first, underserved by national ERPs, and you can do in-person demos cheaply.
- **Channels:** direct field sales in season (Mar–Jun), plus channel partners (OMR sheet printers, test-series vendors, local ERP resellers) for reach; Nextute's existing institute base as warm leads.
- **Sales motion:** free 1-month pilot on last term's data ("we'll show you who left and whether we'd have caught them") → paid.
- **Moat:** pooled anonymised data improves IRT calibration and risk models; topic tagging library; parent-WhatsApp habit; switching cost of history. State the **limits**: data moats weaken if competitors buy data or if per-institute data is enough.
- **Competition:** generic institute apps / ERPs (Classplus, Teachmint and similar), OMR vendors, Excel. Your edge = predictive + low-tech capture + Hindi parent reports. Research their prices.

---

## 8. Real-world edge cases to model or mention
- Upfront annual fees → no fee recovered on dropout (ROI shifts to admissions/trust)
- GST: shown ex-GST; small unregistered institutes cannot claim input credit → effective price +18%
- Seasonal student counts (summer, post-exam) → billing on active students drops; minimum fee protects you
- Post-exam churn and re-activation next session (win-back rate)
- Late payments and bad debt from small businesses
- Free pilot that never converts (pilot conversion rate input)
- Owner churn because a teacher who "championed" the tool leaves
- Institute closure/merger (Tier-3 market volatility)
- LLM / WhatsApp price changes (sensitivity line)
- Regulatory cost: DPDP compliance work, consent management, audits
- Discounting pressure in negotiation (average realised price < list price)
- Founders' salaries realistically included (not zero)
- Interest on working capital if annual prepay not adopted

---

## 9. Primary research (strongest evidence possible)
Talk to 8–15 coaching owners/admins in Patna (and 2–3 parents). Ask:
1. Students, batches, fees, payment pattern, refund policy
2. How many students left mid-year last session; when; why
3. Current tools and spend (ERP, OMR, test series, WhatsApp)
4. Would a list of "students likely to leave" in month 2 change what you do? Who would act?
5. Price reaction: Van Westendorp (too cheap / cheap / expensive / too expensive) per student/month and per year
6. Who decides and who pays; budget timing
7. Data sharing comfort (anonymised benchmarks)
Put a summary slide: "We spoke to N institutes: X% … median WTP ₹Y." Even 8 conversations beat any assumption.

---

## 10. Research prompts to run (Perplexity / Gemini)
1. **Market size:** "Estimate the number of coaching institutes in India for JEE/NEET by city tier and size, and total test-prep market size. Use government data (NSO/NSS education surveys), industry reports, credible news. Return a table with source, year, number, method."
2. **Fees:** "Typical annual fees and payment patterns (upfront vs instalments, refund policy) for JEE/NEET coaching in Patna, Lucknow, Kota, Indore, Tier-3 towns. Return a table with source links."
3. **Dropout evidence:** "Data on mid-session dropout/discontinuation rates in Indian coaching institutes, especially Kota/Patna, and reasons. Return figures with sources and dates."
4. **Competitor pricing:** "Current pricing and packaging of Classplus, Teachmint, and other Indian institute-management/analytics/OMR tools, including per-student or per-month plans. Return a table with pricing page links."
5. **SaaS benchmarks:** "Benchmarks for Indian SMB SaaS: CAC, payback, monthly logo churn, NRR, sales-rep productivity, field-sales salaries in Tier-2 cities. Sources: reports, founder posts, investor benchmarks."
6. **WhatsApp + LLM costs:** "Current WhatsApp Business Platform per-message price in India (utility, marketing) and current per-token price for low-cost LLMs. Return ₹ per 1,000 messages and ₹ per 1M tokens."
7. **GST & billing:** "GST rate on SaaS sold to Indian businesses, input-credit rules for small unregistered coaching institutes, and common B2B payment terms."
8. **Intervention effectiveness:** "Evidence on how much early-warning + mentoring interventions reduce dropout (effect sizes) in schools/colleges/coaching. Return study, context, effect size."
9. **Edtech context:** "Recent trends (2024–2026) in Indian offline coaching: national chains expanding to Tier-2/3, impact on local institutes, regulatory changes (MoE 2024 coaching guidelines)."

---

## 11. Build order
1. Assumptions sheet (with Low/Base/High + sources column)
2. Institute_ROI (fix the naive example first — it's the most visible slide)
3. COGS_Build (agree the ₹/student figure with the tech chat)
4. Unit_Econ per segment
5. Seasonality + Cohorts → PnL_3yr → Cash
6. Scenarios + Sensitivity
7. Checks + Sources
8. Round 1 version: Sheets 2–6, 12, 13 are enough; Round 2 adds full cohorts, headcount, cash.

## 13. Status & decisions (2026-10-20) — supersedes §3–§5 where they differ
**Built:** `DataMoat_Financial_Model.xlsx` (Round 1 scope), generated by `build_model.py` from `assumptions.csv` + `seasonality.csv`; verified by `verify_model.py` (0 formula errors, all checks pass). Handoff and slide numbers: `Financial_Model/README.md`. Research R1–R6 done (`research/`).

Model changes vs this plan, and why:
| # | Change | Why |
|---|---|---|
| 1 | Funnel = recall × action × **RCT effect (5/15/30 %)** × catchable share; "preventable" kept only as a check | The RCT effects (R4) are intention-to-treat relative reductions, so multiplying by preventable × success would double-count |
| 2 | Fee lost per dropout = timing curve × **unpaid instalments** (N = 2/3/4) + pro-rata refund only for full payers × compliance | R2: MoE 8(iv) and Rajasthan s.13(4) refund only full payers; chains collect most cash early; Allen/Aakash/PW ignore pro-rata |
| 3 | "Blind months": dropouts before the first tests can't be flagged | Realism: 15 % of dropouts happen in month 1 |
| 4 | GST input credit share 30/60/90 % (not 0 %) | R6: coaching is taxable at 18 %; registration is mandatory above ₹20 L turnover, so registered institutes reclaim our GST |
| 5 | In-season churn applies only to monthly payers; renewal spike 10/20/30 % | Prepaid annual plans can't leave mid-year; post-exam churn is the judges' question |
| 6 | Retro-pilot: light setup per pilot; full onboarding only after conversion | Failed pilots were carrying full onboarding, which inflated CAC |
| 7 | Fees re-based: Small 65k, Mid 95k, Large 125k (Base) | R2 local fee evidence (guide said 60k) |
| 8 | List price Base ₹30 (Bear 20 / Bull 40), flagged as above the ERP anchors (₹4–21) | R1. WTP is the top item to test in interviews |

**Headline (Base, Mid):** effective reduction 6.6 % · fees-only ROI 0.75x · all-in ROI 2.9x (≈1.0x with zero admission uplift) · break-even 3.5 students/yr · LTV/CAC 3.7x · payback 6 months. Small segment LTV/CAC 1.5x, so serve it via self-serve or channel.

**Research still to run:** §10 prompt 1 (market size) and prompt 9 (edtech/Tier-2 trends). Prompts 2–8 are covered by R1–R6.
**Corrections pushed to TECH_PLAN:** Rajasthan instalments are s.6(2)(d), not (e); the 35 % upfront share is unsourced.

## 12. Slides this model feeds
- "Will owners pay?" — ROI per segment + break-even students
- Unit economics table — honest version vs the guide's naive version
- 3-year projection chart
- Tornado + scenario table
- GTM + moat
- Limitations: unproven dropout reduction; pilot design to measure it (staggered rollout across batches)
