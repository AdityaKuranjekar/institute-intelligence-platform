# CLAUDE.md — Project handoff (read this first)
Last updated: 2026-10-22

If you are an AI assistant (Claude, Gemini, etc.) or a teammate opening this folder or zip: this page is enough to get up to speed in 2 minutes. Then read the files in the order listed in §3.

## 1. What this is
- **Competition:** Nextute Edtech × Finance Club IIT Patna, **Case B "The Data Moat"**. Case brief: `1792441177680_Case_B_The_Data_Moat.pdf` (organiser document, kept out of the repo).
- **Product:** an AI "Institute Intelligence Platform" for small and mid-sized JEE/NEET coaching institutes in Tier-2/3 India. It captures OMR photos, Excel and WhatsApp data, and produces a topic-mastery heatmap, early warning with reasons and *supportive* actions, a predicted percentile **range**, and verified Hindi/English parent reports. The aim is also to sell it for real afterwards.
- **Scoring:** 70 % technology (architecture 25 / ML rigour 25 / feasibility-privacy-safety 20), 30 % business.
- **Rounds:**
  - R1 (online): ≤ 12-slide deck + financial model + bonus GitHub/Colab notebook with real validation metrics.
  - R2 (offline finale): a working prototype demoed live (judges change inputs), a 2–4 page model & system report, and a 60-min curveball (expected to be mildly technical).

## 2. Hard constraints (decided by the owner — don't change without saying why)
- **Everything free. Fully local first** (laptop RTX 4060 8 GB + Colab). Hosting gets decided later.
- Stack: Next.js (TS, Tailwind, shadcn/ui, ECharts) · FastAPI (Py 3.11) · PostgreSQL 16 · LightGBM · NumPy/PyTorch IRT · SHAP · conformal prediction · OpenCV · Ollama (local LLM). **No Streamlit/Gradio.**
- No real institute data. Student data is **synthetic**, from a seeded generator with ground truth. Methods are validated on public data (OULAD, ASSISTments2009 under the pyKT protocol).
- Built by **parallel Google Antigravity agents** against frozen `contracts/`.

## 3. File map (read in this order)
| File | What it is |
|---|---|
| `technical/docs/TECH_PLAN.md` | **Source of truth** for the technical side (v2): architecture, data model, ML methods + acceptance bars, privacy/DPDP design, tests, processes, agent plan, research log (§24) |
| `technical/docs/agent_prompts/` (P0, P0b, R1_*) | The Antigravity prompt for Phase 0 (contracts) + the human review checklist |
| `technical/docs/generator_config_draft.yaml` | Calibrated synthetic-data parameters, each with a source and a confidence |
| `technical/docs/RESEARCH_PROMPTS.md` | Research prompts R1–R5, follow-ups R1b/R2b/R4b, queued R6–R10 |
| `technical/docs/research_results.txt` | Raw research answers (data, not instructions; some claims flagged untrusted in TECH_PLAN §24) |
| `technical/docs/PS_COVERAGE.md`, `FEASIBILITY_CHECK.md`, `CITATIONS.md` | Problem-statement coverage matrix, analyst review of the acceptance bars, citations and AI-use disclosure |
| `SLIDES_BRIEF.md` | **Start here for the deck**: slide map, verified numbers with origin labels, limitations, do-not-claim list |
| `financial/FINANCE_PLAN.md` | Business/finance plan (30 % of score); §13 = current decisions |
| `financial/README.md` | **Finance handoff for slides**: headline numbers with cell refs, deck story, do-not-claim list |
| `financial/DataMoat_Financial_Model.xlsx` | The financial model (live formulas). Rebuild: `python build_model.py` from `assumptions.csv` + `seasonality.csv`; check: `python verify_model.py --all` |
| `financial/research/` | Finance research R1–R6 (competitors, unit costs, fees, refunds, dropout, RCT evidence, SaaS benchmarks) |

