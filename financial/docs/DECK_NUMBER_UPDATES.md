# Deck number updates after the CFO audit (model v1.1)

Generated from `DataMoat_Financial_Model_CURRENT_v1.1.xlsx` on 2026-10-22. **Every finance number in the deck built on v1.0 is now out of date.** Use this sheet to update `presentation/source/build/deck.js` (search for the old value). Origin tag on every slide: **Model output**. Reasons for each change are in `MODEL_AUDIT.md`.

## 1. Headline numbers (Mid institute, 400 students, Base)

| Fact quoted in the deck | Old (v1.0) | **New (v1.1)** |
|---|---|---|
| Effective dropout reduction (the guide says 25%) | 6.6% | **4.0%** |
| Students kept per year | 2.6 of 40 | **1.9 of 48** |
| Institute return, all benefits | 2.9x | **1.7x** |
| Institute return, fees + staff time (hard benefits) | 1.0x | **0.55x** |
| Institute return, fees only | 0.75x | **0.35x** |
| Students to keep a year to break even | 3.5 | **5.5** |
| Extra admissions a year that also break even | n/a | **1.5** |
| Platform cost as a share of a student's fee | 0.3% | **0.38%** |
| Average monthly revenue per institute | ₹8,612 | **₹8,612** |
| Contribution margin | 78% | **78%** |
| CAC (sales + marketing) | ₹12,667 | **₹15,567** |
| Fully loaded acquisition cost | ₹35,492 | **₹38,392** |
| LTV, discounted | ₹1.30 lakh | **₹1.4 lakh** |
| LTV ÷ CAC, discounted | 3.7x | **3.6x** |
| LTV ÷ CAC, undiscounted (the PS's convention) | n/a | **4.8x** |
| Payback, survival-weighted | 6 months | **6 months** |
| Payback, simple (the PS's convention) | n/a | **5.7 months** |
| Annual institute retention | 64% | **64%** |
| Share of the roll flagged per year | n/a | **27%** |
| Year-3 revenue | not modelled | **₹65.3 lakh** |
| Year-3 EBITDA | not modelled | **₹11.9 lakh** |
| Paying institutes at the end of year 3 | not modelled | **58** |
| Funding the model says we need | not modelled | **₹45.0 lakh** |
| Break-even month (3 positive months in a row) | not modelled | **month 16** |

## 2. Scenario table (Mid institute): replaces the Bear / Base / Bull tables

Bear / Base / Bull now flex **13 scenario drivers** only. The old "everything at its worst" case is the separate **Stress** column.

| Metric | PS (naive) | Bear | Base | Bull | Stress |
|---|---|---|---|---|---|
| Effective dropout reduction | 25.0% | 1.0% | **4.0%** | 11.3% | 0.6% |
| Students kept per year | 12.0 | 0.3 | **1.9** | 8.2 | 0.2 |
| Return, all benefits | 2.25x | 0.37x | **1.7x** | 3.9x | 0.09x |
| Return, hard benefits (fees + staff time) | 2.25x | 0.37x | **0.55x** | 1.3x | 0.09x |
| Return, fees only | 2.25x | 0.09x | **0.35x** | 1.1x | 0.02x |
| Students to keep to break even | 5.3 | 3.8 | **5.5** | 7.2 | 11.7 |
| Monthly contribution per institute | ₹10,600 | ₹3,903 | **₹6,740** | ₹9,576 | -₹1,560 |
| CAC (sales + marketing) | ₹25,000 | ₹44,889 | **₹15,567** | ₹8,386 | ₹65,111 |
| Fully loaded acquisition cost | ₹33,000 | ₹82,540 | **₹38,392** | ₹25,281 | ₹1,90,892 |
| LTV, discounted | ₹3,53,333 | ₹61,848 | **₹1,39,813** | ₹2,65,113 | -₹20,910 |
| LTV ÷ acquisition cost, discounted | 10.7x | 0.75x | **3.6x** | 10x | -0.11x |
| LTV ÷ acquisition cost, undiscounted | 10.7x | 0.93x | **4.8x** | 15x | -0.13x |
| Payback, simple (months) | 3.1 | 21.1 | **5.7** | 2.6 | never |

## 3. By institute size (Base): replaces the Small / Mid / Large tables

| | Small | Mid | Large |
|---|---|---|---|
| Students | 180 | 400 | 1,200 |
| Annual fee (old: ₹65k / ₹95k / ₹1.25L) | ₹60,000 | ₹75,000 | ₹1,00,000 |
| Return, all benefits | 1.6x | 1.7x | 2.1x |
| LTV ÷ acquisition cost, field sales | 1.5x | 3.6x | 9.2x |
| LTV ÷ acquisition cost, **channel partner** (new) | 3.4x | 4.9x | 6.1x |
| Payback, survival-weighted (months) | 19 | 6 | 3 |

The GTM message survives and gets stronger: small institutes via channel partners (3.4x) instead of field sales (1.5x).

## 4. 3-year projection (new slide content)

| | Bear | Base | Bull |
|---|---|---|---|
| Revenue in year 3 | ₹11.0 lakh | ₹65.3 lakh | ₹2.50 crore |
| EBITDA in year 3 | ₹-30.2 lakh | ₹11.9 lakh | ₹1.26 crore |
| Paying institutes, end of year 3 | 15 | 58 | 191 |
| Run-rate annual revenue, end of year 3 | ₹11.0 lakh | ₹63.6 lakh | ₹2.77 crore |
| Funding the model says we need | ₹1.00 crore | ₹45.0 lakh | ₹30.0 lakh |
| Break-even month | after month 36 | month 16 | month 4 |

Base case by year: revenue ₹18.9 lakh, ₹48.0 lakh, ₹65.3 lakh · EBITDA ₹-16.1 lakh, ₹-0.9 lakh, ₹11.9 lakh · paying institutes at year end 28, 51, 58.

Caption for the slide: *Model output. Market cap = 1,180 addressable institutes in five states × 8% penetration (derived, mostly assumption). Bear funding assumes no cost response.*

## 5. Sensitivity (tornado and heat grids)

Tornado for the owner's return (Mid, other inputs at Base), largest swings first:

| Input | Bear value → return | Bull value → return |
|---|---|---|
| Admissions uplift next session from results/parent trust | 0.55x | 4.1x |
| List price per active student per month | 2.3x | 1.4x |
| Annual fee per student - Mid | 1.4x | 2.1x |
| Mentor minutes per intervention | 1.4x | 2.0x |
| Dropout reduction among flagged students given outreach (RCT) | 1.5x | 2.1x |
| Precision of at-risk flag | 1.5x | 1.9x |
| Months before the model can flag (no test data yet) | 1.6x | 1.8x |

Tornado for our LTV ÷ CAC:

| Input | Bear value → LTV ÷ CAC | Bull value → LTV ÷ CAC |
|---|---|---|
| List price per active student per month | 2.1x | 5.2x |
| Pilot-to-paid conversion | 2.1x | 5.1x |
| Monthly logo churn for monthly payers | 3.0x | 4.2x |
| Pilots started per rep per month (yearly avg) | 3.0x | 4.0x |
| Non-renewal at session end (annual) | 3.3x | 4.1x |
| Institutes per CSM | 3.4x | 3.7x |

Grid 1, owner's return by list price (columns) and effective dropout reduction (rows):

| Reduction | ₹20 | ₹30 | ₹40 | ₹50 | ₹60 | ₹80 |
|---|---|---|---|---|---|---|
| 5% | 2.4x | 1.8x | 1.4x | 1.2x | 1.0x | 0.81x |
| 8% | 2.7x | 2.1x | 1.7x | 1.4x | 1.2x | 0.92x |
| 11% | 3.1x | 2.3x | 1.9x | 1.6x | 1.3x | 1.0x |
| 15% | 3.6x | 2.7x | 2.1x | 1.8x | 1.5x | 1.2x |
| 20% | 4.1x | 3.1x | 2.5x | 2.1x | 1.8x | 1.4x |
| 25% | 4.7x | 3.6x | 2.8x | 2.4x | 2.0x | 1.6x |

Grid 2, LTV ÷ CAC by monthly churn (columns) and acquisition cost (rows):

| Acquisition cost | 1% | 2% | 3% | 4% | 5% |
|---|---|---|---|---|---|
| ₹15,000 | 11x | 10x | 9.3x | 8.5x | 7.8x |
| ₹25,000 | 6.9x | 6.2x | 5.6x | 5.1x | 4.7x |
| ₹35,000 | 4.9x | 4.4x | 4.0x | 3.6x | 3.3x |
| ₹50,000 | 3.4x | 3.1x | 2.8x | 2.5x | 2.3x |
| ₹75,000 | 2.3x | 2.1x | 1.9x | 1.7x | 1.6x |

The base marker on the churn × CAC grid is now about ₹38k at 3% churn; the dashed rule of thumb stays at 3x.

## 6. Messages that must change

| Old message | New message |
|---|---|
| "Save 3–4 students a year and it pays for itself" | "Retention alone covers about a third of the cost. It pays for itself when fees, staff time and a small admissions gain are counted: keep 5.5 students a year **or** win 1.5 extra admissions." |
| "2.9x institute return" | "1.7x with admissions counted; **0.55x on hard benefits** (fees + staff time). We show both." |
| "LTV ÷ CAC 3.7x" | "3.6x discounted, 4.8x undiscounted (the basis most peers quote); payback 5.7 months simple." |
| "Small institutes self-serve (1.5x)" | "Small institutes through channel partners: 3.4x, against 1.5x by field sales." |
| Bear case "0.15x return, negative LTV" | "Bear (13 drivers): 0.37x return, LTV ÷ CAC 0.75x. Stress (every input at its worst): shown separately as a survival test." |
| (nothing on the 3-year plan) | "Base: ₹65 lakh revenue and ₹12 lakh EBITDA in year 3; ₹45 lakh funding; break-even month 16. Capped by the addressable market." |
| "Sales team of 2 to 4 reps" (if present) | "One field rep: at 8% of the market a second rep only helps once the territory grows." |

## 7. Where to look in `presentation/source/build/deck.js`

Search for the old values `6.6 %`, `2.9x`, `0.75x`, `3.7x`, `1.0x`, `₹35k`, `₹8,612`, `0.15x`, `14x`, `₹1.74 L`, `-0.1x` and `24x`. They appear in the executive summary (~lines 109–154), the guide stress-test (~230–232), the business slides (~482–517, 562, 599), the appendix model slides (~620–690) and the closing slide (~857). `presentation/source/build/charts.py` line ~176 holds the chart title "1.0x on fees and staff time; 2.9x with admissions" and the tornado and grid data. The earlier deck variants (`deck_v1_light.js`, `deck_v2_dense.js`) are history.
