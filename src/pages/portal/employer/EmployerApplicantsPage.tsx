import React, { useState } from 'react'
import {
  Users,
  Search,
  FileText,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Download,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Star,
  ChevronRight,
  UserCheck,
  Send,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Drawer } from '@/components/ui/Drawer'
import { useToast } from '@/components/ui/Toast'
import { MOCK_APPLICANTS, Applicant } from '@/mock-data/jobsBoardData'

export type CandidateStage = 'New' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected'

export const KANBAN_STAGES: CandidateStage[] = ['New', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected']

export const EmployerApplicantsPage: React.FC = () => {
  const { toast } = useToast()

  // Map mock data stages to strict prompt stage names
  const [applicants, setApplicants] = useState<Applicant[]>(() =>
    MOCK_APPLICANTS.map((a) => {
      let stage: CandidateStage = 'New'
      if (a.stage === 'Screened') stage = 'Screening'
      else if (a.stage === 'Interview') stage = 'Interview'
      else if (a.stage === 'Offer') stage = 'Offer'
      else if (a.stage === 'Hired') stage = 'Hired'
      else if (a.stage === 'Rejected') stage = 'Rejected'
      return { ...a, stage: stage as any }
    })
  )

  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [candidateNotes, setCandidateNotes] = useState<Record<string, string>>({})

  const moveStage = (id: string, newStage: CandidateStage) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, stage: newStage as any } : app))
    )
    if (selectedApplicant && selectedApplicant.id === id) {
      setSelectedApplicant({ ...selectedApplicant, stage: newStage as any })
    }
    toast({
      title: 'Applicant Stage Updated',
      description: `Moved candidate to "${newStage}" stage.`,
      type: 'success',
    })
  }

  const handleSaveNote = (id: string, note: string) => {
    setCandidateNotes((prev) => ({ ...prev, [id]: note }))
    toast({ title: 'Candidate Notes Saved', description: 'Internal recruiter notes updated.', type: 'info' })
  }

  const filteredApplicants = applicants.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.appliedJobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Candidate Applicants Kanban Pipeline"
        description="Drag or move applicants across 6 recruitment stages: New, Screening, Interview, Offer, Hired, and Rejected."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'Applicants Kanban' }]}
        badge={
          <Badge variant="emerald" size="md">
            {applicants.length} Total Applicants
          </Badge>
        }
        actions={
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidates by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        }
      />

      {/* KANBAN BOARD LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-4">
        {KANBAN_STAGES.map((stage) => {
          const stageApps = filteredApplicants.filter((a) => (a.stage as any) === stage)
          return (
            <div
              key={stage}
              className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-3 border border-slate-200 dark:border-slate-800 space-y-3 min-w-[210px]"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                  {stage}
                </span>
                <Badge variant={stage === 'Hired' ? 'emerald' : stage === 'Rejected' ? 'danger' : 'navy'} size="sm">
                  {stageApps.length}
                </Badge>
              </div>

              <div className="space-y-3 min-h-[420px]">
                {stageApps.map((app) => (
                  <Card
                    key={app.id}
                    variant="default"
                    hover
                    onClick={() => {
                      setSelectedApplicant(app)
                      setIsDrawerOpen(true)
                    }}
                    className="p-3 cursor-pointer space-y-2 border border-slate-200 dark:border-slate-700 hover:border-blue-500 bg-white dark:bg-slate-900"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <img src={app.avatar} alt={app.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                      <Badge variant="emerald" size="sm">
                        {app.matchScore}% Match
                      </Badge>
                    </div>

                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">{app.name}</h4>
                      <p className="text-[11px] text-slate-500 truncate">{app.appliedJobTitle}</p>
                    </div>

                    <div className="text-[10px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span>{app.experienceYears} yrs exp</span>
                      <span>{app.appliedDate}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* CANDIDATE DRAWER SHOWING RESUME & NOTES */}
      {selectedApplicant && (
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={`Candidate Dossier: ${selectedApplicant.name}`}
          size="lg"
        >
          <div className="space-y-6 text-left p-2 text-xs">
            {/* Top Overview Box */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <img src={selectedApplicant.avatar} alt={selectedApplicant.name} className="w-14 h-14 rounded-full object-cover border-2 border-blue-500" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{selectedApplicant.name}</h3>
                  <Badge variant="emerald" size="sm">
                    {selectedApplicant.matchScore}% Match Score
                  </Badge>
                </div>
                <div className="text-xs text-slate-500">{selectedApplicant.appliedJobTitle} • {selectedApplicant.location}</div>
                <div className="text-[11px] text-slate-400 flex items-center gap-3 pt-0.5">
                  <span>{selectedApplicant.email}</span>
                  <span>{selectedApplicant.phone}</span>
                </div>
              </div>
            </div>

            {/* Stage Selector */}
            <div className="space-y-2">
              <label className="font-bold text-slate-700 dark:text-slate-300 block uppercase text-[11px]">
                Stage Pipeline Progression
              </label>
              <div className="flex flex-wrap gap-1.5">
                {KANBAN_STAGES.map((st) => (
                  <button
                    key={st}
                    onClick={() => moveStage(selectedApplicant.id, st)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      (selectedApplicant.stage as any) === st
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Recruiter Notes Input */}
            <div className="space-y-2">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">Internal Recruiter Notes</label>
              <textarea
                rows={3}
                value={candidateNotes[selectedApplicant.id] || selectedApplicant.coverNote || ''}
                onChange={(e) => handleSaveNote(selectedApplicant.id, e.target.value)}
                placeholder="Add interview feedback or background check notes..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
              />
            </div>

            {/* Resume Attachment Card */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-500" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{selectedApplicant.name}_Resume.pdf</div>
                  <div className="text-[10px] text-slate-400">PDF Document • Verified Candidate File</div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast({ title: 'Downloading Resume PDF...', type: 'success' })}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                Download PDF
              </Button>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  )
}
