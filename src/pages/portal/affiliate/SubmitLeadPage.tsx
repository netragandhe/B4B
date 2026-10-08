import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  UserPlus,
  Building2,
  DollarSign,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  FileCheck2,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { FormField } from '@/components/ui/FormField'
import { SEOHead } from '@/components/seo/SEOHead'
import { PageTransition } from '@/components/animations/PageTransition'
import { useSubmitLead, useAffiliateLinks } from '@/hooks/queries/useAffiliateData'
import { useToast } from '@/components/ui/Toast'
import { formatCurrency } from '@/lib/utils'

const submitLeadSchema = z.object({
  companyName: z.string().min(2, 'Company legal name required'),
  contactName: z.string().min(2, 'Primary contact name required'),
  contactEmail: z.string().email('Valid business email address required'),
  contactPhone: z.string().min(10, 'Valid phone number required'),
  solutionNeeded: z.string().min(1, 'Please select requested solution'),
  dealSize: z.coerce.number().min(5000, 'Minimum estimated size is $5,000'),
  annualRevenue: z.string().min(1, 'Please select approximate revenue'),
  timeInBusiness: z.string().min(1, 'Please select time in business'),
  urgency: z.string().min(1, 'Please select urgency'),
  trackingSlug: z.string().optional(),
  notes: z.string().min(10, 'Provide at least 1-2 sentences of client context'),
})

type SubmitLeadFormData = z.infer<typeof submitLeadSchema>

