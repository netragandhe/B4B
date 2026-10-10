import React, { useState } from 'react'
import {
  CreditCard,
  CheckCircle2,
  Zap,
  ShieldCheck,
  ArrowRight,
  Clock,
  Download,
  AlertTriangle,
  Plus,
  Trash2,
  RefreshCw,
  XCircle,
  HelpCircle,
  Check,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { FormField } from '@/components/ui/FormField'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'
import { useAuth } from '@/context/AuthContext'
import {
  billingService,
  SubscriptionPlan,
  Invoice,
  PaymentCard,
} from '@/lib/services/billingService'

export const BizProSubscriptionPage: React.FC = () => {
  const { toast } = useToast()
  const { user } = useAuth()

  // Service stores
  const plans = billingService.usePlans()
  const profile = billingService.useProfile()
  const cards = billingService.useCards()
  const invoices = billingService.useInvoices()

  // State
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)
  const [selectedPlanId, setSelectedPlanId] = useState<string>(profile.activePlanId)
  const [addCardModalOpen, setAddCardModalOpen] = useState(false)
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [cancelReason, setCancelReason] = useState('Looking for different features')

  // New Card Form State
  const [cardHolder, setCardHolder] = useState(user?.name || 'Marcus Vance')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [cardBrand, setCardBrand] = useState<'Visa' | 'Mastercard' | 'Amex' | 'Discover'>('Visa')

  // Format card input
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16)
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ')
    setCardNumber(formatted)

    if (raw.startsWith('4')) setCardBrand('Visa')
    else if (raw.startsWith('5')) setCardBrand('Mastercard')
    else if (raw.startsWith('3')) setCardBrand('Amex')
    else if (raw.startsWith('6')) setCardBrand('Discover')
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4)
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`)
    } else {
      setCardExpiry(raw)
    }
  }

  const handleAddCardSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 15) {
      toast({ title: 'Invalid Card', description: 'Please enter a valid card number.', type: 'error' })
      return
    }
    if (!cardExpiry || cardExpiry.length < 5) {
      toast({ title: 'Invalid Expiry', description: 'Please enter expiration MM/YY.', type: 'error' })
      return
    }

    const last4 = cardNumber.replace(/\s/g, '').slice(-4)
    billingService.addCard({
      brand: cardBrand,
      last4,
      expiry: cardExpiry,
      holderName: cardHolder,
    })

    setAddCardModalOpen(false)
    setCardNumber('')
    setCardExpiry('')
    setCardCvc('')

    toast({
      title: 'Card Added Successfully',
      description: `${cardBrand} ending in ${last4} is now available for billing.`,
      type: 'success',
    })
  }

  const handleConfirmPlanChange = () => {
    const plan = plans.find((p) => p.id === selectedPlanId)
    if (!plan) return

    billingService.changePlan(plan.id, {
      name: user?.name || 'B4B Coach',
      email: user?.email || 'coach@b4bamerica.com',
      company: 'B4B Capital Partner',
    })

    setUpgradeModalOpen(false)
    toast({
      title: 'Subscription Updated',
      description: `Your subscription is now active on ${plan.name} at $${plan.monthlyPrice}/mo.`,
      type: 'success',
    })
  }

  const handleConfirmCancel = () => {
    billingService.cancelSubscription(cancelReason)
    setCancelModalOpen(false)
    toast({
      title: 'Subscription Cancelled',
      description: `Your subscription will remain active until ${profile.accessUntil}.`,
      type: 'warning',
    })
  }

  const handleReactivate = () => {
    billingService.reactivateSubscription()
    toast({
      title: 'Subscription Reactivated',
      description: 'Your B4B Coach membership has been fully restored.',
      type: 'success',
    })
  }

  const handlePayInvoice = (invoice: Invoice) => {
    billingService.payInvoice(invoice.id)
    toast({
      title: 'Payment Processed',
      description: `Invoice ${invoice.invoiceNumber} ($${invoice.amount}) has been paid successfully.`,
      type: 'success',
    })
  }

  const activePlan = plans.find((p) => p.id === profile.activePlanId) || plans[0]
  const defaultCard = cards.find((c) => c.isDefault) || cards[0]

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Profile & Subscription Management"
        description="Manage your B4B Coach membership tier, billing cycle, payment methods, and invoices."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/bizpro/bulletin' },
          { label: 'Subscription', icon: <CreditCard className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge
            variant={profile.status === 'active' ? 'emerald' : profile.status === 'past_due' ? 'amber' : 'danger'}
            size="md"
          >
            {profile.status === 'active'
              ? `Active: ${activePlan.name} ($${activePlan.monthlyPrice}/mo)`
              : profile.status === 'past_due'
              ? 'Past Due - Payment Required'
              : 'Cancelled (Access Expiring)'}
          </Badge>
        }
      />

      {/* CANCELLED BANNER IF APPLICABLE */}
      {profile.status === 'cancelled' && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-amber-400">Subscription Cancellation Pending</h4>
              <p className="text-xs text-slate-300">
                You will retain full B4B Coach platform benefits until <strong>{profile.accessUntil}</strong>.
              </p>
            </div>
          </div>
          <Button size="sm" variant="accent" onClick={handleReactivate} className="gap-1.5 text-xs">
            <RefreshCw className="w-3.5 h-3.5" />
            Reactivate Subscription
          </Button>
        </div>
      )}

      {/* ACTIVE PLAN AND PAYMENT METHOD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CURRENT PLAN CARD */}
        <Card
          variant="bento"
          className="lg:col-span-7 p-6 space-y-5 bg-gradient-to-br from-blue-950/40 via-slate-900 to-[#0D1E36] border-blue-500/20"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400">
                Current Membership Tier
              </span>
              <h3 className="text-2xl font-black font-heading text-white mt-0.5">
                {activePlan.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{activePlan.rankGroup}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-emerald-400">${activePlan.monthlyPrice}</span>
              <span className="text-xs text-slate-400"> / month</span>
              <div className="mt-1">
                <Badge variant={activePlan.priceStatus.includes('$25') ? 'emerald' : 'royal'} size="sm">
                  {activePlan.priceStatus}
                </Badge>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Plan Features Included</div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
              {activePlan.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>
                Next billing date:{' '}
                <strong className="text-slate-200">{profile.nextBillingDate}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              {profile.status === 'active' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCancelModalOpen(true)}
                  className="text-xs text-rose-400 border-rose-500/30 hover:bg-rose-500/10"
                >
                  Cancel Plan
                </Button>
              )}
              <Button
                size="sm"
                variant="accent"
                onClick={() => {
                  setSelectedPlanId(profile.activePlanId)
                  setUpgradeModalOpen(true)
                }}
                className="text-xs font-bold gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                Change Tier / Upgrade
              </Button>
            </div>
          </div>
        </Card>

        {/* PAYMENT METHODS MANAGER */}
        <Card variant="bento" className="lg:col-span-5 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Payment Gateways
              </span>
              <h3 className="text-base font-bold text-white font-heading">Payment Cards on File</h3>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setAddCardModalOpen(true)}
              className="text-xs gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Card
            </Button>
          </div>

          <div className="space-y-2.5">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`p-3.5 rounded-xl border transition-all flex items-center justify-between text-xs ${
                  card.isDefault
                    ? 'bg-blue-950/30 border-blue-500/50 shadow-sm'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 rounded bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-[10px] text-blue-400">
                    {card.brand}
                  </div>
                  <div>
                    <div className="font-semibold text-white flex items-center gap-2">
                      •••• •••• •••• {card.last4}
                      {card.isDefault && (
                        <Badge variant="emerald" size="sm">
                          Default
                        </Badge>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Expires {card.expiry} • {card.holderName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {!card.isDefault && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        billingService.setDefaultCard(card.id)
                        toast({ title: 'Default Card Updated', type: 'success' })
                      }}
                      className="text-[11px] px-2 h-7"
                    >
                      Make Default
                    </Button>
                  )}
                  {cards.length > 1 && (
                    <button
                      onClick={() => {
                        billingService.deleteCard(card.id)
                        toast({ title: 'Card Removed', type: 'info' })
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                      title="Remove card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-start gap-2.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Direct PCI-DSS tokenization. In production launch, cards are tokenized client-side via Stripe
              Elements. No raw numbers stored.
            </span>
          </div>
        </Card>
      </div>

      {/* PLAN COMPARISON TIERS */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold font-heading text-white">B4B Coach Membership Tiers</h3>
          <p className="text-xs text-slate-400">
            Select the membership package that correlates with your commercial leadership and advisor rank.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrent = plan.id === profile.activePlanId
            return (
              <Card
                key={plan.id}
                variant="bento"
                className={`p-6 flex flex-col justify-between relative transition-all ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-950/20 ring-1 ring-blue-500/40'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="gold" size="sm" className="shadow-lg">
                      ★ Most Popular for Leaders
                    </Badge>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      {plan.rankGroup}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1 font-heading">{plan.name}</h4>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">${plan.monthlyPrice}</span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>

                  <Badge variant={plan.priceStatus.includes('$25') ? 'emerald' : 'royal'} size="sm">
                    {plan.priceStatus}
                  </Badge>

                  <ul className="space-y-2.5 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800">
                  {isCurrent ? (
                    <Button variant="outline" size="md" disabled className="w-full justify-center text-xs">
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      variant={plan.recommended ? 'accent' : 'primary'}
                      size="md"
                      onClick={() => {
                        setSelectedPlanId(plan.id)
                        setUpgradeModalOpen(true)
                      }}
                      className="w-full justify-center text-xs font-bold"
                    >
                      Select {plan.name.split('(')[0]}
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* BILLING HISTORY TABLE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-heading text-white">Billing & Invoice History</h3>
            <p className="text-xs text-slate-400">
              Download formal PDF receipts and invoices for your business expenses and accounting.
            </p>
          </div>
        </div>

        <Card variant="default" className="divide-y divide-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Plan Description</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-400">{inv.invoiceNumber}</td>
                    <td className="py-3.5 px-4 text-slate-300">{inv.date}</td>
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
                    <td className="py-3.5 px-4 text-slate-400">{inv.paymentMethod}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {inv.status === 'Pending' && (
                          <Button
                            size="sm"
                            variant="accent"
                            onClick={() => handlePayInvoice(inv)}
                            className="text-[11px] h-7 px-2.5"
                          >
                            Pay Now
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => billingService.generatePdfInvoice(inv)}
                          className="text-[11px] h-7 px-2.5 gap-1"
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
      </div>

      {/* UPGRADE / CHANGE PLAN MODAL */}
      <Modal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        title="Confirm Plan Change"
        description="Review your subscription tier update."
        maxWidth="lg"
      >
        <div className="space-y-5 text-left text-xs">
          {(() => {
            const targetPlan = plans.find((p) => p.id === selectedPlanId) || activePlan
            const priceDiff = targetPlan.monthlyPrice - activePlan.monthlyPrice
            return (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold text-white">
                    <span>Target Tier:</span>
                    <span className="text-blue-400">{targetPlan.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>New Monthly Rate:</span>
                    <span className="text-emerald-400 font-bold">${targetPlan.monthlyPrice} / month</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Payment Method:</span>
                    <span>{defaultCard ? `${defaultCard.brand} •••• ${defaultCard.last4}` : 'Card on File'}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center font-bold">
                    <span>Billing Adjustment:</span>
                    <span className={priceDiff >= 0 ? 'text-emerald-400' : 'text-blue-400'}>
                      {priceDiff >= 0 ? `+$${priceDiff}.00 / mo` : `-$${Math.abs(priceDiff)}.00 / mo`}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  By confirming, your payment method on file will be charged immediately for the proration and your
                  access levels will update in real time.
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" onClick={() => setUpgradeModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="accent" onClick={handleConfirmPlanChange} className="font-bold">
                    Confirm & Update Plan
                  </Button>
                </div>
              </div>
            )
          })()}
        </div>
      </Modal>

      {/* ADD CARD MODAL */}
      <Modal
        isOpen={addCardModalOpen}
        onClose={() => setAddCardModalOpen(false)}
        title="Add Payment Card"
        description="Add a debit or credit card for automatic membership renewals."
        maxWidth="md"
      >
        <form onSubmit={handleAddCardSubmit} className="space-y-4 text-left text-xs">
          <FormField label="Cardholder Full Name" required id="modal-card-holder">
            <Input
              id="modal-card-holder"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="Marcus Vance"
              required
            />
          </FormField>

          <FormField label="Card Number" required id="modal-card-number">
            <Input
              id="modal-card-number"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="4242 4242 4242 4242"
              leftIcon={<CreditCard className="w-4 h-4 text-blue-400" />}
              required
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Expiration (MM/YY)" required id="modal-card-exp">
              <Input
                id="modal-card-exp"
                value={cardExpiry}
                onChange={handleExpiryChange}
                placeholder="12/28"
                required
              />
            </FormField>
            <FormField label="CVC Code" required id="modal-card-cvc">
              <Input
                id="modal-card-cvc"
                value={cardCvc}
                onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="123"
                required
              />
            </FormField>
          </div>

          <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-500/30 text-[11px] text-blue-300">
            Detected Card Network: <strong>{cardBrand}</strong>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setAddCardModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" className="font-bold">
              Save Card
            </Button>
          </div>
        </form>
      </Modal>

      {/* CANCEL SUBSCRIPTION MODAL */}
      <Modal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        title="Cancel B4B Coach Subscription"
        description="Are you sure you want to cancel your monthly subscription?"
        maxWidth="md"
      >
        <div className="space-y-4 text-left text-xs">
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>Warning: Impact on Coach Status</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Cancelling your subscription will suspend your access to CRM leads, AI pitch generation tools, and
              multi-tier downline commission settlement upon period expiration.
            </p>
          </div>

          <FormField label="Please tell us why you are cancelling:" required id="cancel-reason">
            <select
              id="cancel-reason"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
            >
              <option value="Temporary pause in commercial brokerage">Temporary pause in commercial brokerage</option>
              <option value="Moving to different financial firm">Moving to different financial firm</option>
              <option value="Feature requirements not met">Feature requirements not met</option>
              <option value="Cost consideration">Cost consideration</option>
              <option value="Other">Other reason</option>
            </select>
          </FormField>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="outline" onClick={() => setCancelModalOpen(false)}>
              Keep Subscription
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmCancel}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
            >
              Confirm Cancellation
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
