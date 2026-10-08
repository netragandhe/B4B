import React, { useState, useMemo } from 'react'
import {
  MapPin,
  Search,
  Building2,
  Users,
  UserCheck,
  Edit,
  Save,
  CheckCircle2,
  Globe,
  Info,
  ShieldCheck,
  Award,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Drawer } from '@/components/ui/Drawer'
import { Modal } from '@/components/ui/Modal'
import { Avatar } from '@/components/ui/Avatar'
import { Textarea } from '@/components/ui/Textarea'
import { FormField } from '@/components/ui/FormField'
import { Select } from '@/components/ui/Select'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'
import { FED_REGIONS, FedRegion } from '@/mock-data/territoryScoreboardData'
import { formatCurrency } from '@/lib/utils'

export const TerritoryManagementPage: React.FC = () => {
  const { user } = useAuth()
  const { toast } = useToast()

  const [regions, setRegions] = useState<FedRegion[]>(FED_REGIONS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState<FedRegion | null>(null)
  const [reassignModalOpen, setReassignModalOpen] = useState(false)
  const [newVPName, setNewVPName] = useState('Monica Bell')

  // Note editing state
  const [editingNote, setEditingNote] = useState('')

  const isAdminOrLeader = user?.role === 'Admin' || (user?.rankLevel && user.rankLevel >= 4)

  const filteredRegions = useMemo(() => {
    return regions.filter((r) => {
      const q = searchQuery.toLowerCase()
      return (
        r.name.toLowerCase().includes(q) ||
        r.nickname.toLowerCase().includes(q) ||
        r.headOffice.toLowerCase().includes(q) ||
        r.assignedVP.toLowerCase().includes(q) ||
        r.statesCovered.some((st) => st.toLowerCase().includes(q)) ||
        r.branchCities.some((c) => c.toLowerCase().includes(q))
      )
    })
  }, [regions, searchQuery])

  const handleOpenDrawer = (reg: FedRegion) => {
    setSelectedRegion(reg)
    setEditingNote(reg.notes)
  }

  const handleSaveNote = () => {
    if (!selectedRegion) return
    const updated = regions.map((r) => (r.id === selectedRegion.id ? { ...r, notes: editingNote } : r))
    setRegions(updated)
    setSelectedRegion((prev) => (prev ? { ...prev, notes: editingNote } : null))
    toast({ title: 'Territory Notes Updated', description: `Saved notes for ${selectedRegion.name}`, type: 'success' })
  }

  const handleReassignVP = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRegion) return
    const updated = regions.map((r) => (r.id === selectedRegion.id ? { ...r, assignedVP: newVPName } : r))
    setRegions(updated)
    setSelectedRegion((prev) => (prev ? { ...prev, assignedVP: newVPName } : null))
    setReassignModalOpen(false)
    toast({
      title: 'Territory VP Reassigned',
      description: `${selectedRegion.name} is now assigned to ${newVPName}.`,
      type: 'success',
    })
  }

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Territory Management & Federal Reserve Regions"
        description="Interactive 12 Federal Reserve district map, Senior Channel VP territory assignments, and regional sales notes."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Territory Management', icon: <MapPin className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="navy" size="md">
            12 Federal Reserve Districts
          </Badge>
        }
      />

      {/* SEARCH BAR & LEGEND */}
      <Card variant="default" className="p-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search by state, city, county, region nickname (e.g. Empire State, Silicon Valley, Lone Star)..."
              leftIcon={<Search className="w-4 h-4" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <span className="text-xs font-semibold text-slate-500 shrink-0">
            Showing {filteredRegions.length} of 12 Districts
          </span>
        </div>

        {/* REGION COLOR LEGEND */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-[#1E3A5F] text-[11px]">
          <span className="font-bold text-slate-400 uppercase text-[10px]">District Color Legend:</span>
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => handleOpenDrawer(reg)}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#12294A] hover:bg-slate-200 dark:hover:bg-[#1E3A5F] transition-colors"
            >
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: reg.color }} />
              <span className="font-semibold text-slate-700 dark:text-slate-300">{reg.code}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* INTERACTIVE 12 DISTRICTS GRID / MAP REPRESENTATION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRegions.map((reg) => (
          <Card
            key={reg.id}
            variant="bento"
            className="p-4 hover:border-blue-500 cursor-pointer space-y-3 group transition-all relative overflow-hidden"
            onClick={() => handleOpenDrawer(reg)}
          >
            <div className="absolute top-0 inset-x-0 h-1.5" style={{ backgroundColor: reg.color }} />

            <div className="flex items-start justify-between gap-2 pt-1">
              <span
                className="px-2 py-0.5 rounded-md text-[11px] font-extrabold text-white shadow-xs"
                style={{ backgroundColor: reg.color }}
              >
                {reg.code}
              </span>
              <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(reg.volume)}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold font-heading text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {reg.name}
              </h4>
              <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                "{reg.nickname}"
              </p>
            </div>

            <div className="space-y-1 text-[11px] text-slate-500 border-t border-slate-100 dark:border-[#1E3A5F] pt-2">
              <p>Head Office: <strong className="text-slate-800 dark:text-slate-200">{reg.headOffice}</strong></p>
              <p className="truncate">VP: <strong className="text-slate-800 dark:text-slate-200">{reg.assignedVP}</strong></p>
              <p className="text-[10px] text-slate-400">{reg.repsCount} Assigned Reps</p>
            </div>
          </Card>
        ))}
      </div>

      {/* REGION DETAIL SIDE DRAWER */}
      <Drawer
        isOpen={!!selectedRegion}
        onClose={() => setSelectedRegion(null)}
        title="Territory District Detail"
        size="lg"
      >
        {selectedRegion && (
          <div className="space-y-6 text-left">
            {/* Header info card */}
            <div
              className="p-4 rounded-2xl text-white space-y-2 relative overflow-hidden shadow-lg"
              style={{ backgroundColor: selectedRegion.color }}
            >
              <div className="flex items-center justify-between">
                <Badge variant="navy" size="sm">
                  {selectedRegion.code}
                </Badge>
                <span className="font-extrabold text-sm">{formatCurrency(selectedRegion.volume)} Volume</span>
              </div>
              <h3 className="text-lg font-bold font-heading">{selectedRegion.name}</h3>
              <p className="text-xs opacity-90 font-medium">"{selectedRegion.nickname}"</p>
            </div>

            {/* Assigned Channel VP & Reassign Action */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Assigned Senior Channel VP
                </span>
                {isAdminOrLeader && (
                  <button
                    onClick={() => setReassignModalOpen(true)}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Reassign VP
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Avatar src={selectedRegion.assignedVPAvatar} name={selectedRegion.assignedVP} size="md" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{selectedRegion.assignedVP}</h4>
                  <p className="text-[11px] text-slate-500">Senior National Channel VP • {selectedRegion.repsCount} Team Reps</p>
                </div>
              </div>
            </div>

            {/* Coverage Lists */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">Head Office & Branch Cities</span>
                <p className="text-slate-500">{selectedRegion.headOffice}</p>
                <ul className="text-[11px] text-slate-500 list-disc list-inside pt-1">
                  {selectedRegion.branchCities.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">States Covered</span>
                <div className="flex flex-wrap gap-1 pt-1">
                  {selectedRegion.statesCovered.map((st, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white dark:bg-[#0D1E36] text-[10px] font-bold border">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Regional Notes & Save Form */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Territory Market Notes</h4>
                <Button size="sm" variant="ghost" onClick={handleSaveNote} leftIcon={<Save className="w-3.5 h-3.5" />} className="h-7 text-xs">
                  Save Notes
                </Button>
              </div>

              <Textarea
                value={editingNote}
                onChange={(e) => setEditingNote(e.target.value)}
                rows={4}
                className="text-xs font-mono"
              />
            </div>
          </div>
        )}
      </Drawer>

      {/* REASSIGN VP MODAL (ADMIN ONLY) */}
      <Modal
        isOpen={reassignModalOpen}
        onClose={() => setReassignModalOpen(false)}
        title="Reassign Senior Channel VP"
        description={`Reassign territory management for ${selectedRegion?.name}.`}
        maxWidth="md"
      >
        <form onSubmit={handleReassignVP} className="space-y-4">
          <FormField label="Select New Channel VP" required id="reassign-vp">
            <Select
              id="reassign-vp"
              options={[
                { label: 'Monica Bell (Senior Channel VP)', value: 'Monica Bell' },
                { label: 'David Ross (District Leader)', value: 'David Ross' },
                { label: 'Jason Miller (Regional Leader)', value: 'Jason Miller' },
                { label: 'Rachel Adams (Senior Executive)', value: 'Rachel Adams' },
                { label: 'Kevin Zhao (Channel VP)', value: 'Kevin Zhao' },
              ]}
              value={newVPName}
              onChange={(e) => setNewVPName(e.target.value)}
            />
          </FormField>

          <div className="pt-3 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setReassignModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent">
              Confirm Reassignment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
