<div align="center">

# Aritra Mondal — Production ML & Distributed Systems Portfolio

[![Live Production Site](https://img.shields.io/badge/Live_Site-aritra--mondal--ds.github.io-6366f1?style=for-the-badge&logo=githubpages&logoColor=white)](https://aritra-mondal-ds.github.io/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.7-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![CI/CD Status](https://img.shields.io/badge/Deploy-GitHub_Pages-22c55e?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/aritra-mondal-ds/aritra-mondal-ds.github.io/actions)

<p align="center">
  <b>High-performance, bilingual personal portfolio engineered for the French and European tech ecosystem.</b><br/>
  Featuring production ML architectures, interactive Big Data visualizers, a scale-up developer terminal, and a global command palette.
</p>

<p align="center">
  <a href="https://aritra-mondal-ds.github.io/"><b>🌐 Live Website (English)</b></a> •
  <a href="https://aritra-mondal-ds.github.io/fr/"><b>🇫🇷 Version Française</b></a> •
  <a href="https://aritra-mondal-ds.github.io/#recruiter-sheet"><b>⚡ Recruiter Fast-Track</b></a> •
  <a href="https://aritra-mondal-ds.github.io/cv.pdf"><b>📄 Download CV (PDF)</b></a>
</p>

</div>

---

## 🎯 Executive Profile & Market Alignment

* **Candidate**: **Aritra Mondal** (Data Scientist · Machine Learning Engineer)
* **Target Roles**: Entry-Level / Junior to Mid Data Scientist & Machine Learning Engineer (CDI · Statut Cadre)
* **Target Market**: Paris, Sophia Antipolis, Lyon, Hybrid & France-wide Remote
* **Core Technical Differentiator**: Production Big Data & Distributed ML pipelines (**Apache Spark, Scala, AWS EMR, Parquet, Jenkins CI/CD**) with a verified **35% batch performance speedup** at global travel tech leader **Amadeus**.
* **Key French Recruiter Signals**:
  - 🎓 **Diplôme Bac+5 Équivalent**: *Applied MSc in Data Science & AI* (Data ScienceTech Institute — *Summa Cum Laude / Félicitations du Jury*) + *BSc (Hons) Computer Security* (Northumbria University, UK).
  - 📍 **Location & Mobility**: Based in Biarritz, France — Autonomous immediate Paris relocation ready (Hybrid 2–3 days or Full Onsite).
  - 🛂 **Work Authorization**: *Titre de séjour* valid with full right to work across France and the European Union (*aucun parrainage requis*).
  - ⏱️ **Availability**: Immediate availability (**0-Day Notice / Aucun préavis**).
  - 🗣️ **Languages**: English (**Native / C2**), French (**Professional / B1–B2**), Hindi & Bengali (**Native**).

---

## ✨ Engineering Features & Interactive Demonstrations

### 1. 🔍 Global Command Palette (`Cmd + K` / `Ctrl + K`)
- High-efficiency modal navigation built with **React Portals** targeting `document.body`, eliminating CSS containing block traps.
- Keyboard-first interaction (`↑` / `↓` navigation, `Enter` selection, `Esc` dismiss).
- Real-time fuzzy query filtering across featured projects, interactive tools, CV downloads, and direct recruiter contact actions.
- Automatic body scroll-locking preventing background bleed-through.

### 2. ⚡ Executive Recruiter Fast-Track Synthesis
- 1-minute synthesized briefing engineered specifically for Technical Recruiters, HR Managers, and Engineering Directors.
- Displays contract conditions (CDI Statut Cadre), Paris salary benchmark alignment (€42k – €52k), immediate start date, and work rights.
- **1-Click Slack / ATS Pitch**: Instantly formats and copies candidate metadata to the clipboard for internal referral channels.

### 3. 📊 Interactive Spark / Scala Pipeline Visualizer
- Visual architecture inspector modeling Amadeus production data flow.
- Highlights AWS EMR cluster configuration, Catalyst optimizer passes, zero-copy JVM execution, and the **35% speedup** achieved by migrating PySpark to native Scala.
- Interactive mode toggle comparing standard PySpark IPC overhead against compiled Scala execution.

### 4. 💻 Scale-Up Developer Terminal
- Embedded CLI terminal allowing developers to query candidate metadata directly:
  ```bash
  $ curl -s /profile | jq .
  $ skills --filter=core
  $ projects --production
  $ contact --email
  ```
- Fast shortcut execution buttons and interactive command history.

### 5. 🌐 Synchronized Bilingual Localization (`/` and `/fr/`)
- Fully synchronized English (`/`) and French (`/fr/`) versions.
- Strict data decoupling under `data/` and `data/fr/` maintaining parity across UI copy, recruiter signals, project narratives, and technical modules.
- Preserves deep-link anchors across language switches (e.g. `/#education` $\leftrightarrow$ `/fr/#education`).

---

## 🏗️ Clean Data Architecture & Separation of Concerns

All content, metrics, experiences, and skills are decoupled into type-safe data files under `data/`. The UI components contain zero hardcoded biographical or metric strings.

```text
├── app/
│   ├── layout.tsx                 # Root layout with font optimization & theme provider
│   ├── page.tsx                   # English root landing page
│   ├── globals.css                # Tailwind base styles, OKLCH tokens & glow utilities
│   ├── icon.svg                   # Dynamic brand favicon
│   ├── robots.txt                 # Search engine crawler directives
│   ├── sitemap.xml                # Automated static sitemap
│   └── fr/
│       └── page.tsx               # French root landing page (/fr/)
├── components/
│   ├── command-palette.tsx        # Global Cmd+K modal (React Portal + scroll lock)
│   ├── recruiter-fast-track-modal.tsx # 1-minute executive recruiter briefing
│   ├── pipeline-visualizer-modal.tsx  # Interactive Spark/Scala architecture diagram
│   ├── interactive-terminal.tsx   # CLI terminal simulator (curl/jq commands)
│   ├── hero.tsx                   # Responsive hero with verified recruiter signal badges
│   ├── projects-section.tsx       # 4-card XYZ framework project showcase
│   ├── project-card.tsx           # Problem -> Solution -> Production -> Impact component
│   ├── bento-skills.tsx           # Domain-partitioned skill bento grid & certs
│   ├── experience-timeline.tsx    # Chronological career & academic milestones
│   ├── contact-section.tsx        # Direct recruitment channels (email, phone, LinkedIn)
│   ├── navbar.tsx                 # Responsive disclosure header with responsive drawer
│   ├── footer.tsx                 # Clean minimal developer footer
│   ├── theme-toggle.tsx           # System-aware dark/light mode toggle
│   └── icons.tsx                  # Custom SVG brand glyphs (GitHub, LinkedIn)
├── data/
│   ├── profile.ts                 # EN: Bio, contact info, recruiter signals, salary
│   ├── projects.ts                # EN: Production ML projects & verified metrics
│   ├── skills.ts                  # EN: Competencies, tools, verified certifications
│   ├── experience.ts              # EN: Work experience & Bac+5 degrees
│   ├── pipeline.ts                # EN: Spark/Scala pipeline architecture nodes
│   ├── en/ui.ts                   # EN: UI copy strings & navigational labels
│   └── fr/                        # FR: Exact French counterpart datasets
│       ├── profile.ts
│       ├── projects.ts
│       ├── skills.ts
│       ├── experience.ts
│       ├── pipeline.ts
│       └── ui.ts
├── types/
│   └── index.ts                   # TypeScript interfaces (Profile, Project, Experience, etc.)
├── public/
│   ├── aritra-mondal.jpg          # Authentic high-resolution portrait
│   └── cv.pdf                     # Downloadable PDF curriculum vitae
├── .github/workflows/
│   └── deploy.yml                 # Automated GitHub Actions deployment pipeline
├── next.config.ts                 # Static export configuration (`output: "export"`)
└── tailwind.config.ts             # Tailwind design tokens & typography plugin
```

---

## 🔬 Featured Production Projects Showcase

Each project follows the strict **Problem $\to$ Solution $\to$ Production $\to$ Business Impact** structure with quantified outcomes:

| Project | Domain | Key Technologies | Verified Business Impact |
| :--- | :--- | :--- | :--- |
| **Airline Demand Forecasting** | Distributed ML & MLOps | Apache Spark, Scala, PySpark, AWS EMR, S3, Jenkins | **35% ETL runtime speedup**, eliminated JVM-Python IPC overhead, processed multi-GB Parquet daily |
| **Financial Time-Series Engine** | Quant & Deep RL | Python, XGBoost, LSTM, PPO, CCXT, MT5 | **73+ engineered alpha features**, 0 lookahead bias via strict purged walk-forward cross-validation |
| **Recommendation & Ranking** | Applied Predictive ML | LightGBM, Scikit-learn, Optuna, TreeSHAP | **Top-K ranking optimization**, Bayesian hyperparameter search, SHAP feature explainability |
| **Network IDS & Telemetry** | Cybersecurity & Systems | SNORT IDS, TCP/IP, UDP, ICMP, Linux, Bash | **20% false-positive alert reduction** through custom heuristic traffic classification rules |

---

## 🧪 Quality Assurance & Stress Test Benchmarks

Automated QA passes using the **Chrome DevTools Protocol (CDP)** and HTTP load benchmarking confirm zero defects:

* **Concurrency Load Testing**:
  * Localhost: **83.8 – 90.6 requests/second** with **0% error rate** under 25-request concurrent bursts.
  * Production Edge (GitHub Pages): **66.4 – 105.7 requests/second** with **0% error rate** (sub-45ms median response time).
* **Automated Responsive Matrix**:
  * 📱 **Mobile (375px × 667px)**: `0px` horizontal overflow (`scrollWidth <= innerWidth`). Responsive drawer navigation.
  * 📱 **Tablet (768px × 1024px)**: `0px` horizontal overflow. Compact CTA disclosure.
  * 💻 **Laptop (1280px × 800px)**: `0px` horizontal overflow. Desktop navigation pill.
  * 🖥️ **Desktop (1920px × 1080px)**: `0px` horizontal overflow. Full social glyph disclosure.
* **Console Health**: `0` uncaught exceptions, `0` runtime console errors, `0` hydration warnings.
* **Static Asset Integrity**: 100% `200 OK` on all JavaScript chunks, stylesheets, images, and document downloads.

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js `20.x` or higher (tested with Node.js `v26+` on Apple Silicon arm64)
- npm `10.x` or higher

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/aritra-mondal-ds/aritra-mondal-ds.github.io.git
cd aritra-mondal-ds.github.io

# 2. Install dependencies
npm install

# 3. Launch local development server
npm run dev

# 4. Run static typecheck
npm run typecheck

# 5. Build optimized static export
npm run build
```

Open [http://localhost:3000](http://localhost:3000) for the English version, or [http://localhost:3000/fr/](http://localhost:3000/fr/) for the French version.

---

## 🚢 Automated CI/CD & Deployment

This repository uses **GitHub Actions** (`.github/workflows/deploy.yml`) to automatically build and deploy static pages to GitHub Pages on every push to the `main` branch:

1. **Trigger**: Any commit pushed to `main` initiates the workflow.
2. **Build**: Runs `npm ci` and `npm run build` using Next.js static HTML export (`output: "export"`).
3. **Artifact Deployment**: Uploads the `./out` directory directly to GitHub Pages CDN with zero server runtime overhead.

---

## 📬 Contact & Direct Recruitment

* **Candidate**: Aritra Mondal
* **Email**: [aritramondal100@gmail.com](mailto:aritramondal100@gmail.com)
* **Phone (France)**: [+33 7 49 29 79 66](tel:+33749297966)
* **LinkedIn**: [linkedin.com/in/aritra-mondal-66702021](https://www.linkedin.com/in/aritra-mondal-66702021)
* **GitHub**: [github.com/aritra-mondal-ds](https://github.com/aritra-mondal-ds)
* **Website**: [aritra-mondal-ds.github.io](https://aritra-mondal-ds.github.io/)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
