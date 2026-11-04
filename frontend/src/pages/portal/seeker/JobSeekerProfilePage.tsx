import React, { useState } from 'react'
import {
  FileText,
  Upload,
  UserCheck,
  CheckCircle2,
  Sparkles,
  Plus,
  Trash2,
  Briefcase,
  GraduationCap,
  Percent,
  Save,
  X,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { FormField } from '@/components/ui/FormField'
import { FileUpload } from '@/components/ui/FileUpload'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { useToast } from '@/components/ui/Toast'

export const JobSeekerProfilePage: React.FC = () => {
  const { toast } = useToast()
  const [fullName, setFullName] = useState('Alex Mercer')
  const [headline, setHeadline] = useState('Senior Enterprise Account Executive | SaaS & FinTech Specialist')
  const [email, setEmail] = useState('alex.mercer@demo.com')
  const [phone, setPhone] = useState('(555) 234-8900')
  const [location, setLocation] = useState('New York, NY')
  const [bio, setBio] = useState('6+ years exceeding $1.5M ARR quota in B2B enterprise SaaS, private debt packaging, and fintech API sales.')
  
  const [skills, setSkills] = useState<string[]>([
    'B2B Sales',
    'Enterprise SaaS',
    'Fintech',
    'Commercial Lines',
    'Salesforce CRM',
    'RFP Closing',
    'Quota Exceeded 140%',
  ])
  const [newSkillInput, setNewSkillInput] = useState('')

  const [resumeFileName, setResumeFileName] = useState('Alex_Mercer_Executive_Resume_2026.pdf')
  const [workExperience, setWorkExperience] = useState([
    {
      id: 'exp-1',
      title: 'Senior Enterprise AE',
      company: 'Apex SaaS Technologies',
      duration: '2023 - Present',
      description: 'Closed $2.4M in net new ARR across 14 enterprise financial accounts.',
    },
    {
      id: 'exp-2',
      title: 'Commercial Account Executive',
      company: 'Vanguard Credit Partners',
      duration: '2020 - 2023',
      description: 'Managed full sales cycle for private debt & commercial financing products.',
    },
  ])

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSkillInput.trim()) return
    if (skills.includes(newSkillInput.trim())) return
    setSkills([...skills, newSkillInput.trim()])
    setNewSkillInput('')
    toast({ title: 'Skill tag added', type: 'success' })
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove))
    toast({ title: 'Skill removed', type: 'info' })
  }

  const handleResumeSimulatedUpload = (files: File[]) => {
    if (files.length > 0) {
      setResumeFileName(files[0].name)
      toast({ title: 'New Resume File Attached!', description: files[0].name, type: 'success' })
    }
  }

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast({ title: 'Candidate Profile Saved!', description: 'Your profile and resume were updated.', type: 'success' })
  }

  // Calculate completeness percentage
  const completeness = Math.min(100, Math.round(
    (fullName ? 20 : 0) +
    (headline ? 20 : 0) +
    (bio ? 20 : 0) +
    (skills.length >= 3 ? 20 : 10) +
    (resumeFileName ? 20 : 0)
  ))

  return (
    <div className="space-y-8 text-left max-w-5xl mx-auto">
      <SEOHead title="Profile & Resume | Job Seeker Portal" description="Manage candidate profile details, upload your PDF resume, and edit skills tags." />

      <Breadcrumb items={[{ label: 'Job Seeker Portal', href: '/portal/seeker/dashboard' }, { label: 'Profile & Resume' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
            Candidate Profile & Executive Resume
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Visible to verified corporate recruiters and enterprise employers on B4B
          </p>
        </div>

        <Badge variant="emerald" size="md" className="self-start sm:self-auto font-bold">
          Profile {completeness}% Complete
        </Badge>
      </div>

      {/* Completeness Meter Bar */}
      <Card variant="bento" className="p-4 border border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
          <span>Profile Strength Score</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-mono">{completeness}% Complete</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${completeness}%` }}
          />
        </div>
      </Card>

      <form onSubmit={saveProfile} className="space-y-6">
        {/* Personal Overview Card */}
        <Card variant="default" className="p-6 sm:p-8 space-y-6 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-500" /> Personal & Contact Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Full Name" required>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </FormField>
            <FormField label="Professional Headline" required>
              <Input value={headline} onChange={(e) => setHeadline(e.target.value)} />
            </FormField>

            <FormField label="Email Address" required>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormField>
            <FormField label="Phone Number">
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </FormField>
          </div>

          <FormField label="Location / Metropolitan Region">
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. New York, NY or Remote" />
          </FormField>

          <FormField label="Executive Bio / Summary">
            <Textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
          </FormField>
        </Card>

        {/* Skills Tags Editor */}
        <Card variant="default" className="p-6 sm:p-8 space-y-5 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" /> Core Skills & Competencies Tags
          </h2>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-200 dark:border-slate-700"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Input
              placeholder="Add skill (e.g. Enterprise SaaS, Closing, Outbound)..."
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              className="max-w-md text-xs h-9"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSkill}
              className="font-bold text-xs"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Tag
            </Button>
          </div>
        </Card>

        {/* Resume File Upload */}
        <Card variant="default" className="p-6 sm:p-8 space-y-4 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" /> Primary Resume Document
          </h2>

          <FileUpload
            multiple={false}
            accept=".pdf,.docx"
            onFilesSelected={handleResumeSimulatedUpload}
            label="Drag & drop your primary resume file (PDF or DOCX)"
          />

          {resumeFileName && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Active Resume Attached: <strong>{resumeFileName}</strong></span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setResumeFileName('')
                  toast({ title: 'Resume removed', type: 'info' })
                }}
                className="text-rose-500 hover:underline font-bold"
              >
                Remove File
              </button>
            </div>
          )}
        </Card>

        {/* Save Bar */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="submit"
            variant="accent"
            size="md"
            pill
            className="font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-8"
          >
            <Save className="w-4 h-4 mr-2" /> Save Candidate Profile
          </Button>
        </div>
      </form>
    </div>
  )
}
