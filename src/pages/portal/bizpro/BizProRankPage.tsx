import React from 'react'
import {
  Trophy,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  Star,
  DollarSign,
  TrendingUp,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/hooks/useAuth'
import { BIZPRO_RANKS, RankInfo } from '@/mock-data/bizproData'
import { formatCurrency } from '@/lib/utils'

export const BizProRankPage: React.FC = () => {
  const { user, setBizProRank } = useAuth()
  const userRankLevel = user?.rankLevel || 4

  const currentRank = BIZPRO_RANKS.find((r) => r.level === userRankLevel) || BIZPRO_RANKS[3]
  const nextRank = BIZPRO_RANKS.find((r) => r.level === userRankLevel + 1)

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Rank & Executive Promotion Roadmap"
        description="Track your career advancement and dollar commission earnings across B4B's 9 executive rank tiers."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/bizpro/bulletin' },
          { label: 'My Rank & Promotion', icon: <Trophy className="w-3.5 h-3.5 text-amber-500" /> },
        ]}
        badge={
          <Badge variant="gold" size="md" className="shadow-xs">
            {currentRank.title} (Rank {currentRank.level})
          </Badge>
        }
      />

      {/* CURRENT RANK & NEXT PROMOTION REQUIREMENTS OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Current Rank Card */}
        <Card
          variant="bento"
          className="lg:col-span-6 p-6 space-y-4 bg-gradient-to-br from-amber-50/80 to-amber-100/40 dark:from-amber-950/40 dark:to-[#0D1E36] border-amber-300 dark:border-amber-700/60 shadow-lg shadow-amber-500/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-black text-lg shadow-md">
                #{currentRank.level}
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  Active Verified Rank
                </span>
                <h3 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white">
                  {currentRank.title}
                </h3>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="gold" size="md">
                {currentRank.monthlyCommissionRange}
              </Badge>
              <span className="text-[11px] text-slate-400 block mt-1">{currentRank.yearlyIncomeRange}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Promotion Rule:
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">{currentRank.promotionCriteria}</p>
          </div>

          <div className="space-y-2 pt-2 border-t border-amber-200 dark:border-amber-900/60 text-xs">
            <p className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[10px]">
              Unlocked Rank Perks:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentRank.perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Requirements Checklist for Next Rank */}
        {nextRank && (
          <Card variant="bento" className="lg:col-span-6 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Next Executive Tier
                </span>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  Promotion to {nextRank.title} (Rank {nextRank.level})
                </h3>
              </div>
              <Badge variant="primary" size="md">
                {nextRank.monthlyCommissionRange}
              </Badge>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs space-y-2">
              <div className="font-bold text-blue-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> Automatic Advancement Criteria:
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">{nextRank.promotionCriteria}</p>
            </div>

            <div className="space-y-3 text-xs pt-1">
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Current Qualifying Personal Commission</span>
                  <span className="text-emerald-400 font-bold">$7,450 / mo (Month 2 of 3)</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '66.7%' }} />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800">
              <span>Expected Annual Earnings: <strong className="text-emerald-400 font-bold">{nextRank.yearlyIncomeRange}</strong></span>
              <span>Projected Promotion: Next Settlement Cycle</span>
            </div>
          </Card>
        )}
      </div>

      {/* 9-RANK VERTICAL ROADMAP */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold font-heading text-white">The 9 Executive Rank Tiers</h3>
          <p className="text-xs text-slate-400">
            Compensation tiers defined by the client based on monthly personal commission ranges and yearly income.
          </p>
        </div>

        <div className="space-y-3">
          {BIZPRO_RANKS.map((rank) => {
            const isCurrent = rank.level === currentRank.level
            const isPassed = rank.level < currentRank.level

            return (
              <Card
                key={rank.level}
                variant={isCurrent ? 'bento' : 'default'}
                className={`p-5 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border-amber-400 dark:border-amber-600 ring-2 ring-amber-400/30'
                    : isPassed
                    ? 'bg-emerald-950/10 border-emerald-900/60'
                    : 'opacity-80'
                }`}
              >
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-base shrink-0 ${
                      isCurrent
                        ? 'bg-amber-400 text-slate-900 shadow-md ring-2 ring-amber-300'
                        : isPassed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    #{rank.level}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-bold text-white truncate">{rank.title}</h4>
                      {isCurrent && (
                        <Badge variant="gold" size="sm">
                          Current Rank
                        </Badge>
                      )}
                      {rank.isLeader && (
                        <Badge variant="navy" size="sm">
                          Leadership Tier
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs text-slate-300">
                      <span className="font-bold text-emerald-400">{rank.monthlyCommissionRange}</span>
                      <span className="text-slate-400"> • {rank.yearlyIncomeRange}</span>
                    </p>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{rank.promotionCriteria}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 justify-between lg:justify-end border-t lg:border-t-0 border-slate-800 pt-3 lg:pt-0">
                  {setBizProRank && (
                    <Button
                      size="sm"
                      variant={isCurrent ? 'accent' : 'outline'}
                      onClick={() => setBizProRank(rank.level)}
                      className="text-xs h-8 px-3 font-bold"
                    >
                      {isCurrent ? 'Current Active Rank' : `Switch Roleplay Rank ${rank.level}`}
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
