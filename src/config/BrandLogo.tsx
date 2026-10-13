import React from 'react'
import { brandConfig } from './brand'

export interface BrandLogoProps {
  className?: string
  variant?: 'full' | 'wordmark' | 'icon' | 'fullSvg'
  theme?: 'auto' | 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  showTagline?: boolean
  onClick?: () => void
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'wordmark',
  theme = 'auto',
  size = 'md',
  showTagline = false,
  onClick,
}) => {
  const badgeSizeMap = {
    sm: 'w-10 h-10 p-[2px]',
    md: 'w-13 h-13 sm:w-15 sm:h-15 p-[2.5px]',
    lg: 'w-16 h-16 sm:w-18 sm:h-18 p-[3px]',
    xl: 'w-20 h-20 sm:w-22 sm:h-22 p-[3.5px]',
    hero: 'w-24 h-24 sm:w-28 sm:h-28 p-[4px]',
  }

  const badgeClass = badgeSizeMap[size] || badgeSizeMap.md
  const isIconOnly = variant === 'icon'

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none transition-all ${
        onClick ? 'cursor-pointer hover:opacity-95' : ''
      } ${className}`}
    >
      {/* ROUND LOGO BADGE */}
      <div
        className={`${badgeClass} rounded-full bg-[linear-gradient(to_bottom,#FFC911_50%,#013CA0_50%)] shadow-sm shrink-0 flex items-center justify-center`}
      >
        <div className="w-full h-full rounded-full bg-white p-1 flex items-center justify-center">
          <img
            src="/brand/logo-full.png"
            alt={`${brandConfig.brandName} logo`}
            loading="eager"
            className="w-full h-full object-contain shrink-0"
          />
        </div>
      </div>

      {!isIconOnly && (
        <div className="flex flex-col">
          <span className="font-extrabold text-sm sm:text-base tracking-tight leading-none text-slate-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
            B4B <span className="text-[#013CA0] dark:text-[#FFC911]">AMERICA</span>
          </span>
          {showTagline && (
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5 tracking-tight">
              {brandConfig.tagline}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export const Logo = BrandLogo
