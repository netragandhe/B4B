import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AccordionItemData {
  id: string
  title: string
  content: React.ReactNode
}

export interface AccordionProps {
  items: AccordionItemData[]
  allowMultiple?: boolean
  className?: string
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className,
}) => {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || ''])

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      )
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]))
    }
  }

  return (
    <div className={cn('space-y-3 w-full text-left', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id)
        return (
          <div
            key={item.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden transition-all shadow-xs"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full p-4 flex items-center justify-between gap-4 text-left font-semibold text-sm sm:text-base text-[var(--text)] hover:text-[var(--blue-600)] transition-colors focus:outline-none"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  'w-4 h-4 text-[var(--text-muted)] shrink-0 transition-transform duration-200',
                  isOpen && 'transform rotate-180 text-[var(--blue-600)]'
                )}
              />
            </button>

            {isOpen && (
              <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed border-t border-[var(--border)] animate-fadeIn">
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
