import React, { useState, useMemo } from 'react'
import {
  ShoppingBag,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  ChevronRight,
  X,
  Send,
  Building2,
  DollarSign,
  FileText,
  BadgeAlert,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'
import { CLIENT_ACTIVE_ORDERS, ClientServiceOrder } from '@/mock-data/clientData'
import { CMS_16_SOLUTION_PAGES } from '@/mock-data/adminFullData'
import { formatCurrency } from '@/lib/utils'

export const ClientOrdersPage: React.FC = () => {
  const { toast } = useToast()

  const [orders, setOrders] = useState<ClientServiceOrder[]>(CLIENT_ACTIVE_ORDERS)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Processing' | 'In Review' | 'Active' | 'Completed'>('All')

  // Request Modal State
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>(CMS_16_SOLUTION_PAGES[0].slug)
  const [requestedAmount, setRequestedAmount] = useState<number>(250000)
  const [clientNotes, setClientNotes] = useState<string>('')

  const activeServiceInfo = CMS_16_SOLUTION_PAGES.find((s) => s.slug === selectedServiceSlug) || CMS_16_SOLUTION_PAGES[0]

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault()

    const newOrder: ClientServiceOrder = {
      id: `ord_${Math.floor(100 + Math.random() * 900)}`,
      serviceName: activeServiceInfo.title,
      category: 'Capital',
      amount: requestedAmount,
      progress: 10,
      status: 'Processing',
      requestedDate: new Date().toISOString().split('T')[0],
      estimatedCompletion: '2026-10-30',
      assignedAdvisor: 'Marcus Vance (Senior Advisor)',
    }

    setOrders([newOrder, ...orders])
    setIsRequestModalOpen(false)
    toast({
      title: 'Service Request Submitted!',
      description: `Your request for "${activeServiceInfo.title}" (${formatCurrency(requestedAmount)}) was sent to your coach.`,
      type: 'success',
    })
  }

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch = o.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'All' || o.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [orders, searchQuery, statusFilter])

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="My Services & Orders"
        description="View your active financial facilities, request additional enterprise services, and track fulfillment status."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'My Services & Orders' }]}
        badge={
          <Badge variant="navy" size="md">
            {orders.length} Active Orders
          </Badge>
        }
        actions={
          <Button
            variant="accent"
            size="sm"
            onClick={() => setIsRequestModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Request New Service
          </Button>
        }
      />

      {/* FILTER & SEARCH BAR */}
      <Card variant="default" className="p-4 space-y-3 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search active orders..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5">
            {(['All', 'Processing', 'In Review', 'Active', 'Completed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  statusFilter === st
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* ORDERS DATA TABLE */}
      <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-3 px-4">Order ID & Service Title</th>
                <th className="py-3 px-4">Requested Facility Size</th>
                <th className="py-3 px-4">Progress</th>
                <th className="py-3 px-4">Requested Date</th>
                <th className="py-3 px-4">Assigned Advisor</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{o.serviceName}</div>
                      <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400">{o.id}</div>
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(o.amount)}
                    </td>
                    <td className="py-3 px-4 w-48">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>Fulfillment</span>
                          <span className="font-bold">{o.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full rounded-full"
                            style={{ width: `${o.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{o.requestedDate}</td>
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">{o.assignedAdvisor}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          o.status === 'Completed'
                            ? 'emerald'
                            : o.status === 'Active'
                            ? 'primary'
                            : o.status === 'In Review'
                            ? 'amber'
                            : 'gold'
                        }
                        size="sm"
                        dot
                      >
                        {o.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No orders match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* REQUEST ANY OF 16 SERVICES MODAL */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <Card variant="bento" className="w-full max-w-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 my-8">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-500" />
                <span>Request Enterprise Service (16 Solutions)</span>
              </h3>
              <button onClick={() => setIsRequestModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4 text-xs">
              {/* Select Service Dropdown */}
              <div>
                <label className="font-bold block mb-1">Select Financial / Advisory Solution</label>
                <select
                  value={selectedServiceSlug}
                  onChange={(e) => setSelectedServiceSlug(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-bold"
                >
                  {CMS_16_SOLUTION_PAGES.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Details Preview Box */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="font-bold text-blue-600 dark:text-blue-400">{activeServiceInfo.title}</div>
                <p className="text-[11px] text-slate-500">{activeServiceInfo.bodyText}</p>
              </div>

              {/* Requested Facility Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold block mb-1">Desired Amount ($)</label>
                  <input
                    type="number"
                    step={10000}
                    value={requestedAmount}
                    onChange={(e) => setRequestedAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Assigned Coach</label>
                  <input
                    type="text"
                    disabled
                    value="Marcus Vance (Senior Advisor)"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="font-bold block mb-1">Additional Project Notes / Special Requests</label>
                <textarea
                  rows={3}
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="Mention target timeline, current monthly revenue, or specific collateral..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <Button variant="outline" size="sm" onClick={() => setIsRequestModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="accent" size="sm" leftIcon={<Send className="w-4 h-4" />}>
                  Submit Service Request
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
