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
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { PageTransition } from '@/components/animations/PageTransition'
import { PageLoadingFallback } from '@/components/ui/PageLoadingFallback'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import { useConsultationSessions } from '@/hooks/queries/useFintechData'
import { useToast } from '@/components/ui/Toast'
import type { ConsultationSession } from '@/mock-data/fintechData'

export const AdvisoryConsultingPage: React.FC = () => {
  const { toast } = useToast()
  const { data: initialSessions, isLoading, isError, refetch } = useConsultationSessions()
  const [sessions, setSessions] = useState<ConsultationSession[]>([])
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [newTopic, setNewTopic] = useState('')
  const [newDate, setNewDate] = useState('2026-10-28')
  const [newAdvisor, setNewAdvisor] = useState('Victoria Hastings')

  React.useEffect(() => {
    if (initialSessions) {
      setSessions(initialSessions)
    }
  }, [initialSessions])

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault()
    const newSession: ConsultationSession = {
      id: `cs-${Date.now()}`,
      advisorName: newAdvisor,
      advisorRole: 'Senior Managing Director & Fractional CFO',
      advisorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      topic: newTopic || 'Q4 Margin Expansion & Debt Covenants Review',
      date: newDate,
      time: '3:00 PM EST',
      status: 'Confirmed',
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

  if (isLoading) return <PageLoadingFallback />
  if (isError) {
    return (
      <ErrorState
        title="Could not load advisory schedule"
        message="Unable to retrieve fractional CFO calendar and booked advisory sessions."
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <PageTransition>
      <div className="space-y-8 text-left">
        <div className="space-y-2">
          <Breadcrumb items={[{ label: 'Advisory & CFO' }]} />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                Fractional CFO & Advisory Sessions
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                1-on-1 strategic capital guidance, covenant compliance, and cash conversion cycle reviews.
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

        {/* Sessions List */}
        {sessions.length === 0 ? (
          <EmptyState
            icon={<Calendar className="w-8 h-8 text-blue-500" />}
            title="No advisory sessions booked"
            description="Book a dedicated strategy briefing with your fractional CFO partner."
            action={
              <Button size="sm" variant="primary" onClick={() => setIsBookingOpen(true)}>
                Schedule First Session
              </Button>
            }
          />
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <Card key={session.id} variant="default" className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <Avatar
                      src={session.advisorAvatar}
                      name={session.advisorName}
                      size="lg"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {session.advisorName}
                        </h3>
                        <Badge
                          variant={session.status === 'Confirmed' ? 'emerald' : 'default'}
                          size="sm"
                        >
                          {session.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500">{session.advisorRole}</p>
                      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-2">
                        {session.topic}
                      </h4>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-2 shrink-0">
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{session.date} • {session.time} ({session.duration})</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        size="sm"
                        variant="accent"
                        onClick={() =>
                          toast({
                            title: 'Launching Zoom Conference',
                            description: 'Connecting to encrypted executive consultation room.',
                            type: 'info',
                          })
                        }
                        leftIcon={<Video className="w-3.5 h-3.5" />}
                        className="text-xs"
                      >
                        Join Video Meeting
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          toast({
                            title: 'Action Items (3)',
                            description: '1. Update Q4 P&L. 2. Verify lender accounts. 3. Sign facility amendment.',
                            type: 'info',
                          })
                        }
                        className="text-xs"
                      >
                        Action Items ({session.actionItemsCount})
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Schedule Modal */}
        <Modal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          title="Schedule Executive Advisory Briefing"
          description="Select an advisor, agenda topic, and preferred consultation window."
          maxWidth="md"
        >
          <form onSubmit={handleBookSession} className="space-y-4 text-xs">
            <FormField label="Assigned CFO Partner" required>
              <Select
                value={newAdvisor}
                onChange={(e) => setNewAdvisor(e.target.value)}
                options={[
                  { label: 'Victoria Hastings (Senior Managing Director & Fractional CFO)', value: 'Victoria Hastings' },
                  { label: 'Derrick Vance (Head of Debt Syndication)', value: 'Derrick Vance' },
                  { label: 'Elena Rostova (Operations & M&A Strategy Partner)', value: 'Elena Rostova' },
                ]}
              />
            </FormField>

            <FormField label="Consultation Topic & Focus" required>
              <Input
                placeholder="e.g. Q4 Cash Flow Forecasting & Line Draw Optimization"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
              />
            </FormField>

            <FormField label="Preferred Date" required>
              <Input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </FormField>

            <div className="pt-3 flex justify-end gap-2.5">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsBookingOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="font-bold">
                Confirm & Schedule
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </PageTransition>
  )
}
