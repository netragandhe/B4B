import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import { FormField } from '@/components/ui/FormField'
import { useToast } from '@/components/ui/Toast'

export const coachSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Valid 10-digit phone number is required'),
  businessType: z.string().min(1, 'Please select your industry'),
  state: z.string().min(1, 'Please select your state'),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Consent is required to receive a call from your assigned coach',
  }),
})

export type CoachFormData = z.infer<typeof coachSchema>

export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
]

export const BUSINESS_TYPES = [
  'Restaurant / Bar / Food Service',
  'Trucking / Freight / Logistics',
  'Salon / Spa / Personal Care',
  'Church / Faith-Based Non-Profit',
  'Real Estate / Property Management',
  'Healthcare / Dental / Medical Clinic',
  'Construction / General Contracting / Trades',
  'Automotive Repair / Dealership',
  'Retail Store / Boutique / E-Commerce',
  'Daycare / Early Child Education',
  'Professional Consulting / Legal / Accounting',
  'Manufacturing / Industrial',
  'Other Small Business'
]

interface CoachFormProps {
  initialIndustry?: string
  initialNote?: string
  onSuccess?: () => void
  isInline?: boolean
}

export const CoachLeadForm: React.FC<CoachFormProps> = ({
  initialIndustry = '',
  initialNote = '',
  onSuccess,
  isInline = false,
}) => {
  const { toast } = useToast()
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CoachFormData>({
    resolver: zodResolver(coachSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      businessType: initialIndustry || 'Restaurant / Bar / Food Service',
      state: 'Texas',
      message: initialNote || '',
      consent: true,
    },
  })

  const onSubmit = (data: CoachFormData) => {
    setSubmitted(true)
    toast({
      title: 'Consultation Request Confirmed!',
      description: `A senior business coach has been assigned to ${data.fullName}. We will call you within 1 business hour.`,
      type: 'success',
    })
    reset()
    if (onSuccess) onSuccess()
  }

  if (submitted && !isInline) {
    return (
      <div className="py-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-[var(--green-600)]/10 text-[var(--green-600)] flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="text-xl font-bold font-heading text-[var(--navy-900)]">
          Coach Assigned Successfully
        </h4>
        <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
          Thank you! A B4B America Business Coach specializing in your industry will review your requirements and reach out via phone.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
          Submit Another Request
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <FormField label="Full Name" required error={errors.fullName?.message}>
          <Input placeholder="John Doe" {...register('fullName')} />
        </FormField>
        <FormField label="Business Phone" required error={errors.phone?.message}>
          <Input placeholder="(555) 000-0000" {...register('phone')} />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <FormField label="Business Email" required error={errors.email?.message}>
          <Input type="email" placeholder="john@mybusiness.com" {...register('email')} />
        </FormField>

        <FormField label="State Located" required error={errors.state?.message}>
          <Select
            options={US_STATES.map((st) => ({ label: st, value: st }))}
            {...register('state')}
          />
        </FormField>
      </div>

      <FormField label="Industry / Trade" required error={errors.businessType?.message}>
        <Select
          options={BUSINESS_TYPES.map((b) => ({ label: b, value: b }))}
          {...register('businessType')}
        />
      </FormField>

      <FormField label="What are your immediate goals or challenges?">
        <Textarea
          placeholder="e.g. Need $250k working capital, want to separate personal credit, need better payment processing rates..."
          className="min-h-[75px]"
          {...register('message')}
        />
      </FormField>

      <Controller
        name="consent"
        control={control}
        render={({ field }) => (
          <Checkbox
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            error={errors.consent?.message}
            label="I consent to receive phone calls and text messages"
            description="I agree to receive communications from a B4B America certified business coach regarding small business advisory services. Message/data rates may apply."
          />
        )}
      />

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          pill
          isLoading={isSubmitting}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="w-full text-sm font-bold shadow-md shadow-[var(--blue-600)]/10"
        >
          Connect with a Business Coach
        </Button>
        <p className="text-[11px] text-center text-[var(--text-muted)] mt-2 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[var(--green-600)]" />
          <span>Fiduciary Standard • 100% Confidential Discovery</span>
        </p>
      </div>
    </form>
  )
}

interface CoachRequestModalProps {
  isOpen: boolean
  onClose: () => void
  initialIndustry?: string
  initialNote?: string
}

export const CoachRequestModal: React.FC<CoachRequestModalProps> = ({
  isOpen,
  onClose,
  initialIndustry,
  initialNote,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span>Speak with a Business Coach</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-[var(--green-600)]/10 text-[var(--green-600)] font-bold">
            Complimentary 1-on-1
          </span>
        </div>
      }
      description="Connect with a veteran operator who understands your industry to review capital, operations, credit, or marketing."
      maxWidth="lg"
    >
      <CoachLeadForm
        initialIndustry={initialIndustry}
        initialNote={initialNote}
        onSuccess={onClose}
      />
    </Modal>
  )
}
