import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 focus-visible:ring-blue-500 border border-transparent',
        accent:
          'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/35 focus-visible:ring-emerald-500 border border-transparent',
        outline:
          'border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 focus-visible:ring-blue-500 backdrop-blur-sm',
        secondary:
          'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 focus-visible:ring-slate-400',
        ghost:
          'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 focus-visible:ring-slate-400',
        danger:
          'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20 focus-visible:ring-red-500 border border-transparent',
        gold:
          'bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold shadow-md shadow-amber-500/20 focus-visible:ring-amber-500 border border-transparent',
      },
      size: {
        sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
        md: 'h-10 px-4 text-sm gap-2 rounded-xl',
        lg: 'h-12 px-6 text-base gap-2.5 rounded-xl',
        icon: 'h-10 w-10 p-0 rounded-xl',
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
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
