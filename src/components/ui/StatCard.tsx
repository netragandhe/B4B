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
}) => {
  const isPositive = typeof change === 'number' && change > 0
  const isNegative = typeof change === 'number' && change < 0
  const isNeutral = typeof change === 'number' && change === 0

  const variantStyles = {
    default: 'hover:border-slate-300 dark:hover:border-slate-600',
    royal: 'border-l-4 border-l-blue-600 dark:border-l-blue-500',
    emerald: 'border-l-4 border-l-emerald-500',
    gold: 'border-l-4 border-l-amber-500',
  }

  const iconBgStyles = {
    default: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    royal: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
    gold: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
  }

  return (
    <Card
      variant="default"
      className={cn(
        'p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        {icon && (
          <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs', iconBgStyles[variant])}>
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-slate-50">
          {value}
        </div>

        {caption && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{caption}</p>
        )}

        {typeof change === 'number' && (
          <div className="flex items-center gap-1.5 mt-2.5 text-xs">
            <span
              className={cn(
                'inline-flex items-center px-1.5 py-0.5 rounded-full font-medium text-[11px]',
                isPositive && 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
                isNegative && 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400',
                isNeutral && 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              )}
            >
              {isPositive && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
              {isNegative && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {isNeutral && <Minus className="w-3 h-3 mr-0.5" />}
              {isPositive ? `+${change}%` : `${change}%`}
            </span>
            <span className="text-slate-400 dark:text-slate-500 text-[11px] truncate">
              {changePeriod}
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}
