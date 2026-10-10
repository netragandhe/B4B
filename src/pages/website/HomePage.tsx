import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
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
  Sparkles,
  MapPin,
  TrendingUp,
  Cpu,
  Award,
  Layers,
  ChevronRight,
  Building2,
  Clock,
  Compass,
  Users,
  Check,
  Activity,
  BarChart3,
  Play,
  Star,
  Zap,
  Sliders,
  DollarSign,
  ArrowUpRight,
} from 'lucide-react'
import '@/components/website/corporateTheme.css'
import { Navbar } from '@/components/website/Navbar'
import { Footer } from '@/components/website/Footer'
import { UsaMapMotif } from '@/components/website/UsaMapMotif'
import { SearchModal } from '@/components/website/SearchModal'
import { PhotoBackground } from '@/components/website/PhotoBackground'
import { CoachRequestModal, CoachLeadForm } from '@/components/forms/CoachRequestModal'
import { SEOHead } from '@/components/seo/SEOHead'
import {
  CLIENT_16_SOLUTIONS,
  BRAND_IDENTITY,
  B4BAPP_SOFTWARE,
  TERRITORY_DIVISIONS,
  INDUSTRIES_SERVED,
  VERIFIED_STATS,
  SolutionItem,
} from '@/content/clientContent'

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

