---
name: security-and-secrets-audit
description: "Conducts pre-commit AST scans, regex secret detection, OWASP Top 10 mitigation, SSRF prevention, injection vulnerability audits, and dependency vulnerability checks."
version: 1.0.0
category: security
tags: [security, secrets-audit, owasp, injection-prevention, ssrf, ast-security, static-analysis, vulnerability-scan]
---

# Security & Secrets Audit Skill

Use this skill whenever scanning code before commits, performing security reviews, implementing authentication/authorization flows, validating user input, or auditing third-party dependencies.

---

## 1. Zero-Leak Secret Detection Engine

Never allow hardcoded credentials, API keys, private certificates, or database connection strings to enter git history.

### High-Entropy Secret Detection Patterns
Before committing code, scan changed lines against these signatures:

```regex
# High-entropy API keys & provider tokens
AWS Access Key ID:     AKIA[0-9A-Z]{16}
GitHub Personal Token: ghp_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9_]{82}
Anthropic API Key:     sk-ant-[a-zA-Z0-9_\-]{32,}
OpenAI API Key:        sk-[a-zA-Z0-9]{32,51}
Google Gemini/API Key: AIza[0-9A-Za-z\-_]{35}
Private RSA/EC Key:    -----BEGIN [A-Z ]*PRIVATE KEY-----
Stripe Secret Key:     sk_live_[0-9a-zA-Z]{24}
Generic JWT:           eyJ[a-zA-Z0-9_-]{10,}\.eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}
```

### Protocol When Leaked Secret is Detected:
1. **HALT IMMEDIATELY:** Do not commit or push the branch.
2. **Move to Environment Variables:** Extract the secret into `.env` (which must be in `.gitignore`) and reference via `process.env.<KEY>` or `os.environ.get("<KEY>")`.
3. **If Already Committed:** Run `git-filter-repo` or BFG Repo-Cleaner to scrub git history, and immediately **revoke/rotate the compromised credential** with the service provider.

---

## 2. OWASP Top 10 Prevention Patterns

### 1. Injection Prevention (SQL, Command, NoSQL)
- ❌ **NEVER concatenate user input into queries:**
  ```javascript
  // FATAL VULNERABILITY: SQL Injection
  db.query(`SELECT * FROM users WHERE email = '${req.body.email}'`);
  ```
- ✅ **ALWAYS use parameterized queries or type-safe ORMs:**
  ```javascript
  // SECURE: Parameterized query
  db.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
  ```
- ❌ **NEVER invoke shell execution with user input:**
  ```python
  # FATAL: Command Injection
  os.system(f"convert {user_filename} output.png")
  ```
- ✅ **ALWAYS pass array arguments with no subshell:**
  ```python
  # SECURE: Subprocess array
  subprocess.run(["convert", safe_filename, "output.png"], check=True)
  ```

---

### 2. Server-Side Request Forgery (SSRF) Prevention
When fetching URLs provided by users (e.g., webhooks, avatar imports, link previews):

1. **Protocol Allowlist:** Accept ONLY `http://` and `https://`. Reject `file://`, `gopher://`, `ftp://`.
2. **Private IP Blocklist:** Resolve DNS before sending requests and reject any private, loopback, or cloud metadata addresses:
   - `127.0.0.0/8` (Localhost)
   - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` (RFC 1918 Private networks)
   - `169.254.169.254` (AWS/GCP/Azure instance metadata service!)
   - `::1` and `fc00::/7` (IPv6 loopback and unique local)
3. **Disable HTTP Redirect Following:** Attackers often redirect from public URLs to `169.254.169.254`.

---

### 3. Cross-Site Scripting (XSS) Prevention
- Never use `dangerouslySetInnerHTML` in React or `v-html` in Vue with unsanitized user content.
- If rich HTML is strictly required, sanitize through a hardened parser like **DOMPurify**:
  ```typescript
  import DOMPurify from 'dompurify';
  const cleanHtml = DOMPurify.sanitize(userSuppliedHtml);
  ```
- Enforce strict Content Security Policy (CSP) headers:
  ```http
  Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-...'; object-src 'none';
  ```

---

### 4. Broken Object Level Authorization (BOLA / IDOR)
- Never rely on client-supplied IDs without verifying ownership:
  ```typescript
  // INSECURE: Anyone can edit invoice 456 by guessing the ID
  async function updateInvoice(invoiceId, data) {
    return db.invoice.update({ where: { id: invoiceId }, data });
  }

  // SECURE: Scoped to authenticated tenant
  async function updateInvoice(sessionUser, invoiceId, data) {
    return db.invoice.update({
      where: { id: invoiceId, organizationId: sessionUser.orgId },
      data
    });
  }
  ```

---

## 3. Dependency Vulnerability Auditing

Run package vulnerability scanners before pushing code:
- **Node.js:** `npm audit --omit=dev`
- **Python:** `pip-audit` or `safety check`
- **Rust:** `cargo audit`
- **Go:** `govulncheck ./...`

Treat any **CRITICAL** or **HIGH** severity finding with a direct exploit path as a build-breaking failure.

---

## 4. Security Audit Checklist
Before submitting a code review or deployment:
- [ ] No hardcoded secrets, passwords, or tokens in source files or test fixtures.
- [ ] `.env` and `.env.local` are explicitly listed in `.gitignore`.
- [ ] All database queries use parameterized inputs or ORM methods.
- [ ] User-provided URLs are validated against private IP / SSRF filters.
- [ ] Authentication session tokens use `HttpOnly`, `Secure`, and `SameSite=Lax/Strict` cookie flags.
- [ ] Rate limiting is enforced on authentication routes (`/api/login`, `/api/forgot-password`).
