import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldAlert, ArrowLeft, LayoutDashboard } from 'lucide-react'
import { useAuth, UserRole } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SEOHead } from '@/components/seo/SEOHead'
import { AppModule, PermissionAction, evalPermission, DEFAULT_PERMISSIONS } from '@/config/permissions'

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  module?: AppModule
  action?: PermissionAction
  minBizProRank?: number
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  module,
  action = 'view',
  minBizProRank,
}) => {
  const { user, switchRole } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (user && allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      switchRole(allowedRoles[0])
    }
  }, [user, allowedRoles, switchRole])

  if (!user) {
    return null
  }

  const rankLevel = user.rankLevel || user.rank || 1

  let isRoleAllowed = true
  if (allowedRoles && allowedRoles.length > 0) {
    isRoleAllowed = allowedRoles.includes(user.role)
  }

  let isRankAllowed = true
  if (user.role === 'Biz Pro' && minBizProRank) {
    if (rankLevel < minBizProRank) {
      isRankAllowed = false
    }
  }

  let isModuleAllowed = true
  if (module) {
    isModuleAllowed = evalPermission(user.role, rankLevel, module, action, DEFAULT_PERMISSIONS)
  }

  if (!isRoleAllowed || !isRankAllowed || !isModuleAllowed) {
    const getDashboardPath = () => {
      switch (user.role) {
        case 'Admin':
          return '/portal/admin/dashboard'
        case 'Biz Pro':
          return '/portal/bizpro/dashboard'
        case 'Client':
          return '/portal/client/dashboard'
        case 'Affiliate':
          return '/portal/affiliate/dashboard'
        case 'Employer':
          return '/portal/employer/dashboard'
        case 'Job Seeker':
          return '/portal/seeker/applications'
        default:
          return '/portal/dashboard'
      }
    }

    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-6">
        <SEOHead title="403 Access Denied | B4B Portal" description="Restricted corporate role permissions." />

        <div className="p-4 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 w-fit mx-auto shadow-md">
          <ShieldAlert className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <Badge variant="amber" size="md">
            403 Restricted Access
          </Badge>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Role Permission Required
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            You are logged in as <strong className="text-slate-900 dark:text-white font-bold">{user.name}</strong> ({user.role}).
            {module ? ` Access to ${module} module (${action}) is restricted for your account scope.` : ` This portal module is restricted.`}
          </p>
        </div>

        <Card variant="default" className="p-5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-3 text-left">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-400">Account Role</span>
            <Badge variant="emerald" size="sm">{user.role}</Badge>
          </div>
          {user.role === 'Biz Pro' && (
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-400">Biz Pro Rank Level</span>
              <span className="font-bold text-amber-500">Rank {rankLevel} ({user.rankTitle || 'Representative'})</span>
            </div>
          )}
          {module && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-400">Required Module Permission</span>
              <span className="font-mono text-blue-500 font-bold">{module} ({action})</span>
            </div>
          )}
        </Card>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Go Back
          </Button>
          <Button
            variant="accent"
            size="sm"
            pill
            onClick={() => navigate(getDashboardPath())}
            className="font-bold bg-blue-600 text-white"
          >
            <LayoutDashboard className="w-4 h-4 mr-1.5" /> Return to My Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
