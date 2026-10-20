# Research Prompts (run in Perplexity Pro / Gemini Deep Research)
Run R1–R5 now. They are ordered by what blocks building soonest. Paste each result back into the chat as-is.

Rules for every prompt: prefer primary or official sources. Give the URL and publication or update date for every claim. Mark anything unverified as **UNCERTAIN**. Do not fill gaps with guesses. The current date is October 2026.

---

## R1 — DPDP Act 2023 + DPDP Rules 2025: children's data in coaching (blocks: consent design, risk-model features)

```
You are a technology-law researcher. Today is October 2026. Using ONLY primary sources (the Digital Personal Data Protection Act, 2023 text on India Code / MeitY; the DPDP Rules, 2025 as notified in the Gazette; official MeitY FAQs/press releases; Data Protection Board notices) and, secondarily, analyses by major Indian law firms (Cyril Amarchand, AZB, Trilegal, Khaitan, IndusLaw) — answer:

1. Section 9 (children): exact text on (a) verifiable parental consent, (b) "tracking or behavioural monitoring of children", (c) "targeted advertising directed at children". Quote the clauses.
2. The DPDP Rules 2025 provisions implementing Section 9: rule numbers, the permitted methods of verifying parental consent (e.g., existing reliable identity details, DigiLocker/virtual tokens), and illustrations given.
3. The exemptions/classes of Data Fiduciaries or purposes exempted from Section 9(1)/(3) for children (Schedule/rule numbers). Specifically: are "educational institutions" exempt, how is "educational institution" defined, and is there any source stating whether PRIVATE COACHING CENTRES qualify? Quote exact wording of conditions (e.g., "restricted to tracking ... in the interests of safety of children" or "educational activities").
4. Whether predicting dropout/academic risk from attendance, test scores and fee payment would plausibly count as "behavioural monitoring" — cite any official guidance or expert commentary; clearly separate official text from opinion.
5. Data Fiduciary vs Data Processor obligations when a SaaS vendor processes data for an institute (contract requirement, security safeguards, breach notification timeline to Board and to Data Principals, erasure).
6. Notice requirements (content, languages — Eighth Schedule languages), consent manager framework, retention/erasure rules (any specified periods for educational/other classes).
7. Phased commencement timeline of the Rules (which provisions are in force as of Oct 2026, which come later, with dates).
8. Penalties (Schedule amounts) relevant to children's data and security breaches.
9. Cross-border transfer / data localisation rules relevant to hosting outside India.

OUTPUT FORMAT:
- Table A: Provision | Exact quote (≤40 words) | Section/Rule no. | Source URL | Date | In force? (Y/N + date)
- Table B: Our design question | Answer | Confidence (High/Med/Low) | Basis (official / law-firm opinion / inference)
  Design questions: (i) can a coaching centre use the educational-institution exemption? (ii) is risk scoring behavioural monitoring? (iii) which consent-verification method is cheapest & valid for a parent via phone/WhatsApp? (iv) must data be stored in India? (v) what must our DPA with institutes contain?
- List: UNCERTAIN items and what source would resolve them.
```

---

## R2 — Datasets and published baselines (blocks: NB06, question bank, topic tagging)

