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
                ? 'border-[var(--blue-600)] bg-[var(--sky-50)] dark:bg-[var(--sky-50)]/10 shadow-sm'
                : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--blue-600)]/40',
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
                  ? 'border-[var(--blue-600)] bg-[var(--blue-600)]'
                  : 'border-[var(--border)] bg-[var(--surface)]'
              )}
            >
              {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <div>
              <span className="block text-sm font-medium text-[var(--text)]">
                {opt.label}
              </span>
              {opt.description && (
                <span className="block text-xs text-[var(--text-muted)] mt-0.5">
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
