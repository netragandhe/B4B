import React, { useState, useMemo } from 'react'
import {
  ShieldCheck,
  Search,
  FileSpreadsheet,
  Printer,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  Flag,
  Sparkles,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Plus,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { useToast } from '@/components/ui/Toast'
import { ADMIN_JOBS_QUEUE, AdminJobPost } from '@/mock-data/adminFullData'
import { exportToCsv, exportToPdf } from '@/lib/exportUtils'

export const AdminJobsModerationPage: React.FC = () => {
  const { toast } = useToast()

  const [jobs, setJobs] = useState<AdminJobPost[]>(ADMIN_JOBS_QUEUE)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending Approval' | 'Approved' | 'Flagged' | 'Rejected'>('All')
  const [categoryFilter, setCategoryFilter] = useState<string>('All')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const categories = ['All', 'B2B Sales', 'B2C Sales', 'Software Sales', 'Insurance Sales', 'Account Executives']

  const handleAction = (id: string, title: string, action: 'Approved' | 'Flagged' | 'Rejected') => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: action } : j))
    )
    toast({
      title: `Job ${action}`,
      description: `"${title}" status updated to ${action}.`,
      type: action === 'Approved' ? 'success' : action === 'Flagged' ? 'warning' : 'info',
    })
  }

  // Filter & Sort
  const filteredJobs = useMemo(() => {
    return jobs
      .filter((j) => {
        const matchesSearch =
          j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.employerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.location.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === 'All' || j.status === statusFilter
        const matchesCat = categoryFilter === 'All' || j.category === categoryFilter

        return matchesSearch && matchesStatus && matchesCat
      })
      .sort((a, b) => {
        return sortOrder === 'asc'
          ? a.postedDate.localeCompare(b.postedDate)
          : b.postedDate.localeCompare(a.postedDate)
      })
  }, [jobs, searchQuery, statusFilter, categoryFilter, sortOrder])

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage) || 1
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredJobs.slice(start, start + itemsPerPage)
  }, [filteredJobs, currentPage])

  const handleExportCsv = () => {
    const headers = ['ID', 'Job Title', 'Employer', 'Category', 'Location', 'Salary', 'Date Posted', 'Applicants', 'Status']
    const rows = jobs.map((j) => [
      j.id,
      j.title,
      j.employerName,
      j.category,
      j.location,
      j.salary,
      j.postedDate,
      j.applicantsCount,
      j.status,
    ])
    exportToCsv('Admin_Jobs_Moderation_Queue', headers, rows)
    toast({ title: 'CSV Downloaded', description: 'Jobs moderation queue exported to CSV.', type: 'success' })
  }

  const handleExportPdf = () => {
    const headers = ['ID', 'Job Title', 'Employer', 'Category', 'Location', 'Salary', 'Date Posted', 'Status']
    const rows = jobs.map((j) => [
      j.id,
      j.title,
      j.employerName,
      j.category,
      j.location,
      j.salary,
      j.postedDate,
      j.status,
    ])
    exportToPdf('Employer Job Moderation Report', headers, rows)
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Employer Jobs Moderation Queue"
        description="Review, approve, flag, or reject job postings submitted by employer partners before publication."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Jobs Moderation', icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="navy" size="md">
            Moderation Desk
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExportCsv} leftIcon={<FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />}>
              CSV
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPdf} leftIcon={<Printer className="w-3.5 h-3.5 text-blue-600" />}>
              PDF Report
            </Button>
          </div>
        }
      />

      {/* FILTER CONTROLS BAR */}
      <Card variant="default" className="p-4 space-y-3 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, company, or city..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  Category: {c}
                </option>
              ))}
            </select>

            {/* Sort Toggle */}
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
            >
              <ArrowUpDown className="w-3 h-3" />
              <span>Date ({sortOrder.toUpperCase()})</span>
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          {(['All', 'Pending Approval', 'Approved', 'Flagged', 'Rejected'] as const).map((st) => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st)
                setCurrentPage(1)
              }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </Card>

      {/* MODERATION QUEUE TABLE */}
      <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-3 px-4">Job Title & Employer</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Location & Salary</th>
                <th className="py-3 px-4">Posted Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((j) => (
                  <tr key={j.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar src={j.companyLogo} name={j.employerName} size="md" className="rounded-lg" />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white text-sm">{j.title}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            <span>{j.employerName}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="navy" size="sm">
                        {j.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 space-y-0.5">
                      <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{j.location}</span>
                      </div>
                      <div className="text-emerald-600 dark:text-emerald-400 font-medium text-[11px]">
                        {j.salary}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{j.postedDate}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          j.status === 'Approved'
                            ? 'emerald'
                            : j.status === 'Pending Approval'
                            ? 'amber'
                            : j.status === 'Flagged'
                            ? 'gold'
                            : 'danger'
                        }
                        size="sm"
                        dot
                      >
                        {j.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="accent"
                          onClick={() => handleAction(j.id, j.title, 'Approved')}
                          leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                          className="text-xs"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction(j.id, j.title, 'Flagged')}
                          leftIcon={<Flag className="w-3.5 h-3.5 text-amber-500" />}
                          className="text-xs border-amber-200 text-amber-700 hover:bg-amber-50"
                        >
                          Flag
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction(j.id, j.title, 'Rejected')}
                          leftIcon={<XCircle className="w-3.5 h-3.5 text-rose-500" />}
                          className="text-xs border-rose-200 text-rose-600 hover:bg-rose-50"
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No job postings found matching your search and status criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs text-slate-500">
            Showing Page {currentPage} of {totalPages} ({filteredJobs.length} total jobs)
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
