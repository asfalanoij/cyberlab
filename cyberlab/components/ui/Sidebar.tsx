'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NOTEBOOK_REGISTRY } from '@/lib/nbformat'
import { TACTIC_LABELS, Tactic } from '@/lib/mitre'

// Group notebooks by tactic for sidebar sections
function groupByTactic(notebooks: typeof NOTEBOOK_REGISTRY) {
  const groups: Partial<Record<Tactic, typeof NOTEBOOK_REGISTRY>> = {}
  for (const nb of notebooks) {
    if (!groups[nb.tactic]) groups[nb.tactic] = []
    groups[nb.tactic]!.push(nb)
  }
  return groups
}

// Placeholder completed set — in production this comes from DB/store
const COMPLETED_SLUGS = new Set([
  '01-recon-network-scanning',
  '02-recon-dns-exploration',
  '13-cred-network-sniffing',
  '18-exfil-dns-tunneling',
])

export function Sidebar() {
  const pathname  = usePathname()
  const groups    = groupByTactic(NOTEBOOK_REGISTRY)

  // Only show tactics that have notebooks
  const tacticOrder: Tactic[] = [
    'recon', 'initial', 'execution', 'persist',
    'evasion', 'cred', 'discovery', 'lateral',
    'collection', 'c2', 'exfil', 'impact', 'defense',
  ]

  return (
    <aside
      className="sidebar"
      style={{
        borderRight:   '1px solid var(--border)',
        background:    'var(--bg)',
        paddingTop:    12,
        paddingBottom: 24,
      }}
    >
      {/* Dashboard link */}
      <SidebarNavItem href="/" label="Dashboard" active={pathname === '/'} />
      <SidebarNavItem href="/mitre" label="ATT&CK Map" active={pathname === '/mitre'} />
      <SidebarNavItem href="/articles" label="Article Pipeline" active={pathname === '/articles'} />

      <div style={{ height: 16 }} />

      {/* Notebook groups */}
      {tacticOrder.map(tactic => {
        const nbs = groups[tactic]
        if (!nbs || nbs.length === 0) return null

        return (
          <div key={tactic} style={{ marginBottom: 4 }}>
            {/* Section header */}
            <div
              style={{
                padding:       '8px 16px 4px',
                fontFamily:    'var(--font-mono)',
                fontSize:      10,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color:         'var(--text-muted)',
              }}
            >
              {TACTIC_LABELS[tactic]}
            </div>

            {nbs.map(nb => {
              const completed = COMPLETED_SLUGS.has(nb.slug)
              const active    = pathname === `/notebooks/${nb.slug}`

              return (
                <Link
                  key={nb.slug}
                  href={`/notebooks/${nb.slug}`}
                  className={`sidebar-item ${active ? 'active' : ''}`}
                  style={{ textDecoration: 'none' }}
                >
                  {/* Tactic-colored status dot */}
                  <span
                    className="sidebar-dot"
                    style={{
                      backgroundColor: completed ? nb.color : 'transparent',
                      borderColor:     completed ? nb.color : 'var(--text-muted)',
                      border:          completed ? 'none' : '1px solid var(--text-muted)',
                    }}
                  />
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {nb.title}
                  </span>
                </Link>
              )
            })}
          </div>
        )
      })}
    </aside>
  )
}

function SidebarNavItem({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`sidebar-item ${active ? 'active' : ''}`}
      style={{ textDecoration: 'none', fontWeight: active ? 500 : 400 }}
    >
      <span
        style={{
          width:           6,
          height:          6,
          borderRadius:    '50%',
          backgroundColor: active ? 'var(--accent)' : 'transparent',
          flexShrink:      0,
        }}
      />
      {label}
    </Link>
  )
}
