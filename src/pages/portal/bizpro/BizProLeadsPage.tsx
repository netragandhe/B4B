import React, { useState } from 'react'
import {
  UserCheck,
  Kanban,
  Table as TableIcon,
  PlusCircle,
  Search,
  Filter,
  ArrowRight,
  MoreVertical,
  Clock,
  Phone,
  Mail,
  DollarSign,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { FormField } from '@/components/ui/FormField'
import { Modal } from '@/components/ui/Modal'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { PageLoadingFallback } from '@/components/ui/PageLoadingFallback'
import { SEOHead } from '@/components/seo/SEOHead'
import { PageTransition } from '@/components/animations/PageTransition'
import { useBizProLeads, useCreateBizProLead, useUpdateLeadStage } from '@/hooks/queries/useBizProData'
import { useToast } from '@/components/ui/Toast'
import { formatCurrency } from '@/lib/utils'
import type { BizProLead } from '@/mock-data/bizProData'

const createLeadSchema = z.object({
  clientName: z.string().min(2, 'Company name required'),
  contactPerson: z.string().min(2, 'Contact person required'),
  email: z.string().email('Valid business email required'),
  phone: z.string().min(10, 'Valid phone required'),
  solution: z.string().min(1, 'Solution category required'),
  dealSize: z.coerce.number().min(5000, 'Minimum size is $5,000'),
  urgency: z.enum(['Urgent (48h)', 'Normal', 'Low']),
  notes: z.string().min(5, 'Notes required'),
})

type CreateLeadFormData = z.infer<typeof createLeadSchema>

const KANBAN_STAGES: BizProLead['stage'][] = [
  'New Leads',
  'Discovery Call',
  'Underwriting',
  'Term Sheet',
  'Funded',
]

export const BizProLeadsPage: React.FC = () => {
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban')
  const [searchQuery, setSearchQuery] = useState('')
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<BizProLead | null>(null)

  const { data: leads, isLoading, isError, refetch } = useBizProLeads()
  const { mutate: createLead, isPending: isCreating } = useCreateBizProLead()
  const { mutate: updateStage } = useUpdateLeadStage()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLeadFormData>({
    resolver: zodResolver(createLeadSchema) as any,
    defaultValues: {
      solution: 'Business Loans & Revolver',
      dealSize: 200000,
      urgency: 'Normal',
      notes: '',
    },
  })

  const handleStageChange = (id: string, newStage: BizProLead['stage']) => {
    updateStage(
      { id, stage: newStage },
      {
        onSuccess: () => {
          toast({
            title: 'Lead Stage Advanced',
            description: `Moved to ${newStage}. Pipeline updated.`,
            type: 'success',
          })
        },
      }
    )
  }

  const onSubmit = (data: CreateLeadFormData) => {
    createLead(
      {
        clientName: data.clientName,
        contactPerson: data.contactPerson,
        email: data.email,
        phone: data.phone,
        solution: data.solution,
        dealSize: Number(data.dealSize),
        stage: 'New Leads',
        urgency: data.urgency,
        notes: data.notes,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Lead Created Successfully',
            description: `${data.clientName} added to pipeline.`,
            type: 'success',
          })
          reset()
          setCreateModalOpen(false)
        },
      }
    )
  }

  if (isLoading) return <PageLoadingFallback />
  if (isError) {
    return (
      <ErrorState
        title="Could not load leads"
        message="Unable to connect to Biz Pro CRM pipeline."
        onRetry={() => refetch()}
      />
    )
  }

  const filteredLeads = (leads || []).filter((l) => {
    const q = searchQuery.toLowerCase()
    return (
      l.clientName.toLowerCase().includes(q) ||
      l.contactPerson.toLowerCase().includes(q) ||
      l.solution.toLowerCase().includes(q)
    )
  })

  return (
    <PageTransition>
      <div className="space-y-8 text-left">
        <SEOHead
          title="Leads Pipeline | Biz Pro Terminal"
          description="Manage commercial prospect pipeline with Kanban board and tabular views."
        />

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                Leads & Deal Pipeline
              </h1>
              <Badge variant="primary" size="sm">
                {(leads || []).length} Active Leads
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Visual Kanban progression from initial discovery call through term sheet delivery and funded closing.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* View Mode Toggle: Kanban vs Table */}
            <div className="flex p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-xs font-semibold">
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  viewMode === 'kanban'
                    ? 'bg-white dark:bg-[#0D1E36] text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Kanban className="w-3.5 h-3.5" />
                <span>Kanban</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-[#0D1E36] text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => setCreateModalOpen(true)}
              leftIcon={<PlusCircle className="w-4 h-4" />}
              className="font-bold shadow-md shadow-blue-500/20"
            >
              Add Lead
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <Card variant="bento" className="p-3.5">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search by client name, contact, or solution..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>
        </Card>

        {/* View 1: KANBAN BOARD */}
        {viewMode === 'kanban' ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
            {KANBAN_STAGES.map((stage) => {
              const stageLeads = filteredLeads.filter((l) => l.stage === stage)
              return (
                <div
                  key={stage}
                  className="flex flex-col rounded-2xl bg-slate-100/70 dark:bg-[#0D1E36]/50 border border-slate-200 dark:border-[#1E3A5F] p-3 min-w-[240px]"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-[#1E3A5F]">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {stage}
                    </span>
                    <Badge variant="primary" size="sm" className="text-[10px]">
                      {stageLeads.length}
                    </Badge>
                  </div>

                  {/* Column Cards */}
                  <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[620px] pr-0.5">
                    {stageLeads.length === 0 ? (
                      <div className="py-8 text-center text-[11px] text-slate-400 border border-dashed rounded-xl">
                        No leads in stage
                      </div>
                    ) : (
                      stageLeads.map((lead) => (
                        <Card
                          key={lead.id}
                          variant="default"
                          className="p-3.5 space-y-2.5 hover:shadow-md transition-all border hover:border-blue-400 dark:hover:border-blue-600"
                        >
                          <div className="flex items-start justify-between gap-1.5">
                            <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                              {lead.clientName}
                            </span>
                            <Badge
                              variant={lead.urgency === 'Urgent (48h)' ? 'danger' : 'default'}
                              size="sm"
                              className="text-[9px] shrink-0"
                            >
                              {lead.urgency}
                            </Badge>
                          </div>

                          <div className="text-[11px] text-slate-500 space-y-0.5">
                            <p className="truncate">{lead.contactPerson}</p>
                            <p className="font-semibold text-slate-700 dark:text-slate-300">
                              {lead.solution}
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-[#1E3A5F]">
                            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                              {formatCurrency(lead.dealSize)}
                            </span>
                            <select
                              value={lead.stage}
                              onChange={(e) =>
                                handleStageChange(lead.id, e.target.value as BizProLead['stage'])
                              }
                              className="text-[10px] font-bold bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5 text-blue-600 dark:text-blue-400 cursor-pointer"
                            >
                              {KANBAN_STAGES.map((s) => (
                                <option key={s} value={s}>
                                  → {s}
                                </option>
                              ))}
                            </select>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* View 2: TABLE VIEW */
          <Card variant="default" className="overflow-hidden border">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 dark:bg-[#12294A]/80 border-b border-slate-200 dark:border-[#1E3A5F] text-slate-500 font-bold uppercase text-[10px] tracking-wider select-none">
                  <tr>
                    <th className="py-3 px-4">Client & Contact</th>
                    <th className="py-3 px-4">Solution</th>
                    <th className="py-3 px-4">Deal Size</th>
                    <th className="py-3 px-4">Stage</th>
                    <th className="py-3 px-4">Urgency</th>
                    <th className="py-3 px-4">Last Activity</th>
                    <th className="py-3 px-4 text-right">Advance Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#1E3A5F]/70">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/70 dark:hover:bg-[#12294A]/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {lead.clientName}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {lead.contactPerson} • {lead.email}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                        {lead.solution}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                        {formatCurrency(lead.dealSize)}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant="primary" size="sm">
                          {lead.stage}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={lead.urgency === 'Urgent (48h)' ? 'danger' : 'default'} size="sm">
                          {lead.urgency}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-[11px] max-w-xs truncate">
                        {lead.lastActivity}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <select
                          value={lead.stage}
                          onChange={(e) =>
                            handleStageChange(lead.id, e.target.value as BizProLead['stage'])
                          }
                          className="text-xs font-semibold bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-blue-600 dark:text-blue-400 cursor-pointer"
                        >
                          {KANBAN_STAGES.map((s) => (
                            <option key={s} value={s}>
                              Move to: {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Modal: Create New Lead */}
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Add New Commercial Lead"
          description="Log a prospect into the Biz Pro CRM pipeline."
          maxWidth="md"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <FormField label="Company Legal Name" required error={errors.clientName?.message}>
                <Input placeholder="Apex Freight Corp" {...register('clientName')} />
              </FormField>
              <FormField label="Primary Contact Person" required error={errors.contactPerson?.message}>
                <Input placeholder="Marcus Vance" {...register('contactPerson')} />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <FormField label="Business Email" required error={errors.email?.message}>
                <Input type="email" placeholder="m.vance@company.com" {...register('email')} />
              </FormField>
              <FormField label="Phone Number" required error={errors.phone?.message}>
                <Input placeholder="(555) 000-0000" {...register('phone')} />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <FormField label="Solution Requested" required error={errors.solution?.message}>
                <Select
                  options={[
                    { label: 'Business Loans & Revolver', value: 'Business Loans & Revolver' },
                    { label: 'Equipment Lease & Line', value: 'Equipment Lease & Line' },
                    { label: 'Build Business Credit', value: 'Build Business Credit' },
                    { label: 'Merchant POS Terminal', value: 'Merchant POS Terminal' },
                    { label: 'SBA 7(a) Business Plan', value: 'SBA 7(a) Business Plan' },
                    { label: 'Fractional CFO Advisory', value: 'Fractional CFO Advisory' },
                  ]}
                  {...register('solution')}
                />
              </FormField>

              <FormField label="Estimated Deal Volume ($)" required error={errors.dealSize?.message}>
                <Input type="number" step="5000" {...register('dealSize')} />
              </FormField>
            </div>

            <FormField label="Urgency" required error={errors.urgency?.message}>
              <Select
                options={[
                  { label: 'Normal Timeline', value: 'Normal' },
                  { label: 'Urgent (Within 48h)', value: 'Urgent (48h)' },
                  { label: 'Low Urgency (Planning)', value: 'Low' },
                ]}
                {...register('urgency')}
              />
            </FormField>

            <FormField label="Underwriting Context & Notes" required error={errors.notes?.message}>
              <Textarea
                placeholder="Mention revenue, credit standing, or collateral..."
                className="min-h-[80px]"
                {...register('notes')}
              />
            </FormField>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <Button type="button" variant="outline" size="sm" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" isLoading={isCreating} className="font-bold">
                Save & Add to Pipeline
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </PageTransition>
  )
}
