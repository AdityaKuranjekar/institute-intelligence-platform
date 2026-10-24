# Final-round plan (single offline round): three parallel tabs

Status: planning, 24 Oct 2026. Replaces `ROUND2_PLAN.md` where they differ. Source of truth for scope: the Participant Guide (`1792441177680_Case_B_The_Data_Moat.pdf`) plus the organiser update that there is **one offline final**, with **no full prototype required**: a clear model explanation, a front end, and a scaling architecture are enough. The rubric is unchanged: architecture 25, ML rigour 25, feasibility/privacy/safety 20, revenue model 20, market 10.

## 0. What we now have to show (and what we can drop)
| Show | Drop or keep minimal |
|---|---|
| How the synthetic data was made, why each attribute exists, and a picture of it | Production mobile app, ERP features, question bank (out of scope in the guide) |
| Which models we chose, why, how they were trained, how well they work (honest metrics) | A live end-to-end upload pipeline: a front end reading real model outputs is enough |
| Each of the five pain points mapped to a feature, a model and a dashboard view | Round-1 material (12-slide limit no longer binds; keep the deck tight anyway) |
| Architecture that scales: multi-tenant, offline-first, cost per student at 1k / 10k / 100k students | |
| Well-being as a design rule (the guide calls it a requirement) | |
| Financial model that survives the "your job is to challenge this" test | |

## 1. Is the model "useful enough"? Honest check before we build more
- Public anchors: ASSISTments next-answer AUC 0.763 (pyKT DKT 0.754, AKT 0.785); OULAD day-28 withdrawal AUC 0.706 (published 0.794). We are mid-pack, not state of the art. Say so.
- On synthetic institutes a simple model beats the **ranked** attendance rule by only +4 to 7 % at fixed top-k (`FEASIBILITY_CHECK.md`). The value is therefore **not** "better AUC". It is: (1) reasons per student, (2) topic-level weakness the rule cannot see, (3) a list sized to mentor capacity, (4) honest ranges. Lead with these.
- Weakest links to close in Tab 1: IRT parameter recovery, risk-model calibration at mentor capacity, intervention-uplift story (can only be simulated, never proven; say "pilot settles it").
- Nextute's own benchmark note (pasted by the owner, unverified) proposes a "Silent Dropout Risk Index" built on test-completion speed, partial attendance gaps and homework view rates. For under-18s that is behavioural monitoring, which DPDP s.9(3) restricts even with consent. Our design keeps minors on academic signals and rules, and uses behavioural signals only for 18+ with their own consent. Present this as an **improvement on their SDRI**, not a disagreement. Their WhatsApp-first parent reports match ours (consent-based delivery of verified Hindi/English reports).
- Pricing check: that note lists Nextute's own tiers at ₹1,499 / ₹3,999 / ₹7,999 per institute per month, about ₹10 to 20 per student for a 400-student institute, versus our ₹30 per student. The finance tab must explain the gap (tiers, what the analytics add, willingness to pay is untested).

## 2. Tab 1: ML and backend (build)
**Goal:** every model number and every synthetic-data picture the finale needs, as files the front end reads.

### 2.1 Synthetic data story (deliver as a notebook plus a one-page "data card")
1. **Generative story, in causal order:** institute and batch settings; per-student latent ability and per-topic ability (hierarchical); per-question difficulty, discrimination and guessing (2PL/3PL); response = f(ability, difficulty, time pressure, negative marking); engagement latent drives attendance and doubts; household fee stress drives instalment delays; dropout hazard = f(score trend, engagement trend, fee delay, shocks), peaking in months 4 to 5; final percentile from latent ability plus noise.
2. **Why each attribute exists:** one table, columns: attribute, guide schema entity, where it comes from in real life (OMR, Excel, WhatsApp), which decision it supports, which model uses it, privacy class (academic / administrative / behavioural). Attributes with no decision attached get removed.
3. **How to tell what the data is:** (a) plots of marginals against the guide's baselines (8 to 15 % dropout, 400 students, fees, 2 to 4 tests a month); (b) ground-truth vs recovered ability scatter; (c) dropout curve by month; (d) attendance heatmap; (e) messy-source examples (typo'd names, missing rows) with the cleaning rate; (f) a **realism checklist** with source and confidence for each parameter (`generator_config_draft.yaml` already lists these).
4. **Limits:** it proves the pipeline works and that methods recover planted truth; it does not prove real institutes behave this way. State this.

### 2.2 Models: selection, training, evaluation (one comparison table per model)
| Pain point | Model | Alternatives compared | Training and split | Reported metrics |
|---|---|---|---|---|
| Weak topics unseen | Hierarchical 2PL IRT, Rasch fallback for small n | BKT, DKT/SAKT on ASSISTments | Fit per institute; item bank shared across institutes (difficulty only) | Ability recovery r, difficulty recovery r, next-answer AUC, wrong-key detection |
| Dropout and fee default noticed late | LightGBM on academic features (minors) plus survival check (lifelines) | Logistic, attendance rule as practised (B1), ranked rule (B2) | Grouped by student and cohort over several years | Precision and recall at mentor capacity, lead time, calibration error, SHAP reasons |
| Parent trust | Template plus local LLM, 8-check verifier | LLM-only | 150 labelled questions for tagging; report test set | Check pass rate, factual-error rate, Hindi review score |
| Exam outcome | Conformal band over mock-to-percentile mapping (editable table, labelled assumption) | Point prediction | Calibrate on held-out cohort | Coverage (target 80 %), band width |
| Owner cannot tell what works | Batch and faculty comparison with confidence intervals | Raw averages | Mixed-effects or bootstrap | Effect size with interval; "not enough data" flag |
| Small institutes vs national players | Shared item-difficulty bank across institutes (data moat), nothing else crosses tenants | Per-institute only | Simulated 1, 5, 20 institutes | Calibration error vs number of institutes (the moat curve) |

