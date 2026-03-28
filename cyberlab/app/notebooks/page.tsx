import { NOTEBOOK_REGISTRY } from '@/lib/nbformat'
import { TACTIC_LABELS, TACTIC_ORDER, Tactic } from '@/lib/mitre'
import Link from 'next/link'

const COMPLETED_SLUGS = new Set([
  '01-recon-network-scanning',
  '02-recon-dns-exploration',
  '13-cred-network-sniffing',
  '18-exfil-dns-tunneling',
])

function groupByTactic(notebooks: typeof NOTEBOOK_REGISTRY) {
  const groups: Partial<Record<Tactic, typeof NOTEBOOK_REGISTRY>> = {}
  for (const nb of notebooks) {
    if (!groups[nb.tactic]) groups[nb.tactic] = []
    groups[nb.tactic]!.push(nb)
  }
  return groups
}

export default function NotebooksIndex() {
  const groups = groupByTactic(NOTEBOOK_REGISTRY)

  return (
    <div style={{ padding: '36px 40px', maxWidth: 900 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 22, marginBottom: 4 }}>Notebooks</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
          {NOTEBOOK_REGISTRY.length} notebooks · mapped to MITRE ATT&CK
        </p>
      </div>

      {TACTIC_ORDER.map(tactic => {
        const nbs = groups[tactic]
        if (!nbs || nbs.length === 0) return null

        return (
          <div key={tactic} style={{ marginBottom: 32 }}>
            <div
              style={{
                display:       'flex',
                alignItems:    'center',
                gap:           10,
                marginBottom:  12,
                paddingBottom: 8,
                borderBottom:  '1px solid var(--border-faint)',
              }}
            >
              <span
                style={{
                  width:           8,
                  height:          8,
                  borderRadius:    '50%',
                  backgroundColor: nbs[0].color,
                  flexShrink:      0,
                }}
              />
              <span
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      13,
                  fontWeight:    600,
                  color:         'var(--text-primary)',
                }}
              >
                {TACTIC_LABELS[tactic]}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>
                {nbs.filter(n => COMPLETED_SLUGS.has(n.slug)).length}/{nbs.length}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {nbs.map(nb => {
                const completed = COMPLETED_SLUGS.has(nb.slug)

                return (
                  <Link
                    key={nb.slug}
                    href={`/notebooks/${nb.slug}`}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      gap:            12,
                      padding:        '10px 12px',
                      borderRadius:   4,
                      textDecoration: 'none',
                      border:         '1px solid transparent',
                      transition:     'border-color 0.15s, background 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background    = 'var(--surface)'
                      e.currentTarget.style.borderColor   = 'var(--border)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background    = 'transparent'
                      e.currentTarget.style.borderColor   = 'transparent'
                    }}
                  >
                    <span
                      style={{
                        width:           8,
                        height:          8,
                        borderRadius:    '50%',
                        backgroundColor: completed ? nb.color : 'transparent',
                        border:          completed ? 'none' : `1px solid var(--text-muted)`,
                        flexShrink:      0,
                      }}
                    />

                    <span style={{ flex: 1, fontSize: 13, color: 'var(--text-primary)' }}>
                      {nb.title}
                    </span>

                    <span
                      style={{
                        fontFamily:    'var(--font-mono)',
                        fontSize:      10,
                        color:         'var(--text-muted)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {nb.technique}
                    </span>

                    <span
                      style={{
                        fontFamily:    'var(--font-mono)',
                        fontSize:      9,
                        padding:       '1px 5px',
                        border:        '1px solid var(--border)',
                        borderRadius:  2,
                        color:         nb.difficulty === 'advanced' ? '#CF9B6C' :
                                       nb.difficulty === 'intermediate' ? 'var(--text-muted)' : 'var(--text-muted)',
                      }}
                    >
                      {nb.difficulty}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
