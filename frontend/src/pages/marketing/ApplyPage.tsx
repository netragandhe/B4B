import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Building2,
  DollarSign,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import { RadioGroup } from '@/components/ui/Radio'
import { FormField } from '@/components/ui/FormField'
import { FileUpload } from '@/components/ui/FileUpload'
import { Stepper } from '@/components/ui/Stepper'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'
import { brandConfig } from '@/config/brand'
import heroBgImg from '@/content/images/hero-widescreen-bg.jpg'

// Zod Multi-Step Application Schema
const applicationSchema = z.object({
  // Step 1: Business & Founder
  companyName: z.string().min(2, 'Company legal name is required'),
  ein: z.string().min(9, 'Valid 9-digit EIN or Tax ID is required'),
  entityType: z.string().min(1, 'Select your legal structure'),
  founderName: z.string().min(2, 'Full legal name is required'),
  email: z.string().email('Please enter a valid business email'),
  phone: z.string().min(10, 'Valid phone number required'),

  // Step 2: Financial Health
  annualRevenue: z.string().min(1, 'Select annual revenue tier'),
  monthlyBurn: z.string().min(1, 'Select estimated monthly expenses'),
  capitalRequested: z.string().min(1, 'Capital requirement is required'),
  facilityType: z.string().min(1, 'Preferred facility structure is required'),

  // Step 3: Terms & Agreement
  consentToSoftCredit: z.boolean().refine((val) => val === true, {
    message: 'You must authorize soft pre-qualification check (no credit score impact)',
  }),
  advisoryAddon: z.boolean().optional(),
})

type ApplicationFormData = z.infer<typeof applicationSchema>

const STEPS = [
  { title: 'Entity & Founder', description: 'Legal details' },
  { title: 'Financials', description: 'Revenue & goals' },
  { title: 'Verification', description: 'Docs & consent' },
  { title: 'Complete', description: 'Instant approval' },
]

