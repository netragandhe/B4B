import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth, UserRole } from '@/hooks/useAuth'
import { usePermission } from '@/hooks/usePermission'
import { PermissionAction } from '@/lib/rbac/types'
import { MENU_CATALOG } from '@/config/menuCatalog'
import { Forbidden403Page } from '@/pages/portal/Forbidden403Page'

interface RoleGuardProps {
  children: React.ReactNode
  menuId?: string
  allowedRoles?: UserRole[]
  action?: PermissionAction
  minBizProRank?: number
  module?: string // legacy fallback
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  menuId,
  allowedRoles,
  action = 'view',
  minBizProRank,
  module,
}) => {
  const { user } = useAuth()
  const { can } = usePermission()
  const location = useLocation()

  if (!user) {
    const redirectUrl = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/portal/login?redirect=${redirectUrl}`} replace />
  }

  const rankLevel = user.rankLevel || user.rank || 1

  // 1. Check legacy allowedRoles if provided
  let isRoleAllowed = true
  if (allowedRoles && allowedRoles.length > 0) {
    isRoleAllowed = allowedRoles.includes(user.role)
  }

  // 2. Check minBizProRank
  let isRankAllowed = true
  if (user.role === 'Biz Pro' && minBizProRank) {
    if (rankLevel < minBizProRank) {
      isRankAllowed = false
    }
  }

  // 3. Resolve target menu ID (from prop or location pathname match)
  let targetMenuId = menuId || module
  let targetMenuLabel = targetMenuId

  if (!targetMenuId) {
    // Attempt automatic route matching from MENU_CATALOG
    const currentPath = location.pathname.toLowerCase().replace(/\/$/, '')
    const matched = MENU_CATALOG.find((m) => {
      const routePath = m.route.toLowerCase().replace(/\/$/, '')
      return routePath === currentPath || currentPath.startsWith(routePath + '/')
    })
    if (matched) {
      targetMenuId = matched.id
      targetMenuLabel = matched.label
    }
  }

  // 4. Permission check via dynamic RBAC matrix
  let isPermissionAllowed = true
  if (targetMenuId) {
    isPermissionAllowed = can(targetMenuId, action)
  }

  if (!isRoleAllowed || !isRankAllowed || !isPermissionAllowed) {
    return (
      <Forbidden403Page
        requiredMenu={targetMenuLabel}
        requiredRole={allowedRoles?.join(', ')}
        requiredAction={action}
      />
    )
  }

  return <>{children}</>
}
