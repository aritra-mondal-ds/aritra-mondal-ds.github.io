---
name: impeccable
description: "Production frontend design engine and anti-AI-slop framework by Paul Bakaus. Use when designing, building, auditing, or refactoring user interfaces, web applications, or landing pages that require design system rigor, stateful tokens (PRODUCT.md/DESIGN.md), 23-command verbs (/shape, /polish, /quieter, /bolder), OKLCH color harmonics, or scored 0-20 UI audits."
version: 1.0.0
category: frontend-design
tags: [ui, ux, design-system, anti-slop, oklch, styling, audit, frontend, web]
---

# Impeccable: Production Frontend Design Engine

The **Impeccable** skill transforms AI coding agents from generic "vibe coders" into disciplined frontend engineers by enforcing durable design tokens, a 23-command design continuum, and deterministic anti-slop rules.

---

## 1. When to Use Impeccable vs. Taste-UI-Design

* **Use `taste-ui-design`:** For lightweight styling, single-component tweaks, or general aesthetic sanity checks without project-level tokens.
* **Use `impeccable`:** For complete frontend apps, landing pages, design systems, UI audits, or whenever the user asks for high-fidelity production interfaces or uses Impeccable verbs (`/shape`, `/polish`, `/quieter`, `/bolder`, `/audit`).

---

## 2. The Core State Anchors: `PRODUCT.md` & `DESIGN.md`

Before generating complex frontend interfaces, check if `PRODUCT.md` and `DESIGN.md` exist at the project root. If not, briefly propose initializing them or generate lean defaults:

### `PRODUCT.md` (Product Truth & Tone)
```markdown
# Product Truth
- Audience: [Target user type]
- Emotional Tone: [e.g. Clinical precision, unadorned, high density, or warm editorial]
- Non-Negotiables: [Key visual and functional constraints]
```

### `DESIGN.md` (Design Tokens & Color Harmonics)
* **Color Space:** Mandate **OKLCH** color coordinates for uniform perceptual lightness across light and dark modes.
* **Tinted Neutrals:** Never use flat zinc/gray. Neutrals must carry a subtle chroma tint of the brand accent:
  - Dark: `oklch(0.14 0.015 240)`
  - Light: `oklch(0.98 0.005 240)`
* **Modular Typography Scale:** Ratio 1.25 (Major Third) or 1.333 (Perfect Fourth).
* **Spatial Discipline:** Strict 8px multiples (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`).

---

## 3. The Command Continuum

Respond directly when the user invokes these verbs (or apply their principles during multi-turn design workflows):

| Command Verb | Execution Protocol |
| :--- | :--- |
| **`/shape`** | **UX & Structural Layout Wireframing:** Focus exclusively on grid architecture, content hierarchy, and information density. Do not style colors or shadows. Output clean semantic HTML and layout containers. |
| **`/craft`** | **High-Fidelity Generation:** Build components strictly adhering to `DESIGN.md` tokens. |
| **`/polish`** | **Micro-Refinement:** Calibrate baseline typography, ensure horizontal button padding is 1.5x vertical padding, and apply subtle micro-transitions (`duration-150 ease-out`). |
| **`/quieter`** | **Noise Reduction:** Soften visual competition. Dim secondary badge borders, replace full-color icons with muted monochrome icons, and reduce card border contrast. |
| **`/bolder`** | **Drama & Hierarchy:** Elevate primary heading scale contrast, deepen primary accent saturation, and isolate the primary CTA. |
| **`/typeset`** | **Typographic Calibration:** Enforce font pairing (editorial header + clean UI sans), line length 60–75 characters, and negative tracking on bold headers (`-0.025em`). |
| **`/audit`** | **QA Evaluation:** Run the 0–20 Scored Rubric. |

---

## 4. Deterministic Anti-Slop Rules (Strict Heuristic Blacklist)

Reject and immediately correct any of the following AI tropes:
1. ❌ **Floating Icon Pills:** Never center a floating rounded circular icon badge above section headers.
2. ❌ **Unanchored Gradients:** Never apply neon purple-to-cyan or pink gradients across cards. Gradients must be subtle, monochromatic ambient glows or directional depth cues.
3. ❌ **Nested Card Clutter:** Never place rounded bordered cards inside rounded bordered cards inside another container.
4. ❌ **Arbitrary Radii:** Do not mix `rounded-sm`, `rounded-xl`, and `rounded-full` without semantic distinction. (Use 6px for controls, 10px for cards).
5. ❌ **Low-Contrast Text:** Secondary text must strictly pass WCAG AA (minimum 4.5:1 contrast on its actual rendered background).
6. ❌ **Inter-Only Monotony:** Pair clean UI text with a distinguished heading font (e.g., Cabinet Grotesk, Outfit, Cal Sans).

---

## 5. The 0–20 Scored UI Audit Rubric

When asked to audit or before finalizing a major frontend component, score the UI across 4 categories (0–5 points each):

1. **Contrast & Legibility (0–5):** All text meets WCAG AA; dark mode is crisp, not muddy.
2. **Spatial Discipline (0–5):** Strict 8px grid; no arbitrary magic numbers (`mt-[17px]`).
3. **Typographic Hierarchy (0–5):** Clear visual distinction between titles, subtitles, body, and captions.
4. **Anti-Slop Compliance (0–5):** Completely free from generic AI design clichés.

*Report format:* **Total Score: X/20**, followed by prioritized fix tags (`[P0 - Blocker]`, `[P1 - High]`, `[P2 - Polish]`).
