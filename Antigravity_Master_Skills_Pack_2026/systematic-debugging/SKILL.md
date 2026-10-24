---
name: systematic-debugging
description: "Enforces a disciplined 4-phase root-cause analysis workflow: read full traces, isolate minimal reproductions, formulate single-variable hypotheses, and write regression tests before fixes."
version: 1.0.0
category: debugging
tags: [debugging, rca, troubleshooting, diagnostics, trace-analysis, regression-tests, testing]
---

# Systematic Debugging Skill

Use this skill whenever troubleshooting errors, uncaught exceptions, test failures, performance degradations, data corruption, or unexpected runtime behaviors.

---

## The Iron Law of Systematic Debugging
```
┌────────────────────────────────────────────────────────┐
│             NEVER GUESS. NEVER "VIBE PATCH".            │
├────────────────────────────────────────────────────────┤
│ No code changes may be introduced until:               │
│ 1. The complete error trace and context are captured.  │
│ 2. A minimal, isolated reproduction is executed.       │
│ 3. A single-variable hypothesis is validated.          │
│ 4. A failing regression test proves the defect.        │
└────────────────────────────────────────────────────────┘
```

Treat debugging as an empirical science. "Trial-and-error" edits increase code entropy, introduce secondary bugs, and obscure the true root cause.

---

## The 4-Phase Diagnostic Cycle

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  PHASE 1: TRACE │ ──> │ PHASE 2: ISOLATE│ ──> │ PHASE 3: HYPOTH.│ ──> │ PHASE 4: LOCK-IN│
│  Full Context   │     │ Minimal Repro   │     │ 1 Variable Only │     │ Regression Test │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Phase 1: Deep Trace & Context Extraction
Before proposing any code modification:
1. **Read the Full Stack Trace:** Inspect the entire call stack from top to bottom. Identify:
   - The precise file path and line number where the exception occurred.
   - The entry point or user trigger that initiated the call chain.
   - Any swallowed or rethrown exceptions (e.g., `Caused by:` chains).
2. **Reconstruct the State Timeline:**
   - What was the system state immediately prior to the failure?
   - What inputs, arguments, or environment variables were passed into the failing function?
   - What invariants were violated (e.g., `null` pointer, type mismatch, array out-of-bounds, unhandled promise rejection)?
3. **Inspect Recent Diffs:**
   - Run `git log -p -n 3 -- <failing_file>` to determine if recent commits touched the affected codepath.

---

### Phase 2: Isolated Minimal Reproduction
Never debug inside a massive multi-module test suite or live server if you can isolate the defect.
1. **Author a Standalone Repro Script or Minimal Test:**
   - Create a scratch script (e.g., `scratch/repro_issue.ts` or `tests/repro_spec.py`) that executes only the minimal code necessary to trigger the bug.
   - Strip all irrelevant dependencies, middleware, and network requests.
2. **Differentiate Deterministic vs. Flaky Failures:**
   - Run the reproduction 5 consecutive times.
   - If deterministic (5/5 fail): Proceed directly to Phase 3.
   - If non-deterministic / timing-dependent: Suspect race conditions, unhandled async resolution, shared mutable state, or unseeded random generators.

---

### Phase 3: Single-Variable Hypothesis & Scientific Probing
1. **Formulate Explicit Hypotheses:**
   Write down the hypothesis before touching code:
   > *"Hypothesis: The parser fails on line 42 because `config.timeout` is read as a string (`'5000'`) instead of an integer, causing `isNaN(timeout)` to evaluate to true in strict validation."*
2. **Change Exactly One Variable at a Time:**
   - Never change multiple functions, types, and logic blocks in a single iteration.
   - If the change does not resolve the issue or yields unexpected behavior, **revert it immediately** before testing the next hypothesis.
3. **Binary Search / Git Bisect:**
   - If the regression was introduced recently in a large codebase, use git bisect:
     ```bash
     git bisect start
     git bisect bad HEAD
     git bisect good <last_known_good_commit_or_tag>
     git bisect run npm test
     ```

---

### Phase 4: Root-Cause Elimination & Regression Lock-in
1. **Fix the Cause, Not the Symptom:**
   - **Symptom patch (BAD):** Adding `if (data === null) return;` to silence a crash without asking *why* `data` became null.
   - **Root-cause fix (GOOD):** Fixing the upstream asynchronous pipeline so `data` is properly initialized, typed, and validated before consumption.
2. **Author the Permanent Regression Test:**
   - Convert the minimal reproduction into a permanent test in the test suite.
   - The test must fail prior to your fix and pass cleanly with your fix.
   - Add docstrings linking to the bug ID or issue report.
3. **Verify Boundary Conditions:**
   - Test edge cases: empty strings, zero values, negative numbers, undefined/null, maximum buffers, and unexpected unicode characters.

---

## Special Debugging Playbooks

### 1. Asynchronous & Race Condition Failures
- Look for un-awaited promises, dangling event listeners, or out-of-order API responses.
- Replace arbitrary `setTimeout` delays with explicit event-driven synchronization (`Promise.all`, AbortController, condition variables).
- Log timestamps with millisecond precision to visualize task interleaving.

### 2. Memory Leaks & Retained Closures
- Capture heap snapshots before and after repeated operations.
- Inspect retained detached DOM nodes, uncleared intervals (`setInterval`), and long-lived global caches without eviction policies (LRU).

### 3. "Heisenbugs" (Bugs that vanish under inspection)
- Inspect subtle timing shifts introduced by debug logging statements or print overhead.
- Check memory alignment, uninitialized variables, or thread-safety primitives.

---

## Systematic Debugging Report Template
When presenting diagnostic results to the team or user, format findings using this structure:

```markdown
### Root Cause Analysis (RCA)
- **Defect Description:** [Summary of observed failure]
- **Root Cause:** [Precise technical mechanism that triggered the defect]
- **Reproduction:** [Minimal command or test case that triggered it]
- **Remediation:** [Exact architectural/code change applied]
- **Regression Guard:** [Path to automated test preventing recurrence]
- **Collateral Blast Radius:** [Confirmation of other modules verified unharmed]
```
