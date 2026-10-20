# Agent A (`datagen`) — Round 1 Execution Log

1. **Key Decisions:**
   - Implemented the deterministic 10-step synthetic data generator in `technical/datagen/` using `numpy.random.SeedSequence(seed).spawn(10)` and `uuid.uuid5` so `seed=42` produces byte-identical Parquet, CSV, JSON, and PNG/JPG outputs across runs.
   - Vectorized daily attendance and item-response simulation so `--preset tiny` finishes in **~2.2 s** (`< 20 s` budget) and `--preset full` (4 institutes, 3,450 students across 2024–2026 cohorts, 1.98M responses) finishes in **~30 s** (`< 5 min` budget).
   - Enforced MoE 2024 cl. 6(i) ($\ge 16.0$ years at enrolment for all clean students; 1 under-16 error row injected in `data/dirty/01_patna_students_row3_merged.xlsx`), Rajasthan Act 2025 s.6(2)(d) (`rajasthan_4_equal`), 10-day pro-rata refund, and DPDP Act s.9 ($\ge 55\%$ minor share $< 18$ at `as_of = 2026-10-01` + 18th-birthday adult self-consent re-collection).
   - Generated 12 messy CSV/XLSX files across all 4 institutes (`datagen/messy/`) paired with golden `expected/*.json` outputs and reference parser `datagen/messy/reference_parse.py`, plus 210 synthetic A4 OMR scans (`full`) / 24 (`tiny`) across `jee_75`, `neet_200`, and `generic_mcq_100` with 6 camera/WhatsApp augmentations (`datagen/omr_synth/`).
2. **Deviations & Contract Change Requests:**
   - Logged **CCR-008** in `docs/contract_change_requests.md`: `data/clean/item_params.parquet` strictly follows `contracts/datasets.yaml` (`point_biserial`, `key_confidence`, `suspected_wrong_key`, `c`), while `test_01_schema_contracts_and_postgres_load` maps these columns when inserting into `contracts/schema.sql` (`g`, `se_b`, `fit_flag`, `model_version`).
3. **Measured Marginals vs. Config Target Bands (`full` preset, `seed=42`):**
   - Annual dropout rate by cohort-year: `2024 = 0.172`, `2025 = 0.191`, `2026 = 0.182` (target `[0.12, 0.25]`) — **PASS**
   - Months 3–4 dropout concentration: `0.465` (target `>= 0.35`) — **PASS**
   - Sudden dropout share: `0.253` (target `[0.20, 0.30]`) — **PASS**
   - Class mix (`class_11 / class_12 / dropper`): `0.300 / 0.300 / 0.399` (target `0.30 / 0.30 / 0.40 ± 0.03`) — **PASS**
   - Attendance mean outside dips: `0.805` (target `[0.78, 0.86]`) — **PASS**
   - Oct–Nov out-of-town festival dip ratio: `0.601` (target `[0.55, 0.70]`) — **PASS**
   - Final instalment late/default share: `0.174` (target `[0.15, 0.20]`) — **PASS**
   - Blanks rate & correlation with $-\theta$: `rate = 0.109`, `corr = 0.852` (target `[0.03, 0.15]` & `> 0.20`) — **PASS**
   - Minor fraction ($< 18$ at `2026-10-01`) & min join age: `minor = 0.615`, `min_age = 16.03y` (target `>= 0.55` & `>= 16.0`) — **PASS**
   - Gradual fade drop (`0.319 >= 0.20`), sudden diff (`0.025 <= 0.05`), chronic low attenders (`0.299 >= 0.08`, rel diff `-0.231` within `±0.25`), shared anchors (`0.253 >= 0.25`), wrong-key $r_{pb} < 0.05$ (`1.00 >= 0.80`) — **PASS**
4. **Known Limitations & Open Questions:**
   - Synthetic data validates internal causal consistency, IRT parameter recovery, and DPDP routing mechanics, not live field accuracy. No open questions blocking Round 2.
