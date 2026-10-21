# R4 + R5 — Intervention effectiveness & Indian SMB SaaS benchmarks

Researched 2026-10-20 (web, WebSearch/WebFetch). Every number has a source URL. Anything not found says "not found".
Freshness flags: [OLD-EFFECT] means an effect study from before 2018. [OLD-SAAS] means SaaS or salary data from before 2023.
Confidence: H = primary source read directly (paper, official report or PDF table). M = official summary page or abstract, or a reputable secondary source quoting the primary. L = vendor blog, press, or unverified.

---

## R4 — Intervention effectiveness

### R4.1 Evidence table

Relative % = (control rate − treatment rate) / control rate for the "bad" outcome (dropout, withdrawal, non-retention, failure). I computed it where the source gives only rates.

| # | Study | Context | Intervention | Outcome | Effect (pp; relative %) | Control baseline | Sample | Design | Relevance to Indian coaching | Conf. | URL | Year |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **EWIMS**, REL Midwest (Faria et al.) | US high schools, grades 9–10 | Early-warning indicator tool plus a 7-step team process (identify, intervene, monitor). Implementation was "low" in nearly all schools | Chronic absence (≥10% of time missed) | −4 pp; **−29%** | 14% | 73 schools, 37,671 students | School-level RCT | M (closest to our product: flag + team action) | H | https://ies.ed.gov/use-work/resource-library/report/impact-study/getting-students-track-graduation-impacts-early-warning-intervention-and-monitoring-system-after-one | 2017 [OLD-EFFECT, borderline] |
| 1b | EWIMS (same) | same | same | Failing ≥1 course | −5 pp; **−19%** | 26% | same | RCT | M | H | same | 2017 |
| 1c | EWIMS (same) | same | same | Credits off-track (graduation proxy); low GPA | 0 pp (14% vs 14%); −2 pp, n.s. (17% vs 19%) | 14%; 19% | same | RCT | M | H | same | 2017 |
| 2 | **Diplomas Now** (MDRC interim) | US middle and high schools, grades 6 and 9 | Whole-school model with early-warning indicators, City Year tutors and case managers | Share of students with no EWI flags | "positive and statistically significant" in grade 6. **No significant impact** on attendance, discipline or course passing | not found (in the full PDF only) | 62 schools (32 T / 30 C) | School-level RCT | L–M | M | https://www.mdrc.org/work/publications/addressing-early-warning-indicators | 2016 [OLD-EFFECT] |
| 3 | **MAAPS** (Georgia State-led GPS-style advising), Ithaka S+R 6-year | 11 US universities, low-income or first-generation students | Analytics risk monitoring, proactive advising, degree planners | 6-year graduation | Aggregate: **0.0 pp** (70% vs 70%, p = 0.692). Georgia State alone: +7 pp (61% to 68%, p = 0.018), so non-graduation **−18%** | 70% aggregate; 61% at GSU | 10,037 analysed (GSU 964) | RCT | M (shows site execution decides the result) | H | https://sr.ithaka.org/publications/maaps-advising-experiment-evaluation-6-years | 2023 |
| 4 | **InsideTrack coaching** (Bettinger & Baker) | 8 US colleges | Third-party phone coaching | Still enrolled | 6 months: +5.2 pp (control 58%), non-retention **−12%**. 18 months: 32.9% vs 28.6% (+4.3 pp), non-retention **−6%** | 58% (6 mo); 28.6% (18 mo) | 13,555 | RCT | M | M (J-PAL summary) | https://www.povertyactionlab.org/node/2029 | 2014 [OLD-EFFECT] |
| 5 | **Summer-melt texting** (Castleman & Page, JEBO 115) | US high-school graduates intending to enrol in college | About 10 automated texts with task reminders | College enrolment | +7.1 pp at the uAspire sites. Effects varied by site | not found | 3 sites (Dallas, Philadelphia, Boston) | RCT | L–M (an enrolment nudge, not dropout) | M (secondary) | https://www.uaspire.org/news-events/text-messages-can-increase-enrollment-of-low-income-students | 2015 [OLD-EFFECT] |
| 5b | Summer melt replication (US OES/GSA with uAspire) | 5 US cities | Texts | Fall enrolment | +3.1 pp (68.0% vs 64.9%). Non-enrolment **−9%** | 64.9% enrolled | 4,882 | RCT | L–M | M | https://oes.gsa.gov/assets/abstracts/1515-Summer-Melt.pdf | ~2015 [OLD-EFFECT] |
| 6 | **Purdue Course Signals** | US university | Traffic-light risk flags with instructor emails | Retention / 6-year graduation | Claimed +21.48% graduation. **Discredited**: the effect "disappeared" once course load was controlled for (reverse causality) | n/a | n/a | Observational | Cautionary example only | M (critique primary) | https://eliterate.us/purdue-course-signals-data-issue-explainer/ ; http://hapgood.us/2013/09/26/why-the-course-signals-math-does-not-add-up/ | 2013 [OLD-EFFECT] |
| 7 | **Open University SPM predictive model + Student Support Team outreach** (Herodotou et al., JLA 7(2)) | UK distance-learning undergraduates **flagged** at 31–40% predicted completion | Text to 100%, call attempted to 98.6% (successful for only ~43%), email to 56.7%. Mostly delivered before the course started | Withdrawn by the 100% fee-liability point; course completion | Withdrawal 34.3% to 22.4% = −11.9 pp, **−35%**. Non-completion 54.1% to 43.9% = −10.2 pp, **−19%** | 34.3% withdrawn; 54.1% did not complete | 630 (318 / 312) | RCT | **H** (flag, then human outreach to at-risk students: the same mechanism as ours) | H (table read from the PDF) | https://gala.gre.ac.uk/id/eprint/31014/7/31014%20GILMOUR_Learning_Analytics_and_Motivational_Interventions_%28OA%29_2020.pdf | 2020 |
| 7b | OU Analyse (OU institutional) | Open University, at scale | Weekly ML risk score shared with tutors | Retention and performance | "found to improve student retention and performance". **No effect size published** in what I could access | not found | not found | Institutional claim | M | L | https://analyse.kmi.open.ac.uk/ | n/a |
| 7c | Inkelaar & Simpson (cited inside #7) | Distance learning | Motivational emails every 2 weeks | Retention | +2.3 pp (as cited by Herodotou 2020) | not found | not found | RCT (secondary citation) | M | L | (cited in #7 PDF) | 2015 [OLD-EFFECT] |
| 8 | **Parent alerts** (Bergman & Chan, JHR 56(1)) | US middle and high schools, West Virginia | Weekly automated texts to parents about missed assignments, grades and absences | Course failures; class attendance; retention (still taking courses next term) | Failures **−27%** (published). Attendance +12%. Non-retention 3.0% to 1.5% = −1.5 pp, **−50%**. Below-median-GPA students: retention +3 pp | ~1 failed course; 3% not retained | ~1,137 families, 22 schools | RCT | **H** (parent reports are a core feature of our product). Note the tiny base and one-term horizon | H (JHR abstract plus the 2019 working-paper text) | https://jhr.uwpress.org/content/56/1/125 | 2021 |
| 9 | **Papás al Día** (Berlinski, Busso, Dinkelman & Martínez, JHR) | Chile, 7 low-income schools | Weekly and monthly SMS to parents on attendance, grades and behaviour | Meeting the attendance bar for grade promotion; math GPA | +4.5 pp; +0.08 SD math GPA. Effects were larger for students at higher risk of dropout | not found | ~1,000 children | RCT | H (low-income setting, SMS to parents) | M | https://www.povertyactionlab.org/print/pdf/node/2063 (J-PAL); https://jhr.uwpress.org/node/15273 | 2025 (trial 2014–15) |
| 10 | **Room to Read life skills and mentoring** (J-PAL South Asia) | **India** (Ajmer, Rajasthan), girls in grades 6–7 | Life-skills curriculum plus bi-monthly small-group mentoring by local women | Dropout after grade 7 | −4 pp; **−30%** | 13.2% | 2,459 girls, 119 schools | Cluster RCT | **H** (India, Rajasthan, mentoring) | H (J-PAL page) | https://www.povertyactionlab.org/node/6125428 | 2016–19 |
| 11 | **Samata** (Karnataka) | **India**, SC/ST girls from grade 7 to the end of secondary | Multi-component programme (community, school, scholarships) | Did not complete secondary | **0 pp** (24.9% control vs 25.4% treatment; null). One district positive (AOR 1.54) | 24.9% | 80 villages | Cluster RCT | M (India, but a different population) | H | https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6684866/ | 2019 |
| 12 | **Mindspark** (Muralidharan, Singh & Ganimian, AER) | **India**, Delhi, after-school centres | Adaptive learning software | Test scores (not dropout) | About +0.6 SD math and +0.39 SD Hindi for 90 days' attendance | n/a | 619 | RCT (lottery) | M (supports the "academic support" lever, not retention) | M (secondary summary) | https://www.socialscienceregistry.org/trials/2459 | 2019 |
| 13 | **Nudges at scale** (Oreopoulos & Petronijevic, NBER w26059) | 3 Canadian campuses | Online and text coaching and nudges | Grades and persistence | **No discernible impact** on grades or persistence, including high-risk students | not found | ~25,000 | RCT | M (a warning that light-touch nudges alone fail) | M | https://www.nber.org/papers/w26059 | 2019 |
| 14 | **Dropout-prevention meta-analysis** (Wilson et al., Campbell; Tanner-Smith & Wilson) | Mostly US school programmes | Mixed (mentoring, academic support, counselling) | Dropout | OR 1.72 across all 152 studies; **OR 1.34 in the RCT subset** | n/a | 317 samples | Meta-analysis | M | M (secondary summary of the meta-analysis) | https://crimesolutions.ojp.gov/ratedpractices/41 ; doi 10.4073/csr.2011.8 | 2011 / 2013 [OLD-EFFECT] |
| 15 | **Kota offline-batch dropout** (context, not an effect) | India, JEE/NEET coaching | n/a | Mid-course dropout | "around 20%" offline vs 60–70% online (no source given by the article). Full text could not be verified (HTTP 403) | n/a | n/a | Press | H (base rate for our segment) | L | https://yourstory.com/2026/05/kota-coaching-crisis-education-capital-rebuild-student-mental-health | 2026 |

Not found: any RCT or quasi-experiment on early warning or outreach in **Indian private JEE/NEET coaching**. No J-PAL, Pratham or CSF study measures coaching-centre dropout. Pratham (TaRL) measures learning, not retention. I did not find a Pratham study with a dropout effect size.

### R4.2 Deriving "relative reduction in dropout among flagged students who receive an intervention"

**Step 1. Convert each dropout-type RCT to a relative reduction (RR).** I used the most conservative dropout-like outcome per study and counted each study once.

| Study | Calculation | RR |
|---|---|---|
| OU SPM outreach (#7), non-completion | (54.1 − 43.9) / 54.1 | 18.9% (withdrawal outcome: 34.7%) |
| Bergman parent alerts (#8), non-retention | (3.0 − 1.5) / 3.0 | 50.0% (tiny base, 1 term) |
| Room to Read, India (#10) | 4 / 13.2 | 30.3% |
| InsideTrack (#4), 18-month non-retention | (71.4 − 67.1) / 71.4 | 6.0% |
| MAAPS aggregate (#3) | 0 / 30 | 0% |
| Samata, India (#11) | (24.9 − 25.4) / 24.9 = −2%, floored at 0 | 0% |
| Oreopoulos nudges (#13) | null | 0% |
| Meta-analysis, RCT subset (#14), OR 1.34 at a 20% baseline | odds 0.25 / 1.34 = 0.1866, so p = 0.1866 / 1.1866 = 15.7%, and (20 − 15.7) / 20 | 21.4% |

The Georgia State +7 pp result (RR 17.9%) is a subset of MAAPS, so I excluded it to avoid double counting. Applying OR 1.34 assumes it means 1.34× the odds of *not* dropping out. That is the direction of benefit the review reports.

**Step 2. Summarise.** Sorted RRs: 0, 0, 0, 6.0, 18.9, 21.4, 30.3, 50.0.
- Median = (6.0 + 18.9) / 2 = **12.5%**.
- Mean = 126.6 / 8 = **15.8%**.
- Positive RCTs only (excluding the nulls): median of {6.0, 18.9, 21.4, 30.3, 50.0} = **21.4%**.
- Interquartile range ≈ 0% to 25.9% (Q3 = (21.4 + 30.3) / 2).

**Step 3. Adjust for implementation.** All positive effects are intention-to-treat. They already include imperfect delivery: only about 43% of OU phone calls connected, and EWIMS implementation was "low". So no extra discount is needed if our input means "of flagged students *assigned* to outreach". If the model applies the rate only to students who actually received a successful mentor contact (treatment-on-treated), scaling by about 1/0.43 is mathematically possible but **not recommended**, because nothing in the evidence supports a TOT estimate for our setting.

**Step 4. Recommended range.** Relative reduction in dropout among flagged students assigned to mentor or parent outreach:
- **Bear 5%.** About the 25th percentile including nulls (InsideTrack long run, MAAPS, Samata).
- **Base 15%.** The mean of all eight (15.8%), rounded down.
- **Bull 30%.** Between the India Room to Read result (30.3%) and the OU withdrawal outcome (34.7%).

Translation for slides: "If 100 flagged students would otherwise drop out, institute follow-up keeps roughly 5–30 (base 15)." Present this as **an assumption borrowed from RCTs in other settings**, not as our measured effect. Do not cite Course Signals as evidence.

---

## R5 — Indian SMB SaaS benchmarks and salaries

### R5(a) SaaS go-to-market benchmarks

| Metric | Low | Median | High | Segment | Source | Year | Note / Conf. |
|---|---|---|---|---|---|---|---|
| Monthly customer (logo) churn | 2.2% (ARPA > $500/mo) | **6.1%** (ARPA < $25/mo) | 6–7% (ARPA < $10) | Global SaaS, ChartMogul dataset | https://chartmogul.com/blog/good-customer-churn-rate/ | 2022 [OLD-SAAS] | Global, labelled. Our ARPA (~$15–40/mo) falls in the < $25–$50 bands. Conf. M |
| Monthly churn, India SMB SaaS | 3% | — | 5% | India SMB SaaS | eChai glossary: "~3-5% monthly is common but painful" https://echai.ventures/startingup/unit-economics/what-is-churn-and-how-much-churn-is-too-much | n/a | Commentary. Conf. L |
| Annual churn, India SMB SaaS | 15% | — | 25% (30%+ first-year cohorts) | India SMB SaaS | https://www.efinancialmodels.com/?p=653269 | ~2025 | No method given. Conf. L |
| Gross revenue retention (annual) | — | **90%** | — | Private B2B SaaS with ACV < $12K, >$1M ARR, >1,000 respondents | https://www.saas-capital.com/wp-content/uploads/2025/09/RB32WS1-2025-B2B-SaaS-Retention-Benchmarks.pdf | 2025 | Global. About 0.9%/month revenue churn. Survivor bias: excludes companies under $1M ARR. Conf. H |
| Net revenue retention (annual) | 90% (p25) | **98%** | 106% (p75) | Same, ACV < $12K | same | 2025 | Conf. H |
| CAC per customer | $80 | — | $250 | India SMB SaaS | https://www.efinancialmodels.com/?p=653269 | ~2025 | Conf. L |
| CAC per customer | ₹1.2L | — | ₹2.5L | India B2B SaaS at ₹10–30 Cr ARR (mid-market, not SMB) | https://upgrowth.in/cac-benchmarks-indian-b2b-saas-arr-band-2026/ | 2026 | Agency client data. Conf. L |
| CAC payback | 14 mo | — | 20 mo | India B2B SaaS at ₹10–30 Cr ARR | same | 2026 | Conf. L |
| CAC payback | 18 mo | — | 36 mo | India SMB SaaS | efinancialmodels (above) | ~2025 | Conf. L |
| CAC payback target | — | < 12 mo (SMB) | — | Global (Bessemer guideline, secondary) | https://stealthagents.com/research/startup-cac-payback-period-benchmarks-2026 | 2026 | Attribution to Bessemer unverified. Conf. L |
| ACV | $200 | — | $800 | India SMB SaaS | efinancialmodels (above) | ~2025 | Conf. L |
| Price, coaching-institute SaaS (Classplus) | ₹19,999/yr | — | ₹31,999/yr (+GST) | India coaching apps | https://www.capterra.in/software/1107960/Coachplus | ~2025 | Listing site. Older Inc42 report: ₹13k–50k plus 15% commission. Conf. M |
| Price, MyClassCampus | ₹15,000/yr | — | ₹45,000/yr | India coaching ERP | https://codingclave.com/blog/best-lms-software-india-2026 | 2026 | Blog. Conf. L |
| Deals closed per rep per month | 10–15 ($5–25K ACV) | — | 20–50 ($0.5–2K ACV) | Global SaaS rep, mostly inside sales | https://www.saastr.com/dear-saastr-how-many-deals-can-a-sales-rep-close-per-month | ~2022 [OLD-SAAS] | Not field sales. Conf. M |
| Sales cycle | 14 days | ~25–40 days | 40 days | SMB SaaS, ACV < $5–10K | https://www.growthspreeofficial.com/blogs/b2b-saas-sales-cycle-length-benchmarks-2026-by-acv-vertical ; https://prospeo.io/s/sales-cycle-saas | 2026 | Vendor blogs. Conf. L |
| SMB win rate | 28% | 31% | 35% | B2B SaaS, < $10K deals, "939 companies" | prospeo.io (above), citing an Optifai study | 2026 | Conf. L |
| Trial-to-paid conversion | 8% (median, 200 products) | 18.2% (opt-in) | 48.8% (opt-out, card required) | Global B2B SaaS | https://userpilot.com/blog/free-trial-conversion-rate/ | 2026 | A sales-assisted pilot benchmark was **not found**. Conf. L–M |
| Accounts per CSM (SMB) | 100 | — | 250 | Global SaaS (Gainsight survey) | https://tomtunguz.com/how-much-arr-can-a-csm-manage/ | 2016 data, 2019 post [OLD-SAAS] | Conf. M |
| ARR per CSM | — | $1.4M (p75 $4.2M) | — | 17,034 US CSMs (Gainsight) | https://www.gainsight.com/blog/gainsight-horizon-ai-labs-what-is-the-right-csm-to-customer-ratio/ | ~2024 | Useless at our ACV (it would imply thousands of accounts). Conf. M |
| Classplus revenue from operations | — | ₹213 Cr consolidated; core SaaS platform ₹73.9 Cr | — | India creator/coaching SaaS | https://entrackr.com/2024/10/classplus-revenue-spikes-2x-to-rs-260-cr-in-fy24-cuts-losses-by-57 ; https://inc42.com/features/from-enabler-to-aggregator-classplus-flips-its-edtech-playbook/ | FY24 | Older "100,000+ educators" count is stale. Revenue per institute **not derivable**. Conf. H (RoC via Entrackr) |
| Teachmint revenue from operations | ₹17.1 Cr (FY24) | — | ₹74 Cr (FY25) | India school/institute SaaS + hardware | https://entrackr.com/fintrackr/teachmints-revenue-jumps-43x-in-fy25-10550884 ; https://inc42.com/buzz/teachmint-cuts-fy24-loss-to-inr-110-cr-revenue-soars-111/ | FY24–25 | Institute count not found. FY24 loss ₹110 Cr. Conf. H |

Not found: SaaSBoomi or Bessemer India **numeric** SMB benchmarks for CAC, churn or payback (only landing pages surfaced). Founder-disclosed churn or CAC for Vyapar, Khatabook, MyGate, Zoho or LeadSquared. KeyBanc/OpenView SMB tables (not retrieved).

### R5(b) Salaries (monthly CTC unless stated; ₹)

| Role | Low | Median | High | Segment / city | Source | Year | Note / Conf. |
|---|---|---|---|---|---|---|---|
| Field sales executive | ~₹9.2k (₹110k/yr p25) | **~₹20k** (₹239,447/yr avg base) | ~₹23k (₹275k/yr p75) | Patna | https://www.payscale.com/research/IN/Job=Field_Sales_Executive/Salary/603d459b/Patna | 2026 | Modelled. Conf. M |
| Field executive | — | ~₹18.2k (₹218,889/yr) | — | Patna | https://in.indeed.com/candidates/hire-field-executives-in-patna-bihar | 2026 | Conf. M |
| Field sales (posting) | ₹18k fixed | — | ₹25k fixed | Ambala, Bahadurgarh (PhonePe) | https://apna.co/job/ambala/field-sales-executive-969043877 ; https://apna.co/job/bahadurgarh/field-sales-executive-677926289 | ~2025 | Plus ₹4,000–4,500/mo fuel. Own two-wheeler required. Conf. M |
| BDE, edtech | ~₹17.5k (₹2.1L/yr) | — | ~₹27.5k (₹3.3L/yr); EduStation up to ₹4.5L/yr | India edtech | https://www.ambitionbox.com/salaries/edutech-salaries/business-development-executive | ~2025 | n = 6. Conf. L |
| Inside sales rep | — | ~₹26.7k (₹320k/yr) | ₹35k (₹420k/yr) | Lucknow | https://www.payscale.com/research/IN/Job=Inside_Sales_Representative/Salary/b9293291/Lucknow | 2026 | Conf. M |
| Inside sales executive (posting) | ₹15k | — | ₹25k | Indore, 1–2 yrs | https://www.teamlease.com/jobs/inside-sales-executive-recruitment-in-indore-416602 | 2023 | Conf. L |
| Sales executive | ~₹17k (₹204k/yr p25) | ~₹25k (₹300k/yr) | ~₹34k (₹411k/yr p75) | Indore | https://www.payscale.com/research/IN/Job=Sales_Executive/Salary/73f32bfd/Indore | 2026 | Conf. M |
| Customer success manager | ~₹53.5k (₹642k/yr p25) | ~₹58k (₹695k/yr avg) | ~₹81k (₹975k/yr p75) | Jaipur | https://www.payscale.com/research/IN/Job=Customer_Success_Manager/Salary/86d1b2dc/Jaipur | 2026 | Manager-level. The page has data glitches. Conf. L–M |
| Customer success (remote, Tier-2/3) | — | ₹33–42k (₹4–5L/yr) | — | Tier-2/3 India | https://frontlinesmedia.in/customer-success-salary-guide/ | 2026 | Conf. L |
| Onboarding / CS executive, Patna, Lucknow, Indore | not found | not found | not found | — | — | — | — |
| Junior full-stack developer | ₹10k (₹1.2L/yr, India fresher floor) | ~₹50k (₹6L/yr, Jaipur 1–3 yrs, single entry) | ~₹67k (₹8L/yr, Indore 1–3 yrs) | Jaipur, Indore | https://www.ambitionbox.com/profile/full-stack-software-developer-salary ; https://www.glassdoor.co.in/Salaries/full-stack-developer-salary-SRCH_IM1090_KO0,20_P3.htm | 2025–26 | Thin samples. Conf. L–M |
| ML engineer (0–3 yrs) | ~₹42k (₹5L/yr, 0–1 yr) | — | ~₹1.25L (₹15L/yr, 1–3 yrs) | India (Glassdoor via Coursera) | https://www.coursera.org/in/articles/machine-learning-engineer-salary | undated | No Tier-2 city figure found. AmbitionBox India range: ₹3.5–25L for 1–6 yrs (7.6k salaries, Jul 2025). Conf. L–M |
| Field-sales fuel / conveyance | ₹4,000/mo | — | ₹4,500/mo | Field sales postings | apna.co postings above | ~2025 | Per-km rate **not found**. Conf. M |

---

## Conflicts & gaps

1. **No Indian coaching-specific intervention evidence.** The effect transfers from US, UK and Chile settings plus Indian girls' schooling (Room to Read). Two Indian RCTs disagree: Room to Read −30%, Samata null.
2. **Light-touch vs. human outreach.** Pure nudges are null at scale (Oreopoulos; aggregate MAAPS). Positive effects come with human contact (OU calls, mentoring) or parent information (Bergman, Chile). Our product needs mentors or parents to act. The software alone should not claim the effect.
3. **Bergman figures differ by version**: 38% (2017 draft), 28% (2019 working paper), 27% (published 2021). Use 27%. The retention gain is on a 3% base over one term, so it is too small to extrapolate.
4. **OU 2020 Table 5 column labels look swapped** relative to the abstract: the "Control" column total is 318, while the abstract says control n = 312. The direction of the effect is unambiguous from the text ("intervention group … 22.2% more at completion"). Counts are student-module registrations.
5. **InsideTrack**: the J-PAL summary gives 58% control retention at 6 months but 28.6% at 18 months. The steep drop is unexplained in the summary, so the original paper should be checked.
6. **EWIMS** improved proxies (absence, failures) but not credits or graduation. Diplomas Now showed no impact on attendance or course passing.
7. **Course Signals** claims are confounded. Do not use them.
8. **Kota dropout ~20% (offline)** has no source in the article, and I could not read the article (403). The R1/R3 base rate needs a better source.
9. **SaaS benchmarks**: India-specific numbers are mostly vendor or agency blogs (L). The only H-confidence retention data is SaaS Capital 2025, which is global and excludes companies under $1M ARR. ChartMogul churn bands are from 2022 [OLD-SAAS].
10. **Not found**: pilot-to-paid conversion for sales-assisted B2B pilots, post-exam or seasonal churn for coaching software, institute counts for Teachmint or Classplus, revenue per institute, Tier-2 onboarding-executive salaries, per-km travel allowance, and numeric SaaSBoomi or Bessemer India SMB benchmarks.
11. Salary data for Patna, Lucknow, Indore and Jaipur is thin. AmbitionBox city pages returned 403, so I relied on Payscale and Indeed modelled values and individual postings.

---

## Recommended model inputs

Bear = worst for our business. "Derived" = arithmetic on sourced numbers (shown). "ASSUMPTION" = no source found; it must be validated in pilot interviews.

| Input | Bear | Base | Bull | Unit | Source(s) / derivation |
|---|---|---|---|---|---|
| Intervention success: relative dropout reduction among flagged students assigned to outreach | 5% | 15% | 30% | % of would-be dropouts retained | Derived in R4.2 from 8 RCTs (mean 15.8%, median 12.5%). Bull ≈ Room to Read India 30.3% |
| Monthly logo churn, in-season | 5.0% | 3.0% | 1.5% | % logos / month | ChartMogul 6.1% at ARPA < $25 (2022); eChai 3–5%; SaaS Capital GRR 90%/yr ≈ 0.9%/mo revenue for ACV < $12K (the bull end) |
| Post-exam churn spike (non-renewal at season end, Apr–Jun) | 30% | 20% | 10% | % of logos at renewal | **ASSUMPTION**. No benchmark found. Validate with institute interviews (R-queue) |
| CAC per institute (bottom-up) | ₹15,000 | ₹6,500 | ₹3,000 | ₹ per paid institute | Derived. Rep loaded cost ≈ ₹22k fixed + ₹4.5k fuel + ₹5k incentive (incentive is an ASSUMPTION) ≈ ₹31.5k/mo, divided by deals/mo (3 / 6 / 10) = ₹10.5k / ₹5.3k / ₹3.2k. Then ×1.3 / ×1.2 / ×1.0 for marketing and manager overhead (ASSUMPTION) |
| Deals per field rep per month, in season | 3 | 6 | 10 | paid institutes / rep / month | Derived. SaaStr 20–50/mo for $0.5–2K ACV inside sales, cut for Tier-2 field sales with an in-person demo + pilot (no India source) |
| Sales cycle (first meeting to paid) | 60 | 30 | 14 | days | Vendor blogs: 14–40 days for < $5–10K ACV; bear adds the pilot period |
| Pilot-to-paid conversion | 15% | 30% | 50% | % | Trial benchmarks: 8% median, 18.2% opt-in, 48.8% opt-out (Userpilot / First Page Sage). Assisted-pilot benchmark not found |
| NRR (annual) | 90% | 98% | 106% | % | SaaS Capital 2025, ACV < $12K: p25 / median / p75 |
| Field sales rep monthly CTC (incl. fuel) | ₹30,000 | ₹24,000 | ₹19,000 | ₹ / month | Payscale Patna ₹20k avg base; PhonePe postings ₹18–25k + ₹4–4.5k fuel; AmbitionBox edtech BDE ₹17.5–27.5k |
| Inside sales rep monthly CTC | ₹30,000 | ₹25,000 | ₹18,000 | ₹ / month | Payscale Lucknow ₹26.7k; Indore posting ₹15–25k |
| CSM / onboarding executive monthly CTC | ₹45,000 | ₹35,000 | ₹25,000 | ₹ / month | Frontlines Tier-2 remote median ₹33–42k; Payscale Jaipur CSM-manager ₹58k (upper reference) |
| Junior full-stack engineer monthly CTC | ₹67,000 | ₹50,000 | ₹35,000 | ₹ / month | Glassdoor Jaipur ₹6L/yr, Indore ₹6–8L/yr (1–3 yrs); India fresher ₹4–7L |
| ML engineer monthly CTC | ₹1,00,000 | ₹75,000 | ₹50,000 | ₹ / month | Glassdoor (via Coursera) 0–1 yr ₹5–10.4L/yr, 1–3 yrs ₹6–15L/yr |
| Institutes per CSM | 40 | 80 | 120 | accounts / CSM | Gainsight: SMB median 100–250 accounts. Cut for high-touch Tier-2 onboarding (WhatsApp/OMR setup), which is an ASSUMPTION |
