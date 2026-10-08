import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  DollarSign,
  Download,
  Calendar,
  CreditCard,
  TrendingUp,
  Percent,
  CheckCircle2,
  Clock,
  Filter,
  FileText,
  Search,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Users2,
} from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useBizProCommissions } from '@/hooks/queries/useBizProData'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'

export const BizProCommissionsPage: React.FC = () => {
  const { user } = useAuth()
  const { data: commissions = [], isLoading } = useBizProCommissions()
  const { toast } = useToast()

  const [selectedType, setSelectedType] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const isLeadership = (user?.rank || 4) >= 4

  const filteredItems = commissions.filter((c) => {
    const matchesSearch =
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.dealId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.solution.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'All' || c.type.includes(selectedType)
    return matchesSearch && matchesType
  })

  const totalCommissions = commissions.reduce((sum, item) => sum + item.amount, 0)
  const personalCommissions = commissions
    .filter((c) => c.type === 'Personal Direct')
    .reduce((sum, item) => sum + item.amount, 0)
  const teamOverrides = commissions
    .filter((c) => c.type.startsWith('Team Override'))
    .reduce((sum, item) => sum + item.amount, 0)
  const pendingPayouts = commissions
    .filter((c) => c.status === 'Processing' || c.status === 'Pending Settlement')
    .reduce((sum, item) => sum + item.amount, 0)

  const handleDownloadStatement = () => {
    toast({
      title: 'Monthly Statement Generated',
      description: 'Downloaded official Biz Pro Commission Statement (October 2026).pdf',
      type: 'success',
    })
  }

  return (
    <>
      <Helmet>
        <title>Commission Statement & Earnings | Biz Pro Terminal</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Commission Statements
              </h1>
              <Badge variant="emerald" size="sm">
                Direct ACH Direct Deposit
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Itemized deal origination fees, leadership team overrides, and monthly settlement ledger.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button variant="outline" size="sm" onClick={handleDownloadStatement}>
              <Download className="w-4 h-4 mr-1.5" />
              Download PDF Statement
            </Button>
          </div>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Month Earnings</span>
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              ${totalCommissions.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +18.2% vs previous billing period
            </p>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Personal Direct Deals</span>
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              ${personalCommissions.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Rate: {(user?.rank || 4) >= 4 ? '12.5%' : '7.5%'} on closed facilities
            </p>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Team Overrides</span>
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                <Users2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {isLeadership ? `$${teamOverrides.toLocaleString()}` : '$0'}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {isLeadership ? 'Level 1 (2.0%) + Level 2 (1.0%)' : 'Locked (Requires Rank 4+)'}
            </p>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">In Settlement Queue</span>
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              ${pendingPayouts.toLocaleString()}
            </div>
            <p className="text-[11px] text-blue-600 dark:text-blue-400 mt-1">
              Direct deposit arrives on Friday
            </p>
          </Card>
        </div>

        {/* Breakdown bar */}
        <Card className="p-5 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-900 dark:text-slate-100">
              Revenue Stream Breakdown
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              Direct: {Math.round((personalCommissions / totalCommissions) * 100)}% | Overrides:{' '}
              {Math.round((teamOverrides / totalCommissions) * 100)}%
            </span>
          </div>
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full flex overflow-hidden">
            <div
              className="bg-blue-600 h-full"
              style={{ width: `${(personalCommissions / totalCommissions) * 100}%` }}
              title="Personal Direct"
            />
            <div
              className="bg-amber-500 h-full"
              style={{ width: `${(teamOverrides / totalCommissions) * 100}%` }}
              title="Team Overrides"
            />
          </div>
          <div className="flex items-center gap-6 mt-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-blue-600" />
              <span className="text-slate-600 dark:text-slate-300">
                Personal Deals: ${personalCommissions.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-amber-500" />
              <span className="text-slate-600 dark:text-slate-300">
                Leadership Overrides: ${teamOverrides.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>

        {/* Filter and Table */}
        <Card className="bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
          <div className="p-4 border-b border-slate-100 dark:border-[#1E3A5F] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search deal ID, client, or solution..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Stream:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] text-xs font-semibold rounded-xl px-3 py-1.5 text-slate-900 dark:text-slate-100 focus:outline-hidden"
              >
                <option value="All">All Streams</option>
                <option value="Personal Direct">Personal Direct</option>
                <option value="Team Override">Team Overrides</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-[#1E3A5F] text-slate-400 uppercase text-[10px] font-semibold bg-slate-50/50 dark:bg-[#12294A]/40">
                  <th className="p-3.5">Deal ID</th>
                  <th className="p-3.5">Client & Solution</th>
                  <th className="p-3.5">Settlement Date</th>
                  <th className="p-3.5">Gross Volume</th>
                  <th className="p-3.5">Commission Rate</th>
                  <th className="p-3.5">Payout Amount</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1E3A5F]/60">
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                      Loading commission records...
                    </td>
                  </tr>
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                      No commission records matched your filter.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-[#12294A] transition-colors">
                      <td className="p-3.5 font-mono text-slate-500 dark:text-slate-400 font-semibold">
                        {item.dealId}
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-slate-900 dark:text-slate-100 block">
                          {item.clientName}
                        </span>
                        <span className="text-[11px] text-slate-400">{item.solution}</span>
                      </td>
                      <td className="p-3.5 text-slate-500 dark:text-slate-400">{item.date}</td>
                      <td className="p-3.5 font-mono font-medium text-slate-700 dark:text-slate-300">
                        ${item.grossVolume.toLocaleString()}
                      </td>
                      <td className="p-3.5 font-bold text-blue-600 dark:text-blue-400">
                        {item.commissionRate}%
                      </td>
                      <td className="p-3.5 font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                        +${item.amount.toLocaleString()}
                      </td>
                      <td className="p-3.5">
                        <Badge
                          variant={item.type.startsWith('Team') ? 'gold' : 'primary'}
                          size="sm"
                        >
                          {item.type}
                        </Badge>
                      </td>
                      <td className="p-3.5">
                        <Badge
                          variant={item.status === 'Paid' ? 'emerald' : 'royal'}
                          size="sm"
                          dot
                        >
                          {item.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  )
}
