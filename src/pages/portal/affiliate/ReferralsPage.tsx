import React, { useState } from 'react'
import {
  Users,
  Search,
  Download,
  Filter,
  Eye,
  Building2,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  FileText,
  Sparkles,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { PageLoadingFallback } from '@/components/ui/PageLoadingFallback'
import { SEOHead } from '@/components/seo/SEOHead'
import { PageTransition } from '@/components/animations/PageTransition'
import { useReferrals } from '@/hooks/queries/useAffiliateData'
import { useToast } from '@/components/ui/Toast'
import { formatCurrency } from '@/lib/utils'
import type { ReferralItem, ReferralStatus } from '@/mock-data/affiliateData'

export const ReferralsPage: React.FC = () => {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('All')
  const [selectedReferral, setSelectedReferral] = useState<ReferralItem | null>(null)

  const { data: referrals, isLoading, isError, refetch } = useReferrals({
    status: selectedStatus,
    search: searchQuery,
  })

  const statusOptions: (ReferralStatus | 'All')[] = [
    'All',
    'Lead In Review',
    'Consultation Booked',
    'Underwriting',
    'Pre-Approved',
    'Funded',
    'Paid Out',
  ]

  const handleExportCsv = () => {
    if (!referrals || referrals.length === 0) {
      toast({ title: 'Export Empty', description: 'No records to export.', type: 'info' })
      return
    }

    const headers = 'ID,Company,Contact,Email,Phone,Solution,DealSize,Commission,Status,SubmittedDate\n'
    const rows = referrals
      .map(
        (r) =>
          `"${r.id}","${r.companyName}","${r.contactName}","${r.contactEmail}","${r.contactPhone}","${r.solutionNeeded}",${r.dealSize},${r.commissionEarned},"${r.status}","${r.submissionDate}"`
      )
      .join('\n')

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `OAL-Partner-Referrals-${Date.now()}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast({
      title: 'Referrals CSV Exported',
      description: `Downloaded ${referrals.length} referral records to CSV.`,
      type: 'success',
    })
  }

  if (isLoading) return <PageLoadingFallback />
  if (isError) {
    return (
      <ErrorState
        title="Could not load referrals"
        message="Unable to fetch client referral pipeline. Please try again."
        onRetry={() => refetch()}
      />
    )
  }

  const getStatusBadge = (status: ReferralStatus) => {
    switch (status) {
      case 'Funded':
      case 'Paid Out':
        return <Badge variant="emerald" size="sm" dot>{status}</Badge>
      case 'Pre-Approved':
        return <Badge variant="gold" size="sm" dot>{status}</Badge>
      case 'Underwriting':
      case 'Consultation Booked':
        return <Badge variant="royal" size="sm">{status}</Badge>
      default:
        return <Badge variant="primary" size="sm">{status}</Badge>
    }
  }

  return (
    <PageTransition>
      <div className="space-y-8 text-left">
        <SEOHead
          title="Referrals & Client Pipeline | OAL Partner Hub"
          description="Track status, pre-approvals, and funded deals for your referred clients."
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                Referrals Pipeline
              </h1>
              <Badge variant="emerald" size="sm">
                {(referrals || []).length} Records
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              End-to-end transparency from initial lead intake to funded disbursement and commission payout.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            leftIcon={<Download className="w-3.5 h-3.5" />}
            className="text-xs font-semibold"
          >
            Export Pipeline CSV
          </Button>
        </div>

        {/* Filter & Search Bar */}
        <Card variant="bento" className="p-4 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Search company, contact, or solution..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {statusOptions.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedStatus === st
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#12294A]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Referrals Data Table */}
        {(!referrals || referrals.length === 0) ? (
          <EmptyState
            icon={<Users className="w-8 h-8 text-blue-500" />}
            title="No referrals found"
            description="No referral records match your current search and filter settings."
            action={
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedStatus('All')
                }}
              >
                Reset Filters
              </Button>
            }
          />
        ) : (
          <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-[#1E3A5F]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 dark:bg-[#12294A]/80 border-b border-slate-200 dark:border-[#1E3A5F] text-slate-500 font-bold uppercase text-[10px] tracking-wider select-none">
                  <tr>
                    <th className="py-3 px-4">Company & Contact</th>
                    <th className="py-3 px-4">Solution</th>
                    <th className="py-3 px-4">Deal Size</th>
                    <th className="py-3 px-4">Commission</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#1E3A5F]/70">
                  {referrals.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-[#12294A]/40 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-slate-100">
                          {r.companyName}
                        </div>
                        <div className="text-[11px] text-slate-500">{r.contactName}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                        {r.solutionNeeded}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                        {formatCurrency(r.dealSize)}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(r.commissionEarned)}
                      </td>
                      <td className="py-3.5 px-4">{getStatusBadge(r.status)}</td>
                      <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                        {r.submissionDate}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedReferral(r)}
                          leftIcon={<Eye className="w-3.5 h-3.5" />}
                          className="h-7 text-xs font-semibold"
                        >
                          Inspect
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Referral Detail Modal */}
        <Modal
          isOpen={!!selectedReferral}
          onClose={() => setSelectedReferral(null)}
          title={selectedReferral?.companyName || 'Referral Detail'}
          description={`Pipeline ID: ${selectedReferral?.id} • Attributed Link: ${selectedReferral?.trackingSlug}`}
          maxWidth="md"
        >
          {selectedReferral && (
            <div className="space-y-4 text-left text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Pipeline Status:</span>
                  {getStatusBadge(selectedReferral.status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Estimated Deal Size:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {formatCurrency(selectedReferral.dealSize)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Earned Commission:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    {formatCurrency(selectedReferral.commissionEarned)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
                  Contact Information
                </h4>
                <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 dark:text-white">Contact:</span>{' '}
                    {selectedReferral.contactName}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <a href={`mailto:${selectedReferral.contactEmail}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      {selectedReferral.contactEmail}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedReferral.contactPhone}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#1E3A5F]">
                <h4 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
                  Underwriting Notes & Updates
                </h4>
                <p className="p-3 rounded-lg bg-white dark:bg-[#0D1E36] border text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedReferral.notes}
                </p>
                <p className="text-[10px] text-slate-400">
                  Last updated by underwriting desk on {selectedReferral.lastUpdated}.
                </p>
              </div>

              <div className="pt-3 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => setSelectedReferral(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </PageTransition>
  )
}
