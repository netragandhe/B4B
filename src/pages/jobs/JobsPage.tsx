import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Users,
  Sparkles,
  PhoneCall,
  ChevronRight,
} from 'lucide-react'
import '@/components/website/corporateTheme.css'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/components/ui/Toast'
import { CoachRequestModal } from '@/components/forms/CoachRequestModal'
import { UsaMapMotif } from '@/components/website/UsaMapMotif'

interface JobListing {
  id: string
  title: string
  department: string
  location: string
  type: string
  compensation: string
  description: string
  requirements: string[]
}

const JOBS_DATA: JobListing[] = [
  {
    id: 'job-1',
    title: 'Senior Small Business Growth Coach',
    department: 'Business Coaching',
    location: 'Remote (US) or New York, NY',
    type: 'Full-time',
    compensation: '$95,000 - $130,000 + Performance Bonus',
    description: 'Provide 1-on-1 strategic growth coaching, operations audits, and credit consultation to founders scaling past $500k ARR.',
    requirements: ['5+ years consulting or small business ownership', 'Deep understanding of cash flow forecasting and debt structures', 'Inspiring communicator with high empathy'],
  },
  {
    id: 'job-2',
    title: 'Commercial Credit & SBA Loan Underwriter',
    department: 'Credit Underwriting',
    location: 'New York, NY (Hybrid) / Remote',
    type: 'Full-time',
    compensation: '$110,000 - $145,000 + Incentive',
    description: 'Package, evaluate, and syndicate corporate debt facilities, SBA 7(a) loan packets, and revenue-based lines with partner funds.',
    requirements: ['3+ years in commercial banking or private credit underwriting', 'Expertise in corporate tax return analysis (1120-S, 1065)', 'Familiarity with SBA SOP compliance rules'],
  },
  {
    id: 'job-3',
    title: 'Senior Full-Stack Fintech Engineer',
    department: 'Technology & Web',
    location: 'Remote (US)',
    type: 'Full-time',
    compensation: '$140,000 - $175,000 + Equity',
    description: 'Build our next-generation client terminal, AI small business copilot, and automated underwriting integrations with Plaid and QuickBooks.',
    requirements: ['Strong experience with React, TypeScript, Node.js, and modern APIs', 'Commitment to high design aesthetics and security standards', 'Experience in financial data systems preferred'],
  },
  {
    id: 'job-4',
    title: 'Client Success & Onboarding Specialist',
    department: 'Client Success',
    location: 'Remote (US)',
    type: 'Full-time',
    compensation: '$65,000 - $85,000 + Bonus',
    description: 'Guide new small business owners through onboarding across POS terminals, business credit building, and accounting setups.',
    requirements: ['2+ years customer success or client onboarding', 'Passionate about helping small business owners thrive', 'Organized, prompt, and proactive'],
  },
]

const jobAppSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone is required'),
  linkedin: z.string().url('Please enter a valid URL').or(z.literal('')),
  coverNote: z.string().min(10, 'Please write a brief introduction'),
})

type JobAppFormData = z.infer<typeof jobAppSchema>

