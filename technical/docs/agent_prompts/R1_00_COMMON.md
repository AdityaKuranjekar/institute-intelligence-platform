# Round 1 — shared rules for ALL agents (read before your own prompt)

Repo: `institute-intelligence-platform/`. All code lives under `technical/`. Work from `technical/` as the current directory. Contracts are frozen at tag `contracts-v1.0.0` plus the amended `metrics_bars.yaml` (v1.0.1 bars). **Never edit `technical/contracts/`.** If a contract is wrong or missing something, write it to `technical/docs/contract_change_requests.md` (what, where, proposed fix) and choose the more conservative option.

## What Round 1 must prove (judges: 70 % technology)
Every notebook proves ONE claim, with a number from `metrics.json`, labelled **synthetic / public / real_photo**. Judges reward stated assumptions and limits over oversell. Synthetic results prove the pipeline; public-dataset and real-photo results prove contact with reality. Never present a synthetic number as real-world accuracy.

## Run order and dependencies
```
Wave 1 (parallel, independent):  A DataGen   D PublicValidation   E GenAI
Wave 2 (after A delivers M1):    B IRT+Mastery   C Risk+Band
```
Until A's `data/` exists, B and C develop against **tiny fixtures built from `contracts/datasets.yaml`** (`ml/common/fixtures.py`, written by B, reused by C) and must switch to real generator output when A's milestone M1 is merged.
A's milestones: **M1** = small preset, schema-valid, deterministic, within 24 h of work. **M2** = full multi-institute, multi-year, dirty files, synthetic OMR.

## Environment (the build laptop, Windows 11)
- Python 3.12 is installed (3.11 also fine). **No Docker.** Not installed: scikit-learn, LightGBM, PyTorch, SHAP, OpenCV. Each module has its own `requirements.txt` (pinned versions, `pip install` into a venv `.venv/` that is git-ignored).
- GPU: RTX 4060 8 GB. Colab free is the second target: every notebook must run top-to-bottom in **< 15 min on free Colab CPU** with seed 42 (state the measured time in the notebook footer). Notebooks live in `technical/notebooks/` and import code from the module packages (no logic only in notebooks).
- Windows paths and encodings: use `pathlib`, open files with `encoding="utf-8"` (Devanagari!), never rely on the console code page.

## Folder ownership (do not touch other agents' folders)
| Agent | Owns |
|---|---|
| A | `technical/datagen/`, `technical/notebooks/01_synthetic_data.ipynb` |
| B | `technical/ml/irt/`, `technical/ml/mastery/`, `technical/ml/common/fixtures.py`, notebooks `02`, `03`, and the IRT part of `07` |
| C | `technical/ml/risk/`, `technical/ml/rank/`, `technical/ml/common/{features,splits,metrics}.py`, notebooks `04`, `05`, `10` |
| D | `technical/ml/public_validation/`, `technical/scripts/download_public_data.py`, notebook `06` |
| E | `technical/backend/app/genai/`, `technical/backend/templates/`, notebook `08` |
Shared read-only: `technical/contracts/`, `technical/docs/`. Output of the generator is read by everyone from `technical/data/` (git-ignored; regenerate with `python -m datagen --seed 42 --preset full`).

## Evaluation protocol (applies to every ML claim; judges check this)
1. **No leakage.** Split by *student* and by *time*, never by row. Features are built as-of a date (`features.yaml` → `as_of_rule`); every feature builder has a property test: mutating any row dated ≥ `as_of` must not change the output.
2. **Time evaluation = academic-year cohorts** (CCR-007): train on earlier years, test on the last year. Also leave-one-institute-out. (A month-based split puts the dropout peak in training, see `docs/FEASIBILITY_CHECK.md`.)
3. **Baselines at equal workload.** Every model result sits next to (a) a simple baseline and (b) where relevant the *institute rule* at the same top-k per week. Relative gains, not only absolute numbers.
4. **Uncertainty.** Bootstrap 95 % CIs over *students* (≥ 500 resamples); report seeds (≥ 3 generator seeds for the headline numbers; mean ± range).
5. **Thin results are labelled.** Every metric reports `n` and `n_events`; slices with < 30 events report "insufficient data", not a number.
6. **Report failures.** If a bar is missed, say so, say why, and propose the fix. Never change the generator or the bar to make a number pass. A missed `blocking` bar stops the merge and goes to the human.

## Outputs every module must produce
- `<your-module-folder>/artifacts/v1.0.0/metrics.json` (e.g. `ml/irt/artifacts/v1.0.0/`, `backend/app/genai/artifacts/v1.0.0/`; **never a shared top-level file**, agents would overwrite each other; `scripts/deck_numbers.py` merges every `**/artifacts/v*/metrics.json`), valid against `contracts/metrics.schema.json` (keys from `contracts/metrics_bars.yaml`); `manifest.json` valid against `contracts/artifact_manifest.schema.json`; `model_card.md` (intended use, NOT-intended use, data, metrics with CIs, fairness slices, limitations, privacy tier and routing).
- A `README.md` in the module folder: how to run, how to test, runtime, known limits.
- Tests runnable with `make test-<module>` (add a target in `technical/Makefile` in your own section only) and a `scripts` equivalent for Windows PowerShell. All tests pass on a clean clone.
- `docs/agent_logs/R1_<agent>.md`: 10–20 lines: decisions, deviations, results vs bars (pass/fail table), limitations, open questions.

## Privacy and well-being rules for code and copy
- Routing follows `contracts/routing_policy.yaml` (purpose- and age-aware). A minor never receives an ML retention or fee score while `minor_ml_risk_enabled` is false. Tier D features are never used for minors.
- No ranks, leaderboards or comparisons between named students in any output. Banned words list: `contracts/reason_templates.yaml`.
- No real personal data; names are synthetic. No student names or free text in any LLM prompt (placeholders only).
- No secrets in the repo; no network calls at runtime except `scripts/download_public_data.py` and optional model pulls.

## DO NOT (all agents)
Edit `contracts/`; add dependencies without pinning them in your module's `requirements.txt`; commit data files, model weights over 5 MB, or downloaded datasets (licences: EdNet is CC BY-NC, NTA papers have no reuse licence); change another agent's folder; claim a result you did not compute; commit or tag (the human reviews and merges).
