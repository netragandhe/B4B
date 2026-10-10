import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const badgeVariants = cva(
  'inline-flex items-center font-medium rounded-full text-xs transition-colors px-2.5 py-0.5 select-none',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--sky-50)] text-[var(--text)] border border-[var(--border)]',
        primary:
          'bg-[var(--sky-50)] text-[var(--blue-600)] border border-[var(--border)]',
        emerald:
          'bg-[var(--green-600)]/10 text-[var(--green-600)] border border-[var(--green-600)]/20',
        success:
          'bg-[var(--green-600)]/10 text-[var(--green-600)] border border-[var(--green-600)]/20',
        gold:
          'bg-[var(--gold-500)] text-[var(--navy-900)] border border-[var(--gold-500)]',
        amber:
          'bg-[var(--gold-500)] text-[var(--navy-900)] border border-[var(--gold-500)]',
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
