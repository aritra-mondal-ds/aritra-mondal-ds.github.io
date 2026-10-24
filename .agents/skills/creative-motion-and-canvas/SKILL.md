---
name: creative-motion-and-canvas
description: "Architects high-performance 60fps web animations, GSAP timelines, Lenis smooth scrolling, React Bits micro-interactions, Canvas 2D/WebGL shaders, and responsive creative layouts without jank or transform collisions."
version: 1.1.0
category: frontend
tags: [animation, gsap, lenis, react-bits, vanta, canvas, webgl, threejs, framer-motion, 60fps, micro-interactions, creative-dev]
---

# Creative Motion & Canvas Skill

Use this skill whenever designing or developing interactive landing pages, portfolio showcases, generative canvas visualizers, smooth scroll narratives, physics micro-interactions, or WebGL shaders.

---

## 1. The 60fps Performance Commandments
```
┌────────────────────────────────────────────────────────┐
│            THE COMPOSITOR-ONLY GOLDEN RULE             │
├────────────────────────────────────────────────────────┤
│ Animate ONLY transform and opacity.                    │
│ NEVER animate width, height, margin, padding, or top/  │
│ left in high-frequency loops—they trigger full browser │
│ layout reflows and paint thrashing, causing UI jank.   │
└────────────────────────────────────────────────────────┘
```

1. **Hardware Acceleration:** Promote complex animated elements to composite layers using `transform: translateZ(0)` or `will-change: transform`.
2. **Batch DOM Reads & Writes:** Never read layout properties (`offsetTop`, `getBoundingClientRect()`) immediately after writing styles.
3. **Target 16.6ms Budget:** Each frame must compute and draw in under 16 milliseconds to maintain a flawless 60fps experience.

---

## 2. Lenis Smooth Scroll + GSAP ScrollTrigger Synchronization

When combining smooth scrolling (Lenis) with GSAP ScrollTrigger, **never run decoupled animation loops**. Running separate RAF loops creates sub-pixel hitching and jitter during wheel acceleration.

### The Golden Integration Architecture
```typescript
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll(): Lenis {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.2,
  });

  // 1. Synchronize ScrollTrigger on every Lenis scroll tick
  lenis.on('scroll', ScrollTrigger.update);

  // 2. Drive Lenis entirely through GSAP's master ticker
  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000);
  });

  // 3. CRITICAL: Disable lagSmoothing to eliminate scroll-hitching
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
```

### Critical Friction Flags
* **CSS Conflict:** Enforce `html.lenis, html.lenis body { scroll-behavior: auto !important; }`—CSS `scroll-behavior: smooth` violently fights Lenis.
* **Anchor Links:** Never use raw `#id` jumps; route clicks through `lenis.scrollTo('#target', { offset: -50 })`.
* **Sticky Positioning:** Use GSAP `ScrollTrigger.create({ trigger: el, pin: true })` instead of CSS `position: sticky` inside transformed parent nodes.

---

## 3. GSAP in React 18/19 & Next.js (StrictMode Discipline)

In React 18/19 StrictMode, components mount $\rightarrow$ unmount $\rightarrow$ remount instantly. Standard `useEffect` setups cause duplicate timelines and memory leaks.

### The `useGSAP` Rule (Mandatory for React)
Always use `@gsap/react` with container scoping. It creates a scoped `gsap.context()` and automatically reverts animations on unmount:

```tsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.hero-title', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="hero-container">
      <h1 className="hero-title">Precision Engineering</h1>
    </div>
  );
};
```

### Club GreenSock Licensing Boundaries & Open-Source Fallbacks
* **SplitText (Club Paid) $\rightarrow$ `split-type`:** 4 KB open-source MIT library splitting text into `words` and `chars`.
* **MorphSVG (Club Paid) $\rightarrow$ `flubber`:** Airbnb's open-source vector shape interpolation engine.
* **ScrollSmoother (Club Paid) $\rightarrow$ `lenis`:** Lenis is open-source (MIT), 4x lighter, and smoother.
* **DrawSVG (Club Paid) $\rightarrow$ Native SVG:** Animate standard `stroke-dasharray` / `stroke-dashoffset` with basic GSAP.

