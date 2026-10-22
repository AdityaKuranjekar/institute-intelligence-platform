# CFO review of the financial model: v1.0 → v1.1
Review date: 2026-10-22 · Reviewer role: CFO and sceptical judge · Workbook: `DataMoat_Financial_Model_CURRENT_v1.1.xlsx`

## 1. Verdict
v1.0 added up, but it was **too optimistic in four places, inconsistent with the technical team in three, and missing the 3-year projection that the PS rubric names**. v1.1 fixes all of these. The corrected model is less flattering and more defensible:

- **The product does not pay for itself on retained fees alone.** Fees-only return is **0.35x** and hard-benefit return (fees + staff time) is **0.55x** for a typical 400-student institute. The all-benefit return is **1.7x**, and most of that rests on one unproven assumption (1% more admissions). Break-even needs either about 5.5 students kept a year (we model 1.9) **or about 1.5 extra admissions a year**.
- **Our own unit economics hold up.** LTV ÷ CAC is 3.6x discounted (4.8x on the undiscounted basis that peers quote); simple payback is 5.7 months.
- **The business is limited by the market, not by money.** At 8% of an estimated 1,180 addressable institutes, Year-3 revenue is about ₹65 lakh with ₹12 lakh EBITDA. The model says we need **₹45 lakh** of funding and break even in **month 16**.

## 2. How the review was done
| Test | Result |
|---|---|
| Independent rebuild of ROI, unit economics and the 3-year projection in plain Python from the CSV inputs | Matches the workbook (unit economics to the rupee; projection: Year-3 revenue, EBITDA, funding and break-even month) |
| Trace of every PS requirement (Sections 3, 4, 6, 7, 9, 10) to a tab | One gap found: the 3-year projection (fixed) |
| Cross-check of every finance input against the technical team's measured numbers (`technical/docs/FEASIBILITY_CHECK.md`, generator config) | Three inconsistencies found (fixed) |
| Peer-convention check (how SaaS peers define payback, LTV, CAC, gross margin, scenarios) | Four gaps found (fixed) |
| Full recalculation of the workbook | 0 formula errors; 22 error checks pass; 3 honest warnings fire |

## 3. Findings and fixes
Severity: **H** changes a headline conclusion · **M** changes a number a judge will probe · **L** tidiness.

| # | Finding | Type | Sev | Fix in v1.1 |
|---|---|---|---|---|
| F1 | A customer signed in May faced the post-exam "renewal spike" in its second month, so LTV was understated by about 7% | Logic error | M | Renewal decisions only count after `MinRenewTenure` = 9 months of paying |
| F2 | The PS column "platform cost as % of fee" divided by **our** fee (₹95k) instead of the PS's ₹60k: 0.51% instead of 0.8% | Error | L | New input `G_Fee` (₹60,000) |
| F3 | Mentor time per flagged student was 30 minutes. The trials behind the 15% effect used call + parent meeting + follow-ups | Unrealistic input | H | 120 minutes Base (60 / 240) |
| F4 | **Recall** 55% (minors) and 65% (adults) was above anything the tech team measured (0.31 on the real generator; 0.37–0.41 of all dropouts on the feasibility test; 25% of dropouts are sudden) | Cross-team | H | 32% / 42% Base; replace with `metrics.json` when Agent C reports |
| F5 | **Precision** 35% versus about 15% implied by the tech data (38% of students flagged at least once at recall 0.31) | Cross-team | H | 15% Base. The model now shows the share of the roll flagged a year (27%), a new alert-load check |
| F6 | Dropout rate Base 10% used a trade-body floor ("at least 10%") as a mean. The PS baseline is 12% | Input | M | 12% Base (8% / 18%). Tech's 18% is a stress calibration that gives enough validation events |
| F7 | Dropout timing was front-loaded (30% in months 1–2). The PS ("highest in first 4–5 months") and tech generator (peak months 3–4, 43%) disagree | Cross-team | M | Curve re-shaped; 2 "blind" months before the first flag |
| F8 | Minor share 75% versus 78% in the tech data | Cross-team | L | 78% |
| F9 | Mid fee ₹95k came from **chain** price pages. Our customers are local independents (PS baseline ₹60k; local evidence ₹50k–1.2L) | Input | M | Small / Mid / Large Base ₹60k / ₹75k / ₹100k |
| F10 | Only discounted, survival-weighted payback and LTV were shown. Peers and the PS quote **simple payback** and **undiscounted LTV** | Peer convention | M | Both added to Unit_Econ, Cover and Scenarios |
| F11 | CAC excluded sales overhead (manager, incentives, recruiting). At ₹12.7k it sat below the PS's own ₹15–30k range | Peer convention | M | `SalesOverheadPct` 30% → CAC ₹15.6k; fully loaded ₹38.4k |
| F12 | "Gross margin" excluded customer-success staff, which peers include | Label | L | Relabelled "product gross margin"; contribution margin is the peer's gross margin |
| F13 | 66% of the all-benefit return came from the admissions assumption, yet it led the headline | Presentation | H | Added **hard-benefit ROI** (fees + staff time) as the lead conservative number, plus "extra admissions needed to break even" |
| F14 | Bear and Bull moved **all ~80 inputs at once**, a joint extreme that never happens | Scenario design | H | Bear / Base / Bull flex only **13 scenario drivers** (Assumptions column N). The old all-worst case is kept as a separate **Stress** column |
| F15 | **No 3-year projection.** PS Section 4 and 10 list it under "Revenue model & unit economics" | Gap | H | New `Projection` tab: sales capacity, cohorts, market cap, P&L, cash, funding ask. Bear / Base / Bull in `Scenarios` |
| F16 | PS question B3 asks "direct sales, channel partners or product-led?" but the model had no channel economics | Gap | M | Field-versus-channel comparison in Unit_Econ (Small institutes: LTV ÷ CAC 1.5x field, 3.4x via channel) |
| F17 | Caught while building F15: with flat R&D and overhead, the Bull case reached a 66% EBITDA margin, which no SaaS business sustains | Design | M | R&D and G&A floors as a share of revenue (Bull margin now about 50%) |
| F18 | Market cap missing: a projection that wins unlimited institutes is not credible | Gap | H | `AddressableInstitutes` × `MaxPenetration` cap from research R7; hiring plan right-sized (1 rep) |

