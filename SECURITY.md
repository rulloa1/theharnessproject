# 🔒 HARNESS Project - Security Guidelines

## Critical Security Practices

### 1. Never Commit Credentials

**DO NOT** commit the following files to version control:
- `*.credentials.json`
- `.env` files
- API keys
- Private keys (`.key`, `.pem`)

All credentials must be stored in:
- Environment variables
- Secure configuration files (excluded via `.gitignore`)
- Secret management services (AWS Secrets Manager, etc.)

### 2. Environment Variables

For local development, create a `.env` file (already gitignored):

```bash
# Example .env file
MOLTBOOK_API_KEY=your_api_key_here
MOLTBOOK_AGENT_NAME=your_agent_name

# Never commit this file!
```

### 3. API Key Configuration

If using the MoltBook API (or similar services):

1. **Create** `moltbook_credentials.json.example` as a template
2. **Copy** to `moltbook_credentials.json` locally
3. **Add** actual credentials to the local copy
4. **Ensure** `.gitignore` excludes `moltbook_credentials.json`
5. **Never** commit the actual credentials file

### 4. Exposed Credentials Checklist

If credentials were accidentally committed:

- [ ] Revoke/rotate the exposed API key immediately
- [ ] Check git history: `git log --all -- moltbook_credentials.json`
- [ ] Remove from history if found: `git filter-branch` or BFG Repo-Cleaner
- [ ] Force push to remote (coordinate with team first)
- [ ] Update all services using new credentials

### 5. Production Security

- Enable CSP (Content Security Policy) headers
- Use HTTPS everywhere
- Regularly update dependencies
- Monitor for vulnerabilities: `npm audit`
- Implement rate limiting on API endpoints

### 6. Reporting Security Issues

If you discover a security vulnerability:
- **DO NOT** open a public issue
- Email: security@theharnessproject.org
- Expected response time: 48 hours

---

Last updated: 2026-02-09
