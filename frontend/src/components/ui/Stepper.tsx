import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Step {
  title: string
  description?: string
}

export interface StepperProps {
  steps: Step[]
  currentStep: number // 0-indexed
  onStepClick?: (index: number) => void
  className?: string
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className,
}) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between relative">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep
          const isActive = idx === currentStep
          const isClickable = !!onStepClick && idx <= currentStep

          return (
            <React.Fragment key={step.title}>
              {/* Connector line before step */}
              {idx > 0 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-2 transition-colors duration-200',
                    idx <= currentStep
                      ? 'bg-blue-600 dark:bg-blue-500'
                      : 'bg-slate-200 dark:bg-slate-700'
                  )}
                />
              )}

              {/* Step indicator node */}
              <div
                onClick={() => isClickable && onStepClick(idx)}
                className={cn(
                  'flex flex-col items-center group',
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                )}
              >
                <div
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 shadow-xs ring-4',
                    isCompleted &&
                      'bg-emerald-500 text-white ring-emerald-500/20',
                    isActive &&
                      'bg-blue-600 text-white ring-blue-500/25 scale-105',
                    !isCompleted &&
                      !isActive &&
                      'bg-slate-100 dark:bg-slate-800 text-slate-500 ring-transparent border border-slate-300 dark:border-slate-700'
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                </div>

                <div className="mt-2 text-center max-w-[100px]">
                  <p
                    className={cn(
                      'text-xs font-bold leading-tight',
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : isCompleted
                        ? 'text-slate-800 dark:text-slate-200'
                        : 'text-slate-400 dark:text-slate-500'
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-[10px] text-slate-400 hidden sm:block mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
