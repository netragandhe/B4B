import React from 'react'
import { cn } from '@/lib/utils'

export interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
  badge?: string | number
  disabled?: boolean
}

export interface TabsProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (id: string) => void
  variant?: 'underline' | 'pills' | 'segmented'
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'segmented',
  className,
}) => {
  if (variant === 'segmented') {
    return (
      <div
        className={cn(
          'inline-flex p-1 rounded-xl bg-[var(--sky-50)] border border-[var(--border)]',
          className
        )}
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={cn(
                'flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]',
                isActive
                  ? 'bg-[var(--blue-600)] text-white shadow-xs'
                  : 'text-[var(--navy-900)] hover:text-[var(--blue-600)]',
                tab.disabled && 'opacity-40 cursor-not-allowed'
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    'px-1.5 py-0.2 rounded-full text-[10px] font-bold',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[var(--surface)] text-[var(--text-muted)]'
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className={cn('border-b border-[var(--border)] flex gap-6', className)} role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-all outline-none select-none',
              isActive
                ? 'border-[var(--blue-600)] text-[var(--blue-600)]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border)]',
              tab.disabled && 'opacity-40 cursor-not-allowed'
            )}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[var(--sky-50)] text-[var(--text-muted)]">
                {tab.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
