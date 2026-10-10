import React, { useState, useMemo } from 'react'
import {
  MapPin,
  Search,
  Building2,
  Users,
  UserCheck,
  Edit,
  Save,
  Globe,
  Info,
  Award,
  Layers,
  List,
  Map as MapIcon,
  ChevronRight,
  TrendingUp,
  DollarSign,
  FileText,
  Trash2,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Drawer } from '@/components/ui/Drawer'
import { Modal } from '@/components/ui/Modal'
import { Avatar } from '@/components/ui/Avatar'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'
import { territoryService, FedDistrict } from '@/lib/services/territoryService'
import { TerritoryMap } from '@/components/territory/TerritoryMap'
import { STATE_TERRITORY_MAP, FED_DISTRICT_COLORS } from '@/mock-data/territoryStates'
import { formatCurrency } from '@/lib/utils'

export const TerritoryManagementPage: React.FC = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const districts = territoryService.useDistricts()

  const [viewMode, setViewMode] = useState<'map' | 'list'>('map')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDistrictNumber, setSelectedDistrictNumber] = useState<number | null>(null)
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [reassignModalOpen, setReassignModalOpen] = useState(false)
  const [newVPName, setNewVPName] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<FedDistrict['exclusivityStatus']>('Allocated')

  // District Notes State
  const [notesText, setNotesText] = useState('')

  const isAdminOrLeader = user?.role === 'Admin' || (user?.rankLevel && user.rankLevel >= 4)

  // Find active district from selected ID
  const activeDistrict = useMemo(() => {
    if (!selectedDistrictNumber) return null
    return districts.find((d) => d.number === selectedDistrictNumber) || null
  }, [districts, selectedDistrictNumber])

  // Selected state info
  const activeStateInfo = useMemo(() => {
    if (!selectedStateCode) return null
    const entry = Object.values(STATE_TERRITORY_MAP).find((s) => s.code === selectedStateCode)
    return entry || null
  }, [selectedStateCode])

  const filteredDistricts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return districts

    return districts.filter((d) => {
      const matchName = d.name.toLowerCase().includes(q)
      const matchHQ = d.headquarters.toLowerCase().includes(q)
      const matchLeader = (d.assignedLeaderName || '').toLowerCase().includes(q)
      const matchStates = d.states.some((s) => s.toLowerCase().includes(q))
      const matchCode = d.code.toLowerCase().includes(q)
      return matchName || matchHQ || matchLeader || matchStates || matchCode
    })
  }, [districts, searchQuery])

  const handleSelectDistrict = (districtNum: number) => {
    setSelectedDistrictNumber(districtNum)
    const dist = districts.find((d) => d.number === districtNum)
    if (dist) {
      setNotesText(`District ${dist.number} (${dist.name}) notes and allocation history.`)
    }
    setDrawerOpen(true)
  }

  const handleSelectState = (stateCode: string) => {
    setSelectedStateCode(stateCode)
    const stateInfo = Object.values(STATE_TERRITORY_MAP).find((s) => s.code === stateCode)
    if (stateInfo) {
      setSelectedDistrictNumber(stateInfo.primaryDistrict)
    }
    setDrawerOpen(true)
  }

  const handleSaveNotes = () => {
    toast({
      title: 'Territory Notes Saved',
      description: `Updated notes for District ${activeDistrict?.number || ''} (${activeDistrict?.name || ''}).`,
      type: 'success',
    })
  }

  const handleReassign = (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeDistrict || !newVPName.trim()) return

    territoryService.reassignLeader(activeDistrict.id, newVPName.trim(), selectedStatus)
    setReassignModalOpen(false)
    toast({
      title: 'Territory Leader Reassigned',
      description: `District ${activeDistrict.number} (${activeDistrict.name}) is now assigned to ${newVPName}.`,
      type: 'success',
    })
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto pb-12">
      <PageHeader
        title="Territory Management & Federal Reserve Districts"
        description="Interactive 12 Federal Reserve district GIS map, county & municipal allocations, and Senior National Channel VP exclusive territorial rights."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Territory Management', icon: <MapPin className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="navy" size="md">
            12 Federal Reserve Districts
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  viewMode === 'map'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Map View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>List View</span>
              </button>
            </div>
          </div>
        }
      />

      {/* SEARCH BAR & DISTRICT QUICK PILLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search state (CA, TX), city, or Fed district..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          />
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-blue-500" />
          <span>Click any state or district pin to view allocation and senior leadership.</span>
        </div>
      </div>

      {/* VIEW MODE 1: INTERACTIVE D3 MAP */}
      {viewMode === 'map' ? (
        <div className="space-y-4">
          <TerritoryMap
            selectedDistrictId={selectedDistrictNumber}
            selectedStateCode={selectedStateCode}
            onSelectDistrict={handleSelectDistrict}
            onSelectState={handleSelectState}
            highlightedSearchQuery={searchQuery}
          />

          {/* FED DISTRICTS INTERACTIVE COLOR LEGEND */}
          <Card variant="default" className="p-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              <span>12 Federal Reserve Districts & Assigned Leadership</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
              {districts.map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleSelectDistrict(d.number)}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    selectedDistrictNumber === d.number
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/30'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: FED_DISTRICT_COLORS[d.number] }}
                    />
                    <span className="font-bold text-slate-900 dark:text-white truncate">
                      {d.number}. {d.name}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{d.assignedLeaderName || 'Unassigned'}</div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        /* VIEW MODE 2: TABLE / LIST VIEW */
        <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                  <th className="py-3 px-4">District</th>
                  <th className="py-3 px-4">Headquarters</th>
                  <th className="py-3 px-4">States Covered</th>
                  <th className="py-3 px-4">Assigned Senior Leader</th>
                  <th className="py-3 px-4">Monthly Target</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredDistricts.map((d) => (
                  <tr
                    key={d.id}
                    onClick={() => handleSelectDistrict(d.number)}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: FED_DISTRICT_COLORS[d.number] }}
                      />
                      <span>
                        {d.number} — {d.name} ({d.code})
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{d.headquarters}</td>
                    <td className="py-3 px-4 text-slate-500">
                      <div className="flex flex-wrap gap-1">
                        {d.states.map((st) => (
                          <span
                            key={st}
                            className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono font-semibold"
                          >
                            {st}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      {d.assignedLeaderName || 'Unassigned'}
                    </td>
                    <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">
                      {formatCurrency(d.monthlyVolumeTarget)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={d.exclusivityStatus === 'Exclusive' ? 'gold' : d.exclusivityStatus === 'Allocated' ? 'emerald' : 'navy'}
                        size="sm"
                      >
                        {d.exclusivityStatus}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* DISTRICT & STATE SIDE DRAWER */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={
          activeDistrict
            ? `District ${activeDistrict.number} — ${activeDistrict.name}`
            : 'Territory Details'
        }
        description={`Federal Reserve Code ${activeDistrict?.code || ''} • Headquarters: ${activeDistrict?.headquarters || ''}`}
        size="lg"
      >
        {activeDistrict && (
          <div className="space-y-6 text-left text-xs">
            {/* KPI Stat Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Monthly Target</span>
                <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(activeDistrict.monthlyVolumeTarget)}
                </div>
                <div className="text-[10px] text-slate-500">Funded deal quota</div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Active B4B Coaches</span>
                <div className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                  {activeDistrict.activeCoachesCount} Advisors
                </div>
                <div className="text-[10px] text-slate-500">Regional sales force</div>
              </div>
            </div>

            {/* Senior Channel VP Assignment Card */}
            <Card variant="default" className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Assigned Senior Channel VP</span>
                </h4>
                <Badge variant={activeDistrict.exclusivityStatus === 'Exclusive' ? 'gold' : 'emerald'} size="sm">
                  {activeDistrict.exclusivityStatus}
                </Badge>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2.5">
                  <Avatar name={activeDistrict.assignedLeaderName || 'Leader'} size="md" />
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      {activeDistrict.assignedLeaderName || 'Unassigned Territory'}
                    </div>
                    <div className="text-slate-400 text-[11px]">Senior Executive Channel VP</div>
                  </div>
                </div>

                {isAdminOrLeader && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setNewVPName(activeDistrict.assignedLeaderName || '')
                      setSelectedStatus(activeDistrict.exclusivityStatus)
                      setReassignModalOpen(true)
                    }}
                    leftIcon={<Edit className="w-3.5 h-3.5" />}
                  >
                    Reassign
                  </Button>
                )}
              </div>
            </Card>

            {/* States & Municipal Cities Selector */}
            <Card variant="default" className="p-4 space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-500" />
                <span>States & Municipal Jurisdictions</span>
              </h4>

              <div className="space-y-2">
                <div className="text-slate-500 text-[11px]">States encompassed by this Federal Reserve district:</div>
                <div className="flex flex-wrap gap-1.5">
                  {activeDistrict.states.map((st) => (
                    <button
                      key={st}
                      onClick={() => handleSelectState(st)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedStateCode === st
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {activeStateInfo && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white">
                    {activeStateInfo.name} ({activeStateInfo.code}) Counties & Cities:
                  </div>

                  {activeStateInfo.splitNote && (
                    <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-[11px]">
                      {activeStateInfo.splitNote}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    {activeStateInfo.cities.map((ct) => (
                      <div
                        key={ct.name}
                        className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/50 text-[11px]"
                      >
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{ct.name}</span>
                        <span className="text-slate-400">County: {ct.county} (Zip {ct.zip})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Territory Notes & Strategy Editor */}
            <Card variant="default" className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <span>Territory Strategy Notes</span>
                </h4>
                <Button variant="accent" size="sm" onClick={handleSaveNotes} leftIcon={<Save className="w-3.5 h-3.5" />}>
                  Save Notes
                </Button>
              </div>

              <textarea
                rows={4}
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="Add confidential notes on local banks, commercial borrower pipelines, or county allocations..."
                className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </Card>
          </div>
        )}
      </Drawer>

      {/* REASSIGN SENIOR VP MODAL */}
      {reassignModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setReassignModalOpen(false)}
          title={`Reassign District ${activeDistrict?.number} (${activeDistrict?.name})`}
          description="Update Senior National Channel VP exclusive territorial rights and allocation status."
          maxWidth="md"
        >
          <form onSubmit={handleReassign} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Senior National Channel VP Name *
              </label>
              <Input
                value={newVPName}
                onChange={(e) => setNewVPName(e.target.value)}
                placeholder="e.g. Carlos Ramirez (Rank 7)"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Territorial Exclusivity Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="w-full h-10 px-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                <option value="Exclusive">Exclusive (Single Executive Director Rights)</option>
                <option value="Allocated">Allocated (Multi-Advisor Territory)</option>
                <option value="Open">Open (Unallocated Regional Market)</option>
              </select>
            </div>

            <div className="pt-3 border-t flex justify-end gap-2">
              <Button variant="outline" size="sm" type="button" onClick={() => setReassignModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="accent" size="sm" type="submit">
                Confirm Assignment
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
