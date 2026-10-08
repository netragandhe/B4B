import React, { useState } from 'react'
import {
  DollarSign,
  TrendingUp,
  Download,
  Calendar,
  CreditCard,
  Building,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileText,
  AlertCircle,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StatCard } from '@/components/ui/StatCard'
import { CountUp } from '@/components/ui/CountUp'
import { Modal } from '@/components/ui/Modal'
import { SEOHead } from '@/components/seo/SEOHead'
import { PageTransition } from '@/components/animations/PageTransition'
import { PageLoadingFallback } from '@/components/ui/PageLoadingFallback'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import {
  useCommissions,
  useAffiliateMetrics,
  useRequestPayout,
  usePartnerProfile,
} from '@/hooks/queries/useAffiliateData'
import { useToast } from '@/components/ui/Toast'
import { formatCurrency } from '@/lib/utils'

export const CommissionsPage: React.FC = () => {
  const { toast } = useToast()
  const { data: commissions, isLoading, isError, refetch } = useCommissions()
  const { data: metrics } = useAffiliateMetrics()
  const { data: profile } = usePartnerProfile()
  const { mutate: requestPayout, isPending: isRequesting } = useRequestPayout()

  const [payoutModalOpen, setPayoutModalOpen] = useState(false)

  const handleExecutePayout = () => {
    requestPayout(undefined, {
      onSuccess: () => {
        setPayoutModalOpen(false)
        toast({
          title: 'Payout Request Transmitted',
          description: `Disbursement of ${formatCurrency(metrics?.pendingPayout || 4350)} initiated to your verified Chase business checking.`,
          type: 'success',
        })
      },
      onError: (err: any) => {
        toast({
          title: 'Payout Failed',
          description: err.message || 'Unable to disburse funds at this moment.',
          type: 'error',
        })
      },
    })
  }

  const handleDownloadStatement = (refNum: string) => {
    toast({
      title: 'Downloading Statement',
      description: `Statement ${refNum} generated in PDF format.`,
      type: 'info',
    })
  }

  if (isLoading) return <PageLoadingFallback />
  if (isError) {
    return (
      <ErrorState
        title="Could not load commissions & payouts"
        message="Unable to fetch payment logs and settlement batches."
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <PageTransition>
      <div className="space-y-8 text-left">
        <SEOHead
          title="Commissions & Payouts | OAL Partner Hub"
          description="View accrued commission balances, payout schedules, and ACH direct deposit statements."
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                Commissions & Payouts
              </h1>
              <Badge variant="emerald" size="sm">
                Bi-Weekly Direct Deposit
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Automated ACH disbursements, tax summaries, and itemized deal reconciliation.
            </p>
          </div>

          <Button
            variant="accent"
            size="md"
            onClick={() => setPayoutModalOpen(true)}
            disabled={(metrics?.pendingPayout || 0) <= 0}
            leftIcon={<DollarSign className="w-4 h-4" />}
            className="font-bold shadow-md shadow-emerald-500/20 shrink-0"
          >
            Request Instant Payout
          </Button>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Available to Disburse"
            value={<CountUp value={metrics?.pendingPayout || 4350} prefix="$" />}
            icon={<DollarSign className="w-5 h-5" />}
            variant="emerald"
            caption="Direct deposit ready (0% fee)"
          />

          <StatCard
            title="Lifetime Paid to Date"
            value={<CountUp value={metrics?.paidOut || 20500} prefix="$" />}
            icon={<TrendingUp className="w-5 h-5" />}
            variant="royal"
            caption="Across 38 funded deals"
          />

          <StatCard
            title="Next Scheduled Batch"
            value="Oct 15, 2026"
            icon={<Calendar className="w-5 h-5 text-amber-500" />}
            variant="gold"
            caption="Automated bi-weekly cycle"
          />
        </div>

        {/* Verified Payout Account & Schedule Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card variant="bento" className="lg:col-span-6 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white uppercase tracking-wider">
                Verified Payout Method
              </h3>
              <Badge variant="emerald" size="sm" dot>
                Active ACH
              </Badge>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {profile?.payoutMethod.bankName || 'JPMorgan Chase Business Premier'}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-mono">
                    Routing: ••• {profile?.payoutMethod.routingEnding || '0421'} • Account: •••{' '}
                    {profile?.payoutMethod.accountEnding || '9184'}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                Primary
              </span>
            </div>

            <div className="text-[11px] text-slate-500 space-y-1">
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Tax Status: <strong>{profile?.taxFormStatus || 'W-9 Verified (2026)'}</strong></span>
              </p>
              <p>Direct ACH transfers post within 1-2 business days with zero deduction.</p>
            </div>
          </Card>

          <Card variant="bento" className="lg:col-span-6 p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white uppercase tracking-wider">
              Payout Policy & Commission Tiers
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Bi-Weekly Settlement:</strong> Commissions for funded loans and services close on the 15th and end of each month.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Instant Draw Option:</strong> Platinum partners can trigger on-demand disbursements anytime for balances above $500.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Tier Bonus:</strong> You are receiving a <strong>25% Platinum commission boost</strong> on all funded referrals.
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Payout History Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              Payout & Settlement History
            </h3>
            <span className="text-xs text-slate-500">
              {(commissions || []).length} Recorded Batches
            </span>
          </div>

          {(!commissions || commissions.length === 0) ? (
            <EmptyState
              icon={<DollarSign className="w-8 h-8 text-blue-500" />}
              title="No payout history"
              description="Your disbursements will appear here once referrals are funded."
            />
          ) : (
            <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-[#1E3A5F]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 dark:bg-[#12294A]/80 border-b border-slate-200 dark:border-[#1E3A5F] text-slate-500 font-bold uppercase text-[10px] tracking-wider select-none">
                    <tr>
                      <th className="py-3 px-4">Period</th>
                      <th className="py-3 px-4">Disbursement Date</th>
                      <th className="py-3 px-4">Reference #</th>
                      <th className="py-3 px-4">Method</th>
                      <th className="py-3 px-4">Deals</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Statement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#1E3A5F]/70">
                    {commissions.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/70 dark:hover:bg-[#12294A]/40 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                          {item.payoutPeriod}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                          {item.payoutDate}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                          {item.referenceNumber}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                          {item.payoutMethod}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                          {item.dealsIncludedCount} Funded
                        </td>
                        <td className="py-3.5 px-4 font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                          {formatCurrency(item.amount)}
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge
                            variant={item.status === 'Completed' ? 'emerald' : 'gold'}
                            size="sm"
                            dot
                          >
                            {item.status}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDownloadStatement(item.referenceNumber)}
                            leftIcon={<Download className="w-3.5 h-3.5" />}
                            className="h-7 text-xs font-semibold"
                          >
                            PDF
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>

        {/* Modal: Request Payout Confirmation */}
        <Modal
          isOpen={payoutModalOpen}
          onClose={() => setPayoutModalOpen(false)}
          title="Confirm Direct Deposit Payout"
          description="Initiate an automated wire/ACH transfer of your ready accrued balance."
          maxWidth="md"
        >
          <div className="space-y-4 text-left text-xs">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
              <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider">
                Payout Amount
              </span>
              <div className="text-3xl font-extrabold font-heading text-emerald-700 dark:text-emerald-300">
                {formatCurrency(metrics?.pendingPayout || 4350)}
              </div>
            </div>

            <div className="space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F]">
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">Chase (••• 9184)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transfer Time:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">Next Business Day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Wire / ACH Fee:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Waived ($0.00)</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <Button variant="outline" size="sm" onClick={() => setPayoutModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="accent"
                size="sm"
                onClick={handleExecutePayout}
                isLoading={isRequesting}
                className="font-bold"
              >
                Confirm & Disburse Now
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </PageTransition>
  )
}
