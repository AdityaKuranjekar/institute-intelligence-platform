# Financial Model — handoff (read this before making slides)
Last updated: 2026-10-22 · Model **v1.1 (CFO audit)** · Owner: ankita2401cs07@gmail.com

> **v1.1 replaced v1.0 on 2026-10-22.** Every finance number from v1.0 (6.6%, 2.9x, 0.75x, 3.5 students) is out of date. `MODEL_AUDIT.md` explains what changed and why; `DECK_NUMBER_UPDATES.md` lists old → new numbers for the deck.

## 1. Files
| File | What it is |
|---|---|
| `DataMoat_Financial_Model_v1.1.xlsx` | **The model.** Live formulas only; all inputs on `Assumptions`. Open in Excel or Google Sheets (it recalculates on open). |
| `MODEL_AUDIT.md` | **CFO review**: 18 findings, the fixes, before/after numbers, what is still weak. |
| `DECK_NUMBER_UPDATES.md` | Old → new numbers for every finance figure in the deck. |
| `DataMoat_Financial_Model_Preparation_Report.pdf` | **How the model was prepared** (11 pages): requirements trace, process, architecture, evidence, method, tests, the CFO audit, results, limits and how to reproduce. For judges and mentors. |
| `DataMoat_Financial_Model_Explained.pdf` | Plain-English tour of every tab, the jargon and the link to the PS. |
| `assumptions.csv`, `seasonality.csv` | Source of every input (Bear / Base / Bull, source, confidence, scenario-driver flag). Edit these, then rebuild. |
| `build_model.py`, `proj_sheet.py` | Rebuild the workbook: `python build_model.py` (needs `pip install openpyxl`). |
| `verify_model.py` | Recalculates without Excel and prints the headline and checks: `python verify_model.py --all` (needs `pip install formulas`; about 3 minutes). |
| `guide/` | Scripts that make the explainer PDF from the workbook. |
| `research/` | Raw research R1–R7 with links (competitors, unit costs, fees, dropout, trials, benchmarks, market size). |
| `FINANCE_PLAN.md` | The plan; §13 records the v1.1 decisions. |
| `archive_v1.0/` | The superseded v1.0 inputs, generator and workbook. |
| `DataMoat_Financial_Model.xlsx` | **Superseded v1.0. Delete it** (it was open in Excel when v1.1 was built, so it could not be replaced). |

## 2. Workbook sheets
Cover (scenario switch C6, status light C7, headline) · Assumptions · Seasonality · Pricing · COGS_Build · Institute_ROI · Unit_Econ · **Projection** (3 years: sales capacity, cohorts, P&L, cash, funding ask) · Scenarios · Sensitivity · Checks · Sources · hidden: Engine, Proj_Bear, Proj_Base, Proj_Bull.
Colours: blue = input, black = formula, green = pulled from another tab, yellow = live lever, green fill = key output. **Cover C7 must say ALL CHECKS PASS before you quote a number.** Bear / Base / Bull flex only the **13 scenario drivers** (Assumptions column N); **Stress** (Scenarios column G) flexes every input to its worst and is a survival test, not a forecast.

## 3. Slide-ready numbers (Base scenario, Mid institute = 400 students)
Label on the slide: **Model output** (sourced + assumed inputs), never "measured".

| Metric | Ours (Base) | PS naive | Cover cell |
|---|---|---|---|
| Effective dropout reduction | **4.0%** | 25.0% | C10 |
| Dropouts prevented per year | **1.9** | 12.0 | C11 |
| Institute ROI (all benefits) | **1.7x** | 2.25x | C12 |
| Institute ROI (hard benefits: fees + staff time) | **0.55x** | 2.25x | C13 |
| Institute ROI (fees only) | **0.35x** | 2.25x | C14 |
| Break-even: students to save per year | **5.5** | 5.3 | C15 |
| Extra admissions needed to break even (after fees + staff time) | **1.5** | n/a | C16 |
| Platform cost as % of a student's fee | **0.38%** | 0.80% | C17 |
| Avg monthly revenue per institute | **₹8,612** | ₹16,000 | C18 |
| Contribution margin | **78%** | 66% | C19 |
| CAC: sales + marketing per paying institute | **₹15,567** | ₹25,000 | C20 |
| Fully loaded acquisition cost | **₹38,392** | ₹33,000 | C21 |
| LTV (discounted) | **₹1,39,813** | ₹3,53,333 | C22 |
| LTV ÷ acquisition cost (discounted) | **3.6x** | 10.7x | C23 |
| LTV ÷ acquisition cost (undiscounted, peer convention) | **4.8x** | 10.7x | C24 |
| Payback, survival-weighted (months) | **6.0** | 3.1 | C25 |
| Payback, simple (months) | **5.7** | 3.1 | C26 |
| Institutes needed to cover fixed team cost (steady state) | **18.1** | n/a | C27 |
| 3-year: revenue in year 3 | **₹65.3 lakh** | n/a | C28 |
| 3-year: EBITDA in year 3 | **₹11.9 lakh** | n/a | C29 |
| 3-year: paying institutes at the end of year 3 | **58** | n/a | C30 |
| 3-year: funding the model says we need | **₹45.0 lakh** | n/a | C31 |
| 3-year: break-even month (3 positive months in a row) | **month 16** | n/a | C32 |

