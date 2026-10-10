import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Search, Filter, MoreVertical, ArrowUpDown } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'

export interface Column<T> {
  header: string
  accessorKey?: keyof T
  render?: (item: T, index: number) => React.ReactNode
  isPrimary?: boolean
  hideOnMobile?: boolean
  className?: string
}

export interface ResponsiveTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyExtractor: (item: T) => string | number
  searchPlaceholder?: string
  searchFields?: (keyof T)[]
  onRowClick?: (item: T) => void
  actions?: (item: T) => React.ReactNode
  itemsPerPage?: number
  emptyState?: React.ReactNode
  title?: string
  subtitle?: string
}

export function ResponsiveTable<T extends Record<string, any>>({
  data,
  columns,
  keyExtractor,
  searchPlaceholder = 'Search records...',
  searchFields,
  onRowClick,
  actions,
  itemsPerPage = 6,
  emptyState,
  title,
  subtitle,
}: ResponsiveTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter Data
  const filteredData = data.filter((item) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    if (searchFields && searchFields.length > 0) {
      return searchFields.some((field) => String(item[field] || '').toLowerCase().includes(q))
    }
    return Object.values(item).some((val) => String(val || '').toLowerCase().includes(q))
  })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const primaryCol = columns.find((c) => c.isPrimary) || columns[0]

  return (
    <div className="space-y-4 w-full text-left">
      {/* Search & Header Bar */}
      {(title || searchPlaceholder) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-1">
          {title && (
            <div>
              <h3 className="text-base font-extrabold font-heading text-[var(--text)]">{title}</h3>
              {subtitle && <p className="text-xs text-[var(--text-muted)] mt-0.5">{subtitle}</p>}
            </div>
          )}

          {searchPlaceholder && (
            <div className="w-full sm:w-72">
              <Input
                placeholder={searchPlaceholder}
                leftIcon={<Search className="w-4 h-4" />}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="text-xs min-h-[44px] sm:min-h-[38px]"
              />
            </div>
          )}
        </div>
      )}

      {/* DESKTOP TABLE VIEW (MD AND UP) */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[var(--bg)] border-b border-[var(--border)] text-[var(--text-muted)] font-bold uppercase tracking-wider text-[11px]">
              {columns.map((col, idx) => (
                <th key={idx} className={`py-3.5 px-4 ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
              {actions && <th className="py-3.5 px-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, rowIdx) => (
                <tr
                  key={keyExtractor(item)}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={`hover:bg-[var(--bg)] transition-colors ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={`py-3.5 px-4 text-[var(--text)] ${col.className || ''}`}>
                      {col.render
                        ? col.render(item, rowIdx)
                        : col.accessorKey
                        ? String(item[col.accessorKey] ?? '')
                        : ''}
                    </td>
                  ))}
                  {actions && (
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      {actions(item)}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="py-12 text-center text-[var(--text-muted)]">
                  {emptyState || 'No records found matching query.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE STACKED CARDS VIEW (UNDER MD) */}
      <div className="md:hidden space-y-3">
        {paginatedData.length > 0 ? (
          paginatedData.map((item, rowIdx) => (
            <Card
              key={keyExtractor(item)}
              variant="default"
              onClick={() => onRowClick && onRowClick(item)}
              className={`p-4 space-y-3 border border-[var(--border)] transition-all ${
                onRowClick ? 'active:scale-[0.99] cursor-pointer' : ''
              }`}
            >
              {/* Card Header: Primary column */}
              <div className="flex items-start justify-between gap-3 border-b border-[var(--border)] pb-3">
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-sm text-[var(--text)] truncate">
                    {primaryCol.render ? primaryCol.render(item, rowIdx) : String(item[primaryCol.accessorKey || ''] || '')}
                  </div>
                </div>
                {actions && <div onClick={(e) => e.stopPropagation()}>{actions(item)}</div>}
              </div>

              {/* Card Body: Secondary columns grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {columns
                  .filter((c) => !c.isPrimary)
                  .map((col, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                        {col.header}
                      </span>
                      <div className="text-[var(--text)] font-medium truncate">
                        {col.render ? col.render(item, rowIdx) : String(item[col.accessorKey || ''] || '-')}
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          ))
        ) : (
          <Card variant="default" className="p-8 text-center text-[var(--text-muted)] text-xs border border-[var(--border)]">
            {emptyState || 'No records found matching query.'}
          </Card>
        )}
      </div>

      {/* COMPACT PAGINATION FOOTER */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 px-1 text-xs text-[var(--text-muted)]">
          <span>
            Page <strong className="text-[var(--text)]">{currentPage}</strong> of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="min-h-[40px] px-3 font-semibold text-xs"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="min-h-[40px] px-3 font-semibold text-xs"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
