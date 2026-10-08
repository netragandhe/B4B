import React, { useState } from 'react'
import {
  CreditCard,
  CheckCircle2,
  Zap,
  ShieldCheck,
  ArrowRight,
  Clock,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { FormField } from '@/components/ui/FormField'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'

export const BizProSubscriptionPage: React.FC = () => {
  const { toast } = useToast()

  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'elite'>('pro')

  const billingHistory = [
    { date: '2026-10-01', inv: 'INV-2026-101', amount: '$25.00', status: 'Paid', plan: 'Biz Pro Pro' },
    { date: '2026-09-01', inv: 'INV-2026-089', amount: '$25.00', status: 'Paid', plan: 'Biz Pro Pro' },
    { date: '2026-08-01', inv: 'INV-2026-072', amount: '$25.00', status: 'Paid', plan: 'Biz Pro Pro' },
  ]

  const handleUpdatePayment = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Payment Method Updated',
      description: 'Your default payment card has been saved securely.',
      type: 'success',
    })
  }

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Profile & Subscription Management"
        description="Manage your Biz Pro subscription, billing history, payment methods, and account profile."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Subscription', icon: <CreditCard className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="emerald" size="md">
            Active: Pro Tier ($25/mo)
          </Badge>
        }
      />

      {/* ACTIVE PLAN CARD & UPGRADE BANNER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <Card variant="bento" className="lg:col-span-6 p-6 space-y-4 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 dark:from-[#12294A] dark:to-[#0D1E36] border-blue-200 dark:border-[#1E3A5F]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                Active Subscription Plan
              </span>
              <h3 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white">
                Biz Pro Pro Tier ($25 / Month)
              </h3>
            </div>
            <Badge variant="emerald" size="md">
              Renews Nov 01
            </Badge>
          </div>

          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Full CRM & Lead Kanban Board Access</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>AI Marketing Generator (Unlimited Sequences)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>White-label Custom Domain & Branding</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Leader Command & Override Rights (Rank 4+)</span>
            </li>
          </ul>

          <div className="pt-3 border-t border-blue-200/50 dark:border-[#1E3A5F] flex items-center justify-between">
            <span className="text-xs text-slate-500">Auto-renewal active on Visa ending in 4912</span>
            <Button size="sm" variant="accent" onClick={() => setUpgradeModalOpen(true)} className="text-xs">
              Upgrade to Elite ($99/mo)
            </Button>
          </div>
        </Card>

        {/* PAYMENT METHOD MANAGEMENT FORM */}
        <Card variant="bento" className="lg:col-span-6 p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Payment Method & Card Details
          </h3>

          <form onSubmit={handleUpdatePayment} className="space-y-3 text-xs">
            <FormField label="Cardholder Name" required id="card-name">
              <Input id="card-name" defaultValue="David Ross" required />
            </FormField>

            <FormField label="Card Number" required id="card-num">
              <Input id="card-num" defaultValue="•••• •••• •••• 4912" leftIcon={<CreditCard className="w-4 h-4" />} required />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Expiration" required id="card-exp">
                <Input id="card-exp" defaultValue="08/28" required />
              </FormField>
              <FormField label="CVC" required id="card-cvc">
                <Input id="card-cvc" defaultValue="***" required />
              </FormField>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="outline" size="sm" className="w-full justify-center text-xs">
                Update Payment Card
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* BILLING HISTORY TABLE */}
      <div className="space-y-3">
        <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
          Subscription Billing History
        </h3>

        <Card variant="default" className="divide-y divide-slate-100 dark:divide-[#1E3A5F]">
          {billingHistory.map((item, i) => (
            <div key={i} className="p-4 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">{item.plan}</span>
                <span className="text-[11px] text-slate-400">{item.inv} • {item.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="emerald" size="sm">{item.status}</Badge>
                <span className="font-extrabold text-slate-900 dark:text-white">{item.amount}</span>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* UPGRADE PLAN MODAL */}
      <Modal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        title="Upgrade Subscription Plan"
        description="Unlock maximum lead capacity and VIP priority underwriting."
        maxWidth="md"
      >
        <div className="space-y-4 text-left">
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => setSelectedPlan('pro')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedPlan === 'pro' ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/40' : 'border-slate-200'
              }`}
            >
              <h4 className="font-bold text-sm">Biz Pro Pro</h4>
              <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">$25 / mo</p>
              <p className="text-[11px] text-slate-500 mt-2">Standard CRM & AI Marketing tools included.</p>
            </div>

            <div
              onClick={() => setSelectedPlan('elite')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedPlan === 'elite' ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/40' : 'border-slate-200'
              }`}
            >
              <h4 className="font-bold text-sm">Biz Pro Elite</h4>
              <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">$99 / mo</p>
              <p className="text-[11px] text-slate-500 mt-2">Includes priority underwriting desk & co-op leads.</p>
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setUpgradeModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="accent"
              onClick={() => {
                setUpgradeModalOpen(false)
                toast({ title: 'Plan Upgraded!', description: `Upgraded to Biz Pro ${selectedPlan.toUpperCase()}`, type: 'success' })
              }}
            >
              Confirm Upgrade
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
