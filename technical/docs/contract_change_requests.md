# Contract Change Requests (`contracts-v1.0.0`)

Per `docs/TECH_PLAN.md` §19 and `docs/agent_prompts/P0_contracts.md`, any gap, ambiguity, or contradiction discovered in `docs/TECH_PLAN.md` or `docs/generator_config_draft.yaml` is logged here without editing `docs/TECH_PLAN.md`. In each case, the Phase 0 Contracts Agent adopted the more conservative, legally and technically safe resolution in `contracts/`.

---

## CCR-001: Multi-Tenancy `institute_id` on Relational Child Tables (`test_questions`, `responses`, `test_totals`, `mastery_snapshots`, `risk_scores`, `predictions`, `interventions`, `reports`, `batch_changes`, `answer_keys`)
- **Logged by:** Phase 0 Contracts Agent (2026-10-20)
- **Where:** `docs/TECH_PLAN.md` §8 (Data model table) vs. §8 heading ("`institute_id` on every tenant row + RLS") and `P0_contracts.md` Deliverable #4 ("every tenant table has `institute_id uuid NOT NULL`, `ENABLE` + `FORCE ROW LEVEL SECURITY`, and a policy `USING (institute_id = current_setting('app.institute_id')::uuid)`").
- **Issue:** In `TECH_PLAN.md` §8's shorthand table, several tenant-scoped child tables (`test_questions`, `responses`, `test_totals`, `mastery_snapshots`, `risk_scores`, `predictions`, `interventions`, `reports`, `batch_changes`, `answer_keys`) omitted `institute_id` from the abbreviated "Key fields" column even though §8's header and Deliverable #4 mandate `institute_id uuid NOT NULL` + forced RLS on every tenant row.
- **Conservative Resolution Chosen in `contracts/schema.sql`:** Added `institute_id uuid NOT NULL REFERENCES institutes(id) ON DELETE CASCADE` + `ENABLE` and `FORCE ROW LEVEL SECURITY` + the `app.institute_id` policy to all 25 tenant-scoped tables (plus `institutes` itself via `id = current_setting('app.institute_id')::uuid` and `questions` via `institute_id IS NULL OR institute_id = ...`). This avoids expensive multi-table joins inside Postgres RLS policies and guarantees zero cross-tenant leakage.
- **Status:** Open for human review before tagging `contracts-v1.0.0`.

---

## CCR-002: Rajasthan Coaching Centres Act 2025 Instalment Clause Citation (`s.6(2)(d)` vs `s.6(2)(e)`)
- **Logged by:** Phase 0 Contracts Agent (2026-10-20)
- **Where:** `docs/TECH_PLAN.md` §15 line 347 and §24 D13 (`s.6(2)(d)`) vs. `docs/generator_config_draft.yaml` line 51 and `docs/research_results.txt` R4b line 356 (`s.6(2)(e)`).
- **Issue:** `TECH_PLAN.md` notes that the Rajasthan four-equal-instalments clause was corrected from `s.6(2)(e)` to `s.6(2)(d)` after reading the enacted text, whereas `generator_config_draft.yaml` still cites `s.6(2)(e)` in its comment.
- **Conservative Resolution Chosen in `contracts/`:** Represented the fee plan enum value neutrally as `rajasthan_4_equal` in `contracts/enums.yaml` and `contracts/schema.sql`. When Agent A copies `docs/generator_config_draft.yaml` to `datagen/config/generator_config.yaml`, the comment should cite `s.6(2)(d)`.
- **Status:** Open for human review.

---

