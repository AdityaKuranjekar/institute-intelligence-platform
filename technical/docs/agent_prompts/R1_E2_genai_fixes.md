# Agent E, fix-up 2 (same workspace/agent as R1_E)

## Paste this into Antigravity
```
You are Agent E (GenAI reports) doing a fix-up pass. Read technical/docs/agent_prompts/R1_E2_genai_fixes.md and follow its TASK exactly. Own only backend/app/genai/, backend/templates/, notebooks/08_genai_reports.ipynb, docs/genai_*.csv. Do not edit contracts. Do not commit or tag.
```

## TASK
Human review ran an **independent adversarial test** (`analysis/verification/adversarial_verifier_cases.py`, 25 corruptions per language written by the reviewer, not by you). The verifier wrongly ACCEPTED:
- EN: mental-health words ("stress and anxiety"), a leave-the-course/risk hint, a result guarantee ("We guarantee selection"), a fee/payment mention.
- HI: a rank claim ("आपका बच्चा बैच में अव्वल है"), mental-health words (तनाव, चिंता), an invented topic phrase not in the syllabus list ("विद्युत-रसायन"), a guarantee ("चयन की गारंटी"), a **flipped trend (सुधार → गिरावट)**, a fee mention (फीस/बकाया), a sibling comparison ("अपने भाई के उलट").
Your own fuzz reported 500/500 because the corruptions came from your own generator. Fix the verifier and make the claim honest.

### FIX 1 — Verifier gaps (blocking)
1. **Additional lexicon, outside `contracts/`**: `backend/app/genai/lexicon_extra.yaml` (EN + HI, with inflections/spacing/transliterations) covering: mental-health/emotion words (stress, anxiety, tension, worry, depressed, तनाव, चिंता, डर, घबराहट…), result guarantees and predictions of selection (guarantee, assured, sure to, certain, गारंटी, पक्का, निश्चित चयन…), leave/quit/risk language (risk, may leave, quit, drop, छोड़, जोखिम…), money/fees (fee, pay, payment, due, pending, फीस, शुल्क, बकाया, भुगतान…), rank/topper words (topper, first, top, अव्वल, टॉपर, पहला स्थान…), family/peer comparisons (brother, sister, siblings, classmates, भाई, बहन, सहपाठी, दूसरे बच्चे…). The verifier merges it with `reason_templates.yaml`'s banned words. Log in `docs/contract_change_requests.md` (CCR-010) that these should move into `contracts/reason_templates.yaml` in v1.0.1.
2. **Trend consistency in Hindi** (and EN): the body must contain exactly the trend vocabulary of `numbers.trend` (improving: सुधार/बेहतर…; steady: स्थिर…; declining: उतार/गिरावट…) and **none** of the opposite trend's vocabulary. Add EN/HI trend lexicons in the same yaml.
3. **Unknown "topic-like" phrases**: a sentence that instructs study of something ("revise|practise|focus on|दोहराएँ|अभ्यास करें|ध्यान दें" + noun phrase) must reference only allowed topics or the fixed home-tip phrases; otherwise fail. If you cannot make this reliable, **reduce the attack surface instead**: in the LLM path, constrain output to a JSON structure of *selected sentence ids/slots* and render the final text from templates (the LLM chooses and orders phrasing variants, it never writes free-form clauses about topics). State which approach you took.
4. Keep the existing 8 checks; do not weaken any.

### FIX 2 — Make the evidence honest and independent
- Move the reviewer's 50 adversarial cases into `backend/app/genai/tests/test_adversarial_independent.py` (keep them as a fixed, separate list from your fuzz generator, with a comment that they were written independently). The "fullwidth digits" case is harmless (NFKC-equal numbers); assert it passes as a number-equivalence, not as an error.
- **Add 100 further adversarial cases yourself in a *second* file written *after* your fix by a differently-seeded approach** (paraphrases of the same corruption types, mixed-script and spacing tricks, markdown/HTML/URL/phone injection, long Unicode runs). Report catch rate per type and **list any case that still passes**; do not claim 100 % unless the independent list is fully caught.
- Update `metrics.json` notes: `genai_verifier_injected_error_catch_rate` computed on (a) own fuzz, (b) the independent set, reported separately; the contract bar value uses the **lower** of the two.
- Fix `README.md` example: `mastery_band` must use the contract enum `not_enough_data|building|steady|strong` (the README currently shows an invalid value in one place; verify).

### FIX 3 — Output location
Write your artifacts to `backend/app/genai/artifacts/v1.0.0/{metrics.json,manifest.json,model_card.md}` (not `ml/artifacts/v1.0.0/metrics.json`, which collides with other modules; the reviewer's `scripts/deck_numbers.py` merges all `**/artifacts/v*/metrics.json`). Update the notebook, README, tests and `docs/agent_logs/R1_E.md` accordingly; delete the old `ml/artifacts/v1.0.0/metrics.json` that you created.

### Acceptance
`make test-genai` passes with no network or Ollama; the 50 independent cases are all rejected (except the harmless fullwidth-digit one); the second 100-case set reports its own catch rate honestly; `NullClient` path still produces verified reports in both languages for 300 random inputs; template text never trips the extended lexicon.
Still pending on the human: `ollama pull qwen3:4b` and `ollama pull gemma3:4b` for the live benchmark.
