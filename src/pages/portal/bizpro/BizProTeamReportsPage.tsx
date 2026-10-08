import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Filter,
  DollarSign,
  Users2,
  Award,
  ChevronDown,
  ShieldAlert,
  Sliders,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useAuth, RANK_TITLES } from '@/hooks/useAuth'
import { useBizProDownline } from '@/hooks/queries/useBizProData'
import { useToast } from '@/components/ui/Toast'

export const BizProTeamReportsPage: React.FC = () => {
  const { user, setRank } = useAuth()
  const { data: downline = [] } = useBizProDownline()
  const { toast } = useToast()

  const [dateRange, setDateRange] = useState('October 2026')
  const currentRank = user?.rank || 4
  const isLeadershipUnlocked = currentRank >= 4

  const handleExportCSV = () => {
    toast({
      title: 'Team Analytics Report Exported',
      description: 'Downloaded team_production_october_2026.csv',
      type: 'success',
    })
  }

  if (!isLeadershipUnlocked) {
    return (
      <div className="space-y-6">
        <Helmet>
          <title>Team Reports (Locked) | Biz Pro Terminal</title>
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
              Team Reports Unlocked at Rank 4
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
              Downline producer reports and volume aggregation analytics require Rank 4 (Regional Director) status.
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
                  description: 'Regional Director activated — Team Reports now live!',
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

  // Calculate team metrics
  const totalVolume = downline.reduce((sum, d) => sum + d.monthlyVolume, 0)
  const totalOverrides = downline.reduce((sum, d) => sum + d.overrideEarned, 0)
  const avgVolumePerAdvisor = Math.round(totalVolume / (downline.length || 1))

  return (
    <>
      <Helmet>
        <title>Team Production Reports | Biz Pro Terminal</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Team Production Reports
              </h1>
              <Badge variant="emerald" size="sm">
                Downline Analytics
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Detailed performance metrics, closing velocity, and volume breakdowns for your regional advisory pod.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] text-xs font-semibold rounded-xl px-3 py-1.5 text-slate-900 dark:text-slate-100 focus:outline-hidden"
            >
              <option value="October 2026">October 2026 (Current MTD)</option>
              <option value="September 2026">September 2026</option>
              <option value="Q3 2026">Q3 2026 Consolidated</option>
              <option value="Year to Date">2026 Year-to-Date</option>
            </select>

            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              <Download className="w-4 h-4 mr-1.5" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* High-level KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <span className="text-xs text-slate-500 dark:text-slate-400">Total Downline Production</span>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              ${(totalVolume / 1000).toFixed(0)}k
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Exceeding regional quota by 18%
            </p>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <span className="text-xs text-slate-500 dark:text-slate-400">Avg Volume Per Direct Producer</span>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              ${(avgVolumePerAdvisor / 1000).toFixed(0)}k
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Across 5 direct branches</p>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <span className="text-xs text-slate-500 dark:text-slate-400">Total Monthly Overrides</span>
            <div className="mt-2 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              ${totalOverrides.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">2.0% L1 rate + 1.0% L2 rate</p>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <span className="text-xs text-slate-500 dark:text-slate-400">Producing Ratio</span>
            <div className="mt-2 text-2xl font-extrabold text-blue-600 dark:text-blue-400">
              100% Active
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
              5/5 downline members closed deals
            </p>
          </Card>
        </div>

        {/* Detailed Producer Breakdown Table */}
        <Card className="bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
          <div className="p-4 border-b border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Individual Producer Scorecard — {dateRange}
            </h3>
            <Badge variant="primary" size="sm">
              5 Direct Branches
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-[#1E3A5F] text-slate-400 uppercase text-[10px] font-semibold bg-slate-50/50 dark:bg-[#12294A]/40">
                  <th className="p-3.5">Advisor</th>
                  <th className="p-3.5">Rank Level</th>
                  <th className="p-3.5">Region</th>
                  <th className="p-3.5">Funded Deals</th>
                  <th className="p-3.5">Gross Volume</th>
                  <th className="p-3.5">Override Rate</th>
                  <th className="p-3.5 text-right">Your Override</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1E3A5F]/60">
                {downline.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-[#12294A] transition-colors">
                    <td className="p-3.5">
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">
                        {member.name}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{member.email}</span>
                    </td>
                    <td className="p-3.5">
                      <Badge
                        variant={member.rank >= 3 ? 'royal' : member.rank === 2 ? 'primary' : 'default'}
                        size="sm"
                      >
                        Rank {member.rank}: {RANK_TITLES[member.rank]}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{member.region}</td>
                    <td className="p-3.5 font-mono text-slate-800 dark:text-slate-200">
                      {member.activeClients} Closed
                    </td>
                    <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-slate-100">
                      ${member.monthlyVolume.toLocaleString()}
                    </td>
                    <td className="p-3.5 font-bold text-blue-600 dark:text-blue-400">2.0%</td>
                    <td className="p-3.5 font-mono font-extrabold text-emerald-600 dark:text-emerald-400 text-right">
                      +${member.overrideEarned.toLocaleString()}
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
