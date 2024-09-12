import type { Summary } from '@/@types/summary'
import { env } from '@/env'

export async function getSummary(): Promise<Summary> {
  const res = await fetch(`${env.VITE_API_URL}/metrics/summary`)
  const data = await res.json()

  return data.summary
}
