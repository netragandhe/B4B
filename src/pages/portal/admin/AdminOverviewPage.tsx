import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShieldAlert,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  BarChart3,
  Plus,
  Zap,
  Filter,
  Search,
  Download,
  FileSpreadsheet,
  Printer,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  UserCheck,
  Building2,
  Activity,
} from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  AreaChart,
  Area,
} from 'recharts'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { CountUp } from '@/components/ui/CountUp'
import { useToast } from '@/components/ui/Toast'
import { ADMIN_PENDING_APPROVALS, PendingApproval } from '@/mock-data/adminData'
import { FED_REGIONS } from '@/mock-data/territoryScoreboardData'
import { RANK_DISTRIBUTION_DATA, ADMIN_ACTIVITY_FEED } from '@/mock-data/adminFullData'
import { exportToCsv, exportToPdf } from '@/lib/exportUtils'

export const AdminOverviewPage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [approvals, setApprovals] = useState<PendingApproval[]>(ADMIN_PENDING_APPROVALS)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<'All' | 'Biz Pro' | 'Employer' | 'Draw/Underwriting'>('All')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  // Regional revenue data
  const regionRevenueData = FED_REGIONS.map((r) => ({
    name: r.code,
    fullName: r.name,
    revenue: Math.round(r.volume / 1000), // in $k
  }))

  const handleApprove = (id: string, title: string) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id))
    toast({
      title: 'Approval Executed',
      description: `${title} has been authorized by Super Admin.`,
      type: 'success',
    })
  }

  const handleReject = (id: string, title: string) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id))
    toast({
      title: 'Action Rejected',
      description: `${title} has been rejected from queue.`,
      type: 'info',
    })
  }

  // Filtered & Paginated Approvals Table
  const filteredApprovals = useMemo(() => {
    return approvals.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())

      let matchesType = true
      if (typeFilter === 'Biz Pro') {
        matchesType = item.type === 'Rank Promotion' || item.type === 'New Biz Pro Onboarding'
      } else if (typeFilter === 'Employer') {
        matchesType = item.subtitle.toLowerCase().includes('employer') || item.type === 'Underwriting Term Sheet'
      } else if (typeFilter === 'Draw/Underwriting') {
        matchesType = item.type === 'High-Value Draw' || item.type === 'Underwriting Term Sheet'
      }

      return matchesSearch && matchesType
    }).sort((a, b) => {
      return sortOrder === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
    })
  }, [approvals, searchQuery, typeFilter, sortOrder])

  const totalPages = Math.ceil(filteredApprovals.length / itemsPerPage) || 1
  const paginatedApprovals = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredApprovals.slice(start, start + itemsPerPage)
  }, [filteredApprovals, currentPage])

  const handleExportCsv = () => {
    const headers = ['ID', 'Type', 'Title', 'Subtitle', 'Amount', 'Date', 'Status']
    const rows = approvals.map((a) => [a.id, a.type, a.title, a.subtitle, a.amount || 'N/A', a.date, a.status])
    exportToCsv('Super_Admin_Pending_Approvals', headers, rows)
    toast({ title: 'CSV Downloaded', description: 'Pending approvals exported to CSV.', type: 'success' })
  }

  const handleExportPdf = () => {
    const headers = ['ID', 'Type', 'Title', 'Subtitle', 'Amount', 'Date', 'Status']
    const rows = approvals.map((a) => [a.id, a.type, a.title, a.subtitle, a.amount || 'N/A', a.date, a.status])
    exportToPdf('Pending Approvals & Onboarding Queue Report', headers, rows)
  }

  return (
    <div className="space-y-8 text-left">
      <PageHeader
        title="Super Admin Command Center"
        description="Company-wide KPI oversight, regional revenue breakdown, Biz Pro & Employer approval flow, and 9-rank distribution analytics."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Admin Overview', icon: <ShieldAlert className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="navy" size="md">
            Super Admin Control
          </Badge>
        }
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/portal/admin/rank-rules')}
              leftIcon={<BarChart3 className="w-3.5 h-3.5" />}
            >
              Rank Rules Matrix
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => navigate('/portal/admin/bizpro')}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Invite Biz Pro
            </Button>
          </>
        }
      />

      {/* 4 COMPANY-WIDE KPI STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Network Volume"
          value={<CountUp value={14800000} prefix="$" />}
          change={24.5}
          changePeriod="vs last year"
          icon={<DollarSign className="w-5 h-5" />}
          variant="royal"
          caption="12 Federal Reserve Districts"
        />

        <StatCard
          title="Active Biz Pros"
          value="148 Reps"
          change={12.0}
          changePeriod="+6 new this month"
          icon={<Users className="w-5 h-5" />}
          variant="emerald"
          caption="National sales force active"
        />

        <StatCard
          title="New Signups (30d)"
          value="32 Accounts"
          change={18.4}
          changePeriod="24 Biz Pros • 8 Employers"
          icon={<UserCheck className="w-5 h-5 text-emerald-500" />}
          variant="gold"
          caption="Pending onboarding verification"
        />

        <StatCard
          title="Pending Approvals"
          value={`${approvals.length} Queue`}
          change={-4.0}
          changePeriod="Velocity: Fast"
          icon={<Clock className="w-5 h-5 text-amber-500" />}
          variant="default"
          caption="Requires Super Admin action"
        />
      </div>

      {/* CHARTS SECTION: REVENUE BY REGION & RANK DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Revenue by Fed Region */}
        <Card variant="bento" className="lg:col-span-7 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Revenue by Federal Reserve District ($k)
              </h3>
              <p className="text-xs text-slate-500">Distribution across 12 Fed regions.</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/portal/territory')}>
              Territory Map
            </Button>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionRevenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(val) => `$${val}k`} />
                <RechartsTooltip
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}k`, 'Funded Volume']}
                  contentStyle={{
                    backgroundColor: '#0D1E36',
                    borderRadius: '10px',
                    border: '1px solid #1E3A5F',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="revenue" name="Volume" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 2: 9-Rank Distribution */}
        <Card variant="bento" className="lg:col-span-5 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Biz Pro 9-Rank Force Distribution
              </h3>
              <p className="text-xs text-slate-500">Number of active reps per rank level.</p>
            </div>
            <Badge variant="emerald" size="sm">
              9 Ranks Active
            </Badge>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RANK_DISTRIBUTION_DATA} layout="vertical" margin={{ top: 5, right: 15, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis type="number" stroke="#94A3B8" fontSize={10} />
                <YAxis dataKey="rankLevel" type="category" stroke="#94A3B8" fontSize={11} tickFormatter={(val) => `R${val}`} />
                <RechartsTooltip
                  formatter={(val: any, name: any, item: any) => [`${val} Reps`, item.payload.title]}
                  contentStyle={{
                    backgroundColor: '#0D1E36',
                    borderRadius: '10px',
                    border: '1px solid #1E3A5F',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#10B981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* PENDING APPROVALS FLOW TABLE (BIZ PROS & EMPLOYERS) */}
      <Card variant="default" className="p-5 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Approval Flow: New Biz Pros, Employers & Risk Queue</span>
            </h3>
            <p className="text-xs text-slate-500">Authorize candidate onboarding, rank advancements, and high-value underwriting draws.</p>
          </div>

          {/* Export Actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExportCsv} leftIcon={<FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />}>
              CSV
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPdf} leftIcon={<Printer className="w-3.5 h-3.5 text-blue-600" />}>
              PDF Report
            </Button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search approvals..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Type Filter Buttons */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              {(['All', 'Biz Pro', 'Employer', 'Draw/Underwriting'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTypeFilter(t)
                    setCurrentPage(1)
                  }}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors ${
                    typeFilter === t
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="flex items-center gap-1 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <ArrowUpDown className="w-3 h-3" />
              <span>Date ({sortOrder.toUpperCase()})</span>
            </button>
            <Badge variant="amber" size="sm">
              {filteredApprovals.length} Results
            </Badge>
          </div>
        </div>

        {/* Approval Queue Data Table */}
        <div className="overflow-x-auto border rounded-xl border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-3 px-4">Request Type</th>
                <th className="py-3 px-4">Title & Details</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedApprovals.length > 0 ? (
                paginatedApprovals.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          app.type === 'Rank Promotion'
                            ? 'gold'
                            : app.type === 'New Biz Pro Onboarding'
                            ? 'emerald'
                            : app.type === 'High-Value Draw'
                            ? 'navy'
                            : 'primary'
                        }
                        size="sm"
                      >
                        {app.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">{app.title}</div>
                      <div className="text-[11px] text-slate-500">{app.subtitle}</div>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                      {app.amount || 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-slate-500">{app.date}</td>
                    <td className="py-3 px-4">
                      <Badge variant="amber" size="sm" dot>
                        {app.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(app.id, app.title)}
                          leftIcon={<XCircle className="w-3.5 h-3.5 text-rose-500" />}
                          className="text-xs border-rose-200 text-rose-600 hover:bg-rose-50"
                        >
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="accent"
                          onClick={() => handleApprove(app.id, app.title)}
                          leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                          className="text-xs"
                        >
                          Approve
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No pending approval items matched your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-slate-500">
            Page {currentPage} of {totalPages} ({filteredApprovals.length} total approvals)
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

      {/* RECENT ADMIN AUDIT & SYSTEM ACTIVITY FEED */}
      <Card variant="bento" className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              Recent Admin Audit & System Feed
            </h3>
          </div>
          <Badge variant="navy" size="sm">
            Live Audit Log
          </Badge>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {ADMIN_ACTIVITY_FEED.map((act) => (
            <div key={act.id} className="py-3 flex items-start justify-between gap-3 text-xs">
              <div className="flex items-start gap-3">
                <Avatar src={act.avatar} name={act.user} size="sm" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{act.user} </span>
                  <span className="text-slate-600 dark:text-slate-400">{act.action} </span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{act.target}</span>
                </div>
              </div>
              <span className="text-slate-400 shrink-0 text-[11px]">{act.timestamp}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
