import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Award,
  Clock,
  CheckCircle2,
  Calendar,
  Building2,
  ChevronRight,
  FileText,
  MapPin,
  Briefcase,
  MessageSquare,
  AlertCircle,
  XCircle,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { useToast } from '@/components/ui/Toast'

interface ApplicationRecord {
  id: string
  title: string
  company: string
  appliedDate: string
  status: 'New' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected'
  stageVariant: 'primary' | 'amber' | 'emerald' | 'navy' | 'danger'
  currentStepIndex: number // 0 to 4
  nextStep: string
  salary: string
  location: string
  recruiterName: string
  recruiterEmail: string
  timeline: { step: string; date: string; completed: boolean }[]
}

export const JobSeekerApplicationsPage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [applications, setApplications] = useState<ApplicationRecord[]>([
    {
      id: 'app-101',
      title: 'Senior Enterprise Account Executive',
      company: 'Nexus FinTech Solutions',
      appliedDate: 'Oct 04, 2026',
      status: 'Interview',
      stageVariant: 'amber',
      currentStepIndex: 2,
      nextStep: 'Zoom Technical Interview scheduled for Oct 10 at 2:00 PM EST',
      salary: '$130,000 - $210,000',
      location: 'New York, NY (Remote)',
      recruiterName: 'Sarah Jenkins (VP Talent)',
      recruiterEmail: 's.jenkins@nexusfintech.demo',
      timeline: [
        { step: 'Applied', date: 'Oct 04, 2026', completed: true },
        { step: 'Resume Screened', date: 'Oct 05, 2026', completed: true },
        { step: 'Technical Interview', date: 'Oct 10, 2026', completed: false },
        { step: 'Executive Offer', date: 'Pending', completed: false },
      ],
    },
    {
      id: 'app-102',
      title: 'B2B Commercial Credit Advisor',
      company: 'Apex Capital Group',
      appliedDate: 'Sep 28, 2026',
      status: 'Screening',
      stageVariant: 'primary',
      currentStepIndex: 1,
      nextStep: 'Hiring committee reviewing initial candidate background packet',
      salary: '$85,000 - $140,000',
      location: 'Chicago, IL',
      recruiterName: 'David Miller',
      recruiterEmail: 'dmiller@apexcapital.demo',
      timeline: [
        { step: 'Applied', date: 'Sep 28, 2026', completed: true },
        { step: 'Resume Screened', date: 'In Progress', completed: false },
        { step: 'Interview Round', date: 'Pending', completed: false },
        { step: 'Executive Offer', date: 'Pending', completed: false },
      ],
    },
    {
      id: 'app-103',
      title: 'Senior Software Sales Manager',
      company: 'CloudFlow Operations',
      appliedDate: 'Sep 15, 2026',
      status: 'Offer',
      stageVariant: 'emerald',
      currentStepIndex: 3,
      nextStep: 'Offer letter dispatched ($150k base + stock options). Response due Oct 12.',
      salary: '$140,000 - $230,000',
      location: 'Austin, TX (Hybrid)',
      recruiterName: 'Elena Rostova',
      recruiterEmail: 'erostova@cloudflow.demo',
      timeline: [
        { step: 'Applied', date: 'Sep 15, 2026', completed: true },
        { step: 'Resume Screened', date: 'Sep 18, 2026', completed: true },
        { step: 'Interviews Completed', date: 'Sep 28, 2026', completed: true },
        { step: 'Offer Letter Dispatched', date: 'Oct 02, 2026', completed: true },
      ],
    },
  ])

  const [inspectingApp, setInspectingApp] = useState<ApplicationRecord | null>(null)

  const handleWithdraw = (id: string) => {
    setApplications(applications.filter((a) => a.id !== id))
    toast({ title: 'Application Withdrawn', description: 'Your application packet was removed.', type: 'info' })
    if (inspectingApp?.id === id) setInspectingApp(null)
  }

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto">
      <SEOHead title="My Applications | Job Seeker Portal" description="Track your application progress, interview schedules, and job offers." />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'Job Seeker Portal', href: '/portal/seeker/dashboard' }, { label: 'My Applications' }]} />
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white mt-2">
            Application Status Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time pipeline tracking across {applications.length} active applications
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={() => navigate('/portal/seeker/search')}>
          <Briefcase className="w-4 h-4 mr-1.5" /> Find More Openings
        </Button>
      </div>

      <div className="space-y-6">
        {applications.map((app) => (
          <Card key={app.id} variant="default" className="p-6 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-600 dark:text-slate-400 text-xs">{app.company}</span>
                  <Badge variant={app.stageVariant} size="sm">
                    {app.status} Stage
                  </Badge>
                </div>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">{app.title}</h3>
                <div className="text-xs text-slate-400 flex items-center gap-3">
                  <span>Applied on {app.appliedDate}</span>
                  <span>• Pay Range: {app.salary}</span>
                  <span>• {app.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/portal/seeker/messages')}
                  className="text-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 mr-1" /> Contact Recruiter
                </Button>
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => setInspectingApp(app)}
                  className="text-xs font-bold bg-blue-600 text-white"
                >
                  Inspect Pipeline
                </Button>
              </div>
            </div>

            {/* Visual Timeline Stepper */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Pipeline Milestones
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {app.timeline.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                      item.completed
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300'
                        : idx === app.currentStepIndex
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 font-bold'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span>{item.step}</span>
                      {item.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      )}
                    </div>
                    <div className="text-[10px] opacity-80">{item.date}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Action Box */}
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs font-semibold text-blue-900 dark:text-blue-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Next Action: {app.nextStep}</span>
              </div>
              <button
                onClick={() => handleWithdraw(app.id)}
                className="text-[11px] text-rose-500 hover:underline font-bold shrink-0"
              >
                Withdraw Application
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Inspect Detail Drawer / Modal */}
      {inspectingApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <Card variant="default" className="w-full max-w-xl p-6 space-y-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <Badge variant={inspectingApp.stageVariant} size="sm">
                  {inspectingApp.status} Stage
                </Badge>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mt-1">
                  {inspectingApp.title}
                </h3>
                <span className="text-xs text-slate-400">{inspectingApp.company} • {inspectingApp.location}</span>
              </div>
              <button onClick={() => setInspectingApp(null)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">Recruiter & Hiring Lead</div>
                <div className="text-slate-600 dark:text-slate-300">{inspectingApp.recruiterName} ({inspectingApp.recruiterEmail})</div>
                <div className="text-slate-500">Applied Date: {inspectingApp.appliedDate}</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold">Compensation Target: {inspectingApp.salary}</div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">Milestone Progress</div>
                <div className="space-y-2">
                  {inspectingApp.timeline.map((t, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{t.step}</span>
                      <span className="text-slate-500">{t.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setInspectingApp(null)}>
                Close
              </Button>
              <Button
                variant="accent"
                size="sm"
                pill
                onClick={() => {
                  setInspectingApp(null)
                  navigate('/portal/seeker/messages')
                }}
                className="font-bold bg-blue-600 text-white"
              >
                Open Chat with Recruiter
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
