import React, { useState } from 'react'
import {
  Target,
  Grid,
  List,
  Plus,
  Search,
  Phone,
  Mail,
  Building,
  DollarSign,
  Calendar,
  Filter,
  Eye,
  Trash2,
  CheckCircle2,
  Clock,
  Send,
  MoreVertical,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Drawer } from '@/components/ui/Drawer'
import { Modal } from '@/components/ui/Modal'
import { FormField } from '@/components/ui/FormField'
import { useToast } from '@/components/ui/Toast'
import { INITIAL_LEADS, Lead } from '@/mock-data/bizproData'
import { formatCurrency } from '@/lib/utils'
import { Can } from '@/components/auth/Can'

export const BizProLeadsPage: React.FC = () => {
  const { toast } = useToast()

  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS)
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban')
  const [searchQuery, setSearchQuery] = useState('')
  const [stageFilter, setStageFilter] = useState('all')

  // Modals & Drawer State
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [newNote, setNewNote] = useState('')

  // New Lead Form State
  const [newLeadData, setNewLeadData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    dealValue: '250000',
    stage: 'New' as Lead['stage'],
    source: 'Inbound Web',
  })

  const stages: Lead['stage'][] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost']

  const filteredLeads = leads.filter((lead) => {
    if (stageFilter !== 'all' && lead.stage !== stageFilter) return false
    if (
      searchQuery &&
      !lead.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !lead.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !lead.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }
    return true
  })

  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const created: Lead = {
      id: `ld_${Date.now()}`,
      name: newLeadData.name || 'New Prospect',
      company: newLeadData.company || 'Prospect Co',
      email: newLeadData.email || 'prospect@company.com',
      phone: newLeadData.phone || '+1 (555) 000-0000',
      stage: newLeadData.stage,
      dealValue: Number(newLeadData.dealValue) || 250000,
      source: newLeadData.source,
      assignedDate: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now - Created',
      notes: ['Lead registered into B4B Coach CRM.'],
    }
    setLeads((prev) => [created, ...prev])
    setAddModalOpen(false)
    toast({
      title: 'Lead Added to Pipeline',
      description: `${created.name} (${created.company}) has been added under ${created.stage}.`,
      type: 'success',
    })
  }

  const handleAddNote = () => {
    if (!newNote.trim() || !selectedLead) return
    const updatedNotes = [...selectedLead.notes, newNote]
    const updatedLead = { ...selectedLead, notes: updatedNotes, lastActivity: 'Just now - Note Added' }
    setSelectedLead(updatedLead)
    setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? updatedLead : l)))
    setNewNote('')
    toast({ title: 'Note Saved', type: 'info' })
  }

  const handleMoveStage = (leadId: string, newStage: Lead['stage']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: newStage, lastActivity: `Moved to ${newStage}` } : l))
    )
    if (selectedLead?.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, stage: newStage } : null))
    }
    toast({ title: 'Lead Stage Updated', description: `Moved to ${newStage}`, type: 'success' })
  }

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Sales Leads CRM"
        description="Track, qualify, and close commercial capital and fractional CFO leads."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Leads CRM', icon: <Target className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="primary" size="md">
            {filteredLeads.length} Active Leads
          </Badge>
        }
        actions={
          <Can menuId="bizpro-leads" action="create" disableInstead={true} tooltip="Create permission required to add new leads">
            <Button
              variant="accent"
              size="md"
              onClick={() => setAddModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
              className="shadow-sm shadow-emerald-500/20"
            >
              Add New Lead
            </Button>
          </Can>
        }
      />

      {/* TOP COMPACT SUMMARY STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-white dark:bg-[#0D1E36] border border-slate-200/80 dark:border-[#1E3A5F] shadow-xs">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Total Pipeline Value</div>
          <div className="text-lg font-black text-slate-900 dark:text-white">
            {formatCurrency(leads.reduce((acc, curr) => acc + curr.dealValue, 0))}
          </div>
        </div>
        <div className="p-3 rounded-xl bg-white dark:bg-[#0D1E36] border border-slate-200/80 dark:border-[#1E3A5F] shadow-xs">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Active Leads</div>
          <div className="text-lg font-black text-blue-600 dark:text-blue-400">{leads.length} Deals</div>
        </div>
        <div className="p-3 rounded-xl bg-white dark:bg-[#0D1E36] border border-slate-200/80 dark:border-[#1E3A5F] shadow-xs">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Won Facilities</div>
          <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
            {formatCurrency(leads.filter((l) => l.stage === 'Won').reduce((acc, curr) => acc + curr.dealValue, 0))}
          </div>
        </div>
        <div className="p-3 rounded-xl bg-white dark:bg-[#0D1E36] border border-slate-200/80 dark:border-[#1E3A5F] shadow-xs">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">In Proposal / Review</div>
          <div className="text-lg font-black text-amber-600 dark:text-amber-400">
            {formatCurrency(leads.filter((l) => l.stage === 'Proposal').reduce((acc, curr) => acc + curr.dealValue, 0))}
          </div>
        </div>
      </div>

      {/* FILTER & VIEW TOGGLE CONTROLS */}
      <Card variant="default" className="p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex-1 w-full sm:w-auto">
          <Input
            placeholder="Search leads by company, contact name, email..."
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <Select
            options={[
              { label: 'All Pipeline Stages', value: 'all' },
              ...stages.map((s) => ({ label: s, value: s })),
            ]}
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="text-xs h-9 min-w-[150px]"
          />

          <div className="flex items-center p-1 rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-slate-50 dark:bg-[#12294A]">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-[#0D1E36] text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Pipeline Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Board</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-[#0D1E36] text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Table List View"
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>
        </div>
      </Card>

      {/* COMPACT RESPONSIVE KANBAN BOARD VIEW (Fits in screen, minimal scroll) */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2.5">
          {stages.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.stage === stage)
            const stageTotal = stageLeads.reduce((acc, curr) => acc + curr.dealValue, 0)

            const stageColors: Record<string, { bg: string; text: string; dot: string; border: string }> = {
              New: { bg: 'bg-sky-50/80 dark:bg-sky-950/20', text: 'text-sky-700 dark:text-sky-400', dot: 'bg-sky-500', border: 'border-sky-200 dark:border-sky-800' },
              Contacted: { bg: 'bg-blue-50/80 dark:bg-blue-950/20', text: 'text-blue-700 dark:text-blue-400', dot: 'bg-blue-500', border: 'border-blue-200 dark:border-blue-800' },
              Qualified: { bg: 'bg-violet-50/80 dark:bg-violet-950/20', text: 'text-violet-700 dark:text-violet-400', dot: 'bg-violet-500', border: 'border-violet-200 dark:border-violet-800' },
              Proposal: { bg: 'bg-amber-50/80 dark:bg-amber-950/20', text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-500', border: 'border-amber-200 dark:border-amber-800' },
              Won: { bg: 'bg-emerald-50/80 dark:bg-emerald-950/20', text: 'text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500', border: 'border-emerald-200 dark:border-emerald-800' },
              Lost: { bg: 'bg-rose-50/80 dark:bg-rose-950/20', text: 'text-rose-700 dark:text-rose-400', dot: 'bg-rose-500', border: 'border-rose-200 dark:border-rose-800' },
            }
            const colors = stageColors[stage] || stageColors.New

            return (
              <div
                key={stage}
                className="flex flex-col bg-slate-50/70 dark:bg-[#0D1E36]/60 rounded-xl border border-slate-200/80 dark:border-[#1E3A5F]/70 min-h-[360px]"
              >
                {/* Compact Stage Header */}
                <div className={`p-2.5 rounded-t-xl border-b ${colors.border} ${colors.bg}`}>
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${colors.dot}`} />
                      <span className={`text-xs font-bold truncate ${colors.text}`}>{stage}</span>
                      <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${colors.bg} ${colors.text} border ${colors.border} shrink-0`}>
                        {stageLeads.length}
                      </span>
                    </div>
                  </div>
                  <div className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 pt-0.5">
                    {formatCurrency(stageTotal)}
                  </div>
                </div>

                {/* Stage Compact Cards */}
                <div className="flex-1 p-2 space-y-2 overflow-y-auto max-h-[480px] custom-scrollbar">
                  {stageLeads.length === 0 && (
                    <div className="flex items-center justify-center h-20 text-[10px] text-slate-400 dark:text-slate-500 italic">
                      Empty
                    </div>
                  )}
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="group bg-white dark:bg-[#12294A] rounded-lg border border-slate-200 dark:border-[#1E3A5F] p-2.5 cursor-pointer
                        hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all duration-150"
                    >
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <h4 className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {lead.company}
                        </h4>
                      </div>

                      <div className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 mb-1">
                        {formatCurrency(lead.dealValue)}
                      </div>

                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{lead.name}</p>

                      <div className="mt-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[9px] text-slate-400">
                        <span className="truncate max-w-[70px]">{lead.source}</span>
                        <span className="shrink-0">{lead.lastActivity.split('-')[0].trim()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* TABLE LIST VIEW */
        <Card variant="default" className="divide-y divide-slate-100 dark:divide-[#1E3A5F]">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => setSelectedLead(lead)}
              className="p-3.5 hover:bg-slate-50/80 dark:hover:bg-[#12294A]/40 cursor-pointer flex items-center justify-between gap-4 text-xs transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white truncate">{lead.company}</span>
                  <Badge variant="primary" size="sm">
                    {lead.stage}
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  Contact: {lead.name} ({lead.email}) • Source: {lead.source}
                </p>
              </div>

              <div className="flex items-center gap-3 text-slate-400 shrink-0">
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
                  {formatCurrency(lead.dealValue)}
                </span>
                <Button size="sm" variant="ghost" className="h-7 text-xs">
                  Inspect
                </Button>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* LEAD DETAIL INSPECTION DRAWER */}
      <Drawer
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        title="Lead Inspection & CRM Notes"
        size="md"
      >
        {selectedLead && (
          <div className="space-y-6 text-left">
            {/* Header info */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-[#12294A] dark:to-[#0D1E36] border border-blue-100 dark:border-[#1E3A5F] space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="emerald" size="sm">
                  {selectedLead.stage} Stage
                </Badge>
                <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(selectedLead.dealValue)}
                </span>
              </div>

              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                {selectedLead.company}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Primary Contact: <strong>{selectedLead.name}</strong>
              </p>
            </div>

            {/* Quick Move Stage Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Update Pipeline Stage</label>
              <div className="grid grid-cols-3 gap-1.5">
                {stages.map((st) => (
                  <button
                    key={st}
                    onClick={() => handleMoveStage(selectedLead.id, st)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold text-center transition-colors ${
                      selectedLead.stage === st
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-[#12294A] text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-slate-400">Contact Channels</h4>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] space-y-2">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                  <span>{selectedLead.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{selectedLead.phone}</span>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">CRM Notes & Log</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedLead.notes.map((note, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-[#12294A] text-xs text-slate-700 dark:text-slate-300">
                    <p>• {note}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add a call note or follow-up..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="text-xs"
                />
                <Button size="sm" variant="primary" onClick={handleAddNote} leftIcon={<Send className="w-3.5 h-3.5" />}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* ADD LEAD MODAL */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Sales Lead"
        description="Register a new commercial prospect into your sales pipeline."
        maxWidth="md"
      >
        <form onSubmit={handleAddLeadSubmit} className="space-y-4">
          <FormField label="Company Name" required id="new-lead-company">
            <Input
              id="new-lead-company"
              placeholder="e.g. Apex Freight LLC"
              value={newLeadData.company}
              onChange={(e) => setNewLeadData((prev) => ({ ...prev, company: e.target.value }))}
              required
            />
          </FormField>

          <FormField label="Contact Person Name" required id="new-lead-name">
            <Input
              id="new-lead-name"
              placeholder="Harrison Ford"
              value={newLeadData.name}
              onChange={(e) => setNewLeadData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Email" required id="new-lead-email">
              <Input
                id="new-lead-email"
                type="email"
                placeholder="name@company.com"
                value={newLeadData.email}
                onChange={(e) => setNewLeadData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </FormField>

            <FormField label="Estimated Deal Value ($)" required id="new-lead-val">
              <Input
                id="new-lead-val"
                type="number"
                value={newLeadData.dealValue}
                onChange={(e) => setNewLeadData((prev) => ({ ...prev, dealValue: e.target.value }))}
              />
            </FormField>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" leftIcon={<Plus className="w-4 h-4" />}>
              Create Lead
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
