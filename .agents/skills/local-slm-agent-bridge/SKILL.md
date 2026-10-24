---
name: local-slm-agent-bridge
description: "Prompts, formats, and orchestrates local small language models (Ollama, vLLM, LMStudio with Llama 3, Qwen 2.5, Mistral) for privacy-preserving, cost-free offline subtasks."
version: 1.0.0
category: orchestration
tags: [local-llm, slm, ollama, vllm, lmstudio, qwen, llama, mistral, offline-agents, hybrid-ai]
---

# Local SLM Agent Bridge Skill

Use this skill to delegate offline, privacy-critical, high-volume, or cost-sensitive tasks to local Small Language Models (SLMs) such as **Qwen 2.5 Coder (7B/14B)**, **Llama 3.1/3.2 (3B/8B)**, and **Mistral NeMo (12B)** running via Ollama, vLLM, or LMStudio.

---

## 1. Hybrid Multi-Tier Delegation Architecture

Never burn expensive cloud frontier model tokens (Gemini Pro, Claude 3.5 Sonnet) on repetitive, low-ambiguity tasks that run locally in milliseconds.

```
┌────────────────────────────────────────────────────────┐
│ CLOUD FRONTIER AGENT (Gemini 2.5 / Claude / GPT-4o)    │
│ High-level strategy, multi-file architecture, RCA      │
└──────────────────────────┬─────────────────────────────┘
                           │ Dispatches isolated subtask
┌──────────────────────────▼─────────────────────────────┐
│ LOCAL SLM BRIDGE (Ollama / vLLM / LMStudio)            │
│ Fast, 0-cost, private, offline execution                │
│ (Qwen 2.5 Coder, Llama 3.1 8B, Mistral NeMo)          │
└────────────────────────────────────────────────────────┘
```

### Delegation Task Matrix
| Task Type | Optimal Model Tier | Rationale |
| :--- | :--- | :--- |
| **System Architecture & PRD** | Cloud Frontier Agent | High reasoning depth & ambiguous context |
| **AST Linting & Formatting** | Local SLM (Qwen 2.5 Coder 7B) | Deterministic syntax task, 0-token cost |
| **Docstring & Type Annotation** | Local SLM (Llama 3.1 8B) | Local code stays on developer machine |
| **PII & Secret Redaction** | Local SLM (Mistral NeMo 12B) | Complete privacy; zero outbound cloud telemetry |
| **RegEx / Boilerplate Gen** | Local SLM (Qwen 2.5 Coder 7B) | Sub-second response time via localhost |
| **Multi-File Root Cause Debug** | Cloud Frontier Agent | Long-horizon context tracking |

---

## 2. Prompt Formatting Rules for Local SLMs

Small language models (3B to 14B) degrade rapidly under verbose prompts. Follow these 4 prompt constraints:

1. **Terse Imperatives Only:** Omit politeness, introductory pleasantries, and discursive explanations.
2. **Constrained Schemas (JSON/GBNF):** Force models into deterministic JSON schemas or grammar constraints.
3. **Structured Markdown Tables:** Local models track token relationships in tables significantly better than dense paragraphs.
4. **Single-Responsibility Focus:** Ask for exactly one output per call (e.g. "Generate TypeScript types", NOT "Generate types, tests, backend routes, and documentation").

---

## 3. Local Model API Integrations

### 1. Ollama Native API (Localhost: 11434)
```python
import json
import urllib.request

def call_ollama(prompt: str, model: str = "qwen2.5-coder:7b", format_json: bool = True) -> str:
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.1,
            "num_ctx": 8192
        }
    }
    if format_json:
        payload["format"] = "json"

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode("utf-8"))
        return result.get("response", "")
```

### 2. OpenAI-Compatible Endpoint (vLLM / LMStudio at `http://localhost:8000/v1`)
```python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:8000/v1", api_key="not-needed")

def call_local_vllm(system_prompt: str, user_prompt: str, model: str = "qwen2.5-coder-7b-instruct"):
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.0,
        max_tokens=2048
    )
    return response.choices[0].message.content
```

---

## 4. Local Model Task Templates

### Template A: Unit Test Generation Packet (Qwen 2.5 Coder)
```markdown
SYSTEM: You are a strict TDD code generator. Output ONLY clean executable code inside a single ```python or ```typescript block. No explanations.

USER:
Generate unit tests for the following function using pytest:

```python
def parse_date_range(raw_str: str) -> tuple[str, str]:
    # format: "YYYY-MM-DD..YYYY-MM-DD"
    parts = raw_str.split("..")
    if len(parts) != 2:
        raise ValueError("Invalid date range format")
    return parts[0].strip(), parts[1].strip()
```

REQUIREMENTS:
- Test 1: Valid range
- Test 2: Missing separator (raises ValueError)
- Test 3: Whitespace handling
```

### Template B: PII & Credential Sanitizer (Mistral NeMo)
```markdown
SYSTEM: You are an air-gapped data sanitizer. Replace all API keys, bearer tokens, IP addresses, email addresses, and passwords with [REDACTED_<TYPE>]. Return ONLY the sanitized text.

USER:
{raw_log_line}
```

---

## 5. Health Check & Fallback Procedure
Before dispatching a batch of subtasks to a local model:
1. Ping endpoint: `GET http://localhost:11434/api/tags` or `GET http://localhost:8000/v1/models`.
2. If service is unavailable or port is closed: Fall back to native execution or notify the user to run `ollama serve`.