Deliver `ml/artifacts/<institute>/{mastery,risk,percentile,reports,datacard,moat}.json` plus `metrics.json`. These files are the **only interface** to Tab 2.

### 2.3 Fixes already queued (do first)
`R1_A2` (cohort sizes), `R1_E2` (verifier gaps), then agents B (IRT), C (risk and bands), F (tagging; you label 150 questions, `ollama pull qwen3:4b`).

## 3. Value proposition map (one slide and one front-end page)
| Guide pain point | Feature | Model | Dashboard view | Proof we will show |
|---|---|---|---|---|
| Teachers do not know weak topics | Topic-mastery heatmap with uncertainty | IRT | Teacher: student by topic grid | Recovery r; wrong-key catches |
| Dropout and fee default seen too late | Weekly short list with reasons and a supportive action | LightGBM plus rules for minors | Teacher and counsellor: list sized to capacity | Precision at capacity vs B1 and B2 |
| Parents see only marks | Verified Hindi/English WhatsApp-style report | Templates, local LLM, verifier | Parent: report preview | 8 checks; zero invented numbers |
| Owners cannot measure what works | Batch, faculty and method comparison with intervals | Mixed-effects or bootstrap | Owner: comparison and retention | Effect sizes, "not enough data" gate |
| Locals cannot match national players | Shared question-difficulty bank, never student data | IRT difficulty pooling | Owner: benchmark card | Calibration vs number of institutes |

## 4. Scaling architecture (Tab 1 writes, Tab 3 visualises)
- Stages: **Pilot** (one laptop or VM, local models) → **Seed** (managed PostgreSQL with row-level security, object store, worker queue for OMR and ML jobs, one region) → **Scale** (stateless API replicas, job workers autoscaled, read replicas, per-tenant encryption keys, nightly retrain per institute, monthly item-bank refresh).
- Tenant isolation: row-level security on every table (tested on live PostgreSQL 16), per-tenant keys, shared tables hold difficulty numbers only.
- Offline-first: phone web app (PWA) queues scans and attendance, syncs when online; OMR runs on-device or on the institute laptop.
- Cost per student per month at 1k, 10k and 100k students: compute from the financial model drivers (₹3.6 today at pilot scale); show which line moves (WhatsApp messages, compute, storage, AI reports) and where the curve flattens.
- Failure modes slide: no internet, bad scan, wrong answer key, model has too little data (says "not enough data"), LLM down (template fallback).

## 5. Tab 2: front end (build)
Next.js, TypeScript, Tailwind, shadcn/ui, ECharts. Reads `ml/artifacts/*` through a thin mock API, so it never waits for Tab 1; swap to the real FastAPI later.
Screens, in demo order: **Capture** (CSV upload and OMR photo, with the staged data-quality report) → **Teacher** (topic heatmap, at-risk list with reasons and supportive actions, no ranking) → **Student** (own mastery, study plan, percentile range) → **Parent** (Hindi/English report preview) → **Owner** (batch and faculty comparison, retention, ROI) → **Data card** (the synthetic-data pictures from 2.1) → **How it works** (architecture and well-being rules).
Rules: well-being is visible (no leaderboards, no red labels for students or parents, counsellor route); every number shows its origin tag (synthetic, public, model, assumption); works at phone width.

## 6. Tab 3: videos and explainer (build, after numbers lock)
1. Financial-model explainer video: why the model is built this way, the naive example vs our corrected numbers, base, bear and bull, what we still cannot prove.
2. One self-contained HTML page: interactive architecture (layers, tenant isolation, offline sync, scaling stages, cost per student slider).
3. Narrated video: architecture plus front-end walkthrough, with a free local voice-over (HyperFrames with its TTS; no paid services).
Start now: scripts, storyboards, fonts and style. Wait for: locked finance numbers (already v1.1) and the first front-end screens.

## 7. How to run the tabs
- **Tab 0 (this tab):** coordinator. Owns this plan, the contracts, decisions and merges. Ask here how to manage the others.
- **One git worktree and branch per tab** (`tab1-ml`, `tab2-web`, `tab3-video`) so edits never collide. Ownership: Tab 1 owns `technical/` (except `web/`), Tab 2 owns `technical/web/`, Tab 3 owns `presentation/video/`. Nobody edits `contracts/` or `financial/` without a note here.
- **Interface freeze:** the `artifacts/*.json` schemas (Tab 1 publishes a sample file within the first hour of work so Tab 2 can start).
- **Definition of done per tab:** Tab 1: all `metrics.json` bars measured, data card complete, tests green. Tab 2: seven screens working on the artifacts, no console errors, phone width. Tab 3: three outputs exported and watched end to end.
- **Order:** Tab 1 and Tab 2 start together; Tab 3 starts scripts now and renders last.

## 8. Research still needed (optional, one prompt)
WhatsApp Business Platform price per conversation in India, 2026 (utility and marketing categories). It feeds cost per student and the Nextute note's ₹0.40 to 0.60 claim is unverified. Prompt: "Using only Meta's official WhatsApp Business Platform pricing page and India rate card, give the current per-message or per-conversation price in INR for utility, authentication and marketing categories in India, the effective date, free-tier rules, and whether a parent report with a PDF attachment counts as one message. Quote the source URL and date for each number; say 'not found' rather than estimate."
Everything else (percentile tables, NEET pattern, Hindi review) is already tracked in `CLAUDE.md`.
