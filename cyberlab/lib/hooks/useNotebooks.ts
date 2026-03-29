'use client'

import { useQuery } from '@tanstack/react-query'
import { notebookService } from '../services/notebooks'

export function useNotebooks() {
  return useQuery({
    queryKey: ['notebooks'],
    queryFn: notebookService.list,
  })
}

export function useNotebook(slug: string) {
  return useQuery({
    queryKey: ['notebook', slug],
    queryFn: () => notebookService.get(slug),
    enabled: !!slug,
  })
}
