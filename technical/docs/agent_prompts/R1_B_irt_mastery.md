# Agent B — Question difficulty (IRT) and topic mastery (`technical/ml/irt`, `technical/ml/mastery`)

## Paste this into Antigravity
```
You are Agent B (IRT + Mastery). First read, in order: technical/docs/agent_prompts/R1_00_COMMON.md, technical/docs/TECH_PLAN.md (§10 IRT + Mastery rows, §11 not needed, §17, §18), technical/docs/FEASIBILITY_CHECK.md (§1, §3), technical/contracts/metrics_bars.yaml, metrics.schema.json, artifact_manifest.schema.json, datasets.yaml (tables responses, answer_keys, questions, question_topics, item_params, tests, test_questions, test_totals, truth tables), topics.yaml. Then open technical/docs/agent_prompts/R1_B_irt_mastery.md and follow "TASK". Own only the folders listed there. Do not edit contracts. Do not commit or tag.
```

## TASK

### Goal
Turn responses into (1) calibrated **question difficulty/discrimination with standard errors**, a **wrong-answer-key detector**, and a **batch topic-coverage flag**; (2) **per-student topic mastery with honest uncertainty** that beats raw % correct. Pure Python library (NumPy/SciPy; PyTorch optional) with a small, stable API the backend will call. Train/fit offline; online scoring is cheap math.

### Start before the generator exists
Write `ml/common/fixtures.py`: builds tiny DataFrames matching `contracts/datasets.yaml` (a toy 2PL world with known truth, 3 institutes, anchors, 1–2 wrong keys). Use it for unit tests and swap to `data/clean` + `data/truth` once Agent A's M1 is merged (`python -m datagen --seed 42 --preset tiny`). Keep both test paths.

