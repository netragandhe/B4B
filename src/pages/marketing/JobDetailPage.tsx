import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Share2,
  Heart,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Sparkles,
  Shield,
  Send,
  Upload,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { FormField } from '@/components/ui/FormField'
import { FileUpload } from '@/components/ui/FileUpload'
import { SEOHead } from '@/components/seo/SEOHead'
import { MOCK_JOBS, JobItem } from '@/mock-data/jobsBoardData'
import { useToast } from '@/components/ui/Toast'

const jobAppSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  linkedin: z.string().optional(),
  yearsExp: z.string().min(1, 'Please select your years of experience'),
  coverLetter: z.string().min(15, 'Please provide a brief introduction'),
})

type JobAppFormData = z.infer<typeof jobAppSchema>

export const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Find job by id or fallback to first job
  const job: JobItem = MOCK_JOBS.find((j) => j.id === id) || MOCK_JOBS[0]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobAppFormData>({
    resolver: zodResolver(jobAppSchema),
    defaultValues: {
      yearsExp: '3-5 years',
    },
  })

  const onJobSubmit = (data: JobAppFormData) => {
    setIsApplyModalOpen(false)
    toast({
      title: '🎉 Application Submitted Successfully!',
      description: `Thank you ${data.fullName}. Your application for ${job.title} at ${job.company} has been dispatched. Track your application status in your Job Seeker Portal.`,
      type: 'success',
    })
    reset()
  }

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({ title: 'Link Copied to Clipboard!', type: 'info' })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      <SEOHead
        title={`${job.title} at ${job.company} | B4B Job Board`}
        description={job.description}
      />

      {/* Back Button */}
      <button
        onClick={() => navigate('/jobs/search')}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Job Search
      </button>

      {/* Job Header Hero */}
      <Card variant="default" className="p-6 sm:p-8 space-y-6 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
            />
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{job.company}</span>
                <span className="text-xs font-bold text-amber-500">★ {job.companyRating}</span>
                <Badge variant="primary" size="sm">
                  {job.category}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  {job.type}
                </span>
                {job.isRemote && (
                  <Badge variant="emerald" size="sm">
                    100% Remote Opportunity
                  </Badge>
                )}
                <span className="text-slate-400">Posted {job.postedDate}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 dark:border-slate-800">
            <div className="text-left md:text-right">
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Salary Package</div>
              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k / {job.salaryPeriod}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsSaved(!isSaved)
                  toast({ title: isSaved ? 'Removed from saved' : 'Job Saved to Bookmarks', type: 'success' })
                }}
                className={isSaved ? 'text-rose-500 border-rose-200' : ''}
              >
                <Heart className={`w-4 h-4 mr-1.5 ${isSaved ? 'fill-rose-500' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline" size="sm" onClick={copyShareLink}>
                <Share2 className="w-4 h-4 mr-1.5" /> Share
              </Button>
              <Button
                variant="accent"
                size="md"
                pill
                onClick={() => setIsApplyModalOpen(true)}
                className="font-bold px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white"
              >
                Apply Now <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Highlights Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
          <div>
            <div className="text-slate-400 font-semibold">Department</div>
            <div className="font-bold text-slate-900 dark:text-white mt-0.5">{job.category}</div>
          </div>
          <div>
            <div className="text-slate-400 font-semibold">Job Type</div>
            <div className="font-bold text-slate-900 dark:text-white mt-0.5">{job.type}</div>
          </div>
          <div>
            <div className="text-slate-400 font-semibold">Applicants</div>
            <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{job.applicantCount} candidates</div>
          </div>
          <div>
            <div className="text-slate-400 font-semibold">Work Authorization</div>
            <div className="font-bold text-slate-900 dark:text-white mt-0.5">US Citizen / Green Card</div>
          </div>
        </div>
      </Card>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Role Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <Card variant="default" className="p-6 space-y-4 border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Role Overview
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {job.description}
            </p>
          </Card>

          {/* Key Requirements */}
          <Card variant="default" className="p-6 space-y-4 border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Key Requirements & Qualifications
            </h2>
            <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Benefits & Perks */}
          <Card variant="default" className="p-6 space-y-4 border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" /> Compensation & Benefits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {job.benefits.map((b, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {b}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Sidebar: Company Card & Floating Apply */}
        <div className="space-y-6">
          <Card variant="default" className="p-6 space-y-4 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-blue-500 shrink-0" />
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{job.company}</h3>
                <span className="text-xs text-slate-400">Verified Corporate Employer</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Leading corporate entity specialized in financial debt structuring, software sales, and capital deployment across North America.
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-500">Company Size</span>
              <span className="text-slate-900 dark:text-white">250 - 500 Employees</span>
            </div>
          </Card>

          <Card variant="default" className="p-6 space-y-4 bg-gradient-to-br from-blue-900 to-slate-900 text-white border-0 shadow-xl">
            <Badge variant="emerald" size="sm">
              Urgent Hiring
            </Badge>
            <h3 className="text-lg font-bold font-heading">Ready to apply?</h3>
            <p className="text-xs text-blue-200 leading-relaxed">
              Applications are reviewed on a rolling basis. Direct line to hiring manager.
            </p>
            <Button
              variant="accent"
              size="lg"
              pill
              onClick={() => setIsApplyModalOpen(true)}
              className="w-full font-bold bg-emerald-500 hover:bg-emerald-400 text-white"
            >
              Submit Application Now
            </Button>
          </Card>
        </div>
      </div>

      {/* Apply Modal Form */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title={`Apply for ${job.title}`}
        description={`${job.company} • ${job.location}`}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit(onJobSubmit)} className="space-y-4 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <FormField label="Full Name" required error={errors.fullName?.message}>
              <Input placeholder="Jane Smith" {...register('fullName')} />
            </FormField>
            <FormField label="Email Address" required error={errors.email?.message}>
              <Input type="email" placeholder="jane@example.com" {...register('email')} />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <FormField label="Phone Number" required error={errors.phone?.message}>
              <Input placeholder="(555) 000-0000" {...register('phone')} />
            </FormField>
            <FormField label="Years of Relevant Experience" required>
              <select
                {...register('yearsExp')}
                className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white"
              >
                <option value="1-2 years">1-2 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5-8 years">5-8 years</option>
                <option value="8+ years">8+ years</option>
              </select>
            </FormField>
          </div>

          <FormField label="LinkedIn Profile / Portfolio Link">
            <Input placeholder="https://linkedin.com/in/janesmith" {...register('linkedin')} />
          </FormField>

          <FormField label="Upload Resume (PDF, DOCX)" helperText="Drag & drop your resume file or click to browse">
            <FileUpload multiple={false} />
          </FormField>

          <FormField label="Cover Letter & Introduction" required error={errors.coverLetter?.message}>
            <Textarea
              placeholder="Highlight your relevant experience, key achievements, and why you are a great fit for this position..."
              className="min-h-[100px]"
              {...register('coverLetter')}
            />
          </FormField>

          <div className="pt-3 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsApplyModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" pill isLoading={isSubmitting} className="px-6 font-bold bg-emerald-600 hover:bg-emerald-500 text-white">
              Submit Application
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
