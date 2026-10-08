import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DollarSign,
  TrendingUp,
  UserCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Trophy,
  Award,
  Users2,
  Layers,
  Percent,
  PlusCircle,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { CountUp } from '@/components/ui/CountUp'
import { SEOHead } from '@/components/seo/SEOHead'
import { PageTransition } from '@/components/animations/PageTransition'
import { PageLoadingFallback } from '@/components/ui/PageLoadingFallback'
import { ErrorState } from '@/components/ui/ErrorState'
import { useAuth, RANK_TITLES } from '@/hooks/useAuth'
import { useBizProDashboard } from '@/hooks/queries/useBizProData'
import { formatCurrency } from '@/lib/utils'

// Inline SVG Sparkline helper
const MiniSparkline: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const width = 80
  const height = 28

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width
      const y = height - ((val - min) / range) * (height - 6) - 3
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  )
}

// Next Rank Progress Ring SVG helper
const ProgressRing: React.FC<{ percentage: number; size?: number; strokeWidth?: number }> = ({
  percentage,
  size = 120,
  strokeWidth = 10,
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-slate-200 dark:stroke-slate-700"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#10B981"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-xl font-extrabold font-heading text-slate-900 dark:text-white">
          {percentage}%
        </span>
        <span className="text-[9px] uppercase font-bold text-slate-400">Complete</span>
      </div>
    </div>
  )
}

