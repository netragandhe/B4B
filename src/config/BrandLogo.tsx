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
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-11',
    xl: 'h-14',
    hero: 'h-24 sm:h-32',
  }

  const heightClass = heightMap[size] || heightMap.md

  // Determine logo source
  let logoSrc = brandConfig.logos.wordmark
  if (variant === 'full') {
    logoSrc = brandConfig.logos.full
  } else if (variant === 'fullSvg') {
    logoSrc = brandConfig.logos.fullSvg
  } else if (variant === 'icon') {
    logoSrc = brandConfig.logos.icon
  } else if (variant === 'wordmark') {
    if (theme === 'dark') {
      logoSrc = brandConfig.logos.darkWordmark
    } else {
      logoSrc = brandConfig.logos.wordmark
    }
  }

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
