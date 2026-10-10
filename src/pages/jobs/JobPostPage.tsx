import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Mail,
  FileText,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  ArrowLeft,
  Sparkles,
} from 'lucide-react'
import '@/components/website/corporateTheme.css'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { Card } from '@/components/ui/Card'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/components/ui/Toast'
import { jobService, CreateJobInput } from '@/lib/jobService'
import { JOB_CATEGORIES_CLIENT, JOB_LOCATIONS_CLIENT } from '@/mock-data/jobs'

export const JobPostPage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [formData, setFormData] = useState<CreateJobInput>({
    title: '',
    company: '',
    category: JOB_CATEGORIES_CLIENT[0],
    state: 'NY',
    city: 'NYC',
    salary: '$75,000 - $95,000 annually',
    jobType: 'Full-time',
    description: '',
    contactEmail: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedJob, setSubmittedJob] = useState<{ id: string; title: string } | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    // Basic validation
    if (!formData.title.trim()) {
      setErrorMessage('Please enter a job title.')
      return
    }
    if (!formData.company.trim()) {
      setErrorMessage('Please enter your company name.')
      return
    }
    if (!formData.city.trim() || !formData.state.trim()) {
      setErrorMessage('Please specify city and state.')
      return
    }
    if (!formData.description.trim() || formData.description.trim().length < 20) {
      setErrorMessage('Please provide a job description of at least 20 characters.')
      return
    }
    if (!formData.contactEmail.trim() || !formData.contactEmail.includes('@')) {
      setErrorMessage('Please enter a valid contact email address.')
      return
    }

    try {
      setIsSubmitting(true)
      const newJob = await jobService.postJob(formData)
      setSubmittedJob({ id: newJob.id, title: newJob.title })
      toast({
        title: 'Job Submitted for Approval',
        description: `"${newJob.title}" has been sent to Admin Moderation.`,
        type: 'success',
      })
    } catch (err) {
      console.error(err)
      setErrorMessage('Failed to submit job. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#EEF1EC] text-[#14231E] font-body transition-colors">
      <SEOHead
        title="Post a Job | B4B America Job Finder"
        description="Post a verified small business job listing. Reach talented professionals across 12 federal reserve territory divisions."
      />

      {/* Header Banner: Forest Black */}
      <section className="bg-[#06201A] text-white pt-10 pb-16 px-4 border-b border-[#0B4A3A]">
        <div className="max-w-5xl mx-auto space-y-4">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Job Finder', href: '/jobs' },
              { label: 'Post a Job' },
            ]}
          />

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase font-bold tracking-wider text-[#C8793A]">
              Employer & Recruiter Portal
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
              Post a Job on B4B America
            </h1>
            <p className="text-sm sm:text-base text-[#B9CBC3] max-w-2xl font-body">
              Client Rule: All user-submitted listings go through our Admin Moderation queue for review and approval before appearing in public searches.
            </p>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <main className="max-w-4xl mx-auto px-4 -mt-8 pb-20">
        {submittedJob ? (
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl border border-[#0B4A3A]/20 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#0E7A5A]/10 text-[#0E7A5A] flex items-center justify-center mx-auto border border-[#0E7A5A]/30">
              <CheckCircle2 className="w-10 h-10 text-[#0E7A5A]" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#06201A]">
                Listing Submitted Successfully!
              </h2>
              <p className="text-[#14231E]/80 text-sm leading-relaxed">
                Your post for <strong className="text-[#06201A]">"{submittedJob.title}"</strong> has been queued with status <span className="px-2 py-0.5 rounded-md font-mono text-xs font-bold bg-[#C8793A]/20 text-[#06201A] border border-[#C8793A]/40">PENDING APPROVAL</span>.
              </p>
              <p className="text-xs text-slate-500 pt-2">
                An administrator will review your submission in the portal moderation queue. Once approved, it will be instantly searchable across all 12 territory divisions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  setSubmittedJob(null)
                  setFormData({
                    title: '',
                    company: '',
                    category: JOB_CATEGORIES_CLIENT[0],
                    state: 'NY',
                    city: 'NYC',
                    salary: '$75,000 - $95,000 annually',
                    jobType: 'Full-time',
                    description: '',
                    contactEmail: '',
                  })
                }}
                className="btn-emerald-light"
              >
                <span>Post Another Job</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <Link to="/jobs" className="btn-outline-light">
                <span>Return to Job Finder</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xl border border-[#0B4A3A]/20 space-y-8">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-center gap-3 text-sm">
                <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Title & Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Job Title" required helperText="e.g. Senior B2B Account Executive">
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <Input
                      type="text"
                      className="pl-9"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Commercial HVAC Field Supervisor"
                      required
                    />
                  </div>
                </FormField>

                <FormField label="Company Name" required helperText="Your business or organization">
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <Input
                      type="text"
                      className="pl-9"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Keystone Commercial Group"
                      required
                    />
                  </div>
                </FormField>
              </div>

              {/* Row 2: Category & Job Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Category" required helperText="Select closest industry sector">
                  <select
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0E7A5A]"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    {JOB_CATEGORIES_CLIENT.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Job Type" required helperText="Employment arrangement">
                  <select
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0E7A5A]"
                    value={formData.jobType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        jobType: e.target.value as CreateJobInput['jobType'],
                      })
                    }
                    required
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Gig">Gig / Freelance</option>
                    <option value="Commission">Commission</option>
                    <option value="Internship">Internship</option>
                  </select>
                </FormField>
              </div>

              {/* Row 3: State & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="State" required helperText="2-letter US state code">
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <Input
                      type="text"
                      maxLength={2}
                      className="pl-9 uppercase"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                      placeholder="NY"
                      required
                    />
                  </div>
                </FormField>

                <FormField label="City" required helperText="Metro area or municipality">
                  <Input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Austin or NYC"
                    required
                  />
                </FormField>
              </div>

              {/* Row 4: Salary & Contact Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Salary / Compensation" required helperText="e.g. $85,000 - $115,000 annually">
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <Input
                      type="text"
                      className="pl-9"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      placeholder="$80,000 - $110,000 annually"
                      required
                    />
                  </div>
                </FormField>

                <FormField label="Contact Email" required helperText="Where applicant queries are directed">
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <Input
                      type="email"
                      className="pl-9"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      placeholder="hiring@yourbusiness.com"
                      required
                    />
                  </div>
                </FormField>
              </div>

              {/* Row 5: Job Description */}
              <FormField
                label="Job Description"
                required
                helperText="Detail role responsibilities, deliverables, and candidate qualifications"
              >
                <Textarea
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe day-to-day duties, team structure, client interactions, and required experience..."
                  required
                />
              </FormField>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  to="/jobs"
                  className="text-sm font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Jobs</span>
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-emerald-light w-full sm:w-auto"
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Job for Approval'}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
