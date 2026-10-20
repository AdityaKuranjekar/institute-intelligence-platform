# Agent D Log — Public-Dataset Validation (`ml/public_validation`, Round 1)

1. **Key Architecture & Protocol Decisions:**
   - **Self-Contained Independence:** Implemented `ml/public_validation/{oulad.py, assistments.py, evaluate.py}` in pure NumPy/SciPy/scikit-learn/LightGBM with its own `.venv` and `artifacts/v1.0.0/{metrics.json, manifest.json, model_card.md}` so zero files outside Agent D's ownership are touched.
   - **OULAD Strict `as_of` Temporal Boundary (`oulad.py`):** Excludes students who withdrew on/before `cutoff_day` (`date_unregistration <= cutoff_day`) or registered on/after `cutoff_day` (`date_registration >= cutoff_day`), and aggregates only assessments/submissions and daily VLE clicks with `date < cutoff_day`. Pre-aggregates `studentVle.csv` (`10.65M` rows) into `vle_daily_cache.parquet` so multi-window evaluation runs in `< 3 min` on laptop CPU.
   - **ASSISTments2009 `pyKT` Protocol (`assistments.py`):** Reproduces `pyKT`'s `assist2009_preprocess.py` + `split_datasets.py` (`random_state=1024`, 20% held-out test students = `770`, 80% 5-fold CV = `3,082` students, `min_seq_len=3`, `maxlen=200`). Collapses multi-skill duplicate `order_id` rows into `283,105` question-level events (`338,001` KC-expanded interactions) and evaluates one-step-ahead (`t >= 1`) across `55,755` held-out test responses.
   - **Models Evaluated:** On OULAD, Student-Grouped 5-Fold CV and Course-Held-Out 7-Fold CV for LightGBM + inner-fold student-grouped Isotonic Calibration, Logistic Regression + Isotonic, and two heuristic rules (*"No assessment by cutoff"*, *"Zero VLE clicks in last 7d"*). On ASSISTments2009, `OnlineRaschEAP` (hierarchical skill+item Rasch with exact online EAP updates), `1PL Rasch` (global online EAP), `BKTModel` (vectorized Baum-Welch EM + LF-AVG), and `LogisticItemStudentBaseline`.

2. **Protocol Notes & Deviations vs. Literature:**
   - Published OULAD day-cutoff papers (Wu et al., *PLOS ONE* 2026 `e0352867`; *IJET* 2026) include demographic attributes and vary in how pre-course withdrawals (`date_unregistration <= 0`) and module dummies are treated. Under our strict demographic-free, active-cohort (`date_unregistration > cutoff_day`), student-grouped 5-fold protocol, LightGBM reaches `0.6699` (d14), `0.7061` (d28), `0.7115` (d42), and `0.7171` (d60).
   - On ASSISTments2009, `OnlineRaschEAP` estimates question difficulty $b_q$ shrunk toward skill difficulty $b_s$ and updates both global and skill-specific student ability online via quadrature EAP, achieving `0.7633 ± 0.0012` ROC-AUC (`95% CI [0.7560, 0.7785]`), outperforming classical 4-param BKT (`0.7135`), SAKT (`0.7246`), and DKT (`0.7541`), while trailing GPU-trained AKT (`0.7853`) by `2.2` AUC points.

3. **Pass/Fail Summary Against `contracts/metrics_bars.yaml` & Literature Anchors:**

| Metric Key / Task | Gate | Contract Target | Ours (Seed 42) | 95% Student Bootstrap CI | Literature Anchor (Same Protocol) | Status |
|---|---|---:|---:|---:|---|---|
| `public_oulad_roc_auc_day28` (Tier A+D) | `report` | `>= 0.70` | **0.7061** | `[0.6989, 0.7140]` | `0.794` (*PLOS ONE* 2026); `0.727` @ d14, `0.804` @ d42 | **PASS** |
| OULAD Day-28 Tier A Only (DPDP Minor-Safe) | ablation | — | **0.6980** | `[0.6903, 0.7069]` | Δ = `-0.0081` vs Tier A+D (`-0.0247` @ d14) | **INFO** |
| `public_assistments2009_kt_auc` (`OnlineRaschEAP`) | `report` | `>= 0.65` | **0.7633** | `[0.7560, 0.7785]` | SAKT `0.7246`, DKT `0.7541`, AKT `0.7853` (*NeurIPS* 2022) | **PASS** |
| ASSISTments2009 4-Param BKT EM (`bkt_em`) | baseline | — | **0.7135** | `[0.7023, 0.7273]` | Classical HMM/EM baseline | **INFO** |

4. **Known Limitations & Open Questions for Integration:**
   - **External validity:** OULAD represents UK adult distance-learning university students (`CC BY 4.0`) and ASSISTments represents US middle-school formative math practice (research use only); neither captures JEE/NEET `+4/-1` negative marking or physical coaching batch attendance. Public models validate algorithmic soundness only; zero weights transfer to production tenants.
   - **Artifact consolidation (`R2`):** Validated artifacts are written to `ml/public_validation/artifacts/v1.0.0/{metrics.json, manifest.json, model_card.md}`; the Round-2 integrator should merge `results[]` into the top-level `ml/artifacts/v1.0.0/metrics.json`.
