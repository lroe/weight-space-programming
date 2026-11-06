# Astra Weight Space — Storyboard

**Composition:** `AstraWeightSpace` · 1920×1080 · 30 fps · 1041 s  
**Audio:** `public/audio.wav` (continuous narration)  
**Style:** Dracula night (`#282A36`), Rough.js ink linework (`#F8F8F2`), Caveat + Patrick Hand  
**Palette:** red `#FF5555` = loss / friction · green `#50FA7B` = gain / balance · purple `#BD93F9` and cyan `#8BE9FD` = sparing support accents  
**Surfaces:** `#313342` panels · `#44475A` active cards · `#1E1F29` recessed wells  
**Character:** Astra, a hand-drawn star with a magnifier or pencil  
**Rule of thumb:** one focus zone per beat, 1–5 words per callout, 60–80% negative space, 1.5–3 s holds, 36px minimum type.

---

### Scene 1: The Question
**Audio Timestamp:** 00:00 – 00:59.58  
**Narration:** "Let me start with a question… what if a language model could read its own weights?"

* **Visual Description:** Astra appears in open space. A weight matrix becomes a landscape, then a network. The recurring question is whether weights can be inspected like code.
* **On-Screen Text:** "what if?" / "read the weights" / "one line." | Top-center and beside matrix | Ink / Sage
* **Animation Sequence:**
  1. `[00:00.0 – Let]` Draw Astra.
  2. `[00:08.0 – weights]` Matrix draws cell-by-cell; a magnifier sweeps across.
  3. `[00:42.0 – one line]` The matrix resolves into a single line.
* **Post-Animation Hold:** 2.0 s on the one-line image.
* **Transition Out:** Fade through the Dracula background.

---

### Scene 2: The Old Way
**Audio Timestamp:** 00:59.58 – 01:28.30  
**Narration:** "Here's how we usually change a neural network… you change the data, or the loss, or the optimizer."

* **Visual Description:** Three simple levers — data, loss, optimizer — feed a network. A red X shows that directly editing weights is not the usual path.
* **On-Screen Text:** "data" / "loss" / "optimizer" / "not this" | Left-to-right pipeline | Ink / Crimson
* **Animation Sequence:**
  1. `[01:00.0 – data]` Three boxes draw in sequence.
  2. `[01:08.0 – optimizer]` Arrows connect them to a small network.
  3. `[01:18.0 – not]` A direct weight-edit arrow is crossed out.
* **Post-Animation Hold:** 1.8 s.
* **Transition Out:** Fade through the Dracula background.

---

### Scene 3: Weight Space
**Audio Timestamp:** 01:28.30 – 02:06.04  
**Narration:** "The reason was simple… the weights are the model."

* **Visual Description:** A weight-space coordinate system. A point moves through it; a stamp reads "a model couldn't…" and then "add a million weights."
* **On-Screen Text:** "weight space" / "a model couldn't." / "add weights." | Center | Ink / Crimson
* **Animation Sequence:**
  1. `[01:29.0 – reason]` Axes and a cloud of weight-points draw.
  2. `[01:42.0 – weights]` A single point is circled.
  3. `[01:55.0 – add]` Stamp card pops with a small bounce.
* **Post-Animation Hold:** 2.2 s.
* **Transition Out:** Hard cut through the Dracula background.

---

### Scene 4: Reading / PPO
**Audio Timestamp:** 02:06.04 – 03:24.06  
**Narration:** "Skill one, reading… the network is basically a throttle and coast controller."

* **Visual Description:** A PPO policy network. Output nodes are labelled throttle, coast and reverse. The reverse node is crossed out. A paddle-and-bricks Breakout diagram follows.
* **On-Screen Text:** "reading." / "throttle" / "coast" / "never reverse" / "paddle" / "bricks" | Around network and game board | Ink / Crimson / Sage
* **Animation Sequence:**
  1. `[02:07.0 – Skill]` Network draws layer-by-layer.
  2. `[02:20.0 – throttle]` Output labels pop; reverse is crossed.
  3. `[02:50.0 – paddle]` Breakout board draws; paddle and brick rows highlight.
* **Post-Animation Hold:** 2.4 s on the paddle/bricks geometry.
* **Transition Out:** Fade through the Dracula background.

---

### Scene 5: Diffusion
**Audio Timestamp:** 03:24.06 – 03:57.76  
**Narration:** "Experiment 2… the model fills in missing pieces by denoising."

