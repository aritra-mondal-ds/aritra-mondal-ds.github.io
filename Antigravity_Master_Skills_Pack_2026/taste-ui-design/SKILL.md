---
name: taste-ui-design
description: "Applies high-taste visual design standards, typography pairing, micro-interactions, dark/light contrast rules, spacing discipline, and responsive accessibility to web and frontend interfaces, avoiding generic AI templates."
version: 1.0.0
category: design
tags: [ui, ux, design, taste, css, frontend, styling, typography, layout, animation]
---

# High-Taste UI & Modern Web Design Skill

Use this skill whenever creating, refactoring, or reviewing frontend interfaces, web applications, landing pages, dashboards, or presentation visuals.

Avoid the "generic AI aesthetic" (neon gradients, purple blobs, overcrowded cards, walls of unformatted text, and low-contrast borders). High-taste design feels intentional, calm, legible, and structured.

---

### 1. Typography & Hierarchy
- **Font Pairing:** Use maximum 2 font families:
  - Clean, modern sans-serif for UI/body (e.g. `Inter`, `Geist`, `Plus Jakarta Sans`, system-ui).
  - Editorial or sharp heading font (e.g. `Outfit`, `Cabinet Grotesk`, `Cal Sans`, or clean high-contrast sans).
- **Scale Contrast:** Ensure clear size and weight differences:
  - Hero Title: 36px – 56px, bold / extra-bold (`font-bold tracking-tight`).
  - Section Header: 24px – 32px, semi-bold (`tracking-tight`).
  - Subheadings / Card Titles: 16px – 18px, medium / semi-bold.
  - Body Text: 14px – 16px, regular (line-height 1.6 – 1.7).
  - Captions / Metadata / Badges: 11px – 12px, medium uppercase or muted regular.
- **Letter Spacing:** Apply subtle negative tracking (`letter-spacing: -0.025em` or `tracking-tight`) on large bold headings to make them feel tight and polished.

---

### 2. Spacing & Ergonomics
- **Strict Grid Multiples:** Adhere to an 8px grid (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`).
- **Breathing Room:** Cards should have generous internal padding (`24px – 36px`). Never crowd borders.
- **Content Density:** Limit paragraph line length to 60–75 characters (`max-w-2xl` or `max-w-3xl`) for optimal reading ergonomics.
- **Proximity:** Elements that belong together should be grouped tightly, separated from disparate groups with larger spacing.

---

### 3. Palette & Contrast Architecture
- **Dominant Neutral Rule:** 85–90% of the interface consists of rich neutrals:
  - Dark mode: Deep obsidian / slate blacks (`#090A0F`, `#0F1117`, `#161922`), subtle borders (`rgba(255, 255, 255, 0.08)` to `0.12`).
  - Light mode: Crisp chalk / warm alabaster neutrals (`#FAFAFA`, `#F4F5F7`), subtle borders (`#E2E8F0`).
- **Restrained Accent:** Pick ONE primary brand accent (e.g. Deep Teal, Electric Cobalt, Emerald, or Warm Bronze/Gold). Use it sparingly for primary CTAs, active indicators, and glowing highlights.
- **Soft Layered Shadows & Glows:** Avoid harsh black outlines. Use delicate, layered box-shadows or subtle radial ambient backdrops (`radial-gradient(ellipse at top, ...)`).

---

### 4. Lightweight Motion & Micro-Interactions
- **Smooth & Purposeful:** Motion must communicate state changes, not distract.
- **Micro-Interactions:**
  - Buttons: Smooth scale or background transitions on hover (`transition-all duration-200 ease-out transform hover:-translate-y-0.5 active:translate-y-0`).
  - Cards: Soft border highlight or elevation change on hover (`hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5`).
  - Scroll Animations: IntersectionObserver fade-in & slide-up (`translate-y-4 opacity-0` -> `translate-y-0 opacity-100`).
  - Interactive Tabs: Fluid indicator movement or tab switching.

---

### 5. Accessibility (WCAG 2.1 AA) & Mobile Responsiveness
- **Contrast:** Minimum 4.5:1 contrast ratio for normal text, 3:1 for large text.
- **Semantic Structure:** Proper `<header>`, `<main>`, `<nav>`, `<section>`, and `<article>` tags.
- **Mobile Touch Targets:** At least 44x44px for buttons, links, and form fields on touch viewports.
- **Zero Horizontal Overflow:** Ensure seamless wrapping across mobile (375px), tablet (768px), laptop (1024px), and ultra-wide displays (1440px+).

---

### 6. Corporate / Legacy Override Rule
If the user specifies an existing strict corporate framework (e.g., standard Bootstrap, Material UI, or enterprise brand guidelines), adhere to their brand system instead of overriding it.
