import React, { useState } from 'react'

interface PhotoBackgroundProps {
  slot: 'hero' | 'solutions' | 'b4bapp' | 'philosophy' | 'industries' | 'contact'
  src?: string
  alt: string
  overlayOpacity?: number // 0.60 to 0.75 per requirement
  isPriority?: boolean // hero is eager, others lazy-loaded
  className?: string
  children?: React.ReactNode
}

const SLOT_PATHS: Record<string, string> = {
  hero: '/content/images/hero-storefront.webp',
  solutions: '/content/images/solutions-texture.webp',
  b4bapp: '/content/images/b4bapp-dashboard.webp',
  philosophy: '/content/images/philosophy-owner.webp',
  industries: '/content/images/industries-strip.webp',
  contact: '/content/images/contact-coach.webp',
}

export const PhotoBackground: React.FC<PhotoBackgroundProps> = ({
  slot,
  src,
  alt,
  overlayOpacity = 0.68,
  isPriority = false,
  className = '',
  children,
}) => {
  const [imageError, setImageError] = useState(false)
  const imageSrc = src || SLOT_PATHS[slot]

  // Million-Dollar Navy Gradient Fallback architecture when photograph is pending client upload
  const defaultNavyGradient =
    slot === 'contact'
      ? 'linear-gradient(135deg, #0D2147 0%, #07142B 100%)'
      : slot === 'philosophy'
      ? 'linear-gradient(135deg, #07142B 0%, #0D2147 100%)'
      : 'linear-gradient(135deg, #07142B 0%, #0D2147 60%, #07142B 100%)'

  return (
    <div className={`relative overflow-hidden bg-[#07142B] ${className}`}>
      {/* 1. Base Navy Gradient Architecture (present under image and overlay) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: defaultNavyGradient,
          zIndex: 1,
        }}
      />

      {/* 2. Background Image Layer (Real photo only, never AI-generated, supplied by client in src/content/images/) */}
      {!imageError && imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          loading={isPriority ? 'eager' : 'lazy'}
          decoding={isPriority ? 'sync' : 'async'}
          onError={() => setImageError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          style={{ zIndex: 2 }}
        />
      )}

      {/* 3. Midnight Navy (#07142B) 60-75% Overlay Layer ensuring WCAG AA Contrast */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundColor: '#07142B',
          opacity: overlayOpacity,
          zIndex: 3,
        }}
      />

      {/* 4. Content Viewport */}
      <div className="relative w-full" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  )
}
