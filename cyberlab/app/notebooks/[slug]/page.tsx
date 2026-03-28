import { NOTEBOOK_REGISTRY, parseNotebook } from '@/lib/nbformat'
import { NotebookRenderer } from '@/components/notebook/NotebookRenderer'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return NOTEBOOK_REGISTRY.map(nb => ({ slug: nb.slug }))
}

export async function generateMetadata({ params }: Props) {
  const nb = NOTEBOOK_REGISTRY.find(n => n.slug === params.slug)
  if (!nb) return { title: 'Not found' }
  return {
    title: `${nb.title} — CyberLab`,
    description: `${nb.technique} · ${nb.difficulty} · ${nb.tags.join(', ')}`,
  }
}

export default function NotebookPage({ params }: Props) {
  const entry = NOTEBOOK_REGISTRY.find(n => n.slug === params.slug)
  if (!entry) notFound()

  // Notebooks live at ../../notebooks/ relative to this app
  const notebooksDir = path.join(process.cwd(), '..', 'notebooks')
  const filePath     = path.join(notebooksDir, entry.filename)

  let notebook
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    notebook  = parseNotebook(raw)
  } catch {
    // Notebook file doesn't exist yet — show placeholder
    return (
      <div style={{ padding: '60px 40px', maxWidth: 680 }}>
        <div
          style={{
            borderLeft:  `3px solid ${entry.color}`,
            paddingLeft: 20,
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      10,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color:         entry.color,
              display:       'block',
              marginBottom:  8,
            }}
          >
            {entry.technique}
          </span>
          <h1 style={{ fontSize: 24, marginBottom: 8 }}>{entry.title}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
            This notebook hasn&apos;t been created yet.
          </p>
        </div>

        <div
          style={{
            background:   'var(--surface)',
            border:       '1px solid var(--border)',
            borderRadius: 4,
            padding:      '16px 18px',
          }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>
            Expected file:{' '}
            <code style={{ color: 'var(--accent)' }}>notebooks/{entry.filename}</code>
          </p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
            Tags: {entry.tags.join(' · ')}
          </p>
        </div>
      </div>
    )
  }

  return <NotebookRenderer notebook={notebook} />
}
