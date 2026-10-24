# Tab 1 plan: ML, synthetic-data story and artifacts

Status: plan v1, 24 Oct 2026. Parent: `FINAL_ROUND_PLAN.md` §2. Owner: Tab 1 (`technical/` except `web/`). **Tab 2 builds against §3 (the artifact interface) and the sample files in `ml/artifacts/samples/`; nothing else from Tab 1 is needed to start.**

## 1. Deliverables (what "done" means)
| # | Deliverable | Where | Done when |
|---|---|---|---|
| D1 | Fixes `R1_A2` (cohort 10/25/65 %) and `R1_E2` (verifier gaps) | `datagen/`, `backend/app/genai/` | 12 + 16 tests green, data regenerated (seed 42) |
| D2 | Data story notebook | `notebooks/01_synthetic_data.ipynb` (extend) | Runs top to bottom in under 5 min, all figures saved |
| D3 | Attribute table (why each field exists) | `docs/DATA_ATTRIBUTES.md` and `artifacts/<inst>/datacard.json` | Every attribute has a decision, a model and a privacy class; orphans removed |
| D4 | Data card with pictures, realism checklist and limits | `docs/DATA_CARD.md`, `ml/artifacts/figures/*.png` | 6 figures; checklist rows carry source and confidence |
| D5 | One comparison table per model | `docs/MODEL_TABLES.md` and `metrics.json` | 6 tables as in §4 |
| D6 | Model artifacts (JSON) | `ml/artifacts/<institute>/` and `ml/artifacts/metrics.json` | Validate against schemas; manifest hashes recorded |
| D7 | Scaling and cost inputs for Tab 3 | `ml/artifacts/scaling.json` | Cost per student at 1k / 10k / 100k from finance drivers |

