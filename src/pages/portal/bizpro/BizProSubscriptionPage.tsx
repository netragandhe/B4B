import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  CreditCard,
  CheckCircle2,
  Calendar,
  Download,
  ShieldCheck,
  Zap,
  User,
  Phone,
  Mail,
  MapPin,
  Award,
  Sparkles,
  ExternalLink,
  Save,
} from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useAuth, RANK_TITLES } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'

export const BizProSubscriptionPage: React.FC = () => {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: user?.name || 'Marcus Vance',
    email: user?.email || 'm.vance@apexlogistics.io',
    phone: '(404) 555-0192',
    licenseNumber: 'NMLS #2094182 / SEC Broker ID #8819',
    region: user?.region || 'Northeast Region (NY, NJ, CT, PA)',
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      updateUser({ name: formData.name, email: formData.email, region: formData.region })
      toast({
        title: 'Profile Updated Successfully',
        description: 'Your Biz Pro profile credentials have been synchronized.',
        type: 'success',
      })
    }, 600)
  }

  const invoices = [
    { id: 'INV-2026-10', date: 'Oct 01, 2026', amount: '$25.00', status: 'Paid', method: 'Visa •••• 4242' },
    { id: 'INV-2026-09', date: 'Sep 01, 2026', amount: '$25.00', status: 'Paid', method: 'Visa •••• 4242' },
    { id: 'INV-2026-08', date: 'Aug 01, 2026', amount: '$25.00', status: 'Paid', method: 'Visa •••• 4242' },
    { id: 'INV-2026-07', date: 'Jul 01, 2026', amount: '$25.00', status: 'Paid', method: 'Visa •••• 4242' },
  ]

  return (
    <>
      <Helmet>
        <title>Profile & Subscription | Biz Pro Terminal</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Profile & Subscription
            </h1>
            <Badge variant="emerald" size="sm">
              Active Member
            </Badge>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your monthly Biz Pro platform access ($25/month), billing instruments, and advisor identity.
          </p>
        </div>

        {/* Subscription Card Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main $25/mo Subscription Card */}
          <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-blue-900/10 via-indigo-900/5 to-slate-900/5 dark:from-[#132847] dark:to-[#0D1E36] border-2 border-blue-500/50 dark:border-blue-500/40 shadow-lg relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-blue-200/60 dark:border-[#1E3A5F]">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="navy" size="sm">
                    Platform Tier
                  </Badge>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Good Standing
                  </span>
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 mt-1">
                  Biz Pro Executive Platform Access
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Full commercial loan underwriting portal, CRM terminal, and syndication suite.
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-3xl font-black text-slate-900 dark:text-slate-100">$25</span>
                <span className="text-xs text-slate-400"> / month</span>
                <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-0.5">
                  Renews Nov 01, 2026
                </p>
              </div>
            </div>

            {/* Included Platform Perks */}
            <div className="py-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                'Full Biz Pro CRM with Kanban pipeline',
                'Dedicated Underwriting Desk file review',
                'White-label co-branded client portals',
                'AI Marketing & automated outreach generators',
                '16-Product debt & credit service catalog',
                'Direct ACH commission payout engine',
                'Downline team override hierarchy (Rank 4+)',
                'Priority training masterclasses & certifications',
              ].map((perk, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* Footer with Payment Method */}
            <div className="pt-4 border-t border-blue-200/60 dark:border-[#1E3A5F] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F]">
                  <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Visa ending in 4242
                  </span>
                  <p className="text-[11px] text-slate-400">Expires 08/2028 • Auto-renew active</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    toast({
                      title: 'Payment Method Modal',
                      description: 'Stripe customer portal opened for card update.',
                      type: 'info',
                    })
                  }
                >
                  Update Payment
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                  onClick={() =>
                    toast({
                      title: 'Membership Cancellation',
                      description: 'Your $25/mo membership is locked active through the end of the current billing cycle.',
                      type: 'info',
                    })
                  }
                >
                  Manage Plan
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Advisor Info Widget */}
          <Card className="p-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-md">
                  {user?.name?.slice(0, 2).toUpperCase() || 'MV'}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{user?.name}</h3>
                  <Badge variant="primary" size="sm" className="mt-0.5">
                    Rank {user?.rank || 4}: {RANK_TITLES[user?.rank || 4]}
                  </Badge>
                </div>
              </div>

              <div className="mt-5 space-y-2.5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#1E3A5F]">
                  <span className="text-slate-400">Sponsor Code:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {user?.sponsorCode || 'BIZ-88219'}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#1E3A5F]">
                  <span className="text-slate-400">Assigned Region:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[150px]">
                    {user?.region?.split('(')[0] || 'Northeast'}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#1E3A5F]">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Good Standing</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#1E3A5F] text-[11px] text-slate-400">
              Rank 4+ unlocks 6 downline leadership menus, team override splits, and recruitment bonuses.
            </div>
          </Card>
        </div>

        {/* Profile Settings Form & Billing History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Details Form */}
          <Card className="p-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4">
              Advisor Profile Credentials
            </h3>
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Full Name / Legal Broker Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Corporate Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Direct Phone Line
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-slate-900 dark:text-slate-100 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Broker / NMLS ID
                  </label>
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-slate-900 dark:text-slate-100 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Designated Operating Region
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-slate-900 dark:text-slate-100 focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" variant="primary" size="sm" disabled={isSaving}>
                  <Save className="w-4 h-4 mr-1.5" />
                  {isSaving ? 'Saving Changes...' : 'Save Profile'}
                </Button>
              </div>
            </form>
          </Card>

          {/* Billing Receipts History */}
          <Card className="p-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Subscription Receipts ($25/mo)
              </h3>
              <Badge variant="primary" size="sm">
                4 Receipts
              </Badge>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-[#1E3A5F]/60 text-xs">
              {invoices.map((inv) => (
                <div key={inv.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-[#12294A] text-slate-600 dark:text-slate-300">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">{inv.id}</span>
                      <span className="text-[11px] text-slate-400">
                        {inv.date} • {inv.method}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                      {inv.amount}
                    </span>
                    <Badge variant="emerald" size="sm">
                      {inv.status}
                    </Badge>
                    <button
                      onClick={() =>
                        toast({
                          title: `Downloading ${inv.id}.pdf`,
                          description: 'Receipt PDF generated for expense accounting.',
                          type: 'success',
                        })
                      }
                      className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
