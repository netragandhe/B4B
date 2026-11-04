import React, { useState } from 'react'
import {
  Users,
  BarChart3,
  UserPlus,
  BarChart2,
  Map,
  FileText,
  Copy,
  Plus,
  CheckCircle2,
  DollarSign,
  TrendingUp,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Tabs } from '@/components/ui/Tabs'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'
import { BIZPRO_TEAM } from '@/mock-data/bizproData'
import { formatCurrency } from '@/lib/utils'

interface BizProTeamPageProps {
  initialTab?: string
}

export const BizProTeamPage: React.FC<BizProTeamPageProps> = ({ initialTab = 'Team' }) => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState(initialTab)
  const [recruitmentLink] = useState('https://b4b.com/join/david-ross-district')

  const copyRecruitmentLink = () => {
    navigator.clipboard.writeText(recruitmentLink)
    toast({ title: 'Recruitment Link Copied!', description: 'Share this link to onboard new reps into your team.', type: 'success' })
  }

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Leader Command & Team Management"
        description="Oversee team sales volume, rep onboarding, territory assignments, and override commissions (District Leader+ Rank 4)."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Leader Command', icon: <Users className="w-3.5 h-3.5 text-purple-500" /> },
        ]}
        badge={
          <Badge variant="navy" size="md">
            Rank 4 District Leader Command
          </Badge>
        }
        actions={
          <Button
            variant="accent"
            size="md"
            onClick={copyRecruitmentLink}
            leftIcon={<UserPlus className="w-4 h-4" />}
            className="shadow-sm shadow-emerald-500/20"
          >
            Recruit New Sales Rep
          </Button>
        }
      />

      {/* LEADER TABS */}
      <Tabs
        tabs={[
          { id: 'Team', label: 'My Team (4 Reps)' },
          { id: 'Commissions', label: 'Team Override Commissions' },
          { id: 'Recruit', label: 'Recruit / Onboard' },
          { id: 'Scoreboard', label: 'Team Scoreboard' },
          { id: 'Territory', label: 'Territory Assignment' },
          { id: 'Reports', label: 'Team Performance Reports' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* TAB 1: MY TEAM */}
      {activeTab === 'Team' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
          {BIZPRO_TEAM.map((rep) => (
            <Card key={rep.id} variant="bento" className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar src={rep.avatar} name={rep.name} size="md" status="online" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{rep.name}</h4>
                  <p className="text-[11px] text-slate-500 truncate">{rep.role}</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#12294A] text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Oct Volume:</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(rep.volume)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Deals Funded:</span>
                  <span className="font-bold">{rep.deals} Deals</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* TAB 2: TEAM COMMISSIONS OVERRIDE */}
      {activeTab === 'Commissions' && (
        <Card variant="bento" className="p-6 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Team Override Earnings (3% Rate)
              </h3>
              <p className="text-xs text-slate-500">Earned from team personal funded volume.</p>
            </div>
            <span className="font-extrabold text-lg text-emerald-600 dark:text-emerald-400">$2,750 Oct Override</span>
          </div>

          <div className="space-y-2 text-xs">
            {BIZPRO_TEAM.map((rep) => (
              <div key={rep.id} className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{rep.name}</span>
                  <p className="text-[11px] text-slate-500">Volume: {formatCurrency(rep.volume)}</p>
                </div>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                  +{formatCurrency(rep.volume * 0.03)} (3% Override)
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 3: RECRUIT & ONBOARD */}
      {activeTab === 'Recruit' && (
        <Card variant="bento" className="p-6 space-y-4 max-w-xl mx-auto animate-fadeIn">
          <div className="space-y-2">
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              Shareable Rep Recruitment Link
            </h3>
            <p className="text-xs text-slate-500">
              Send this personalized onboarding link to prospective sales executives.
            </p>
          </div>

          <div className="flex gap-2">
            <Input value={recruitmentLink} readOnly className="font-mono text-xs" />
            <Button variant="accent" onClick={copyRecruitmentLink} leftIcon={<Copy className="w-4 h-4" />}>
              Copy Link
            </Button>
          </div>
        </Card>
      )}

      {/* TAB 4: TEAM SCOREBOARD */}
      {activeTab === 'Scoreboard' && (
        <Card variant="default" className="divide-y divide-slate-100 dark:divide-[#1E3A5F] animate-fadeIn">
          {BIZPRO_TEAM.map((rep, idx) => (
            <div key={rep.id} className="p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-sm text-slate-400">#{idx + 1}</span>
                <Avatar src={rep.avatar} name={rep.name} size="sm" />
                <span className="font-bold text-slate-900 dark:text-white">{rep.name}</span>
              </div>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(rep.volume)}</span>
            </div>
          ))}
        </Card>
      )}

      {/* TAB 5: TERRITORY ASSIGNMENT */}
      {activeTab === 'Territory' && (
        <Card variant="bento" className="p-6 space-y-4 animate-fadeIn">
          <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
            District Territory Allocations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F]">
              <span className="font-bold text-slate-900 dark:text-white">Midwest Region (IL, IN, OH)</span>
              <p className="text-[11px] text-slate-500 mt-1">Assigned: Jason Miller & Monica Bell</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F]">
              <span className="font-bold text-slate-900 dark:text-white">Southeast Region (GA, NC, FL)</span>
              <p className="text-[11px] text-slate-500 mt-1">Assigned: Rachel Adams & Kevin Zhao</p>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 6: TEAM REPORTS */}
      {activeTab === 'Reports' && (
        <Card variant="bento" className="p-6 text-center space-y-4 animate-fadeIn">
          <FileText className="w-10 h-10 text-blue-500 mx-auto" />
          <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
            Q4 District Team Performance Report
          </h3>
          <Button
            variant="accent"
            onClick={() => toast({ title: 'Report Exported', description: 'Q4 Team PDF downloaded.', type: 'success' })}
          >
            Export Team Report PDF
          </Button>
        </Card>
      )}
    </div>
  )
}
