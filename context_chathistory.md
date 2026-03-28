# CyberLab — Session Context & Chat History

> Use this file to resume work from Claude Code CLI.
> Last updated: 2026-03-28

---

## Session Summary

This session analyzed the `python-for-cybersecurity` repository and produced:
1. A full product plan for a Cybersecurity Jupyter Notebook platform
2. 5 deep-research `.ipynb` notebooks (of 24 planned)
3. A Next.js application scaffold (`cyberlab/`) with design system, dashboard, notebook renderer, sidebar, and article pipeline

---

## Repository Overview

**Repo:** `asfalanoij/python-for-cybersecurity`
**Branch:** `claude/explain-codebase-mmjd16iuqmsyoilt-4dkFA`
**Source:** Infosec Institute's "Python for Cybersecurity" Learning Path
**Language:** Python 3 only — standalone scripts, no framework

### Tech stack (original repo)
| Category | Libraries |
|---|---|
| Network/Packet crafting | `scapy` |
| SSH/remote access | `paramiko`, `asyncssh` |
| Cryptography | `pycryptodomex` |
| DNS | `dnspython` |
| Process/system info | `psutil` |
| Email parsing | `libratom` |
| HTTP | `requests`, `httpserver` |
| Executable packaging | `pyinstaller` |
| Windows-specific | `wmi` |

### Script inventory (all 17 parts)
| Part | Topic | MITRE |
|------|-------|-------|
| Part 2 | Network scanning, DNS exploration | T1046, T1590 |
| Part 3 | Default credential testing, USB autorun | T1078, T1091 |
| Part 4 | Spearphishing links, scheduled execution | T1566, T1053 |
| Part 5 | Registry autorun, hijack execution flow | T1547, T1574 |
| Part 6 | Logon scripts, Python library injection | T1037, T1574 |
| Part 7 | Impair defenses, alternate data streams | T1562, T1564 |
| Part 8 | Credential dumping (Chrome), network sniffing | T1003, T1040 |
| Part 9 | User account discovery, file/dir discovery | T1087, T1083 |
| Part 10 | Remote services (SSH), web session cookie hijack | T1021, T1539 |
| Part 11 | Clipboard data, local email collection | T1115, T1114 |
| Part 12 | Encrypted C2 channels, protocol tunneling | T1573, T1572 |
| Part 13 | DNS exfiltration, non-app layer protocol | T1048.003 |
| Part 14 | Data encryption (ransomware), account access removal | T1486, T1531 |
| Part 15 | Decoy processes, decoy content, decoy credentials | Defensive |
| Part 16 | PCAP collection, protocol decoder, burn-in | Defensive |
| Part 17 | Network monitoring, system activity monitoring, behavioral analytics | Defensive |

---

## Product Vision

### What is CyberLab?

A **personal research lab** — not a SaaS, not a course platform. It lives at your domain, looks like your brain externalized, and doubles as proof of expertise every time someone Googles you.

Three things that feed each other in a loop:
```
[Learn] .ipynb notebooks → [Validate] run it, break it → [Publish] Medium article + personal site
```

### Goals
1. Learn cybersecurity through hands-on notebooks
2. Build a public portfolio of articles on Medium
3. Establish personal brand as a cybersecurity analyst + Python developer
4. Full-stack application that serves the notebooks with a clean, personal UI

---

## Full Product Plan

### Notebook Template (all 24 notebooks follow this)

```
Cell 1  [markdown]  — Title card: MITRE ATT&CK ID | Tactic | Difficulty | Time
Cell 2  [markdown]  — Threat context: real-world breach example
Cell 3  [markdown]  — What you'll understand after this (3 bullet points)
Cell 4  [code]      — Environment setup + imports (annotated)
Cell 5+ [code]      — Script walkthrough in small cells, each with markdown explanation
Cell N  [code]      — Visualization (matplotlib/networkx/plotly)
Cell N+1 [markdown] — Defender's perspective: IOC table, detection rules
Cell N+2 [markdown] — Article seed: title, opening paragraph, section headers, Medium tags
Cell N+3 [code]     — Self-check (assert statements)
```

### 24-Notebook Roadmap

