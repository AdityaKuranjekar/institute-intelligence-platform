# Technical: the Pragati platform (Case B: The Data Moat)

Everything that makes the product work: frozen contracts, synthetic data generator, models, report generator, tests and the plan behind them. Student data is **synthetic** (seeded generator with ground truth); methods are validated on **public data** (OULAD, ASSISTments 2009). Everything runs free and local.

| Folder | What is in it | Status |
|---|---|---|
| `contracts/` | Frozen schema, OpenAPI, enums, routing policy, metric bars, 380-topic syllabus (tag `contracts-v1.0.0`; `metrics_bars.yaml` amended, pending tag v1.0.1) | Done, 14 tests |
| `datagen/` | Seeded synthetic institutes (4 institutes, 3,450 students, 1.98M responses) | Wave 1 done, 12 tests; cohort-size fix pending (`R1_A2`) |
| `ml/public_validation/` | OULAD withdrawal and ASSISTments next-answer baselines under published protocols | Done, 8 tests (OULAD day-28 AUC 0.706; ASSISTments 0.763) |
| `backend/app/genai/` | Parent-report pipeline: facts, optional local model, 8-check verifier, templates | Done, 16 tests; verifier gaps pending (`R1_E2`) |
| `analysis/` | Feasibility simulations and the independent attack on the report checker | Reference |
| `notebooks/` | Notebooks 01 (data), 06 (public validation), 08 (GenAI) | Partial |
| `scripts/` | `deck_numbers.py` merges all `metrics.json` into slide numbers; dataset downloader | Tools |
| `tests/` | Document, deck and number-consistency tests | 68 tests |
| `docs/` | Plan, research, agent prompts and logs, reviews (index: `docs/README.md`) | Living |

## Run the tests
```
cd technical
python -m pytest tests -q            # documents, deck and numbers (68)
make test-contracts                  # contracts (live PostgreSQL via pgserver, no Docker)
make test-datagen && make test-public && make test-genai
```
Large local-only folders (not in git): `data/` (public datasets, about 600 MB) and `ml/public_validation/.venv`.

## Still to do (in order)
1. Run `R1_A2` (cohort sizes) and `R1_E2` (verifier gaps) in Antigravity. 2. Then agents B (IRT and mastery), C (risk and bands) and F (tagging). 3. NEET 2026 pattern check, contracts v1.0.1. 4. Wave 3: backend API, frontend, OMR reader. See `docs/ROUND2_PLAN.md` for the prototype plan.
