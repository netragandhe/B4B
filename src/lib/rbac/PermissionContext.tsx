import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'
import {
  RoleId,
  Menu,
  PermissionAction,
  ScopeType,
  PermissionItem,
  SystemPermissionMatrix,
  Role,
  AuditLogEntry,
} from './types'
import { MENU_CATALOG, MENU_MAP } from '@/config/menuCatalog'
import { permissionService, normalizeRoleId } from './permissionService'
import { Shield, Eye, X, AlertTriangle } from 'lucide-react'

export interface PermissionContextType {
  roles: Role[]
  permissions: SystemPermissionMatrix
  auditLog: AuditLogEntry[]
  isLoading: boolean
  activeRoleId: RoleId
  impersonatedRole: RoleId | null
  impersonateRole: (roleId: RoleId) => Promise<void>
  exitImpersonation: () => void
  can: (menuId: string, action?: PermissionAction) => boolean
  scopeOf: (menuId: string) => ScopeType
  canSeeMenu: (menuId: string) => boolean
  getMenusForRole: (targetRoleId?: RoleId) => Menu[]
  refreshPermissions: (silently?: boolean) => Promise<void>
  userOverrides: Record<string, Partial<PermissionItem>>
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined)

const IMPERSONATION_STORAGE_KEY = 'b4b_rbac_impersonated_role'

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const { toast } = useToast()

  const [roles, setRoles] = useState<Role[]>([])
  const [permissions, setPermissions] = useState<SystemPermissionMatrix>({})
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([])
  const [userOverrides, setUserOverrides] = useState<Record<string, Partial<PermissionItem>>>({})
  const [isLoading, setIsLoading] = useState(true)

  // Impersonation state
  const [impersonatedRole, setImpersonatedRole] = useState<RoleId | null>(() => {
    try {
      return localStorage.getItem(IMPERSONATION_STORAGE_KEY) || null
    } catch {
      return null
    }
  })

  // Normalize user's actual role
  const actualRoleId = useMemo<RoleId>(() => {
    return normalizeRoleId(user?.role)
  }, [user?.role])

  // Active role is impersonated role if set, else actual user role
  const activeRoleId = useMemo<RoleId>(() => {
    return impersonatedRole || actualRoleId
  }, [impersonatedRole, actualRoleId])

  // Effective rank for Biz Pro
  const userRank = useMemo<number>(() => {
    return user?.rank || user?.rankLevel || 1
  }, [user?.rank, user?.rankLevel])

  // Load permissions and roles
  const loadData = useCallback(async (silently: boolean = false) => {
    try {
      if (!silently) setIsLoading(true)
      const [fetchedRoles, fetchedPerms, fetchedLogs] = await Promise.all([
        permissionService.getRoles(),
        permissionService.getPermissions(),
        permissionService.getAuditLog(),
      ])
      setRoles(fetchedRoles)
      setPermissions(fetchedPerms)
      setAuditLog(fetchedLogs)

      if (user?.id) {
        const overrides = await permissionService.getUserOverrides(user.id)
        setUserOverrides(overrides)
      } else {
        setUserOverrides({})
      }
    } catch (err) {
      console.error('Failed to load RBAC permissions data', err)
    } finally {
      if (!silently) setIsLoading(false)
    }
  }, [user?.id])

  // Initial load
  useEffect(() => {
    loadData(false)
  }, [loadData])

  // Multi-tab synchronization & live update events
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === 'b4b_rbac_permissions_v2' ||
        e.key === 'b4b_rbac_roles_v2' ||
        e.key === 'b4b_rbac_user_overrides_v2'
      ) {
        loadData(true)
        toast({
          title: 'Permissions Synchronized',
          description: 'Your access was updated.',
          type: 'info',
        })
      }
    }

    const handleCustomUpdate = () => {
      loadData(true)
      toast({
        title: 'Access Refreshed',
        description: 'Your access was updated.',
        type: 'info',
      })
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('rbac_permissions_updated', handleCustomUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('rbac_permissions_updated', handleCustomUpdate)
    }
  }, [loadData, toast])

  // Impersonation handlers
  const impersonateRole = async (targetRoleId: RoleId) => {
    setImpersonatedRole(targetRoleId)
    localStorage.setItem(IMPERSONATION_STORAGE_KEY, targetRoleId)
    toast({
      title: `Impersonating Role: ${targetRoleId.toUpperCase()}`,
      description: 'You are now viewing the portal with this role’s active permissions.',
      type: 'info',
    })
  }

  const exitImpersonation = () => {
    setImpersonatedRole(null)
    localStorage.removeItem(IMPERSONATION_STORAGE_KEY)
    toast({
      title: 'Exited Impersonation',
      description: 'Restored your normal administrative session.',
      type: 'success',
    })
  }

  /**
   * Evaluates if active role has permission on a given menu item and action.
   * Enforces:
   * 1. Admin lockout protection (admin never loses admin-roles-permissions, admin-overview, shared-settings)
   * 2. Core menu guarantee (core items always have view: true)
   * 3. Action dependency (create/edit/delete/approve/export require view === true)
   * 4. Scope rule (if scope === 'none', action is denied)
   * 5. MinRank rule (Biz Pro leader items require user rank >= menu.minRank)
   * 6. User-level overrides (if any exist for user on this menu)
   */
  const can = useCallback(
    (menuId: string, action: PermissionAction = 'view'): boolean => {
      const menu = MENU_MAP[menuId]
      const currentRole = activeRoleId

      // 1. Admin lockout safety check
      if (currentRole === 'admin') {
        if (
          menuId === 'admin-roles-permissions' ||
          menuId === 'admin-overview' ||
          menuId === 'shared-settings'
        ) {
          if (action === 'view' || action === 'edit' || action === 'create') {
            return true
          }
        }
      }

      // Check minRank requirement for Biz Pro
      if (currentRole === 'bizpro') {
        const requiredRank = menu?.minRank || (menu?.isLeaderOnly ? 4 : 1)
        if (requiredRank > 1 && userRank < requiredRank) {
          return false
        }
      }

      // Base role permissions
      const rolePerms = permissions[currentRole]
      const basePermItem = rolePerms ? rolePerms[menuId] : undefined

      // User override (if user matches and is not currently impersonating another role)
      const override = !impersonatedRole && user?.id ? userOverrides[menuId] : undefined

      // Merged effective permission item
      const viewAllowed = override?.view !== undefined
        ? override.view
        : basePermItem?.view ?? (menu?.isCore ? true : false)

      // Core menu view fallback
      const effectiveView = menu?.isCore ? true : viewAllowed

      // If checking view action
      if (action === 'view') {
        return effectiveView
      }

      // All other actions require view to be true!
      if (!effectiveView) {
        return false
      }

      // Check scope: scope 'none' means all actions are disallowed
      const effectiveScope = override?.scope || basePermItem?.scope || 'own'
      if (effectiveScope === 'none') {
        return false
      }

      // Specific action check
      const actionAllowed = override?.[action] !== undefined
        ? override[action]
        : basePermItem?.[action] ?? false

      return Boolean(actionAllowed)
    },
    [activeRoleId, permissions, userOverrides, impersonatedRole, user?.id, userRank]
  )

  const scopeOf = useCallback(
    (menuId: string): ScopeType => {
      const override = !impersonatedRole && user?.id ? userOverrides[menuId] : undefined
      if (override?.scope) return override.scope

      const rolePerms = permissions[activeRoleId]
      const baseItem = rolePerms ? rolePerms[menuId] : undefined
      return baseItem?.scope || 'own'
    },
    [activeRoleId, permissions, userOverrides, impersonatedRole, user?.id]
  )

  const canSeeMenu = useCallback(
    (menuId: string): boolean => {
      return can(menuId, 'view')
    },
    [can]
  )

  const getMenusForRole = useCallback(
    (targetRoleId?: RoleId): Menu[] => {
      const roleToInspect = targetRoleId || activeRoleId
      const rolePerms = permissions[roleToInspect] || {}

      return MENU_CATALOG.filter((menu) => {
        // Core items always visible
        if (menu.isCore) return true

        // Rank constraint
        if (roleToInspect === 'bizpro') {
          const reqRank = menu.minRank || (menu.isLeaderOnly ? 4 : 1)
          if (reqRank > 1 && userRank < reqRank) {
            return false
          }
        }

        // Admin lockout protection
        if (roleToInspect === 'admin') {
          if (
            menu.id === 'admin-roles-permissions' ||
            menu.id === 'admin-overview' ||
            menu.id === 'shared-settings'
          ) {
            return true
          }
        }

        const perm = rolePerms[menu.id]
        return perm ? perm.view === true : false
      }).sort((a, b) => a.order - b.order)
    },
    [activeRoleId, permissions, userRank]
  )

  const contextValue = useMemo<PermissionContextType>(
    () => ({
      roles,
      permissions,
      auditLog,
      isLoading,
      activeRoleId,
      impersonatedRole,
      impersonateRole,
      exitImpersonation,
      can,
      scopeOf,
      canSeeMenu,
      getMenusForRole,
      refreshPermissions: loadData,
      userOverrides,
    }),
    [
      roles,
      permissions,
      auditLog,
      isLoading,
      activeRoleId,
      impersonatedRole,
      can,
      scopeOf,
      canSeeMenu,
      getMenusForRole,
      loadData,
      userOverrides,
    ]
  )

  const targetRoleObj = roles.find((r) => r.id === impersonatedRole)

  return (
    <PermissionContext.Provider value={contextValue}>
      {/* Impersonation Floating Sticky Banner */}
      {impersonatedRole && (
        <div className="sticky top-0 z-50 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white px-4 py-2.5 shadow-lg flex items-center justify-between text-xs sm:text-sm font-semibold transition-all animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <span className="p-1 rounded-md bg-white/20 text-white animate-pulse">
              <Eye className="w-4 h-4" />
            </span>
            <span>
              Impersonation Active: Viewing portal as{' '}
              <strong className="underline underline-offset-2 font-bold uppercase tracking-wider">
                {targetRoleObj?.name || impersonatedRole}
              </strong>
            </span>
            <span className="hidden md:inline-block text-xs bg-black/20 px-2 py-0.5 rounded-full">
              Read-Only Security View
            </span>
          </div>

          <button
            onClick={exitImpersonation}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white text-slate-900 font-bold hover:bg-amber-100 transition-colors shadow-sm text-xs cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Exit Impersonation</span>
          </button>
        </div>
      )}

      {children}
    </PermissionContext.Provider>
  )
}

export function usePermission() {
  const context = useContext(PermissionContext)
  if (!context) {
    throw new Error('usePermission must be used within a PermissionProvider')
  }
  return context
}
