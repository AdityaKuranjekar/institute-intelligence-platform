# Phase 0b Agent Log — Contract Fix-Ups (`P0b_contract_fixes`)

- **Agent Role:** Phase 0b Contracts Agent
- **Contract Version:** `1.0.0` (`contracts/CONTRACT_VERSION`)
- **Date:** 2026-10-21
- **Status:** Complete (14/14 contract tests passing; **0 skipped** — live PostgreSQL 16.2 test runs via `pgserver`)

---

## 1. Summary of Fixes Applied

### FIX 1 — Tenant Leak via `item_params` and `question_topics` (BLOCKING)
- **Root Cause:** In P0, `item_params` had a read-all RLS policy (`USING (true)`) and `question_topics` had no RLS enabled, allowing Tenant A (`app_user`) to read `item_params` (including `fit_flag = 'suspect_wrong_key'`) and `question_topics` belonging to Tenant B's private questions (`questions.institute_id = B`). Additionally, `app_user` had `INSERT, UPDATE, DELETE` grants on all tables in `public`, including global reference tables.
- **Changes Made:**
  - [`contracts/schema.sql`](../../contracts/schema.sql):
    - Added `institute_id uuid REFERENCES institutes(id) ON DELETE CASCADE` (nullable; `NULL` = shared question) and `idx_question_topics_institute` / `idx_item_params_institute` indexes to both `question_topics` and `item_params`.
    - Added trigger function `enforce_question_child_institute_id()` and `BEFORE INSERT OR UPDATE` triggers (`trg_question_topics_institute_match`, `trg_item_params_institute_match`) on `question_topics` and `item_params` enforcing `NEW.institute_id IS NOT DISTINCT FROM parent questions.institute_id`.
    - Enabled and forced RLS (`ENABLE ROW LEVEL SECURITY` + `FORCE ROW LEVEL SECURITY`) on both `question_topics` and `item_params`.
    - Separated `SELECT` and write (`INSERT`, `UPDATE`, `DELETE`) RLS policies on `questions`, `question_topics`, and `item_params` for `app_user`:
      - `SELECT`: `USING (institute_id IS NULL OR institute_id = NULLIF(current_setting('app.institute_id', true), '')::uuid)`
      - `INSERT` / `UPDATE` / `DELETE`: strictly `institute_id = NULLIF(current_setting('app.institute_id', true), '')::uuid` so `app_user` can only write tenant-owned rows and cannot mutate the shared (`institute_id IS NULL`) question pool.
    - Locked down the 4 global read-only reference tables (`topics`, `topic_prereqs`, `model_registry`, `marking_schemes`): added `ENABLE ROW LEVEL SECURITY`, created a `FOR SELECT TO app_user USING (true)` policy on each, and restricted `app_user` table privileges to `GRANT SELECT` only (revoking `INSERT, UPDATE, DELETE` on those 4 tables).
    - Added explicit `NOBYPASSRLS` to the `app_user` role definition.
  - [`contracts/datasets.yaml`](../../contracts/datasets.yaml): Added `{name: institute_id, dtype: string, nullable: true}` to `clean_tables.question_topics` and added `clean_tables.item_params` with `institute_id`.
  - [`contracts/data_dictionary.md`](../../contracts/data_dictionary.md): Documented `question_topics.institute_id` and `item_params.institute_id` with trigger and RLS notes.

### FIX 2 — Remove `CREATE EXTENSION pgcrypto`
- **Changes Made:**
  - [`contracts/schema.sql`](../../contracts/schema.sql): Removed `CREATE EXTENSION IF NOT EXISTS pgcrypto;` (`gen_random_uuid()` is native in PostgreSQL 13+).
  - [`contracts/tests/test_contracts.py`](../../contracts/tests/test_contracts.py): Extended `test_01_sql_parses_with_pglast` to assert `"CREATE EXTENSION" not in sql_text.upper()`.

### FIX 3 — Run Live PostgreSQL 16 DB Tests Without Docker (`pgserver`)
- **Changes Made:**
  - [`requirements-dev.txt`](../../requirements-dev.txt): Added `pgserver==0.1.4` and `psycopg2-binary==2.9.13`.
  - [`contracts/tests/test_contracts.py`](../../contracts/tests/test_contracts.py): Replaced the Docker-only `test_03_db_container_and_tenant_isolation` with a dual-runner (`pgserver` primary, Docker fallback, loud `SKIPPED` reason only if neither is installed) that verifies on live PostgreSQL 16.2:
    1. `contracts/schema.sql` applies cleanly and all 31 tables exist in `public`.
    2. Every table is either (a) tenant-scoped with `relrowsecurity = true`, `relforcerowsecurity = true`, and `>= 1` policy in `pg_policy`, or (b) in `GLOBAL_READONLY_TABLES = {"topics", "topic_prereqs", "model_registry", "marking_schemes"}` with `relrowsecurity = true` and `information_schema.role_table_grants` granting only `SELECT` to `app_user`.
    3. Cross-tenant isolation as `app_user`: seeds Institutes A and B, each with a batch, a student, a private question (`institute_id = A/B`), and its `question_topics` and `item_params` rows. Verifies that with `SET app.institute_id = A`, A sees only its own rows across `institutes`, `batches`, `students`, `questions`, `question_topics`, and `item_params`; cannot `SELECT` B's student by ID (`0` rows); cannot `INSERT` a row with B's `institute_id` (error) or a shared `institute_id IS NULL` question (error); cannot `DELETE` from global read-only tables (error); `UPDATE`/`DELETE` on B's rows affect `0` rows; and with `app.institute_id` unset (`RESET`) or empty (`''`), every tenant table returns `0` rows. Also verifies the trigger rejects mismatched `institute_id` on `item_params`.
    4. `pg_roles` check confirming `app_user` has `rolsuper = false` and `rolbypassrls = false`.
  - [`Makefile`](../../Makefile) & [`scripts/test_contracts.ps1`](../../scripts/test_contracts.ps1): Added `-rs` flag to `pytest` so any skip reason is printed loudly.

