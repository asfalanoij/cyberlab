# CyberLab — Session Context & Chat History

> Use this file to resume work from Claude Code CLI.
> Last updated: 2026-03-29

---

## Session 2 Summary (2026-03-29)

Forked `python-for-cybersecurity` → new repo `asfalanoij/cyberlab`. Converted to fullstack monorepo:

1. **Monorepo scaffold** — npm workspaces: `apps/web`, `apps/api`, `packages/shared`
2. **Express backend** — routes/services separation, Drizzle ORM + SQLite, Better Auth (email/password)
3. **Frontend integration** — TanStack Query hooks, Better Auth React client, client service modules, login page
4. **MITRE ATT&CK heatmap** — `/mitre` page with interactive coverage map
5. **Notebooks** — generating all 24 (19 new + 5 existing)
6. **README + docs** updated

---

## Session 1 Summary (2026-03-28)

Analyzed `python-for-cybersecurity` repo. Produced:
1. Full product plan for CyberLab
2. 5 deep-research `.ipynb` notebooks
3. Next.js scaffold with design system, dashboard, notebook renderer, sidebar, article pipeline

---

## Repository Info

**Repo:** `asfalanoij/cyberlab` (main branch)
**Origin:** Forked from `asfalanoij/python-for-cybersecurity` claude branch
**Domain:** rudyprasetiya.com (Hostinger VPS)

### Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14 · TanStack Query · Better Auth · Tailwind · Framer Motion |
| Backend | Express · Drizzle ORM · SQLite · Better Auth |
| Shared | @cyberlab/shared — types, MITRE constants |
| Notebooks | Jupyter · Python 3 · Scapy · Paramiko · Cryptography |

### Monorepo Structure
```
├── apps/
│   ├── web/          Next.js frontend
│   │   ├── app/      Pages: dashboard, notebooks, articles, mitre, login
│   │   ├── components/  UI + providers + notebook renderer
│   │   └── lib/      services/ (API clients), hooks/ (TanStack Query), mitre.ts, nbformat.ts
│   └── api/          Express backend
│       └── src/      routes/, services/, db/, lib/auth.ts
├── packages/
│   └── shared/       types.ts, mitre.ts
├── notebooks/        24 .ipynb files
└── Part_2..17/       Original Python scripts
```

### API Endpoints
```
AUTH:       POST /api/auth/sign-up | sign-in | sign-out | GET session
NOTEBOOKS:  GET /api/notebooks | GET /api/notebooks/:slug
PROGRESS:   GET /api/progress | POST /api/progress/:slug
HEALTH:     GET /api/health
```

### Database Schema (SQLite → Postgres/Supabase later)
- `users` — Better Auth managed (id, email, name, emailVerified, image)
- `sessions` — Better Auth managed (id, userId, token, expiresAt)
- `accounts` — Better Auth managed (id, userId, providerId, password)
- `verifications` — Better Auth managed
- `notebooks` — metadata registry (slug PK, title, mitreId, tactic, difficulty, articleTitle, orderNum)
- `progress` — per-user tracking (id, userId, notebookSlug, status, completedAt, notes)

### Pages Built
| Route | Status |
|-------|--------|
| `/` | Done — Dashboard with live progress from API |
| `/notebooks` | Done — 24 notebooks grouped by tactic |
| `/notebooks/[slug]` | Done — Notebook renderer |
| `/articles` | Done — Article pipeline |
| `/mitre` | Done — ATT&CK heatmap with progress overlay |
| `/login` | Done — Email/password auth |

---

## What Still Needs Work

### SHOULD Have (next session)
- [ ] Articles API route + draft editor component
- [ ] Obsidian vault sync (notes → articles pipeline)
- [ ] Wire Sidebar completed dots to progress API (currently hardcoded)
- [ ] `npm install` and verify full build works
- [ ] Deploy to Hostinger VPS

### COULD Have (later)
- [ ] Supabase migration (swap Drizzle connection string)
- [ ] OAuth providers (GitHub, Google)
- [ ] Search (fuzzy across notebooks/articles)
- [ ] Mobile sidebar drawer
- [ ] Skill radar chart (offense/defense balance)

### WON'T Have
- Railway/JupyterLab kernel server
- Real-time collaboration
- Public user registration (single-user research lab)

---

## How to Run Locally

```bash
# Install dependencies
npm install

# Start API (port 4000) — seeds notebook metadata on first run
npm run dev:api

# Start web app (port 3000)
npm run dev:web

# Run notebooks
pip install -r requirements.txt
jupyter lab --notebook-dir=notebooks/
```

---

## Resuming From CLI

```bash
cd /Users/asfalanoi/app_oct2025/python4cs
git checkout main
git pull origin main
cat context_chathistory.md
```

### Suggested next tasks
1. Run `npm install` in root — verify all workspaces resolve
2. `npm run dev:api` — verify API starts, seeds DB, health check returns OK
3. `npm run dev:web` — verify frontend renders with TanStack Query provider
4. Wire Sidebar to use `useProgress` hook instead of hardcoded `COMPLETED_SLUGS`
5. Build articles API route
6. Deploy to Hostinger VPS
