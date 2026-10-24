# Tab 2 prompt: front end (copy everything below the line into the Tab 2 session)

---

## UPDATE 24 Oct (Tab 1 has delivered): real artifacts exist now
Read from `technical/ml/artifacts/<institute>/` where institute is `patna_jee`, `lucknow_neet`, `gaya_both` or `kota_large` (default `patna_jee`). Files: `mastery, risk, percentile, reports, owner, student, parent, datacard` (`.json`). Global: `metrics.json`, `models.json` (IRT and risk comparison tables), `moat.json`, `scaling.json`, `figures/*.png`. `samples/` is only a fallback. Known facts to handle in the UI:
- Each institute has about 40 demo students (ids in `student.json`, `parent.json`, `reports.json`); the heatmap covers up to 3 batches of 25 students and 25 topics. Use `student.json` to populate the student and parent pickers.
- `faculty_compare` is empty on purpose (faculty not in the data): show only the batch comparison and a short note from `faculty_note`. `datacard.cleaning.rate` is null: show the examples and the note, no percentage. `roi` has null rupee fields: show only the ratio range (0.35 / 0.55 / 1.7x) with its note and the assumption tag.
- `risk.json` lists can be long for Kota (about 130 rows, capacity sized): paginate or virtualise. `track: "full"` rows are 18+ only; show a small "adult, own consent" badge. Weights are model contribution values, so never display them as percentages or probabilities.
- `scaling.json` `stages` are objects (name, students, stack); `failure_modes` are `{case, response}`.
- `models.json` and `metrics.json` feed the "How it works" and Owner pages: show the honest comparison (model vs attendance rule) with the note that results are synthetic and a pilot settles real uplift. Do not hide weak numbers (academic-only AUC 0.67; ability recovery r about 0.53).
- Report bodies already contain the student name; show them as given. `hi_reviewed` is false: show a small "Hindi text pending native review" note on Hindi reports.
- Student `mastery_by_subject.trend` is share-correct in time chunks (0 to 1), `theta` is on the ability scale: label them separately.
Everything else below still applies; where it says "sample files", read these real files first.

---

You are the lead front-end engineer for **Pragati** (team AlphaQ), an AI platform for small JEE/NEET coaching institutes in India (Nextute x Finance Club IIT Patna, Case B "The Data Moat"). Build the front end for the offline final. Judges will click through it, so it must look polished, calm and trustworthy. You work in your own git worktree and branch `tab2-web`. You own **only `technical/web/`**. Do not edit `contracts/`, `financial/`, `ml/` or `docs/` (write questions in `technical/web/NOTES.md`).

## Read first (in order)
1. `CLAUDE.md` (repo root), then `technical/docs/FINAL_ROUND_PLAN.md` §3, §5 and `technical/docs/TAB1_ML_PLAN.md` §3 (the data interface).
2. Sample data in `technical/ml/artifacts/samples/` (`patna_jee/{mastery,risk,percentile,reports,owner,datacard,student,parent}.json`, `moat.json`, `scaling.json`). Tab 1 will replace these with real numbers **at the same paths**, so never hard-code values and never change field names. If you need a new field, add it in `NOTES.md` as a request; for now you may add optional fields only in your own mock layer.

## Stack and rules
Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + ECharts. No Streamlit/Gradio. Everything free and runs locally with `npm run dev`.
- **Thin mock API:** Next route handlers under `/api/mock/...` read the JSON files from `ml/artifacts/<institute>/` (fall back to `samples/` when missing) and return them unchanged. One typed client in `web/lib/api.ts`; one TypeScript type per file (`web/lib/types.ts`, mirroring the samples). Swapping to the FastAPI later must mean changing only the base URL.
- **Validate on load** with zod; show a friendly "data not available" card instead of crashing.
- **Origin tag:** every number shows a small chip from the file's `origin` (synthetic / public / model / assumption). Percentile and ROI always carry "assumption".
- **Well-being rules (hard requirements):** no leaderboards, no rank, never sort students by mastery or risk (sort by name or roll no.); no red for students or parents (use calm blue/teal/amber); `band: not_enough_data` and `enough_data: false` render as "Not enough data yet", never as a number; support list shows `reasons` and `supportive_action`, never a raw probability; minors are shown only on the `academic_support` track; counsellor route visible on student and parent pages.
- **Bilingual:** English/Hindi toggle on every screen using `*_en` / `*_hi` fields. Use Noto Sans Devanagari. Student/parent default to `language_pref` / `language`.
- **Responsive:** works at 375 px width (parent and student are phone-first); owner and teacher are desktop-first but must not break on tablet. Accessible contrast, keyboard focus, `prefers-reduced-motion`.
- **Look:** one calm design system (tokens in Tailwind config), generous spacing, soft cards, consistent ECharts theme, skeleton loaders, empty states, subtle transitions. Add a role switcher in the header (Owner / Teacher / Student / Parent) plus a demo-institute selector.

