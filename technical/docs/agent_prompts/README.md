# Agent prompts — index and run order

| Phase | File | Agent | Run when | Needs from you |
|---|---|---|---|---|
| 0 | `P0_contracts.md`, `P0b_contract_fixes.md` | Contracts | done, tagged `contracts-v1.0.0` | NEET check, then v1.0.1 |
| R1 common | `R1_00_COMMON.md` | all | read by every agent | none |
| R1 wave 1 | `R1_A_datagen.md` | A DataGen | **first** (M1 `tiny` before anything else) | none |
| R1 wave 1 | `R1_D_public_validation.md` | D Public validation | in parallel with A | approve the OULAD download (~hundreds of MB) |
| R1 wave 1 | `R1_E_genai_reports.md` | E GenAI | in parallel with A | run `ollama pull qwen3:4b` and `ollama pull gemma3:4b` when asked; Hindi reviewer for templates |
| R1 fix-up | `R1_A2_datagen_fixes.md` | A DataGen | **now**, before B and C (cohort sizes) | none |
| R1 fix-up | `R1_E2_genai_fixes.md` | E GenAI | **now** (verifier gaps found by independent adversarial test) | none |
| R1 wave 2 | `R1_B_irt_mastery.md` | B IRT + Mastery | after A2 merged (cohort-size fix) | none |
| R1 wave 2 | `R1_C_risk_band.md` | C Risk + Band | after A2 merged (cohort-size fix) | none |
| R1 wave 2 | `R1_F_tagging.md` | F Tagging | after A2 (independent of A data, but needs `ollama pull qwen3:4b`) | **label 150 questions** (about 2 hours, 2 teammates) |

Each file starts with a short **"Paste this into Antigravity"** block; the agent then reads the full TASK section.
Human gate after every agent: run its tests yourself, open its `docs/agent_logs/R1_<X>.md`, read the pass/fail table, then commit. A missed `blocking` bar goes to the human; nobody moves a bar or the generator to make a number pass.

Verify the prompts against the contracts any time: `make test-docs` (from `technical/`).
