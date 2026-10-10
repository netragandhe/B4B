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
    <div className="min-h-screen bg-[#EEF1EC] text-[#14231E] transition-colors duration-200 overflow-x-hidden font-body">
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

      {/* Corporate Fixed Navbar: Forest Black (#06201A) */}
      <Navbar onOpenCoachModal={() => setCoachModalOpen(true)} />

      {/* =========================================================================
          SECTION 1. HERO: Dark (#06201A Forest Black) with Real Photographic Slot
          ========================================================================= */}
      <PhotoBackground
        slot="hero"
        alt="American small business owner in a real storefront or workshop"
        overlayOpacity={0.72}
        isPriority
        className="pt-10 pb-24 md:pt-16 md:pb-32 text-white border-b border-[#0B4A3A]/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Asymmetric, Confident Typography */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-7 text-left"
            >
              {/* National Network Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B4A3A]/60 border border-[#0B4A3A] shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C8793A] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#B9CBC3] font-mono">
                  {BRAND_IDENTITY.name} • 12 Territory Divisions
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C8793A] text-[#06201A] font-extrabold font-mono">
                  Coast-to-Coast
                </span>
              </div>

              {/* Tagline as Main Headline (Sora, Bold, Large, Tight) */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-heading text-white leading-[1.04] tracking-tight">
                  {BRAND_IDENTITY.tagline.split('Small Business')[0]}
                  <span className="relative inline-block text-[#C8793A]">
                    Small Business
                    <span className="absolute -bottom-1 left-0 w-full h-2 bg-[#C8793A]/25 -z-10 rounded-sm" />
                  </span>{' '}
                  Solutions.
                </h1>
                <p className="text-lg sm:text-xl font-bold text-[#B9CBC3] font-heading">
                  {BRAND_IDENTITY.subTagline}
                </p>
              </div>

              {/* Client Mission Statement Excerpt */}
              <p className="text-base sm:text-lg text-[#B9CBC3] max-w-2xl leading-relaxed font-normal">
                {BRAND_IDENTITY.mission}
              </p>

              {/* TWO MANDATORY CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                {/* CTA 1: "Speak with a Business Coach" (Copper Fill, Forest Black Text, Arrow Right Hover) */}
                <button
                  onClick={() => setCoachModalOpen(true)}
                  className="btn-copper-dark group"
                >
                  <PhoneCall className="w-4 h-4 text-[#06201A] shrink-0" />
                  <span>Speak with a Business Coach</span>
                  <ArrowRight className="w-4 h-4 text-[#06201A] transition-transform group-hover:translate-x-1 shrink-0" />
                </button>

                {/* CTA 2: "Explore 16 Solutions" (Secondary Outline 1.5px, No Fill) */}
                <button
                  onClick={() => {
                    const el = document.getElementById('solutions-showcase')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="btn-outline-dark group"
                >
                  <span>Explore 16 Solutions</span>
                  <ArrowRight className="w-4 h-4 text-[#B9CBC3] transition-transform group-hover:translate-x-1 shrink-0" />
                </button>
              </div>

              {/* Fact Indicators (Tabular Numbers in Copper #C8793A) */}
              <div className="pt-4 border-t border-[#0B4A3A] grid grid-cols-3 gap-4 max-w-xl text-left font-mono">
                <div>
                  <p className="text-3xl font-extrabold text-[#C8793A] tabular-nums">16</p>
                  <p className="text-xs text-[#B9CBC3] uppercase tracking-wider">Core Solutions</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-[#C8793A] tabular-nums">12</p>
                  <p className="text-xs text-[#B9CBC3] uppercase tracking-wider">Federal Divisions</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-[#C8793A] tabular-nums">32+</p>
                  <p className="text-xs text-[#B9CBC3] uppercase tracking-wider">Trade Sectors</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Interactive Territory Desk Card (Deep Emerald #0B4A3A with Copper Highlights) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative bg-[#06201A] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#0B4A3A] overflow-hidden">
                <div className="relative z-10 space-y-6">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-[#0B4A3A] pb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C8793A] animate-ping" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C8793A] font-mono">
                        Territory Network Desk
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#B9CBC3]">
                      Federal Reserve Grid
                    </span>
                  </div>

                  {/* Active Selected Territory Display */}
                  <div className="p-4 rounded-2xl bg-[#0B4A3A]/40 border border-[#0B4A3A] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#C8793A] font-mono">
                        Division #{selectedTerritory.regionNumber} of 12
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#06201A] text-[#B9CBC3] border border-[#0B4A3A] font-mono">
                        HQ: {selectedTerritory.headOffice}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-white font-heading">
                      {selectedTerritory.name}
                    </h3>
                    <p className="text-xs text-[#B9CBC3] leading-relaxed">
                      <strong className="text-white">States Covered:</strong>{' '}
                      {selectedTerritory.coverage}
                    </p>
                  </div>

                  {/* Quick Division Selector Pills */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#B9CBC3] font-mono">
                      Select Regional Division
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                      {TERRITORY_DIVISIONS.map((terr) => (
                        <button
                          key={terr.id}
                          onClick={() => setSelectedTerritoryId(terr.id)}
                          className={`px-2 py-1.5 rounded-lg text-xs font-medium font-mono transition-all truncate text-center ${
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
                    <span className="text-[#B9CBC3]">Regional assistance:</span>
                    <button
                      onClick={() => setCoachModalOpen(true)}
                      className="text-[#C8793A] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer font-mono"
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
      </PhotoBackground>

      {/* Angled Divider: Dark into Soft Stone */}
      <div className="w-full h-8 bg-[#06201A] divider-angled-dark -mt-1 pointer-events-none" />

      {/* =========================================================================
          SECTION 2. STATS BAR: Soft Stone (#EEF1EC) with Tabular Copper Digits
          ========================================================================= */}
      <section className="py-12 bg-[#EEF1EC] border-b border-[#14231E]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {VERIFIED_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-left space-y-1 p-3 rounded-xl bg-white border border-[#14231E]/10 shadow-xs"
              >
                <p className="text-3xl sm:text-4xl font-extrabold font-mono text-[#C8793A] tabular-nums tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs font-bold text-[#14231E] font-heading">
                  {stat.label}
                </p>
                <p className="text-[11px] text-[#14231E]/70 leading-tight font-body">
                  {stat.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3. 16 SOLUTIONS: Soft Stone (#EEF1EC) with White Cards
          ========================================================================= */}
      <section id="solutions-showcase" className="py-20 md:py-28 bg-[#EEF1EC] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#14231E]/15 text-xs font-bold text-[#0E7A5A] font-mono">
                <Layers className="w-3.5 h-3.5" />
                <span>The B4B Business Solutions Network</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#14231E] tracking-tight">
                16 Solutions Every Small Business Needs To Thrive
              </h2>
              <p className="text-base text-[#14231E]/75 font-body">
                Explore all sixteen specialized capabilities designed to protect, fund, and scale Main Street companies across America.
              </p>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Finance', 'Growth', 'Operations', 'Technology'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer font-mono ${
                    activeCategory === cat
                      ? 'bg-[#0E7A5A] text-white shadow-sm'
                      : 'bg-white text-[#14231E] border border-[#14231E]/15 hover:bg-[#EEF1EC]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 16 Solutions Grid: White Cards on Soft Stone */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSolutions.map((solution, idx) => {
              const IconComponent = iconMap[solution.iconName] || Layers

              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (idx % 4) * 0.08 }}
                  className="relative group bg-white border border-[#14231E]/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#0E7A5A] hover:-translate-y-1 hover:shadow-xl transition-all"
                >
                  <div className="space-y-4">
                    {/* Header: Number Badge + Group Tag + Icon */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black font-mono px-2 py-0.5 rounded bg-[#06201A] text-[#C8793A]">
                          #{solution.number}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEF1EC] text-[#0E7A5A] border border-[#14231E]/10 font-mono">
                          {solution.category}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#EEF1EC] text-[#0E7A5A] flex items-center justify-center group-hover:bg-[#0E7A5A] group-hover:text-white transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-extrabold text-[#14231E] group-hover:text-[#0E7A5A] transition-colors leading-snug font-heading">
                      {solution.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-[#14231E]/70 leading-relaxed font-body">
                      {solution.shortDesc}
                    </p>
                  </div>

                  {/* MANDATORY ACTIONS PER CLIENT RULES (BOTH BUTTONS ON EVERY CARD): */}
                  <div className="pt-6 mt-6 border-t border-[#14231E]/10 space-y-2.5">
                    {/* Primary Button On Light: Emerald Fill, White Text, 48px Height, Arrow Right */}
                    <button
                      onClick={() => setCoachModalOpen(true)}
                      className="btn-emerald-light w-full group/btn"
                    >
                      <PhoneCall className="w-4 h-4 text-white shrink-0" />
                      <span>{solution.ctaText}</span>
                      <ArrowRight className="w-4 h-4 text-white transition-transform group-hover/btn:translate-x-1 shrink-0" />
                    </button>

                    {/* Secondary Button On Light: 1.5px Outline, No Fill, 48px Height */}
                    <Link
                      to={`/solutions#${solution.slug}`}
                      className="btn-outline-light w-full group/link"
                    >
                      <span>Click Here</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4. CRM / ERP (B4BAPP): Dark (#06201A Forest Black) with Photo Slot
          ========================================================================= */}
      <PhotoBackground
        slot="b4bapp"
        alt="Laptop or phone with a dashboard for B4BAPP CRM and ERP"
        overlayOpacity={0.72}
        className="py-20 md:py-28 text-white border-y border-[#0B4A3A]/70"
      >
        <div id="software" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Software Overview */}
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

              <p className="text-base text-[#B9CBC3] leading-relaxed font-body">
                {B4BAPP_SOFTWARE.description}
              </p>

              {/* Pricing Box in Copper Tabular Numbers */}
              <div className="p-4 rounded-2xl bg-[#06201A] border border-[#0B4A3A] flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#B9CBC3] font-mono uppercase">Biz Pro Access Subscription</p>
                  <p className="text-2xl font-extrabold text-[#C8793A] font-mono tabular-nums">
                    {B4BAPP_SOFTWARE.pricing}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/portal/login')}
                  className="btn-copper-dark"
                >
                  Portal Login
                </button>
              </div>

              {/* CRM vs ERP Dual Feature Cards in Deep Emerald (#0B4A3A) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#0B4A3A]/50 border border-[#0B4A3A] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8793A] flex items-center gap-1.5 font-mono">
                    <Users className="w-4 h-4" />
                    <span>CRM Features</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#B9CBC3] font-body">
                    {B4BAPP_SOFTWARE.crmFeatures.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C8793A] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#0B4A3A]/50 border border-[#0B4A3A] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E7A5A] flex items-center gap-1.5 font-mono text-white">
                    <Layers className="w-4 h-4" />
                    <span>ERP Features</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#B9CBC3] font-body">
                    {B4BAPP_SOFTWARE.erpFeatures.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0E7A5A] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Scoreboard & Ranks */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#06201A] border border-[#0B4A3A] space-y-5 text-left shadow-xl">
                <div className="flex items-center justify-between border-b border-[#0B4A3A] pb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#C8793A]" />
                    <h3 className="text-base font-extrabold text-white font-heading">
                      {B4BAPP_SOFTWARE.scoreboard.title}
                    </h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0B4A3A] text-[#B9CBC3] font-mono">
                    Live Telemetry
                  </span>
                </div>

                <p className="text-xs text-[#B9CBC3] leading-relaxed font-body">
                  {B4BAPP_SOFTWARE.scoreboard.desc}
                </p>

                {/* Ranking Career Progression Ladder */}
                <div className="space-y-2 pt-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#B9CBC3] font-mono">
                    Biz Pro Career Ranking Structure
                  </p>
                  <div className="space-y-1.5">
                    {B4BAPP_SOFTWARE.ranks.slice(0, 5).map((rank, i) => (
                      <div
                        key={rank}
                        className="flex items-center justify-between p-2 rounded-xl bg-[#0B4A3A]/40 border border-[#0B4A3A] text-xs font-mono"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#06201A] text-[#C8793A] text-[10px] font-bold flex items-center justify-center">
                            {i + 1}
                          </span>
                          <span className="font-semibold text-white">{rank}</span>
                        </div>
                        <span className="text-[10px] text-[#B9CBC3]">Commission Tier {i + 1}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#B9CBC3] text-right pt-1 font-mono">
                    + Scales to Senior National Channel VP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PhotoBackground>

      {/* =========================================================================
          SECTION 5. PHILOSOPHY & 5 FOUNDATIONS: Deep Emerald (#0B4A3A) with Photo Slot
          ========================================================================= */}
      <PhotoBackground
        slot="philosophy"
        alt="American business owner at work in natural light"
        overlayOpacity={0.70}
        className="py-20 md:py-28 bg-[#0B4A3A] text-white border-b border-[#06201A]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          {/* Vision Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06201A] text-xs font-bold text-[#C8793A] border border-[#0B4A3A] font-mono">
              <Compass className="w-3.5 h-3.5" />
              <span>Corporate Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
              "{BRAND_IDENTITY.vision}"
            </h2>
            <p className="text-base text-[#B9CBC3] leading-relaxed font-body">
              Rooted in the grit and perseverance of America's local business owners.
            </p>
          </div>

          {/* 5 Mantra Steps */}
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-[#C8793A] font-mono">
                The B4B America Mantra
              </p>
              <h3 className="text-2xl font-black text-white font-heading">
                {BRAND_IDENTITY.mantra}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {BRAND_IDENTITY.mantraSteps.map((step) => (
                <div
                  key={step.step}
                  className="p-5 rounded-2xl bg-[#06201A]/80 border border-[#0B4A3A] space-y-2 text-left hover:border-[#C8793A] transition-all group"
                >
                  <span className="text-2xl font-black font-mono text-[#C8793A] group-hover:scale-105 transition-transform inline-block">
                    {step.step}
                  </span>
                  <h4 className="text-base font-extrabold text-white font-heading">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#B9CBC3] leading-relaxed font-body">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 5 Core Pillars */}
          <div className="pt-8 border-t border-[#06201A] space-y-6">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[#C8793A] font-mono">
                Core Foundations
              </p>
              <h3 className="text-xl font-extrabold text-white font-heading">
                5 Foundations of Sustainable Small Business Growth
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-left">
              {BRAND_IDENTITY.pillars.map((pillar, i) => (
                <div
                  key={pillar.title}
                  className="p-5 rounded-2xl bg-[#06201A]/80 border border-[#0B4A3A] space-y-2 hover:border-[#C8793A] transition-all"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#0B4A3A] text-[#C8793A] text-xs font-mono font-bold flex items-center justify-center">
                    0{i + 1}
                  </span>
                  <h4 className="text-sm font-extrabold text-white font-heading">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#B9CBC3] leading-relaxed font-body">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PhotoBackground>

      {/* =========================================================================
          SECTION 6. INDUSTRIES WE SERVE: Soft Stone (#EEF1EC)
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#EEF1EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#14231E]/15 text-xs font-bold text-[#0E7A5A] font-mono">
                <Building2 className="w-3.5 h-3.5" />
                <span>Sector Versatility</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#14231E] tracking-tight">
                Industries We Serve
              </h2>
              <p className="text-base text-[#14231E]/75 font-body">
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
                className="p-3.5 rounded-xl bg-white border border-[#14231E]/10 text-left hover:border-[#0E7A5A] hover:-translate-y-0.5 hover:shadow-md transition-all group cursor-pointer"
              >
                <p className="text-xs font-bold text-[#14231E] group-hover:text-[#0E7A5A] transition-colors line-clamp-2 font-heading">
                  {industry}
                </p>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-[#14231E]/60 group-hover:text-[#0E7A5A] font-mono font-semibold">
                  <span>Match Coach</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7. CONTACT: Emerald-to-Forest Gradient with Photo Slot
          ========================================================================= */}
      <PhotoBackground
        slot="contact"
        alt="Business coach meeting an entrepreneur"
        overlayOpacity={0.72}
        className="py-20 md:py-28 section-contact border-t border-[#0B4A3A]"
      >
        <div id="contact-desk" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-[#06201A]/90 backdrop-blur-md rounded-3xl border border-[#0B4A3A] shadow-2xl p-8 sm:p-12 overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Pitch Column */}
              <div className="lg:col-span-5 space-y-5 text-left text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B4A3A] text-xs font-bold text-[#C8793A] font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#C8793A]" />
                  <span>1 Business Hour Callback</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                  Speak with a Business Coach Today
                </h2>

                <p className="text-sm text-[#B9CBC3] leading-relaxed font-body">
                  Connect directly with a dedicated B4B America advisor. We review your working
                  capital options, payment processing rates, and software workflow with zero
                  high-pressure sales tactics.
                </p>

                <div className="space-y-3 pt-2 text-xs text-white font-medium font-body">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C8793A] shrink-0" />
                    <span>30-minute free diagnostic review</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C8793A] shrink-0" />
                    <span>Custom blueprint tailored to your trade</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C8793A] shrink-0" />
                    <span>Fiduciary non-dilutive capital guidance</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#0B4A3A] text-xs text-[#B9CBC3] font-mono">
                  <p className="font-semibold text-white">Corporate Inquiries:</p>
                  <p>advisory@b4bamerica.com • +1 (888) 540-B4BA</p>
                </div>
              </div>

              {/* Embedded Form in Clean White Container */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#14231E]/15 shadow-xl text-[#14231E]">
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
      </PhotoBackground>

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
