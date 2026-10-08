import React from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Medal,
  Trophy,
  Award,
  Crown,
  TrendingUp,
  Star,
  Users2,
  ShieldAlert,
  Sliders,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { useAuth, RANK_TITLES } from '@/hooks/useAuth'
import { useBizProDownline } from '@/hooks/queries/useBizProData'
import { useToast } from '@/components/ui/Toast'

export const BizProTeamScoreboardPage: React.FC = () => {
  const { user, setRank } = useAuth()
  const { data: downline = [] } = useBizProDownline()
  const { toast } = useToast()

  const currentRank = user?.rank || 4
  const isLeadershipUnlocked = currentRank >= 4

  if (!isLeadershipUnlocked) {
    return (
      <div className="space-y-6">
        <Helmet>
          <title>Team Scoreboard (Locked) | Biz Pro Terminal</title>
        </Helmet>

        <Card className="p-8 text-center bg-white dark:bg-[#0D1E36] border-2 border-dashed border-amber-300 dark:border-amber-800/80 max-w-2xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <Badge variant="gold" size="md">
              Rank 4+ Leadership Gate
            </Badge>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-2">
              Team Scoreboard Unlocked at Rank 4
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
              Internal downline rankings and incentive leaderboards require Rank 4 (Regional Director) status.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/bizpro/rank">
              <Button variant="outline" size="sm">
                View Rank Roadmap
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setRank(4)
                toast({
                  title: 'Dev Preview: Upgraded to Rank 4',
                  description: 'Regional Director activated — Team Scoreboard is now live!',
                  type: 'success',
                })
              }}
            >
              <Sliders className="w-4 h-4 mr-1.5" />
              Preview Rank 4 (Instant Unlock)
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const sortedDownline = [...downline].sort((a, b) => b.monthlyVolume - a.monthlyVolume)

  return (
    <>
      <Helmet>
        <title>Team Scoreboard & Contests | Biz Pro Terminal</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Team Scoreboard & Contests
              </h1>
              <Badge variant="gold" size="sm">
                Internal Downline Sprint
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Live production standings across your sponsored advisors, monthly bonuses, and challenge standings.
            </p>
          </div>
        </div>

        {/* Downline Producer Ranking Table */}
        <Card className="bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
          <div className="p-4 border-b border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Downline Advisor Standings (October 2026)
            </h3>
            <Badge variant="primary" size="sm">
              5 Direct Branches
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-[#1E3A5F] text-slate-400 uppercase text-[10px] font-semibold bg-slate-50/50 dark:bg-[#12294A]/40">
                  <th className="p-3.5">Position</th>
                  <th className="p-3.5">Advisor</th>
                  <th className="p-3.5">Rank Level</th>
                  <th className="p-3.5">Territory Region</th>
                  <th className="p-3.5">Closed Deals</th>
                  <th className="p-3.5 text-right">Production Volume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1E3A5F]/60">
                {sortedDownline.map((adv, idx) => (
                  <tr key={adv.id} className="hover:bg-slate-50 dark:hover:bg-[#12294A] transition-colors">
                    <td className="p-3.5 font-black font-mono">
                      {idx === 0 ? (
                        <span className="flex items-center gap-1 text-amber-500">
                          <Crown className="w-4 h-4" /> #1
                        </span>
                      ) : (
                        `#${idx + 1}`
                      )}
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={adv.name} src={adv.avatar} size="sm" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-slate-100 block">{adv.name}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{adv.sponsorCode}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <Badge variant="primary" size="sm">
                        Rank {adv.rank}: {RANK_TITLES[adv.rank]}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{adv.region}</td>
                    <td className="p-3.5 font-mono text-slate-800 dark:text-slate-200">
                      {adv.activeClients} Deals
                    </td>
                    <td className="p-3.5 text-right font-mono font-black text-slate-900 dark:text-slate-100">
                      ${adv.monthlyVolume.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  )
}
