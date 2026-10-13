import React, { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
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
  CheckCircle2,
  Layers,
  ChevronRight,
  Clock,
} from 'lucide-react'
import '@/components/website/corporateTheme.css'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { CoachLeadForm, CoachRequestModal } from '@/components/forms/CoachRequestModal'
import { UsaMapMotif } from '@/components/website/UsaMapMotif'
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

export const SolutionPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [coachModalOpen, setCoachModalOpen] = useState(false)

  // Find solution from verified client content
  const solution = CLIENT_16_SOLUTIONS.find((s) => s.slug === slug)

  if (!solution) {
    return <Navigate to="/solutions" replace />
  }

  const IconComp = iconMap[solution.iconName] || Layers

  // Related solutions
  const relatedSolutions = CLIENT_16_SOLUTIONS.filter(
    (s) => s.id !== solution.id && (s.category === solution.category || s.number === '01')
  ).slice(0, 3)

  return (
    <div className="min-h-screen bg-[#07142B] text-white transition-colors duration-200 font-body relative">
      <SEOHead
        title={`${solution.title} | B4B America Solutions`}
        description={`${solution.title} — ${solution.shortDesc}. Provided by ${BRAND_IDENTITY.name} across 12 territory divisions.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 text-left relative z-10">
        {/* Top Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: '16 Solutions', href: '/solutions' },
            { label: solution.title },
          ]}
        />

        {/* HERO SECTION: Midnight Navy #07142B with Gold #F8C61A accents */}
        <div className="relative p-8 sm:p-12 rounded-3xl border border-sky-300/40 bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 text-white overflow-hidden shadow-2xl backdrop-blur-md">
          {/* USA Map Motif Watermark */}
          <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-15 overflow-hidden">
            <UsaMapMotif className="w-full h-full text-[#F8C61A]" opacity={0.2} />
          </div>

          <div className="max-w-3xl space-y-6 relative z-10">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-black font-mono px-2.5 py-1 rounded bg-[#FFC911] text-[#013CA0] shadow-sm">
                Solution #{solution.number} of 16
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-500/20 text-sky-200 border border-sky-400/30 font-mono">
                {solution.category} Group
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
                {solution.title}
              </h1>
            </div>

            {/* Short Description */}
            <p className="text-base sm:text-lg leading-relaxed text-blue-100/90 max-w-2xl font-body">
              {solution.shortDesc}
            </p>

            {/* MANDATORY HERO CTAs: Both buttons on dark (Gold fill + Outline secondary) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => setCoachModalOpen(true)}
                className="btn-gold-dark group"
              >
                <PhoneCall className="w-4 h-4 text-[#07142B] shrink-0" />
                <span>{solution.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-[#07142B] transition-transform group-hover:translate-x-1 shrink-0" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('coach-intake-desk')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-outline-dark group"
              >
                <span>Click Here</span>
                <ChevronRight className="w-4 h-4 text-[#B8C4D9] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* MAIN BODY: Glassmorphic Cards Matching Landing Page */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Group-Specific Card */}
            {solution.category === 'Finance' && (
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md hover:border-sky-300/80 transition-all">
                <div className="flex items-center gap-2 text-[#FFC911] font-bold text-xs uppercase tracking-wider font-mono">
                  <Landmark className="w-4 h-4" />
                  <span>Financial Facility Protocol</span>
                </div>
                <h3 className="text-xl font-extrabold text-white font-heading">
                  Underwriting & Credit Architecture
                </h3>
                <p className="text-sm text-blue-100/90 leading-relaxed font-body">
                  Tailored guidance on capital options, revenue-based terms, and commercial credit building. Connect with institutional lenders and transparent terms without predatory prepayment traps.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
                    <p className="text-xs font-bold text-white font-heading">Corporate Credit</p>
                    <p className="text-[11px] text-sky-200/80 font-mono">Dun & Bradstreet, Experian Commercial</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
                    <p className="text-xs font-bold text-white font-heading">Advisory Term</p>
                    <p className="text-[11px] text-sky-200/80 font-mono">1-on-1 Dedicated Coach Assigned</p>
                  </div>
                </div>
              </div>
            )}

            {solution.category === 'Growth' && (
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md hover:border-sky-300/80 transition-all">
                <div className="flex items-center gap-2 text-[#FFC911] font-bold text-xs uppercase tracking-wider font-mono">
                  <Target className="w-4 h-4" />
                  <span>Market Acquisition Framework</span>
                </div>
                <h3 className="text-xl font-extrabold text-white font-heading">
                  Brand Identity & Customer Acquisition
                </h3>
                <p className="text-sm text-blue-100/90 leading-relaxed font-body">
                  Design ideas and turn prospects into clients. Full-spectrum marketing combining consumer insights, grassroots activations, digital presence, and promotional branding.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
                    <p className="text-xs font-bold text-white font-heading">Promotional Products</p>
                    <p className="text-[11px] text-sky-200/80 font-mono">High-visibility physical brand placement</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
                    <p className="text-xs font-bold text-white font-heading">Outreach Pipelines</p>
                    <p className="text-[11px] text-sky-200/80 font-mono">Targeted grassroots, mainstream & SEO</p>
                  </div>
                </div>
              </div>
            )}

            {solution.category === 'Operations' && (
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md hover:border-sky-300/80 transition-all">
                <div className="flex items-center gap-2 text-[#FFC911] font-bold text-xs uppercase tracking-wider font-mono">
                  <LayoutGrid className="w-4 h-4" />
                  <span>Operations & Systems Modernization</span>
                </div>
                <h3 className="text-xl font-extrabold text-white font-heading">
                  Streamlined Business Management
                </h3>
                <p className="text-sm text-blue-100/90 leading-relaxed font-body">
                  Hands-on operational consulting, streamlining day-to-day workflow, customer service team excellence, and reducing overhead costs during critical scaling phases.
                </p>
              </div>
            )}

            {solution.category === 'Technology' && (
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md hover:border-sky-300/80 transition-all">
                <div className="flex items-center gap-2 text-[#FFC911] font-bold text-xs uppercase tracking-wider font-mono">
                  <Server className="w-4 h-4" />
                  <span>Cost-Efficient Tech Integration</span>
                </div>
                <h3 className="text-xl font-extrabold text-white font-heading">
                  Modern Small Business Software & Defense
                </h3>
                <p className="text-sm text-blue-100/90 leading-relaxed font-body">
                  We work smartly to connect you with the most cost-efficient technology to improve your business operations so you can experience healthy business growth.
                </p>
                <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30 text-xs text-blue-100 font-medium font-body">
                  Integrated with <strong className="text-[#FFC911]">B4BAPP</strong> CRM/ERP Portal ($25/mo) for mobile telemetry.
                </div>
              </div>
            )}

            {/* Standard Implementation Scope Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
              <h3 className="text-lg font-extrabold text-white font-heading">
                Implementation Details & Deliverables
              </h3>
              <div className="space-y-2.5 text-xs text-blue-100 font-body">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC911] shrink-0" />
                  <span>30-minute diagnostic review with assigned industry coach</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC911] shrink-0" />
                  <span>Direct phone callback within 1 business hour</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC911] shrink-0" />
                  <span>Custom blueprint tailored to your specific trade sector</span>
                </div>
              </div>
            </div>

            {/* Bottom Card CTAs */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl backdrop-blur-md">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#FFC911] font-mono">
                  Ready to proceed with #{solution.number}?
                </p>
                <p className="text-xs text-blue-200/80 font-body">
                  Speak with a specialist assigned to your Federal Reserve territory.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setCoachModalOpen(true)}
                  className="btn-gold-dark group"
                >
                  <PhoneCall className="w-4 h-4 text-[#07142B]" />
                  <span>{solution.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#07142B] transition-transform group-hover:translate-x-1" />
                </button>
                <Link
                  to="/solutions"
                  className="btn-outline-dark"
                >
                  Click Here
                </Link>
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
                  Speak with a Coach
                </h3>
                <p className="text-xs text-sky-200/80 font-body">
                  Regarding Solution #{solution.number}: {solution.title}
                </p>
              </div>

              <CoachLeadForm
                isInline
                initialNote={`Inquiry regarding Solution #${solution.number}: ${solution.title}`}
              />
            </div>
          </div>
        </div>

        {/* Related Solutions in Glassmorphic Cards Matching Landing Page */}
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
                        <span className="text-xs font-mono font-bold text-[#013CA0] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                          #{rel.number}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center">
                          <RelIcon className="w-4 h-4" />
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-white font-heading">{rel.title}</h4>
                      <p className="text-xs text-blue-100/80 line-clamp-2 font-body">{rel.shortDesc}</p>
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
                        className="btn-gold-dark !h-10 !py-1 !px-3 !text-xs"
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
        initialNote={`Inquiry regarding Solution #${solution.number}: ${solution.title}`}
      />
    </div>
  )
}
