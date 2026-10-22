# Round 2 plan (offline finale), free-only

Source: Participant Guide §9-10. Same rubric as Round 1, but judges now score the **working prototype, depth of analysis and the curveball**. Dates are "to be announced": plan by gates, not calendar dates, and put the real dates in `CLAUDE.md` as soon as the organisers send them.

## 1. What the PS requires in Round 2
| # | Deliverable | Limits | Status today |
|---|---|---|---|
| 1 | **Working prototype**: upload test results (CSV **or** OMR photo) → topic-mastery heatmap, at-risk list with reasons, predicted performance range, auto-generated parent report (Hindi or English). Live demo; **judges may change an input live**; code repository link submitted in advance | live, not screenshots | libraries exist (generator, parent-report module, public validation); **no backend, no web app, no ingestion code, no OMR reader yet** |
| 2 | Updated deck incorporating judges' Round 1 feedback | PDF, **max 15 content slides** | Round 1 blueprint in `presentation/docs/BLUEPRINTS.md`; +3 slides for Round 2 (below) |
| 3 | Detailed financial model | 3-year projection, scenarios, sensitivities | Round 1 workbook done; Round 2 sheets (cohorts, hiring, 3-year P&L, cash) not built (finance chat) |
| 4 | Model and system report | 2-4 pages: validation metrics, cost per student, privacy design, known limitations | not started; numbers come from `technical/scripts/deck_numbers.py` |
| 5 | Curveball scenario | about 60 minutes to prepare, presented inside the pitch | drills listed in `TECH_PLAN.md` §21; 6 generator scenarios exist |
| 6 | Pitch + Q&A | 10 minutes pitch and demo, then 5-7 minutes Q&A | script and Q&A bank below |

## 2. Free-only rules (decided: no paid backend, no paid API)
| Need | Free choice | Watch-out |
|---|---|---|
| LLM | local models through Ollama (`qwen3:4b`, `gemma3:4b`), template fallback always on | no cloud LLM at demo time; models must be pulled before the event |
| Backend and database | FastAPI + PostgreSQL on the laptop (docker-compose, or native scripts) | **Docker is not installed on the build laptop**: install Docker Desktop (WSL2) or use the native fallback (`make demo-native`: Postgres via `pgserver`, `uvicorn`, `npm run dev`). Check Docker Desktop's licence terms for your use before relying on it |
| Hosting | none needed; the finale runs locally. Optional public demo link on free tiers (Vercel, Hugging Face Spaces, Neon) is a bonus, not a dependency | free tiers sleep (cold starts) and some have non-commercial terms: never depend on them on stage |
| Auth / OTP | seeded demo users with a role switcher | real SMS OTP costs money; described in the report as production design |
| WhatsApp | a "WhatsApp preview" of the parent report (mock) | the Business API is paid per message; keep it as a slide, not a feature |
| OMR | OpenCV on the laptop | needs real photo tests (your 20 printed sheets) |
| Charts, icons, fonts | ECharts (Apache-2.0), Lucide icons, Inter and Noto Sans Devanagari (OFL) | keep licence files in the repo |
| Slides, PDF | PowerPoint export; report as Markdown → PDF through the browser print dialog | embed fonts |
| Backup recording | OBS Studio (free) | record the whole demo on the same laptop |
| Mock-ups | HTML + screenshots (see `presentation/docs/MOCKUPS_PLAN.md`), Figma free | |

