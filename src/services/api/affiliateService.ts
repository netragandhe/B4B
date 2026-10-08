import {
  AFFILIATE_METRICS,
  MONTHLY_PERFORMANCE,
  UNIQUE_LINKS,
  REFERRALS_DATA,
  COMMISSIONS_PAYOUTS,
  MARKETING_MATERIALS,
  PARTNER_PROFILE,
  type AffiliateMetrics,
  type MonthlyPerformancePoint,
  type UniqueLink,
  type ReferralItem,
  type CommissionPayout,
  type MarketingAsset,
  type PartnerProfile,
} from '@/mock-data/affiliateData'
import { simulateApiCall, type ApiResponse } from './apiClient'

// In-memory state copies so mutations reflect during the user's interactive session
let localLinks = [...UNIQUE_LINKS]
let localReferrals = [...REFERRALS_DATA]
let localProfile = { ...PARTNER_PROFILE }
let localMetrics = { ...AFFILIATE_METRICS }
let localPayouts = [...COMMISSIONS_PAYOUTS]

export const affiliateService = {
  async getMetrics(): Promise<ApiResponse<AffiliateMetrics>> {
    return simulateApiCall(() => ({ ...localMetrics }))
  },

  async getPerformance(): Promise<ApiResponse<MonthlyPerformancePoint[]>> {
    return simulateApiCall(() => [...MONTHLY_PERFORMANCE])
  },

  async getLinks(): Promise<ApiResponse<UniqueLink[]>> {
    return simulateApiCall(() => [...localLinks])
  },

  async createLink(newLink: {
    title: string
    category: UniqueLink['category']
    targetUrl: string
    slug: string
    utmCampaign: string
  }): Promise<ApiResponse<UniqueLink>> {
    return simulateApiCall(() => {
      const created: UniqueLink = {
        id: `link-${Date.now()}`,
        title: newLink.title,
        category: newLink.category,
        targetUrl: newLink.targetUrl,
        shortUrl: `https://oal.link/${newLink.slug}`,
        slug: newLink.slug,
        utmCampaign: newLink.utmCampaign,
        clicks: 0,
        leads: 0,
        conversions: 0,
        earnings: 0,
        createdAt: 'Just now',
        status: 'Active',
      }
      localLinks = [created, ...localLinks]
      localMetrics.activeLinksCount += 1
      return created
    })
  },

  async getReferrals(params?: { status?: string; search?: string }): Promise<ApiResponse<ReferralItem[]>> {
    return simulateApiCall(() => {
      let filtered = [...localReferrals]
      if (params?.status && params.status !== 'All') {
        filtered = filtered.filter((item) => item.status === params.status)
      }
      if (params?.search) {
        const q = params.search.toLowerCase()
        filtered = filtered.filter(
          (item) =>
            item.companyName.toLowerCase().includes(q) ||
            item.contactName.toLowerCase().includes(q) ||
            item.solutionNeeded.toLowerCase().includes(q)
        )
      }
      return filtered
    })
  },

  async submitLead(newLead: {
    companyName: string
    contactName: string
    contactEmail: string
    contactPhone: string
    solutionNeeded: string
    dealSize: number
    notes: string
    trackingSlug?: string
  }): Promise<ApiResponse<ReferralItem>> {
    return simulateApiCall(() => {
      const estimatedCommission = Math.round(newLead.dealSize * 0.005) // Indicative commission
      const created: ReferralItem = {
        id: `ref-${Date.now().toString().slice(-4)}`,
        companyName: newLead.companyName,
        contactName: newLead.contactName,
        contactEmail: newLead.contactEmail,
        contactPhone: newLead.contactPhone,
        solutionNeeded: newLead.solutionNeeded,
        dealSize: newLead.dealSize,
        commissionEarned: estimatedCommission,
        submissionDate: 'Today',
        lastUpdated: 'Today',
        status: 'Lead In Review',
        notes: newLead.notes || 'Submitted via Partner Lead Intake Terminal',
        trackingSlug: newLead.trackingSlug || 'direct-portal',
      }
      localReferrals = [created, ...localReferrals]
      localMetrics.totalLeads += 1
      return created
    })
  },

  async getCommissions(): Promise<ApiResponse<CommissionPayout[]>> {
    return simulateApiCall(() => [...localPayouts])
  },

  async requestPayout(): Promise<ApiResponse<{ payoutId: string; message: string }>> {
    return simulateApiCall(() => {
      if (localMetrics.pendingPayout <= 0) {
        throw new Error('No pending payout balance currently available.')
      }
      const newPayout: CommissionPayout = {
        id: `payout-${Date.now()}`,
        payoutPeriod: 'Current Accrued Balance',
        amount: localMetrics.pendingPayout,
        payoutDate: 'Next Business Day',
        payoutMethod: 'Direct Deposit (ACH)',
        referenceNumber: `ACH-${Date.now().toString().slice(-8)}`,
        status: 'Processing',
        statementUrl: '#statement-instant',
        dealsIncludedCount: 2,
      }
      localPayouts = [newPayout, ...localPayouts]
      localMetrics.paidOut += localMetrics.pendingPayout
      localMetrics.pendingPayout = 0
      return {
        payoutId: newPayout.id,
        message: 'Direct deposit disbursement queued successfully.',
      }
    })
  },

  async getMarketingAssets(category?: string): Promise<ApiResponse<MarketingAsset[]>> {
    return simulateApiCall(() => {
      if (!category || category === 'All') return [...MARKETING_MATERIALS]
      return MARKETING_MATERIALS.filter((asset) => asset.category === category)
    })
  },

  async getProfile(): Promise<ApiResponse<PartnerProfile>> {
    return simulateApiCall(() => ({ ...localProfile }))
  },

  async updateProfile(updates: Partial<PartnerProfile>): Promise<ApiResponse<PartnerProfile>> {
    return simulateApiCall(() => {
      localProfile = { ...localProfile, ...updates }
      return { ...localProfile }
    })
  },
}
