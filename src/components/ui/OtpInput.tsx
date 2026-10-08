import React, { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export interface OtpInputProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  error?: boolean | string
  className?: string
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  value = '',
  onChange,
  disabled = false,
  error,
  className,
}) => {
  const [digits, setDigits] = useState<string[]>(() => {
    const arr = Array(length).fill('')
    for (let i = 0; i < Math.min(value.length, length); i++) {
      arr[i] = value[i]
    }
    return arr
  })

  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const arr = Array(length).fill('')
    for (let i = 0; i < Math.min(value.length, length); i++) {
      arr[i] = value[i]
    }
    setDigits(arr)
  }, [value, length])

  const handleInputChange = (index: number, val: string) => {
    const char = val.slice(-1) // take last typed character
    if (char && !/^\d+$/.test(char)) return

    const newDigits = [...digits]
    newDigits[index] = char
    setDigits(newDigits)
    onChange?.(newDigits.join(''))

    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputsRef.current[index - 1]?.focus()
        const newDigits = [...digits]
        newDigits[index - 1] = ''
        setDigits(newDigits)
        onChange?.(newDigits.join(''))
      } else {
        const newDigits = [...digits]
        newDigits[index] = ''
        setDigits(newDigits)
        onChange?.(newDigits.join(''))
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').trim()
    if (!/^\d+$/.test(pasted)) return

    const newDigits = Array(length).fill('')
    for (let i = 0; i < Math.min(pasted.length, length); i++) {
      newDigits[i] = pasted[i]
    }
    setDigits(newDigits)
    onChange?.(newDigits.join(''))

    const targetIndex = Math.min(pasted.length, length - 1)
    inputsRef.current[targetIndex]?.focus()
  }

  return (
    <div className={cn('flex items-center justify-center gap-2 sm:gap-3', className)}>
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={(e) => handleInputChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={cn(
            'w-11 h-13 text-center text-xl font-bold font-mono rounded-[10px] border bg-white dark:bg-[#0D1E36] text-slate-900 dark:text-slate-100 transition-all outline-none',
            'border-slate-300 dark:border-[#1E3A5F] shadow-sm',
            'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            disabled && 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800'
          )}
        />
      ))}
    </div>
  )
}