```
You are an educational data-mining researcher. Today is October 2026. Find and verify datasets and baseline results. Prefer official dataset pages, the original papers, Hugging Face dataset cards, and Papers with Code.

PART 1 — Validation datasets. For each of: OULAD (Open University Learning Analytics Dataset), ASSISTments (2009-2010 skill builder, 2012, 2017), EdNet (KT1), and any newer large public knowledge-tracing dataset released 2023-2026:
 - Official download URL, licence (exact name, commercial use allowed?), registration required?, size (students, interactions), key fields, whether it includes dropout/withdrawal labels (OULAD final_result = Withdrawn).
 - Best-known published baselines with exact numbers: (a) OULAD early-withdrawal prediction AUC/F1 at different course weeks (cite 3+ papers with the week used); (b) next-response prediction AUC for IRT/1PL, BKT, DKT, SAKT/AKT on ASSISTments2009 and EdNet (cite pykt benchmark or equivalent).

PART 2 — JEE/NEET question datasets (Hugging Face, Kaggle, GitHub, academic: e.g., JEEBench, any NEET/JEE Main question banks, Indian exam benchmark sets):
 - URL, licence, number of questions, subjects, whether chapter/topic labels exist, whether answer keys exist, language (EN/HI), question format (text/LaTeX/image), year range.
 - Whether official NTA past papers + answer keys are downloadable from nta.ac.in / jeemain.nta.nic.in / neet.nta.nic.in and their reuse terms.

PART 3 — Indian student data: explicitly state whether ANY public dataset exists with question-level responses, attendance, fee payment, or dropout for Indian coaching institutes or schools (e.g., UDISE+ is aggregate only). If none, say "NONE FOUND" and list the closest proxies.

OUTPUT FORMAT:
Table 1: Dataset | URL | Licence | Commercial OK? | Size | Fields relevant to us | Labels available | Notes
Table 2: Task | Dataset | Model | Metric | Value | Paper/benchmark | Year
Table 3: JEE/NEET question sources | URL | Licence | #Qs | Topic labels? | Answer keys? | Language
Final: Recommended picks for (a) dropout validation, (b) KT/IRT validation, (c) question bank — with one-line reason each.
```

---

## R3 — Free LLMs for bilingual Hindi/English reports, local on 8 GB VRAM (blocks: GenAI module)

```
You are an applied-NLP engineer. Today is October 2026. I need to generate short (100-180 word) parent reports in Hindi (Devanagari) and English from a JSON of facts, running LOCALLY on an NVIDIA RTX 4060 Laptop (8 GB VRAM) via Ollama or llama.cpp, fully offline, at zero cost. Also optionally CPU-only.

Find (prefer model cards on Hugging Face/Ollama library, official tech reports, and Indic benchmarks such as IndicGenBench, IndicXTREME, MILU, or newer 2025-2026 Hindi benchmarks; AI4Bharat and Sarvam AI publications):
1. The 6-8 best open-weight instruction models that fit in ≤5 GB VRAM when quantised (e.g., Q4_K_M), including Indian models (Sarvam, Krutrim, AI4Bharat, BharatGPT if open) and general ones (Gemma, Qwen, Llama, Phi, Mistral families — latest versions as of Oct 2026).
   For each: exact model name/tag on Ollama or HF GGUF, parameter count, quantised size, licence (commercial use? restrictions for minors' data?), documented Hindi capability or benchmark score, structured/JSON output support, reported tokens/sec on a ~8GB consumer GPU and on CPU if available.
2. Free cloud LLM API tiers usable for development (Google Gemini API free tier, Groq, OpenRouter free models, Hugging Face Inference, Sarvam API, others): rate limits, and CRUCIALLY whether free-tier inputs may be used for training/human review (quote the terms). State which are unacceptable for children's personal data.
3. Cheapest paid hosted options for production (per 1M input / output tokens in USD and INR) with good Hindi, for a cost-per-report calculation: assume 600 input + 300 output tokens per report.
4. Any open Hindi-English translation models (e.g., IndicTrans2) that run locally, size and licence — as an alternative pipeline (generate EN → translate to HI).

OUTPUT FORMAT:
Table A (local): Model | Ollama/HF tag | Params | Q4 size | Licence | Commercial OK | Hindi evidence (benchmark+score or "anecdotal") | JSON mode | tok/s GPU | tok/s CPU | Source URLs
Table B (free APIs): Provider | Free limits | Trains on inputs? (quote) | OK for minors' data? | URL
Table C (paid): Model | $/1M in | $/1M out | ₹ per report (600 in/300 out, state FX rate used) | Hindi quality evidence
Recommendation: top-2 local models to benchmark, with reasons. Flag UNCERTAIN items.
```

---

## R4 — Coaching reality + exam patterns + percentile mapping (blocks: synthetic generator calibration, band mapping)

