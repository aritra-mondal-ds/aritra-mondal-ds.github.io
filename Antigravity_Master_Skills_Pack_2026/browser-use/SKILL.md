---
name: browser-use
description: "Autonomous visual web browsing, interaction, and testing engine. Opens headless or visible Chromium instances, clicks elements, fills out forms, navigates dynamic SPAs, solves multi-step user journeys, and captures visual screenshots using browser-use and Playwright automation."
version: 1.0.0
category: automation-and-testing
tags: [browser, automation, playwright, web-testing, e2e, navigation, visual-qa]
---

# Browser-Use Autonomous Web Engine

The `browser-use` skill equips the agent with autonomous browser execution capabilities. Instead of relying purely on static API calls or asking the user to manually test web interfaces, the agent drives a real browser instance to navigate, interact, test, and verify web applications.

---

## 1. When to Use This Skill

- When verifying a locally running web app or deployed preview URL.
- When performing end-to-end user journeys (e.g., clicking navigation links, filling out contact forms, toggling dark/light mode).
- When capturing visual screenshots of rendered pages across different viewport sizes.
- When scraping or interacting with dynamic, JavaScript-rendered Single Page Applications (SPAs) that require hydration or user clicks.

---

## 2. Operational Modes

### Mode A: Lightweight DevTools Automation (Antigravity Native)
For quick audits on local or live URLs, use the built-in Chrome DevTools protocol to inspect DOM nodes, capture screenshots, and evaluate runtime state.

### Mode B: Deep Multi-Step Interaction (`browser-use` CLI/Python)
For complex multi-step browser journeys (e.g. form fills, authentication, dynamic canvas inspection):
1. **Prerequisite Check:** Ensure Python and Playwright/Chromium are installed via `uv`:
   ```powershell
   & "$env:USERPROFILE\.local\bin\uv.exe" pip install browser-use playwright
   & "$env:USERPROFILE\.local\bin\uv.exe" run playwright install chromium
   ```
2. **Execute Headless/Headed Agent:**
   ```python
   from browser_use import Agent
   from langchain_google_genai import ChatGoogleGenerativeAI
   import asyncio

   async def main():
       agent = Agent(
           task="Go to http://localhost:3000, verify the hero animation plays, click the 'Projects' button, and confirm the modal opens.",
           llm=ChatGoogleGenerativeAI(model="gemini-2.5-pro")
       )
       result = await agent.run()
       print(result)

   asyncio.run(main())
   ```

---

## 3. Strict Execution Guardrails

1. **Localhost First:** Always test against local development servers (`http://localhost:3000` or `http://localhost:5173`) before auditing live production sites.
2. **Never Store Credentials:** Never hardcode passwords or sensitive session tokens in automation scripts. Use environment variables or temporary mock credentials.
3. **Screenshot Verification:** When completing an audit or user flow, always capture a final screenshot artifact so the user can visually inspect the result.
