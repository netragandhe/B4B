import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const badgeVariants = cva(
  'inline-flex items-center font-medium rounded-[6px] text-xs transition-colors px-2.5 py-0.5 select-none tracking-tight border',
  {
    variants: {
      variant: {
        default:
          'bg-slate-100/90 text-slate-700 border-slate-200/90 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700',
        primary:
          'bg-blue-50 text-[#013CA0] border-blue-200/80 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/50',
        emerald:
          'bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50 font-medium',
        success:
          'bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50 font-medium',
        gold:
          'bg-amber-50 text-amber-900 border-amber-300/90 dark:bg-[#FFC911]/15 dark:text-[#FFC911] dark:border-[#FFC911]/30 font-semibold',
        amber:
          'bg-amber-50 text-amber-900 border-amber-300/90 dark:bg-[#FFC911]/15 dark:text-[#FFC911] dark:border-[#FFC911]/30 font-semibold',
        danger:
          'bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/50',
        purple:
          'bg-purple-50 text-[#013CA0] border-blue-300/80 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-800/50',
        navy:
          'bg-blue-50 text-[#013CA0] border-blue-200/90 font-semibold dark:bg-[#162E5A] dark:text-blue-200 dark:border-[#1E3A6E]',
        royal:
          'bg-[#013CA0] text-white border-[#013CA0] shadow-xs',
        outline:
          'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400 bg-transparent',
      },
      size: {
        sm: 'text-[11px] px-2 py-0.5 leading-snug',
        md: 'text-xs px-2.5 py-0.5 leading-normal',
        lg: 'text-sm px-3 py-1 leading-normal',
      },
      pill: {
        true: 'rounded-full',
        false: 'rounded-[6px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      pill: false,
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
  pill,
  dot = false,
  children,
  ...props
}) => {
  return (
    <span className={cn(badgeVariants({ variant, size, pill }), className)} {...props}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
      )}
      {children}
    </span>
  )
}
