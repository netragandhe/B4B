import {
  Role,
  RoleId,
  Menu,
  PermissionItem,
  SystemPermissionMatrix,
  RolePermissionMatrix,
  AuditLogEntry,
  UserMenuOverride,
} from './types'
import { MENU_CATALOG, MENU_MAP } from '@/config/menuCatalog'
import {
  DEFAULT_ROLES,
  DEFAULT_PERMISSIONS,
  createEmptyPermission,
  createBlankRolePermissions,
} from '@/config/defaultPermissions'

const STORAGE_KEYS = {
  PERMISSIONS: 'b4b_rbac_permissions_v3',
  ROLES: 'b4b_rbac_roles_v3',
  AUDIT_LOG: 'b4b_rbac_audit_log_v3',
  USER_OVERRIDES: 'b4b_rbac_user_overrides_v3',
}

// Simulated mock delay
const delay = (ms: number = 80) => new Promise((resolve) => setTimeout(resolve, ms))

function getStoredRoles(): Role[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ROLES)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch (e) {
    console.error('Failed to parse stored roles', e)
  }
  localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(DEFAULT_ROLES))
  return JSON.parse(JSON.stringify(DEFAULT_ROLES))
}

function getStoredPermissions(): SystemPermissionMatrix {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PERMISSIONS)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object') {
        // Ensure all catalog menus exist in stored permissions
        let mutated = false
        Object.keys(parsed).forEach((roleId) => {
          MENU_CATALOG.forEach((menu) => {
            if (!parsed[roleId][menu.id]) {
              parsed[roleId][menu.id] = DEFAULT_PERMISSIONS[roleId]?.[menu.id] ? JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS[roleId][menu.id])) : createEmptyPermission()
              mutated = true
            }
          })
        })
        if (mutated) {
          localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(parsed))
        }
        return parsed
      }
    }
  } catch (e) {
    console.error('Failed to parse stored permissions', e)
  }
  localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(DEFAULT_PERMISSIONS))
  return JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS))
}

function getStoredAuditLog(): AuditLogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUDIT_LOG)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }
  } catch (e) {
    console.error('Failed to parse stored audit log', e)
  }
  const initialLog: AuditLogEntry[] = [
    {
      id: 'audit-init-01',
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      actor: 'System Initialization',
      roleId: 'admin',
      action: 'RESET_ALL',
      summary: 'Initialized baseline RBAC security permission matrix for 6 system roles across 68 menus.',
    },
  ]
  localStorage.setItem(STORAGE_KEYS.AUDIT_LOG, JSON.stringify(initialLog))
  return initialLog
}

function getStoredUserOverrides(): Record<string, Record<string, Partial<PermissionItem>>> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_OVERRIDES)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object') return parsed
    }
  } catch (e) {
    console.error('Failed to parse stored user overrides', e)
  }
  return {}
}

function notifySubscribers() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('rbac_permissions_updated', { detail: { timestamp: Date.now() } }))
  }
}

function addAuditLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) {
  const currentLog = getStoredAuditLog()
  const newEntry: AuditLogEntry = {
    ...entry,
    id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
  }
  const updated = [newEntry, ...currentLog].slice(0, 500) // Keep latest 500 logs
  localStorage.setItem(STORAGE_KEYS.AUDIT_LOG, JSON.stringify(updated))
}

// Safety Rule Checker: enforce Admin and Core menu constraints
function enforceSafetyRules(
  roleId: RoleId,
  menuId: string,
  item: PermissionItem,
  patch?: Partial<PermissionItem>
): PermissionItem {
  const menu = MENU_MAP[menuId]
  const cleanItem = { ...item }

  // 1. Admin lockout protection: Admin role CANNOT be locked out of critical system menus
  if (roleId === 'admin') {
    if (menuId === 'admin-roles-permissions' || menuId === 'admin-overview' || menuId === 'shared-settings') {
      cleanItem.view = true
      cleanItem.create = true
      cleanItem.edit = true
      cleanItem.scope = 'all'
    }
  }

  // 2. Core menus (e.g. dashboard, profile, subscription) must always remain viewable
  if (menu && menu.isCore) {
    cleanItem.view = true
    if (cleanItem.scope === 'none') {
      cleanItem.scope = 'own'
    }
  }

  // 3. Action dependency rule:
  // If patch explicitly set view to false, or item has view === false without an action patch turning it on:
  if (patch?.view === false) {
    cleanItem.view = false
    cleanItem.create = false
    cleanItem.edit = false
    cleanItem.delete = false
    cleanItem.approve = false
    cleanItem.export = false
    cleanItem.scope = 'none'
  } else if (
    patch?.create === true ||
    patch?.edit === true ||
    patch?.delete === true ||
    patch?.approve === true ||
    patch?.export === true
  ) {
    // Turning any action on automatically turns view on
    cleanItem.view = true
    if (cleanItem.scope === 'none') {
      cleanItem.scope = 'own'
    }
  } else if (!cleanItem.view) {
    // If view is false, ensure no action is active
    cleanItem.create = false
    cleanItem.edit = false
    cleanItem.delete = false
    cleanItem.approve = false
    cleanItem.export = false
    cleanItem.scope = 'none'
  } else {
    if (cleanItem.scope === 'none') {
      cleanItem.scope = 'own'
    }
  }

  return cleanItem
}

