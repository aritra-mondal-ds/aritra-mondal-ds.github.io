---
name: graphify-codebase-intel
description: "Constructs AST-based topological knowledge graphs of codebases without vector stores or embeddings, mapping dependency trees, call graphs, export/import hierarchies, and blast radiuses."
version: 1.0.0
category: code-intelligence
tags: [ast, code-graph, static-analysis, architecture, blast-radius, dependencies, topological-sort]
---

# Graphify Codebase Intel Skill

Use this skill to map, query, and navigate complex codebases deterministically using Abstract Syntax Trees (ASTs) and directed graph topology—completely eliminating the hallucinations, non-determinism, and token overhead of vector databases / RAG embeddings.

---

## 1. Core Paradigm: Graph Topology Over Vector Similarity

```
VECTOR RAG (Probabilistic & Noisy)       AST GRAPH INTEL (Deterministic & Precise)
┌─────────────────────────────────┐      ┌────────────────────────────────────────┐
│ Chunk text -> Embed -> Cosine   │  VS  │ Parse AST -> Extract Nodes & Edges     │
│ Matches similarity, NOT syntax  │      │ Exact Call Hierarchy & Blast Radius    │
│ Fails on renames, types, scopes │      │ 100% deterministic dependency graph    │
└─────────────────────────────────┘      └────────────────────────────────────────┘
```

When an agent needs to refactor a signature, rename an export, or understand the blast radius of a breaking change, semantic text similarity is inadequate. Graphify Codebase Intel extracts exact syntactic symbols, import/export bindings, inheritance hierarchies, and call relationships into a queryable Directed Acyclic Graph (DAG) or Adjacency Matrix.

---

## 2. Graph Ontology (Nodes & Edges)

### Node Entities
- `FileNode`: Source module path, size, language, and module namespace.
- `SymbolNode`: Specific functions, classes, interfaces, types, enums, or global constants.
- `ScopeNode`: Block scope, closure scope, or class namespace.

### Edge Relations
- `IMPORTS`: `FileNode` $\rightarrow$ `SymbolNode` / `FileNode` (named vs default imports).
- `EXPORTS`: `FileNode` $\rightarrow$ `SymbolNode`.
- `CALLS`: `FunctionNode` $\rightarrow$ `FunctionNode`.
- `EXTENDS` / `IMPLEMENTS`: `ClassNode` $\rightarrow$ `Class/InterfaceNode`.
- `TYPE_REFERENCES`: `SymbolNode` $\rightarrow$ `TypeNode`.

---

## 3. Multi-Language AST Extraction Engine

Use standard parser toolchains available in the workspace:

### TypeScript / JavaScript (via TypeScript Compiler API or Babel)
```typescript
import ts from 'typescript';

function extractFileSymbols(filePath: string, sourceCode: string) {
  const sourceFile = ts.createSourceFile(filePath, sourceCode, ts.ScriptTarget.Latest, true);
  const symbols: { name: string; kind: string; line: number; calls: string[] }[] = [];

  function visit(node: ts.Node) {
    if (ts.isFunctionDeclaration(node) && node.name) {
      const calls: string[] = [];
      node.forEachChild(c => {
        if (ts.isCallExpression(c) && ts.isIdentifier(c.expression)) {
          calls.push(c.expression.text);
        }
      });
      symbols.push({
        name: node.name.text,
        kind: 'FunctionDeclaration',
        line: sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1,
        calls
      });
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return symbols;
}
```

### Python (via standard library `ast`)
```python
import ast
from pathlib import Path

def extract_python_graph(file_path: Path):
    tree = ast.parse(file_path.read_text(encoding='utf-8'))
    imports = []
    functions = []
    calls = []

    for node in ast.walk(tree):
        if isinstance(node, (ast.Import, ast.ImportFrom)):
            for alias in node.names:
                imports.append(alias.name)
        elif isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            functions.append({"name": node.name, "line": node.lineno})
        elif isinstance(node, ast.Call) and isinstance(node.func, ast.Name):
            calls.append(node.func.id)

    return {"file": str(file_path), "imports": imports, "functions": functions, "calls": calls}
```

---

## 4. Operational Directives & Queries

### 1. The Blast Radius Query (`/blast-radius <symbol>`)
Before modifying any function, type, or file:
1. Locate the target `SymbolNode` in the graph.
2. Traverse all reverse inbound edges (`CALLS`, `IMPORTS`, `TYPE_REFERENCES`).
3. Compile the exact list of consumers that will be affected:
   ```markdown
   ### Blast Radius Assessment: `AuthService.validateToken`
   - **Direct Callers (4):**
     - `src/api/routes/user.ts` (L45)
     - `src/api/routes/admin.ts` (L12)
     - `src/middleware/authGate.ts` (L28)
     - `tests/unit/auth.test.ts` (L104)
   - **Indirect Downstream Modules (2):**
     - `src/server.ts`
     - `src/workers/cronJob.ts`
   - **Total Risk Level:** MEDIUM (4 files require signature updates)
   ```

### 2. Dependency Cycle Detection
Run topological sort on module import edges:
- If a cycle is detected ($A \rightarrow B \rightarrow C \rightarrow A$), flag it immediately as an architectural risk.
- Suggest decoupling via Dependency Inversion (interfaces) or extracting shared types to a neutral leaf module.

### 3. Orphan Detection
Find nodes with:
- `InDegree == 0` (no imports from anywhere in the codebase)
- Not listed in `package.json` entry points or public API exports.
- Mark as candidates for safe dead code elimination.

---

## 5. Lean In-Context Graph Representation

Do NOT dump raw AST JSON into the prompt. Instead, summarize dependencies using clean adjacency notation (<400 tokens):

```markdown
<!-- CODEBASE TOPOLOGY MATRIX -->
auth/
├── token.ts       --> calls: [crypto.ts#hash] | imported_by: [middleware.ts, auth.controller.ts]
├── session.ts     --> calls: [redis.ts#setex] | imported_by: [auth.controller.ts]
└── middleware.ts  --> calls: [token.ts#verify] | imported_by: [server.ts, routes/*.ts]
```

This compact notation gives the LLM full architectural awareness without saturating context.
