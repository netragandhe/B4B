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
            'w-full h-10 pl-10 pr-3.5 text-sm bg-white dark:bg-[#0D1E36] text-slate-900 dark:text-slate-100 rounded-[10px] border border-slate-300 dark:border-[#1E3A5F] shadow-sm transition-all duration-200 outline-none',
            'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/30',
            'scheme-light dark:scheme-dark',
            error && 'border-red-500 focus:border-red-500',
            disabled && 'opacity-60 bg-slate-100 dark:bg-slate-800 cursor-not-allowed',
            className
          )}
          {...props}
        />
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
          <CalendarIcon className="w-4 h-4" />
        </div>
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'
