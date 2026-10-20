# Phase 0b — Contract fix-ups (Antigravity prompt, same agent/workspace as P0)

Findings from the human review of P0 (13 passed / 1 skipped). Tests pass, but the review ran `schema.sql` on a real PostgreSQL 16.2 and found the issues below. Fix them, extend the tests so each issue can never come back, and do not tag or commit.

## PROMPT (copy everything below this line)

ROLE: You are the Contracts Agent finishing Phase 0 for DataMoat. P0 is complete; this is a short fix-up pass. Read `contracts/README.md` and `docs/agent_logs/P0_contracts.md` first. The same DO NOT rules as P0 apply (contracts, schemas, tests and runners only; do not edit `docs/TECH_PLAN.md`; log anything you cannot decide to `docs/contract_change_requests.md`; no commit, no tag).

### FIX 1 — Tenant leak via `item_params` and `question_topics` (BLOCKING)
Verified on a live Postgres: with tenant A's `app.institute_id` set, `SELECT count(*) FROM item_params` returns B's rows for B's **private** questions (`questions.institute_id` = B), although A cannot see those questions. `item_params` has a read-all policy and `question_topics` has no RLS at all. Difficulty parameters and `fit_flag = suspect_wrong_key` of a private question are therefore readable by other tenants.
- Add `institute_id uuid REFERENCES institutes(id) ON DELETE CASCADE` (nullable, NULL = shared question) to `item_params` and `question_topics`, copied from the parent question (add a CHECK or trigger so it always equals `questions.institute_id`).
- Give both tables the same policy as `questions`: `institute_id IS NULL OR institute_id = NULLIF(current_setting('app.institute_id', true), '')::uuid`, for SELECT; and WITH CHECK restricted to the current tenant for INSERT/UPDATE/DELETE (the shared pool is writable only by the training/admin role, not `app_user`).
- Review the other 4 tables without forced RLS (`marking_schemes`, `model_registry`, `topic_prereqs`, `topics`). They are intended to be global read-only reference data. Make that explicit: `ENABLE` RLS with a read-only policy for `app_user` (no INSERT/UPDATE/DELETE), and `GRANT SELECT` only. If `marking_schemes` can be institute-custom, add `institute_id` and the `questions`-style policy.
- Update `data_dictionary.md`, `datasets.yaml` (parquet columns) and `openapi.yaml` if any schema changes.

### FIX 2 — Remove `CREATE EXTENSION pgcrypto`
`gen_random_uuid()` is built into PostgreSQL 13+, and nothing in the schema uses any pgcrypto function. The extension line (schema.sql line 12) breaks installs on stock/embedded Postgres builds and managed databases that restrict extensions. Remove it. Add a test that fails if `schema.sql` contains `CREATE EXTENSION`.

### FIX 3 — Make the DB tests run WITHOUT Docker
`test_03` skips because Docker is not installed on the host. Add a second runner for the `-m db` tests that uses the pip package **`pgserver`** (embedded PostgreSQL 16, works on Windows) when Docker is unavailable. Add `pgserver` and `psycopg2-binary` to `requirements-dev.txt` (version-pinned). Tests to include (replace the skipped smoke test):
1. The DDL applies cleanly; 31+ tables exist.
2. Every table is either (a) tenant-scoped with `ENABLE` + `FORCE` RLS and a policy, or (b) on an explicit allowlist `GLOBAL_READONLY_TABLES` that has RLS enabled and `app_user` has only SELECT.
3. Isolation as `app_user`: create institutes A and B, each with a batch, a student, a **private question** and its `item_params` + `question_topics` rows. With the GUC set to A: A sees exactly its own rows in every tenant table (**including `item_params` and `question_topics`**), cannot SELECT B's student by id (0 rows), cannot INSERT a row carrying B's `institute_id` (error), UPDATE/DELETE on B's rows affect 0 rows, and with the GUC unset or empty every tenant table returns 0 rows.
4. `app_user` is not a superuser and has no BYPASSRLS.
`make test-contracts` must run them automatically when either Docker or pgserver is available, and print a loud SKIPPED message only if neither is.

### FIX 4 — OpenAPI: consent revocation path
`DELETE /consents` takes `consent_id` as a query parameter. TECH_PLAN §13 and REST convention say `DELETE /consents/{id}`. Change it to a path parameter (keep `operationId`), update the examples and the contract test.

### FIX 5 — Do not mark self-sourced data `verified: true`
`exam_patterns.yaml` → `internal_chapter_test` has `verified: true` with source "generator_config_draft.yaml" (our own config). Set `verified: false` and `source: "assumption (ours)"`. Add a test: any pattern whose `source` is not an `https://` URL must have `verified: false`.

### FIX 6 — Topic names need a native-Hindi review flag (do not invent corrections)
Spot checks found at least one wrong Hindi term (`neet.bot.organisms_and_populations.commensalism_mutualism`: "Amensalism" is rendered as "अंतरजातीय परजीविता", which is parasitism). Do not try to fix Hindi by yourself. Add `name_hi_reviewed: false` to every topic (schema + data) and write `contracts/topics_hi_review.csv` (columns: id, name_en, name_hi, reviewer, status, corrected_name_hi) with all 380 rows so a Hindi-native teammate can review it in a spreadsheet. Add a test that the CSV and YAML ids match exactly.

### FIX 7 — Small consistency items
- `routing_policy.yaml`: adult `academic_support` allows tiers `[A, D]`, which skips B/C without a reason. Make it `[A, B]` plus `D` only when `engagement_tracking` consent exists, and say so in the rationale. The adult rows are duplicated for `minor_ml_risk_enabled: true/false`; keep the matrix total but state in a comment that the flag is irrelevant for adults. Extend the routing test so every (is_minor × flag × target) combination appears exactly once.
- `reason_templates.yaml`: `score_z_drop` shows "{delta_sd} standard deviations" to mentors. Rewrite it in plain words (e.g. "scores dropped noticeably compared with the batch over the last {n_tests} tests") in EN and HI, keeping the slots identical. Do the same for any other template that exposes statistical jargon.
- `generator_config_draft.yaml` is read-only for you; ignore CCR-002/003 beyond what you already logged.

### DONE WHEN
1. `make test-contracts` / `scripts/test_contracts.ps1`: all tests pass and **no DB test is skipped** on this machine (pgserver path).
2. `docs/agent_logs/P0b_contract_fixes.md` lists each fix, files touched, tests added, and anything left open.
3. No commit, no tag.
