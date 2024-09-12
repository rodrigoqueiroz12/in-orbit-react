import { Dialog } from './components/dialog'
import { CreateGoal } from './components/create-goal'
import { EmptyGoals } from './components/empty-goals'
import { Summary } from './components/summary'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './api/get-summary'

export const App = () => {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  })

  return (
    <Dialog>
      <main className="min-h-[100dvh] grid py-10 px-6 lg:px-8">
        <section className="overflow-x-hidden flex flex-col justify-start items-center gap-8">
          {data && data.total > 0 ? <Summary /> : <EmptyGoals />}

          <CreateGoal />
        </section>
      </main>
    </Dialog>
  )
}
