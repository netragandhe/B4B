import React from 'react'
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
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { FormField } from '@/components/ui/FormField'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { brandConfig } from '@/config/brand'
import { useToast } from '@/components/ui/Toast'

const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid business email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  subject: z.string().min(1, 'Please select a topic'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export const ContactPage: React.FC = () => {
  const { toast } = useToast()

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
      description: `Thank you ${data.fullName}. An OAL advisory specialist will respond within 1 business hour.`,
      type: 'success',
    })
    reset()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      <SEOHead
        title="Contact Business Advisory Desk"
        description="Connect with OAL Network. Reach our capital desk, speak with a certified business coach, or schedule an underwriting review."
      />

      {/* Header */}
      <div className="space-y-4">
        <Breadcrumb items={[{ label: 'Contact' }]} />
        <Badge variant="primary" size="md">
          Get in Touch
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
          Connect with Our Small Business Advisory Desk
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
          Have questions about credit facilities, building business credit, or scheduling an operational coaching session? We’re here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form */}
        <Card variant="bento" className="lg:col-span-7 p-6 sm:p-10 border-slate-200 dark:border-[#1E3A5F]">
          <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-1">
            Send an Advisory Message
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Direct priority routing to your regional lead coach.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <FormField label="Full Name" required error={errors.fullName?.message}>
                <Input placeholder="John Doe" {...register('fullName')} />
              </FormField>
              <FormField label="Business Phone" required error={errors.phone?.message}>
                <Input placeholder="(555) 000-0000" {...register('phone')} />
              </FormField>
            </div>

            <FormField label="Business Email" required error={errors.email?.message}>
              <Input type="email" placeholder="john@mybusiness.com" {...register('email')} />
            </FormField>

            <FormField label="Inquiry Category" required error={errors.subject?.message}>
              <Select
                options={[
                  { label: 'Speak with a Business Coach', value: 'Speak with a Business Coach' },
                  { label: 'Business Loans & Revolvers ($50k - $5M)', value: 'Business Loans' },
                  { label: 'Build Business Credit (D&B PAYDEX)', value: 'Build Business Credit' },
                  { label: 'SBA 7(a) Business Plan Package (~$2,500)', value: 'SBA Business Plan' },
                  { label: 'Lower Payment Processing Rates', value: 'Payment Processing' },
                  { label: 'Partner / Affiliate Program', value: 'Partner Program' },
                  { label: 'Other Inquiries', value: 'Other' },
                ]}
                {...register('subject')}
              />
            </FormField>

            <FormField label="Message / Specific Requirements" required error={errors.message?.message}>
              <Textarea
                placeholder="Tell us about your business, current annual revenue, and goals..."
                className="min-h-[110px]"
                {...register('message')}
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
                className="w-full text-xs font-bold shadow-md shadow-blue-500/20"
              >
                Send Message to Advisory Team
              </Button>
            </div>
          </form>
        </Card>

        {/* Directory & Hours Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <Card variant="default" className="p-6 space-y-4">
            <h4 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              Direct Office Directory
            </h4>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Toll-Free Capital Desk</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {brandConfig.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Advisory Email</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {brandConfig.contactEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Headquarters</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {brandConfig.headquarters}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Underwriting Hours</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    Monday – Friday: 8:00 AM – 8:00 PM EST<br />
                    Saturday: 9:00 AM – 3:00 PM EST
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card variant="bento" className="p-6 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-[#12294A] dark:to-emerald-950/20 border-emerald-200 dark:border-[#1E3A5F]">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Fiduciary Client Guarantee</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              We never sell your phone number or email to predatory third-party loan brokers. All consultations adhere to strict fiduciary client privacy.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
