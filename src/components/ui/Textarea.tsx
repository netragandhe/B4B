import React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean | string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, disabled, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
          'w-full min-h-[100px] p-3 text-sm bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-muted)] rounded-[10px] border border-[var(--border)] shadow-sm transition-all duration-200 outline-none resize-y',
          'focus:border-[var(--blue-600)] focus:ring-2 focus:ring-[var(--blue-600)]/20',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
          disabled && 'opacity-60 bg-[var(--border)] text-[var(--text-muted)] cursor-not-allowed',
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'
