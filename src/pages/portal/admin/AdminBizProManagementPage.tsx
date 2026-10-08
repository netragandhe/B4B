import React, { useState } from 'react'
import {
  Users,
  Search,
  Plus,
  Edit,
  UserCheck,
  ShieldCheck,
  Mail,
  Building,
  CheckCircle2,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Drawer } from '@/components/ui/Drawer'
import { Modal } from '@/components/ui/Modal'
import { FormField } from '@/components/ui/FormField'
import { useToast } from '@/components/ui/Toast'
import { ADMIN_BIZPRO_LIST, AdminBizPro } from '@/mock-data/adminData'
import { BIZPRO_RANKS } from '@/mock-data/bizproData'
import { FED_REGIONS } from '@/mock-data/territoryScoreboardData'
import { formatCurrency } from '@/lib/utils'
import { MENU_CATALOG } from '@/config/menuCatalog'
import { permissionService } from '@/lib/rbac/permissionService'
import { MenuIcon } from '@/components/navigation/MenuIcon'
import { PermissionItem } from '@/lib/rbac/types'
import { KeyRound, ShieldAlert, Sparkles, Sliders } from 'lucide-react'
import { Can } from '@/components/auth/Can'

export const AdminBizProManagementPage: React.FC = () => {
  const { toast } = useToast()

  const [bizPros, setBizPros] = useState<AdminBizPro[]>(ADMIN_BIZPRO_LIST)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRep, setSelectedRep] = useState<AdminBizPro | null>(null)
  const [inviteModalOpen, setInviteModalOpen] = useState(false)

  // Drawer Tabs State
  const [drawerTab, setDrawerTab] = useState<'rank' | 'customAccess'>('rank')
  const [userOverrides, setUserOverrides] = useState<Record<string, Partial<PermissionItem>>>({})
  const [loadingOverrides, setLoadingOverrides] = useState(false)

  // Edit rank state inside drawer
  const [newRankLevel, setNewRankLevel] = useState<number>(4)

  // Invite Form State
  const [inviteData, setInviteData] = useState({
    name: '',
    email: '',
    company: '',
    region: 'District 7 - Chicago',
    initialRank: 'District Leader',
  })

  const filtered = bizPros.filter(
    (bp) =>
      bp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bp.region.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const created: AdminBizPro = {
      id: `bp_${Date.now()}`,
      name: inviteData.name || 'New Rep',
      email: inviteData.email || 'rep@b4b.com',
      company: inviteData.company || 'Advisory Group',
      rank: inviteData.initialRank,
      rankLevel: 4,
      region: inviteData.region,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      revenue: 0,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    }
    setBizPros((prev) => [created, ...prev])
    setInviteModalOpen(false)
    toast({
      title: 'Biz Pro Invited!',
      description: `Dispatched onboarding credentials to ${created.email}`,
      type: 'success',
    })
  }

  const handleUpdateRank = () => {
    if (!selectedRep) return
    const targetRank = BIZPRO_RANKS.find((r) => r.level === Number(newRankLevel)) || BIZPRO_RANKS[3]
    const updated = bizPros.map((bp) =>
      bp.id === selectedRep.id ? { ...bp, rank: targetRank.title, rankLevel: targetRank.level } : bp
    )
    setBizPros(updated)
    setSelectedRep((prev) => (prev ? { ...prev, rank: targetRank.title, rankLevel: targetRank.level } : null))
    toast({
      title: 'Rank Updated',
      description: `${selectedRep.name} promoted to ${targetRank.title} (Rank ${targetRank.level}).`,
      type: 'success',
    })
  }

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Biz Pro Sales Rep Management"
        description="Manage company sales representatives, edit rank levels, assign regions, and invite new reps."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Biz Pro Management', icon: <Users className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="primary" size="md">
            {filtered.length} Reps Enrolled
          </Badge>
        }
        actions={
          <Can menuId="admin-bizpro" action="create" disableInstead={true} tooltip="Create permission required to invite representatives">
            <Button
              variant="accent"
              size="md"
              onClick={() => setInviteModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Invite New Biz Pro
            </Button>
          </Can>
        }
      />

      {/* SEARCH BAR */}
      <Card variant="default" className="p-4 flex items-center gap-3">
        <Input
          placeholder="Search Biz Pros by name, email, company, region..."
          leftIcon={<Search className="w-4 h-4" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Card>

      {/* BIZ PRO TABLE */}
      <Card variant="default" className="divide-y divide-slate-100 dark:divide-[#1E3A5F]">
        {filtered.map((rep) => (
          <div
            key={rep.id}
            onClick={() => {
              setSelectedRep(rep)
              setNewRankLevel(rep.rankLevel)
            }}
            className="p-4 hover:bg-slate-50/80 dark:hover:bg-[#12294A]/40 cursor-pointer flex items-center justify-between gap-4 text-xs transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Avatar src={rep.avatar} name={rep.name} size="md" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white truncate">{rep.name}</span>
                  <Badge variant="gold" size="sm">
                    {rep.rank} (Rank {rep.rankLevel})
                  </Badge>
                  <Badge variant={rep.status === 'Active' ? 'emerald' : 'amber'} size="sm">
                    {rep.status}
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {rep.company} • {rep.email} • Region: {rep.region}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-400 shrink-0">
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Volume</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                  {formatCurrency(rep.revenue)}
                </span>
              </div>
              <Button size="sm" variant="outline" className="h-7 text-xs" leftIcon={<Edit className="w-3.5 h-3.5" />}>
                Edit Rank
              </Button>
            </div>
          </div>
        ))}
      </Card>

      {/* DETAIL DRAWER / EDIT RANK */}
      <Drawer
        isOpen={!!selectedRep}
        onClose={() => setSelectedRep(null)}
        title="Edit Biz Pro Account & Rank"
        size="md"
      >
        {selectedRep && (
          <div className="space-y-6 text-left">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-[#12294A] dark:to-[#0D1E36] border border-blue-100 dark:border-[#1E3A5F] flex items-center gap-3">
              <Avatar src={selectedRep.avatar} name={selectedRep.name} size="lg" />
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                  {selectedRep.name}
                </h3>
                <p className="text-xs text-slate-500">{selectedRep.company} • Joined {selectedRep.joinDate}</p>
                <Badge variant="gold" size="sm" className="mt-1">
                  Current: {selectedRep.rank}
                </Badge>
              </div>
            </div>

            {/* DRAWER TABS: RANK VS CUSTOM ACCESS OVERRIDES */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F]">
              <button
                type="button"
                onClick={() => setDrawerTab('rank')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  drawerTab === 'rank'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Profile & Rank Tier
              </button>
              <button
                type="button"
                onClick={async () => {
                  setDrawerTab('customAccess')
                  setLoadingOverrides(true)
                  try {
                    const overrides = await permissionService.getUserOverrides(selectedRep.id)
                    setUserOverrides(overrides)
                  } catch (e) {
                    console.error(e)
                  } finally {
                    setLoadingOverrides(false)
                  }
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  drawerTab === 'customAccess'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-500" />
                <span>Custom Access (Override)</span>
              </button>
            </div>

            {drawerTab === 'rank' ? (
              /* EDIT RANK FORM */
              <div className="space-y-3">
                <FormField label="Reassign Rank Tier (1 to 9)" id="edit-rank-level">
                  <Select
                    id="edit-rank-level"
                    options={BIZPRO_RANKS.map((r) => ({
                      label: `Rank ${r.level}: ${r.title} (${r.commissionTier})`,
                      value: r.level.toString(),
                    }))}
                    value={newRankLevel.toString()}
                    onChange={(e) => setNewRankLevel(Number(e.target.value))}
                  />
                </FormField>

                <Button variant="accent" size="sm" onClick={handleUpdateRank} className="w-full justify-center text-xs font-bold bg-blue-600 text-white">
                  Save & Update Rank Level
                </Button>
              </div>
            ) : (
              /* USER-LEVEL OVERRIDE TAB */
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-300">
                  <span className="font-bold block mb-0.5">User-Level Access Exceptions</span>
                  Grant or revoke specific menus for <strong>{selectedRep.name}</strong> individually,
                  on top of their Biz Pro role defaults. Overridden items are highlighted.
                </div>

                <div className="space-y-2 max-h-[420px] overflow-y-auto custom-scrollbar pr-1">
                  {MENU_CATALOG.filter((m) => m.route.includes('/bizpro') || m.module === 'Shared' || m.id === 'bizpro-dashboard').map((menu) => {
                    const override = userOverrides[menu.id]
                    const hasOverride = override && override.view !== undefined
                    const isGranted = override?.view === true
                    const isRevoked = override?.view === false

                    return (
                      <div
                        key={menu.id}
                        className={`p-2.5 rounded-xl border transition-all text-xs flex items-center justify-between ${
                          hasOverride
                            ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800'
                            : 'bg-slate-50/60 dark:bg-[#12294A]/30 border-slate-200 dark:border-[#1E3A5F]'
                        }`}
                      >
                        <div className="min-w-0 flex-1 mr-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <MenuIcon name={menu.icon} className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <span className="font-bold text-slate-900 dark:text-white truncate">
                              {menu.label}
                            </span>
                            {hasOverride ? (
                              <Badge variant={isGranted ? 'emerald' : 'danger'} size="sm" className="text-[9px] px-1 py-0">
                                {isGranted ? 'Override: Granted' : 'Override: Revoked'}
                              </Badge>
                            ) : (
                              <Badge variant="navy" size="sm" className="text-[9px] px-1 py-0">
                                Role Default
                              </Badge>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono block truncate">
                            {menu.module} • {menu.route}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={async () => {
                              await permissionService.setUserOverride(selectedRep.id, menu.id, { view: true })
                              const updated = await permissionService.getUserOverrides(selectedRep.id)
                              setUserOverrides(updated)
                              toast({
                                title: 'Access Override Granted',
                                description: `Granted "${menu.label}" for ${selectedRep.name}.`,
                                type: 'success',
                              })
                            }}
                            className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                              isGranted
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-emerald-100 hover:text-emerald-700'
                            }`}
                            title="Grant permission to this user"
                          >
                            Grant
                          </button>

                          <button
                            type="button"
                            onClick={async () => {
                              await permissionService.setUserOverride(selectedRep.id, menu.id, { view: false })
                              const updated = await permissionService.getUserOverrides(selectedRep.id)
                              setUserOverrides(updated)
                              toast({
                                title: 'Access Override Revoked',
                                description: `Revoked "${menu.label}" for ${selectedRep.name}.`,
                                type: 'info',
                              })
                            }}
                            className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                              isRevoked
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-rose-100 hover:text-rose-700'
                            }`}
                            title="Revoke permission for this user"
                          >
                            Revoke
                          </button>

                          {hasOverride && (
                            <button
                              type="button"
                              onClick={async () => {
                                await permissionService.deleteUserOverride(selectedRep.id, menu.id)
                                const updated = await permissionService.getUserOverrides(selectedRep.id)
                                setUserOverrides(updated)
                                toast({
                                  title: 'Override Cleared',
                                  description: `Reverted "${menu.label}" to standard Biz Pro role policy.`,
                                  type: 'info',
                                })
                              }}
                              className="px-1.5 py-1 rounded text-[10px] font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
                              title="Clear override and follow role"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* INVITE BIZ PRO MODAL */}
      <Modal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        title="Invite New Biz Pro Sales Executive"
        description="Dispatch onboard credentials and assign default territory."
        maxWidth="md"
      >
        <form onSubmit={handleInviteSubmit} className="space-y-4">
          <FormField label="Full Name" required id="inv-name">
            <Input
              id="inv-name"
              placeholder="e.g. David Ross"
              value={inviteData.name}
              onChange={(e) => setInviteData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </FormField>

          <FormField label="Email Address" required id="inv-email">
            <Input
              id="inv-email"
              type="email"
              placeholder="rep@company.com"
              value={inviteData.email}
              onChange={(e) => setInviteData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </FormField>

          <FormField label="Assigned Federal Reserve District" required id="inv-region">
            <Select
              id="inv-region"
              options={FED_REGIONS.map((r) => ({ label: r.name, value: r.name }))}
              value={inviteData.region}
              onChange={(e) => setInviteData((prev) => ({ ...prev, region: e.target.value }))}
            />
          </FormField>

          <div className="pt-3 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setInviteModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent">
              Dispatch Invitation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
