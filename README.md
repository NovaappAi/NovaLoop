# NovaLoop

NovaLoop = حلقه‌ی یکپارچه‌ی (وب‌هاب) + (ارکستراتور API) برای اتصال چند AI و Codex به GitHub.

## Structure (planned)
- /web  → Next.js guest hub (invite link, no sign-up, session by JWT)
- /api  → FastAPI orchestrator (session/create, agent/join, webhooks, rate-limit)
- /infra → CI/CD & Secrets (GitHub Actions)

## Minimal Flow
1) Guest opens invite link → JWT (temporary) → joins a session.
2) Orchestrator attaches selected agents (GPT/Claude/Gemini/Codex).
3) For code tasks, Codex forks/branches and opens PRs automatically.
4) Logs & outputs are persisted per-session.

## Next Steps
- Step 1: Scaffold `/web` and `/api`.
- Step 2: Add GitHub Actions + secrets: `OPENAI_API_KEY`, `GITHUB_TOKEN`.
- Step 3: Deploy web (Vercel) & api (Railway/Render).

## Notes
- Privacy by design: minimal scopes, short-lived tokens, per-session isolation.
- Everything is modular; agents are plug-ins behind a single orchestrator.
