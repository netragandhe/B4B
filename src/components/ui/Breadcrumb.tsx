import React from 'react'
import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  showHome?: boolean
  className?: string
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showHome = true,
  className,
}) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs text-slate-500 dark:text-slate-400', className)}>
      <ol className="flex items-center space-x-1 sm:space-x-2">
        {showHome && (
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
        )}

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1

          return (
            <li key={item.label} className="inline-flex items-center">
              {(showHome || idx > 0) && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-1 shrink-0" />
              )}
              {isLast || !item.href ? (
                <span className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  {item.icon}
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  {item.icon}
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