## 4. What moved (Base, Mid institute of 400 students)
| Metric | v1.0 | v1.1 | Main cause |
|---|---|---|---|
| Effective dropout reduction | 6.6% | **4.0%** | recall 0.575 → 0.34 (F4) |
| Students kept per year | 2.6 of 40 | **1.9 of 48** | recall, dropout rate 12% |
| ROI, all benefits | 2.9x | **1.7x** | F3, F4, F5, F9 |
| ROI, hard benefits (fees + staff time) | about 1.0x (not shown) | **0.55x** | same |
| ROI, fees only | 0.75x | **0.35x** | same |
| Break-even students | 3.5 | **5.5** | mentor cost, precision |
| CAC (PS definition) | ₹12,667 | **₹15,567** | F11 |
| Fully loaded acquisition cost | ₹35,492 | **₹38,392** | F11 |
| LTV (discounted) | ₹1.30 lakh | **₹1.40 lakh** | F1 (+7%) |
| LTV ÷ CAC (discounted) | 3.7x | **3.6x** | F1 up, F11 down |
| LTV ÷ CAC (undiscounted) | not shown | **4.8x** | F10 |
| Payback (simple) | not shown | **5.7 months** | F10 |
| Year-3 revenue / EBITDA / funding | not modelled | **₹65 lakh / ₹12 lakh / ₹45 lakh** | F15 |

Scenarios (Mid institute; Bear and Bull flex 13 drivers): all-benefit ROI 0.37x / 1.7x / 3.9x · LTV ÷ CAC 0.75x / 3.6x / 10x · Year-3 revenue ₹11 lakh / ₹65 lakh / ₹2.5 crore · funding ₹1.0 crore / ₹45 lakh / ₹30 lakh.

## 5. What the corrected model says, as a CFO
1. **Do not pitch retention alone.** Fees retained cover about a third of what the owner pays. The product must be sold as a bundle: staff time, parent reports, results and admissions. The slides should lead with the hard-benefit ROI (0.55x) and the break-even condition, not with 2.9x.
2. **Price is a two-sided trap.** At ₹20 list the owner's all-benefit ROI rises to 2.3x but our LTV ÷ CAC falls to 2.1x. At ₹40 it is 1.4x and 5.2x. Only owner interviews can find the price where both work. Outcome-linked pricing (a lower base plus a fee per student retained) is the natural answer to the hard-benefit gap and is **not** modelled yet.
3. **Small institutes should go through channel partners.** Field sales gives them LTV ÷ CAC of 1.5x; a 20% partner commission gives 3.4x.
4. **The market caps the plan.** The cap binds in 6 months of the Base projection. More sales reps do not help; new territory or new exams do. The 8% penetration is an assumption and the single biggest lever on Year-3 revenue.
5. **Realised CAC from the P&L is ₹42.7k**, above the unit-economics ₹38.4k, because a rep is paid in the quiet months too.

## 6. Still weak (unchanged, and flagged in the workbook)
Willingness to pay at ₹30 (above every competitor price found) · the 1% admissions uplift · pilot-to-paid conversion · the addressable market (derived, mostly assumption; R7 found no institute counts by size) · recall and precision (placeholders until `metrics.json`) · support cost per institute (₹438 a month, our softest cost number) · dropout timing, upfront share and refund compliance (no sources) · the GST-registered share.

**Not modelled:** upsell and expansion (so no NRR), prepaid cash timing (conservative), income tax, the other PS revenue models, and any **management response** in Bear (the hiring plan is fixed, so Bear's funding need is a worst case, not a plan).

## 7. Consequences for the other workstreams
- **Deck:** every finance number on slides 5–7, 13 and the appendix changes. See `DECK_NUMBER_UPDATES.md`.
- **Tech:** finance now uses the tech team's recall, precision, minor share and timing. When Agent C reports, replace `Recall_*` and `Precision` in `assumptions.csv`.
- **Synthetic data:** the generator's 18% dropout rate is not the finance Base (12%). State that on the tech slide so the two numbers do not look contradictory.

## 8. Reproduce
`python build_model.py` → `python verify_model.py --all` → `python guide/extract_numbers.py` → `python guide/build_guide_pdf.py`. Inputs live in `assumptions.csv` and `seasonality.csv`; v1.0 files are in `archive_v1.0/`.
