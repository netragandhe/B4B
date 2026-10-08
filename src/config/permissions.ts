import { UserRole } from '@/mock-data/users'

export type AppModule =
  | 'dashboard'
  | 'bizproManagement'
  | 'rankRules'
  | 'commissionMaker'
  | 'territory'
  | 'inventory'
  | 'billing'
  | 'leads'
  | 'clients'
  | 'scoreboard'
  | 'jobs'
  | 'affiliates'
  | 'cms'
  | 'training'
  | 'reports'
  | 'rolesPermissions'
  | 'ebox'
  | 'messages'
  | 'profile'

export type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'export'

export type PermissionScope = 'all' | 'team' | 'own' | 'none'

export interface ModulePermission {
  view: boolean
  create: boolean
  edit: boolean
  delete: boolean
  approve: boolean
  export: boolean
  scope: PermissionScope
}

export type RolePermissionsMatrix = Record<AppModule, ModulePermission>
export type SystemPermissions = Record<UserRole, RolePermissionsMatrix>

const allowAll: ModulePermission = {
  view: true,
  create: true,
  edit: true,
  delete: true,
  approve: true,
  export: true,
  scope: 'all',
}

const none: ModulePermission = {
  view: false,
  create: false,
  edit: false,
  delete: false,
  approve: false,
  export: false,
  scope: 'none',
}

const ownViewOnly: ModulePermission = {
  view: true,
  create: false,
  edit: false,
  delete: false,
  approve: false,
  export: false,
  scope: 'own',
}

const ownFull: ModulePermission = {
  view: true,
  create: true,
  edit: true,
  delete: true,
  approve: false,
  export: true,
  scope: 'own',
}

export const DEFAULT_PERMISSIONS: SystemPermissions = {
  Admin: {
    dashboard: { ...allowAll },
    bizproManagement: { ...allowAll },
    rankRules: { ...allowAll },
    commissionMaker: { ...allowAll },
    territory: { ...allowAll },
    inventory: { ...allowAll },
    billing: { ...allowAll },
    leads: { ...allowAll },
    clients: { ...allowAll },
    scoreboard: { ...allowAll },
    jobs: { ...allowAll },
    affiliates: { ...allowAll },
    cms: { ...allowAll },
    training: { ...allowAll },
    reports: { ...allowAll },
    rolesPermissions: { ...allowAll },
    ebox: { ...allowAll },
    messages: { ...allowAll },
    profile: { ...allowAll },
  },

  'Biz Pro': {
    dashboard: { ...ownViewOnly },
    bizproManagement: { ...none }, // Rank < 4 none
    rankRules: { ...ownViewOnly },
    commissionMaker: { ...ownViewOnly },
    territory: { view: true, create: false, edit: false, delete: false, approve: false, export: false, scope: 'own' },
    inventory: { view: true, create: false, edit: false, delete: false, approve: false, export: false, scope: 'all' },
    billing: { ...ownViewOnly },
    leads: { view: true, create: true, edit: true, delete: false, approve: false, export: true, scope: 'own' },
    clients: { view: true, create: true, edit: true, delete: false, approve: false, export: true, scope: 'own' },
    scoreboard: { view: true, create: false, edit: false, delete: false, approve: false, export: true, scope: 'all' },
    jobs: { ...none },
    affiliates: { ...none },
    cms: { ...none },
    training: { view: true, create: false, edit: false, delete: false, approve: false, export: false, scope: 'all' },
    reports: { view: true, create: false, edit: false, delete: false, approve: false, export: true, scope: 'own' },
    rolesPermissions: { ...none },
    ebox: { ...ownFull },
    messages: { ...ownFull },
    profile: { ...ownFull },
  },

  Client: {
    dashboard: { ...ownFull },
    bizproManagement: { ...none },
    rankRules: { ...none },
    commissionMaker: { ...none },
    territory: { ...none },
    inventory: { view: true, create: false, edit: false, delete: false, approve: false, export: false, scope: 'own' },
    billing: { ...ownFull },
    leads: { ...none },
    clients: { ...none },
    scoreboard: { ...none },
    jobs: { ...none },
    affiliates: { ...none },
    cms: { ...none },
    training: { ...none },
    reports: { ...none },
    rolesPermissions: { ...none },
    ebox: { ...ownFull },
    messages: { ...ownFull },
    profile: { ...ownFull },
  },

  Affiliate: {
    dashboard: { ...ownFull },
    bizproManagement: { ...none },
    rankRules: { ...none },
    commissionMaker: { ...none },
    territory: { ...none },
    inventory: { ...none },
    billing: { ...ownFull },
    leads: { view: true, create: true, edit: false, delete: false, approve: false, export: false, scope: 'own' },
    clients: { ...none },
    scoreboard: { ...none },
    jobs: { ...none },
    affiliates: { ...ownFull },
    cms: { ...none },
    training: { ...none },
    reports: { ...ownFull },
    rolesPermissions: { ...none },
    ebox: { ...ownFull },
    messages: { ...none },
    profile: { ...ownFull },
  },

  Employer: {
    dashboard: { ...ownFull },
    bizproManagement: { ...none },
    rankRules: { ...none },
    commissionMaker: { ...none },
    territory: { ...none },
    inventory: { ...none },
    billing: { ...ownFull },
    leads: { ...none },
    clients: { ...none },
    scoreboard: { ...none },
    jobs: { view: true, create: true, edit: true, delete: true, approve: false, export: true, scope: 'own' },
    affiliates: { ...none },
    cms: { ...none },
    training: { ...none },
    reports: { ...ownFull },
    rolesPermissions: { ...none },
    ebox: { ...ownFull },
    messages: { ...ownFull },
    profile: { ...ownFull },
  },

  'Job Seeker': {
    dashboard: { ...ownFull },
    bizproManagement: { ...none },
    rankRules: { ...none },
    commissionMaker: { ...none },
    territory: { ...none },
    inventory: { ...none },
    billing: { ...none },
    leads: { ...none },
    clients: { ...none },
    scoreboard: { ...none },
    jobs: { view: true, create: true, edit: false, delete: false, approve: false, export: false, scope: 'own' },
    affiliates: { ...none },
    cms: { ...none },
    training: { ...none },
    reports: { ...none },
    rolesPermissions: { ...none },
    ebox: { ...ownFull },
    messages: { ...ownFull },
    profile: { ...ownFull },
  },
}

