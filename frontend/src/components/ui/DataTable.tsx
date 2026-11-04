import React, { useState, useMemo } from 'react'
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react'
import { Input } from './Input'
import { Button } from './Button'
import { Select } from './Select'
import { cn } from '@/lib/utils'

export interface Column<T> {
  key: string
  header: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
  width?: string
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchKey?: keyof T | string
  searchPlaceholder?: string
  filterOptions?: {
    key: keyof T | string
    label: string
    options: { label: string; value: string }[]
  }
  pageSize?: number
  className?: string
  onRowClick?: (item: T) => void
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchKey,
  searchPlaceholder,
  filterOptions,
  pageSize = 5,
  className,
  onRowClick,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)

  // 1. Filter & Search
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search
      if (searchQuery && searchKey) {
        const val = String(item[searchKey as string] || '').toLowerCase()
        if (!val.includes(searchQuery.toLowerCase())) return false
      }
      // Filter dropdown
      if (filterOptions && activeFilter !== 'all') {
        const itemVal = String(item[filterOptions.key as string] || '')
        if (itemVal.toLowerCase() !== activeFilter.toLowerCase()) return false
      }
      return true
    })
  }, [data, searchQuery, searchKey, filterOptions, activeFilter])

  // 2. Sort
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (aVal === bVal) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
      }
      return sortOrder === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal))
    })
  }, [filteredData, sortKey, sortOrder])

  // 3. Paginate
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, currentPage, pageSize])

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortOrder === 'asc') setSortOrder('desc')
      else {
        setSortKey(null)
        setSortOrder('asc')
      }
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  return (
    <div className={cn('w-full space-y-3.5', className)}>
      {/* Top Controls: Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {searchKey && (
          <div className="w-full sm:w-72">
            <Input
              placeholder={searchPlaceholder || `Search by ${String(searchKey)}...`}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
        )}

        {filterOptions && (
          <div className="flex items-center gap-2 w-full sm:w-auto self-end sm:self-center">
            <Filter className="w-4 h-4 text-[var(--text-muted)]" />
            <div className="w-44">
              <Select
                value={activeFilter}
                onChange={(e) => {
                  setActiveFilter(e.target.value)
                  setCurrentPage(1)
                }}
                options={[
                  { label: `All ${filterOptions.label}`, value: 'all' },
                  ...filterOptions.options,
                ]}
              />
            </div>
          </div>
        )}
      </div>

      {/* Table Surface */}
      <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--sky-50)]/70">
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={cn(
                    'p-3.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider select-none',
                    col.sortable && 'cursor-pointer hover:text-[var(--blue-600)]'
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-[var(--text-muted)]">
                        {sortKey === col.key ? (
                          sortOrder === 'asc' ? (
                            <ChevronUp className="w-3.5 h-3.5 text-[var(--blue-600)]" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-[var(--blue-600)]" />
                          )
                        ) : (
                          <ChevronsUpDown className="w-3.5 h-3.5 opacity-60" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)] text-sm">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, rowIdx) => (
                <tr
                  key={item.id || rowIdx}
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    'transition-colors hover:bg-[var(--sky-50)]/70',
                    onRowClick && 'cursor-pointer'
                  )}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="p-3.5 text-[var(--text)] font-medium">
                      {col.render ? col.render(item) : String(item[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-8 text-center text-sm text-[var(--text-muted)]"
                >
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)] px-1">
        <div>
          Showing{' '}
          <span className="font-semibold text-[var(--text)]">
            {sortedData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          </span>{' '}
          to{' '}
          <span className="font-semibold text-[var(--text)]">
            {Math.min(currentPage * pageSize, sortedData.length)}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-[var(--text)]">
            {sortedData.length}
          </span>{' '}
          entries
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
          >
            Prev
          </Button>

          <span className="px-2 py-1 font-semibold text-[var(--text)]">
            {currentPage} / {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
