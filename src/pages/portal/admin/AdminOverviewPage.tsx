import React, { useState, useMemo } from 'react'
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
  Send,
  MapPin,
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
import { Modal } from '@/components/ui/Modal'
import { Drawer } from '@/components/ui/Drawer'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { FormField } from '@/components/ui/FormField'
import { useToast } from '@/components/ui/Toast'
import { ADMIN_PENDING_APPROVALS, PendingApproval } from '@/mock-data/adminData'
import { FED_REGIONS } from '@/mock-data/territoryScoreboardData'
import { RANK_DISTRIBUTION_DATA, ADMIN_ACTIVITY_FEED } from '@/mock-data/adminFullData'
import { BIZPRO_RANKS } from '@/mock-data/bizproData'
import { exportToCsv, exportToPdf } from '@/lib/exportUtils'
import { formatCurrency } from '@/lib/utils'

export const AdminOverviewPage: React.FC = () => {
  const { toast } = useToast()

  const [approvals, setApprovals] = useState<PendingApproval[]>(ADMIN_PENDING_APPROVALS)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<'All' | 'B4B Coach' | 'Employer' | 'Draw/Underwriting'>('All')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  // In-Place Modals and Drawers States
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [rankRulesModalOpen, setRankRulesModalOpen] = useState(false)
  const [territoryDrawerOpen, setTerritoryDrawerOpen] = useState(false)

  // Invite Form State
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    phone: '',
    region: 'District 7 - Chicago',
    initialRank: '1',
  })

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

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault()
    setInviteModalOpen(false)
    toast({
      title: 'Invitation Dispatched',
      description: `Official onboarding invitation sent to ${inviteForm.email} for ${inviteForm.region}.`,
      type: 'success',
    })
    setInviteForm({
      name: '',
      email: '',
      phone: '',
      region: 'District 7 - Chicago',
      initialRank: '1',
    })
  }

  // Filtered & Paginated Approvals Table
  const filteredApprovals = useMemo(() => {
    return approvals.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())

      let matchesType = true
      if (typeFilter === 'B4B Coach') {
        matchesType = item.type === 'Rank Promotion' || item.type === 'New B4B Coach Onboarding'
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
        description="Company-wide KPI oversight, regional revenue breakdown, B4B Coach & Employer approval flow, and 9-rank distribution analytics."
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
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRankRulesModalOpen(true)}
              leftIcon={<BarChart3 className="w-3.5 h-3.5" />}
            >
              Rank Rules Matrix
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => setInviteModalOpen(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Invite B4B Coach
            </Button>
          </div>
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
          title="Active B4B Coaches"
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
          changePeriod="24 B4B Coaches • 8 Employers"
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
            <Button variant="ghost" size="sm" onClick={() => setTerritoryDrawerOpen(true)}>
              View All Districts
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
                B4B Coach 9-Rank Force Distribution
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

      {/* PENDING APPROVALS FLOW TABLE (B4B COACHES & EMPLOYERS) */}
      <Card variant="default" className="p-5 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Approval Flow: New B4B Coaches, Employers & Risk Queue</span>
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
              {(['All', 'B4B Coach', 'Employer', 'Draw/Underwriting'] as const).map((t) => (
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
                            : app.type === 'New B4B Coach Onboarding'
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

      {/* ========================================================================= */}
      {/* IN-PLACE MODAL 1: INVITE B4B COACH */}
      {/* ========================================================================= */}
      <Modal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        title="Invite New B4B Coach to Platform"
        description="Issue an onboarding invitation code and territory assignment to a new sales representative."
        maxWidth="md"
      >
        <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
          <FormField label="Full Name" required>
            <Input
              placeholder="e.g. Jessica Williams"
              value={inviteForm.name}
              onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
              required
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label="Corporate Email" required>
              <Input
                type="email"
                placeholder="jessica@b4bfinancial.com"
                value={inviteForm.email}
                onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                required
              />
            </FormField>

            <FormField label="Mobile Phone">
              <Input
                placeholder="+1 (555) 234-5678"
                value={inviteForm.phone}
                onChange={(e) => setInviteForm({ ...inviteForm, phone: e.target.value })}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label="Federal Reserve District Assignment">
              <Select
                value={inviteForm.region}
                onChange={(e) => setInviteForm({ ...inviteForm, region: e.target.value })}
                options={FED_REGIONS.map((r) => ({ value: r.name, label: r.name }))}
              />
            </FormField>

            <FormField label="Starting Rank Level">
              <Select
                value={inviteForm.initialRank}
                onChange={(e) => setInviteForm({ ...inviteForm, initialRank: e.target.value })}
                options={[
                  { value: '1', label: 'Rank 1 - Associate Advisor' },
                  { value: '2', label: 'Rank 2 - Senior Advisor' },
                  { value: '3', label: 'Rank 3 - Managing Advisor' },
                  { value: '4', label: 'Rank 4 - Regional Director' },
                ]}
              />
            </FormField>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setInviteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="accent" size="sm" type="submit" leftIcon={<Send className="w-3.5 h-3.5" />}>
              Send Invitation
            </Button>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* IN-PLACE MODAL 2: RANK RULES MATRIX */}
      {/* ========================================================================= */}
      <Modal
        isOpen={rankRulesModalOpen}
        onClose={() => setRankRulesModalOpen(false)}
        title="B4B Coach 9-Rank Compensation & Promotion Matrix"
        description="Official client commission structure, monthly promotion rules, direct/group overrides, and perks."
        maxWidth="xl"
      >
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {BIZPRO_RANKS.map((r) => (
              <div
                key={r.level}
                className="p-3.5 rounded-xl border bg-slate-50 dark:bg-[#12294A] border-slate-200 dark:border-[#1E3A5F] space-y-2"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <Badge variant="navy" size="sm">
                    Rank {r.level}
                  </Badge>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                    {r.commissionTier}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{r.title}</h4>
                <p className="text-[11px] text-slate-500 font-medium">{r.promotionCriteria}</p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Monthly Target:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{r.monthlyCommissionRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Annual Potential:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{r.yearlyIncomeRange}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* ========================================================================= */}
      {/* IN-PLACE DRAWER 1: 12 FED REGIONS BREAKDOWN */}
      {/* ========================================================================= */}
      <Drawer
        isOpen={territoryDrawerOpen}
        onClose={() => setTerritoryDrawerOpen(false)}
        title="12 Federal Reserve Districts Volume"
        size="lg"
      >
        <div className="space-y-3 text-xs text-left">
          <p className="text-slate-500 text-xs">
            Official district headquarters, assigned Vice Presidents, and funded volume for Q4.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[75vh] overflow-y-auto pr-1">
            {FED_REGIONS.map((r) => (
              <Card key={r.id} variant="bento" className="p-3.5 space-y-2 border border-slate-200 dark:border-[#1E3A5F]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }} />
                    <span className="font-bold text-slate-900 dark:text-white">{r.name}</span>
                  </div>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(r.volume)}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <Avatar src={r.assignedVPAvatar} name={r.assignedVP} size="sm" />
                  <div className="min-w-0">
                    <p className="font-bold text-[11px] text-slate-900 dark:text-white truncate">VP: {r.assignedVP}</p>
                    <p className="text-[10px] text-slate-400 truncate">HQ: {r.headOffice}</p>
                  </div>
                </div>

                {r.branchCities.length > 0 && (
                  <p className="text-[10px] text-slate-500">
                    Branches: {r.branchCities.join(', ')}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  )
}
