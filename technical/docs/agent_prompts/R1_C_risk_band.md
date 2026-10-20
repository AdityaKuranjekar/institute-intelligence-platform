# Agent C — Early warning, support list and percentile band (`technical/ml/risk`, `technical/ml/rank`)

## Paste this into Antigravity
```
You are Agent C (Risk + Band). First read, in order: technical/docs/agent_prompts/R1_00_COMMON.md, technical/docs/TECH_PLAN.md (§1 #11, §10 all rows + routing table + percentile mapping, §15, §17, §18), technical/docs/FEASIBILITY_CHECK.md (all), technical/contracts/features.yaml, routing_policy.yaml, reason_templates.yaml, enums.yaml, metrics_bars.yaml, metrics.schema.json, datasets.yaml (attendance, fees, engagement, test_totals, responses, risk/prediction tables, truth tables), percentile_tables.csv. Then open technical/docs/agent_prompts/R1_C_risk_band.md and follow "TASK". Own only the folders listed there. Do not edit contracts. Do not commit or tag.
```

## TASK

### Goal
Produce, for each batch and week, a **short, capacity-limited, supportive "needs support" list with plain-language reasons and a suggested action**, and a **predicted exam-percentile range with honest uncertainty**. Everything is **routed by purpose and age** (`routing_policy.yaml`). You are judged on rigour: leakage-proof features, baselines at equal workload, calibration, fairness, and what the model cannot do.

### Start before the generator exists
Wait for Agent A's `tiny` preset (M1), but start now with `ml/common/features.py`, `splits.py`, `metrics.py` and the **rules engine**, tested on hand-made fixtures (reuse `ml/common/fixtures.py` from Agent B when present; otherwise create minimal local ones under `ml/risk/tests/fixtures.py`). Switch to `data/clean` and `data/truth` at M1.

### API (exactly these; typed; no I/O inside)
`ml/risk/api.py`
- `build_features(tables, as_of, student_ids, tiers) -> DataFrame` — only names from `contracts/features.yaml`; uses only rows dated `< as_of`; batch-relative where flagged.
- `route(student, as_of, legal_settings, consents) -> RoutingDecision(target→method, allowed_tiers)` — loads `routing_policy.yaml`; **a minor never gets ML retention/fee while the flag is off; tier D never for a minor**; missing/revoked consent ⇒ `method="none"`.
- `score_batch(as_of, batch_id, tables, models, legal_settings, consents, *, capacity=None) -> SupportList` — items: `student_id, target, band, score|None, reasons[{key, slots, text_en, text_hi}], suggested_action, method (ml|rules), feature_tier_used, model_version, persisted_since`. Uses ML where routed, else the transparent rules from `routing_policy.yaml`.
- `explain(model, row) -> list[Reason]` — LightGBM `pred_contrib=True` contributions (no `shap` dependency required; `shap` allowed for plots only) → top-3 *positive-risk* features → `reason_template_key` → typed slots from raw values ("absent 6 of last 10 classes"), never SHAP numbers.
`ml/rank/api.py`
- `predict_band(student_features, as_of, model, mapping) -> PercentileBand(low, mid, high, level=0.8, scale="internal", mapped_low, mapped_high, mapping_assumption_id, width, wording_key)` — never a single number in any user-facing field.

### Methods (fixed by TECH_PLAN unless you log a reason)
- **Targets**: (a) `academic_support`: observed batch-relative mastery/score drop > 0.5 SD over 4 weeks (define from *observed* data, not truth); (b) `retention`: dropout within 30 days and 60 days; (c) `fee`: next instalment > 30 days overdue.
- **Models**: logistic regression baseline; LightGBM (early stopping on a validation *cohort*, monotone constraints where sensible, e.g. more consecutive absences never lowers risk) + isotonic calibration on a held-out cohort. Optional discrete-time hazard for "when" (stretch).
- **Flag persistence / hysteresis (alert fatigue, FEASIBILITY §2 problem 4)**: a student stays on the list until resolved (intervention outcome logged) or improving for 2 consecutive weeks; re-surfacing requires score increase ≥ δ; list size capped at `mentor_capacity_per_week`. Track `distinct_students_flagged_share_per_month`.
- **Operating point** = top-k per batch per week, k = `mentor_capacity_per_week`. Never threshold 0.5.
- **Percentile band**: LightGBM quantile (0.1/0.5/0.9) + **conformalized quantile regression (CQR)** on a calibration *cohort*; target = `internal_mock_scale_score` from `true_final_outcomes`; mapping to the NTA percentile via `contracts/percentile_tables.csv` using the 2026 session-average curve as centre and the 2024 easy/tough shift curves as the **mapping-uncertainty envelope** (widen the mapped band accordingly). Wording keys instead of decimals.
- **Rules engine** (`ml/risk/rules.py`) implements the `routing_policy.yaml` rules DSL exactly (`feature operator threshold`), unit-tested for every rule, EN+HI reason text.