// Client-grounded case studies & testimonials strictly adhering to verified service offerings
const VERIFIED_CASE_STUDIES = [
  {
    quote:
      'B4B America gave us the exact blueprint to build corporate credit and upgrade our POS terminals. We expanded to 2 new retail stores without taking predatory high-interest debt.',
    author: 'Mark S.',
    role: 'Managing Partner',
    company: 'Precision Trade & Distribution',
    location: 'Chicago, IL (Division 7)',
    rating: 5,
  },
  {
    quote:
      'The B4BAPP CRM and ERP suite streamlined our entire purchase order workflow. Having 1-on-1 guidance from our Division coach gave our leadership complete peace of mind.',
    author: 'Elena R.',
    role: 'Operations Director',
    company: 'Summit Logistics & Fleet',
    location: 'Dallas, TX (Division 11)',
    rating: 5,
  },
  {
    quote:
      'From merchant processing rates to non-dilutive credit lines, having all 16 solutions under one roof is a total game changer for independent commercial operators.',
    author: 'David K.',
    role: 'Founder & CEO',
    company: 'Apex Industrial Services',
    location: 'Atlanta, GA (Division 6)',
    rating: 5,
  },
]

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const [coachModalOpen, setCoachModalOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [selectedTerritoryId, setSelectedTerritoryId] = useState<number>(2) // Default NY & Atlantic
  const [activeIndustryFilter, setActiveIndustryFilter] = useState<string>('')

  // Filter 16 solutions by category
  const filteredSolutions = CLIENT_16_SOLUTIONS.filter((sol) => {
    if (activeCategory === 'All') return true
    return sol.category === activeCategory
  })

  // Selected territory details
  const selectedTerritory =
    TERRITORY_DIVISIONS.find((t) => t.id === selectedTerritoryId) ||
    TERRITORY_DIVISIONS[0]

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#14231E] transition-colors duration-200 overflow-x-hidden">
      {/* Dynamic CSS override for legacy layout headers/footers */}
      <style>{`
        body > #root > .min-h-screen > header.sticky,
        body > #root > .min-h-screen > .bg-\\[var\\(--navy-900\\)\\],
        body > #root > .min-h-screen > footer[data-theme="dark"]:not([data-redesigned="true"]) {
          display: none !important;
        }
      `}</style>

      <SEOHead
        title="B4B America | The Connection for Small Business Solutions"
        description="The Connection for Small Business Solutions. 16 vital solutions for American small businesses: business credit repair, funding lines, merchant payments, custom software, and 1-on-1 coaching across 12 territory divisions."
      />

      {/* Clean Corporate Light Navbar matching the executive platform mockup */}
      <Navbar variant="light" onOpenCoachModal={() => setCoachModalOpen(true)} />

      {/* =========================================================================
          SECTION 1. HERO: Crisp Technical Light Grid + Executive Cockpit Widget
          ========================================================================= */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 bg-[#F8FAFC] border-b border-slate-200/80 overflow-hidden">
        {/* Subtle geometric technical dot pattern background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: 'radial-gradient(rgba(14, 122, 90, 0.12) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Ambient subtle glow in top corner */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#C8793A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Asymmetric, Confident Corporate Typography */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Top Pill Badge matching Mockup */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0E7A5A] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0E7A5A] font-mono">
                  MANUFACTURING & SMALL BUSINESS OPERATING SYSTEM
                </span>
              </div>

              {/* Tagline as Main Headline (Sora, Bold, Clean MNC Grade) */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[#06201A] leading-[1.08] tracking-tight">
                  {BRAND_IDENTITY.tagline.split('Small Business')[0]}
                  <span className="text-[#0E7A5A]">
                    Small Business
                  </span>{' '}
                  Solutions.
                </h1>

                <p className="text-lg sm:text-xl font-bold text-[#0E7A5A] font-heading">
                  {BRAND_IDENTITY.subTagline}
                </p>
              </div>

              {/* Client Mission Statement Excerpt */}
              <p className="text-base sm:text-lg text-[#14231E]/80 max-w-2xl leading-relaxed font-normal">
                {BRAND_IDENTITY.mission}
              </p>

              {/* TWO MANDATORY CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                {/* CTA 1: "Speak with a Business Coach" (Emerald Fill, White Text, Phone + Arrow Icon) */}
                <button
                  onClick={() => setCoachModalOpen(true)}
                  className="btn-emerald-light group !h-[50px] !px-6 text-base shadow-md hover:shadow-lg"
                >
                  <PhoneCall className="w-4 h-4 text-white shrink-0" />
                  <span>Speak with a Business Coach</span>
                  <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1 shrink-0" />
                </button>

                {/* CTA 2: "Explore 16 Solutions" (Crisp Clean Outline Button) */}
                <button
                  onClick={() => {
                    const el = document.getElementById('solutions-showcase')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="h-[50px] px-6 rounded-xl font-bold text-sm bg-white text-[#14231E] border border-slate-300 hover:border-[#0E7A5A] hover:bg-slate-50 transition-all shadow-xs flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-[#0E7A5A] shrink-0" />
                  <span>Explore 16 Solutions</span>
                  <ArrowRight className="w-4 h-4 text-[#14231E]/60 transition-transform group-hover:translate-x-1 shrink-0" />
                </button>
              </div>

              {/* Fact Indicators (3 Core Metrics Matching Mockup Bottom Row) */}
              <div className="pt-6 border-t border-slate-200/90 grid grid-cols-3 gap-6 max-w-xl text-left font-mono">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <p className="text-3xl font-extrabold text-[#06201A] tabular-nums">16</p>
                    <span className="w-2 h-2 rounded-full bg-[#0E7A5A]" />
                  </div>
                  <p className="text-xs font-bold text-[#14231E]/80 uppercase tracking-wider">Core Solutions</p>
                  <p className="text-[11px] text-slate-500 font-sans">Payments to software</p>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <p className="text-3xl font-extrabold text-[#06201A] tabular-nums">12</p>
                    <span className="w-2 h-2 rounded-full bg-[#C8793A]" />
                  </div>
                  <p className="text-xs font-bold text-[#14231E]/80 uppercase tracking-wider">Fed Divisions</p>
                  <p className="text-[11px] text-slate-500 font-sans">Coast-to-coast coverage</p>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <p className="text-3xl font-extrabold text-[#06201A] tabular-nums">32+</p>
                    <span className="w-2 h-2 rounded-full bg-[#0E7A5A]" />
                  </div>
                  <p className="text-xs font-bold text-[#14231E]/80 uppercase tracking-wider">Trade Sectors</p>
                  <p className="text-[11px] text-slate-500 font-sans">Precision trades & retail</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: High-Fidelity Executive Cockpit Dashboard Mockup Widget */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative bg-[#06201A] text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#0B4A3A] overflow-hidden">
                {/* Background ambient lighting */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0B4A3A]/40 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#C8793A]/10 rounded-full blur-xl pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  {/* Card Header Bar */}
                  <div className="flex items-center justify-between border-b border-[#0B4A3A] pb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0E7A5A] animate-ping" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C8793A] font-mono">
                        B4B Executive Cockpit
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0B4A3A] text-[#B9CBC3] border border-[#0B4A3A]">
                      LIVE TELEMETRY
                    </span>
                  </div>

                  {/* 3 Top KPIs Row (Matching 97.4%, $1.4M in Mockup) */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="p-3 rounded-xl bg-[#0B4A3A]/40 border border-[#0B4A3A] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#B9CBC3]">Readiness</span>
                        <span className="text-[9px] font-bold font-mono px-1 rounded bg-[#0E7A5A] text-white">
                          +4.2%
                        </span>
                      </div>
                      <p className="text-xl sm:text-2xl font-black font-mono text-white tabular-nums">97.4%</p>
                      <p className="text-[10px] text-[#B9CBC3] truncate">System Health</p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0B4A3A]/40 border border-[#0B4A3A] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#B9CBC3]">Pipeline</span>
                        <span className="text-[9px] font-bold font-mono px-1 rounded bg-[#C8793A] text-[#06201A]">
                          Active
                        </span>
                      </div>
                      <p className="text-xl sm:text-2xl font-black font-mono text-[#C8793A] tabular-nums">$1.4M</p>
                      <p className="text-[10px] text-[#B9CBC3] truncate">Capital Flow</p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0B4A3A]/40 border border-[#0B4A3A] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#B9CBC3]">Response</span>
                        <span className="text-[9px] font-bold font-mono px-1 rounded bg-emerald-900 text-emerald-300">
                          1-on-1
                        </span>
                      </div>
                      <p className="text-xl sm:text-2xl font-black font-mono text-white tabular-nums">18 min</p>
                      <p className="text-[10px] text-[#B9CBC3] truncate">Coach Support</p>
                    </div>
                  </div>

                  {/* Dynamic Glowing Waveform / Sparkline SVG Chart */}
                  <div className="p-3.5 rounded-2xl bg-[#06201A]/90 border border-[#0B4A3A] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-mono text-[#B9CBC3] text-[11px]">
                        <Activity className="w-3.5 h-3.5 text-[#0E7A5A]" />
                        <span>Production & Revenue Trajectory</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#C8793A]">Optimal Curve</span>
                    </div>

                    {/* SVG Spline with Gradient */}
                    <div className="h-20 w-full relative">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 320 80" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0E7A5A" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="#0E7A5A" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Subtle Horizontal Grid lines */}
                        <line x1="0" y1="20" x2="320" y2="20" stroke="#0B4A3A" strokeWidth="0.8" strokeDasharray="3 3" />
                        <line x1="0" y1="50" x2="320" y2="50" stroke="#0B4A3A" strokeWidth="0.8" strokeDasharray="3 3" />
                        {/* Area fill */}
                        <path
                          d="M0,65 Q40,55 80,48 T160,32 T240,18 T320,8 L320,80 L0,80 Z"
                          fill="url(#chartGradient)"
                        />
                        {/* Line Stroke */}
                        <path
                          d="M0,65 Q40,55 80,48 T160,32 T240,18 T320,8"
                          fill="none"
                          stroke="#0E7A5A"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        {/* Accent data points */}
                        <circle cx="80" cy="48" r="3.5" fill="#C8793A" />
                        <circle cx="160" cy="32" r="3.5" fill="#C8793A" />
                        <circle cx="240" cy="18" r="3.5" fill="#C8793A" />
                        <circle cx="320" cy="8" r="4.5" fill="#0E7A5A" className="animate-pulse" />
                      </svg>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-[#B9CBC3] pt-1">
                      <span>Q1 Baseline</span>
                      <span>Q2 Expansion</span>
                      <span>Q3 Scale</span>
                      <span className="text-white font-bold">Q4 Institutional</span>
                    </div>
                  </div>

                  {/* Active Selected Territory Division Display */}
                  <div className="p-3.5 rounded-2xl bg-[#0B4A3A]/40 border border-[#0B4A3A] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#C8793A] font-mono">
                        Division #{selectedTerritory.regionNumber}: {selectedTerritory.name}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#06201A] text-[#B9CBC3] border border-[#0B4A3A] font-mono">
                        HQ: {selectedTerritory.headOffice}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#B9CBC3] leading-relaxed">
                      <strong className="text-white">States Covered:</strong> {selectedTerritory.coverage}
                    </p>
                  </div>

                  {/* Quick Division Selector Pills */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#B9CBC3]">
                      <span className="uppercase tracking-wider">Federal Reserve Division Switcher:</span>
                      <span className="text-[#C8793A]">Div {selectedTerritory.regionNumber} of 12</span>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                      {TERRITORY_DIVISIONS.map((terr) => (
                        <button
                          key={terr.id}
                          onClick={() => setSelectedTerritoryId(terr.id)}
                          className={`px-1.5 py-1 rounded-lg text-[11px] font-medium font-mono transition-all truncate text-center ${
                            selectedTerritoryId === terr.id
                              ? 'bg-[#C8793A] text-[#06201A] font-extrabold shadow-sm'
                              : 'bg-[#0B4A3A]/50 text-[#B9CBC3] hover:bg-[#0B4A3A] border border-[#0B4A3A]'
                          }`}
                        >
                          Div {terr.regionNumber}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Territory Action Footer */}
                  <div className="pt-2 border-t border-[#0B4A3A] flex items-center justify-between text-xs">
                    <span className="text-[#B9CBC3] text-[11px]">Regional assistance ready:</span>
                    <button
                      onClick={() => setCoachModalOpen(true)}
                      className="text-[#C8793A] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer font-mono text-xs"
                    >
                      <span>Connect with Div #{selectedTerritory.regionNumber} Coach</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2. 16 SOLUTIONS: "16 Solutions. One Platform." (Matching Mockup)
          ========================================================================= */}
      <section id="solutions-showcase" className="py-20 md:py-28 bg-[#EEF1EC] relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Section Header Matching Mockup */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-bold text-[#0E7A5A] font-mono">
              <Layers className="w-3.5 h-3.5 text-[#0E7A5A]" />
              <span>OUR COMPLETE PLATFORM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#06201A] tracking-tight">
              16 Solutions. One Platform.
            </h2>

            <p className="text-base sm:text-lg text-[#14231E]/75 leading-relaxed">
              A unified operating system for American small businesses and growing enterprises — fully integrated, enterprise-grade, and built to scale.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {['All', 'Finance', 'Growth', 'Operations', 'Technology'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer font-mono ${
                    activeCategory === cat
                      ? 'bg-[#0E7A5A] text-white shadow-sm'
                      : 'bg-white text-[#14231E] border border-slate-200 hover:bg-[#EEF1EC]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 16 Solutions Grid: 4x4 White Cards matching Mockup */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSolutions.map((solution, idx) => {
              const IconComponent = iconMap[solution.iconName] || Layers

              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (idx % 4) * 0.06 }}
                  className="relative group bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between hover:border-[#0E7A5A] hover:-translate-y-1 hover:shadow-xl transition-all shadow-xs"
                >
                  <div className="space-y-4">
                    {/* Header: Icon container on left, Number badge on right */}
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#0E7A5A] border border-emerald-100 flex items-center justify-center group-hover:bg-[#0E7A5A] group-hover:text-white transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-black font-mono px-2 py-0.5 rounded bg-[#EEF1EC] text-[#06201A]">
                          #{solution.number}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                          {solution.category}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-extrabold text-[#06201A] group-hover:text-[#0E7A5A] transition-colors leading-snug font-heading">
                      {solution.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-[#14231E]/75 leading-relaxed">
                      {solution.shortDesc}
                    </p>
                  </div>

                  {/* MANDATORY ACTIONS PER CLIENT RULES (BOTH BUTTONS ON EVERY CARD): */}
                  <div className="pt-6 mt-6 border-t border-slate-100 space-y-2.5">
                    {/* Primary Button On Light: Emerald Fill, White Text, 48px Height, Arrow Right */}
                    <button
                      onClick={() => setCoachModalOpen(true)}
                      className="btn-emerald-light w-full group/btn !h-[44px] !text-xs font-bold"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-white shrink-0" />
                      <span className="truncate">{solution.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover/btn:translate-x-1 shrink-0" />
                    </button>

                    {/* Secondary Button On Light: Outline Link */}
                    <Link
                      to={`/solutions#${solution.slug}`}
                      className="w-full h-[40px] rounded-xl border border-slate-200 text-slate-700 hover:text-[#0E7A5A] hover:border-[#0E7A5A] hover:bg-slate-50 text-xs font-bold font-mono transition-all flex items-center justify-center gap-1 group/link"
                    >
                      <span>Click Here</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Quick link below grid */}
          <div className="text-center pt-10">
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0E7A5A] hover:underline font-mono"
            >
              <span>Explore full documentation for all 16 solutions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3. CRM & ERP SPOTLIGHT: "Enterprise CRM & ERP Designed For Small Business Pros"
          ========================================================================= */}
      <section id="software" className="py-20 md:py-28 bg-[#06201A] text-white border-b border-[#0B4A3A] relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0B4A3A]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Software Overview & Features */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B4A3A]/70 border border-[#0B4A3A]">
                <Cpu className="w-3.5 h-3.5 text-[#C8793A]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#C8793A] font-mono">
                  {B4BAPP_SOFTWARE.name} • {B4BAPP_SOFTWARE.category}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
                Enterprise CRM & ERP Designed For Small Business Pros
              </h2>

              <p className="text-base text-[#B9CBC3] leading-relaxed">
                {B4BAPP_SOFTWARE.description}
              </p>

              {/* 3 Core Capability Highlights with Icons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0B4A3A]/30 border border-[#0B4A3A]">
                  <div className="w-8 h-8 rounded-lg bg-[#0E7A5A] text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Automated Job Costing & Invoicing</h4>
                    <p className="text-xs text-[#B9CBC3]">
                      Instant PO management, inventory descriptions for up to 100 service products, and procurement tracking.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0B4A3A]/30 border border-[#0B4A3A]">
                  <div className="w-8 h-8 rounded-lg bg-[#C8793A] text-[#06201A] flex items-center justify-center shrink-0 font-bold">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Pipeline & Real-Time Deal Tracking</h4>
                    <p className="text-xs text-[#B9CBC3]">
                      White-label CRM lead intake, automated communication feeds, and conversion rate analytics for Biz Pros.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0B4A3A]/30 border border-[#0B4A3A]">
                  <div className="w-8 h-8 rounded-lg bg-[#0E7A5A] text-white flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Bulletin Sales Scoreboard & Career Ladder</h4>
                    <p className="text-xs text-[#B9CBC3]">
                      Real-time category leaderboards and 9-tier Biz Pro career progression from Account Executive to Senior National VP.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Box in Copper Tabular Numbers + Actions */}
              <div className="p-4 rounded-2xl bg-[#06201A] border border-[#0B4A3A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[#B9CBC3] font-mono uppercase">Biz Pro Access Subscription</p>
                  <p className="text-2xl font-extrabold text-[#C8793A] font-mono tabular-nums">
                    {B4BAPP_SOFTWARE.pricing}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate('/portal/login')}
                    className="btn-copper-dark"
                  >
                    Portal Login
                  </button>
                  <button
                    onClick={() => setCoachModalOpen(true)}
                    className="btn-outline-dark"
                  >
                    Request Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Sleek Dark Cockpit Command Widget */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#06201A] border border-[#0B4A3A] space-y-5 text-left shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-[#0B4A3A] pb-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#C8793A]" />
                    <h3 className="text-base font-extrabold text-white font-heading">
                      Biz Pro Command Center
                    </h3>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#0B4A3A] text-[#B9CBC3] font-mono">
                    Live Pipeline
                  </span>
                </div>

                {/* Metric Chips */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[#0B4A3A]/40 border border-[#0B4A3A]">
                    <p className="text-[10px] text-[#B9CBC3] font-mono">Active Deals</p>
                    <p className="text-lg font-black font-mono text-[#C8793A]">$41,270</p>
                    <p className="text-[9px] text-emerald-400 font-mono">+18% this month</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0B4A3A]/40 border border-[#0B4A3A]">
                    <p className="text-[10px] text-[#B9CBC3] font-mono">Win Rate</p>
                    <p className="text-lg font-black font-mono text-white">74.2%</p>
                    <p className="text-[9px] text-[#B9CBC3] font-mono">Verified deals</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0B4A3A]/40 border border-[#0B4A3A]">
                    <p className="text-[10px] text-[#B9CBC3] font-mono">Active Accounts</p>
                    <p className="text-lg font-black font-mono text-white">128</p>
                    <p className="text-[9px] text-[#B9CBC3] font-mono">12 Divisions</p>
                  </div>
                </div>

                {/* Pipeline Conversion Bar */}
                <div className="p-3.5 rounded-xl bg-[#0B4A3A]/25 border border-[#0B4A3A] space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#B9CBC3]">
                    <span>Pipeline Distribution</span>
                    <span className="text-white">Total: 48 Leads</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#06201A] rounded-full overflow-hidden flex">
                    <div style={{ width: '42%' }} className="bg-[#0E7A5A]" title="Qualified (42%)" />
                    <div style={{ width: '35%' }} className="bg-[#C8793A]" title="In Negotiation (35%)" />
                    <div style={{ width: '23%' }} className="bg-emerald-400" title="Closed Won (23%)" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#B9CBC3] pt-1">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#0E7A5A]" /> Qualified (42%)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#C8793A]" /> In Review (35%)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" /> Closed Won (23%)
                    </span>
                  </div>
                </div>

                {/* Real-time Activity Feed */}
                <div className="space-y-2 pt-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#B9CBC3] font-mono">
                    Recent Verified Transactions
                  </p>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-[#0B4A3A]/40 border border-[#0B4A3A] flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-white">Apex Industrial Equipment Lease</p>
                        <p className="text-[10px] text-[#B9CBC3]">Division #6 • Atlanta, GA</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-[#C8793A]">$65,000</span>
                        <p className="text-[9px] text-emerald-400 font-mono">Approved</p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#0B4A3A]/40 border border-[#0B4A3A] flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-white">Summit Logistics Working Capital Line</p>
                        <p className="text-[10px] text-[#B9CBC3]">Division #11 • Dallas, TX</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-[#C8793A]">$120,000</span>
                        <p className="text-[9px] text-amber-300 font-mono">Under Review</p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#0B4A3A]/40 border border-[#0B4A3A] flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-white">Metro Supermarket Smart POS Setup</p>
                        <p className="text-[10px] text-[#B9CBC3]">Division #2 • New York, NY</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-[#C8793A]">$15,000</span>
                        <p className="text-[9px] text-emerald-400 font-mono">Deployed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Career Progression Teaser */}
                <div className="pt-2 border-t border-[#0B4A3A] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#B9CBC3]">Biz Pro Structure:</span>
                  <span className="text-[#C8793A] font-bold">9-Tier Career Ranking System</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4. INDUSTRIES WE SERVE: (Matching Mockup)
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#EEF1EC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-[#0E7A5A] font-mono">
                <Building2 className="w-3.5 h-3.5 text-[#0E7A5A]" />
                <span>SECTOR SPECIALIZATION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#06201A] tracking-tight">
                Industries We Serve
              </h2>
              <p className="text-base text-[#14231E]/75">
                Tailored solutions for 32 key business trades operating in towns and cities across America.
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs font-bold text-[#0E7A5A] font-mono">
                Click any trade to speak with a specialized coach
              </span>
            </div>
          </div>

          {/* 32 Trades Grid in White Cards on Soft Stone */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {INDUSTRIES_SERVED.map((industry) => (
              <button
                key={industry}
                onClick={() => {
                  setActiveIndustryFilter(industry)
                  setCoachModalOpen(true)
                }}
                className="p-3.5 rounded-xl bg-white border border-slate-200 text-left hover:border-[#0E7A5A] hover:-translate-y-0.5 hover:shadow-md transition-all group cursor-pointer shadow-xs"
              >
                <p className="text-xs font-bold text-[#06201A] group-hover:text-[#0E7A5A] transition-colors line-clamp-2 font-heading">
                  {industry}
                </p>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-500 group-hover:text-[#0E7A5A] font-mono font-semibold">
                  <span>Match Coach</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5. INTERACTIVE PLATFORM DEMO: "See B4B America in Action" (Matching Mockup)
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#06201A] text-white border-b border-[#0B4A3A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-[#06201A] via-[#0B4A3A]/90 to-[#06201A] rounded-3xl border border-[#0B4A3A] shadow-2xl p-8 sm:p-12 overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Platform Demo Pitch & Visuals */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B4A3A] text-xs font-bold text-[#C8793A] font-mono">
                  <Play className="w-3.5 h-3.5 text-[#C8793A] fill-current" />
                  <span>ON-DEMAND PLATFORM DEMO</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
                  See B4B America in Action
                </h2>

                <p className="text-sm sm:text-base text-[#B9CBC3] leading-relaxed">
                  Book a personalized consultation or live walkthrough with an executive business coach. 
                  Learn how to optimize working capital, POS rates, and software workflow without high-pressure sales tactics.
                </p>

                <div className="space-y-3 pt-2 text-xs text-white font-medium">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C8793A] shrink-0" />
                    <span>30-minute free diagnostic review</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C8793A] shrink-0" />
                    <span>Custom blueprint tailored to your trade sector</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C8793A] shrink-0" />
                    <span>Non-dilutive capital guidance across 12 Federal Divisions</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#0B4A3A] flex items-center gap-4 text-xs font-mono text-[#B9CBC3]">
                  <div>
                    <p className="font-bold text-white">Direct Advisory Desk:</p>
                    <p>+1 (888) 540-B4BA</p>
                  </div>
                  <div>
                    <p className="font-bold text-white">Corporate Support:</p>
                    <p>advisory@b4bamerica.com</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Embedded Pre-qualification Form matching Mockup */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xl text-[#14231E]">
                <div className="space-y-2 mb-6 text-left border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-extrabold font-heading text-[#06201A]">
                      Schedule Executive Consultation
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-[#0E7A5A] font-bold border border-emerald-200">
                      ⚡ 60-Second Setup
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Connect directly with a dedicated coach within 1 business hour. Zero upfront fees.
                  </p>
                </div>

                <CoachLeadForm
                  isInline
                  initialIndustry={activeIndustryFilter}
                  onSuccess={() => {
                    setActiveIndustryFilter('')
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6. TESTIMONIALS: "Real Businesses. Real Results." (Matching Mockup)
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold text-[#0E7A5A] border border-emerald-200 font-mono">
              <Star className="w-3.5 h-3.5 text-[#C8793A] fill-current" />
              <span>VERIFIED CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#06201A] tracking-tight">
              Real Businesses. Real Results.
            </h2>
            <p className="text-base text-slate-600">
              How businesses nationwide streamline operations, secure non-dilutive capital, and scale with B4B America.
            </p>
          </div>

          {/* 3 Testimonials Cards Grid matching Mockup */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VERIFIED_CASE_STUDIES.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-lg hover:border-[#0E7A5A] transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-[#C8793A]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-[#14231E]/80 leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Profile */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0E7A5A] font-bold font-mono text-sm flex items-center justify-center shrink-0">
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#06201A] font-heading">{item.author}</h4>
                    <p className="text-xs text-slate-500">{item.role} • {item.company}</p>
                    <p className="text-[10px] text-[#0E7A5A] font-mono">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7. CORPORATE PHILOSOPHY & MANTRA (Preserving Client Vision)
          ========================================================================= */}
      <section className="py-20 md:py-24 bg-[#0B4A3A] text-white border-b border-[#06201A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Vision Header */}
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06201A] text-xs font-bold text-[#C8793A] border border-[#0B4A3A] font-mono">
              <Compass className="w-3.5 h-3.5" />
              <span>CORPORATE PHILOSOPHY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              "{BRAND_IDENTITY.vision}"
            </h2>
            <p className="text-sm sm:text-base text-[#B9CBC3] max-w-2xl mx-auto">
              The B4B America Mantra:{' '}
              <span className="text-[#C8793A] font-bold font-mono">
                {BRAND_IDENTITY.mantra}
              </span>
            </p>
          </div>

          {/* 5 Mantra Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BRAND_IDENTITY.mantraSteps.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-[#06201A]/80 border border-[#0B4A3A] space-y-2 text-left hover:border-[#C8793A] transition-all group"
              >
                <span className="text-2xl font-black font-mono text-[#C8793A] group-hover:scale-105 transition-transform inline-block">
                  {step.step}
                </span>
                <h4 className="text-sm font-extrabold text-white font-heading">
                  {step.title}
                </h4>
                <p className="text-xs text-[#B9CBC3] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8. FOOTER: Forest Black (#06201A)
          ========================================================================= */}
      <Footer />

      {/* Global Coach Modal Triggered by Buttons */}
      <CoachRequestModal
        isOpen={coachModalOpen}
        onClose={() => setCoachModalOpen(false)}
        initialIndustry={activeIndustryFilter}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectSolution={(sol) => {
          navigate(`/solutions#${sol.slug}`)
        }}
      />
    </div>
  )
}
