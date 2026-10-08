import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Trophy,
  Medal,
  Award,
  Crown,
  TrendingUp,
  MapPin,
  Flame,
  Star,
  Users,
  Search,
  Sparkles,
} from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { useAuth, RANK_TITLES } from '@/hooks/useAuth'
import { useBizProDashboard } from '@/hooks/queries/useBizProData'

export const BizProScoreboardPage: React.FC = () => {
  const { user } = useAuth()
  const { data: dashboard } = useBizProDashboard()
  const [activeRegion, setActiveRegion] = useState('All Regions')

  const top5 = dashboard?.top5Leaderboard || []

  const regionalLeaders = [
    {
      region: 'Northeast Region',
      topProducer: 'Marcus Vance (You)',
      volume: '$142,500',
      rank: 'Rank 4: Regional Director',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    {
      region: 'Southeast Region',
      topProducer: 'Sarah Jenkins',
      volume: '$138,000',
      rank: 'Rank 5: Sr. Regional Director',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    {
      region: 'West Coast Region',
      topProducer: 'David Cho',
      volume: '$122,400',
      rank: 'Rank 4: Regional Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    {
      region: 'Midwest Region',
      topProducer: 'Elena Gomez',
      volume: '$98,500',
      rank: 'Rank 3: Managing Advisor',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    },
  ]

  const recentPromotions = [
    {
      name: 'Brian Patel',
      promotedTo: 'Rank 2: Senior Advisor',
      region: 'New Jersey',
      date: '2 days ago',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Chloe Morrison',
      promotedTo: 'Rank 3: Managing Advisor',
      region: 'Northern NJ',
      date: '5 days ago',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Sarah Jenkins',
      promotedTo: 'Rank 5: Sr. Regional Director',
      region: 'Southeast',
      date: '1 week ago',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
  ]

  return (
    <>
      <Helmet>
        <title>Bulletin Scoreboard | Biz Pro Terminal</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                National Bulletin Scoreboard
              </h1>
              <Badge variant="gold" size="sm">
                Live Production Race
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Top commercial debt producers, regional champions, and career promotion announcements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Filter Territory:</span>
            <select
              value={activeRegion}
              onChange={(e) => setActiveRegion(e.target.value)}
              className="bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] text-xs font-semibold rounded-xl px-3 py-1.5 text-slate-900 dark:text-slate-100 focus:outline-hidden"
            >
              <option value="All Regions">All Territories</option>
              <option value="Northeast">Northeast Region</option>
              <option value="Southeast">Southeast Region</option>
              <option value="West Coast">West Coast</option>
              <option value="Midwest">Midwest</option>
            </select>
          </div>
        </div>

        {/* Podium Banner for Top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 2nd Place */}
          <Card className="p-5 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] flex flex-col items-center text-center order-2 md:order-1 relative">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center font-black text-sm absolute top-4 left-4">
              2
            </div>
            <Avatar
              name={top5[1]?.name || 'Sarah Jenkins'}
              src={top5[1]?.avatar}
              size="lg"
            />
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-3">
              {top5[1]?.name || 'Sarah Jenkins'}
            </h3>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              {top5[1]?.bizProTitle || 'Sr. Regional Director'}
            </p>
            <p className="text-[11px] text-slate-400">{top5[1]?.region || 'Southeast'}</p>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1E3A5F] w-full">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Funded Volume</span>
              <p className="text-lg font-black text-slate-900 dark:text-slate-100">
                ${(top5[1]?.monthlyVolume || 138000).toLocaleString()}
              </p>
            </div>
          </Card>

          {/* 1st Place Champion */}
          <Card className="p-6 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-950/40 dark:to-[#0D1E36] border-2 border-amber-400 dark:border-amber-500 shadow-xl flex flex-col items-center text-center order-1 md:order-2 relative -translate-y-1">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm absolute top-4 left-4 shadow-md">
              <Crown className="w-5 h-5" />
            </div>
            <div className="relative">
              <Avatar
                name={top5[0]?.name || 'Marcus Vance'}
                src={top5[0]?.avatar}
                size="xl"
              />
              <span className="absolute -bottom-1 -right-1 p-1 bg-amber-500 text-slate-950 rounded-full shadow-xs">
                <Star className="w-3.5 h-3.5 fill-current" />
              </span>
            </div>
            <h3 className="font-black text-base text-slate-900 dark:text-slate-100 mt-3">
              {top5[0]?.name || 'Marcus Vance'}
            </h3>
            <Badge variant="gold" size="sm" className="mt-1">
              National Volume Leader
            </Badge>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {top5[0]?.region || 'Northeast Region'}
            </p>
            <div className="mt-4 pt-3 border-t border-amber-200 dark:border-amber-800/60 w-full">
              <span className="text-[10px] text-amber-700 dark:text-amber-300 uppercase font-bold">
                Closed Monthly Production
              </span>
              <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
                ${(top5[0]?.monthlyVolume || 142500).toLocaleString()}
              </p>
            </div>
          </Card>

          {/* 3rd Place */}
          <Card className="p-5 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] flex flex-col items-center text-center order-3 relative">
            <div className="w-8 h-8 rounded-full bg-amber-700 text-white flex items-center justify-center font-black text-sm absolute top-4 left-4">
              3
            </div>
            <Avatar
              name={top5[2]?.name || 'David Cho'}
              src={top5[2]?.avatar}
              size="lg"
            />
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-3">
              {top5[2]?.name || 'David Cho'}
            </h3>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              {top5[2]?.bizProTitle || 'Regional Director'}
            </p>
            <p className="text-[11px] text-slate-400">{top5[2]?.region || 'West Coast'}</p>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1E3A5F] w-full">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Funded Volume</span>
              <p className="text-lg font-black text-slate-900 dark:text-slate-100">
                ${(top5[2]?.monthlyVolume || 122400).toLocaleString()}
              </p>
            </div>
          </Card>
        </div>

        {/* Full Leaderboard Table & Side Bulletin */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Table */}
          <Card className="lg:col-span-2 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <div className="p-4 border-b border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Top 5 Monthly Leaderboard
              </h3>
              <span className="text-xs text-slate-400">Updated 15 mins ago</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-[#1E3A5F] text-slate-400 uppercase text-[10px] font-semibold">
                    <th className="p-3.5">Rank</th>
                    <th className="p-3.5">Advisor</th>
                    <th className="p-3.5">Region</th>
                    <th className="p-3.5">Deals Closed</th>
                    <th className="p-3.5 text-right">Volume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#1E3A5F]/60">
                  {top5.map((entry) => {
                    const isYou = entry.name.includes('You')
                    return (
                      <tr
                        key={entry.rankPosition}
                        className={`transition-colors ${
                          isYou
                            ? 'bg-blue-50/70 dark:bg-blue-950/40 font-semibold'
                            : 'hover:bg-slate-50 dark:hover:bg-[#12294A]'
                        }`}
                      >
                        <td className="p-3.5 font-bold font-mono">
                          #{entry.rankPosition}
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center gap-2.5">
                            <Avatar name={entry.name} src={entry.avatar} size="sm" />
                            <div>
                              <span className="font-bold text-slate-900 dark:text-slate-100 block">
                                {entry.name}
                              </span>
                              <span className="text-[11px] text-blue-600 dark:text-blue-400">
                                {entry.bizProTitle}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-500 dark:text-slate-400">
                          {entry.region}
                        </td>
                        <td className="p-3.5 font-mono text-slate-700 dark:text-slate-300">
                          {entry.closedDeals} Deals
                        </td>
                        <td className="p-3.5 text-right font-mono font-extrabold text-slate-900 dark:text-slate-100">
                          ${entry.monthlyVolume.toLocaleString()}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Recent Promotions Bulletin */}
          <Card className="p-5 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E3A5F]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Advancement Bulletin
                </h3>
              </div>
              <Badge variant="primary" size="sm">
                Latest
              </Badge>
            </div>

            <div className="space-y-3">
              {recentPromotions.map((promo, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <Avatar name={promo.name} src={promo.avatar} size="sm" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">
                        {promo.name}
                      </span>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        {promo.promotedTo}
                      </span>
                      <span className="text-[10px] text-slate-400 block">{promo.region}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">{promo.date}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#132847] dark:to-[#0D1E36] border border-blue-200 dark:border-[#1E3A5F] text-xs">
              <span className="font-bold text-blue-900 dark:text-blue-300 block">
                Your Promotion Pace
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                You are currently ranked #1 in Northeast Region and qualify for Rank 5 Senior Regional Director review at $150k personal volume!
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
