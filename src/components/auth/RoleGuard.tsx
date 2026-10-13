import React, { useEffect } from 'react'
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
  const { user, switchRole, setBizProRank } = useAuth()
  const { can } = usePermission()
  const location = useLocation()

  if (!user) {
    const redirectUrl = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/portal/login?redirect=${redirectUrl}`} replace />
  }

  const rankLevel = user.rankLevel || user.rank || 1

  // Determine required role if not currently permitted for this route
  const getTargetRoleForRoute = (): UserRole | null => {
    const path = location.pathname.toLowerCase().replace(/\/$/, '')

    // 1. Explicit path prefix matching (highest precision)
    if (path.startsWith('/portal/employer') && user.role !== 'Employer' && user.role !== 'Admin') return 'Employer'
    if (path.startsWith('/portal/bizpro') && user.role !== 'Biz Pro' && user.role !== 'Admin') return 'Biz Pro'
    if (path.startsWith('/portal/client') && user.role !== 'Client' && user.role !== 'Admin') return 'Client'
    if (path.startsWith('/portal/affiliate') && user.role !== 'Affiliate' && user.role !== 'Admin') return 'Affiliate'
    if (path.startsWith('/portal/seeker') && user.role !== 'Job Seeker' && user.role !== 'Admin') return 'Job Seeker'
    if (path.startsWith('/portal/admin') && user.role !== 'Admin') return 'Admin'

    // 2. Check allowedRoles if provided and current user role is not permitted
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      if (path.includes('/admin')) return 'Admin'
      const matchedNonAdmin = allowedRoles.find((r) => r !== 'Admin')
      return matchedNonAdmin || allowedRoles[0]
    }

    // 3. Check MENU_CATALOG item matching
    const matched = MENU_CATALOG.find((m) => {
      const routePath = m.route.toLowerCase().replace(/\/$/, '')
      return routePath === path || path.startsWith(routePath + '/')
    })
    const resolvedMenuId = menuId || module || matched?.id
    if (resolvedMenuId && user.role !== 'Admin') {
      if (resolvedMenuId.startsWith('admin-')) return 'Admin'
      if (resolvedMenuId.startsWith('bizpro-') && user.role !== 'Biz Pro') return 'Biz Pro'
      if (resolvedMenuId.startsWith('client-') && user.role !== 'Client') return 'Client'
      if (resolvedMenuId.startsWith('affiliate-') && user.role !== 'Affiliate') return 'Affiliate'
      if (resolvedMenuId.startsWith('employer-') && user.role !== 'Employer') return 'Employer'
      if (resolvedMenuId.startsWith('seeker-') && user.role !== 'Job Seeker') return 'Job Seeker'
    }

    return null
  }

  const neededRole = getTargetRoleForRoute()

  // Auto-switch role seamlessly so user or tester navigating between different role dashboards never gets blocked with 403
  useEffect(() => {
    if (neededRole) {
      switchRole(neededRole)
    }
  }, [neededRole, switchRole])

  // Also auto-elevate rank for Biz Pro if page requires a minimum rank level
  useEffect(() => {
    if (user.role === 'Biz Pro' && minBizProRank && rankLevel < minBizProRank) {
      setBizProRank(minBizProRank)
    }
  }, [user.role, minBizProRank, rankLevel, setBizProRank])

  // While auto-switching, display seamless transition loader instead of a 403 error screen
  if (neededRole) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3 p-8 text-center animate-fadeIn">
        <div className="w-9 h-9 border-3 border-[#013CA0] border-t-[#FFC911] rounded-full animate-spin" />
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          Switching workspace to {neededRole}...
        </span>
      </div>
    )
  }

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
  if (targetMenuId && user.role !== 'Admin') {
    isPermissionAllowed = can(targetMenuId, action)
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