### FIX 4 — OpenAPI Consent Revocation Path (`DELETE /consents/{id}`)
- **Changes Made:**
  - [`contracts/openapi.yaml`](../../contracts/openapi.yaml): Moved `delete` (`operationId: revoke_consent`) from `/consents` (with query param `consent_id`) to `/consents/{id}` with required path parameter `id` (`type: string, format: uuid`), keeping the 200 example and 401/403/404/422 Problem responses.
  - [`contracts/tests/test_contracts.py`](../../contracts/tests/test_contracts.py): Updated `test_05_openapi_valid_and_complete` to assert `/consents/{id}` is in `paths`, `delete` is on `/consents/{id}` with `operationId == "revoke_consent"`, and `delete` is not on `/consents`.

### FIX 5 — Do Not Mark Self-Sourced Data `verified: true`
- **Changes Made:**
  - [`contracts/exam_patterns.yaml`](../../contracts/exam_patterns.yaml): Set `patterns.internal_chapter_test.verified: false` and `source: "assumption (ours)"`. Also formatted `neet_ug_2026.source` so non-verified patterns clearly distinguish pending bulletin extraction.
  - [`contracts/tests/test_contracts.py`](../../contracts/tests/test_contracts.py): Extended `test_09_exam_patterns` to assert `internal_chapter_test.verified is False`, `internal_chapter_test.source == "assumption (ours)"`, and that every pattern in `exam_patterns.yaml` whose `source` does not start with `https://` has `verified: false`.

### FIX 6 — Topic Names Native-Hindi Review Flag (`name_hi_reviewed: false`) & Review CSV
- **Changes Made:**
  - [`contracts/topics.yaml`](../../contracts/topics.yaml): Added `name_hi_reviewed: false` to all 380 topic nodes (without inventing manual Hindi replacements).
  - [`contracts/schemas/topics.schema.json`](../../contracts/schemas/topics.schema.json): Added `name_hi_reviewed` (`type: boolean`) to `required` and `properties`.
  - [`contracts/schema.sql`](../../contracts/schema.sql) & [`contracts/data_dictionary.md`](../../contracts/data_dictionary.md): Added `name_hi_reviewed boolean NOT NULL DEFAULT false` to `topics`.
  - [`contracts/topics_hi_review.csv`](../../contracts/topics_hi_review.csv): Created review spreadsheet with columns `id,name_en,name_hi,reviewer,status,corrected_name_hi` (`status = pending`) for all 380 topics.
  - [`contracts/tests/test_contracts.py`](../../contracts/tests/test_contracts.py): Extended `test_08_topics_graph` to assert `name_hi_reviewed is False` on every topic and verify a 1-to-1 ID/name match between `contracts/topics_hi_review.csv` and `contracts/topics.yaml`.

### FIX 7 — Routing Policy & Reason Templates Consistency
- **Changes Made:**
  - [`contracts/routing_policy.yaml`](../../contracts/routing_policy.yaml):
    - Updated adult (`is_minor: false`) `academic_support` `allowed_tiers` from `[A, D]` to `[A, B, D]` and updated `rationale` to state that Tiers `[A, B]` are used by default plus `D` only when `engagement_tracking` consent exists and `active_feature_tier = D`.
    - Added explicit comment above the adult section explaining that `minor_ml_risk_enabled` is irrelevant for adults (`is_minor: false`) but both `false` and `true` rows are present so the $2 \times 2 \times 3$ lookup matrix (`is_minor` $\times$ `minor_ml_risk_enabled` $\times$ `target`) is total.
  - [`contracts/schemas/routing_policy.schema.json`](../../contracts/schemas/routing_policy.schema.json): Enforced `minItems: 12, maxItems: 12` on `routing_matrix`.
  - [`contracts/reason_templates.yaml`](../../contracts/reason_templates.yaml) & [`contracts/openapi.yaml`](../../contracts/openapi.yaml):
    - Rewrote `score_z_drop` in plain mentor-friendly English and Hindi without statistical jargon ("standard deviations" / "मानक विचलन") while preserving the exact `{n_tests}` and `{delta_sd}` slots:
      - EN: `"Scores across the last {n_tests} tests dropped noticeably ({delta_sd} points on the batch scale) relative to batch pace"`
      - HI: `"पिछले {n_tests} टेस्ट के अंकों में बैच की गति के सापेक्ष स्पष्ट गिरावट ({delta_sd} अंक बैच पैमाने पर) देखी गई है"`
  - [`contracts/tests/test_contracts.py`](../../contracts/tests/test_contracts.py):
    - Extended `test_11_features_and_routing_policy` to assert all 12 `(is_minor, minor_ml_risk_enabled, target)` combinations appear **exactly once** and that adult `academic_support` allows `["A", "B", "D"]`.
    - Extended `test_12_reason_templates_slots_and_banned_words` to assert no template contains statistical jargon (`"standard deviation"`, `"z-score"`, `"z score"`, `"मानक विचलन"`).