### API (create exactly these; type-hinted, documented, pure functions + dataclasses)
`ml/irt/api.py`
- `fit_items(responses, answer_keys, questions, *, anchors="auto", priors=Priors(), model="auto") -> ItemFit` with per-item `a, b, g, se_b, se_a, n_responses, point_biserial, key_suspect, key_suggested, model_used, fit_flag`.
- `score_student(item_fit, responses_for_student) -> ThetaEstimate(theta, se)` (EAP on a grid; N(0,1) prior).
- `update_item_incremental(item_fit, new_responses) -> ItemFit` (warm start; no full refit).
- `detect_wrong_keys(item_fit, responses, options) -> list[KeyFlag]` (with confidence and a *suggested corrected key* when an option's selection correlates with ability more than the keyed one).
`ml/mastery/api.py`
- `estimate_mastery(student_responses, item_fit, topic_map, *, as_of, half_life_days=None) -> list[TopicMastery(topic_id, theta, se, n_items, band, band_reason)]` where `band ∈ {weak, developing, strong, not_enough_data}`; a band is emitted **only** when `se < tau` and `n_items ≥ n_min` (calibrate both on validation, store in the artifact).
- `batch_topic_coverage(batch_responses, item_fit, topic_map) -> list[CoverageFlag]` (flags "batch-wide failure, probably untaught or wrong key", not student weakness).
- `marks_only_fallback(test_totals, ...) -> SubjectLevelEstimate` (test-level model when no per-question data; subject-level only, labelled).

### Methods (decisions fixed by TECH_PLAN; deviate only with a logged reason)
- 2PL with a **guessing prior** (Beta(2,18) for MCQ, 0 for numeric) — *not* a fixed c = 0.25 — and a Rasch fallback. **Choose between 1PL/2PL per item group by cross-validated log-likelihood**, not a fixed n threshold (simulation shows Rasch ≈ 2PL for n ≤ 100). Priors: `b ~ N(topic_mean, 1.5)`, `log a ~ N(0, 0.5)`.
- **Blanks are scored incorrect** in the main model; run a sensitivity analysis blank = missing vs blank = wrong and report both (MNAR is in the data).
- **Anchors**: concurrent calibration across institutes using shared questions; the tenant-private scale is local if no anchors exist (state it in the output).
- Mastery: per-topic EAP, **hierarchical shrinkage** toward the student's overall θ and the batch mean (empirical-Bayes weights from data), exponential time decay (half-life tuned by CV, search 14–90 days), band thresholds from the topic's calibrated difficulty distribution.
- Baselines: raw % correct per topic; BKT (try `pyBKT`; if it fails to install on Windows, implement a 4-parameter BKT with EM yourself and say so).

### Acceptance criteria (tests + `metrics.json`; keys in `metrics_bars.yaml`)
Evaluate on `data/clean` + `data/truth`, seed 42, **and 2 more seeds**; report mean and range.
1. `irt_difficulty_recovery_r_n200 ≥ 0.90`, `irt_difficulty_recovery_r_n60 ≥ 0.90`, `irt_difficulty_recovery_r_n30 ≥ 0.85` — subsample responses per item to those n; also report Spearman, RMSE(b̂), coverage of the 95 % CI for b (should be 0.90–0.98).
2. `irt_difficulty_recovery_r_n60_misspecified ≥ 0.80` (report): data from the misspecified generators in `datagen` scenarios (MNAR blanks, item-specific guessing, ability drift) — if A hasn't delivered them yet, simulate them in `ml/irt/tests/synth.py`.
3. `irt_discrimination_recovery_r_n200` (report).
4. `irt_wrong_key_recall ≥ 0.80`, `irt_wrong_key_false_flags_per_300 ≤ 2` on injected wrong keys (truth: `key_error_flag`); report precision, and the share of correct *suggested* keys.
5. `mastery_theta_recovery_r ≥ 0.80` against `true_theta_topic` (students with ≥ 3 items in the topic); report r by number of items per topic (1, 2, 3, 4+).
6. `mastery_next_test_auc_gain_over_baselines > 0` with **non-overlapping bootstrap CIs** versus raw % and BKT, held-out *future tests*, held-out *students*; report the gain **by items-per-topic** (the gain may vanish at 1 item — say so).
7. **Band calibration**: among students banded `strong`, observed next-test correct rate > `developing` > `weak` (monotone); report reliability by band; the share labelled `not_enough_data` per test index (cold start).
8. **Coverage flag**: on generator "untaught-topic" tests, recall ≥ 0.8 with ≤ 2 false flags per 100 (batch, topic) pairs.
9. **Incremental update** equals a full refit within |Δb| < 0.05 on average.
10. **Runtime**: fit 2,000 students × 90 questions × 12 tests in < 60 s; `estimate_mastery` for a batch of 80 students in < 1 s (CPU).
11. Property tests (hypothesis): θ is monotone in the number correct holding items fixed; permuting response order doesn't change estimates; removing an item never produces NaN; all outputs finite; empty/one-response students return `not_enough_data`, never an invented band.
12. Contract tests: outputs convert to the `item_params` parquet schema in `datasets.yaml` without loss; `metrics.json` validates; `manifest.json` validates.

### Notebooks (≤ 15 min each on Colab)
`02_irt_difficulty.ipynb`: recovery r vs n (30/60/100/200/500) **for 2PL, Rasch and classical p-value difficulty**, wrong-key detection demo with the suggested key, anchors vs no anchors. Headline slide figure: **recovery r vs number of students** (this is also the moat argument: small institutes borrow strength from the pool).
`03_topic_mastery.ipynb`: student × topic heatmap with SE-aware banding, shrinkage example, gain over baselines by items-per-topic, coverage-flag demo.
`07_robustness.ipynb` (IRT part only; C adds the rest): bars under each misspecification.

### Edge cases
New student with 0–2 tests; topics with 1–2 items per test; whole batch fails an item (key or untaught); bonus/cancelled/dropped items excluded or re-keyed; numeric-answer items; multi-correct; students who blank >60 %; item with all-correct or all-wrong responses (infinite b → prior-regularised, flagged `degenerate`); duplicated question across institutes with different keys; marks-only institute; negative marking schemes.

### Done when
Tests pass (`make test-irt`, `make test-mastery`), notebooks run, `ml/artifacts/v1.0.0/{irt,mastery}/` has `metrics.json`, `manifest.json`, `model_card.md`, READMEs written, `docs/agent_logs/R1_B.md` lists every bar pass/fail with CIs.