**By size (Base):** return Small 1.6x / Mid 1.7x / Large 2.1x · LTV ÷ CAC by field sales 1.5x / 3.6x / 9.2x · **via channel partner** 3.4x / 4.9x / 6.1x · payback 19 / 6 / 3 months.

**Scenarios (Mid; 13 drivers):**

| | Bear | Base | Bull | Stress (all inputs worst) |
|---|---|---|---|---|
| Return, all benefits | 0.37x | **1.7x** | 3.9x | 0.09x |
| Return, hard benefits | 0.37x | **0.55x** | 1.3x | 0.09x |
| LTV ÷ CAC, discounted | 0.75x | **3.6x** | 10x | -0.11x |
| LTV ÷ CAC, undiscounted | 0.93x | **4.8x** | 15x | -0.13x |
| Revenue in year 3 | ₹11.0 lakh | **₹65.3 lakh** | ₹2.50 crore | n/a |
| EBITDA in year 3 | -₹30.2 lakh | **₹11.9 lakh** | ₹1.26 crore | n/a |
| Paying institutes, end of year 3 | 15 | **58** | 191 | n/a |
| Funding the model says we need | ₹1.00 crore | **₹45.0 lakh** | ₹30.0 lakh | n/a |
| Break-even month | after month 36 | **month 16** | month 4 | n/a |

**Tornado (what moves the answer):** owner's return: admissions uplift 0.55x→4.1x, list price 2.3x→1.4x, annual fee 1.4x→2.1x, mentor minutes 1.4x→2.0x. Our LTV ÷ CAC: list price 2.1x→5.2x, pilot conversion 2.1x→5.1x, monthly churn 3.0x→4.2x.

## 4. The story for the deck (one line per slide)
1. **We challenged the guide.** Its 25% prevention becomes **4.0%** once recall, outreach and month-1 leavers are counted; its 10.7x LTV ÷ CAC becomes **3.6x discounted / 4.8x undiscounted**.
2. **Retention alone does not pay for the product.** Fees retained return 0.35x of the cost; with staff time 0.55x; with a 1% admissions gain 1.7x. It breaks even when the owner keeps 5.5 students a year **or** wins 1.5 extra admissions. Sell the bundle (staff time, parent reports, results), not a retention promise.
3. **Our unit economics hold.** Payback 5.7 months (simple), LTV ÷ CAC 4.8x undiscounted. Small institutes belong with channel partners (3.4x vs 1.5x by field sales).
4. **A lean, market-capped business.** Base: year-3 revenue ₹65.3 lakh, EBITDA ₹11.9 lakh, funding ₹45.0 lakh, break-even month 16. The cap is the addressable market (1,180 institutes in five states × 8%), not money; growth needs new territory or exams.
5. **The levers that matter** are price, pilot conversion, the admissions gain, mentor time and precision (tornado). The owner interviews test exactly these.
6. **Limits first:** the trial effect is borrowed from other settings; the market is derived, not counted; willingness to pay is untested; Bear funding assumes no cost response.

## 5. Do NOT claim
- Any v1.0 number: 6.6%, 2.9x, 0.75x, 3.5 students, 3.7x with ₹35k CAC, "save 3–4 students and it pays for itself".
- "We reduce dropouts by X%". Say: *trials in comparable settings show 5–30% among students who get outreach; we model 15%.*
- That retention pays for the product. Counting only fees, the return is below 1x.
- That Bear or Bull is a forecast, or that Stress is a plan. Bear funding assumes the team stays at 7 people for 15 customers.
- That the market is 1,180 institutes, or that 8% penetration is evidence. R7 found no institute counts by size; both are derived assumptions.
- The guide's 10x LTV ÷ CAC, or any number not in the workbook. Purdue Course Signals as evidence (discredited).
- That Rajasthan's Act has a minimum age of 16 or is in force (commencement not found). The instalment clause is s.6(2)(d).

## 6. Still unverified (needs owner interviews, a pilot or tech metrics)
Willingness to pay (₹30 list vs ₹4–21 competitor anchors) · admissions uplift (1%) · pilot-to-paid conversion (30%) · addressable market and penetration · recall and precision (placeholders until Agent C's `metrics.json`) · mentor minutes per flagged student · support cost per institute (₹438 a month, our softest cost number) · dropout rate and timing, upfront share, refund compliance · GST-registered share · customer mix and fee levels by size.

## 7. Next steps
1. Update the deck from `DECK_NUMBER_UPDATES.md` (the deck owner).
2. Owner interviews and the Van Westendorp price survey; update `assumptions.csv`; rebuild; verify.
3. When Agent C reports, replace `Recall_Minor`, `Recall_Adult` and `Precision` with the measured values.
4. Round 2: a 3-year sensitivity (price × conversion → Year-3 EBITDA), an outcome-linked pricing option, expansion revenue and NRR.
5. Regenerate the explainer PDF: `python guide/extract_numbers.py && python guide/build_guide_pdf.py`.
