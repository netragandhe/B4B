import React, { useEffect } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth, UserRole } from '@/hooks/useAuth'
import { usePermission } from '@/hooks/usePermission'
import { PermissionAction } from '@/lib/rbac/types'
import { MENU_CATALOG } from '@/config/menuCatalog'
import { Forbidden403Page } from '@/pages/portal/Forbidden403Page'
import { getDefaultLandingPath } from '@/context/AuthContext'

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
  const { user, setBizProRank } = useAuth()
  const { can } = usePermission()
  const location = useLocation()

  if (!user) {
    const redirectUrl = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/portal/login?redirect=${redirectUrl}`} replace />
  }

  const rankLevel = user.rankLevel || user.rank || 1
  const path = location.pathname.toLowerCase().replace(/\/$/, '')

  // 1. Strict Role Boundary Isolation: redirect non-admin users to their own landing dashboard if attempting unauthorized route namespace
  if (user.role !== 'Admin') {
    if (path.startsWith('/portal/admin')) {
      return <Navigate to={getDefaultLandingPath(user.role)} replace />
    }
    if (path.startsWith('/portal/bizpro') && user.role !== 'Biz Pro') {
      return <Navigate to={getDefaultLandingPath(user.role)} replace />
    }
    if (path.startsWith('/portal/client') && user.role !== 'Client') {
      return <Navigate to={getDefaultLandingPath(user.role)} replace />
    }
    if (path.startsWith('/portal/affiliate') && user.role !== 'Affiliate') {
      return <Navigate to={getDefaultLandingPath(user.role)} replace />
    }
    if (path.startsWith('/portal/employer') && user.role !== 'Employer') {
      return <Navigate to={getDefaultLandingPath(user.role)} replace />
    }
    if (path.startsWith('/portal/seeker') && user.role !== 'Job Seeker') {
      return <Navigate to={getDefaultLandingPath(user.role)} replace />
    }
  }

  // 2. Check explicitly defined allowedRoles
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDefaultLandingPath(user.role)} replace />
  }

  // 3. Auto-elevate rank for Biz Pro if page requires a minimum rank level
  useEffect(() => {
    if (user.role === 'Biz Pro' && minBizProRank && rankLevel < minBizProRank) {
      setBizProRank(minBizProRank)
    }
  }, [user.role, minBizProRank, rankLevel, setBizProRank])

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
  if (targetMenuId && user.role !== 'Admin') {
    if (
      (allowedRoles && allowedRoles.includes(user.role)) ||
      targetMenuId.startsWith('shared-') ||
      location.pathname.startsWith('/portal/profile') ||
      location.pathname.startsWith('/portal/settings') ||
      location.pathname.startsWith('/portal/ebox')
    ) {
      isPermissionAllowed = true
    } else {
      isPermissionAllowed = can(targetMenuId, action)
    }
  }

  if (!isRoleAllowed || !isRankAllowed || !isPermissionAllowed) {
    return (
      <Forbidden403Page
        requiredMenu={targetMenuLabel}
        requiredRole={allowedRoles?.join(', ') || undefined}
        requiredAction={action}
      />
    )
  }

  return <>{children}</>
}
