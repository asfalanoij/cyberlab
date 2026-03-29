'use client'

import { NOTEBOOK_REGISTRY } from '@/lib/nbformat'
import { TACTIC_LABELS, TACTIC_COLORS, Tactic } from '@/lib/mitre'
import { useProgress } from '@/lib/hooks/useProgress'
import Link from 'next/link'

const TACTIC_ORDER: Tactic[] = [
  'recon', 'initial', 'execution', 'persist', 'evasion', 'cred',
  'discovery', 'lateral', 'collection', 'c2', 'exfil', 'impact', 'defense',
]

export default function MitrePage() {
  const { data: progress } = useProgress()
  const completedSlugs = new Set(
    progress?.filter(p => p.status === 'completed').map(p => p.notebookSlug) ?? []
  )

  // Group notebooks by tactic
  const byTactic: Partial<Record<Tactic, typeof NOTEBOOK_REGISTRY>> = {}
  for (const nb of NOTEBOOK_REGISTRY) {
    if (!byTactic[nb.tactic]) byTactic[nb.tactic] = []
    byTactic[nb.tactic]!.push(nb)
  }

  const totalCompleted = NOTEBOOK_REGISTRY.filter(nb => completedSlugs.has(nb.slug)).length
  const totalNotebooks = NOTEBOOK_REGISTRY.length

  return (
    <div style={{ padding: '36px 40px', maxWidth: 1200 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 22, marginBottom: 4 }}>MITRE ATT&CK Coverage Map</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
          {totalCompleted} of {totalNotebooks} techniques covered · {TACTIC_ORDER.length} tactics
        </p>
      </div>

      {/* Heatmap grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${TACTIC_ORDER.length}, 1fr)`,
          gap: 2,
        }}
      >
        {/* Tactic headers */}
        {TACTIC_ORDER.map(tactic => (
          <div
            key={`header-${tactic}`}
            style={{
              padding: '10px 6px 8px',
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: TACTIC_COLORS[tactic],
              textAlign: 'center',
              borderBottom: `2px solid ${TACTIC_COLORS[tactic]}`,
            }}
          >
            {TACTIC_LABELS[tactic]}
          </div>
        ))}

        {/* Technique cells — fill columns */}
        {TACTIC_ORDER.map(tactic => {
          const nbs = byTactic[tactic] ?? []
          return (
            <div key={`col-${tactic}`} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {nbs.map(nb => {
                const completed = completedSlugs.has(nb.slug)
                const color = TACTIC_COLORS[nb.tactic as Tactic]
                return (
                  <Link
                    key={nb.slug}
                    href={`/notebooks/${nb.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        padding: '8px 6px',
                        background: completed ? color + '22' : 'var(--surface)',
                        border: `1px solid ${completed ? color + '44' : 'var(--border)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        position: 'relative',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = color
                        e.currentTarget.style.background = color + '15'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = completed ? color + '44' : 'var(--border)'
                        e.currentTarget.style.background = completed ? color + '22' : 'var(--surface)'
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 9,
                          color: completed ? color : 'var(--text-muted)',
                          marginBottom: 2,
                        }}
                      >
                        {nb.technique}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: completed ? 'var(--text-primary)' : 'var(--text-secondary)',
                          lineHeight: 1.3,
                        }}
                      >
                        {nb.title}
                      </div>
                      {completed && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 4,
                            right: 6,
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: color,
                          }}
                        />
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{ marginTop: 24, display: 'flex', gap: 20, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)' }}>
            Completed
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', border: '1px solid var(--text-muted)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)' }}>
            Not started
          </span>
        </div>
      </div>
    </div>
  )
}
