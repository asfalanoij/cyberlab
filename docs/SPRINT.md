# Sprint Tracker

> CyberLab — Sprint-level execution tracking
> Last updated: 2026-03-29

---

## Sprint 1 (2026-03-28) — COMPLETE

**Theme:** Project bootstrap + frontend scaffold

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1 | Analyze python-for-cybersecurity repo | Done | 17 parts, 40+ scripts |
| 2 | Define product vision + 24-notebook roadmap | Done | MITRE ATT&CK mapped |
| 3 | Design system (tokens, fonts, colors) | Done | Linear-inspired, no component lib |
| 4 | Next.js scaffold: dashboard, notebooks, articles, sidebar | Done | 4 pages |
| 5 | Notebook renderer (.ipynb parser) | Done | nbformat v4, code + markdown cells |
| 6 | 5 deep-research notebooks | Done | 01, 02, 13, 18, 23 |

**Velocity:** 6/6 tasks

---

## Sprint 2 (2026-03-29) — COMPLETE

**Theme:** Fullstack monorepo + backend + auth + more notebooks

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1 | Fork repo → asfalanoij/cyberlab | Done | Clean main branch |
| 2 | Monorepo scaffold (npm workspaces) | Done | apps/api, apps/web, packages/shared |
| 3 | Express API (routes, services, DB) | Done | 3 route groups, 6 DB tables |
| 4 | Drizzle ORM + SQLite schema | Done | users, sessions, notebooks, progress |
| 5 | Better Auth (email/password) | Done | Server + React client |
| 6 | TanStack Query hooks + client services | Done | useNotebooks, useProgress, useAuth |
| 7 | Login page | Done | Sign in / sign up |
| 8 | MITRE ATT&CK heatmap (/mitre) | Done | Interactive, progress-aware |
| 9 | TopBar wired to live auth + progress | Done | Dynamic counts |
| 10 | 6 new notebooks (03-08) | Done | Initial Access + Execution + Persistence |
| 11 | csenv conda environment + Jupyter kernel | Done | Python 3.12 + all cybersec deps |
| 12 | README rewrite | Done | |
| 13 | context_chathistory update | Done | |
| 14 | Project tree (docs/TREE.md) | Done | |
| 15 | Milestone + Sprint docs | Done | |
| 16 | Remaining 13 notebooks (09-24) | In Progress | Background agent running |

**Velocity:** 15/16 tasks

---

## Sprint 3 (next session) — PLANNED

**Theme:** Content completion + build verification + Sidebar fix

| # | Task | Status | Priority |
|---|------|--------|----------|
| 1 | Complete remaining notebooks (any gaps from Sprint 2) | Pending | MUST |
| 2 | Wire Sidebar to useProgress hook (replace hardcoded COMPLETED_SLUGS) | Pending | MUST |
| 3 | Move cyberlab/ → apps/web/ (monorepo alignment) | Pending | MUST |
| 4 | npm install all workspaces | Pending | MUST |
| 5 | Verify API starts + seeds DB + health check | Pending | MUST |
| 6 | Verify frontend builds + renders | Pending | MUST |
| 7 | Fix any TypeScript / build errors | Pending | MUST |
| 8 | Drizzle db:push (create SQLite tables) | Pending | MUST |

---

## Sprint 4 (planned)

**Theme:** Articles pipeline + Obsidian integration

| # | Task | Status | Priority |
|---|------|--------|----------|
| 1 | Articles API route + article_drafts table | Pending | MUST |
| 2 | Article draft editor component | Pending | MUST |
| 3 | "Copy for Medium" export | Pending | SHOULD |
| 4 | Obsidian vault sync | Pending | SHOULD |

---

## Definition of Done

A sprint task is "Done" when:
- Code is committed and pushed to asfalanoij/cyberlab main
- No breaking build errors
- Feature is accessible at the expected route/endpoint
- Documentation updated if applicable
