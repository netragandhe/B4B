import React, { useState } from 'react'
import { Settings, Save, CreditCard, Building2, ShieldCheck, CheckCircle2, UserCheck } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'
import { PartnerType } from '@/mock-data/affiliateData'

export const AffiliateProfilePage: React.FC = () => {
  const { toast } = useToast()

  const [partnerType, setPartnerType] = useState<PartnerType>('Affiliate')
  const [companyName, setCompanyName] = useState('Vance Digital Growth')
  const [bankName, setBankName] = useState('JPMorgan Chase Bank')
  const [accountNumber, setAccountNumber] = useState('•••• •••• 4912')
  const [routingNumber, setRoutingNumber] = useState('021000021')
  const [paypalEmail, setPaypalEmail] = useState('affiliate@demo.com')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Partner Profile Saved',
      description: `Updated partner type to "${partnerType}" and saved direct payout method settings.`,
      type: 'success',
    })
  }

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      <PageHeader
        title="Partner Profile & Payout Settings"
        description="Configure your partner category type (Affiliate, Partner, Influencer), tax W-9 documentation, and direct deposit details."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'Partner Profile' }]}
        badge={
          <Badge variant="emerald" size="md" dot>
            W-9 Tax Verified
          </Badge>
        }
      />

      <Card variant="bento" className="p-6 border border-slate-200 dark:border-slate-800 space-y-6">
        <form onSubmit={handleSave} className="space-y-5 text-xs">
          {/* PARTNER TYPE SELECTION */}
          <div className="space-y-2 border-b pb-4 border-slate-100 dark:border-slate-800">
            <label className="font-bold text-slate-900 dark:text-white block text-sm">
              1. Partner Channel Type
            </label>
            <p className="text-xs text-slate-500">Select how you primarily introduce commercial clients to B4B.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {(['Affiliate', 'Partner', 'Influencer'] as PartnerType[]).map((t) => (
                <div
                  key={t}
                  onClick={() => setPartnerType(t)}
                  className={`p-3 rounded-xl border cursor-pointer text-left transition-all ${
                    partnerType === t
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md font-bold'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-400'
                  }`}
                >
                  <div className="text-sm font-bold">{t}</div>
                  <div className="text-[10px] opacity-80">
                    {t === 'Affiliate'
                      ? 'Digital link clicks & referrals'
                      : t === 'Partner'
                      ? 'Strategic enterprise introductions'
                      : 'Creator & social audience traffic'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COMPANY & TAX DETAILS */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. Business & Tax Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold block mb-1">Company / Entity Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-bold"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Tax Form Status</label>
                <div className="px-3 py-2 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-between">
                  <span>W-9 Tax Form Submitted</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>

          {/* PAYOUT METHOD DETAILS */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">3. Direct Commission Payout Method</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold block mb-1">Bank Name</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Account Number</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Routing Number</label>
                <input
                  type="text"
                  value={routingNumber}
                  onChange={(e) => setRoutingNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-3">
            <Button type="submit" variant="accent" size="md" className="w-full" leftIcon={<Save className="w-4 h-4" />}>
              Save Partner Profile Settings
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
