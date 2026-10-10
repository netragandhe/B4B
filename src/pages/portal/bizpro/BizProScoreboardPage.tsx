import React, { useState } from 'react'
import {
  Trophy,
  TrendingUp,
  Award,
  Crown,
  Sparkles,
  Users,
  User,
  Shield,
  Zap,
  Building2,
  CheckCircle2,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { useAuth } from '@/context/AuthContext'
import {
  scoreboardService,
  ScoreboardProducer,
} from '@/lib/services/scoreboardService'
import { formatCurrency } from '@/lib/utils'

export const BizProScoreboardPage: React.FC = () => {
  const { user } = useAuth()
  const settings = scoreboardService.useSettings()
  const rawProducers = scoreboardService.useProducers()

  const [timeframe, setTimeframe] = useState<'Today' | 'Week' | 'Month' | 'Year'>(settings.defaultTimeframe)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const producers = rawProducers
    .filter((p) => categoryFilter === 'all' || p.category === categoryFilter)
    .sort((a, b) => {
      if (settings.rankingMetric === 'deals') return b.dealsClosed - a.dealsClosed
      if (settings.rankingMetric === 'points') return b.points - a.points
      return b.fundedVolume - a.fundedVolume
    })
    .map((p, idx) => ({ ...p, rankPosition: idx + 1 }))

  // Highlight current user
  const userRankIndex = producers.findIndex(
    (p) => p.name.toLowerCase().includes('marcus') || p.name === user?.name
  )
  const currentUserStanding = userRankIndex !== -1 ? producers[userRankIndex] : producers[3]

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Bulletin Scoreboard & Team Standings"
        description="Live rankings for top commercial capital producers and leadership teams across all 12 Federal Reserve districts."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/bizpro/bulletin' },
          { label: 'Team Scoreboard', icon: <Trophy className="w-3.5 h-3.5 text-amber-500" /> },
        ]}
        badge={
          <Badge variant="gold" size="md" className="font-bold shadow-xs">
            Your Rank: #{currentUserStanding?.rankPosition || 4} National
          </Badge>
        }
      />

      {/* YOUR STANDING HIGHLIGHT HERO CARD */}
      <Card
        variant="default"
        className="p-6 bg-gradient-to-br from-[#0B1E36] via-[#102A4C] to-[#0A1829] border border-blue-500/40 text-white shadow-lg rounded-2xl"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar
                src={currentUserStanding?.avatar || user?.avatar}
                name={currentUserStanding?.name || user?.name || 'B4B Coach'}
                size="xl"
                className="border-4 border-amber-400 shadow-xl"
              />
              <span className="absolute -bottom-2 -right-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow">
                #{currentUserStanding?.rankPosition || 4}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-extrabold font-heading text-white">
                  {currentUserStanding?.name || user?.name || 'Marcus Vance'}
                </h3>
                <Badge variant="emerald" size="sm" className="font-bold">
                  You
                </Badge>
                <Badge variant="gold" size="sm" className="font-bold">
                  {currentUserStanding?.roleTitle || 'Regional Leader (Rank 5)'}
                </Badge>
              </div>
              <p className="text-xs text-slate-300">
                District: <strong className="text-white">{currentUserStanding?.region || 'Atlanta (6-F)'}</strong> • Team: <strong className="text-blue-300">{currentUserStanding?.team || 'Southeast Capital Advisors'}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 divide-x divide-slate-700/80 text-center w-full md:w-auto justify-around md:justify-end pt-4 md:pt-0 border-t md:border-t-0 border-slate-700/60">
            <div className="pr-4 sm:pr-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block">Personal Volume</span>
              <span className="text-xl font-black text-emerald-400 font-heading mt-0.5 block">
                {settings.showRevenueNumbers
                  ? formatCurrency(currentUserStanding?.fundedVolume || 5100000)
                  : `${currentUserStanding?.points || 3890} PTS`}
              </span>
            </div>
            <div className="px-4 sm:px-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block">Deals Closed</span>
              <span className="text-xl font-black text-white font-heading mt-0.5 block">
                {currentUserStanding?.dealsClosed || 12}
              </span>
            </div>
            <div className="pl-4 sm:pl-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block">Total Points</span>
              <span className="text-xl font-black text-blue-400 font-heading mt-0.5 block">
                {currentUserStanding?.points || 3890}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* FILTER & TIMEFRAME BAR */}
      <Card variant="default" className="p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full sm:w-auto border border-slate-200 dark:border-slate-700">
          {settings.allowedTimeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === tf
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <Select
          options={[
            { label: 'All Solutions Categories', value: 'all' },
            { label: 'Capital Facilities', value: 'Capital' },
            { label: 'CFO Advisory', value: 'Advisory' },
            { label: 'Operations & Audits', value: 'Operations' },
            { label: 'Growth Solutions', value: 'Growth' },
          ]}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="text-xs h-9 w-full sm:w-64"
        />
      </Card>

      {/* FULL LEADERBOARD STANDINGS TABLE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" /> Full Leaderboard Standings
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {producers.length} Coaches Ranked
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0D1E36] shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">B4B Coach & Advisory Team</th>
                <th className="py-3 px-4">Rank Title</th>
                <th className="py-3 px-4">Federal District</th>
                <th className="py-3 px-4 text-right">Funded Performance</th>
                <th className="py-3 px-4 text-center">Deals</th>
                <th className="py-3 px-4 text-center">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {producers.map((p) => {
                const isUser = p.id === currentUserStanding?.id
                return (
                  <tr
                    key={p.id}
                    className={`transition-colors ${
                      isUser
                        ? 'bg-blue-50/90 dark:bg-blue-950/40 border-l-4 border-l-blue-600 dark:border-l-blue-400'
                        : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    {/* Rank Badge */}
                    <td className="py-3.5 px-4 font-bold">
                      <span
                        className={`w-7 h-7 rounded-lg inline-flex items-center justify-center text-xs font-black ${
                          p.rankPosition === 1
                            ? 'bg-amber-400 text-slate-950 shadow-xs'
                            : p.rankPosition === 2
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                            : p.rankPosition === 3
                            ? 'bg-amber-700 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        #{p.rankPosition}
                      </span>
                    </td>

                    {/* Coach Profile */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar src={p.avatar} name={p.name} size="sm" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                            {p.name}
                            {isUser && (
                              <Badge variant="emerald" size="sm" className="text-[10px] py-0 px-1 font-bold">
                                You
                              </Badge>
                            )}
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                            {p.team}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Rank Title */}
                    <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                      {p.roleTitle}
                    </td>

                    {/* District */}
                    <td className="py-3.5 px-4 font-medium text-slate-600 dark:text-slate-400">
                      {settings.showRegions ? p.region : 'Federal Region'}
                    </td>

                    {/* Funded Performance Volume */}
                    <td className="py-3.5 px-4 text-right font-black text-emerald-600 dark:text-emerald-400 text-sm">
                      {settings.showRevenueNumbers ? formatCurrency(p.fundedVolume) : `${p.points} PTS`}
                    </td>

                    {/* Deals Closed */}
                    <td className="py-3.5 px-4 text-center font-bold text-slate-900 dark:text-white">
                      {p.dealsClosed}
                    </td>

                    {/* Points */}
                    <td className="py-3.5 px-4 text-center font-mono font-extrabold text-blue-600 dark:text-blue-400">
                      {p.points}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

