import React from 'react'
import { Helmet } from 'react-helmet-async'
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
    'OAL Network connects small businesses with 16 core solutions: non-dilutive business loans, building business credit, fractional CFO advisory, payment processing, branding, and marketing.'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
    </Helmet>
  )
}
