import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Layers,
  Search,
  DollarSign,
  Clock,
  Percent,
  CheckCircle2,
  Download,
  ArrowUpRight,
  Filter,
  ShieldCheck,
  Briefcase,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

interface ServiceProduct {
  id: string
  title: string
  category: 'Debt & Credit' | 'Equipment & Asset' | 'Government' | 'Advisory & CFO' | 'Merchant & POS'
  dealRange: string
  commissionRate: string
  turnaround: string
  description: string
  requirements: string[]
}

export const BizProServicesPage: React.FC = () => {
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [search, setSearch] = useState('')

  const services: ServiceProduct[] = [
    {
      id: 'srv-1',
      title: 'Business Working Capital Revolver',
      category: 'Debt & Credit',
      dealRange: '$50,000 – $2,000,000',
      commissionRate: '10.0% – 12.5%',
      turnaround: '24–48 Hours',
      description: 'Revolving line of credit secured against corporate cash flows with flexible draws and interest-only payment options.',
      requirements: ['6+ Months Time in Business', '$25k+ Monthly Gross Revenue', 'Zero active bankruptcy filings'],
    },
    {
      id: 'srv-2',
      title: 'Accounts Receivable Factoring & Advance',
      category: 'Debt & Credit',
      dealRange: '$100,000 – $5,000,000',
      commissionRate: '8.0% – 10.0%',
      turnaround: '3–5 Days',
      description: 'Accelerate cash flow by pledging outstanding B2B invoices with up to 90% advance rate.',
      requirements: ['B2B or B2G Invoices only', 'Creditworthy account debtors', 'Clean UCC-1 search'],
    },
    {
      id: 'srv-3',
      title: 'Heavy Equipment Lease & Machinery',
      category: 'Equipment & Asset',
      dealRange: '$25,000 – $1,500,000',
      commissionRate: '7.5% – 10.0%',
      turnaround: '48–72 Hours',
      description: 'Direct financing and sale-leaseback for manufacturing, CNC, transportation, medical, and construction machinery.',
      requirements: ['Equipment vendor invoice/quote', '2 Years tax returns', 'Section 179 eligible'],
    },
    {
      id: 'srv-4',
      title: 'SBA 7(a) Working Capital & Expansion',
      category: 'Government',
      dealRange: '$250,000 – $5,000,000',
      commissionRate: '5.0% – 7.5%',
      turnaround: '3–4 Weeks',
      description: 'Government-guaranteed low interest financing with 10-year term and prime-indexed rates.',
      requirements: ['US Citizen / Green Card', '680+ Personal Credit Score', 'Demonstrated debt service coverage ratio > 1.25x'],
    },
    {
      id: 'srv-5',
      title: 'SBA 504 Commercial Real Estate Loan',
      category: 'Government',
      dealRange: '$500,000 – $10,000,000',
      commissionRate: '4.0% – 6.0%',
      turnaround: '4–6 Weeks',
      description: 'Long-term, fixed-rate financing for owner-occupied real estate and large heavy equipment acquisitions.',
      requirements: ['51%+ Owner occupied', '10% Equity injection minimum', 'Job creation or retention metric'],
    },
    {
      id: 'srv-6',
      title: 'Commercial Real Estate Bridge Facility',
      category: 'Equipment & Asset',
      dealRange: '$1,000,000 – $25,000,000',
      commissionRate: '6.0% – 8.0%',
      turnaround: '10–14 Days',
      description: 'Non-bank private debt for acquisitions, repositioning, value-add commercial assets, and industrial rehabs.',
      requirements: ['Appraisal or broker price opinion', 'Clear title report', 'Viable exit strategy'],
    },
    {
      id: 'srv-7',
      title: 'Build Business Credit Program (Tier 1–4)',
      category: 'Debt & Credit',
      dealRange: '$10,000 – $150,000',
      commissionRate: '15.0%',
      turnaround: 'Immediate Enrollment',
      description: 'Step-by-step corporate credit separation resulting in 80+ Paydex scores without personal guarantee.',
      requirements: ['Active LLC / Corporation', 'EIN & D-U-N-S Number', 'Commercial business address'],
    },
    {
      id: 'srv-8',
      title: 'Fractional CFO & Treasury Retainer',
      category: 'Advisory & CFO',
      dealRange: '$3,500 – $15,000 / mo',
      commissionRate: '15.0% Recurring',
      turnaround: '7 Days',
      description: 'Senior finance leadership delivering 13-week cash forecasting, debt capitalization models, and board reporting.',
      requirements: ['$1M+ Annual revenue', 'QuickBooks / NetSuite ledger', 'Executive onboarding call'],
    },
    {
      id: 'srv-9',
      title: 'Merchant POS & High-Volume Processing',
      category: 'Merchant & POS',
      dealRange: '$20,000 – $1,000,000 / mo',
      commissionRate: '20.0% Trailing Residual',
      turnaround: '48 Hours',
      description: 'Next-day funding processing terminals with wholesale interchange-plus pricing and POS hardware.',
      requirements: ['Existing merchant statement', 'Corporate bank checking account', 'PCI compliance review'],
    },
    {
      id: 'srv-10',
      title: 'Revenue-Based Financing Advance',
      category: 'Debt & Credit',
      dealRange: '$25,000 – $750,000',
      commissionRate: '12.5%',
      turnaround: '24 Hours',
      description: 'Fast non-collateralized capital advance repaid as a percentage of daily corporate revenue collections.',
      requirements: ['3 Months bank statements', 'Minimum 10 monthly deposits', '$15k+ Monthly volume'],
    },
    {
      id: 'srv-11',
      title: 'Healthcare & Medical Practice Line',
      category: 'Debt & Credit',
      dealRange: '$150,000 – $3,000,000',
      commissionRate: '10.0%',
      turnaround: '3–5 Days',
      description: 'Tailored facilities for physician groups, dental clinics, surgery centers, and diagnostic labs.',
      requirements: ['Active state medical license', 'Commercial insurance billing run', 'Clean malpractice history'],
    },
    {
      id: 'srv-12',
      title: 'Franchise Financing & Expansion Line',
      category: 'Debt & Credit',
      dealRange: '$100,000 – $2,500,000',
      commissionRate: '8.0%',
      turnaround: '2 Weeks',
      description: 'Store rollout and multi-unit territory expansion for approved national franchise brands.',
      requirements: ['Franchise Disclosure Document (FDD)', 'Brand experience', 'Unit economics model'],
    },
    {
      id: 'srv-13',
      title: 'Corporate Tax Credit Advisory (ERC / R&D)',
      category: 'Advisory & CFO',
      dealRange: '$50,000 – $1,000,000 Credit',
      commissionRate: '15.0%',
      turnaround: '10 Days File Prep',
      description: 'Specialized CPA review recovering federal and state tax credits for payroll, innovation, and green tech.',
      requirements: ['Payroll tax filings (Form 941)', 'W-2 employee records', 'Accounting review'],
    },
    {
      id: 'srv-14',
      title: 'Purchase Order & Supplier Trade Credit',
      category: 'Debt & Credit',
      dealRange: '$75,000 – $3,000,000',
      commissionRate: '9.0%',
      turnaround: '5–7 Days',
      description: 'Direct payment to suppliers and overseas manufacturers to fulfill verified commercial purchase orders.',
      requirements: ['Valid customer purchase order', 'Supplier pro-forma invoice', 'Gross margin > 25%'],
    },
    {
      id: 'srv-15',
      title: 'Commercial Insurance Premium Finance',
      category: 'Equipment & Asset',
      dealRange: '$50,000 – $500,000',
      commissionRate: '6.0%',
      turnaround: '24 Hours',
      description: 'Spreads substantial property, casualty, and marine insurance policy payments over 9 to 10 months.',
      requirements: ['Binding quote from carrier', 'Down payment deposit', 'Signed broker authorization'],
    },
    {
      id: 'srv-16',
      title: 'Debt Restructuring & Consolidation',
      category: 'Advisory & CFO',
      dealRange: '$100,000 – $2,000,000',
      commissionRate: '12.5%',
      turnaround: '7–10 Days',
      description: 'Refinancing multiple high-cost daily/weekly advances into a single monthly term loan with reduced rates.',
      requirements: ['Schedule of existing liabilities', 'Payoff letters from prior lenders', 'Bank statements'],
    },
  ]

  const categories = ['All', 'Debt & Credit', 'Equipment & Asset', 'Government', 'Advisory & CFO', 'Merchant & POS']

  const filtered = services.filter((s) => {
    const matchCat = selectedCategory === 'All' || s.category === selectedCategory
    const matchSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <>
      <Helmet>
        <title>Service Catalog (16) | Biz Pro Terminal</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Service & Solutions Catalog
              </h1>
              <Badge variant="primary" size="sm">
                16 Commercial Offerings
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Complete underwriting menu with deal sizing, advisor commission splits, and client requirements.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                title: 'Catalog One-Sheet Downloaded',
                description: 'Full 16-Product Broker Matrix (October 2026).pdf',
                type: 'success',
              })
            }
          >
            <Download className="w-4 h-4 mr-1.5" />
            Download Broker One-Sheet
          </Button>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-white dark:bg-[#0D1E36] rounded-2xl border border-slate-200 dark:border-[#1E3A5F]">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search product title or criteria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-hidden"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-[#12294A] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1A3860]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <Card
              key={item.id}
              className="p-5 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] flex flex-col justify-between hover:border-blue-500/60 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="navy" size="sm">
                    {item.category}
                  </Badge>
                  <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400">
                    {item.commissionRate} Split
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-2.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {item.description}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-2 mt-4 p-2.5 rounded-xl bg-slate-50 dark:bg-[#12294A] text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Facility Sizing</span>
                    <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{item.dealRange}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Funding Speed</span>
                    <p className="font-bold text-blue-600 dark:text-blue-400 mt-0.5">{item.turnaround}</p>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mt-3.5 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Underwriting Criteria</span>
                  {item.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span className="truncate">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Action */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
                <Link to="/bizpro/leads">
                  <Button variant="primary" size="sm">
                    Submit Lead For Deal
                  </Button>
                </Link>
                <button
                  onClick={() =>
                    toast({
                      title: `Product Sheet: ${item.title}`,
                      description: 'PDF one-pager saved to your downloads.',
                      type: 'info',
                    })
                  }
                  className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
