import React, { useState, useEffect } from 'react'
import {
  Trophy,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  Star,
  Users,
  DollarSign,
  TrendingUp,
  Lock,
  Sparkles,
  Info,
  Calendar,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/hooks/useAuth'
import {
  RankData,
  RanksPolicyDocument,
  CoachProgress,
  INITIAL_RANKS_DOCUMENT,
  INITIAL_COACH_PROGRESS,
} from '@/mock-data/ranks'
import { rankService, sanitizeHtml } from '@/lib/rankService'

export const CoachRankPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth()

  const [publishedDoc, setPublishedDoc] =
    useState<RanksPolicyDocument>(INITIAL_RANKS_DOCUMENT)
  const [coachProgress, setCoachProgress] =
    useState<CoachProgress>(INITIAL_COACH_PROGRESS)
  const [isLoading, setIsLoading] = useState(true)

  // Load published document and coach progress
  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const doc = await rankService.getPublishedDocument()
        setPublishedDoc(doc)
        const progress = await rankService.getCoachProgress(user?.id)
        setCoachProgress(progress)
      } catch (err) {
        console.error('Failed to load published rank data for coach:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [user])

  // Current rank and target rank based on progress data or user role
  const userRankLevel = user?.rankLevel || coachProgress.currentRankLevel || 4
  const currentRank =
    publishedDoc.ranks.find((r) => r.level === userRankLevel) ||
    publishedDoc.ranks[3]
  const targetRank =
    publishedDoc.ranks.find((r) => r.level === userRankLevel + 1) || null

  // Calculation for progress bars
  const pmcPercent = Math.min(
    100,
    Math.round(
      (coachProgress.personalMonthlyCommissionCurrent /
        (coachProgress.personalMonthlyCommissionTarget || 1)) *
        100
    )
  )

  const consecutivePercent = Math.min(
    100,
    Math.round(
      (coachProgress.consecutiveMonthsCurrent /
        (coachProgress.consecutiveMonthsTarget || 1)) *
        100
    )
  )

  const teamMembersPercent = Math.min(
    100,
    Math.round(
      (coachProgress.activeTeamMembersCurrent /
        (coachProgress.activeTeamMembersTarget || 1)) *
        100
    )
  )

  const tmcPercent = Math.min(
    100,
    Math.round(
      (coachProgress.teamMonthlyCommissionCurrent /
        (coachProgress.teamMonthlyCommissionTarget || 1)) *
        100
    )
  )

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 space-y-4">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          Loading Coach Advancement Roadmap...
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
      {/* PAGE HEADER */}
      <PageHeader
        title="Rank & Promotion Roadmap"
        description="Official published executive promotion rules, compensation tiers, and your advancement progress."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          {
            label: 'Coach Rank & Advancement',
            icon: <Trophy className="w-3.5 h-3.5 text-amber-500" />,
          },
        ]}
        badge={
          <Badge variant="gold" size="md" className="shadow-xs font-bold">
            {currentRank.name} (Tier #{currentRank.level})
          </Badge>
        }
      />

      {/* TOP SUMMARY CARDS: CURRENT RANK & TARGET PROMOTION PROGRESS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Current Active Rank Overview */}
        <Card className="lg:col-span-5 p-6 space-y-5 bg-gradient-to-br from-emerald-50/60 to-emerald-100/30 dark:from-emerald-950/30 dark:to-slate-900 border-emerald-300 dark:border-emerald-800 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                #{currentRank.level}
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  Active Verified Rank
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {currentRank.name}
                </h3>
              </div>
            </div>
            <Badge variant="success" size="sm">
              Active Tier
            </Badge>
          </div>

          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Compensation Benchmark (Behind Login)
            </div>
            {isAuthenticated ? (
              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Monthly Commission:</span>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                    ${(currentRank.monthlyCommissionMin ?? 0).toLocaleString()} – $
                    {(currentRank.monthlyCommissionMax ?? 0).toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Approx. Yearly:</span>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                    {currentRank.yearlyIncomeDisplay || '—'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-slate-500 py-1">
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                <span>Log in to view executive compensation benchmarks</span>
              </div>
            )}
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <div className="font-semibold text-slate-800 dark:text-slate-200">
              Rank Status Designation:
            </div>
            <p className="italic text-slate-600 dark:text-slate-400">
              {currentRank.statusTitle} • Experience: {currentRank.experienceRequirement}
            </p>
          </div>
        </Card>

        {/* Next Rank Advancement Progress (Progress Bars & Checklist) */}
        <Card className="lg:col-span-7 p-6 space-y-5 border border-[var(--border)] shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                Target Next Promotion
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{targetRank ? targetRank.name : 'Highest Rank Achieved'}</span>
                {targetRank && (
                  <Badge variant="royal" size="sm">
                    Tier #{targetRank.level}
                  </Badge>
                )}
              </h3>
            </div>
            {targetRank && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>Advancement Criteria</span>
              </div>
            )}
          </div>

          {/* PROGRESS BARS */}
          <div className="space-y-3.5 text-xs">
            {/* PMC Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium">
                <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  Personal Monthly Commission (PMC):
                </span>
                <span className="text-slate-900 dark:text-white font-bold">
                  ${coachProgress.personalMonthlyCommissionCurrent.toLocaleString()} / $
                  {coachProgress.personalMonthlyCommissionTarget.toLocaleString()} ({pmcPercent}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: `${pmcPercent}%` }}
                />
              </div>
            </div>

            {/* Consecutive Months Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium">
                <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  Consecutive Qualifying Months:
                </span>
                <span className="text-slate-900 dark:text-white font-bold">
                  {coachProgress.consecutiveMonthsCurrent} /{' '}
                  {coachProgress.consecutiveMonthsTarget} Months ({consecutivePercent}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${consecutivePercent}%` }}
                />
              </div>
            </div>

            {/* Team Members Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium">
                <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-600" />
                  Direct Mentorship Team Production:
                </span>
                <span className="text-slate-900 dark:text-white font-bold">
                  {coachProgress.activeTeamMembersCurrent} /{' '}
                  {coachProgress.activeTeamMembersTarget} Members ({teamMembersPercent}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${teamMembersPercent}%` }}
                />
              </div>
            </div>

            {/* Team Monthly Commission (TMC) Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium">
                <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                  Team Monthly Commission (TMC) Alternative:
                </span>
                <span className="text-slate-900 dark:text-white font-bold">
                  ${coachProgress.teamMonthlyCommissionCurrent.toLocaleString()} / $
                  {coachProgress.teamMonthlyCommissionTarget.toLocaleString()} ({tmcPercent}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${tmcPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* CHECKLIST */}
          <div className="pt-2 border-t border-[var(--border)] space-y-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Advancement Audit Checklist:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {coachProgress.checklist.map((item) => (
                <div
                  key={item.id}
                  className={`p-2.5 rounded-lg border flex items-start gap-2.5 ${
                    item.completed
                      ? 'border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 mt-0.5 shrink-0 ${
                      item.completed ? 'text-emerald-600' : 'text-slate-400'
                    }`}
                  />
                  <div className="space-y-0.5">
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Req: {item.requiredText}
                    </div>
                    <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                      Status: {item.currentText}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* PUBLISHED GENERAL PROMOTION POLICY (READ-ONLY SANITIZED HTML) */}
      <Card className="p-6 space-y-4 shadow-sm border border-[var(--border)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2 font-bold text-base text-slate-900 dark:text-white">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Promotion Policy and General Terms</span>
          </div>
          <Badge variant="outline" size="sm">
            Published Terms (v{publishedDoc.version}.0)
          </Badge>
        </div>

        <div
          className="prose prose-sm dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(publishedDoc.generalPolicyTerms),
          }}
        />
      </Card>

      {/* ALL 9 PUBLISHED RANKS ROADMAP (READ-ONLY) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Executive Career Ranking Structure (All 9 Tiers)
            </h3>
            <p className="text-xs text-slate-500">
              Official progression requirements, consecutive month milestones, and commission schedules.
            </p>
          </div>
          <Badge variant="royal" size="sm">
            Read-Only Reference
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {publishedDoc.ranks.map((rank) => {
            const isUserRank = rank.level === userRankLevel
            const isTarget = rank.level === userRankLevel + 1

            return (
              <Card
                key={rank.id}
                className={`p-6 space-y-4 border transition-all shadow-xs ${
                  isUserRank
                    ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20 ring-1 ring-emerald-500/20'
                    : isTarget
                    ? 'border-blue-400 dark:border-blue-700/60 bg-blue-50/15 dark:bg-blue-950/15'
                    : 'border-[var(--border)] hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-base shadow-xs shrink-0 ${
                        isUserRank
                          ? 'bg-emerald-600 text-white'
                          : isTarget
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      #{rank.level}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                          {rank.name}
                        </h4>
                        <Badge variant="outline" size="sm">
                          {rank.statusTitle}
                        </Badge>
                        {isUserRank && (
                          <Badge variant="success" size="sm">
                            Your Current Rank
                          </Badge>
                        )}
                        {isTarget && (
                          <Badge variant="royal" size="sm">
                            Next Target Rank
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Experience: {rank.experienceRequirement || 'Standard entry criteria'}
                      </p>
                    </div>
                  </div>

                  {/* Compensation Figures (Protected behind login) */}
                  <div className="flex items-center gap-4 text-xs">
                    {isAuthenticated ? (
                      <div className="text-right">
                        <span className="text-slate-400">Monthly Commission:</span>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          ${(rank.monthlyCommissionMin ?? 0).toLocaleString()} – $
                          {(rank.monthlyCommissionMax ?? 0).toLocaleString()} PMC
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Approx. {rank.yearlyIncomeDisplay || '—'}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Lock className="w-3.5 h-3.5 text-amber-500" />
                        <span>Income figures hidden (Log in required)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* TERMS AND DESCRIPTION (SANITIZED HTML) */}
                <div className="space-y-2 text-xs">
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    Terms & Qualification Description:
                  </div>
                  <div
                    className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/50 border border-[var(--border)]"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(rank.termsDescription),
                    }}
                  />
                </div>

                {/* CLIENT CONFIRMATION NOTES */}
                {rank.clientNotes && rank.clientNotes.length > 0 && (
                  <div className="p-3 rounded-lg bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-300 space-y-0.5">
                    <span className="font-semibold flex items-center gap-1 text-[11.5px]">
                      <Info className="w-3 h-3 text-amber-600 shrink-0" />
                      Executive Policy Notice:
                    </span>
                    <ul className="list-disc list-inside pl-1 space-y-0.5">
                      {rank.clientNotes.map((note, idx) => (
                        <li key={idx}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default CoachRankPage
