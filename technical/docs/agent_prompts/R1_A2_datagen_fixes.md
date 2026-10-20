# Agent A, fix-up 2 (same workspace/agent as R1_A)

## Paste this into Antigravity
```
You are Agent A (DataGen) doing a fix-up pass. Read technical/docs/agent_prompts/R1_A2_datagen_fixes.md and follow its TASK exactly. Own only technical/datagen/ and notebooks/01_synthetic_data.ipynb. Do not edit contracts. Do not commit or tag.
```

## TASK
Human review of the `full` preset (seed 42) found one structural problem for the ML agents:

**FIX 1 (blocking): cohort sizes.** The configured institute size (Patna 400, Lucknow 900, Gaya 150, Kota 2000) was split across the three academic years (2024: 360, 2025: 863, 2026: 2,227 students in total, i.e. 10 % / 25 % / 65 %). Consequences: the training years have only ~230 dropout events in total (62 + 165), Gaya has 30 / 38 / 82 students per year (≈ 5–14 events per year), and the cohort-growth pattern is an undocumented artefact. **Make the configured size the size of EACH academic-year cohort** (full preset = 3,450 students per cohort-year, 10,350 in total, ≈ 620 dropout events per year, ≈ 1,860 in total). Keep the rest of the generator as is. Add a config key `cohort_size_mode: per_year` (the old behaviour may remain as `total_split` for tiny tests) and document it in the config with a source/assumption comment. The `tiny` preset stays small (150 students per year, 2 years).
Acceptance (add tests, keep all 12 existing tests green, update thresholds that depended on the old totals):
1. Students per (institute, academic_year) equals the configured size ± 2 %.
2. Expected events: every cohort-year has dropout rate in 12–25 %, and total events per year ≥ 550 in `full`; Gaya has ≥ 25 events per year.
3. `full` still runs in < 5 minutes and uses < 4 GB RAM (expect ~90 s); output stays < 400 MB; determinism test (seed 42 vs 43) still passes.
4. The 6 scenarios still change their target statistic by ≥ 25 %.
5. Update `notebooks/01_synthetic_data.ipynb` and `datagen/README.md` with the new counts, re-execute the notebook, and keep it < 15 min.
6. Update `docs/agent_logs/R1_A.md` with the new marginals (dropout rate by institute and year, events per year, students per year).

**FIX 2 (report, do not change behaviour): document in the README** that the share of students whose realised overall attendance is < 0.75 is ≈ 37 % (it includes festival dips and pre-dropout fades), and that students with realised overall attendance < 0.75 have a ≈ 30 % dropout rate vs 18 % overall (by construction, since fades lower the realised average). Agents B/C must not use realised overall attendance as a feature without an as-of date.

Do not alter any column names or dtypes (contract `datasets.yaml`).
