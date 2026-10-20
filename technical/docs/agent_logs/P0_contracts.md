# Phase 0 Agent Log — Contracts (`P0_contracts`)

- **Date:** 2026-10-20
- **Contract Version:** `1.0.0` (untagged; awaiting human review per instructions)
- **Test Status:** 13 passed, 1 skipped (`test_03_db_container_and_tenant_isolation`, marked `-m db`, skipped because Docker is not installed on this Windows host).

---

## 1. Files Created

| # | Path | Description |
|---|---|---|
| 1 | `contracts/CONTRACT_VERSION` | `1.0.0` |
| 2 | `contracts/README.md` | Overview of all contract files, agent consumer matrix, test runner instructions, and change-request protocol |
| 3 | `contracts/enums.yaml` | Single source of truth for all 29 enumerations across SQL, OpenAPI, and data dictionary |
| 4 | `contracts/schema.sql` | PostgreSQL 16 DDL for all 31 tables in `TECH_PLAN.md` §8 with PKs, FKs, CHECKs, hot-path indexes, `app_user` role, `COMMENT ON` metadata, and `ENABLE` + `FORCE ROW LEVEL SECURITY` on every tenant table |
| 5 | `contracts/openapi.yaml` | OpenAPI 3.1.0 specification for all 23 endpoints in `TECH_PLAN.md` §13 with JWT claims (`sub`, `institute_id`, `role`), per-endpoint RBAC role filtering, `model_version` on every model-output response, RFC 7807 `Problem` responses (`401`/`403`/`404`/`422`), and 200 examples |
| 6 | `contracts/data_dictionary.md` | Complete table-by-table and CSV-by-CSV reference, plus the dynamic `is_minor` derivation and 18th-birthday re-consent rule |
| 7 | `contracts/csv_templates/students.csv` | Canonical clean student upload template (header + 3 synthetic rows) |
| 8 | `contracts/csv_templates/guardians.csv` | Canonical clean guardian upload template |
| 9 | `contracts/csv_templates/results_responses_wide.csv` | Canonical wide-format item response template (`q1`..`q5`, MCQ options, numeric, blank) |
| 10 | `contracts/csv_templates/results_marks_only.csv` | Canonical marks-only upload template (`raw_score`, subject subtotals, `absent_flag`) |
| 11 | `contracts/csv_templates/answer_key.csv` | Canonical answer key template (`|`-delimited multi-correct, `numeric_tolerance`, `dropped`) |
| 12 | `contracts/csv_templates/attendance.csv` | Canonical daily attendance upload template |
| 13 | `contracts/csv_templates/fees.csv` | Canonical fee instalment and pro-rata refund upload template (integer paise) |
| 14 | `contracts/csv_templates/header_synonyms.yaml` | 6–10 English, Hinglish, and Devanagari header variants for each of the 44 canonical CSV columns + absent/present markers |
| 15 | `contracts/datasets.yaml` | Parquet schemas for `data/clean/*.parquet` (15 tables), `data/truth/*.parquet` (4 tables), `data/omr/*/truth.json`, and the seed byte-identity rule |
| 16 | `contracts/topics.yaml` | 380-node bilingual (EN/HI Devanagari) syllabus topic graph across Physics (20 chapters), Chemistry (20 chapters), Mathematics (20 chapters), Botany (17 chapters), and Zoology (15 chapters) + 33-edge acyclic `topic_prereqs` DAG |
| 17 | `contracts/exam_patterns.yaml` | Year-versioned patterns: `jee_main_2026` (`verified: true`, 300 marks), `neet_ug_2026` (`verified: false`, both `compulsory_180` and `sectioned_200` variants, 720 marks), and `internal_chapter_test` |
| 18 | `contracts/marking_schemes.yaml` | `jee_main`, `neet_ug`, `internal_plus4_zero`, and `internal_plus3_minus1` schemes |
| 19 | `contracts/percentile_tables.csv` | Monotone score-to-percentile/rank tables from R4 (`jee_main` 2024 easy/tough shifts, 2026 session average; `neet_ug` 2024 anomaly and 2026 `projected` using $N = 2,406,079$) |
| 20 | `contracts/features.yaml` | 22 model features across Privacy Tiers `A`–`D` with `as_of` leakage rules, `batch_relative` flags, `allowed_for_minor`, and `reason_template_key` |
| 21 | `contracts/routing_policy.yaml` | Machine-readable DPDP s.9(3) / 4th Schedule Part A Item 3 / MoE cl. 10.2(xi) routing matrix and 6 deterministic fallback rules |
| 22 | `contracts/reason_templates.yaml` | 12 bilingual (EN/HI) supportive reason templates with typed slots, suggested actions, and the EN/HI banned shaming/ranking word lists |
| 23 | `contracts/report_numbers.schema.json` | JSON Schema (2020-12) for PII-free `numbers_json` (`{STUDENT}`, `{INSTITUTE}` placeholders) |
| 24 | `contracts/report_output.schema.json` | JSON Schema (2020-12) for structured LLM output (`title`, `body`, `word_count` in `[80, 180]`) |
| 25 | `contracts/omr_template.schema.json` | JSON Schema (2020-12) for physical OMR sheet geometry in mm |
| 26 | `contracts/omr_layouts/generic_mcq_100.json` | A4 100-question MCQ layout (480 bubbles, min gap 1.20 mm) |
| 27 | `contracts/omr_layouts/neet_200.json` | A4 200-question NEET layout covering both variants (880 bubbles, min gap 1.30 mm) |
| 28 | `contracts/omr_layouts/jee_75.json` | A4 75-question JEE layout with 60 MCQs + 15 numeric grids (995 bubbles, min gap 1.40 mm) |
| 29 | `contracts/artifact_manifest.schema.json` | JSON Schema (2020-12) for `ml/artifacts/vX/manifest.json` |
| 30 | `contracts/metrics.schema.json` | JSON Schema (2020-12) for `ml/artifacts/vX/metrics.json` |
| 31 | `contracts/metrics_bars.yaml` | 24 acceptance bars (`blocking` vs `report` gates) matching `TECH_PLAN.md` §4.2 and §10 |
| 32 | `contracts/schemas/*.schema.json` | 10 JSON Schemas validating every YAML contract file |
| 33 | `contracts/tests/conftest.py` & `test_contracts.py` | 14-test pytest validation suite |
| 34 | `Makefile`, `scripts/test_contracts.ps1`, `requirements-dev.txt` | Cross-platform test runners and pinned dev dependencies |
| 35 | `docs/contract_change_requests.md` | Log of 4 minor gaps/discrepancies noticed in `TECH_PLAN.md` / `generator_config_draft.yaml` |

