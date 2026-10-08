import React from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Award,
  CheckCircle2,
  Circle,
  TrendingUp,
  Users,
  ShieldCheck,
  Star,
  ChevronRight,
  ArrowUpRight,
  Lock,
  Sparkles,
  DollarSign,
  Briefcase,
  Zap,
} from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useAuth, RANK_TITLES } from '@/hooks/useAuth'
import { useBizProRanks, useBizProDashboard } from '@/hooks/queries/useBizProData'
import { useToast } from '@/components/ui/Toast'

export const BizProRankPage: React.FC = () => {
  const { user, setRank } = useAuth()
  const { data: ranks = [] } = useBizProRanks()
  const { data: dashboard } = useBizProDashboard()
  const { toast } = useToast()

  const currentRank = user?.rank || 4
  const nextRank = currentRank < 9 ? currentRank + 1 : 9
  const currentRankDef = ranks.find((r) => r.rank === currentRank)
  const nextRankDef = ranks.find((r) => r.rank === nextRank)

  // Dynamic requirements checklist based on current rank
  const checklist = [
    {
      id: 'c1',
      title: 'Personal Direct Volume',
      current: `$${(dashboard?.personalVolume || 142500).toLocaleString()}`,
      target: `$${(nextRankDef?.minPersonalVolume || 150000).toLocaleString()}`,
      completed: (dashboard?.personalVolume || 142500) >= (nextRankDef?.minPersonalVolume || 150000),
      note: 'Accumulated funded deal production',
    },
    {
      id: 'c2',
      title: 'Downline Team Volume',
      current: `$${(dashboard?.teamOverrideVolume || 485000).toLocaleString()}`,
      target: `$${(nextRankDef?.minTeamVolume || 500000).toLocaleString()}`,
      completed: (dashboard?.teamOverrideVolume || 485000) >= (nextRankDef?.minTeamVolume || 500000),
      note: 'Gross volume generated across downline network',
    },
    {
      id: 'c3',
      title: 'Active Direct Recruits',
      current: '5 Active',
      target: `${nextRankDef?.minDirectRecruits || 5} Active`,
      completed: 5 >= (nextRankDef?.minDirectRecruits || 5),
      note: 'Advisors sponsored currently producing deals',
    },
    {
      id: 'c4',
      title: 'Leadership Compliance & Certifications',
      current: 'Certified (98% score)',
      target: 'Pass Exam',
      completed: true,
      note: 'SBA 7(a) & Commercial Debt Structuring Exam',
    },
    {
      id: 'c5',
      title: 'Biz Pro Platform Subscription',
      current: 'Active ($25/mo)',
      target: 'Good Standing',
      completed: true,
      note: 'Account in good standing with recurring billing',
    },
  ]

  const completedCount = checklist.filter((c) => c.completed).length
  const progressPercent = Math.round((completedCount / checklist.length) * 100)

  return (
    <>
      <Helmet>
        <title>Rank & Career Roadmap | Biz Pro Terminal</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Career Rank & Promotion Roadmap
              </h1>
              <Badge variant={currentRank >= 4 ? 'emerald' : 'primary'} size="sm">
                Rank {currentRank}: {RANK_TITLES[currentRank]}
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              9-Tier promotion structure, commission overrides, and next rank qualification milestone tracker.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs text-slate-400 font-medium">Quick Rank Switcher:</span>
            <select
              value={currentRank}
              onChange={(e) => {
                const r = Number(e.target.value)
                setRank(r)
                toast({
                  title: `Switched to Rank ${r}`,
                  description: `Now previewing Rank ${r}: ${RANK_TITLES[r]} requirements.`,
                  type: 'info',
                })
              }}
              className="bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] text-xs font-bold rounded-xl px-3 py-1.5 text-slate-900 dark:text-slate-100 focus:outline-hidden"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((r) => (
                <option key={r} value={r}>
                  Rank {r}: {RANK_TITLES[r]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Current Standing & Next Rank Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Rank Card */}
          <Card className="p-6 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white border-0 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider uppercase text-blue-300">
                Current Assigned Rank
              </span>
              <Badge variant="gold" size="sm">
                Rank {currentRank} of 9
              </Badge>
            </div>

            <h2 className="text-xl font-black mt-3">{RANK_TITLES[currentRank]}</h2>
            <p className="text-xs text-blue-200/80 mt-1">
              Region: {user?.region || 'Northeast Region'}
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-blue-800/60 text-xs">
              <div>
                <span className="text-[10px] text-blue-300 uppercase font-semibold">Direct Commission</span>
                <p className="text-xl font-extrabold mt-0.5 text-white">
                  {currentRankDef?.commissionRate}%
                </p>
              </div>
              <div>
                <span className="text-[10px] text-blue-300 uppercase font-semibold">Team Overrides</span>
                <p className="text-xl font-extrabold mt-0.5 text-emerald-300">
                  {currentRankDef?.teamOverrideRate}%
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-blue-800/60">
              <span className="text-[11px] font-semibold text-blue-200 block mb-1.5">Unlocked Perks:</span>
              <ul className="space-y-1 text-xs text-blue-100/90">
                {currentRankDef?.perks.slice(0, 3).map((p, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Next Promotion Checklist (Covers 2 columns) */}
          <Card className="lg:col-span-2 p-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-[#1E3A5F]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Target Rank {nextRank}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {nextRank === currentRank ? 'Maximum Rank Achieved!' : `Promotion to ${nextRankDef?.title}`}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-slate-400">Completion</span>
                  <p className="text-base font-extrabold text-blue-600 dark:text-blue-400">{progressPercent}%</p>
                </div>
                <div className="w-14 h-14 rounded-full border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center font-bold text-sm text-slate-900 dark:text-white relative">
                  <svg className="w-14 h-14 -rotate-90 absolute">
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      className="stroke-blue-600 dark:stroke-blue-400"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={138}
                      strokeDashoffset={138 - (138 * progressPercent) / 100}
                    />
                  </svg>
                  {completedCount}/{checklist.length}
                </div>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="mt-4 space-y-3">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs ${
                    item.completed
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                      : 'bg-slate-50 dark:bg-[#12294A] border-slate-200 dark:border-[#1E3A5F]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0">
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`font-bold truncate ${
                          item.completed
                            ? 'text-emerald-950 dark:text-emerald-300'
                            : 'text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-400">{item.note}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                      {item.current}
                    </span>
                    <span className="text-slate-400 text-[11px] block">/ {item.target}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Advancement unlocks +2.5% direct commission and +1.0% team override.
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() =>
                  toast({
                    title: 'Promotion Audit Requested',
                    description: 'Your underwriting volume and team downline audits are queued.',
                    type: 'success',
                  })
                }
              >
                Request Promotion Review
              </Button>
            </div>
          </Card>
        </div>

        {/* 9-Tier Visual Progression Timeline */}
        <Card className="p-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Biz Pro 9-Rank Compensation Ladder
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Ranks 1–3 focus on personal origination. Ranks 4–9 unlock leadership overrides and downline equity.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">
                Ranks 1–3: Base Core
              </Badge>
              <Badge variant="emerald" size="sm">
                Ranks 4–9: Leadership Extra
              </Badge>
            </div>
          </div>

          {/* Stepper / Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-3">
            {ranks.map((r) => {
              const isCurrent = r.rank === currentRank
              const isPassed = r.rank < currentRank
              const isFuture = r.rank > currentRank

              return (
                <div
                  key={r.rank}
                  onClick={() => {
                    setRank(r.rank)
                    toast({
                      title: `Selected Rank ${r.rank}`,
                      description: `Now previewing Rank ${r.rank}: ${r.title}`,
                      type: 'info',
                    })
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer relative flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 ring-2 ring-blue-500/30 shadow-md'
                      : isPassed
                      ? 'bg-slate-50 dark:bg-[#12294A] border-slate-200 dark:border-[#1E3A5F] opacity-90'
                      : 'bg-white dark:bg-[#0A1628] border-slate-200/80 dark:border-slate-800'
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                      Active
                    </span>
                  )}

                  <div>
                    <div
                      className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center font-extrabold text-xs mb-2 ${
                        isCurrent
                          ? 'bg-blue-600 text-white'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {r.rank}
                    </div>
                    <h4 className="font-bold text-[11px] text-slate-900 dark:text-slate-100 leading-tight">
                      {r.title}
                    </h4>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-[#1E3A5F]/60 text-[10px] space-y-0.5">
                    <p className="font-bold text-blue-600 dark:text-blue-400">{r.commissionRate}% Dir</p>
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {r.teamOverrideRate > 0 ? `${r.teamOverrideRate}% Over` : 'No Over'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Detailed Compensation Table */}
        <Card className="p-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] overflow-x-auto">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4">
            Rank Compensation Matrix & Downline Overrides
          </h3>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#1E3A5F] text-slate-400 uppercase text-[10px] font-semibold">
                <th className="pb-3">Rank Level</th>
                <th className="pb-3">Title</th>
                <th className="pb-3">Personal Vol Req</th>
                <th className="pb-3">Team Vol Req</th>
                <th className="pb-3">Direct Recruits</th>
                <th className="pb-3">Commission %</th>
                <th className="pb-3">Team Override %</th>
                <th className="pb-3">Class</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#1E3A5F]/60">
              {ranks.map((r) => {
                const isUser = r.rank === currentRank
                return (
                  <tr
                    key={r.rank}
                    className={`transition-colors ${
                      isUser
                        ? 'bg-blue-50/70 dark:bg-blue-950/40 font-semibold'
                        : 'hover:bg-slate-50 dark:hover:bg-[#12294A]'
                    }`}
                  >
                    <td className="py-3">
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                        Rank {r.rank}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-900 dark:text-slate-100 font-bold">{r.title}</span>
                        {isUser && <Badge variant="primary" size="sm">You</Badge>}
                      </div>
                    </td>
                    <td className="py-3 font-mono text-slate-600 dark:text-slate-300">
                      ${r.minPersonalVolume.toLocaleString()}
                    </td>
                    <td className="py-3 font-mono text-slate-600 dark:text-slate-300">
                      ${r.minTeamVolume.toLocaleString()}
                    </td>
                    <td className="py-3 text-slate-600 dark:text-slate-300">
                      {r.minDirectRecruits} Active
                    </td>
                    <td className="py-3 font-bold text-blue-600 dark:text-blue-400">
                      {r.commissionRate}%
                    </td>
                    <td className="py-3 font-bold text-emerald-600 dark:text-emerald-400">
                      {r.teamOverrideRate > 0 ? `${r.teamOverrideRate}%` : '—'}
                    </td>
                    <td className="py-3">
                      <Badge variant={r.isLeadership ? 'emerald' : 'default'} size="sm">
                        {r.isLeadership ? 'Leadership (4+)' : 'Base Advisor'}
                      </Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  )
}
