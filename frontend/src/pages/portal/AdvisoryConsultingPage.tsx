import React, { useState } from 'react'
import {
  Users,
  Calendar,
  Video,
  CheckCircle2,
  Clock,
  Plus,
  FileCheck,
  Briefcase,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Modal } from '@/components/ui/Modal'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { DatePicker } from '@/components/ui/DatePicker'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { CONSULTATION_SESSIONS } from '@/mock-data/fintechData'
import { useToast } from '@/components/ui/Toast'

export const AdvisoryConsultingPage: React.FC = () => {
  const { toast } = useToast()
  const [sessions, setSessions] = useState(CONSULTATION_SESSIONS)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [newTopic, setNewTopic] = useState('')
  const [newDate, setNewDate] = useState('2026-10-28')
  const [newAdvisor, setNewAdvisor] = useState('Victoria Hastings')

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault()
    const newSession = {
      id: `cs-${Date.now()}`,
      advisorName: newAdvisor,
      advisorRole: 'Senior Managing Director & Fractional CFO',
      advisorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      topic: newTopic || 'Q4 Margin Expansion & Debt Covenants Review',
      date: newDate,
      time: '3:00 PM EST',
      status: 'Confirmed' as const,
      duration: '45 mins',
      actionItemsCount: 3,
    }

    setSessions([newSession, ...sessions])
    setIsBookingOpen(false)
    toast({
      title: 'Consultation Scheduled',
      description: `Session with ${newAdvisor} added to your executive calendar.`,
      type: 'success',
    })
  }

  return (
    <div className="space-y-8 text-left">
      <div className="space-y-2">
        <Breadcrumb items={[{ label: 'Advisory & CFO' }]} />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              Fractional CFO & Advisory Practice
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Direct access to seasoned corporate finance partners, treasury reviews, and strategic planning.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            pill
            onClick={() => setIsBookingOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Book Strategy Session
          </Button>
        </div>
      </div>

      {/* Advisory Partner Spotlight */}
      <Card variant="bento" className="p-6 border-blue-200 dark:border-[#1E3A5F]">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            name="Victoria Hastings"
            size="xl"
            status="online"
          />
          <div className="flex-1 text-center sm:text-left space-y-1">
            <Badge variant="emerald" size="sm" dot>
              Assigned Lead Partner
            </Badge>
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Victoria Hastings, CPA / CFA
            </h3>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
              Senior Managing Director & Lead Fractional CFO
            </p>
            <p className="text-xs text-slate-500 max-w-2xl leading-relaxed pt-1">
              "We've structured your revolving credit lines and optimized the cash conversion cycle down to 42 days. Next up: preparing Q4 audit packs for prospective acquisition syndicates."
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsBookingOpen(true)}
            leftIcon={<Video className="w-3.5 h-3.5 text-emerald-500" />}
          >
            Schedule 1-on-1
          </Button>
        </div>
      </Card>

      {/* Sessions History & Action Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scheduled Sessions */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
            Upcoming & Past Consultations
          </h3>

          <div className="space-y-3">
            {sessions.map((s) => (
              <Card key={s.id} variant="default" className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar src={s.advisorAvatar} name={s.advisorName} size="md" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{s.topic}</h4>
                      <p className="text-xs text-slate-500">{s.advisorName} • {s.duration}</p>
                    </div>
                  </div>
                  <Badge variant={s.status === 'Confirmed' ? 'primary' : 'default'} size="sm">
                    {s.status}
                  </Badge>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    {s.date} at {s.time}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toast({ title: 'Meeting Room', description: 'Zoom conference link copied.', type: 'info' })}
                    leftIcon={<Video className="w-3 h-3 text-emerald-500" />}
                    className="h-7 text-xs"
                  >
                    Join Room
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Items & Strategic Deliverables */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
            Advisory Action Deliverables
          </h3>

          <Card variant="default" className="p-5 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-[#1E3A5F]">
              <span className="font-bold text-slate-700 dark:text-slate-300">Deliverable Status</span>
              <span className="text-emerald-500 font-bold">4 of 5 Complete</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  Audit DSO (Days Sales Outstanding) & supplier payment terms.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  Deliver 13-week rolling cash forecast spreadsheet model.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  Establish $500k primary revolving line syndication covenants.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900">
                <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Assemble institutional data room for Q4 commercial expansion.
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Book New Session Modal */}
      <Modal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        title="Schedule Strategic CFO Advisory Session"
        description="Book dedicated time with your assigned lead partner."
        maxWidth="md"
      >
        <form onSubmit={handleBookSession} className="space-y-4">
          <FormField label="Consultation Topic" required>
            <Input
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="e.g. Q4 Debt Cost Optimization & Tax Structuring"
            />
          </FormField>

          <FormField label="Select Lead Advisor" required>
            <Select
              value={newAdvisor}
              onChange={(e) => setNewAdvisor(e.target.value)}
              options={[
                { label: 'Victoria Hastings (Fractional CFO & Treasury)', value: 'Victoria Hastings' },
                { label: 'Derrick Vance (Head of Debt Syndication)', value: 'Derrick Vance' },
                { label: 'Elena Rostova (M&A Strategy Partner)', value: 'Elena Rostova' },
              ]}
            />
          </FormField>

          <FormField label="Preferred Date" required>
            <DatePicker
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </FormField>

          <div className="pt-3 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsBookingOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" pill>
              Confirm Appointment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
