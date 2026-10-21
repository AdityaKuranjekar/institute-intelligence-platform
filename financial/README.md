# Financial Model — handoff (read this before making slides)
Last updated: 2026-10-20 · Model version R1-v1.0

## 1. Files
| File | What it is |
|---|---|
| `DataMoat_Financial_Model.xlsx` | **The model.** Live formulas only; all inputs on `Assumptions`. Open in Excel or Google Sheets (it recalculates on open). |
| `assumptions.csv`, `seasonality.csv` | Source of every input (Bear / Base / Bull, source, confidence). Edit these, then rebuild. |
| `build_model.py` | Rebuilds the workbook from the CSVs: `python build_model.py` (needs `pip install openpyxl`). |
| `verify_model.py` | Recalculates without Excel and prints the headline numbers and checks: `python verify_model.py --all` (needs `pip install formulas`). |
| `research/R1_R6_competitors_unit_costs.md` | Competitor prices, WhatsApp/LLM/GST/payment/cloud costs (with URLs). |
| `research/R2_R3_fees_dropout.md` | Fees by city, instalments, refund law (MoE 2024, Rajasthan Act 16/2025), dropout evidence. |
| `research/R4_R5_intervention_saas.md` | RCT evidence on early-warning + outreach; SaaS benchmarks; Tier-2 salaries. |
| `FINANCE_PLAN.md` | The plan; §13 records what changed and why. |

## 2. Workbook sheets
Cover (scenario switch C6 + headline) · Assumptions · Seasonality · Pricing · COGS_Build · Institute_ROI · Unit_Econ · Scenarios · Sensitivity (tornado + 2 grids + chart) · Checks · Sources · Engine (hidden; re-runs the chain for scenarios/sensitivity).
Colours: blue = input, black = formula, green = link, yellow = live lever, green fill = key output. **Cover C7 must say "ALL CHECKS PASS" before you quote a number.**

## 3. Slide-ready numbers (Base scenario, Mid institute = 400 students)
Every number below comes from the workbook. Label on the slide: **Model output (sourced + assumed inputs)** — not measured.

| Metric | Ours (Base) | Guide (naive) | Cell |
|---|---|---|---|
| Effective dropout reduction | **6.6 %** | 25 % | Cover C10 |
| Dropouts prevented / yr | **2.6** of 40 | 12 of 48 | Cover C11 |
| Fee lost per dropout | ₹36,967 | ₹36,000 | Scenarios E7 |
| Institute ROI, all benefits | **2.9x** | 2.25x | Cover C12 |
| Institute ROI, fees only | **0.75x** | 2.25x | Cover C13 |
| Break-even: students to save / yr | **3.5** | 5.3 | Cover C14 |
| Extra admissions needed to break even after fees + staff time | **≈ 0** | n/a | Cover C15 |
| Platform cost as % of a student's fee | **0.3 %** (≈ ₹285 per student per year) | 0.5 % | Cover C16 |
| Avg monthly revenue / institute | ₹8,612 | ₹16,000 | Cover C17 |
| Contribution margin | 78 % | 66 % | Cover C18 |
| Fully loaded acquisition cost | ₹35,492 | ₹33,000 | Cover C19 |
| LTV (60 months, survival-weighted, discounted 20 %) | ₹1.30 L | ₹3.53 L | Cover C20 |
| LTV ÷ acquisition cost | **3.7x** | 10.7x | Cover C21 |
| Payback | 6 months | 3.1 months | Cover C22 |
| Institutes to cover fixed team cost | 18 | n/a | Cover C23 |

**By segment (Base):** ROI Small 2.3x / Mid 2.9x / Large 3.6x · LTV/CAC Small **1.5x** / Mid 3.7x / Large 9.1x · Payback 18 / 6 / 3 months.
**Scenarios (Mid):** ROI Bear 0.15x / Base 2.9x / Bull 14x · LTV/CAC −0.1x / 3.7x / 24x. Bear = *every* input at its worst at once (a stress test, not a forecast).

**Tornado (what moves the answer, Mid, others at Base):**
- Institute ROI: admissions uplift 0 %→3 % gives **1.0x → 6.7x** (largest); price ₹40→₹20 gives 2.2x → 4.2x; fee ₹70k→₹1.2L gives 2.2x → 3.6x; RCT effect 5 %→30 % gives 2.4x → 3.6x.
- LTV/CAC: price ₹20→₹40 gives 2.1x → 5.2x; pilot conversion 15 %→50 % gives 2.2x → 5.1x; churn and non-renewal give about 3.1x → 4.3x each.

## 4. The story for the deck (one line per slide)
1. **We fixed the guide's ROI, honestly.** Its 25 % prevention is a guess. The evidence (8 RCTs, mean 15.8 %), our recall, and the fact that month-1 dropouts can't be caught give **6.6 %**. Fees alone cover 0.75x of the cost.
2. **But the product still pays for itself.** Fees retained plus staff time ≈ cost, so even with zero admission benefit ROI ≈ 1.0x. Every 1 % admissions uplift adds about ₹2.3 L. The ask: "**save 3–4 students a year** and it's free." It costs **0.3 % of fee revenue**.
3. **Unit economics are real but thinner than the guide's.** LTV/CAC is 3.7x, not 10.7x, because of seasonal billing, post-exam non-renewal (20 %) and failed pilots.
4. **Go to market follows from the numbers.** Field sales for Mid and Large (LTV/CAC 3.7–9x). Small institutes (1.5x) go self-serve or through channel partners. Use a light "retro-pilot" (last year's Excel → "who left and would we have caught them"), with full onboarding only after conversion.
5. **The levers that matter** are price, pilot conversion and admission uplift (tornado). These are exactly what the owner interviews will test.
6. **Limitations, stated first:** the reduction is borrowed from other settings; there is no coaching-specific dropout data; WTP is untested; Bear stresses everything at once.

## 5. Do NOT claim
- "We reduce dropout by X %". Say "RCTs in comparable settings show 5–30 % among students who get outreach; we model 15 %".
- The guide's 10x LTV/CAC, or any number not in the workbook.
- Purdue Course Signals as evidence (discredited).
- That GST makes us 18 % dearer. Coaching is GST-taxable, so institutes above ₹20 L turnover must register and can reclaim it. We assume 60 % do (assumption).
- That Rajasthan's Act has a minimum age of 16, or that it is in force (commencement not found). The instalment clause is s.6(2)(d).

## 6. Still unverified (needs owner interviews or a pilot)
Willingness to pay (₹30 list price is above every ERP anchor found, ₹4–21) · dropout rate and timing by month · upfront-payer share · refund compliance · admission uplift · pilot conversion · post-exam non-renewal · onboarding cost for low-tech institutes · recall and precision (replace with `metrics.json` from the tech build) · share of GST-registered institutes.

## 7. Next steps
1. Owner interview script + Van Westendorp survey (FINANCE_PLAN §9). Feed the results into `assumptions.csv`.
2. Research still to run: market size (TAM/SAM/SOM), Tier-2 coaching trends (plan §10 prompts 1 and 9).
3. Round 2: cohorts, hiring plan, 3-year P&L, cash and funding need.
4. Replace recall, precision and COGS with the tech team's `metrics.json` / NB09 values.