### Evaluation protocol (non-negotiable; see COMMON)
- Splits: **train on earlier academic-year cohorts, test on the last cohort** (CCR-007); plus **leave-one-institute-out**; calibration on a separate cohort. Features are weekly as-of snapshots (`as_of` = every Monday).
- Compare against **the institute rule** (`attendance_rate_28d` < 0.75 *or* last test < 40 % of max) **at equal weekly workload (same top-k)**, and against LR.
- Report with bootstrap-over-students 95 % CI, `n`, `n_events`, 3 generator seeds.

### Acceptance criteria (tests + `metrics.json`; keys from `metrics_bars.yaml`)
1. `ew_auc_pr_rel_gain_over_institute_rule ≥ 0.30` (blocking).
2. `ew_gradual_recall_rel_gain_over_rule_at_capacity ≥ 0.25` and `ew_precision_at_capacity_rel_gain_over_rule ≥ 0.25` (blocking), **at the same top-k**.
3. `ew_calibration_ece < 0.05` after isotonic, on the held-out cohort **and** on the held-out institute (report the latter; do not hide a worse number).
4. Report-only but required: `ew_median_lead_time_days` and `ew_gradual_dropout_recall_at_capacity` **beside the rule at the same top-k**; `ew_distinct_students_flagged_share_per_month`; the **sudden-dropout ceiling** (recall on sudden dropouts is expected near random; show it).
5. `falling_behind_auc_pr_gain_over_rule > 0` and `fee_default_auc_pr_gain_over_rule > 0` (blocking; fee model evaluated on the 18+/consented routing only).
6. `conformal_80_coverage ∈ [0.77, 0.83]` on the held-out cohort **and** coverage under shift (held-out institute: report it, expect and explain a drop); `conformal_band_width_monotone_shrink = 1` (mean width non-increasing with months of history; test with a monotonicity check allowing a 2 % tolerance); also MAE of the median, and mapped-band width.
7. `fairness_max_slice_recall_gap ≤ 0.10` (report) over gender, class_level, city_tier, fee_plan, **with "insufficient data" when a slice has < 30 events**; explain gaps, don't hide them.
8. **No leakage** (blocking): hypothesis test mutating any row dated ≥ `as_of` leaves `build_features` output unchanged; a second test trains with a feature deliberately shifted into the future and confirms the pipeline's "leakage canary" raises (build the canary: AUC > 0.95 on any target ⇒ fail the run).
9. **Routing** (blocking): table-driven test over every (`is_minor` × `minor_ml_risk_enabled` × target × consent present/absent) combination: ML score appears only where `routing_policy.yaml` says so; with the flag off and `is_minor=true`, the retention and fee outputs come from rules and contain no score; tier D columns never enter a minor's feature row (assert on the column list).
10. **Ablation / privacy-cost curve** (NB10): AUC-PR, recall@k and median lead time for tiers A, A+B, A+B+C, A+B+C+D, and for the three routing modes (minor-safe rules-only / minor-ML-enabled / adult). The honest message is the **cost of privacy**; show it plainly.
11. Reasons: every top reason maps to a `reason_template_key` with EN and HI text; no banned words (`reason_templates.yaml`) in any output string (test over all templates × slots); a student never sees another student's data.
12. Runtime: `score_batch` for 200 students < 2 s CPU; full weekly rescoring of 2,000 students < 30 s.

### Notebooks (≤ 15 min each, Colab CPU)
`04_early_warning.ipynb` (headline: model vs institute rule at equal workload; lead-time and recall curves vs top-k; sudden-dropout ceiling; reasons → actions example), `05_percentile_range.ipynb` (headline: **band-width-by-month funnel**; coverage in-distribution vs under shift; mapping envelope), `10_privacy_tiers.ipynb` (privacy-cost curve), plus the risk/band parts of `07_robustness.ipynb` (use A's scenarios `dropout_x2`, `sudden_heavy`, `no_attendance`, `small_batches`).

### Edge cases
New students (< 4 weeks of data ⇒ rules only, no ML); students who turn 18 mid-year (re-route and re-consent on the date); revoked consent mid-year (remove from list, delete derived scores for that purpose); transfers between batches (batch-relative features use the batch at `as_of`); festival and board-exam dips (relative features); fee paid upfront (no fee signal ⇒ `fee=none`); small institutes (< 200 students) — pooled global model + per-institute isotonic calibration only (never cross-tenant training on real minors' data; here everything is synthetic, but implement the interface as if it were real: `train(global_tables)` vs `calibrate(tenant_tables)`).

### Done when
`make test-risk`, `make test-rank` pass; notebooks run; `ml/artifacts/v1.0.0/{risk,rank}/` has `metrics.json`, `manifest.json`, `model_card.md`; `docs/agent_logs/R1_C.md` has every bar pass/fail with CIs, **including every bar you missed and why**.
