# Workspace Instructions & Antigravity Agent Guidelines

## 🖥️ Developer Environment Specifications
- **Hardware Target**: Apple Silicon M1 (arm64), 16GB Unified RAM, macOS (zsh).
- **IDE**: Visual Studio Code with the **Google Antigravity** extension.
- **Node Environment**: Node.js v26+ (arm64 native via Homebrew).
- **Memory & Resource Budget**:
  - Keep development processes lean to preserve RAM headroom for VS Code and browser DevTools.
  - Run development server with native Turbopack: `npm run dev` (`next dev --turbopack`), which runs natively on Apple Silicon with ~3-5x faster HMR and minimal RAM footprint compared to Webpack.
  - Node old space size is capped at 4GB (`--max-old-space-size=4096`) to avoid memory pressure on 16GB unified memory.

---

## 🎯 Project & Business Objective
- **Candidate**: Aritra Mondal (Data Scientist | Machine Learning | Predictive Analytics).
- **Target Market**: French & European tech ecosystem (Scale-ups, AI Startups, Enterprise Data Teams in Paris, Sophia Antipolis, Lyon, Hybrid/Remote).
- **Key Positioning**:
  - **French Recruiter Signals**:
    - 🎓 Applied MSc in Data Science & AI (Summa Cum Laude / Bac+5 Équivalent) + BSc (Hons) Computer Security.
    - 📍 Based in Biarritz, France (Mobile for Paris & France-wide relocation / Hybrid).
    - 🛂 Work Authorization: Titre de séjour / Full legal right to work across France & EU.
    - 🗣️ Languages: English (Native / C2), French (Professional / B1-B2), Hindi & Bengali (Native).
    - 💼 Industry Track Record: Production ML & Big Data Pipelines at Amadeus (Spark, Scala, AWS EMR, Parquet, 35% speedup).
  - **Project Showcase**:
    - Follows strict **Problem $\to$ Solution $\to$ Production $\to$ Business Impact** structure with quantifiable metrics (Google XYZ framework).

---

## 🧱 Code Architecture & Data Decoupling
- **Content Decoupling**: All textual data, metrics, experiences, and skills are decoupled into type-safe files under `data/`:
  - `data/profile.ts`: Bio, contact info, recruiter signal badges, social links.
  - `data/projects.ts`: Featured projects, metrics, and production details.
  - `data/skills.ts`: Categorized competencies, tool stacks, and verified certifications.
  - `data/experience.ts`: Work experience, education, and XYZ-quantified achievements.
- **Never hardcode profile content directly in UI components**. Update the respective `data/*.ts` file instead.
- **Icons**: Use Lucide React for system icons and `components/icons.tsx` for brand glyphs (GitHub, LinkedIn).

---

## 🛠️ Available Workspace Skills (`.agents/skills/`)
The workspace includes 20 specialized agent skills:
- `taste-ui-design` & `impeccable`: Design system refinement, micro-interactions, dark/light contrast.
- `browser-testing-devtools`: Breakpoint and responsive QA checks.
- `code-simplification` & `editorial-polish`: Code pruning and anti-slop copy editing.
- `security-and-secrets-audit`: Secret scanners and dependency hygiene.
- `web-quality-and-cwv`: Core Web Vitals (LCP, CLS, INP) optimization.
