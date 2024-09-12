import { env } from '@/env'

export async function createGoalCompletion(goalId: string): Promise<void> {
  await fetch(`${env.VITE_API_URL}/goal-completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      goalId,
    }),
  })
}
