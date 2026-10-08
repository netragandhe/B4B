import React from 'react'
import { cn } from '@/lib/utils'

export interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label?: string
  description?: string
  className?: string
  id?: string
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled,
  label,
  description,
  className,
  id,
}) => {
  const generatedId = id || React.useId()

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
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

      <button
        type="button"
        role="switch"
        id={generatedId}
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          checked ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  )
}