* **Visual Description:** A noisy matrix is progressively cleaned into a structured output. Edges and a head are highlighted.
* **On-Screen Text:** "noise → shape" / "edges" / "head" | Center | Ink / Sage
* **Animation Sequence:**
  1. `[03:25.0 – Experiment]` Noisy grid appears.
  2. `[03:34.0 – fills]` Cells settle into a rough image.
  3. `[03:47.0 – head]` Head region circles; final frame holds.
* **Post-Animation Hold:** 2.0 s.
* **Transition Out:** Hard cut through the Dracula background.

---

### Scene 6: Middle Layers
**Audio Timestamp:** 03:57.76 – 05:12.80  
**Narration:** "Experiment 3… only the middle layers… Astra still named the right language every time."

* **Visual Description:** Four transformer blocks float alone. Three language cards (Python, Romaji, English) appear. Copying-head arcs, a ground-truth ledger, matrix multiplication, and the missing letters Q L V X close the chapter.
* **On-Screen Text:** "only the middle layers." / "python" / "romaji" / "english" / "copying heads." / "ground truth." / "Q L V X" | Center / cards / ledger | Ink / Crimson / Sage
* **Animation Sequence:**
  1. `[03:58.0 – Experiment]` Block stack draws without input/output.
  2. `[04:10.0 – three]` Language cards pop in sequence.
  3. `[04:35.0 – copying]` Token tape and red induction arcs draw.
  4. `[05:00.0 – missing]` Alphabet row draws; Q/L/V/X are crossed.
* **Post-Animation Hold:** 2.1 s on the missing-letter row.
* **Transition Out:** Fade through the Dracula background.

---

### Scene 7: Fixing
**Audio Timestamp:** 05:12.80 – 06:33.22  
**Narration:** "Skill 2. Fixing… the car that won't climb… Astra added a small side path."

* **Visual Description:** A car and ramp. PPO stalls at the base. Astra diagnoses a throttle/coast controller, adds a green side path, backs the car up, and patches 3.5% of the weights.
* **On-Screen Text:** "fixing." / "local minimum." / "one try." / "side path." / "100%" / "3.5%" | Center and around car/ramp | Ink / Crimson / Sage
* **Animation Sequence:**
  1. `[05:13.0 – Skill]` Title and car/ramp draw.
  2. `[05:30.0 – local]` Car stalls; red impact marks appear.
  3. `[05:55.0 – side]` Green path threads through four layers.
  4. `[06:15.0 – 100%]` Result bars fill; 3.5% patch closes.
* **Post-Animation Hold:** 2.4 s on the 3.5% patch.
* **Transition Out:** Fade through the Dracula background.

---

### Scene 8: Subscribe Pause
**Audio Timestamp:** 06:33.22 – 06:49.12  
**Narration:** "Quick pause… if you're getting something out of this video, please subscribe."

* **Visual Description:** A hand-drawn subscribe button with a red play triangle. Astra points at it. The ask reduces to "2 seconds / free / helps."
* **On-Screen Text:** "quick pause." / "subscribe" / "2 seconds." / "it's free." / "it helps." | Center | Ink / Crimson / Sage
* **Animation Sequence:**
  1. `[06:33.0 – Quick]` Title and Astra draw.
  2. `[06:35.0 – subscribe]` Button pops with the play triangle.
  3. `[06:43.0 – 2 seconds]` Three short ask lines stack.
* **Post-Animation Hold:** 1.6 s.
* **Transition Out:** Hard cut through the Dracula background.

---

### Scene 9: Writing from Scratch
**Audio Timestamp:** 06:49.12 – 08:15.14  
**Narration:** "Skill 3… zero weights… Astra scored 517.4 in Breakout."

* **Visual Description:** Three Minotaur game icons, a zero matrix, a Python sandbox, and score bars for Breakout, Sequest and Asterix. A "three for three" check row follows.
* **On-Screen Text:** "zero weights." / "no data / loss / gradients." / "one reply." / "517.4" / "3 / 3" | Center and score rows | Ink / Crimson / Sage
* **Animation Sequence:**
  1. `[06:50.0 – Skill]` Game icons and zero matrix draw.
  2. `[07:04.0 – no data]` Crossed data/loss/gradients labels pop.
  3. `[07:13.0 – scores]` Score bars fill; Astra bar is sage.
  4. `[07:55.0 – three]` Three checks draw.
* **Post-Animation Hold:** 2.2 s.
* **Transition Out:** Fade through the Dracula background.

