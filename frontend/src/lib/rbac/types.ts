/**
 * RBAC (Role-Based Access Control) Type Definitions
 * 
 * Supports dynamic runtime configuration of menus, actions, scopes,
 * roles, impersonation, user-level overrides, and audit logging.
 */

export type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'export'

export type ScopeType = 'all' | 'team' | 'own' | 'none'

export type SystemRoleId = 'admin' | 'bizpro' | 'client' | 'affiliate' | 'employer' | 'jobseeker'

export type RoleId = SystemRoleId | string

export interface Menu {
  id: string
  label: string
  icon: string // Lucide icon identifier string (e.g. 'LayoutDashboard', 'Users', 'Wallet')
  route: string
  module:
    | 'Dashboard'
    | 'Leads and Clients'
    | 'Commission and Rank'
    | 'Territory'
    | 'Jobs'
    | 'Billing'
    | 'Content'
    | 'Reports'
    | 'System'
    | 'Shared'
  group: string
  parentId?: string
  order: number
  isCore: boolean // Core items (e.g. dashboard, profile, logout) can never be removed from menu
  isLeaderOnly?: boolean // Biz Pro leader menus requiring rank >= 4
  minRank?: number // Minimum rank required (e.g. 4 for Biz Pro leaders)
  badge?: string
  badgeVariant?: 'primary' | 'emerald' | 'amber' | 'gold' | 'purple' | 'navy' | 'royal'
  description?: string
}

export interface PermissionItem {
  view: boolean
  create: boolean
  edit: boolean
  delete: boolean
  approve: boolean
  export: boolean
  scope: ScopeType
  minRank?: number
}

export type RolePermissionMatrix = Record<string, PermissionItem> // menuId -> PermissionItem

export type SystemPermissionMatrix = Record<string, RolePermissionMatrix> // roleId -> menuId -> PermissionItem

export interface Role {
  id: RoleId
  name: string
  description: string
  isSystem: boolean // The 6 default roles cannot be deleted
  status: 'active' | 'inactive'
  userCount: number
  createdAt: string
  updatedAt: string
}

export interface AuditLogEntry {
  id: string
  timestamp: string
  actor: string
  roleId: RoleId
  menuId?: string
  action: 'UPDATE_PERMISSION' | 'BULK_UPDATE' | 'RESET_ROLE' | 'RESET_ALL' | 'CREATE_ROLE' | 'CLONE_ROLE' | 'DELETE_ROLE' | 'USER_OVERRIDE' | 'IMPORT_MATRIX' | 'IMPERSONATE'
  oldValue?: any
  newValue?: any
  summary: string
}

export interface UserMenuOverride {
  userId: string
  menuId: string
  permissions: Partial<PermissionItem>
  updatedAt: string
  updatedBy: string
}

export interface PermissionDiff {
  roleId: RoleId
  menuId: string
  field: keyof PermissionItem
  oldValue: any
  newValue: any
  menuLabel: string
  roleName: string
}
