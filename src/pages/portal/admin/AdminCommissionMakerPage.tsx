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
  Edit2,
  Layers,
  Award,
  Check,
  RotateCcw,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
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

const DEAL_PRESETS = [
  { label: '$100K', value: 100000 },
  { label: '$250K', value: 250000 },
  { label: '$500K', value: 500000 },
  { label: '$1M', value: 1000000 },
  { label: '$2.5M', value: 2500000 },
]

export const AdminCommissionMakerPage: React.FC = () => {
  const { toast } = useToast()

  const [rules, setRules] = useState<CommissionRule[]>(INITIAL_COMMISSION_RULES)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('All')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Live Calculator State
  const [calcDealSize, setCalcDealSize] = useState<number>(500000)
  const [calcService, setCalcService] = useState<string>(INITIAL_COMMISSION_RULES[0].serviceName)
  const [calcRankLevel, setCalcRankLevel] = useState<number>(4)

  // Rule Modal State (Create / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null)
  const [formState, setFormState] = useState({
    serviceName: '',
    category: 'Capital',
    basePercent: 3.0,
    flatBonus: 500,
    rankMultiplier: 1.2,
    active: true,
  })

  // Live Calculator calculation
  const activeRule = rules.find((r) => r.serviceName === calcService) || rules[0]
  const basePayout = (calcDealSize * (activeRule?.basePercent || 3.5)) / 100
  const rankMultiplier = 1 + (calcRankLevel - 1) * 0.1
  const effectiveMultiplier = rankMultiplier * (activeRule?.rankMultiplier || 1.2)
  const totalCommission = basePayout * effectiveMultiplier + (activeRule?.flatBonus || 0)
  const netPlatformRevenue = Math.max(0, calcDealSize - totalCommission)
  const coachPayoutPercent = ((totalCommission / calcDealSize) * 100).toFixed(1)

  const handleSaveRule = () => {
    toast({
      title: 'Commission Rules Saved',
      description: 'Updated payout splits and rank multipliers are now active system-wide.',
      type: 'success',
    })
  }

  const handleDeleteRule = (id: string, name: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id))
    toast({ title: 'Rule Deleted', description: `${name} has been removed.`, type: 'info' })
  }

  const handleToggleActive = (id: string) => {
    setRules((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextState = !r.active
          toast({
            title: nextState ? 'Rule Activated' : 'Rule Paused',
            description: `${r.serviceName} is now ${nextState ? 'active' : 'inactive'}.`,
            type: nextState ? 'success' : 'info',
          })
          return { ...r, active: nextState }
        }
        return r
      })
    )
  }

  const handleOpenAddModal = () => {
    setEditingRuleId(null)
    setFormState({
      serviceName: '',
      category: 'Capital',
      basePercent: 3.5,
      flatBonus: 500,
      rankMultiplier: 1.2,
      active: true,
    })
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (rule: CommissionRule) => {
    setEditingRuleId(rule.id)
    setFormState({
      serviceName: rule.serviceName,
      category: rule.category,
      basePercent: rule.basePercent,
      flatBonus: rule.flatBonus,
      rankMultiplier: rule.rankMultiplier,
      active: rule.active,
    })
    setIsModalOpen(true)
  }

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.serviceName.trim()) {
      toast({ title: 'Validation Error', description: 'Please enter a service product name.', type: 'error' })
      return
    }

    if (editingRuleId) {
      setRules((prev) =>
        prev.map((r) => (r.id === editingRuleId ? { ...r, ...formState } : r))
      )
      toast({ title: 'Rule Updated', description: 'Commission rule updated successfully.', type: 'success' })
    } else {
      const newRule: CommissionRule = {
        id: `cm_${Date.now()}`,
        ...formState,
      }
      setRules((prev) => [newRule, ...prev])
      toast({ title: 'New Rule Created', description: `${formState.serviceName} rule is now live.`, type: 'success' })
    }
    setIsModalOpen(false)
  }

  // Filter & Pagination
  const filteredRules = useMemo(() => {
    return rules
      .filter((r) => {
        const matchesSearch = r.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = categoryFilter === 'All' || r.category === categoryFilter
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => (sortOrder === 'asc' ? a.basePercent - b.basePercent : b.basePercent - a.basePercent))
  }, [rules, searchQuery, categoryFilter, sortOrder])

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
    <div className="space-y-6 text-left max-w-7xl mx-auto pb-10">
      {/* PAGE HEADER */}
      <PageHeader
        title="Commission Maker & Visual Rule Builder"
        description="Configure dynamic revenue splits, flat referral bonuses, and 9-tier rank multipliers with real-time payout simulation."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Commission Maker', icon: <Sliders className="w-3.5 h-3.5 text-amber-500" /> },
        ]}
        badge={
          <Badge variant="emerald" size="sm" dot>
            Live Simulator Active
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCsv}
              leftIcon={<FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />}
            >
              CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPdf}
              leftIcon={<Printer className="w-3.5 h-3.5 text-blue-600" />}
            >
              PDF Report
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={handleOpenAddModal}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Rule
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveRule}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Rules
            </Button>
          </div>
        }
      />

      {/* 3 TOP KPI HIGHLIGHT STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0D1E36] flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Configured Rules
            </span>
            <div className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-0.5">
              {rules.length} Services
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {rules.filter((r) => r.active).length} active in simulation engine
            </p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0D1E36] flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Base Commission Range
            </span>
            <div className="text-xl font-bold font-heading text-emerald-600 dark:text-emerald-400 mt-0.5">
              2.0% – 15.0%
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Average base rate: 5.0% across catalog
            </p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Percent className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0D1E36] flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Max Rank Multiplier
            </span>
            <div className="text-xl font-bold font-heading text-purple-600 dark:text-purple-400 mt-0.5">
              1.80x (Rank 9)
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Senior National Channel VP bonus cap
            </p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Award className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* LIVE DEAL PAYOUT CALCULATOR (HERO CARD) */}
      <Card
        variant="default"
        className="p-5 sm:p-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] shadow-sm rounded-2xl space-y-5"
      >
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-xs">
              <Calculator className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-bold text-base font-heading text-slate-900 dark:text-white">
                Live Deal Payout Calculator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Test how rank multipliers and base splits affect earnings in real-time.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Badge variant="primary" size="sm">
              Real-Time Formula
            </Badge>
          </div>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Controls Column (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {/* Deal Size Input with Presets */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Deal Size ($)
                  </label>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(calcDealSize)}
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-xs">$</span>
                  <input
                    type="number"
                    step={25000}
                    min={10000}
                    max={5000000}
                    value={calcDealSize}
                    onChange={(e) => setCalcDealSize(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Quick Presets Pills */}
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  <span className="text-[10px] text-slate-400 font-medium mr-1">Presets:</span>
                  {DEAL_PRESETS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setCalcDealSize(p.value)}
                      className={`text-[10.5px] font-medium px-2 py-0.5 rounded transition-all cursor-pointer ${
                        calcDealSize === p.value
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Product & Coach Rank Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Service Product */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase tracking-wider">
                    Service Product
                  </label>
                  <select
                    value={calcService}
                    onChange={(e) => setCalcService(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase tracking-wider">
                    Coach Rank Tier
                  </label>
                  <select
                    value={calcRankLevel}
                    onChange={(e) => setCalcRankLevel(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Array.from({ length: 9 }).map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Tier #{i + 1} (Rank {i + 1} Multiplier: {(1 + i * 0.1).toFixed(1)}x)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Formula Status Breakdown Bar */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span>Applied Rule:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {activeRule.basePercent}% Base
                </span>
                <span>+</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(activeRule.flatBonus)} Bonus
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Combined Multiplier:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded text-[10.5px]">
                  {effectiveMultiplier.toFixed(2)}x
                </span>
              </div>
            </div>
          </div>

          {/* Payout Summary Output Card (5 Columns) */}
          <div className="lg:col-span-5 p-5 rounded-xl bg-slate-900 text-white dark:bg-[#071324] border border-slate-800 dark:border-[#1E3A5F] flex flex-col justify-between space-y-4 shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Calculated Coach Payout
                </span>
                <Badge variant="emerald" size="sm">
                  Gross Share: {coachPayoutPercent}%
                </Badge>
              </div>

              {/* Big Currency Display */}
              <div className="mt-3">
                <div className="text-3xl font-extrabold font-heading tracking-tight text-emerald-400">
                  {formatCurrency(totalCommission)}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Total payout dispatched to coach upon funded deal close
                </p>
              </div>

              {/* Visual Deal Split Progress Bar */}
              <div className="mt-3.5 space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>Coach Split ({coachPayoutPercent}%)</span>
                  <span>Platform Retained ({(100 - Number(coachPayoutPercent)).toFixed(1)}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(5, Number(coachPayoutPercent)))}%` }}
                  />
                </div>
              </div>

              {/* Sub-components Grid */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80">
                <div className="p-2 rounded bg-slate-800/50">
                  <span className="text-[9.5px] uppercase font-bold text-slate-400 block">
                    Base Deal Commission
                  </span>
                  <span className="text-xs font-bold text-slate-200 mt-0.5 block">
                    {formatCurrency(basePayout)}
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-800/50">
                  <span className="text-[9.5px] uppercase font-bold text-blue-400 block">
                    Multiplier & Bonus
                  </span>
                  <span className="text-xs font-bold text-blue-300 mt-0.5 block">
                    +{formatCurrency(totalCommission - basePayout)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Platform Retention */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Net Platform Retained:</span>
              <span className="font-extrabold text-white text-sm">
                {formatCurrency(netPlatformRevenue)}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* COMMISSION RULES MATRIX TABLE */}
      <div className="space-y-3">
        {/* Table Filter & Search Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0D1E36] p-3 rounded-xl border border-slate-200/80 dark:border-[#1E3A5F]">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search service rules by name..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs">
              {['All', 'Capital', 'Advisory'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Button */}
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" />
              <span>Base % ({sortOrder.toUpperCase()})</span>
            </button>
          </div>
        </div>

        {/* Table Component */}
        <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-[#1E3A5F] bg-white dark:bg-[#0D1E36] shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Service Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Base Commission</th>
                <th className="py-3 px-4">Flat Referral Bonus</th>
                <th className="py-3 px-4">Rank Multiplier</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {paginatedRules.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    No commission rules match your search.
                  </td>
                </tr>
              ) : (
                paginatedRules.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      {r.serviceName}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="navy" size="sm">
                        {r.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400 text-xs">
                        {r.basePercent}%
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(r.flatBonus)}
                    </td>
                    <td className="py-3 px-4 font-bold text-purple-600 dark:text-purple-400">
                      {r.rankMultiplier}x
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(r.id)}
                        className="cursor-pointer"
                        title={r.active ? 'Click to Pause' : 'Click to Activate'}
                      >
                        <Badge
                          variant={r.active ? 'emerald' : 'default'}
                          size="sm"
                          dot={r.active}
                        >
                          {r.active ? 'Active' : 'Paused'}
                        </Badge>
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenEditModal(r)}
                          className="h-7 w-7 p-0"
                          title="Edit Rule"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteRule(r.id, r.serviceName)}
                          className="h-7 w-7 p-0 text-rose-500 border-rose-200 hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950/40"
                          title="Delete Rule"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION ROW */}
        <div className="flex items-center justify-between pt-1 text-xs text-slate-500 dark:text-slate-400">
          <div>
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

      {/* CREATE / EDIT COMMISSION RULE MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRuleId ? 'Edit Commission Rule' : 'Add New Commission Rule'}
        description="Configure base revenue percentage, referral bonus, and rank multiplier."
      >
        <form onSubmit={handleModalSubmit} className="space-y-4 text-xs pt-2">
          {/* Service Name */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Service Product Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Commercial Real Estate Mezzanine Loan"
              value={formState.serviceName}
              onChange={(e) => setFormState({ ...formState, serviceName: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Category
              </label>
              <select
                value={formState.category}
                onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="Capital">Capital & Lending</option>
                <option value="Advisory">Advisory & CFO</option>
                <option value="Insurance">Insurance & Risk</option>
                <option value="Recruiting">Recruiting & Gigs</option>
              </select>
            </div>

            {/* Base Commission % */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Base Commission (%)
              </label>
              <input
                type="number"
                step={0.1}
                min={0}
                max={50}
                required
                value={formState.basePercent}
                onChange={(e) => setFormState({ ...formState, basePercent: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
          </div>

          {/* Flat Bonus & Multiplier */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Flat Referral Bonus ($)
              </label>
              <input
                type="number"
                step={50}
                min={0}
                required
                value={formState.flatBonus}
                onChange={(e) => setFormState({ ...formState, flatBonus: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Rank Multiplier (x)
              </label>
              <input
                type="number"
                step={0.05}
                min={1.0}
                max={3.0}
                required
                value={formState.rankMultiplier}
                onChange={(e) => setFormState({ ...formState, rankMultiplier: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
            >
              {editingRuleId ? 'Update Rule' : 'Create Rule'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
