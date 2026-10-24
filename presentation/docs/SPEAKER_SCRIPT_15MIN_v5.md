# Pragati – 15-minute speaking script (deck v5)

Team AlphaQ · Case B "The Data Moat" · Round 1

**How to use this:** each slide has a time, a script to say out loud, and "If you forget" points. If you lose your place, read only the points and keep talking.
**Speaking pace:** about 130 words a minute. If you run late, shorten slides 5, 6 and 12 first. Never cut slides 4, 10, 13.
**Appendix slides (14–22):** do not present them. Say "details are in the appendix" if a judge asks.

| Slide | Topic | Time |
|---|---|---|
| 1 | Title | 0:45 |
| 2 | Summary | 1:00 |
| 3 | The problem | 1:15 |
| 4 | Where the case guide's numbers break | 1:15 |
| 5 | Architecture | 1:00 |
| 6 | Product | 0:45 |
| 7 | Weak topics (mastery) | 1:15 |
| 8 | Early warning | 1:30 |
| 9 | Percentile range and parent reports | 1:00 |
| 10 | Privacy and law | 1:15 |
| 11 | Business model | 1:30 |
| 12 | Go-to-market and moat | 1:00 |
| 13 | Scorecard and the ask | 1:15 |
| 23 | AI-use disclosure | 0:15 |
| | **Total** | **15:00** |

---

## Slide 1 – Title (0:45)

**Say:**
"Good morning. We are Team AlphaQ, and this is Pragati.

Small coaching institutes in cities like Patna already have a lot of student data. It sits in Excel files, on paper OMR sheets and in WhatsApp groups. Nobody can use it.

Pragati puts all of that into one clear topic map. For every student, we can see which topics are weak, before the exam.

Three numbers on this slide. 0.76 is our prediction score on public data, and the published rival score is 0.75. We tested on two public datasets, not only our own. And the cost to run is ₹3.6 per student per month, on one laptop."

**If you forget:**
- Excel + OMR + WhatsApp → one topic map
- 0.76 vs 0.75 on public data
- Two public datasets (Open University, ASSISTments)
- ₹3.6 per student per month, one laptop

---

## Slide 2 – Executive summary (1:00)

**Say:**
"Here is the whole story in one minute.

The situation: Tier-2 and Tier-3 JEE and NEET institutes, with 150 to 1,200 students. Over 22 lakh students registered for NEET last year, and about 15 lakh for JEE Main.

The problem: a 400-student institute loses about ₹17 lakh a year when students drop out in the middle of the session. The owner finds out after the student has left. Generic apps store marks but give no topic view and no warning. And the law, DPDP section 9(3), does not allow behaviour tracking of children.

Our answer: a photo of the OMR sheet, or an Excel file, goes in. Out comes a topic map, a weekly list of students to support with plain reasons, and checked Hindi and English parent reports. It runs offline.

The bottom row shows how we match the scoring: architecture, ML, privacy and business. Every number here is labelled either 'public data' or 'model output'."

**If you forget:**
- Situation → problem → answer
- ₹17 lakh a year lost per 400-student institute
- Law: no tracking of children
- Loop: capture → structure → estimate → flag → act → report
- Numbers are labelled: public data vs model output

---

## Slide 3 – The problem (1:15)

**Say:**
"Let us look at who is hurt today.

Teachers check OMR sheets by hand. Owners cannot compare batches. Parents get a marks list and nothing more. Students struggle quietly for weeks, and are noticed only when they stop coming.

The money side: in the guide, 8 to 15 percent of students leave mid-session. Each one costs about ₹36,000 in lost fees. For a 400-student institute at 12 percent, that is ₹17.3 lakh a year. This is a number from the case guide, so we treat it as an example, not a fact about any one institute.

Who we serve: 22.8 lakh NEET candidates, 15.4 lakh for JEE Main. The ₹137 crore figure is a ceiling, not a forecast. It assumes every aspirant's institute pays ₹30 a month.

And look at the buyer. They are price-sensitive, their staff are not very technical, internet is patchy, and they hold children's data. So the product must be cheap, simple, offline and legal."

