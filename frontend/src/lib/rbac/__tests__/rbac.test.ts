/**
 * RBAC System Unit Tests
 * 
 * Verifies core security invariants:
 * 1. can() permission resolution
 * 2. scopeOf() data boundary determination
 * 3. Action dependency rules: Any action requires view=true
 * 4. minRank hierarchy rules for Biz Pro (Rank 1 vs Rank 4+ Leader menus)
 * 5. User-level overrides (supercedes role baseline)
 * 6. Admin lockout protection (admin cannot disable roles-permissions, overview, settings)
 * 7. Core menu persistence (core menus cannot be disabled)
 */

import { MENU_CATALOG, MENU_MAP } from '../../../config/menuCatalog'
import { DEFAULT_PERMISSIONS, DEFAULT_ROLES } from '../../../config/defaultPermissions'
import { PermissionItem, RoleId, ScopeType, PermissionAction } from '../types'

// Mock evaluator recreating the PermissionContext evaluation pipeline for standalone testing
export function evaluatePermission(params: {
  roleId: RoleId
  menuId: string
  action?: PermissionAction
  matrix: Record<string, Record<string, PermissionItem>>
  userRank?: number
  userOverride?: Partial<PermissionItem>
}): boolean {
  const { roleId, menuId, action = 'view', matrix, userRank = 1, userOverride } = params
  const menu = MENU_MAP[menuId]

  // 1. Admin lockout protection
  if (roleId === 'admin') {
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

  // 2. minRank check for Biz Pro
  if (roleId === 'bizpro') {
    const reqRank = menu?.minRank || (menu?.isLeaderOnly ? 4 : 1)
    if (reqRank > 1 && userRank < reqRank) {
      return false
    }
  }

  const rolePerms = matrix[roleId] || {}
  const baseItem = rolePerms[menuId]

  // User override takes precedence
  const effectiveView = userOverride?.view !== undefined
    ? userOverride.view
    : (menu?.isCore ? true : (baseItem?.view ?? false))

  if (action === 'view') {
    return effectiveView
  }

  // Action requires view
  if (!effectiveView) {
    return false
  }

  // Scope check: 'none' denies actions
  const effectiveScope = userOverride?.scope || baseItem?.scope || 'own'
  if (effectiveScope === 'none') {
    return false
  }

  const actionAllowed = userOverride?.[action] !== undefined
    ? userOverride[action]
    : (baseItem?.[action] ?? false)

  return Boolean(actionAllowed)
}

export function evaluateScope(params: {
  roleId: RoleId
  menuId: string
  matrix: Record<string, Record<string, PermissionItem>>
  userOverride?: Partial<PermissionItem>
}): ScopeType {
  const { roleId, menuId, matrix, userOverride } = params
  if (userOverride?.scope) return userOverride.scope
  const rolePerms = matrix[roleId] || {}
  const baseItem = rolePerms[menuId]
  return baseItem?.scope || 'own'
}

export function enforceSafetyMutations(
  roleId: RoleId,
  menuId: string,
  item: PermissionItem
): PermissionItem {
  const menu = MENU_MAP[menuId]
  const clean = { ...item }

  // Admin lockout protection
  if (roleId === 'admin') {
    if (
      menuId === 'admin-roles-permissions' ||
      menuId === 'admin-overview' ||
      menuId === 'shared-settings'
    ) {
      clean.view = true
      clean.create = true
      clean.edit = true
      clean.scope = 'all'
    }
  }

  // Core menu protection
  if (menu?.isCore) {
    clean.view = true
    if (clean.scope === 'none') clean.scope = 'own'
  }

  // Action dependency: turning view off disables all actions
  if (!clean.view) {
    clean.create = false
    clean.edit = false
    clean.delete = false
    clean.approve = false
    clean.export = false
    clean.scope = 'none'
  } else {
    if (clean.scope === 'none') clean.scope = 'own'
  }

  // Turning any action on automatically enables view
  if (clean.create || clean.edit || clean.delete || clean.approve || clean.export) {
    clean.view = true
    if (clean.scope === 'none') clean.scope = 'own'
  }

  return clean
}

// =========================================================================
// RUNNER & ASSERTIONS
// =========================================================================
export function runRbacTests(): { passed: number; failed: number; results: { name: string; success: boolean; error?: string }[] } {
  const results: { name: string; success: boolean; error?: string }[] = []
  let passed = 0
  let failed = 0

  function assert(condition: boolean, testName: string, errorMsg?: string) {
    if (condition) {
      passed++
      results.push({ name: testName, success: true })
    } else {
      failed++
      results.push({ name: testName, success: false, error: errorMsg || 'Assertion failed' })
    }
  }

  const mockMatrix = JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS))

  // Test 1: Admin can() view and edit critical system items
  assert(
    evaluatePermission({
      roleId: 'admin',
      menuId: 'admin-roles-permissions',
      action: 'view',
      matrix: mockMatrix,
    }) === true,
    'Admin can view admin-roles-permissions'
  )

  // Test 2: Admin Lockout Protection: even if matrix had view=false, admin retains access
  const tamperedMatrix = JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS))
  tamperedMatrix['admin']['admin-roles-permissions'] = {
    view: false,
    create: false,
    edit: false,
    delete: false,
    approve: false,
    export: false,
    scope: 'none',
  }
  assert(
    evaluatePermission({
      roleId: 'admin',
      menuId: 'admin-roles-permissions',
      action: 'view',
      matrix: tamperedMatrix,
    }) === true,
    'Admin lockout protection keeps view=true on admin-roles-permissions despite tampered matrix'
  )

  // Test 3: Core Menus cannot be hidden (e.g. client dashboard isCore)
  const clientDashboardMenu = MENU_MAP['client-dashboard']
  assert(Boolean(clientDashboardMenu?.isCore) === true, 'Client Dashboard is marked as isCore')
  assert(
    evaluatePermission({
      roleId: 'client',
      menuId: 'client-dashboard',
      action: 'view',
      matrix: tamperedMatrix,
    }) === true,
    'Core menu client-dashboard remains viewable for client'
  )

  // Test 4: Action requires View rule (if view is false, create is false)
  const noViewItem: PermissionItem = {
    view: false,
    create: true, // illegally set
    edit: true,
    delete: false,
    approve: false,
    export: false,
    scope: 'own',
  }
  const enforced = enforceSafetyMutations('client', 'client-orders', noViewItem)
  assert(enforced.create === false && enforced.edit === false && enforced.view === false, 'Enforce rule turns actions off when view is off')

  // Test 5: Turning any action ON automatically turns view ON
  const createOnlyItem: PermissionItem = {
    view: false,
    create: true,
    edit: false,
    delete: false,
    approve: false,
    export: false,
    scope: 'own',
  }
  const enforcedCreate = enforceSafetyMutations('affiliate', 'affiliate-submit-lead', createOnlyItem)
  assert(enforcedCreate.view === true, 'Enforce rule turns view on when create is turned on')

  // Test 6: minRank logic: Biz Pro Rank 1 CANNOT see leader menu (minRank: 4)
  assert(
    evaluatePermission({
      roleId: 'bizpro',
      menuId: 'bizpro-team',
      action: 'view',
      matrix: mockMatrix,
      userRank: 1,
    }) === false,
    'Biz Pro Rank 1 is restricted from leader menu bizpro-team (requires rank 4+)'
  )

  // Test 7: minRank logic: Biz Pro Rank 4 CAN see leader menu (minRank: 4)
  assert(
    evaluatePermission({
      roleId: 'bizpro',
      menuId: 'bizpro-team',
      action: 'view',
      matrix: mockMatrix,
      userRank: 4,
    }) === true,
    'Biz Pro Rank 4 can view leader menu bizpro-team'
  )

  // Test 8: Scope determination
  const scope = evaluateScope({
    roleId: 'admin',
    menuId: 'admin-overview',
    matrix: mockMatrix,
  })
  assert(scope === 'all', 'Admin has scope=all on admin-overview')

  // Test 9: Scope "none" denies interactive actions
  const noneScopeMatrix = JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS))
  noneScopeMatrix['affiliate']['affiliate-links'] = {
    view: true,
    create: true,
    edit: true,
    delete: false,
    approve: false,
    export: false,
    scope: 'none',
  }
  assert(
    evaluatePermission({
      roleId: 'affiliate',
      menuId: 'affiliate-links',
      action: 'create',
      matrix: noneScopeMatrix,
    }) === false,
    'Scope "none" denies create action even if create boolean is true'
  )

  // Test 10: User Override supercedes role default
  assert(
    evaluatePermission({
      roleId: 'affiliate',
      menuId: 'admin-overview',
      action: 'view',
      matrix: mockMatrix,
      userOverride: { view: true },
    }) === true,
    'User-level override granting view=true allows access on menu restricted for role'
  )

  // Test 11: User Override revokes access
  assert(
    evaluatePermission({
      roleId: 'affiliate',
      menuId: 'affiliate-marketing',
      action: 'view',
      matrix: mockMatrix,
      userOverride: { view: false },
    }) === false,
    'User-level override revoking view=false denies access on normally allowed menu'
  )

  // Test 12: Catalog completeness: 68 total menus cataloged
  assert(MENU_CATALOG.length === 68, `Master menu catalog contains exactly 68 menus (found ${MENU_CATALOG.length})`)

  return { passed, failed, results }
}
