import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  Building2,
  Clock,
  DollarSign,
  TrendingUp,
  Bot,
  MessageSquare,
  HelpCircle,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Tabs } from '@/components/ui/Tabs'
import { CountUp } from '@/components/ui/CountUp'
import { CoachRequestModal, CoachLeadForm } from '@/components/forms/CoachRequestModal'
import { SEOHead } from '@/components/seo/SEOHead'
import {
  SOLUTIONS_DATA,
  INDUSTRIES_SERVED,
  HOW_IT_WORKS_STEPS,
  TESTIMONIALS_DATA,
} from '@/mock-data/solutions'
import { brandConfig } from '@/config/brand'

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const [coachModalOpen, setCoachModalOpen] = useState(false)
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [visionTab, setVisionTab] = useState('vision')
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0)

  // Map icon names to Lucide icon components
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

  // Next / Prev Testimonials
  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length)
  }
  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length)
  }

  const currentTestimonial = TESTIMONIALS_DATA[activeTestimonialIdx]

  return (
    <div className="space-y-24 pb-16 text-left">
      <SEOHead
        title="Small Business Financing, Credit & Coaching"
        description="The Connection for Small Business Solutions. Access 16 solutions: business loans, building business credit, fractional CFO advisory, and payment processing."
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        {/* Animated ambient gradient backdrops */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[480px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/15 to-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-900/60 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300">
                  {brandConfig.brandName} • National SMB Advisory & Capital
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 dark:text-white leading-[1.08] tracking-tight">
                {brandConfig.tagline}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Connect your business to 16 vital solutions—from non-dilutive credit lines and building PAYDEX 80+ credit to lower merchant processing fees, custom websites, and dedicated 1-on-1 business coaches.
              </p>

              {/* Two CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  pill
                  onClick={() => setCoachModalOpen(true)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="shadow-lg shadow-blue-600/25 text-base font-bold"
                >
                  Speak with a Business Coach
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  pill
                  onClick={() => {
                    const el = document.getElementById('solutions-grid')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-base font-semibold"
                >
                  Explore 16 Solutions
                </Button>
              </div>

              {/* Trust Subtext */}
              <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>No upfront fees</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Soft check pre-qualification</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>1-on-1 dedicated coach</span>
                </span>
              </div>
            </div>

            {/* Right Column: Floating Glass Cards & Live Stats */}
            <div className="lg:col-span-5 relative space-y-4">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 opacity-20 blur-xl pointer-events-none" />

              {/* Floating Glass Stat Card 1: Funding Secured */}
              <Card variant="bento" className="p-5 relative shadow-xl border-slate-200 dark:border-[#1E3A5F] animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/25">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Capital Sourced & Funded
                      </span>
                      <div className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                        <CountUp value={240} prefix="$" suffix="M+" />
                      </div>
                    </div>
                  </div>
                  <Badge variant="emerald" size="sm" dot>
                    Verified
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Prime-linked revolvers, SBA 7(a) packages & revenue-based funding.
                </p>
              </Card>

              {/* Floating Glass Stat Card 2: Businesses Helped */}
              <Card variant="bento" className="p-5 relative shadow-xl border-slate-200 dark:border-[#1E3A5F]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/25">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Independent Businesses Helped
                      </span>
                      <div className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                        <CountUp value={12400} suffix="+" />
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    ★ 4.9 / 5.0
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Restaurants, freight, clinics, churches, contractors, and retail shops.
                </p>
              </Card>

              {/* Floating Glass Stat Card 3: States Covered */}
              <Card variant="bento" className="p-5 relative shadow-xl border-slate-200 dark:border-[#1E3A5F]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/25">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        National Coverage
                      </span>
                      <div className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                        50 States
                      </div>
                    </div>
                  </div>
                  <Badge variant="gold" size="sm">
                    Coast to Coast
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Dedicated regional advisory partners and local lender syndication.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP WITH INDUSTRY CHIPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Industry-Specific Solutions
              </p>
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Tailored Solutions for Every Trade Across America
              </h3>
            </div>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              Click an industry to filter solutions below
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {INDUSTRIES_SERVED.map((ind) => {
              const isSelected = selectedIndustry === ind.name
              return (
                <button
                  key={ind.name}
                  onClick={() => setSelectedIndustry(isSelected ? null : ind.name)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-[#12294A] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#1A3760]'
                  }`}
                >
                  <span>{ind.name}</span>
                  <span className="text-[10px] opacity-75 font-normal hidden sm:inline">
                    ({ind.highlight})
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. "16 SOLUTIONS EVERY SMALL BUSINESS NEEDS TO THRIVE" BENTO GRID */}
      <section id="solutions-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="primary" size="md">
            The Complete Ecosystem
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            16 Solutions Every Small Business Needs to Thrive
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            From funding and credit building to payment terminals, custom branding, and cyber security—we connect your business with institutional tools at wholesale small-business pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {SOLUTIONS_DATA.map((sol) => {
            const IconComponent = iconMap[sol.iconName] || Briefcase
            return (
              <Link
                key={sol.id}
                to={`/solutions/${sol.slug}`}
                className="group block h-full text-left focus:outline-none"
              >
                <Card
                  variant="default"
                  hover
                  className="p-5 h-full flex flex-col justify-between transition-all duration-200 group-hover:border-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/10"
                >
                  <div>
                    {/* Icon & Badge Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <Badge variant="outline" size="sm" className="text-[10px]">
                        {sol.badge}
                      </Badge>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {sol.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                      {sol.shortDesc}
                    </p>

                    {sol.pricingNote && (
                      <div className="mt-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        Starts around $2,500
                      </div>
                    )}
                  </div>

                  {/* Footer link */}
                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* 4. VISION / MISSION / VALUES TABS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card variant="bento" className="p-8 sm:p-12 border-blue-200 dark:border-[#1E3A5F] shadow-xl text-left">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <Badge variant="navy" size="md">
              Our Core Identity
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white mt-2">
              Driven by Real American Entrepreneurship
            </h2>
          </div>

          <div className="flex justify-center mb-8">
            <Tabs
              variant="segmented"
              activeTab={visionTab}
              onChange={setVisionTab}
              tabs={[
                { id: 'vision', label: 'Our Vision' },
                { id: 'values', label: 'Our Core Values' },
                { id: 'mission', label: 'Our Mission' },
              ]}
            />
          </div>

          <div className="animate-fadeIn">
            {/* Vision Tab */}
            {visionTab === 'vision' && (
              <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50/80 to-white dark:from-[#12294A] dark:to-[#0D1E36] border border-blue-100 dark:border-[#1E3A5F] text-center space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  The OAL Vision
                </span>
                <blockquote className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white leading-snug">
                  "The Little Engine That Could, Made All The Small Businesses In America Thrive."
                </blockquote>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed pt-2">
                  No matter how small your start or how steep the financial mountain looks, with the right track, the right engine, and the right partners, every independent business owner can cross the finish line.
                </p>
              </div>
            )}

            {/* Values Tab */}
            {visionTab === 'values' && (
              <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-50/80 to-white dark:from-[#12294A] dark:to-[#0D1E36] border border-amber-200 dark:border-[#1E3A5F] text-center space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                  Our Uncompromising Values
                </span>
                <blockquote className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white leading-snug">
                  "Dreamers, Wake Up, Write A Plan, Design It, Be Ambitious NOW Execute!"
                </blockquote>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-4 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <div className="p-3 rounded-xl bg-white dark:bg-[#0A1628] border">1. Wake Up</div>
                  <div className="p-3 rounded-xl bg-white dark:bg-[#0A1628] border">2. Write A Plan</div>
                  <div className="p-3 rounded-xl bg-white dark:bg-[#0A1628] border">3. Design It</div>
                  <div className="p-3 rounded-xl bg-white dark:bg-[#0A1628] border">4. Be Ambitious</div>
                  <div className="p-3 rounded-xl bg-emerald-600 text-white font-black shadow-md">5. NOW Execute!</div>
                </div>
              </div>
            )}

            {/* Mission Tab */}
            {visionTab === 'mission' && (
              <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-white dark:from-[#12294A] dark:to-[#0D1E36] border border-emerald-200 dark:border-[#1E3A5F] text-center space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  Our Daily Mission
                </span>
                <blockquote className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white leading-relaxed max-w-2xl mx-auto">
                  To democratize institutional capital, technology, and executive coaching for Main Street businesses without predatory fees or equity dilution.
                </blockquote>
                <p className="text-xs text-slate-500 max-w-xl mx-auto">
                  We stand as your trusted fiduciary bridge between community commercial dreams and national institutional funding.
                </p>
              </div>
            )}
          </div>
        </Card>
      </section>

      {/* 5. HOW IT WORKS (4-STEP TIMELINE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <Badge variant="emerald" size="md">
            The Process
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
            How OAL Network Propels Your Business
          </h2>
          <p className="text-sm text-slate-500">
            A simple, predictable 4-step execution framework from discovery to funded expansion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((st, i) => (
            <Card
              key={st.step}
              variant="default"
              className="p-6 relative flex flex-col justify-between hover:border-blue-400 transition-colors"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black font-heading text-sm mb-4 ring-4 ring-blue-500/10">
                  {st.step}
                </div>
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {st.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Step {i + 1} Milestone</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. AI ASSISTANT TEASER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#0A1628] via-[#12294A] to-[#1E3A8A] text-white p-8 sm:p-12 border border-blue-900/60 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Teaser Info */}
            <div className="lg:col-span-6 space-y-5">
              <Badge variant="gold" size="sm">
                Next-Gen SMB AI Assistant
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white leading-tight">
                Ask Questions. Model Scenarios. Get Instant Answers 24/7.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Our OAL Copilot combines knowledge from all 16 business solutions with real-time financial algorithms. Model loan repayments, verify credit tier requirements, or generate operational scripts in seconds.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Button
                  variant="accent"
                  size="md"
                  pill
                  onClick={() => {
                    const el = document.querySelector('button[aria-label="Open AI Business Advisor Chat"]') as HTMLButtonElement
                    if (el) el.click()
                  }}
                  leftIcon={<Bot className="w-4 h-4" />}
                >
                  Launch AI Copilot Now
                </Button>
                <span className="text-xs text-slate-400">Available on desktop & mobile</span>
              </div>
            </div>

            {/* Right Chat-Widget Mockup */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-white/95 dark:bg-[#0D1E36]/95 border border-white/20 dark:border-[#1E3A5F] shadow-2xl p-5 text-slate-800 dark:text-slate-100 text-xs space-y-3 backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                      <Bot className="w-4 h-4" />
                    </div>
                    <span className="font-bold">OAL Small Business Copilot</span>
                  </div>
                  <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Live Demo
                  </span>
                </div>

                {/* Simulated Conversation */}
                <div className="space-y-3 pt-1">
                  <div className="flex justify-end">
                    <div className="p-2.5 rounded-xl bg-blue-600 text-white max-w-[85%] rounded-br-xs">
                      How much working capital can I qualify for with $75,000 in monthly restaurant sales?
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#12294A] text-slate-800 dark:text-slate-200 max-w-[90%] rounded-bl-xs border border-slate-200 dark:border-slate-700 space-y-2">
                      <p>
                        Based on $75k monthly gross sales ($900k ARR), your restaurant can qualify for:
                      </p>
                      <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                        <li><strong>Revolving Credit Line:</strong> $150,000 – $210,000 at Prime + 1.5%</li>
                        <li><strong>Equipment Lease:</strong> Up to $100,000 for POS & kitchen upgrades</li>
                      </ul>
                      <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                        Would you like me to connect you with an OAL Restaurant Business Coach?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS CAROUSEL */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="emerald" size="md">
            Customer Stories
          </Badge>
          <h2 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
            Real Main Street Founders. Measurable Results.
          </h2>
        </div>

        <Card variant="bento" className="p-8 sm:p-12 border-slate-200 dark:border-[#1E3A5F] shadow-xl relative">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <img
              src={currentTestimonial.image}
              alt={currentTestimonial.name}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover shadow-lg border-2 border-blue-500/20 shrink-0"
            />
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-2">
                  {currentTestimonial.metric}
                </span>
              </div>

              <p className="text-base sm:text-lg italic text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                "{currentTestimonial.quote}"
              </p>

              <div>
                <h4 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                  {currentTestimonial.name}
                </h4>
                <p className="text-xs text-slate-500">
                  {currentTestimonial.business} • {currentTestimonial.location}
                </p>
              </div>
            </div>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Story {activeTestimonialIdx + 1} of {TESTIMONIALS_DATA.length}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                aria-label="Previous Testimonial"
                className="w-9 h-9 p-0 rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                aria-label="Next Testimonial"
                className="w-9 h-9 p-0 rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* 8. FINAL CTA BANNER WITH EMBEDDED LEAD FORM */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card variant="bento" className="p-8 sm:p-12 border-blue-300 dark:border-[#1E3A5F] shadow-2xl relative overflow-hidden bg-gradient-to-br from-white via-blue-50/40 to-emerald-50/30 dark:from-[#0D1E36] dark:via-[#12294A] dark:to-[#0A1628]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Pitch */}
            <div className="lg:col-span-5 space-y-4">
              <Badge variant="primary" size="md">
                Fast Response
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                Speak with a Business Coach Today
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Connect directly with a certified industry coach. We review your working capital needs, payment fees, credit profile, and strategic gameplan with zero high-pressure sales tactics.
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>30-minute free diagnostic review</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Custom blueprint tailored to your trade</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Direct phone callback within 1 business hour</span>
                </div>
              </div>
            </div>

            {/* Right Embedded Form */}
            <div className="lg:col-span-7 bg-white dark:bg-[#0A1628] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-[#1E3A5F] shadow-lg">
              <CoachLeadForm isInline />
            </div>
          </div>
        </Card>
      </section>

      {/* Global Coach Modal Triggered by hero button */}
      <CoachRequestModal
        isOpen={coachModalOpen}
        onClose={() => setCoachModalOpen(false)}
      />
    </div>
  )
}
