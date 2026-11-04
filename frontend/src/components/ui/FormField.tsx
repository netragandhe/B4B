import React from 'react'
import { cn } from '@/lib/utils'

export interface FormFieldProps {
  id?: string
  label?: string
  error?: string
  helperText?: string
  hint?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  error,
  helperText,
  hint,
  required,
  className,
  children,
}) => {
  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1 select-none"
        >
          <span>{label}</span>
          {required && <span className="text-blue-600 font-bold">*</span>}
        </label>
      )}
      
      <div className="relative">{children}</div>

      {error ? (
        <span className="text-xs text-red-600 flex items-center gap-1 mt-0.5">
          {error}
        </span>
      ) : helperText ? (
        <span className="text-xs text-slate-500 mt-0.5">
          {helperText}
        </span>
      ) : hint ? (
        <span className="text-xs text-slate-500 mt-0.5">
          {hint}
        </span>
      ) : null}
    </div>
  )
}
