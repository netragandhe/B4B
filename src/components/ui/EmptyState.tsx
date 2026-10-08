import React from 'react'
import { Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-[#1E3A5F] bg-slate-50/50 dark:bg-[#0D1E36]/30',
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mb-3 shadow-inner">
        {icon || <Inbox className="w-6 h-6" />}
      </div>
      <h4 className="text-base font-bold font-heading text-slate-800 dark:text-slate-200">
        {title}
      </h4>
      {description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-4">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  )
}
