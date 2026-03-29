import { apiFetch } from './api'

export interface ProgressRecord {
  id: string
  userId: string
  notebookSlug: string
  status: 'not_started' | 'in_progress' | 'completed'
  completedAt: string | null
  notes: string | null
}

export const progressService = {
  list: () => apiFetch<ProgressRecord[]>('/api/progress'),

  update: (slug: string, status: string, notes?: string) =>
    apiFetch<ProgressRecord>(`/api/progress/${slug}`, {
      method: 'POST',
      body: JSON.stringify({ status, notes }),
    }),
}
