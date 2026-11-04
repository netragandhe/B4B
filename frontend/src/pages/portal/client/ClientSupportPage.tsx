import React, { useState } from 'react'
import { HelpCircle, Send, MessageSquare, PhoneCall, FileText, CheckCircle2, ChevronDown } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'

export const ClientSupportPage: React.FC = () => {
  const { toast } = useToast()

  const [ticketSubject, setTicketSubject] = useState('')
  const [ticketBody, setTicketBody] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticketSubject.trim()) return

    toast({
      title: 'Support Ticket Created',
      description: `Ticket #${Math.floor(1000 + Math.random() * 9000)} submitted to B4B Support. Response within 2 hours.`,
      type: 'success',
    })
    setTicketSubject('')
    setTicketBody('')
  }

  const faqs = [
    { q: 'How quickly are working capital applications processed?', a: 'Underwriters review uploaded P&L and bank statements in under 4 hours. Final term sheets are issued within 24 hours.' },
    { q: 'Can I upload files directly from my mobile phone?', a: 'Yes, your eBOX document vault works seamlessly on desktop, tablet, and mobile browsers.' },
    { q: 'What is included in the Fractional CFO advisory package?', a: 'You receive weekly 1-on-1 strategy sessions, monthly financial health audits, and custom credit building roadmaps.' },
  ]

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      <PageHeader
        title="Client Support & Knowledge Help Desk"
        description="Submit support tickets, get assistance with document uploads, or contact the B4B client operations team."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'Support' }]}
        badge={
          <Badge variant="navy" size="md">
            24/7 Operations Desk
          </Badge>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SUBMIT A TICKET */}
        <Card variant="default" className="p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <span>Submit a Client Support Ticket</span>
          </h3>

          <form onSubmit={handleSubmitTicket} className="space-y-3 text-xs">
            <div>
              <label className="font-bold block mb-1">Subject</label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="e.g., Question about SBA term sheet upload..."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Description / Issue Details</label>
              <textarea
                rows={4}
                value={ticketBody}
                onChange={(e) => setTicketBody(e.target.value)}
                placeholder="Describe your question or issue in detail..."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
              />
            </div>

            <Button type="submit" variant="accent" size="sm" leftIcon={<Send className="w-3.5 h-3.5" />}>
              Send Support Ticket
            </Button>
          </form>
        </Card>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <Card variant="default" className="p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-purple-500" />
            <span>Client Frequently Asked Questions</span>
          </h3>

          <div className="space-y-2 text-xs">
            {faqs.map((f, i) => (
              <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-3 font-bold text-left flex items-center justify-between bg-slate-50 dark:bg-slate-900/60"
                >
                  <span>{f.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="p-3 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
