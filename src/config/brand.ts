export interface BrandConfig {
  brandName: string
  shortName: string
  tagline: string
  description: string
  contactEmail: string
  phone: string
  headquarters: string
  portalName: string
}

export const brandConfig: BrandConfig = {
  brandName: "OAL Network",
  shortName: "OAL",
  tagline: "The Connection for Small Business Solutions",
  description: "Bridging ambitious small businesses with institutional capital, revenue-based funding, strategic advisory, and automated financial growth intelligence.",
  contactEmail: "advisory@oalnetwork.com",
  phone: "+1 (888) 540-OALN",
  headquarters: "Financial District, New York, NY",
  portalName: "OAL Client Terminal",
}

export { BrandLogo } from './BrandLogo'
export type { BrandLogoProps } from './BrandLogo'
