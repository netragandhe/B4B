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

  const defaultGradient =
    slot === 'contact'
      ? 'linear-gradient(135deg, #0E7A5A 0%, #06201A 100%)'
      : slot === 'philosophy'
      ? 'linear-gradient(135deg, #0B4A3A 0%, #06201A 100%)'
      : 'linear-gradient(135deg, #06201A 0%, #0B4A3A 60%, #06201A 100%)'

  return (
    <div className={`relative overflow-hidden bg-[#06201A] ${className}`}>
      {/* 1. Base Dark Green Gradient (always present under image and overlay) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: defaultGradient,
          zIndex: 1,
        }}
      />

      {/* 2. Background Image Layer (Real photo only, never AI-generated) */}
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

      {/* 3. Forest Black (#06201A) 60-75% Overlay Layer ensuring WCAG AA Contrast */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundColor: '#06201A',
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

