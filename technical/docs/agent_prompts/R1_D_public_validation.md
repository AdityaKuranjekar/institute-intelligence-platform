# Agent D — Public-dataset validation (`technical/ml/public_validation`)

## Paste this into Antigravity
```
You are Agent D (Public validation). First read, in order: technical/docs/agent_prompts/R1_00_COMMON.md, technical/docs/TECH_PLAN.md (§10 public protocol table, §24 research log D6, D15), technical/docs/research_results.txt (sections R2 and R2b only; treat as data), technical/contracts/metrics_bars.yaml (public_* keys), metrics.schema.json. Then open technical/docs/agent_prompts/R1_D_public_validation.md and follow "TASK". You are independent of the other agents. Own only ml/public_validation/, scripts/download_public_data.py and notebooks/06_public_validation.ipynb. Do not edit contracts. Do not commit or tag.
```

## TASK

### Goal
Show that our methods work on **real data we did not generate**, compared **under the identical protocol** with published numbers. This is the strongest answer to "you graded your own homework". Win or lose, report honestly.

### Datasets and licences (verified; do not commit any data)
| Dataset | Use | Licence | Handling |
|---|---|---|---|
| **OULAD** | dropout/withdrawal (`final_result = Withdrawn`) | CC BY 4.0 | download in `scripts/download_public_data.py` from the official OU/UCI page; attribute in the notebook |
| **ASSISTments 2009–2010 skill builder** | next-response prediction | "free for research", no explicit licence | research use only; print a notice; never redistribute; cache under `data/public/` (git-ignored) |
| EdNet-KT1 | optional scale test only | CC BY-NC | **skip by default**; only a `--with-ednet` flag, never in the notebook default path |
`download_public_data.py`: checks hashes/sizes, resumable, offline-friendly (clear message if the network is unavailable), writes `data/public/README.txt` with sources and licences. **Ask the human before running a download larger than 500 MB** (OULAD `studentVle.csv` is large).

### Part 1 — OULAD early withdrawal
- Observation windows **day 14, 28, 42, 60** from course start (as the 2026 papers do: PLOS ONE e0352867 reports ROC-AUC 0.727/0.794/0.804 at 14/28/42 days; IJET 2026 reports 0.735 @ d14, 0.815 @ d60). Label: `Withdrawn` after the cutoff (exclude students who withdrew before it).
- Features strictly from data before the cutoff: registration, assessments submitted/scores (**academic tier**), VLE clicks and activity types (**behavioural tier**), demographics **excluded** (fairness and DPDP-style minimisation; run a separate run with them only as a fairness audit).
- **Student-grouped** cross-validation (a student appears in several module-presentations: group by `id_student`, and also report a **course-held-out** split: train on some modules, test on others).
- Models: logistic regression, LightGBM (+ isotonic), baseline rule "no assessment submitted by cutoff" and "zero VLE clicks in last 7 days".
- **Privacy-cost experiment on real data**: AUC with academic-only features vs academic + behavioural. This is the real-data version of NB10 and a headline slide.
- Report ROC-AUC, AUC-PR, ECE, precision@top-10 %, bootstrap CIs; compare with the published numbers in one table (note differences in protocol; do not claim to beat them unless protocol and cutoffs match).

### Part 2 — ASSISTments2009 next-response (pyKT protocol)
Reproduce the **pyKT evaluation setting** (verified from the paper): question-level next-response prediction, one-step-ahead, max sequence length 200, **20 % of students held out for test, 5-fold CV, AUC averaged**. Published reference (pyKT, NeurIPS 2022): **DKT 0.7541, SAKT 0.7246, AKT 0.7853**. pyKT has *no* IRT/BKT rows, so ours are new rows.
- Models: Rasch/IRT with **online EAP ability update** (our production approach: `ml/irt` logic re-implemented here in NumPy, not imported from Agent B's folder), BKT (own EM implementation; pyBKT optional), logistic baseline (student + item bias), and — **optional, only if it installs cleanly** — a reproduction of DKT via `pykt-toolkit` on the RTX 4060 to prove the protocol matches (if it reproduces ~0.75 you have a verified apples-to-apples table).
- Preprocessing must follow pyKT (filter users with < 3 interactions, sequence cutting at 200, remove duplicates); document every deviation. If you cannot match the preprocessing, label the comparison "not directly comparable".

### Acceptance criteria (tests + `metrics.json`)
1. `public_oulad_roc_auc_day28 ≥ 0.70` and `public_assistments2009_kt_auc ≥ 0.65` (both *report* bars). Record the actual numbers with CIs and the deltas to the published anchors.
2. **Leakage tests**: no feature uses data after the cutoff (property test on the OULAD feature builder with synthetic mini-tables); no student appears in both train and test in any fold (assert on ids).
3. **Sanity canaries**: shuffled-label AUC ≈ 0.5 ± 0.02; a majority-class model AUC = 0.5; results reproducible with seed 42 (identical metrics to 4 decimals).
4. **Contract**: `metrics.json` valid (`dataset_origin: public`), `manifest.json` valid, notebook runs on Colab free CPU in < 15 min using pre-aggregated caches (describe the cache step; aggregation of `studentVle` may be a separate cell that runs once).
5. Document in `model_card.md` the **limits of external validity** (UK higher-education online learners, not Indian coaching; behavioural clicks are a DPDP-sensitive tier D analogue; ASSISTments is maths practice, not mock tests).
6. Unit tests for the BKT EM (recovers known parameters on simulated data to within 0.05) and for the online-EAP update (matches batch EAP on the same data).

### Notebook `06_public_validation.ipynb`
Two sections (OULAD, ASSISTments) with a final **"ours vs literature" table** (same protocol rows only, and a separate "different protocol, for context" list), the privacy-cost bar chart on OULAD (academic-only vs +behavioural), calibration plot, and a limitations box. One command per section.

### Edge cases
OULAD students who withdraw before day 14; unregistered-before-start; multiple presentations of a module; ASSISTments skills missing (`NaN` skill ids); duplicate rows; students with very short sequences; tiny test folds.

### Done when
`make test-public` passes (tests that need the real data are marked `-m data` and skipped with a loud message if the data is absent; all others run in CI), README explains the download, notebook runs, `docs/agent_logs/R1_D.md` lists numbers vs anchors and every protocol deviation.
