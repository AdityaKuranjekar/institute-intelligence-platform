# Pragati launch video: story and voiceover (v2, for approval)

Length about 74 seconds · landscape 1920×1080, 30 fps · tone: mid-level (clear and warm, not jokey, not stiff) · voiceover plus soft music, no sung vocals.

Change from v1: the reveal now shows the owner what they gain, in three lines, instead of describing the technology. The whole script now talks to the owner as "you".

## Look and feel (from the RAY reference)
- Mostly empty near-black screen. Text types in step by step, one idea at a time, with one word in the accent colour.
- Colours: near-black navy, white text, teal accent (#19B5B7). Amber only for "pending" tags.
- Slow zoom in and out on the product screens, soft scrolling, soft fades.
- The architecture scene is a living web like RAY's agent map: a glowing core, six nodes around it, thin connecting lines, and dots of light flowing along them.

## Scenes, timing and voiceover

| # | Time | On screen | Voiceover |
|---|---|---|---|
| 1 Hook | 0:00–0:08 | Types: "Every week, a student in your institute quietly falls behind." Pause. "You find out **after they leave.**" | "Every week, a student in your institute quietly falls behind. You find out after they have left." |
| 2 Problem | 0:08–0:17 | Appears one by one: "Marks in Excel." "Answers on paper." "Updates on WhatsApp." Then "Nothing connected." Then "₹17 lakh a year" with a small tag "case-guide estimate, 400 students" | "The marks are in Excel. The answers are on paper. The updates are in WhatsApp. Nothing is connected. A 400-student institute can lose about seventeen lakh rupees a year this way." |
| 3 Reveal (approved, option D) | 0:17–0:24 | **PRAGATI** types in with a teal dot. Then: "Stop finding out **late.**" | "This is Pragati. So you stop finding out late." |
| 4 Product | 0:24–0:42 | Real screens from your running app (localhost:3000): **Capture** (zoom on the scan upload) → **Teacher** topic heat map (slow zoom on one weak column, scroll to the weekly list) → **Parent** report (Hindi, then English). Small tag: "Synthetic students" | "Scan an OMR sheet with a phone. Pragati builds a topic map for every student. Mentors get a short weekly list: who to call, and why. Parents get a clear update in Hindi or English, with every number checked." |
| 5 The web | 0:46–1:00 | The animated web. Core: "Pragati". Nodes light up in turn: **Capture** · **Mastery** · **Early warning** · **Honest range** · **Safe reports** · **Trust**. Dots flow from Capture through the core to Reports. Trust is a ring around the whole web. A small line at the end: "Runs on one laptop. Works offline." | "Behind it, six parts work together: capture, mastery, early warning, an honest percentile range, checked reports, and a trust layer. It runs on one laptop, even without internet, and each institute's data stays its own." |
| 6 Proof | 1:00–1:07 | Types: "0.763 · public data" and "0.46 vs 0.24–0.31 · the rules institutes use today". Smaller: "Synthetic students. Real-institute test next." | "On public data, it beats the simple rules institutes use today. What we haven't proved yet, we tell you." |
| 7 Ask | 1:07–1:14 | Types: "Give us last year's Excel." Then: "If we don't beat your attendance rule, **we stop.**" Last frame: **Pragati** · Team AlphaQ | "Give us last year's Excel. If we don't beat your attendance rule, we stop." |

About 190 spoken words in total, paced at a calm 150 words a minute with pauses.

## Why the reveal is written this way
- It names three owner gains: an early catch, saved staff time, and visible progress for parents. Those are the benefits the product is built for.
- It does not promise "you keep X fees" or a rupee return. The finance model says retention alone covers only about a third of the cost, and willingness to pay is untested, so a promise like that would be a claim we can't back.
- The "stop checking sheets by hand" line is supported by the OMR scanner and the staff-time assumption in the model (25 hours a month, an assumption to test).
- "Parents can see their child improving" describes the parent report. It does not claim parents will stay or refer others.

## Facts and labels (so nothing on screen is wrong)
- 0.763 and 0.46 are measured on public data (ASSISTments and the Open University dataset), each with a small "public data" tag.
- "₹17 lakh a year" is the case guide's example (400 students × 12 % × ₹36,000), tagged "case-guide estimate".
- The app screens use synthetic students and say so on screen.
- No ₹3.6 cost and no 1.7x return in the video. Those are model outputs and belong in the deck.

## Sound
- Music: slow, soft, minimal piano or pad, with a quiet pulse that picks up at the reveal (scene 3) and the web (scene 5). I'd make it custom, because the music bundled with the skill is upbeat.
- Voiceover: one calm voice, made locally with the skill's text-to-speech. I'll pick the voice from its list. Music sits well under the voice.
- Very quiet key-tap sounds as text types.

## What I need from you
1. Approve or change the lines, especially scene 3.
2. Keep the app running on port 3000 while I capture the screens.
3. After your yes, I'll build it with the brag skill. It will ask before installing anything.
