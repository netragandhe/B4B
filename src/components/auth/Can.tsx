import React from 'react'
import { Lock } from 'lucide-react'
import { PermissionAction } from '@/lib/rbac/types'
import { usePermission } from '@/hooks/usePermission'

export interface CanProps {
  menuId?: string
  module?: string // legacy fallback
  action?: PermissionAction
  fallback?: React.ReactNode
  disableInstead?: boolean
  tooltip?: string
  children: React.ReactNode
}

export const Can: React.FC<CanProps> = ({
  menuId,
  module,
  action = 'view',
  fallback = null,
  disableInstead = false,
  tooltip,
  children,
}) => {
  const { can } = usePermission()

  const targetId = menuId || module || ''
  const isAllowed = targetId ? can(targetId, action) : true

  if (isAllowed) {
    return <>{children}</>
  }

  if (disableInstead) {
    const tooltipText = tooltip || `Action restricted: ${action.toUpperCase()} permission required for current role`
    return (
      <div
        className="relative group inline-flex items-center cursor-not-allowed opacity-50 select-none"
        title={tooltipText}
      >
        <div className="pointer-events-none">{children}</div>
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 text-white text-[10px] font-bold shadow-xl z-50 whitespace-nowrap border border-slate-700">
          <Lock className="w-3 h-3 text-amber-400" />
          <span>{tooltipText}</span>
        </div>
      </div>
    )
  }

  if (fallback !== null && fallback !== undefined) {
    return <>{fallback}</>
  }

  return null
}
