import React from 'react'
import { brandConfig } from './brand'

export interface BrandLogoProps {
  className?: string
  showTagline?: boolean
  size?: 'sm' | 'md' | 'lg'
  iconOnly?: boolean
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  showTagline = false,
  size = 'md',
  iconOnly = false,
}) => {
  const sizeMap = {
    sm: { icon: 'h-7 w-7', text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'h-9 w-9', text: 'text-xl', sub: 'text-[11px]' },
    lg: { icon: 'h-12 w-12', text: 'text-2xl', sub: 'text-xs' },
  }

  const currentSize = sizeMap[size]

  return (
    <div className={`flex items-center gap-2.5 font-heading select-none ${className}`}>
      {/* Dynamic Geometric Brand Mark */}
      <div
        className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 shadow-md shadow-blue-500/20 text-white font-bold tracking-tight ${currentSize.icon}`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5/6 h-5/6 drop-shadow-sm"
        >
          {/* Interlocking nodes representing connection & small business solutions */}
          <circle cx="6" cy="18" r="3" fill="currentColor" fillOpacity="0.2" />
          <circle cx="18" cy="6" r="3" fill="currentColor" fillOpacity="0.2" />
          <path d="M8.5 15.5l7-7" />
          <path d="M12 4a8 8 0 0 1 8 8" strokeDasharray="2 2" strokeOpacity="0.6" />
          <circle cx="18" cy="18" r="2.5" fill="#10B981" />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col text-left leading-tight">
          <span className={`font-extrabold tracking-tight text-slate-900 dark:text-white ${currentSize.text}`}>
            {brandConfig.brandName}
          </span>
          {showTagline && (
            <span className={`text-slate-500 dark:text-slate-400 font-medium tracking-normal ${currentSize.sub}`}>
              {brandConfig.tagline}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
