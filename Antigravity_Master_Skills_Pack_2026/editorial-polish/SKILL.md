---
name: editorial-polish
description: "Audits, de-slops, and humanizes written copy, bios, READMEs, articles, and documentation. Purges AI buzzwords, calculates Slop Scores (0-100), restores sentence cadence asymmetry, rations em-dashes, and converts hollow corporate jargon into crisp, authentic human prose."
version: 1.0.0
category: editorial-and-prose
tags: [humanizer, anti-slop, copy-editing, writing-style, prose, editorial, deslop]
---

# Editorial Polish: Anti-AI-Slop Prose Engine

The `editorial-polish` skill provides an on-demand editorial review pass for written text. It audits prose for telltale AI writing patterns, strips inflated buzzwords, calculates a quantitative **Slop Score (0–100)**, and rewrites copy into sharp, authentic human language.

---

## 1. When to Use This Skill

- Whenever the user asks to "humanize", "deslop", "edit", "polish", or "review" written text, bios, portfolio sections, READMEs, or articles.
- Before publishing public-facing documentation, portfolio copy, or announcements.
- Whenever text feels bloated, robotic, or full of corporate buzzwords.

---

## 2. The 4-Axis Editorial Audit

When invoked on a text block, evaluate it across four distinct axes:

### Axis 1: Lexical Jargon Scan
Flag and eliminate blacklisted AI vocabulary:
- **Inflated Verbs:** *delve, foster, elevate, harness, orchestrate, showcase, encapsulate, boast.*
  - *Replace with:* study, examine, build, run, make, use, prove.
- **Grandiose Metaphors:** *tapestry, beacon, testament, paradigm, symphony, cornerstone, landscape.*
  - *Replace with:* context, evidence, framework, environment, system.
- **Hollow Adjectives:** *pivotal, crucial, seamless, vibrant, paramount, multifaceted, bespoke, meticulously.*
  - *Replace with:* direct adjectives or delete entirely.

### Axis 2: Cadence & Burstiness Check
- **Detect Monotony:** Flag paragraphs where three or more consecutive sentences have between 16 and 22 words.
- **Enforce Asymmetry:** Inject jagged pacing. Pair a punchy 3-to-6 word sentence with a complex, detailed thought.
- **Kill the "Rule of Three":** Break formulaic 3-item lists. Use 2 items if only 2 matter, or 4 if needed.

### Axis 3: Punctuation & Syntax Prune
- **Em-Dash Rationing:** Strip clustered em-dashes (`—`). Convert to periods, commas, or parentheses. Maximum 1 em-dash per 300 words.
- **Emoji Header Purge:** Remove decorative emojis from document headings.
- **Title-Case Normalization:** Convert excessive title-case headers into clean sentence-case where appropriate.

### Axis 4: Anti-Moralizing Conclusion Rule
- Cut trailing summary conclusions that start with *"In conclusion"*, *"As we look to the future"*, or *"Ultimately, the journey of..."*. End the piece on the final concrete fact or actionable step.

---

## 3. Standard Output Format

When returning an editorial polish review, present:
1. **Slop Score:** Initial Score (0–100, where 100 is pure AI slop) vs. Final Polished Score (<15).
2. **Key Prunings:** 2–3 bullet points noting exact buzzwords and cadence patterns eliminated.
3. **Polished Copy:** The cleaned, publication-ready text.
