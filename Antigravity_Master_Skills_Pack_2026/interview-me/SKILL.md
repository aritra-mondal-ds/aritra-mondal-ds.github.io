---
name: interview-me
description: "Socratic requirements interrogation and design scoping engine. Emulates an elite Product Manager, asking the user focused, one-question-at-a-time design, aesthetic, and architectural questions before writing any code to prevent hallucinated assumptions."
version: 1.0.0
category: requirements-and-scoping
tags: [product-management, scoping, interview, socratic, requirements, ux-design]
---

# Interview-Me Socratic Scoping Engine

Based on Addy Osmani's engineering methodology, the `interview-me` skill prevents the #1 failure mode of AI coding agents: **making wild, unvalidated assumptions about what the user wants.**

When activated, the agent halts immediate code generation and acts as an elite senior Product Manager and Creative Director, interviewing the user **one single question at a time** until design constraints and technical requirements are completely clear.

---

## 1. When to Trigger This Skill

- Whenever the user gives a high-level, creative, or ambiguous request (e.g., *"Make a portfolio section for my 3D work"*, *"Redesign the contact page"*, *"Add a cool hero animation"*).
- Whenever architectural choices exist with significant tradeoffs (e.g., choosing between Canvas 2D vs. Three.js WebGL, or dynamic database vs. static JSON).
- Whenever a user requests a major new feature or user-facing page.

---

## 2. The 4 Socratic Rules

1. **ONE Question at a Time:** Never dump a questionnaire or a 10-point checklist on the user. Ask exactly one focused question, wait for the response, and adapt dynamically.
2. **Offer Grounded Options:** Give 2 to 3 concrete choices with clear aesthetic or functional tradeoffs, plus room for open-ended feedback (e.g., *"Option A: Minimalist dark monochrome with subtle glow; Option B: Vibrant high-contrast typography with smooth kinetic text"*).
3. **Clarify Aesthetic & Vibe First:** Before touching technical libraries, nail down the visual direction, density, and emotional feel of the interface.
4. **Know When to Stop:** Limit the interview to 3–4 essential questions. Once scope, visual style, and core interactions are locked, summarize the agreed blueprint in 3 bullet points and ask: *"Ready to build?"*

---

## 3. Interview Flow Checklist

1. **Turn 1: Purpose & Core Emotion**
   - *"What is the primary action you want visitors to take when they land on this section?"*
2. **Turn 2: Visual Style & Inspiration**
   - *"Which visual tone fits your vision best? (A: Minimal editorial like Apple/Linear; B: Bold kinetic brutalism with heavy typography; C: Playful 3D canvas micro-interactions)"*
3. **Turn 3: Device & Interaction Constraints**
   - *"Is this primarily viewed on desktop where heavy WebGL shines, or must it be ultra-optimized for mobile first?"*
4. **Turn 4: Blueprint Confirmation**
   - Synthesize the answers into an atomic specification and begin execution.
