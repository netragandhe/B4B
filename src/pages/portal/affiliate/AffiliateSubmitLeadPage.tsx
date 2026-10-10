import React, { useState } from 'react'
import { UserPlus, Send, CheckCircle2, Building2, Phone, Mail, DollarSign, FileText, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'
import { CMS_16_SOLUTION_PAGES } from '@/mock-data/adminFullData'
import { formatCurrency } from '@/lib/utils'
import { Can } from '@/components/auth/Can'

export const AffiliateSubmitLeadPage: React.FC = () => {
  const { toast } = useToast()

  const [leadName, setLeadName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [serviceInterest, setServiceInterest] = useState(CMS_16_SOLUTION_PAGES[0].title)
  const [facilityAmount, setFacilityAmount] = useState(350000)
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadName || !email) {
      toast({ title: 'Validation Error', description: 'Lead name and email are required.', type: 'warning' })
      return
    }

    toast({
      title: 'Lead Fast-Tracked Successfully!',
      description: `Submitted ${leadName} (${businessName}) for ${serviceInterest} (${formatCurrency(facilityAmount)}). Assigned to Underwriting Desk.`,
      type: 'success',
    })

    setLeadName('')
    setBusinessName('')
    setPhone('')
    setEmail('')
    setNotes('')
  }

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      <PageHeader
        title="Direct Referral Lead Submission"
        description="Submit commercial client leads directly to the B4B underwriting team for fast-track qualification and commission attribution."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'Submit Lead' }]}
        badge={
          <Badge variant="emerald" size="md" dot>
            Fast-Track Commission Attribution
          </Badge>
        }
      />

      <Card variant="bento" className="p-6 border border-slate-200 dark:border-slate-800 space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold block mb-1">Lead Primary Contact Name *</label>
              <input
                type="text"
                required
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                placeholder="e.g. Thomas Wright"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-bold"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">Company / Business Name *</label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Wright Construction LLC"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold block mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 000-0000"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@company.com"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
              />
            </div>
          </div>

          {/* Service Interest & Amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold block mb-1">Desired Financial Service (16 Solutions)</label>
              <select
                value={serviceInterest}
                onChange={(e) => setServiceInterest(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-bold text-blue-600 dark:text-blue-400"
              >
                {CMS_16_SOLUTION_PAGES.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold block mb-1">Estimated Facility Size ($)</label>
              <input
                type="number"
                step={25000}
                value={facilityAmount}
                onChange={(e) => setFacilityAmount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono font-bold"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="font-bold block mb-1">Underwriting Notes & Context</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Mention annual revenue, timeframe to close, or specific machinery/collateral details..."
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              size="md"
              className="w-full bg-[#C8793A] hover:bg-[#b56b30] text-[#06201A] font-extrabold shadow-md border border-[#96521E]/30 cursor-pointer !opacity-100 py-3 rounded-xl transition-all hover:scale-[1.01]"
              leftIcon={<Send className="w-4 h-4 text-[#06201A]" />}
            >
              Submit Lead for Qualification
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
