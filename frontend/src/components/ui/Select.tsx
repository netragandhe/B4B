import React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean | string
  options?: SelectOption[]
  placeholder?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options = [], placeholder, children, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            'w-full h-11 min-h-[44px] pl-3.5 pr-10 text-sm bg-white text-slate-900 font-medium rounded-[10px] border border-blue-200 shadow-xs appearance-none cursor-pointer transition-all duration-200 outline-none',
            'focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            disabled && 'opacity-60 bg-slate-100 text-slate-400 cursor-not-allowed',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="text-slate-400">
              {placeholder}
            </option>
          )}
          {children ||
            options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                className="bg-white text-slate-900 py-1"
              >
                {opt.label}
              </option>
            ))}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    )
  }
)

Select.displayName = 'Select'
