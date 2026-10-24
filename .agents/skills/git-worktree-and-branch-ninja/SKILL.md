---
name: git-worktree-and-branch-ninja
description: "Manages zero-collision git worktrees, isolated feature branches, clean merge strategies, rebase workflows, and strict conventional commit discipline."
version: 1.0.0
category: git-workflow
tags: [git, worktree, branch-management, conventional-commits, rebase, git-flow, multi-branch]
---

# Git Worktree & Branch Ninja Skill

Use this skill whenever managing multiple branches simultaneously, preparing releases, running parallel agent sessions without merge conflicts, structuring conventional commits, or executing interactive rebases.

---

## 1. Zero-Collision Git Worktrees

Switching branches in a single working directory using `git checkout` discards in-flight build artifacts, restarts dev servers, and invites merge collisions when running autonomous subagents. **Git Worktrees** allow multiple branches of the same repository to be checked out simultaneously into separate folders.

```
REPO ROOT (.git/)
  ├── main/          --> Worktree 1: Production trunk (branch: main)
  ├── feat-billing/  --> Worktree 2: Autonomous Agent A (branch: feat/billing)
  └── fix-auth/      --> Worktree 3: Autonomous Agent B (branch: fix/auth-token)
```

### Essential Worktree Commands
```bash
# 1. Create a new worktree in a dedicated directory on a new branch
git worktree add -b feat/checkout-redesign ../repo-worktrees/feat-checkout main

# 2. List all active worktrees and their checked-out commits
git worktree list

# 3. Safely remove a worktree after merging or finishing work
git worktree remove ../repo-worktrees/feat-checkout

# 4. Prune stale worktree metadata if directories were manually deleted
git worktree prune
```

---

## 2. Branch Naming Architecture

Always adhere to clean, self-documenting branch namespaces:

```
[type] / [ticket-or-scope] - [short-kebab-slug]
```

### Approved Prefix Types:
- `feat/`: New capabilities or user-facing features (e.g., `feat/AUTH-42-oauth-pkce`)
- `fix/`: Bug remediation or patch (e.g., `fix/PERF-102-memory-leak-websocket`)
- `refactor/`: Code reorganization without behavioral change (e.g., `refactor/AST-parser-split`)
- `perf/`: Dedicated performance optimization (e.g., `perf/lcp-avif-pipeline`)
- `chore/`: Build system, CI/CD, dependency updates (e.g., `chore/bump-vite-6`)
- `docs/`: Documentation or specification updates (e.g., `docs/add-sdd-blueprint`)

---

## 3. Strict Conventional Commits

All commit messages must follow the [Conventional Commits 1.0.0](https://www.conventionalcommits.org/) specification to allow automated semantic versioning, changelog generation, and pristine git histories.

### Standard Format:
```
<type>(<optional scope>): <imperative subject>

[optional body explaining motivation and architectural tradeoffs]

[optional footer(s) such as Closes #123 or BREAKING CHANGE: ...]
```

### Type Taxonomy:
- `feat`: A new feature for the user or downstream consumer.
- `fix`: A bug fix for the user or downstream consumer.
- `perf`: A code change that improves runtime performance.
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `test`: Adding missing tests or correcting existing tests.
- `docs`: Documentation-only changes.
- `style`: Changes that do not affect code meaning (formatting, semicolons).
- `chore`: Changes to build process, tooling, or ancillary libraries.

### Breaking Change Syntax:
Include `!` after the type/scope, or add a `BREAKING CHANGE:` footer:
```
feat(api)!: migrate /v1/teams response envelope to strict JSON:API

BREAKING CHANGE: The `data.items` array is now flattened to `data`. Clients must update parsing logic.
```

---

## 4. Rebase Discipline & Linear History

Avoid messy "merge bubbles" (`Merge branch 'main' into feat/xyz`) by rebasing feature branches onto the updated trunk before merging.

### Standard Rebase Routine:
```bash
# 1. Fetch latest changes from remote
git fetch origin main

# 2. Rebase active feature branch onto latest trunk
git rebase origin/main

# 3. If conflicts occur:
# - Inspect conflicting files via git status
# - Resolve conflicts manually
# - Stage resolved files: git add <resolved-file>
# - Continue rebase: git rebase --continue
# (NEVER run git rebase --skip unless explicitly intended)
```

### Interactive Squashing:
Before submitting a PR, squash intermediate "wip", "fix typo", or "checkpoint" commits:
```bash
git rebase -i HEAD~4
# Mark commits to 'squash' or 'fixup' into the primary feature commit
```

---

## 5. Branch Safety Rules & Guardrails
- ❌ **NEVER force-push (`--force`) to shared trunks (`main`, `master`, `staging`).**
- ✅ If force-pushing to your own private feature branch after a rebase, use `git push --force-with-lease` to prevent overwriting unseen remote commits.
- ❌ Never commit binary artifacts, `.env` files, large test datasets, or IDE caches (`.vscode`, `.idea`).
