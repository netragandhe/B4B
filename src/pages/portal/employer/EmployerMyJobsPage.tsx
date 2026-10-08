import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Briefcase,
  PlusCircle,
  Eye,
  Users,
  Edit3,
  PauseCircle,
  PlayCircle,
  XCircle,
  Trash2,
  MapPin,
  Search,
  FileSpreadsheet,
  Printer,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  X,
  Save,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'
import { MOCK_JOBS, JobItem } from '@/mock-data/jobsBoardData'
import { formatCurrency } from '@/lib/utils'
import { exportToCsv, exportToPdf } from '@/lib/exportUtils'

export const EmployerMyJobsPage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [jobs, setJobs] = useState<JobItem[]>(MOCK_JOBS.slice(0, 6))
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Paused' | 'Closed'>('All')

  // Edit Modal State
  const [editingJob, setEditingJob] = useState<JobItem | null>(null)

  const togglePause = (id: string, title: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active'
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: newStatus as any } : j))
    )
    toast({
      title: `Job ${newStatus}`,
      description: `"${title}" status updated to ${newStatus}.`,
      type: newStatus === 'Active' ? 'success' : 'info',
    })
  }

  const closeJob = (id: string, title: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: 'Closed' as any } : j))
    )
    toast({ title: 'Job Closed', description: `"${title}" posting has been closed.`, type: 'info' })
  }

  const deleteJob = (id: string, title: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id))
    toast({ title: 'Job Deleted', description: `"${title}" deleted from employer listings.`, type: 'success' })
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingJob) return

    setJobs((prev) => prev.map((j) => (j.id === editingJob.id ? editingJob : j)))
    setEditingJob(null)
    toast({ title: 'Job Updated', description: `Saved changes to "${editingJob.title}".`, type: 'success' })
  }

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchesSearch =
        j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'All' || j.status === statusFilter || (!j.status && statusFilter === 'Active')
      return matchesSearch && matchesStatus
    })
  }, [jobs, searchQuery, statusFilter])

  const handleExportCsv = () => {
    const headers = ['Job ID', 'Title', 'Category', 'Location', 'Salary Min', 'Salary Max', 'Applicants', 'Views', 'Date Posted', 'Status']
    const rows = jobs.map((j) => [
      j.id,
      j.title,
      j.category,
      j.location,
      j.salaryMin,
      j.salaryMax,
      j.applicantCount,
      j.viewsCount || 240,
      j.postedDate,
      j.status || 'Active',
    ])
    exportToCsv('Employer_My_Jobs_Listings', headers, rows)
  }

  const handleExportPdf = () => {
    const headers = ['Job ID', 'Title', 'Category', 'Location', 'Salary Range', 'Applicants', 'Status']
    const rows = jobs.map((j) => [
      j.id,
      j.title,
      j.category,
      j.location,
      `${formatCurrency(j.salaryMin)} - ${formatCurrency(j.salaryMax)}`,
      j.applicantCount,
      j.status || 'Active',
    ])
    exportToPdf('Employer Posted Jobs Directory Report', headers, rows)
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="My Corporate Job Postings"
        description="Manage active job listings, edit responsibilities, pause or close postings, and inspect applicants."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'My Posted Jobs' }]}
        badge={
          <Badge variant="navy" size="md">
            {jobs.length} Active Positions
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
            <Button
              variant="accent"
              size="sm"
              onClick={() => navigate('/portal/employer/post-job')}
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              Post a Job
            </Button>
          </div>
        }
      />

      {/* FILTER AND SEARCH BAR */}
      <Card variant="default" className="p-4 space-y-3 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posted jobs by title, city..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5">
            {(['All', 'Active', 'Paused', 'Closed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
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
        </div>
      </Card>

      {/* MY JOBS DATA TABLE */}
      <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-3 px-4">Job Title & Category</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Compensation Range</th>
                <th className="py-3 px-4">Applicants</th>
                <th className="py-3 px-4">Date Posted</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Job Management Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((j) => {
                  const status = j.status || 'Active'
                  return (
                    <tr key={j.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">{j.title}</div>
                        <Badge variant="navy" size="sm" className="mt-1">
                          {j.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{j.location}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(j.salaryMin)} - {formatCurrency(j.salaryMax)}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="emerald" size="sm">
                          {j.applicantCount} Applicants
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{j.postedDate}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={status === 'Active' ? 'emerald' : status === 'Paused' ? 'amber' : 'danger'}
                          size="sm"
                          dot
                        >
                          {status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button size="sm" variant="outline" onClick={() => setEditingJob(j)} leftIcon={<Edit3 className="w-3.5 h-3.5" />}>
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => togglePause(j.id, j.title, status)}
                            leftIcon={status === 'Active' ? <PauseCircle className="w-3.5 h-3.5 text-amber-500" /> : <PlayCircle className="w-3.5 h-3.5 text-emerald-500" />}
                          >
                            {status === 'Active' ? 'Pause' : 'Resume'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => closeJob(j.id, j.title)}
                            leftIcon={<XCircle className="w-3.5 h-3.5 text-rose-500" />}
                          >
                            Close
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteJob(j.id, j.title)}
                            className="text-rose-500 hover:bg-rose-50 border-rose-200"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No posted jobs found matching your search and status criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* EDIT JOB MODAL */}
      {editingJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <Card variant="bento" className="w-full max-w-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Edit Job Position: {editingJob.title}</h3>
              <button onClick={() => setEditingJob(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Job Title</label>
                <input
                  type="text"
                  value={editingJob.title}
                  onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Salary Minimum ($)</label>
                  <input
                    type="number"
                    value={editingJob.salaryMin}
                    onChange={(e) => setEditingJob({ ...editingJob, salaryMin: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Salary Maximum ($)</label>
                  <input
                    type="number"
                    value={editingJob.salaryMax}
                    onChange={(e) => setEditingJob({ ...editingJob, salaryMax: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Location</label>
                <input
                  type="text"
                  value={editingJob.location}
                  onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <Button variant="outline" size="sm" onClick={() => setEditingJob(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="accent" size="sm" leftIcon={<Save className="w-4 h-4" />}>
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