```
You are a market researcher for Indian test-prep. Today is October 2026. I am building a realistic synthetic data generator for small/mid JEE & NEET coaching institutes in Tier-2/3 cities (Patna, Lucknow, Kota, Indore). Find facts with sources; prefer NTA official notices/information bulletins, government data, peer-reviewed or reputable surveys, and established news outlets; coaching-blog numbers must be marked as LOW confidence.

PART 1 — Exam patterns (official NTA information bulletins for the latest cycle):
 - JEE Main (Paper 1) and NEET-UG: number of questions per subject, sections, question types (MCQ single, numerical value), optional questions, marking scheme (+/−, including numerical questions), duration, number of options.
 - Bonus/dropped question handling by NTA.
PART 2 — Score → percentile:
 - Official NTA data or the most reliable published tables of marks vs percentile (JEE Main, by session) and marks vs All-India-Rank/percentile (NEET-UG) for the last 2-3 years; total candidates each year. Provide the table values (at least 10 points per curve).
PART 3 — Coaching operations (give ranges and source quality):
 - Typical batch sizes; students per small/mid institute; class 11 / 12 / dropper split.
 - Annual fees ranges in Tier-2/3 cities for offline JEE/NEET coaching, instalment structures (number of instalments, timing), share paying upfront.
 - Internal test frequency (weekly/fortnightly/monthly), test length, use of OMR sheets and in-house OMR scanners/software.
 - Typical attendance rates and attendance policies.
 - Dropout/attrition rates during the coaching year, when it peaks, top reported reasons (cite any study, survey, or credible reporting, incl. Kota studies).
 - Seasonal patterns (festivals, board exams) affecting attendance.
PART 4 — Student well-being context: credible data on student stress/suicides in coaching hubs and policy responses (for sensitivity, not for features).

OUTPUT FORMAT:
- Table per part: Parameter | Value/range | Source URL | Date | Confidence (High/Med/Low)
- PART 2 as CSV-ready tables: exam,year,session,marks,percentile (or rank)
- A final YAML block I can paste into generator_config.yaml, with each value followed by "# source: <URL> (confidence)".
```

---

## R5 — MoE coaching guidelines 2024 + state laws (blocks: privacy/well-being slide, product rules)

```
You are an Indian education-policy researcher. Today is October 2026. Using official sources (Ministry of Education guidelines PDF and letters to states, state gazettes/legislative assembly sites, PIB releases) and reputable news for adoption status:

1. "Guidelines for Registration and Regulation of Coaching Centre 2024" (Ministry of Education, January 2024): summarise provisions on registration, minimum age (16 / after secondary exam), misleading advertisements and claims about results/ranks, fee and refund rules, student well-being (counselling, mental-health support, ranking/segregation practices), infrastructure, and grievance redressal, with clause numbers and quotes (≤30 words each).
2. Adoption/enforcement status as of Oct 2026 in Bihar, Rajasthan, Uttar Pradesh, Madhya Pradesh: any state act or rules (e.g., Bihar Coaching Institute (Control and Regulation) Act 2010 and amendments; Rajasthan Coaching Centres (Control and Regulation) Act/Bill 2025; UP/MP rules), what they require about student data, results claims, segregation of students by performance, counselling, and penalties.
3. Any provisions that restrict publicly ranking students, segregating batches by performance, or disclosing performance — directly relevant to our "no public ranking" design.
4. Any rule requiring coaching centres to keep records of students (attendance, fees, counselling) that our software could help them comply with (compliance-as-a-feature).

OUTPUT FORMAT:
Table A: Provision | Quote | Clause | Source URL | Date
Table B: State | Law/rules name | Status (in force/bill/none) | Data/well-being/advertising provisions | Penalties | Source
Table C: Product implication | Required / Recommended | Basis
Flag UNCERTAIN items.
```

---

## Follow-ups after R1–R5 (short; run these next)