## 3. What still has to be built for the prototype (workstreams)
Gate order: **G0** wave-1 fixes (A2, E2) → **G1** models (B, C, F) → **G2** app skeleton → **G3** end-to-end flow → **G4** polish and rehearsal.
| Id | Workstream | Contents | Depends on | Acceptance (all free) |
|---|---|---|---|---|
| W1 | Backend API (agent G) | FastAPI per `contracts/openapi.yaml`: demo auth and roles, CSV/XLSX upload with the column mapper and row-error preview, recompute of a batch after an upload or edit, heatmap, support list, student profile, percentile range, report endpoint (uses the genai module), consent endpoints, flagged wrong keys + re-score, audit log | contracts, B, C, E | contract tests (schemathesis), tenant-isolation tests on every endpoint, 2,000-student file in < 30 s, recompute of one batch < 5 s |
| W2 | Frontend (agent H) | Next.js: login with role switcher, upload + mapping screen, teacher heatmap, mentor support list, student profile with range, parent mobile view (Hindi/English toggle), owner dashboard, consent screen, privacy-tier switch | W1 (mock server from OpenAPI first) | Playwright end-to-end run: upload → heatmap → list → report; works at 375 px; low-end Android emulation |
| W3 | OMR reader (agent K) | detect four corner marks, warp, read QR, read bubbles with a per-cell confidence, show uncertain cells for one-tap fix | A's synthetic OMR images, layouts; **your real photo set** | bubble accuracy ≥ 0.99 synthetic and ≥ 0.98 on real phone photos (report if lower); every uncertain cell flagged |
| W4 | What-if and judge-input handling | edit attendance, marks or a single answer key live and watch list, mastery and range update; input validation (attendance 140 %, negative fees) shows an error, not a crash | W1, W2 | a scripted "judge changes input" rehearsal passes 10 of 10 times |
| W5 | Study plan (optional P2) | rule engine: weakest topics × prerequisites, short explanation text from templates | B | only after W1-W4 are stable |
| W6 | DevOps (agent J) | compose file (db, api, web, ollama) **and** native fallback, seed script (seed 42, one institute loaded), `make demo` from a clean clone, health checks | W1, W2 | cold start to first screen < 3 min; works with the network cable unplugged |
| W7 | QA and chaos | golden messy-file tests, chaos script (stop Ollama, kill DB mid-upload, upload the same file twice, huge file), accessibility pass | all | `make chaos` green; report fallback appears within 1 s when the LLM is down |

## 4. Demo (4-5 minutes inside the 10-minute pitch)
Seed 42, one Patna-style institute, all local. Script (each step has a visible "proof" on screen):
1. Owner opens the dashboard (batches, support count).
2. Teacher uploads a **messy Excel** (use a file from `data/dirty/`); the mapper detects the header and shows 3 row errors; confirm.
3. Heatmap appears; point at a batch-wide weak column ("probably not taught yet").
4. Flagged question: probable wrong answer key → correct it → scores update.
5. Support list: top 8, reasons, actions. **Judge picks a student; we edit attendance live; the list re-ranks.**
6. Percentile range for that student; show the band and the disclaimer.
7. Generate the Hindi parent report; unplug Ollama; generate again: the template path still produces a checked report.
8. Privacy-tier switch: academic-only for minors; show the honest accuracy cost.
9. (If time) OMR photo → review screen → added.
Backups: a recorded run of the same flow (OBS), printed screenshots, and a second laptop or a USB copy of the repo and models.

## 5. Curveball runbook (about 60 minutes)
Start with the **first 10 minutes**: read the scenario, write the one-sentence change (regulatory, market or technical), decide which module absorbs it. Drills to rehearse (details in `TECH_PLAN.md` §21):
| Curveball | Where to act | Time |
|---|---|---|
| Behavioural monitoring of minors banned or tightened | privacy-tier switch + `routing_policy.yaml`; show the accuracy cost on public (OULAD) and synthetic data | 10 min |
| Institute has only total marks | marks-only path (subject-level mastery); generator scenario `marks_only` | 10 min |
| Dropout doubles or the share of sudden dropouts rises | generator scenarios `dropout_x2`, `sudden_heavy`; rerun early-warning evaluation; show the ceiling | 15 min |
| LLM banned or price rises | template-only mode; cost per student recomputed in the workbook | 5 min |
| No GPU / no internet | already local; native fallback | 5 min |
| New exam (CUET, Class 10 boards) | new `topics.yaml` and `exam_patterns.yaml`; IRT is exam-agnostic | 15 min |
| A parent says the prediction was wrong | show the band, coverage, disclaimer, human review; log feedback | 5 min |
| Judge's own OMR layout | template registry story + CSV path; manual grid calibration if built | 10 min |
Rehearse each at least twice with a timer. The deliverable inside the pitch is **one slide** (template in the Round 2 deck: "What changed → what we changed → what it costs → what we still do not know") and, where possible, a 60-second live change.

## 6. Round 2 deck (max 15 content slides)
Start from the 12 Round 1 slides and change:
- Replace mock-ups with **real screenshots** from the prototype (drop the "Illustrative mock-up" tag).
- Fill the PENDING numbers from `deck_numbers.py`; add a slide "What the judges told us in Round 1 and what we changed".
- Add "Live demo flow" (one slide, the 9 steps above), "Cost per student" (bottom-up cost table, free local run vs production assumptions) and "Curveball response" (blank template, filled on the day).
- Keep the limitations slide first-class.