| # | Slug | MITRE | Tactic | Difficulty | Article title |
|---|------|-------|--------|------------|---------------|
| 01 | `01_recon_network_scanning.ipynb` | T1046 | Recon | beginner | "How Attackers Map Your Network Before They Attack" |
| 02 | `02_recon_dns_exploration.ipynb` | T1590.002 | Recon | beginner | "What Your DNS Records Reveal Before You're Even Hacked" |
| 03 | `03_initial_access_default_creds.ipynb` | T1078 | Initial Access | beginner | "Default passwords are still how most breaches start" |
| 04 | `04_initial_access_usb_autorun.ipynb` | T1091 | Initial Access | beginner | "The USB drop attack still works in 2025" |
| 05 | `05_execution_spearphishing.ipynb` | T1566 | Execution | beginner | "Building a phishing server in 30 lines of Python" |
| 06 | `06_execution_scheduled_tasks.ipynb` | T1053 | Execution | beginner | "Persistence through your own task scheduler" |
| 07 | `07_persistence_registry_autorun.ipynb` | T1547 | Persistence | intermediate | "How malware survives a reboot" |
| 08 | `08_persistence_hijack_execution.ipynb` | T1574 | Persistence | intermediate | "PATH hijacking — the attack hiding in plain sight" |
| 09 | `09_persistence_logon_scripts.ipynb` | T1037 | Persistence | intermediate | "Logon scripts as a persistence mechanism" |
| 10 | `10_evasion_impair_defenses.ipynb` | T1562 | Evasion | intermediate | "How attackers blind your security tools" |
| 11 | `11_evasion_alternate_data_streams.ipynb` | T1564 | Evasion | intermediate | "Hiding data inside NTFS Alternate Data Streams" |
| 12 | `12_credential_dumping.ipynb` | T1003 | Cred Access | intermediate | "Browser credential dumping — what Chrome stores and where" |
| 13 | `13_credential_network_sniffing.ipynb` | T1040 | Cred Access | intermediate | "Sniffing FTP, SMTP, Telnet credentials with Scapy" |
| 14 | `14_discovery_users_files.ipynb` | T1083 | Discovery | beginner | "Post-exploitation: mapping what the target has" |
| 15 | `15_lateral_movement_remote_services.ipynb` | T1021 | Lateral Movement | intermediate | "Moving laterally with SSH and Python" |
| 16 | `16_collection_clipboard_email.ipynb` | T1115 | Collection | beginner | "What attackers collect before they exfiltrate" |
| 17 | `17_c2_encrypted_channels.ipynb` | T1573 | C2 | advanced | "Building a C2 channel that blends in with normal traffic" |
| 18 | `18_exfil_dns_tunneling.ipynb` | T1048.003 | Exfiltration | intermediate | "DNS Exfiltration — hiding data in DNS queries" |
| 19 | `19_impact_ransomware_mechanics.ipynb` | T1486 | Impact | intermediate | "How ransomware encrypts files — the Python mechanics" |
| 20 | `20_defense_decoys_honeypots.ipynb` | defensive | Detection | intermediate | "Trapping attackers with Python honeypots" |
| 21 | `21_defense_pcap_analysis.ipynb` | defensive | Detection | intermediate | "Packet capture and analysis with Scapy + Python" |
| 22 | `22_defense_network_monitoring.ipynb` | defensive | Detection | intermediate | "Building a behavioral baseline for network anomaly detection" |
| 23 | `23_defense_behavioral_analytics.ipynb` | defensive | Detection | intermediate | "Process-level behavioral analytics with psutil" |
| 24 | `24_capstone_attack_chain.ipynb` | all | All | advanced | "A full attack chain simulation from recon to impact" |

**Already built (5):** 01, 02, 13, 18, 23

---

## Design System

### Philosophy
Not "dark cybersecurity dashboard with neon green." That's a costume. This should feel like a serious researcher's workspace. Reference points: Linear (clean, fast), Are.na (quiet hierarchy), Rauno Fröberg personal site (dense but not overwhelming).

### Typography
```css
--font-display: 'Space Grotesk';    /* headers, nav, labels */
--font-body:    'IBM Plex Sans';    /* long-form reading, markdown cells */
--font-mono:    'JetBrains Mono';   /* all code, file paths, IPs, hex */
```

### Color Tokens
```css
--bg:             #0F0F0F;   /* warm near-black */
--surface:        #1A1A1A;
--border:         #282828;
--border-faint:   #1F1F1F;
--text-primary:   #EDEAE4;   /* warm white */
--text-secondary: #7A7570;
--text-muted:     #4A4540;
--accent:         #5B8EF0;
--accent-dim:     #1E2D4A;

/* Per-tactic palette */
--t-recon:      #6C9BCF;
--t-initial:    #CF6C6C;
--t-execution:  #CF9B6C;
--t-persist:    #9B6CCF;
--t-evasion:    #6CCF9B;
--t-cred:       #CFB86C;
--t-discovery:  #6CBFCF;
--t-lateral:    #CF6CA0;
--t-collection: #A0CF6C;
--t-c2:         #CF8A6C;
--t-exfil:      #8ACF6C;
--t-impact:     #CF6C6C;
--t-defense:    #6C9BCF;
```

### Layout
```
TopBar (48px) — logo, progress bar, nav links
├── Sidebar (240px) — grouped by ATT&CK tactic, status dots
└── Main — max-width 860px centered reading area
```

### Code cells
- Background: `#141414`
- No border radius (hard edges — terminal feel)
- Line numbers in muted color, non-selectable
- Output block: left border colored by tactic

---

## App Architecture

### Stack
```
Next.js 14 (App Router)     — SSR, file-based routing, API routes
Tailwind CSS + CSS vars      — custom design tokens, no component lib
Framer Motion                — micro-interactions only
D3.js                        — MITRE ATT&CK heatmap
Plotly                       — notebook data visualizations
marked                       — markdown cell rendering
Zustand                      — client state (progress, notes)
Prisma + SQLite/PostgreSQL   — progress tracking, article drafts
Vercel                       — frontend deployment
Railway                      — Jupyter kernel server
```