---

### Scene 10: Go
**Audio Timestamp:** 08:15.14 – 09:23.40  
**Narration:** "Experiment 6… a Go network with 1.5 million parameters… Astra built the network layer by layer."

* **Visual Description:** A Go board, layer profile (243 → 6×512 → 82), a sandbox meter, 85/96 token-limit grid, layers 15 and 19, and a 0.016% patch. The chapter ends with the layer roles and a programmer's loop.
* **On-Screen Text:** "go." / "1.5M parameters." / "too big for context." / "85 / 96" / "0.016%" / "a programmer's loop." | Center | Ink / Crimson / Sage
* **Animation Sequence:**
  1. `[08:15.0 – Experiment]` Go board and layer profile draw.
  2. `[08:27.0 – too big]` Context box is crossed.
  3. `[08:41.0 – 85/96]` Token grid fills; limit label pops.
  4. `[09:05.0 – layers]` L15/L19 highlight; MLP arrow appears.
  5. `[09:17.0 – loop]` Four-step loop closes.
* **Post-Animation Hold:** 2.0 s.
* **Transition Out:** Hard cut through the Dracula background.

---

### Scene 11: Spot the Sycophant
**Audio Timestamp:** 09:23.40 – 10:11.34  
**Narration:** "Spot the sycophant… it won 73% of the time without running the model."

* **Visual Description:** A chat prompt, a biased answer and an honest answer. Astra picks the biased one. Two representation spaces (same-as-request / plausibility) collide, then are untangled and resampled.
* **On-Screen Text:** "spot the sycophant." / "73%" / "two spaces." / "collision." / "untangle. resample. run." | Center | Ink / Crimson / Sage
* **Animation Sequence:**
  1. `[09:24.0 – safety]` Network with hidden red node; magnifier draws.
  2. `[09:36.0 – biased]` Chat cards pop; Astra picks the red answer.
  3. `[09:48.0 – 73%]` Big number and bar.
  4. `[09:57.0 – two spaces]` Two planes draw; collision spark.
  5. `[10:05.0 – untangle]` Tangle straightens; prompt resamples.
* **Post-Animation Hold:** 1.8 s.
* **Transition Out:** Fade through the Dracula background.

---

### Scene 12: Finding an Evil Thread
**Audio Timestamp:** 10:11.34 – 11:12.92  
**Narration:** "Finding an evil thread… 33 seconds later, that thread was chewed up."

* **Visual Description:** A long chat scroll, a highlighted seller message, a code sample with `process.listen`, a call chain message → code → repost() → process(), and a missing assertion. The final flag is a single line.
* **On-Screen Text:** "a complex chat." / "the seller message." / "process listening." / "the missing assertion." / "flagged." / "33 seconds." | Center and beside code | Ink / Crimson / Sage
* **Animation Sequence:**
  1. `[10:12.0 – complex]` Chat scroll draws; star magnifier.
  2. `[10:22.0 – seller]` Seller bubble and code card draw.
  3. `[10:34.0 – call chain]` Four-node chain draws.
  4. `[10:44.0 – missing]` Code and assert diagram; red X.
  5. `[10:52.0 – flagged]` Single code line and flag.
  6. `[10:56.0 – 33]` Clock and big number.
* **Post-Animation Hold:** 2.0 s on 33 seconds.
* **Transition Out:** Hard cut through the Dracula background.

---

### Scene 13: Limits of Weights Alone
**Audio Timestamp:** 11:12.92 – 12:14.26  
**Narration:** "From the weights alone, Astra failed… editing weights can remove an obstacle, but it can't add an ability."

* **Visual Description:** Two Gemma copies (honest / sycophant), frozen embeddings and output, a "failed" stamp, four failed tries, tiny edits, and an attention-head comparison (94% question vs 86% user answer). The lesson is a wall/door vs a blank wall.
* **On-Screen Text:** "failed." / "no single switch." / "94%" / "86%" / "remove an obstacle" / "can't add an ability" | Center | Ink / Crimson / Sage
* **Animation Sequence:**
  1. `[11:13.0 – two copies]` Two model cards draw.
  2. `[11:20.0 – failed]` Big red "failed." and four X pairs.
  3. `[11:31.0 – tiny]` One matrix cell highlights; ×2.
  4. `[11:40.0 – 94%]` Attention bars draw.
  5. `[11:58.0 – lesson]` Wall/door and blank wall panels.
* **Post-Animation Hold:** 2.4 s.
* **Transition Out:** Fade through the Dracula background.

