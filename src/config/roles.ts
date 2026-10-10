import { UserRole } from '@/mock-data/users'

export const ROLE_LABELS: Record<UserRole, string> = {
  Admin: 'Admin',
  'Biz Pro': 'B4B Coach',
  Client: 'Client',
  Affiliate: 'Affiliate',
  Employer: 'Employer',
  'Job Seeker': 'Job Seeker',
}

/**
 * Returns the human-readable display label for a system role.
 * Maps internal 'Biz Pro' to client-facing 'B4B Coach' throughout the UI.
 */
export function getRoleLabel(role?: string | null): string {
  if (!role) return ''
  return ROLE_LABELS[role as UserRole] || role
}
