import React, { useState } from 'react'
import {
  Building2,
  TrendingUp,
  FileCheck2,
  MessageSquare,
  Calendar,
  Plus,
  Upload,
  PhoneCall,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Zap,
  Award,
  ArrowUpRight,
  FileText,
  Send,
  X,
  CreditCard,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Modal } from '@/components/ui/Modal'
import { Drawer } from '@/components/ui/Drawer'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { FormField } from '@/components/ui/FormField'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'
import { CLIENT_ACTIVE_ORDERS, CLIENT_FUNDING_APP, CLIENT_COACH_MESSAGES } from '@/mock-data/clientData'
import { THE_16_SERVICES } from '@/mock-data/bizproData'
import { formatCurrency } from '@/lib/utils'

export const ClientDashboardPage: React.FC = () => {
  const { user } = useAuth()
  const { toast } = useToast()

  // In-Place Modals & Drawer States
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [serviceModalOpen, setServiceModalOpen] = useState(false)
  const [coachModalOpen, setCoachModalOpen] = useState(false)
  const [underwritingDrawerOpen, setUnderwritingDrawerOpen] = useState(false)

  // Upload Form State
  const [uploadCategory, setUploadCategory] = useState('P&L and Income Statements')
  const [uploadFileName, setUploadFileName] = useState('')

  // Service Request Form State
  const [selectedService, setSelectedService] = useState('Revenue-Based Working Capital Line')
  const [serviceBudget, setServiceBudget] = useState('250000')
  const [serviceNotes, setServiceNotes] = useState('')

  // Coach Call Form State
  const [coachDate, setCoachDate] = useState('2026-10-15')
  const [coachTime, setCoachTime] = useState('10:00 AM EST')
  const [coachTopic, setCoachTopic] = useState('Quarterly Facility Review & Refinancing')

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUploadModalOpen(false)
    toast({
      title: 'Document Uploaded Successfully',
      description: `${uploadFileName || 'Financial_Filing_2026.pdf'} has been encrypted and secured into your eBOX vault.`,
      type: 'success',
    })
    setUploadFileName('')
  }

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setServiceModalOpen(false)
    toast({
      title: 'Service Request Dispatched',
      description: `Your application for "${selectedService}" (${formatCurrency(Number(serviceBudget) || 250000)}) has been sent to your B4B Coach desk.`,
      type: 'success',
    })
    setServiceNotes('')
  }

  const handleCoachSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCoachModalOpen(false)
    toast({
      title: 'Strategy Session Confirmed',
      description: `Call booked with Marcus Vance on ${coachDate} at ${coachTime}. Calendar invite sent.`,
      type: 'success',
    })
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title={`Welcome back, ${user?.name || 'Apex Freight Logistics'}!`}
        description="Monitor your active capital facilities, funding application progress, credit scores, and coach advisory sessions."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'Client Dashboard' }]}
        badge={
          <Badge variant="emerald" size="md" dot>
            Business Health: 82 / 100
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUploadModalOpen(true)}
              leftIcon={<Upload className="w-3.5 h-3.5 text-blue-500" />}
            >
              Upload Document
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => setServiceModalOpen(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Request a Service
            </Button>
          </div>
        }
      />

      {/* QUICK ACTIONS BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card
          variant="bento"
          onClick={() => setServiceModalOpen(true)}
          className="p-4 cursor-pointer hover:border-blue-500/50 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                Request a Service
              </h4>
              <p className="text-xs text-slate-500">Apply for 16 financial & advisory services</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
        </Card>

        <Card
          variant="bento"
          onClick={() => setUploadModalOpen(true)}
          className="p-4 cursor-pointer hover:border-emerald-500/50 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                Upload Document
              </h4>
              <p className="text-xs text-slate-500">Upload P&L, tax returns, or bank statements</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
        </Card>

        <Card
          variant="bento"
          onClick={() => setCoachModalOpen(true)}
          className="p-4 cursor-pointer hover:border-purple-500/50 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">
                Book a Coach Call
              </h4>
              <p className="text-xs text-slate-500">Schedule 1-on-1 strategy with Marcus Vance</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 transition-colors" />
        </Card>
      </div>

      {/* FUNDING APPLICATION TRACKER STEPPER */}
      <Card variant="bento" className="p-6 space-y-4 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="navy" size="sm">
                Active Application
              </Badge>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {CLIENT_FUNDING_APP.facilityName} ({formatCurrency(CLIENT_FUNDING_APP.requestedAmount)})
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">{CLIENT_FUNDING_APP.underwriterNote}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setUnderwritingDrawerOpen(true)}>
            View Detailed Underwriting Checklist
          </Button>
        </div>

        {/* 5-Step Visual Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
          {CLIENT_FUNDING_APP.steps.map((s, idx) => {
            const isCompleted = s.completed
            const isCurrent = idx === CLIENT_FUNDING_APP.currentStepIndex

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex flex-col justify-between space-y-2 transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900'
                    : isCurrent
                    ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 shadow-xs'
                    : 'bg-slate-50/50 dark:bg-[#12294A]/40 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400">Step {idx + 1}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : isCurrent ? (
                    <Clock className="w-4 h-4 text-blue-500 animate-pulse" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{s.label}</h4>
                  <p className="text-[10px] text-slate-500">{isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* ACTIVE CAPITAL ORDERS & COACH COMMUNICATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ACTIVE ORDERS / CAPITAL FACILITIES */}
        <Card variant="bento" className="lg:col-span-7 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Active Capital Facilities & Orders
              </h3>
              <p className="text-xs text-slate-500">Live non-dilutive credit lines under management.</p>
            </div>
            <Badge variant="emerald" size="sm">
              2 Active Facilities
            </Badge>
          </div>

          <div className="space-y-3">
            {CLIENT_ACTIVE_ORDERS.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-slate-50/50 dark:bg-[#12294A]/40 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-500" />
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{order.serviceName}</span>
                  </div>
                  <Badge variant="emerald" size="sm">
                    {order.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Facility Limit</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">{formatCurrency(order.amount)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Underwriting Progress</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                      {order.progress}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Assigned Advisor</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300 truncate block">{order.assignedAdvisor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ASSIGNED COACH CARD */}
        <Card variant="bento" className="lg:col-span-5 p-6 space-y-4 bg-gradient-to-br from-blue-50/30 to-purple-50/20 dark:from-blue-950/20 dark:to-[#0D1E36]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              Assigned B4B Coach & Desk
            </h3>
            <Badge variant="navy" size="sm">
              Direct Access
            </Badge>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 dark:bg-[#12294A]/70 border border-slate-200 dark:border-slate-800">
            <Avatar
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
              name="Marcus Vance"
              size="md"
              status="online"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Marcus Vance</h4>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Senior Commercial Advisor</p>
              <p className="text-[10px] text-slate-500">District 8 - St. Louis / National Desk</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Latest Advisory Note</span>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 italic">
                "{CLIENT_COACH_MESSAGES[0].text}"
              </p>
            </div>
          </div>

          <Button
            variant="accent"
            size="sm"
            onClick={() => setCoachModalOpen(true)}
            leftIcon={<PhoneCall className="w-3.5 h-3.5" />}
            className="w-full justify-center"
          >
            Schedule Strategy Review Call
          </Button>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* IN-PLACE MODAL 1: UPLOAD DOCUMENT */}
      {/* ========================================================================= */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Financial Document to eBOX"
        description="Encrypted 256-bit vault upload for underwriting verification and annual review."
        maxWidth="md"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
          <FormField label="Document Category" required>
            <Select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              options={[
                { value: 'P&L and Income Statements', label: 'P&L and Income Statements' },
                { value: 'Bank Statements (Trailing 6 Months)', label: 'Bank Statements (Trailing 6 Months)' },
                { value: 'Federal Corporate Tax Returns', label: 'Federal Corporate Tax Returns' },
                { value: 'Accounts Receivable Aging Report', label: 'Accounts Receivable Aging Report' },
                { value: 'Equipment Ownership & Invoices', label: 'Equipment Ownership & Invoices' },
              ]}
            />
          </FormField>

          <FormField label="Select File to Upload" required>
            <Input
              type="file"
              onChange={(e) => setUploadFileName(e.target.files?.[0]?.name || '')}
              required
            />
          </FormField>

          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Files are encrypted end-to-end and directly accessible by your underwriting team.</span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="accent" size="sm" type="submit" leftIcon={<Upload className="w-3.5 h-3.5" />}>
              Upload File
            </Button>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* IN-PLACE MODAL 2: REQUEST SERVICE */}
      {/* ========================================================================= */}
      <Modal
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        title="Request Commercial Capital or Advisory Solution"
        description="Apply for non-dilutive credit lines, equipment term financing, or fractional CFO advisory."
        maxWidth="md"
      >
        <form onSubmit={handleServiceSubmit} className="space-y-4 text-xs">
          <FormField label="Selected Solution" required>
            <Select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              options={THE_16_SERVICES.map((s) => ({ value: s.title, label: s.title }))}
            />
          </FormField>

          <FormField label="Target Facility Amount ($)" required>
            <Input
              type="number"
              value={serviceBudget}
              onChange={(e) => setServiceBudget(e.target.value)}
              required
            />
          </FormField>

          <FormField label="Facility Purpose & Requirements">
            <Input
              placeholder="e.g. Working capital needed for fleet expansion and warehouse leasing..."
              value={serviceNotes}
              onChange={(e) => setServiceNotes(e.target.value)}
            />
          </FormField>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setServiceModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="accent" size="sm" type="submit" leftIcon={<Send className="w-3.5 h-3.5" />}>
              Submit Application
            </Button>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* IN-PLACE MODAL 3: BOOK COACH CALL */}
      {/* ========================================================================= */}
      <Modal
        isOpen={coachModalOpen}
        onClose={() => setCoachModalOpen(false)}
        title="Book 1-on-1 Advisory Call with B4B Coach"
        description="Schedule a 30-minute private capital strategy review with Marcus Vance."
        maxWidth="md"
      >
        <form onSubmit={handleCoachSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label="Date" required>
              <Input
                type="date"
                value={coachDate}
                onChange={(e) => setCoachDate(e.target.value)}
                required
              />
            </FormField>

            <FormField label="Time Slot" required>
              <Select
                value={coachTime}
                onChange={(e) => setCoachTime(e.target.value)}
                options={[
                  { value: '10:00 AM EST', label: '10:00 AM EST' },
                  { value: '11:30 AM EST', label: '11:30 AM EST' },
                  { value: '02:00 PM EST', label: '02:00 PM EST' },
                  { value: '04:30 PM EST', label: '04:30 PM EST' },
                ]}
              />
            </FormField>
          </div>

          <FormField label="Consultation Topic" required>
            <Select
              value={coachTopic}
              onChange={(e) => setCoachTopic(e.target.value)}
              options={[
                { value: 'Quarterly Facility Review & Refinancing', label: 'Quarterly Facility Review & Refinancing' },
                { value: 'Underwriting Term Sheet Explanation', label: 'Underwriting Term Sheet Explanation' },
                { value: 'Fractional CFO Cash Conversion Audit', label: 'Fractional CFO Cash Conversion Audit' },
                { value: 'Equipment & M&A Expansion Capital', label: 'Equipment & M&A Expansion Capital' },
              ]}
            />
          </FormField>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setCoachModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="accent" size="sm" type="submit" leftIcon={<Calendar className="w-3.5 h-3.5" />}>
              Confirm Booking
            </Button>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* IN-PLACE DRAWER: UNDERWRITING CHECKLIST */}
      {/* ========================================================================= */}
      <Drawer
        isOpen={underwritingDrawerOpen}
        onClose={() => setUnderwritingDrawerOpen(false)}
        title="Underwriting & Approval Checklist"
        size="md"
      >
        <div className="space-y-4 text-xs text-left">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
            <span className="font-bold text-blue-700 dark:text-blue-300">Target Facility:</span>
            <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
              {CLIENT_FUNDING_APP.facilityName} ({formatCurrency(CLIENT_FUNDING_APP.requestedAmount)})
            </p>
            <p className="text-[11px] text-slate-500 mt-1">{CLIENT_FUNDING_APP.underwriterNote}</p>
          </div>

          <h4 className="font-bold text-slate-900 dark:text-white pt-2">Required Underwriting Items:</h4>

          <div className="space-y-2">
            {[
              { name: 'Corporate Entity Registration & Good Standing', status: 'Approved', done: true },
              { name: 'Trailing 6 Months Business Bank Statements', status: 'Approved', done: true },
              { name: '2024 & 2025 Corporate Tax Returns', status: 'Approved', done: true },
              { name: 'Underwriter Risk & Cash Flow Model', status: 'In Review', current: true },
              { name: 'Closing Term Sheet Execution', status: 'Pending Approval', done: false },
            ].map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  {item.done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : item.current ? (
                    <Clock className="w-4 h-4 text-blue-500 shrink-0 animate-pulse" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-400 shrink-0" />
                  )}
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</span>
                </div>
                <Badge variant={item.done ? 'emerald' : item.current ? 'primary' : 'default'} size="sm">
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>

          <Button
            variant="accent"
            size="sm"
            onClick={() => {
              setUnderwritingDrawerOpen(false)
              setUploadModalOpen(true)
            }}
            leftIcon={<Upload className="w-3.5 h-3.5" />}
            className="w-full justify-center mt-4"
          >
            Upload Additional Underwriting Documentation
          </Button>
        </div>
      </Drawer>
    </div>
  )
}
