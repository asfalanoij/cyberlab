import { NOTEBOOK_REGISTRY } from '@/lib/nbformat'
import { TACTIC_LABELS, TACTIC_ORDER, Tactic } from '@/lib/mitre'
import Link from 'next/link'

// Placeholder — would come from DB in production
const COMPLETED_SLUGS = new Set([
  '01-recon-network-scanning',
  '02-recon-dns-exploration',
  '13-cred-network-sniffing',
  '18-exfil-dns-tunneling',
])

const ARTICLE_DRAFTS = [
  { slug: '01-recon-network-scanning',   title: 'How Attackers Map Your Network Before They Attack',        status: 'draft' as const },
  { slug: '18-exfil-dns-tunneling',      title: 'DNS Exfiltration: Stealing Data Through Your Firewall\'s Blind Spot', status: 'seed' as const },
  { slug: '13-cred-network-sniffing',    title: 'How Attackers Steal Credentials From Your Network Traffic', status: 'seed' as const },
]

export default function Dashboard() {
  const total     = NOTEBOOK_REGISTRY.length
  const completed = COMPLETED_SLUGS.size
  const pct       = Math.round((completed / total) * 100)

  // Coverage by tactic
  const tacticCoverage: Record<string, { done: number; total: number; color: string }> = {}
  for (const nb of NOTEBOOK_REGISTRY) {
    if (!tacticCoverage[nb.tactic]) {
      tacticCoverage[nb.tactic] = { done: 0, total: 0, color: nb.color }
    }
    tacticCoverage[nb.tactic].total++
    if (COMPLETED_SLUGS.has(nb.slug)) tacticCoverage[nb.tactic].done++
  }

  return (
    <div style={{ padding: '36px 40px', maxWidth: 1100 }}>

      {/* ── Page title ────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 22, marginBottom: 4 }}>Research Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
          {completed} of {total} notebooks completed · {ARTICLE_DRAFTS.length} articles in pipeline
        </p>
      </div>

      {/* ── Top row: stats + activity ─────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
        <StatCard label="Notebooks completed" value={`${completed}/${total}`} sub={`${pct}%`} />
        <StatCard label="Tactics covered" value={`${Object.values(tacticCoverage).filter(t => t.done > 0).length}/13`} sub="ATT&CK tactics" />
        <StatCard label="Article pipeline" value={String(ARTICLE_DRAFTS.length)} sub="drafts & seeds" />
      </div>

      {/* ── Main content: two columns ─────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 28 }}>

        {/* ── Left: MITRE tactic coverage ─────────── */}
        <div>
          <SectionHeader>ATT&CK Tactic Coverage</SectionHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {TACTIC_ORDER.map(tactic => {
              const cov = tacticCoverage[tactic]
              if (!cov) return null
              const tacticPct = Math.round((cov.done / cov.total) * 100)

              return (
                <div key={tactic} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize:   11,
                      color:      'var(--text-secondary)',
                      width:      140,
                      flexShrink: 0,
                    }}
                  >
                    {TACTIC_LABELS[tactic]}
                  </span>

                  <div
                    className="progress-bar"
                    style={{ flex: 1, height: 4 }}
                  >
                    <div
                      className="progress-bar-fill"
                      style={{
                        width:      `${tacticPct}%`,
                        background: cov.done > 0 ? cov.color : 'var(--border)',
                        transition: 'width 0.5s ease',
                      }}
                    />
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize:   10,
                      color:      cov.done > 0 ? cov.color : 'var(--text-muted)',
                      width:      36,
                      textAlign:  'right',
                      flexShrink: 0,
                    }}
                  >
                    {cov.done}/{cov.total}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Recently completed */}
          <div style={{ marginTop: 32 }}>
            <SectionHeader>Recently Completed</SectionHeader>
            {NOTEBOOK_REGISTRY
              .filter(nb => COMPLETED_SLUGS.has(nb.slug))
              .slice(0, 4)
              .map(nb => (
                <Link
                  key={nb.slug}
                  href={`/notebooks/${nb.slug}`}
                  style={{
                    display:        'flex',
                    alignItems:     'center',
                    gap:            10,
                    padding:        '8px 0',
                    borderBottom:   '1px solid var(--border-faint)',
                    textDecoration: 'none',
                    color:          'var(--text-primary)',
                  }}
                >
                  <span
                    style={{
                      width:           8,
                      height:          8,
                      borderRadius:    '50%',
                      backgroundColor: nb.color,
                      flexShrink:      0,
                    }}
                  />
                  <span style={{ fontSize: 13, flex: 1 }}>{nb.title}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize:   10,
                      color:      'var(--text-muted)',
                    }}
                  >
                    {nb.technique}
                  </span>
                </Link>
              ))}
          </div>
        </div>

        {/* ── Right: article pipeline ──────────────── */}
        <div>
          <SectionHeader>Article Pipeline</SectionHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ARTICLE_DRAFTS.map(article => (
              <div key={article.slug} className="pipeline-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <span
                    style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      9,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color:         article.status === 'draft' ? 'var(--accent)' : 'var(--text-muted)',
                      padding:       '1px 5px',
                      border:        `1px solid ${article.status === 'draft' ? 'var(--accent)' : 'var(--border)'}`,
                      borderRadius:  2,
                    }}
                  >
                    {article.status}
                  </span>
                </div>
                <p style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--text-primary)' }}>
                  {article.title}
                </p>
              </div>
            ))}
          </div>

          {/* Up next */}
          <div style={{ marginTop: 24 }}>
            <SectionHeader>Up Next</SectionHeader>
            {NOTEBOOK_REGISTRY
              .filter(nb => !COMPLETED_SLUGS.has(nb.slug))
              .slice(0, 5)
              .map(nb => (
                <Link
                  key={nb.slug}
                  href={`/notebooks/${nb.slug}`}
                  style={{
                    display:        'flex',
                    alignItems:     'center',
                    gap:            8,
                    padding:        '7px 0',
                    borderBottom:   '1px solid var(--border-faint)',
                    textDecoration: 'none',
                  }}
                >
                  <span
                    style={{
                      width:        6,
                      height:       6,
                      borderRadius: '50%',
                      border:       `1px solid ${nb.color}`,
                      flexShrink:   0,
                    }}
                  />
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1 }}>
                    {nb.title}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div
      style={{
        background:   'var(--surface)',
        border:       '1px solid var(--border)',
        borderRadius: 4,
        padding:      '16px 18px',
      }}
    >
      <div
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      9,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color:         'var(--text-muted)',
          marginBottom:  8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily:    'var(--font-display)',
          fontSize:      28,
          fontWeight:    600,
          letterSpacing: '-0.03em',
          color:         'var(--text-primary)',
          lineHeight:    1,
          marginBottom:  4,
        }}
      >
        {value}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>
        {sub}
      </div>
    </div>
  )
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h4
      style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      10,
        fontWeight:    500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color:         'var(--text-muted)',
        marginBottom:  12,
        paddingBottom: 6,
        borderBottom:  '1px solid var(--border-faint)',
      }}
    >
      {children}
    </h4>
  )
}
