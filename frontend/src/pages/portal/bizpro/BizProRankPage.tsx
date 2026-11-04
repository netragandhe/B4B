import React, { useState } from 'react'
import {
  Trophy,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  Star,
  DollarSign,
  TrendingUp,
  LayoutGrid,
  Table as TableIcon,
  Sparkles,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/hooks/useAuth'
import { BIZPRO_RANKS } from '@/mock-data/bizproData'

export const BizProRankPage: React.FC = () => {
  const { user, setBizProRank } = useAuth()
  const userRankLevel = user?.rankLevel || 4
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  const currentRank = BIZPRO_RANKS.find((r) => r.level === userRankLevel) || BIZPRO_RANKS[3]
  const nextRank = BIZPRO_RANKS.find((r) => r.level === userRankLevel + 1)

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Rank & Executive Promotion Roadmap"
        description="Track your career advancement and commission earnings across B4B's 9 executive rank tiers."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/bizpro/bulletin' },
          { label: 'My Rank & Promotion', icon: <Trophy className="w-3.5 h-3.5 text-amber-500" /> },
        ]}
        badge={
          <Badge variant="gold" size="md" className="shadow-xs font-bold">
            Rank {currentRank.level}: {currentRank.title}
          </Badge>
        }
      />

      {/* TOP SUMMARY: CURRENT RANK VS NEXT TARGET */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Active Verified Rank */}
        <Card
          variant="default"
          className="lg:col-span-6 p-5 space-y-4 bg-gradient-to-br from-amber-50/90 via-amber-100/40 to-white dark:from-amber-950/30 dark:via-slate-900 dark:to-[#0D1E36] border border-amber-300 dark:border-amber-600/50 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg shadow-sm shrink-0 border border-amber-300">
                #{currentRank.level}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    Active Verified Rank
                  </span>
                  <Badge variant="gold" size="sm" className="text-[10px] py-0 px-1.5 font-bold">
                    Current
                  </Badge>
                </div>
                <h3 className="text-lg sm:text-xl font-black font-heading text-slate-900 dark:text-white">
                  {currentRank.title}
                </h3>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400 block">
                {currentRank.monthlyCommissionRange}
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium block">
                {currentRank.yearlyIncomeRange}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-amber-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 space-y-1 shadow-xs">
            <div className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 text-[11px]">
              <TrendingUp className="w-3.5 h-3.5" /> Promotion Rule:
            </div>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {currentRank.promotionCriteria}
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-amber-200/80 dark:border-amber-900/40 text-xs">
            <p className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[10px]">
              Unlocked Rank Perks:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentRank.perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="font-medium text-[11px]">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Next Executive Tier Goal */}
        {nextRank ? (
          <Card
            variant="default"
            className="lg:col-span-6 p-5 space-y-4 bg-white dark:bg-[#0D1E36] border border-blue-200 dark:border-blue-900/60 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Next Executive Tier Target
                  </span>
                  <Badge variant="primary" size="sm" className="text-[10px] py-0 px-1.5 font-bold">
                    Rank {nextRank.level}
                  </Badge>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white">
                  Promotion to {nextRank.title}
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs sm:text-sm font-extrabold text-blue-600 dark:text-blue-400 block">
                  {nextRank.monthlyCommissionRange}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                  {nextRank.yearlyIncomeRange}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50 text-xs space-y-1">
              <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5 text-[11px]">
                <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Automatic Advancement Criteria:
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed font-medium">
                {nextRank.promotionCriteria}
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center font-semibold text-slate-800 dark:text-slate-200">
                <span className="text-[11px] text-slate-600 dark:text-slate-400">Qualifying Personal Commission</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                  $7,450 / mo (Month 2 of 3)
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: '66.7%' }} />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
              <span>Expected Annual: <strong className="text-slate-800 dark:text-slate-200">{nextRank.yearlyIncomeRange}</strong></span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Projected: Next Settlement Cycle</span>
            </div>
          </Card>
        ) : (
          <Card
            variant="default"
            className="lg:col-span-6 p-5 flex flex-col items-center justify-center text-center bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-400/40"
          >
            <Trophy className="w-12 h-12 text-amber-500 mb-2" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pinnacle Executive Rank Reached</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
              You have achieved the highest tier in the B4B organization: Managing Partner.
            </p>
          </Card>
        )}
      </div>

      {/* 9-RANK EXECUTIVE ROADMAP WITH VIEW SWITCHER */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0D1E36] p-4 rounded-xl border border-slate-200 dark:border-[#1E3A5F]">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" /> The 9 Executive Rank Tiers
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Official compensation matrix defined by monthly personal commission and annual income potential.
            </p>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" /> Table
            </button>
          </div>
        </div>

        {/* GRID VIEW (Compact 3 Columns) */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BIZPRO_RANKS.map((rank) => {
              const isCurrent = rank.level === currentRank.level
              const isPassed = rank.level < currentRank.level

              return (
                <div
                  key={rank.level}
                  className={`p-4 rounded-xl flex flex-col justify-between transition-all bg-white dark:bg-[#0D1E36] border ${
                    isCurrent
                      ? 'border-amber-400 dark:border-amber-500 ring-2 ring-amber-400/40 shadow-sm bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-950/20 dark:to-[#0D1E36]'
                      : isPassed
                      ? 'border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/20 dark:bg-emerald-950/10'
                      : 'border-slate-200 dark:border-[#1E3A5F] hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                            isCurrent
                              ? 'bg-amber-400 text-slate-950 shadow-xs'
                              : isPassed
                              ? 'bg-emerald-500 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          #{rank.level}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                            {rank.title}
                          </h4>
                          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                            Tier {rank.level} {rank.isLeader ? '• Leadership' : ''}
                          </span>
                        </div>
                      </div>

                      {isCurrent && (
                        <Badge variant="gold" size="sm" className="text-[10px] py-0 px-1.5 font-bold">
                          Active
                        </Badge>
                      )}
                      {isPassed && !isCurrent && (
                        <Badge variant="success" size="sm" className="text-[10px] py-0 px-1.5 font-bold">
                          Passed
                        </Badge>
                      )}
                    </div>

                    {/* Compensation */}
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400 text-[11px]">Monthly:</span>
                        <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                          {rank.monthlyCommissionRange}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-slate-500 dark:text-slate-400 text-[11px]">Annual:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {rank.yearlyIncomeRange}
                        </span>
                      </div>
                    </div>

                    {/* Criteria */}
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                      <strong className="text-slate-800 dark:text-slate-300 font-semibold block mb-0.5">
                        Advancement Criteria:
                      </strong>
                      <p className="line-clamp-2" title={rank.promotionCriteria}>
                        {rank.promotionCriteria}
                      </p>
                    </div>
                  </div>

                  {/* Switch Action */}
                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-400">
                      {rank.perks.length} perks unlocked
                    </span>
                    {setBizProRank && (
                      <Button
                        size="sm"
                        variant={isCurrent ? 'accent' : 'outline'}
                        onClick={() => setBizProRank(rank.level)}
                        className="text-[11px] h-7 px-2.5 font-bold"
                      >
                        {isCurrent ? 'Active Rank' : `Roleplay #${rank.level}`}
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0D1E36]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Tier #</th>
                  <th className="py-3 px-4">Rank Title</th>
                  <th className="py-3 px-4">Monthly Range</th>
                  <th className="py-3 px-4">Annual Earnings</th>
                  <th className="py-3 px-4">Advancement Criteria</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {BIZPRO_RANKS.map((rank) => {
                  const isCurrent = rank.level === currentRank.level
                  const isPassed = rank.level < currentRank.level

                  return (
                    <tr
                      key={rank.level}
                      className={`transition-colors ${
                        isCurrent
                          ? 'bg-amber-50/70 dark:bg-amber-950/20 font-medium'
                          : isPassed
                          ? 'bg-emerald-50/30 dark:bg-emerald-950/10'
                          : 'hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="py-3 px-4">
                        <span
                          className={`w-7 h-7 rounded-lg inline-flex items-center justify-center font-bold text-xs ${
                            isCurrent
                              ? 'bg-amber-400 text-slate-950'
                              : isPassed
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          #{rank.level}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">{rank.title}</span>
                          {isCurrent && (
                            <Badge variant="gold" size="sm" className="text-[10px] py-0 px-1">
                              Current
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-extrabold text-emerald-600 dark:text-emerald-400">
                        {rank.monthlyCommissionRange}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                        {rank.yearlyIncomeRange}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400 max-w-xs text-[11px]">
                        {rank.promotionCriteria}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {setBizProRank && (
                          <Button
                            size="sm"
                            variant={isCurrent ? 'accent' : 'outline'}
                            onClick={() => setBizProRank(rank.level)}
                            className="text-[11px] h-7 px-2.5 font-bold"
                          >
                            {isCurrent ? 'Active' : `Select`}
                          </Button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

