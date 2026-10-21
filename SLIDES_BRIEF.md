# Slides brief: facts, numbers and rules for building the Round 1 deck

Last updated 2026-10-22. **Purpose:** one file you can hand to a person or an AI to build the deck without reading the whole repo. Every number says where it comes from and how much to trust it. Numbers marked PENDING must not appear on a slide until the named file exists.

## Decisions and where the design lives (2026-10-22)
| Decision | Value |
|---|---|
| Team name | AlphaQ (logo to come) |
| Look | navy + teal accent, white background, Inter font (Hindi: Noto Sans Devanagari), built in PowerPoint |
| Design system | [`slides/DESIGN_SYSTEM.md`](slides/DESIGN_SYSTEM.md): tokens with measured contrast, type scale, components, 5 slide skeletons |
| Slide-by-slide layouts | [`slides/BLUEPRINTS.md`](slides/BLUEPRINTS.md): title + 12 content slides + appendix + final AI-disclosure slide |
| Mock-ups and images | [`slides/MOCKUPS_PLAN.md`](slides/MOCKUPS_PLAN.md): 10 visuals, how each is made for free, which are blocked on agent results |
| Round 2 (prototype, 15-slide deck, 3-year model, report, curveball, pitch) | [`technical/docs/ROUND2_PLAN.md`](technical/docs/ROUND2_PLAN.md) |
| Everything free | no paid backend or API: local FastAPI + PostgreSQL, local LLM through Ollama with template fallback, mock WhatsApp, seeded demo logins, free fonts/icons/charts |
Reference deck lessons (Myntra StylBiz): one repeated template, plain subject-first sentences, problem-to-idea chips, before/after table, cost-benefit footer strip, roadmap, numbers with sample sizes. Fixed for ours: body 14 pt not 10 pt, 40 pt margins not 5 pt, one accent colour, contrast 4.5:1 or better, 70 words per slide.

## 0. Hard rules from the problem statement (Section 9 and 11)
- PDF, **16:9, max 12 content slides** plus a title slide and an appendix. File name: `TeamName_Case_Round.pdf`.
- **The final slide must disclose AI-tool use** (text in `technical/docs/CITATIONS.md`). Everyone must be able to explain every part.
- Cite public datasets and libraries (`technical/docs/CITATIONS.md`). No real personal data (ours is synthetic).
- "Teams that clearly state their assumptions and limitations score higher than teams that oversell." Put limitations on slide 12, not in the appendix.
- Round 1 deck = soundness of design. Bonus: the GitHub/Colab link (this repo).

## 1. One-line pitch
An institute intelligence layer for small JEE/NEET coaching institutes: it reads their messy data (Excel, OMR photos), shows which topics each student is weak in, which students need a supportive check-in this week (with reasons), a predicted percentile **range**, and a verified Hindi/English parent report. It runs offline on one laptop, costs a fraction of a percent of a student's fee, and is designed around India's child-data law and coaching-centre well-being rules.

## 2. Suggested slide map (7 tech, 4 business, 1 validation; title first, AI disclosure last)
| # | Slide | Main point | Source files | Status |
|---|---|---|---|---|
| T | Title | name, one-line pitch | n/a | |
| 1 | The owner's reality | Excel, registers, WhatsApp; students noticed only after they leave | PS Section 2 | text |
| 2 | Product in one picture | 4 screens: heatmap, support list, percentile range, parent report | `technical/docs/TECH_PLAN.md` §9 | mock-ups to make |
| 3 | Capture and architecture | CSV/Excel mapper, OMR photo, local-first, multi-tenant (row-level security), offline | `TECH_PLAN.md` §6, `technical/contracts/schema.sql` | OMR reader and web app PENDING (state them as "designed + synthetic test images") |
| 4 | Question difficulty and topic mastery | IRT with uncertainty, wrong-answer-key detection; **moat curve: recovery vs number of students** | Agent B (`ml/irt`, `ml/mastery`) | **PENDING** (no number yet) |
| 5 | Early warning to supportive action | support list capped by mentor capacity, reasons plus action | Agent C (`ml/risk`) | **PENDING** |
| 6 | Honest prediction + verified report | percentile range, band narrows over the year; report numbers verified in code | Agent C (`ml/rank`), Agent E (`backend/app/genai`) | range PENDING; reports built |
| 7 | Privacy and well-being by design | age-aware routing, consent, no ranks | `technical/contracts/routing_policy.yaml`, `TECH_PLAN.md` §15 | design done |
| 8 | The data moat | pooled item bank, real-exam outcome labels, intervention outcomes; **no pooling of children's raw data** | `TECH_PLAN.md` §5 | design; evidence from slide 4 |
| 9 | Economics for the institute | ROI, break-even "save 3-4 students" | `financial/README.md` §3-4 | done (model) |
| 10 | Unit economics and pricing | LTV/CAC, payback, price tiers | `financial/` | done (model) |
| 11 | Go-to-market | field sales for mid/large, self-serve for small, retro-pilot | `financial/README.md` §4 | done |
| 12 | Validation, limitations, pilot plan | what we proved, what we did not, how to prove it | this file §3, §5 | write last |
| AI | AI-use disclosure + citations | final slide | `technical/docs/CITATIONS.md` | text ready |

