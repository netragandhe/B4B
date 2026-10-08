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
          'w-full min-h-[100px] p-3 text-sm bg-white dark:bg-[#0D1E36] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-[10px] border border-slate-300 dark:border-[#1E3A5F] shadow-sm transition-all duration-200 outline-none resize-y',
          'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/30',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
          disabled && 'opacity-60 bg-slate-100 dark:bg-slate-800 cursor-not-allowed',
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'
