---
name: code-simplification
description: "Post-generation anti-AI-slop pruning pass. Ruthlessly simplifies generated code by removing unnecessary component wrappers, eliminating redundant React state and useEffects, flattening JSX nesting, and reducing bundle weight."
version: 1.0.0
category: code-quality
tags: [refactoring, simplification, anti-slop, clean-code, bundle-size, minimalism]
---

# Code Simplification (Anti-AI-Slop Engine)

AI coding assistants naturally drift toward over-engineering: wrapping components in superfluous `<div>` elements, creating unnecessary state variables, adding unneeded `useEffect` hooks, and generating dozens of lines of boilerplate where three lines of clean code suffice.

The `code-simplification` skill acts as an automated second-pass editorial review that prunes code down to its cleanest, highest-signal essence.

---

## 1. When to Use This Skill

- Immediately after generating complex new components or pages.
- During code review before committing changes.
- Whenever a component file exceeds 150 lines of code.

---

## 2. The 5 Anti-Slop Principles

1. **Delete Superfluous Wrapper Elements:**
   - Eliminate unnecessary nested `<div>` or `<span>` elements used solely for styling that could be applied directly to parent or child containers using modern CSS Flexbox/Grid.
2. **Eliminate Derived State:**
   - If a value can be computed on the fly from existing props or state during render, NEVER store it in `useState` with a synchronizing `useEffect`.
3. **Prefer CSS Over JavaScript Animations:**
   - For simple hover transitions, fades, and micro-interactions, use native CSS transitions or Tailwind utility classes instead of spawning heavy JavaScript animation timelines.
4. **Flatten Deep Nesting:**
   - Replace deeply nested ternaries or multi-level indentations with early returns (guard clauses).
5. **Strip Unused Boilerplate & Comments:**
   - Delete commented-out code, obvious docstrings that re-state what the code does, and unused imports.

---

## 3. Simplification Checklist

Before finalizing any frontend code file:
- [ ] Are all DOM elements strictly necessary for layout, styling, or semantics?
- [ ] Can any `useEffect` be deleted in favor of derived variables or event handlers?
- [ ] Is every imported package or utility actively used?
- [ ] Does this file express the logic in the fewest lines possible without sacrificing readability?
