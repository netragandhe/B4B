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
    <div className="min-h-screen bg-[#07142B] text-white transition-colors duration-200 font-body py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left relative z-10">
        {/* Header */}
        <div className="space-y-4">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Advisory & CFO' }]} />
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-300/40 text-xs font-bold text-[#FFC911] font-mono shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC911]" />
            <span>Strategic Advisory Division</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Executive Financial Leadership on Demand
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-base sm:text-lg leading-relaxed font-body">
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
                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 shadow-xl backdrop-blur-md flex flex-col justify-between hover:border-sky-300/80 hover:-translate-y-1 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-[#FFC911] border border-sky-400/30 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#013CA0] bg-[#FFC911] px-2.5 py-1 rounded-full shadow-xs">
                      {p.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100/80 mt-2 leading-relaxed font-body">
                    {p.description}
                  </p>

                  <div className="mt-5 space-y-2.5 border-t border-sky-300/30 pt-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFC911] font-mono">
                      Core Deliverables:
                    </span>
                    {p.deliverables.map((d) => (
                      <div key={d} className="flex items-start gap-2 text-xs text-blue-50 font-body">
                        <CheckCircle className="w-3.5 h-3.5 text-[#FFC911] shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-sky-300/30">
                  <button
                    onClick={() => navigate('/apply')}
                    className="btn-gold-dark w-full justify-center !py-2.5 !text-xs"
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-xs font-bold text-sky-200 border border-sky-400/30 font-mono">
              The Advisory Bench
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white mt-2">
              Meet the Partners Guiding Your Growth
            </h2>
            <p className="text-sm text-blue-100/80 mt-1">
              Every client is assigned a dedicated lead advisor with minimum 15 years in corporate finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 text-center flex flex-col items-center shadow-xl backdrop-blur-md hover:border-sky-300/80 transition-all"
              >
                <img
                  src={partner.avatar}
                  alt={partner.name}
                  className="w-24 h-24 rounded-full object-cover shadow-xl border-2 border-sky-300/50 mb-4"
                />
                <h4 className="text-lg font-bold font-heading text-white">
                  {partner.name}
                </h4>
                <p className="text-xs font-semibold text-[#FFC911] mt-0.5">
                  {partner.role}
                </p>
                <p className="text-xs text-blue-100/80 mt-3 leading-relaxed font-body">
                  {partner.background}
                </p>
                <div className="mt-4 pt-3 border-t border-sky-300/30 w-full">
                  <span className="text-[11px] font-medium text-sky-200/70 font-mono">Specialization:</span>
                  <p className="text-xs font-bold text-white mt-0.5 font-body">
                    {partner.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Consultation Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0F356B] via-[#0C2A54] to-[#081F42] text-white border border-sky-300/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-md">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#FFC911] text-xs font-bold uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4 text-[#FFC911]" />
              <span>Complimentary Strategy Assessment</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Schedule a 30-Minute Financial Diagnostics Call
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/80 max-w-xl font-body">
              Our fractional CFOs will review your working capital conversion cycle, evaluate existing debt covenants, and provide immediate liquidity insights.
            </p>
          </div>
          <button
            onClick={() => navigate('/apply')}
            className="btn-gold-dark shrink-0 !py-3.5 !px-8 !text-sm group"
          >
            <span>Book Consultation Call</span>
            <Calendar className="w-4 h-4 text-[#07142B]" />
          </button>
        </div>
      </div>
    </div>
  )
}
