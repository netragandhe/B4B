import React, { useState, useMemo } from 'react'
import {
  Users,
  Search,
  Building,
  DollarSign,
  Calendar,
  FileText,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  FileSpreadsheet,
  Phone,
  Mail,
  Tag,
  ShieldCheck,
  CreditCard,
  Layers,
  Sparkles,
  Send,
  UploadCloud,
  CheckCircle2,
  Clock,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Drawer } from '@/components/ui/Drawer'
import { Modal } from '@/components/ui/Modal'
import { Tabs } from '@/components/ui/Tabs'
import { Avatar } from '@/components/ui/Avatar'
import { useToast } from '@/components/ui/Toast'
import { useAuth } from '@/hooks/useAuth'
import { clientService, ClientRecord, ClientDebtFacility } from '@/lib/services/clientService'
import { exportToCsv } from '@/lib/exportUtils'
import { formatCurrency } from '@/lib/utils'

const clientSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  contactPerson: z.string().min(2, 'Contact person name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(7, 'Phone number is required'),
  industry: z.string().min(2, 'Industry is required'),
  region: z.string().min(2, 'Region is required'),
  status: z.enum(['Active Client', 'Underwriting Intake', 'Prospect', 'Inactive']),
  assignedCoachName: z.string().min(2, 'Assigned coach is required'),
  initialTag: z.string().optional(),
})

type ClientFormData = z.infer<typeof clientSchema>

