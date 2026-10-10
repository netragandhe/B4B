import { Role, SystemPermissionMatrix, PermissionItem, RolePermissionMatrix } from '../lib/rbac/types'
import { MENU_CATALOG } from './menuCatalog'

export const DEFAULT_ROLES: Role[] = [
  {
    id: 'admin',
    name: 'Super Admin',
    description: 'Executive administrator with full platform control, underwriting authority, and RBAC matrix governance.',
    isSystem: true,
    status: 'active',
    userCount: 3,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: 'bizpro',
    name: 'Biz Pro Advisor',
    description: 'Licensed commercial credit broker, loan advisor, and regional team leader.',
    isSystem: true,
    status: 'active',
    userCount: 148,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: 'client',
    name: 'Client Entity',
    description: 'Commercial business owner managing approved debt revolvers, term sheets, and advisory services.',
    isSystem: true,
    status: 'active',
    userCount: 382,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: 'affiliate',
    name: 'Affiliate Partner',
    description: 'Referral partner and marketing influencer earning commissions on originated small business leads.',
    isSystem: true,
    status: 'active',
    userCount: 89,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: 'employer',
    name: 'Employer / Recruiter',
    description: 'Hiring enterprise posting commercial finance jobs and managing candidate interview pipelines.',
    isSystem: true,
    status: 'active',
    userCount: 42,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: 'jobseeker',
    name: 'Job Seeker',
    description: 'Candidate exploring finance, underwriting, fractional CFO, and credit brokerage opportunities.',
    isSystem: true,
    status: 'active',
    userCount: 520,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
]

// Helper generators for permission items
const createEmptyPerm = (): PermissionItem => ({
  view: false,
  create: false,
  edit: false,
  delete: false,
  approve: false,
  export: false,
  scope: 'none',
})

const createAdminPerm = (): PermissionItem => ({
  view: true,
  create: true,
  edit: true,
  delete: true,
  approve: true,
  export: true,
  scope: 'all',
})

const createStandardPerm = (options?: Partial<PermissionItem>): PermissionItem => ({
  view: true,
  create: true,
  edit: true,
  delete: false,
  approve: false,
  export: true,
  scope: 'own',
  ...options,
})

const createReadOnlyPerm = (options?: Partial<PermissionItem>): PermissionItem => ({
  view: true,
  create: false,
  edit: false,
  delete: false,
  approve: false,
  export: false,
  scope: 'own',
  ...options,
})

/**
 * Builds the default permission matrix for all system roles.
 */
function buildDefaultPermissions(): SystemPermissionMatrix {
  const matrix: SystemPermissionMatrix = {
    admin: {},
    bizpro: {},
    client: {},
    affiliate: {},
    employer: {},
    jobseeker: {},
  }

  // 1. Initialize all menus as disabled for every role
  MENU_CATALOG.forEach((menu) => {
    matrix.admin[menu.id] = createEmptyPerm()
    matrix.bizpro[menu.id] = createEmptyPerm()
    matrix.client[menu.id] = createEmptyPerm()
    matrix.affiliate[menu.id] = createEmptyPerm()
    matrix.employer[menu.id] = createEmptyPerm()
    matrix.jobseeker[menu.id] = createEmptyPerm()
  })

  // 2. ADMIN: Give full action permissions to all modules, but default sidebar to core management hubs (10)
  MENU_CATALOG.forEach((menu) => {
    matrix.admin[menu.id] = {
      ...createAdminPerm(),
      view: false, // only core management hubs visible in sidebar by default
    }
  })

  const adminSidebarMenus = [
    'admin-overview',
    'admin-bizpro',
    'admin-bulletin',
    'admin-rank-rules',
    'admin-commission-maker',
    'admin-territory',
    'admin-services',
    'admin-affiliates',
    'admin-jobs-moderation',
    'admin-roles-permissions',
    'shared-ebox',
  ]
  adminSidebarMenus.forEach((id) => {
    if (matrix.admin[id]) {
      matrix.admin[id].view = true
    }
  })

  // 3. BIZ PRO default menus (Streamlined 9 base + 1 leader)
  const bizProBaseMenus = [
    'bizpro-bulletin',
    'bizpro-dashboard',
    'bizpro-leads',
    'bizpro-clients',
    'bizpro-communication',
    'bizpro-services',
    'bizpro-commissions',
    'bizpro-rank',
    'bizpro-training',
    'shared-ebox',
  ]
  bizProBaseMenus.forEach((id) => {
    if (matrix.bizpro[id]) {
      matrix.bizpro[id] = createStandardPerm({
        scope: id === 'bizpro-services' || id === 'bizpro-training' ? 'all' : 'team',
        delete: id === 'bizpro-leads',
        export: true,
      })
    }
  })

  // Biz Pro Leader menus (Rank 4+)
  const bizProLeaderMenus = [
    'bizpro-team',
  ]
  bizProLeaderMenus.forEach((id) => {
    if (matrix.bizpro[id]) {
      matrix.bizpro[id] = createStandardPerm({
        minRank: 4,
        scope: 'team',
        approve: true,
        export: true,
      })
    }
  })

  // 4. CLIENT default menus (Streamlined 6)
  const clientMenus = [
    'client-dashboard',
    'client-orders',
    'client-funding',
    'client-messages',
    'client-invoices',
    'shared-ebox',
  ]
  clientMenus.forEach((id) => {
    if (matrix.client[id]) {
      matrix.client[id] = createStandardPerm({
        create: id === 'client-orders' || id === 'client-messages',
        edit: false,
        delete: false,
        export: id === 'client-invoices',
        scope: 'own',
      })
    }
  })

  // 5. AFFILIATE default menus (Streamlined 5)
  const affiliateMenus = [
    'affiliate-dashboard',
    'affiliate-links',
    'affiliate-referrals',
    'affiliate-commissions',
    'shared-ebox',
  ]
  affiliateMenus.forEach((id) => {
    if (matrix.affiliate[id]) {
      matrix.affiliate[id] = createStandardPerm({
        create: id === 'affiliate-links',
        edit: false,
        delete: false,
        export: id === 'affiliate-commissions' || id === 'affiliate-links',
        scope: 'own',
      })
    }
  })

  // 6. EMPLOYER default menus (Streamlined 5)
  const employerMenus = [
    'employer-dashboard',
    'employer-post-job',
    'employer-jobs',
    'employer-applicants',
    'employer-messages',
  ]
  employerMenus.forEach((id) => {
    if (matrix.employer[id]) {
      matrix.employer[id] = createStandardPerm({
        create: id === 'employer-post-job' || id === 'employer-messages',
        edit: true,
        delete: id === 'employer-jobs',
        approve: id === 'employer-applicants',
        export: true,
        scope: 'own',
      })
    }
  })

  // 7. JOB SEEKER default menus (Streamlined 5)
  const seekerMenus = [
    'seeker-dashboard',
    'seeker-search',
    'seeker-applications',
    'seeker-profile',
    'shared-messages',
  ]
  seekerMenus.forEach((id) => {
    if (matrix.jobseeker[id]) {
      matrix.jobseeker[id] = createStandardPerm({
        create: id === 'seeker-applications',
        edit: id === 'seeker-profile',
        delete: false,
        export: false,
        scope: 'own',
      })
    }
  })

  return matrix
}

export const DEFAULT_PERMISSIONS: SystemPermissionMatrix = buildDefaultPermissions()

/**
 * Creates an empty permission item initialized with view=false, scope='none'.
 */
export function createEmptyPermission(): PermissionItem {
  return createEmptyPerm()
}

/**
 * Creates a default permission set for a new custom role.
 */
export function createBlankRolePermissions(): RolePermissionMatrix {
  const result: RolePermissionMatrix = {}
  MENU_CATALOG.forEach((menu) => {
    // If it's core (like dashboard or profile), give view access by default
    if (menu.isCore) {
      result[menu.id] = createReadOnlyPerm({ scope: 'own' })
    } else {
      result[menu.id] = createEmptyPerm()
    }
  })
  return result
}
