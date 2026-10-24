---
name: test-driven-guardrails
description: "Enforces strict Red-Green-Refactor test-driven development cycles, atomic diff boundaries, zero collateral edits, and automated regression safety gates."
version: 1.0.0
category: testing
tags: [tdd, red-green-refactor, unit-testing, integration-testing, diff-boundary, regression-prevention, test-automation]
---

# Test-Driven Guardrails (TDD) Skill

Use this skill whenever authoring new functions, components, endpoints, bug fixes, or backend services.

---

## 1. The Iron Rule of TDD
```
┌────────────────────────────────────────────────────────┐
│                   THE IRON RULE OF TDD                 │
├────────────────────────────────────────────────────────┤
│ NEVER write production implementation code without     │
│ first authoring a dedicated, failing automated test.   │
│ If code was written before tests, it must be discarded│
│ or isolated until verified by a prior failing test.    │
└────────────────────────────────────────────────────────┘
```

---

## 2. The Red-Green-Refactor Cycle

```
       ┌──────────────┐
       │   1. RED     │ Author failing test; verify failure
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │   2. GREEN   │ Write minimal code; verify test passes
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │ 3. REFACTOR  │ Clean AST & remove duplication under green coverage
       └──────────────┘
```

### Phase 1: RED (Author Failing Test)
1. Write the test specification first (e.g. using Vitest, Jest, Pytest, Go test, or Cargo test).
2. Execute the test command in the terminal.
3. **MANDATORY CHECK:** Verify that the test runner fails with the expected assertion error (e.g., `Expected 'user_123' but received undefined` or `Function not implemented`).
   - If the test passes immediately without code changes: **The test is invalid or trivial.** Rewrite the test.

### Phase 2: GREEN (Minimal Implementation)
1. Write *only* the minimal implementation code necessary to satisfy the test assertions.
2. Resist the temptation to implement future edge cases, optimize performance, or add unrequested features.
3. Run the test runner again. **Verify all tests pass cleanly.**

### Phase 3: REFACTOR (Structural Cleanliness)
1. Eliminate code smells, duplicate logic, and magic numbers.
2. Ensure strict type safety and meaningful variable names.
3. Run the test runner repeatedly during refactoring to guarantee no behavior regressions occur.

---

## 3. Strict Diff Boundary Enforcement

AI agents often exhibit "scope creep" by reformatting unrelated files, changing import quotes, or modifying adjacent utility functions. Guardrails strictly prohibit this behavior.

```
┌────────────────────────────────────────────────────────┐
│               DIFF INTEGRITY REQUIREMENTS              │
├────────────────────────────────────────────────────────┤
│ 1. Atomic Diffs: Touch ONLY files declared in the task.│
│ 2. Zero Collateral Edits: No lint reformatting on      │
│    unrelated code lines.                               │
│ 3. Preservation: Never delete comments, docstrings, or │
│    existing interfaces unless explicitly instructed.   │
└────────────────────────────────────────────────────────┘
```

### Pre-Commit Diff Audit Checklist:
Before staging any commit, run `git diff --stat` and verify:
- [ ] Are all modified files directly related to the specified feature?
- [ ] Were any unrequested configuration or package files touched?
- [ ] Does `git diff` show accidental whitespace changes or CRLF/LF line-ending conversion churn?
- [ ] If any unrelated file was touched, run `git checkout -- <file>` immediately.

---

## 4. Multi-Tier Testing Pyramid Directives

### Unit Tests (Fast, Isolated, In-Memory)
- **Scope:** Pure functions, calculations, state machines, parsers.
- **Rules:** Mock external networks and disk I/O. Execution must complete in `< 50ms`.

### Integration Tests (Subsystem Contracts)
- **Scope:** API routes, database repositories, middleware pipelines.
- **Rules:** Use isolated test databases (e.g., testcontainers or in-memory SQLite/Postgres schemas). Verify transaction rollbacks.

### End-to-End / Acceptance Tests (User Journey)
- **Scope:** Critical revenue paths (Sign up, checkout, primary search).
- **Rules:** Verify happy path and critical error states without testing every permutation (leave permutations to unit tests).

---

## 5. Execution Recipes by Stack

### TypeScript / React (Vitest + Testing Library)
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter Component', () => {
  it('increments count when button is clicked', async () => {
    // 1. Arrange
    render(<Counter initialCount={0} />);
    const button = screen.getByRole('button', { name: /increment/i });

    // 2. Act
    await userEvent.click(button);

    // 3. Assert
    expect(screen.getByText('Current count: 1')).toBeInTheDocument();
  });
});
```

### Python (Pytest)
```python
import pytest
from app.calculator import calculate_discount

def test_calculate_discount_applies_tier_discount():
    # Arrange
    cart_total = 100.0
    tier = "VIP"
    
    # Act
    discounted_total = calculate_discount(cart_total, tier=tier)
    
    # Assert
    assert discounted_total == 80.0
```