---

## 2. Decisions Made Where `TECH_PLAN.md` Left Details Unspecified

1. **Direct `institute_id` on All 25 Tenant Child Tables (`CCR-001`):**
   - *Reason:* Denormalizing `institute_id uuid NOT NULL` onto child tables (`responses`, `test_totals`, `test_questions`, `answer_keys`, `mastery_snapshots`, `risk_scores`, `predictions`, `interventions`, `reports`, `batch_changes`) allows uniform, index-friendly Postgres RLS policies (`USING (institute_id = NULLIF(current_setting('app.institute_id', true), '')::uuid)`) without subqueries or joins.
2. **`NULLIF(current_setting('app.institute_id', true), '')::uuid` in RLS Policies:**
   - *Reason:* Using `current_setting(..., true)` with `NULLIF(..., '')` prevents Postgres from throwing an unhandled GUC error if a connection queries a table before `SET app.institute_id` is executed; instead it safely evaluates to `NULL` and returns 0 rows.
3. **Unambiguous Column Names Avoiding SQL/Python Reserved Words (`CCR-004`):**
   - *Reason:* Used `class_level`, `test_date`, `attendance_date`, `activity_date`, `due_date`, `changed_at`, and `occurred_at` across SQL, Parquet, and CSV templates so ORM models and Pandas/PyArrow schemas never collide with reserved keywords.
4. **Pro-Rata Refund Columns on `fees` (`refund_due_paise`, `refund_paid_date`):**
   - *Reason:* Supports the P1 compliance quick win ("pro-rata refund calculator within 10 days on withdrawal" per MoE 2024 cl. 8(iv) and Rajasthan Act s.13(4)) directly in integer paise.
5. **Compliance Flags on `institutes` and `tests` (`weekly_off_day`, `counsellor_contact`, `day_after_off_warning`):**
   - *Reason:* Enables the MoE 2024 cl. 10.1(v)–(vi) weekly-off schedule check and cl. 11(ii) counsellor contact requirement with zero schema changes later.
6. **NEET-UG Percentile Formula Denominator ($N = 2,406,079$):**
   - *Reason:* Used the verified 2024 NTA registered candidate count ($2,406,079$ from `Notice_20240604195244.pdf` in R4) to convert R4's `rank_approx` values into strictly monotone percentiles via $100 \times (1 - \text{rank} / N)$, documented in the header of `contracts/percentile_tables.csv`.
7. **Fixed `home_tips` Enum IDs in `report_numbers.schema.json`:**
   - *Reason:* Defined 8 concrete rule-selectable tip IDs (`tip_fixed_revision_slot`, `tip_mistake_notebook_review`, `tip_sleep_and_rest_day`, `tip_formula_flashcards`, `tip_timed_practice_set`, `tip_ask_faculty_doubts`, `tip_regular_class_attendance`, `tip_encourage_steady_effort`) so Agent E and Agent G share an exact closed vocabulary.

---

## 3. Everything Marked `verified: false` or Low/Projected Confidence

1. **`contracts/exam_patterns.yaml` → `patterns.neet_ug_2026` (`verified: false`):**
   - Both `compulsory_180` (default) and `sectioned_200` variants are included because R4b could not extract the official NEET-UG 2026 Information Bulletin PDF.
