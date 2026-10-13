import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Handshake,
  ArrowRight,
  PhoneCall,
  ChevronRight,
  Cpu,
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
import { B4BAPP_SOFTWARE } from '@/content/clientContent'

const partnerAppSchema = z.object({
  partnerType: z.string().min(1, 'Partner category required'),
  name: z.string().min(2, 'Full name required'),
  organization: z.string().min(2, 'Company / Channel name required'),
  email: z.string().email('Valid business email required'),
  phone: z.string().min(10, 'Valid phone required'),
  proposal: z.string().min(10, 'Tell us briefly how you plan to partner'),
})

type PartnerAppFormData = z.infer<typeof partnerAppSchema>

export const AffiliatesPage: React.FC = () => {
  const { toast } = useToast()
  const [coachModalOpen, setCoachModalOpen] = useState(false)
  const [activePartnerType, setActivePartnerType] = useState('Affiliate')

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PartnerAppFormData>({
    resolver: zodResolver(partnerAppSchema),
    defaultValues: {
      partnerType: 'Affiliate Partner',
      proposal: '',
    },
  })

  const onSubmit = (data: PartnerAppFormData) => {
    toast({
      title: 'Partner Application Received!',
      description: `Welcome to the B4B Network! Our partnership director will review ${data.organization} and schedule a briefing call.`,
      type: 'success',
    })
    reset()
  }

  return (
    <div className="min-h-screen bg-[#E9EDF4] text-[#14233B] transition-colors duration-200 font-body">
      <SEOHead
        title="Affiliates, Partners & Influencers | B4B America"
        description="Solution #14: Lucrative partnership and revenue-sharing opportunities with B4B America for CPAs, commercial brokers, consultants, and creators."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 text-left">
        {/* Top Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: '16 Solutions', href: '/solutions' },
            { label: 'Affiliates / Partners / Influencers' },
          ]}
        />

        {/* Hero Section in Midnight Navy #07142B */}
        <div className="relative p-8 sm:p-12 rounded-3xl bg-[#07142B] text-white border border-[#0D2147] shadow-xl overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-15 overflow-hidden">
            <UsaMapMotif className="w-full h-full text-[#F8C61A]" opacity={0.2} />
          </div>

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black font-mono px-2.5 py-1 rounded bg-[#0D2147] text-[#F8C61A] border border-[#0D2147]">
                Solution #14 of 16
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#0D2147] text-[#B8C4D9] font-mono">
                Growth & Revenue Sharing
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0D2147] text-[#F8C61A] flex items-center justify-center shrink-0 shadow-md">
                <Handshake className="w-7 h-7" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
                Affiliates / Partners / Influencers
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#B8C4D9] leading-relaxed max-w-2xl font-body">
              Lucrative revenue-sharing partnership opportunities for CPAs, commercial brokers, consultants, and digital creators to monetize business relationships across our 16 solutions.
            </p>

            {/* MANDATORY ACTIONS PER CLIENT RULES: */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => setCoachModalOpen(true)}
                className="btn-gold-dark group"
              >
                <PhoneCall className="w-4 h-4 text-[#07142B]" />
                <span>Speak with a Business Coach</span>
                <ArrowRight className="w-4 h-4 text-[#07142B] transition-transform group-hover:translate-x-1" />
              </button>

              <Link
                to="/solutions/affiliates-partners"
                className="btn-outline-dark group"
              >
                <span>Click Here for Solution Details</span>
                <ChevronRight className="w-4 h-4 text-[#F8C61A] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Partner Categories & B4BAPP Career Ladder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Tiers & Application Form in White Container */}
          <div className="lg:col-span-7 space-y-8">
            {/* Category Selector Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  id: 'Affiliate',
                  title: 'Affiliate Partner',
                  desc: 'Refer small businesses to our financing, payment, or credit programs and receive recurring payouts.',
                },
                {
                  id: 'Strategic',
                  title: 'Strategic CPA / Broker',
                  desc: 'White-label advisory tools, client financing syndication, and commission rev-share.',
                },
                {
                  id: 'Influencer',
                  title: 'Creator / Influencer',
                  desc: 'Co-branded campaigns, business educational webinars, and sponsorship tracking.',
                },
              ].map((tier) => (
                <div
                  key={tier.id}
                  onClick={() => {
                    setActivePartnerType(tier.id)
                    setValue('partnerType', `${tier.title}`)
                  }}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all shadow-xs ${
                    activePartnerType === tier.id
                      ? 'border-[#0C43A3] bg-white ring-2 ring-[#0C43A3]/20'
                      : 'border-[#14233B]/10 bg-white hover:border-[#0C43A3]'
                  }`}
                >
                  <h4 className="text-sm font-extrabold text-[#14233B] font-heading">{tier.title}</h4>
                  <p className="text-xs text-[#14233B]/70 mt-1.5 leading-relaxed font-body">{tier.desc}</p>
                </div>
              ))}
            </div>

            {/* Application Form in White Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#14233B]/10 shadow-sm space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-[#14233B] font-heading">
                  Apply for the B4B America Partner Network
                </h3>
                <p className="text-xs text-[#14233B]/70 font-body">
                  Active partner application for {activePartnerType} Category.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Full Name" required error={errors.name?.message}>
                    <Input placeholder="John Doe" {...register('name')} />
                  </FormField>
                  <FormField label="Company / Brand" required error={errors.organization?.message}>
                    <Input placeholder="Acme Financial" {...register('organization')} />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Business Email" required error={errors.email?.message}>
                    <Input type="email" placeholder="john@acme.com" {...register('email')} />
                  </FormField>
                  <FormField label="Direct Phone" required error={errors.phone?.message}>
                    <Input placeholder="(555) 000-0000" {...register('phone')} />
                  </FormField>
                </div>

                <FormField label="Partnership Proposal" required error={errors.proposal?.message}>
                  <Textarea
                    placeholder="Briefly describe your client audience or referral capabilities..."
                    rows={4}
                    {...register('proposal')}
                  />
                </FormField>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-blue-light w-full sm:w-auto"
                  >
                    Submit Partner Application
                  </button>

                  <button
                    type="button"
                    onClick={() => setCoachModalOpen(true)}
                    className="text-xs font-bold text-[#0C43A3] hover:underline flex items-center gap-1 font-mono min-h-[44px]"
                  >
                    <span>Speak with a Partner Coach</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: B4BAPP Software Portal & Commission Tier Structure in Midnight Navy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#07142B] text-white border border-[#0D2147] shadow-xl space-y-5">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#F8C61A]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#F8C61A] font-mono">
                  B4BAPP Biz Pro Portal
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-white font-heading">
                Monetize Across 100 Service Products
              </h3>

              <p className="text-xs text-[#B8C4D9] leading-relaxed font-body">
                As a B4B Network partner, track commissions, review real-time client pipeline telemetry, and access the Bulletin Sales Scoreboard via B4BAPP ($25/mo Biz Pro subscription).
              </p>

              {/* Ranks list from B4BAPP doc */}
              <div className="space-y-2 pt-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#B8C4D9] font-mono">
                  Career Commission Tiers (From B4BAPP Software Document)
                </p>
                <div className="space-y-1.5 font-mono">
                  {B4BAPP_SOFTWARE.ranks.slice(0, 5).map((rank, i) => (
                    <div
                      key={rank}
                      className="p-2.5 rounded-xl bg-[#0D2147] border border-[#0D2147] flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-white">
                        {i + 1}. {rank}
                      </span>
                      <span className="text-[10px] text-[#F8C61A] font-bold">Tier {i + 1}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-[#B8C4D9] text-right font-mono">
                  Highest: Senior National Channel VP
                </p>
              </div>

              <div className="pt-3 border-t border-[#0D2147] flex items-center justify-between text-xs">
                <span className="text-[#B8C4D9]">Existing Partner?</span>
                <Link
                  to="/portal/login"
                  className="text-[#F8C61A] font-bold hover:underline inline-flex items-center gap-1 font-mono"
                >
                  <span>Portal Login</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Coach Modal */}
      <CoachRequestModal
        isOpen={coachModalOpen}
        onClose={() => setCoachModalOpen(false)}
        initialNote="Inquiry regarding Solution #14: Affiliates, Partners & Influencers Program."
      />
    </div>
  )
}