## CCR-003: Upfront Fee Share Default (`0.35` in `generator_config_draft.yaml` vs `15/25/40 %` in `TECH_PLAN.md` §9)
- **Logged by:** Phase 0 Contracts Agent (2026-10-20)
- **Where:** `docs/TECH_PLAN.md` §9 line 203 vs. `docs/generator_config_draft.yaml` line 49.
- **Issue:** `TECH_PLAN.md` §9 notes that the 35% upfront fee share in `generator_config_draft.yaml` is unsourced ("inferred") and that the financial model uses 15/25/40% as an explicit assumption.
- **Conservative Resolution Chosen in `contracts/`:** `contracts/schema.sql` (`fees` table) and `contracts/csv_templates/fees.csv` store explicit per-instalment `amount_paise` and `due_date` rows, making the schema agnostic to the exact upfront percentage knob used by Agent A.
- **Status:** Open for human review.

---

## CCR-004: SQL Column Naming vs Reserved Keywords (`class` -> `class_level`, `date` -> `test_date`/`attendance_date`/`activity_date`, `at` -> `changed_at`/`occurred_at`)
- **Logged by:** Phase 0 Contracts Agent (2026-10-20)
- **Where:** `docs/TECH_PLAN.md` §8 shorthand column list vs. `P0_contracts.md` Deliverable #3/#4/#9.
- **Issue:** `TECH_PLAN.md` §8 uses shorthand column names `class` (on `batches`), `date` (on `tests`, `attendance`, `engagement`), `due` (on `interventions`), and `at` (on `batch_changes`, `audit_log`), which collide with SQL/Python reserved keywords (`class`, `date`) or `P0_contracts.md` Deliverable #9 (`class_level`).
- **Conservative Resolution Chosen in `contracts/`:** Used unambiguous `snake_case` column names (`class_level`, `test_date`, `attendance_date`, `activity_date`, `due_date`, `changed_at`, `occurred_at`) consistently across `contracts/schema.sql`, `contracts/datasets.yaml`, `contracts/csv_templates/*.csv`, and `contracts/data_dictionary.md`, and included the shorthand forms in `contracts/csv_templates/header_synonyms.yaml`.
- **Status:** Open for human review.

---

## Human-review queue for `contracts-v1.0.1` (added 2026-10-21 by senior-analyst review; evidence in `docs/FEASIBILITY_CHECK.md`)

### CCR-005: Tighten IRT bars (`metrics_bars.yaml`)
- `irt_difficulty_recovery_r_n60`: 0.75 → **0.90**; add `irt_difficulty_recovery_r_n30 >= 0.85` (blocking); add `irt_difficulty_recovery_r_n60_misspecified >= 0.80` (report); add `irt_discrimination_recovery_r_n200` (report).
- Why: a naive model already reaches 0.88–0.92 at n = 30–60 in simulation, so the current bars prove nothing.

### CCR-006: Replace absolute early-warning bars by workload-matched relative bars
- `ew_median_lead_time_days` (>= 21, blocking) → **report**, evaluated at fixed top-k and shown beside the rule baseline at the same top-k.
- `ew_gradual_dropout_recall_at_capacity` (>= 0.60, blocking) → **report**; add `ew_gradual_recall_rel_gain_over_rule_at_capacity >= 0.25` (blocking) and `ew_precision_at_capacity_rel_gain_over_rule >= 0.25` (blocking); add `ew_distinct_students_flagged_per_month` (report; alert fatigue).
- Why: lead time is gameable by flagging chronic low attenders early, and it is set by our own generator's fade parameter; absolute recall depends on generator noise.

### CCR-007: Replace the temporal split by multi-year cohorts
- TECH_PLAN §10 "train months 1–6 / test months 7–12" puts the dropout peak (months 3–4) in training and leaves too few test events. Generator must emit **≥ 3 academic-year cohorts per institute**; train on earlier years, test on the last year; plus leave-one-institute-out. `datasets.yaml` needs `academic_year` on `students` (present), `batches` (present) and a note that tests/attendance span years.
- Add `n_events_test` and `n_events_per_slice` to `metrics.schema.json` so thin results are visible; fairness slices with < 30 events report "insufficient data".

