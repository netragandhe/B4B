import React from 'react'
import { AlertCircle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FormFieldProps {
  label?: string
  error?: string
  helperText?: string
  hint?: string
  required?: boolean
  className?: string
  children: React.ReactNode
  id?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  hint,
  required,
  className,
  children,
  id,
}) => {
  const displayHelper = helperText || hint
  return (
    <div className={cn('flex flex-col space-y-1.5 w-full text-left', className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1 select-none"
        >
          <span>{label}</span>
          {required && <span className="text-[var(--blue-600)] font-bold">*</span>}
        </label>
      )}
      
      <div className="relative">{children}</div>

      {error ? (
        <p className="flex items-center gap-1.5 text-xs font-medium text-red-500 animate-fadeIn mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : displayHelper ? (
        <p className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mt-1">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>{displayHelper}</span>
        </p>
      ) : null}
    </div>
  )
}
