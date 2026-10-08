import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  UserPlus,
  Mail,
  Share2,
  Copy,
  Check,
  QrCode,
  Sparkles,
  Users,
  Send,
  Clock,
  CheckCircle2,
  ShieldAlert,
  Sliders,
  Award,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useAuth, RANK_TITLES } from '@/hooks/useAuth'
import { useBizProRecruits, useSendRecruitInvite } from '@/hooks/queries/useBizProData'
import { useToast } from '@/components/ui/Toast'

export const BizProRecruitPage: React.FC = () => {
  const { user, setRank } = useAuth()
  const { data: invites = [] } = useBizProRecruits()
  const { mutate: sendInvite, isPending } = useSendRecruitInvite()
  const { toast } = useToast()

  const [candidateName, setCandidateName] = useState('')
  const [candidateEmail, setCandidateEmail] = useState('')
  const [candidateRegion, setCandidateRegion] = useState('Northeast Region')
  const [customNote, setCustomNote] = useState(
    'Join our commercial debt & business credit advisory team under my regional brokerage pod!'
  )
  const [copiedLink, setCopiedLink] = useState(false)

  const currentRank = user?.rank || 4
  const isLeadershipUnlocked = currentRank >= 4
  const sponsorCode = user?.sponsorCode || 'BIZ-88219'
  const inviteLink = `https://portal.b4b.finance/join?sponsor=${sponsorCode}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopiedLink(true)
    toast({
      title: 'Sponsor Referral Link Copied',
      description: 'Copied to clipboard. Share with candidates or prospective advisors.',
      type: 'success',
    })
    setTimeout(() => setCopiedLink(false), 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!candidateName.trim() || !candidateEmail.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in candidate name and corporate email.',
        type: 'error',
      })
      return
    }

    sendInvite(
      {
        candidateName,
        email: candidateEmail,
        region: candidateRegion,
        sponsorCode,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Recruitment Invitation Dispatched',
            description: `Sent VIP onboarding invitation to ${candidateEmail} with sponsor code ${sponsorCode}.`,
            type: 'success',
          })
          setCandidateName('')
          setCandidateEmail('')
        },
      }
    )
  }

  if (!isLeadershipUnlocked) {
    return (
      <div className="space-y-6">
        <Helmet>
          <title>Recruit (Locked) | Biz Pro Terminal</title>
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
              Recruitment Tools Unlocked at Rank 4
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
              You are currently at <strong className="text-blue-600 dark:text-blue-400">Rank {currentRank} ({RANK_TITLES[currentRank]})</strong>.
              Advancing to Rank 4 (Regional Director) unlocks sponsor codes, downline recruitment tools, and team commission overrides.
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
                  description: 'Regional Director activated — Recruit Form is now live!',
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

  return (
    <>
      <Helmet>
        <title>Recruit Advisors | Biz Pro Terminal</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Recruit & Sponsor Advisors
            </h1>
            <Badge variant="gold" size="sm">
              Sponsor Code: {sponsorCode}
            </Badge>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Build your high-producing brokerage downline. Send direct email invites, track onboarding progress, and earn multi-tier overrides.
          </p>
        </div>

        {/* Top Grid: Form and Share Link Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recruit Form */}
          <Card className="lg:col-span-2 p-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#1E3A5F]">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Send Candidate Invitation
                </h2>
              </div>
              <Badge variant="primary" size="sm">
                Sponsor Attribution Guaranteed
              </Badge>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rachel Sterling, CPA"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Candidate Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rachel@sterlingcapital.com"
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Target Operating Region
                  </label>
                  <select
                    value={candidateRegion}
                    onChange={(e) => setCandidateRegion(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-slate-900 dark:text-slate-100 focus:outline-hidden"
                  >
                    <option value="Northeast Region">Northeast Region (NY, NJ, CT, PA)</option>
                    <option value="Southeast Region">Southeast Region (FL, GA, NC, VA)</option>
                    <option value="West Coast">West Coast (CA, WA, OR)</option>
                    <option value="Midwest Region">Midwest Region (IL, OH, MI)</option>
                    <option value="Southwest Region">Southwest Region (TX, AZ)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Pre-assigned Sponsor Code
                  </label>
                  <input
                    type="text"
                    disabled
                    value={sponsorCode}
                    className="w-full p-2.5 bg-slate-100 dark:bg-[#0A1628] border border-slate-200 dark:border-[#1E3A5F] rounded-xl font-mono font-bold text-emerald-600 dark:text-emerald-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Personalized Welcome Note
                </label>
                <textarea
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-slate-900 dark:text-slate-100 focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" variant="primary" size="md" disabled={isPending}>
                  <Send className="w-4 h-4 mr-2" />
                  {isPending ? 'Sending VIP Invitation...' : 'Send Advisor Invite'}
                </Button>
              </div>
            </form>
          </Card>

          {/* Quick Share Link & QR Code */}
          <Card className="p-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Your Direct Sponsor Link
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Anyone who registers through this link will automatically link to your Level 1 downline.
              </p>

              {/* Link Box */}
              <div className="mt-4 p-2.5 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-slate-700 dark:text-slate-300 truncate">
                  {inviteLink}
                </span>
                <button
                  onClick={handleCopyLink}
                  className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shrink-0"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* QR Code Container */}
              <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] flex flex-col items-center text-center">
                <div className="p-3 bg-white rounded-xl shadow-xs">
                  {/* Styled SVG QR Code */}
                  <svg className="w-28 h-28" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="white" />
                    {/* Corner Squares */}
                    <rect x="10" y="10" width="24" height="24" fill="#0A1628" />
                    <rect x="14" y="14" width="16" height="16" fill="white" />
                    <rect x="18" y="18" width="8" height="8" fill="#0A1628" />
                    <rect x="66" y="10" width="24" height="24" fill="#0A1628" />
                    <rect x="70" y="14" width="16" height="16" fill="white" />
                    <rect x="74" y="18" width="8" height="8" fill="#0A1628" />
                    <rect x="10" y="66" width="24" height="24" fill="#0A1628" />
                    <rect x="14" y="70" width="16" height="16" fill="white" />
                    <rect x="18" y="74" width="8" height="8" fill="#0A1628" />
                    {/* Matrix patterns */}
                    <rect x="42" y="12" width="6" height="6" fill="#0A1628" />
                    <rect x="52" y="18" width="6" height="6" fill="#0A1628" />
                    <rect x="42" y="28" width="8" height="8" fill="#0A1628" />
                    <rect x="16" y="44" width="8" height="8" fill="#0A1628" />
                    <rect x="30" y="44" width="6" height="6" fill="#0A1628" />
                    <rect x="42" y="42" width="16" height="16" fill="#2563EB" />
                    <rect x="64" y="44" width="8" height="8" fill="#0A1628" />
                    <rect x="78" y="44" width="10" height="6" fill="#0A1628" />
                    <rect x="44" y="66" width="6" height="6" fill="#0A1628" />
                    <rect x="56" y="68" width="8" height="8" fill="#0A1628" />
                    <rect x="72" y="68" width="6" height="6" fill="#0A1628" />
                    <rect x="84" y="74" width="6" height="6" fill="#0A1628" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mt-2">
                  Scan to Join Downline
                </span>
                <span className="text-[10px] text-slate-400">
                  Ideal for conferences and live events
                </span>
              </div>
            </div>

            <div className="mt-4 text-[11px] text-slate-400 text-center">
              Overrides active immediately upon invitee's first funded deal.
            </div>
          </Card>
        </div>

        {/* Candidate Invitation Tracking Pipeline */}
        <Card className="bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
          <div className="p-4 border-b border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Active Candidate Pipeline ({invites.length})
            </h3>
            <span className="text-xs text-slate-400">Real-time status updates</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-[#1E3A5F] text-slate-400 uppercase text-[10px] font-semibold bg-slate-50/50 dark:bg-[#12294A]/40">
                  <th className="p-3.5">Candidate Name</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Target Region</th>
                  <th className="p-3.5">Invite Sent Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1E3A5F]/60">
                {invites.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-[#12294A] transition-colors">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">
                      {inv.candidateName}
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400 font-mono">
                      {inv.email}
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{inv.region}</td>
                    <td className="p-3.5 text-slate-400">{inv.sentDate}</td>
                    <td className="p-3.5">
                      <Badge
                        variant={
                          inv.status === 'Onboarding Completed'
                            ? 'emerald'
                            : inv.status === 'Registered'
                            ? 'royal'
                            : inv.status === 'Opened'
                            ? 'gold'
                            : 'default'
                        }
                        size="sm"
                        dot
                      >
                        {inv.status}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          toast({
                            title: `Resent Invite to ${inv.candidateName}`,
                            description: `VIP email reminder sent to ${inv.email}.`,
                            type: 'info',
                          })
                        }
                      >
                        Resend
                      </Button>
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
