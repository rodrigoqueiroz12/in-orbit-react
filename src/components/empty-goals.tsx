import logo from '@/assets/logo-in-orbit.svg'
import letsStart from '@/assets/lets-start-illustration.svg'
import { Plus } from 'lucide-react'
import { DialogTrigger } from './dialog'
import { Button } from './button'

export const EmptyGoals = () => {
  return (
    <>
      <img src={logo} alt="" />
      <img src={letsStart} alt="" className="max-w-80" />
      <p className="text-zinc-300 max-w-[21.25rem] leading-relaxed text-center">
        Você ainda não cadastrou nenhuma meta, que tal{' '}
        <DialogTrigger className="underline underline-offset-2">
          cadastrar um
        </DialogTrigger>{' '}
        agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button
          type="button"
          className="pr-6 hover:bg-violet-500/90 active:bg-violet-500/80"
        >
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </>
  )
}
