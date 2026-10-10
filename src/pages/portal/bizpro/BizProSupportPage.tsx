import React, { useState } from 'react'
import {
  HelpCircle,
  Mail,
  Phone,
  MessageSquare,
  Plus,
  Send,
  CheckCircle2,
  Clock,
  LifeBuoy,
  FileText,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { FormField } from '@/components/ui/FormField'
import { Textarea } from '@/components/ui/Textarea'
import { Modal } from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'
import { createStore } from '@/lib/createStore'

interface SupportTicket {
  id: string
  ticketNumber: string
  subject: string
  category: 'Underwriting' | 'Commission' | 'Technical' | 'Lead Routing'
  priority: 'Normal' | 'High' | 'Urgent'
  status: 'Open' | 'In Progress' | 'Resolved'
  createdDate: string
}

const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt_1',
    ticketNumber: 'TKT-2026-881',
    subject: 'UCC-1 Priority Lien Subordination Request (Apex Freight)',
    category: 'Underwriting',
    priority: 'High',
    status: 'In Progress',
    createdDate: '2026-10-09',
  },
  {
    id: 'tkt_2',
    ticketNumber: 'TKT-2026-742',
    subject: 'Direct ACH Settlement Verification for Sep Overrides',
    category: 'Commission',
    priority: 'Normal',
    status: 'Resolved',
    createdDate: '2026-10-02',
  },
]

const ticketsStore = createStore<SupportTicket[]>('coach_support_tickets', INITIAL_TICKETS)

export const BizProSupportPage: React.FC = () => {
  const { toast } = useToast()
  const tickets = ticketsStore.useStore()
  const [newTicketModalOpen, setNewTicketModalOpen] = useState(false)
  const [subject, setSubject] = useState('')
  const [category, setCategory] = useState<SupportTicket['category']>('Underwriting')
  const [priority, setPriority] = useState<SupportTicket['priority']>('Normal')
  const [description, setDescription] = useState('')

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim()) return

    const newTicket: SupportTicket = {
      id: `tkt_${Date.now()}`,
      ticketNumber: `TKT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      subject,
      category,
      priority,
      status: 'Open',
      createdDate: new Date().toISOString().split('T')[0],
    }

    ticketsStore.set((prev) => [newTicket, ...prev])
    setNewTicketModalOpen(false)
    setSubject('')
    setDescription('')

    toast({
      title: 'Ticket Submitted Successfully',
      description: `Support reference ${newTicket.ticketNumber} assigned to priority desk.`,
      type: 'success',
    })
  }

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Support & Executive Underwriting Help Desk"
        description="Dedicated priority underwriting assistance, deal packaging reviews, and technical portal support."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/bizpro/bulletin' },
          { label: 'Support', icon: <HelpCircle className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="emerald" size="md">
            Priority VIP Desk (Active)
          </Badge>
        }
        actions={
          <Button
            variant="accent"
            size="md"
            onClick={() => setNewTicketModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
            className="font-bold gap-1.5"
          >
            Create Support Ticket
          </Button>
        }
      />

      {/* QUICK CONTACT CHANNELS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card variant="bento" className="p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-sm text-white">Underwriting Risk Desk</h4>
          <p className="text-xs text-slate-400">underwriting@b4bamerica.com</p>
          <a
            href="mailto:underwriting@b4bamerica.com"
            className="inline-flex items-center justify-center w-full py-2 px-3 rounded-xl border border-slate-700 bg-slate-900 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Email Underwriting
          </a>
        </Card>

        <Card variant="bento" className="p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <Phone className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-sm text-white">Executive Toll-Free Hotline</h4>
          <p className="text-xs text-slate-400">+1 (800) 555-0199 (Ext. 2)</p>
          <a
            href="tel:+18005550199"
            className="inline-flex items-center justify-center w-full py-2 px-3 rounded-xl border border-slate-700 bg-slate-900 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Call Support Hotline
          </a>
        </Card>

        <Card variant="bento" className="p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-sm text-white">Live Deal Structuring Desk</h4>
          <p className="text-xs text-slate-400">Mon–Fri 8:00 AM – 8:00 PM EST</p>
          <Button
            size="sm"
            variant="accent"
            className="w-full text-xs font-bold"
            onClick={() => setNewTicketModalOpen(true)}
          >
            Open Deal Request
          </Button>
        </Card>
      </div>

      {/* TICKETS HISTORY TABLE */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold font-heading text-white">Your Support & Inquiry Tickets</h3>

        <Card variant="default" className="divide-y divide-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Ticket #</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {tickets.map((tkt) => (
                  <tr key={tkt.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-400">{tkt.ticketNumber}</td>
                    <td className="py-3.5 px-4 font-bold text-white">{tkt.subject}</td>
                    <td className="py-3.5 px-4 text-slate-300">{tkt.category}</td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={tkt.priority === 'Urgent' ? 'danger' : tkt.priority === 'High' ? 'amber' : 'default'}
                        size="sm"
                      >
                        {tkt.priority}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">{tkt.createdDate}</td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          tkt.status === 'Resolved' ? 'emerald' : tkt.status === 'In Progress' ? 'royal' : 'amber'
                        }
                        size="sm"
                      >
                        {tkt.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* CREATE TICKET MODAL */}
      <Modal
        isOpen={newTicketModalOpen}
        onClose={() => setNewTicketModalOpen(false)}
        title="Open Support / Underwriting Ticket"
        description="Submit deal packaging questions, subordination requests, or platform technical inquiries."
        maxWidth="md"
      >
        <form onSubmit={handleCreateTicket} className="space-y-4 text-left text-xs">
          <FormField label="Subject / Brief Summary" required id="tkt-sub">
            <Input
              id="tkt-sub"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Line of credit underwriting review for Apex Freight"
              required
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Department Category" required id="tkt-cat">
              <select
                id="tkt-cat"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              >
                <option value="Underwriting">Underwriting Risk Desk</option>
                <option value="Commission">Commission & Payouts</option>
                <option value="Technical">Platform & Tools Support</option>
                <option value="Lead Routing">Territory & Lead Routing</option>
              </select>
            </FormField>

            <FormField label="Urgency Priority" required id="tkt-prio">
              <select
                id="tkt-prio"
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent (Deal Pending)</option>
              </select>
            </FormField>
          </div>

          <FormField label="Detailed Description / Notes" required id="tkt-desc">
            <Textarea
              id="tkt-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Provide relevant details, client name, facility type, and questions..."
              required
            />
          </FormField>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setNewTicketModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" className="font-bold gap-1.5">
              <Send className="w-4 h-4" />
              Submit Ticket
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
