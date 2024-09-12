import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import type { ClassValue } from 'clsx'

export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(...classes));
}