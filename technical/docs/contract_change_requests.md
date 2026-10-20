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