## 3. Numbers you may use now (verified by running the code; origin labelled)
**Public data (real, not ours):**
| Fact | Value | Origin and caveat |
|---|---|---|
| OULAD withdrawal, ROC-AUC at day 28, our model | **0.706** (95% CI 0.699-0.714) | public; published anchor is 0.794 (PLOS ONE 2026), **we are lower**; say so; protocols differ |
| OULAD day 14 / 42 / 60 | 0.670 / 0.712 / 0.717 | public |
| Privacy cost on real data (academic features only vs plus click behaviour, day 28) | 0.698 vs 0.706, a loss of **0.008 AUC** | public; supports "minors get academic-only signals at almost no accuracy cost" |
| ASSISTments 2009 next-answer AUC, our online IRT | **0.763** (CI 0.756-0.779) | public; pyKT reference DKT 0.754, SAKT 0.725, AKT 0.785; same protocol (check `technical/ml/public_validation/README.md` for deviations) |

**Synthetic data (pipeline proof only; label "synthetic"):**
| Fact | Value |
|---|---|
| Generator output (seed 42, `full` preset) | 4 institutes, 3,450 students, ~2 million responses (cohort sizes being fixed, see A2) |
| Yearly dropout in generated data | 17-19 % per cohort-year; 25 % of dropouts sudden (unpredictable by design); 43 % of dropouts fall in months 3-4 |
| Modelled calendar effects | festival-season attendance ×0.6 for out-of-town students; January-February dip for class 12 |
| Test suites | 111 passing tests (contracts 14, prompts/config/metrics-collector/slide-design checks 61, generator 12, GenAI 16, public validation 8) |
| Tenant isolation | verified on a real PostgreSQL 16: another tenant sees 0 rows, cannot write across tenants |

**Honest early-warning preview (`technical/docs/FEASIBILITY_CHECK.md` §6; a 6-feature logistic regression, NOT the final model, do not put these on a slide as results):** on synthetic data the model ranks students better overall than the institute's rule (AUC-PR 0.18 vs 0.08), but at a fixed weekly workload it beats a *ranked* attendance rule by only 4-7 %. The slide claim must be about calibrated, explained, privacy-routed support lists, not a big accuracy jump.

## 4. Regulation facts safe for slides (primary text; `TECH_PLAN.md` §24)
- DPDP Act s.9(3): a data fiduciary "shall not undertake tracking or behavioural monitoring of children" (even with consent). Our answer: age-aware routing (minors get academic-support signals; attendance/fee risk for minors only as transparent rules; full ML for 18+ with their own consent).
- MoE Coaching Guidelines 2024 cl. 10.2(xi): results must not be public and should be used for analysis and counselling of students whose performance is deteriorating. **This is our product's mandate in one line.**
- MoE cl. 12(vii): no batch segregation on academic performance (so remedial help is a supplementary session, never a batch change).
- Rajasthan Coaching Centres Act 2025: at least four equal instalments (s.6(2)(d)), penalties Rs 50,000 / Rs 2,00,000.

## 5. Limitations to state (slide 12)
- All student data is synthetic; accuracy proves the pipeline, not the real world. Real validation needs a pilot (2 institutes, one term).
- Sudden dropouts (about a quarter) are not predictable from academic data.
- Internal-test to NTA-percentile mapping is an assumption table until institutes contribute real exam outcomes.
- Cross-institute difficulty scales are comparable only through shared anchor questions.
- The dropout reduction in the financial model (6.6 % effective) is borrowed from other settings; there is no coaching-specific evidence yet.
- Hindi reports are template- and verifier-guarded, but Hindi text still needs a native reviewer (status: pending).
- OMR works on our template; other layouts need one-time onboarding.

## 6. Do NOT claim
- Anything marked PENDING above, any number not in a `metrics.json` or the financial workbook.
- That we beat published OULAD or pyKT numbers (we do not on OULAD; on ASSISTments the comparison depends on matching preprocessing).
- The verifier's earlier "500 of 500" test result: an independent test found gaps; a fix is in progress.
- "We reduce dropout by X %" (finance README §5 has the safe wording).
- That the Rajasthan Act has a minimum age of 16 or is in force (not verified).

## 7. Where each number will come from once agents finish
`python technical/scripts/deck_numbers.py` merges every `artifacts/v*/metrics.json` and prints a table with origin labels and pass/fail against the agreed bars (4 of 32 measured on 2026-10-22; run it again before every deck update). Finance numbers come from `financial/DataMoat_Financial_Model.xlsx` (Cover C7 must say "ALL CHECKS PASS").