## Screens and what each role should *feel*
Demo order: Capture → Teacher → Student → Parent → Owner → Data card → How it works. Build the layout shell first, then one screen at a time; commit after each.

1. **Capture** (`/capture`): CSV drag-and-drop and an OMR photo upload box. Not a real pipeline: simulate a staged data-quality report (rows read, names cleaned, missing values, answer keys flagged) using `datacard.json` `cleaning` and `mastery.json` `wrong_key_flags`. Show a before/after of messy names.
2. **Teacher** (`/teacher`): topic-mastery heatmap (batch x topic, theta with uncertainty shown by opacity or hatching; untaught topics greyed), batch selector, topic detail drawer; "Support this week" list from `risk.json` sized to `capacity_per_week`, each row with reasons (en/hi) and supportive action plus a "mark done" local state; wrong-answer-key alert panel; comparison of model vs attendance rule from `baselines` shown honestly.
3. **Student** (`/student/[id]`, from `student.json`): friendly headline, streak and milestones (effort, never rank), subject mastery cards with trend sparklines, strengths, focus topics with estimated minutes, weekly study plan checklist, score trend line, predicted percentile **range** as a band with the assumption label, and a "talk to your counsellor" card. Tone: encouraging, phone-first.
4. **Parent** (`/parent/[id]`, from `parent.json` and `reports.json`): a **WhatsApp-style chat view** (phone frame) rendering `whatsapp_messages` with delivery ticks (sent / delivered / read), the monthly report as a message with a PDF chip, fee reminder and meeting invite messages. Beside it (stacked on mobile): monthly summary cards (attendance, tests, marks trend, strongest/focus topic, next fee due, "what you can do at home", next meeting), the verified-report badge ("8 checks passed"), notification preferences toggles (local state), consent status, FAQ. Language toggle Hindi/English. No comparison with other children.
5. **Owner** (`/owner`, from `owner.json`, `moat.json`): KPI row (students, retention, support-list coverage, ROI range), batch and faculty comparison as forest-style plots with confidence intervals and an "enough data" gate, retention by month and by reason, ROI card (low/base/high, assumption label), and the **data-moat card**: calibration error vs number of institutes chart with the explanation "only question difficulty is shared, never student data".
6. **Data card** (`/data-card`, from `datacard.json`): the synthetic-data story as a stepper, attribute table (searchable: attribute, source, decision, model, privacy class), realism checklist with confidence badges, figure gallery (images from `ml/artifacts/figures/`, placeholder if absent), cleaning examples, and a prominent "Limits" panel.
7. **How it works** (`/how-it-works`, from `scaling.json`): five pain points mapped to feature, model, view; architecture diagram (pilot, seed, scale), tenant isolation, offline-first, cost per student chart, failure modes list, and the well-being rules.

## Definition of done
- All seven screens work from the sample files, then from the real files with no code change (test by editing a value in a sample).
- `npm run build`, `npm run lint` and `tsc --noEmit` pass; no console errors; checked at 375, 768 and 1280 px; both languages.
- Playwright smoke test per screen (loads, shows origin chips, no ranking elements).
- `technical/web/README.md`: how to run, folder map, how to swap to the real API, data-to-screen table. `NOTES.md`: open questions and requested fields.

## DO NOT
Rank or sort students by performance; show raw risk probabilities to students or parents; use red labels for people; invent numbers (all numbers come from the JSON); call external services or paid APIs; edit anything outside `technical/web/`; add auth, a database or a real OMR pipeline.

Start by listing your plan in five lines, then build.
