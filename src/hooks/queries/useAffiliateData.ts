import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { affiliateService } from '@/services/api/affiliateService'
import type { UniqueLink, ReferralItem, PartnerProfile } from '@/mock-data/affiliateData'

export const AFFILIATE_QUERY_KEYS = {
  metrics: ['affiliate', 'metrics'] as const,
  performance: ['affiliate', 'performance'] as const,
  links: ['affiliate', 'links'] as const,
  referrals: (params?: { status?: string; search?: string }) =>
    ['affiliate', 'referrals', params] as const,
  commissions: ['affiliate', 'commissions'] as const,
  marketingAssets: (category?: string) =>
    ['affiliate', 'marketingAssets', category] as const,
  profile: ['affiliate', 'profile'] as const,
}

export function useAffiliateMetrics() {
  return useQuery({
    queryKey: AFFILIATE_QUERY_KEYS.metrics,
    queryFn: async () => {
      const res = await affiliateService.getMetrics()
      return res.data
    },
  })
}

export function useAffiliatePerformance() {
  return useQuery({
    queryKey: AFFILIATE_QUERY_KEYS.performance,
    queryFn: async () => {
      const res = await affiliateService.getPerformance()
      return res.data
    },
  })
}

export function useAffiliateLinks() {
  return useQuery({
    queryKey: AFFILIATE_QUERY_KEYS.links,
    queryFn: async () => {
      const res = await affiliateService.getLinks()
      return res.data
    },
  })
}

export function useCreateAffiliateLink() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: {
      title: string
      category: UniqueLink['category']
      targetUrl: string
      slug: string
      utmCampaign: string
    }) => {
      const res = await affiliateService.createLink(payload)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AFFILIATE_QUERY_KEYS.links })
      queryClient.invalidateQueries({ queryKey: AFFILIATE_QUERY_KEYS.metrics })
    },
  })
}

export function useReferrals(params?: { status?: string; search?: string }) {
  return useQuery({
    queryKey: AFFILIATE_QUERY_KEYS.referrals(params),
    queryFn: async () => {
      const res = await affiliateService.getReferrals(params)
      return res.data
    },
  })
}

export function useSubmitLead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: {
      companyName: string
      contactName: string
      contactEmail: string
      contactPhone: string
      solutionNeeded: string
      dealSize: number
      notes: string
      trackingSlug?: string
    }) => {
      const res = await affiliateService.submitLead(payload)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['affiliate', 'referrals'] })
      queryClient.invalidateQueries({ queryKey: AFFILIATE_QUERY_KEYS.metrics })
    },
  })
}

export function useCommissions() {
  return useQuery({
    queryKey: AFFILIATE_QUERY_KEYS.commissions,
    queryFn: async () => {
      const res = await affiliateService.getCommissions()
      return res.data
    },
  })
}

export function useRequestPayout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      const res = await affiliateService.requestPayout()
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AFFILIATE_QUERY_KEYS.commissions })
      queryClient.invalidateQueries({ queryKey: AFFILIATE_QUERY_KEYS.metrics })
    },
  })
}

export function useMarketingAssets(category?: string) {
  return useQuery({
    queryKey: AFFILIATE_QUERY_KEYS.marketingAssets(category),
    queryFn: async () => {
      const res = await affiliateService.getMarketingAssets(category)
      return res.data
    },
  })
}

export function usePartnerProfile() {
  return useQuery({
    queryKey: AFFILIATE_QUERY_KEYS.profile,
    queryFn: async () => {
      const res = await affiliateService.getProfile()
      return res.data
    },
  })
}

export function useUpdatePartnerProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (updates: Partial<PartnerProfile>) => {
      const res = await affiliateService.updateProfile(updates)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AFFILIATE_QUERY_KEYS.profile })
    },
  })
}