---

### Scene 14: Math for a Small Language Model
**Audio Timestamp:** 12:14.26 – 14:40.78  
**Narration:** "Quen 3.5 0.8B… the base model scored 7.9%… it loops… the results with 50 forward passes."

* **Visual Description:** Model card, Python notebook, Math 500, a multi-step problem, 7.9%, a looping text card, 85/96 token-limit grid, layers 15/19, 64-column patch, then score jumps: Math 500 7.9→48.1, GSM8K 13.8→67.1, IF eval 21→62.3 and token limit 93→33.
* **On-Screen Text:** "bad at math." / "it loops." / "85 / 96" / "0.016%" / "7.9% → 48.1%" / "13.8% → 67.1%" / "21% → 62.3%" | Center and score rows | Ink / Crimson / Sage
* **Animation Sequence:**
  1. `[12:15.0 – notebook]` Model card and code window.
  2. `[12:29.0 – Math 500]` 500 + problem cards.
  3. `[12:49.0 – 7.9%]` Score; then loop card.
  4. `[13:03.0 – 85/96]` Token grid.
  5. `[13:11.0 – layers]` L15/L19 and 0.016% patch.
  6. `[13:31.0 – results]` Score pairs fill.
* **Post-Animation Hold:** 2.6 s on IF eval result.
* **Transition Out:** Fade through the Dracula background.

---

### Scene 15: Where It Fails
**Audio Timestamp:** 14:40.78 – 15:42.88  
**Narration:** "Gemma rarely loops… ordinary mistakes… weights alone have limits."

* **Visual Description:** Gemma 270M card, 8.5% token-limit bar, bad arithmetic / wrong algebra cards, scattered red nodes, a tiny ×2 edit, "not established" report, and the obstacle/ability lesson.
* **On-Screen Text:** "8.5%" / "ordinary mistakes." / "no single switch." / "not established." / "a fix, not a smarter model." | Center | Ink / Crimson / Sage
* **Animation Sequence:**
  1. `[14:41.0 – Gemma]` Model card and 8.5% bar.
  2. `[14:55.0 – mistakes]` Two error cards; red X.
  3. `[15:04.0 – no switch]` Scattered red nodes.
  4. `[15:14.0 – not established]` Report card and stamp.
  5. `[15:28.0 – lesson]` Obstacle/ability panels.
* **Post-Animation Hold:** 2.0 s.
* **Transition Out:** Hard cut through the Dracula background.

---

### Scene 16: Why It Matters
**Audio Timestamp:** 15:42.88 – 17:21.00  
**Narration:** "Why does this matter?… the next optimizer might be a model that reads the weights, reasons about them, and edits them on purpose… would you trust a model to edit another model's weights?"

* **Visual Description:** Four future cards (audit / optimize / steer / merge), auditing, one-shot optimization, tiny edits, circuit merging, recursive self-improvement, Adam/Muon → read/reason/edit, early-days blog post, and a closing question card.
* **On-Screen Text:** "why does this matter?" / "audit" / "optimize" / "steer" / "merge" / "recursive self-improvement." / "the next optimizer." / "how far?" | Center and four-card row | Ink / Crimson / Sage
* **Animation Sequence:**
  1. `[15:43.0 – why]` Title and four cards.
  2. `[15:49.0 – audit]` Network + test sheet.
  3. `[16:02.0 – optimize]` Pipeline → one-shot edit.
  4. `[16:11.0 – steer]` Add/remove matrices.
  5. `[16:24.0 – merge]` Circuit moves between architectures.
  6. `[16:35.0 – recursive]` Model/weights loop; training job crossed.
  7. `[16:46.0 – optimizer]` Adam/Muon → read/reason/edit.
  8. `[17:01.0 – early]` Blog post card.
  9. `[17:06.0 – read]` Network + "how far?"
  10. `[17:14.0 – question]` Closing question and comments card.
* **Post-Animation Hold:** 2.2 s on the final question.
* **Transition Out:** Fade through the Dracula background / end.

---

## Render Notes

- Preview stills: `preview/` (per-chapter stills) and `preview/contact-sheet.png`.
- Render the full film with:
  ```bash
  npx remotion render AstraWeightSpace out/astra-weight-space.mp4
  ```
- Google Colab: open `AstraWeightSpace_Colab.ipynb`; cell 2 accepts a ZIP of the project and loads it in one step.
- The project intentionally does not include a rendered final MP4.
