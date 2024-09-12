import { cn } from '@/utils/cn'
import type { ComponentProps } from 'react'

export const Separator = (props: ComponentProps<'div'>) => {
  return <div className={cn('h-px bg-zinc-900', props.className)} />
}
