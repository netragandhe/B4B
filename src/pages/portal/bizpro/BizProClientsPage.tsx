import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Building2,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  FileText,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Download,
  Plus,
  X,
  CreditCard,
  MessageSquare,
  CheckCircle2,
  Briefcase,
  AlertCircle,
  FileCheck,
  Percent,
} from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Drawer } from '@/components/ui/Drawer'
import { Tabs } from '@/components/ui/Tabs'
import { useToast } from '@/components/ui/Toast'
import { useBizProClients } from '@/hooks/queries/useBizProData'
import type { BizProClient } from '@/mock-data/bizProData'

export const BizProClientsPage: React.FC = () => {
  const { data: clients = [], isLoading } = useBizProClients()
  const { toast } = useToast()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('All')
  const [selectedClient, setSelectedClient] = useState<BizProClient | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [newNote, setNewNote] = useState('')
  const [clientNotes, setClientNotes] = useState<Record<string, Array<{ text: string; date: string; author: string }>>>({
    'cli-101': [
      { text: 'Underwriter approved $500k growth revolver increase based on Q3 accounts receivable.', date: 'Oct 05, 2026', author: 'Marcus Vance' },
      { text: 'Client requested guidance on fleet leasing tax deductions under Section 179.', date: 'Sep 22, 2026', author: 'Underwriting Desk' },
    ],
    'cli-102': [
      { text: 'CNC machinery installed and operational. Equipment loan first draw processed.', date: 'Oct 02, 2026', author: 'Marcus Vance' },
    ],
    'cli-103': [
      { text: 'Healthcare billing clearinghouse integration completed smoothly.', date: 'Sep 28, 2026', author: 'Advisory Pod' },
    ],
  })

  const industries = ['All', ...Array.from(new Set(clients.map((c) => c.industry)))]

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = selectedIndustry === 'All' || c.industry === selectedIndustry
    return matchesSearch && matchesIndustry
  })

  const totalFundedVolume = clients.reduce((acc, c) => acc + c.totalFundedVolume, 0)
  const totalCommissions = clients.reduce((acc, c) => acc + c.commissionGenerated, 0)
  const avgHealth = Math.round(clients.reduce((acc, c) => acc + c.healthScore, 0) / (clients.length || 1))

  const handleAddNote = () => {
    if (!selectedClient || !newNote.trim()) return
    const noteObj = {
      text: newNote.trim(),
      date: 'Just now',
      author: 'Marcus Vance (Biz Pro)',
    }
    setClientNotes((prev) => ({
      ...prev,
      [selectedClient.id]: [noteObj, ...(prev[selectedClient.id] || [])],
    }))
    setNewNote('')
    toast({
      title: 'Note Added to Client Record',
      description: 'Your underwriting log has been updated.',
      type: 'success',
    })
  }

  return (
    <>
      <Helmet>
        <title>Portfolio Clients | Biz Pro Terminal</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Portfolio Clients
              </h1>
              <Badge variant="primary" size="sm">
                {clients.length} Active Accounts
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Deep client files, active debt facilities, underwriting documents vault, and commission logs.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                toast({
                  title: 'Client Statement Exported',
                  description: 'Generated portfolio summary PDF report.',
                  type: 'success',
                })
              }}
            >
              <Download className="w-4 h-4 mr-1.5" />
              Export Portfolio
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                toast({
                  title: 'Convert Lead to Client',
                  description: 'Navigate to the Leads Kanban board to advance funded deals to active clients.',
                  type: 'info',
                })
              }}
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add Client
            </Button>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Funded Volume</span>
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              ${(totalFundedVolume / 1000).toFixed(0)}k
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Across 3 active commercial entities
            </p>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Commissions Generated</span>
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <Percent className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              ${totalCommissions.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Direct origination bonus & trailing points
            </p>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Average Portfolio Health</span>
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {avgHealth}%
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${avgHealth}%` }} />
            </div>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Debt Facilities</span>
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              5 Credit Lines
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Zero delinquent payments or defaults
            </p>
          </Card>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-white dark:bg-[#0D1E36] rounded-2xl border border-slate-200 dark:border-[#1E3A5F]">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by company name, contact, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Industry:</span>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] text-xs rounded-xl px-3 py-1.5 text-slate-900 dark:text-slate-100 font-medium focus:outline-hidden"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Client List Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading ? (
            <div className="col-span-full text-center py-12 text-slate-400">Loading client records...</div>
          ) : filteredClients.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-400">
              No clients matched your search criteria.
            </div>
          ) : (
            filteredClients.map((client) => (
              <Card
                key={client.id}
                className="hover:border-blue-500/50 transition-all cursor-pointer group bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] flex flex-col justify-between"
                onClick={() => setSelectedClient(client)}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                        {client.businessName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                          {client.businessName}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{client.industry}</p>
                      </div>
                    </div>
                    <Badge variant="emerald" size="sm">
                      {client.status}
                    </Badge>
                  </div>

                  {/* Key Stats Row */}
                  <div className="grid grid-cols-2 gap-2 mt-4 p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-100 dark:border-[#1E3A5F]/70 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Funded Volume</span>
                      <p className="font-bold text-slate-900 dark:text-slate-100">
                        ${(client.totalFundedVolume / 1000).toFixed(0)}k
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Commissions</span>
                      <p className="font-bold text-emerald-600 dark:text-emerald-400">
                        ${client.commissionGenerated.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Solutions list */}
                  <div className="mt-3.5 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                      Active Solutions
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {client.activeSolutions.map((sol) => (
                        <span
                          key={sol}
                          className="text-[11px] px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 font-medium"
                        >
                          {sol}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 py-3 border-t border-slate-100 dark:border-[#1E3A5F]/70 bg-slate-50/50 dark:bg-[#0A1628]/40 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Last contact: {client.lastContactDate}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                    View File <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Client Detail Drawer / Tabs Modal */}
        <Drawer
          isOpen={!!selectedClient}
          onClose={() => setSelectedClient(null)}
          title={selectedClient?.businessName || 'Client Detail'}
          className="max-w-2xl"
        >
          {selectedClient && (
            <div className="space-y-6">
              {/* Client Header in Drawer */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-slate-900/10 dark:from-[#132847] dark:to-[#0D1E36] border border-blue-200 dark:border-[#1E3A5F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-base shadow-md shadow-blue-500/20">
                    {selectedClient.businessName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {selectedClient.businessName}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <span>{selectedClient.industry}</span>
                      <span>•</span>
                      <span>Client since {selectedClient.joinedDate}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="emerald" size="md">
                    Health Score: {selectedClient.healthScore}/100
                  </Badge>
                </div>
              </div>

              {/* Client Detail Tabs */}
              <Tabs
                tabs={[
                  { id: 'overview', label: 'Overview' },
                  { id: 'facilities', label: `Facilities (${selectedClient.facilities.length})` },
                  { id: 'documents', label: `Vault (${selectedClient.documentsCount})` },
                  { id: 'notes', label: 'Notes & Audit' },
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
              />

              {/* Tab 1: Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] text-xs">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Primary Contact</span>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
                        {selectedClient.contactPerson}
                      </p>
                      <div className="mt-2 space-y-1 text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-blue-500" />
                          <span>{selectedClient.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{selectedClient.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] text-xs">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Financial Summary</span>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Funded Facility Total:</span>
                          <span className="font-bold text-slate-900 dark:text-slate-100">
                            ${selectedClient.totalFundedVolume.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Biz Pro Commissions:</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            ${selectedClient.commissionGenerated.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Status:</span>
                          <Badge variant="emerald" size="sm">
                            {selectedClient.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Solution Badges */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F]">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      Approved Solutions & Retainers
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedClient.activeSolutions.map((sol) => (
                        <div
                          key={sol}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-100/60 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-xs font-semibold"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>{sol}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Facilities */}
              {activeTab === 'facilities' && (
                <div className="space-y-3">
                  {selectedClient.facilities.map((fac, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-blue-500" />
                          <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">{fac.name}</h4>
                        </div>
                        <Badge variant="primary" size="sm">
                          {fac.rate}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Credit Limit</span>
                          <p className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                            ${fac.limit.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Drawn Capital</span>
                          <p className="font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                            ${fac.drawn.toLocaleString()} ({Math.round((fac.drawn / fac.limit) * 100)}%)
                          </p>
                        </div>
                      </div>

                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full"
                          style={{ width: `${Math.min(100, Math.round((fac.drawn / fac.limit) * 100))}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Documents Vault */}
              {activeTab === 'documents' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      Underwriting & KYC Files ({selectedClient.documentsCount})
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        toast({
                          title: 'Upload File',
                          description: 'Document vault upload dialog opened.',
                          type: 'info',
                        })
                      }
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Upload Doc
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {[
                      { name: 'Executed Term Sheet & Agreement.pdf', size: '2.4 MB', date: 'Oct 01, 2026', verified: true },
                      { name: 'Last 6 Months Bank Statements.pdf', size: '14.8 MB', date: 'Sep 28, 2026', verified: true },
                      { name: 'Corporate Tax Returns (2024-2025).pdf', size: '8.2 MB', date: 'Sep 25, 2026', verified: true },
                      { name: 'Accounts Receivable Aging Report.xlsx', size: '1.1 MB', date: 'Oct 04, 2026', verified: true },
                    ].map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                          <div>
                            <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate max-w-[200px] sm:max-w-xs">
                              {doc.name}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {doc.size} • Uploaded {doc.date}
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            toast({
                              title: `Downloading ${doc.name}`,
                              description: 'Decrypted from secure underwriting vault.',
                              type: 'success',
                            })
                          }
                        >
                          <Download className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Notes & Audit */}
              {activeTab === 'notes' && (
                <div className="space-y-4">
                  {/* Add note input */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Add Underwriting or Client Note
                    </label>
                    <textarea
                      rows={2}
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Enter call notes, covenants, underwriting conditions..."
                      className="w-full p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex justify-end">
                      <Button variant="primary" size="sm" onClick={handleAddNote}>
                        Save Note
                      </Button>
                    </div>
                  </div>

                  {/* Notes List */}
                  <div className="space-y-2.5">
                    {(clientNotes[selectedClient.id] || []).map((note, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span className="font-bold text-blue-600 dark:text-blue-400">{note.author}</span>
                          <span>{note.date}</span>
                        </div>
                        <p className="text-slate-800 dark:text-slate-200">{note.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Drawer>
      </div>
    </>
  )
}
