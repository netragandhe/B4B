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
  const heightMap = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-12',
    lg: 'h-13 sm:h-14',
    xl: 'h-16 sm:h-18',
    hero: 'h-20 sm:h-24',
  }

  const heightClass = heightMap[size] || heightMap.md

  // Always use the official full B4B America logo
  const logoSrc = brandConfig.logos.full

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col items-start select-none transition-all ${onClick ? 'cursor-pointer hover:opacity-95' : ''} ${className}`}
    >
      <img
        src={logoSrc}
        alt={`${brandConfig.brandName} logo`}
        loading="eager"
        className={`${heightClass} w-auto object-contain shrink-0`}
      />
      {showTagline && (
        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5 tracking-tight">
          {brandConfig.tagline}
        </span>
      )}
    </div>
  )
}

export const Logo = BrandLogo