---

## 2. Files Touched

| File | Action |
|---|---|
| `contracts/schema.sql` | Updated (FIX 1, FIX 2, FIX 6) |
| `contracts/datasets.yaml` | Updated (FIX 1) |
| `contracts/data_dictionary.md` | Updated (FIX 1, FIX 6) |
| `contracts/openapi.yaml` | Updated (FIX 4, FIX 7) |
| `contracts/exam_patterns.yaml` | Updated (FIX 5) |
| `contracts/topics.yaml` | Updated (FIX 6) |
| `contracts/topics_hi_review.csv` | Created (FIX 6 — 380 rows) |
| `contracts/schemas/topics.schema.json` | Updated (FIX 6) |
| `contracts/schemas/routing_policy.schema.json` | Updated (FIX 7) |
| `contracts/routing_policy.yaml` | Updated (FIX 7) |
| `contracts/reason_templates.yaml` | Updated (FIX 7) |
| `contracts/README.md` | Updated (inventory & DB test runner docs) |
| `contracts/tests/test_contracts.py` | Updated (FIX 1–7 assertions + `pgserver` live Postgres 16.2 test) |
| `requirements-dev.txt` | Updated (`pgserver==0.1.4`, `psycopg2-binary==2.9.13`) |
| `scripts/test_contracts.ps1` | Updated (`-rs` flag) |
| `Makefile` | Updated (`-rs` flag) |
| `docs/agent_logs/P0b_contract_fixes.md` | Created (this log) |

---

## 3. Test Execution Results (`scripts/test_contracts.ps1`)

- **Passed (14 / 14):**
  1. `test_01_sql_parses_with_pglast` — **PASSED** (verifies 31 tables + no `CREATE EXTENSION`)
  2. `test_02_rls_coverage_static` — **PASSED** (verifies 27 tenant tables have `ENABLE` + `FORCE` RLS + policy, and 4 `GLOBAL_READONLY_TABLES` have `ENABLE` RLS + policy)
  3. `test_03_db_container_and_tenant_isolation` (`-m db`) — **PASSED** (runs on real PostgreSQL 16.2 via `pgserver`; verifies DDL, `relrowsecurity`/`relforcerowsecurity`, `SELECT`-only grants on global tables, `rolsuper=false`/`rolbypassrls=false`, trigger enforcement, and cross-tenant isolation across all tenant tables including `item_params` and `question_topics`)
  4. `test_04_enum_consistency` — **PASSED**
  5. `test_05_openapi_valid_and_complete` — **PASSED** (verifies `DELETE /consents/{id}`)
  6. `test_06_yaml_and_json_validate_against_schemas` — **PASSED**
  7. `test_07_csv_templates_and_synonyms` — **PASSED**
  8. `test_08_topics_graph` — **PASSED** (verifies `name_hi_reviewed: false` and 1-to-1 match with `topics_hi_review.csv`)
  9. `test_09_exam_patterns` — **PASSED** (verifies non-`https://` sources have `verified: false`)
  10. `test_10_percentile_tables_monotone` — **PASSED**
  11. `test_11_features_and_routing_policy` — **PASSED** (verifies all 12 `(is_minor, flag, target)` combinations appear exactly once and adult `academic_support` allows `[A, B, D]`)
  12. `test_12_reason_templates_slots_and_banned_words` — **PASSED** (verifies slots, banned lexicon, and absence of statistical jargon)
  13. `test_13_omr_layouts_geometry` — **PASSED**
  14. `test_14_contract_version_consistency` — **PASSED** (verifies all 32 contract files carry `contract_version: 1.0.0`)
- **Skipped (0 / 14):** None.

---

## 4. Open Items
- **Native-Hindi Topic Review (`contracts/topics_hi_review.csv`):** All 380 topics are exported with `status = pending` and `name_hi_reviewed: false` in `contracts/topics.yaml` for spreadsheet review by a native-Hindi educator against NCERT Hindi editions.
- **Previously Logged CCRs (`docs/contract_change_requests.md`):** `CCR-001` through `CCR-004` from P0 remain documented for the project owner; `docs/generator_config_draft.yaml` and `docs/TECH_PLAN.md` were not modified.
