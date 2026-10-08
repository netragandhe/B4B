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
      title: 'Commission Rule Published',
      description: 'Updated commission rates and live multipliers across all Biz Pro tiers.',
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
        description="Design percentage splits, flat referral bonuses, and rank multipliers with real-time deal payout calculator."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Commission Maker', icon: <Sliders className="w-3.5 h-3.5 text-gold-500" /> },
        ]}
        badge={
          <Badge variant="gold" size="md">
            Live Calculator
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

      {/* LIVE CALCULATOR WIDGET */}
      <Card variant="bento" className="p-6 border border-slate-200 dark:border-slate-800 space-y-4 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="flex items-center justify-between border-b pb-3 border-slate-800">
          <h3 className="font-bold text-base flex items-center gap-2 text-white">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <span>Live Deal Payout Calculator</span>
          </h3>
          <Badge variant="emerald" size="sm">
            Instant Simulation
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Inputs */}
          <div className="space-y-3 md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-blue-200 block mb-1">Deal Size ($)</label>
                <input
                  type="number"
                  step={25000}
                  value={calcDealSize}
                  onChange={(e) => setCalcDealSize(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-white font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-blue-200 block mb-1">Select Service Product</label>
                <select
                  value={calcService}
                  onChange={(e) => setCalcService(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-white"
                >
                  {rules.map((r) => (
                    <option key={r.id} value={r.serviceName}>
                      {r.serviceName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-blue-200 block mb-1">Biz Pro Rank Level (1-9)</label>
                <select
                  value={calcRankLevel}
                  onChange={(e) => setCalcRankLevel(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-white font-bold"
                >
                  {Array.from({ length: 9 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Rank {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Output Card */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-right">
            <div className="text-[11px] text-slate-400">Total Calculated Commission</div>
            <div className="text-2xl font-black text-emerald-400 font-heading">
              {formatCurrency(totalCommission)}
            </div>
            <div className="text-[10px] text-blue-300">
              Base: {formatCurrency(basePayout)} • Multiplier: {rankMultiplier.toFixed(2)}x
            </div>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
              Net Platform Revenue: <span className="text-white font-bold">{formatCurrency(netPlatformRevenue)}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* RULES TABLE */}
      <Card variant="default" className="p-4 space-y-4 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search service rules..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium bg-white dark:bg-slate-900"
          >
            <ArrowUpDown className="w-3 h-3" />
            <span>Base % ({sortOrder.toUpperCase()})</span>
          </button>
        </div>

        <div className="overflow-x-auto border rounded-xl border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-3 px-4">Service Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Base Commission %</th>
                <th className="py-3 px-4">Flat Bonus ($)</th>
                <th className="py-3 px-4">Rank Multiplier</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedRules.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{r.serviceName}</td>
                  <td className="py-3 px-4">
                    <Badge variant="navy" size="sm">
                      {r.category}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">{r.basePercent}%</td>
                  <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(r.flatBonus)}</td>
                  <td className="py-3 px-4 font-bold text-purple-600 dark:text-purple-400">{r.rankMultiplier}x</td>
                  <td className="py-3 px-4 text-right">
                    <Button size="sm" variant="outline" onClick={() => handleDeleteRule(r.id)} className="text-rose-500 border-rose-200 hover:bg-rose-50">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-slate-500">
            Page {currentPage} of {totalPages} ({filteredRules.length} rules)
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