---

## 4. React Bits Integration & Collision Prevention

React Bits provides animated components primarily powered by **Framer Motion (`motion/react`)** and Tailwind CSS.

### The Transform Collision Trap
* **The Fatal Bug:** Animating the **exact same DOM element** with both GSAP (`gsap.to(node, { x: 100 })`) and Framer Motion (`animate={{ x: 100 }}`) causes frame-fighting. Both libraries constantly overwrite the inline `style="transform: ..."` string 60 times a second.

### The Parent-Child Architecture Rule
Enforce strict physical separation:
* **Outer Wrapper (GSAP):** Handles scroll enters, pinning, and page-level layout shifts via `ref={gsapRef}`.
* **Inner Child (React Bits / Framer Motion):** Handles local hover, blur text, and tactile spring physics.

```tsx
export const CardWithReactBits = () => {
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(cardWrapperRef.current, {
      scrollTrigger: { trigger: cardWrapperRef.current, start: 'top 85%' },
      y: 50,
      opacity: 0,
      duration: 0.9,
    });
  }, { scope: cardWrapperRef });

  return (
    <div ref={cardWrapperRef} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
      {/* React Bits animated child executes locally without touching outer transform */}
      <BlurText text="Autonomous Execution" delay={40} className="text-xl font-bold" />
    </div>
  );
};
```

---

## 5. Vanta.js & WebGL Performance Standards

### The Three.js Version Trap
* Vanta.js is hard-locked to legacy Three.js (**r110–r128**). Modern Three.js (**r150–r170+**) deprecated `THREE.Geometry` in favor of `THREE.BufferGeometry`.
* Pairing Vanta.js with modern Three.js throws: `TypeError: THREE.Geometry is not a constructor`.

### Mandatory Context Cleanup
WebGL contexts are limited to 8–16 per browser window. Always call `.destroy()` on unmount:
```tsx
useEffect(() => {
  const vanta = VANTA.WAVES({ el: vantaRef.current, ...options });
  return () => {
    if (vanta) vanta.destroy(); // Releases GPU buffers and WebGL context
  };
}, []);
```

### Modern Lightweight Alternatives
* **OGL:** Nathan Gordon's ~10 KB minimal WebGL library.
* **Pure Canvas 2D:** Interactive particle systems consuming $< 5\%$ CPU and 0 KB external bundle weight.
* **CSS Radial Glows:** Pure GPU-composited CSS (`radial-gradient`, `backdrop-filter: blur()`).

---

## 6. High-Performance Canvas 2D Systems

When rendering hundreds or thousands of interactive particles, SVG/DOM nodes bog down. Use an optimized Canvas 2D engine with clean resize lifecycle and `destroy()` cleanup:

```javascript
class CanvasParticleEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animationFrameId = null;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initParticles(120);
    this.render = this.render.bind(this);
    this.render();
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
  }

  initParticles(count) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        radius: Math.random() * 2 + 1,
        color: 'rgba(56, 189, 248, 0.4)'
      });
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
    }

    this.animationFrameId = requestAnimationFrame(this.render);
  }

  destroy() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.resize);
  }
}
```

---

## 7. Tactile Micro-Interactions & Spring Physics

### Magnetic Button Interaction Formula
```javascript
const button = document.querySelector('.magnetic-btn');

button.addEventListener('mousemove', (e) => {
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Magnetic pull factor (0.3 = 30% pull towards pointer)
  const deltaX = (e.clientX - centerX) * 0.3;
  const deltaY = (e.clientY - centerY) * 0.3;

  gsap.to(button, {
    x: deltaX,
    y: deltaY,
    duration: 0.3,
    ease: 'power2.out'
  });
});

button.addEventListener('mouseleave', () => {
  gsap.to(button, {
    x: 0,
    y: 0,
    duration: 0.7,
    ease: 'elastic.out(1.2, 0.4)' // Tactile spring snapback
  });
});
```

---

## 8. Accessibility & `prefers-reduced-motion`

Animations must never induce vestibular vertigo or nausea.

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(100); // Instantly resolve timelines
}
```

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
