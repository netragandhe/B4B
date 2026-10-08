import React from 'react'
import { Lock } from 'lucide-react'
import { AppModule, PermissionAction } from '@/config/permissions'
import { usePermission } from '@/hooks/usePermission'

interface CanProps {
  module: AppModule
  action?: PermissionAction
  disabledWithTooltip?: boolean
  tooltipText?: string
  children: React.ReactNode
}

export const Can: React.FC<CanProps> = ({
  module,
  action = 'view',
  disabledWithTooltip = false,
  tooltipText,
  children,
}) => {
  const { can } = usePermission()
  const isAllowed = can(module, action)

  if (isAllowed) {
    return <>{children}</>
  }

  if (disabledWithTooltip) {
    const label = tooltipText || `Permission required (${action} ${module})`
    return (
      <div className="relative group inline-block cursor-not-allowed opacity-60 pointer-events-none" title={label}>
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 text-white text-[10px] font-bold shadow-lg z-50 whitespace-nowrap border border-slate-700">
          <Lock className="w-3 h-3 text-amber-400" />
          <span>{label}</span>
        </div>
        {children}
      </div>
    )
  }

  return null
}
