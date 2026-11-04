import React, { useState } from 'react'
import { Eye, EyeOff, Check, X } from 'lucide-react'
import { Input, type InputProps } from './Input'
import { cn } from '@/lib/utils'

export interface PasswordInputProps extends Omit<InputProps, 'type'> {
  showStrengthMeter?: boolean
}

export function calculatePasswordStrength(pass: string): {
  score: number
  label: string
  color: string
} {
  if (!pass) return { score: 0, label: 'None', color: 'bg-slate-300 dark:bg-slate-700' }
  let score = 0
  if (pass.length >= 8) score += 25
  if (pass.length >= 12) score += 15
  if (/[A-Z]/.test(pass)) score += 20
  if (/[0-9]/.test(pass)) score += 20
  if (/[^A-Za-z0-9]/.test(pass)) score += 20

  if (score < 40) return { score, label: 'Weak', color: 'bg-red-500' }
  if (score < 70) return { score, label: 'Moderate', color: 'bg-amber-500' }
  if (score < 90) return { score, label: 'Strong', color: 'bg-blue-500' }
  return { score: 100, label: 'Institutional Grade', color: 'bg-emerald-500' }
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ value, onChange, showStrengthMeter = false, className, ...props }, ref) => {
    const [visible, setVisible] = useState(false)
    const currentVal = typeof value === 'string' ? value : ''
    const { score, label, color } = calculatePasswordStrength(currentVal)

    return (
      <div className="w-full space-y-2">
        <Input
          ref={ref}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className={className}
          rightIcon={
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none"
              aria-label={visible ? 'Hide password' : 'Show password'}
            >
              {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          {...props}
        />

        {showStrengthMeter && currentVal.length > 0 && (
          <div className="space-y-1.5 pt-1 animate-fadeIn">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Password Security</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{label}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700/80 rounded-full overflow-hidden">
              <div
                className={cn('h-full transition-all duration-300 rounded-full', color)}
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
              <div className="flex items-center gap-1">
                {currentVal.length >= 8 ? <Check className="w-3 h-3 text-emerald-500" /> : <X className="w-3 h-3 text-slate-400" />}
                <span>8+ characters</span>
              </div>
              <div className="flex items-center gap-1">
                {/[A-Z]/.test(currentVal) ? <Check className="w-3 h-3 text-emerald-500" /> : <X className="w-3 h-3 text-slate-400" />}
                <span>Uppercase letter</span>
              </div>
              <div className="flex items-center gap-1">
                {/[0-9]/.test(currentVal) ? <Check className="w-3 h-3 text-emerald-500" /> : <X className="w-3 h-3 text-slate-400" />}
                <span>Number</span>
              </div>
              <div className="flex items-center gap-1">
                {/[^A-Za-z0-9]/.test(currentVal) ? <Check className="w-3 h-3 text-emerald-500" /> : <X className="w-3 h-3 text-slate-400" />}
                <span>Special character</span>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'
