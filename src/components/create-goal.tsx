import { X } from 'lucide-react'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './dialog'
import { Input } from './input'
import { Label, Legend } from './label'
import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from './radio-group'
import { Button } from './button'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { createGoal } from '@/api/create-goal'

const createGoalSchema = z.object({
  title: z.string().min(1, 'Informe a atividade que deseja realizar'),
  desiredWeeklyFrequency: z.coerce
    .number({
      message:
        'Informe a frequência que deseja realizar esta atividade na semana',
    })
    .min(1)
    .max(7),
})

type CreateGoalData = z.infer<typeof createGoalSchema>

export function CreateGoal() {
  const queryClient = useQueryClient()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateGoalData>({
    resolver: zodResolver(createGoalSchema),
  })

  async function handleCreateGoal({
    title,
    desiredWeeklyFrequency,
  }: CreateGoalData) {
    await createGoal({ title, desiredWeeklyFrequency })

    await queryClient.invalidateQueries({ queryKey: ['summary'] })
    await queryClient.invalidateQueries({ queryKey: ['pending-goals'] })

    reset()
  }

  return (
    <DialogContent className="h-[100dvh]">
      <div className="h-full flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>

            <DialogClose>
              <X className="size-5" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que{' '}
            <span className="underline underline-offset-2">te fazem bem</span> e
            que você quer continuar praticando toda semana.
          </DialogDescription>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                id="title"
                placeholder="Praticar exercícios, meditar, etc..."
                autoFocus
                {...register('title')}
              />
              {errors.title && (
                <p className="text-red-400 text-sm">{errors.title.message}</p>
              )}
            </div>

            <fieldset className="flex flex-col gap-2">
              <Legend>Quantas vezes na semana?</Legend>

              {errors.desiredWeeklyFrequency && (
                <p className="text-red-400 text-sm">
                  {errors.desiredWeeklyFrequency.message}
                </p>
              )}

              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                render={({ field }) => {
                  return (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={String(field.value)}
                      name="desiredWeeklyFrequency"
                    >
                      <RadioGroupItem value="1">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm leading-none font-medium">
                          1x na semana
                        </span>
                        <span>🥱</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="2">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm leading-none font-medium">
                          2x na semana
                        </span>
                        <span>🙂</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="3">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm leading-none font-medium">
                          3x na semana
                        </span>
                        <span>😎</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="4">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm leading-none font-medium">
                          4x na semana
                        </span>
                        <span>😜</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="5">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm leading-none font-medium">
                          5x na semana
                        </span>
                        <span>🤨</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="6">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm leading-none font-medium">
                          6x na semana
                        </span>
                        <span>🤯</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="7">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm leading-none font-medium">
                          Todos os dias da semana
                        </span>
                        <span>🔥</span>
                      </RadioGroupItem>
                    </RadioGroup>
                  )
                }}
              />
            </fieldset>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="flex-1">
                Fechar
              </Button>
            </DialogClose>
            <Button className="flex-1">Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
