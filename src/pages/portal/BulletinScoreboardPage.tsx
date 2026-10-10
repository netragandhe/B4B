import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Minus,
  Tv,
  X,
  Play,
  Pause,
  Filter,
  Users,
  User,
  Zap,
  Award,
  Crown,
  Sparkles,
  ShieldAlert,
  MapPin,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { CountUp } from '@/components/ui/CountUp'
import { Select } from '@/components/ui/Select'
import { useToast } from '@/components/ui/Toast'
import {
  scoreboardService,
  ScoreboardProducer,
} from '@/lib/services/scoreboardService'
import { formatCurrency } from '@/lib/utils'

export const BulletinScoreboardPage: React.FC = () => {
  const { toast } = useToast()

  // Reactive Stores
  const settings = scoreboardService.useSettings()
  const rawProducers = scoreboardService.useProducers()

  // State
  const [timeframe, setTimeframe] = useState<'Today' | 'Week' | 'Month' | 'Year'>(settings.defaultTimeframe)
  const [viewType, setViewType] = useState<'Individual' | 'Team'>('Individual')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [regionFilter, setRegionFilter] = useState<string>('all')
  const [isLiveUpdating, setIsLiveUpdating] = useState<boolean>(true)
  const [isTvMode, setIsTvMode] = useState<boolean>(false)

  // Live Auto-Update Simulator using settings.tvRefreshIntervalSec
  useEffect(() => {
    if (!isLiveUpdating) return

    const interval = setInterval(() => {
      const current = scoreboardService.getProducers()
      const randomIndex = Math.floor(Math.random() * current.length)
      const boost = Math.floor(Math.random() * 80000) + 10000

      const updated = current.map((p, idx) => {
        if (idx === randomIndex) {
          return {
            ...p,
            fundedVolume: p.fundedVolume + boost,
            dealsClosed: p.dealsClosed + (Math.random() > 0.7 ? 1 : 0),
            points: p.points + Math.floor(boost / 1000),
            changeDirection: 'up' as const,
            changeDelta: 1,
          }
        }
        return p
      })

      scoreboardService.updateProducers(updated)
    }, (settings.tvRefreshIntervalSec || 5) * 1000)

    return () => clearInterval(interval)
  }, [isLiveUpdating, settings.tvRefreshIntervalSec])

  // Compute calculated rank scores based on settings.rankingMetric
  const rankedProducers = useMemo(() => {
    let filtered = rawProducers.filter((p) => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false
      if (regionFilter !== 'all' && !p.region.toLowerCase().includes(regionFilter.toLowerCase())) return false
      return true
    })

    // Sort according to settings.rankingMetric
    let sorted = [...filtered].sort((a, b) => {
      if (settings.rankingMetric === 'deals') {
        return b.dealsClosed - a.dealsClosed
      }
      if (settings.rankingMetric === 'points') {
        return b.points - a.points
      }
      if (settings.rankingMetric === 'weighted') {
        const scoreA =
          (a.fundedVolume * settings.revenueWeight) / 100 +
          a.dealsClosed * settings.dealsWeight * 1000 +
          a.points * settings.pointsWeight
        const scoreB =
          (b.fundedVolume * settings.revenueWeight) / 100 +
          b.dealsClosed * settings.dealsWeight * 1000 +
          b.points * settings.pointsWeight
        return scoreB - scoreA
      }
      // default: revenue
      return b.fundedVolume - a.fundedVolume
    })

    return sorted.map((p, idx) => ({ ...p, rankPosition: idx + 1 }))
  }, [rawProducers, categoryFilter, regionFilter, settings])

  // Team aggregation if viewType === 'Team'
  const teamRankings = useMemo(() => {
    const teamMap: Record<string, { team: string; volume: number; deals: number; points: number; members: number }> = {}
    rawProducers.forEach((p) => {
      if (!teamMap[p.team]) {
        teamMap[p.team] = { team: p.team, volume: 0, deals: 0, points: 0, members: 0 }
      }
      teamMap[p.team].volume += p.fundedVolume
      teamMap[p.team].deals += p.dealsClosed
      teamMap[p.team].points += p.points
      teamMap[p.team].members += 1
    })

    return Object.values(teamMap)
      .sort((a, b) => b.volume - a.volume)
      .map((t, idx) => ({ ...t, rank: idx + 1 }))
  }, [rawProducers])

  // Top 3 Podium
  const top1 = rankedProducers[0]
  const top2 = rankedProducers[1]
  const top3 = rankedProducers[2]

  const formatProducerName = (p: ScoreboardProducer) => {
    return settings.showCoachNames ? p.name : `B4B Coach #${p.rankPosition}`
  }

  const formatProducerRegion = (p: ScoreboardProducer) => {
    return settings.showRegions ? p.region : 'Federal Reserve Region'
  }

  const renderValueDisplay = (volume: number, points: number) => {
    if (settings.rankingMetric === 'points') {
      return `${points.toLocaleString()} PTS`
    }
    if (!settings.showRevenueNumbers) {
      return `${points.toLocaleString()} PTS (Private)`
    }
    return formatCurrency(volume)
  }

  return (
    <div
      className={`space-y-6 text-left ${
        isTvMode
          ? settings.tvTheme === 'dark'
            ? 'fixed inset-0 z-50 bg-black text-white p-8 overflow-y-auto'
            : settings.tvTheme === 'gold'
            ? 'fixed inset-0 z-50 bg-gradient-to-b from-amber-950 via-slate-950 to-black text-white p-8 overflow-y-auto'
            : 'fixed inset-0 z-50 bg-[#0A1628] text-white p-8 overflow-y-auto'
          : ''
      }`}
    >
      {/* HEADER & CONTROLS */}
      {!isTvMode ? (
        <PageHeader
          title="Bulletin Sales Scoreboard"
          description="Real-time performance leaderboard, live deal revenue volume, and gamified producer rankings."
          breadcrumbs={[
            { label: 'Portal', href: '/portal/bizpro/bulletin' },
            { label: 'Scoreboard', icon: <Trophy className="w-3.5 h-3.5 text-amber-500" /> },
          ]}
          badge={
            <Badge variant="gold" size="md" className="shadow-xs animate-pulse">
              Live Sync ({settings.rankingMetric.toUpperCase()})
            </Badge>
          }
          actions={
            <div className="flex items-center gap-2">
              <Button
                variant={isLiveUpdating ? 'accent' : 'outline'}
                size="sm"
                onClick={() => setIsLiveUpdating(!isLiveUpdating)}
                leftIcon={isLiveUpdating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              >
                {isLiveUpdating ? 'Pause Sync' : 'Resume Sync'}
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsTvMode(true)}
                leftIcon={<Tv className="w-4 h-4" />}
                className="shadow-md shadow-blue-600/25"
              >
                TV Office Display Mode
              </Button>
            </div>
          }
        />
      ) : (
        /* FULLSCREEN TV MODE BANNER */
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-extrabold shadow-lg">
              <Trophy className="w-7 h-7 fill-slate-950" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight flex items-center gap-3">
                {settings.tvModeBanner || 'NATIONAL SALES SCOREBOARD (LIVE TV)'}
              </h1>
              <p className="text-xs text-emerald-400 font-bold flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Sync Active • Refreshes every {settings.tvRefreshIntervalSec}s • Metric: {settings.rankingMetric.toUpperCase()}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsTvMode(false)}
            leftIcon={<X className="w-4 h-4" />}
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            Exit TV Mode
          </Button>
        </div>
      )}

      {/* FILTER CONTROLS BAR */}
      <Card variant="default" className="p-4 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Timeframe pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#12294A] p-1 rounded-xl w-full lg:w-auto">
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

        {/* Individual vs Team & Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto shrink-0">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#12294A] p-1 rounded-xl">
            <button
              onClick={() => setViewType('Individual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                viewType === 'Individual'
                  ? 'bg-white dark:bg-[#0D1E36] text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Individual</span>
            </button>
            <button
              onClick={() => setViewType('Team')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                viewType === 'Team'
                  ? 'bg-white dark:bg-[#0D1E36] text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Team</span>
            </button>
          </div>

          <Select
            options={[
              { label: 'All Federal Districts', value: 'all' },
              { label: 'District 1 - Boston', value: 'Boston' },
              { label: 'District 2 - New York', value: 'New York' },
              { label: 'District 5 - Richmond', value: 'Richmond' },
              { label: 'District 6 - Atlanta', value: 'Atlanta' },
              { label: 'District 7 - Chicago', value: 'Chicago' },
              { label: 'District 11 - Dallas', value: 'Dallas' },
              { label: 'District 12 - San Francisco', value: 'San Francisco' },
            ]}
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="text-xs h-9"
          />

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
            className="text-xs h-9"
          />
        </div>
      </Card>

      {/* TOP 3 PODIUM (INDIVIDUAL VIEW ONLY) */}
      {viewType === 'Individual' && (
        <div className="py-6 px-4 rounded-3xl bg-gradient-to-b from-slate-900 via-[#0D1E36] to-[#0A1628] border border-slate-800 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-400 to-blue-500" />

          <div className="text-center mb-6">
            <Badge variant="gold" size="sm" className="mb-2">
              Top 3 Sales Champions ({timeframe})
            </Badge>
            <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
              National Leaderboard Champions
            </h2>
          </div>

          <div className="flex items-end justify-center gap-3 sm:gap-6 max-w-3xl mx-auto pt-6 min-h-[290px]">
            {/* 2nd Place */}
            {top2 && (
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="flex flex-col items-center flex-1 max-w-[200px]"
              >
                <div className="relative mb-3 text-center">
                  <Avatar src={top2.avatar} name={formatProducerName(top2)} size="lg" className="border-4 border-slate-300 shadow-lg mx-auto" />
                  <span className="absolute -top-2 -right-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-300 text-slate-900 shadow">
                    2ND
                  </span>
                  <p className="text-xs font-bold text-white mt-2 truncate">{formatProducerName(top2)}</p>
                  <p className="text-[10px] text-slate-400 truncate">{formatProducerRegion(top2)}</p>
                  <p className="text-xs font-extrabold text-slate-200 mt-1">
                    {renderValueDisplay(top2.fundedVolume, top2.points)}
                  </p>
                </div>

                <div className="w-full h-40 rounded-t-2xl bg-gradient-to-t from-slate-800 to-slate-700 border-t-4 border-slate-300 flex flex-col items-center justify-center p-3 text-center shadow-xl">
                  <span className="text-3xl font-extrabold text-slate-300">#2</span>
                  <span className="text-[10px] font-bold text-slate-400 mt-1">{top2.dealsClosed} Deals</span>
                </div>
              </motion.div>
            )}

            {/* 1st Place */}
            {top1 && (
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="flex flex-col items-center flex-1 max-w-[220px] -mt-6 z-10"
              >
                <div className="relative mb-3 text-center">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-amber-400 animate-bounce">
                    <Crown className="w-7 h-7 fill-amber-400" />
                  </div>
                  <Avatar src={top1.avatar} name={formatProducerName(top1)} size="xl" className="border-4 border-amber-400 shadow-2xl shadow-amber-500/30 mx-auto" />
                  <span className="absolute -top-2 -right-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 shadow">
                    1ST
                  </span>
                  <p className="text-sm font-extrabold text-white mt-2 truncate">{formatProducerName(top1)}</p>
                  <p className="text-[10px] text-amber-300 font-semibold truncate">{top1.roleTitle}</p>
                  <p className="text-sm font-extrabold text-amber-400 mt-1">
                    {renderValueDisplay(top1.fundedVolume, top1.points)}
                  </p>
                </div>

                <div className="w-full h-52 rounded-t-2xl bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 text-slate-950 border-t-4 border-amber-300 flex flex-col items-center justify-center p-4 text-center shadow-2xl shadow-amber-500/20">
                  <span className="text-4xl font-extrabold text-slate-950">#1</span>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mt-1">CHAMPION</span>
                  <span className="text-xs font-bold text-slate-900 mt-1">{top1.dealsClosed} Deals Closed</span>
                </div>
              </motion.div>
            )}

            {/* 3rd Place */}
            {top3 && (
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="flex flex-col items-center flex-1 max-w-[200px]"
              >
                <div className="relative mb-3 text-center">
                  <Avatar src={top3.avatar} name={formatProducerName(top3)} size="lg" className="border-4 border-amber-700 shadow-lg mx-auto" />
                  <span className="absolute -top-2 -right-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-700 text-white shadow">
                    3RD
                  </span>
                  <p className="text-xs font-bold text-white mt-2 truncate">{formatProducerName(top3)}</p>
                  <p className="text-[10px] text-slate-400 truncate">{formatProducerRegion(top3)}</p>
                  <p className="text-xs font-extrabold text-amber-500 mt-1">
                    {renderValueDisplay(top3.fundedVolume, top3.points)}
                  </p>
                </div>

                <div className="w-full h-32 rounded-t-2xl bg-gradient-to-t from-amber-950 to-amber-900 border-t-4 border-amber-700 flex flex-col items-center justify-center p-3 text-center shadow-xl">
                  <span className="text-2xl font-extrabold text-amber-400">#3</span>
                  <span className="text-[10px] font-bold text-slate-300 mt-1">{top3.dealsClosed} Deals</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* RANKED DATA TABLE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
            {viewType === 'Individual' ? 'Full National Sales Standings' : 'Regional Team Standings'}
          </h3>
          <span className="text-xs text-slate-400">
            {viewType === 'Individual' ? `${rankedProducers.length} Coaches Ranked` : `${teamRankings.length} Teams Ranked`}
          </span>
        </div>

        {viewType === 'Individual' ? (
          <Card variant="default" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-[#12294A] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">B4B Coach</th>
                    <th className="py-3 px-4">Rank Level</th>
                    <th className="py-3 px-4">Federal District</th>
                    <th className="py-3 px-4 text-right">Funded Performance</th>
                    <th className="py-3 px-4 text-center">Deals</th>
                    <th className="py-3 px-4 text-center">Points</th>
                    <th className="py-3 px-4 text-center">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#1E3A5F]">
                  <AnimatePresence>
                    {rankedProducers.map((rep) => (
                      <motion.tr
                        key={rep.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        className="hover:bg-slate-50/80 dark:hover:bg-[#12294A]/40 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-extrabold text-slate-900 dark:text-white">
                          <span
                            className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-xs ${
                              rep.rankPosition === 1
                                ? 'bg-amber-400 text-slate-950 font-extrabold'
                                : rep.rankPosition === 2
                                ? 'bg-slate-300 text-slate-900 font-bold'
                                : rep.rankPosition === 3
                                ? 'bg-amber-700 text-white font-bold'
                                : 'text-slate-500'
                            }`}
                          >
                            #{rep.rankPosition}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <Avatar src={rep.avatar} name={formatProducerName(rep)} size="sm" />
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white block">
                                {formatProducerName(rep)}
                              </span>
                              <span className="text-[10px] text-slate-400">{rep.team}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium">
                          {rep.roleTitle}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">{formatProducerRegion(rep)}</td>
                        <td className="py-3.5 px-4 text-right font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                          {renderValueDisplay(rep.fundedVolume, rep.points)}
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-slate-800 dark:text-slate-200">
                          {rep.dealsClosed}
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-blue-400">
                          {rep.points}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {rep.changeDirection === 'up' ? (
                            <span className="inline-flex items-center text-emerald-500 font-bold">
                              <TrendingUp className="w-4 h-4" />
                            </span>
                          ) : rep.changeDirection === 'down' ? (
                            <span className="inline-flex items-center text-rose-500 font-bold">
                              <TrendingDown className="w-4 h-4" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-slate-400">
                              <Minus className="w-4 h-4" />
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          /* TEAM RANKINGS VIEW */
          <Card variant="default" className="divide-y divide-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-[#12294A] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Team Organization</th>
                    <th className="py-3 px-4">Coaches</th>
                    <th className="py-3 px-4 text-right">Team Funded Volume</th>
                    <th className="py-3 px-4 text-center">Deals Closed</th>
                    <th className="py-3 px-4 text-center">Combined Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {teamRankings.map((team) => (
                    <tr key={team.team} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">#{team.rank}</td>
                      <td className="py-3.5 px-4 font-bold text-blue-400 text-sm">{team.team}</td>
                      <td className="py-3.5 px-4 text-slate-300">{team.members} Active Members</td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-emerald-400 text-sm">
                        {settings.showRevenueNumbers ? formatCurrency(team.volume) : `${team.points.toLocaleString()} PTS`}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-white">{team.deals}</td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-blue-300">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
