export type Tactic = 'recon' | 'initial' | 'execution' | 'persist' | 'evasion' | 'cred' | 'discovery' | 'lateral' | 'collection' | 'c2' | 'exfil' | 'impact' | 'defense'

export interface NotebookMeta {
  slug: string
  title: string
  mitreId: string
  tactic: Tactic
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  articleTitle: string
  orderNum: number
  color: string
}

export interface Progress {
  id: string
  userId: string
  notebookSlug: string
  status: 'not_started' | 'in_progress' | 'completed'
  completedAt: string | null
  notes: string | null
}

export interface User {
  id: string
  email: string
  name: string
}

export type ApiResponse<T> = { success: true; data: T } | { success: false; error: string }
