# Agent A — Synthetic data generator (`technical/datagen/`)

## Paste this into Antigravity
```
You are Agent A (DataGen). First read, in order: technical/docs/agent_prompts/R1_00_COMMON.md, then technical/docs/TECH_PLAN.md (§9, §10, §17, §18, §22), technical/docs/FEASIBILITY_CHECK.md, technical/docs/generator_config_draft.yaml, technical/contracts/datasets.yaml, schema.sql, enums.yaml, exam_patterns.yaml, marking_schemes.yaml, topics.yaml, percentile_tables.csv, csv_templates/ (incl. header_synonyms.yaml). Then open technical/docs/agent_prompts/R1_A_datagen.md and follow its section "TASK" exactly. Own only technical/datagen/ and notebooks/01_synthetic_data.ipynb. Do not edit contracts. Do not commit or tag.
```

## TASK

### Goal
A seeded, deterministic simulator of coaching institutes with **known ground truth**, three outputs: (1) `data/clean/*.parquet` mirroring the app DB, (2) `data/truth/*.parquet` the hidden causes, (3) `data/dirty/*` messy Excel/CSV exports and `data/omr/synthetic/*.jpg` + `truth.json`. Every other ML agent trains and validates on this. The generator must be **hard enough to be honest**: noisy, with confounders, with unpredictable events.

### CLI
`python -m datagen --seed 42 --preset {tiny|full} --out data/ [--scenario scenarios/<name>.yaml]`
- `tiny`: 1 institute, 150 students, 2 academic years, runs in < 20 s (milestone **M1**, delivered first).
- `full`: 4 institutes (Patna JEE 400, Lucknow NEET 900, Gaya mixed 150, Kota large 2,000 — per config), **3 academic-year cohorts each (2024, 2025, 2026)**, runs in < 5 min, < 400 MB (milestone **M2**).
- Same seed + config ⇒ **byte-identical** files (sorted rows, zstd parquet, no wall-clock values, a single `numpy.random.Generator` tree via `SeedSequence.spawn`).
- **Code mapping** (config to contracts enums): `exam JEE|NEET|MIX` becomes `jee_main|neet_ug|mix`; `tier 2|3` becomes `tier_2|tier_3`; test-validate that every config value maps to a value in `enums.yaml`.
- Config: move `docs/generator_config_draft.yaml` → `datagen/config/generator_config.yaml`; keep every `# source:`. Fix the Rajasthan citation to `s.6(2)(d)`; set `upfront_share` default to `0.25` and label it `assumption` (CCR-003). Add a JSON-schema for the config and validate it on load.