export const BizProClientsPage: React.FC = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const clients = clientService.useClients()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null)
  const [drawerTab, setDrawerTab] = useState('overview')
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<ClientRecord | null>(null)
  const [addFacilityModalOpen, setAddFacilityModalOpen] = useState(false)

  // Sub-forms inside drawer
  const [newNoteText, setNewNoteText] = useState('')
  const [facilityName, setFacilityName] = useState('')
  const [facilityAmount, setFacilityAmount] = useState('250000')
  const [facilityRate, setFacilityRate] = useState('7.50% SOFR+')
  const [facilityTerm, setFacilityTerm] = useState('36 Months')
  const [facilityStatus, setFacilityStatus] = useState<ClientDebtFacility['status']>('Active Funded')

  // Mock Document Upload inside drawer
  const [mockDocs, setMockDocs] = useState<{ id: string; name: string; type: string; date: string; size: string }[]>([
    { id: 'doc_1', name: '2025_Corporate_Tax_Returns_1120S.pdf', type: 'Tax Return', date: '2026-09-12', size: '2.4 MB' },
    { id: 'doc_2', name: 'Trailing_12M_Profit_and_Loss.xlsx', type: 'Financials', date: '2026-09-15', size: '850 KB' },
    { id: 'doc_3', name: 'SBA_Term_Sheet_Executed.pdf', type: 'Legal Agreement', date: '2026-10-01', size: '1.1 MB' },
  ])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      status: 'Active Client',
      assignedCoachName: user?.name || 'David Ross (Rank 6)',
      region: 'Dallas (11-K)',
      industry: 'Commercial Transport',
    },
  })

  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        c.companyName.toLowerCase().includes(q) ||
        c.contactPerson.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.assignedCoachName.toLowerCase().includes(q)

      const matchesStatus = statusFilter === 'All' || c.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [clients, searchQuery, statusFilter])

  const handleOpenAddModal = () => {
    setEditingClient(null)
    reset({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      industry: 'Logistics & Supply Chain',
      region: 'Dallas (11-K)',
      status: 'Active Client',
      assignedCoachName: user?.name || 'David Ross (Rank 6)',
      initialTag: 'SBA 7a',
    })
    setAddModalOpen(true)
  }

  const handleOpenEditModal = (client: ClientRecord) => {
    setEditingClient(client)
    setValue('companyName', client.companyName)
    setValue('contactPerson', client.contactPerson)
    setValue('email', client.email)
    setValue('phone', client.phone)
    setValue('industry', client.industry)
    setValue('region', client.region)
    setValue('status', client.status)
    setValue('assignedCoachName', client.assignedCoachName)
    setAddModalOpen(true)
  }

  const onSubmitClient = (data: ClientFormData) => {
    if (editingClient) {
      clientService.updateClient(editingClient.id, {
        companyName: data.companyName,
        contactPerson: data.contactPerson,
        email: data.email,
        phone: data.phone,
        industry: data.industry,
        region: data.region,
        status: data.status,
        assignedCoachName: data.assignedCoachName,
      })
      toast({
        title: 'Client Updated',
        description: `${data.companyName} details updated successfully.`,
        type: 'success',
      })
      if (selectedClient?.id === editingClient.id) {
        setSelectedClient(clientService.getClientById(editingClient.id) || null)
      }
    } else {
      const newClient = clientService.createClient({
        companyName: data.companyName,
        contactPerson: data.contactPerson,
        email: data.email,
        phone: data.phone,
        industry: data.industry,
        region: data.region,
        status: data.status,
        assignedCoachName: data.assignedCoachName,
        assignedCoachId: user?.id || 'bizpro_1',
        tags: data.initialTag ? [data.initialTag] : ['New Account'],
      })
      toast({
        title: 'Client Registered',
        description: `${newClient.companyName} added to directory.`,
        type: 'success',
      })
    }
    setAddModalOpen(false)
  }

  const handleDeleteClient = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name} from directory?`)) {
      clientService.deleteClient(id)
      if (selectedClient?.id === id) {
        setSelectedClient(null)
      }
      toast({ title: 'Client Removed', description: `${name} deleted.`, type: 'info' })
    }
  }

  const handleAddDebtFacility = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedClient || !facilityName.trim()) return

    const fac = clientService.addFacility(selectedClient.id, {
      name: facilityName.trim(),
      amount: Number(facilityAmount) || 100000,
      rate: facilityRate,
      term: facilityTerm,
      status: facilityStatus,
    })

    setSelectedClient(clientService.getClientById(selectedClient.id) || null)
    setAddFacilityModalOpen(false)
    setFacilityName('')
    toast({
      title: 'Debt Facility Added',
      description: `${fac.name} ($${fac.amount.toLocaleString()}) attached to ${selectedClient.companyName}.`,
      type: 'success',
    })
  }

  const handleAddNote = () => {
    if (!selectedClient || !newNoteText.trim()) return

    clientService.addNote(selectedClient.id, newNoteText.trim(), user?.name || 'B4B Coach')
    setSelectedClient(clientService.getClientById(selectedClient.id) || null)
    setNewNoteText('')
    toast({ title: 'Note Added', description: 'Strategy note recorded on client timeline.', type: 'success' })
  }

  const handleExportCsv = () => {
    const headers = ['Company', 'Contact', 'Email', 'Phone', 'Industry', 'Region', 'Status', 'Assigned Coach', 'Funded Volume']
    const rows = filteredClients.map((c) => [
      c.companyName,
      c.contactPerson,
      c.email,
      c.phone,
      c.industry,
      c.region,
      c.status,
      c.assignedCoachName,
      formatCurrency(c.totalFundedVolume),
    ])
    exportToCsv('B4B_Client_Directory', headers, rows)
    toast({ title: 'Directory Exported', description: 'Client directory downloaded to CSV.', type: 'success' })
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto pb-12">
      <PageHeader
        title="Client Directory & Accounts"
        description="Comprehensive client portfolios, active debt facilities, underwriting document vaults, and Coach attributions."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Client Directory', icon: <Users className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="emerald" size="md">
            {filteredClients.length} Active Accounts
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExportCsv} leftIcon={<FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />}>
              Export CSV
            </Button>
            <Button variant="accent" size="sm" onClick={handleOpenAddModal} leftIcon={<Plus className="w-4 h-4" />}>
              Add Client
            </Button>
          </div>
        }
      />

      {/* FILTERS & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, contact, or coach..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['All', 'Active Client', 'Underwriting Intake', 'Prospect', 'Inactive'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* CLIENTS DATA TABLE */}
      <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-3 px-4">Company & Contact</th>
                <th className="py-3 px-4">Industry & Region</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned Coach</th>
                <th className="py-3 px-4">Funded Facilities</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    onClick={() => {
                      setSelectedClient(client)
                      setDrawerTab('overview')
                    }}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={client.companyName} size="sm" />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{client.companyName}</div>
                          <div className="text-[11px] text-slate-400">
                            {client.contactPerson} • {client.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800 dark:text-slate-200">{client.industry}</div>
                      <div className="text-[11px] text-slate-400">{client.region}</div>
                    </td>

                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          client.status === 'Active Client'
                            ? 'emerald'
                            : client.status === 'Underwriting Intake'
                            ? 'gold'
                            : client.status === 'Prospect'
                            ? 'navy'
                            : 'default'
                        }
                        size="sm"
                      >
                        {client.status}
                      </Badge>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {client.assignedCoachName}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(client.totalFundedVolume)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {client.activeFacilities.length} Facilities Active
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEditModal(client)}
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-blue-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClient(client.id, client.companyName)}
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedClient(client)
                            setDrawerTab('overview')
                          }}
                        >
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No clients found matching filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* CLIENT DETAILS DRAWER WITH 4 TABS */}
      <Drawer
        isOpen={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        title={selectedClient?.companyName || 'Client Details'}
        description={`Contact: ${selectedClient?.contactPerson || ''} • Status: ${selectedClient?.status || ''}`}
        size="lg"
      >
        {selectedClient && (
          <div className="space-y-5 text-left text-xs">
            <Tabs
              tabs={[
                { id: 'overview', label: 'Overview', icon: <Building className="w-3.5 h-3.5" /> },
                { id: 'facilities', label: 'Debt Facilities', icon: <DollarSign className="w-3.5 h-3.5" /> },
                { id: 'documents', label: 'Documents Vault', icon: <FileText className="w-3.5 h-3.5" /> },
                { id: 'notes', label: 'Notes & Timeline', icon: <Clock className="w-3.5 h-3.5" /> },
              ]}
              activeTab={drawerTab}
              onChange={setDrawerTab}
            />

            {/* TAB 1: OVERVIEW */}
            {drawerTab === 'overview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Total Funded Volume</span>
                    <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {formatCurrency(selectedClient.totalFundedVolume)}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Active Debt Facilities</span>
                    <div className="text-lg font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">
                      {selectedClient.activeFacilities.length} Lines
                    </div>
                  </div>
                </div>

                <Card variant="default" className="p-4 space-y-3">
                  <h4 className="font-bold text-slate-900 dark:text-white">Corporate Contact Information</h4>
                  <div className="space-y-2 text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{selectedClient.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{selectedClient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>{selectedClient.industry} • {selectedClient.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Assigned Coach: {selectedClient.assignedCoachName}</span>
                    </div>
                  </div>
                </Card>

                <div className="space-y-1.5">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Tags & Programs</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedClient.tags.map((tg) => (
                      <Badge key={tg} variant="navy" size="sm">
                        {tg}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DEBT FACILITIES */}
            {drawerTab === 'facilities' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white">Active Credit Facilities</h4>
                  <Button variant="accent" size="sm" onClick={() => setAddFacilityModalOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
                    Add Facility
                  </Button>
                </div>

                <div className="space-y-2.5">
                  {selectedClient.activeFacilities.length > 0 ? (
                    selectedClient.activeFacilities.map((fac) => (
                      <Card key={fac.id} variant="default" className="p-3.5 space-y-1.5 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-white">{fac.name}</span>
                          <Badge variant="emerald" size="sm">
                            {fac.status}
                          </Badge>
                        </div>
                        <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                          {formatCurrency(fac.amount)}
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                          <span>Rate: {fac.rate}</span>
                          <span>•</span>
                          <span>Term: {fac.term}</span>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <p className="text-slate-400 italic py-4 text-center">No active credit facilities registered.</p>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: DOCUMENTS VAULT */}
            {drawerTab === 'documents' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white">Uploaded Corporate Filings</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newDoc = {
                        id: `doc_${Date.now()}`,
                        name: 'Bank_Statement_Sep2026.pdf',
                        type: 'Bank Statements',
                        date: new Date().toISOString().split('T')[0],
                        size: '1.4 MB',
                      }
                      setMockDocs([newDoc, ...mockDocs])
                      toast({ title: 'Document Ingested', description: 'Bank statements uploaded to vault.', type: 'success' })
                    }}
                    leftIcon={<UploadCloud className="w-3.5 h-3.5" />}
                  >
                    Upload Document
                  </Button>
                </div>

                <div className="space-y-2">
                  {mockDocs.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{doc.name}</div>
                          <div className="text-[10px] text-slate-400">
                            {doc.type} • {doc.size} • Uploaded {doc.date}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setMockDocs(mockDocs.filter((d) => d.id !== doc.id))
                          toast({ title: 'Document Removed', type: 'info' })
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: NOTES & TIMELINE */}
            {drawerTab === 'notes' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="font-bold text-slate-900 dark:text-white">Add Strategy Note</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                      placeholder="Record meeting recap or underwriting update..."
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                    <Button variant="accent" size="sm" onClick={handleAddNote} leftIcon={<Send className="w-3 h-3" />}>
                      Post
                    </Button>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  {selectedClient.notes.map((n) => (
                    <div key={n.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-900 dark:text-white">{n.author}</span>
                        <span className="text-slate-400">{n.date}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-xs">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* ADD / EDIT CLIENT MODAL */}
      {addModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setAddModalOpen(false)}
          title={editingClient ? 'Edit Client Account' : 'Register New Client Account'}
          description="Create client directory file with automated sponsor attribution."
          maxWidth="md"
        >
          <form onSubmit={handleSubmit(onSubmitClient)} className="space-y-3 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Company Name *</label>
              <Input placeholder="e.g. Apex Logistics LLC" {...register('companyName')} />
              {errors.companyName && <p className="text-[11px] text-rose-500 mt-0.5">{errors.companyName.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Contact Person *</label>
                <Input placeholder="John Doe" {...register('contactPerson')} />
                {errors.contactPerson && <p className="text-[11px] text-rose-500 mt-0.5">{errors.contactPerson.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Phone *</label>
                <Input placeholder="+1 (555) 000-0000" {...register('phone')} />
                {errors.phone && <p className="text-[11px] text-rose-500 mt-0.5">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email *</label>
              <Input type="email" placeholder="contact@company.com" {...register('email')} />
              {errors.email && <p className="text-[11px] text-rose-500 mt-0.5">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Industry</label>
                <Input placeholder="Manufacturing" {...register('industry')} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Region</label>
                <Input placeholder="Dallas (11-K)" {...register('region')} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Account Status</label>
                <select
                  {...register('status')}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  <option value="Active Client">Active Client</option>
                  <option value="Underwriting Intake">Underwriting Intake</option>
                  <option value="Prospect">Prospect</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Assigned Coach</label>
                <Input placeholder="Coach Name" {...register('assignedCoachName')} />
              </div>
            </div>

            <div className="pt-3 border-t flex justify-end gap-2">
              <Button variant="outline" size="sm" type="button" onClick={() => setAddModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="accent" size="sm" type="submit">
                {editingClient ? 'Save Changes' : 'Register Client'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ADD DEBT FACILITY MODAL */}
      {addFacilityModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setAddFacilityModalOpen(false)}
          title={`Attach Debt Facility to ${selectedClient?.companyName}`}
          description="Register commercial debt facility, line of credit, or lease-back facility."
          maxWidth="md"
        >
          <form onSubmit={handleAddDebtFacility} className="space-y-3 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Facility Name *</label>
              <Input
                placeholder="e.g. Accounts Receivable Revolving Line"
                value={facilityName}
                onChange={(e) => setFacilityName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Amount ($) *</label>
                <Input
                  type="number"
                  value={facilityAmount}
                  onChange={(e) => setFacilityAmount(e.target.value)}
                  step={25000}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Interest Rate</label>
                <Input
                  value={facilityRate}
                  onChange={(e) => setFacilityRate(e.target.value)}
                  placeholder="e.g. 7.50% SOFR+"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Term Duration</label>
                <Input
                  value={facilityTerm}
                  onChange={(e) => setFacilityTerm(e.target.value)}
                  placeholder="e.g. 36 Months"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Status</label>
                <select
                  value={facilityStatus}
                  onChange={(e) => setFacilityStatus(e.target.value as any)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  <option value="Active Funded">Active Funded</option>
                  <option value="Underwriting">Underwriting</option>
                  <option value="Approved">Approved</option>
                  <option value="Paid Off">Paid Off</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t flex justify-end gap-2">
              <Button variant="outline" size="sm" type="button" onClick={() => setAddFacilityModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="accent" size="sm" type="submit">
                Attach Facility
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
