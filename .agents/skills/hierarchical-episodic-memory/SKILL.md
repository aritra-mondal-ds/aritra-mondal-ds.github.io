---
name: hierarchical-episodic-memory
description: "3-tier episodic memory engine maintaining structured disk journals (DECISIONS.md, CONTINUATION.md) and ultra-lean in-context index pointers (<250 tokens), reducing token consumption by 60-80%."
version: 1.0.0
category: memory
tags: [memory, token-optimization, context-management, adr, continuation, state-persistence, multi-turn]
---

# Hierarchical Episodic Memory Skill

Use this skill to preserve context across long-running coding sessions, prevent token exhaustion, and eliminate "context rot" without paying the latency or cost of massive multi-thousand-token prompt re-injections.

---

## 1. The 3-Tier Memory Architecture

```
┌────────────────────────────────────────────────────────┐
│ TIER 1: Lean In-Context Pointer Index (<250 Tokens)    │
│ Active in working memory. Points to disk files.        │
└──────────────────────────┬─────────────────────────────┘
                           │ Loads on demand
┌──────────────────────────▼─────────────────────────────┐
│ TIER 2: Working Continuation State (CONTINUATION.md)   │
│ Active sprint, step progress, blockers, next commands  │
└──────────────────────────┬─────────────────────────────┘
                           │ Appends permanent decisions
┌──────────────────────────▼─────────────────────────────┐
│ TIER 3: Permanent Episodic Journal (DECISIONS.md)      │
│ Immutable ADR records, architectural trade-offs        │
└────────────────────────────────────────────────────────┘
```

By offloading architectural history and conversation state to disk, Tier 1 uses **less than 250 tokens** in active context while guaranteeing 100% fidelity on past decisions.

---

## 2. Tier 1: In-Context Index Protocol (<250 Tokens)

At the beginning of any session or after context compaction, keep only this table active in context:

```markdown
<!-- TIER 1 ACTIVE MEMORY INDEX -->
| Domain | Active State / Canonical Decision | Persistent Pointer |
| :--- | :--- | :--- |
| **System Architecture** | Next.js 15 App Router + Server Actions | `DECISIONS.md#ARC-001` |
| **Data Layer** | Prisma ORM + PostgreSQL + RLS | `DECISIONS.md#DB-002` |
| **Styling Tokens** | OKLCH slate/emerald palette, strict 8px grid | `DESIGN.md` |
| **Current Objective** | Implementing auth gate middleware (Step 3/5) | `CONTINUATION.md` |
```

If an agent needs specific details about past choices, it reads the target pointer directly via `read_file`, inspects the exact section, and unloads it.

---

## 3. Tier 2: Working Continuation State (`CONTINUATION.md`)

Whenever a session is interrupted, reaches turn limits, or switches subtasks, write or update `CONTINUATION.md` at the workspace root:

```markdown
# Session Checkpoint & Continuation State

- **Last Updated:** 2026-10-22T21:30:00Z
- **Active Feature Branch:** `feat/auth-middleware`
- **Current Objective:** Implement token expiration fallback and refresh rotation.

### Progress Matrix
- [x] Step 1: Author failing unit test in `tests/auth.test.ts`.
- [x] Step 2: Implement JWT signature verification in `src/lib/jwt.ts`.
- [ ] Step 3: Wire middleware gate into `src/middleware.ts` <!-- CURRENT FOCUS -->
- [ ] Step 4: Run integration test suite (`npm test`).
- [ ] Step 5: Clean commit and PR creation.

### Critical Runtime Context & State
- Refresh tokens are stored in HttpOnly, SameSite=Strict cookies.
- Do NOT alter `authConfig.ts` because upstream OAuth relies on current scopes.

### Immediate Resumption Command
```bash
npm run test:auth
```
```

---

## 4. Tier 3: Permanent Architectural Decisions (`DECISIONS.md`)

Never argue or re-decide previously solved architectural questions. Record decisions in `DECISIONS.md`:

```markdown
# Architectural Decision Record (ADR)

## [ADR-001] Choice of Client State Engine
- **Status:** ACCEPTED
- **Date:** 2026-10-22
- **Context:** High-frequency dashboard with 60 updates/sec from WebSockets.
- **Decision:** Zustand with transient subscriptions.
- **Alternatives Considered:** Redux Toolkit (too boilerplate-heavy), React Context (re-render cascades).
- **Consequences:** Store actions must remain outside React lifecycle; components must use specific selectors.

## [ADR-002] Error Handling & Validation Boundary
- **Status:** ACCEPTED
- **Date:** 2026-10-22
- **Context:** API boundary data integrity.
- **Decision:** Zod schema validation on all incoming Server Action payloads.
- **Consequences:** Any payload failing Zod schema returns typed `{ error: ValidationError }` instead of throwing 500s.
```

---

## 5. Compaction & Checkpoint Directives

### Trigger Conditions:
1. **Turn Count:** The conversation thread exceeds 20 turns.
2. **Context Saturation:** Active context reaches ~65% of max capacity.
3. **Subagent Handoff:** Passing context between parent and child agents.

### Compaction Execution Routine:
1. Review all decisions made in the current session.
2. If new architectural choices were made, append them to `DECISIONS.md`.
3. Update `CONTINUATION.md` with:
   - What was accomplished.
   - What file was last edited.
   - The exact next step to resume immediately.
4. Output the Tier 1 pointer table and prompt the user:
   > *"Context compacted and saved to disk. To continue, resume from CONTINUATION.md."*
