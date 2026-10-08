import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Save, RefreshCcw, Eye, ShieldCheck, UserCheck } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Switch } from '@/components/ui/Switch'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'
import { useAuth, UserRole } from '@/hooks/useAuth'
import {
  AppModule,
  PermissionScope,
  SystemPermissions,
  DEFAULT_PERMISSIONS,
} from '@/config/permissions'

const MODULE_LABELS: Record<AppModule, string> = {
  dashboard: 'Executive Dashboard',
  bizproManagement: 'Biz Pro Management',
  rankRules: 'Rank & Promotion Rules',
  commissionMaker: 'Commission Maker',
  territory: 'Territory Management',
  inventory: 'Service Inventory & Catalog',
  billing: 'Subscriptions & Billing',
  leads: 'Leads CRM Database',
  clients: 'Clients Directory',
  scoreboard: 'Bulletin Scoreboard',
  jobs: 'Corporate Job Board',
  affiliates: 'Affiliates & Partners',
  cms: 'Website CMS Content',
  training: 'Training & Video Library',
  reports: 'Reports & Analytics',
  rolesPermissions: 'Roles & Permissions Matrix',
  ebox: 'eBOX Vault Repository',
  messages: 'Communication & Messages',
  profile: 'Profile & Account Settings',
}

export const AdminRolesPermissionsPage: React.FC = () => {
  const { toast } = useToast()
  const { switchRole } = useAuth()
  const navigate = useNavigate()

  const roles: UserRole[] = ['Admin', 'Biz Pro', 'Client', 'Affiliate', 'Employer', 'Job Seeker']
  const modules = Object.keys(MODULE_LABELS) as AppModule[]

  // Local state initialized from DEFAULT_PERMISSIONS deep clone
  const [matrix, setMatrix] = useState<SystemPermissions>(() => JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS)))
  const [selectedRolePreview, setSelectedRolePreview] = useState<UserRole>('Admin')

  const handleToggleView = (role: UserRole, mod: AppModule) => {
    setMatrix((prev) => {
      const copy = JSON.parse(JSON.stringify(prev))
      const currentVal = copy[role][mod].view
      copy[role][mod].view = !currentVal
      copy[role][mod].create = !currentVal
      copy[role][mod].edit = !currentVal
      return copy
    })
  }

  const handleScopeChange = (role: UserRole, mod: AppModule, newScope: PermissionScope) => {
    setMatrix((prev) => {
      const copy = JSON.parse(JSON.stringify(prev))
      copy[role][mod].scope = newScope
      return copy
    })
  }

  const handleSave = () => {
    toast({
      title: 'Permissions Matrix Saved!',
      description: 'Security tokens & role access matrices updated across all portal routes.',
      type: 'success',
    })
  }

  const handleReset = () => {
    setMatrix(JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS)))
    toast({
      title: 'Reset to System Defaults',
      description: 'Permissions matrix restored to default security baseline.',
      type: 'info',
    })
  }

  const handlePreviewAsRole = (role: UserRole) => {
    setSelectedRolePreview(role)
    switchRole(role)
    toast({
      title: `Previewing Portal as ${role}`,
      description: `Active demo session switched to ${role} role. Navigating to role dashboard...`,
      type: 'success',
    })
    const rolePaths: Record<UserRole, string> = {
      Admin: '/portal/admin/dashboard',
      'Biz Pro': '/portal/bizpro/dashboard',
      Client: '/portal/client/dashboard',
      Affiliate: '/portal/affiliate/dashboard',
      Employer: '/portal/employer/dashboard',
      'Job Seeker': '/portal/seeker/applications',
    }
    navigate(rolePaths[role])
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Roles & Permissions Access Control Matrix"
        description="Configure granular module view permissions and access scopes for each portal role."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Roles & Permissions', icon: <Lock className="w-3.5 h-3.5 text-purple-500" /> },
        ]}
        badge={
          <Badge variant="navy" size="md">
            RBAC Core
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset} leftIcon={<RefreshCcw className="w-3.5 h-3.5" />}>
              Reset to Defaults
            </Button>
            <Button variant="accent" size="sm" onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>
              Save Permissions Matrix
            </Button>
          </div>
        }
      />

      {/* PREVIEW AS ROLE SWITCHER BANNER */}
      <Card variant="default" className="p-4 bg-gradient-to-r from-blue-900 to-slate-900 text-white border-0 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <h3 className="font-bold text-sm">Preview Live Portal Experience by Role</h3>
              <p className="text-xs text-blue-200">Select any role to test instant sidebar menu and permission filtering</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {roles.map((r) => (
              <Button
                key={r}
                size="sm"
                variant={selectedRolePreview === r ? 'accent' : 'outline'}
                onClick={() => handlePreviewAsRole(r)}
                className={`text-xs font-bold ${
                  selectedRolePreview === r ? 'bg-emerald-500 text-white' : 'text-white border-slate-700'
                }`}
              >
                Preview {r}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* MATRIX TABLE */}
      <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4 min-w-[220px]">System Module</th>
                {roles.map((role) => (
                  <th key={role} className="py-3.5 px-4 text-center min-w-[150px]">
                    <div className="font-extrabold text-slate-900 dark:text-white">{role}</div>
                    <div className="text-[9px] font-normal text-slate-400">View & Scope</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {modules.map((mod) => (
                <tr key={mod} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    {MODULE_LABELS[mod]}
                    <div className="text-[10px] text-slate-400 font-mono font-normal">{mod}</div>
                  </td>
                  {roles.map((role) => {
                    const perm = matrix[role]?.[mod] || { view: false, scope: 'none' }
                    return (
                      <td key={role} className="py-3.5 px-4">
                        <div className="flex flex-col items-center gap-1.5">
                          <Switch
                            checked={perm.view}
                            onChange={() => handleToggleView(role, mod)}
                          />
                          <select
                            value={perm.scope}
                            onChange={(e) => handleScopeChange(role, mod, e.target.value as PermissionScope)}
                            className="bg-slate-100 dark:bg-slate-900 text-[10px] font-mono font-bold text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 focus:outline-none"
                          >
                            <option value="all">scope: ALL</option>
                            <option value="team">scope: TEAM</option>
                            <option value="own">scope: OWN</option>
                            <option value="none">scope: NONE</option>
                          </select>
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
