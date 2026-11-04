import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Target,
  FileSpreadsheet,
  Award,
  CheckCircle,
  Calendar,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import heroBgImg from '@/content/images/hero-widescreen-bg.jpg'

export const AdvisoryPage: React.FC = () => {
  const navigate = useNavigate()

  const advisoryPillars = [
    {
      title: 'Fractional CFO & Treasury Leadership',
      icon: FileSpreadsheet,
      badge: 'Cash Flow & Runway',
      description: 'Gain executive financial guidance without hiring a $350k/year executive. We implement 13-week cash forecasting, audit unit economics, and eliminate working capital bottlenecks.',
      deliverables: [
        'Rolling 13-Week Cash Flow Models',
        'Working Capital Cycle (DSO/DPO) Optimization',
        'Gross Margin & Contribution Analysis',
        'Board & Investor-Ready Financial Decks',
      ],
    },
    {
      title: 'Debt Syndication & Underwriting Prep',
      icon: Target,
      badge: 'Cost of Capital',
      description: 'We prepare your underwriting files, clean up historical balance sheet discrepancies, and negotiate terms across 40+ private debt and credit syndicates.',
      deliverables: [
        'Institutional Quality Information Memorandum',
        'Lender Covenant Compliance Audits',
        'Senior vs Subordinated Debt Structuring',
        'Multi-Bid Syndicate Competition',
      ],
    },
    {
      title: 'M&A, Bolt-On & Valuation Growth',
      icon: Award,
      badge: 'Transaction Advisory',
      description: 'Whether acquiring a competitor or positioning for an institutional recapitalization, our transaction advisors guide every step of deal structuring.',
      deliverables: [
        'Quality of Earnings (QofE) Diagnostic Prep',
        'Clean Virtual Data Room (VDR) Management',
        'Seller Financing & Earn-out Modeling',
        'Post-Merger Financial Integration',
      ],
    },
  ]

  const partners = [
    {
      name: 'Victoria Hastings',
      role: 'Senior Managing Partner & Fractional CFO',
      background: 'Ex-Goldman Sachs, Former CFO at Hyperion Logistics ($80M ARR)',
      specialty: 'Working Capital & Treasury Architecture',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Derrick Vance',
      role: 'Head of Debt Syndication & Credit',
      background: '20+ Years Institutional Credit, Former Credit Officer at KeyBank Commercial',
      specialty: 'Revolving Facilities & SBA Guarantees',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Elena Rostova',
      role: 'M&A & Operational Strategy Partner',
      background: 'Private Equity Operating Partner, Led 18 Small-Market Transactions',
      specialty: 'Valuation Enhancement & Buyouts',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    },
  ]

  return (
    <div className="min-h-screen bg-[#07142B] text-white transition-colors duration-200 font-body py-12 relative overflow-hidden">
      {/* Background Photo & Clean Luminous Blue Overlays identical to Landing Page Hero */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={heroBgImg}
          alt="B4B America commercial business commerce operations"
          loading="eager"
          decoding="sync"
          className="w-full h-full object-cover object-center"
        />
        {/* Luminous clean blue overlay identical to HomePage Hero */}
        <div className="absolute inset-0 bg-[#0A2A5E]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08204D]/85 via-[#0B2C68]/50 to-[#08204D]/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07142B]/60 to-[#07142B] opacity-90" />
      </div>

      {/* Ambient lighting accents identical to HomePage Hero */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/25 rounded-full blur-3xl pointer-events-none z-[1]" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none z-[1]" />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-[#FFC911]/10 rounded-full blur-3xl pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left relative z-10">
        {/* Header */}
        <div className="space-y-4">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Advisory & CFO' }]} />
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-300/40 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F8C61A] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#F8C61A] font-mono">
              STRATEGIC ADVISORY DIVISION
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Executive Financial Leadership on Demand
          </h1>
          <p className="text-[#B8C4D9] max-w-3xl text-base sm:text-lg leading-relaxed font-body">
            Capital alone doesn't solve scaling challenges. B4B America pairs credit facilities with seasoned fractional CFOs and transaction strategists who protect your margins and optimize your runway.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advisoryPillars.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.title}
                className="p-6 sm:p-8 rounded-3xl relative overflow-hidden bg-gradient-to-br from-sky-600/25 via-[#1658B3]/30 to-sky-700/25 border border-sky-300/40 shadow-[0_16px_48px_rgba(2,132,199,0.25)] backdrop-blur-2xl flex flex-col justify-between hover:border-sky-300/80 hover:-translate-y-1 transition-all group"
              >
                {/* Ambient glow inside card matching Telemetry Card */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#013CA0]/25 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-[#FFC911]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-[#FFC911] border border-sky-300/40 flex items-center justify-center backdrop-blur-md shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#07142B] bg-[#FFC911] px-3 py-1 rounded-full shadow-xs border border-[#FFC911]/50">
                      {p.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B8C4D9] mt-2 leading-relaxed font-body">
                    {p.description}
                  </p>

                  <div className="mt-5 space-y-2.5 rounded-xl bg-[#07142B]/90 border border-sky-300/25 p-3.5 backdrop-blur-md">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFC911] font-mono block">
                      Core Deliverables:
                    </span>
                    {p.deliverables.map((d) => (
                      <div key={d} className="flex items-start gap-2 text-xs text-white/90 font-body">
                        <CheckCircle className="w-3.5 h-3.5 text-[#FFC911] shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-sky-300/25 relative z-10">
                  <button
                    onClick={() => navigate('/apply')}
                    className="btn-gold-dark w-full justify-center !py-3 !text-xs cursor-pointer"
                  >
                    Request Engagement Scope
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Advisory Leadership Team */}
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-300/40 shadow-xs text-xs font-bold uppercase tracking-wider text-[#F8C61A] font-mono">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>THE ADVISORY BENCH</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white mt-2">
              Meet the Partners Guiding Your Growth
            </h2>
            <p className="text-sm text-[#B8C4D9] mt-1">
              Every client is assigned a dedicated lead advisor with minimum 15 years in corporate finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="p-6 sm:p-8 rounded-3xl relative overflow-hidden bg-gradient-to-br from-sky-600/25 via-[#1658B3]/30 to-sky-700/25 border border-sky-300/40 text-center flex flex-col items-center shadow-[0_16px_48px_rgba(2,132,199,0.25)] backdrop-blur-2xl hover:border-sky-300/80 transition-all"
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#013CA0]/20 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center w-full">
                  <img
                    src={partner.avatar}
                    alt={partner.name}
                    className="w-24 h-24 rounded-full object-cover shadow-xl border-2 border-sky-300/60 mb-4"
                  />
                  <h4 className="text-lg font-bold font-heading text-white">
                    {partner.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#FFC911] mt-0.5">
                    {partner.role}
                  </p>
                  <p className="text-xs text-[#B8C4D9] mt-3 leading-relaxed font-body">
                    {partner.background}
                  </p>
                  <div className="mt-4 pt-3.5 border-t border-sky-300/25 w-full rounded-xl bg-[#07142B]/90 p-3 backdrop-blur-md">
                    <span className="text-[11px] font-medium text-sky-200/80 font-mono uppercase tracking-wider block">Specialization:</span>
                    <p className="text-xs font-bold text-white mt-0.5 font-body">
                      {partner.specialty}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Consultation Callout */}
        <div className="p-8 sm:p-10 rounded-3xl relative overflow-hidden bg-gradient-to-br from-sky-600/25 via-[#1658B3]/35 to-sky-700/25 text-white border border-sky-300/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_16px_48px_rgba(2,132,199,0.25)] backdrop-blur-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#013CA0]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-52 h-52 bg-[#FFC911]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-2 relative z-10 text-left">
            <div className="flex items-center gap-2 text-[#FFC911] text-xs font-bold uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4 text-[#FFC911]" />
              <span>Complimentary Strategy Assessment</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Schedule a 30-Minute Financial Diagnostics Call
            </h3>
            <p className="text-xs sm:text-sm text-[#B8C4D9] max-w-xl font-body">
              Our fractional CFOs will review your working capital conversion cycle, evaluate existing debt covenants, and provide immediate liquidity insights.
            </p>
          </div>
          <button
            onClick={() => navigate('/apply')}
            className="btn-gold-dark shrink-0 !py-3.5 !px-8 !text-sm group relative z-10 cursor-pointer"
          >
            <span>Book Consultation Call</span>
            <Calendar className="w-4 h-4 text-[#07142B]" />
          </button>
        </div>
      </div>
    </div>
  )
}
