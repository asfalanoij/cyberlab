'use client'

import Link from 'next/link'
import { NOTEBOOK_REGISTRY } from '@/lib/nbformat'
import { useRequireAuth } from '@/lib/hooks/useAuth'
import { useProgress } from '@/lib/hooks/useProgress'
import { signOut } from '@/lib/services/auth'
import { useRouter } from 'next/navigation'

export function TopBar() {
  const router = useRouter()
  const { user, isAuthenticated } = useRequireAuth()
  const { data: progress } = useProgress()
  const total = NOTEBOOK_REGISTRY.length
  const completedCount = progress?.filter(p => p.status === 'completed').length ?? 0
  const pct = Math.round((completedCount / total) * 100)

  return (
    <header
      className="topbar"
      style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        '0 20px',
        borderBottom:   '1px solid var(--border)',
        background:     'var(--bg)',
        position:       'sticky',
        top:            0,
        zIndex:         50,
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontFamily:    'var(--font-display)',
          fontWeight:    600,
          fontSize:      15,
          letterSpacing: '-0.01em',
          color:         'var(--text-primary)',
          textDecoration: 'none',
        }}
      >
        cyberlab
        <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>.research</span>
      </Link>

      {/* Progress indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   11,
            color:      'var(--text-muted)',
            letterSpacing: '0.04em',
          }}
        >
          {completedCount}/{total} modules
        </span>

        <div
          className="progress-bar"
          style={{ width: 120 }}
          title={`${pct}% complete`}
        >
          <div
            className="progress-bar-fill"
            style={{ width: `${pct}%` }}
          />
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   11,
            color:      'var(--text-secondary)',
          }}
        >
          {pct}%
        </span>
      </div>

      {/* Nav links + Auth */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {[
          { href: '/',         label: 'Dashboard' },
          { href: '/notebooks', label: 'Notebooks' },
          { href: '/mitre',    label: 'ATT&CK Map' },
          { href: '/articles', label: 'Articles' },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   13,
              color:      'var(--text-secondary)',
              padding:    '4px 10px',
              borderRadius: 4,
              textDecoration: 'none',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            {label}
          </Link>
        ))}

        <span style={{ width: 1, height: 16, background: 'var(--border)', margin: '0 6px' }} />

        {isAuthenticated ? (
          <button
            onClick={() => { signOut(); router.push('/login') }}
            style={{
              background: 'none', border: 'none', color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer',
              padding: '4px 8px',
            }}
          >
            {user?.name ?? user?.email} · sign out
          </button>
        ) : (
          <Link
            href="/login"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: 'var(--accent)', padding: '4px 8px', textDecoration: 'none',
            }}
          >
            sign in
          </Link>
        )}
      </nav>
    </header>
  )
}
