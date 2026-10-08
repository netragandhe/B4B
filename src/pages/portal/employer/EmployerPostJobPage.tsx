import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Briefcase,
  DollarSign,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Eye,
  Send,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { FormField } from '@/components/ui/FormField'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { JOB_CATEGORIES, US_STATES_JOB_DATA } from '@/mock-data/jobsBoardData'
import { useToast } from '@/components/ui/Toast'

const postJobSchema = z.object({
  title: z.string().min(3, 'Job title is required'),
  category: z.string().min(1, 'Please select a category'),
  type: z.string().min(1, 'Select a job type'),
  locationCity: z.string().min(2, 'City is required'),
  locationState: z.string().min(2, 'State is required'),
  isRemote: z.boolean(),
  salaryMin: z.number().min(1000, 'Minimum salary required'),
  salaryMax: z.number().min(1000, 'Maximum salary required'),
  salaryPeriod: z.enum(['year', 'hour', 'project']),
  description: z.string().min(20, 'Provide a clear role overview'),
  requirements: z.string().min(10, 'List key requirements'),
  benefits: z.string().optional(),
})

type PostJobFormData = z.infer<typeof postJobSchema>

export const EmployerPostJobPage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostJobFormData>({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      title: 'Senior Enterprise Account Executive',
      category: 'Account Executives',
      type: 'Full-time',
      locationCity: 'New York City',
      locationState: 'NY',
      isRemote: true,
      salaryMin: 120000,
      salaryMax: 180000,
      salaryPeriod: 'year',
      description: 'Lead commercial debt packaging & fintech sales across enterprise clients.',
      requirements: '5+ years B2B SaaS closing experience\nStrong financial background\nMastery of enterprise sales cycles',
      benefits: 'Full Health & Dental\nUncapped Commissions\n401k Matching',
    },
  })

  const formValues = watch()

  const onPublish = (data: PostJobFormData) => {
    toast({
      title: '🚀 Job Position Published Successfully!',
      description: `"${data.title}" is now live on the B4B Public Jobs Board and distributed to matched talent alerts.`,
      type: 'success',
    })
    navigate('/portal/employer/jobs')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left">
      <SEOHead title="Post a New Job | Employer Portal" description="Create and publish a new job opening to reach thousands of sales & tech candidates." />

      <Breadcrumb items={[{ label: 'Employer Portal', href: '/portal/employer/dashboard' }, { label: 'Post a New Job' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
            Post a New Job Opportunity
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">Step {currentStep} of 4 • Multi-Step Job Creation Wizard</p>
        </div>
        <Badge variant="emerald" size="md">
          1 Credit Available
        </Badge>
      </div>

      {/* Stepper Header Bar */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { step: 1, label: '1. Basics' },
          { step: 2, label: '2. Pay & Location' },
          { step: 3, label: '3. Details' },
          { step: 4, label: '4. Preview' },
        ].map((s) => (
          <button
            key={s.step}
            type="button"
            onClick={() => setCurrentStep(s.step as any)}
            className={`py-3 px-2 text-xs font-bold rounded-xl border text-center transition-all ${
              currentStep === s.step
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : currentStep > s.step
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-600'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <Card variant="default" className="p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
        <form onSubmit={handleSubmit(onPublish)} className="space-y-6">
          {/* STEP 1: BASICS */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                Step 1: Job Basics & Category
              </h2>

              <FormField label="Job Title" required error={errors.title?.message}>
                <Input placeholder="e.g. Senior B2B Account Executive" {...register('title')} />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Job Category" required error={errors.category?.message}>
                  <select
                    {...register('category')}
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white"
                  >
                    {JOB_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Job Type" required error={errors.type?.message}>
                  <select
                    {...register('type')}
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Gig">Gig</option>
                  </select>
                </FormField>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="button" variant="primary" onClick={() => setCurrentStep(2)}>
                  Next: Compensation <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: COMPENSATION & LOCATION */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                Step 2: Compensation & Location
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField label="Minimum Salary ($)" required error={errors.salaryMin?.message}>
                  <Input type="number" placeholder="100000" {...register('salaryMin', { valueAsNumber: true })} />
                </FormField>

                <FormField label="Maximum Salary ($)" required error={errors.salaryMax?.message}>
                  <Input type="number" placeholder="160000" {...register('salaryMax', { valueAsNumber: true })} />
                </FormField>

                <FormField label="Pay Period">
                  <select
                    {...register('salaryPeriod')}
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white"
                  >
                    <option value="year">Per Year</option>
                    <option value="hour">Per Hour</option>
                    <option value="project">Per Project</option>
                  </select>
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="City Location" required error={errors.locationCity?.message}>
                  <Input placeholder="e.g. New York City" {...register('locationCity')} />
                </FormField>

                <FormField label="State" required error={errors.locationState?.message}>
                  <select
                    {...register('locationState')}
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white"
                  >
                    {US_STATES_JOB_DATA.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.name} ({s.code})
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Allow 100% Remote Applicants</span>
                  <p className="text-[11px] text-slate-400">Candidates can work from anywhere in North America</p>
                </div>
                <input
                  type="checkbox"
                  {...register('isRemote')}
                  className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
                </Button>
                <Button type="button" variant="primary" onClick={() => setCurrentStep(3)}>
                  Next: Job Details <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: DETAILS */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                Step 3: Description & Requirements
              </h2>

              <FormField label="Role Overview & Key Responsibilities" required error={errors.description?.message}>
                <Textarea
                  rows={4}
                  placeholder="Describe day-to-day expectations, team structure, and impact..."
                  {...register('description')}
                />
              </FormField>

              <FormField label="Requirements & Qualifications (One per line)" required error={errors.requirements?.message}>
                <Textarea
                  rows={4}
                  placeholder="5+ years experience&#10;Proven track record exceeding $1M quota&#10;Strong communication skills"
                  {...register('requirements')}
                />
              </FormField>

              <FormField label="Benefits & Perks">
                <Textarea
                  rows={2}
                  placeholder="Health coverage, 401(k) match, company retreat..."
                  {...register('benefits')}
                />
              </FormField>

              <div className="flex items-center justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
                </Button>
                <Button type="button" variant="primary" onClick={() => setCurrentStep(4)}>
                  Next: Preview Card <Eye className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: PREVIEW & PUBLISH */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                Step 4: Live Job Card Preview
              </h2>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="primary" size="sm">
                    {formValues.category || 'Category'}
                  </Badge>
                  <span className="text-xs text-emerald-600 font-bold">
                    ${(Number(formValues.salaryMin) / 1000).toFixed(0)}k - ${(Number(formValues.salaryMax) / 1000).toFixed(0)}k / {formValues.salaryPeriod}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">{formValues.title}</h3>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" /> {formValues.locationCity}, {formValues.locationState} • {formValues.type} {formValues.isRemote ? '• Remote' : ''}
                  </div>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {formValues.description}
                </p>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500">
                  Nexus FinTech Solutions • Verified Employer
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(3)}>
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> Edit Details
                </Button>
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  pill
                  isLoading={isSubmitting}
                  className="font-bold px-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                >
                  <Send className="w-4 h-4 mr-2" /> Publish Job Position
                </Button>
              </div>
            </div>
          )}
        </form>
      </Card>
    </div>
  )
}
