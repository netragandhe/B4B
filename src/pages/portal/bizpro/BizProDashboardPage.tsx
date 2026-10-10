import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Users,
  Target,
  DollarSign,
  Trophy,
  TrendingUp,
  ArrowUpRight,
  PlusCircle,
  Sparkles,
  Phone,
  Mail,
  CheckCircle2,
  Calendar,
  Clock,
  ChevronRight,
  Award,
  Zap,
  Megaphone,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from 'recharts'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { CountUp } from '@/components/ui/CountUp'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'
import { BIZPRO_RANKS } from '@/mock-data/bizproData'

export const BizProDashboardPage: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const currentRank = BIZPRO_RANKS.find((r) => r.level === (user?.rankLevel || 4)) || BIZPRO_RANKS[3]
  const nextRank = BIZPRO_RANKS.find((r) => r.level === (user?.rankLevel || 4) + 1) || BIZPRO_RANKS[4]

  // Mock revenue chart data
  const revenueData = [
    { month: 'May', commission: 4200, volume: 140000 },
    { month: 'Jun', commission: 6800, volume: 220000 },
    { month: 'Jul', commission: 9500, volume: 310000 },
    { month: 'Aug', commission: 11200, volume: 420000 },
    { month: 'Sep', commission: 13800, volume: 530000 },
    { month: 'Oct', commission: 14250, volume: 610000 },
  ]

  // Lead Funnel stage distribution data
  const funnelData = [
    { stage: 'New', count: 8, fill: '#3B82F6' },
    { stage: 'Contacted', count: 6, fill: '#8B5CF6' },
    { stage: 'Qualified', count: 5, fill: '#F59E0B' },
    { stage: 'Proposal', count: 3, fill: '#10B981' },
    { stage: 'Won', count: 2, fill: '#059669' },
  ]

  // Leaderboard Widget Data
  const leaderboard = [
    { rank: 1, name: 'Monica Bell', volume: '$1.2M', deals: 14, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' },
    { rank: 2, name: 'David Ross (You)', volume: '$610k', deals: 8, isYou: true, avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80' },
    { rank: 3, name: 'Jason Miller', volume: '$580k', deals: 7, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
    { rank: 4, name: 'Rachel Adams', volume: '$420k', deals: 5, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
    { rank: 5, name: 'Kevin Zhao', volume: '$310k', deals: 4, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
  ]

  return (
    <div className="space-y-8 text-left">
      {/* PAGE HEADER & QUICK ACTION CTAS */}
      <PageHeader
        title={`Welcome back, ${user?.name || 'David Ross'}`}
        description={`Sales Rep CRM & Team Command for ${currentRank.title} (${currentRank.commissionTier}).`}
        badge={
          <Badge variant="gold" size="md" className="shadow-xs">
            {currentRank.title} (Rank {currentRank.level})
          </Badge>
        }
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/portal/bizpro/marketing')}
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-blue-500" />}
            >
              AI Campaign Copy
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => navigate('/portal/bizpro/leads')}
              leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
              className="shadow-sm shadow-emerald-500/25"
            >
              Add New Lead
            </Button>
          </>
        }
      />

      {/* 4 STATCARDS WITH SPARKLINE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Leads"
          value="24 Leads"
          change={18.4}
          changePeriod="vs last month"
          icon={<Target className="w-5 h-5" />}
          variant="royal"
          caption="5 proposals pending client signature"
        />

        <StatCard
          title="Deals Closed (Oct)"
          value="8 Deals"
          change={25.0}
          changePeriod="target: 10 deals"
          icon={<TrendingUp className="w-5 h-5" />}
          variant="emerald"
          caption="$610,000 total funded volume"
        />

        <StatCard
          title="Monthly Commission"
          value={<CountUp value={14250} prefix="$" />}
          change={12.8}
          changePeriod="18% payout rate"
          icon={<DollarSign className="w-5 h-5" />}
          variant="gold"
          caption="Payout dispatches on 15th"
        />

        <StatCard
          title="Rank Promotion Progress"
          value="75%"
          change={5.0}
          changePeriod={`$90k to ${nextRank.title}`}
          icon={<Trophy className="w-5 h-5 text-amber-500" />}
          variant="default"
          caption="Target promotion by Q4 end"
        />
      </div>

      {/* REVENUE AREA CHART & LEAD FUNNEL BAR CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Revenue & Commission Trend */}
        <Card variant="bento" className="lg:col-span-7 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Monthly Commission & Funded Volume Trend
              </h3>
              <p className="text-xs text-slate-500">Trailing 6-month earnings acceleration.</p>
            </div>
            <Badge variant="emerald" size="sm">
              +$14.2k Monthly
            </Badge>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorComm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="commission"
                  name="Commission Earned"
                  stroke="#10B981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorComm)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 2: Lead Funnel Stage Distribution */}
        <Card variant="bento" className="lg:col-span-5 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Lead Conversion Funnel
              </h3>
              <p className="text-xs text-slate-500">24 active leads across 5 stages.</p>
            </div>
            <Link to="/portal/bizpro/leads" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
              Kanban Board
            </Link>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis type="number" stroke="#94A3B8" fontSize={11} />
                <YAxis type="category" dataKey="stage" stroke="#94A3B8" fontSize={11} />
                <RechartsTooltip
                  formatter={(val: any) => [`${val} Leads`, 'Stage Count']}
                  contentStyle={{
                    backgroundColor: '#0D1E36',
                    borderRadius: '10px',
                    border: '1px solid #1E3A5F',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" name="Leads" fill="#2563EB" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* LEADERBOARD WIDGET & NEXT PROMOTION CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* TOP 5 LEADERBOARD WIDGET */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>National Sales Rep Leaderboard (Q4)</span>
            </h3>
            <Link to="/portal/bizpro/scoreboard" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              <span>Full Bulletin</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Card variant="bento" className="divide-y divide-slate-100 dark:divide-[#1E3A5F] p-2">
            {leaderboard.map((rep) => (
              <div
                key={rep.rank}
                className={`p-3.5 rounded-xl flex items-center justify-between gap-3 transition-colors ${
                  rep.isYou
                    ? 'bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900'
                    : 'hover:bg-slate-50 dark:hover:bg-[#12294A]/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      rep.rank === 1
                        ? 'bg-amber-400 text-slate-900 shadow-md'
                        : rep.rank === 2
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    #{rep.rank}
                  </span>
                  <Avatar src={rep.avatar} name={rep.name} size="sm" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {rep.name} {rep.isYou && <span className="text-[10px] text-blue-600 font-extrabold">(YOU)</span>}
                    </p>
                    <p className="text-[11px] text-slate-500">{rep.deals} Deals Funded</p>
                  </div>
                </div>

                <span className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400 shrink-0">
                  {rep.volume}
                </span>
              </div>
            ))}
          </Card>
        </div>

        {/* NEXT PROMOTION CARD WITH ANIMATED PROGRESS RING */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              Next Promotion Progress
            </h3>
            <Link to="/portal/bizpro/rank" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Rank Roadmap
            </Link>
          </div>

          <Card variant="bento" className="p-5 space-y-4 bg-gradient-to-br from-amber-50/50 to-orange-50/20 dark:from-amber-950/20 dark:to-[#0D1E36] border-amber-200 dark:border-amber-900/40">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  Current: {currentRank.title}
                </span>
                <h4 className="text-base font-extrabold font-heading text-slate-900 dark:text-white mt-0.5">
                  Target: {nextRank.title}
                </h4>
              </div>
              <Badge variant="gold" size="md">
                Rank {nextRank.level}
              </Badge>
            </div>

            {/* Circular Progress Ring */}
            <div className="flex items-center gap-4 pt-2">
              <div className="relative w-20 h-20 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-amber-200 dark:text-amber-950"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-amber-500"
                    strokeDasharray="75, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-extrabold text-sm text-slate-900 dark:text-white">
                  75%
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Personal Vol: $610k / $600k (Achieved)</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-semibold">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Team Vol: $1.11M / $1.20M ($90k left)</span>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Unlocks {nextRank.commissionTier} + Regional Leader Override.
                </p>
              </div>
            </div>

            <Button
              variant="accent"
              size="sm"
              onClick={() => navigate('/portal/bizpro/rank')}
              rightIcon={<ChevronRight className="w-4 h-4" />}
              className="w-full justify-center text-xs"
            >
              View Full Promotion Roadmap
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
