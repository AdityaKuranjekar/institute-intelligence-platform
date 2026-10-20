# Agent F: question-to-topic tagging at scale (`technical/ml/tagging`)

PS question A2: "How will questions be tagged to topics at scale?" and the expected-solution hint "question-topic tagging with an LLM + human review". Bar: `tagging_auto_accepted_precision >= 0.95` (blocking, `public` origin).

## Paste this into Antigravity
```
You are Agent F (Tagging). First read, in order: technical/docs/agent_prompts/R1_00_COMMON.md, technical/docs/TECH_PLAN.md (§10 Tagging row, §17), technical/contracts/topics.yaml, datasets.yaml (question_topics), metrics_bars.yaml (tagging_*), metrics.schema.json. Then open technical/docs/agent_prompts/R1_F_tagging.md and follow "TASK". Own only technical/ml/tagging/, scripts/download_jeebench.py and notebooks/12_question_tagging.ipynb. Do not edit contracts. Do not commit or tag. Ask the human before downloading anything and before using any cloud API.
```

## TASK

### Goal
A pipeline that assigns each question one or more **chapter-level and topic-level** ids from `topics.yaml` with a confidence, auto-accepts only the confident ones, and sends the rest to a teacher review queue whose corrections feed back as few-shot examples. Measure it honestly on public questions.

### Data
- **JEEBench** (MIT licence, 515 JEE Advanced questions, subject labels only, LaTeX text) from its official release (Hugging Face / GitHub; the human confirms the URL and approves the download, a few MB). Never commit question text beyond a 20-question demo sample you can legally show (MIT allows it with attribution).
- Gold labels do **not exist**: the human labels **150 questions at chapter level** (2 teammates, about 2 hours). You build the labelling tool: `ml/tagging/labeling/gold_template.csv` (question id, subject, question text snippet, **5 candidate chapters ranked by your embedding model**, blank `gold_chapter_id`, `gold_topic_id` optional, `labeller`, `notes`) plus `ml/tagging/labeling/README.md` explaining how to fill it in a spreadsheet (UTF-8 BOM). Stratify the 150 by subject (Physics, Chemistry, Mathematics) and chapter frequency. **Do not fill the gold labels yourself and do not report any accuracy until the human has returned the file.** Until then run on a 20-question smoke set and label every number "unlabelled smoke run".
- Optional second set: 50 questions with **chapter given in the source** where available, for a free sanity check.

### Pipeline
1. **Embedding shortlist**: Ollama `nomic-embed-text` (already installed locally; if you prefer a multilingual model, ask the human first) embeds the question text and every topic (`name_en` + parent chapter); cosine top-5 chapters, top-5 topics within them.
2. **Chooser**: a local LLM (`qwen3:4b` once pulled; thinking disabled; JSON-schema output; temperature 0) picks 1-2 topics from the shortlist, with a confidence and a one-line reason. Constrained to the shortlist ids (anything else is rejected). Cloud APIs are allowed here only because the inputs are public questions with no personal data; still ask the human before using one, and use no API key from files.
3. **Calibration**: map LLM and embedding agreement into a calibrated confidence (isotonic on the gold set, cross-validated); **auto-accept only above the threshold that achieves precision >= 0.95 on held-out gold**; report coverage (share auto-accepted) at that threshold.
4. **Review queue**: everything else goes to `review_queue.csv` (question id, top-3 suggestions with scores, reviewer, decision). Corrections are appended to `fewshot_examples.jsonl`; the chooser prompt retrieves the 3 nearest corrected examples (kNN on embeddings). Show the accuracy gain after adding corrections from a held-out split of the gold set.
5. Output rows follow `contracts/datasets.yaml` `question_topics` (`weight`, `tagged_by` in {llm, human, embedding}, `confidence`, `reviewed_by`).

### Acceptance (tests + `metrics.json`; `dataset_origin: public`)
1. `tagging_auto_accepted_precision >= 0.95` with 95 % CI on the held-out gold chapter labels, plus coverage, top-1 and top-5 chapter accuracy, topic-level accuracy (report only), per-subject breakdown. If the bar is missed, report it, lower the coverage until it holds, and say how few questions that leaves.
2. Compare with baselines: keyword/TF-IDF matching and embedding-only; the LLM must earn its place.
3. Ids returned always exist in `topics.yaml`; no id outside the shortlist; deterministic with temperature 0 and a fixed seed.
4. Failure modes: Ollama down (fall back to embedding-only, flagged `tagged_by: embedding`, never auto-accepted), empty or non-English question text, LaTeX noise, questions spanning two chapters (multi-label), duplicate questions.
5. Privacy: no personal data exists in this pipeline; the module must not log full question text to files outside `data/`.
6. Cost and speed: per-question latency p50/p95 on the RTX 4060 and on CPU; tagging of 515 questions in < 10 min on GPU. Per-question cost = INR 0 locally.

### Notebook `12_question_tagging.ipynb`
Runs on the smoke set by default (clearly labelled), and on the gold set when `gold_template.csv` has been returned. Shows the confusion matrix by subject, the confidence-vs-precision curve with the chosen threshold, example reviews, and the **"at scale" argument**: auto-accept rate and the human minutes per 1,000 questions at the measured coverage.

### Done when
`make test-tagging` passes without network or Ollama (uses fixtures and a `FakeChooser`); README documents the labelling procedure; `docs/agent_logs/R1_F.md` states clearly whether the gold labels have been returned and which numbers are therefore real.
