import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Briefcase,
  Sparkles,
  Zap,
  CheckCircle2,
  DollarSign,
  Building2,
  Lock,
  ChevronRight,
  Calculator,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CountUp } from '@/components/ui/CountUp'
import { brandConfig } from '@/config/brand'
import { CASE_STUDIES } from '@/mock-data/fintechData'
import { formatCurrency } from '@/lib/utils'

export const HomePage: React.FC = () => {
  const navigate = useNavigate()

  // Interactive Capital Estimator State
  const [monthlyRevenue, setMonthlyRevenue] = useState(225000)
  const [yearsInBusiness, setYearsInBusiness] = useState(3)
  const [industry, setIndustry] = useState('Logistics & Freight')

  // Dynamic estimate calculation
  const estimatedCapital = Math.min(Math.round(monthlyRevenue * 2.8), 3500000)
  const estimatedRate = yearsInBusiness >= 3 ? 'Prime + 1.5%' : 'Prime + 2.75%'

  return (
    <div className="space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-blue-600/10 dark:bg-blue-600/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-900/60 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300">
                  {brandConfig.tagline}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                Institutional Capital &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500">
                  Advisory Solutions
                </span>{' '}
                for Scaling Businesses.
              </h1>

              {/* Subhead */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Connect your business with non-dilutive credit facilities up to $5M, fractional CFO guidance, and real-time financial health scoring — with zero predatory warrants or equity dilution.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  pill
                  onClick={() => navigate('/apply')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="shadow-lg shadow-blue-600/25 text-base"
                >
                  Apply For Pre-Approval
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  pill
                  onClick={() => navigate('/portal/dashboard')}
                  leftIcon={<Lock className="w-4 h-4 text-emerald-500" />}
                  className="text-base"
                >
                  Open Client Portal
                </Button>
              </div>

              {/* Metrics Ribbon */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                    <CountUp value={240} prefix="$" suffix="M+" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Capital Arranged</p>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                    <CountUp value={48} suffix="h" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Underwriting Term</p>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-500">
                    <CountUp value={98.6} suffix="%" decimals={1} />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Advisory Success Rate</p>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Hero Glass Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-500 opacity-20 blur-xl" />
              
              <Card variant="bento" className="p-6 relative shadow-2xl border-slate-200 dark:border-[#1E3A5F]">
                {/* Header of Preview Card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#1E3A5F]/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold font-heading text-sm shadow-md">
                      AF
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Apex Freight & Logistics</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Institutional Member ID: #8892</p>
                    </div>
                  </div>
                  <Badge variant="emerald" size="sm" dot>
                    Active Facility
                  </Badge>
                </div>

                {/* Score and Main KPI */}
                <div className="py-5 space-y-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                        Pre-Approved Working Capital
                      </span>
                      <div className="text-3xl font-black font-heading text-slate-900 dark:text-white tracking-tight mt-1">
                        $850,000
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                        OAL Score
                      </span>
                      <div className="text-2xl font-black font-heading text-amber-500">
                        92 <span className="text-xs font-normal text-slate-400">/ 100</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-medium">
                      <span>Drawn: $320,000</span>
                      <span className="text-emerald-500 font-bold">Available: $530,000</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full w-[38%]" />
                    </div>
                  </div>

                  {/* Micro stats grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A]/60 border border-slate-200/60 dark:border-[#1E3A5F]/60">
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Cash Flow Runway</p>
                      <p className="text-base font-bold text-slate-800 dark:text-slate-200 mt-0.5">18.5 Months</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A]/60 border border-slate-200/60 dark:border-[#1E3A5F]/60">
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Assigned Partner</p>
                      <p className="text-base font-bold text-slate-800 dark:text-slate-200 mt-0.5">V. Hastings, CFO</p>
                    </div>
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="pt-4 border-t border-slate-100 dark:border-[#1E3A5F]/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Verified Underwriting
                  </span>
                  <Link
                    to="/portal/dashboard"
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>View Terminal Preview</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BENTO-GRID SOLUTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="primary" size="md">
            The OAL Advantage
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white mt-3">
            Structured for Companies Ready to Expand
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base mt-2">
            Traditional banks move slowly and take months. Venture capitalists ask for your equity. We provide flexible, institutional capital lines matched with veteran advisory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1: Revenue-Based Credit */}
          <Card
            variant="default"
            hover
            className="md:col-span-2 p-8 flex flex-col justify-between bg-gradient-to-br from-white via-white to-blue-50/40 dark:from-[#0D1E36] dark:via-[#0D1E36] dark:to-[#12294A]/40"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 shadow-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              <Badge variant="primary" size="sm" className="mb-2">
                Non-Dilutive Financing
              </Badge>
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                Revenue-Linked Capital & Revolving Lines
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-3 leading-relaxed max-w-xl">
                Draw from $100,000 to $5,000,000 to purchase inventory, acquire commercial equipment, or fulfill high-volume purchase orders. Payments dynamically adjust to your monthly cash receipts so you never suffer seasonal strain.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-[#1E3A5F] flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Prime + 1.25% starting rates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero equity warrants</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>12 to 36 month terms</span>
              </div>
            </div>
          </Card>

          {/* Bento Card 2: Fractional CFO */}
          <Card
            variant="default"
            hover
            className="p-8 flex flex-col justify-between bg-gradient-to-br from-white via-white to-emerald-50/40 dark:from-[#0D1E36] dark:via-[#0D1E36] dark:to-emerald-950/20"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 shadow-sm">
                <Briefcase className="w-6 h-6" />
              </div>
              <Badge variant="emerald" size="sm" className="mb-2">
                Executive Leadership
              </Badge>
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                Fractional CFO & Treasury Leadership
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-3 leading-relaxed">
                Direct access to seasoned corporate controllers and fractional CFOs. We audit your margins, manage debt service covenants, and prepare board-ready data rooms.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#1E3A5F]">
              <Link
                to="/advisory"
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Meet our CFO roster</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Bento Card 3: 48-Hour Speed */}
          <Card variant="default" hover className="p-8">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6 shadow-sm">
              <Zap className="w-6 h-6" />
            </div>
            <Badge variant="gold" size="sm" className="mb-2">
              Automated Intake
            </Badge>
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Rapid 48-Hour Term Sheet
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-3 leading-relaxed">
              Connect your accounting software or upload 3 bank statements. Our machine-assisted underwriting generates competitive terms in under two business days.
            </p>
          </Card>

          {/* Bento Card 4: Growth Diagnostics */}
          <Card variant="default" hover className="md:col-span-2 p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <Badge variant="navy" size="sm" className="mb-2">
                Enterprise Readiness
              </Badge>
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                M&A, Succession & Valuation Enhancements
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-3 leading-relaxed max-w-xl">
                Preparing for an acquisition or partner buyout? Our transaction specialists optimize EBITDA multiples, structure seller note supplements, and negotiate senior syndication.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
              <span className="text-xs text-slate-500">Average valuation lift: 28% prior to transaction</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/advisory')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Consulting Services
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. INTERACTIVE CAPITAL PRE-QUALIFICATION ESTIMATOR */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card variant="bento" className="p-8 sm:p-12 border-blue-200 dark:border-[#1E3A5F] shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200/80 dark:border-[#1E3A5F]">
            <div>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
                <Calculator className="w-4 h-4" />
                <span>Interactive Capital Estimator</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white mt-1">
                Estimate Your Working Capital Facility
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Calculate pre-qualified loan amounts and expected rate tier based on operating revenue.
              </p>
            </div>
            <Badge variant="emerald" size="lg" dot>
              No Impact to Credit
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 items-center">
            {/* Sliders */}
            <div className="space-y-6">
              {/* Slider 1: Monthly Revenue */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    Average Monthly Revenue
                  </label>
                  <span className="text-lg font-black font-heading text-blue-600 dark:text-blue-400">
                    {formatCurrency(monthlyRevenue)}
                  </span>
                </div>
                <input
                  type="range"
                  min={30000}
                  max={800000}
                  step={10000}
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>$30,000 / mo</span>
                  <span>$800,000+ / mo</span>
                </div>
              </div>

              {/* Slider 2: Years in Business */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    Time in Operation
                  </label>
                  <span className="text-lg font-black font-heading text-blue-600 dark:text-blue-400">
                    {yearsInBusiness} {yearsInBusiness === 1 ? 'Year' : 'Years'}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={yearsInBusiness}
                  onChange={(e) => setYearsInBusiness(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>1 Year Minimum</span>
                  <span>10+ Years</span>
                </div>
              </div>

              {/* Industry Select */}
              <div>
                <label className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 block mb-2">
                  Business Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white dark:bg-[#0D1E36] rounded-[10px] border border-slate-300 dark:border-[#1E3A5F] outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option>Logistics & Freight</option>
                  <option>B2B SaaS & Tech Services</option>
                  <option>Healthcare & Medical Practices</option>
                  <option>Manufacturing & Industrial</option>
                  <option>Wholesale & Distribution</option>
                </select>
              </div>
            </div>

            {/* Estimate Results Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-[#12294A] dark:via-[#0D1E36] dark:to-[#0A1628] border border-blue-200 dark:border-[#1E3A5F] text-center space-y-4 shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Estimated Pre-Qualified Facility
              </span>

              <div className="text-4xl sm:text-5xl font-black font-heading text-slate-900 dark:text-white tracking-tight">
                {formatCurrency(estimatedCapital)}
              </div>

              <div className="grid grid-cols-2 gap-3 py-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Indicative Pricing</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    {estimatedRate}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Funding Speed</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">
                    48 - 72 Hours
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                pill
                onClick={() => navigate('/apply')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full text-sm font-bold shadow-lg shadow-blue-500/25"
              >
                Lock In Pre-Qualification
              </Button>

              <p className="text-[11px] text-slate-400">
                Subject to final verification of corporate tax returns and bank feeds.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* 4. REAL CLIENT CASE STUDIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="emerald" size="md">
            Proven Outcomes
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white mt-3">
            Trusted by Hundreds of Small Businesses
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">
            Read how small business founders paired non-dilutive credit facilities with fractional CFO guidance to unlock explosive growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((cs) => (
            <Card key={cs.id} variant="default" hover className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="primary" size="sm">
                    {cs.industry}
                  </Badge>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {cs.capitalReceived}
                  </span>
                </div>
                <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  {cs.clientName}
                </h4>
                <div className="text-xs font-semibold text-amber-500 mt-0.5">
                  ★ {cs.growth}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-4 italic leading-relaxed">
                  "{cs.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center gap-3">
                <img
                  src={cs.avatar}
                  alt={cs.advisor}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{cs.advisor}</p>
                  <p className="text-[10px] text-slate-400">OAL Advisory Practice</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl gradient-hero-navy text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-blue-900/60">
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10 space-y-4 text-left">
            <Badge variant="gold" size="sm">
              Ready To Scale?
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              Get Your Business Funded & Paired with a Dedicated CFO.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              No endless paperwork, no hidden covenant traps. Fill out our simple digital intake and receive your customized facility term sheet in 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-3">
              <Button
                variant="accent"
                size="lg"
                pill
                onClick={() => navigate('/apply')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="text-base"
              >
                Start Free Application
              </Button>
              <Button
                variant="outline"
                size="lg"
                pill
                onClick={() => navigate('/portal/dashboard')}
                className="text-white border-slate-600 hover:bg-slate-800/80"
              >
                Log In to Client Portal
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