## 2. Work order
1. **S0 (first hour): publish the interface.** Samples are already in `ml/artifacts/samples/`; JSON Schemas go to `ml/artifacts/schemas/`. Tab 2 starts here.
2. **S1:** D1 fixes, regenerate data, rerun the 116 tests.
3. **S2: IRT** (hierarchical 2PL, Rasch fallback, wrong-key detection) → `mastery.json`. Do first: the heatmap is the demo centrepiece.
4. **S3: risk** (LightGBM on academic features for minors, full tier for 18+; baselines logistic, B1, B2; SHAP reasons; lifelines survival check) → `risk.json`.
5. **S4: percentile band** (conformal, editable mapping table) → `percentile.json`.
6. **S5: owner comparison** (bootstrap or mixed-effects with an "insufficient data" gate) → `owner.json`.
7. **S6: data-moat curve** (1, 5, 20 simulated institutes sharing item difficulty only) → `moat.json`.
8. **S7: reports** (templates plus `qwen3:4b` vs `gemma3:4b`, 8-check verifier; tagging needs the owner's 150 labels) → `reports.json`.
9. **S8:** data card and tables (D2 to D5), `scaling.json`, final `metrics.json`, `deck_numbers.py` check.
S2 to S7 all need S1. Only the tagging part of S7 waits on the owner's labels.

## 3. Artifact interface (the contract with Tab 2)
Folder `technical/ml/artifacts/`. Tab 2's mock API serves these paths read-only. The later FastAPI keeps the same JSON bodies (shapes follow `contracts/openapi.yaml`: `batch_heatmap_response`, support list, owner dashboard).

```
ml/artifacts/
  metrics.json          all metrics (contracts/metrics.schema.json)
  manifest.json         hashes, seeds, versions (contracts/artifact_manifest.schema.json)
  scaling.json          cost per student vs scale, stages, failure modes
  moat.json             calibration error vs number of institutes
  figures/*.png         data-card pictures
  samples/              valid placeholder examples of every file (use these now)
  <institute>/          patna_jee, lucknow_neet, gaya_both, kota_large
    mastery.json  risk.json  percentile.json  reports.json  owner.json  datacard.json
```
**Envelope on every file:** `schema` ("mastery/1"), `model_version`, `generated_at`, `generator_seed`, `institute_id`, `origin` (`synthetic` | `public` | `model` | `assumption`). Tab 2 must show `origin` beside every number.

| File | Screen | Body (besides envelope) |
|---|---|---|
| `mastery.json` | Teacher, Student | `topics[]` (topic_id, name_en, name_hi, subject, probably_untaught); `batches[]`; `cells[]` (student_id, topic_id, theta, se, band = strong / steady / needs_support / not_enough_data); `wrong_key_flags[]` |
| `risk.json` | Teacher, counsellor | `capacity_per_week`; `operating_point` (precision, recall, lead_time_days); `list[]` (student_id, week, priority_slot, track = academic_support / full, reasons[] with en and hi text, supportive_action, consent_ok); `baselines` (b1, b2, model) |
| `percentile.json` | Student | `students[]` (low, mid, high, mapping_table_id, assumption); `mapping_table[]`; `calibration` (empirical_coverage, mean_width); `coverage_target` 0.8 |
| `reports.json` | Parent | `reports[]` (student_id, language hi/en, month, body, numbers_json, checks[], source llm/template, verified); `summary` (pass_rate, invented_numbers, template_fallbacks); `hi_reviewed` flag |
| `owner.json` | Owner | `batch_compare[]` and `faculty_compare[]` (value, ci_low, ci_high, n, enough_data); `retention` (monthly, by_reason); `roi` (low / base / high ratio, origin assumption, tied to financial v1.1) |
| `datacard.json` | Data card | `story_steps[]`; `attributes[]` (name, entity, real_world_source, decision, model, privacy_class); `checklist[]` (parameter, our_value, source, confidence); `figures[]` (path, caption, origin); `cleaning` (rate, examples); `limits[]` |
| `student.json` | Student | `students[]`: display_name, language_pref, streak_weeks, headline, mastery_by_subject (theta, trend), strengths, focus_topics (est_minutes), study_plan, score_trend, percentile_range, milestones, support_contact. Effort-based, no rank |
| `parent.json` | Parent (WhatsApp) | `parents[]`: consent, monthly_summary (attendance, tests, marks_trend, fee, what_you_can_do, next_meeting), `whatsapp_messages[]` (type, status sent/delivered/read, body_hi, body_en, has_pdf, verified), notification_prefs, faq |
| `moat.json` | Owner benchmark card | `points[]` (n_institutes, calibration_error, ci_low, ci_high) |
| `scaling.json` | How it works | `stages[]`; `cost_per_student[]` (students, inr, lines: compute, whatsapp, storage, ai_reports, support); `failure_modes[]` |

**Rules baked into the data (Tab 2 must honour them):**
- Never sort or rank students by mastery or risk. `priority_slot` only sizes the list to mentor capacity.
- `band: not_enough_data` and `enough_data: false` render as "not enough data", never as a number.
- Minors are always `track: academic_support`. No raw probabilities appear in student or parent views.
- Reasons use the neutral wording from `reason_templates.yaml` (no red labels).
- Field names freeze after S0. Additions are fine; renames need a note in `FINAL_ROUND_PLAN.md`.
- Real values replace the samples in place, at the same paths, as S2 to S8 finish.

## 4. Per-model comparison tables
Each table lists: model, what was compared, data and split, training (library, seed, time on RTX 4060), metrics with 95 % CI, verdict.
| Model | Compared | Split | Headline metrics (bars in `metrics_bars.yaml`) |
|---|---|---|---|
| IRT | Rasch, 2PL, hierarchical 2PL, BKT, DKT, SAKT | Per institute; items shared | ability r, difficulty r, next-answer AUC, wrong-key catch rate |
| Risk | B1 rule, B2 ranked rule, logistic, LightGBM, survival check | Grouped by student and cohort year | precision and recall at capacity, lead time, ECE, SHAP stability |
| Percentile | point regression vs conformal band | Calibrate on held-out cohort | coverage (target 0.80), width |
| Reports | LLM-only vs template vs template + LLM + verifier; qwen3:4b vs gemma3:4b | Report test set | check pass rate, factual-error rate, Hindi score |
| Owner comparison | raw mean vs bootstrap vs mixed-effects | Simulated batches with planted effects | interval coverage, false-difference rate |
| Moat | per-institute vs pooled difficulty | 1, 5, 20 institutes | calibration error curve |
Where a simple baseline is within a few points, the table says so. The product value is reasons, topic detail, capacity sizing and honest ranges.

## 5. Synthetic data story (D2 to D4)
- **Notebook sections, causal order:** institute and batch settings; hierarchical ability; item parameters; response model with negative marking and blanks; engagement, attendance, fees; dropout hazard and sudden dropouts; outcome percentile; messy exports and cleaning rate.
- **Figures** (saved to `ml/artifacts/figures/`): marginals vs guide baselines; true vs recovered ability; dropout by month; attendance heatmap; messy-source example with cleaning rate; moat curve preview.
- **Attribute table** is generated from `contracts/datasets.yaml` and `features.yaml`, so it cannot drift. A test fails any attribute with no model and no decision.
- **Realism checklist** comes from `generator_config.yaml` source and confidence comments.
- **Limits text:** the pipeline and recovery of planted truth are proven; real-institute behaviour is not.

## 6. Tests and gates
Schema validation of every artifact file; every number in `datacard.json` and `metrics.json` reproducible from seed 42; no minor appears in the `full` track; `reports.json` has zero unverified entries; `scripts/deck_numbers.py` still merges. Run `python -m pytest tests -q`.

## 7. Risks
IRT fit time (use EM or variational, cap iterations); owner labels late (tagging only); Hindi unreviewed (`hi_reviewed: false`); uplift cannot be proven (say "pilot settles it").
