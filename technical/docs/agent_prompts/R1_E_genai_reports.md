# Agent E — Verified bilingual parent reports (`technical/backend/app/genai`, `technical/backend/templates`)

## Paste this into Antigravity
```
You are Agent E (GenAI reports). First read, in order: technical/docs/agent_prompts/R1_00_COMMON.md, technical/docs/TECH_PLAN.md (§11, §15, §16, §17 GenAI rows, §18), technical/contracts/report_numbers.schema.json, report_output.schema.json, reason_templates.yaml (banned_words), topics.yaml (name_en, name_hi), metrics_bars.yaml (genai_* keys), metrics.schema.json. Then open technical/docs/agent_prompts/R1_E_genai_reports.md and follow "TASK". You are independent of the other agents. Own only backend/app/genai/, backend/templates/, notebooks/08_genai_reports.ipynb. Do not edit contracts. Do not commit or tag. Do NOT download any model yourself: ask the human to run the `ollama pull` commands listed below and wait.
```

## TASK

### Goal
A **pure Python module** that turns a deterministic `numbers_json` into a **verified Hindi or English parent report** that is *never wrong and never shaming*, works **with zero LLM**, and measures cost and latency. Principle: **the LLM only phrases facts; code decides facts; a verifier decides whether the phrasing may ship; templates are the guaranteed path.**

### Pipeline (implement as separate, individually tested functions)
1. `build_numbers(inputs) -> NumbersJson` — from analytics outputs (attendance %, tests taken, ≤ 3 strengths and ≤ 3 focus topics with `topic_id`, `name_en`, `name_hi` and band, trend word, exactly 2 `home_tips` ids chosen by rules). **No names, no free text.** Validates against `report_numbers.schema.json`. Topics with `band = not_enough_data` are never listed.
2. `render_prompt(numbers, lang) -> Prompt` — fixed system prompt (stored in `genai/prompts/`), the JSON as data, placeholders `{STUDENT}`/`{INSTITUTE}`; **no student names or institute-specific free text ever enter a prompt** (this also blocks prompt injection via names). Reading level: Class 8; supportive, concrete tone; Hindi in Devanagari, simple vocabulary, English technical words allowed (e.g., "test", "chapter"); no sentence longer than 22 words.
3. `LLMClient` protocol + `OllamaClient` (HTTP `localhost:11434`, JSON-schema constrained output via `format=`, `temperature=0.3`, **thinking disabled** for Qwen3 models, timeout 8 s, one retry) + `FakeClient` (scripted outputs for tests) + `NullClient` (always unavailable ⇒ template path).
4. `verify(output, numbers, lang) -> VerifyResult(ok, failures[])` — **deterministic checks**: (a) JSON valid against `report_output.schema.json`; (b) **every number in the text appears in `numbers`** after normalising Devanagari digits (०–९) ↔ ASCII and "75%" / "75 प्रतिशत" / "75 percent" forms; (c) every topic mentioned is in the allowed list (EN or HI names, exact or normalised match); every allowed focus topic appears at most once; (d) both placeholders present, **no other proper names** (reject capitalised tokens not in an allow-list), (e) **banned lexicon** from `reason_templates.yaml` (EN and HI, case/normalisation-insensitive, including inflections/spacing variants), plus patterns for ranks/comparisons ("better than", "other students", "बाकी बच्चों"), risk or dropout language, health/mental-health guesses; (f) length 80–180 words (HI counted by whitespace tokens); (g) trend word consistent with `numbers.trend`; (h) the two home tips present (any phrasing from `tip_*` templates).
5. `generate_report(numbers, lang, client, *, cache) -> Report(content, path: llm|template, verified: True, model, latency_ms, tokens_in, tokens_out, cost_inr, failures)` — try LLM → verify → on failure **retry once with the failure list appended as data** → still failing, API down, empty or invalid JSON, timeout ⇒ **template path**. A report with `verified=False` can never be returned. Cache by `sha256(numbers_json canonical + lang + prompt_version + model)`.
6. Templates (`backend/templates/en/*.j2`, `hi/*.j2`): **8–10 human-written variants per language**, chosen by trend and strengths/focus counts (e.g., no strengths yet, steady, improving, new student with `tests_taken < 3`, attendance-support wording). Warm, specific, no comparisons, no risk talk, every sentence factual from `numbers`. Mark every Hindi template `reviewed: false` in a header comment and produce `docs/genai_hindi_review.csv` (template id, text, reviewer, status, corrected text) for the **native-Hindi teammate**. Do not machine-translate silently; write natural parent-facing Hindi yourself and flag it for review.
7. `CostMeter`: tokens and ₹ per report using prices in `backend/app/genai/pricing.yaml` (local = ₹0 marginal; list paid reference models with `source:` and `verified: false` unless you can cite an official pricing page; no guessing); monthly cap per institute; template fallback when the cap is reached.

