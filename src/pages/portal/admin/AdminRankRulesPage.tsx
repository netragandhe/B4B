import React, { useState } from 'react'
import {
  Trophy,
  Save,
  RotateCcw,
  FileSpreadsheet,
  Printer,
  Edit3,
  CheckCircle2,
  Users,
  Percent,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'
import { INITIAL_RANK_RULES, RankRule } from '@/mock-data/adminData'
import { formatCurrency } from '@/lib/utils'
import { exportToCsv, exportToPdf } from '@/lib/exportUtils'

export const AdminRankRulesPage: React.FC = () => {
  const { toast } = useToast()

  const [rules, setRules] = useState<RankRule[]>(INITIAL_RANK_RULES)

  const handleRuleChange = (level: number, field: keyof RankRule, value: any) => {
    setRules((prev) =>
      prev.map((r) => (r.level === level ? { ...r, [field]: value } : r))
    )
  }

  const handleSaveAll = () => {
    toast({
      title: 'Rank Rules Saved',
      description: 'Updated promotion requirements and commission overrides for all 9 ranks.',
      type: 'success',
    })
  }

  const handleResetDefaults = () => {
    setRules(INITIAL_RANK_RULES)
    toast({
      title: 'Reset to Defaults',
      description: 'Restored original 9 rank promotion rule criteria.',
      type: 'info',
    })
  }

  const handleExportCsv = () => {
    const headers = [
      'Level',
      'Title',
      'Min Monthly Vol',
      'Max Monthly Vol',
      'Consecutive Months Required',
      'Required Team Members',
      'Direct Commission %',
      'Team Override %',
    ]
    const rows = rules.map((r) => [
      r.level,
      r.title,
      r.personalMonthlyVolumeMin,
      r.personalMonthlyVolumeMax,
      r.consecutiveMonthsRequired,
      r.requiredTeamMembers,
      `${r.directCommissionPercent}%`,
      `${r.teamOverridePercent}%`,
    ])
    exportToCsv('Rank_And_Promotion_Rules_Matrix', headers, rows)
    toast({ title: 'CSV Downloaded', description: 'Rank rules exported to CSV.', type: 'success' })
  }

  const handleExportPdf = () => {
    const headers = [
      'Level',
      'Title',
      'Personal Monthly Vol Range',
      'Consecutive Months',
      'Team Members',
      'Direct Comm %',
      'Team Override %',
    ]
    const rows = rules.map((r) => [
      `Rank ${r.level}`,
      r.title,
      `${formatCurrency(r.personalMonthlyVolumeMin)} - ${formatCurrency(r.personalMonthlyVolumeMax)}`,
      `${r.consecutiveMonthsRequired} mos`,
      `${r.requiredTeamMembers} reps`,
      `${r.directCommissionPercent}%`,
      `${r.teamOverridePercent}%`,
    ])
    exportToPdf('Rank & Promotion Criteria Master Matrix', headers, rows)
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Rank & Promotion Rules Matrix (9 Ranks)"
        description="Configure qualification thresholds, required consecutive months, required team members, and override commissions for each rank."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Rank Rules', icon: <Trophy className="w-3.5 h-3.5 text-amber-500" /> },
        ]}
        badge={
          <Badge variant="navy" size="md">
            9 Rank Tiers
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
            <Button variant="outline" size="sm" onClick={handleResetDefaults} leftIcon={<RotateCcw className="w-3.5 h-3.5 text-amber-500" />}>
              Reset
            </Button>
            <Button variant="accent" size="sm" onClick={handleSaveAll} leftIcon={<Save className="w-4 h-4" />}>
              Save Rules
            </Button>
          </div>
        }
      />

      {/* RANK MATRIX TABLE */}
      <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-3 px-4">Rank Level</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Personal Monthly Vol Range</th>
                <th className="py-3 px-4">Consecutive Mos</th>
                <th className="py-3 px-4">Req. Team Members</th>
                <th className="py-3 px-4">Direct Comm %</th>
                <th className="py-3 px-4">Team Override %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rules.map((r) => (
                <tr key={r.level} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <Badge variant={r.level >= 4 ? 'gold' : 'navy'} size="sm">
                      Rank {r.level}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    <input
                      type="text"
                      value={r.title}
                      onChange={(e) => handleRuleChange(r.level, 'title', e.target.value)}
                      className="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 w-full font-bold"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={r.personalMonthlyVolumeMin}
                        onChange={(e) => handleRuleChange(r.level, 'personalMonthlyVolumeMin', Number(e.target.value))}
                        className="w-24 px-1.5 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        value={r.personalMonthlyVolumeMax}
                        onChange={(e) => handleRuleChange(r.level, 'personalMonthlyVolumeMax', Number(e.target.value))}
                        className="w-24 px-1.5 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min={1}
                      value={r.consecutiveMonthsRequired}
                      onChange={(e) => handleRuleChange(r.level, 'consecutiveMonthsRequired', Number(e.target.value))}
                      className="w-16 px-1.5 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-center font-bold"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min={0}
                      value={r.requiredTeamMembers}
                      onChange={(e) => handleRuleChange(r.level, 'requiredTeamMembers', Number(e.target.value))}
                      className="w-16 px-1.5 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-center font-bold"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={r.directCommissionPercent}
                        onChange={(e) => handleRuleChange(r.level, 'directCommissionPercent', Number(e.target.value))}
                        className="w-16 px-1.5 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-center font-bold text-blue-600 dark:text-blue-400"
                      />
                      <span>%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={r.teamOverridePercent}
                        onChange={(e) => handleRuleChange(r.level, 'teamOverridePercent', Number(e.target.value))}
                        className="w-16 px-1.5 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-center font-bold text-emerald-600 dark:text-emerald-400"
                      />
                      <span>%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
