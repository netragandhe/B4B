import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  Building2,
  Compass,
  Check,
  Activity,
  BarChart3,
  Play,
  Cpu,
  Layers,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  UtensilsCrossed,
  Sparkles,
  HardHat,
} from 'lucide-react'
import '@/components/website/corporateTheme.css'
import { Navbar } from '@/components/website/Navbar'
import { Footer } from '@/components/website/Footer'
import { SearchModal } from '@/components/website/SearchModal'
import { CoachRequestModal, CoachLeadForm } from '@/components/forms/CoachRequestModal'
import { SEOHead } from '@/components/seo/SEOHead'
import {
  CLIENT_16_SOLUTIONS,
  BRAND_IDENTITY,
  B4BAPP_SOFTWARE,
  TERRITORY_DIVISIONS,
  INDUSTRIES_SERVED,
} from '@/content/clientContent'
import b4bappPreviewImg from '@/content/images/b4bapp-preview.webp'
import heroBgImg from '@/content/images/hero-bg.webp'
import industryTruckImg from '@/content/images/industry-truck.webp'
import { SOLUTION_IMAGES } from '@/content/solutionImages'

const FEATURED_INDUSTRIES = [
  {
    id: 'ind-truck',
    name: 'Freight Trucking & Transportation',
    image: industryTruckImg,
    icon: null,
  },
  {
    id: 'ind-restaurant',
    name: 'Restaurants, Snack Bars, Sports Bars & Lounges',
    image: null,
    icon: UtensilsCrossed,
  },
  {
    id: 'ind-salon',
    name: 'Beauty Salons',
    image: null,
    icon: Sparkles,
  },
  {
    id: 'ind-construction',
    name: 'Construction & Residential Remodelers',
    image: null,
    icon: HardHat,
  },
]

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

