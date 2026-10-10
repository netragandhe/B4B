import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Shield,
  Lock,
  Unlock,
  Save,
  RotateCcw,
  Eye,
  Plus,
  Copy,
  Trash2,
  Search,
  Filter,
  Check,
  X,
  AlertTriangle,
  Download,
  Upload,
  History,
  Smartphone,
  Monitor,
  ChevronRight,
  ChevronDown,
  CheckSquare,
  Square,
  Users,
  Sliders,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  FileSpreadsheet,
  Calendar,
  Layers,
  ArrowRight,
  Info,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Switch } from '@/components/ui/Switch'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { SEOHead } from '@/components/seo/SEOHead'
import { useToast } from '@/components/ui/Toast'
import { useAuth } from '@/hooks/useAuth'
import { usePermission } from '@/hooks/usePermission'
import { permissionService } from '@/lib/rbac/permissionService'
import { MENU_CATALOG, MENU_MAP, MODULE_ORDER } from '@/config/menuCatalog'
import { MenuIcon } from '@/components/navigation/MenuIcon'
import {
  Role,
  RoleId,
  Menu,
  PermissionItem,
  PermissionAction,
  ScopeType,
  AuditLogEntry,
  PermissionDiff,
} from '@/lib/rbac/types'

export const AdminRolesPermissionsPage: React.FC = () => {
  const { toast } = useToast()
  const { user } = useAuth()
  const navigate = useNavigate()
  const {
    roles,
    permissions,
    auditLog,
    refreshPermissions,
    impersonateRole,
  } = usePermission()

  // Active View Tab
  const [activeTab, setActiveTab] = useState<'matrix' | 'compare' | 'preview' | 'audit' | 'importExport'>('matrix')

  // Selected Role for Single Matrix View & Preview
  const [selectedRoleId, setSelectedRoleId] = useState<RoleId>('admin')

  // Search & Filters in Matrix Tab
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'enabled' | 'disabled'>('all')
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('all')
  const [matrixViewMode, setMatrixViewMode] = useState<'simple' | 'detailed'>('simple')
  const [expandedMenuIds, setExpandedMenuIds] = useState<Record<string, boolean>>({})
  const [collapsedModules, setCollapsedModules] = useState<Record<string, boolean>>({})

  // Draft Permissions Matrix: roleId -> menuId -> PermissionItem
  const [draftPermissions, setDraftPermissions] = useState<Record<string, Record<string, PermissionItem>>>({})

  // Initialize draft permissions from live context permissions
  useEffect(() => {
    if (permissions && Object.keys(permissions).length > 0) {
      setDraftPermissions(JSON.parse(JSON.stringify(permissions)))
    }
  }, [permissions])

  // Modals state
  const [addRoleModalOpen, setAddRoleModalOpen] = useState(false)
  const [cloneRoleModalOpen, setCloneRoleModalOpen] = useState(false)
  const [deleteRoleModalOpen, setDeleteRoleModalOpen] = useState(false)
  const [saveConfirmModalOpen, setSaveConfirmModalOpen] = useState(false)
  const [resetRoleConfirmModalOpen, setResetRoleConfirmModalOpen] = useState(false)
  const [resetAllConfirmModalOpen, setResetAllConfirmModalOpen] = useState(false)
  const [importModalOpen, setImportModalOpen] = useState(false)

  // Form states for Add / Clone Role
  const [newRoleName, setNewRoleName] = useState('')
  const [newRoleDesc, setNewRoleDesc] = useState('')
  const [cloneSourceRoleId, setCloneSourceRoleId] = useState<RoleId>('client')
  const [importJsonText, setImportJsonText] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // Audit log filters
  const [auditRoleFilter, setAuditRoleFilter] = useState<string>('all')
  const [auditSearchQuery, setAuditSearchQuery] = useState<string>('')

  // Calculate selected role object
  const selectedRole = useMemo(() => {
    return roles.find((r) => r.id === selectedRoleId) || roles[0] || {
      id: 'admin',
      name: 'Admin',
      description: 'System Administrator',
      isSystem: true,
      status: 'active',
      userCount: 4,
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01',
    }
  }, [roles, selectedRoleId])

  // Get current active permissions for selected role
  const currentRoleDraftPerms = useMemo(() => {
    return draftPermissions[selectedRoleId] || permissions[selectedRoleId] || {}
  }, [draftPermissions, permissions, selectedRoleId])

  // Compute pending changes / diffs
  const pendingDiffs = useMemo<PermissionDiff[]>(() => {
    const diffs: PermissionDiff[] = []
    if (!permissions || !draftPermissions) return diffs

    Object.keys(draftPermissions).forEach((roleId) => {
      const origRolePerms = permissions[roleId] || {}
      const draftRolePerms = draftPermissions[roleId] || {}
      const roleObj = roles.find((r) => r.id === roleId)
      const roleName = roleObj?.name || roleId

      Object.keys(draftRolePerms).forEach((menuId) => {
        const origItem = origRolePerms[menuId]
        const draftItem = draftRolePerms[menuId]
        const menuObj = MENU_MAP[menuId]
        const menuLabel = menuObj?.label || menuId

        if (!origItem) {
          if (draftItem.view) {
            diffs.push({
              roleId,
              roleName,
              menuId,
              menuLabel,
              field: 'view',
              oldValue: false,
              newValue: draftItem.view,
            })
          }
          return
        }

        const fields: (keyof PermissionItem)[] = ['view', 'create', 'edit', 'delete', 'approve', 'export', 'scope', 'minRank']
        fields.forEach((field) => {
          if (draftItem[field] !== origItem[field]) {
            diffs.push({
              roleId,
              roleName,
              menuId,
              menuLabel,
              field,
              oldValue: origItem[field],
              newValue: draftItem[field],
            })
          }
        })
      })
    })

    return diffs
  }, [permissions, draftPermissions, roles])

  // Safety rule check for locks
  const isLockedItem = (roleId: RoleId, menu: Menu): { locked: boolean; reason: string } => {
    if (roleId === 'admin') {
      if (
        menu.id === 'admin-roles-permissions' ||
        menu.id === 'admin-overview' ||
        menu.id === 'shared-settings'
      ) {
        return {
          locked: true,
          reason: 'Critical Security Control: Admin cannot be locked out of essential administrative interfaces.',
        }
      }
    }
    if (menu.isCore) {
      return {
        locked: true,
        reason: 'Core Platform Feature: Fundamental portal navigation item cannot be disabled for any role.',
      }
    }
    return { locked: false, reason: '' }
  }

  // Mutation Handlers on Draft Permissions
  const handleToggleMenuShow = (roleId: RoleId, menuId: string) => {
    const menu = MENU_MAP[menuId]
    if (!menu) return
    const lockInfo = isLockedItem(roleId, menu)
    if (lockInfo.locked) return

    setDraftPermissions((prev) => {
      const copy = JSON.parse(JSON.stringify(prev))
      if (!copy[roleId]) copy[roleId] = {}
      const current = copy[roleId][menuId] || {
        view: false,
        create: false,
        edit: false,
        delete: false,
        approve: false,
        export: false,
        scope: 'own',
      }

      const nextView = !current.view
      current.view = nextView

      // Action dependency: turning view OFF turns everything else off
      if (!nextView) {
        current.create = false
        current.edit = false
        current.delete = false
        current.approve = false
        current.export = false
        current.scope = 'none'
      } else {
        if (current.scope === 'none') {
          current.scope = 'own'
        }
      }

      copy[roleId][menuId] = current
      return copy
    })
  }

  const handleToggleAction = (roleId: RoleId, menuId: string, action: PermissionAction) => {
    setDraftPermissions((prev) => {
      const copy = JSON.parse(JSON.stringify(prev))
      if (!copy[roleId]) copy[roleId] = {}
      const current = copy[roleId][menuId] || {
        view: false,
        create: false,
        edit: false,
        delete: false,
        approve: false,
        export: false,
        scope: 'own',
      }

      const nextVal = !current[action]
      current[action] = nextVal

      // Action dependency: turning ANY action on turns view on!
      if (nextVal) {
        current.view = true
        if (current.scope === 'none') {
          current.scope = 'own'
        }
      }

      copy[roleId][menuId] = current
      return copy
    })
  }

  const handleScopeChange = (roleId: RoleId, menuId: string, scope: ScopeType) => {
    setDraftPermissions((prev) => {
      const copy = JSON.parse(JSON.stringify(prev))
      if (!copy[roleId]) copy[roleId] = {}
      const current = copy[roleId][menuId] || {
        view: false,
        create: false,
        edit: false,
        delete: false,
        approve: false,
        export: false,
        scope: 'own',
      }

      current.scope = scope
      // If scope set to 'none', all actions become effectively null
      if (scope === 'none') {
        current.create = false
        current.edit = false
        current.delete = false
        current.approve = false
        current.export = false
      }

      copy[roleId][menuId] = current
      return copy
    })
  }

  const handleMinRankChange = (roleId: RoleId, menuId: string, minRank: number) => {
    setDraftPermissions((prev) => {
      const copy = JSON.parse(JSON.stringify(prev))
      if (!copy[roleId]) copy[roleId] = {}
      const current = copy[roleId][menuId] || {
        view: false,
        create: false,
        edit: false,
        delete: false,
        approve: false,
        export: false,
        scope: 'own',
      }

      current.minRank = minRank
      copy[roleId][menuId] = current
      return copy
    })
  }

  const handleToggleGroup = (roleId: RoleId, groupMenus: Menu[], forceState?: boolean) => {
    setDraftPermissions((prev) => {
      const copy = JSON.parse(JSON.stringify(prev))
      if (!copy[roleId]) copy[roleId] = {}

      const allEnabled = groupMenus.every((m) => copy[roleId][m.id]?.view)
      const targetState = forceState !== undefined ? forceState : !allEnabled

      groupMenus.forEach((menu) => {
        const lockInfo = isLockedItem(roleId, menu)
        if (lockInfo.locked) return

        const current = copy[roleId][menu.id] || {
          view: false,
          create: false,
          edit: false,
          delete: false,
          approve: false,
          export: false,
          scope: 'own',
        }

        current.view = targetState
        if (!targetState) {
          current.create = false
          current.edit = false
          current.delete = false
          current.approve = false
          current.export = false
          current.scope = 'none'
        } else {
          if (current.scope === 'none') {
            current.scope = 'own'
          }
        }
        copy[roleId][menu.id] = current
      })

      return copy
    })
  }

  const handleSetPreset = (roleId: RoleId, menuId: string, preset: 'full' | 'readonly' | 'hidden') => {
    const menu = MENU_MAP[menuId]
    if (!menu) return
    const lockInfo = isLockedItem(roleId, menu)
    if (lockInfo.locked && preset === 'hidden') return

    setDraftPermissions((prev) => {
      const copy = JSON.parse(JSON.stringify(prev))
      if (!copy[roleId]) copy[roleId] = {}
      
      if (preset === 'full') {
        copy[roleId][menuId] = {
          view: true,
          create: true,
          edit: true,
          delete: true,
          approve: true,
          export: true,
          scope: 'all',
          minRank: copy[roleId][menuId]?.minRank || menu.minRank || 1,
        }
      } else if (preset === 'readonly') {
        copy[roleId][menuId] = {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: false,
          export: false,
          scope: 'own',
          minRank: copy[roleId][menuId]?.minRank || menu.minRank || 1,
        }
      } else {
        copy[roleId][menuId] = {
          view: false,
          create: false,
          edit: false,
          delete: false,
          approve: false,
          export: false,
          scope: 'none',
          minRank: copy[roleId][menuId]?.minRank || menu.minRank || 1,
        }
      }
      return copy
    })
  }

  const toggleExpandMenu = (menuId: string) => {
    setExpandedMenuIds((prev) => ({ ...prev, [menuId]: !prev[menuId] }))
  }

  const toggleCollapseModule = (moduleName: string) => {
    setCollapsedModules((prev) => ({ ...prev, [moduleName]: !prev[moduleName] }))
  }

  // Filtered menus for Matrix Tab
  const filteredMenusByModule = useMemo(() => {
    const modulesMap: Record<string, Menu[]> = {}
    MODULE_ORDER.forEach((mod: string) => {
      modulesMap[mod] = []
    })

    MENU_CATALOG.forEach((menu) => {
      // 1. Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const matches =
          menu.label.toLowerCase().includes(q) ||
          menu.route.toLowerCase().includes(q) ||
          menu.group.toLowerCase().includes(q) ||
          (menu.description && menu.description.toLowerCase().includes(q))
        if (!matches) return
      }

      // 2. Filter Status (enabled / disabled)
      const perm = currentRoleDraftPerms[menu.id]
      const isEnabled = perm?.view || menu.isCore
      if (filterStatus === 'enabled' && !isEnabled) return
      if (filterStatus === 'disabled' && isEnabled) return

      // 3. Module Filter
      if (selectedModuleFilter !== 'all' && menu.module !== selectedModuleFilter) return

      if (!modulesMap[menu.module]) {
        modulesMap[menu.module] = []
      }
      modulesMap[menu.module].push(menu)
    })

    return modulesMap
  }, [searchQuery, filterStatus, selectedModuleFilter, currentRoleDraftPerms])

  // Save changes handler
  const handleConfirmSave = async () => {
    try {
      setIsSaving(true)
      const actor = user?.name || 'Super Admin'

      // Collect patches by role
      const rolesWithDiffs = new Set(pendingDiffs.map((d) => d.roleId))
      for (const rId of rolesWithDiffs) {
        const roleDrafts = draftPermissions[rId]
        if (roleDrafts) {
          await permissionService.bulkUpdate(rId, roleDrafts, actor)
        }
      }

      await refreshPermissions(true)
      setSaveConfirmModalOpen(false)
      toast({
        title: 'Permissions Matrix Saved!',
        description: `Successfully applied ${pendingDiffs.length} permission updates across the platform.`,
        type: 'success',
      })
    } catch (err: any) {
      toast({
        title: 'Save Failed',
        description: err.message || 'Could not update permissions matrix.',
        type: 'error',
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Discard changes
  const handleDiscardChanges = () => {
    setDraftPermissions(JSON.parse(JSON.stringify(permissions)))
    toast({
      title: 'Changes Discarded',
      description: 'Permissions restored to last saved state.',
      type: 'info',
    })
  }

  // Reset Role handler
  const handleResetRole = async () => {
    try {
      setIsSaving(true)
      await permissionService.resetRole(selectedRoleId, user?.name || 'Super Admin')
      await refreshPermissions(true)
      setResetRoleConfirmModalOpen(false)
      toast({
        title: `Role "${selectedRole.name}" Reset`,
        description: 'Permissions restored to system default baseline.',
        type: 'info',
      })
    } catch (err: any) {
      toast({
        title: 'Reset Failed',
        description: err.message,
        type: 'error',
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Reset All handler
  const handleResetAll = async () => {
    try {
      setIsSaving(true)
      await permissionService.resetAll(user?.name || 'Super Admin')
      await refreshPermissions(true)
      setResetAllConfirmModalOpen(false)
      toast({
        title: 'Full Platform RBAC Reset',
        description: 'All 6 system roles restored to standard security defaults.',
        type: 'info',
      })
    } catch (err: any) {
      toast({
        title: 'Reset Failed',
        description: err.message,
        type: 'error',
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Add Custom Role handler
  const handleCreateRole = async () => {
    if (!newRoleName.trim()) {
      toast({ title: 'Role name is required', type: 'error' })
      return
    }

    try {
      setIsSaving(true)
      const created = await permissionService.createRole(
        {
          name: newRoleName.trim(),
          description: newRoleDesc.trim() || 'Custom administrative or operational role',
        },
        user?.name || 'Super Admin'
      )
      await refreshPermissions(true)
      setSelectedRoleId(created.id)
      setAddRoleModalOpen(false)
      setNewRoleName('')
      setNewRoleDesc('')
      toast({
        title: 'Role Created',
        description: `New custom role "${created.name}" is now configurable.`,
        type: 'success',
      })
    } catch (err: any) {
      toast({ title: 'Creation Failed', description: err.message, type: 'error' })
    } finally {
      setIsSaving(false)
    }
  }

  // Clone Role handler
  const handleCloneRole = async () => {
    if (!newRoleName.trim()) {
      toast({ title: 'Role name is required', type: 'error' })
      return
    }

    try {
      setIsSaving(true)
      const cloned = await permissionService.cloneRole(
        cloneSourceRoleId,
        {
          name: newRoleName.trim(),
          description: newRoleDesc.trim() || `Cloned from ${cloneSourceRoleId}`,
        },
        user?.name || 'Super Admin'
      )
      await refreshPermissions(true)
      setSelectedRoleId(cloned.id)
      setCloneRoleModalOpen(false)
      setNewRoleName('')
      setNewRoleDesc('')
      toast({
        title: 'Role Cloned Successfully',
        description: `Created "${cloned.name}" with initial permissions from ${cloneSourceRoleId}.`,
        type: 'success',
      })
    } catch (err: any) {
      toast({ title: 'Clone Failed', description: err.message, type: 'error' })
    } finally {
      setIsSaving(false)
    }
  }

  // Delete Custom Role handler
  const handleDeleteRole = async () => {
    if (selectedRole.isSystem) {
      toast({ title: 'System roles cannot be deleted', type: 'error' })
      return
    }
    if (selectedRole.userCount > 0) {
      toast({
        title: 'Cannot Delete Assigned Role',
        description: `This role is assigned to ${selectedRole.userCount} users. Please reassign them first.`,
        type: 'error',
      })
      return
    }

    try {
      setIsSaving(true)
      await permissionService.deleteRole(selectedRoleId, user?.name || 'Super Admin')
      await refreshPermissions(true)
      setSelectedRoleId('admin')
      setDeleteRoleModalOpen(false)
      toast({
        title: 'Role Deleted',
        description: `Custom role "${selectedRole.name}" has been removed.`,
        type: 'info',
      })
    } catch (err: any) {
      toast({ title: 'Delete Failed', description: err.message, type: 'error' })
    } finally {
      setIsSaving(false)
    }
  }

  // Export Matrix JSON
  const handleExportJson = async () => {
    try {
      const data = await permissionService.exportMatrix()
      const jsonStr = JSON.stringify(data, null, 2)
      const blob = new Blob([jsonStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `b4b_rbac_matrix_${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      toast({ title: 'Matrix Exported', description: 'Downloaded RBAC configuration file.', type: 'success' })
    } catch (err: any) {
      toast({ title: 'Export Failed', description: err.message, type: 'error' })
    }
  }

  // Import Matrix JSON
  const handleImportJson = async () => {
    if (!importJsonText.trim()) {
      toast({ title: 'Please paste JSON payload', type: 'error' })
      return
    }

    try {
      setIsSaving(true)
      await permissionService.importMatrix(importJsonText.trim(), user?.name || 'Super Admin')
      await refreshPermissions(true)
      setImportModalOpen(false)
      setImportJsonText('')
      toast({
        title: 'Matrix Imported Successfully',
        description: 'New RBAC configuration loaded into active runtime.',
        type: 'success',
      })
    } catch (err: any) {
      toast({
        title: 'Import Validation Failed',
        description: err.message || 'Invalid JSON format or missing schema attributes.',
        type: 'error',
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Export Audit Log CSV
  const handleExportAuditCsv = () => {
    if (!auditLog || auditLog.length === 0) {
      toast({ title: 'No audit records to export', type: 'info' })
      return
    }

    const headers = ['Timestamp', 'Actor', 'Role', 'Menu', 'Action', 'Summary']
    const rows = auditLog.map((log) => [
      `"${log.timestamp}"`,
      `"${log.actor}"`,
      `"${log.roleId}"`,
      `"${log.menuId || 'N/A'}"`,
      `"${log.action}"`,
      `"${log.summary.replace(/"/g, '""')}"`,
    ])

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `b4b_rbac_audit_log_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast({ title: 'Audit Log Exported', description: 'Downloaded audit records as CSV.', type: 'success' })
  }

  // Filtered Audit Log
  const filteredAuditLog = useMemo(() => {
    return auditLog.filter((log) => {
      if (auditRoleFilter !== 'all' && log.roleId !== auditRoleFilter) return false
      if (auditSearchQuery) {
        const q = auditSearchQuery.toLowerCase()
        const matches =
          log.actor.toLowerCase().includes(q) ||
          log.summary.toLowerCase().includes(q) ||
          log.action.toLowerCase().includes(q) ||
          (log.menuId && log.menuId.toLowerCase().includes(q))
        if (!matches) return false
      }
      return true
    })
  }, [auditLog, auditRoleFilter, auditSearchQuery])

  // Impersonate / Preview as selected role
  const handleOpenPortalAsRole = async () => {
    await impersonateRole(selectedRoleId)
    const roleRoutes: Record<string, string> = {
      admin: '/portal/admin/dashboard',
      bizpro: '/portal/bizpro/dashboard',
      client: '/portal/client/dashboard',
      affiliate: '/portal/affiliate/dashboard',
      employer: '/portal/employer/dashboard',
      jobseeker: '/portal/seeker/applications',
    }
    const targetRoute = roleRoutes[selectedRoleId] || '/portal/dashboard'
    navigate(targetRoute)
  }

  // Computed allowed menus for preview tab
  const previewRoleMenus = useMemo(() => {
    const rolePerms = currentRoleDraftPerms
    return MENU_CATALOG.filter((menu) => {
      if (menu.isCore) return true
      if (selectedRoleId === 'admin' && (menu.id === 'admin-roles-permissions' || menu.id === 'admin-overview' || menu.id === 'shared-settings')) {
        return true
      }
      return rolePerms[menu.id]?.view === true
    }).sort((a, b) => a.order - b.order)
  }, [selectedRoleId, currentRoleDraftPerms])

  return (
    <div className="space-y-6 pb-24 animate-fadeIn">
      <SEOHead
        title="Roles & Permissions Matrix | Super Admin"
        description="Comprehensive enterprise Role-Based Access Control (RBAC) governance cockpit."
      />

      {/* PAGE HEADER */}
      <PageHeader
        badge={
          <Badge variant="emerald" size="sm">
            Zero-Code Governance
          </Badge>
        }
        title="Roles & Permissions Cockpit"
        description="Granularly govern portal menus, interactive actions, data scopes, and custom corporate roles without changing code."
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportJson}
              className="text-xs"
            >
              <Download className="w-3.5 h-3.5 mr-1 text-slate-500" /> Export JSON
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setImportModalOpen(true)}
              className="text-xs"
            >
              <Upload className="w-3.5 h-3.5 mr-1 text-slate-500" /> Import JSON
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setResetAllConfirmModalOpen(true)}
              className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset All Baseline
            </Button>
          </div>
        }
      />

      {/* TOP TABS NAVIGATION */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#1E3A5F] overflow-x-auto pb-1 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {[
            { id: 'matrix', label: 'Role Matrix', icon: Sliders },
            { id: 'compare', label: 'Compare Roles', icon: Layers },
            { id: 'preview', label: 'Preview & Impersonate', icon: Eye },
            { id: 'audit', label: 'Audit Log', icon: History, count: auditLog.length },
          ].map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#12294A]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      active ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {pendingDiffs.length > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-300 dark:border-amber-800 animate-pulse shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{pendingDiffs.length} Changes Pending Save</span>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MAIN VIEW AREA: TWO COLUMN LAYOUT (LEFT ROLES LIST, RIGHT CONTENT) */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* MAIN VIEW AREA: SIMPLIFIED ROLES PERMISSIONS MATRIX */}
      {/* ========================================================================= */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          {/* 1. HORIZONTAL ROLE CARDS CAROUSEL */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-500" />
                <span>Select Target Role ({roles.length})</span>
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAddRoleModalOpen(true)}
                  className="text-xs h-8"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Custom Role
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCloneSourceRoleId(selectedRoleId)
                    setCloneRoleModalOpen(true)
                  }}
                  className="text-xs h-8"
                >
                  <Copy className="w-3.5 h-3.5 mr-1" /> Clone Role
                </Button>
                {!selectedRole.isSystem && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteRoleModalOpen(true)}
                    className="text-xs h-8 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            </div>

            {/* Role Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {roles.map((role) => {
                const isSelected = selectedRoleId === role.id
                const rolePerms = draftPermissions[role.id] || {}
                const activeCount = Object.values(rolePerms).filter((p) => p.view).length

                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRoleId(role.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-50/90 dark:bg-[#12294A] border-blue-500 shadow-md ring-2 ring-blue-500/20'
                        : 'bg-white dark:bg-[#0D1E36] border-slate-200 dark:border-[#1E3A5F] hover:border-blue-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="p-1.5 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
                        <Shield className="w-4 h-4" />
                      </span>
                      {role.isSystem ? (
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">System</span>
                      ) : (
                        <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 px-1.5 py-0.2 rounded-full">Custom</span>
                      )}
                    </div>

                    <div>
                      <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                        {role.name}
                      </h4>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          {activeCount} active
                        </span>
                        <span className="text-[11px] text-slate-400">· {role.userCount} users</span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. FILTER & TOOLBAR HEADER */}
          <Card variant="default" className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] rounded-2xl shadow-sm">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Search & Category */}
              <div className="flex items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder={`Search menus in ${selectedRole.name}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9 text-xs"
                  />
                </div>

                <select
                  value={selectedModuleFilter}
                  onChange={(e) => setSelectedModuleFilter(e.target.value)}
                  className="h-9 px-3 text-xs rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#12294A] text-slate-800 dark:text-slate-200 outline-none"
                >
                  <option value="all">All Modules</option>
                  {MODULE_ORDER.map((mod: string) => (
                    <option key={mod} value={mod}>
                      {mod}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filters & Mode Switcher */}
              <div className="flex items-center gap-2 flex-wrap self-end md:self-auto">
                <div className="flex items-center rounded-xl bg-slate-100 dark:bg-[#12294A] p-0.5 border border-slate-200 dark:border-slate-800">
                  {(['all', 'enabled', 'disabled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg capitalize transition-colors ${
                        filterStatus === st
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      {st === 'all' ? 'All' : st === 'enabled' ? 'Active in Sidebar' : 'Hidden'}
                    </button>
                  ))}
                </div>

                <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

                {/* Simple / Detailed View Mode Toggle */}
                <div className="flex items-center rounded-xl bg-slate-100 dark:bg-[#12294A] p-0.5 border border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setMatrixViewMode('simple')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                      matrixViewMode === 'simple'
                        ? 'bg-white dark:bg-[#0D1E36] text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Simple (Show/Hide)</span>
                  </button>
                  <button
                    onClick={() => setMatrixViewMode('detailed')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                      matrixViewMode === 'detailed'
                        ? 'bg-white dark:bg-[#0D1E36] text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Detailed CRUD</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* 3. GROUPED MODULE CARDS */}
          <div className="space-y-4">
            {MODULE_ORDER.map((moduleName: string) => {
              const groupMenus = filteredMenusByModule[moduleName] || []
              if (groupMenus.length === 0) return null

              const isCollapsed = Boolean(collapsedModules[moduleName])
              const activeMenusInGroup = groupMenus.filter(
                (m) => currentRoleDraftPerms[m.id]?.view || m.isCore
              )
              const allInGroupEnabled = groupMenus.every(
                (m) => currentRoleDraftPerms[m.id]?.view || m.isCore
              )

              return (
                <Card
                  key={moduleName}
                  variant="default"
                  className="bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] rounded-2xl shadow-sm overflow-hidden p-0"
                >
                  {/* Category Header Bar */}
                  <div className="px-5 py-3.5 bg-slate-50/80 dark:bg-[#12294A]/60 border-b border-slate-200 dark:border-[#1E3A5F] flex items-center justify-between">
                    <div
                      className="flex items-center gap-3 cursor-pointer select-none"
                      onClick={() => toggleCollapseModule(moduleName)}
                    >
                      <span className="p-1 rounded-lg bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </span>
                      <div>
                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                          {moduleName}
                        </h3>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {activeMenusInGroup.length} of {groupMenus.length} menus enabled
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleGroup(selectedRoleId, groupMenus)}
                        className="text-xs h-7 text-blue-600 dark:text-blue-400 font-bold"
                      >
                        {allInGroupEnabled ? 'Hide All' : 'Show All in Sidebar'}
                      </Button>
                    </div>
                  </div>

                  {/* Menu Rows List */}
                  {!isCollapsed && (
                    <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {groupMenus.map((menu) => {
                        const perm = currentRoleDraftPerms[menu.id] || {
                          view: false,
                          create: false,
                          edit: false,
                          delete: false,
                          approve: false,
                          export: false,
                          scope: 'own',
                          minRank: menu.minRank || 1,
                        }
                        const lockInfo = isLockedItem(selectedRoleId, menu)
                        const isViewOn = menu.isCore || perm.view
                        const isMenuExpanded = Boolean(expandedMenuIds[menu.id])

                        return (
                          <div
                            key={menu.id}
                            className={`p-4 transition-colors ${
                              !isViewOn
                                ? 'bg-slate-50/30 dark:bg-slate-900/20 opacity-70'
                                : 'hover:bg-slate-50/70 dark:hover:bg-[#12294A]/30'
                            }`}
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              {/* Left: Icon, Title, Route */}
                              <div className="flex items-center gap-3.5 min-w-[260px]">
                                <div className={`p-2.5 rounded-xl shrink-0 ${
                                  isViewOn
                                    ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                }`}>
                                  <MenuIcon name={menu.icon} className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                                      {menu.label}
                                    </span>
                                    {menu.isCore && (
                                      <Badge variant="gold" size="sm" className="text-[9px] px-1.5 py-0 font-bold">
                                        Core
                                      </Badge>
                                    )}
                                    {menu.isLeaderOnly && (
                                      <Badge variant="amber" size="sm" className="text-[9px] px-1.5 py-0 font-bold">
                                        Rank 4+ Leader
                                      </Badge>
                                    )}
                                    {lockInfo.locked && (
                                      <span title={lockInfo.reason} className="cursor-help text-amber-500">
                                        <Lock className="w-3.5 h-3.5 inline" />
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[11px] font-mono text-slate-400 truncate">
                                      {menu.route}
                                    </span>
                                    {menu.description && (
                                      <span className="text-[11px] text-slate-400 truncate hidden lg:inline">
                                        · {menu.description}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Right: Master Toggle & Action Pills */}
                              <div className="flex items-center gap-4 self-end md:self-auto flex-wrap">
                                {/* Sidebar Visibility Switch */}
                                <div className="flex items-center gap-2.5 bg-slate-100/70 dark:bg-[#12294A]/70 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-[#1E3A5F]">
                                  <span className={`text-xs font-bold ${
                                    isViewOn ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
                                  }`}>
                                    {isViewOn ? 'Visible in Sidebar' : 'Hidden'}
                                  </span>
                                  {lockInfo.locked ? (
                                    <div title={lockInfo.reason} className="cursor-not-allowed">
                                      <Switch checked={true} onChange={() => {}} disabled={true} />
                                    </div>
                                  ) : (
                                    <Switch
                                      checked={Boolean(perm.view)}
                                      onChange={() => handleToggleMenuShow(selectedRoleId, menu.id)}
                                    />
                                  )}
                                </div>

                                {/* Preset Quick Actions */}
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleSetPreset(selectedRoleId, menu.id, 'full')}
                                    className="px-2 py-1 text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 text-slate-600 dark:text-slate-400 transition-colors"
                                    title="Grant full CRUD and All scope"
                                  >
                                    Full Access
                                  </button>
                                  <button
                                    onClick={() => handleSetPreset(selectedRoleId, menu.id, 'readonly')}
                                    className="px-2 py-1 text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-[#12294A] text-slate-600 dark:text-slate-400 transition-colors"
                                    title="Set View Only"
                                  >
                                    View Only
                                  </button>
                                </div>

                                {/* Customize Button (in simple mode) */}
                                {matrixViewMode === 'simple' && (
                                  <button
                                    onClick={() => toggleExpandMenu(menu.id)}
                                    className="px-2 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                  >
                                    <span>{isMenuExpanded ? 'Hide Details' : 'Configure CRUD'}</span>
                                    {isMenuExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Granular Actions Drawer (When in Detailed Mode or when expanded) */}
                            {(matrixViewMode === 'detailed' || isMenuExpanded) && (
                              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50 dark:bg-[#12294A]/30 p-3 rounded-xl">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                                    Actions:
                                  </span>

                                  {/* Create */}
                                  <button
                                    disabled={!isViewOn}
                                    onClick={() => handleToggleAction(selectedRoleId, menu.id, 'create')}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                      perm.create
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : 'bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900'
                                    }`}
                                  >
                                    + Create
                                  </button>

                                  {/* Edit */}
                                  <button
                                    disabled={!isViewOn}
                                    onClick={() => handleToggleAction(selectedRoleId, menu.id, 'edit')}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                      perm.edit
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : 'bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900'
                                    }`}
                                  >
                                    ✎ Edit
                                  </button>

                                  {/* Delete */}
                                  <button
                                    disabled={!isViewOn}
                                    onClick={() => handleToggleAction(selectedRoleId, menu.id, 'delete')}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                      perm.delete
                                        ? 'bg-rose-600 text-white shadow-xs'
                                        : 'bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-600'
                                    }`}
                                  >
                                    🗑 Delete
                                  </button>

                                  {/* Approve */}
                                  <button
                                    disabled={!isViewOn}
                                    onClick={() => handleToggleAction(selectedRoleId, menu.id, 'approve')}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                      perm.approve
                                        ? 'bg-amber-600 text-white shadow-xs'
                                        : 'bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-amber-600'
                                    }`}
                                  >
                                    ⭐ Approve
                                  </button>

                                  {/* Export */}
                                  <button
                                    disabled={!isViewOn}
                                    onClick={() => handleToggleAction(selectedRoleId, menu.id, 'export')}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                      perm.export
                                        ? 'bg-purple-600 text-white shadow-xs'
                                        : 'bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-purple-600'
                                    }`}
                                  >
                                    ⤓ Export
                                  </button>
                                </div>

                                {/* Scope & Min Rank */}
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[11px] font-bold text-slate-400">Scope:</span>
                                    <select
                                      value={perm.scope || 'own'}
                                      disabled={!isViewOn}
                                      onChange={(e) =>
                                        handleScopeChange(selectedRoleId, menu.id, e.target.value as ScopeType)
                                      }
                                      className="h-7 px-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0D1E36] text-slate-800 dark:text-slate-200 outline-none"
                                    >
                                      <option value="all">All (Global)</option>
                                      <option value="team">Team (Downline)</option>
                                      <option value="own">Own (Self Only)</option>
                                      <option value="none">None (Deny All)</option>
                                    </select>
                                  </div>

                                  {selectedRoleId === 'bizpro' && (
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[11px] font-bold text-slate-400">Min Rank:</span>
                                      <select
                                        value={perm.minRank || menu.minRank || 1}
                                        disabled={!isViewOn}
                                        onChange={(e) =>
                                          handleMinRankChange(selectedRoleId, menu.id, Number(e.target.value))
                                        }
                                        className="h-7 px-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0D1E36] text-slate-800 dark:text-slate-200 outline-none"
                                      >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((rank) => (
                                          <option key={rank} value={rank}>
                                            Rank {rank} {rank >= 4 ? '(Leader)' : ''}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </Card>
              )
            })}
          </div>

          {/* 4. FLOATING SAVE BAR WHEN CHANGES ARE PENDING */}
          {pendingDiffs.length > 0 && (
            <div className="fixed bottom-6 inset-x-0 max-w-xl mx-auto z-50 animate-slideUp px-4">
              <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <div>
                    <span className="text-xs font-extrabold block">
                      {pendingDiffs.length} Unsaved Permissions Changes
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Changes will take effect instantly across all portals.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDiscardChanges}
                    className="text-xs h-8 text-slate-300 hover:text-white border-slate-700 hover:bg-slate-800"
                  >
                    Discard
                  </Button>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => setSaveConfirmModalOpen(true)}
                    className="text-xs h-8 font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                  >
                    <Save className="w-3.5 h-3.5 mr-1.5" /> Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECOND TAB: COMPARE ROLES MATRIX VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'compare' && (
        <Card variant="default" className="bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] rounded-2xl shadow-sm overflow-hidden p-0">
          <div className="p-4 bg-slate-50/80 dark:bg-[#12294A]/60 border-b border-slate-200 dark:border-[#1E3A5F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Cross-Role Comparison & Batch Matrix
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Compare menu visibility across all roles at a glance and flip access toggles directly.
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-slate-400">Columns: {roles.length} Roles</span>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[650px] custom-scrollbar">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="sticky top-0 z-20 bg-slate-100 dark:bg-[#12294A] border-b border-slate-200 dark:border-[#1E3A5F]">
                <tr>
                  <th className="py-3 px-4 min-w-[240px] font-extrabold uppercase text-[10px] text-slate-500 tracking-wider">
                    Menu & Module
                  </th>
                  {roles.map((r) => (
                    <th key={r.id} className="py-3 px-3 text-center min-w-[120px] font-extrabold text-[11px] text-slate-800 dark:text-slate-200">
                      <div>{r.name}</div>
                      <span className="text-[9px] font-normal text-slate-400">
                        {r.isSystem ? 'System' : 'Custom'}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {MENU_CATALOG.map((menu) => (
                  <tr key={menu.id} className="hover:bg-slate-50/60 dark:hover:bg-[#12294A]/20 transition-colors">
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <MenuIcon name={menu.icon} className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block truncate">
                            {menu.label}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {menu.module}
                          </span>
                        </div>
                      </div>
                    </td>

                    {roles.map((role) => {
                      const rolePerms = draftPermissions[role.id] || {}
                      const perm = rolePerms[menu.id]
                      const isViewOn = menu.isCore || perm?.view
                      const lockInfo = isLockedItem(role.id, menu)

                      return (
                        <td key={role.id} className="py-2.5 px-3 text-center">
                          {lockInfo.locked ? (
                            <div title={lockInfo.reason} className="inline-flex items-center justify-center cursor-not-allowed">
                              <Lock className="w-3.5 h-3.5 text-amber-500" />
                            </div>
                          ) : (
                            <button
                              onClick={() => handleToggleMenuShow(role.id, menu.id)}
                              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                                isViewOn
                                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600'
                              }`}
                              title={`Toggle ${menu.label} for ${role.name}`}
                            >
                              {isViewOn ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                            </button>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* THIRD TAB: PREVIEW & IMPERSONATE TAB */}
      {/* ========================================================================= */}
      {activeTab === 'preview' && (
        <div className="space-y-6">
          <Card variant="default" className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Preview Experience for:
                </h3>
                <select
                  value={selectedRoleId}
                  onChange={(e) => setSelectedRoleId(e.target.value)}
                  className="px-3 py-1.5 text-xs font-extrabold rounded-xl border border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 outline-none"
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.userCount} users)
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Visualizing exactly what this role sees across desktop and mobile viewport configurations.
              </p>
            </div>

            <Button
              variant="accent"
              size="sm"
              onClick={handleOpenPortalAsRole}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md shadow-orange-500/20"
            >
              <Eye className="w-4 h-4 mr-1.5" /> Open Portal as {selectedRole.name} (Impersonate)
            </Button>
          </Card>

          {/* Device Mockups */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Desktop Sidebar Simulator */}
            <div className="md:col-span-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Monitor className="w-4 h-4 text-blue-500" />
                <span>Simulated Desktop Sidebar ({previewRoleMenus.length} items visible)</span>
              </div>

              <div className="w-72 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] rounded-2xl shadow-xl overflow-hidden p-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                <div className="p-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-extrabold">
                  <span>{selectedRole.name} View</span>
                  <Badge variant="emerald" size="sm">Active</Badge>
                </div>
                <div className="mt-2 space-y-1">
                  {previewRoleMenus.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-[#12294A] text-slate-800 dark:text-slate-200"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <MenuIcon name={m.icon} className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{m.label}</span>
                      </div>
                      {m.badge && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                          {m.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Viewport Simulator */}
            <div className="md:col-span-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Smartphone className="w-4 h-4 text-purple-500" />
                <span>Simulated Mobile View (Bottom Bar & Drawer)</span>
              </div>

              <div className="max-w-[320px] bg-slate-900 rounded-3xl p-3 border-4 border-slate-800 shadow-2xl text-white space-y-3">
                <div className="text-[10px] text-center text-slate-400 font-mono">
                  360px Mobile Emulation
                </div>

                <div className="p-3 rounded-2xl bg-[#0D1E36] border border-[#1E3A5F] space-y-2">
                  <span className="text-[10px] font-bold text-slate-400">Mobile Navigation Drawer:</span>
                  <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar text-xs">
                    {previewRoleMenus.slice(0, 6).map((m) => (
                      <div key={m.id} className="flex items-center gap-2 p-1.5 rounded-lg bg-[#12294A]">
                        <MenuIcon name={m.icon} className="w-3.5 h-3.5 text-blue-400" />
                        <span className="truncate">{m.label}</span>
                      </div>
                    ))}
                    {previewRoleMenus.length > 6 && (
                      <span className="text-[10px] text-slate-400 text-center block">
                        + {previewRoleMenus.length - 6} additional items
                      </span>
                    )}
                  </div>
                </div>

                {/* Simulated Bottom Navigation */}
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Bottom Bar (Top 4 shortcuts):
                  </span>
                  <div className="flex items-center justify-around py-2 rounded-xl bg-[#0D1E36] border border-[#1E3A5F]">
                    {previewRoleMenus.slice(0, 4).map((m) => (
                      <div key={m.id} className="flex flex-col items-center gap-1 text-[8px] text-slate-300">
                        <MenuIcon name={m.icon} className="w-3.5 h-3.5 text-blue-400" />
                        <span className="truncate max-w-[50px]">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FOURTH TAB: AUDIT LOG TAB */}
      {/* ========================================================================= */}
      {activeTab === 'audit' && (
        <Card variant="default" className="bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] rounded-2xl shadow-sm p-4 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                RBAC Security Audit Trail
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Immutable chronological log of all role alterations, matrix mutations, and impersonation events.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportAuditCsv}
              className="text-xs self-end sm:self-auto"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> Export Audit Log (CSV)
            </Button>
          </div>

          {/* Audit Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search audit events by actor, summary or menu..."
                value={auditSearchQuery}
                onChange={(e) => setAuditSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs"
              />
            </div>

            <select
              value={auditRoleFilter}
              onChange={(e) => setAuditRoleFilter(e.target.value)}
              className="h-9 px-3 text-xs rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#12294A] text-slate-800 dark:text-slate-200 outline-none w-full sm:w-auto"
            >
              <option value="all">All Roles</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Audit Log Table */}
          <div className="overflow-x-auto max-h-[500px] custom-scrollbar">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-[#1E3A5F] text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Actor</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Action Type</th>
                  <th className="py-2.5 px-3">Summary Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredAuditLog.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      No audit events match current query.
                    </td>
                  </tr>
                ) : (
                  filteredAuditLog.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-[#12294A]/20">
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                        {log.timestamp.replace('T', ' ').slice(0, 19)}
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                        {log.actor}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <Badge variant="navy" size="sm" className="text-[10px]">
                          {log.roleId}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                        {log.summary}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* BOTTOM STICKY SAVE / DISCARD BAR */}
      {/* ========================================================================= */}
      {pendingDiffs.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-8 z-50 animate-scaleUp">
          <div className="bg-slate-900 text-white rounded-2xl shadow-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-700 min-w-[340px] sm:min-w-[480px]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold shrink-0 animate-bounce">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black tracking-tight">
                  {pendingDiffs.length} Unsaved RBAC Modifications
                </h4>
                <p className="text-[11px] text-slate-400">
                  Changes will not take effect until explicitly saved.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDiscardChanges}
                className="text-xs border-slate-700 text-slate-300 hover:text-white"
              >
                Discard
              </Button>
              <Button
                variant="accent"
                size="sm"
                pill
                onClick={() => setSaveConfirmModalOpen(true)}
                className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/30"
              >
                <Save className="w-3.5 h-3.5 mr-1.5" /> Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CONFIRM SAVE CHANGES (DIFF SUMMARY) */}
      {/* ========================================================================= */}
      <Modal
        isOpen={saveConfirmModalOpen}
        onClose={() => setSaveConfirmModalOpen(false)}
        title="Review & Confirm Permission Changes"
        description="Verify summary of pending changes before writing to runtime security matrix."
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-500 shrink-0" />
            <span>
              Saving will write an audit log entry and synchronize access live across all active user sessions and tabs.
            </span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar p-1">
            {pendingDiffs.map((diff, index) => (
              <div
                key={index}
                className="p-3 rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-slate-50/50 dark:bg-[#12294A]/30 text-xs flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="navy" size="sm">
                      {diff.roleName}
                    </Badge>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {diff.menuLabel}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">
                    Field: {diff.field}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold">
                    {String(diff.oldValue)}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                    {String(diff.newValue)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSaveConfirmModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={handleConfirmSave}
              isLoading={isSaving}
              className="font-bold bg-blue-600 hover:bg-blue-700 text-white"
            >
              Confirm & Apply Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL: ADD CUSTOM ROLE */}
      {/* ========================================================================= */}
      <Modal
        isOpen={addRoleModalOpen}
        onClose={() => setAddRoleModalOpen(false)}
        title="Create New Custom Role"
        description="Define a new organizational role and configure its specific permissions."
        maxWidth="md"
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Role Name
            </label>
            <Input
              placeholder="e.g. Sales Manager, Compliance Auditor, Support Agent..."
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              autoFocus
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Description
            </label>
            <Input
              placeholder="Brief operational purpose for this role..."
              value={newRoleDesc}
              onChange={(e) => setNewRoleDesc(e.target.value)}
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setAddRoleModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={handleCreateRole}
              isLoading={isSaving}
              className="font-bold bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Role
            </Button>
          </div>
        </div>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL: CLONE ROLE */}
      {/* ========================================================================= */}
      <Modal
        isOpen={cloneRoleModalOpen}
        onClose={() => setCloneRoleModalOpen(false)}
        title="Clone Role Permissions"
        description="Create a new role starting with the full permissions of an existing role."
        maxWidth="md"
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Source Role to Clone From
            </label>
            <select
              value={cloneSourceRoleId}
              onChange={(e) => setCloneSourceRoleId(e.target.value)}
              className="w-full h-10 px-3 text-xs font-semibold rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#12294A] text-slate-900 dark:text-white outline-none"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.isSystem ? 'System' : 'Custom'})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              New Role Name
            </label>
            <Input
              placeholder="e.g. Senior Regional B4B Coach..."
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Description
            </label>
            <Input
              placeholder="Description for cloned role..."
              value={newRoleDesc}
              onChange={(e) => setNewRoleDesc(e.target.value)}
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setCloneRoleModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={handleCloneRole}
              isLoading={isSaving}
              className="font-bold bg-blue-600 hover:bg-blue-700 text-white"
            >
              Clone & Create Role
            </Button>
          </div>
        </div>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL: DELETE ROLE CONFIRM */}
      {/* ========================================================================= */}
      <Modal
        isOpen={deleteRoleModalOpen}
        onClose={() => setDeleteRoleModalOpen(false)}
        title={`Delete Role: ${selectedRole.name}`}
        description="Verify role deletion safety requirements."
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Are you sure you want to delete the custom role{' '}
            <strong className="text-slate-900 dark:text-white font-bold">{selectedRole.name}</strong>?
            This will permanently erase its permissions matrix.
          </p>

          <div className="pt-2 flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setDeleteRoleModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDeleteRole}
              isLoading={isSaving}
              className="font-bold bg-rose-600 hover:bg-rose-700 text-white"
            >
              Delete Role
            </Button>
          </div>
        </div>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL: RESET ROLE CONFIRM */}
      {/* ========================================================================= */}
      <Modal
        isOpen={resetRoleConfirmModalOpen}
        onClose={() => setResetRoleConfirmModalOpen(false)}
        title={`Reset Role: ${selectedRole.name}`}
        description="Restore this role to system baseline defaults."
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            All customized permissions for role <strong>{selectedRole.name}</strong> will be
            reverted to their default configuration.
          </p>

          <div className="pt-2 flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setResetRoleConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={handleResetRole}
              isLoading={isSaving}
              className="font-bold bg-blue-600 hover:bg-blue-700 text-white"
            >
              Confirm Reset
            </Button>
          </div>
        </div>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL: RESET ALL ROLES CONFIRM */}
      {/* ========================================================================= */}
      <Modal
        isOpen={resetAllConfirmModalOpen}
        onClose={() => setResetAllConfirmModalOpen(false)}
        title="Reset All Roles to System Baseline"
        description="Restore all roles across the entire platform."
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-300">
            <strong>Warning:</strong> This will restore default permissions across all 6 system
            roles and remove any custom user overrides.
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setResetAllConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleResetAll}
              isLoading={isSaving}
              className="font-bold bg-rose-600 hover:bg-rose-700 text-white"
            >
              Reset Entire Baseline
            </Button>
          </div>
        </div>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL: IMPORT JSON MATRIX */}
      {/* ========================================================================= */}
      <Modal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        title="Import RBAC Permissions Matrix"
        description="Upload or paste an exported JSON permissions matrix to replace runtime configuration."
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              JSON Configuration Payload
            </label>
            <textarea
              rows={10}
              placeholder="Paste RBAC JSON export object here..."
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              className="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-slate-50 dark:bg-[#12294A] text-slate-900 dark:text-white outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setImportModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={handleImportJson}
              isLoading={isSaving}
              className="font-bold bg-blue-600 hover:bg-blue-700 text-white"
            >
              Validate & Import Matrix
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
