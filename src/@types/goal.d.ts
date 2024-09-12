export type CreateGoal = {
  title: string
  desiredWeeklyFrequency: number
}

export type PendingGoal = {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}
