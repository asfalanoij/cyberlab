'use client'

import { ParsedNotebook, CodeCell, MarkdownCell, flattenOutput, getOutputImage } from '@/lib/nbformat'
import { TACTIC_COLORS, TACTIC_LABELS } from '@/lib/mitre'
import { useState } from 'react'
import { marked } from 'marked'

interface Props {
  notebook: ParsedNotebook
}

export function NotebookRenderer({ notebook }: Props) {
  const { meta, cells } = notebook
  const tacticColor = TACTIC_COLORS[meta.mitre_tactic]

  return (
    <div
      data-tactic={meta.mitre_tactic}
      style={{ maxWidth: 860, margin: '0 auto', padding: '32px 40px 80px' }}
    >
      {/* ── Header Card ─────────────────────────────── */}
      <NotebookHeader meta={meta} tacticColor={tacticColor} />

      {/* ── Cells ───────────────────────────────────── */}
      <div style={{ marginTop: 32 }}>
        {cells.map(cell =>
          cell.type === 'markdown'
            ? <MarkdownCellView key={cell.id} cell={cell} />
            : <CodeCellView     key={cell.id} cell={cell} />
        )}
      </div>
    </div>
  )
}


function NotebookHeader({ meta, tacticColor }: { meta: ParsedNotebook['meta']; tacticColor: string }) {
  return (
    <div
      style={{
        borderLeft: `3px solid ${tacticColor}`,
        paddingLeft: 20,
        marginBottom: 8,
      }}
    >
      {/* Tactic + technique */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span
          className="tactic-tag"
          style={{
            backgroundColor: `${tacticColor}18`,
            color:           tacticColor,
            border:          `1px solid ${tacticColor}40`,
          }}
        >
          {TACTIC_LABELS[meta.mitre_tactic]}
        </span>
        {meta.mitre_technique && meta.mitre_technique !== 'defensive' && (
          <span
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      11,
              color:         'var(--text-muted)',
              letterSpacing: '0.04em',
            }}
          >
            {meta.mitre_technique}
          </span>
        )}
      </div>

      {/* MITRE technique name as subtitle */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize:   13,
          color:      'var(--text-secondary)',
          marginBottom: 16,
          lineHeight: 1.5,
        }}
      >
        {meta.mitre_name}
      </p>

      {/* Meta pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        <MetaPill label={`${meta.estimated_minutes} min`} />
        <MetaPill label={meta.difficulty} />
        {meta.tags.map(tag => <MetaPill key={tag} label={tag} />)}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
        <ActionButton label="Open in JupyterLab" href="#" primary />
        <ActionButton label="Export article draft" href="#" />
      </div>
    </div>
  )
}

function MetaPill({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      10,
        padding:       '2px 7px',
        border:        '1px solid var(--border)',
        borderRadius:  2,
        color:         'var(--text-muted)',
        letterSpacing: '0.04em',
      }}
    >
      {label}
    </span>
  )
}

function ActionButton({ label, href, primary }: { label: string; href: string; primary?: boolean }) {
  return (
    <a
      href={href}
      style={{
        fontFamily:    'var(--font-body)',
        fontSize:      12,
        padding:       '6px 12px',
        borderRadius:  4,
        border:        primary ? 'none' : '1px solid var(--border)',
        background:    primary ? 'var(--accent)' : 'var(--surface)',
        color:         primary ? '#fff' : 'var(--text-secondary)',
        textDecoration: 'none',
        cursor:        'pointer',
        transition:    'opacity 0.15s',
      }}
    >
      {label}
    </a>
  )
}


// ── Markdown Cell ────────────────────────────────────────────────

function MarkdownCellView({ cell }: { cell: MarkdownCell }) {
  const html = marked.parse(cell.source, { async: false }) as string

  return (
    <div
      className="cell-markdown"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}


// ── Code Cell ────────────────────────────────────────────────────

function CodeCellView({ cell }: { cell: CodeCell }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(cell.source)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const outputs = cell.outputs ?? []

  return (
    <div className="cell-code" style={{ marginBottom: 16 }}>
      {/* Header row */}
      <div className="cell-code-header">
        <span className="cell-code-lang">python</span>
        <button
          onClick={handleCopy}
          style={{
            background: 'none',
            border:     'none',
            cursor:     'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize:   10,
            color:      copied ? 'var(--accent)' : 'var(--text-muted)',
            letterSpacing: '0.04em',
            padding:    '2px 4px',
            transition: 'color 0.15s',
          }}
        >
          {copied ? 'copied' : 'copy'}
        </button>
      </div>

      {/* Source code */}
      <pre
        style={{
          padding:    '14px 16px',
          overflowX:  'auto',
          margin:     0,
          background: '#141414',
          lineHeight: 1.6,
        }}
      >
        <code
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   12.5,
            color:      'var(--text-primary)',
            whiteSpace: 'pre',
          }}
        >
          {addLineNumbers(cell.source)}
        </code>
      </pre>

      {/* Outputs */}
      {outputs.length > 0 && (
        <div>
          {outputs.map((out, i) => {
            const img = getOutputImage(out)
            if (img) {
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={img}
                  alt="cell output"
                  style={{ maxWidth: '100%', display: 'block', margin: '8px 0' }}
                />
              )
            }
            const text = flattenOutput(out)
            if (!text) return null
            return (
              <div key={i} className="cell-output">
                {text}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Add faint line numbers to code
function addLineNumbers(source: string): React.ReactNode {
  const lines = source.split('\n')
  return lines.map((line, i) => (
    <span key={i} style={{ display: 'block' }}>
      <span
        style={{
          display:    'inline-block',
          width:      28,
          textAlign:  'right',
          marginRight: 16,
          color:      'var(--text-muted)',
          userSelect: 'none',
          fontSize:   11,
        }}
      >
        {i + 1}
      </span>
      {line}
    </span>
  ))
}
