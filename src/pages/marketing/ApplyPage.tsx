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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left">
      {/* Breadcrumb & Header */}
      <div className="space-y-3">
        <Breadcrumb items={[{ label: 'Pre-Qualification Application' }]} />
        <Badge variant="primary" size="md">
          Institutional Intake
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
          Apply for Pre-Approved Business Capital
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Takes under 4 minutes. Soft check only with 0 credit impact. Instant term sheet generation.
        </p>
      </div>

      {/* Stepper Progress */}
      <Stepper steps={STEPS} currentStep={currentStep} onStepClick={(idx) => setCurrentStep(idx)} />

      {/* Main Application Card Form */}
      <Card variant="bento" className="p-6 sm:p-10 border-slate-200 dark:border-[#1E3A5F] shadow-xl">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* STEP 1: Entity & Founder */}
            {currentStep === 0 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-100 dark:border-[#1E3A5F] pb-4">
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <span>Company & Founder Information</span>
                  </h3>
                  <p className="text-xs text-slate-500">
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
                <div className="border-b border-slate-100 dark:border-[#1E3A5F] pb-4">
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-500" />
                    <span>Financial Metrics & Capital Requirement</span>
                  </h3>
                  <p className="text-xs text-slate-500">
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
                <div className="border-b border-slate-100 dark:border-[#1E3A5F] pb-4">
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Document Upload & Fiduciary Consent</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Upload your last 3 bank statements or corporate tax return to accelerate approval.
                  </p>
                </div>

                <FileUpload
                  onFilesSelected={(files) => setUploadedFiles(files)}
                  label="Upload Bank Statements or P&L"
                />

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#12294A]/60 border border-slate-200/60 dark:border-[#1E3A5F] space-y-4">
                  <Controller
                    name="consentToSoftCredit"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        error={errors.consentToSoftCredit?.message}
                        label="Authorize Soft Pre-Qualification Check"
                        description="I authorize OAL Network to verify corporate records and perform a soft inquiry. This does NOT affect personal or business credit scores."
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
            <div className="pt-6 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
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
                  variant="accent"
                  size="lg"
                  pill
                  isLoading={isSubmitting}
                  rightIcon={<CheckCircle2 className="w-5 h-5" />}
                  className="shadow-lg shadow-emerald-500/25"
                >
                  Submit Pre-Qualification
                </Button>
              )}
            </div>
          </form>
        ) : (
          /* Submission Success State */
          <div className="text-center py-8 space-y-6 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <Badge variant="emerald" size="md">
                Application Pre-Approved
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white mt-2">
                Preliminary Facility Approved: $850,000
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-2">
                Your application has been received and verified against our syndication algorithms. We have initialized your private client terminal.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#12294A] max-w-sm mx-auto text-left text-xs space-y-2 border border-slate-200 dark:border-[#1E3A5F]">
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">Marcus Vance</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Company:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">Apex Freight & Logistics LLC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Initial Facility:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">$850,000 Available</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                pill
                onClick={() => navigate('/portal/dashboard')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="shadow-lg shadow-blue-500/25 text-base"
              >
                Access Your Client Terminal
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
