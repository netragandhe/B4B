import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
  Clock,
} from 'lucide-react'
import '@/components/website/corporateTheme.css'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { CoachLeadForm, CoachRequestModal } from '@/components/forms/CoachRequestModal'
import { UsaMapMotif } from '@/components/website/UsaMapMotif'
import { Logo } from '@/config/BrandLogo'
import { CLIENT_16_SOLUTIONS, BRAND_IDENTITY } from '@/content/clientContent'

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

  // Related solutions
  const relatedSolutions = CLIENT_16_SOLUTIONS.filter(
    (s) => s.slug !== slug && (s.category === category || s.number === '01')
  ).slice(0, 3)

  return (
    <div className="min-h-screen bg-[#07142B] text-white transition-colors duration-200 font-body relative">
      <SEOHead
        title={`${title} | ${BRAND_IDENTITY.name} Solutions`}
        description={`${title} — Provided by ${BRAND_IDENTITY.name} across 12 territory divisions.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left relative z-10">
        {/* Top Breadcrumb & Logo Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-sky-400/20">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: '16 Solutions', href: '/solutions' },
              { label: title },
            ]}
          />
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <Logo size="sm" variant="wordmark" theme="dark" />
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="relative p-8 sm:p-12 rounded-3xl border border-sky-300/40 bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 text-white overflow-hidden shadow-2xl backdrop-blur-md">
          {/* USA Map Motif Watermark */}
          <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-15 overflow-hidden">
            <UsaMapMotif className="w-full h-full text-[#F8C61A]" opacity={0.2} />
          </div>

          <div className="max-w-3xl space-y-6 relative z-10">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-black font-mono px-2.5 py-1 rounded bg-[#FFC911] text-[#013CA0] shadow-sm">
                Solution #{number} of 16
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-500/20 text-sky-200 border border-sky-400/30 font-mono">
                {category} Group
              </span>
              <span className="text-xs text-sky-200/80 font-mono">
                12 Territory Divisions
              </span>
            </div>

            {/* Headline */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-[#0C43A3] text-[#FFC911] flex items-center justify-center shrink-0 shadow-lg border border-sky-300/40">
                <IconComp className="w-7 h-7" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
                {title}
              </h1>
            </div>

            {/* MANDATORY HERO CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => setCoachModalOpen(true)}
                className="btn-gold-dark group cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-[#07142B] shrink-0" />
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 text-[#07142B] transition-transform group-hover:translate-x-1 shrink-0" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('service-content-section') || document.getElementById('coach-intake-desk')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-outline-dark group cursor-pointer"
              >
                <span>Click Here</span>
                <ChevronRight className="w-4 h-4 text-[#B8C4D9] transition-transform group-hover:translate-x-1" />
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

              {/* Bottom Card CTAs */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl backdrop-blur-md">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#FFC911] font-mono">
                    Ready to proceed with #{number}?
                  </p>
                  <p className="text-xs text-blue-200/80 font-body">
                    Speak with a specialist assigned to your Federal Reserve territory.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setCoachModalOpen(true)}
                    className="btn-gold-dark group cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 text-[#07142B]" />
                    <span>{ctaText}</span>
                    <ArrowRight className="w-4 h-4 text-[#07142B] transition-transform group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById('coach-intake-desk')
                      el?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="btn-outline-dark cursor-pointer"
                  >
                    Click Here
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Callback Desk */}
            <div id="coach-intake-desk" className="lg:col-span-5 sticky top-28 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0F356B]/95 via-[#0C2A54]/95 to-[#081F42]/98 border border-sky-300/40 shadow-2xl space-y-4 text-white backdrop-blur-md">
                <div className="space-y-1 pb-3 border-b border-sky-300/30">
                  <div className="flex items-center gap-1.5 text-[#FFC911] font-bold text-xs uppercase tracking-wider font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#FFC911]" />
                    <span>1 Business Hour Callback</span>
                  </div>
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
          /* When NO document exists (4, 7, 8, 15): STRICT CLIENT RULE:
             Show ONLY the title and the two buttons; do NOT write any text! */
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0F356B]/40 border border-sky-300/30 text-center space-y-6">
            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => setCoachModalOpen(true)}
                className="btn-gold-dark group cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-[#07142B] shrink-0" />
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 text-[#07142B] transition-transform group-hover:translate-x-1 shrink-0" />
              </button>

              <button
                onClick={() => setCoachModalOpen(true)}
                className="btn-outline-dark group cursor-pointer"
              >
                <span>Click Here</span>
                <ChevronRight className="w-4 h-4 text-[#B8C4D9] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}

        {/* Related Solutions */}
        {relatedSolutions.length > 0 && (
          <div className="pt-10 border-t border-sky-300/30 space-y-6">
            <h3 className="text-xl font-extrabold text-white font-heading">
              Complementary Solutions in the B4B Network
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedSolutions.map((rel) => {
                const RelIcon = iconMap[rel.iconName] || Layers
                return (
                  <div
                    key={rel.id}
                    className="p-5 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-3 hover:border-sky-300/80 hover:-translate-y-0.5 hover:shadow-2xl transition-all flex flex-col justify-between shadow-xl backdrop-blur-md"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/solutions/${rel.slug}`}
                          className="text-xs font-mono font-bold text-[#013CA0] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded hover:bg-[#FFC911] hover:text-[#07142B] transition-colors"
                        >
                          #{rel.number}
                        </Link>
                        <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center">
                          <RelIcon className="w-4 h-4" />
                        </div>
                      </div>
                      <Link to={`/solutions/${rel.slug}`} className="block group/reltitle">
                        <h4 className="text-sm font-bold text-white font-heading group-hover/reltitle:text-[#FFC911] transition-colors">
                          {rel.title}
                        </h4>
                      </Link>
                    </div>

                    <div className="pt-3 border-t border-sky-300/30 flex items-center justify-between text-xs gap-2">
                      <Link
                        to={`/solutions/${rel.slug}`}
                        className="btn-outline-dark !h-10 !py-1 !px-3 !text-xs"
                      >
                        <span>Click Here</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => setCoachModalOpen(true)}
                        className="btn-gold-dark !h-10 !py-1 !px-3 !text-xs cursor-pointer"
                      >
                        {rel.ctaText}
                      </button>
                    </div>
                  </div>
                )
              })}
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
