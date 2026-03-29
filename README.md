# CyberLab

Personal cybersecurity research lab — hands-on Python notebooks mapped to MITRE ATT&CK, with a fullstack web app for tracking progress and publishing articles.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14 · TanStack Query · Better Auth · Tailwind CSS |
| Backend | Express · Drizzle ORM · SQLite (→ Postgres/Supabase later) · Better Auth |
| Notebooks | Jupyter (Python 3) · Scapy · Paramiko · Cryptography · psutil |
| Monorepo | npm workspaces (`apps/web`, `apps/api`, `packages/shared`) |

## Quick Start

```bash
# Install all dependencies
npm install

# Start the API server (port 4000)
npm run dev:api

# Start the web app (port 3000)
npm run dev:web

# Or run both at once
npm run dev
```

### Running notebooks

```bash
pip install -r requirements.txt
jupyter lab --notebook-dir=notebooks/
```

## Project Structure

```
├── apps/
│   ├── web/          Next.js frontend (dashboard, notebook viewer, articles, MITRE map)
│   └── api/          Express API (auth, notebooks, progress tracking)
├── packages/
│   └── shared/       Shared types, MITRE constants
├── notebooks/        24 Jupyter notebooks (MITRE ATT&CK mapped)
├── Part_2..17/       Original Python scripts (Infosec Institute learning path)
└── docker-compose.yml
```

## Notebooks (24 total)

| # | Topic | MITRE | Tactic |
|---|-------|-------|--------|
| 01 | Network Scanning | T1046 | Recon |
| 02 | DNS Exploration | T1590.002 | Recon |
| 03 | Default Credentials | T1078 | Initial Access |
| 04 | USB Autorun | T1091 | Initial Access |
| 05 | Spearphishing Links | T1566 | Execution |
| 06 | Scheduled Tasks | T1053 | Execution |
| 07 | Registry Autorun | T1547 | Persistence |
| 08 | Hijack Execution | T1574 | Persistence |
| 09 | Logon Scripts | T1037 | Persistence |
| 10 | Impair Defenses | T1562 | Evasion |
| 11 | Alternate Data Streams | T1564 | Evasion |
| 12 | Browser Credential Dump | T1003 | Credential Access |
| 13 | Network Sniffing | T1040 | Credential Access |
| 14 | User & File Discovery | T1083 | Discovery |
| 15 | Remote Services (SSH) | T1021 | Lateral Movement |
| 16 | Clipboard & Email | T1115 | Collection |
| 17 | Encrypted C2 | T1573 | Command & Control |
| 18 | DNS Exfiltration | T1048.003 | Exfiltration |
| 19 | Ransomware Mechanics | T1486 | Impact |
| 20 | Decoys & Honeypots | defensive | Defense |
| 21 | PCAP Analysis | defensive | Defense |
| 22 | Network Monitoring | defensive | Defense |
| 23 | Behavioral Analytics | defensive | Defense |
| 24 | Full Attack Chain | all | Capstone |

## API Endpoints

```
POST /api/auth/sign-up          Email/password registration
POST /api/auth/sign-in          Email/password login
POST /api/auth/sign-out         Logout
GET  /api/auth/session          Current session

GET  /api/notebooks             List all 24 notebooks with metadata
GET  /api/notebooks/:slug       Single notebook with parsed .ipynb cells

GET  /api/progress              All progress for current user
POST /api/progress/:slug        Update notebook status

GET  /api/health                Health check
```

## Deploy

Designed for Hostinger VPS at rudyprasetiya.com:
- Frontend: `next build && next start` behind Nginx
- Backend: `node dist/index.js` on port 4000, reverse-proxied
- Database: SQLite locally, swap to Supabase by changing `DATABASE_URL`

## Origin

Built on top of [Infosec Institute's Python for Cybersecurity](https://github.com/asfalanoij/python-for-cybersecurity) learning path. Original scripts in `Part_2/` through `Part_17/`.

## License

GPL-3.0