### CCR-008: `item_params` column names in `datasets.yaml` vs `schema.sql`, and prompt alias names in truth tables
- **Logged by:** Agent A (DataGen, 2026-10-21)
- **Where:** `contracts/datasets.yaml` (`item_params`, `true_item_params`, `dropout_events`, `true_final_outcomes`) vs `contracts/schema.sql` (`item_params`) and `docs/agent_prompts/R1_A_datagen.md` / `R1_B_irt_mastery.md` / `R1_C_risk_band.md`.
- **Issue:**
  1. `datasets.yaml` `item_params` defines columns `(institute_id, question_id, a, b, c, point_biserial, key_confidence, suspected_wrong_key, n_responses, updated_at)`, whereas `schema.sql` `item_params` defines `(question_id, institute_id, model_version, a, b, g, se_b, n_responses, fit_flag)`.
  2. `R1_A_datagen.md` / `R1_B` / `R1_C` refer to `key_error_flag` (in `datasets.yaml`: `is_injected_wrong_key`), `type`/`reason` (in `datasets.yaml`: `dropout_type`/`dropout_reason`), and `internal_mock_scale_score` (in `datasets.yaml`: `true_final_score`).
- **Conservative Resolution Chosen by Agent A:** Parquet files strictly follow `contracts/datasets.yaml` (the machine-readable parquet contract). In `datagen`'s Postgres `schema.sql` loader test, `item_params` maps `c -> g`, `suspected_wrong_key -> fit_flag ('suspect_wrong_key' / 'ok')`, `model_version = 'v1.0.0'`, and `se_b` computed from `n_responses`. Proposed for `contracts-v1.0.1`: align `datasets.yaml` `item_params` with `schema.sql` and document the truth-table column names across prompts.


### CCR-009: Early-warning baselines and metric definitions after the generator preview (2026-10-21, human/analyst review)
- Evidence: `analysis/feasibility/preview_early_warning_on_generator.py` run on `data/clean` from `datagen --seed 42 --preset full`, train 2024-25, test 2026 (logistic regression, 6 features). AUC-PR 0.18 vs 0.079 for the institute rule (+131 %), but **at fixed top-k (2/4/8 % per week) the model beats the *ranked* rule by only +4 % to +7 % in precision and recall**, because gradual dropouts are mostly an attendance fade the rule already catches. Event-level "ever flagged before dropout" recall is inflated (38 % of all students flagged at least once at top-4 %/week).
- Resolution: B1 (rule as practiced, unranked) vs B2 (rule ranked by attendance) baselines; blocking relative-gain bars use B1, B2 gains are report-only; primary metrics are weekly-snapshot precision@k/recall@k over student-weeks (event-level recall is report-only). `metrics_bars.yaml` updated; `R1_C_risk_band.md` updated. **Do not move the generator or the bars to make the B2 gain look bigger.** The honest product claim: calibrated, explainable, privacy-routed support lists with earlier and better-ranked coverage than the institute's practice, not a large accuracy leap over "sort by lowest attendance".


### CCR-011: PS-suggested schema fields missing from contracts (queued for v1.0.1, from `docs/PS_COVERAGE.md`)
- Add nullable `responses.time_taken_sec` (the PS `test_responses` lists it); update `datasets.yaml` `responses` and the generator output for online tests; OpenAPI untouched.
- Add table `student_outcomes` (institute_id, student_id, academic_year, dropout_month nullable, actual_exam_percentile nullable, exam enum, entered_by, entered_at) with the standard RLS policy: the real-exam-label leg of the moat. Synthetic truth stays in `truth/`.

### CCR-012: Batch-faculty link (queued, optional P2)
- Add `batch_subject_teachers(institute_id, batch_id, subject, teacher_user_id, from_date, to_date)` so owners can see batch/faculty effectiveness (PS: owners cannot measure which batches, faculty or teaching methods actually work). The generator already has a batch x topic effect, which makes this testable.
