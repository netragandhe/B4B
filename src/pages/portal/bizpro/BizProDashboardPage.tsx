import React, { useState } from 'react'
import {
  Target,
  DollarSign,
  Trophy,
  TrendingUp,
  ArrowUpRight,
  PlusCircle,
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronRight,
  Copy,
  Check,
  Award,
  Shield,
  Send,
  Building,
  Mail,
  Phone,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from 'recharts'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { CountUp } from '@/components/ui/CountUp'
import { Modal } from '@/components/ui/Modal'
import { Drawer } from '@/components/ui/Drawer'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { FormField } from '@/components/ui/FormField'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'
import { BIZPRO_RANKS } from '@/mock-data/bizproData'
import { formatCurrency } from '@/lib/utils'

export const BizProDashboardPage: React.FC = () => {
  const { user } = useAuth()
  const { toast } = useToast()

  const currentRank = BIZPRO_RANKS.find((r) => r.level === (user?.rankLevel || 4)) || BIZPRO_RANKS[3]
  const nextRank = BIZPRO_RANKS.find((r) => r.level === (user?.rankLevel || 4) + 1) || BIZPRO_RANKS[4]

  // In-Place Modals & Drawers States
  const [addLeadOpen, setAddLeadOpen] = useState(false)
  const [aiModalOpen, setAiModalOpen] = useState(false)
  const [roadmapOpen, setRoadmapOpen] = useState(false)
  const [leaderboardDrawerOpen, setLeaderboardDrawerOpen] = useState(false)

  // AI Generator state
  const [aiTone, setAiTone] = useState<'Executive' | 'Urgent' | 'Consultative'>('Executive')
  const [aiIndustry, setAiIndustry] = useState('Logistics & Freight')
  const [copiedAi, setCopiedAi] = useState(false)

  // Quick Lead Form State
  const [leadForm, setLeadForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    dealValue: '350000',
    stage: 'New',
    notes: '',
  })

  // Mock revenue chart data
  const revenueData = [
    { month: 'May', commission: 4200, volume: 140000 },
    { month: 'Jun', commission: 6800, volume: 220000 },
    { month: 'Jul', commission: 9500, volume: 310000 },
    { month: 'Aug', commission: 11200, volume: 420000 },
    { month: 'Sep', commission: 13800, volume: 530000 },
    { month: 'Oct', commission: 14250, volume: 610000 },
  ]

  // Lead Funnel stage distribution data
  const funnelData = [
    { stage: 'New', count: 8, fill: '#3B82F6' },
    { stage: 'Contacted', count: 6, fill: '#8B5CF6' },
    { stage: 'Qualified', count: 5, fill: '#F59E0B' },
    { stage: 'Proposal', count: 3, fill: '#10B981' },
    { stage: 'Won', count: 2, fill: '#059669' },
  ]

  // Leaderboard Widget Data (Top 10)
  const leaderboard = [
    { rank: 1, name: 'Monica Bell', volume: '$1,240,000', deals: 14, district: 'District 2 - New York', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' },
    { rank: 2, name: 'David Ross (You)', volume: '$610,000', deals: 8, isYou: true, district: 'District 7 - Chicago', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80' },
    { rank: 3, name: 'Jason Miller', volume: '$580,000', deals: 7, district: 'District 4 - Cleveland', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
    { rank: 4, name: 'Rachel Adams', volume: '$420,000', deals: 5, district: 'District 6 - Atlanta', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
    { rank: 5, name: 'Kevin Zhao', volume: '$310,000', deals: 4, district: 'District 11 - Dallas', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
    { rank: 6, name: 'Elena Rostova', volume: '$290,000', deals: 4, district: 'District 5 - Richmond', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
    { rank: 7, name: 'Marcus Vance', volume: '$275,000', deals: 3, district: 'District 8 - St. Louis', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
    { rank: 8, name: 'Victoria Lin', volume: '$260,000', deals: 3, district: 'District 1 - Boston', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
    { rank: 9, name: 'Sarah Jenkins', volume: '$240,000', deals: 3, district: 'District 3 - Philadelphia', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
    { rank: 10, name: 'Robert Chen', volume: '$210,000', deals: 2, district: 'District 9 - Minneapolis', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
  ]

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault()
    setAddLeadOpen(false)
    toast({
      title: 'Lead Added to Pipeline',
      description: `${leadForm.name || 'New Prospect'} (${leadForm.company || 'Company'}) recorded with ${formatCurrency(Number(leadForm.dealValue) || 350000)} facility.`,
      type: 'success',
    })
    setLeadForm({
      name: '',
      company: '',
      email: '',
      phone: '',
      dealValue: '350000',
      stage: 'New',
      notes: '',
    })
  }

  const generatedCopy = `Subject: Non-Dilutive Working Capital Allocation for ${aiIndustry}

Dear [Client Name],

I hope this finds you well. As an authorized B4B Coach with B4B America, I am reaching out to share that our private debt desk has unlocked pre-approved non-dilutive credit facilities ($250k–$2.5M) for established ${aiIndustry} operators.

Unlike traditional commercial banks, our underwriting is completed in 48 hours with zero equity dilution and flexible revenue-based payback terms.

Would you be open to a brief 10-minute strategy call this Thursday at 11:00 AM EST to review your capital eligibility?

Warm regards,
${user?.name || 'David Ross'}
${currentRank.title} | B4B America`

  const handleCopyAi = () => {
    navigator.clipboard.writeText(generatedCopy)
    setCopiedAi(true)
    toast({ title: 'Copy Copied to Clipboard!', description: 'Ready to paste into your email or LinkedIn message.', type: 'success' })
    setTimeout(() => setCopiedAi(false), 2000)
  }

  return (
    <div className="space-y-8 text-left">
      {/* PAGE HEADER & QUICK ACTION CTAS */}
      <PageHeader
        title={`Welcome back, ${user?.name || 'David Ross'}`}
        description={`Sales Rep CRM & Team Command for ${currentRank.title} (${currentRank.commissionTier}).`}
        badge={
          <Badge variant="gold" size="md" className="shadow-xs">
            {currentRank.title} (Rank {currentRank.level})
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAiModalOpen(true)}
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-blue-500" />}
            >
              AI Campaign Copy
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => setAddLeadOpen(true)}
              leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
              className="shadow-sm shadow-emerald-500/25"
            >
              Add New Lead
            </Button>
          </div>
        }
      />

      {/* 4 STATCARDS WITH SPARKLINE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Leads"
          value="24 Leads"
          change={18.4}
          changePeriod="vs last month"
          icon={<Target className="w-5 h-5" />}
          variant="royal"
          caption="5 proposals pending client signature"
        />

        <StatCard
          title="Deals Closed (Oct)"
          value="8 Deals"
          change={25.0}
          changePeriod="target: 10 deals"
          icon={<TrendingUp className="w-5 h-5" />}
          variant="emerald"
          caption="$610,000 total funded volume"
        />

        <StatCard
          title="Monthly Commission"
          value={<CountUp value={14250} prefix="$" />}
          change={12.8}
          changePeriod="18% payout rate"
          icon={<DollarSign className="w-5 h-5" />}
          variant="gold"
          caption="Payout dispatches on 15th"
        />

        <StatCard
          title="Rank Promotion Status"
          value={currentRank.title}
          change={10.0}
          changePeriod={`Next target: ${nextRank.title}`}
          icon={<Trophy className="w-5 h-5 text-amber-500" />}
          variant="default"
          caption="Promotion based on qualifying monthly commission"
        />
      </div>

      {/* REVENUE AREA CHART & LEAD FUNNEL BAR CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Revenue & Commission Trend */}
        <Card variant="bento" className="lg:col-span-7 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Monthly Commission & Funded Volume Trend
              </h3>
              <p className="text-xs text-slate-500">Trailing 6-month earnings acceleration.</p>
            </div>
            <Badge variant="emerald" size="sm">
              +$14.2k Monthly
            </Badge>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorComm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(val) => `$${val / 1000}k`} />
                <RechartsTooltip
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                  contentStyle={{
                    backgroundColor: '#0D1E36',
                    borderRadius: '10px',
                    border: '1px solid #1E3A5F',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="commission"
                  name="Commission Earned"
                  stroke="#10B981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorComm)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 2: Lead Funnel Stage Distribution */}
        <Card variant="bento" className="lg:col-span-5 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Lead Conversion Funnel
              </h3>
              <p className="text-xs text-slate-500">24 active leads across 5 stages.</p>
            </div>
            <Badge variant="navy" size="sm">
              Active Pipeline
            </Badge>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis type="number" stroke="#94A3B8" fontSize={11} />
                <YAxis type="category" dataKey="stage" stroke="#94A3B8" fontSize={11} />
                <RechartsTooltip
                  formatter={(val: any) => [`${val} Leads`, 'Stage Count']}
                  contentStyle={{
                    backgroundColor: '#0D1E36',
                    borderRadius: '10px',
                    border: '1px solid #1E3A5F',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" name="Leads" fill="#2563EB" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* LEADERBOARD WIDGET & NEXT PROMOTION CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* TOP 5 LEADERBOARD WIDGET */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>National Sales Rep Leaderboard (Q4)</span>
            </h3>
            <button
              onClick={() => setLeaderboardDrawerOpen(true)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View Top 10</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <Card variant="bento" className="divide-y divide-slate-100 dark:divide-[#1E3A5F] p-2">
            {leaderboard.slice(0, 5).map((rep) => (
              <div
                key={rep.rank}
                className={`p-3.5 rounded-xl flex items-center justify-between gap-3 transition-colors ${
                  rep.isYou
                    ? 'bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900'
                    : 'hover:bg-slate-50 dark:hover:bg-[#12294A]/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      rep.rank === 1
                        ? 'bg-amber-400 text-slate-900 shadow-md'
                        : rep.rank === 2
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    #{rep.rank}
                  </span>
                  <Avatar src={rep.avatar} name={rep.name} size="sm" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {rep.name} {rep.isYou && <span className="text-[10px] text-blue-600 font-extrabold">(YOU)</span>}
                    </p>
                    <p className="text-[11px] text-slate-500">{rep.deals} Deals Funded</p>
                  </div>
                </div>

                <span className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400 shrink-0">
                  {rep.volume}
                </span>
              </div>
            ))}
          </Card>
        </div>

        {/* NEXT PROMOTION CARD WITH PROGRESS RING */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              Next Promotion Progress
            </h3>
            <button
              onClick={() => setRoadmapOpen(true)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Rank Roadmap
            </button>
          </div>

          <Card variant="bento" className="p-5 space-y-4 bg-gradient-to-br from-amber-50/50 to-orange-50/20 dark:from-amber-950/20 dark:to-[#0D1E36] border-amber-200 dark:border-amber-900/40">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  Current: {currentRank.title}
                </span>
                <h4 className="text-base font-extrabold font-heading text-slate-900 dark:text-white mt-0.5">
                  Target: {nextRank.title}
                </h4>
              </div>
              <Badge variant="gold" size="md">
                Rank {nextRank.level}
              </Badge>
            </div>

            {/* Circular Progress Ring */}
            <div className="flex items-center gap-4 pt-2">
              <div className="relative w-20 h-20 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-amber-200 dark:text-amber-950"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-amber-500"
                    strokeDasharray="75, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-extrabold text-sm text-slate-900 dark:text-white">
                  75%
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Personal Vol: $610k / $600k (Achieved)</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-semibold">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Team Vol: $1.11M / $1.20M ($90k left)</span>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Unlocks {nextRank.commissionTier} + Regional Leader Override.
                </p>
              </div>
            </div>

            <Button
              variant="accent"
              size="sm"
              onClick={() => setRoadmapOpen(true)}
              rightIcon={<ChevronRight className="w-4 h-4" />}
              className="w-full justify-center text-xs"
            >
              View Full Promotion Roadmap
            </Button>
          </Card>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* IN-PLACE MODAL 1: ADD NEW LEAD MODAL */}
      {/* ========================================================================= */}
      <Modal
        isOpen={addLeadOpen}
        onClose={() => setAddLeadOpen(false)}
        title="Quick Add Lead to Pipeline"
        description="Capture a new commercial business prospect directly into your B4B Coach CRM."
        maxWidth="md"
      >
        <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label="Contact Person Name" required>
              <Input
                placeholder="e.g. Marcus Vance"
                value={leadForm.name}
                onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                required
              />
            </FormField>

            <FormField label="Company Name" required>
              <Input
                placeholder="e.g. Apex Freight Logistics"
                value={leadForm.company}
                onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                required
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label="Email Address">
              <Input
                type="email"
                placeholder="contact@company.com"
                value={leadForm.email}
                onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
              />
            </FormField>

            <FormField label="Phone Number">
              <Input
                placeholder="+1 (555) 000-0000"
                value={leadForm.phone}
                onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label="Estimated Facility Amount ($)" required>
              <Input
                type="number"
                placeholder="350000"
                value={leadForm.dealValue}
                onChange={(e) => setLeadForm({ ...leadForm, dealValue: e.target.value })}
                required
              />
            </FormField>

            <FormField label="Pipeline Initial Stage">
              <Select
                value={leadForm.stage}
                onChange={(e) => setLeadForm({ ...leadForm, stage: e.target.value })}
                options={[
                  { value: 'New', label: 'New Lead' },
                  { value: 'Contacted', label: 'Contacted' },
                  { value: 'Qualified', label: 'Qualified Prospect' },
                  { value: 'Proposal', label: 'Proposal Sent' },
                ]}
              />
            </FormField>
          </div>

          <FormField label="Internal Notes & Facility Needs">
            <Input
              placeholder="e.g. Needs $350k working capital revolver for inventory expansion..."
              value={leadForm.notes}
              onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
            />
          </FormField>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setAddLeadOpen(false)}>
              Cancel
            </Button>
            <Button variant="accent" size="sm" type="submit" leftIcon={<Send className="w-3.5 h-3.5" />}>
              Save to Pipeline
            </Button>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* IN-PLACE MODAL 2: AI CAMPAIGN COPY GENERATOR */}
      {/* ========================================================================= */}
      <Modal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        title="AI Campaign & Outreach Generator"
        description="Instantly generate tailored email and LinkedIn copy for your commercial outreach."
        maxWidth="lg"
      >
        <div className="space-y-4 text-xs text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label="Target Industry">
              <Select
                value={aiIndustry}
                onChange={(e) => setAiIndustry(e.target.value)}
                options={[
                  { value: 'Logistics & Freight', label: 'Logistics & Freight' },
                  { value: 'Healthcare & Medical', label: 'Healthcare & Medical' },
                  { value: 'Construction & Contracting', label: 'Construction & Contracting' },
                  { value: 'E-Commerce & Retail', label: 'E-Commerce & Retail' },
                  { value: 'Manufacturing & Distribution', label: 'Manufacturing & Distribution' },
                ]}
              />
            </FormField>

            <FormField label="Outreach Tone">
              <Select
                value={aiTone}
                onChange={(e: any) => setAiTone(e.target.value)}
                options={[
                  { value: 'Executive', label: 'Executive & Authoritative' },
                  { value: 'Urgent', label: 'Urgent & Opportunity-Driven' },
                  { value: 'Consultative', label: 'Consultative Advisory' },
                ]}
              />
            </FormField>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 dark:text-slate-300">Generated Outreach Copy:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyAi}
                leftIcon={copiedAi ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              >
                {copiedAi ? 'Copied!' : 'Copy to Clipboard'}
              </Button>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto border border-slate-700">
              {generatedCopy}
            </pre>
          </div>
        </div>
      </Modal>

      {/* ========================================================================= */}
      {/* IN-PLACE MODAL 3: RANK PROMOTION ROADMAP */}
      {/* ========================================================================= */}
      <Modal
        isOpen={roadmapOpen}
        onClose={() => setRoadmapOpen(false)}
        title="B4B Coach 9-Rank Compensation & Promotion Matrix"
        description="Official client commission structure, monthly promotion rules, direct/group overrides, and perks."
        maxWidth="xl"
      >
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {BIZPRO_RANKS.map((r) => {
              const isCurrent = r.level === currentRank.level
              const isPassed = r.level < currentRank.level

              return (
                <div
                  key={r.level}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-blue-50/90 dark:bg-blue-950/60 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                      : isPassed
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                      : 'bg-slate-50 dark:bg-[#12294A] border-slate-200 dark:border-[#1E3A5F]'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Badge variant={isCurrent ? 'primary' : isPassed ? 'emerald' : 'navy'} size="sm">
                        Rank {r.level}
                      </Badge>
                      {isCurrent && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-blue-600 text-white">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                      {r.commissionTier}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-2">{r.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{r.promotionCriteria}</p>

                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Monthly Target:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{r.monthlyCommissionRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Annual Potential:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{r.yearlyIncomeRange}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Modal>

      {/* ========================================================================= */}
      {/* IN-PLACE DRAWER 1: FULL LEADERBOARD DRAWER */}
      {/* ========================================================================= */}
      <Drawer
        isOpen={leaderboardDrawerOpen}
        onClose={() => setLeaderboardDrawerOpen(false)}
        title="National Sales Rep Leaderboard (Top 10)"
        size="md"
      >
        <div className="space-y-3 text-xs text-left">
          <p className="text-slate-500 text-xs">
            Live rankings across all 12 Federal Reserve Districts for Q4 performance cycle.
          </p>

          <div className="divide-y divide-slate-100 dark:divide-[#1E3A5F]">
            {leaderboard.map((rep) => (
              <div
                key={rep.rank}
                className={`p-3 rounded-xl flex items-center justify-between gap-3 ${
                  rep.isYou
                    ? 'bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900'
                    : 'hover:bg-slate-50 dark:hover:bg-[#12294A]/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      rep.rank === 1
                        ? 'bg-amber-400 text-slate-900'
                        : rep.rank === 2
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    #{rep.rank}
                  </span>
                  <Avatar src={rep.avatar} name={rep.name} size="sm" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {rep.name} {rep.isYou && <span className="text-[10px] text-blue-600 font-extrabold">(YOU)</span>}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">{rep.district} • {rep.deals} Deals</p>
                  </div>
                </div>

                <span className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400 shrink-0">
                  {rep.volume}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  )
}