export const JobsPage: React.FC = () => {
  const { toast } = useToast()
  const [selectedDept, setSelectedDept] = useState('All')
  const [activeJob, setActiveJob] = useState<JobListing | null>(null)
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [coachModalOpen, setCoachModalOpen] = useState(false)

  const departments = ['All', 'Business Coaching', 'Credit Underwriting', 'Technology & Web', 'Client Success']

  const filteredJobs = JOBS_DATA.filter((j) => {
    if (selectedDept !== 'All' && j.department !== selectedDept) return false
    return true
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobAppFormData>({
    resolver: zodResolver(jobAppSchema),
  })

  const onApplySubmit = (data: JobAppFormData) => {
    toast({
      title: 'Application Received!',
      description: `Thank you ${data.fullName}. Our hiring team has received your application for ${activeJob?.title}.`,
      type: 'success',
    })
    setIsApplyModalOpen(false)
    reset()
  }

  return (
    <div className="min-h-screen bg-[#EEF1EC] text-[#14231E] transition-colors duration-200 font-body">
      <SEOHead
        title="Careers & Open Positions | B4B America"
        description="Join B4B America. Build tools, underwriting facilities, and strategic advisory programs that help American small businesses thrive."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 text-left">
        {/* Top Breadcrumb */}
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Careers' }]} />

        {/* Hero Section */}
        <div className="relative p-8 sm:p-12 rounded-3xl bg-[#06201A] text-white border border-[#0B4A3A] shadow-xl overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-15 overflow-hidden">
            <UsaMapMotif className="w-full h-full text-[#C8793A]" opacity={0.2} />
          </div>

          <div className="max-w-3xl space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B4A3A]/70 border border-[#0B4A3A]">
              <span className="w-2 h-2 rounded-full bg-[#C8793A] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#C8793A] font-mono">
                B4B America Careers
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
              Build the Future of American Small Business
            </h1>

            <p className="text-base sm:text-lg text-[#B9CBC3] leading-relaxed font-body">
              We are assembling a mission-driven team of credit underwriters, fintech engineers, business coaches, and client advocates across all 12 territory divisions.
            </p>

            {/* MANDATORY ACTIONS PER CLIENT RULES: */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => setCoachModalOpen(true)}
                className="btn-copper-dark group"
              >
                <PhoneCall className="w-4 h-4 text-[#06201A]" />
                <span>Speak with a Business Coach</span>
                <ArrowRight className="w-4 h-4 text-[#06201A] transition-transform group-hover:translate-x-1" />
              </button>

              <Link
                to="/solutions/b4b-jobs"
                className="btn-outline-dark group"
              >
                <span>Click Here for Job Board</span>
                <ChevronRight className="w-4 h-4 text-[#C8793A] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Department Filter & Job Listings in White Cards on Soft Stone */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 font-mono">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedDept === dept
                    ? 'bg-[#0E7A5A] text-white shadow-xs'
                    : 'bg-white text-[#14231E] border border-[#14231E]/15 hover:bg-[#EEF1EC]'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#14231E]/10 shadow-sm space-y-4 flex flex-col justify-between hover:border-[#0E7A5A] hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EEF1EC] text-[#0E7A5A] border border-[#14231E]/10 font-mono">
                      {job.department}
                    </span>
                    <span className="text-xs font-bold text-[#14231E] font-heading">{job.type}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#14231E] font-heading">{job.title}</h3>
                  <p className="text-xs text-[#14231E]/70 leading-relaxed font-body">{job.description}</p>

                  <div className="space-y-1.5 pt-2">
                    <p className="text-[11px] font-bold text-[#14231E] uppercase tracking-wider font-mono">
                      Key Qualifications:
                    </p>
                    <ul className="space-y-1 text-xs text-[#14231E]/70 font-body">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0E7A5A] shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#14231E]/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#14231E] font-mono">{job.compensation}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCoachModalOpen(true)}
                      className="btn-emerald-light !h-9 !py-1 !px-3 !text-xs"
                    >
                      Speak with Coach
                    </button>
                    <button
                      onClick={() => {
                        setActiveJob(job)
                        setIsApplyModalOpen(true)
                      }}
                      className="btn-outline-light !h-9 !py-1 !px-3 !text-xs"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Modal in Soft Stone Container */}
      {isApplyModalOpen && activeJob && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setIsApplyModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-[#EEF1EC] text-[#14231E] p-6 sm:p-8 rounded-3xl shadow-2xl border border-[#0B4A3A] max-h-[90vh] overflow-y-auto font-body"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#14231E]/15">
              <div>
                <h3 className="text-lg font-extrabold text-[#14231E] font-heading">
                  Apply for {activeJob.title}
                </h3>
                <p className="text-xs text-[#14231E]/70 font-mono">
                  {activeJob.department} • {activeJob.location}
                </p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="text-xs px-2 py-1 rounded bg-white text-[#14231E] font-bold border border-[#14231E]/20"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit(onApplySubmit)} className="space-y-4 pt-4">
              <FormField label="Full Name" required error={errors.fullName?.message}>
                <Input placeholder="Jane Smith" {...register('fullName')} />
              </FormField>

              <FormField label="Email Address" required error={errors.email?.message}>
                <Input type="email" placeholder="jane@example.com" {...register('email')} />
              </FormField>

              <FormField label="Phone Number" required error={errors.phone?.message}>
                <Input placeholder="(555) 000-0000" {...register('phone')} />
              </FormField>

              <FormField label="LinkedIn / Portfolio URL" error={errors.linkedin?.message}>
                <Input placeholder="https://linkedin.com/in/username" {...register('linkedin')} />
              </FormField>

              <FormField label="Brief Cover Note" required error={errors.coverNote?.message}>
                <Textarea
                  placeholder="Share a brief overview of your background and why you want to join B4B America..."
                  rows={4}
                  {...register('coverNote')}
                />
              </FormField>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-emerald-light w-full"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Global Coach Modal */}
      <CoachRequestModal
        isOpen={coachModalOpen}
        onClose={() => setCoachModalOpen(false)}
        initialNote="Career & Talent Inquiry regarding B4B America."
      />
    </div>
  )
}
