import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ShieldAlert, ArrowLeft, LayoutDashboard, KeyRound } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SEOHead } from '@/components/seo/SEOHead'

interface Forbidden403Props {
  requiredMenu?: string
  requiredRole?: string
  requiredAction?: string
}

export const Forbidden403Page: React.FC<Forbidden403Props> = ({
  requiredMenu,
  requiredRole,
  requiredAction = 'view',
}) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const getDashboardPath = () => {
    switch (user?.role) {
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
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <SEOHead
        title="403 Access Denied | B4B Portal"
        description="Restricted corporate role permissions."
      />

      <div className="max-w-lg w-full text-center space-y-6 animate-scaleUp">
        <div className="p-4 rounded-3xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 w-fit mx-auto shadow-xl ring-8 ring-rose-50 dark:ring-rose-950/20">
          <ShieldAlert className="w-14 h-14" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-extrabold uppercase tracking-wider">
            <KeyRound className="w-3.5 h-3.5" />
            <span>403 Access Forbidden</span>
          </div>

          <h1 className="text-3xl font-black font-heading text-slate-900 dark:text-white tracking-tight">
            Permission Restricted
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
            Your current role does not have authorization to view this page or perform this action.
            Access policies are actively enforced by administrative RBAC security matrix.
          </p>
        </div>

        <Card
          variant="default"
          className="p-5 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] text-xs text-slate-600 dark:text-slate-300 space-y-3 text-left shadow-sm rounded-2xl"
        >
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
            <span className="font-semibold text-slate-400">Authenticated User</span>
            <span className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
              {user?.name || 'Anonymous Session'}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
            <span className="font-semibold text-slate-400">Assigned Role</span>
            <Badge variant="navy" size="sm">
              {user?.role || 'Guest'}
            </Badge>
          </div>

          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
            <span className="font-semibold text-slate-400">Attempted Route</span>
            <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded truncate max-w-[220px]">
              {location.pathname}
            </span>
          </div>

          {(requiredMenu || requiredAction !== 'view') && (
            <div className="flex items-center justify-between pt-1">
              <span className="font-semibold text-slate-400">Required Permission</span>
              <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">
                {requiredMenu || 'Menu'} ({requiredAction})
              </span>
            </div>
          )}
        </Card>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="font-semibold">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Go Back
          </Button>
          <Button
            variant="accent"
            size="sm"
            pill
            onClick={() => navigate(getDashboardPath())}
            className="font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
          >
            <LayoutDashboard className="w-4 h-4 mr-1.5" /> Return to My Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
