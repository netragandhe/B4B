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
    <div className="space-y-8 text-left">
      <PageHeader
        title="Rank & Executive Promotion Roadmap"
        description="Track your career advancement across B4B's 9 executive rank tiers."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
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
        <Card variant="bento" className="lg:col-span-6 p-6 space-y-4 bg-gradient-to-br from-amber-50/80 to-amber-100/40 dark:from-amber-950/40 dark:to-[#0D1E36] border-amber-300 dark:border-amber-700/60 shadow-lg shadow-amber-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-extrabold text-lg shadow-md">
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
            <Badge variant="gold" size="md">
              {currentRank.commissionTier}
            </Badge>
          </div>

          <div className="space-y-2 pt-2 border-t border-amber-200 dark:border-amber-900/60 text-xs">
            <p className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[10px]">Unlocked Rank Perks:</p>
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
                  Requirements to reach {nextRank.title} (Rank {nextRank.level})
                </h3>
              </div>
              <Badge variant="primary" size="md">
                75% Completed
              </Badge>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Personal Funded Sales Volume</span>
                  <span className="text-emerald-600 dark:text-emerald-400">$610k / {formatCurrency(nextRank.minPersonalVolume)} (Achieved)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              {nextRank.minTeamVolume && (
                <div className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span>Team Sales Volume (Leadership)</span>
                    <span className="text-amber-800 dark:text-amber-400">$1.11M / {formatCurrency(nextRank.minTeamVolume)} ($90k left)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full" style={{ width: '92.5%' }} />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 dark:border-[#1E3A5F]">
              <span>Next Rank Earnings: <strong className="text-emerald-600 dark:text-emerald-400">{nextRank.commissionTier}</strong></span>
              <span>Estimated Unlock: Q4 2026</span>
            </div>
          </Card>
        )}
      </div>

      {/* 9-RANK VERTICAL ROADMAP ROAD */}
      <div className="space-y-4">
        <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
          The 9 Executive Rank Tiers
        </h3>

        <div className="space-y-3">
          {BIZPRO_RANKS.map((rank) => {
            const isCurrent = rank.level === currentRank.level
            const isPassed = rank.level < currentRank.level

            return (
              <Card
                key={rank.level}
                variant={isCurrent ? 'bento' : 'default'}
                className={`p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border-amber-400 dark:border-amber-600 ring-2 ring-amber-400/30'
                    : isPassed
                    ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-950'
                    : 'opacity-70'
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 ${
                      isCurrent
                        ? 'bg-amber-400 text-slate-900 shadow-md ring-2 ring-amber-300'
                        : isPassed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    #{rank.level}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {rank.title}
                      </h4>
                      {isCurrent && (
                        <Badge variant="gold" size="sm">
                          Current Rank
                        </Badge>
                      )}
                      {rank.isLeader && (
                        <Badge variant="navy" size="sm">
                          Leader Rank
                        </Badge>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Min Personal Vol: {formatCurrency(rank.minPersonalVolume)}
                      {rank.minTeamVolume ? ` • Min Team Vol: ${formatCurrency(rank.minTeamVolume)}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end border-t sm:border-t-0 border-slate-100 dark:border-slate-800 pt-2 sm:pt-0">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {rank.commissionTier}
                  </span>

                  {setBizProRank && (
                    <Button
                      size="sm"
                      variant={isCurrent ? 'accent' : 'outline'}
                      onClick={() => setBizProRank(rank.level)}
                      className="text-xs h-7"
                    >
                      {isCurrent ? 'Active Rank' : `Switch to Rank ${rank.level}`}
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
