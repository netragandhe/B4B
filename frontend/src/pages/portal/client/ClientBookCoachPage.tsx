import React, { useState } from 'react'
import { Calendar as CalendarIcon, Clock, Video, CheckCircle2, User, Sparkles, Send } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { useToast } from '@/components/ui/Toast'
import { CLIENT_BOOKING_SLOTS } from '@/mock-data/clientData'

export const ClientBookCoachPage: React.FC = () => {
  const { toast } = useToast()

  const [selectedDate, setSelectedDate] = useState<string>('2026-10-09')
  const [selectedSlot, setSelectedSlot] = useState<string>('11:30 AM EST')
  const [topic, setTopic] = useState<string>('SBA 7(a) Loan Application Review')
  const [notes, setNotes] = useState<string>('')
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault()
    setIsConfirmed(true)
    toast({
      title: 'Strategy Session Confirmed!',
      description: `Booked 1-on-1 session with Marcus Vance for ${selectedDate} at ${selectedSlot}. Calendar invite sent.`,
      type: 'success',
    })
  }

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      <PageHeader
        title="Book 1-on-1 Strategy Session with Coach"
        description="Select an available time slot for your dedicated Business Coach session via Zoom or Phone."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'Book a Coach' }]}
        badge={
          <Badge variant="emerald" size="md">
            Dedicated Advisor: Marcus Vance
          </Badge>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* COACH PROFILE SIDEBAR */}
        <Card variant="bento" className="md:col-span-4 p-5 space-y-4 border border-slate-200 dark:border-slate-800 text-center">
          <Avatar src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" name="Marcus Vance" size="lg" className="mx-auto" />
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Marcus Vance</h3>
            <p className="text-xs text-slate-500">Senior Business Coach & CFO Advisor</p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <div className="font-bold">Specializations:</div>
            <div>SBA Debt Structuring, Working Capital, Paydex Credit Optimization</div>
          </div>
        </Card>

        {/* CALENDAR STYLE TIME SLOT SELECTOR */}
        <Card variant="default" className="md:col-span-8 p-6 border border-slate-200 dark:border-slate-800 space-y-5">
          <form onSubmit={handleBook} className="space-y-4 text-xs">
            {/* Date Picker */}
            <div>
              <label className="font-bold block mb-1">1. Select Call Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-bold"
              />
            </div>

            {/* Time Slots Grid */}
            <div>
              <label className="font-bold block mb-1">2. Select Available Time Slot</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CLIENT_BOOKING_SLOTS.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                      !slot.available
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border-slate-200 dark:border-slate-800'
                        : selectedSlot === slot.time
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                    }`}
                  >
                    <div>{slot.time}</div>
                    <div className="text-[10px] font-normal opacity-80">{slot.available ? 'Available' : 'Booked'}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Selection */}
            <div>
              <label className="font-bold block mb-1">3. Primary Call Topic</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-bold"
              >
                <option value="SBA 7(a) Loan Application Review">SBA 7(a) Loan Application Review</option>
                <option value="Working Capital Facility Structuring">Working Capital Facility Structuring</option>
                <option value="Fractional CFO & Cash Flow Advisory">Fractional CFO & Cash Flow Advisory</option>
                <option value="Corporate Credit Building Strategy">Corporate Credit Building Strategy</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="font-bold block mb-1">Special Questions or Preparation Notes</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Let Marcus know specific topics you want to cover..."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
              />
            </div>

            <Button type="submit" variant="accent" size="md" className="w-full" leftIcon={<CalendarIcon className="w-4 h-4" />}>
              Confirm Session Booking
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
