'use client'

import { useState } from 'react'
import { NOTEBOOK_REGISTRY } from '@/lib/nbformat'

const COMPLETED_SLUGS = new Set([
  '01-recon-network-scanning',
  '02-recon-dns-exploration',
  '13-cred-network-sniffing',
  '18-exfil-dns-tunneling',
])

type PipelineStatus = 'seed' | 'draft' | 'published'

interface ArticleItem {
  slug:      string
  title:     string
  status:    PipelineStatus
  mediumUrl: string | null
  tags:      string
}

const ARTICLES: ArticleItem[] = [
  {
    slug:      '01-recon-network-scanning',
    title:     'How Attackers Map Your Network Before They Attack — A Python Breakdown',
    status:    'draft',
    mediumUrl: null,
    tags:      'cybersecurity, python, network-security, ethical-hacking, scapy',
  },
  {
    slug:      '18-exfil-dns-tunneling',
    title:     "DNS Exfiltration: Stealing Data Through Your Firewall's Blind Spot",
    status:    'seed',
    mediumUrl: null,
    tags:      'cybersecurity, dns, python, exfiltration, threat-detection',
  },
  {
    slug:      '13-cred-network-sniffing',
    title:     'How Attackers Steal Credentials From Your Network Traffic (And How to Stop Them)',
    status:    'seed',
    mediumUrl: null,
    tags:      'cybersecurity, networking, python, credentials, blue-team',
  },
  {
    slug:      '23-defense-behavioral',
    title:     'Building a Behavioral Anomaly Detector in Python — The Concept Behind CrowdStrike',
    status:    'seed',
    mediumUrl: null,
    tags:      'cybersecurity, python, blue-team, threat-detection, ueba',
  },
]

const STATUS_LABELS: Record<PipelineStatus, string> = {
  seed:      'Seed',
  draft:     'Draft',
  published: 'Published',
}

const STATUS_COLORS: Record<PipelineStatus, string> = {
  seed:      'var(--text-muted)',
  draft:     'var(--accent)',
  published: '#6CCF9B',
}

export default function ArticlesPage() {
  const [filter, setFilter] = useState<PipelineStatus | 'all'>('all')

  const filtered = filter === 'all'
    ? ARTICLES
    : ARTICLES.filter(a => a.status === filter)

  const counts = {
    all:       ARTICLES.length,
    seed:      ARTICLES.filter(a => a.status === 'seed').length,
    draft:     ARTICLES.filter(a => a.status === 'draft').length,
    published: ARTICLES.filter(a => a.status === 'published').length,
  }

  return (
    <div style={{ padding: '36px 40px', maxWidth: 780 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, marginBottom: 4 }}>Article Pipeline</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
          From notebook to Medium. Each completed notebook generates an article seed.
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 24 }}>
        {(['all', 'seed', 'draft', 'published'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      11,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding:       '5px 12px',
              borderRadius:  3,
              border:        filter === f ? '1px solid var(--accent)' : '1px solid var(--border)',
              background:    filter === f ? 'var(--accent-dim)' : 'transparent',
              color:         filter === f ? 'var(--accent)' : 'var(--text-muted)',
              cursor:        'pointer',
            }}
          >
            {f} <span style={{ opacity: 0.6 }}>{counts[f]}</span>
          </button>
        ))}
      </div>

      {/* Article cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(article => {
          const notebook = NOTEBOOK_REGISTRY.find(n => n.slug === article.slug)

          return (
            <div
              key={article.slug}
              className="pipeline-card"
              style={{ padding: '16px 18px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                {/* Status badge */}
                <span
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      9,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color:         STATUS_COLORS[article.status],
                    padding:       '2px 6px',
                    border:        `1px solid ${STATUS_COLORS[article.status]}`,
                    borderRadius:  2,
                    opacity:       0.85,
                  }}
                >
                  {STATUS_LABELS[article.status]}
                </span>

                {/* Source notebook link */}
                {notebook && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize:   10,
                      color:      notebook.color,
                      opacity:    0.7,
                    }}
                  >
                    {notebook.technique}
                  </span>
                )}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize:   15,
                  fontWeight: 500,
                  marginBottom: 8,
                  lineHeight: 1.4,
                }}
              >
                {article.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize:   10,
                  color:      'var(--text-muted)',
                  marginBottom: 12,
                }}
              >
                {article.tags}
              </p>

              <div style={{ display: 'flex', gap: 8 }}>
                <ActionButton label="View notebook" href={`/notebooks/${article.slug}`} />
                {article.status === 'draft' && (
                  <ActionButton label="Copy for Medium" href="#" primary />
                )}
                {article.status === 'seed' && (
                  <ActionButton label="Open draft editor" href="#" />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Locked seeds — notebooks not yet completed */}
      <div style={{ marginTop: 36 }}>
        <h4
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      10,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color:         'var(--text-muted)',
            marginBottom:  12,
          }}
        >
          Available when notebook is completed
        </h4>
        {NOTEBOOK_REGISTRY
          .filter(nb => !COMPLETED_SLUGS.has(nb.slug) && !ARTICLES.find(a => a.slug === nb.slug))
          .slice(0, 6)
          .map(nb => (
            <div
              key={nb.slug}
              style={{
                display:      'flex',
                alignItems:   'center',
                gap:          10,
                padding:      '8px 0',
                borderBottom: '1px solid var(--border-faint)',
                opacity:      0.4,
              }}
            >
              <span
                style={{
                  width:        6,
                  height:       6,
                  borderRadius: '50%',
                  border:       `1px solid ${nb.color}`,
                }}
              />
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                {nb.title}
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}

function ActionButton({ label, href, primary }: { label: string; href: string; primary?: boolean }) {
  return (
    <a
      href={href}
      style={{
        fontFamily:    'var(--font-body)',
        fontSize:      11,
        padding:       '5px 10px',
        borderRadius:  3,
        border:        primary ? 'none' : '1px solid var(--border)',
        background:    primary ? 'var(--accent)' : 'var(--surface-raised)',
        color:         primary ? '#fff' : 'var(--text-secondary)',
        textDecoration: 'none',
        cursor:        'pointer',
      }}
    >
      {label}
    </a>
  )
}
