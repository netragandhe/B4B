import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  ShieldCheck,
  Building,
  Mail,
  Phone,
  Globe,
  Sparkles,
  CheckCircle2,
  Bell,
  CreditCard,
  FileCheck2,
  Save,
  Link2,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Switch } from '@/components/ui/Switch'
import { FormField } from '@/components/ui/FormField'
import { SEOHead } from '@/components/seo/SEOHead'
import { PageTransition } from '@/components/animations/PageTransition'
import { PageLoadingFallback } from '@/components/ui/PageLoadingFallback'
import { ErrorState } from '@/components/ui/ErrorState'
import { usePartnerProfile, useUpdatePartnerProfile } from '@/hooks/queries/useAffiliateData'
import { useToast } from '@/components/ui/Toast'

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name required'),
  businessName: z.string().min(2, 'Business legal name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  website: z.string().url('Valid website URL required'),
  customSlug: z.string().min(2, 'Slug required').regex(/^[a-z0-9-]+$/, 'Alphanumeric and dashes only'),
  bio: z.string().min(10, 'Brief description required'),
})

type ProfileFormData = z.infer<typeof profileSchema>

export const PartnerProfilePage: React.FC = () => {
  const { toast } = useToast()
  const { data: profile, isLoading, isError, refetch } = usePartnerProfile()
  const { mutate: updateProfile, isPending: isUpdating } = useUpdatePartnerProfile()

  const [emailLeads, setEmailLeads] = useState(true)
  const [emailPayouts, setEmailPayouts] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      businessName: '',
      email: '',
      phone: '',
      website: '',
      customSlug: '',
      bio: '',
    },
  })

  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.fullName,
        businessName: profile.businessName,
        email: profile.email,
        phone: profile.phone,
        website: profile.website,
        customSlug: profile.customSlug,
        bio: profile.bio,
      })
      setEmailLeads(profile.notificationPreferences.emailLeads)
      setEmailPayouts(profile.notificationPreferences.emailPayouts)
      setWeeklyDigest(profile.notificationPreferences.weeklyDigest)
      setSmsAlerts(profile.notificationPreferences.smsAlerts)
    }
  }, [profile, reset])

  const onSubmit = (data: ProfileFormData) => {
    updateProfile(
      {
        ...data,
        notificationPreferences: {
          emailLeads,
          emailPayouts,
          weeklyDigest,
          smsAlerts,
        },
      },
      {
        onSuccess: () => {
          toast({
            title: 'Partner Profile Updated',
            description: 'Your settings and custom referral slug have been saved.',
            type: 'success',
          })
        },
        onError: () => {
          toast({
            title: 'Update Failed',
            description: 'Could not save profile changes.',
            type: 'error',
          })
        },
      }
    )
  }

  if (isLoading) return <PageLoadingFallback />
  if (isError) {
    return (
      <ErrorState
        title="Could not load profile"
        message="Unable to retrieve partner profile settings."
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-8 text-left">
        <SEOHead
          title="Partner Profile & Terminal Settings | OAL Partner Hub"
          description="Manage your partner credentials, custom referral slug, tax W-9 compliance, and payout bank."
        />

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                Partner Profile & Preferences
              </h1>
              <Badge variant="gold" size="sm">
                Platinum VIP
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Account status, commission tier benefits, and ACH direct deposit details.
            </p>
          </div>
        </div>

        {/* Tier Benefits Status Banner */}
        <Card variant="bento" className="p-6 border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-r from-emerald-50/70 via-teal-50/30 to-blue-50/50 dark:from-[#0d2a2a] dark:to-[#0D1E36]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  {profile?.partnerTier || 'Platinum VIP Partner'}
                </span>
                <Badge variant="emerald" size="sm">
                  Active Member
                </Badge>
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                +25% Commission Bonus Activated
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl">
                As a verified institutional partner, you receive priority underwriting for submitted leads, dedicated account manager support, and automated bi-weekly ACH disbursements.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/90 dark:bg-[#0D1E36] border text-center text-xs shrink-0">
              <span className="text-slate-400 block text-[10px]">Member Since</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {profile?.joinedDate || 'Jan 15, 2026'}
              </span>
            </div>
          </div>
        </Card>

        {/* Main Settings Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Section 1: Partner Information */}
          <Card variant="bento" className="p-6 sm:p-8 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
              <Building className="w-4 h-4 text-blue-500" />
              <span>Partner Credentials & Organization</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Full Legal Name" required error={errors.fullName?.message}>
                <Input {...register('fullName')} />
              </FormField>

              <FormField label="Organization / Agency Name" required error={errors.businessName?.message}>
                <Input {...register('businessName')} />
              </FormField>

              <FormField label="Business Email" required error={errors.email?.message}>
                <Input type="email" {...register('email')} />
              </FormField>

              <FormField label="Phone Number" required error={errors.phone?.message}>
                <Input {...register('phone')} />
              </FormField>

              <FormField label="Primary Website" required error={errors.website?.message}>
                <Input {...register('website')} />
              </FormField>

              <FormField
                label="Custom Short Slug"
                required
                error={errors.customSlug?.message}
                hint="Your master referral link: https://oal.link/[slug]"
              >
                <Input {...register('customSlug')} />
              </FormField>
            </div>

            <div className="pt-2">
              <FormField label="Professional Bio / Audience Overview" required error={errors.bio?.message}>
                <Textarea className="min-h-[80px]" {...register('bio')} />
              </FormField>
            </div>
          </Card>

          {/* Section 2: Compliance & Payout Details */}
          <Card variant="bento" className="p-6 sm:p-8 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Tax Compliance & Direct Deposit Account</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Tax Document</span>
                  <Badge variant="emerald" size="sm">
                    {profile?.taxFormStatus || 'W-9 Verified'}
                  </Badge>
                </div>
                <p className="text-slate-500 text-[11px]">
                  IRS Form W-9 active on file for tax reporting year 2026.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    toast({
                      title: 'W-9 Document',
                      description: 'Signed Form W-9 opened for verification.',
                      type: 'info',
                    })
                  }
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold block pt-1"
                >
                  View Signed Form W-9 (PDF) →
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 dark:text-slate-300">ACH Deposit Bank</span>
                  <Badge variant="royal" size="sm">
                    Active
                  </Badge>
                </div>
                <p className="text-slate-900 dark:text-white font-semibold">
                  {profile?.payoutMethod.bankName || 'JPMorgan Chase'}
                </p>
                <p className="text-slate-500 font-mono text-[11px]">
                  Routing: ••• {profile?.payoutMethod.routingEnding || '0421'} • Account: •••{' '}
                  {profile?.payoutMethod.accountEnding || '9184'}
                </p>
              </div>
            </div>
          </Card>

          {/* Section 3: Notification Preferences */}
          <Card variant="bento" className="p-6 sm:p-8 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
              <Bell className="w-4 h-4 text-amber-500" />
              <span>Real-Time Notifications & Alerts</span>
            </h3>

            <div className="space-y-3 divide-y divide-slate-100 dark:divide-[#1E3A5F]/70 text-xs">
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Lead Status Progressions
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    Receive an immediate email whenever a referred client reaches Pre-Approved or Funded status.
                  </span>
                </div>
                <Switch checked={emailLeads} onChange={setEmailLeads} />
              </div>

              <div className="pt-3 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Payout & Settlement Receipts
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    Get notified immediately when direct deposit transfers are queued and cleared.
                  </span>
                </div>
                <Switch checked={emailPayouts} onChange={setEmailPayouts} />
              </div>

              <div className="pt-3 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Weekly Partner Executive Digest
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    Weekly summary of clicks, EPC metrics, top performing links, and new campaign assets.
                  </span>
                </div>
                <Switch checked={weeklyDigest} onChange={setWeeklyDigest} />
              </div>

              <div className="pt-3 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    SMS Urgent Deal Alerts
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    Receive urgent SMS alerts when an underwriter needs additional client documentation.
                  </span>
                </div>
                <Switch checked={smsAlerts} onChange={setSmsAlerts} />
              </div>
            </div>
          </Card>

          {/* Submit Action */}
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isUpdating}
              leftIcon={<Save className="w-4 h-4" />}
              className="font-bold shadow-md shadow-blue-500/20"
            >
              Save Profile & Preferences
            </Button>
          </div>
        </form>
      </div>
    </PageTransition>
  )
}
