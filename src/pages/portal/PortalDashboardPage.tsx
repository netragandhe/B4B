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
  FileText,
  Video,
  Download,
  AlertCircle,
  ArrowRightLeft,
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
import { SEOHead } from '@/components/seo/SEOHead'
import { PageTransition } from '@/components/animations/PageTransition'
import { PageLoadingFallback } from '@/components/ui/PageLoadingFallback'
import { ErrorState } from '@/components/ui/ErrorState'
import {
  useFinancialMetrics,
  useRevenueHistory,
  useCashFlowForecast,
  useCapitalFacilities,
  useConsultationSessions,
  useExecuteDraw,
} from '@/hooks/queries/useFintechData'
import { formatCurrency } from '@/lib/utils'
import type { CapitalFacility } from '@/mock-data/fintechData'

export const PortalDashboardPage: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const { data: metrics, isLoading: metricsLoading, isError: metricsError, refetch } = useFinancialMetrics()
  const { data: revHistory, isLoading: revLoading } = useRevenueHistory()
  const { data: cashForecast, isLoading: cashLoading } = useCashFlowForecast()
  const { data: facilities, isLoading: facLoading } = useCapitalFacilities()
  const { data: sessions, isLoading: sessLoading } = useConsultationSessions()
  const { mutate: executeDraw, isPending: isDrawing } = useExecuteDraw()

  const [drawModalOpen, setDrawModalOpen] = useState(false)
  const [selectedFacility, setSelectedFacility] = useState<CapitalFacility | null>(null)
  const [drawAmount, setDrawAmount] = useState('50000')

  const handleOpenDraw = (fac?: CapitalFacility) => {
    const target = fac || (facilities && facilities[0]) || null
    if (target) {
      setSelectedFacility(target)
      setDrawAmount(Math.min(50000, target.available).toString())
      setDrawModalOpen(true)
    }
  }

  const handleExecuteDraw = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFacility) return

    executeDraw(
      { facilityId: selectedFacility.id, amount: Number(drawAmount) },
      {
        onSuccess: () => {
          setDrawModalOpen(false)
          toast({
            title: 'Disbursement Request Dispatched',
            description: `$${Number(drawAmount).toLocaleString()} wired to your primary business checking.`,
            type: 'success',
          })
        },
        onError: (err: any) => {
          toast({
            title: 'Disbursement Failed',
            description: err.message || 'Unable to execute draw.',
            type: 'error',
          })
        },
      }
    )
  }

  if (metricsLoading || revLoading || cashLoading || facLoading || sessLoading) {
    return <PageLoadingFallback />
  }

  if (metricsError) {
    return (
      <ErrorState
        title="Could not load financial scoreboard"
        message="Unable to connect to live banking and credit feeds. Please retry."
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <PageTransition>
      <div className="space-y-8 text-left">
        <SEOHead
          title="Financial Scoreboard | OAL Client Terminal"
          description="Real-time working capital facilities, treasury runway, and fractional CFO advisory."
        />

        {/* Top Welcome & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                Financial Scoreboard
              </h1>
              <Badge variant="gold" size="sm">
                Score: {metrics?.oalHealthScore || 92}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Real-time capital lines, liquidity runway, and fractional CFO advisory for {user?.company}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/portal/affiliate/dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Partner Hub</span>
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
              onClick={() => handleOpenDraw()}
              leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
              className="shadow-sm shadow-emerald-500/25"
            >
              Draw Working Capital
            </Button>
          </div>
        </div>

        {/* KPI StatCards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Pre-Approved Capital"
            value={<CountUp value={metrics?.approvedWorkingCapital || 850000} prefix="$" />}
            change={14.2}
            changePeriod="vs last quarter"
            icon={<DollarSign className="w-5 h-5" />}
            variant="royal"
            caption="$530,000 currently undrawn & ready"
          />

          <StatCard
            title="Active Line Utilization"
            value={<CountUp value={metrics?.totalDrawnCapital || 320000} prefix="$" />}
            change={-2.4}
            changePeriod="paydown velocity"
            icon={<TrendingUp className="w-5 h-5" />}
            variant="emerald"
            caption="Blended interest: Prime + 1.25%"
          />

          <StatCard
            title="Cash Flow Runway"
            value={`${metrics?.runwayMonths || 18.5} Mo`}
            change={3.1}
            changePeriod="expanded runway"
            icon={<Clock className="w-5 h-5" />}
            variant="default"
            caption="Net monthly burn: $62,000"
          />

          <StatCard
            title="OAL Health Score"
            value={`${metrics?.oalHealthScore || 92} / 100`}
            change={5.0}
            changePeriod="Scoreboard Rank: Tier 1"
            icon={<ShieldCheck className="w-5 h-5 text-amber-500" />}
            variant="gold"
            caption="Institutional Grade Credit"
          />
        </div>

        {/* Recharts Visualizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 1: Revenue vs Expenses (Composite Bar Chart) */}
          <Card variant="bento" className="lg:col-span-7 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                  Monthly Operating Revenue vs Expenses
                </h3>
                <p className="text-xs text-slate-500">
                  Tracking cash margin expansion across trailing 7 months.
                </p>
              </div>
              <Badge variant="emerald" size="sm">
                +{metrics?.netMargin || 30.2}% Net Margin
              </Badge>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revHistory || []} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                  <YAxis
                    stroke="#94A3B8"
                    fontSize={11}
                    tickFormatter={(val) => `$${val / 1000}k`}
                  />
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

          {/* Chart 2: 4-Week Cash Flow Forecast (Area Chart) */}
          <Card variant="bento" className="lg:col-span-5 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                  13-Week Treasury Inflow / Outflow
                </h3>
                <p className="text-xs text-slate-500">
                  Rolling weekly net liquidity position.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                CFO Verified
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cashForecast || []} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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

        {/* Facilities & Advisory Double Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Capital Facilities */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Active Capital Facilities
              </h3>
              <Link
                to="/portal/capital"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Manage all facilities</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {(facilities || []).map((fac) => {
                const pct = Math.round((fac.drawn / fac.limit) * 100)
                return (
                  <Card key={fac.id} variant="default" className="p-4 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{fac.title}</span>
                          <Badge variant="emerald" size="sm">
                            {fac.status}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{fac.provider} • {fac.rate} • {fac.term}</p>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenDraw(fac)}
                        className="text-xs h-7"
                      >
                        Draw Funds
                      </Button>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                        <span>Drawn: {formatCurrency(fac.drawn)} ({pct}%)</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          Available: {formatCurrency(fac.available)}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Fractional CFO Advisory & Scheduled Sessions */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                CFO Consulting Sessions
              </h3>
              <Link
                to="/portal/advisory"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>View calendar</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {(sessions || []).slice(0, 2).map((session) => (
                <Card key={session.id} variant="default" className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar src={session.advisorAvatar} name={session.advisorName} size="md" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {session.advisorName}
                        </h4>
                        <Badge variant="primary" size="sm">
                          {session.status}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{session.advisorRole}</p>
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200 mt-2">
                        {session.topic}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between text-[11px] text-slate-500">
                        <span>{session.date} • {session.time}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toast({ title: 'Meeting Link', description: 'Zoom conference room initialized.', type: 'info' })}
                          leftIcon={<Video className="w-3 h-3 text-emerald-500" />}
                          className="h-6 text-xs"
                        >
                          Join Call
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Draw Modal */}
        <Modal
          isOpen={drawModalOpen && !!selectedFacility}
          onClose={() => setDrawModalOpen(false)}
          title="Execute Capital Disbursement"
          description={`Draw liquidity from ${selectedFacility?.title || ''} into your verified primary business checking.`}
          maxWidth="md"
        >
          {selectedFacility && (
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
                <div className="flex justify-between">
                  <span className="text-slate-500">Indicative Rate:</span>
                  <span className="font-bold">{selectedFacility.rate}</span>
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

              <FormField label="Destination Bank Account">
                <Input
                  value="Chase Business Premium (••• 4912)"
                  disabled
                />
              </FormField>

              <div className="pt-3 flex items-center justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setDrawModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="accent" pill isLoading={isDrawing}>
                  Confirm & Wire Funds
                </Button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </PageTransition>
  )
}
