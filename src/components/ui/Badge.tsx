import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const badgeVariants = cva(
  'inline-flex items-center font-medium rounded-full text-xs transition-colors px-2.5 py-0.5 select-none',
  {
    variants: {
      variant: {
        default:
          'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700',
        primary:
          'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900',
        emerald:
          'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
        gold:
          'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
        amber:
          'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700',
        danger:
          'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900',
        navy:
          'bg-[#0A1628] text-white border border-[#1E3A5F]',
        royal:
          'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs',
        outline:
          'border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300',
      },
      size: {
        sm: 'text-[10px] px-2 py-0.2',
        md: 'text-xs px-2.5 py-0.5',
        lg: 'text-sm px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  size,
  dot = false,
  children,
  ...props
}) => {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 inline-block shrink-0 animate-pulse" />
      )}
      {children}
    </span>
  )
}
