'use client'

import { useSession } from '../services/auth'

export { useSession }

export function useRequireAuth() {
  const session = useSession()
  return {
    user: session.data?.user ?? null,
    isLoading: session.isPending,
    isAuthenticated: !!session.data?.user,
  }
}