### File structure
```
cyberlab/
├── app/
│   ├── (dashboard)/page.tsx          ← main dashboard
│   ├── notebooks/
│   │   ├── [slug]/page.tsx           ← individual notebook view
│   │   └── page.tsx                  ← notebook index
│   ├── articles/page.tsx             ← article pipeline
│   ├── mitre/page.tsx                ← MITRE ATT&CK map (TODO)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── notebook/
│   │   └── NotebookRenderer.tsx      ← parses + renders .ipynb
│   └── ui/
│       ├── Sidebar.tsx
│       └── TopBar.tsx
├── lib/
│   ├── mitre.ts                      ← technique registry, tactic colors
│   └── nbformat.ts                   ← .ipynb parser, 24-notebook registry
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

### Pages built
| Route | Status | Description |
|-------|--------|-------------|
| `/` | ✅ Built | Dashboard: tactic coverage bars, stat cards, article pipeline, up-next |
| `/notebooks` | ✅ Built | All 24 notebooks grouped by tactic |
| `/notebooks/[slug]` | ✅ Built | Notebook renderer (reads from `../notebooks/*.ipynb`) |
| `/articles` | ✅ Built | Article pipeline: seed → draft → published |
| `/mitre` | ⬜ TODO | D3 MITRE ATT&CK heatmap |

---

## What Still Needs to Be Built

### Notebooks (19 remaining)
Files 03–12, 14–17, 19–22, 24 in `notebooks/` directory.
Priority order: 19 (ransomware), 12 (credential dump), 15 (lateral movement), 17 (C2).

### App features (TODO list)
- [ ] `/mitre` page — D3.js ATT&CK heatmap, cells light up as notebooks completed
- [ ] Progress persistence — Zustand store + SQLite via Prisma
- [ ] "Mark complete" button on notebook pages
- [ ] Article draft editor — inline markdown editor per notebook
- [ ] "Copy for Medium" — export article seed as formatted MDX
- [ ] Skill radar chart — offense/defense balance visualization
- [ ] JupyterLab integration — "Open in JupyterLab" button linking to running kernel
- [ ] Search — fuzzy search across notebooks and articles
- [ ] Mobile sidebar — drawer/overlay for small screens
- [ ] Dark/system theme toggle (currently dark-only, which is intentional)

### Infrastructure
- [ ] Deploy to Vercel
- [ ] Set up Railway for Jupyter kernel
- [ ] Connect custom domain
- [ ] Set up Prisma + PostgreSQL for production DB

---

## How to Run Locally

```bash
# 1. Install notebook dependencies
pip install -r requirements.txt

# 2. Start Jupyter (for running notebooks)
jupyter lab --notebook-dir=notebooks/

# 3. Install and run the web app
cd cyberlab
npm install
npm run dev
# → http://localhost:3000
```

The app reads `.ipynb` files from `../notebooks/` at build/request time via `fs.readFileSync`. No running Jupyter server needed just to view notebooks in the app — only needed to execute them.

---

## Article Pipeline Strategy

Each notebook ends with a pre-written article seed (Cell N+2). When you complete a notebook:

1. Edit the opening paragraph and section content in the seed cell
2. Hit "Export article draft" in the app (generates MDX)
3. Copy to Medium (import or paste)
4. Add canonical link back to your personal site

The canonical URL structure: `https://yoursite.com/articles/[slug]`

This creates a content loop:
- Medium article → drives traffic to your personal site
- Personal site `/articles` → showcases your research
- GitHub repo → shows the runnable notebooks behind each article

---

## Commit History (this session)

```
6e50cef  Build CyberLab: deep-research notebooks + Next.js app scaffold
         20 files, 4,482 insertions
```

---

## Resuming From CLI

When you pick this up in Claude Code CLI:

```bash
# You're already on the right branch
git checkout claude/explain-codebase-mmjd16iuqmsyoilt-4dkFA
git pull origin claude/explain-codebase-mmjd16iuqmsyoilt-4dkFA

# Read this file for full context
cat context_chathistory.md
```

### Suggested first tasks for CLI session
1. Build the `/mitre` ATT&CK heatmap page (D3.js)
2. Add Zustand progress store + Prisma schema
3. Create 3 more notebooks (suggest: 12 credential dump, 19 ransomware, 17 C2)
4. Wire up the "Mark complete" button to the store
5. Add the article draft editor component

---

## Notes & Decisions

- **No shadcn/UI, no MUI** — everything hand-built to avoid generic AI-generated feel
- **No border radius on code cells** — deliberate, makes them feel like terminals
- **Hard-coded completed set** in components for now — needs Zustand/DB wiring
- **Notebook files use `id` fields** on cells for React keys — required for nbformat v4
- **`marked` for markdown rendering** — lighter than remark, good enough for notebook cells
- **`[slug]/page.tsx` uses `fs.readFileSync`** — works at build time (SSG) and request time (SSR). If notebook file doesn't exist yet, shows a placeholder with the expected filename.
- **Tactic colors are duplicated** in `globals.css` (CSS vars) and `lib/mitre.ts` (JS constants) — needed for both server and client contexts. Keep them in sync.
