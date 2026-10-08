import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { CountUp } from '@/components/ui/CountUp'
import { useToast } from '@/components/ui/Toast'
import { PartnerType, MOCK_TRACKING_LINKS } from '@/mock-data/affiliateData'
import { formatCurrency } from '@/lib/utils'

export const AffiliateDashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [copied, setCopied] = useState(false)
  const [partnerType, setPartnerType] = useState<PartnerType>('Affiliate')

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
              onClick={() => navigate('/portal/affiliate/submit-lead')}
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
              size="sm"
              variant="outline"
              onClick={handleCopyTopLink}
              leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              className="text-xs border-slate-700 text-white hover:bg-slate-800"
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
            <Button
              size="sm"
              variant="accent"
              onClick={() => navigate('/portal/affiliate/links')}
              rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              All Unique Links
            </Button>
          </div>
        </div>
      </Card>

      {/* 4 STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Link Clicks"
          value={<CountUp value={1420} />}
          change={28.4}
          changePeriod="vs last month"
          icon={<MousePointerClick className="w-5 h-5 text-blue-500" />}
          variant="royal"
          caption="CTR average: 2.6%"
        />

        <StatCard
          title="Leads Submitted"
          value="38 Leads"
          change={14.0}
          changePeriod="+8 new this month"
          icon={<Users className="w-5 h-5 text-purple-500" />}
          variant="default"
          caption="Qualified referral pipeline"
        />

        <StatCard
          title="Conversions (Funded)"
          value="15 Deals"
          change={20.0}
          changePeriod="39.4% lead conversion"
          icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
          variant="emerald"
          caption="Funded client facilities"
        />

        <StatCard
          title="Total Earnings"
          value={<CountUp value={24500} prefix="$" />}
          change={32.1}
          changePeriod="Avg payout $1,633/deal"
          icon={<DollarSign className="w-5 h-5 text-amber-500" />}
          variant="gold"
          caption="Lifetime commission vault"
        />
      </div>

      {/* PERFORMANCE CHART & TOP CONVERSIONS CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trailing Performance Area Chart */}
        <Card variant="bento" className="lg:col-span-8 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Referral Clicks & Converted Volume Growth
              </h3>
              <p className="text-xs text-slate-500">Trailing 6-month audience traffic performance.</p>
            </div>
            <Badge variant="navy" size="sm">
              6 Month Trailing
            </Badge>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#0D1E36',
                    borderRadius: '10px',
                    border: '1px solid #1E3A5F',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="clicks" name="Link Clicks" stroke="#2563EB" strokeWidth={2} fill="url(#colorClicks)" />
                <Area type="monotone" dataKey="volume" name="Funded Vol ($k)" stroke="#10B981" strokeWidth={2} fill="url(#colorVolume)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Quick Actions & Adaptive Partner Perks */}
        <Card variant="default" className="lg:col-span-4 p-5 space-y-4 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-gold-500" />
              <span>Partner Channel Perks</span>
            </h3>
            <Badge variant="gold" size="sm">
              {partnerType}
            </Badge>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">Tier Commission Multiplier</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">1.5% Base + Tier Multiplier</div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">Dedicated Partner Manager</div>
              <div className="text-slate-600 dark:text-slate-400">Direct Slack & Phone Line for custom deals</div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/portal/affiliate/payouts')}
              className="w-full text-xs"
            >
              View Commission Vault & Payouts
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
