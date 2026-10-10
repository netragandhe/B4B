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
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

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
      service: 'Business Funding and Loans ($850k)',
      dealValue: 850000,
      rate: '18.0%',
      commissionAmount: 15300,
      status: 'Paid',
    },
    {
      id: 'tx_102',
      date: '2026-09-28',
      client: 'Quantum Tech Labs',
      service: 'Business Management & Advisory',
      dealValue: 950000,
      rate: '18.0%',
      commissionAmount: 17100,
      status: 'Paid',
    },
    {
      id: 'tx_103',
      date: '2026-09-15',
      client: 'Sterling E-Commerce',
      service: 'Accept Payments Solution',
      dealValue: 350000,
      rate: '18.0%',
      commissionAmount: 6300,
      status: 'Paid',
    },
    {
      id: 'tx_104',
      date: '2026-10-06',
      client: 'Mendez Storage',
      service: 'Build Business Credit Suite',
      dealValue: 450000,
      rate: '18.0%',
      commissionAmount: 8100,
      status: 'Processing',
    },
  ]

  const handleDownloadStatement = () => {
    const doc = new jsPDF()

    // Header
    doc.setFillColor(13, 30, 54) // Navy
    doc.rect(0, 0, 210, 36, 'F')

    doc.setFontSize(20)
    doc.setTextColor(255, 255, 255)
    doc.text('B4B AMERICA', 14, 20)
    doc.setFontSize(10)
    doc.setTextColor(165, 180, 252)
    doc.text('B4B Coach Official Commission & Overrides Statement', 14, 28)

    doc.setFontSize(14)
    doc.setTextColor(255, 255, 255)
    doc.text('STATEMENT OF EARNINGS', 196, 22, { align: 'right' })

    // Meta
    doc.setFontSize(10)
    doc.setTextColor(51, 65, 85)
    doc.text(`Coach Name: Marcus Vance`, 14, 48)
    doc.text(`Rank Level: District Leader (Rank 4)`, 14, 54)
    doc.text(`Settlement Cycle: October 2026`, 14, 60)

    doc.text(`Generated Date: ${new Date().toLocaleDateString()}`, 130, 48)
    doc.text(`Disbursement Status: Direct ACH Active`, 130, 54)
    doc.text(`Direct Rate: 18% + 3% Override`, 130, 60)

    // Table
    autoTable(doc, {
      startY: 70,
      head: [['Tx ID', 'Date', 'Client Company', 'Service Solution', 'Deal Vol', 'Rate', 'Commission']],
      body: commissionLedger.map((tx) => [
        tx.id,
        tx.date,
        tx.client,
        tx.service,
        `$${tx.dealValue.toLocaleString()}`,
        tx.rate,
        `$${tx.commissionAmount.toLocaleString()}`,
      ]),
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 8, cellPadding: 4 },
    })

    const finalY = (doc as any).lastAutoTable?.finalY || 130

    // Summary Box
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Direct Commission Total:', 120, finalY + 12)
    doc.setFont('helvetica', 'normal')
    doc.text('$11,500.00', 196, finalY + 12, { align: 'right' })

    doc.setFont('helvetica', 'bold')
    doc.text('Team Override Total:', 120, finalY + 18)
    doc.setFont('helvetica', 'normal')
    doc.text('$2,750.00', 196, finalY + 18, { align: 'right' })

    doc.setFont('helvetica', 'bold')
    doc.text('Net October Payout:', 120, finalY + 26)
    doc.setFontSize(13)
    doc.setTextColor(16, 185, 129) // Emerald
    doc.text('$14,250.00 USD', 196, finalY + 26, { align: 'right' })

    doc.save('B4B-Commission-Statement-Oct2026.pdf')

    toast({
      title: 'Commission Statement PDF Exported',
      description: 'Q4 Oct 2026 official statement downloaded successfully.',
      type: 'success',
    })
  }

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto">
      <PageHeader
        title="My Commissions & Overrides Vault"
        description="Track direct deal commissions, team override earnings, and historical payout statements."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/bizpro/bulletin' },
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
            className="font-bold gap-2"
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
      <Card variant="default" className="p-5 sm:p-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-white">
              Monthly Payout History (Direct vs Overrides)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Trailing 6-month historical commission settlement performance.</p>
          </div>
          <Badge variant="gold" size="md">
            Total Oct: $14,250
          </Badge>
        </div>

        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={payoutHistory} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} stroke="#94A3B8" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} tickFormatter={(val) => `$${val / 1000}k`} />
              <RechartsTooltip
                formatter={(val: any) => [`$${Number(val).toLocaleString()}`, '']}
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderRadius: '10px',
                  border: '1px solid #334155',
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
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-white">
            Detailed Commission Transaction Ledger
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {commissionLedger.length} Verified Transactions
          </span>
        </div>

        <Card variant="default" className="bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4 min-w-[100px]">Date</th>
                  <th className="py-3 px-4 min-w-[160px]">Client Company</th>
                  <th className="py-3 px-4 min-w-[200px]">Solution Facility</th>
                  <th className="py-3 px-4">Deal Volume</th>
                  <th className="py-3 px-4">Rate</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right min-w-[130px]">Commission Earned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-[#12294A]">
                {commissionLedger.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">{tx.id}</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">{tx.date}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{tx.client}</td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">{tx.service}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">{formatCurrency(tx.dealValue)}</td>
                    <td className="py-3.5 px-4 text-blue-600 dark:text-blue-300 font-semibold">{tx.rate}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={tx.status === 'Paid' ? 'emerald' : 'amber'} size="sm">
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-emerald-600 dark:text-emerald-400 text-sm whitespace-nowrap">
                      {formatCurrency(tx.commissionAmount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
