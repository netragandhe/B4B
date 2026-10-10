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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 text-left">
      {/* Header */}
      <div className="space-y-4">
        <Breadcrumb items={[{ label: 'Advisory & CFO' }]} />
        <Badge variant="success" size="md">
          Strategic Advisory
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[var(--text)] tracking-tight">
          Executive Financial Leadership on Demand
        </h1>
        <p className="text-[var(--text-muted)] max-w-3xl text-base leading-relaxed">
          Capital alone doesn't solve scaling challenges. B4B America pairs credit facilities with seasoned fractional CFOs and transaction strategists who protect your margins and optimize your runway.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {advisoryPillars.map((p) => {
          const Icon = p.icon
          return (
            <Card key={p.title} variant="default" hover className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--sky-50)] text-[var(--blue-600)] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="primary" size="sm">
                    {p.badge}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold font-heading text-[var(--text)]">
                  {p.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">
                  {p.description}
                </p>

                <div className="mt-5 space-y-2 border-t border-[var(--border)] pt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Core Deliverables:
                  </span>
                  {p.deliverables.map((d) => (
                    <div key={d} className="flex items-start gap-2 text-xs text-[var(--text)]">
                      <CheckCircle className="w-3.5 h-3.5 text-[var(--green-600)] shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border)]">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/apply')}
                  className="w-full justify-center"
                >
                  Request Engagement Scope
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Advisory Leadership Team */}
      <div className="space-y-8">
        <div>
          <Badge variant="primary" size="md">
            The Advisory Bench
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--text)] mt-2">
            Meet the Partners Guiding Your Growth
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Every client is assigned a dedicated lead advisor with minimum 15 years in corporate finance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <Card key={partner.name} variant="default" className="p-6 text-center flex flex-col items-center">
              <img
                src={partner.avatar}
                alt={partner.name}
                className="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-[var(--blue-600)]/20 mb-4"
              />
              <h4 className="text-lg font-bold font-heading text-[var(--text)]">
                {partner.name}
              </h4>
              <p className="text-xs font-semibold text-[var(--blue-600)] mt-0.5">
                {partner.role}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-3 leading-relaxed">
                {partner.background}
              </p>
              <div className="mt-4 pt-3 border-t border-[var(--border)] w-full">
                <span className="text-[11px] font-medium text-[var(--text-muted)]">Specialization:</span>
                <p className="text-xs font-bold text-[var(--text)]">
                  {partner.specialty}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Schedule Consultation Callout */}
      <div data-theme="dark" className="p-8 rounded-2xl bg-gradient-to-r from-[var(--navy-900)] to-[var(--navy-800)] text-white border border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[var(--green-600)] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Complimentary Strategy Assessment</span>
          </div>
          <h3 className="text-2xl font-bold font-heading">
            Schedule a 30-Minute Financial Diagnostics Call
          </h3>
          <p className="text-xs text-[var(--text-muted)] max-w-xl">
            Our fractional CFOs will review your working capital conversion cycle, evaluate existing debt covenants, and provide immediate liquidity insights.
          </p>
        </div>
        <Button
          variant="accent"
          size="lg"
          pill
          onClick={() => navigate('/apply')}
          rightIcon={<Calendar className="w-4 h-4" />}
          className="shrink-0"
        >
          Book Consultation Call
        </Button>
      </div>
    </div>
  )
}
