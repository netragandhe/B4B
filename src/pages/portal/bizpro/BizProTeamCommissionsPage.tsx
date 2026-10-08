import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Percent,
  DollarSign,
  TrendingUp,
  Download,
  Users2,
  Calendar,
  ShieldAlert,
  Sliders,
  Calculator,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useAuth, RANK_TITLES } from '@/hooks/useAuth'
import { useBizProDownline } from '@/hooks/queries/useBizProData'
import { useToast } from '@/components/ui/Toast'

export const BizProTeamCommissionsPage: React.FC = () => {
  const { user, setRank } = useAuth()
  const { data: downline = [] } = useBizProDownline()
  const { toast } = useToast()

  const currentRank = user?.rank || 4
  const isLeadershipUnlocked = currentRank >= 4

  // Simulator state
  const [simVolume, setSimVolume] = useState(600000)

  if (!isLeadershipUnlocked) {
    return (
      <div className="space-y-6">
        <Helmet>
          <title>Team Commission (Locked) | Biz Pro Terminal</title>
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
              Team Commission Overrides Unlocked at Rank 4
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
              Downline team commission overrides (2.0% Level 1 and 1.0% Level 2) require Rank 4 (Regional Director) status.
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
                  description: 'Regional Director activated — Team Commissions are now live!',
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

  const level1Volume = downline.reduce((sum, d) => sum + d.monthlyVolume, 0)
  const level1Overrides = downline.reduce((sum, d) => sum + d.overrideEarned, 0)

  let level2Volume = 0
  let level2Overrides = 0
  downline.forEach((d) => {
    if (d.downlineRecruits) {
      d.downlineRecruits.forEach((sub) => {
        level2Volume += sub.monthlyVolume
        level2Overrides += sub.overrideEarned
      })
    }
  })

  const totalOverrides = level1Overrides + level2Overrides

  return (
    <>
      <Helmet>
        <title>Team Commission Overrides | Biz Pro Terminal</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Team Commission Overrides Ledger
              </h1>
              <Badge variant="gold" size="sm">
                Multi-Tier Residuals
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Passive volume overrides generated from Level 1 (2.0%) and Level 2 (1.0%) downline production.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                title: 'Team Overrides Statement Downloaded',
                description: 'Exported team_overrides_breakdown.pdf',
                type: 'success',
              })
            }
          >
            <Download className="w-4 h-4 mr-1.5" />
            Download Override Statement
          </Button>
        </div>

        {/* Override Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <span className="text-xs text-slate-500 dark:text-slate-400">Total Monthly Overrides</span>
            <div className="mt-2 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              ${totalOverrides.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Level 1 ($8,040) + Level 2 ($1,660)</p>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <span className="text-xs text-slate-500 dark:text-slate-400">Level 1 Downline Volume (2.0%)</span>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              ${(level1Volume / 1000).toFixed(0)}k
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">From 5 direct recruit advisors</p>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <span className="text-xs text-slate-500 dark:text-slate-400">Level 2 Downline Volume (1.0%)</span>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              ${(level2Volume / 1000).toFixed(0)}k
            </div>
            <p className="text-[11px] text-slate-400 mt-1">From 3 secondary branch recruits</p>
          </Card>
        </div>

        {/* Override Projection Calculator */}
        <Card className="p-6 bg-gradient-to-r from-blue-900/10 via-amber-900/10 to-transparent dark:from-[#132847] dark:to-[#0D1E36] border border-blue-200 dark:border-[#1E3A5F]">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Interactive Team Override Forecast Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Drag to simulate what your monthly passive income will be as your downline volume grows.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Monthly Downline Funded Volume:
              </span>
              <span className="font-mono text-base font-extrabold text-blue-600 dark:text-blue-400">
                ${simVolume.toLocaleString()}
              </span>
            </div>

            <input
              type="range"
              min="200000"
              max="2500000"
              step="50000"
              value={simVolume}
              onChange={(e) => setSimVolume(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F]">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Level 1 Overrides (2.0%)</span>
                <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                  ${Math.round(simVolume * 0.02).toLocaleString()} / mo
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F]">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Annualized Override Income</span>
                <p className="text-lg font-black text-blue-600 dark:text-blue-400 mt-0.5">
                  ${Math.round(simVolume * 0.02 * 12).toLocaleString()} / yr
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F]">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Promotion to Rank 5 (3.0%)</span>
                <p className="text-lg font-black text-amber-500 mt-0.5">
                  ${Math.round(simVolume * 0.03).toLocaleString()} / mo
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
