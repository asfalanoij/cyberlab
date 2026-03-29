# Project Tree

> Auto-generated: 2026-03-29

```
cyberlab/
├── .gitignore
├── LICENSE                          # GPL-3.0
├── README.md
├── package.json                     # npm workspaces root
├── context_chathistory.md           # session handoff context
├── requirements.txt                 # Python notebook dependencies
│
├── docs/
│   ├── TREE.md                      # ← you are here
│   ├── MILESTONES.md                # milestone roadmap
│   └── SPRINT.md                    # sprint tracking
│
├── apps/
│   ├── api/                         # Express backend
│   │   ├── .env                     # PORT, DB, auth secret (gitignored)
│   │   ├── package.json             # @cyberlab/api
│   │   ├── tsconfig.json
│   │   ├── drizzle.config.ts        # SQLite → Postgres migration path
│   │   ├── data/
│   │   │   └── .gitkeep             # SQLite DB lives here (gitignored)
│   │   └── src/
│   │       ├── index.ts             # Express app entry, seeds DB on start
│   │       ├── db/
│   │       │   ├── schema.ts        # 6 tables: users, sessions, accounts, verifications, notebooks, progress
│   │       │   └── index.ts         # Drizzle + better-sqlite3 client
│   │       ├── lib/
│   │       │   └── auth.ts          # Better Auth config (email/password)
│   │       ├── routes/
│   │       │   ├── auth.ts          # /api/auth/* → Better Auth handler
│   │       │   ├── notebooks.ts     # GET /api/notebooks, GET /api/notebooks/:slug
│   │       │   └── progress.ts      # GET/POST /api/progress (auth required)
│   │       └── services/
│   │           ├── notebook.service.ts  # list, getBySlug, seed (24 notebooks)
│   │           └── progress.service.ts  # getByUser, upsert
│   │
│   └── web/                         # (placeholder — cyberlab/ moves here in future refactor)
│
├── cyberlab/                        # Next.js 14 frontend
│   ├── .env.local                   # NEXT_PUBLIC_API_URL (gitignored)
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── app/
│   │   ├── globals.css              # design tokens, layout shell, cell styles
│   │   ├── layout.tsx               # root layout: QueryProvider + TopBar + Sidebar + main
│   │   ├── (dashboard)/page.tsx     # / — progress stats, tactic coverage, article pipeline
│   │   ├── notebooks/
│   │   │   ├── page.tsx             # /notebooks — all 24 grouped by tactic
│   │   │   └── [slug]/page.tsx      # /notebooks/:slug — reads .ipynb, renders cells
│   │   ├── articles/page.tsx        # /articles — article pipeline tracker
│   │   ├── mitre/page.tsx           # /mitre — ATT&CK heatmap with progress overlay
│   │   └── login/page.tsx           # /login — email/password auth
│   ├── components/
│   │   ├── notebook/
│   │   │   ├── NotebookRenderer.tsx # parses + renders .ipynb cells
│   │   │   └── MarkCompleteButton.tsx # progress toggle (TanStack Query mutation)
│   │   ├── providers/
│   │   │   └── QueryProvider.tsx    # TanStack Query client provider
│   │   └── ui/
│   │       ├── Sidebar.tsx          # tactic-grouped notebook nav
│   │       └── TopBar.tsx           # logo, progress bar, nav, auth controls
│   └── lib/
│       ├── mitre.ts                 # tactic colors, labels, types
│       ├── nbformat.ts              # .ipynb parser, 24-notebook registry
│       ├── services/                # client API modules
│       │   ├── index.ts             # barrel export
│       │   ├── api.ts               # apiFetch wrapper (credentials, error handling)
│       │   ├── auth.ts              # Better Auth React client (signIn, signUp, signOut, useSession)
│       │   ├── notebooks.ts         # notebookService.list(), .get(slug)
│       │   └── progress.ts          # progressService.list(), .update(slug, status)
│       └── hooks/                   # TanStack Query hooks
│           ├── index.ts             # barrel export
│           ├── useAuth.ts           # useSession, useRequireAuth
│           ├── useNotebooks.ts      # useNotebooks, useNotebook(slug)
│           └── useProgress.ts       # useProgress, useUpdateProgress, useIsCompleted
│
├── packages/
│   └── shared/                      # @cyberlab/shared
│       ├── package.json
│       ├── index.ts                 # barrel export
│       ├── types.ts                 # Tactic, NotebookMeta, Progress, User, ApiResponse
│       └── mitre.ts                 # TACTIC_COLORS, TACTIC_LABELS, TACTIC_ORDER
│
├── notebooks/                       # Jupyter notebooks (24 planned)
│   ├── 01_recon_network_scanning.ipynb          # ✅ T1046
│   ├── 02_recon_dns_exploration.ipynb           # ✅ T1590.002
│   ├── 03_initial_access_default_creds.ipynb    # ✅ T1078
│   ├── 04_initial_access_usb_autorun.ipynb      # ✅ T1091
│   ├── 05_execution_spearphishing.ipynb         # ✅ T1566
│   ├── 06_execution_scheduled_tasks.ipynb       # ✅ T1053
│   ├── 07_persistence_registry_autorun.ipynb    # ✅ T1547
│   ├── 08_persistence_hijack_execution.ipynb    # ✅ T1574
│   ├── 09_persistence_logon_scripts.ipynb       # ⬜ T1037
│   ├── 10_evasion_impair_defenses.ipynb         # ⬜ T1562
│   ├── 11_evasion_alternate_data_streams.ipynb  # ⬜ T1564
│   ├── 12_credential_dumping.ipynb              # ⬜ T1003
│   ├── 13_credential_network_sniffing.ipynb     # ✅ T1040
│   ├── 14_discovery_users_files.ipynb           # ⬜ T1083
│   ├── 15_lateral_movement_remote_services.ipynb # ⬜ T1021
│   ├── 16_collection_clipboard_email.ipynb      # ⬜ T1115
│   ├── 17_c2_encrypted_channels.ipynb           # ⬜ T1573
│   ├── 18_exfil_dns_tunneling.ipynb             # ✅ T1048.003
│   ├── 19_impact_ransomware_mechanics.ipynb     # ⬜ T1486
│   ├── 20_defense_decoys_honeypots.ipynb        # ⬜ T1486
│   ├── 21_defense_pcap_analysis.ipynb           # ⬜ defensive
│   ├── 22_defense_network_monitoring.ipynb      # ⬜ defensive
│   ├── 23_defense_behavioral_analytics.ipynb    # ✅ defensive
│   └── 24_capstone_attack_chain.ipynb           # ⬜ all
│
└── Part_2..17/                      # Original Infosec Institute scripts
    ├── Part_2/   Network scanning, DNS
    ├── Part_3/   Default credentials, USB autorun
    ├── Part_4/   Spearphishing, scheduled execution
    ├── Part_5/   Registry autorun, hijack execution
    ├── Part_6/   Logon scripts, library injection
    ├── Part_7/   Impair defenses, ADS
    ├── Part_8/   Chrome credential dump, network sniffing
    ├── Part_9/   User/file discovery
    ├── Part_10/  Remote services, session cookies
    ├── Part_11/  Clipboard, email collection
    ├── Part_12/  Encrypted channels, protocol tunneling
    ├── Part_13/  DNS exfiltration, non-app protocol
    ├── Part_14/  Data encryption (ransomware), account removal
    ├── Part_15/  Decoy processes, content, credentials
    ├── Part_16/  PCAP collection, protocol decoder, burn-in
    └── Part_17/  Network monitoring, system activity, behavioral analytics
```
