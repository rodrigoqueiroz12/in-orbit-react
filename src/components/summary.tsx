import { CheckCircle2, Plus } from 'lucide-react'
import { Button } from './button'
import { DialogTrigger } from './dialog'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './progress-bar'
import { Separator } from './separator'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from '@/api/get-summary'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-BR'
import { PendingGoals } from './pending-goals'

dayjs.locale(ptBR)

export const Summary = () => {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  })

  if (!data) {
    return <></>
  }

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  const completedPercentage = (data?.completed / data?.total) * 100

  return (
    <div className="w-full max-w-[30rem] flex flex-col gap-6 mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />

          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button
            type="button"
            className="py-3 sm:py-2 sm:pr-6 hover:bg-violet-500/90 active:bg-violet-500/80"
            size="sm"
          >
            <Plus className="size-4" />
            <span className="sr-only sm:not-sr-only">Cadastrar meta</span>
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress
          max={data?.total}
          value={data?.completed >= data.total ? data.total : data.completed}
        >
          <ProgressIndicator
            style={{
              width: `${completedPercentage >= 100 ? 100 : completedPercentage}%`,
            }}
          />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{data?.completed}</span> de{' '}
            <span className="text-zinc-100">{data?.total}</span> metas nessa
            semana.
          </span>
          <span>
            {(completedPercentage >= 100 ? 100 : completedPercentage).toFixed(
              0
            )}
            %
          </span>
        </div>

        <Separator />

        <PendingGoals />

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Sua semana</h2>

          {Object.entries(data.goalsPerDay).map(([date, goals]) => {
            const weekDay = dayjs(date).format('dddd')
            const formattedDate = dayjs(date).format('DD[ de ]MMMM')

            return (
              <div className="flex flex-col gap-4" key={date}>
                <h3 className="font-medium">
                  <span className="capitalize">{weekDay}</span>{' '}
                  <span className="text-xs text-zinc-600">
                    ({formattedDate})
                  </span>
                </h3>

                <ul className="flex flex-col gap-3">
                  {goals.map(({ id, title, completedAt }) => {
                    const formattedTime =
                      dayjs(completedAt).format('HH[:]mm[h]')

                    return (
                      <li className="flex items-center gap-2" key={id}>
                        <CheckCircle2 className="size-4 text-pink-500" />
                        <span className="text-sm text-zinc-400">
                          Você completou "
                          <span className="text-zinc-100">{title}</span>" às{' '}
                          <span className="text-zinc-100">{formattedTime}</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