export const ApplyPage: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    control,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onBlur',
    defaultValues: {
      companyName: 'Apex Freight & Logistics LLC',
      ein: '84-9283741',
      entityType: 'LLC',
      founderName: 'Marcus Vance',
      email: 'm.vance@apexlogistics.io',
      phone: '+1 (555) 392-1920',
      annualRevenue: '$3M - $5M',
      monthlyBurn: '$200k - $300k',
      capitalRequested: '$850,000',
      facilityType: 'Revolving Working Capital Line',
      consentToSoftCredit: true,
      advisoryAddon: true,
    },
  })

  const nextStep = async () => {
    let fieldsToValidate: (keyof ApplicationFormData)[] = []
    if (currentStep === 0) {
      fieldsToValidate = ['companyName', 'ein', 'entityType', 'founderName', 'email', 'phone']
    } else if (currentStep === 1) {
      fieldsToValidate = ['annualRevenue', 'monthlyBurn', 'capitalRequested', 'facilityType']
    } else if (currentStep === 2) {
      fieldsToValidate = ['consentToSoftCredit']
    }

    const isValid = await trigger(fieldsToValidate)
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const onSubmit = (data: ApplicationFormData) => {
    login({ email: data.email })
    setIsSubmitted(true)
    toast({
      title: 'Application Received & Pre-Approved',
      description: `Welcome to ${brandConfig.brandName}. Preliminary term sheet available in your client portal.`,
      type: 'success',
    })
  }

  return (
    <div className="min-h-screen bg-[#07142B] text-white transition-colors duration-200 font-body py-12 relative overflow-hidden">
      {/* Background Photo & Clean Luminous Blue Overlays identical to Landing Page Hero */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={heroBgImg}
          alt="B4B America commercial business commerce operations"
          loading="eager"
          decoding="sync"
          className="w-full h-full object-cover object-center"
        />
        {/* Luminous clean blue overlay identical to HomePage Hero */}
        <div className="absolute inset-0 bg-[#0A2A5E]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08204D]/85 via-[#0B2C68]/50 to-[#08204D]/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07142B]/60 to-[#07142B] opacity-90" />
      </div>

      {/* Ambient lighting accents identical to HomePage Hero */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/25 rounded-full blur-3xl pointer-events-none z-[1]" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none z-[1]" />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-[#FFC911]/10 rounded-full blur-3xl pointer-events-none z-[1]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left relative z-10">
        {/* Breadcrumb & Header */}
        <div className="space-y-3">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Apply For Capital' }]} />
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-300/40 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F8C61A] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#F8C61A] font-mono">
              INSTITUTIONAL INTAKE DESK
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Apply for Pre-Approved Business Capital
          </h1>
          <p className="text-sm sm:text-base text-[#B8C4D9] leading-relaxed font-body">
            Takes under 4 minutes. Soft check only with 0 credit impact. Instant term sheet generation across 40+ institutional private syndicates.
          </p>
        </div>

        {/* Stepper Progress */}
        <div className="glass-stepper-dark">
          <Stepper steps={STEPS} currentStep={currentStep} onStepClick={(idx) => setCurrentStep(idx)} />
        </div>

        {/* Main Application Card Form with internal ambient lighting */}
        <div className="p-6 sm:p-10 rounded-3xl glass-form-card relative overflow-hidden">
          {/* Internal ambient lighting matching Telemetry Card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#013CA0]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-52 h-52 bg-[#FFC911]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* STEP 1: Entity & Founder */}
            {currentStep === 0 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-sky-300/20 pb-4">
                  <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-sky-400" />
                    <span>Company & Founder Information</span>
                  </h3>
                  <p className="text-xs text-sky-200/80">
                    Enter the legal entity as registered on your corporate state filings.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Legal Business Name" required error={errors.companyName?.message}>
                    <Input placeholder="e.g. Acme Logistics LLC" {...register('companyName')} />
                  </FormField>

                  <FormField label="Federal Tax ID (EIN)" required error={errors.ein?.message}>
                    <Input placeholder="XX-XXXXXXX" {...register('ein')} />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Corporate Structure" required error={errors.entityType?.message}>
                    <Select
                      options={[
                        { label: 'Limited Liability Company (LLC)', value: 'LLC' },
                        { label: 'S-Corporation (1120-S)', value: 'S-Corp' },
                        { label: 'C-Corporation', value: 'C-Corp' },
                        { label: 'General Partnership', value: 'Partnership' },
                      ]}
                      {...register('entityType')}
                    />
                  </FormField>

                  <FormField label="Primary Contact / Founder" required error={errors.founderName?.message}>
                    <Input placeholder="Full Legal Name" {...register('founderName')} />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Corporate Email" required error={errors.email?.message}>
                    <Input type="email" placeholder="name@company.com" {...register('email')} />
                  </FormField>

                  <FormField label="Direct Phone" required error={errors.phone?.message}>
                    <Input placeholder="+1 (555) 000-0000" {...register('phone')} />
                  </FormField>
                </div>
              </div>
            )}

            {/* STEP 2: Financial Health & Facility */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-sky-300/20 pb-4">
                  <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#FFC911]" />
                    <span>Financial Metrics & Capital Requirement</span>
                  </h3>
                  <p className="text-xs text-sky-200/80">
                    We use these figures to match with optimal private debt syndicates.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Trailing 12-Month Revenue" required error={errors.annualRevenue?.message}>
                    <Select
                      options={[
                        { label: '$250k - $500k', value: '$250k - $500k' },
                        { label: '$500k - $1M', value: '$500k - $1M' },
                        { label: '$1M - $3M', value: '$1M - $3M' },
                        { label: '$3M - $5M', value: '$3M - $5M' },
                        { label: '$5M - $15M+', value: '$5M - $15M+' },
                      ]}
                      {...register('annualRevenue')}
                    />
                  </FormField>

                  <FormField label="Monthly Operating Expenses" required error={errors.monthlyBurn?.message}>
                    <Select
                      options={[
                        { label: 'Under $50,000 / mo', value: '< $50k' },
                        { label: '$50k - $100k / mo', value: '$50k - $100k' },
                        { label: '$100k - $200k / mo', value: '$100k - $200k' },
                        { label: '$200k - $300k / mo', value: '$200k - $300k' },
                        { label: '$300k+ / mo', value: '$300k+' },
                      ]}
                      {...register('monthlyBurn')}
                    />
                  </FormField>
                </div>

                <FormField label="Desired Capital Amount" required error={errors.capitalRequested?.message}>
                  <Input placeholder="e.g. $850,000" {...register('capitalRequested')} />
                </FormField>

                <Controller
                  name="facilityType"
                  control={control}
                  render={({ field }) => (
                    <FormField label="Target Capital Structure" required error={errors.facilityType?.message}>
                      <RadioGroup
                        name="facilityType"
                        value={field.value}
                        onChange={field.onChange}
                        options={[
                          {
                            label: 'Revolving Working Capital Line',
                            value: 'Revolving Working Capital Line',
                            description: 'Draw only what you need, pay interest only on outstanding balance.',
                          },
                          {
                            label: 'Revenue-Based Credit Facility',
                            value: 'Revenue-Based Credit Facility',
                            description: 'Repayments scale automatically with your monthly revenue.',
                          },
                          {
                            label: 'Equipment Lease & Fleet Line',
                            value: 'Equipment Lease & Fleet Line',
                            description: 'Dedicated asset financing for machinery, trucks, or infrastructure.',
                          },
                        ]}
                      />
                    </FormField>
                  )}
                />
              </div>
            )}

            {/* STEP 3: Verification & File Upload */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-sky-300/20 pb-4">
                  <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-sky-400" />
                    <span>Document Upload & Fiduciary Consent</span>
                  </h3>
                  <p className="text-xs text-sky-200/80">
                    Upload your last 3 bank statements or corporate tax return to accelerate approval.
                  </p>
                </div>

                <FileUpload
                  onFilesSelected={(files) => setUploadedFiles(files)}
                  label="Upload Bank Statements or P&L"
                />

                <div className="p-4 rounded-xl bg-[#081834]/60 border border-sky-300/25 space-y-4 backdrop-blur-sm">
                  <Controller
                    name="consentToSoftCredit"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        error={errors.consentToSoftCredit?.message}
                        label="Authorize Soft Pre-Qualification Check"
                        description="I authorize B4B America to verify corporate records and perform a soft inquiry. This does NOT affect personal or business credit scores."
                      />
                    )}
                  />

                  <Controller
                    name="advisoryAddon"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        label="Include Fractional CFO Strategy Assessment"
                        description="Pair this facility application with a complimentary 30-minute cash conversion review by a Senior Managing Director."
                      />
                    )}
                  />
                </div>
              </div>
            )}

            {/* Form Controls / Buttons */}
            <div className="pt-6 border-t border-sky-300/20 flex items-center justify-between">
              {currentStep > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Previous Step
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 2 ? (
                <Button
                  type="button"
                  variant="primary"
                  pill
                  onClick={nextStep}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue to Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  pill
                  isLoading={isSubmitting}
                  rightIcon={<CheckCircle2 className="w-5 h-5" />}
                  className="shadow-lg shadow-[var(--blue-600)]/25"
                >
                  Submit Pre-Qualification
                </Button>
              )}
            </div>
          </form>
        ) : (
          /* Submission Success State */
          <div className="text-center py-8 space-y-6 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-[var(--green-600)]/15 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <Badge variant="success" size="md">
                Application Pre-Approved
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-2">
                Preliminary Facility Approved: $850,000
              </h2>
              <p className="text-sm text-sky-200/80 max-w-md mx-auto mt-2">
                Your application has been received and verified against our syndication algorithms. We have initialized your private client terminal.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#081834]/60 border border-sky-300/25 max-w-sm mx-auto text-left text-xs space-y-2 backdrop-blur-sm">
              <div className="flex justify-between">
                <span className="text-sky-200/70">Applicant:</span>
                <span className="font-bold text-white">Marcus Vance</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sky-200/70">Company:</span>
                <span className="font-bold text-white">Apex Freight & Logistics LLC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sky-200/70">Initial Facility:</span>
                <span className="font-bold text-emerald-400">$850,000 Available</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                pill
                onClick={() => navigate('/portal/dashboard')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="shadow-lg shadow-[var(--blue-600)]/25 text-base"
              >
                Access Your Client Terminal
              </Button>
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  )
}