## 7. Model and system report (2-4 pages, PDF)
1. **System** (½ page): architecture picture (M9), data flow, multi-tenancy, offline design, what is built vs designed.
2. **Validation** (1 page): table from `deck_numbers.py` with origin labels (synthetic / public / real photo), baselines at equal workload, confidence intervals, leakage tests, honest misses.
3. **Cost per student** (½ page): measured infra and AI cost of the local run (₹0 marginal), production cost model with sources, sensitivity (LLM price ×5, template-only).
4. **Privacy and well-being design** (1 page): consent flow, age- and purpose-aware routing table, DPDP and MoE clauses with our response, data-processor role, retention.
5. **Known limitations** (½ page): the list in `SLIDES_BRIEF.md` §5, updated.
Write it in Markdown (`technical/docs/MODEL_REPORT.md`) and export to PDF so every number stays traceable.

## 8. Pitch and Q&A
Pitch (10 min): problem 1:00 · solution + live demo 4:00 · technology and validation 2:00 · privacy and well-being 1:00 · business and moat 1:30 · limits and next step 0:30. Speak to one idea per slide; the demo carries the technical credibility.
Q&A bank (prepare 60-second honest answers; anchors in brackets):
1. Why should an owner pay ₹30? [finance README §3-5, tornado]
2. How do you know 25 % of dropouts can be prevented? [we do not; 6.6 % and why; RCT evidence]
3. Isn't dropout prediction "behavioural monitoring" of children? [routing policy, DPDP s.9(3), Fourth Schedule, academic-only for minors]
4. Your model barely beats a simple attendance rule. [FEASIBILITY_CHECK §6; calibration, reasons, routing; relative to the rule as practised]
5. You validated on your own synthetic data. [public validation, misspecification tests, pilot plan]
6. What happens with sudden dropouts? [about a quarter; unpredictable; we report the ceiling]
7. How is a percentile range honest? [conformal coverage, mapping assumption table, wording]
8. What if the LLM invents a number? [checker + template fallback + independent adversarial tests]
9. Hindi quality? [native reviewer pending; templates; checker limits]
10. What if the internet is down? [local-first, offline design, what is built vs designed]
11. How does one institute not see another's data? [row-level security tests on live PostgreSQL]
12. Who owns the data? [institute is the fiduciary, we are the processor; no pooling of raw child data]
13. How do you tag questions to topics at scale? [tagging pipeline (Agent F), human review queue, measured precision]
14. What about OMR on any sheet layout? [template registry, one-time onboarding, CSV path]
15. Can a coaching centre rely on the educational-institution exemption? [narrow; we do not rely on it for consent]
16. What if parents withdraw consent? [processing for that purpose stops, derived scores deleted]
17. Cost per student per month? [workbook COGS_Build + measured local run]
18. Why would churn not spike after the exam season? [finance: seasonal billing, post-exam non-renewal 20 % assumed]
19. What is your moat if competitors copy the features? [shared item bank, real outcome labels, intervention outcomes; limits]
20. What would you do in the first pilot? [2 institutes, one term, staggered start, pre-registered metrics]
Rehearse with a teammate playing a hostile judge; two people answer, so each knows every part of the system (PS rule: explain every part).

## 9. Risk list (finale day)
| Risk | Mitigation |
|---|---|
| Docker or Ollama not working on the demo laptop | native fallback script; models pulled and tested the day before; recording as backup |
| Judge brings an unusual OMR sheet | scripted answer (template registry, CSV path); do not promise live support for unseen layouts |
| Venue network down | fully local; no step needs internet |
| LLM slow | template path is the default for the demo unless the model answers in < 3 s |
| Judge enters absurd data | input validation returns an error message; tested in W4 |
| Hindi text looks wrong | bundled font; PDF export tested; native reviewer sign-off before the event |
| Team cannot explain a part | each module's `model_card.md` and `docs/agent_logs/*` read by at least two people |
| Round 1 feedback arrives late | keep the Round 2 deck as a delta on the Round 1 deck |

## 10. Order of work (until dates are known)
1. Run A2 and E2; then B, C, F (models). 2. Build W1 and W2 in parallel against the frozen OpenAPI (mock server first). 3. W3 OMR reader as soon as real photos exist. 4. W4, W6, W7. 5. Replace slide mock-ups with screenshots; fill PENDING numbers. 6. Three full rehearsals and the curveball drills.
**Ask the organisers (or check email) for:** the Round 1 deadline, the Round 2 date and venue, whether a projector/HDMI and power are provided, and whether the repository link must be public.
