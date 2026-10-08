import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DollarSign,
  TrendingUp,
  MousePointerClick,
  UserCheck,
  CheckCircle2,
  ArrowUpRight,
  PlusCircle,
  Copy,
  Check,
  QrCode,
  Calendar,
  Sparkles,
  Layers,
  ArrowRight,
  RefreshCw,
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
  Legend,
} from 'recharts'
import { StatCard } from '@/components/ui/StatCard'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CountUp } from '@/components/ui/CountUp'
import { Modal } from '@/components/ui/Modal'
import { SEOHead } from '@/components/seo/SEOHead'
import { PageTransition } from '@/components/animations/PageTransition'
import { QrCodeGenerator } from '@/components/qr/QrCodeGenerator'
import { PageLoadingFallback } from '@/components/ui/PageLoadingFallback'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import {
  useAffiliateMetrics,
  useAffiliatePerformance,
  useAffiliateLinks,
  useReferrals,
  useRequestPayout,
} from '@/hooks/queries/useAffiliateData'
import { useToast } from '@/components/ui/Toast'
import { formatCurrency } from '@/lib/utils'

export const AffiliateDashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const {
    data: metrics,
    isLoading: metricsLoading,
    isError: metricsError,
    refetch: refetchMetrics,
  } = useAffiliateMetrics()

  const {
    data: performance,
    isLoading: perfLoading,
    isError: perfError,
  } = useAffiliatePerformance()

  const { data: links, isLoading: linksLoading } = useAffiliateLinks()
  const { data: referrals, isLoading: refsLoading } = useReferrals()

  const { mutate: requestPayout, isPending: isPayoutRequesting } = useRequestPayout()

  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [selectedLinkForQr, setSelectedLinkForQr] = useState<string>('https://oalnetwork.com/?ref=alex_vance')
  const [copiedLink, setCopiedLink] = useState(false)

  const handleCopyMainLink = async () => {
    const mainUrl = links?.[0]?.targetUrl || 'https://oalnetwork.com/?ref=alex_vance'
    try {
      await navigator.clipboard.writeText(mainUrl)
      setCopiedLink(true)
      toast({
        title: 'Primary Link Copied',
        description: 'Referral URL copied to clipboard with your partner tracking code.',
        type: 'success',
      })
      setTimeout(() => setCopiedLink(false), 2000)
    } catch {
      toast({ title: 'Copy Failed', description: 'Could not access clipboard.', type: 'error' })
    }
  }

  const handleExecutePayout = () => {
    requestPayout(undefined, {
      onSuccess: () => {
        toast({
          title: 'Direct Deposit Initialized',
          description: 'Your balance payout has been queued for next business day deposit.',
          type: 'success',
        })
      },
      onError: (err: any) => {
        toast({
          title: 'Payout Failed',
          description: err.message || 'Unable to request payout at this time.',
          type: 'error',
        })
      },
    })
  }

  if (metricsLoading || perfLoading) {
    return <PageLoadingFallback />
  }

  if (metricsError || perfError) {
    return (
      <ErrorState
        title="Unable to load Partner Dashboard"
        message="Could not retrieve affiliate metrics and monthly performance stats. Please retry."
        onRetry={() => {
          refetchMetrics()
        }}
      />
    )
  }

  const mainLink = links?.[0] || {
    title: 'Primary Small Business Ecosystem Hub',
    targetUrl: 'https://oalnetwork.com/?ref=alex_vance',
    shortUrl: 'https://oal.link/alex-hub',
    slug: 'alex-hub',
  }

  return (
    <PageTransition>
      <div className="space-y-8 text-left">
        <SEOHead
          title="Partner Dashboard | OAL Network"
          description="Track affiliate clicks, leads, commissions, and revenue growth in real-time."
        />

        {/* Top Welcome Header & Quick Action CTAs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                Partner Dashboard
              </h1>
              <Badge variant="gold" size="sm">
                Platinum Tier (25% Boost)
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Real-time lead attribution, conversions, and direct deposit earnings overview.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedLinkForQr(mainLink.targetUrl)
                setQrModalOpen(true)
              }}
              leftIcon={<QrCode className="w-3.5 h-3.5 text-blue-500" />}
            >
              My QR Code
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/portal/affiliate/links')}
              leftIcon={<Layers className="w-3.5 h-3.5" />}
            >
              Unique Links ({metrics?.activeLinksCount || 6})
            </Button>

            <Button
              variant="accent"
              size="sm"
              onClick={() => navigate('/portal/affiliate/submit-lead')}
              leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
              className="shadow-sm shadow-emerald-500/20"
            >
              Submit Lead
            </Button>
          </div>
        </div>

        {/* Hero Quick Link Strip */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-[#0A1628] text-white border border-blue-800/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left min-w-0">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Default Master Referral Link
              </span>
              <span className="text-xs text-slate-300 hidden sm:inline">• 60-Day Cookie Window</span>
            </div>
            <p className="text-xs font-mono text-blue-200 truncate max-w-xl">
              {mainLink.shortUrl}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyMainLink}
              leftIcon={copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs font-bold"
            >
              {copiedLink ? 'Copied to Clipboard' : 'Copy Primary Link'}
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setSelectedLinkForQr(mainLink.targetUrl)
                setQrModalOpen(true)
              }}
              className="text-white hover:bg-white/10 text-xs"
              leftIcon={<QrCode className="w-3.5 h-3.5" />}
            >
              QR Code
            </Button>
          </div>
        </div>

        {/* KPI StatCards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Commissions Earned"
            value={<CountUp value={metrics?.totalEarnings || 24850} prefix="$" />}
            change={metrics?.earningsGrowth || 18.4}
            changePeriod="vs last month"
            icon={<DollarSign className="w-5 h-5" />}
            variant="royal"
            caption={`Paid: ${formatCurrency(metrics?.paidOut || 20500)}`}
          />

          <StatCard
            title="Ready for Payout"
            value={<CountUp value={metrics?.pendingPayout || 4350} prefix="$" />}
            change={12.5}
            changePeriod="accrued balance"
            icon={<TrendingUp className="w-5 h-5" />}
            variant="emerald"
            caption="Direct deposit ready"
          />

          <StatCard
            title="Total Referral Clicks"
            value={<CountUp value={metrics?.totalClicks || 18420} />}
            change={metrics?.clicksGrowth || 22.8}
            changePeriod="monthly traffic"
            icon={<MousePointerClick className="w-5 h-5" />}
            variant="default"
            caption={`EPC: $${metrics?.epc || 1.35} per click`}
          />

          <StatCard
            title="Funded Deals / Leads"
            value={`${metrics?.fundedDeals || 38} / ${metrics?.totalLeads || 342}`}
            change={metrics?.conversionRate || 11.1}
            changePeriod="Lead Conversion Rate"
            icon={<UserCheck className="w-5 h-5 text-amber-500" />}
            variant="gold"
            caption="11.1% high-intent pull-through"
          />
        </div>

        {/* Charts & Analytics Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 1: Monthly Commission Earnings & Deal Volume */}
          <Card variant="bento" className="lg:col-span-8 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                  Monthly Performance & Commission Revenue
                </h3>
                <p className="text-xs text-slate-500">
                  Tracking growth across clicks, submitted leads, and funded deal payouts.
                </p>
              </div>
              <Badge variant="emerald" size="sm">
                +18.4% Revenue Run-Rate
              </Badge>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performance || []} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                  <YAxis
                    stroke="#94A3B8"
                    fontSize={11}
                    tickFormatter={(val) => `$${val / 1000}k`}
                  />
                  <RechartsTooltip
                    formatter={(value: any, name: any) => [
                      name === 'earnings' ? `$${Number(value).toLocaleString()}` : value,
                      name === 'earnings' ? 'Earnings' : 'Leads Generated',
                    ]}
                    contentStyle={{
                      backgroundColor: '#0D1E36',
                      borderRadius: '10px',
                      border: '1px solid #1E3A5F',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Area
                    type="monotone"
                    dataKey="earnings"
                    name="Commission Earnings ($)"
                    stroke="#10B981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorEarnings)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Quick Payout & Balance Card */}
          <Card variant="bento" className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Accrued Balance
                </span>
                <Badge variant="emerald" size="sm" dot>
                  ACH Direct Ready
                </Badge>
              </div>

              <div className="mt-3">
                <div className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                  {formatCurrency(metrics?.pendingPayout || 4350)}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Next automated cycle: <strong>Oct 15, 2026</strong>
                </p>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Destination Account:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">Chase (••• 9184)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tax Withholding:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">W-9 Exempt ($0)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Processing Fee:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Free ($0.00)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Button
                variant="accent"
                className="w-full text-xs font-bold h-10"
                onClick={handleExecutePayout}
                isLoading={isPayoutRequesting}
                disabled={(metrics?.pendingPayout || 0) <= 0}
              >
                Request Instant ACH Payout
              </Button>
              <Link
                to="/portal/affiliate/commissions"
                className="text-[11px] text-center block text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                View Payout History & Invoices →
              </Link>
            </div>
          </Card>
        </div>

        {/* Top Links & Recent Referrals Double Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Top-Performing Links Widget */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Top Performing Links
              </h3>
              <Link
                to="/portal/affiliate/links"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Manage all links</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {(links || []).slice(0, 3).map((l) => (
                <Card
                  key={l.id}
                  variant="default"
                  className="p-3.5 flex items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {l.title}
                      </span>
                      <Badge variant="royal" size="sm" className="text-[10px]">
                        {l.category}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-blue-600 dark:text-blue-400 font-mono mt-0.5 truncate">
                      {l.shortUrl}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                      <span>{l.clicks.toLocaleString()} clicks</span>
                      <span>•</span>
                      <span>{l.leads} leads</span>
                      <span>•</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(l.earnings)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText(l.targetUrl)
                        toast({ title: 'Link Copied', description: `${l.title} URL copied.`, type: 'success' })
                      }}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                      title="Copy link"
                      aria-label={`Copy link for ${l.title}`}
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedLinkForQr(l.targetUrl)
                        setQrModalOpen(true)
                      }}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                      title="View QR Code"
                      aria-label={`View QR code for ${l.title}`}
                    >
                      <QrCode className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Referrals Widget */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Recent Referral Activity
              </h3>
              <Link
                to="/portal/affiliate/referrals"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Full referrals table</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {(referrals || []).slice(0, 3).map((ref) => (
                <Card
                  key={ref.id}
                  variant="default"
                  className="p-3.5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {ref.companyName}
                        </span>
                        <Badge
                          variant={
                            ref.status === 'Funded' || ref.status === 'Paid Out'
                              ? 'emerald'
                              : ref.status === 'Pre-Approved'
                              ? 'gold'
                              : 'primary'
                          }
                          size="sm"
                        >
                          {ref.status}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {ref.solutionNeeded} • Contact: {ref.contactName}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(ref.commissionEarned)}
                      </span>
                      <p className="text-[10px] text-slate-400">{ref.submissionDate}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* QR Code Inspection Modal */}
        <Modal
          isOpen={qrModalOpen}
          onClose={() => setQrModalOpen(false)}
          title="Dynamic Partner QR Code"
          description="High-resolution QR code generator with live vector SVG and PNG download."
          maxWidth="md"
        >
          <div className="flex justify-center py-2">
            <QrCodeGenerator url={selectedLinkForQr} />
          </div>
        </Modal>
      </div>
    </PageTransition>
  )
}
