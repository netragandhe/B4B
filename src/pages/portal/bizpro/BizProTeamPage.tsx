import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Users2,
  TrendingUp,
  DollarSign,
  Award,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  Search,
  UserPlus,
  ShieldAlert,
  Sliders,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { useAuth, RANK_TITLES } from '@/hooks/useAuth'
import { useBizProDownline } from '@/hooks/queries/useBizProData'
import { useToast } from '@/components/ui/Toast'
import type { DownlineMember } from '@/mock-data/bizProData'

export const BizProTeamPage: React.FC = () => {
  const { user, setRank } = useAuth()
  const { data: downline = [], isLoading } = useBizProDownline()
  const { toast } = useToast()

  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'down-01': true,
    'down-02': true,
  })
  const [searchTerm, setSearchTerm] = useState('')

  const currentRank = user?.rank || 4
  const isLeadershipUnlocked = currentRank >= 4

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // Calculate totals across direct + indirect downline
  const directCount = downline.length
  let totalTeamCount = directCount
  let totalTeamVolume = 0
  let totalOverrides = 0

  downline.forEach((m) => {
    totalTeamVolume += m.monthlyVolume
    totalOverrides += m.overrideEarned
    if (m.downlineRecruits) {
      totalTeamCount += m.downlineRecruits.length
      m.downlineRecruits.forEach((sub) => {
        totalTeamVolume += sub.monthlyVolume
        totalOverrides += sub.overrideEarned
      })
    }
  })

  // Filter direct members
  const filteredDownline = downline.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isLeadershipUnlocked) {
    return (
      <div className="space-y-6">
        <Helmet>
          <title>My Team (Locked) | Biz Pro Terminal</title>
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
              My Team Org-Tree is Unlocked at Rank 4
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
              You are currently at <strong className="text-blue-600 dark:text-blue-400">Rank {currentRank} ({RANK_TITLES[currentRank]})</strong>.
              Advancing to Rank 4 (Regional Director) unlocks your downline network tree, 2.0% volume override earnings, team scoreboard, and recruiting tools.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/bizpro/rank">
              <Button variant="outline" size="sm">
                View Rank Roadmap & Checklist
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setRank(4)
                toast({
                  title: 'Dev Preview: Upgraded to Rank 4',
                  description: 'Regional Director activated — My Team Org-Tree is now live!',
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
        <title>My Team Org-Tree | Biz Pro Terminal</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                My Team Org-Tree
              </h1>
              <Badge variant="emerald" size="sm">
                Leadership Network
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Hierarchical downline organization tree, advisor rank badges, monthly loan volumes, and override splits.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/bizpro/recruit">
              <Button variant="primary" size="sm">
                <UserPlus className="w-4 h-4 mr-1.5" />
                Recruit New Advisor
              </Button>
            </Link>
          </div>
        </div>

        {/* Team Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Downline</span>
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                <Users2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {totalTeamCount} Advisors
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {directCount} Direct Recruits • {totalTeamCount - directCount} Secondary (Tier 2)
            </p>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Team Monthly Volume</span>
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              ${(totalTeamVolume / 1000).toFixed(0)}k
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +22.4% network growth this month
            </p>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Overrides Earned</span>
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              ${totalOverrides.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Level 1 (2.0%) + Level 2 (1.0%)
            </p>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sponsor Code</span>
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-mono font-black text-purple-600 dark:text-purple-400">
              {user?.sponsorCode || 'BIZ-88219'}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Share with candidate recruits
            </p>
          </Card>
        </div>

        {/* Search */}
        <div className="p-3 bg-white dark:bg-[#0D1E36] rounded-2xl border border-slate-200 dark:border-[#1E3A5F] flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter downline by advisor name, region, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-hidden"
            />
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Showing {filteredDownline.length} Direct Branches
          </span>
        </div>

        {/* Interactive Org-Tree Hierarchy */}
        <div className="space-y-4">
          {/* Root Node: You (The Sponsor / Leader) */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg border border-blue-700/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar name={user?.name || 'Marcus Vance'} size="lg" status="online" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base">{user?.name || 'Marcus Vance'} (You)</h3>
                    <Badge variant="gold" size="sm">
                      Rank {currentRank}: {RANK_TITLES[currentRank]}
                    </Badge>
                  </div>
                  <p className="text-xs text-blue-200 mt-0.5">
                    Team Leader & Regional Sponsor • Code: {user?.sponsorCode || 'BIZ-88219'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <span className="text-blue-300 text-[10px] uppercase font-semibold">Team Production</span>
                  <p className="text-base font-extrabold text-white">
                    ${(totalTeamVolume / 1000).toFixed(0)}k / month
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-blue-300 text-[10px] uppercase font-semibold">Your Overrides</span>
                  <p className="text-base font-extrabold text-emerald-400">
                    +${totalOverrides.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Downline Branches */}
          <div className="space-y-3 pl-4 sm:pl-8 border-l-2 border-dashed border-blue-300 dark:border-[#1E3A5F]">
            {filteredDownline.map((member) => {
              const hasSubRecruits = !!member.downlineRecruits?.length
              const isExpanded = expandedNodes[member.id]

              return (
                <div key={member.id} className="space-y-3">
                  {/* Direct Member Card */}
                  <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] hover:border-blue-400 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {hasSubRecruits ? (
                          <button
                            onClick={() => toggleNode(member.id)}
                            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#12294A] text-slate-500"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            )}
                          </button>
                        ) : (
                          <div className="w-6" />
                        )}

                        <Avatar name={member.name} src={member.avatar} size="md" />

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                              {member.name}
                            </h4>
                            <Badge
                              variant={member.rank >= 3 ? 'royal' : member.rank === 2 ? 'primary' : 'default'}
                              size="sm"
                            >
                              Rank {member.rank}: {RANK_TITLES[member.rank]}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {member.region} • Joined {member.joinedDate}
                          </p>
                        </div>
                      </div>

                      {/* Performance & Overrides Row */}
                      <div className="flex items-center justify-between md:justify-end gap-5 text-xs pl-9 md:pl-0">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Monthly Volume</span>
                          <p className="font-mono font-bold text-slate-900 dark:text-slate-100">
                            ${(member.monthlyVolume / 1000).toFixed(0)}k
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Clients</span>
                          <p className="font-bold text-slate-700 dark:text-slate-300">
                            {member.activeClients} Accounts
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold">
                            Override (2.0%)
                          </span>
                          <p className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                            +${member.overrideEarned.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() =>
                              toast({
                                title: `Contacting ${member.name}`,
                                description: `Direct phone: ${member.phone}`,
                                type: 'info',
                              })
                            }
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-[#1E3A5F] text-slate-500 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() =>
                              toast({
                                title: `Emailing ${member.name}`,
                                description: `Recipient: ${member.email}`,
                                type: 'info',
                              })
                            }
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-[#1E3A5F] text-slate-500 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Level 2 Sub-Recruits (Nested Under Direct Member) */}
                  {hasSubRecruits && isExpanded && (
                    <div className="pl-6 sm:pl-10 space-y-2 border-l-2 border-dashed border-amber-300 dark:border-amber-900/60 ml-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                        Tier 2 Downline ({member.name}'s Recruits • 1.0% Override)
                      </span>
                      {member.downlineRecruits!.map((sub) => (
                        <Card
                          key={sub.id}
                          className="p-3 bg-slate-50/70 dark:bg-[#12294A]/70 border border-slate-200 dark:border-[#1E3A5F] text-xs"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <Avatar name={sub.name} src={sub.avatar} size="sm" />
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-slate-900 dark:text-slate-100">
                                    {sub.name}
                                  </span>
                                  <Badge variant="primary" size="sm">
                                    Rank {sub.rank}: {RANK_TITLES[sub.rank]}
                                  </Badge>
                                </div>
                                <span className="text-[11px] text-slate-400">{sub.region}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs">
                              <div>
                                <span className="text-[10px] text-slate-400">Volume</span>
                                <p className="font-mono font-bold text-slate-800 dark:text-slate-200">
                                  ${(sub.monthlyVolume / 1000).toFixed(0)}k
                                </p>
                              </div>
                              <div>
                                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                                  L2 Override (1.0%)
                                </span>
                                <p className="font-mono font-bold text-amber-600 dark:text-amber-400">
                                  +${sub.overrideEarned.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
