import { apiFetch } from './api'

export interface NotebookListItem {
  slug: string
  title: string
  mitreId: string
  tactic: string
  difficulty: string
  articleTitle: string
  orderNum: number
}

export interface NotebookDetail extends NotebookListItem {
  cells: Array<{
    cell_type: 'code' | 'markdown'
    source: string[]
    outputs?: Array<Record<string, unknown>>
    id: string
  }> | null
}

export const notebookService = {
  list: () => apiFetch<NotebookListItem[]>('/api/notebooks'),
  get: (slug: string) => apiFetch<NotebookDetail>(`/api/notebooks/${slug}`),
}
