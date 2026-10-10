import React, { useState, useMemo } from 'react'
import {
  CreditCard,
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Search,
  Filter,
  Download,
  Edit3,
  Percent,
  Check,
  RefreshCw,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { FormField } from '@/components/ui/FormField'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Tabs } from '@/components/ui/Tabs'
import { useToast } from '@/components/ui/Toast'
import {
  billingService,
  CoachSubscription,
  SubscriptionPlan,
  Invoice,
} from '@/lib/services/billingService'

export const AdminSubscriptionsPage: React.FC = () => {
  const { toast } = useToast()

  // Service stores
  const plans = billingService.usePlans()
  const subscriptions = billingService.useSubscriptions()
  const invoices = billingService.useInvoices()

  // State
  const [activeTab, setActiveTab] = useState<'coaches' | 'invoices' | 'pricing'>('coaches')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'past_due' | 'cancelled'>('all')

  // Edit Coach Modal
  const [selectedSub, setSelectedSub] = useState<CoachSubscription | null>(null)
  const [editPlanModalOpen, setEditPlanModalOpen] = useState(false)
  const [targetPlanId, setTargetPlanId] = useState('')

  // Edit Pricing Form State
  const [pricingDraft, setPricingDraft] = useState<Record<string, { monthly: number; annual: number }>>(() => {
    const draft: Record<string, { monthly: number; annual: number }> = {}
    plans.forEach((p) => {
      draft[p.id] = { monthly: p.monthlyPrice, annual: p.annualPrice }
    })
    return draft
  })

  // Calculations
  const stats = useMemo(() => {
    const activeSubs = subscriptions.filter((s) => s.status === 'active')
    const pastDueSubs = subscriptions.filter((s) => s.status === 'past_due')
    const cancelledSubs = subscriptions.filter((s) => s.status === 'cancelled')
    const mrr = activeSubs.reduce((sum, s) => {
      const discount = s.discountPercent ? (100 - s.discountPercent) / 100 : 1
      return sum + s.monthlyPrice * discount
    }, 0)

    return {
      mrr,
      activeCount: activeSubs.length,
      pastDueCount: pastDueSubs.length,
      cancelledCount: cancelledSubs.length,
    }
  }, [subscriptions])

  // Filtered Subscriptions
  const filteredSubs = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchesSearch =
        sub.coachName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.coachEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.planName.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'all' || sub.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [subscriptions, searchQuery, statusFilter])

  // Handlers
  const handleApplyDiscount = (subId: string) => {
    billingService.updateSubscription(subId, { discountPercent: 20 })
    toast({
      title: 'Discount Applied',
      description: 'Applied 20% promotional discount to coach subscription.',
      type: 'success',
    })
  }

  const handleMarkPaid = (subId: string) => {
    billingService.updateSubscription(subId, { status: 'active' })
    toast({
      title: 'Status Updated',
      description: 'Subscription marked as Active and Paid.',
      type: 'success',
    })
  }

  const handleOpenPlanChange = (sub: CoachSubscription) => {
    setSelectedSub(sub)
    setTargetPlanId(sub.planId)
    setEditPlanModalOpen(true)
  }

  const handleSavePlanChange = () => {
    if (!selectedSub) return
    const plan = plans.find((p) => p.id === targetPlanId)
    if (!plan) return

    billingService.updateSubscription(selectedSub.id, {
      planId: plan.id,
      planName: plan.name,
      monthlyPrice: plan.monthlyPrice,
    })

    setEditPlanModalOpen(false)
    toast({
      title: 'Coach Plan Changed',
      description: `Updated ${selectedSub.coachName} to ${plan.name}.`,
      type: 'success',
    })
  }

  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault()
    plans.forEach((plan) => {
      const draft = pricingDraft[plan.id]
      if (draft) {
        billingService.updatePlan(plan.id, {
          monthlyPrice: draft.monthly,
          annualPrice: draft.annual,
        })
      }
    })
    toast({
      title: 'Plan Pricing Saved',
      description: 'All subscription prices updated across the portal.',
      type: 'success',
    })
  }

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Subscriptions & Recurring Billing Management"
        description="Monitor Monthly Recurring Revenue (MRR), coach subscription tiers, payment gateway integrations, and invoice records."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/admin/dashboard' },
          { label: 'Subscriptions', icon: <CreditCard className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="emerald" size="md">
            Stripe Gateway Connected (Sandbox)
          </Badge>
        }
      />

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="bento" className="p-5 flex items-center justify-between border-blue-500/20 bg-blue-950/20">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Monthly Recurring (MRR)</span>
            <div className="text-2xl font-black text-white font-heading mt-1">${stats.mrr.toFixed(2)}</div>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +14.2% this month
            </span>
          </div>
          <div className="p-3 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
            <DollarSign className="w-6 h-6" />
          </div>
        </Card>

        <Card variant="bento" className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Coaches</span>
            <div className="text-2xl font-black text-white font-heading mt-1">{stats.activeCount}</div>
            <span className="text-[11px] text-slate-400 mt-1 block">Ranks 1 through 9</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Users className="w-6 h-6" />
          </div>
        </Card>

        <Card variant="bento" className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Past Due / Failed</span>
            <div className="text-2xl font-black text-amber-400 font-heading mt-1">{stats.pastDueCount}</div>
            <span className="text-[11px] text-amber-400/80 mt-1 block">Dunning automated</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <AlertCircle className="w-6 h-6" />
          </div>
        </Card>

        <Card variant="bento" className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cancelled / Churned</span>
            <div className="text-2xl font-black text-slate-400 font-heading mt-1">{stats.cancelledCount}</div>
            <span className="text-[11px] text-slate-500 mt-1 block">Grace period active</span>
          </div>
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <RotateCcw className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex border-b border-slate-800 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('coaches')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'coaches'
              ? 'text-blue-400 border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Coach Subscriptions ({subscriptions.length})
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'invoices'
              ? 'text-blue-400 border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Invoices & Settlement ({invoices.length})
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'pricing'
              ? 'text-blue-400 border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Plan Pricing Editor
        </button>
      </div>

      {/* TAB 1: COACH SUBSCRIPTIONS TABLE */}
      {activeTab === 'coaches' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="w-full sm:w-72">
              <Input
                placeholder="Search coach, email or tier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4 text-slate-400" />}
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 rounded-lg text-xs p-2 text-white"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Only</option>
                <option value="past_due">Past Due</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <Card variant="default" className="divide-y divide-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">B4B Coach</th>
                    <th className="py-3 px-4">Membership Tier</th>
                    <th className="py-3 px-4">Price / Rate</th>
                    <th className="py-3 px-4">Card on File</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Next Billing</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredSubs.map((sub) => {
                    const price = sub.discountPercent
                      ? sub.monthlyPrice * ((100 - sub.discountPercent) / 100)
                      : sub.monthlyPrice

                    return (
                      <tr key={sub.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">{sub.coachName}</div>
                          <div className="text-[11px] text-slate-400">{sub.coachEmail}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-blue-300">{sub.planName}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">${price.toFixed(2)} / mo</div>
                          {sub.discountPercent && (
                            <span className="text-[10px] text-emerald-400">({sub.discountPercent}% VIP discount)</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">
                          {sub.cardBrand} •••• {sub.cardLast4}
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge
                            variant={
                              sub.status === 'active'
                                ? 'emerald'
                                : sub.status === 'past_due'
                                ? 'amber'
                                : 'danger'
                            }
                            size="sm"
                          >
                            {sub.status.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">{sub.nextBillingDate}</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenPlanChange(sub)}
                              className="text-[11px] h-7 px-2"
                            >
                              Change Tier
                            </Button>
                            {!sub.discountPercent && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleApplyDiscount(sub.id)}
                                className="text-[11px] h-7 px-2 text-emerald-400 hover:text-emerald-300"
                                title="Apply 20% Discount"
                              >
                                <Percent className="w-3 h-3" />
                              </Button>
                            )}
                            {sub.status === 'past_due' && (
                              <Button
                                size="sm"
                                variant="accent"
                                onClick={() => handleMarkPaid(sub.id)}
                                className="text-[11px] h-7 px-2"
                              >
                                Mark Paid
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: INVOICES LOG */}
      {activeTab === 'invoices' && (
        <Card variant="default" className="divide-y divide-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Billed Coach</th>
                  <th className="py-3 px-4">Tier Description</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-400">{inv.invoiceNumber}</td>
                    <td className="py-3.5 px-4 text-slate-300">{inv.date}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{inv.customerName}</div>
                      <div className="text-[11px] text-slate-400">{inv.customerEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 text-white font-medium">{inv.planName}</td>
                    <td className="py-3.5 px-4 font-bold text-white">${inv.amount.toFixed(2)}</td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          inv.status === 'Paid'
                            ? 'emerald'
                            : inv.status === 'Pending'
                            ? 'amber'
                            : inv.status === 'Refunded'
                            ? 'royal'
                            : 'danger'
                        }
                        size="sm"
                      >
                        {inv.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {inv.status === 'Paid' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              billingService.refundInvoice(inv.id)
                              toast({ title: 'Invoice Refunded', description: `$${inv.amount} marked refunded.`, type: 'info' })
                            }}
                            className="text-[11px] h-7 px-2 text-rose-400 hover:text-rose-300"
                          >
                            Refund
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => billingService.generatePdfInvoice(inv)}
                          className="text-[11px] h-7 px-2 gap-1"
                        >
                          <Download className="w-3 h-3" />
                          PDF
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 3: PLAN PRICING EDITOR */}
      {activeTab === 'pricing' && (
        <form onSubmit={handleSavePricing} className="space-y-6">
          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs text-blue-300 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm text-white font-bold">Client Pricing Specification Notice</strong>
              Per client requirements: the starting B4B Coach subscription rate is <strong>$25 / month</strong> for Rank 1-3. Rates for higher rank tiers (Rank 4-6 and Rank 7-9) are initialized as placeholders labeled <em>"Price to be confirmed by client"</em>. You can adjust all pricing tiers below.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const draft = pricingDraft[plan.id] || { monthly: plan.monthlyPrice, annual: plan.annualPrice }
              return (
                <Card key={plan.id} variant="bento" className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      {plan.rankGroup}
                    </span>
                    <h4 className="text-lg font-bold text-white font-heading mt-0.5">{plan.name}</h4>
                  </div>

                  <Badge variant={plan.priceStatus.includes('$25') ? 'emerald' : 'royal'} size="sm">
                    {plan.priceStatus}
                  </Badge>

                  <div className="space-y-3 pt-2">
                    <FormField label="Monthly Subscription Price ($ USD)" required id={`monthly-${plan.id}`}>
                      <Input
                        id={`monthly-${plan.id}`}
                        type="number"
                        value={draft.monthly}
                        onChange={(e) =>
                          setPricingDraft((prev) => ({
                            ...prev,
                            [plan.id]: { ...draft, monthly: Number(e.target.value) },
                          }))
                        }
                        required
                      />
                    </FormField>

                    <FormField label="Annual Billing Price ($ USD)" required id={`annual-${plan.id}`}>
                      <Input
                        id={`annual-${plan.id}`}
                        type="number"
                        value={draft.annual}
                        onChange={(e) =>
                          setPricingDraft((prev) => ({
                            ...prev,
                            [plan.id]: { ...draft, annual: Number(e.target.value) },
                          }))
                        }
                        required
                      />
                    </FormField>
                  </div>

                  <div className="pt-2 text-[11px] text-slate-400">
                    Includes {plan.features.length} entitlement features.
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="accent" size="md" className="font-bold gap-2">
              <Check className="w-4 h-4" />
              Save & Apply Plan Pricing
            </Button>
          </div>
        </form>
      )}

      {/* CHANGE COACH PLAN MODAL */}
      <Modal
        isOpen={editPlanModalOpen}
        onClose={() => setEditPlanModalOpen(false)}
        title="Reassign Coach Membership Tier"
        description={`Update subscription package for ${selectedSub?.coachName}`}
        maxWidth="md"
      >
        <div className="space-y-4 text-left text-xs">
          <FormField label="Select Target Plan Tier" required id="admin-target-plan">
            <select
              id="admin-target-plan"
              value={targetPlanId}
              onChange={(e) => setTargetPlanId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
            >
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (${p.monthlyPrice}/mo) - {p.rankGroup}
                </option>
              ))}
            </select>
          </FormField>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="outline" onClick={() => setEditPlanModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="accent" onClick={handleSavePlanChange} className="font-bold">
              Update Coach Subscription
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
