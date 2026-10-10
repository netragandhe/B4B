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
    <div className="space-y-8 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Bulletin Scoreboard & Producer Standings"
        description="Live rankings for top commercial capital producers and leadership teams across all 12 Federal Reserve districts."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/bizpro/bulletin' },
          { label: 'Scoreboard', icon: <Trophy className="w-3.5 h-3.5 text-amber-500" /> },
        ]}
        badge={
          <Badge variant="gold" size="md">
            Your Rank: #{currentUserStanding?.rankPosition || 4} National
          </Badge>
        }
      />

      {/* YOUR STANDING HIGHLIGHT HERO CARD */}
      <Card
        variant="bento"
        className="p-6 bg-gradient-to-br from-blue-950/40 via-slate-900 to-[#0D1E36] border-blue-500/30 text-white"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar
                src={currentUserStanding?.avatar || user?.avatar}
                name={currentUserStanding?.name || user?.name || 'B4B Coach'}
                size="xl"
                className="border-4 border-blue-500 shadow-xl"
              />
              <span className="absolute -bottom-2 -right-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-600 text-white shadow">
                #{currentUserStanding?.rankPosition || 4}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-heading text-white">
                  {currentUserStanding?.name || user?.name || 'Marcus Vance'} (You)
                </h3>
                <Badge variant="emerald" size="sm">
                  {currentUserStanding?.roleTitle || 'Regional Leader (Rank 5)'}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Federal District: <strong className="text-slate-200">{currentUserStanding?.region || 'Atlanta (6-F)'}</strong> • Team: <strong className="text-blue-300">{currentUserStanding?.team || 'Southeast Capital Advisors'}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 divide-x divide-slate-800 text-center">
            <div className="pr-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Personal Volume</span>
              <span className="text-xl font-black text-emerald-400 font-heading mt-0.5 block">
                {settings.showRevenueNumbers
                  ? formatCurrency(currentUserStanding?.fundedVolume || 5100000)
                  : `${currentUserStanding?.points || 3890} PTS`}
              </span>
            </div>
            <div className="pl-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Deals Closed</span>
              <span className="text-xl font-black text-white font-heading mt-0.5 block">
                {currentUserStanding?.dealsClosed || 12}
              </span>
            </div>
            <div className="pl-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Points</span>
              <span className="text-xl font-black text-blue-400 font-heading mt-0.5 block">
                {currentUserStanding?.points || 3890}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* FILTER BAR */}
      <Card variant="default" className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#12294A] p-1 rounded-xl w-full sm:w-auto">
          {settings.allowedTimeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === tf
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
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

      {/* PRODUCERS LIST */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold font-heading text-white">Full Leaderboard Standings</h3>

        <Card variant="default" className="divide-y divide-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">B4B Coach</th>
                  <th className="py-3 px-4">Rank Title</th>
                  <th className="py-3 px-4">Federal District</th>
                  <th className="py-3 px-4 text-right">Funded Performance</th>
                  <th className="py-3 px-4 text-center">Deals</th>
                  <th className="py-3 px-4 text-center">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {producers.map((p) => {
                  const isUser = p.id === currentUserStanding?.id
                  return (
                    <tr
                      key={p.id}
                      className={`transition-colors ${
                        isUser ? 'bg-blue-950/40 border-l-4 border-l-blue-500' : 'hover:bg-slate-900/40'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold text-white">
                        <span
                          className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-xs ${
                            p.rankPosition === 1
                              ? 'bg-amber-400 text-slate-950 font-black'
                              : p.rankPosition === 2
                              ? 'bg-slate-300 text-slate-900 font-bold'
                              : p.rankPosition === 3
                              ? 'bg-amber-700 text-white font-bold'
                              : 'text-slate-400'
                          }`}
                        >
                          #{p.rankPosition}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <Avatar src={p.avatar} name={p.name} size="sm" />
                          <div>
                            <span className="font-bold text-white flex items-center gap-1.5">
                              {p.name}
                              {isUser && <Badge variant="emerald" size="sm">You</Badge>}
                            </span>
                            <span className="text-[10px] text-slate-400">{p.team}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{p.roleTitle}</td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {settings.showRegions ? p.region : 'Federal Region'}
                      </td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-emerald-400 text-sm">
                        {settings.showRevenueNumbers ? formatCurrency(p.fundedVolume) : `${p.points} PTS`}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-white">{p.dealsClosed}</td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-blue-400">{p.points}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
