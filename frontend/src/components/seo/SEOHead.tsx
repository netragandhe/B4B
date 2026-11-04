import React, { useEffect } from 'react'
import { brandConfig } from '@/config/brand'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  canonicalUrl?: string
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
}) => {
  const fullTitle = title
    ? `${title} | ${brandConfig.brandName}`
    : `${brandConfig.brandName} — ${brandConfig.tagline}`

  const metaDesc =
    description ||
    'B4B Network connects small businesses with institutional non-dilutive credit lines, fractional CFO advisory, and eBOX vault repository.'

  useEffect(() => {
    document.title = fullTitle
  }, [fullTitle])

  return null
}