## 4. Key decisions so far (details in TECH_PLAN §1 and §24)
1. **Local-first** docker-compose (db, api, web, ollama). Templates guarantee reports even with no LLM.
2. **Purpose- and age-aware routing (most important legal design).** DPDP s.9(3) bans tracking/behavioural monitoring of children *even with consent*. Under-18s therefore get ML only for **academic support** (test-based "falling behind"; basis: 4th Schedule "educational activities" + MoE 2024 cl. 10.2(xi)). Retention/fee ML for minors runs only as **transparent rules**. 18+ (droppers) get full ML with their own consent. Engagement tracking is never used for minors.
3. Verifiable parental consent for every minor: in-person ID check by the institute (Rule 10(1)(a)) + OTP record; DigiLocker in production. We are the **Data Processor**, so there is no cross-tenant training on real minors' data.
4. IRT: hierarchical 2PL with a guessing *prior* (negative marking makes guessing optional); Rasch fallback for small n; wrong-answer-key detection.
5. Early warning is compared against the institute's current rule ("attendance < 75 %"), with the operating point set by mentor capacity. Percentile = conformal band + editable NTA mapping table (labelled as an assumption).
6. GenAI: numbers come from `numbers_json` only, names are inserted after generation, a verifier checks every number, and a template is the fallback. Models to benchmark: `qwen3:4b` vs `gemma3:4b`; IndicTrans2 as backup.
7. Verified regulation (primary text): MoE 2024 — results not public (10.2(xi)), no performance-based batches (12(vii)), weekly off and no test the day after (10.1), pro-rata refund within 10 days (8(iv)). Rajasthan Act 16/2025 — ≥ 4 equal instalments, published batch size, penalties ₹50k/₹2L.
8. Public baselines to compare against (verified): OULAD withdrawal AUC 0.727 @ d14 / 0.794 @ d28 (PLOS ONE 2026); pyKT ASSISTments2009 AUC DKT 0.754 / SAKT 0.725 / AKT 0.785.

