import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DollarSign,
  TrendingUp,
  Clock,
  ShieldCheck,
  PlusCircle,
  Calendar,
  ArrowUpRight,
  Video,
  CheckCircle2,
  FolderArchive,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Upload,
  FileSpreadsheet,
  Zap,
} from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
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
import { Input } from '@/components/ui/Input'
import { FormField } from '@/components/ui/FormField'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'
import {
  REVENUE_HISTORY,
  CASH_FLOW_FORECAST,
  CAPITAL_FACILITIES,
  CONSULTATION_SESSIONS,
} from '@/mock-data/fintechData'
import { formatCurrency } from '@/lib/utils'

export const PortalDashboardPage: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [drawModalOpen, setDrawModalOpen] = useState(false)
  const [selectedFacility, setSelectedFacility] = useState(CAPITAL_FACILITIES[0])
  const [drawAmount, setDrawAmount] = useState('50000')

  const handleExecuteDraw = (e: React.FormEvent) => {
    e.preventDefault()
    setDrawModalOpen(false)
    toast({
      title: 'Disbursement Request Dispatched',
      description: `$${Number(drawAmount).toLocaleString()} will be wired to your operating checking account within 24 hours.`,
      type: 'success',
    })
  }

  // Active Services Progress Data
  const activeServices = [
    {
      id: 1,
      title: 'Revolving Line Facility ($850k)',
      category: 'Capital',
      progress: 38,
      status: 'Active ($320k Drawn)',
      badgeVariant: 'emerald' as const,
    },
    {
      id: 2,
      title: 'Q4 Fractional CFO Advisory',
      category: 'Advisory',
      progress: 75,
      status: 'In Progress (3/4 Sessions)',
      badgeVariant: 'primary' as const,
    },
    {
      id: 3,
      title: 'Tax & Cash Conversion Audit',
      category: 'Compliance',
      progress: 90,
      status: 'Finalizing Submission',
      badgeVariant: 'amber' as const,
    },
    {
      id: 4,
      title: '13-Week Treasury Model',
      category: 'Analytics',
      progress: 100,
      status: 'Live Synced to eBOX',
      badgeVariant: 'emerald' as const,
    },
  ]

  // Business Plan / Funding Status Tracker Timeline Steps
  const fundingMilestones = [
    { label: 'Application Submitted', date: 'Sep 12', status: 'completed' },
    { label: 'Underwriting Audit', date: 'Sep 18', status: 'completed' },
    { label: 'Term Sheet Signed', date: 'Sep 28', status: 'completed' },
    { label: 'Facility & eBOX Active', date: 'Oct 01', status: 'active' },
    { label: 'Q4 CFO Review', date: 'Scheduled', status: 'upcoming' },
  ]

  return (
    <div className="space-y-8 text-left">
      {/* ========================================================================= */}
      {/* WELCOME HEADER & QUICK ACTIONS */}
      {/* ========================================================================= */}
      <PageHeader
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'Marcus'}`}
        description={`Real-time financial scoreboard, capital liquidity lines, and fractional CFO advisory for ${user?.company || 'Apex Freight & Logistics LLC'}.`}
        badge={
          <Badge variant="gold" size="md">
            Institutional Score: 92
          </Badge>
        }
        actions={
          <>
            <Link to="/portal/ebox">
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                leftIcon={<FolderArchive className="w-3.5 h-3.5 text-emerald-500" />}
              >
                eBOX Vault
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/portal/advisory')}
              leftIcon={<Calendar className="w-3.5 h-3.5" />}
            >
              Schedule CFO
            </Button>

            <Button
              variant="accent"
              size="sm"
              onClick={() => setDrawModalOpen(true)}
              leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
              className="shadow-sm shadow-emerald-500/25"
            >
              Draw Working Capital
            </Button>
          </>
        }
      />

      {/* ========================================================================= */}
      {/* BENTO STAT CARDS ROW */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Pre-Approved Capital"
          value={<CountUp value={850000} prefix="$" />}
          change={14.2}
          changePeriod="vs last quarter"
          icon={<DollarSign className="w-5 h-5" />}
          variant="royal"
          caption="$530,000 currently undrawn & ready"
        />

        <StatCard
          title="Active Line Utilization"
          value={<CountUp value={320000} prefix="$" />}
          change={-2.4}
          changePeriod="paydown velocity"
          icon={<TrendingUp className="w-5 h-5" />}
          variant="emerald"
          caption="Blended interest: Prime + 1.25%"
        />

        <StatCard
          title="Cash Flow Runway"
          value="18.5 Mo"
          change={3.1}
          changePeriod="expanded runway"
          icon={<Clock className="w-5 h-5" />}
          variant="default"
          caption="Net monthly burn: $62,000"
        />

        <StatCard
          title="OAL Health Score"
          value="92 / 100"
          change={5.0}
          changePeriod="Scoreboard Rank: Tier 1"
          icon={<ShieldCheck className="w-5 h-5 text-amber-500" />}
          variant="gold"
          caption="Institutional Grade Credit"
        />
      </div>

      {/* ========================================================================= */}
      {/* FUNDING & BUSINESS PLAN STATUS TRACKER (STEPPED TIMELINE) */}
      {/* ========================================================================= */}
      <Card variant="bento" className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span>Capital & Funding Progress Tracker</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live status tracking from underwriting through capital disbursement.
            </p>
          </div>
          <Badge variant="emerald" size="sm">
            Phase 4: Live Line & Vault Active
          </Badge>
        </div>

        {/* Stepped Horizontal Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {fundingMilestones.map((step, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border relative transition-all ${
                step.status === 'completed'
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-300'
                  : step.status === 'active'
                  ? 'bg-blue-50/90 dark:bg-blue-950/50 border-blue-500 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/30'
                  : 'bg-slate-50 dark:bg-[#12294A]/30 border-slate-200 dark:border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-extrabold uppercase mb-1">
                <span>Step 0{idx + 1}</span>
                {step.status === 'completed' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                ) : step.status === 'active' ? (
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                ) : null}
              </div>
              <h4 className="text-xs font-bold truncate">{step.label}</h4>
              <p className="text-[10px] opacity-80 mt-0.5">{step.date}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* ========================================================================= */}
      {/* ACTIVE SERVICES & CHARTS DUAL COLUMN */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ACTIVE SERVICES LIST WITH PROGRESS BARS */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              Active Client Services & Milestones
            </h3>
            <span className="text-xs font-semibold text-slate-500">4 Active Projects</span>
          </div>

          <Card variant="bento" className="p-5 space-y-4">
            {activeServices.map((service) => (
              <div key={service.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{service.title}</span>
                  <Badge variant={service.badgeVariant} size="sm">
                    {service.status}
                  </Badge>
                </div>

                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Category: {service.category}</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{service.progress}%</span>
                </div>

                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      service.progress === 100
                        ? 'bg-emerald-500'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-500'
                    }`}
                    style={{ width: `${service.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* UPCOMING COACH CALLS & RECENT MESSAGES */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              CFO Advisory & Message Desk
            </h3>
            <Link
              to="/portal/advisory"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View Advisory Desk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* UPCOMING COACH CALL CARD */}
            <Card variant="default" className="p-4 bg-gradient-to-br from-blue-50/70 to-indigo-50/30 dark:from-[#12294A] dark:to-[#0D1E36]">
              <div className="flex items-start gap-3">
                <Avatar
                  src={CONSULTATION_SESSIONS[0].advisorAvatar}
                  name={CONSULTATION_SESSIONS[0].advisorName}
                  size="md"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {CONSULTATION_SESSIONS[0].advisorName}
                    </h4>
                    <Badge variant="primary" size="sm">
                      Tomorrow 10:00 AM
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500">{CONSULTATION_SESSIONS[0].advisorRole}</p>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-2">
                    Topic: {CONSULTATION_SESSIONS[0].topic}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-blue-200/50 dark:border-[#1E3A5F] flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Zoom Room Ready</span>
                    <Button
                      size="sm"
                      variant="accent"
                      onClick={() => toast({ title: 'Video Conference Initialized', description: 'Joining Zoom Advisory Room.', type: 'info' })}
                      leftIcon={<Video className="w-3.5 h-3.5" />}
                      className="h-7 text-xs"
                    >
                      Join Advisory Call
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* RECENT MESSAGE CHAT SNIPPET */}
            <Card variant="bento" className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-[#1E3A5F]">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                  <span>Recent Advisory Chat</span>
                </span>
                <span className="text-[10px] text-slate-400">25 mins ago</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] text-xs space-y-1">
                <span className="font-bold text-blue-600 dark:text-blue-400">David Ross (Fractional CFO):</span>
                <p className="text-slate-600 dark:text-slate-300">
                  "Marcus, I uploaded the revised 13-week cash model into eBOX. We're on track for the Q4 expansion draw."
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RECHARTS FINANCIAL VISUALIZATIONS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Revenue vs Expenses */}
        <Card variant="bento" className="lg:col-span-7 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Operating Revenue vs Expenses
              </h3>
              <p className="text-xs text-slate-500">Trailing 7-month cash flow margin.</p>
            </div>
            <Badge variant="emerald" size="sm">
              +30.2% Net Cash Margin
            </Badge>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_HISTORY} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(val) => `$${val / 1000}k`} />
                <RechartsTooltip
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                  contentStyle={{
                    backgroundColor: '#0D1E36',
                    borderRadius: '10px',
                    border: '1px solid #1E3A5F',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="revenue" name="Gross Revenue" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Operating Expenses" fill="#64748B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="netProfit" name="Net Cash Margin" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 2: 13-Week Cash Forecast */}
        <Card variant="bento" className="lg:col-span-5 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                13-Week Treasury Inflow / Outflow
              </h3>
              <p className="text-xs text-slate-500">Rolling weekly net liquidity position.</p>
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
              CFO Verified
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CASH_FLOW_FORECAST} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="week" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(val) => `$${val / 1000}k`} />
                <RechartsTooltip
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                  contentStyle={{
                    backgroundColor: '#0D1E36',
                    borderRadius: '10px',
                    border: '1px solid #1E3A5F',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="projectedInflow"
                  name="Inflow"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorInflow)"
                />
                <Area
                  type="monotone"
                  dataKey="projectedOutflow"
                  name="Outflow"
                  stroke="#2563EB"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorOutflow)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* QUICK CAPITAL DRAW MODAL */}
      <Modal
        isOpen={drawModalOpen}
        onClose={() => setDrawModalOpen(false)}
        title="Execute Capital Disbursement"
        description={`Draw liquidity from ${selectedFacility.title} into your verified primary business checking.`}
        maxWidth="md"
      >
        <form onSubmit={handleExecuteDraw} className="space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Facility Limit:</span>
              <span className="font-bold">{formatCurrency(selectedFacility.limit)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Available to Draw:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(selectedFacility.available)}
              </span>
            </div>
          </div>

          <FormField label="Draw Amount ($ USD)" required id="draw-amount">
            <Input
              id="draw-amount"
              type="number"
              value={drawAmount}
              onChange={(e) => setDrawAmount(e.target.value)}
              placeholder="50000"
            />
          </FormField>

          <div className="pt-3 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setDrawModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" pill>
              Confirm & Wire Funds
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
