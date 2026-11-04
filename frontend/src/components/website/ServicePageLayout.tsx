import React, { useState, useEffect } from 'react'
import {
  CreditCard,
  LayoutGrid,
  Palette,
  ShieldCheck,
  FileSpreadsheet,
  Landmark,
  Target,
  GraduationCap,
  ShieldAlert,
  Briefcase,
  Shield,
  Server,
  Megaphone,
  Handshake,
  BookOpen,
  Globe,
  ArrowRight,
  PhoneCall,
  Layers,
  ChevronRight,
} from 'lucide-react'
import '@/components/website/corporateTheme.css'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { CoachLeadForm, CoachRequestModal } from '@/components/forms/CoachRequestModal'
import { UsaMapMotif } from '@/components/website/UsaMapMotif'
import { Logo } from '@/config/BrandLogo'
import { BRAND_IDENTITY } from '@/content/clientContent'

const iconMap: Record<string, React.ElementType> = {
  CreditCard,
  LayoutGrid,
  Palette,
  ShieldCheck,
  FileSpreadsheet,
  Landmark,
  Target,
  GraduationCap,
  ShieldAlert,
  Briefcase,
  Shield,
  Server,
  Megaphone,
  Handshake,
  BookOpen,
  Globe,
}

export interface ServicePageLayoutProps {
  number: string
  title: string
  slug: string
  category: 'Finance' | 'Operations' | 'Growth' | 'Technology'
  iconName?: string
  ctaText?: string
  hasDocument: boolean
  children?: React.ReactNode
}

export const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({
  number,
  title,
  slug,
  category,
  iconName = 'Layers',
  ctaText = 'Speak with a Business Coach',
  hasDocument,
  children,
}) => {
  const [coachModalOpen, setCoachModalOpen] = useState(false)
  const IconComp = iconMap[iconName] || Layers

  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    })
  }, [slug])

  return (
    <div className="service-page-layout min-h-screen bg-[var(--color-midnight)] text-[var(--color-card-white)] transition-colors duration-200 font-body relative w-full overflow-x-hidden">
      <SEOHead
        title={`${title} | ${BRAND_IDENTITY.name} Solutions`}
        description={`${title} — Provided by ${BRAND_IDENTITY.name}.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left relative z-10">
        {/* Top Breadcrumb & Logo Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-sky-400/20">
          <Breadcrumb
            className="[&_li:last-child_span]:!text-[var(--color-card-white)] [&_a]:text-[var(--color-text-dark)] hover:[&_a]:text-[var(--color-card-white)] text-xs flex-wrap"
            items={[
              { label: 'Home', href: '/' },
              { label: '16 Solutions', href: '/solutions' },
              { label: title },
            ]}
          />
          <div className="flex items-center gap-2.5 self-start sm:self-auto select-none">
            <Logo size="sm" variant="icon" />
            <span className="font-extrabold text-sm sm:text-base tracking-tight leading-none font-['Plus_Jakarta_Sans',sans-serif] text-[var(--color-card-white)]">
              B4B <span className="text-[var(--color-logo-gold)]">AMERICA</span>
            </span>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="relative p-8 sm:p-12 rounded-3xl border border-sky-300/40 bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 text-white overflow-hidden shadow-2xl backdrop-blur-md">
          {/* USA Map Motif Watermark */}
          <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-15 overflow-hidden">
            <UsaMapMotif className="w-full h-full text-[var(--color-logo-gold)]" opacity={0.2} />
          </div>

          <div className="max-w-3xl space-y-6 relative z-10">
            {/* Badges: Keep service number only as a small badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-black font-mono px-2.5 py-1 rounded bg-[var(--color-logo-gold)] text-[var(--color-text-on-gold)] shadow-sm">
                #{number}
              </span>
            </div>

            {/* Headline */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-logo-blue)] to-[var(--color-deep-navy)] text-[var(--color-logo-gold)] flex items-center justify-center shrink-0 shadow-lg border border-sky-300/40">
                <IconComp className="w-7 h-7" />
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight break-words">
                {title}
              </h1>
            </div>

            {/* MANDATORY HERO CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => setCoachModalOpen(true)}
                className="btn-gold-dark group cursor-pointer justify-center"
              >
                <PhoneCall className="w-4 h-4 text-[var(--color-text-on-gold)] shrink-0" />
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 text-[var(--color-text-on-gold)] transition-transform group-hover:translate-x-1 shrink-0" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('service-content-section') || document.getElementById('coach-intake-desk')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-outline-dark group cursor-pointer justify-center"
              >
                <span>Click Here</span>
                <ChevronRight className="w-4 h-4 text-[var(--color-text-dark)] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* BODY AREA */}
        {hasDocument ? (
          /* When client document exists: Full document text + Intake Desk + Related Solutions */
          <div id="service-content-section" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Exact Client Document Content */}
            <div className="lg:col-span-7 space-y-8">
              {children}
              {/* Bottom Card CTAs: centered two buttons without empty left area per Task 4 */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[var(--color-deep-navy)]/90 via-[#0C2A54]/90 to-[var(--color-midnight)]/95 border border-sky-300/40 flex flex-col sm:flex-row items-center justify-center gap-4 shadow-xl backdrop-blur-md">
                <button
                  onClick={() => setCoachModalOpen(true)}
                  className="btn-gold-dark group cursor-pointer justify-center"
                >
                  <PhoneCall className="w-4 h-4 text-[var(--color-text-on-gold)]" />
                  <span>{ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[var(--color-text-on-gold)] transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('coach-intake-desk')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="btn-outline-dark cursor-pointer justify-center"
                >
                  Click Here
                </button>
              </div>
            </div>

            {/* Right Column: Sticky Callback Desk */}
            <div id="coach-intake-desk" className="lg:col-span-5 sticky top-28 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0F356B]/95 via-[#0C2A54]/95 to-[#081F42]/98 border border-sky-300/40 shadow-2xl space-y-4 text-white backdrop-blur-md">
                <div className="space-y-1 pb-3 border-b border-sky-300/30">
                  <h3 className="text-xl font-extrabold text-white font-heading">
                    {ctaText}
                  </h3>
                  <p className="text-xs text-sky-200/80 font-body">
                    Regarding Solution #{number}: {title}
                  </p>
                </div>

                <CoachLeadForm
                  isInline
                  initialNote={`Inquiry regarding Solution #${number}: ${title}`}
                />
              </div>
            </div>
          </div>
        ) : (
          /* When NO document exists: Show buttons */
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0F356B]/40 border border-sky-300/30 text-center space-y-6">
            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => setCoachModalOpen(true)}
                className="btn-gold-dark group cursor-pointer justify-center"
              >
                <PhoneCall className="w-4 h-4 text-[var(--color-text-on-gold)] shrink-0" />
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 text-[var(--color-text-on-gold)] transition-transform group-hover:translate-x-1 shrink-0" />
              </button>

              <button
                onClick={() => setCoachModalOpen(true)}
                className="btn-outline-dark group cursor-pointer justify-center"
              >
                <span>Click Here</span>
                <ChevronRight className="w-4 h-4 text-[var(--color-text-dark)] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Global Coach Modal */}
      <CoachRequestModal
        isOpen={coachModalOpen}
        onClose={() => setCoachModalOpen(false)}
        initialNote={`Inquiry regarding Solution #${number}: ${title}`}
      />
    </div>
  )
}
