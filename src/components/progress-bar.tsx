import { cn } from '@/utils/cn'
import * as ProgressPrimitive from '@radix-ui/react-progress'

export function Progress(props: ProgressPrimitive.ProgressProps) {
  return (
    <ProgressPrimitive.Progress
      {...props}
      className={cn('bg-zinc-900 rounded-full h-2', props.className)}
    />
  )
}

export function ProgressIndicator(
  props: ProgressPrimitive.ProgressIndicatorProps
) {
  return (
    <ProgressPrimitive.Indicator
      {...props}
      className={cn(
        'bg-gradient-to-r from-pink-500 to-violet-500 w-1/2 h-2 rounded-full',
        props.className
      )}
    />
  )
}
