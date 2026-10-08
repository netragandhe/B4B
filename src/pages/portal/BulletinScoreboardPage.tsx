import React, { useState, useEffect } from 'react'
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
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { CountUp } from '@/components/ui/CountUp'
import { Select } from '@/components/ui/Select'
import { useToast } from '@/components/ui/Toast'
import { INITIAL_SCOREBOARD, ScoreboardRep } from '@/mock-data/territoryScoreboardData'
import { formatCurrency } from '@/lib/utils'

export const BulletinScoreboardPage: React.FC = () => {
  const { toast } = useToast()

  // State
  const [reps, setReps] = useState<ScoreboardRep[]>(INITIAL_SCOREBOARD)
  const [timeframe, setTimeframe] = useState<'Today' | 'Week' | 'Month' | 'Year'>('Month')
  const [viewType, setViewType] = useState<'Individual' | 'Team'>('Individual')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [isLiveUpdating, setIsLiveUpdating] = useState<boolean>(true)
  const [isTvMode, setIsTvMode] = useState<boolean>(false)

  // Live Auto-Update Simulator Effect
  useEffect(() => {
    if (!isLiveUpdating) return

    const interval = setInterval(() => {
      setReps((prevReps) => {
        // Pick a random rep to boost revenue and activities
        const randomIndex = Math.floor(Math.random() * prevReps.length)
        const boost = Math.floor(Math.random() * 80000) + 10000
        const updated = prevReps.map((rep, idx) => {
          if (idx === randomIndex) {
            return {
              ...rep,
              revenue: rep.revenue + boost,
              activities: rep.activities + Math.floor(Math.random() * 3) + 1,
              dealsClosed: rep.dealsClosed + (Math.random() > 0.7 ? 1 : 0),
              trend: 'up' as const,
            }
          }
          return rep
        })

        // Re-sort by revenue descending
        const sorted = [...updated].sort((a, b) => b.revenue - a.revenue)
        return sorted.map((rep, idx) => ({ ...rep, rank: idx + 1 }))
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [isLiveUpdating])

  // Filtered reps
  const filteredReps = reps.filter((rep) => {
    if (categoryFilter !== 'all' && rep.category !== categoryFilter) return false
    return true
  })

  // Top 3 Podium
  const top1 = filteredReps[0]
  const top2 = filteredReps[1]
  const top3 = filteredReps[2]

  return (
    <div className={`space-y-6 text-left ${isTvMode ? 'fixed inset-0 z-50 bg-[#0A1628] text-white p-8 overflow-y-auto' : ''}`}>
      {/* HEADER & TV MODE CONTROLS */}
      {!isTvMode ? (
        <PageHeader
          title="Bulletin Sales Scoreboard"
          description="Real-time gamified sales leaderboard, revenue podium, and live deal activity."
          breadcrumbs={[
            { label: 'Portal', href: '/portal/dashboard' },
            { label: 'Bulletin Scoreboard', icon: <Trophy className="w-3.5 h-3.5 text-amber-500" /> },
          ]}
          badge={
            <Badge variant="gold" size="md" className="shadow-xs animate-pulse">
              Live Real-Time Sync
            </Badge>
          }
          actions={
            <>
              <Button
                variant={isLiveUpdating ? 'accent' : 'outline'}
                size="sm"
                onClick={() => setIsLiveUpdating(!isLiveUpdating)}
                leftIcon={isLiveUpdating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              >
                {isLiveUpdating ? 'Pause Live Sync' : 'Resume Live Sync'}
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
            </>
          }
        />
      ) : (
        /* TV MODE BAR HEADER */
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-extrabold shadow-lg">
              <Trophy className="w-7 h-7 fill-slate-950" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold font-heading text-white tracking-tight flex items-center gap-3">
                NATIONAL SALES SCOREBOARD (LIVE TV)
              </h1>
              <p className="text-xs text-emerald-400 font-bold flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Sync Active • Updated Every 4 Seconds
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
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
        </div>
      )}

      {/* FILTER BAR */}
      <Card variant="default" className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Timeframe pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#12294A] p-1 rounded-xl w-full sm:w-auto">
          {(['Today', 'Week', 'Month', 'Year'] as const).map((tf) => (
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

        {/* Individual vs Team */}
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#12294A] p-1 rounded-xl">
            <button
              onClick={() => setViewType('Individual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                viewType === 'Individual' ? 'bg-white dark:bg-[#0D1E36] text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Individual</span>
            </button>
            <button
              onClick={() => setViewType('Team')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                viewType === 'Team' ? 'bg-white dark:bg-[#0D1E36] text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Team</span>
            </button>
          </div>

          {/* Service Category Filter */}
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

      {/* TOP 3 PODIUM SHOWCASE */}
      <div className="py-6 px-4 rounded-3xl bg-gradient-to-b from-slate-900 via-[#0D1E36] to-[#0A1628] border border-slate-800 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-400 to-blue-500" />

        <div className="text-center mb-6">
          <Badge variant="gold" size="sm" className="mb-2">
            Top 3 Performers ({timeframe})
          </Badge>
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
            National Sales Champions
          </h2>
        </div>

        {/* 3 PODIUM BLOCKS GRID */}
        <div className="flex items-end justify-center gap-3 sm:gap-6 max-w-3xl mx-auto pt-6 min-h-[300px]">
          {/* 2nd Place (Silver - Left) */}
          {top2 && (
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="flex flex-col items-center flex-1 max-w-[200px]"
            >
              <div className="relative mb-3 text-center">
                <Avatar src={top2.avatar} name={top2.name} size="lg" className="border-4 border-slate-300 shadow-lg mx-auto" />
                <span className="absolute -top-2 -right-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-300 text-slate-900 shadow">
                  2ND
                </span>
                <p className="text-xs font-bold text-white mt-2 truncate">{top2.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{top2.region}</p>
                <p className="text-xs font-extrabold text-slate-200 mt-1">
                  <CountUp value={top2.revenue} prefix="$" />
                </p>
              </div>

              {/* Podium Block 200px */}
              <div className="w-full h-44 rounded-t-2xl bg-gradient-to-t from-slate-800 to-slate-700 border-t-4 border-slate-300 flex flex-col items-center justify-center p-3 text-center shadow-xl">
                <span className="text-3xl font-extrabold text-slate-300">#2</span>
                <span className="text-[10px] font-bold text-slate-400 mt-1">{top2.dealsClosed} Deals</span>
              </div>
            </motion.div>
          )}

          {/* 1st Place (Gold - Center - Highest) */}
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
                <Avatar src={top1.avatar} name={top1.name} size="xl" className="border-4 border-amber-400 shadow-2xl shadow-amber-500/30 mx-auto" />
                <span className="absolute -top-2 -right-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 shadow">
                  1ST
                </span>
                <p className="text-sm font-extrabold text-white mt-2 truncate">{top1.name}</p>
                <p className="text-[10px] text-amber-300 font-semibold truncate">{top1.title}</p>
                <p className="text-sm font-extrabold text-amber-400 mt-1">
                  <CountUp value={top1.revenue} prefix="$" />
                </p>
              </div>

              {/* Podium Block 250px */}
              <div className="w-full h-56 rounded-t-2xl bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 text-slate-950 border-t-4 border-amber-300 flex flex-col items-center justify-center p-4 text-center shadow-2xl shadow-amber-500/20">
                <span className="text-4xl font-extrabold text-slate-950">#1</span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mt-1">CHAMPION</span>
                <span className="text-xs font-bold text-slate-900 mt-1">{top1.dealsClosed} Deals Closed</span>
              </div>
            </motion.div>
          )}

          {/* 3rd Place (Bronze - Right) */}
          {top3 && (
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="flex flex-col items-center flex-1 max-w-[200px]"
            >
              <div className="relative mb-3 text-center">
                <Avatar src={top3.avatar} name={top3.name} size="lg" className="border-4 border-amber-700 shadow-lg mx-auto" />
                <span className="absolute -top-2 -right-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-700 text-white shadow">
                  3RD
                </span>
                <p className="text-xs font-bold text-white mt-2 truncate">{top3.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{top3.region}</p>
                <p className="text-xs font-extrabold text-amber-500 mt-1">
                  <CountUp value={top3.revenue} prefix="$" />
                </p>
              </div>

              {/* Podium Block 170px */}
              <div className="w-full h-36 rounded-t-2xl bg-gradient-to-t from-amber-950 to-amber-900 border-t-4 border-amber-700 flex flex-col items-center justify-center p-3 text-center shadow-xl">
                <span className="text-2xl font-extrabold text-amber-400">#3</span>
                <span className="text-[10px] font-bold text-slate-300 mt-1">{top3.dealsClosed} Deals</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* RANKED TABLE WITH FRAMER MOTION LAYOUT RE-ORDER ANIMATION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
            Full National Sales Rankings
          </h3>
          <span className="text-xs text-slate-400">{filteredReps.length} Reps Ranked</span>
        </div>

        <Card variant="default" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-[#12294A] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Sales Executive</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Federal Region</th>
                  <th className="py-3 px-4 text-right">Funded Revenue</th>
                  <th className="py-3 px-4 text-center">Deals</th>
                  <th className="py-3 px-4 text-center">Activities</th>
                  <th className="py-3 px-4 text-center">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1E3A5F]">
                <AnimatePresence>
                  {filteredReps.map((rep) => (
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
                            rep.rank === 1
                              ? 'bg-amber-400 text-slate-950 font-extrabold'
                              : rep.rank === 2
                              ? 'bg-slate-300 text-slate-900 font-bold'
                              : rep.rank === 3
                              ? 'bg-amber-700 text-white font-bold'
                              : 'text-slate-500'
                          }`}
                        >
                          #{rep.rank}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <Avatar src={rep.avatar} name={rep.name} size="sm" />
                          <span className="font-bold text-slate-900 dark:text-white">{rep.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium">
                        {rep.title}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {rep.region}
                      </td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                        {formatCurrency(rep.revenue)}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-800 dark:text-slate-200">
                        {rep.dealsClosed}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-500">
                        {rep.activities}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {rep.trend === 'up' ? (
                          <span className="inline-flex items-center text-emerald-500 font-bold">
                            <TrendingUp className="w-4 h-4" />
                          </span>
                        ) : rep.trend === 'down' ? (
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
      </div>
    </div>
  )
}
