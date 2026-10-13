import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Compass,
  ArrowRight,
  PhoneCall,
  ChevronRight,
  Layers,
} from 'lucide-react'
import '@/components/website/corporateTheme.css'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { CoachRequestModal } from '@/components/forms/CoachRequestModal'
import { PhotoBackground } from '@/components/website/PhotoBackground'
import { BRAND_IDENTITY, INDUSTRIES_SERVED } from '@/content/clientContent'

export const CompanyPage: React.FC = () => {
  const [coachModalOpen, setCoachModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#07142B] text-white transition-colors duration-200 font-body relative">
      <SEOHead
        title="Our Company — Vision & Mission | B4B America"
        description="B4B America, the connection for small business solutions, we help the small business thrive! Vision: The Little Engine That Could, Made All The Small Businesses In America Thrive."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 text-left relative z-10">
        {/* Top Breadcrumb */}
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Our Company' }]} />

        {/* Hero Section with PhotoBackground Slot (Midnight Navy architecture) */}
        <PhotoBackground
          slot="philosophy"
          alt="American small business founder working in natural light"
          overlayOpacity={0.72}
          className="rounded-3xl p-8 sm:p-14 text-white border border-sky-300/40 shadow-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 backdrop-blur-md"
        >
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-300/40 text-xs font-bold text-[#FFC911] font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FFC911] animate-pulse" />
              <span>Our Company • B4B America</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight">
                {BRAND_IDENTITY.name}, The Connection for Small Business Solutions
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-[#FFC911] font-heading">
                {BRAND_IDENTITY.subTagline}
              </p>
            </div>

            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed font-normal font-body">
              B4B America provides small business consulting to entrepreneurs and small business owners on key decisions related to implementing business systems. B4B helps identify issues, secure funding, and improve operational systems to achieve business objectives.
            </p>

            <p className="text-sm sm:text-base text-blue-100/80 leading-relaxed font-body">
              Whether it's financing, marketing, operations, or growth strategy, B4B can help you find the right plan. The B4B Business Solutions Network offers a range of services to assist with launching startups, managing payroll, or planning exit strategies.
            </p>

            {/* MANDATORY ACTIONS PER CLIENT RULES: Gold button on dark + Outline */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <button
                onClick={() => setCoachModalOpen(true)}
                className="btn-gold-dark group"
              >
                <PhoneCall className="w-4 h-4 text-[#07142B] shrink-0" />
                <span>Speak with a Business Coach</span>
                <ArrowRight className="w-4 h-4 text-[#07142B] transition-transform group-hover:translate-x-1 shrink-0" />
              </button>

              <Link
                to="/solutions"
                className="btn-outline-dark group"
              >
                <span>Click Here to View 16 Solutions</span>
                <ChevronRight className="w-4 h-4 text-[#FFC911] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </PhotoBackground>

        {/* Vision, Mission, Values Triad in Glassmorphic Cards Matching Landing Page */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Vision */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md hover:border-sky-300/80 transition-all">
            <span className="text-xs font-black font-mono px-2.5 py-1 rounded bg-[#FFC911] text-[#013CA0] shadow-xs">
              [ Vision ]
            </span>
            <h3 className="text-xl font-extrabold text-white leading-snug font-heading">
              "{BRAND_IDENTITY.vision}"
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed font-body">
              Main Street entrepreneurs embody the resilience of America. We provide the operational and financial engine so every independent small business can thrive.
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md hover:border-sky-300/80 transition-all">
            <span className="text-xs font-black font-mono px-2.5 py-1 rounded bg-[#FFC911] text-[#013CA0] shadow-xs">
              [ Mission ]
            </span>
            <h3 className="text-xl font-extrabold text-white leading-snug font-heading">
              "We design ideas and turn prospects into clients."
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed font-body">
              We offer solutions for you to build business credit, accept payments and secure business funding. During the growth phase, you may encounter challenges, like integrating new technology with older systems. We work smartly to connect you with the most cost-efficient technology to improve operations.
            </p>
          </div>

          {/* Values Mantra */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md hover:border-sky-300/80 transition-all">
            <span className="text-xs font-black font-mono px-2.5 py-1 rounded bg-[#FFC911] text-[#013CA0] shadow-xs">
              [ Values ]
            </span>
            <h3 className="text-xl font-extrabold text-white leading-snug font-heading">
              "{BRAND_IDENTITY.mantra}"
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed font-body">
              Dreamers take action. We structure financial projections, engineer brand identities, set ambitious expansion targets, and execute with precision.
            </p>
          </div>
        </div>

        {/* 5 Core Pillars Section */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFC911] font-mono">
              Core Strategic Pillars
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
              The 5 Foundational Capabilities of B4B America
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {BRAND_IDENTITY.pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="p-5 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-2 hover:border-sky-300/80 hover:shadow-2xl transition-all shadow-xl backdrop-blur-md"
              >
                <span className="w-8 h-8 rounded-lg bg-sky-500/20 text-[#FFC911] border border-sky-400/30 text-xs font-bold font-mono flex items-center justify-center">
                  0{i + 1}
                </span>
                <h4 className="text-sm font-extrabold text-white font-heading">{pillar.title}</h4>
                <p className="text-xs text-blue-100/80 leading-relaxed font-body">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Dive Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md hover:border-sky-300/80 transition-all text-white">
            <h3 className="text-xl font-extrabold text-white font-heading">
              Branding & Funding Execution
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed font-body">
              <strong className="text-[#FFC911]">Branding:</strong> Design your logo and give birth to your Brand or Business. Our B4B Design Pros can help you design and print your business logo on almost everything. Adding and printing your company logo on promotional products places your business in front of customers, making an ever-lasting impression.
            </p>
            <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed font-body">
              <strong className="text-[#FFC911]">Business Funding:</strong> We help the small business find the right funding options, connect them with lenders, and provide guidance on preparing a strong business plan to attract investors. We also provide low-cost or no-cost consulting and training programs to support business growth.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md hover:border-sky-300/80 transition-all text-white">
            <h3 className="text-xl font-extrabold text-white font-heading">
              Marketing Pros & Practical Experience
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed font-body">
              <strong className="text-[#FFC911]">Marketing:</strong> Our B4B Marketing Pros offer strategies by providing insights into market trends, consumer behavior, and effective marketing channels. We help businesses develop targeted marketing campaigns and optimize their marketing efforts to connect with potential customers to increase revenue through grass roots, mainstream or SEO methods.
            </p>
            <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed font-body">
              <strong className="text-[#FFC911]">Practical Experience:</strong> The B4B Network has practical experience in the startup environment, buying and selling businesses, helping businesses secure capital possessing in-depth industry knowledge within various business sectors.
            </p>
          </div>
        </div>

        {/* Our Clients: 32 Trades in Glassmorphic Badges */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFC911] font-mono">
              Industry Versatility
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
              Our Clients Across 32 Trade Sectors
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/80 font-body">
              Our clients have embraced our solutions and now it serves as the core foundation for continued innovation that spans multiple industries:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {INDUSTRIES_SERVED.map((trade) => (
              <div
                key={trade}
                className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30 text-xs font-bold text-white text-center hover:border-sky-300 hover:bg-[#0F356B] transition-colors font-heading shadow-md"
              >
                {trade}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner (Midnight Navy #07142B) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0F356B] via-[#0C2A54] to-[#081F42] text-white border border-sky-300/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-md">
          <div className="space-y-1 text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
              We are the connection for small business solutions.
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/80 font-body">
              Connect directly with our advisory desk today.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCoachModalOpen(true)}
              className="btn-gold-dark group"
            >
              <PhoneCall className="w-4 h-4 text-[#07142B]" />
              <span>Speak with a Business Coach</span>
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

      {/* Global Coach Modal */}
      <CoachRequestModal
        isOpen={coachModalOpen}
        onClose={() => setCoachModalOpen(false)}
        initialNote="Inquiry regarding B4B America Company & Advisory Network."
      />
    </div>
  )
}
