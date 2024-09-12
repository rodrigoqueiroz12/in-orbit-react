import { cn } from '@/utils/cn'
import type { ComponentProps } from 'react'

export function Label(props: ComponentProps<'label'>) {
  return (
    <label
      {...props}
      className={cn(
        'font-medium text-sm tracking-tight leading-normal',
        props.className
      )}
    />
  )
}

export function Legend(props: ComponentProps<'legend'>) {
  return (
    <legend
      {...props}
      className={cn(
        'font-medium text-sm tracking-tight leading-normal',
        props.className
      )}
    />
  )
}
