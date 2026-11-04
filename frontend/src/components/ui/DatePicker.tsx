import React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean | string
  label?: string
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, error, disabled, value, onChange, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type="date"
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            'w-full h-10 pl-10 pr-3.5 text-sm bg-[var(--surface)] text-[var(--text)] rounded-[10px] border border-[var(--border)] shadow-sm transition-all duration-200 outline-none',
            'focus:border-[var(--blue-600)] focus:ring-2 focus:ring-[var(--blue-600)]/20',
            'scheme-light dark:scheme-dark',
            error && 'border-red-500 focus:border-red-500',
            disabled && 'opacity-60 bg-[var(--border)] text-[var(--text-muted)] cursor-not-allowed',
            className
          )}
          {...props}
        />
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]">
          <CalendarIcon className="w-4 h-4" />
        </div>
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'