### R4b — NEET 2026 pattern + MoE guideline primary text (BLOCKS contracts)
```
Today is October 2026. Use ONLY primary sources: the NEET-UG 2026 Information Bulletin on neet.nta.nic.in / nta.ac.in, NTA public notices, and the Ministry of Education "Guidelines for Registration and Regulation of Coaching Centre 2024" PDF (education.gov.in or dohe-education.gov.in), plus the Rajasthan Coaching Centres (Control and Regulation) Act 2025 gazette text.
1. NEET-UG 2026: number of questions per subject, whether Section B / optional questions exist, total questions to attempt, maximum marks, duration in minutes, marking scheme. Also state what changed in NEET-UG 2025 vs 2024. Quote the bulletin and give page numbers.
2. MoE 2024 guidelines: quote the exact clauses (with clause numbers) on (a) confidentiality of assessment results / not making them public, (b) segregation of batches by performance, (c) fee instalments, (d) refunds, (e) counselling, (f) weekly off and tests after the off day.
3. Rajasthan Act 2025: quote the clauses on fee instalments (is "four instalments" there?), records to be maintained, batch size publication, segregation by performance, penalties.
OUTPUT: Table: Item | Exact quote | Clause/page | URL | Date. Mark anything not found in a primary document as NOT FOUND (do not substitute secondary sources).
```

### R1b — DPDP definitions check
```
Today is October 2026. From the DPDP Rules 2025 as published in the Gazette of India (meity.gov.in / egazette.gov.in) only:
1. Quote the exact definition of "educational institution" (First Schedule or rule definitions) and the full Fourth Schedule Part A item for educational institutions, and Part B purposes.
2. Quote Rule 10 in full including both illustrations.
3. Quote the Rule 6 log-retention clause and the Rule 7 breach timelines.
4. List any MeitY FAQ / clarification issued 2025–2026 on "behavioural monitoring", EdTech, or coaching centres; quote it. If none exists, say NONE FOUND.
5. Name 2–3 law-firm or academic articles that specifically discuss coaching centres/EdTech under the Fourth Schedule, with author, date, URL, and their conclusion in one line.
OUTPUT: quotes table (Rule | Quote | URL) + one-paragraph answer to "Can a private JEE/NEET coaching centre rely on the educational-institution exemption?" separating text from opinion.
```

### R2b — Exact baseline numbers
```
Get exact numbers from primary papers/tables only:
1. pyKT benchmark (Liu et al., NeurIPS 2022 Datasets & Benchmarks, "pyKT: A Python Library to Benchmark Deep Learning based Knowledge Tracing Models"): AUC and accuracy for DKT, SAKT, AKT, and any IRT/1PL-like or BKT baseline on ASSISTments2009 and EdNet — copy Table values, state the evaluation setting (question-level vs concept-level, window).
2. Verify existence (title, authors, journal, DOI) of 2025–2026 papers reporting OULAD early-withdrawal AUC at day 14 / day 28–30 (e.g., PLOS ONE "Calibrated early-warning models…", IJET "Explainable Early Warning System…"), and copy their AUC/F1 with the exact protocol (features, split, cut-off day).
3. Classic OULAD early-withdrawal baselines (2018–2023, well-cited) with AUC by week.
OUTPUT: Table: Paper | DOI/URL | Dataset | Model | Protocol | Metric | Value.
```

---

## Queued (run after R1–R5)
- **R6 Competitors**: Classplus, Teachmint, Testbook/Edzy-for-institutes, Addmen OMR, OMR Home, Shiksha-type ERPs: features (OMR, topic analytics, risk alerts, parent reports, Hindi), prices from pricing pages, target size. Table + gaps we fill.
- **R7 OMR open source**: OMRChecker and others: licence (GPL?), accuracy claims, template format, mobile-photo robustness.
- **R8 Production hosting (India region)**: cheapest VPS/managed Postgres/object storage in Mumbai/Hyderabad (Hetzner unavailable? DigitalOcean BLR, AWS Lightsail Mumbai, E2E Networks, Neon/Supabase regions) with ₹/month.
- **R9 WhatsApp Business Platform India**: per-message prices for utility vs marketing templates (current model), opt-in rules, messaging minors' parents.
- **R10 Evidence for early-warning systems**: effect sizes of EWS + intervention on dropout (randomised or quasi-experimental), ideally India.
