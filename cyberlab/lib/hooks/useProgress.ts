'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { progressService } from '../services/progress'

export function useProgress() {
  return useQuery({
    queryKey: ['progress'],
    queryFn: progressService.list,
  })
}

export function useUpdateProgress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ slug, status, notes }: { slug: string; status: string; notes?: string }) =>
      progressService.update(slug, status, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] })
    },
  })
}

export function useIsCompleted(slug: string) {
  const { data: progress } = useProgress()
  return progress?.find(p => p.notebookSlug === slug)?.status === 'completed'
}
