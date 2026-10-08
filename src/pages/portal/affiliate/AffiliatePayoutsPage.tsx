import React, { useState } from 'react'
import { Wallet, DollarSign, ArrowDownRight, Download, CheckCircle2, Clock, X, Send, ShieldCheck } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StatCard } from '@/components/ui/StatCard'
import { useToast } from '@/components/ui/Toast'
import { MOCK_PAYOUT_RECORDS, PayoutRecord } from '@/mock-data/affiliateData'
import { formatCurrency } from '@/lib/utils'
import { exportToCsv, exportToPdf } from '@/lib/exportUtils'
import { Can } from '@/components/auth/Can'

export const AffiliatePayoutsPage: React.FC = () => {
  const { toast } = useToast()

  const [payouts, setPayouts] = useState<PayoutRecord[]>(MOCK_PAYOUT_RECORDS)
  const [availableBalance, setAvailableBalance] = useState<number>(8750)
  const [pendingBalance, setPendingBalance] = useState<number>(12750)
  const [totalLifetime, setTotalLifetime] = useState<number>(41450)

  // Request Payout Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [requestAmount, setRequestAmount] = useState<number>(8750)
  const [payoutMethod, setPayoutMethod] = useState<'ACH Direct Deposit' | 'Wire Transfer' | 'PayPal'>('ACH Direct Deposit')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault()
    if (requestAmount > availableBalance) {
      toast({ title: 'Insufficient Balance', description: 'Requested amount exceeds available balance.', type: 'warning' })
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      const newPayout: PayoutRecord = {
        id: `pay_${Date.now()}`,
        payoutId: `PAY-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0],
        amount: requestAmount,
        method: payoutMethod,
        status: 'Processing',
      }

      setPayouts([newPayout, ...payouts])
      setAvailableBalance((prev) => prev - requestAmount)
      setIsSubmitting(false)
      setIsModalOpen(false)

      toast({
        title: 'Payout Request Initiated!',
        description: `Requested ${formatCurrency(requestAmount)} via ${payoutMethod}. Processing within 24 hours.`,
        type: 'success',
      })
    }, 1000)
  }

  const handleExportCsv = () => {
    const headers = ['Payout ID', 'Date', 'Amount', 'Payment Method', 'Status']
    const rows = payouts.map((p) => [p.payoutId, p.date, p.amount, p.method, p.status])
    exportToCsv('Commission_Payouts_History', headers, rows)
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Commissions & Payout Vault"
        description="Withdraw earned referral commissions, manage payout accounts, and download annual tax reporting statements."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'Commissions & Payouts' }]}
        badge={
          <Badge variant="gold" size="md">
            Commission Vault
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Can menuId="affiliate-commissions" action="export" disableInstead={true} tooltip="Export permission required to download payout records">
              <Button variant="outline" size="sm" onClick={handleExportCsv} leftIcon={<Download className="w-3.5 h-3.5" />}>
                Download CSV
              </Button>
            </Can>
            <Can menuId="affiliate-commissions" action="create" disableInstead={true} tooltip="Create permission required to request payouts">
              <Button
                variant="accent"
                size="sm"
                onClick={() => setIsModalOpen(true)}
                leftIcon={<ArrowDownRight className="w-4 h-4" />}
              >
                Request Payout
              </Button>
            </Can>
          </div>
        }
      />

      {/* 3 BALANCE STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Available Balance for Payout"
          value={formatCurrency(availableBalance)}
          change={12.5}
          changePeriod="Ready for instant withdrawal"
          icon={<DollarSign className="w-5 h-5 text-emerald-500" />}
          variant="emerald"
        />

        <StatCard
          title="Pending Underwriting Balance"
          value={formatCurrency(pendingBalance)}
          change={8.0}
          changePeriod="3 deals in underwriter review"
          icon={<Clock className="w-5 h-5 text-amber-500" />}
          variant="default"
        />

        <StatCard
          title="Total Lifetime Commission Earned"
          value={formatCurrency(totalLifetime)}
          change={24.0}
          changePeriod="Lifetime partner earnings"
          icon={<Wallet className="w-5 h-5 text-amber-500" />}
          variant="gold"
        />
      </div>

      {/* PAYOUT HISTORY TABLE */}
      <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Payout Disbursement History</h3>
          <Badge variant="navy" size="sm">
            {payouts.length} Transactions
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-3 px-4">Payout Transaction ID</th>
                <th className="py-3 px-4">Disbursement Date</th>
                <th className="py-3 px-4">Disbursement Method</th>
                <th className="py-3 px-4">Payout Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {payouts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">{p.payoutId}</td>
                  <td className="py-3 px-4 text-slate-500">{p.date}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{p.method}</td>
                  <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(p.amount)}</td>
                  <td className="py-3 px-4">
                    <Badge variant={p.status === 'Paid' ? 'emerald' : 'amber'} size="sm" dot>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toast({ title: 'Downloading Statement', description: `Saved statement for ${p.payoutId}`, type: 'info' })}
                      leftIcon={<Download className="w-3.5 h-3.5" />}
                    >
                      Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* REQUEST PAYOUT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <Card variant="bento" className="w-full max-w-md p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <ArrowDownRight className="w-5 h-5 text-emerald-500" />
                <span>Request Commission Payout</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRequestPayout} className="space-y-4 text-xs">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-300">Available Balance:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">{formatCurrency(availableBalance)}</span>
              </div>

              <div>
                <label className="font-bold block mb-1">Withdrawal Amount ($)</label>
                <input
                  type="number"
                  max={availableBalance}
                  value={requestAmount}
                  onChange={(e) => setRequestAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono font-bold"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Payout Transfer Method</label>
                <select
                  value={payoutMethod}
                  onChange={(e) => setPayoutMethod(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-bold"
                >
                  <option value="ACH Direct Deposit">ACH Direct Deposit (Chase ••• 4912)</option>
                  <option value="Wire Transfer">Federal Reserve Wire Transfer</option>
                  <option value="PayPal">PayPal (affiliate@demo.com)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="accent" size="sm" isLoading={isSubmitting} leftIcon={<Send className="w-4 h-4" />}>
                  Confirm Withdrawal
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
