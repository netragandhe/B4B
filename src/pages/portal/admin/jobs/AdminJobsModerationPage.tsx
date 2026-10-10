import React, { useState, useEffect, useMemo } from 'react'
import {
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Trash2,
  AlertCircle,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  PlusCircle,
  RotateCcw,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/components/ui/Toast'
import { jobService } from '@/lib/jobService'
import { Job } from '@/mock-data/jobs'

export const AdminJobsModerationPage: React.FC = () => {
  const { toast } = useToast()

  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'pending' | 'approved' | 'rejected'>('All')

  // Reject Modal State
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [selectedJobForReject, setSelectedJobForReject] = useState<Job | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  // Remove Modal State
  const [removeModalOpen, setRemoveModalOpen] = useState(false)
  const [selectedJobForRemove, setSelectedJobForRemove] = useState<Job | null>(null)

  const loadAllJobs = async () => {
    try {
      setIsLoading(true)
      const data = await jobService.getAllJobsForAdmin()
      setJobs(data)
    } catch (err) {
      console.error('Failed to load admin jobs:', err)
      toast({
        title: 'Error Loading Jobs',
        description: 'Failed to retrieve listings from local storage.',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadAllJobs()
  }, [])

  // Approve Job Handler
  const handleApprove = async (job: Job) => {
    try {
      setIsProcessing(true)
      const updated = await jobService.approveJob(job.id)
      setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)))
      toast({
        title: 'Job Approved',
        description: `"${job.title}" is now publicly visible in search.`,
        type: 'success',
      })
    } catch (err) {
      console.error(err)
      toast({
        title: 'Approval Failed',
        description: 'Could not approve listing.',
        type: 'error',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Open Reject Modal
  const openRejectModal = (job: Job) => {
    setSelectedJobForReject(job)
    setRejectionReason('')
    setRejectModalOpen(true)
  }

  // Confirm Reject Handler
  const handleConfirmReject = async () => {
    if (!selectedJobForReject) return
    if (!rejectionReason.trim()) {
      toast({
        title: 'Rejection Reason Required',
        description: 'Please specify why this listing was rejected.',
        type: 'warning',
      })
      return
    }

    try {
      setIsProcessing(true)
      const updated = await jobService.rejectJob(
        selectedJobForReject.id,
        rejectionReason.trim()
      )
      setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)))
      toast({
        title: 'Job Rejected',
        description: `"${selectedJobForReject.title}" marked as rejected.`,
        type: 'info',
      })
      setRejectModalOpen(false)
      setSelectedJobForReject(null)
    } catch (err) {
      console.error(err)
      toast({
        title: 'Action Failed',
        description: 'Could not reject listing.',
        type: 'error',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Open Remove Modal
  const openRemoveModal = (job: Job) => {
    setSelectedJobForRemove(job)
    setRemoveModalOpen(true)
  }

  // Confirm Remove Handler
  const handleConfirmRemove = async () => {
    if (!selectedJobForRemove) return
    try {
      setIsProcessing(true)
      const ok = await jobService.removeJob(selectedJobForRemove.id)
      if (ok) {
        setJobs((prev) => prev.filter((j) => j.id !== selectedJobForRemove.id))
        toast({
          title: 'Job Removed',
          description: `"${selectedJobForRemove.title}" has been permanently removed.`,
          type: 'success',
        })
      }
      setRemoveModalOpen(false)
      setSelectedJobForRemove(null)
    } catch (err) {
      console.error(err)
      toast({
        title: 'Remove Failed',
        description: 'Could not remove listing.',
        type: 'error',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Reset to Demo Jobs Handler
  const handleResetDemo = async () => {
    try {
      setIsLoading(true)
      const reset = await jobService.resetToDemoJobs()
      setJobs(reset)
      toast({
        title: 'Database Reset',
        description: 'Jobs database refreshed to 30 default demo listings.',
        type: 'info',
      })
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchesStatus =
        statusFilter === 'All' ? true : j.status === statusFilter
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.city.toLowerCase().includes(q) ||
        j.state.toLowerCase().includes(q)
      return matchesStatus && matchesSearch
    })
  }, [jobs, statusFilter, searchQuery])

  // Count summaries
  const pendingCount = jobs.filter((j) => j.status === 'pending').length
  const approvedCount = jobs.filter((j) => j.status === 'approved').length
  const rejectedCount = jobs.filter((j) => j.status === 'rejected').length

  return (
    <div className="space-y-6 pb-16 font-body">
      {/* Header */}
      <PageHeader
        title="Admin Jobs Moderation Queue"
        description="Review user-submitted jobs, approve verified employer posts, or reject non-compliant listings before they appear in public searches."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetDemo}
              className="flex items-center gap-1.5 text-xs text-slate-600"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset 30 Demo Jobs</span>
            </Button>
          </div>
        }
      />

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Total Listings
            </p>
            <p className="text-2xl font-extrabold text-[#06201A] font-mono">
              {jobs.length}
            </p>
          </div>
          <Briefcase className="w-8 h-8 text-slate-300" />
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs flex items-center justify-between bg-amber-50/30">
          <div>
            <p className="text-xs text-amber-800 font-bold uppercase tracking-wider">
              Pending Approval
            </p>
            <p className="text-2xl font-extrabold text-amber-900 font-mono">
              {pendingCount}
            </p>
          </div>
          <Clock className="w-8 h-8 text-amber-400" />
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#0E7A5A]/30 shadow-xs flex items-center justify-between bg-[#0E7A5A]/5">
          <div>
            <p className="text-xs text-[#0E7A5A] font-bold uppercase tracking-wider">
              Approved (Live)
            </p>
            <p className="text-2xl font-extrabold text-[#0E7A5A] font-mono">
              {approvedCount}
            </p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-[#0E7A5A]/40" />
        </div>

        <div className="bg-white p-4 rounded-xl border border-red-200 shadow-xs flex items-center justify-between bg-red-50/30">
          <div>
            <p className="text-xs text-red-700 font-bold uppercase tracking-wider">
              Rejected
            </p>
            <p className="text-2xl font-extrabold text-red-800 font-mono">
              {rejectedCount}
            </p>
          </div>
          <XCircle className="w-8 h-8 text-red-400" />
        </div>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4 bg-white border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'All', label: `All (${jobs.length})` },
              { id: 'pending', label: `Pending (${pendingCount})` },
              { id: 'approved', label: `Approved (${approvedCount})` },
              { id: 'rejected', label: `Rejected (${rejectedCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === tab.id
                    ? 'bg-[#0E7A5A] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search title, company, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0E7A5A] text-slate-800"
            />
          </div>
        </div>
      </Card>

      {/* Moderation Queue Table / List */}
      <Card className="bg-white border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-xs text-slate-500">
            Loading moderation queue...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <ShieldCheck className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No jobs match this filter.</p>
            <p className="text-xs text-slate-500">
              Check back when new submissions arrive or clear search filters.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-5 hover:bg-slate-50/60 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                {/* Details */}
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Status Badge */}
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                        job.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : job.status === 'pending'
                          ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                          : 'bg-red-50 text-red-800 border-red-300'
                      }`}
                    >
                      {job.status === 'pending'
                        ? 'PENDING APPROVAL'
                        : job.status.toUpperCase()}
                    </span>

                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {job.category}
                    </span>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {job.jobType}
                    </span>

                    {job.isDemo && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300">
                        DEMO DATA
                      </span>
                    )}

                    <span className="text-[10px] font-mono text-slate-400">
                      ID: {job.id}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-heading text-[#06201A]">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-semibold text-slate-800">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.company}</span>
                    </span>

                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {job.city}, {job.state}
                      </span>
                    </span>

                    <span className="flex items-center gap-1 font-mono text-[#C8793A] font-bold">
                      <DollarSign className="w-3.5 h-3.5 text-[#C8793A]" />
                      <span>{job.salary}</span>
                    </span>

                    <span className="text-slate-400 font-mono text-[11px]">
                      Contact: {job.contactEmail}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  {job.status === 'rejected' && job.rejectionReason && (
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Rejection Reason:</strong> {job.rejectionReason}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 self-start lg:self-center shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 w-full lg:w-auto justify-end">
                  {job.status !== 'approved' && (
                    <button
                      onClick={() => handleApprove(job)}
                      disabled={isProcessing}
                      className="px-3.5 py-1.5 rounded-lg bg-[#0E7A5A] hover:bg-[#0B4A3A] text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                      title="Approve and publish to public search"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}

                  {job.status !== 'rejected' && (
                    <button
                      onClick={() => openRejectModal(job)}
                      disabled={isProcessing}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-red-50 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      title="Reject with explanation"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  )}

                  <button
                    onClick={() => openRemoveModal(job)}
                    disabled={isProcessing}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Remove permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Reject Modal */}
      <Modal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        title="Reject Job Listing"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Specify the reason for rejecting{' '}
            <strong>"{selectedJobForReject?.title}"</strong>. This will be recorded in the moderation history.
          </p>

          <Textarea
            rows={4}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="e.g. Missing required licensing info, spam content, or non-compliant compensation..."
          />

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRejectModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleConfirmReject}
              disabled={isProcessing || !rejectionReason.trim()}
            >
              Confirm Rejection
            </Button>
          </div>
        </div>
      </Modal>

      {/* Remove Confirmation Modal */}
      <Modal
        isOpen={removeModalOpen}
        onClose={() => setRemoveModalOpen(false)}
        title="Permanently Remove Job Listing"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Are you sure you want to permanently delete{' '}
            <strong>"{selectedJobForRemove?.title}"</strong> from{' '}
            <strong>{selectedJobForRemove?.company}</strong>? This action cannot be undone.
          </p>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRemoveModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleConfirmRemove}
              disabled={isProcessing}
            >
              Remove Listing
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