### Generative process (implement in this order; one module each under `datagen/generator/`)
1. **Institutes / batches / students**: class mix 30/30/40, batch size 40–80 by *admission order* (never performance), `published_capacity`, `mentor_capacity_per_week`, age ≥ 16 at enrolment with DOBs consistent with class (`is_minor` derives from `dob`; droppers mostly 18+; some class-12 turn 18 mid-year → re-consent row), out_of_town flag (≈ 45 %), gender, fee_plan (incl. `rajasthan_4_equal` for one institute), Devanagari + transliterated names (`name`, `name_alt`) from a synthetic name list (no real people).
2. **Latent traits**: general ability `g ~ N(0,1)`; topic ability `θ_topic = λ·g + ε` (λ ≈ 0.7), correlated through the topic graph; learning rate; motivation trajectory; chronic-low-attender trait (base attendance SD ≈ 0.09, some students permanently < 75 % who never drop out — this is what makes the institute rule noisy); SES proxy.
3. **Questions & tests**: questions reference topics from `topics.yaml` (**no question text**; `text_hash` only), true 2PL params `a ~ LogN(0,0.3)`, `b ~ N(topic_mean, 1)`, guessing floor `g_item ~ Beta(2,18)` for MCQ, 0 for numeric; a shared pool across institutes (≈ 30 % of questions appear in ≥ 2 institutes as anchors; the rest tenant-private). Tests per config: full mocks every 14 days following the exam pattern (JEE 75 Q; NEET both variants selectable by `neet_variant`), weekly chapter tests, never on the day after the weekly off (`day_after_off_warning` stays false in clean data; the dirty data may violate it). Topic coverage follows a syllabus sequence; **"untaught-topic" tests**: ~3 % of (batch, topic) pairs are tested before teaching → everyone fails (analytics must flag coverage, not student weakness).
4. **Responses**: `P(correct) = g_item + (1-g_item)·σ(a(θ(t) − b))`; θ grows with time and attendance; **MNAR blanks**: a student blanks when `P(correct)` is below a personal threshold (risk-aversion parameter) because wrong costs −1; time-varying fatigue; batch/teacher effect per (batch, topic) ±0.3; multi-correct and numeric tolerance cases; 1–2 % `multi_marked`/`unreadable` for OMR-sourced tests; `marks_awarded` computed with the marking scheme and the dropped-question rule.
5. **Attendance** (daily, off day excluded): base × festival dip (Oct–Nov, ×0.6 out-of-town / ×0.9 others) × board-exam dip (Jan–Feb class 12) × random illness spells; **gradual** dropouts fade over `U(3,8)` weeks before the event; **sudden** ones (25 %, ±5) show no precursor.
6. **Fees**: per-instalment rows (integer paise), partial payments, 15–20 % of final instalments late/defaulted, correlated with SES and disengagement; refunds on withdrawal (pro-rata, within 10 days → `refund_due_paise`, `refund_paid_date`).
7. **Engagement (tier D)**: doubts, homework, app logins, correlated with motivation; present in the data but **flagged tier D** (models must not use it for minors).
8. **Dropout**: monthly hazard = `base(month) × f(...)` with peak months 3–4, dropper multiplier 0.7, annual target **18 % (range 12–25 %)** per cohort-year; reasons mix per config; `dropout_events.parquet` records `dropout_date`, `type` (gradual|sudden), `reason`, `fade_start_date`.
9. **Outcomes**: final percentile from true final θ through `percentile_tables.csv` with a shift-difficulty modifier (SD ≈ 20 marks) → `true_final_outcomes.parquet` (`true_final_percentile`, `internal_mock_scale_score`).
10. **Consents**: every student gets consent rows per purpose with `verification_method`; 2 % missing/revoked consents (so models and APIs must handle absence).
11. **Hidden but recoverable**: `true_theta_topic`, `true_item_params`, and the **injected wrong keys** (1.5 per 100 items; `key_error_flag` in truth; the dirty/clean `answer_keys` carry the wrong key).

### Scenario knobs (YAML, applied on top of the config)
`dropout_multiplier`, `sudden_share`, `marks_only_share`, `online_test_share`, `upfront_full_fee_share`, `missing_rate`, `institute_size_scale`, `neet_variant`, `wrong_key_rate`, `fade_weeks`. Ship 6 scenarios used by curveball drills: `dropout_x2`, `marks_only`, `no_attendance`, `sudden_heavy` (50 % sudden), `small_batches` (n = 30), `neet_sectioned_200`.

### Messy-data injector (`datagen/messy/`)
From the clean tables, write `data/dirty/` files that mimic real exports, each with an `expected/<file>.json` (golden: expected canonical rows after correct parsing + the exact expected error list). Cover: header in row 3; merged cells; multiple sheets; hidden rows; formulas; Devanagari vs transliterated names; duplicate students and reused roll numbers; DD/MM vs MM/DD dates; `AB`/`A`/`-`/`अनुपस्थित`/0/blank for absent; marks-only export (no per-question data); students missing from roster; extra blank rows; one wrong answer key; bonus/cancelled question; trailing totals row; numbers stored as text. Use the synonym lists in `csv_templates/header_synonyms.yaml` (do not invent a second list). At least 12 files across ≥ 3 institutes.