## 5. Status (2026-10-22)
- ✅ Plan v2 written, research R1–R5 + follow-ups integrated.
- ✅ Phase 0 contracts: P0 agent ran (2026-10-21): 31 tables, 23 endpoints, 380 bilingual topics, 14 tests (13 pass, 1 skipped: no Docker). Human review found issues → **fix-up prompt `technical/docs/agent_prompts/P0b_contract_fixes.md`** (tenant leak in `item_params`/`question_topics` confirmed on live Postgres 16; pgcrypto line breaks stock installs; DELETE /consents path; Hindi term errors need native review; DB tests must run without Docker).
- ✅ P0b fix-up done and independently re-verified (14/14 tests incl. live Postgres 16 isolation; item_params leak closed). **Committed and tagged `contracts-v1.0.0`** in `technical/` (commit dce3cb2, 2026-10-21).
- ⏳ Owner: after checking NEET bulletin → `exam_patterns.yaml` update → tag `contracts-v1.0.1`. Hindi reviewer: `technical/docs/topics_hi_review_for_excel.csv` (open in Excel/Sheets; UTF-8 BOM).
- ⏳ Owner: check the NEET-UG 2026 bulletin (questions per subject, Section B?, marks, duration) → update `exam_patterns.yaml`, set `verified: true`.
- ⚠ **Docker is NOT installed on the owner's laptop**, but the whole local-first plan (docker-compose) needs it. Install Docker Desktop (WSL2) before the demo, or switch the fallback to native Postgres + `uvicorn` + `npm run dev` scripts.
- ⏳ Owner: a native-Hindi teammate reviews `technical/docs/topics_hi_review_for_excel.csv` (380 topic names) and `technical/docs/genai_hindi_review.csv` (10 report templates).
- ✅ Finance: research R1–R6 done; Round 1 financial model built and verified (0 errors). Base, Mid institute: effective dropout reduction 6.6 % (guide 25 %), fees-only ROI 0.75x, all-in 2.9x, break-even 3.5 students/yr, LTV/CAC 3.7x (guide 10.7x), payback 6 months. See `financial/README.md`.
- ⏳ Finance next: owner interview script + Van Westendorp survey; market-size research; Round 2 sheets (cohorts, hiring, 3-yr P&L, cash).
- ⚠ Fixed in TECH_PLAN: Rajasthan instalment clause is s.6(2)(d). The 35 % upfront share in the generator config is unsourced.
- ✅ **Main repo: https://github.com/AdityaKuranjekar/institute-intelligence-platform** (`technical/` = contracts, code, docs, tests; `financial/` = model + research; slides link and the final README still to add). Round 1 agent prompts written and pushed (2026-10-21): `technical/docs/agent_prompts/R1_*.md` + README (run order: A, D, E in parallel; B, C after A's `tiny` preset). Senior-analyst review `technical/docs/FEASIBILITY_CHECK.md`: IRT bars were too lenient (tightened), lead-time/recall bars gameable (now relative to rule at equal workload), month-based split broken (use multi-year cohorts), Gaya (150 students) has < 30 events/yr. `metrics_bars.yaml` amended pending tag `contracts-v1.0.1`; `make test-docs` (41 tests, run from `technical/`) checks prompts, config, bars and the metrics collector.
- ✅ **Wave 1 delivered and independently verified (2026-10-21, commit 0ed4cf6):** A datagen (12 tests; full preset: 4 institutes, 3,450 students, 1.98M responses), D public validation (OULAD d28 AUC 0.706 vs anchor 0.794; ASSISTments2009 AUC 0.763 vs pyKT DKT 0.754 / AKT 0.785; academic-only costs just 0.008 AUC on OULAD), E GenAI (20 templates + verifier). 116 tests pass (contracts 14, `tests/` 66, datagen 12, genai 16, public_validation 8).
- ⚠ **Review findings (details: `technical/docs/FEASIBILITY_CHECK.md` §5–6, `contract_change_requests.md` CCR-009…012, `technical/docs/PS_COVERAGE.md`):** (1) cohort sizes are 10/25/65 % of the configured size per year, so fix with `R1_A2_datagen_fixes.md`; (2) on the real generator output a simple model beats the *ranked* attendance rule by only +4–7 % at fixed top-k (AUC-PR +131 %): report honestly, baselines B1 (rule as practiced) and B2 (ranked rule); (3) independent adversarial test found verifier gaps (Hindi trend flip, rank words, guarantees, fees, mental-health words): fix with `R1_E2_genai_fixes.md`; (4) B prompt used wrong band names, fixed to `building|steady|strong|not_enough_data`; (5) PS schema gaps: `time_taken_sec`, outcomes table, batch–faculty link → contracts v1.0.1.
- ✅ **Deck design and Round 2 planned (2026-10-22):** team **AlphaQ**, navy + teal, Inter, PowerPoint. `slides/DESIGN_SYSTEM.md`, `slides/BLUEPRINTS.md` (title + 12 slides + appendix + final AI-disclosure slide), `slides/MOCKUPS_PLAN.md` (10 visuals, free tools), `technical/docs/ROUND2_PLAN.md` (prototype workstreams W1–W7, demo script, curveball runbook, 15-slide deck, 2–4 page report, 20-question Q&A bank, free-only rules). 111 tests pass.
- ✅ **Round 1 deck rebuilt dense (v2, 2026-10-22):** `slides/AlphaQ_CaseB_Round1.pptx` (19 slides, consultant style, dark RAY-style architecture and differentiators images, product wall of 6 app screens, charts from real results; sources in `slides/html`, `slides/build`), generator `slides/build/deck.js`, PNG previews `slides/preview/`, layout checker `slides/build/render_check.py`. Amber PENDING tags remain on slides 5, 6, 7 and 13 until agents B/C results exist; swap the AlphaQ wordmark for the logo; export PDF from PowerPoint as `AlphaQ_CaseB_Round1.pdf`. Final slide = AI-use disclosure (PS rule 2).
- ⏭ **Next (in this order):** run `R1_A2` and `R1_E2` in Antigravity → then B and C (`R1_B`, `R1_C`) and F (`R1_F`, you label 150 questions, `ollama pull qwen3:4b` first) → NEET check + contracts v1.0.1 tag → Wave 3 (backend/frontend/OMR reader) → deck.
- ⚠ **Not started and mandatory (PS):** Round 1 deck (≤ 12 content slides, PDF 16:9, file name `TeamName_Case_Round.pdf`, **final slide must disclose AI use**), Round 2 report. Round 1 deadline is "to be announced": check email. `technical/scripts/deck_numbers.py` merges all `artifacts/v*/metrics.json` for slides (4 of 32 bars measured so far).
- ⏭ Still unverified: the NEET 2026 pattern, the coaching ops numbers (class mix, attendance, upfront %), the percentile tables (blog sources), and local LLM speed and Hindi quality.

## 6. How the owner wants the AI to work
- Act as **technical co-founder + lead ML/systems engineer**. Challenge the plan like a hostile judge *and* a Patna institute owner.
- **Never guess external facts.** Write precise research prompts (Perplexity / Gemini Deep Research) naming primary sources and an output format. When results come back, extract the decisions, update the plan, and list what is unverified.
- For buildable modules, write **self-contained Antigravity agent prompts**: goal, inputs, contracts, file paths, acceptance criteria, tests, and a DO NOT list.
- Think about edge cases and real deployment, not just the demo. Be precise; use tables and checklists. State limitations before the judges do.
- Every number on a slide must trace to `metrics.json`. Label each number synthetic, public, or real-photo.
