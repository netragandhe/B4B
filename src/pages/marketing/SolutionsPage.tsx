import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  CreditCard,
  Truck,
  Landmark,
  Check,
  X,
  ArrowRight,
  Shield,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export const SolutionsPage: React.FC = () => {
  const navigate = useNavigate()

  const solutions = [
    {
      title: 'Revenue-Based Growth Credit',
      icon: TrendingUp,
      limit: '$100k - $2.5M',
      term: '12 - 24 Months',
      pricing: '1.08x - 1.22x Cap',
      desc: 'Non-dilutive financing where repayments dynamically flex with your gross customer receipts. Perfect for SaaS, e-commerce, and subscription businesses.',
      features: [
        'No fixed monthly interest compounding',
        'Automatic ACH adjustments during slower months',
        'No board seats or warrants',
        'Funds wired in 48 hours',
      ],
    },
    {
      title: 'Working Capital Revolver',
      icon: CreditCard,
      limit: '$250k - $5M',
      term: '24 - 36 Months',
      pricing: 'Prime + 1.25%',
      desc: 'A flexible, revolving credit facility that operates like a corporate credit line. Only pay interest on what you draw.',
      features: [
        'Reusable line with instant self-service draws',
        'Interest-only payment options during inventory cycles',
        'Direct operating account integration',
        'Senior and junior lien flexibility',
      ],
    },
    {
      title: 'Commercial Equipment & Fleet Lines',
      icon: Truck,
      limit: '$50k - $3M',
      term: '36 - 60 Months',
      pricing: '5.75% Fixed',
      desc: 'Acquire high-cost vehicles, manufacturing machinery, or tech infrastructure with zero up-front depletion of working capital.',
      features: [
        'Up to 100% equipment cost covered',
        'Section 179 tax deduction eligible',
        'Pre-approved vendor direct settlement',
        'Deferred initial payment terms available',
      ],
    },
    {
      title: 'SBA 7(a) Guarantee Bridge',
      icon: Landmark,
      limit: '$500k - $5M',
      term: 'Up to 10 Years',
      pricing: 'Prime + 2.25%',
      desc: 'Need government-backed, low-interest capital? We prepare your underwriting package and bridge the 60-day SBA processing gap.',
      features: [
        'Immediate bridge disbursements while SBA processes',
        'Lowest long-term cost of capital in the market',
        'Full document package preparation by our CFO team',
        'Over 94% SBA approval track record',
      ],
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header & Breadcrumb */}
      <div className="space-y-4 text-left">
        <Breadcrumb items={[{ label: 'Capital Solutions' }]} />
        <Badge variant="primary" size="md">
          Capital Solutions
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
          Institutional Credit Facilities Tailored for Small Businesses
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-3xl text-base leading-relaxed">
          Whether you need to bridge 90-day invoice delays, purchase equipment, or accelerate marketing inventory, our non-dilutive credit facilities provide the liquidity you need without sacrificing ownership.
        </p>
      </div>

      {/* Facilities Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {solutions.map((sol) => {
          const Icon = sol.icon
          return (
            <Card key={sol.title} variant="default" hover className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="emerald" size="sm">
                    {sol.pricing}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                  {sol.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {sol.desc}
                </p>

                <div className="grid grid-cols-2 gap-3 my-5 p-3 rounded-xl bg-slate-50 dark:bg-[#12294A]/60 border border-slate-200/60 dark:border-[#1E3A5F]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Facility Size</span>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{sol.limit}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Duration</span>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{sol.term}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Key Features:
                  </span>
                  {sol.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-[#1E3A5F]">
                <Button
                  variant="primary"
                  size="md"
                  pill
                  onClick={() => navigate('/apply')}
                  className="w-full justify-center"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Apply For This Facility
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Comparison Table: OAL vs Banks vs VC */}
      <div className="space-y-6 text-left">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="navy" size="md">
            Market Comparison
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white mt-2">
            Why High-Growth Companies Choose OAL Network
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0D1E36] shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#1E3A5F] bg-slate-50 dark:bg-[#12294A]">
                <th className="p-4 font-bold text-slate-600 dark:text-slate-300">Evaluation Criteria</th>
                <th className="p-4 font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/40">
                  OAL Network
                </th>
                <th className="p-4 font-bold text-slate-600 dark:text-slate-300">Traditional Banks</th>
                <th className="p-4 font-bold text-slate-600 dark:text-slate-300">Venture Capital</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#1E3A5F]/60">
              <tr>
                <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">Equity Dilution</td>
                <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400 bg-blue-50/20 dark:bg-blue-950/20">
                  0% (Zero warrants)
                </td>
                <td className="p-4 text-slate-500">0%</td>
                <td className="p-4 text-red-500 font-medium">15% - 30% lost</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">Approval Speed</td>
                <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400 bg-blue-50/20 dark:bg-blue-950/20">
                  48 to 72 Hours
                </td>
                <td className="p-4 text-slate-500">60 to 90 Days</td>
                <td className="p-4 text-slate-500">3 to 6 Months</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">Advisory Pairing</td>
                <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400 bg-blue-50/20 dark:bg-blue-950/20">
                  Dedicated Fractional CFO
                </td>
                <td className="p-4 text-slate-500">None (Branch teller)</td>
                <td className="p-4 text-slate-500">Board oversight only</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">Payment Flexibility</td>
                <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400 bg-blue-50/20 dark:bg-blue-950/20">
                  Adjusts with revenue
                </td>
                <td className="p-4 text-slate-500">Rigid fixed debt</td>
                <td className="p-4 text-slate-500">N/A (Growth at all costs)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
