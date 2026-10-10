import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:bg-[var(--border)] disabled:text-[var(--text-muted)] disabled:border-transparent disabled:opacity-60 disabled:pointer-events-none select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--blue-600)] hover:brightness-90 text-white shadow-md focus-visible:ring-[var(--blue-600)] border border-transparent',
        accent:
          'bg-[var(--gold-500)] text-[var(--navy-900)] hover:opacity-95 font-semibold shadow-md focus-visible:ring-[var(--gold-500)] border border-transparent',
        outline:
          'bg-[var(--surface)] text-[var(--blue-600)] border border-[var(--blue-600)] hover:bg-[var(--sky-50)] focus-visible:ring-[var(--blue-600)]',
        secondary:
          'bg-[var(--surface)] text-[var(--blue-600)] border border-[var(--blue-600)] hover:bg-[var(--sky-50)] focus-visible:ring-[var(--blue-600)]',
        ghost:
          'hover:bg-[var(--sky-50)] text-[var(--text)] focus-visible:ring-[var(--blue-600)]',
        danger:
          'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20 focus-visible:ring-red-500 border border-transparent',
        gold:
          'bg-[var(--gold-500)] text-[var(--navy-900)] hover:opacity-95 font-semibold shadow-md focus-visible:ring-[var(--gold-500)] border border-transparent',
        darkSection:
          'bg-[var(--gold-500)] text-[var(--navy-900)] hover:opacity-95 font-semibold shadow-md focus-visible:ring-[var(--gold-500)] border border-transparent',
      },
      size: {
        sm: 'h-9 sm:h-8 px-3 text-xs gap-1.5 rounded-lg',
        md: 'h-11 min-h-[44px] px-4 text-sm gap-2 rounded-xl',
        lg: 'h-12 min-h-[48px] px-6 text-base gap-2.5 rounded-xl',
        icon: 'h-11 w-11 min-h-[44px] min-w-[44px] p-0 rounded-xl',
      },
      pill: {
        true: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      pill: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, pill, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, pill, className }))}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap">{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
