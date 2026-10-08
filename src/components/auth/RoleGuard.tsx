import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldAlert, RefreshCw, ArrowLeft } from 'lucide-react'
import { useAuth, UserRole, DEMO_PROFILES } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

interface RoleGuardProps {
  allowedRoles?: UserRole[]
  children: React.ReactNode
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const { user, switchRole } = useAuth()

  if (!allowedRoles || allowedRoles.length === 0 || (user && allowedRoles.includes(user.role))) {
    return <>{children}</>
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card variant="bento" className="max-w-lg w-full p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div>
          <Badge variant="amber" size="sm" className="mb-2">
            Role Access Restriction
          </Badge>
          <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
            Access Restricted to Authorized Roles
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            You are currently viewing as <span className="font-bold text-slate-800 dark:text-slate-200">{user?.role}</span> ({user?.name}). This section requires one of the following roles:
          </p>

          <div className="flex flex-wrap justify-center gap-1.5 mt-3">
            {allowedRoles.map((role) => (
              <span
                key={role}
                className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Role Switcher for Demo */}
        <div className="pt-4 border-t border-slate-100 dark:border-[#1E3A5F] space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Demo Preview: Switch Role Instantly
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {allowedRoles.map((role) => (
              <Button
                key={role}
                size="sm"
                variant="outline"
                onClick={() => switchRole(role)}
                leftIcon={<RefreshCw className="w-3 h-3 text-blue-500" />}
                className="text-xs justify-start"
              >
                Switch to {role}
              </Button>
            ))}
          </div>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <Link to="/portal/dashboard">
            <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Return to My Dashboard
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
