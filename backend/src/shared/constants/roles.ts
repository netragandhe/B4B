export const UserRoles = {
  ADMIN: 'ADMIN',
  BIZ_PRO: 'BIZ_PRO',
  CLIENT: 'CLIENT',
  AFFILIATE: 'AFFILIATE',
  EMPLOYER: 'EMPLOYER',
  JOB_SEEKER: 'JOB_SEEKER',
} as const;

export type UserRole = typeof UserRoles[keyof typeof UserRoles];

export const RoleLabels: Record<UserRole, string> = {
  ADMIN: 'Admin',
  BIZ_PRO: 'B4B Coach',
  CLIENT: 'Client',
  AFFILIATE: 'Affiliate',
  EMPLOYER: 'Employer',
  JOB_SEEKER: 'Job Seeker',
};