### Synthetic OMR (`datagen/omr_synth/`, milestone M2, optional first pass)
Render sheets from `contracts/omr_layouts/*.json` (A4, fiducials, QR `DM1|<test_id>|<page>`, roll grid) → fill bubbles from `responses` (pen/pencil darkness, partial fill, erasure, double marks) → augment (perspective ±15°, shadow gradient, blur, low light, JPEG q 30–60, photo-of-screen) → `data/omr/synthetic/*.jpg` + `truth.json` (per-bubble truth, difficulty tags). ≥ 200 images across the three layouts. Needs `opencv-python-headless` + `Pillow` + `qrcode` (pin).

### Acceptance criteria (each is a test; all must pass)
1. **Schema**: every parquet file validates against `contracts/datasets.yaml` (names, dtypes, nullability, sort order); every enum value ∈ `contracts/enums.yaml`; ids unique; all FKs resolve; clean tables also load into Postgres via `schema.sql` (use the `pgserver` helper already in `contracts/tests/conftest.py`; skip only if unavailable and say so).
2. **Determinism**: two runs with seed 42 → identical SHA-256 for every output file; seed 43 differs.
3. **Marginals (full preset, tolerance bands)**: annual dropout 12–25 % per cohort-year (config 18 %); share of dropouts in months 3–4 ≥ 35 %; sudden share 20–30 %; class mix 30/30/40 ± 3 pts; attendance mean 0.78–0.86 outside dips; Oct–Nov out-of-town dip visible (ratio 0.55–0.7); 15–20 % late final instalment; blanks rate 3–15 % and **higher for low-ability students** (MNAR check: correlation(blank, −θ) > 0.2); fraction of students < 18 at as-of ≥ 55 % overall.
4. **Ground-truth consistency**: for 200 random responses per institute, the empirical correct-rate by decile of true `P(correct)` matches the decile mean within 0.03 (calibration of the generator itself).
5. **Gradual vs sudden**: for gradual dropouts, mean attendance in the last `fade` weeks is ≥ 0.2 lower than baseline; for sudden, within ±0.05.
6. **Chronic low attenders**: ≥ 8 % of students have base attendance < 0.75, and their dropout rate is within ±25 % (relative) of the overall rate (so the 'attendance < 75 %' rule produces many false positives, as in real institutes).
7. **Anchor structure**: ≥ 25 % of questions shared across ≥ 2 institutes.
8. **Wrong keys**: injected count equals truth count; each wrong key has negative or near-zero point-biserial in the generated responses (≥ 80 % have point-biserial < 0.05).
9. **Messy files**: a reference parser stub (`datagen/messy/reference_parse.py`, simple pandas, not the product's parser) reproduces each golden `expected/*.json`; every file is rejected or flagged by a "strict" pandas read (proves it is actually messy).
10. **Scenarios**: each of the 6 scenario files changes its target statistic in the right direction by ≥ 25 % (test the first two numerically).
11. **Performance**: `tiny` < 20 s, `full` < 5 min on the laptop; memory < 4 GB.
12. **Privacy**: no real names (names drawn from the synthetic list; test checks the list file header), no emails/phones except synthetic ranges (phone `99999 0xxxx`).

### Notebook `01_synthetic_data.ipynb` (≤ 15 min on Colab)
Generates `tiny`+`full` seed 42, prints the marginals table with sources/confidence from the config, plots: one gradual vs one sudden dropout timeline (attendance + test z), the monthly dropout hazard, festival attendance dip, MNAR blank rate vs ability, calibration of generator probabilities. Ends with a "What this data does NOT prove" box.

### Edge cases to cover
Student joins mid-year; class 11 → 12 transition across cohort-years (new `academic_year`, same `student_key` in truth only); batch change for a non-performance reason; reused roll numbers across years; marks-only tests; dropped and multi-correct questions; tests with < 30 students; institute with 0 sudden dropouts; leap-day and DST-free IST dates.

### Done when
Tests pass (`make test-datagen`), README documents the CLI, seed policy and config knobs, `docs/agent_logs/R1_A.md` written (including measured marginals vs config), and M1 (tiny) is merged **before** M2 work starts — tell the human at M1.
