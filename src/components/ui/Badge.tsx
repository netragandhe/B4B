import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const badgeVariants = cva(
  'inline-flex items-center justify-center font-semibold rounded-full transition-colors select-none whitespace-nowrap',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--sky-50)] text-[var(--text)] border border-[var(--border)]',
        primary:
          'bg-[var(--sky-50)] text-[var(--blue-600)] border border-[var(--border)]',
        emerald:
          'bg-[var(--green-600)]/12 text-[var(--green-600)] border border-[var(--green-600)]/25',
        success:
          'bg-[var(--green-600)]/12 text-[var(--green-600)] border border-[var(--green-600)]/25',
        gold:
          'bg-[var(--gold-500)]/15 text-[#8F4411] dark:text-[#F3A566] border border-[var(--gold-500)]/35',
        amber:
          'bg-[var(--gold-500)]/15 text-[#8F4411] dark:text-[#F3A566] border border-[var(--gold-500)]/35',
        danger:
          'bg-red-50 text-red-700 border border-red-200',
        navy:
          'bg-[var(--navy-900)] text-[var(--gold-500)] border border-[var(--navy-800)]',
        royal:
          'bg-[var(--blue-600)] text-white shadow-xs',
        outline:
          'border border-[var(--border)] text-[var(--text-muted)]',
      },
      size: {
        xs: 'h-4.5 px-2 text-[10px] leading-none gap-1',
        sm: 'h-5 px-2.5 text-[11px] leading-none gap-1.5',
        md: 'h-6 px-3 text-xs leading-none gap-1.5',
        lg: 'h-7 px-3.5 text-sm leading-none gap-2',
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
    <span
      className={cn(
        badgeVariants({ variant, size }),
        dot && (size === 'sm' || !size) && 'w-[92px] justify-center text-center',
        className
      )}
      {...props}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
      )}
      {children}
    </span>
  )
}
