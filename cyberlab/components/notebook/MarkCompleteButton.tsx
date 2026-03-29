'use client'

import { useUpdateProgress, useProgress } from '@/lib/hooks'
import { useRequireAuth } from '@/lib/hooks/useAuth'

export function MarkCompleteButton({ slug }: { slug: string }) {
  const { isAuthenticated } = useRequireAuth()
  const { data: progress } = useProgress()
  const mutation = useUpdateProgress()

  const current = progress?.find(p => p.notebookSlug === slug)
  const isCompleted = current?.status === 'completed'
  const isInProgress = current?.status === 'in_progress'

  if (!isAuthenticated) return null

  function handleClick() {
    const nextStatus = isCompleted ? 'not_started' : 'completed'
    mutation.mutate({ slug, status: nextStatus })
  }

  return (
    <button
      onClick={handleClick}
      disabled={mutation.isPending}
      style={{
        padding: '6px 14px',
        background: isCompleted ? 'var(--surface)' : 'var(--accent)',
        color: isCompleted ? 'var(--text-secondary)' : '#fff',
        border: isCompleted ? '1px solid var(--border)' : 'none',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.04em',
        cursor: mutation.isPending ? 'wait' : 'pointer',
        opacity: mutation.isPending ? 0.6 : 1,
      }}
    >
      {mutation.isPending
        ? 'Saving...'
        : isCompleted
          ? 'Completed ✓'
          : isInProgress
            ? 'Mark Complete'
            : 'Mark Complete'}
    </button>
  )
}
