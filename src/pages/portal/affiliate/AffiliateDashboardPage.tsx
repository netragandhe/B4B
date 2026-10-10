import React, { useState } from 'react'
import {
  Share2,
  MousePointerClick,
  Users,
  TrendingUp,
  DollarSign,
  Copy,
  Check,
  QrCode,
  ArrowUpRight,
  Sparkles,
  Zap,
  Send,
  Download,
  Building,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
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
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { FormField } from '@/components/ui/FormField'
import { CountUp } from '@/components/ui/CountUp'
import { useToast } from '@/components/ui/Toast'
import { PartnerType, MOCK_TRACKING_LINKS } from '@/mock-data/affiliateData'
import { formatCurrency } from '@/lib/utils'

export const AffiliateDashboardPage: React.FC = () => {
  const { toast } = useToast()

  const [copied, setCopied] = useState(false)
  const [partnerType, setPartnerType] = useState<PartnerType>('Affiliate')

  // In-Place Modals States
  const [submitLeadOpen, setSubmitLeadOpen] = useState(false)
  const [qrModalOpen, setQrModalOpen] = useState(false)

  // Direct Lead Form State
  const [leadForm, setLeadForm] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    estimatedVolume: '350000',
    serviceNeeded: 'Revenue-Based Working Capital Line',
    notes: '',
  })

  const topLink = MOCK_TRACKING_LINKS[0]

  const chartData = [
    { month: 'May', clicks: 420, volume: 180 },
    { month: 'Jun', clicks: 680, volume: 320 },
    { month: 'Jul', clicks: 890, volume: 450 },
    { month: 'Aug', clicks: 1100, volume: 620 },
    { month: 'Sep', clicks: 1280, volume: 890 },
    { month: 'Oct', clicks: 1420, volume: 1150 },
  ]

  const handleCopyTopLink = () => {
    navigator.clipboard.writeText(topLink.url)
    setCopied(true)
    toast({
      title: 'Tracking Link Copied!',
      description: 'Primary referral URL copied to clipboard.',
      type: 'success',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitLeadOpen(false)
    toast({
      title: 'Direct Referral Submitted',
      description: `${leadForm.contactName} (${leadForm.businessName}) has been routed to the senior B4B underwriting desk under your referral ID.`,
      type: 'success',
    })
    setLeadForm({
      businessName: '',
      contactName: '',
      email: '',
      phone: '',
      estimatedVolume: '350000',
      serviceNeeded: 'Revenue-Based Working Capital Line',
      notes: '',
    })
  }

  // Adaptive content based on Partner Type
  const adaptiveHeadlines: Record<PartnerType, { title: string; subtitle: string; badge: string }> = {
    Affiliate: {
      title: 'Affiliate Partner Growth Dashboard',
      subtitle: 'Track digital referral traffic, link click-through rates, and automated commission payouts.',
      badge: 'Tier-1 Affiliate Channel',
    },
    Partner: {
      title: 'Strategic Channel Partner Control Center',
      subtitle: 'Monitor enterprise client introductions, co-branded financing facilities, and revenue share.',
      badge: 'Strategic Enterprise Partner',
    },
    Influencer: {
      title: 'Creator & Influencer Audience Monetization',
      subtitle: 'Capitalize on social audience engagement, promo link clicks, and high-payout conversions.',
      badge: 'Certified Creator Partner',
    },
  }

  const currentAdaptive = adaptiveHeadlines[partnerType]

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title={currentAdaptive.title}
        description={currentAdaptive.subtitle}
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'Affiliate Dashboard' }]}
        badge={
          <Badge variant="gold" size="md">
            {currentAdaptive.badge}
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            {/* Quick Type Selector for Previewing Adaptive UI */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
              {(['Affiliate', 'Partner', 'Influencer'] as PartnerType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setPartnerType(t)}
                  className={`px-2 py-1 rounded font-bold transition-all ${
                    partnerType === t ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <Button
              variant="accent"
              size="sm"
              onClick={() => setSubmitLeadOpen(true)}
              leftIcon={<Share2 className="w-3.5 h-3.5" />}
            >
              Submit Direct Lead
            </Button>
          </div>
        }
      />

      {/* TOP PERFORMING TRACKING LINK BANNER */}
      <Card variant="bento" className="p-4 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border-0 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{topLink.name}</span>
                <Badge variant="emerald" size="sm">
                  Top Performing Link
                </Badge>
              </div>
              <div className="text-xs text-blue-300 font-mono mt-0.5">{topLink.url}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQrModalOpen(true)}
              leftIcon={<QrCode className="w-3.5 h-3.5 text-white" />}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              QR Code
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={handleCopyTopLink}
              leftIcon={copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              className="bg-blue-600 hover:bg-blue-500 text-white"
            >
              {copied ? 'Copied' : 'Copy Link'}
            </Button>
          </div>
        </div>
      </Card>

      {/* 4 STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Referral Clicks"
          value={<CountUp value={5890} />}
          change={18.2}
          changePeriod="vs last month"
          icon={<MousePointerClick className="w-5 h-5 text-blue-500" />}
          variant="royal"
          caption="Conversion rate: 4.8%"
        />

        <StatCard
          title="Qualified Introductions"
          value="42 Leads"
          change={14.0}
          changePeriod="+6 new this cycle"
          icon={<Users className="w-5 h-5 text-emerald-500" />}
          variant="emerald"
          caption="18 in active underwriting"
        />

        <StatCard
          title="Funded Deal Volume"
          value={<CountUp value={3850000} prefix="$" />}
          change={28.5}
          changePeriod="YTD funded client volume"
          icon={<TrendingUp className="w-5 h-5 text-purple-500" />}
          variant="gold"
          caption="12 closed transactions"
        />

        <StatCard
          title="Total Commission Earned"
          value={<CountUp value={48250} prefix="$" />}
          change={22.4}
          changePeriod="Disbursed on 1st & 15th"
          icon={<DollarSign className="w-5 h-5 text-amber-500" />}
          variant="default"
          caption="Avg $3,800 payout per funded deal"
        />
      </div>

      {/* REFERRAL TRAFFIC AREA CHART */}
      <Card variant="bento" className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              Referral Traffic & Funded Volume Growth ($k)
            </h3>
            <p className="text-xs text-slate-500">Trailing 6-month partner trajectory.</p>
          </div>
          <Badge variant="emerald" size="sm">
            +$1.15M Oct Volume
          </Badge>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(val) => `$${val}k`} />
              <RechartsTooltip
                formatter={(val: any) => [`$${Number(val).toLocaleString()}k`, 'Funded Volume']}
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
                dataKey="volume"
                name="Volume"
                stroke="#3B82F6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorVol)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* ========================================================================= */}
      {/* IN-PLACE MODAL 1: SUBMIT DIRECT LEAD */}
      {/* ========================================================================= */}
      <Modal
        isOpen={submitLeadOpen}
        onClose={() => setSubmitLeadOpen(false)}
        title="Submit Direct Referral Lead"
        description="Introduce a client directly to B4B senior commercial underwriting."
        maxWidth="md"
      >
        <form onSubmit={handleSubmitLead} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label="Business Name" required>
              <Input
                placeholder="e.g. Metro Distribution LLC"
                value={leadForm.businessName}
                onChange={(e) => setLeadForm({ ...leadForm, businessName: e.target.value })}
                required
              />
            </FormField>

            <FormField label="Principal / Owner Name" required>
              <Input
                placeholder="e.g. Robert Smith"
                value={leadForm.contactName}
                onChange={(e) => setLeadForm({ ...leadForm, contactName: e.target.value })}
                required
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label="Email Address" required>
              <Input
                type="email"
                placeholder="rsmith@metrodist.com"
                value={leadForm.email}
                onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                required
              />
            </FormField>

            <FormField label="Direct Phone" required>
              <Input
                placeholder="+1 (555) 789-0123"
                value={leadForm.phone}
                onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                required
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label="Estimated Funding Volume ($)" required>
              <Input
                type="number"
                value={leadForm.estimatedVolume}
                onChange={(e) => setLeadForm({ ...leadForm, estimatedVolume: e.target.value })}
                required
              />
            </FormField>

            <FormField label="Solution In Demand">
              <Select
                value={leadForm.serviceNeeded}
                onChange={(e) => setLeadForm({ ...leadForm, serviceNeeded: e.target.value })}
                options={[
                  { value: 'Revenue-Based Working Capital Line', label: 'Revenue-Based Working Capital Line' },
                  { value: 'Commercial Equipment Financing', label: 'Commercial Equipment Financing' },
                  { value: 'SBA 7(a) Guarantee Bridge', label: 'SBA 7(a) Guarantee Bridge' },
                  { value: 'Fractional CFO Advisory Retainer', label: 'Fractional CFO Advisory Retainer' },
                ]}
              />
            </FormField>
          </div>

          <FormField label="Introduction Notes">
            <Input
              placeholder="e.g. Spoke with CFO, looking for credit facility to purchase 3 new trucks..."
              value={leadForm.notes}
              onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
            />
          </FormField>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setSubmitLeadOpen(false)}>
              Cancel
            </Button>
            <Button variant="accent" size="sm" type="submit" leftIcon={<Send className="w-3.5 h-3.5" />}>
              Submit Referral
            </Button>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* IN-PLACE MODAL 2: QR CODE */}
      {/* ========================================================================= */}
      <Modal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        title="High-Resolution QR Code"
        description="Scan with mobile camera or download for digital cards, brochures, and presentations."
        maxWidth="sm"
      >
        <div className="space-y-4 text-center">
          <div className="p-6 rounded-2xl bg-white text-slate-900 inline-block shadow-lg mx-auto border-4 border-blue-600">
            {/* SVG QR Code Simulation */}
            <div className="w-48 h-48 bg-slate-950 p-2 rounded-lg flex items-center justify-center">
              <QrCode className="w-40 h-40 text-white" />
            </div>
          </div>

          <div className="text-xs text-slate-500 font-mono break-all px-4">
            {topLink.url}
          </div>

          <Button
            variant="accent"
            size="sm"
            onClick={() => {
              setQrModalOpen(false)
              toast({ title: 'QR Code Downloaded', description: 'Saved as B4B_Referral_QR.png', type: 'success' })
            }}
            leftIcon={<Download className="w-3.5 h-3.5" />}
            className="w-full justify-center"
          >
            Download PNG (300 DPI)
          </Button>
        </div>
      </Modal>
    </div>
  )
}
