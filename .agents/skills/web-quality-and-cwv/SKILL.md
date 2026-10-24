---
name: web-quality-and-cwv
description: "Optimizes Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1), critical rendering paths, modern image pipelines (AVIF/WebP), font loading, and bundle ergonomics."
version: 1.0.0
category: performance
tags: [cwv, core-web-vitals, lcp, inp, cls, web-performance, lighthouse, critical-css, image-optimization]
---

# Web Quality & Core Web Vitals (CWV) Skill

Use this skill whenever building, profiling, or optimizing web applications for production speed, high Lighthouse scores (95+), and Google Core Web Vitals compliance.

---

## 1. Core Web Vitals Thresholds & Targets

```
┌───────────────────────────┬──────────────┬──────────────┬──────────────┐
│ Metric                    │ Good (Green) │ Needs Work   │ Poor (Red)   │
├───────────────────────────┼──────────────┼──────────────┼──────────────┤
│ LCP (Largest Contentful)  │ ≤ 2.5 s      │ 2.5 s - 4.0 s│ > 4.0 s      │
│ INP (Interaction to Paint)│ ≤ 200 ms     │ 200 - 500 ms │ > 500 ms     │
│ CLS (Cumulative Shift)    │ ≤ 0.1        │ 0.1 - 0.25   │ > 0.25       │
└───────────────────────────┴──────────────┴──────────────┴──────────────┘
```

Failing Core Web Vitals hurts search engine rankings (SEO), degrades conversion rates, and creates poor user experiences.

---

## 2. Largest Contentful Paint (LCP) Optimization

LCP measures when the largest visual element in the initial viewport renders.

### The 4 Sub-parts of LCP:
1. **Time to First Byte (TTFB):** Edge caching, CDN termination, SSR stream optimization.
2. **Resource Load Delay:** Preload hero images immediately in `<head>`:
   ```html
   <link rel="preload" as="image" href="/hero.avif" fetchpriority="high" type="image/avif" />
   ```
3. **Resource Load Duration:** Compress images using modern next-gen formats (AVIF/WebP) sized to the exact viewport.
4. **Element Render Delay:** Avoid client-side hydration gates before rendering hero text.

### Anti-Patterns to Eliminate:
- ❌ Putting `loading="lazy"` on the hero image or above-the-fold banner (delays LCP by up to 2 seconds).
- ❌ Hiding text with web fonts while loading (`font-display: block`). Use `font-display: swap` or `optional`.
- ❌ Heavy JavaScript bundles blocking the main thread before HTML elements are painted.

---

## 3. Interaction to Next Paint (INP) Optimization

INP measures responsiveness to clicks, taps, and keyboard inputs across the entire user session.

### The INP Reduction Strategy:
1. **Break Up Long Tasks (> 50ms):**
   Use `scheduler.yield()` or `requestIdleCallback` to return control to the main thread during heavy computations:
   ```typescript
   async function processLargeDataChunked(items: Item[]) {
     for (let i = 0; i < items.length; i++) {
       processItem(items[i]);
       if (i % 50 === 0 && 'scheduler' in window && 'yield' in window.scheduler) {
         await window.scheduler.yield(); // Allow user input to be processed
       }
     }
   }
   ```
2. **Debounce / Throttle Frequent Handlers:**
   Throttle high-frequency scroll, resize, and keystroke events.
3. **Offload Heavy Computation to Web Workers:**
   Keep sorting, encryption, AST parsing, and heavy math off the main thread.

---

## 4. Cumulative Layout Shift (CLS) Optimization

CLS measures unexpected visual shifts during page loading.

### Mandatory CLS Guardrails:
1. **Explicit Dimensions on Media:**
   Always declare `width`, `height`, or `aspect-ratio` on `<img>`, `<video>`, and `<iframe>` elements:
   ```html
   <!-- Browser reserves exact layout box before pixels load -->
   <img src="/card.webp" width="640" height="360" alt="Card Preview" style="width: 100%; height: auto;" />
   ```
2. **Reserve Space for Dynamic Injections:**
   Reserve container height for client-injected ads, banners, or toast alerts:
   ```css
   .ad-slot-container {
     min-height: 250px;
   }
   ```
3. **Font Fallback Metric Matching:**
   Match fallback system fonts to custom web fonts using `size-adjust`, `ascent-override`, and `descent-override` to avoid text re-flow jumps:
   ```css
   @font-face {
     font-family: 'FallbackFont';
     src: local('Arial');
     ascent-override: 95%;
     descent-override: 25%;
     line-gap-override: 0%;
     size-adjust: 102%;
   }
   ```

---

## 5. Modern Media Pipeline (AVIF / WebP + Responsive Sizes)

Never serve uncompressed PNG or raw JPEG images over 100KB to client browsers.

```html
<picture>
  <!-- Modern high-compression AVIF (smallest file size) -->
  <source srcset="/hero-400.avif 400w, /hero-800.avif 800w, /hero-1200.avif 1200w" type="image/avif" sizes="(max-width: 768px) 100vw, 1200px" />
  <!-- Universal modern WebP fallback -->
  <source srcset="/hero-400.webp 400w, /hero-800.webp 800w, /hero-1200.webp 1200w" type="image/webp" sizes="(max-width: 768px) 100vw, 1200px" />
  <!-- Legacy fallback -->
  <img src="/hero-800.jpg" alt="Hero Banner" width="1200" height="600" fetchpriority="high" decoding="async" />
</picture>
```

---

## 6. Critical CSS & Code Splitting

1. **Inline Critical Above-The-Fold CSS:**
   Inline essential layout styling directly into `<head><style>...</style></head>`.
2. **Defer Non-Critical Stylesheets:**
   ```html
   <link rel="preload" href="/print-or-secondary.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
   <noscript><link rel="stylesheet" href="/print-or-secondary.css"></noscript>
   ```
3. **Route-Level Code Splitting:**
   Wrap secondary routes and modals in `React.lazy()` or dynamic `import()` to ensure initial bundle size stays under **150KB gzipped**.