**If you forget:**
- Four groups hurt: teachers, owners, parents, students
- 8–15 % dropout; ₹36,000 per leaver; ₹17.3 L a year (guide's numbers)
- ₹137 crore = ceiling, not forecast
- Buyer: cheap, low-tech, bad internet, minors' data

---

## Slide 4 – Where the guide's numbers break (1:15)

**Say:**
"This is our most important business slide. We took the case guide's example numbers and tested each one. We found six that do not hold, and we changed them.

Price. The guide says ₹40. Rival apps list at ₹4 to ₹21. We list at ₹30 and test from ₹20 to ₹40.

Dropouts prevented. The guide says 25 percent. Trials in similar settings average about 16 percent, and only for students who actually get outreach. We model 4 percent, and we will prove it in a pilot.

Fees alone do not pay for the product. They cover about a third of the cost. So we lead with staff time saved and parent reports.

LTV to CAC. The guide says 10.7. We get 3.6.

Accuracy. A published score is 0.794. Our honest score on the same data is 0.706, because we split by student, so there is no leakage.

And tracking. We do not track app activity for under-18s. It costs us only 0.008 in score.

The right question is not 'can a model predict dropouts'. It is: 'of the eight students a mentor can call this week, are they the right eight, and does the call help?'"

**If you forget:**
- We cut the guide's numbers ourselves → makes the rest believable
- ₹40 → ₹30; 25 % → 4 %; LTV/CAC 10.7 → 3.6; AUC 0.794 → 0.706
- Fees alone return 0.35x; need staff time + admissions
- Under-18: no activity tracking, costs only 0.008
- Key question: "the right eight students this week"

---

## Slide 5 – Architecture (1:00)

**Say:**
"Pragati has three layers and one rule: each institute's data stays its own.

Top layer, delivery: a web console for the office, a phone app, reports in Hindi and English, and an open export, so the institute owns its data.

Middle layer, intelligence. Topic mastery uses IRT, a standard test-theory method. The early warning uses LightGBM. Percentile ranges use conformal prediction. Reports pass eight safety checks.

Bottom layer, trust. Row-level security means one institute can never see another's rows. No consent, no model. It works without internet. And an audit log shows who saw what.

Facts to remember: 31 tables, 23 endpoints, 380 syllabus topics, 116 automated tests. The isolation was tested on PostgreSQL 16. It is all free software and runs on one laptop."

**If you forget:**
- 3 layers: Delivery / Intelligence / Trust
- IRT, LightGBM, conformal, 8 checks
- Row-level security, consent gate, offline, audit log
- 31 tables · 23 endpoints · 380 topics · 116 tests

---

## Slide 6 – Product (0:45)

**Say:**
"This is what people actually use. A web console for the office. A phone app for mentors and parents. It is a web app, so there is no app-store fee.

Four screens. One: scan an OMR sheet with the phone, and fix unclear bubbles in one tap. Two: the topic map for the whole batch. Three: the weekly list, up to eight students, each with a plain reason. Four: the parent update, in Hindi or English, with checked numbers.

Look at the week strip at the bottom. Monday, test scanned. Tuesday, mentor calls. Wednesday, extra session. Saturday, parent update. Once a month, the owner sees results.

These are mock-ups with synthetic students. We say so on the slide."

**If you forget:**
- 4 screens: scan, topic map, weekly list (max 8), parent update
- Weekly rhythm Mon → Sat, owner monthly
- Mock-ups, synthetic students

---

## Slide 7 – Weak topics (1:15)

**Say:**
"First technical block: finding each student's weak topics.

On the left is what a teacher sees: students down the side, topics across the top. Colours show 'building', 'steady', 'strong', or 'not enough data'. Notice two things. If a whole column is weak, the topic was probably not taught yet, so those are not weak students. And a question that your best students keep missing is flagged as a likely wrong answer key.

How it works, in four steps. We rate how hard every question is. We estimate mastery per topic, pulling the estimate towards the student's overall level when data is thin. We say 'not enough data' when unsure. And we flag wrong keys, with a one-click re-score.

Evidence on public data: on ASSISTments, with 770 unseen students, we score 0.763. The published DKT is 0.754. The published AKT is higher, 0.785, and we say that openly.

Three checks on synthetic data are marked pending. We will fill them before the final round."

**If you forget:**
- Teacher sees topic bands, not scores; "not enough data" is allowed
- Weak column for all = not taught yet
- Wrong-key detector
- 0.763 vs DKT 0.754; AKT 0.785 is better – say it
- 3 synthetic gates PENDING (be upfront)

---

## Slide 8 – Early warning (1:30)

**Say:**
"Second technical block: early warning.

The journey: engagement drops, say six absences in ten classes. The model flags the student. The flag shows on the mentor's weekly list. The mentor calls, in a supportive way, not as a warning. The outcome is logged, and the list updates. A person always decides.

The evidence is on real public data: the Open University dataset, at day 28, split by student. Our model gets 0.706 AUC. At the top 10 percent, its precision is 0.46. The institute's usual rules, like 'no assessment submitted' or 'zero clicks in 7 days', get 0.24 to 0.31. So, for the same size of list, we find roughly one and a half to nearly twice as many true cases. Our academic-only version is almost as good, 0.698.

The calibration error is 0.009. So when we say '30 percent risk', it means about 30 percent.

The right side is the law matrix. Under 18, we use a model for academic support only. Dropout and fee risk use plain rules. App activity is never used. For 18 and over, with their own consent, the full model can be used. DPDP 9(3) is the reason.

One limit: about a quarter of dropouts are sudden. Academic data cannot predict those."

**If you forget:**
- Flag → weekly list → supportive call → log outcome; human decides
- OULAD day 28: AUC 0.706, precision@10 % 0.46 vs rules 0.24–0.31
- Calibration 0.009 ("30 % means 30 %")
- Under 18: model for academic support, plain rules for dropout/fees, no activity tracking
- Limit: ~1 in 4 dropouts is sudden
- Synthetic early-warning lift: pending

---

## Slide 9 – Percentile range and parent reports (1:00)

**Say:**
"Two features that build trust.

First, an honest range, not a single rank. Students get a range, like 'about the 70th to 85th percentile'. As more tests come in, the range gets narrower. Our target is that 80 percent of students fall inside their range. The mapping from mock score to percentile is an editable table, and we label it as an assumption. Coverage is still being measured.

Second, the parent report. AI can write messages, but it can also make up numbers. So we built eight automatic checks. Numbers must match the data. Topics must be real. Names are added last. No banned words. Right length. The trend must be correct. Tips must be from an approved list. The format must be valid.

If any check fails, a safe, human-written template goes out instead. So a report is always sent, and it is never wrong in a way that harms a student. It even works with no AI model at all."

**If you forget:**
- Range, not rank; narrows with more tests
- 80 % band; coverage pending; mapping table is an assumption
- 8 checks list: numbers, topics, names last, banned words, length, trend, tips, format
- Fail → human template
- Do not quote a "catch rate" yet

---

## Slide 10 – Privacy and law (1:15)

**Say:**
"This is where many teams fail, so we put it up front.

Consent first. For every child, the institute checks a parent's ID at the desk. Consent is recorded per purpose. A parent can withdraw in one tap.

Data lockbox. Student records, marks, the consent ledger and risk lists stay inside the institute's own laptop or server. The only thing that goes out is question difficulty numbers, to a shared bank. No names, no marks.

The cost of privacy is small. Dropping activity data costs only 0.008 AUC on real data.

Safety rules: no leaderboards, no moving batches based on scores, a banned-words check on every message, a counsellor contact at every institute, and students never see a risk label.

The law in four lines. Section 9(1) and Rule 10: parental consent. Section 9(3): no tracking of children, even with consent. Ministry of Education 2024: results are for counselling, never public. And our role is data processor. The institute is the data fiduciary.

We are not lawyers. A legal review of the in-person ID flow is planned."

**If you forget:**
- Consent at the desk (ID check), per purpose, withdraw anytime
- Raw data never leaves institute; only difficulty numbers go out
- Privacy cost 0.008 AUC
- No ranks, no batch moves, banned-word check, no risk label shown to students
- s.9(1), s.9(3), MoE 2024, we are data processor
- Not legal advice; lawyer check planned

---

## Slide 11 – Business model (1:30)

**Say:**
"Now the business. We chose our base case to look worse than the guide, on purpose.

Base case, 400 students, ₹30 per student per month. The owner's return is 1.7 times the cost. But look at what that includes: fees kept, staff time saved, and 1 percent more admissions. With only fees and staff time, the return is 0.55 times. So honestly, retention alone does not pay for the product. We sell it as a bundle: time saved, parent reports, retention, and admissions.

LTV to CAC is 3.6, or 4.8 without discounting. Payback is 5.7 months. Contribution margin is 78 percent.

Where does the ₹3.6 cost go? WhatsApp messages ₹1, compute ₹0.8, AI reports ₹0.7, servers ₹0.5, legal ₹0.5, consent checks ₹0.1.

Stress test: in the bear case, return is 0.37 times and LTV to CAC is 0.75. In the bull case, 3.9 and 10. If every input is at its worst, return is 0.09. That is a survival test, not a forecast.

It breaks even if it keeps 5.5 students a year, or wins 1.5 extra admissions. The big unknown: willingness to pay is untested. That is what the pilots are for."

**If you forget:**
- Base: 1.7x all benefits; 0.55x fees + time; 0.35x fees only
- LTV/CAC 3.6x (4.8x undiscounted); payback 5.7 months; margin 78 %
- Guide: 10.7x / 3.1 months – we are lower on purpose
- Cost ₹3.6: WhatsApp 1.0, compute 0.8, AI 0.7, servers 0.5, legal 0.5, consent 0.1
- Bear 0.37x / Bull 3.9x / worst case 0.09x
- Break-even: 5.5 students kept or 1.5 admissions
- Willingness to pay = untested

---

## Slide 12 – Go-to-market and moat (1:00)

**Say:**
"How do we sell? We start in Patna, where we can meet owners in person. Two free trials, using last year's Excel. Then paid pilots in Lucknow, then Ranchi, then Rajasthan and MP later. Kota is full of big chains, so we skip it for now.

The market: about 1,180 addressable institutes in five states. By year 3 we plan for 58 paying, which is 4.9 percent. That number is derived and mostly an assumption, and we say so.

Competition: we compared Classplus, Fedena and Teachmint. A question mark means we could not verify it, not that it is missing. We are the only one that shows OMR, topics, reports and Hindi together in the listings we could verify.

The moat: more institutes give more answers, more answers sharpen question difficulty, and that gives better lists. But we are honest: this moat is weak below about 200 institutes. Early wins come from time saved.

Year 3, base case: ₹65 lakh revenue, break-even in month 16, and we need ₹45 lakh. For small institutes, we use channel partners, not field reps."

**If you forget:**
- Patna free trials → Lucknow paid → Ranchi → Rajasthan/MP later
- 1,180 institutes; 58 paying = 4.9 % (assumption)
- "?" = not verifiable, not "absent"
- Moat = shared question bank; weak below ~200 institutes
- Year 3: ₹65 L revenue, break-even month 16, ₹45 L funding
- Small institutes → channel partners (LTV/CAC 3.4x vs 1.5x)

---

## Slide 13 – Scorecard and the ask (1:15)

**Say:**
"What have we proved, and what have we not?

Proved: 0.76 accuracy on public student data. 0.009 calibration error. Privacy costs only 0.008. 116 tests pass and tenants stay apart.

Not yet proved: the difficulty and wrong-key gates on synthetic data are pending, and accuracy at a real institute is not measured. We say that clearly.

Four risks and our fixes. Real accuracy may be lower: so we run a retro-pilot before any sale. Owners may not pay ₹30: so we run a price survey and lead with time saved. Mentors may ignore the list: so we cap it and log every outcome. Hindi quality may fall short: so native review, and a template fallback.

The ask is simple. Two free retro-pilots in Patna this winter. Give us last year's Excel. If we do not flag more of the students who left than your attendance rule does, at the same workload, we stop.

The plan needs ₹45 lakh, breaks even in month 16, and reaches ₹65 lakh revenue in year 3. Thank you."

**If you forget:**
- Proved (4 ticks) vs not yet (2 open items)
- 4 risks with fixes: real accuracy, price, ignored list, Hindi
- THE ASK: 2 free retro-pilots in Patna, last year's Excel; we stop if we do not beat the attendance rule
- ₹45 L · month 16 · ₹65 L

---

## Slide 23 – How we used AI (0:15)

**Say:**
"One last thing. We used AI tools: Claude for planning and review, Google Antigravity agents for code, and Perplexity and Gemini for research. The team reviewed and tested everything. Data sources and licences are listed in the repository. Thank you, and we are happy to take questions."

**If you forget:**
- Claude, Antigravity, Perplexity, Gemini
- Team reviewed and tested all
- Full citations in the repo

---

## Q&A cheat sheet (likely questions)

| Question | Short answer |
|---|---|
| Why is your OULAD score (0.706) lower than the published 0.794? | We split strictly by student, so there is no leakage. Leaked splits inflate scores. |
| Why only 4 % dropout reduction? | Trials show about 16 % for students who get outreach. Some leave in month 1 and cannot be flagged. Some are sudden. So 4 % is the net effect. We prove it in the pilot. |
| Is ₹30 realistic? | Rivals list ₹4 to ₹40. It is untested. Price survey and owner interviews come first. Return stays above 1x up to ₹40 at base. |
| Do you have real institute data? | No. Student data is synthetic, with known ground truth. Methods are validated on public data. Real accuracy is the pilot's job. |
| Is it legal to flag minors? | Under 18: model for academic support only, plain rules for dropout and fees, no activity tracking. Legal opinion on the ID flow is pending. |
| What if the AI writes a wrong number? | Eight checks. If any fails, a human-written template goes out. |
| Why will owners trust you? | Data stays in their institute, they can export everything, and we are a data processor. |
| What is the moat? | A shared question bank that gets sharper with more institutes. Weak below about 200 institutes. |
| Why start in Patna? | We can meet owners in person. About 115 to 145 qualifying institutes. |
| What happens if the pilot fails? | We stop. The bear case needs ₹1 Cr and does not break even in 36 months. |

## Three sentences to remember if everything else goes blank

1. "Small institutes have the data, but no way to use it. Pragati turns it into a weekly to-do list for mentors."
2. "We cut the guide's numbers ourselves, and we mark what is still untested."
3. "Give us last year's Excel. If we don't beat your attendance rule, we stop."
