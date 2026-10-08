import React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bento' | 'gradient'
  hover?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[12px] border transition-all duration-200 overflow-hidden',
          // Variants
          variant === 'default' &&
            'bg-white dark:bg-[#0D1E36] border-slate-200 dark:border-[#1E3A5F] shadow-sm',
          variant === 'glass' &&
            'glass-panel shadow-sm',
          variant === 'bento' &&
            'bg-white/90 dark:bg-[#0D1E36]/90 border-slate-200/80 dark:border-[#1E3A5F]/80 backdrop-blur-md shadow-md',
          variant === 'gradient' &&
            'bg-gradient-to-br from-white to-slate-50 dark:from-[#0D1E36] dark:to-[#0A1628] border-slate-200 dark:border-[#1E3A5F]',
          hover && 'hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-500/50 cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-5 pb-3 flex flex-col space-y-1.5', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-bold font-heading tracking-tight text-slate-900 dark:text-slate-100', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-xs text-slate-500 dark:text-slate-400', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-5 pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-5 pt-3 border-t border-slate-100 dark:border-[#1E3A5F]/60 flex items-center', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'
