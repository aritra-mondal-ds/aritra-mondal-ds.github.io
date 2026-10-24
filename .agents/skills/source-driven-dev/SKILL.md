---
name: source-driven-dev
description: "Enforces strict documentation and source grounding before writing code. Forbids generating code from fuzzy model training memory for frontend libraries (GSAP, Three.js, Tailwind, Next.js); mandates fetching current official documentation, release notes, or repository source files."
version: 1.0.0
category: quality-guardrails
tags: [grounding, documentation, zero-hallucination, verification, api-reference, anti-hallucination]
---

# Source-Driven Development Skill

The `source-driven-dev` skill mandates that all code generation must be anchored in verified, up-to-date documentation and official source repositories rather than relying on stale or hallucinated model training memory.

---

## 1. When to Use This Skill

- Whenever writing code for rapidly evolving libraries (e.g., Next.js 14/15 App Router, Tailwind CSS v4, GSAP v3, Three.js r160+, React 19).
- Whenever invoking specialized plugins or third-party APIs whose method signatures frequently change.
- Whenever diagnosing cryptic import errors, deprecation warnings, or broken builds.

---

## 2. Core Protocol: The 3-Step Grounding Loop

1. **Step 1: Check Memory Freshness:**
   - If the task involves a library where API drift is common (e.g., GSAP `useGSAP` hook, Lenis smooth scroll options, Tailwind v4 CSS directives), the agent must NOT write code immediately.
2. **Step 2: Retrieve Upstream Source or Live Docs:**
   - Use the `web_search` or `web-research-scraper` tool to pull the exact official documentation, GitHub README, or release notes for the target library version.
3. **Step 3: Ground Code in Concrete Snippets:**
   - Use the verified signatures, import statements, and configuration options directly from the fetched reference. Cite the official source in code comments where helpful.

---

## 3. Strict Rules

- **No Deprecated APIs:** Never use deprecated APIs (e.g., using `useEffect` instead of `useGSAP` for GSAP animations, or using old Three.js geometry constructors).
- **Exact Import Verification:** Always verify whether an export is default or named before writing import statements.
- **Fail Fast on Ambiguity:** If documentation is contradictory or unclear, create a minimal reproduction scratch file in the workspace to verify behavior before committing code.