/**
 * Permission Service
 * Single source of truth for runtime RBAC mutations and storage.
 * Designed to be easily swapped with real API endpoints in production.
 */
export const permissionService = {
  // ==========================================
  // READ METHODS
  // ==========================================

  async getRoles(): Promise<Role[]> {
    await delay(40)
    return getStoredRoles()
  },

  async getPermissions(): Promise<SystemPermissionMatrix> {
    await delay(50)
    return getStoredPermissions()
  },

  async getAuditLog(): Promise<AuditLogEntry[]> {
    await delay(40)
    return getStoredAuditLog()
  },

  async getUserOverrides(userId: string): Promise<Record<string, Partial<PermissionItem>>> {
    await delay(30)
    const all = getStoredUserOverrides()
    return all[userId] || {}
  },

  // ==========================================
  // WRITE METHODS (ADMIN ACCESS ONLY)
  // ==========================================

  async updatePermission(
    roleId: RoleId,
    menuId: string,
    patch: Partial<PermissionItem>,
    actorName: string = 'Super Admin'
  ): Promise<PermissionItem> {
    await delay(60)
    const permissions = getStoredPermissions()
    if (!permissions[roleId]) {
      throw new Error(`Role ${roleId} not found in permission matrix`)
    }

    const current = permissions[roleId][menuId] || createEmptyPermission()
    const merged = { ...current, ...patch }
    const validated = enforceSafetyRules(roleId, menuId, merged, patch)

    permissions[roleId][menuId] = validated
    localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(permissions))

    addAuditLog({
      actor: actorName,
      roleId,
      menuId,
      action: 'UPDATE_PERMISSION',
      oldValue: current,
      newValue: validated,
      summary: `Updated permissions for ${roleId} on menu "${MENU_MAP[menuId]?.label || menuId}": view=${validated.view}, scope=${validated.scope}`,
    })

    notifySubscribers()
    return validated
  },

  async bulkUpdate(
    roleId: RoleId,
    patches: Record<string, Partial<PermissionItem>>,
    actorName: string = 'Super Admin'
  ): Promise<RolePermissionMatrix> {
    await delay(90)
    const permissions = getStoredPermissions()
    if (!permissions[roleId]) {
      throw new Error(`Role ${roleId} not found in permission matrix`)
    }

    const updatedRolePerms = { ...permissions[roleId] }
    const changedMenus: string[] = []

    Object.entries(patches).forEach(([menuId, patch]) => {
      const current = updatedRolePerms[menuId] || createEmptyPermission()
      const merged = { ...current, ...patch }
      updatedRolePerms[menuId] = enforceSafetyRules(roleId, menuId, merged, patch)
      changedMenus.push(MENU_MAP[menuId]?.label || menuId)
    })

    permissions[roleId] = updatedRolePerms
    localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(permissions))

    addAuditLog({
      actor: actorName,
      roleId,
      action: 'BULK_UPDATE',
      summary: `Bulk updated permissions for role "${roleId}" across ${changedMenus.length} menu items (${changedMenus.slice(0, 3).join(', ')}${changedMenus.length > 3 ? '...' : ''}).`,
    })

    notifySubscribers()
    return updatedRolePerms
  },

  async resetRole(roleId: RoleId, actorName: string = 'Super Admin'): Promise<RolePermissionMatrix> {
    await delay(70)
    const permissions = getStoredPermissions()
    const defaultRolePerms = DEFAULT_PERMISSIONS[roleId as keyof typeof DEFAULT_PERMISSIONS] || createBlankRolePermissions()

    permissions[roleId] = JSON.parse(JSON.stringify(defaultRolePerms))
    localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(permissions))

    addAuditLog({
      actor: actorName,
      roleId,
      action: 'RESET_ROLE',
      summary: `Reset role "${roleId}" to system default permission matrix.`,
    })

    notifySubscribers()
    return permissions[roleId]
  },

  async resetAll(actorName: string = 'Super Admin'): Promise<{ roles: Role[]; permissions: SystemPermissionMatrix }> {
    await delay(120)
    const defaultRoles = JSON.parse(JSON.stringify(DEFAULT_ROLES))
    const defaultPerms = JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS))

    localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(defaultRoles))
    localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(defaultPerms))
    localStorage.removeItem(STORAGE_KEYS.USER_OVERRIDES)

    addAuditLog({
      actor: actorName,
      roleId: 'admin',
      action: 'RESET_ALL',
      summary: 'Restored entire platform RBAC to default security matrix across all roles.',
    })

    notifySubscribers()
    return { roles: defaultRoles, permissions: defaultPerms }
  },

  async createRole(
    data: { name: string; description: string; cloneFromRoleId?: string },
    actorName: string = 'Super Admin'
  ): Promise<Role> {
    await delay(80)
    const roles = getStoredRoles()
    const permissions = getStoredPermissions()

    const rawId = data.name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/^_+|_+$/g, '')
    const id: RoleId = `custom_${rawId}_${Date.now().toString().slice(-4)}`

    const newRole: Role = {
      id,
      name: data.name,
      description: data.description,
      isSystem: false,
      status: 'active',
      userCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    }

    // Set initial permissions: clone from source or blank
    if (data.cloneFromRoleId && permissions[data.cloneFromRoleId]) {
      permissions[id] = JSON.parse(JSON.stringify(permissions[data.cloneFromRoleId]))
    } else {
      permissions[id] = createBlankRolePermissions()
    }

    roles.push(newRole)
    localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(roles))
    localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(permissions))

    addAuditLog({
      actor: actorName,
      roleId: id,
      action: 'CREATE_ROLE',
      summary: `Created new custom role "${newRole.name}" (${id})${data.cloneFromRoleId ? ` cloned from "${data.cloneFromRoleId}"` : ''}.`,
    })

    notifySubscribers()
    return newRole
  },

  async cloneRole(
    sourceRoleId: RoleId,
    newRoleData: { name: string; description: string },
    actorName: string = 'Super Admin'
  ): Promise<Role> {
    return this.createRole(
      {
        name: newRoleData.name,
        description: newRoleData.description,
        cloneFromRoleId: sourceRoleId,
      },
      actorName
    )
  },

  async deleteRole(roleId: RoleId, actorName: string = 'Super Admin'): Promise<void> {
    await delay(60)
    const roles = getStoredRoles()
    const target = roles.find((r) => r.id === roleId)
    if (!target) throw new Error(`Role ${roleId} not found`)

    // Safety rules
    if (target.isSystem) {
      throw new Error(`System role "${target.name}" cannot be deleted.`)
    }
    if (target.userCount > 0) {
      throw new Error(`Cannot delete role "${target.name}" because ${target.userCount} user(s) are currently assigned to it. Please reassign them first.`)
    }

    const updatedRoles = roles.filter((r) => r.id !== roleId)
    const permissions = getStoredPermissions()
    delete permissions[roleId]

    localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(updatedRoles))
    localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(permissions))

    addAuditLog({
      actor: actorName,
      roleId,
      action: 'DELETE_ROLE',
      summary: `Deleted custom role "${target.name}" (${roleId}).`,
    })

    notifySubscribers()
  },

  async exportMatrix(): Promise<string> {
    await delay(30)
    const exportData = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      roles: getStoredRoles(),
      permissions: getStoredPermissions(),
      userOverrides: getStoredUserOverrides(),
    }
    return JSON.stringify(exportData, null, 2)
  },

  async importMatrix(jsonString: string, actorName: string = 'Super Admin'): Promise<void> {
    await delay(100)
    let parsed: any
    try {
      parsed = JSON.parse(jsonString)
    } catch {
      throw new Error('Invalid JSON format. Please upload a valid RBAC export JSON file.')
    }

    if (!parsed.roles || !parsed.permissions || typeof parsed.permissions !== 'object') {
      throw new Error('Invalid RBAC file schema. Missing required "roles" or "permissions" structure.')
    }

    // Preserve system roles and enforce safety rules on all imported roles
    const systemRoleIds = DEFAULT_ROLES.map((r) => r.id)
    const importedRoles: Role[] = parsed.roles
    const validatedPermissions: SystemPermissionMatrix = {}

    Object.keys(parsed.permissions).forEach((roleId) => {
      validatedPermissions[roleId] = {}
      MENU_CATALOG.forEach((menu) => {
        const item = parsed.permissions[roleId]?.[menu.id] || createEmptyPermission()
        validatedPermissions[roleId][menu.id] = enforceSafetyRules(roleId, menu.id, item)
      })
    })

    // Ensure all system roles exist in roles array
    DEFAULT_ROLES.forEach((sysRole) => {
      if (!importedRoles.find((r) => r.id === sysRole.id)) {
        importedRoles.push(sysRole)
      }
      if (!validatedPermissions[sysRole.id]) {
        validatedPermissions[sysRole.id] = JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS[sysRole.id]))
      }
    })

    localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(importedRoles))
    localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(validatedPermissions))
    if (parsed.userOverrides) {
      localStorage.setItem(STORAGE_KEYS.USER_OVERRIDES, JSON.stringify(parsed.userOverrides))
    }

    addAuditLog({
      actor: actorName,
      roleId: 'admin',
      action: 'IMPORT_MATRIX',
      summary: `Imported full RBAC matrix containing ${importedRoles.length} roles and ${Object.keys(validatedPermissions).length} permission sets.`,
    })

    notifySubscribers()
  },

  // ==========================================
  // USER-LEVEL OVERRIDE METHODS
  // ==========================================

  async setUserOverride(
    userId: string,
    menuId: string,
    patch: Partial<PermissionItem>,
    actorName: string = 'Super Admin'
  ): Promise<void> {
    await delay(50)
    const allOverrides = getStoredUserOverrides()
    if (!allOverrides[userId]) {
      allOverrides[userId] = {}
    }
    allOverrides[userId][menuId] = {
      ...(allOverrides[userId][menuId] || {}),
      ...patch,
    }
    localStorage.setItem(STORAGE_KEYS.USER_OVERRIDES, JSON.stringify(allOverrides))

    addAuditLog({
      actor: actorName,
      roleId: 'custom',
      menuId,
      action: 'USER_OVERRIDE',
      summary: `Set custom user override for User ID "${userId}" on menu "${MENU_MAP[menuId]?.label || menuId}": ${JSON.stringify(patch)}`,
    })

    notifySubscribers()
  },

  async deleteUserOverride(userId: string, menuId: string, actorName: string = 'Super Admin'): Promise<void> {
    await delay(40)
    const allOverrides = getStoredUserOverrides()
    if (allOverrides[userId] && allOverrides[userId][menuId]) {
      delete allOverrides[userId][menuId]
      localStorage.setItem(STORAGE_KEYS.USER_OVERRIDES, JSON.stringify(allOverrides))

      addAuditLog({
        actor: actorName,
        roleId: 'custom',
        menuId,
        action: 'USER_OVERRIDE',
        summary: `Removed custom user override for User ID "${userId}" on menu "${MENU_MAP[menuId]?.label || menuId}".`,
      })

      notifySubscribers()
    }
  },
}

/**
 * Standardizes any role string (e.g. 'Admin', 'Biz Pro', 'Client', custom role ID)
 * into its internal normalized RBAC RoleId.
 */
export function normalizeRoleId(role?: string | null): RoleId {
  if (!role) return 'client'
  const trimmed = role.trim()
  const lower = trimmed.toLowerCase()
  if (lower === 'admin') return 'admin'
  if (lower === 'biz pro' || lower === 'bizpro' || lower === 'biz_pro') return 'bizpro'
  if (lower === 'client') return 'client'
  if (lower === 'affiliate') return 'affiliate'
  if (lower === 'employer') return 'employer'
  if (lower === 'job seeker' || lower === 'jobseeker' || lower === 'job_seeker') return 'jobseeker'
  return trimmed
}

