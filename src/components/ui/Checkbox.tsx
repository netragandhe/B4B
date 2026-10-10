import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: boolean | string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, checked, disabled, id, onChange, ...props }, ref) => {
    const autoId = React.useId()
    const generatedId = id || autoId

    return (
      <div className={cn('flex items-start gap-3', className)}>
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={ref}
            id={generatedId}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="peer sr-only"
            {...props}
          />
          <div
            onClick={(e) => {
              if (disabled) return
              const target = document.getElementById(generatedId) as HTMLInputElement | null
              if (target) target.click()
            }}
            className={cn(
              'w-5 h-5 rounded-[6px] border border-slate-300 dark:border-[#1E3A5F] bg-white dark:bg-[#0D1E36] transition-all duration-150 flex items-center justify-center cursor-pointer',
              'hover:border-blue-500 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/30',
              'peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:text-white',
              error && 'border-red-500',
              disabled && 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800'
            )}
          >
            <Check className={cn('w-3.5 h-3.5 stroke-[3] transition-transform duration-150', checked ? 'scale-100' : 'scale-0')} />
          </div>
        </div>

        {(label || description) && (
          <label htmlFor={generatedId} className="cursor-pointer select-none text-left">
            {label && (
              <span className="block text-sm font-medium text-slate-800 dark:text-slate-200">
                {label}
              </span>
            )}
            {description && (
              <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {description}
              </span>
            )}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
