import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ShieldAlert, ArrowLeft, LayoutDashboard, KeyRound } from 'lucide-react'
import { useAuth, UserRole } from '@/hooks/useAuth'
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
  const { user, switchRole } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const getTargetRole = (): UserRole => {
    if (requiredRole) {
      const parts = requiredRole.split(',').map((r) => r.trim() as UserRole)
      const nonAdmin = parts.find((r) => r !== 'Admin')
      if (nonAdmin && ['Client', 'Admin', 'Biz Pro', 'Affiliate', 'Employer', 'Job Seeker'].includes(nonAdmin)) {
        return nonAdmin
      }
      if (parts[0] && ['Client', 'Admin', 'Biz Pro', 'Affiliate', 'Employer', 'Job Seeker'].includes(parts[0])) {
        return parts[0]
      }
    }
    const path = location.pathname.toLowerCase()
    if (path.startsWith('/portal/employer')) return 'Employer'
    if (path.startsWith('/portal/bizpro')) return 'Biz Pro'
    if (path.startsWith('/portal/client')) return 'Client'
    if (path.startsWith('/portal/affiliate')) return 'Affiliate'
    if (path.startsWith('/portal/seeker')) return 'Job Seeker'
    if (path.startsWith('/portal/admin')) return 'Admin'
    return 'Admin'
  }

  const targetRole = getTargetRole()

  const handleSwitchAndOpen = (roleToSwitch: UserRole) => {
    switchRole(roleToSwitch)
    // Small delay to allow context state to update before navigation
    setTimeout(() => {
      navigate(location.pathname)
    }, 50)
  }

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
        return '/portal/seeker/dashboard'
      default:
        return '/portal/dashboard'
    }
  }

  const roleOptionsList: { role: UserRole; label: string; icon: string }[] = [
    { role: 'Admin', label: 'Super Admin', icon: '🛡️' },
    { role: 'Biz Pro', label: 'B4B Coach', icon: '📢' },
    { role: 'Client', label: 'SME Client', icon: '🏢' },
    { role: 'Affiliate', label: 'Affiliate Partner', icon: '🤝' },
    { role: 'Employer', label: 'Employer', icon: '👔' },
    { role: 'Job Seeker', label: 'Job Seeker', icon: '💼' },
  ]

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <SEOHead
        title="403 Access Denied | B4B Portal"
        description="Restricted corporate role permissions."
      />

      <div className="max-w-xl w-full text-center space-y-6 animate-scaleUp">
        <div className="p-4 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-[#C8793A] w-fit mx-auto shadow-xl ring-8 ring-amber-50 dark:ring-amber-950/20">
          <ShieldAlert className="w-14 h-14" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-[#C8793A] text-xs font-extrabold uppercase tracking-wider">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Role Switch Required</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white tracking-tight">
            Dashboard Role Mismatch
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
            You are logged in as <strong className="text-slate-900 dark:text-white font-bold">{user?.role || 'Guest'}</strong>, but this page requires <strong className="text-[#0E7A5A] font-bold">{targetRole}</strong> role permissions.
          </p>
        </div>

        {/* 1-Click Instant Role Switch CTA Button */}
        <div className="p-4 rounded-2xl bg-[#0E7A5A]/10 dark:bg-[#0B4A3A]/30 border border-[#0E7A5A]/30 dark:border-[#0B4A3A] space-y-3">
          <div className="text-xs font-bold text-[#0E7A5A] dark:text-[#10B981]">
            Switch role to access this dashboard directly:
          </div>
          <Button
            size="md"
            onClick={() => handleSwitchAndOpen(targetRole)}
            className="w-full justify-center font-bold bg-[#0E7A5A] hover:bg-[#0B4A3A] text-white shadow-lg shadow-emerald-950/30 cursor-pointer text-xs sm:text-sm py-2.5"
          >
            Switch to {targetRole} & Continue
          </Button>
        </div>

        <Card
          variant="default"
          className="p-5 bg-white dark:bg-[#06201A] border border-slate-200 dark:border-[#0B4A3A] text-xs text-slate-600 dark:text-slate-300 space-y-3 text-left shadow-sm rounded-2xl"
        >
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-[#0B4A3A]">
            <span className="font-semibold text-slate-400">Authenticated User</span>
            <span className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
              {user?.name || 'Anonymous Session'}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-[#0B4A3A]">
            <span className="font-semibold text-slate-400">Current Role</span>
            <Badge variant="navy" size="sm">
              {user?.role || 'Guest'}
            </Badge>
          </div>

          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-[#0B4A3A]">
            <span className="font-semibold text-slate-400">Attempted Route</span>
            <span className="font-mono text-[11px] text-[#0E7A5A] dark:text-[#10B981] bg-[#0E7A5A]/10 dark:bg-[#0B4A3A]/60 px-2 py-0.5 rounded truncate max-w-[220px]">
              {location.pathname}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-semibold text-slate-400">Required Role</span>
            <span className="font-mono text-[#0E7A5A] dark:text-[#10B981] font-bold">
              {targetRole}
            </span>
          </div>
        </Card>

        {/* Quick Demo Switcher Grid */}
        <div className="space-y-2 pt-1 text-left">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
            Or switch to any demo role:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {roleOptionsList.map((item) => (
              <button
                key={item.role}
                onClick={() => {
                  switchRole(item.role)
                  setTimeout(() => {
                    navigate(item.role === 'Admin' ? '/portal/admin/dashboard' : item.role === 'Biz Pro' ? '/portal/bizpro/bulletin' : item.role === 'Client' ? '/portal/client/dashboard' : item.role === 'Affiliate' ? '/portal/affiliate/dashboard' : item.role === 'Employer' ? '/portal/employer/dashboard' : '/portal/seeker/dashboard')
                  }, 50)
                }}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  user?.role === item.role
                    ? 'bg-[#0E7A5A] text-white border-[#0E7A5A]'
                    : 'bg-slate-50 dark:bg-[#0B2B22] border-slate-200 dark:border-[#0B4A3A] text-slate-700 dark:text-slate-300 hover:border-[#0E7A5A]'
                }`}
              >
                <span>{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="font-semibold">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Go Back
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(getDashboardPath())}
            className="font-bold border-slate-300 dark:border-[#0B4A3A] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0B4A3A]"
          >
            <LayoutDashboard className="w-4 h-4 mr-1.5" /> Return to My Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