### Acceptance criteria (tests + `metrics.json`; keys from `metrics_bars.yaml`)
1. `genai_verifier_injected_error_catch_rate = 1.0` (blocking): **fuzz** 500 corrupted outputs (change a number; swap a topic for one not allowed; add a rank or comparison; add a name; add dropout/mental-health wording; drop a placeholder; break length; invert the trend; Devanagari-digit variants; Unicode confusables and zero-width characters; mixed-script tricks) — every one rejected. Report the catch rate per corruption type.
2. `genai_unverified_reports_shipped = 0` (blocking): over 1,000 generated reports with `FakeClient` returning random mixtures of good/bad outputs, every returned report passes `verify`.
3. **No-LLM guarantee**: with `NullClient`, 100 % of reports are produced, verified, in both languages, in < 50 ms each.
4. **Failure modes** (each a test): LLM timeout, malformed JSON, empty string, HTTP 500, partial JSON, prompt-injection attempts inside `topic` names fed through the allow-list, output exceeding length, output in the wrong script.
5. **Privacy test** (blocking): assert on the captured prompt that it contains no student name, institute name, roll number, phone, or free text; only keys, numbers and allowed topic names.
6. **Template quality gates**: all templates pass `verify` for 300 random valid `numbers`; no banned lexicon; Hindi templates render without missing glyphs when exported to a PDF (use a bundled **Noto Sans Devanagari** font file under `backend/templates/fonts/`; check licence OFL and keep the licence file).
7. **Determinism**: same input, same cache key; templates choose deterministically given a seed derived from the input hash.

### Model benchmark (needs human action: model pulls)
After the code and tests pass, **stop and ask the human to run** (each ≈ 2.5–3.5 GB):
```
ollama pull qwen3:4b
ollama pull gemma3:4b
```
Then run the benchmark (`genai/bench.py`) on **200 reports (100 EN + 100 HI)** built from 50 varied `numbers_json` (include edge cases: no strengths, 3 focus topics, tests_taken 0–2, attendance 0 % and 100 %): per model record valid-JSON rate, **verifier pass rate on the first try**, fallback rate after retry, latency p50/p95 on the RTX 4060 (GPU) and **CPU-only** (`num_gpu=0`), tokens, VRAM peak (via `nvidia-smi`), words, reading-level heuristic. Pick the default model by *verified-pass rate first, latency second*; document the choice in `docs/decisions.md`-style notes in your log. If both models are poor in Hindi, implement **Path B** as an option (English → IndicTrans2 distilled EN→HI) **only after asking the human** (it needs a ~1 GB download and a licence check).
Produce `docs/genai_hindi_rubric.csv`: 30 reports (15 HI, 15 EN) with columns for factual accuracy (1–5), tone (1–5), Hindi naturalness (1–5), reviewer, comments — for human scoring; do not fill the scores yourself and do not report them as results until the human has.

### Notebook `08_genai_reports.ipynb` (≤ 15 min, runs without any model: uses `FakeClient` + templates by default; has an optional cell to run the Ollama benchmark)
Shows: sample EN and HI reports with verifier ticks, the corruption fuzz table, fallback behaviour when the LLM is unplugged, cost per report and per student per month (4 reports/month) with the formula and inputs, latency charts if the benchmark was run.

### Edge cases
Student with 0 tests; no strengths yet; every topic flagged `not_enough_data`; trend `declining` (must stay supportive; never "failing"); attendance 100 % or < 50 % (no accusation: factual + offer of help); Hindi numerals; `%` vs `प्रतिशत`; topic names containing digits or parentheses; very long topic names; two siblings sharing a guardian phone (reports are per child, never merged); report language per guardian preference; prompt injection text inside a topic name or period label.

### Done when
`make test-genai` passes with no network and no Ollama; the benchmark section is either completed with the human's pulls or marked "pending: models not pulled" in `docs/agent_logs/R1_E.md`; README documents the API and the "LLM is optional" guarantee; `ml`-style `model_card.md` for the *system* (intended use, not-intended use, verifier limits, known Hindi limits, privacy).
