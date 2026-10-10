import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  PhoneCall,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react'
import '@/components/website/corporateTheme.css'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { useToast } from '@/components/ui/Toast'
import { CoachRequestModal } from '@/components/forms/CoachRequestModal'
import { PhotoBackground } from '@/components/website/PhotoBackground'
import { UsaMapMotif } from '@/components/website/UsaMapMotif'
import { BRAND_IDENTITY, TERRITORY_DIVISIONS } from '@/content/clientContent'

const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid business email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  subject: z.string().min(1, 'Please select a topic'),
  division: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export const ContactPage: React.FC = () => {
  const { toast } = useToast()
  const [coachModalOpen, setCoachModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: 'Speak with a Business Coach',
    },
  })

  const onSubmit = (data: ContactFormData) => {
    toast({
      title: 'Inquiry Received',
      description: `Thank you ${data.fullName}. A B4B America business coach will respond within 1 business hour.`,
      type: 'success',
    })
    reset()
  }

  return (
    <div className="min-h-screen bg-[#EEF1EC] text-[#14231E] transition-colors duration-200 font-body">
      <SEOHead
        title="Contact Business Advisory Desk | B4B America"
        description="Connect with B4B America. Reach our capital desk, speak with a certified business coach, or schedule an operational systems review."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 text-left">
        {/* Top Breadcrumb */}
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

        {/* Header with Photo Background Slot */}
        <PhotoBackground
          slot="contact"
          alt="Business coach meeting an entrepreneur"
          overlayOpacity={0.72}
          className="rounded-3xl p-8 sm:p-12 text-white border border-[#0B4A3A] shadow-xl"
        >
          <div className="space-y-4 max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B4A3A] text-xs font-bold text-[#C8793A] font-mono">
              <Clock className="w-3.5 h-3.5 text-[#C8793A]" />
              <span>National Response Desk • 1 Business Hour Callback</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
              Connect with Our Small Business Advisory Desk
            </h1>

            <p className="text-[#B9CBC3] text-sm sm:text-base leading-relaxed font-body">
              Have questions about securing business funding, building business credit, implementing POS systems, or scheduling a 1-on-1 coaching session? Our national network across 12 territory divisions is ready to assist.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setCoachModalOpen(true)}
                className="btn-copper-dark group"
              >
                <PhoneCall className="w-4 h-4 text-[#06201A]" />
                <span>Speak with a Business Coach</span>
                <ArrowRight className="w-4 h-4 text-[#06201A] transition-transform group-hover:translate-x-1" />
              </button>
              <Link
                to="/solutions"
                className="btn-outline-dark"
              >
                Click Here for 16 Solutions
              </Link>
            </div>
          </div>
        </PhotoBackground>

        {/* Contact Grid: White Form on Left, Forest Black Office Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Column in Clean White Card */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white border border-[#14231E]/10 shadow-xl space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-[#14231E] font-heading">
                Send an Advisory Message
              </h3>
              <p className="text-xs text-[#14231E]/70 font-body">
                Direct routing to your regional territory coach.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Full Name" required error={errors.fullName?.message}>
                  <Input placeholder="John Doe" {...register('fullName')} />
                </FormField>
                <FormField label="Business Phone" required error={errors.phone?.message}>
                  <Input placeholder="(555) 000-0000" {...register('phone')} />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Business Email" required error={errors.email?.message}>
                  <Input type="email" placeholder="john@mybusiness.com" {...register('email')} />
                </FormField>
                <FormField label="Inquiry Topic" required error={errors.subject?.message}>
                  <Select
                    options={[
                      { value: 'Speak with a Business Coach', label: 'Speak with a Business Coach' },
                      { value: 'Business Funding & Loans', label: 'Business Funding & Loans' },
                      { value: 'Credit Repair & Build Credit', label: 'Credit Repair & Build Credit' },
                      { value: 'Accept Payments & POS', label: 'Accept Payments & POS' },
                      { value: 'B4BAPP Software Portal', label: 'B4BAPP Software Portal' },
                      { value: 'Partnerships & Affiliates', label: 'Partnerships & Affiliates' },
                    ]}
                    {...register('subject')}
                  />
                </FormField>
              </div>

              <FormField label="Preferred Territory Division (Optional)">
                <Select
                  options={[
                    { value: '', label: 'Auto-detect by phone area code' },
                    ...TERRITORY_DIVISIONS.map((t) => ({
                      value: t.name,
                      label: `Division #${t.regionNumber}: ${t.name} (HQ: ${t.headOffice})`,
                    })),
                  ]}
                  {...register('division')}
                />
              </FormField>

              <FormField label="Message / Situation Details" required error={errors.message?.message}>
                <Textarea
                  placeholder="Tell us about your business goals, current challenges, or specific solutions of interest..."
                  rows={4}
                  {...register('message')}
                />
              </FormField>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-emerald-light w-full"
              >
                Submit Message to Advisory Desk
              </button>
            </form>
          </div>

          {/* Direct Office & Hub Details in Forest Black Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#06201A] text-white border border-[#0B4A3A] shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-48 h-48 pointer-events-none opacity-10">
                <UsaMapMotif className="w-full h-full text-[#C8793A]" opacity={0.3} />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#C8793A] tracking-wider font-mono">
                  Corporate Headquarters
                </span>
                <h3 className="text-xl font-extrabold text-white font-heading">B4B America National Desk</h3>
              </div>

              <div className="space-y-4 text-xs text-[#B9CBC3] font-body">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C8793A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">New York Headquarters</strong>
                    <p>Financial District, New York, NY</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C8793A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Toll-Free Phone</strong>
                    <p>+1 (888) 540-B4BA</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C8793A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Advisory Desk Email</strong>
                    <p>advisory@b4bamerica.com</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#0B4A3A] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#C8793A] font-semibold font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#C8793A] animate-pulse" />
                  <span>National Coverage: 12 Territory Divisions</span>
                </div>
                <p className="text-[#B9CBC3] text-[11px] font-body">
                  Boston, New York, Philadelphia, Cleveland, Richmond, Atlanta, Chicago, St. Louis, Minneapolis, Kansas City, Dallas, San Francisco.
                </p>
              </div>
            </div>

            {/* Quick Diagnostic Card in White */}
            <div className="p-6 rounded-2xl bg-white border border-[#14231E]/10 space-y-3 shadow-xs">
              <h4 className="text-sm font-extrabold text-[#14231E] font-heading">
                Prefer an Immediate Diagnostic Review?
              </h4>
              <p className="text-xs text-[#14231E]/70 font-body">
                Our certified business coaches conduct 30-minute free evaluations for qualified small business owners.
              </p>
              <button
                onClick={() => setCoachModalOpen(true)}
                className="btn-emerald-light w-full"
              >
                Speak with a Business Coach
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Global Coach Modal */}
      <CoachRequestModal
        isOpen={coachModalOpen}
        onClose={() => setCoachModalOpen(false)}
        initialNote="General Contact Inquiry via B4B America Advisory Desk."
      />
    </div>
  )
}
