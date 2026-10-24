# Aritra Mondal — Data Science & Machine Learning Portfolio

High-performance, modern personal portfolio website engineered for **Aritra Mondal**, Data Scientist targeting top-tier opportunities in France and the European tech ecosystem (Scale-ups, AI Startups, Enterprise Data Teams).

---

## 🚀 Key Highlights & French Tech Market Alignment

- **French Recruiter Signals**: Dedicated recruiter badges displaying:
  - 🎓 **Education**: *Applied MSc in Data Science & AI (Summa Cum Laude, Bac+5)* + *BSc (Hons) Computer Security*.
  - 📍 **Location & Mobility**: *Biarritz, France (Mobile for Paris, Sophia Antipolis, Lyon, Hybrid & Remote)*.
  - 🛂 **Work Authorization**: *Authorized to work in France (Titre de séjour / Full legal working rights)*.
  - 🗣️ **Languages**: *English (Native / C2)* | *French (Professional / B1-B2)*.
  - 💼 **Enterprise Track Record**: *Amadeus (Airline demand forecasting, distributed Spark/Scala on AWS EMR)*.
- **Bento Grid Skills Architecture**: Domain-partitioned stack (Machine Learning & Deep Learning, Big Data & Distributed Systems, Cloud Infrastructure & MLOps, Security & Networking) with verified certifications (Neo4j Certified, Fortinet, AWS Solutions Architect).
- **Featured 4-Card Showcase**: Structured strictly around **Problem $\to$ Solution $\to$ Production $\to$ Business Impact** with quantifiable metrics:
  1. *Production Airline Demand Forecasting & Distributed ML (Amadeus)*: 35% PySpark $\to$ Scala speedup.
  2. *Multi-Asset Financial Time-Series & Deep RL Engine*: 73+ engineered alpha features & walk-forward CV.
  3. *Predictive Recommendation & Rating Regression Engine*: 10k+ observations, SHAP explainability.
  4. *High-Throughput Network IDS & Traffic Classifier*: SNORT heuristic optimization, 20% false positive reduction.
- **Interactive Recruiter Terminal**: CLI widget allowing recruiters to run `$ curl -s /profile | jq .`, inspect metrics, and copy structured JSON in one click.
- **Career Timeline**: Quantified achievements using Google's XYZ format (*"Accomplished [X] measured by [Y] doing [Z]"*).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server & Client Components, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with `@tailwindcss/typography`
- **Theme**: `next-themes` (Dark/Light mode with system-aware default to deep `#09090b` zinc)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG brand glyphs
- **Animation**: [Framer Motion](https://www.framer.com/motion/) micro-interactions

---

## 📁 Project Architecture & Content Management

Content is cleanly decoupled from presentation in the [`data/`](./data) directory so you can update text, projects, or metrics in seconds:

```text
├── app/
│   ├── globals.css           # Tailwind CSS theme variables (zinc/slate & glow accents)
│   ├── layout.tsx            # Global metadata, OpenGraph, SEO, ThemeProvider
│   └── page.tsx              # Assembled homepage
├── components/
│   ├── bento-skills.tsx       # Domain-driven Bento grid of competencies & certifications
│   ├── contact-section.tsx    # Direct contact cards (one-click email/phone copy & Calendly)
│   ├── experience-timeline.tsx# Interactive timeline with XYZ quantified bullet points
│   ├── footer.tsx             # Minimalist developer footer
│   ├── hero.tsx               # High-impact Hero with French recruiter signal badges
│   ├── icons.tsx              # Clean SVG icons
│   ├── interactive-terminal.tsx# CLI terminal simulator with quick-action commands
│   ├── navbar.tsx             # Floating glassmorphism navbar with CV download button
│   ├── project-card.tsx       # Problem -> Solution -> Production -> Impact showcase
│   ├── projects-section.tsx   # Project grid with category filtering
│   ├── theme-provider.tsx     # Theme state management
│   └── theme-toggle.tsx       # Smooth dark/light switch
├── data/
│   ├── experience.ts          # Work history & degrees with quantified XYZ achievements
│   ├── profile.ts             # Bio, headline, contact info, recruiter signal badges
│   ├── projects.ts            # Detailed project showcases & metrics
│   └── skills.ts              # Categorized skills, tools, and certifications
├── types/
│   └── index.ts               # Strict TypeScript interfaces
└── public/
    └── cv.pdf                 # PDF download artifact
```

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build optimized static output
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment

### Deploy to Vercel
1. Push this repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. The Next.js 15 build settings are auto-detected (`npm run build`).

### Deploy to GitHub Pages (Static Export)
The `next.config.ts` is configured with `images: { unoptimized: true }`, ready for static export:
```bash
npm run build
# Output is ready in .next / out
```
