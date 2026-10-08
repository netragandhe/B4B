import React, { useState } from 'react'
import {
  Users,
  Search,
  Building,
  FileCheck2,
  DollarSign,
  Calendar,
  CreditCard,
  FileText,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Drawer } from '@/components/ui/Drawer'
import { Tabs } from '@/components/ui/Tabs'
import { useToast } from '@/components/ui/Toast'
import { BIZPRO_CLIENTS, BizProClient } from '@/mock-data/bizproData'
import { formatCurrency } from '@/lib/utils'

export const BizProClientsPage: React.FC = () => {
  const { toast } = useToast()
  const [clients, setClients] = useState<BizProClient[]>(BIZPRO_CLIENTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClient, setSelectedClient] = useState<BizProClient | null>(null)
  const [activeTab, setActiveTab] = useState('Overview')

  const filteredClients = clients.filter(
    (c) =>
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Client Directory & Accounts"
        description="View active accounts, purchased services, CFO assignments, and billing."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Clients', icon: <Users className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="emerald" size="md">
            {filteredClients.length} Active Accounts
          </Badge>
        }
      />

      {/* SEARCH BAR */}
      <Card variant="default" className="p-4 flex items-center gap-3">
        <Input
          placeholder="Search clients by name, company, email..."
          leftIcon={<Search className="w-4 h-4" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Card>

      {/* CLIENTS TABLE */}
      <Card variant="default" className="divide-y divide-slate-100 dark:divide-[#1E3A5F]">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            onClick={() => {
              setSelectedClient(client)
              setActiveTab('Overview')
            }}
            className="p-4 hover:bg-slate-50/80 dark:hover:bg-[#12294A]/40 cursor-pointer flex items-center justify-between gap-4 text-xs transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Avatar src={client.avatar} name={client.name} size="md" status="online" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white truncate">
                    {client.company}
                  </span>
                  <Badge
                    variant={client.status === 'Active' ? 'emerald' : client.status === 'Renewal Due' ? 'amber' : 'default'}
                    size="sm"
                  >
                    {client.status}
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  Contact: {client.name} ({client.email}) • CFO: {client.cfoAssigned}
                </p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {client.servicesPurchased.map((srv, idx) => (
                    <span key={idx} className="text-[10px] font-semibold px-2 py-0.2 rounded bg-slate-100 dark:bg-[#12294A] text-slate-600 dark:text-slate-400">
                      {srv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-400 shrink-0">
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase block text-slate-400">Funded / Retainer</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                  {formatCurrency(client.totalRevenue)}
                </span>
              </div>
              <Button size="sm" variant="outline" className="h-7 text-xs">
                Inspect Account
              </Button>
            </div>
          </div>
        ))}
      </Card>

      {/* CLIENT DETAIL DRAWER WITH 5 TABS */}
      <Drawer
        isOpen={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        title="Client Account Detail"
        size="lg"
      >
        {selectedClient && (
          <div className="space-y-6 text-left">
            {/* Header profile */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-[#12294A] dark:to-[#0D1E36] border border-blue-100 dark:border-[#1E3A5F] flex items-center gap-3">
              <Avatar src={selectedClient.avatar} name={selectedClient.name} size="lg" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                    {selectedClient.company}
                  </h3>
                  <Badge variant="emerald" size="sm">
                    {selectedClient.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">Contact: {selectedClient.name} • Joined {selectedClient.joinDate}</p>
              </div>
            </div>

            {/* TAB BAR */}
            <Tabs
              tabs={[
                { id: 'Overview', label: 'Overview' },
                { id: 'Services', label: 'Services' },
                { id: 'Documents', label: 'Documents' },
                { id: 'Notes', label: 'Notes' },
                { id: 'Billing', label: 'Billing' },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            {/* TAB CONTENTS */}
            {activeTab === 'Overview' && (
              <div className="space-y-4 text-xs animate-fadeIn">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A]">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Assigned Fractional CFO</span>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">{selectedClient.cfoAssigned}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A]">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Total Capital / Retainer</span>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{formatCurrency(selectedClient.totalRevenue)}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Services' && (
              <div className="space-y-2 text-xs animate-fadeIn">
                {selectedClient.servicesPurchased.map((srv, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{srv}</span>
                    <Badge variant="emerald" size="sm">Active</Badge>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Documents' && (
              <div className="p-4 text-center text-xs text-slate-500 animate-fadeIn">
                <FileCheck2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p>Documents synced via eBOX Vault.</p>
                <Button size="sm" variant="outline" className="mt-2 text-xs" onClick={() => toast({ title: 'Opening eBOX', type: 'info' })}>
                  View in eBOX Vault
                </Button>
              </div>
            )}

            {activeTab === 'Notes' && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] text-xs space-y-2 animate-fadeIn">
                <p>• Q3 Financial statements verified by underwriting.</p>
                <p>• Client scheduled for quarterly CFO review call.</p>
              </div>
            )}

            {activeTab === 'Billing' && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#12294A] text-xs space-y-2 animate-fadeIn">
                <div className="flex justify-between">
                  <span className="text-slate-500">Billing Cycle:</span>
                  <span className="font-bold">Monthly Recurring</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Status:</span>
                  <span className="font-bold text-emerald-500">Auto-Debit Active</span>
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  )
}
