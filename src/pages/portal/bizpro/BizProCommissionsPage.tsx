import React from 'react'
import {
  Wallet,
  Download,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Clock,
  ArrowUpRight,
} from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from 'recharts'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CountUp } from '@/components/ui/CountUp'
import { StatCard } from '@/components/ui/StatCard'
import { useToast } from '@/components/ui/Toast'
import { formatCurrency } from '@/lib/utils'

export const BizProCommissionsPage: React.FC = () => {
  const { toast } = useToast()

  const payoutHistory = [
    { month: 'May', direct: 3500, override: 700 },
    { month: 'Jun', direct: 5200, override: 1600 },
    { month: 'Jul', direct: 7800, override: 1700 },
    { month: 'Aug', direct: 9100, override: 2100 },
    { month: 'Sep', direct: 11000, override: 2800 },
    { month: 'Oct', direct: 11500, override: 2750 },
  ]

  const commissionLedger = [
    {
      id: 'tx_101',
      date: '2026-10-04',
      client: 'Apex Freight LLC',
      service: 'Revolving Line ($850k)',
      dealValue: 850000,
      rate: '18.0%',
      commissionAmount: 15300,
      status: 'Paid',
    },
    {
      id: 'tx_102',
      date: '2026-09-28',
      client: 'Quantum Tech Labs',
      service: 'Fractional CFO Retainer',
      dealValue: 950000,
      rate: '18.0%',
      commissionAmount: 17100,
      status: 'Paid',
    },
    {
      id: 'tx_103',
      date: '2026-09-15',
      client: 'Sterling E-Commerce',
      service: 'Revenue-Based Credit',
      dealValue: 350000,
      rate: '18.0%',
      commissionAmount: 6300,
      status: 'Paid',
    },
    {
      id: 'tx_104',
      date: '2026-10-06',
      client: 'Mendez Storage',
      service: 'Equipment Lease Refi',
      dealValue: 450000,
      rate: '18.0%',
      commissionAmount: 8100,
      status: 'Processing',
    },
  ]

  const handleDownloadStatement = () => {
    toast({
      title: 'Commission Statement PDF Exported',
      description: 'Q4 Oct 2026 official commission statement dispatches to downloads folder.',
      type: 'success',
    })
  }

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="My Commissions & Overrides Vault"
        description="Track direct deal commissions, team override earnings, and historical payout statements."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Commissions', icon: <Wallet className="w-3.5 h-3.5 text-gold" /> },
        ]}
        badge={
          <Badge variant="gold" size="md">
            Rate: 18% Direct + 3% Override
          </Badge>
        }
        actions={
          <Button
            variant="accent"
            size="md"
            onClick={handleDownloadStatement}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Download Payout Statement (PDF)
          </Button>
        }
      />

      {/* KPI STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="October Earnings"
          value={<CountUp value={14250} prefix="$" />}
          change={12.8}
          changePeriod="vs last month"
          icon={<DollarSign className="w-5 h-5" />}
          variant="gold"
          caption="Disbursement date: Oct 15"
        />

        <StatCard
          title="Direct Sales Commission"
          value={<CountUp value={11500} prefix="$" />}
          change={14.0}
          changePeriod="8 funded deals"
          icon={<TrendingUp className="w-5 h-5" />}
          variant="emerald"
          caption="Based on 18% Rank 4 Tier"
        />

        <StatCard
          title="Team Override Earnings"
          value={<CountUp value={2750} prefix="$" />}
          change={8.5}
          changePeriod="4 team reps"
          icon={<Wallet className="w-5 h-5" />}
          variant="royal"
          caption="3% District Leader override"
        />

        <StatCard
          title="YTD Total Payout"
          value={<CountUp value={78400} prefix="$" />}
          change={28.5}
          changePeriod="2026 YTD"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          variant="default"
          caption="100% On-time ACH transfers"
        />
      </div>

      {/* PAYOUT HISTORY BAR CHART */}
      <Card variant="bento" className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              Monthly Payout History (Direct vs Overrides)
            </h3>
            <p className="text-xs text-slate-500">Trailing 6-month earnings breakdown.</p>
          </div>
          <Badge variant="gold" size="sm">
            Total Oct: $14,250
          </Badge>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={payoutHistory} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(val) => `$${val / 1000}k`} />
              <RechartsTooltip
                formatter={(val: any) => [`$${Number(val).toLocaleString()}`, '']}
                contentStyle={{
                  backgroundColor: '#0D1E36',
                  borderRadius: '10px',
                  border: '1px solid #1E3A5F',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="direct" name="Direct Commission" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="override" name="Team Override" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* COMMISSION LEDGER TABLE */}
      <div className="space-y-3">
        <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
          Detailed Commission Transaction Ledger
        </h3>

        <Card variant="default" className="divide-y divide-slate-100 dark:divide-[#1E3A5F]">
          {commissionLedger.map((tx) => (
            <div key={tx.id} className="p-4 flex items-center justify-between gap-4 text-xs">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white truncate">{tx.client}</span>
                  <Badge variant={tx.status === 'Paid' ? 'emerald' : 'amber'} size="sm">
                    {tx.status}
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  Service: {tx.service} • Deal Vol: {formatCurrency(tx.dealValue)} • Rate: {tx.rate}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Commission</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                  {formatCurrency(tx.commissionAmount)}
                </span>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
