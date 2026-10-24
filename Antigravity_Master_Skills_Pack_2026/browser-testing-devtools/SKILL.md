---
name: browser-testing-devtools
description: "Automated responsive breakpoint auditing, visual regression, and console error detection. Runs headless browser passes across Mobile (375px), Tablet (768px), and Desktop (1920px), verifies touch target compliance (>48px), and audits runtime console errors."
version: 1.0.0
category: quality-assurance
tags: [qa, testing, responsive, breakpoints, devtools, console-audit, accessibility]
---

# Browser Testing with DevTools

The `browser-testing-devtools` skill provides an automated quality gate for web applications by inspecting rendered layouts, responsive breakpoints, and runtime browser health using the Chrome DevTools protocol.

---

## 1. When to Use This Skill

- After building or refactoring any web page, component, or layout.
- Before declaring a frontend task complete.
- When verifying that animations, canvas elements, and smooth scrolling perform without jank or horizontal overflow on small screens.

---

## 2. Standard 3-Breakpoint Audit Protocol

Whenever testing a local web page (`http://localhost:...`), execute the following automated audit:

### 1. Viewport Matrix Checks
Test the page sequentially across three standardized viewports:
- **Mobile (iPhone SE / Small):** `375px × 667px`
- **Tablet / Small Laptop:** `768px × 1024px`
- **Desktop (High-DPI):** `1920px × 1080px`

### 2. Automated Defect Checklist
For each viewport:
- **Horizontal Overflow:** Verify `document.documentElement.scrollWidth <= window.innerWidth`. Any horizontal scrollbar on mobile is a critical defect.
- **Touch Target Sizing:** Ensure all interactive buttons, links, and hamburger menus have a minimum hit area of `48px × 48px`.
- **Typography Readability:** Verify base body text is at least `16px` on mobile with minimum line-height of `1.5`.
- **Console Health:** Inspect `console.error` and `console.warn` streams. Zero unhandled promise rejections or 404 resource errors allowed.

---

## 3. Reporting Format

Deliver audit results to the user as a concise pass/fail summary:

```markdown
### 📱 Responsive QA Report: [Page Name]
- **Mobile (375px):** ✅ PASS (Zero overflow, hamburger navigation functional)
- **Tablet (768px):** ✅ PASS (Grid adapts to 2-column layout cleanly)
- **Desktop (1920px):** ✅ PASS (60fps canvas animation, zero dropped frames)
- **Console Errors:** ✅ 0 Errors detected
```
