import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  HelpCircle,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  Send,
  CheckCircle2,
  Clock,
  Shield,
  LifeBuoy,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

export const BizProSupportPage: React.FC = () => {
  const { toast } = useToast()
  const [ticketSubject, setTicketSubject] = useState('')
  const [ticketCategory, setTicketCategory] = useState('Underwriting Review')
  const [ticketDetails, setTicketDetails] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: 'Support Ticket #T-8821 Created',
        description: 'Assigned to Senior Underwriting Supervisor. Response guaranteed within 2 hours.',
        type: 'success',
      })
      setTicketSubject('')
      setTicketDetails('')
    }, 600)
  }

  const faqs = [
    {
      q: 'How fast do underwriter credit decisions come back?',
      a: 'Working capital revolvers and equipment leases receive term sheet offers within 24 to 48 hours of clean bank statement submission.',
    },
    {
      q: 'When are direct commission originations paid out?',
      a: 'Commissions are disbursed every Friday via ACH direct deposit immediately following lender loan disbursement.',
    },
    {
      q: 'How are downline overrides calculated?',
      a: 'Rank 4+ Regional Directors earn 2.0% volume override on all direct downline production, and 1.0% on tier-2 recruits.',
    },
    {
      q: 'Can I rebrand the client loan application under my own domain?',
      a: 'Yes! Navigate to the White-label Branding tab to assign your custom subdomain and logo.',
    },
  ]

  return (
    <>
      <Helmet>
        <title>VIP Advisor Support Desk | Biz Pro Terminal</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              VIP Underwriting & Platform Support
            </h1>
            <Badge variant="emerald" size="sm">
              Priority Escrow Support
            </Badge>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Direct access to dedicated commercial underwriters, licensing liaisons, and technical support.
          </p>
        </div>

        {/* Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold">Priority Phone Bridge</span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">(800) 555-BIZPRO</p>
              <span className="text-[10px] text-emerald-500">Mon-Fri 8am-8pm EST</span>
            </div>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold">Deal Desk Email</span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">deals@b4b.finance</p>
              <span className="text-[10px] text-blue-500">&lt; 1 Hour SLA Response</span>
            </div>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold">Advisor Status</span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">VIP Fast-Track</p>
              <span className="text-[10px] text-purple-500">Rank 4 Priority Tier</span>
            </div>
          </Card>
        </div>

        {/* Ticket Form & FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4">
              Open Underwriting Support Ticket
            </h3>
            <form onSubmit={handleTicketSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Ticket Subject *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Need manual review on Beacon Ridge logistics debt file"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-slate-900 dark:text-slate-100 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Issue Category
                </label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-slate-900 dark:text-slate-100 focus:outline-hidden"
                >
                  <option value="Underwriting Review">Underwriting Review & Exception</option>
                  <option value="Term Sheet Negotiation">Term Sheet Rate & Factor Adjustment</option>
                  <option value="Commission Settlement">Commission Settlement & Direct Deposit</option>
                  <option value="Downline Attribution">Downline Attribution & Sponsor Link</option>
                  <option value="White-label Domain">White-label Domain SSL & DNS</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Case Details & Deal ID
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your request, deal ID, client entity name..."
                  value={ticketDetails}
                  onChange={(e) => setTicketDetails(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-slate-900 dark:text-slate-100 focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Dispatching Ticket...' : 'Submit Support Ticket'}
                </Button>
              </div>
            </form>
          </Card>

          {/* FAQs */}
          <Card className="p-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] text-xs"
                >
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{faq.q}</h4>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
