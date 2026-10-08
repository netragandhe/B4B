import { useAuth } from '@/hooks/useAuth'
import {
  AppModule,
  PermissionAction,
  PermissionScope,
  evalPermission,
  evalScope,
  DEFAULT_PERMISSIONS,
} from '@/config/permissions'

export function usePermission() {
  const { user } = useAuth()

  const role = user?.role || 'Client'
  const rankLevel = user?.rankLevel || user?.rank || 1

  const can = (module: AppModule, action: PermissionAction = 'view'): boolean => {
    return evalPermission(role, rankLevel, module, action, DEFAULT_PERMISSIONS)
  }

  const scopeOf = (module: AppModule): PermissionScope => {
    return evalScope(role, rankLevel, module, DEFAULT_PERMISSIONS)
  }

  return {
    can,
    scopeOf,
    role,
    rankLevel,
  }
}
