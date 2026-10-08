import React, { useState } from 'react'
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
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { FormField } from '@/components/ui/FormField'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { FileUpload } from '@/components/ui/FileUpload'
import { SEOHead } from '@/components/seo/SEOHead'
import { useToast } from '@/components/ui/Toast'

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

  const onJobSubmit = (data: JobAppFormData) => {
    setIsApplyModalOpen(false)
    toast({
      title: 'Application Dispatched!',
      description: `Thank you ${data.fullName}. Our recruitment team will review your background for ${activeJob?.title}.`,
      type: 'success',
    })
    reset()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      <SEOHead
        title="Careers & Open Positions"
        description="Join the team empowering small businesses across America. Explore career opportunities in business coaching, commercial underwriting, and fintech engineering."
      />

      {/* Header */}
      <div className="space-y-4">
        <Breadcrumb items={[{ label: 'Careers' }]} />
        <Badge variant="emerald" size="md">
          We Are Hiring
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
          Help Build the Future of Small Business in America
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-3xl text-sm sm:text-base leading-relaxed">
          At OAL Network, our mission is to make all small businesses in America thrive. We are hiring passionate business coaches, credit underwriters, engineers, and client advocates who believe in Main Street entrepreneurs.
        </p>
      </div>

      {/* Department Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedDept === dept
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-[#12294A] text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} variant="default" hover className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="primary" size="sm">
                    {job.department}
                  </Badge>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {job.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                  {job.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {job.description}
                </p>

                <div className="pt-2">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {job.compensation}
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                pill
                onClick={() => {
                  setActiveJob(job)
                  setIsApplyModalOpen(true)
                }}
                className="shrink-0 text-xs font-bold"
              >
                Apply for this Role
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Application Modal */}
      {activeJob && (
        <Modal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          title={`Apply: ${activeJob.title}`}
          description={`${activeJob.department} • ${activeJob.location}`}
          maxWidth="lg"
        >
          <form onSubmit={handleSubmit(onJobSubmit)} className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <FormField label="Full Name" required error={errors.fullName?.message}>
                <Input placeholder="John Doe" {...register('fullName')} />
              </FormField>
              <FormField label="Email" required error={errors.email?.message}>
                <Input type="email" placeholder="john@example.com" {...register('email')} />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <FormField label="Phone" required error={errors.phone?.message}>
                <Input placeholder="(555) 000-0000" {...register('phone')} />
              </FormField>
              <FormField label="LinkedIn / Portfolio URL">
                <Input placeholder="https://linkedin.com/in/..." {...register('linkedin')} />
              </FormField>
            </div>

            <FormField label="Resume Document" helperText="PDF or DOCX format">
              <FileUpload multiple={false} />
            </FormField>

            <FormField label="Why OAL Network?" required error={errors.coverNote?.message}>
              <Textarea
                placeholder="Tell us about your background and why you want to empower small businesses..."
                className="min-h-[90px]"
                {...register('coverNote')}
              />
            </FormField>

            <div className="pt-3 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsApplyModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="accent" pill isLoading={isSubmitting}>
                Submit Application
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
