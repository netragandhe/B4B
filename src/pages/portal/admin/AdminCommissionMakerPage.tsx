import React, { useState, useMemo } from 'react'
import {
  Sliders,
  Calculator,
  Plus,
  Save,
  Search,
  FileSpreadsheet,
  Printer,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Sparkles,
  Trash2,
  DollarSign,
  TrendingUp,
  Percent,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'
import { formatCurrency } from '@/lib/utils'
import { exportToCsv, exportToPdf } from '@/lib/exportUtils'

export interface CommissionRule {
  id: string
  serviceName: string
  category: string
  basePercent: number
  flatBonus: number
  rankMultiplier: number
  active: boolean
}

export const INITIAL_COMMISSION_RULES: CommissionRule[] = [
  { id: 'cm_1', serviceName: 'Revenue-Based Working Capital Line', category: 'Capital', basePercent: 3.5, flatBonus: 500, rankMultiplier: 1.2, active: true },
  { id: 'cm_2', serviceName: 'Equipment & Fleet Lease Financing', category: 'Capital', basePercent: 2.5, flatBonus: 250, rankMultiplier: 1.1, active: true },
  { id: 'cm_3', serviceName: 'SBA 7(a) Guarantee Bridge Funding', category: 'Capital', basePercent: 2.0, flatBonus: 1000, rankMultiplier: 1.5, active: true },
  { id: 'cm_4', serviceName: 'Fractional CFO & Treasury Advisory', category: 'Advisory', basePercent: 15.0, flatBonus: 0, rankMultiplier: 1.0, active: true },
  { id: 'cm_5', serviceName: 'Invoice Factoring & AR Advance', category: 'Capital', basePercent: 2.0, flatBonus: 300, rankMultiplier: 1.15, active: true },
]

export const AdminCommissionMakerPage: React.FC = () => {
  const { toast } = useToast()

  const [rules, setRules] = useState<CommissionRule[]>(INITIAL_COMMISSION_RULES)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Live Calculator State
  const [calcDealSize, setCalcDealSize] = useState<number>(500000)
  const [calcService, setCalcService] = useState<string>(INITIAL_COMMISSION_RULES[0].serviceName)
  const [calcRankLevel, setCalcRankLevel] = useState<number>(4)

  // Live Calculator calculation
  const activeRule = rules.find((r) => r.serviceName === calcService) || rules[0]
  const basePayout = (calcDealSize * activeRule.basePercent) / 100
  const rankMultiplier = 1 + (calcRankLevel - 1) * 0.1
  const totalCommission = basePayout * rankMultiplier * activeRule.rankMultiplier + activeRule.flatBonus
  const netPlatformRevenue = calcDealSize - totalCommission

  const handleSaveRule = () => {
    toast({
      title: 'Commission Rules Saved',
      description: 'Updated payout splits and rank multipliers are now active system-wide.',
      type: 'success',
    })
  }

  const handleDeleteRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id))
    toast({ title: 'Rule Removed', description: 'Commission rule deleted.', type: 'info' })
  }

  const filteredRules = useMemo(() => {
    return rules
      .filter((r) => r.serviceName.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => (sortOrder === 'asc' ? a.basePercent - b.basePercent : b.basePercent - a.basePercent))
  }, [rules, searchQuery, sortOrder])

  const totalPages = Math.ceil(filteredRules.length / itemsPerPage) || 1
  const paginatedRules = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredRules.slice(start, start + itemsPerPage)
  }, [filteredRules, currentPage])

  const handleExportCsv = () => {
    const headers = ['ID', 'Service Name', 'Category', 'Base Percent', 'Flat Bonus', 'Rank Multiplier', 'Active']
    const rows = rules.map((r) => [r.id, r.serviceName, r.category, `${r.basePercent}%`, r.flatBonus, `${r.rankMultiplier}x`, r.active ? 'Yes' : 'No'])
    exportToCsv('Commission_Rules_Matrix', headers, rows)
    toast({ title: 'CSV Exported', description: 'Commission rules dataset downloaded.', type: 'success' })
  }

  const handleExportPdf = () => {
    const headers = ['ID', 'Service Name', 'Category', 'Base %', 'Flat Bonus', 'Rank Multiplier']
    const rows = rules.map((r) => [r.id, r.serviceName, r.category, `${r.basePercent}%`, formatCurrency(r.flatBonus), `${r.rankMultiplier}x`])
    exportToPdf('Commission Rule Builder & Multiplier Matrix Report', headers, rows)
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Commission Maker & Visual Rule Builder"
        description="Configure dynamic revenue splits, flat referral bonuses, and 9-tier rank multipliers with real-time payout simulation."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Commission Maker', icon: <Sliders className="w-3.5 h-3.5 text-amber-500" /> },
        ]}
        badge={
          <Badge variant="gold" size="md" className="font-bold shadow-xs">
            Live Simulator Active
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExportCsv} leftIcon={<FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />}>
              CSV
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPdf} leftIcon={<Printer className="w-3.5 h-3.5 text-blue-600" />}>
              PDF Report
            </Button>
            <Button variant="accent" size="sm" onClick={handleSaveRule} leftIcon={<Save className="w-4 h-4" />}>
              Save Rules
            </Button>
          </div>
        }
      />

      {/* LIVE CALCULATOR WIDGET (Modern Executive Card) */}
      <Card
        variant="default"
        className="p-5 sm:p-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] shadow-sm space-y-5 rounded-2xl"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E3A5F]">
          <h3 className="font-bold text-base font-heading flex items-center gap-2 text-slate-900 dark:text-white">
            <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Live Deal Payout Calculator</span>
          </h3>
          <Badge variant="emerald" size="sm" className="font-bold">
            Real-Time Formula
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center text-xs">
          {/* Inputs Section (8 Columns) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Deal Size */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5 text-[11px] uppercase tracking-wider">
                  Deal Size ($)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step={25000}
                    value={calcDealSize}
                    onChange={(e) => setCalcDealSize(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Service Product */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5 text-[11px] uppercase tracking-wider">
                  Service Product
                </label>
                <select
                  value={calcService}
                  onChange={(e) => setCalcService(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {rules.map((r) => (
                    <option key={r.id} value={r.serviceName}>
                      {r.serviceName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Coach Rank Tier */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5 text-[11px] uppercase tracking-wider">
                  Coach Rank Tier
                </label>
                <select
                  value={calcRankLevel}
                  onChange={(e) => setCalcRankLevel(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({ length: 9 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Tier #{i + 1} (Rank {i + 1})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 font-medium">
              <span>Applied Rule: <strong className="text-slate-900 dark:text-white">{activeRule.basePercent}% Base</strong> + <strong className="text-emerald-600 dark:text-emerald-400">${activeRule.flatBonus} Bonus</strong></span>
              <span>Multiplier: <strong className="text-blue-600 dark:text-blue-400">{(rankMultiplier * activeRule.rankMultiplier).toFixed(2)}x</strong></span>
            </div>
          </div>

          {/* Output Card (5 Columns) */}
          <div className="lg:col-span-5 p-4 rounded-xl bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-white dark:from-emerald-950/30 dark:via-slate-900 dark:to-[#0D1E36] border border-emerald-200 dark:border-emerald-800/60 space-y-2 text-right shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Calculated Coach Payout
              </span>
              <Badge variant="emerald" size="sm" className="text-[10px] py-0 px-1.5 font-bold">
                Gross Deal Share
              </Badge>
            </div>

            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-heading">
              {formatCurrency(totalCommission)}
            </div>

            <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
              Base: <strong className="text-slate-800 dark:text-slate-100">{formatCurrency(basePayout)}</strong> • Multiplier Boost: <strong className="text-blue-600 dark:text-blue-400">+{formatCurrency(totalCommission - basePayout)}</strong>
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-emerald-200/80 dark:border-slate-800 flex justify-between items-center">
              <span>Net Platform Revenue:</span>
              <span className="text-slate-900 dark:text-white font-extrabold">{formatCurrency(netPlatformRevenue)}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* RULES TABLE */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0D1E36] p-3.5 rounded-xl border border-slate-200 dark:border-[#1E3A5F]">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search service rules..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 self-start sm:self-auto transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" />
            <span>Sort by Base % ({sortOrder.toUpperCase()})</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0D1E36] shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Service Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Base Commission</th>
                <th className="py-3 px-4">Flat Bonus ($)</th>
                <th className="py-3 px-4">Rank Multiplier</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {paginatedRules.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{r.serviceName}</td>
                  <td className="py-3 px-4">
                    <Badge variant="navy" size="sm" className="font-bold text-[10px]">
                      {r.category}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 font-black text-blue-600 dark:text-blue-400">{r.basePercent}%</td>
                  <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(r.flatBonus)}</td>
                  <td className="py-3 px-4 font-bold text-purple-600 dark:text-purple-400">{r.rankMultiplier}x</td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteRule(r.id)}
                      className="h-7 px-2 text-rose-500 border-rose-200 hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950/40"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <div className="text-slate-500 dark:text-slate-400">
            Showing {paginatedRules.length} of {filteredRules.length} rules (Page {currentPage} of {totalPages})
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
              className="h-7 text-xs"
            >
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
              className="h-7 text-xs"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