const TELEMETRY_TICKER = [
  '16 Core Solutions Active',
  '12 Federal Reserve Divisions Live',
  '100% Verified Network Readiness',
  '1-on-1 Dedicated Coach Support',
  '32 Trade & Commerce Sectors',
  'B4BAPP Enterprise CRM/ERP Ready',
  'Coast-to-Coast Pre-Qualification in 3 Mins',
]

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const [coachModalOpen, setCoachModalOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [activeDivisionIndex, setActiveDivisionIndex] = useState<number>(1) // Default Div #2 (NY & Atlantic)
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true)
  const [activeIndustryFilter, setActiveIndustryFilter] = useState<string>('')

  // Auto-cycle through the 12 Federal Reserve Territory Divisions every 4 seconds
  useEffect(() => {
    if (!isAutoCycling) return
    const interval = setInterval(() => {
      setActiveDivisionIndex((prev) => (prev + 1) % TERRITORY_DIVISIONS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoCycling])

  // Filter 16 solutions by category
  const filteredSolutions = CLIENT_16_SOLUTIONS.filter((sol) => {
    if (activeCategory === 'All') return true
    return sol.category === activeCategory
  })

  // Selected territory details
  const selectedTerritory =
    TERRITORY_DIVISIONS[activeDivisionIndex] ||
    TERRITORY_DIVISIONS[0]

  return (
    <div className="min-h-screen bg-[#07142B] text-white transition-colors duration-200 overflow-x-hidden font-body">
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

      {/* Corporate Navbar: Midnight Navy with White Logo Badge */}
      <Navbar variant="dark" onOpenCoachModal={() => setCoachModalOpen(true)} />

      {/* =========================================================================
          SECTION 1. HERO (MATCHING SECTION 3 LUMINOUS BLUE PALETTE)
          ========================================================================= */}
      <section className="relative py-20 text-white border-b border-sky-300/25 overflow-hidden">
        {/* Background Photo Layer with luminous blue overlay matching Section 3 */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            src={heroBgImg}
            alt="B4B America commercial business commerce operations"
            loading="eager"
            decoding="sync"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Exact matching luminous blue overlays as Section 3 */}
          <div className="absolute inset-0 bg-[#0A2A5E]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08204D]/75 via-[#0B2C68]/45 to-[#08204D]/25" />
        </div>

        {/* Ambient lighting accent matching Section 3 */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/25 rounded-full blur-3xl pointer-events-none z-[1]" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Asymmetric Corporate Typography */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Top Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-300/40 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F8C61A] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#F8C61A] font-mono">
                  NATIONAL SMALL BUSINESS OPERATING NETWORK
                </span>
              </div>

              {/* Tagline as Main Headline (Sora, Bold, Million Dollar Tech Grade) */}
              <div className="space-y-3">
                <h1 className="text-[28px] lg:text-[36px] font-extrabold font-heading text-white leading-tight tracking-tight">
                  {BRAND_IDENTITY.tagline.split('Small Business')[0]}
                  <span className="text-[#F8C61A]">
                    Small Business
                  </span>{' '}
                  Solutions.
                </h1>

                <p className="text-lg sm:text-xl font-bold text-[#B8C4D9] font-heading">
                  {BRAND_IDENTITY.subTagline}
                </p>
              </div>

              {/* Client Mission Statement Excerpt */}
              <p className="text-base sm:text-lg text-[#B8C4D9] max-w-2xl leading-relaxed font-normal">
                {BRAND_IDENTITY.mission}
              </p>

              {/* TWO MANDATORY CTAs: Gold on Dark + Outline Secondary */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                {/* CTA 1: Gold fill + Midnight Navy text on dark */}
                <button
                  onClick={() => setCoachModalOpen(true)}
                  className="btn-gold-dark group"
                >
                  <PhoneCall className="w-4 h-4 text-[#07142B] shrink-0" />
                  <span>Speak with a Business Coach</span>
                  <ArrowRight className="w-4 h-4 text-[#07142B] transition-transform group-hover:translate-x-1 shrink-0" />
                </button>

                {/* CTA 2: Outline secondary on dark */}
                <button
                  onClick={() => {
                    const el = document.getElementById('solutions-showcase')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="btn-outline-dark group"
                >
                  <Layers className="w-4 h-4 text-[#F8C61A] shrink-0" />
                  <span>Explore 16 Solutions</span>
                  <ArrowRight className="w-4 h-4 text-white/70 transition-transform group-hover:translate-x-1 shrink-0" />
                </button>
              </div>

              {/* Fact Indicators with Big Gold Numbers - Halka Blue Glass Boxes */}
              <div className="pt-6 border-t border-sky-300/25 grid grid-cols-3 gap-3.5 max-w-xl text-left font-mono">
                <div className="p-3 rounded-xl bg-sky-500/20 border border-sky-300/35 backdrop-blur-md space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#F8C61A] tabular-nums">16</p>
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                  </div>
                  <p className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">Core Solutions</p>
                  <p className="text-[10px] sm:text-[11px] text-blue-100 font-sans">Payments to software</p>
                </div>
                <div className="p-3 rounded-xl bg-sky-500/20 border border-sky-300/35 backdrop-blur-md space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#F8C61A] tabular-nums">12</p>
                    <span className="w-2 h-2 rounded-full bg-[#F8C61A]" />
                  </div>
                  <p className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">Fed Divisions</p>
                  <p className="text-[10px] sm:text-[11px] text-blue-100 font-sans">Coast-to-coast coverage</p>
                </div>
                <div className="p-3 rounded-xl bg-sky-500/20 border border-sky-300/35 backdrop-blur-md space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#F8C61A] tabular-nums">32</p>
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                  </div>
                  <p className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">Trade Sectors</p>
                  <p className="text-[10px] sm:text-[11px] text-blue-100 font-sans">Trades & commerce</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Compact Auto-Cycling & Auto-Scrolling Telemetry Widget */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 shrink-0"
            >
              <div
                onMouseEnter={() => setIsAutoCycling(false)}
                onMouseLeave={() => setIsAutoCycling(true)}
                className="relative bg-gradient-to-br from-sky-600/25 via-[#1658B3]/30 to-sky-700/25 text-white rounded-3xl p-4 sm:p-5 shadow-[0_16px_48px_rgba(2,132,199,0.25)] border border-sky-300/40 overflow-hidden w-full backdrop-blur-2xl transition-all"
              >
                {/* Background ambient lighting */}
                <div className="absolute top-0 right-0 w-56 h-56 bg-[#013CA0]/25 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#FFC911]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-3.5">
                  {/* Card Header Bar: Live Pulse + Division Indicator + Prev/Next Controls */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFC911] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFC911]" />
                      </span>
                      <span className="font-mono text-xs font-black uppercase tracking-wider text-[#FFC911]">
                        Live Executive Telemetry
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-[#07142B] text-[#B8C4D9] border border-white/10 font-bold">
                        Div {selectedTerritory.regionNumber} of 12
                      </span>
                      <button
                        onClick={() =>
                          setActiveDivisionIndex((prev) =>
                            prev === 0 ? TERRITORY_DIVISIONS.length - 1 : prev - 1
                          )
                        }
                        className="w-6 h-6 rounded-md bg-[#07142B] hover:bg-[#013CA0] text-[#B8C4D9] hover:text-white flex items-center justify-center transition border border-white/10 cursor-pointer"
                        title="Previous Division"
                        aria-label="Previous Division"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() =>
                          setActiveDivisionIndex((prev) => (prev + 1) % TERRITORY_DIVISIONS.length)
                        }
                        className="w-6 h-6 rounded-md bg-[#07142B] hover:bg-[#013CA0] text-[#B8C4D9] hover:text-white flex items-center justify-center transition border border-white/10 cursor-pointer"
                        title="Next Division"
                        aria-label="Next Division"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 3 Top KPIs Strip: Compact & High Contrast */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-xl bg-[#07142B]/90 border border-white/5 space-y-0.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#B8C4D9] block">Readiness</span>
                      <p className="text-base sm:text-lg font-black font-mono text-white">100%</p>
                      <span className="text-[10px] font-bold text-emerald-400 font-mono block">Verified</span>
                    </div>
                    <div className="p-2 rounded-xl bg-[#07142B]/90 border border-white/5 space-y-0.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#B8C4D9] block">Solutions</span>
                      <p className="text-base sm:text-lg font-black font-mono text-[#FFC911]">16</p>
                      <span className="text-[10px] font-bold text-[#FFC911] font-mono block">Active Suite</span>
                    </div>
                    <div className="p-2 rounded-xl bg-[#07142B]/90 border border-white/5 space-y-0.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#B8C4D9] block">Support</span>
                      <p className="text-base sm:text-lg font-black font-mono text-white">1-on-1</p>
                      <span className="text-[10px] font-bold text-blue-300 font-mono block">Dedicated</span>
                    </div>
                  </div>

                  {/* Auto-Cycling Division Showcase Box (with AnimatePresence) */}
                  <div className="relative rounded-xl bg-[#07142B]/90 border border-white/10 p-3.5 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedTerritory.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded-full bg-[#013CA0] text-white tracking-wider inline-block">
                              Federal Reserve Div #{selectedTerritory.regionNumber}
                            </span>
                            <h3 className="text-sm sm:text-base font-extrabold text-white mt-1 leading-snug">
                              {selectedTerritory.name}
                            </h3>
                          </div>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#0D2147] text-[#FFC911] border border-[#FFC911]/30 font-bold shrink-0">
                            HQ: {selectedTerritory.headOffice}
                          </span>
                        </div>

                        <p className="text-xs text-[#B8C4D9] leading-relaxed line-clamp-2">
                          <strong className="text-white">States Covered: </strong>
                          <span>{selectedTerritory.coverage}</span>
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Auto-cycle Progress Line */}
                    <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between gap-3">
                      <div className="flex-1 bg-white/10 h-1 rounded-full overflow-hidden">
                        {isAutoCycling && (
                          <motion.div
                            key={activeDivisionIndex}
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 4, ease: 'linear' }}
                            className="h-full bg-gradient-to-r from-[#013CA0] to-[#FFC911]"
                          />
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-[#B8C4D9]/70 shrink-0">
                        {isAutoCycling ? 'Auto-cycling (4s)' : 'Paused (hover)'}
                      </span>
                    </div>
                  </div>

                  {/* 12 Mini Division Quick Selector Bars */}
                  <div className="flex items-center justify-between gap-1 px-0.5">
                    {TERRITORY_DIVISIONS.map((terr, idx) => (
                      <button
                        key={terr.id}
                        onClick={() => setActiveDivisionIndex(idx)}
                        className={`h-1.5 flex-1 rounded-full transition-all cursor-pointer ${
                          activeDivisionIndex === idx
                            ? 'bg-[#FFC911] shadow-xs scale-y-125'
                            : 'bg-white/15 hover:bg-white/40'
                        }`}
                        title={`Div ${terr.regionNumber}: ${terr.name}`}
                        aria-label={`Jump to Division ${terr.regionNumber}`}
                      />
                    ))}
                  </div>

                  {/* Connect with Division Coach CTA */}
                  <button
                    onClick={() => setCoachModalOpen(true)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FFC911] to-[#FFBD0A] hover:brightness-105 active:scale-[0.99] text-[#07142B] font-bold text-xs flex items-center justify-between transition shadow-md group cursor-pointer"
                  >
                    <span className="flex items-center gap-2 font-mono">
                      <PhoneCall className="w-3.5 h-3.5 text-[#07142B]" />
                      <span>Connect with Div #{selectedTerritory.regionNumber} Coach</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Auto-scrolling Continuous Live Ticker Marquee */}
                  <div className="overflow-hidden relative w-full py-1.5 bg-[#07142B]/80 rounded-lg border border-white/5">
                    <motion.div
                      className="flex items-center gap-6 whitespace-nowrap text-[11px] font-mono font-medium text-[#B8C4D9]"
                      animate={{ x: ['0%', '-50%'] }}
                      transition={{ repeat: Infinity, ease: 'linear', duration: 22 }}
                    >
                      {[...TELEMETRY_TICKER, ...TELEMETRY_TICKER].map((item, i) => (
                        <span key={i} className="flex items-center gap-2 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC911]" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2. 16 SOLUTIONS (EXACT MATCH TO SECTION 3 BACKGROUND & ATMOSPHERE)
          ========================================================================= */}
      <section id="solutions-showcase" className="py-20 text-white relative border-b border-sky-300/30 overflow-hidden">
        {/* Background Visual Layer matching Section 3 3D technology graphic and exact blue overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src={b4bappPreviewImg}
            alt="B4B Solutions 3D technology ecosystem backdrop"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Exact matching luminous blue overlays as Section 3 */}
          <div className="absolute inset-0 bg-[#0A2A5E]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08204D]/75 via-[#0B2C68]/45 to-[#08204D]/25" />
        </div>

        {/* Ambient lighting accent matching Section 3 */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/25 rounded-full blur-3xl pointer-events-none z-[1]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none z-[1]" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Centered Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-300/40 shadow-sm text-xs font-bold text-[#F8C61A] font-mono">
              <Layers className="w-3.5 h-3.5 text-[#F8C61A]" />
              <span>THE B4B BUSINESS SOLUTIONS NETWORK</span>
            </div>

            <h2 className="text-[28px] lg:text-[36px] font-extrabold font-heading text-white tracking-tight leading-tight">
              16 Solutions Every Small Business Needs to Thrive
            </h2>

            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed">
              We design ideas and turn prospects into clients. We offer solutions for you to build business credit, accept payments and secure business funding.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {['All', 'Finance', 'Growth', 'Operations', 'Technology'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer font-mono min-h-[44px] ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg border border-sky-200/50'
                      : 'bg-sky-500/15 text-blue-100 hover:text-white hover:bg-sky-500/30 backdrop-blur-md border border-sky-300/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 16 Solutions Grid: 3 columns desktop, 2 tablet, 1 mobile, 24px gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredSolutions.map((solution, idx) => {
              const IconComponent = iconMap[solution.iconName] || Layers

              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: (idx % 3) * 0.05 }}
                  className="group flex flex-col justify-between h-full rounded-2xl overflow-hidden bg-gradient-to-r from-sky-500/25 to-blue-600/20 hover:from-sky-500/35 hover:to-blue-600/30 backdrop-blur-xl border border-sky-300/40 hover:border-sky-200/80 shadow-[0_8px_24px_rgba(14,165,233,0.16)] hover:shadow-[0_16px_40px_rgba(14,165,233,0.28)] hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Visual Photo Header with Image Zoom, Badges & Floating Icon */}
                  <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-900">
                    <img
                      src={SOLUTION_IMAGES[solution.id]}
                      alt={`${solution.title} - B4B America commercial business solution`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                    {/* Multi-layer Gradient for Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07142B]/85 via-sky-950/25 to-transparent pointer-events-none" />

                    {/* Top Row: Category Pill & Solution Number */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-500/30 backdrop-blur-md text-white border border-sky-200/40 shadow-xs">
                        {solution.category}
                      </span>
                      <span className="text-[11px] font-mono font-black text-white bg-[#013CA0] backdrop-blur-md px-2.5 py-1 rounded-full border border-sky-300/30 shadow-xs">
                        #{solution.number}
                      </span>
                    </div>

                    {/* Bottom Row: Icon Box floating on bottom-right */}
                    <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-sky-500/30 backdrop-blur-md text-sky-100 shadow-md border border-sky-200/50 flex items-center justify-center group-hover:bg-[#F8C61A] group-hover:text-[#07142B] transition-colors duration-300 pointer-events-none">
                      <IconComponent className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  </div>

                  {/* Card Content & Action Buttons */}
                  <div className="solution-card-body">
                    <div className="space-y-2.5">
                      {/* Title: 20px, semibold, text with hover color transition */}
                      <h3 className="solution-card-title group-hover:text-[#F8C61A] transition-colors">
                        {solution.title}
                      </h3>

                      {/* Description: minimum 15px, line-height 1.6, luminous text, max 3 lines */}
                      <p className="solution-card-desc">
                        {solution.shortDesc}
                      </p>
                    </div>

                    {/* Buttons Pinned to the Bottom of the Card */}
                    <div className="pt-5 mt-5 border-t border-sky-300/20 flex flex-col gap-2.5">
                      {/* Primary Button: Full-width, Logo Blue background, white text, 14px */}
                      <button
                        onClick={() => setCoachModalOpen(true)}
                        className="solution-btn-primary group/btn"
                      >
                        <PhoneCall className="w-4 h-4 text-white shrink-0" />
                        <span>{solution.ctaText}</span>
                      </button>

                      {/* Secondary Button: "Click Here" text link with arrow */}
                      <Link
                        to={`/solutions#${solution.slug}`}
                        className="solution-link-secondary group/link"
                      >
                        <span>Click Here</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Quick link below grid */}
          <div className="text-center pt-10">
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 text-sm font-bold text-sky-300 hover:text-[#F8C61A] hover:underline font-mono min-h-[44px]"
            >
              <span>Explore full details for all 16 solutions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3. CRM & ERP SPOTLIGHT: B4BAPP (3D TECH VISUAL BACKGROUND)
          ========================================================================= */}
      <section id="software" className="py-20 text-white border-b border-[#0D2147] relative overflow-hidden">
        {/* Background Visual Layer showcasing the user-selected 3D technology graphic */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src={b4bappPreviewImg}
            alt="B4BAPP Enterprise CRM and ERP 3D technology dashboard visual"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Luminous blue overlay: harmonizes with the bright sky-blue 3D graphic without blacking it out */}
          <div className="absolute inset-0 bg-[#0A2A5E]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08204D]/75 via-[#0B2C68]/45 to-[#08204D]/25" />
        </div>

        {/* Ambient lighting accent */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/25 rounded-full blur-3xl pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Text Content & Features */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Gold small label badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-300/40 shadow-sm">
                <Cpu className="w-3.5 h-3.5 text-[#F8C61A]" />
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#F8C61A] font-mono">
                  {B4BAPP_SOFTWARE.name} • {B4BAPP_SOFTWARE.category}
                </span>
              </div>

              {/* White Heading */}
              <h2 className="text-[28px] lg:text-[36px] font-extrabold font-heading text-white tracking-tight leading-tight">
                Enterprise CRM & ERP Designed For Small Business Pros
              </h2>

              {/* Body text in luminous crisp blue-50, clean readability */}
              <p className="text-[16px] text-blue-50 leading-relaxed font-normal">
                {B4BAPP_SOFTWARE.description}
              </p>

              {/* 3 Core Capability Highlights - Halka Blue (Light Blue Frosted Glass) Cards */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-gradient-to-r from-sky-500/25 to-blue-600/20 hover:from-sky-500/35 hover:to-blue-600/30 backdrop-blur-xl border border-sky-300/40 hover:border-sky-200/80 shadow-[0_8px_24px_rgba(14,165,233,0.16)] transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md border border-sky-200/50">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[18px] font-extrabold text-white font-heading tracking-tight leading-snug">
                      Automated Job Costing & Invoicing
                    </h4>
                    <p className="text-[15px] text-blue-50 leading-relaxed font-normal">
                      Instant PO management, inventory descriptions for up to 100 service products, and procurement tracking.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-gradient-to-r from-sky-500/25 to-blue-600/20 hover:from-sky-500/35 hover:to-blue-600/30 backdrop-blur-xl border border-sky-300/40 hover:border-[#F8C61A]/80 shadow-[0_8px_24px_rgba(14,165,233,0.16)] transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F8C61A] to-[#F5B800] text-[#07142B] flex items-center justify-center shrink-0 shadow-md font-bold border border-white/40">
                    <Activity className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[18px] font-extrabold text-white font-heading tracking-tight leading-snug">
                      Pipeline & Deal Tracking
                    </h4>
                    <p className="text-[15px] text-blue-50 leading-relaxed font-normal">
                      White-label CRM lead intake, automated communication feeds, and conversion analytics for Biz Pros.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-gradient-to-r from-sky-500/25 to-blue-600/20 hover:from-sky-500/35 hover:to-blue-600/30 backdrop-blur-xl border border-sky-300/40 hover:border-sky-200/80 shadow-[0_8px_24px_rgba(14,165,233,0.16)] transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md border border-sky-200/50">
                    <TrendingUp className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[18px] font-extrabold text-white font-heading tracking-tight leading-snug">
                      Bulletin Sales Scoreboard & Career Ladder
                    </h4>
                    <p className="text-[15px] text-blue-50 leading-relaxed font-normal">
                      Real-time category leaderboards and 9-tier Biz Pro career progression from Account Executive to Senior National VP.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Box - Halka Blue Frosted Glass with Gold Accent */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-600/30 via-blue-600/25 to-sky-500/25 backdrop-blur-2xl border border-sky-300/45 shadow-[0_12px_36px_rgba(14,165,233,0.22)] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="space-y-1">
                  <p className="text-[12px] font-extrabold text-[#F8C61A] tracking-wider uppercase font-mono">
                    Biz Pro Access Subscription
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#F8C61A] font-heading tracking-tight">
                      $25
                    </span>
                    <span className="text-[15px] font-bold text-white">
                      / month
                    </span>
                  </div>
                  <p className="text-[14px] text-blue-100/90 leading-relaxed">
                    Entry subscription for Biz Pros, scales with ranking
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => navigate('/portal/login')}
                    className="btn-gold-dark"
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

            {/* Right Column: Halka Blue Frosted Glass Card holding Corporate Philosophy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-sky-600/25 via-[#1658B3]/30 to-sky-700/25 backdrop-blur-2xl border border-sky-300/40 p-6 sm:p-8 space-y-6 text-left shadow-[0_16px_48px_rgba(2,132,199,0.25)] relative">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-sky-200/25 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-5 h-5 text-[#F8C61A]" />
                    <h3 className="text-[18px] sm:text-[20px] font-extrabold text-white font-heading tracking-tight">
                      Corporate Philosophy & 5 Foundations
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F8C61A]/15 text-[#F8C61A] border border-[#F8C61A]/30">
                    B4B MANTRA
                  </span>
                </div>

                {/* Quote Box with Clean Structure */}
                <div className="p-4 rounded-xl bg-sky-500/15 border border-sky-300/30 backdrop-blur-md space-y-2">
                  <p className="text-[15px] sm:text-[16px] text-white/95 leading-relaxed italic font-body">
                    "{BRAND_IDENTITY.vision}."
                  </p>
                  <p className="text-[14px] text-blue-100">
                    The B4B America Mantra:{' '}
                    <strong className="text-[#F8C61A] font-mono font-bold not-italic">
                      {BRAND_IDENTITY.mantra}
                    </strong>
                  </p>
                </div>

                {/* 5 Mantra Step Boxes with Halka Blue Translucent Cards & Crisp Text */}
                <div className="space-y-3">
                  {BRAND_IDENTITY.mantraSteps.map((step) => (
                    <div
                      key={step.step}
                      className="p-3.5 sm:p-4 rounded-xl bg-sky-500/20 hover:bg-sky-400/30 border border-sky-200/35 hover:border-[#F8C61A]/70 backdrop-blur-md flex items-center justify-between gap-4 transition-all duration-200 group shadow-xs"
                    >
                      <div className="flex items-start gap-3.5">
                        <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F8C61A]/25 to-[#F8C61A]/10 border border-[#F8C61A]/40 text-[#F8C61A] font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform mt-0.5">
                          {step.step}
                        </span>
                        <div className="space-y-0.5">
                          <p className="text-[16px] font-extrabold text-white font-heading tracking-wide">
                            {step.title}
                          </p>
                          <p className="text-[14px] text-blue-50 leading-relaxed font-normal">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-sky-200 shrink-0 group-hover:text-[#F8C61A] group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>

                {/* Footer with Gold label */}
                <div className="pt-3 border-t border-sky-200/25 flex items-center justify-between">
                  <span className="text-[14px] sm:text-[15px] text-blue-100 font-medium">
                    Biz Pro Career Framework:
                  </span>
                  <span className="text-[#F8C61A] font-bold font-mono text-[13px] sm:text-[14px]">
                    9-Tier Ranking Ladder
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4. INDUSTRIES WE SERVE (MATCHING SECTION 3 3D TECH BACKDROP)
          ========================================================================= */}
      <section className="py-20 text-white border-b border-sky-300/30 relative overflow-hidden">
        {/* Background Visual Layer matching Section 3 3D technology graphic and exact blue overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src={b4bappPreviewImg}
            alt="B4B Commercial Industries 3D backdrop"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-[#0A2A5E]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08204D]/75 via-[#0B2C68]/45 to-[#08204D]/25" />
        </div>

        {/* Ambient lighting accent matching Section 3 */}
        <div className="absolute top-1/2 left-1/3 w-[650px] h-[650px] bg-sky-400/25 rounded-full blur-3xl pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-300/40 text-xs font-bold text-[#F8C61A] font-mono shadow-sm">
                <Building2 className="w-3.5 h-3.5 text-[#F8C61A]" />
                <span>SECTOR SPECIALIZATION</span>
              </div>
              <h2 className="text-[28px] lg:text-[36px] font-extrabold font-heading text-white tracking-tight leading-tight">
                Industries We Serve
              </h2>
              <p className="text-base text-blue-100/90">
                Tailored solutions for 32 key business trades operating in towns and cities across America.
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs font-bold text-sky-300 font-mono">
                Click any trade to speak with a specialized coach
              </span>
            </div>
          </div>

          {/* Industries We Serve: 4 Photo Tiles Grid (4 cols desktop, 2 tablet, 1 mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_INDUSTRIES.map((ind) => {
              const IconComp = ind.icon
              return (
                <div
                  key={ind.id}
                  onClick={() => {
                    setActiveIndustryFilter(ind.name)
                    setCoachModalOpen(true)
                  }}
                  className="group relative rounded-2xl aspect-[4/3] overflow-hidden cursor-pointer bg-gradient-to-r from-sky-500/25 to-blue-600/20 hover:from-sky-500/35 hover:to-blue-600/30 backdrop-blur-xl border border-sky-300/40 hover:border-sky-200/80 shadow-[0_8px_24px_rgba(14,165,233,0.16)] hover:shadow-[0_16px_40px_rgba(14,165,233,0.28)] hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Photo or Deep Navy Fallback */}
                  {ind.image ? (
                    <img
                      src={ind.image}
                      alt={ind.name}
                      loading="lazy"
                      className="tile-img"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-sky-600/25 via-[#1658B3]/30 to-sky-700/25 flex items-center justify-center p-6 relative">
                      {IconComp && (
                        <div className="w-16 h-16 rounded-2xl bg-sky-500/20 border border-sky-200/35 flex items-center justify-center text-[#F8C61A] group-hover:scale-110 transition-transform duration-300">
                          <IconComp className="w-8 h-8 stroke-[1.75]" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Navy Gradient Overlay (~65% from bottom) */}
                  <div className="tile-overlay" />

                  {/* Industry Title: White, 18px semibold, bottom-left with hover gold underline */}
                  <div className="tile-title">
                    <span className="tile-title-underline">
                      {ind.name}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick link to explore all 32 commercial trade sectors */}
          <div className="pt-2 text-center">
            <button
              onClick={() => {
                setActiveIndustryFilter('')
                setCoachModalOpen(true)
              }}
              className="inline-flex items-center gap-2 text-sm font-bold text-sky-300 hover:text-[#F8C61A] hover:underline font-mono min-h-[44px] cursor-pointer"
            >
              <span>Explore tailored solutions for all 32 commercial trade sectors</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5. ADVISORY INTAKE & DEMO DESK (MATCHING SECTION 3 3D TECH BACKDROP)
          ========================================================================= */}
      <section className="py-20 text-white border-b border-[#0D2147] relative overflow-hidden">
        {/* Background Visual Layer matching Section 3 3D technology graphic and exact blue overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src={b4bappPreviewImg}
            alt="B4B Advisory Intake 3D backdrop"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-[#0A2A5E]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08204D]/75 via-[#0B2C68]/45 to-[#08204D]/25" />
        </div>

        {/* Ambient lighting accent matching Section 3 */}
        <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] bg-sky-400/25 rounded-full blur-3xl pointer-events-none z-[1]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-sky-600/25 via-[#103E7E]/35 to-sky-700/25 backdrop-blur-2xl rounded-3xl border border-sky-300/40 shadow-[0_20px_60px_rgba(2,132,199,0.25)] p-8 sm:p-12 overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Platform Demo Pitch & Visuals */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-300/40 text-xs font-bold text-[#F8C61A] font-mono shadow-sm">
                  <Play className="w-3.5 h-3.5 text-[#F8C61A] fill-current" />
                  <span>ON-DEMAND ADVISORY DESK</span>
                </div>

                <h2 className="text-[28px] lg:text-[36px] font-extrabold font-heading text-white tracking-tight leading-tight">
                  Speak with a Business Coach
                </h2>

                <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                  Book a consultation or live system walkthrough with an executive business coach. 
                  Learn how to optimize working capital, POS rates, and software workflow across all 16 solutions.
                </p>

                <div className="space-y-3 pt-2 text-xs text-white font-medium">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-sky-500/20 border border-sky-200/35 backdrop-blur-md shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#F8C61A] shrink-0" />
                    <span>Dedicated 1-on-1 business coach review</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-sky-500/20 border border-sky-200/35 backdrop-blur-md shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#F8C61A] shrink-0" />
                    <span>Custom solutions blueprint tailored to your trade sector</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-sky-500/20 border border-sky-200/35 backdrop-blur-md shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#F8C61A] shrink-0" />
                    <span>Capital guidance across 12 Federal Reserve Divisions</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-sky-500/15 border border-sky-300/30 backdrop-blur-md flex items-center gap-4 text-xs font-mono text-blue-100">
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

              {/* Right Column: Embedded Consultation Intake Form (Halka Blue Glassmorphic Card) */}
              <div className="lg:col-span-7 bg-gradient-to-br from-sky-600/25 via-[#1658B3]/30 to-sky-700/25 backdrop-blur-2xl p-6 sm:p-8 rounded-2xl border border-sky-300/40 shadow-[0_16px_48px_rgba(2,132,199,0.25)] text-white advisory-form-glass">
                <div className="space-y-2 mb-6 text-left border-b border-sky-200/25 pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-extrabold font-heading text-white">
                      Schedule Executive Consultation
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-[#F8C61A] font-bold border border-sky-300/40">
                      ⚡ 60-Second Setup
                    </span>
                  </div>
                  <p className="text-xs text-blue-100">
                    Connect directly with a dedicated coach within 1 business hour.
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
          SECTION 6. FOOTER (MIDNIGHT BAND: Midnight Navy #07142B)
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
