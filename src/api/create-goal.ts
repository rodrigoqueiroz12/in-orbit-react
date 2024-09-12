import type { CreateGoal } from '@/@types/goal'
import { env } from '@/env'

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoal): Promise<void> {
  await fetch(`${env.VITE_API_URL}/goals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency,
    }),
  })
}
