'use client'

import { useState } from 'react'
import { signIn, signUp } from '@/lib/services/auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignUp) {
        const res = await signUp.email({ email, password, name })
        if (res.error) { setError(res.error.message ?? 'Sign up failed'); return }
      } else {
        const res = await signIn.email({ email, password })
        if (res.error) { setError(res.error.message ?? 'Sign in failed'); return }
      }
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: 40 }}>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <h1 style={{ fontSize: 22, marginBottom: 4 }}>
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 28 }}>
          {isSignUp ? 'Set up your CyberLab research account' : 'Welcome back to CyberLab'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {isSignUp && (
            <InputField label="Name" type="text" value={name} onChange={setName} placeholder="Rudy Prasetiya" />
          )}
          <InputField label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
          <InputField label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />

          {error && (
            <p style={{ color: '#CF6C6C', fontSize: 12, fontFamily: 'var(--font-mono)' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 4,
              padding: '10px 0',
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 500,
              cursor: loading ? 'wait' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError('') }}
            style={{
              background: 'none', border: 'none', color: 'var(--accent)',
              cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit',
            }}
          >
            {isSignUp ? 'Sign in' : 'Create one'}
          </button>
        </p>
      </div>
    </div>
  )
}

function InputField({
  label, type, value, onChange, placeholder,
}: {
  label: string; type: string; value: string; onChange: (v: string) => void; placeholder: string
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 10,
        letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)',
      }}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required
        style={{
          padding: '8px 12px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          outline: 'none',
        }}
      />
    </label>
  )
}