2. **`contracts/topics.yaml` → All 380 Topic Nodes (`verified: false`, `weightage: null`, `source: model_knowledge`):**
   - Built from standard NCERT / NTA Class 11 & 12 Physics, Chemistry, Mathematics, Botany, and Zoology syllabi with Devanagari translations. Marked `verified: false` until spot-checked against the official NTA syllabus PDFs and a Hindi-native reviewer. No weightages were invented.
3. **`contracts/percentile_tables.csv`:**
   - All 2024/2026 JEE Main and 2024 NEET rows are marked `confidence: low` (blog/aggregator sources from R4), and all 2026 NEET rows are marked `confidence: projected`.

---

## 4. Open Questions for the Project Owner

1. **NEET-UG 2026 Official Bulletin Check:** Once you check the NTA NEET 2026 Information Bulletin ("Scheme of Examination"), confirm whether `compulsory_180` is final and flip `verified: true` in `contracts/exam_patterns.yaml`.
2. **Hindi Terminology Spot-Check:** Have a Hindi-speaking teammate review 10 chapter/topic names in `contracts/topics.yaml` and the 12 supportive templates in `contracts/reason_templates.yaml`.
3. **Review `docs/contract_change_requests.md`:** Confirm `CCR-001` through `CCR-004` before tagging `contracts-v1.0.0`.

---

## 5. Required Reading Map for Downstream Agents (`A`–`J`)

| Agent | Role | Must Read in `contracts/` |
|---|---|---|
| **Agent A (DataGen)** | Synthetic clean/truth parquet, messy Excel/CSV, synthetic OMR | `CONTRACT_VERSION`, `enums.yaml`, `datasets.yaml`, `topics.yaml`, `exam_patterns.yaml`, `marking_schemes.yaml`, `percentile_tables.csv`, `csv_templates/*.csv`, `csv_templates/header_synonyms.yaml`, `omr_template.schema.json`, `omr_layouts/*.json`, `data_dictionary.md` |
| **Agent B (IRT + Mastery)** | Hierarchical 2PL/Rasch IRT, wrong-key detection, EAP mastery | `CONTRACT_VERSION`, `enums.yaml`, `datasets.yaml`, `topics.yaml`, `exam_patterns.yaml`, `marking_schemes.yaml`, `artifact_manifest.schema.json`, `metrics.schema.json`, `metrics_bars.yaml`, `data_dictionary.md` |
| **Agent C (Risk + Band)** | `as_of` feature builder, LightGBM + isotonic calibration, SHAP -> reasons, CQR percentile band, routing | `CONTRACT_VERSION`, `enums.yaml`, `datasets.yaml`, `features.yaml`, `routing_policy.yaml`, `reason_templates.yaml`, `percentile_tables.csv`, `artifact_manifest.schema.json`, `metrics.schema.json`, `metrics_bars.yaml`, `data_dictionary.md` |
| **Agent D (Public Validation)** | OULAD & ASSISTments2009 pyKT benchmarks (NB06) | `CONTRACT_VERSION`, `metrics.schema.json`, `metrics_bars.yaml` |
| **Agent E (GenAI Eval)** | Local LLM prompt/JSON mode, deterministic verifier, bilingual templates (NB08) | `CONTRACT_VERSION`, `enums.yaml`, `topics.yaml`, `reason_templates.yaml` (banned words), `report_numbers.schema.json`, `report_output.schema.json`, `metrics.schema.json`, `metrics_bars.yaml` |
| **Agent F (OMR + Cost Model)** | OpenCV fiducial/bubble reader (NB11) + production cost model (NB09) | `CONTRACT_VERSION`, `enums.yaml`, `omr_template.schema.json`, `omr_layouts/*.json`, `datasets.yaml` (`omr_truth_schema`), `metrics.schema.json`, `metrics_bars.yaml` |
| **Agent G (Backend)** | FastAPI, Postgres 16 + RLS, CSV/OMR ingest, scoring, routing, GenAI service, audit | **All files in `contracts/`**, especially `schema.sql`, `openapi.yaml`, `enums.yaml`, `routing_policy.yaml`, `features.yaml`, `reason_templates.yaml`, `csv_templates/*`, `report_numbers.schema.json` |
| **Agent H (Frontend)** | Next.js (TS, Tailwind, shadcn/ui, ECharts), Hindi toggle, role switcher | `CONTRACT_VERSION`, `openapi.yaml`, `enums.yaml`, `topics.yaml`, `reason_templates.yaml`, `percentile_tables.csv`, `csv_templates/*.csv` |
| **Agent I (QA)** | Contract tests, RLS tenant isolation, no-leakage property tests, verifier fuzz, E2E, chaos | **All files in `contracts/`** and `contracts/tests/test_contracts.py` |
| **Agent J (DevOps)** | `docker-compose.yml`, Dockerfiles, Makefile, DB seed, CI | `CONTRACT_VERSION`, `schema.sql`, `openapi.yaml` (`/health`, `/version`), `artifact_manifest.schema.json`, `Makefile`, `requirements-dev.txt` |