/**
 * Dynamic evaluator considering role, rank level (e.g. Biz Pro Rank >= 4), and matrix configuration
 */
export function evalPermission(
  role: UserRole,
  rankLevel: number = 1,
  module: AppModule,
  action: PermissionAction,
  matrix: SystemPermissions = DEFAULT_PERMISSIONS
): boolean {
  if (role === 'Admin') return true

  const roleMatrix = matrix[role] || DEFAULT_PERMISSIONS[role]
  const modulePerm = roleMatrix[module]

  if (!modulePerm) return false

  // Special Biz Pro Leader evaluation (Rank >= 4 unlocks Team scopes and Leader management)
  if (role === 'Biz Pro' && rankLevel >= 4) {
    if (module === 'bizproManagement' && (action === 'view' || action === 'create' || action === 'edit')) {
      return true
    }
    if (module === 'territory' && (action === 'edit' || action === 'create')) {
      return true
    }
    if ((module === 'leads' || module === 'clients' || module === 'reports') && modulePerm.view) {
      return true
    }
  }

  return Boolean(modulePerm[action])
}

export function evalScope(
  role: UserRole,
  rankLevel: number = 1,
  module: AppModule,
  matrix: SystemPermissions = DEFAULT_PERMISSIONS
): PermissionScope {
  if (role === 'Admin') return 'all'

  const roleMatrix = matrix[role] || DEFAULT_PERMISSIONS[role]
  const modulePerm = roleMatrix[module]

  if (!modulePerm) return 'none'

  // Biz Pro Leader Rank >= 4 elevates scope from 'own' to 'team' for leads, clients, reports, territory
  if (role === 'Biz Pro' && rankLevel >= 4) {
    if (module === 'leads' || module === 'clients' || module === 'reports' || module === 'territory' || module === 'bizproManagement') {
      return 'team'
    }
  }

  return modulePerm.scope
}
