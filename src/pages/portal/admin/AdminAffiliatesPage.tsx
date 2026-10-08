import React, { useState, useMemo } from 'react'
import {
  Share2,
  Search,
  FileSpreadsheet,
  Printer,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  Plus,
  Wallet,
  Users,
  TrendingUp,
  DollarSign,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StatCard } from '@/components/ui/StatCard'
import { useToast } from '@/components/ui/Toast'
import { ADMIN_AFFILIATES_LIST, AdminAffiliate } from '@/mock-data/adminFullData'
import { formatCurrency } from '@/lib/utils'
import { exportToCsv, exportToPdf } from '@/lib/exportUtils'

export const AdminAffiliatesPage: React.FC = () => {
  const { toast } = useToast()

  const [affiliates, setAffiliates] = useState<AdminAffiliate[]>(ADMIN_AFFILIATES_LIST)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Pending Review' | 'Suspended'>('All')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const handleToggleStatus = (id: string, name: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active'
    setAffiliates((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    )
    toast({
      title: `Affiliate ${newStatus}`,
      description: `Updated status for ${name} to ${newStatus}.`,
      type: newStatus === 'Active' ? 'success' : 'warning',
    })
  }

  const filteredAffiliates = useMemo(() => {
    return affiliates
      .filter((a) => {
        const matchesSearch =
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.email.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === 'All' || a.status === statusFilter
        return matchesSearch && matchesStatus
      })
      .sort((a, b) => {
        return sortOrder === 'asc' ? a.fundedVolume - b.fundedVolume : b.fundedVolume - a.fundedVolume
      })
  }, [affiliates, searchQuery, statusFilter, sortOrder])

  const totalPages = Math.ceil(filteredAffiliates.length / itemsPerPage) || 1
  const paginatedAffiliates = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredAffiliates.slice(start, start + itemsPerPage)
  }, [filteredAffiliates, currentPage])

  const handleExportCsv = () => {
    const headers = ['ID', 'Name', 'Email', 'Company', 'Referral Code', 'Referrals', 'Funded Volume', 'Commission Paid', 'Status']
    const rows = affiliates.map((a) => [
      a.id,
      a.name,
      a.email,
      a.company,
      a.referralCode,
      a.totalReferrals,
      a.fundedVolume,
      a.commissionPaid,
      a.status,
    ])
    exportToCsv('Admin_Affiliates_Report', headers, rows)
    toast({ title: 'CSV Downloaded', description: 'Affiliates dataset exported to CSV.', type: 'success' })
  }

  const handleExportPdf = () => {
    const headers = ['ID', 'Name', 'Company', 'Referral Code', 'Referrals', 'Funded Volume', 'Commission Paid', 'Status']
    const rows = affiliates.map((a) => [
      a.id,
      a.name,
      a.company,
      a.referralCode,
      a.totalReferrals,
      formatCurrency(a.fundedVolume),
      formatCurrency(a.commissionPaid),
      a.status,
    ])
    exportToPdf('Affiliates & Referral Channel Performance Report', headers, rows)
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Affiliates & Referral Partners Management"
        description="Monitor referral partner volume, payout commissions, and channel growth across national affiliate partners."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Affiliates', icon: <Share2 className="w-3.5 h-3.5 text-purple-500" /> },
        ]}
        badge={
          <Badge variant="navy" size="md">
            Affiliate Channel
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

      {/* KPI METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Referral Volume"
          value={formatCurrency(6510000)}
          change={19.2}
          changePeriod="vs previous quarter"
          icon={<DollarSign className="w-5 h-5 text-emerald-500" />}
          variant="emerald"
        />
        <StatCard
          title="Active Affiliates"
          value={`${affiliates.length} Partners`}
          change={8.5}
          changePeriod="+2 new this month"
          icon={<Users className="w-5 h-5 text-blue-500" />}
          variant="royal"
        />
        <StatCard
          title="Total Commission Paid"
          value={formatCurrency(97650)}
          change={14.0}
          changePeriod="Avg commission 1.5%"
          icon={<Wallet className="w-5 h-5 text-amber-500" />}
          variant="gold"
        />
      </div>

      {/* TABLE CONTROLS BAR */}
      <Card variant="default" className="p-4 space-y-3 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search partner name, company, or email..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
          >
            <ArrowUpDown className="w-3 h-3" />
            <span>Volume ({sortOrder.toUpperCase()})</span>
          </button>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          {(['All', 'Active', 'Pending Review', 'Suspended'] as const).map((st) => (
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

      {/* AFFILIATES TABLE */}
      <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-3 px-4">Affiliate Partner</th>
                <th className="py-3 px-4">Referral Code</th>
                <th className="py-3 px-4">Total Referrals</th>
                <th className="py-3 px-4">Funded Volume</th>
                <th className="py-3 px-4">Commission Paid</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedAffiliates.length > 0 ? (
                paginatedAffiliates.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{a.name}</div>
                      <div className="text-xs text-slate-500">{a.company} • {a.email}</div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {a.referralCode}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                      {a.totalReferrals} Deals
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(a.fundedVolume)}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                      {formatCurrency(a.commissionPaid)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={a.status === 'Active' ? 'emerald' : a.status === 'Pending Review' ? 'amber' : 'danger'}
                        size="sm"
                        dot
                      >
                        {a.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleStatus(a.id, a.name, a.status)}
                        className="text-xs"
                      >
                        {a.status === 'Active' ? 'Suspend' : 'Activate'}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No affiliate partners match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs text-slate-500">
            Page {currentPage} of {totalPages} ({filteredAffiliates.length} total partners)
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
