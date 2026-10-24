---
name: web-research-scraper
description: "Autonomous web scraping, documentation extraction, and deep skill research engine. Use whenever researching new libraries, scraping GitHub repositories or documentation sites, extracting clean LLM-ready Markdown from URLs, or evaluating external agent skills and frameworks. Employs a multi-tier extraction pipeline (Raw GitHub, Jina Reader, and direct headless scraping) with zero token-wasting HTML noise."
version: 1.0.0
category: research
tags: [scraping, research, documentation, markdown, jina, github, extraction, tools]
---

# Web Research & Skill Scraper Engine

The **Web Research Scraper** skill equips the agent with high-throughput, clean, token-efficient web scraping capabilities. It converts any web URL, GitHub repository, API documentation, or tech blog into clean, structured Markdown, bypassing HTML bloat, cookie banners, and client-side JavaScript issues.

---

## 1. When to Use This Skill

Activate this skill whenever:
* The user asks to research, explore, or evaluate a new library, package, agent skill, or framework.
* You need to inspect the source documentation or README of a GitHub repository.
* You need to extract full-page, clean technical documentation without wasting tokens on navigation menus, ads, and HTML markup.
* You want to synthesize a newly discovered tool into a permanent local `SKILL.md` file.

---

## 2. Multi-Strategy Scraping Architecture

```
Target URL ───> [Is it GitHub?] ───YES───> Fetch Raw GitHub API/File (Zero rate-limit)
                     │
                    NO
                     ▼
          [Try Jina Reader (r.jina.ai)] ───SUCCESS───> Clean LLM Markdown
                     │
                   FAIL
                     ▼
          [Direct HTTP / Headless Scrape] ───────────> Fallback Parse
```

### Strategy 1: GitHub Repositories & Files
For any GitHub URL (`github.com/owner/repo`), the scraper routes directly to raw content (`raw.githubusercontent.com/owner/repo/main/README.md`), completely bypassing UI wrappers and rate limits.

### Strategy 2: Jina Reader (`r.jina.ai/<url>`)
For standard documentation sites, blogs, and technical references, the scraper routes through Jina Reader, which:
* Renders JavaScript single-page applications (SPAs).
* Strips cookies, footers, headers, and advertisements.
* Outputs pure, dense Markdown optimized for LLM comprehension.

---

## 3. How to Execute

Run the bundled PowerShell script via `run_command`:

```powershell
powershell -ExecutionPolicy Bypass -File "C:\Users\amanc\.gemini\config\skills\web-research-scraper\scripts\scrape.ps1" -Url "<TARGET_URL>"
```

### Save Output Directly to Disk:
```powershell
powershell -ExecutionPolicy Bypass -File "C:\Users\amanc\.gemini\config\skills\web-research-scraper\scripts\scrape.ps1" -Url "<TARGET_URL>" -OutputPath ".skills-research/raw-scrapes/<file>.md"
```

---

## 4. Operational Workflow for Synthesizing New Skills

When researching a new technology or skill for the user:
1. **Fetch Raw Technical Specs:** Run `scrape.ps1` against the target documentation or repository.
2. **Analyze Primitives:** Extract the core philosophy, command structure, CLI usage, and failure modes.
3. **Format as `SKILL.md`:** Draft a standardized skill with YAML frontmatter (`name`, `description`, `version`, `category`, `tags`).
4. **Interactive Confirmation:** Present the extracted findings to the user and ask:
   > *"I have extracted and synthesized [Tool/Skill Name]. Would you like me to register it into our permanent skills directory?"*