export const BizProDashboardPage: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { data: dashboard, isLoading, isError, refetch } = useBizProDashboard()

  const currentRank = user?.rank || 4
  const isLeadership = currentRank >= 4

  if (isLoading) return <PageLoadingFallback />
  if (isError || !dashboard) {
    return (
      <ErrorState
        title="Could not load Biz Pro Dashboard"
        message="Unable to fetch commercial pipeline and commission metrics."
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <PageTransition>
      <div className="space-y-8 text-left">
        <SEOHead
          title="Biz Pro Dashboard | Commercial Advisor Terminal"
          description="Track closed commercial revenue, personal commissions, lead funnel, and rank advancement."
        />

        {/* Top Welcome Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                Biz Pro Executive Terminal
              </h1>
              <Badge variant={isLeadership ? 'emerald' : 'primary'} size="sm" dot>
                Rank {currentRank}: {RANK_TITLES[currentRank]}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {user?.region} • Sponsor Code:{' '}
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                {user?.sponsorCode || 'BIZ-88219'}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/bizpro/rank')}
              leftIcon={<Award className="w-3.5 h-3.5 text-amber-500" />}
            >
              Promotion Roadmap
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/bizpro/leads')}
              leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
              className="shadow-sm shadow-blue-500/20"
            >
              Add New Lead
            </Button>
          </div>
        </div>

        {/* KPI Cards with Sparklines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Closed Revenue Volume */}
          <Card variant="bento" className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-semibold uppercase tracking-wider text-[11px]">
                  Closed Volume (MTD)
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" />
                  +{dashboard.volumeChange}%
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                <CountUp value={dashboard.personalVolume} prefix="$" />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
              <span className="text-[11px] text-slate-400">7-Day Trailing Trend</span>
              <MiniSparkline data={dashboard.volumeSparkline} color="#2563EB" />
            </div>
          </Card>

          {/* Card 2: Personal Commissions */}
          <Card variant="bento" className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-semibold uppercase tracking-wider text-[11px]">
                  Personal Commissions
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" />
                  +{dashboard.commissionsChange}%
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-600 dark:text-emerald-400">
                <CountUp value={dashboard.personalCommissions} prefix="$" />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Rate: 10% – 12.5%</span>
              <MiniSparkline data={dashboard.commissionsSparkline} color="#10B981" />
            </div>
          </Card>

          {/* Card 3: Active Pipeline Leads */}
          <Card variant="bento" className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-semibold uppercase tracking-wider text-[11px]">
                  Pipeline Leads
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-0.5">
                  <UserCheck className="w-3 h-3" />
                  +{dashboard.leadsChange}%
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                <CountUp value={dashboard.activePipelineLeads} /> Active
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Kanban Flow</span>
              <MiniSparkline data={dashboard.leadsSparkline} color="#6366F1" />
            </div>
          </Card>

          {/* Card 4: Closing Rate OR Team Overrides for Rank 4+ */}
          {isLeadership ? (
            <Card variant="bento" className="p-5 flex flex-col justify-between border-amber-300 dark:border-amber-800/80">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold uppercase tracking-wider text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Percent className="w-3 h-3" />
                    <span>Team Override Bonus</span>
                  </span>
                  <Badge variant="gold" size="sm">
                    2.0% Override
                  </Badge>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                  <CountUp value={dashboard.teamCommissions} prefix="$" />
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Team Vol: {formatCurrency(dashboard.teamOverrideVolume)}</span>
                <MiniSparkline data={dashboard.teamCommissionsSparkline} color="#F59E0B" />
              </div>
            </Card>
          ) : (
            <Card variant="bento" className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-semibold uppercase tracking-wider text-[11px]">
                    Client Pull-Through
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    +{dashboard.closingRateChange}%
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                  {dashboard.closingRate}% Won
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Discovery → Funded</span>
                <MiniSparkline data={dashboard.closingSparkline} color="#EC4899" />
              </div>
            </Card>
          )}
        </div>

        {/* Revenue Trend Chart & Next-Promotion Progress Ring */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Revenue Chart */}
          <Card variant="bento" className="lg:col-span-8 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                  6-Month Revenue & Commission Trajectory
                </h3>
                <p className="text-xs text-slate-500">
                  Monthly personal funded deal volume and commission earnings.
                </p>
              </div>
              <Badge variant="emerald" size="sm">
                +14.8% Month-over-Month
              </Badge>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dashboard.monthlyRevenueTrend}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorPersonalRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorPersonalComm" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                  <YAxis
                    stroke="#94A3B8"
                    fontSize={11}
                    tickFormatter={(val) => `$${val / 1000}k`}
                  />
                  <RechartsTooltip
                    formatter={(val: any, name: any) => [
                      `$${Number(val).toLocaleString()}`,
                      name === 'personalRevenue'
                        ? 'Funded Volume'
                        : name === 'personalCommission'
                        ? 'Direct Commission'
                        : 'Team Override',
                    ]}
                    contentStyle={{
                      backgroundColor: '#0D1E36',
                      borderRadius: '10px',
                      border: '1px solid #1E3A5F',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Area
                    type="monotone"
                    dataKey="personalRevenue"
                    name="Funded Volume"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorPersonalRev)"
                  />
                  <Area
                    type="monotone"
                    dataKey="personalCommission"
                    name="Personal Commission"
                    stroke="#10B981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPersonalComm)"
                  />
                  {isLeadership && (
                    <Area
                      type="monotone"
                      dataKey="teamOverride"
                      name="Team Overrides"
                      stroke="#F59E0B"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      fillOpacity={0}
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Next Promotion Progress Ring & Checklist */}
          <Card variant="bento" className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Promotion Target
                </span>
                <Badge variant="gold" size="sm">
                  Rank {Math.min(currentRank + 1, 9)}
                </Badge>
              </div>

              <div className="mt-3 flex items-center gap-4">
                <ProgressRing percentage={dashboard.promotionProgressPercentage} />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Next Rank:
                  </h4>
                  <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                    {RANK_TITLES[Math.min(currentRank + 1, 9)]}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    78% of promotion requirements completed for Q4 advancement.
                  </p>
                </div>
              </div>

              {/* Requirements Checklist */}
              <div className="mt-4 space-y-2 border-t border-slate-100 dark:border-[#1E3A5F] pt-3 text-xs">
                {dashboard.requirementsChecklist.slice(0, 3).map((req) => (
                  <div key={req.id} className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5 truncate max-w-[170px]">
                      {req.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      )}
                      <span className="truncate">{req.label}</span>
                    </span>
                    <span
                      className={`font-semibold font-mono text-[11px] ${
                        req.completed ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {req.current}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/bizpro/rank"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-between pt-2 border-t border-slate-100 dark:border-[#1E3A5F]"
            >
              <span>View Full Promotion Checklist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>
        </div>

        {/* Lead Funnel & Top 5 Leaderboard Double Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lead Funnel */}
          <Card variant="bento" className="lg:col-span-6 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                  Lead Conversion Funnel
                </h3>
                <p className="text-xs text-slate-500">
                  Active commercial prospect progression stages.
                </p>
              </div>
              <Link
                to="/bizpro/leads"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Kanban CRM →
              </Link>
            </div>

            <div className="space-y-2.5 pt-1">
              {dashboard.leadFunnel.map((step, idx) => {
                const widthPct = Math.max(15, Math.round((step.count / 120) * 100))
                return (
                  <div key={step.stage} className="space-y-1 text-xs">
                    <div className="flex justify-between text-slate-700 dark:text-slate-300 font-medium">
                      <span>{step.stage}</span>
                      <span className="font-bold">
                        {step.count} ({step.conversion})
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500"
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Top 5 Leaderboard Widget */}
          <Card variant="bento" className="lg:col-span-6 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Top 5 Bulletin Leaderboard</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Regional & national monthly volume ranking.
                </p>
              </div>
              <Link
                to="/bizpro/scoreboard"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Full Scoreboard →
              </Link>
            </div>

            <div className="space-y-2.5 pt-1">
              {dashboard.top5Leaderboard.map((entry) => (
                <div
                  key={entry.rankPosition}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs transition-colors ${
                    entry.rankPosition === 1
                      ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/80 shadow-xs'
                      : 'bg-white dark:bg-[#0D1E36] border-slate-200 dark:border-[#1E3A5F]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 ${
                        entry.rankPosition === 1
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : entry.rankPosition === 2
                          ? 'bg-slate-300 text-slate-800'
                          : entry.rankPosition === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {entry.rankPosition}
                    </span>

                    <Avatar src={entry.avatar} name={entry.name} size="sm" />

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 dark:text-white truncate">
                          {entry.name}
                        </span>
                        <Badge variant="primary" size="sm" className="text-[9px]">
                          Rank {entry.bizProRank}
                        </Badge>
                      </div>
                      <span className="text-[10px] text-slate-400 truncate block">
                        {entry.region} • {entry.closedDeals} deals
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 font-mono text-sm block">
                      {formatCurrency(entry.monthlyVolume)}
                    </span>
                    <span className="text-[10px] text-slate-400">Volume</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  )
}
