import React from 'react'
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'
import { Card } from './Card'
import { cn } from '@/lib/utils'

export interface StatCardProps {
  title: string
  value: React.ReactNode
  change?: number
  changePeriod?: string
  icon?: React.ReactNode
  variant?: 'default' | 'royal' | 'emerald' | 'gold'
  className?: string
  caption?: string
  size?: 'default' | 'sm'
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changePeriod = 'vs last month',
  icon,
  variant = 'default',
  className,
  caption,
  size = 'default',
}) => {
  const isPositive = typeof change === 'number' && change > 0
  const isNegative = typeof change === 'number' && change < 0
  const isNeutral = typeof change === 'number' && change === 0

  const variantStyles = {
    default: 'hover:border-slate-300 dark:hover:border-slate-600',
    royal: 'border-l-[3px] border-l-blue-600 dark:border-l-blue-500',
    emerald: 'border-l-[3px] border-l-emerald-500',
    gold: 'border-l-[3px] border-l-amber-500',
  }

  const iconBgStyles = {
    default: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    royal: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
    gold: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
  }

  const isSmall = size === 'sm'

  return (
    <Card
      variant="default"
      className={cn(
        'flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        isSmall ? 'p-2.5 sm:p-3' : 'p-3 sm:p-3.5',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-center justify-between gap-1.5">
        <span
          className={cn(
            'font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate',
            isSmall ? 'text-[9.5px]' : 'text-[10px] sm:text-[11px]'
          )}
        >
          {title}
        </span>
        {icon && (
          <div
            className={cn(
              'rounded-md flex items-center justify-center shrink-0 shadow-xs [&>svg]:w-3.5 [&>svg]:h-3.5',
              isSmall ? 'w-6 h-6' : 'w-6.5 h-6.5 sm:w-7 sm:h-7',
              iconBgStyles[variant]
            )}
          >
            {icon}
          </div>
        )}
      </div>

      <div className={cn(isSmall ? 'mt-1' : 'mt-1.5')}>
        <div
          className={cn(
            'font-bold font-heading tracking-tight text-slate-900 dark:text-slate-50 truncate leading-tight',
            isSmall ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
          )}
        >
          {value}
        </div>

        {caption && (
          <p
            className={cn(
              'text-slate-500 dark:text-slate-400 truncate',
              isSmall ? 'text-[9.5px] mt-0.5' : 'text-[10.5px] mt-0.5'
            )}
          >
            {caption}
          </p>
        )}

        {typeof change === 'number' && (
          <div className={cn('flex items-center gap-1.5', isSmall ? 'mt-1 text-[10px]' : 'mt-1.5 text-[10.5px]')}>
            <span
              className={cn(
                'inline-flex items-center px-1.5 py-0.5 rounded-full font-medium shrink-0',
                isSmall ? 'text-[9.5px]' : 'text-[10px]',
                isPositive && 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
                isNegative && 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400',
                isNeutral && 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              )}
            >
              {isPositive && <ArrowUpRight className="w-2.5 h-2.5 mr-0.5" />}
              {isNegative && <ArrowDownRight className="w-2.5 h-2.5 mr-0.5" />}
              {isNeutral && <Minus className="w-2.5 h-2.5 mr-0.5" />}
              {isPositive ? `+${change}%` : `${change}%`}
            </span>
            <span className={cn('text-slate-400 dark:text-slate-500 truncate', isSmall ? 'text-[9.5px]' : 'text-[10px]')}>
              {changePeriod}
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}