export const SubmitLeadPage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { data: links } = useAffiliateLinks()
  const { mutate: submitLead, isPending } = useSubmitLead()

  const [submittedLead, setSubmittedLead] = useState<{
    id: string
    companyName: string
    solution: string
    dealSize: number
    commission: number
  } | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SubmitLeadFormData>({
    resolver: zodResolver(submitLeadSchema) as any,
    defaultValues: {
      solutionNeeded: 'Business Loans & Revolver ($50k - $5M)',
      dealSize: 250000,
      annualRevenue: '$500k - $1M',
      timeInBusiness: '2 - 5 Years',
      urgency: 'Within 7-14 Days',
      trackingSlug: 'alex-loans',
      notes: '',
    },
  })

  const currentDealSize = watch('dealSize') || 250000
  const estimatedCommission = Math.round(Number(currentDealSize) * 0.005) // Indicative baseline

  const onSubmit = (data: SubmitLeadFormData) => {
    submitLead(
      {
        companyName: data.companyName,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        solutionNeeded: data.solutionNeeded,
        dealSize: Number(data.dealSize),
        notes: data.notes,
        trackingSlug: data.trackingSlug,
      },
      {
        onSuccess: (newLead) => {
          setSubmittedLead({
            id: newLead.id,
            companyName: newLead.companyName,
            solution: newLead.solutionNeeded,
            dealSize: newLead.dealSize,
            commission: newLead.commissionEarned,
          })
          toast({
            title: 'Lead Routed to Underwriting Desk',
            description: `${data.companyName} received. Dedicated advisor assigned with 48-hour SLA.`,
            type: 'success',
          })
          reset()
        },
        onError: () => {
          toast({
            title: 'Submission Failed',
            description: 'Could not submit lead. Please verify all fields and retry.',
            type: 'error',
          })
        },
      }
    )
  }

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-8 text-left">
        <SEOHead
          title="Direct Lead Intake Terminal | OAL Partner Hub"
          description="Submit commercial client leads directly to the underwriting desk for fast pre-approvals."
        />

        {/* Header */}
        <div className="space-y-2">
          <Badge variant="emerald" size="sm">
            Institutional Lead Fast-Track
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
            Submit a Direct Client Lead
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Skip the generic marketing funnel. Submit warm commercial clients directly to our senior loan officers and advisory directors.
          </p>
        </div>

        {/* Success Confirmation Card if just submitted */}
        {submittedLead && (
          <Card variant="bento" className="p-6 border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30 space-y-4 animate-fadeIn">
            <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <h3 className="text-base font-bold font-heading">
                  Lead Successfully Queued ({submittedLead.id})
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {submittedLead.companyName} is now in <strong>Underwriting Intake</strong>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D1E36] border">
                <span className="text-slate-400 block text-[11px]">Requested Solution</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{submittedLead.solution}</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D1E36] border">
                <span className="text-slate-400 block text-[11px]">Deal Value</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{formatCurrency(submittedLead.dealSize)}</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D1E36] border">
                <span className="text-slate-400 block text-[11px]">Est. Commission</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(submittedLead.commission)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                size="sm"
                variant="primary"
                onClick={() => navigate('/portal/affiliate/referrals')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="text-xs font-bold"
              >
                Track in Referrals Table
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSubmittedLead(null)}
                className="text-xs"
              >
                Submit Another Lead
              </Button>
            </div>
          </Card>
        )}

        {/* Lead Submission Form */}
        <Card variant="bento" className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Section 1: Business & Contact Info */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-500" />
                <span>1. Business & Contact Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Legal Business Name" required error={errors.companyName?.message}>
                  <Input placeholder="Apex Freight & Logistics LLC" {...register('companyName')} />
                </FormField>

                <FormField label="Primary Decision Maker Name" required error={errors.contactName?.message}>
                  <Input placeholder="Marcus Vance" {...register('contactName')} />
                </FormField>

                <FormField label="Business Email" required error={errors.contactEmail?.message}>
                  <Input type="email" placeholder="m.vance@company.com" {...register('contactEmail')} />
                </FormField>

                <FormField label="Phone Number" required error={errors.contactPhone?.message}>
                  <Input placeholder="(555) 000-0000" {...register('contactPhone')} />
                </FormField>
              </div>
            </div>

            {/* Section 2: Financial & Solution Scope */}
            <div className="pt-2 border-t border-slate-100 dark:border-[#1E3A5F]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                <span>2. Solution Scope & Financial Overview</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Primary Solution Needed" required error={errors.solutionNeeded?.message}>
                  <Select
                    options={[
                      { label: 'Business Loans & Revolver ($50k - $5M)', value: 'Business Loans & Revolver ($50k - $5M)' },
                      { label: 'Equipment Lease & Heavy Machinery', value: 'Equipment Lease & Machinery' },
                      { label: 'Build Business Credit (Tier 1-4 Profile)', value: 'Build Business Credit Tier 1-4' },
                      { label: 'Accept Payments & Merchant POS Terminal', value: 'Merchant POS & Payment Processing' },
                      { label: 'SBA 7(a) Business Plan Package', value: 'SBA 7(a) Business Plan Package' },
                      { label: 'Fractional CFO & Treasury Advisory', value: 'Fractional CFO & Treasury Advisory' },
                    ]}
                    {...register('solutionNeeded')}
                  />
                </FormField>

                <FormField
                  label="Estimated Financing / Deal Size ($ USD)"
                  required
                  error={errors.dealSize?.message}
                  hint={`Indicative commission: ${formatCurrency(estimatedCommission)} (0.5% - 2.5%)`}
                >
                  <Input
                    type="number"
                    step="5000"
                    placeholder="250000"
                    {...register('dealSize')}
                  />
                </FormField>

                <FormField label="Approximate Annual Gross Revenue" required error={errors.annualRevenue?.message}>
                  <Select
                    options={[
                      { label: 'Under $250,000 / year', value: '< $250k' },
                      { label: '$250,000 - $1,000,000 / year', value: '$250k - $1M' },
                      { label: '$1,000,000 - $5,000,000 / year', value: '$1M - $5M' },
                      { label: '$5,000,000+ / year', value: '$5M+' },
                    ]}
                    {...register('annualRevenue')}
                  />
                </FormField>

                <FormField label="Time in Business" required error={errors.timeInBusiness?.message}>
                  <Select
                    options={[
                      { label: 'New Startup (< 6 Months)', value: '< 6 Mo' },
                      { label: '6 Months to 2 Years', value: '6 Mo - 2 Yrs' },
                      { label: '2 to 5 Years', value: '2 - 5 Years' },
                      { label: '5+ Years Established', value: '5+ Years' },
                    ]}
                    {...register('timeInBusiness')}
                  />
                </FormField>
              </div>
            </div>

            {/* Section 3: Urgency & Underwriting Context */}
            <div className="pt-2 border-t border-slate-100 dark:border-[#1E3A5F]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>3. Urgency & Client Context</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Funding / Implementation Urgency" required error={errors.urgency?.message}>
                  <Select
                    options={[
                      { label: 'Urgent (Within 48-72 Hours)', value: 'Urgent 48h' },
                      { label: 'Within 7 to 14 Days', value: 'Within 7-14 Days' },
                      { label: 'Within 30 Days (Planning Stage)', value: 'Within 30 Days' },
                      { label: 'Exploratory Review', value: 'Exploratory' },
                    ]}
                    {...register('urgency')}
                  />
                </FormField>

                <FormField label="Attributed Partner Link Campaign">
                  <Select
                    options={[
                      { label: 'Master Partner Direct Hub (alex-hub)', value: 'alex-hub' },
                      { label: 'Loans & Revolver Funnel (alex-loans)', value: 'alex-loans' },
                      { label: 'Business Credit Builder (alex-credit)', value: 'alex-credit' },
                      { label: 'Direct Intake (No link cookie)', value: 'direct-submission' },
                    ]}
                    {...register('trackingSlug')}
                  />
                </FormField>
              </div>

              <div className="mt-4">
                <FormField
                  label="Underwriting Notes & Strategic Context"
                  required
                  error={errors.notes?.message}
                  hint="Mention current bank feeds, collateral or specific timeline needs so our underwriters fast-track the file."
                >
                  <Textarea
                    placeholder="e.g. Client needs $350k working capital revolver to fulfill a multi-state logistics contract. Trailing 12-month revenue is $3.2M with 28% gross margins. Clear corporate resolutions available."
                    className="min-h-[100px]"
                    {...register('notes')}
                  />
                </FormField>
              </div>
            </div>

            {/* Commission & SLA Terms */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-slate-600 dark:text-slate-300">
                  Non-Circumvent Protected • 48-Hour Underwriting Intake SLA Guarantee
                </span>
              </div>
              <div className="font-bold text-emerald-600 dark:text-emerald-400">
                Indicative Commission: {formatCurrency(estimatedCommission)}
              </div>
            </div>

            <Button
              type="submit"
              variant="accent"
              size="lg"
              isLoading={isPending}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full font-bold shadow-md shadow-emerald-500/25"
            >
              Submit Lead to Underwriting Desk
            </Button>
          </form>
        </Card>
      </div>
    </PageTransition>
  )
}
