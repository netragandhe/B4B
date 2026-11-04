import React, { useState } from 'react'
import {
  BarChart3,
  Download,
  Calendar,
  PieChart as PieIcon,
  TrendingUp,
  FileSpreadsheet,
  FileText,
} from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'

export const AdminReportsAnalyticsPage: React.FC = () => {
  const { toast } = useToast()
  const [dateRange, setDateRange] = useState('Trailing 30 Days')

  const categoryShare = [
    { name: 'Capital Facilities', value: 55, color: '#2563EB' },
    { name: 'CFO Advisory', value: 25, color: '#10B981' },
    { name: 'Equipment Leasing', value: 12, color: '#F59E0B' },
    { name: 'Tax & Compliance', value: 8, color: '#8B5CF6' },
  ]

  const monthlyTrend = [
    { month: 'May', volume: 8.4 },
    { month: 'Jun', volume: 10.2 },
    { month: 'Jul', volume: 11.8 },
    { month: 'Aug', volume: 12.9 },
    { month: 'Sep', volume: 13.5 },
    { month: 'Oct', volume: 14.8 },
  ]

  const handleExportCSV = () => {
    toast({
      title: 'CSV Export Generated',
      description: `Dispatched network analytics report for ${dateRange}.`,
      type: 'success',
    })
  }

  const handleExportPDF = () => {
    toast({
      title: 'PDF Executive Report Downloaded',
      description: 'Official board presentation PDF report saved.',
      type: 'success',
    })
  }

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Reports & Executive Analytics"
        description="Comprehensive network performance metrics, product category market share, and revenue growth trends."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Reports & Analytics', icon: <BarChart3 className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="emerald" size="md">
            Executive Analytics
          </Badge>
        }
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              leftIcon={<FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />}
            >
              Export CSV
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={handleExportPDF}
              leftIcon={<FileText className="w-3.5 h-3.5" />}
            >
              Export PDF Report
            </Button>
          </>
        }
      />

      {/* DATE RANGE PICKER BAR */}
      <Card variant="default" className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span>Select Date Range:</span>
        </div>

        <div className="w-64">
          <Select
            options={[
              { label: 'Trailing 30 Days', value: 'Trailing 30 Days' },
              { label: 'Q3 2026 (July - Sept)', value: 'Q3 2026' },
              { label: 'YTD 2026 (Jan - Oct)', value: 'YTD 2026' },
              { label: 'Trailing 12 Months', value: 'Trailing 12 Months' },
            ]}
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="text-xs h-9"
          />
        </div>
      </Card>

      {/* RECHARTS VISUALIZATION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Volume Growth */}
        <Card variant="bento" className="lg:col-span-7 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Network Funded Volume ($ Millions)
              </h3>
              <p className="text-xs text-slate-500">Cumulative capital disbursements.</p>
            </div>
            <Badge variant="emerald" size="sm">
              $14.8M Current
            </Badge>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(v) => `$${v}M`} />
                <RechartsTooltip
                  formatter={(val: any) => [`$${val} Million`, 'Volume']}
                  contentStyle={{
                    backgroundColor: '#0D1E36',
                    borderRadius: '10px',
                    border: '1px solid #1E3A5F',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="volume" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 2: Product Category Distribution */}
        <Card variant="bento" className="lg:col-span-5 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Category Revenue Share (%)
              </h3>
              <p className="text-xs text-slate-500">Market share across 4 solution categories.</p>
            </div>
            <PieIcon className="w-4 h-4 text-emerald-500" />
          </div>

          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryShare} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {categoryShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(val: any) => [`${val}%`, 'Share']}
                  contentStyle={{
                    backgroundColor: '#0D1E36',
                    borderRadius: '10px',
                    border: '1px solid #1E3A5F',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
