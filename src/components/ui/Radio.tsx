import React from 'react'
import { cn } from '@/lib/utils'

export interface RadioOption {
  label: string
  value: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  name: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
  direction?: 'horizontal' | 'vertical'
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  disabled,
  className,
  direction = 'vertical',
}) => {
  return (
    <div
      className={cn(
        'flex gap-3',
        direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        className
      )}
    >
      {options.map((opt) => {
        const isChecked = value === opt.value
        const isOptionDisabled = disabled || opt.disabled

        return (
          <label
            key={opt.value}
            className={cn(
              'relative flex items-start gap-3 p-3 rounded-xl border transition-all duration-150 cursor-pointer text-left',
              isChecked
                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 shadow-sm'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1E36] hover:border-slate-300 dark:hover:border-slate-700',
              isOptionDisabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={isChecked}
              disabled={isOptionDisabled}
              onChange={() => onChange?.(opt.value)}
              className="sr-only"
            />
            <div
              className={cn(
                'w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                isChecked
                  ? 'border-blue-600 bg-blue-600'
                  : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'
              )}
            >
              {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <div>
              <span className="block text-sm font-medium text-slate-800 dark:text-slate-100">
                {opt.label}
              </span>
              {opt.description && (
                <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {opt.description}
                </span>
              )}
            </div>
          </label>
        )
      })}
    </div>
  )
}
