export interface BrandConfig {
  brandName: string
  shortName: string
  tagline: string
  description: string
  contactEmail: string
  phone: string
  headquarters: string
  portalName: string
  colors: {
    primary: string
    primaryDark: string
    accent: string
    accentDark: string
  }
  logos: {
    full: string
    fullSvg: string
    wordmark: string
    icon: string
    darkWordmark: string
  }
}

export const brandConfig: BrandConfig = {
  brandName: 'B4B America',
  shortName: 'B4B',
  tagline: 'The Connection for Small Business Solutions',
  description:
    'Bridging ambitious small businesses with institutional capital, revenue-based funding, strategic advisory, B2B sales networks, and corporate talent.',
  contactEmail: 'advisory@b4bamerica.com',
  phone: '+1 (888) 540-B4BA',
  headquarters: 'Financial District, New York, NY',
  portalName: 'B4B America Portal',
  colors: {
    primary: '#1D4ED8',
    primaryDark: '#0B1F3A',
    accent: '#F5B301',
    accentDark: '#14305E',
  },
  logos: {
    full: '/brand/logo-full.png',
    fullSvg: '/brand/logo-full.png',
    wordmark: '/brand/logo-full.png',
    icon: '/brand/logo-full.png',
    darkWordmark: '/brand/logo-full.png',
  },
}

export { BrandLogo } from './BrandLogo'
export type { BrandLogoProps } from './BrandLogo'
