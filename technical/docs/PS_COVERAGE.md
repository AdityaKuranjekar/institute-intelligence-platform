# Problem-statement coverage matrix (anti-diversion check, 2026-10-21)

Source: `Case_B_The_Data_Moat.pdf` (Sections 3, 4, 5, 9, 10, 11). Status: DONE = built and independently verified; WIP = agent or prompt exists; GAP = nothing assigned yet; MOCK = deliberately mocked or described only.
Rule for what to work on next: **only items that raise a PS criterion score or are a mandatory deliverable.** Everything else waits.

## A. Technology (70 %)
| PS question | Rubric box | Where we address it | Status | Next action |
|---|---|---|---|---|
| A1 Data capture (OMR, Excel, Forms, WhatsApp; low bandwidth/offline) | Architecture 25 % | CSV templates + header synonyms + 12 messy files with golden parses (Agent A); OMR layouts + 210 synthetic OMR images (Agent A) | **WIP: no ingestion code and no OMR reader yet.** Forms/WhatsApp = MOCK/slide; offline queue = P2 | Agent G (ingest mapper + OMR reader) in Wave 3; real-photo test set (your 20 printed sheets) |
| A2 Data model; tag questions to topics **at scale** | Architecture | `schema.sql` (31 tables, RLS), `topics.yaml` (380 bilingual nodes) | **GAP: the tagging pipeline had no agent** (bar `tagging_auto_accepted_precision` unmeasured) | `R1_F_tagging.md` written; you hand-label 150 questions |
| A3 Mastery (IRT/KT) + question difficulty | ML rigour 25 % | Agent B prompt; Agent D shows KT on ASSISTments | WIP (B waits for the A fix-up) | Run B after A2 |
| A4 Early warning (dropout, fall behind, fee), early enough | ML rigour | Agent C; honest baselines (CCR-009) | WIP. **A simple model beats the ranked rule by only 4-7 % at fixed workload** (FEASIBILITY §6) | Run C after A2; frame honestly |
| A5 Percentile range + honest uncertainty | ML rigour | Agent C (CQR + mapping envelope) | WIP | as above |
| A6 GenAI (study plans, parent reports, practice, doubts) | ML rigour | Agent E: verified bilingual parent reports with template fallback | Reports built; **verifier gaps found, fix in R1_E2**. Study plan / practice = P2; doubt answers = out of scope (state it) | Run E2 |
| A7 Multi-tenant, secure, low-cost; **₹/student/month** | Architecture | RLS (tested on live Postgres), compose design | WIP: backend not started; **cost-model notebook has no owner** | Backend agent in Wave 3; reuse `Financial_Model` inputs so tech and finance cost numbers match |
| A8 Privacy and safety (minors, consent, ownership, well-being) | Feasibility 20 % | Routing policy, consents, DPDP research, banned lexicon, no-rank rules | Design DONE; **`PRIVACY.md` and DPA template not written yet** | Write after Agent C; slide and report material |

## B. Business (30 %): owned by the finance chat
`Financial_Model/` has the live-formula Round 1 model. Inputs it needs from us: ₹/student/month (A7), lift evidence (Agent C, honest), moat evidence (Agent B's recovery-vs-n curve).

## Deliverables and rules
| Item | Requirement (PS) | Status |
|---|---|---|
| R1 deck | PDF, **max 12 content slides + title + appendix, 16:9**, file name `TeamName_Case_Round.pdf` | **NOT STARTED** (outline in TECH_PLAN §4.3). Deadline "to be announced": check email or ask the organisers |
| R1 financial model | Excel/Sheets, live formulas, at least 1 sensitivity | DONE (finance chat), see `Financial_Model/README.md` |
| R1 bonus notebook | GitHub/Colab link | WIP: notebooks 01, 06, 08 executed; 02-05, 07, 09, 10 pending |
| R2 prototype | CSV **or** OMR photo, then heatmap, at-risk list with reasons, percentile range, Hindi/English parent report; judges change inputs live; repo link submitted in advance | Pieces exist as libraries; **no web app yet** (Wave 3) |
| R2 model and system report | 2-4 pages: validation metrics, cost per student, privacy design, limitations | Not started; `scripts/deck_numbers.py` is its number source |
| **Rule 2: disclose AI use on the FINAL slide** | mandatory | **Must add** (see `docs/CITATIONS.md`); "you must be able to explain every part" means each teammate reads `docs/agent_logs/*` and the model cards |
| **Rule 3: cite public datasets and libraries** | mandatory | `docs/CITATIONS.md` added |
| Rule 3: no real personal data | mandatory | All data synthetic; OULAD and ASSISTments are public research data |
| FAQ: synthetic data size | "3+ institutes, 1,000+ students, a full academic year" | Ours: 4 institutes, 3,450 per year x 3 years once A2 is merged |

## Schema gaps vs the PS suggested schema (queued as CCR-011/012 for contracts v1.0.1)
- `responses.time_taken_sec` (the PS lists it in `test_responses`): add as a nullable column + generator output for online tests.
- **Outcomes table** (`student_outcomes`: dropout month, `actual_exam_percentile`, exam year, `entered_by`): the PS lists outcome labels, and it is the real-exam-label leg of our moat (TECH_PLAN §5). Today only synthetic truth files exist.
- Batch-faculty link (`batch_subject_teachers`): the PS says owners cannot measure which batches, faculty or teaching methods work; without the link we cannot show batch/faculty effectiveness. Optional (P2), but it strengthens the owner ROI story.

## What counts as diversion (do not start before the above is done)
Study-content generation, a mobile app, payroll or fee collection, live WhatsApp integration, regional languages beyond Hindi/English, DKT/SAKT training, a custom OMR engine for arbitrary layouts, marketplace features.
