import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Handshake,
  DollarSign,
  Share2,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Tabs } from '@/components/ui/Tabs'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { FormField } from '@/components/ui/FormField'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { useToast } from '@/components/ui/Toast'

const partnerAppSchema = z.object({
  partnerType: z.string().min(1, 'Partner category required'),
  name: z.string().min(2, 'Full name required'),
  organization: z.string().min(2, 'Company / Channel name required'),
  email: z.string().email('Valid business email required'),
  phone: z.string().min(10, 'Valid phone required'),
  audienceSize: z.string().min(1, 'Select monthly referral volume'),
  proposal: z.string().min(10, 'Tell us briefly how you plan to partner'),
})

type PartnerAppFormData = z.infer<typeof partnerAppSchema>

export const AffiliatesPage: React.FC = () => {
  const { toast } = useToast()
  const [activePartnerTab, setActivePartnerTab] = useState('affiliate')

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PartnerAppFormData>({
    resolver: zodResolver(partnerAppSchema),
    defaultValues: {
      partnerType: 'Affiliate Referral Partner',
      audienceSize: '10 - 50 Clients / Month',
      proposal: '',
    },
  })

  const onTabChange = (tabId: string) => {
    setActivePartnerTab(tabId)
    const typeLabel =
      tabId === 'affiliate'
        ? 'Affiliate Referral Partner'
        : tabId === 'partner'
        ? 'Strategic CPA / Broker Partner'
        : 'Creator / Influencer Partner'
    setValue('partnerType', typeLabel)
  }

  const onSubmit = (data: PartnerAppFormData) => {
    toast({
      title: 'Partner Application Received!',
      description: `Welcome! Our partnership director will review ${data.organization} and schedule a briefing call.`,
      type: 'success',
    })
    reset()
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      <SEOHead
        title="Affiliate & Strategic Partner Network"
        description="Partner with OAL Network. Earn generous commissions and rev-shares by connecting small businesses with capital, credit, and coaching."
      />

      {/* Header */}
      <div className="space-y-4">
        <Breadcrumb items={[{ label: 'Affiliates & Partners' }]} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="emerald" size="md">
            Ecosystem Partnerships
          </Badge>
          <Link
            to="/portal/affiliate/dashboard"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
          >
            <span>Approved Partner? Access Partner Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
          Partner with America's Small Business Solution Network
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-3xl text-sm sm:text-base leading-relaxed">
          Whether you are an independent affiliate, a licensed CPA or commercial broker, or a digital creator with a business audience, monetize your reach with high-converting financial solutions.
        </p>
      </div>

      {/* Partner Category Tabs */}
      <div className="flex justify-center sm:justify-start">
        <Tabs
          variant="segmented"
          activeTab={activePartnerTab}
          onChange={onTabChange}
          tabs={[
            { id: 'affiliate', label: 'Affiliates', badge: 'Up to $1.5k/client' },
            { id: 'partner', label: 'CPA & Broker Partners' },
            { id: 'influencer', label: 'Creators & Influencers' },
          ]}
        />
      </div>

      {/* Partner Tier Benefits Banner */}
      <Card variant="bento" className="p-6 sm:p-8 border-blue-200 dark:border-[#1E3A5F]">
        {activePartnerTab === 'affiliate' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              <DollarSign className="w-4 h-4" />
              <span>Affiliate Referral Program</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white">
              Earn $500 – $1,500+ Per Funded Business Client
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Refer local business owners to our business loans, business credit builder, or merchant POS setups. You receive custom referral links, tracking dashboard, and automatic bi-weekly direct deposit payouts.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D1E36] border">
                <span className="text-slate-400 block text-[11px]">Funded Loans</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Up to 2.5% points</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D1E36] border">
                <span className="text-slate-400 block text-[11px]">Merchant POS</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">Monthly Rev-Share</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D1E36] border">
                <span className="text-slate-400 block text-[11px]">Payout Schedule</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Bi-Weekly Direct Deposit</span>
              </div>
            </div>
          </div>
        )}

        {activePartnerTab === 'partner' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Handshake className="w-4 h-4" />
              <span>Strategic Institutional Partners</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white">
              White-Glove Syndication for CPAs, Attorneys & Brokers
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Protect your client relationships with an institutional partner. We handle all underwriting heavy lifting, debt syndication, and SBA loan packaging while keeping your firm in the loop.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D1E36] border">
                <span className="text-slate-400 block text-[11px]">Portal Type</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Co-Branded Client Portal</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D1E36] border">
                <span className="text-slate-400 block text-[11px]">Lead Routing</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Dedicated Underwriting Desk</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#0D1E36] border">
                <span className="text-slate-400 block text-[11px]">Client Protection</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">Non-Circumvent Agreement</span>
              </div>
            </div>
          </div>
        )}

        {activePartnerTab === 'influencer' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Share2 className="w-4 h-4" />
              <span>Creators & Media Influencers</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white">
              Sponsorships, Co-Hosted Webinars & Audience Grants
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Do you host a podcast, YouTube channel, or newsletter for small business owners? We sponsor educational content, provide guest CFO speakers, and offer exclusive funding incentives for your community.
            </p>
          </div>
        )}
      </Card>

      {/* Application Form */}
      <Card variant="default" className="p-6 sm:p-10 text-left">
        <div className="border-b border-slate-100 dark:border-[#1E3A5F] pb-4 mb-6">
          <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
            Apply to Join the Network
          </h3>
          <p className="text-xs text-slate-500">
            Current Category: <strong className="text-blue-600 dark:text-blue-400">{activePartnerTab.toUpperCase()}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <FormField label="Full Name" required error={errors.name?.message}>
              <Input placeholder="Jane Smith" {...register('name')} />
            </FormField>
            <FormField label="Company or Channel Name" required error={errors.organization?.message}>
              <Input placeholder="Smith Financial Advisors LLC" {...register('organization')} />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <FormField label="Business Email" required error={errors.email?.message}>
              <Input type="email" placeholder="jane@smithadvisors.com" {...register('email')} />
            </FormField>
            <FormField label="Phone Number" required error={errors.phone?.message}>
              <Input placeholder="(555) 000-0000" {...register('phone')} />
            </FormField>
          </div>

          <FormField label="Estimated Monthly Business Client Reach" required error={errors.audienceSize?.message}>
            <Select
              options={[
                { label: 'Under 10 Businesses / Month', value: '< 10' },
                { label: '10 - 50 Businesses / Month', value: '10 - 50' },
                { label: '50 - 200 Businesses / Month', value: '50 - 200' },
                { label: '200+ Businesses / Month', value: '200+' },
              ]}
              {...register('audienceSize')}
            />
          </FormField>

          <FormField label="How would you like to partner with OAL Network?" required error={errors.proposal?.message}>
            <Textarea
              placeholder="Describe your audience or client base and the primary solutions you want to refer..."
              className="min-h-[90px]"
              {...register('proposal')}
            />
          </FormField>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              pill
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full text-xs font-bold"
            >
              Submit Partner Application
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
