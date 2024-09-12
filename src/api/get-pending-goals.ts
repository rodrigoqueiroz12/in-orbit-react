import type { PendingGoal } from '@/@types/goal'
import { env } from '@/env'

export async function getPendingGoals(): Promise<PendingGoal[]> {
  const res = await fetch(`${env.VITE_API_URL}/goals/pending`)

  const data = await res.json()

  return data.pendingGoals
}
