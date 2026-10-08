import React, { useState, useMemo } from 'react'
import { Target, Search, FileSpreadsheet, Printer, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'
import { MOCK_AFFILIATE_REFERRALS, AffiliateReferralDeal } from '@/mock-data/affiliateData'
import { formatCurrency } from '@/lib/utils'
import { exportToCsv, exportToPdf } from '@/lib/exportUtils'

export const AffiliateReferralsPage: React.FC = () => {
  const { toast } = useToast()

  const [referrals, setReferrals] = useState<AffiliateReferralDeal[]>(MOCK_AFFILIATE_REFERRALS)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'New Lead' | 'Contacted' | 'Underwriting Review' | 'Funded' | 'Closed/Lost'>('All')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredReferrals = useMemo(() => {
    return referrals
      .filter((r) => {
        const matchesSearch =
          r.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.serviceInterest.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === 'All' || r.status === statusFilter
        return matchesSearch && matchesStatus
      })
      .sort((a, b) => {
        return sortOrder === 'asc' ? a.dealSize - b.dealSize : b.dealSize - a.dealSize
      })
  }, [referrals, searchQuery, statusFilter, sortOrder])

  const totalPages = Math.ceil(filteredReferrals.length / itemsPerPage) || 1
  const paginatedReferrals = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredReferrals.slice(start, start + itemsPerPage)
  }, [filteredReferrals, currentPage])

  const handleExportCsv = () => {
    const headers = ['ID', 'Client Name', 'Company', 'Service Interest', 'Deal Size', 'Est. Commission', 'Status', 'Date Submitted']
    const rows = referrals.map((r) => [
      r.id,
      r.clientName,
      r.company,
      r.serviceInterest,
      r.dealSize,
      r.estimatedCommission,
      r.status,
      r.submittedDate,
    ])
    exportToCsv('Affiliate_Referrals_Pipeline', headers, rows)
    toast({ title: 'CSV Downloaded', description: 'Referral pipeline dataset exported to CSV.', type: 'success' })
  }

  const handleExportPdf = () => {
    const headers = ['ID', 'Client Name', 'Company', 'Service Interest', 'Deal Size', 'Est. Commission', 'Status']
    const rows = referrals.map((r) => [
      r.id,
      r.clientName,
      r.company,
      r.serviceInterest,
      formatCurrency(r.dealSize),
      formatCurrency(r.estimatedCommission),
      r.status,
    ])
    exportToPdf('Affiliate Referral Pipeline Performance Report', headers, rows)
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Referral Pipeline & Conversion Tracking"
        description="Track submitted leads as they progress from initial underwriting contact through to funded deal commission payouts."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'Referral Pipeline' }]}
        badge={
          <Badge variant="navy" size="md">
            {referrals.length} Total Referrals
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

      {/* SEARCH AND FILTER BAR */}
      <Card variant="default" className="p-4 space-y-3 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search referrals by client, company..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
          >
            <ArrowUpDown className="w-3 h-3" />
            <span>Deal Size ({sortOrder.toUpperCase()})</span>
          </button>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          {(['All', 'New Lead', 'Contacted', 'Underwriting Review', 'Funded', 'Closed/Lost'] as const).map((st) => (
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

      {/* REFERRALS TABLE */}
      <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-3 px-4">Client Contact & Company</th>
                <th className="py-3 px-4">Service Interest</th>
                <th className="py-3 px-4">Deal Size</th>
                <th className="py-3 px-4">Est. Commission</th>
                <th className="py-3 px-4">Submitted Date</th>
                <th className="py-3 px-4">Pipeline Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedReferrals.length > 0 ? (
                paginatedReferrals.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{r.clientName}</div>
                      <div className="text-xs text-slate-500">{r.company}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">{r.serviceInterest}</td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{formatCurrency(r.dealSize)}</td>
                    <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(r.estimatedCommission)}</td>
                    <td className="py-3 px-4 text-slate-500">{r.submittedDate}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          r.status === 'Funded'
                            ? 'emerald'
                            : r.status === 'Underwriting Review'
                            ? 'amber'
                            : r.status === 'Contacted'
                            ? 'primary'
                            : r.status === 'New Lead'
                            ? 'gold'
                            : 'danger'
                        }
                        size="sm"
                        dot
                      >
                        {r.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No referrals found matching your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        <div className="p-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs text-slate-500">
            Page {currentPage} of {totalPages} ({filteredReferrals.length} total referrals)
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
