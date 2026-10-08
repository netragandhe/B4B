import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bizProService } from '@/services/api/bizProService'
import type { BizProLead } from '@/mock-data/bizProData'

export const BIZPRO_QUERY_KEYS = {
  dashboard: ['bizpro', 'dashboard'] as const,
  ranks: ['bizpro', 'ranks'] as const,
  leads: (stage?: string) => ['bizpro', 'leads', stage] as const,
  clients: ['bizpro', 'clients'] as const,
  clientDetail: (id: string) => ['bizpro', 'client', id] as const,
  downline: ['bizpro', 'downline'] as const,
  commissions: ['bizpro', 'commissions'] as const,
  recruits: ['bizpro', 'recruits'] as const,
}

export function useBizProDashboard() {
  return useQuery({
    queryKey: BIZPRO_QUERY_KEYS.dashboard,
    queryFn: async () => {
      const res = await bizProService.getDashboardData()
      return res.data
    },
  })
}

export function useBizProRanks() {
  return useQuery({
    queryKey: BIZPRO_QUERY_KEYS.ranks,
    queryFn: async () => {
      const res = await bizProService.getRanks()
      return res.data
    },
  })
}

export function useBizProLeads(stage?: string) {
  return useQuery({
    queryKey: BIZPRO_QUERY_KEYS.leads(stage),
    queryFn: async () => {
      const res = await bizProService.getLeads(stage)
      return res.data
    },
  })
}

export function useCreateBizProLead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Omit<BizProLead, 'id' | 'createdAt' | 'lastActivity'>) => {
      const res = await bizProService.createLead(payload)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bizpro', 'leads'] })
      queryClient.invalidateQueries({ queryKey: BIZPRO_QUERY_KEYS.dashboard })
    },
  })
}

export function useUpdateLeadStage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, stage }: { id: string; stage: BizProLead['stage'] }) => {
      const res = await bizProService.updateLeadStage(id, stage)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bizpro', 'leads'] })
      queryClient.invalidateQueries({ queryKey: BIZPRO_QUERY_KEYS.dashboard })
    },
  })
}

export function useBizProClients() {
  return useQuery({
    queryKey: BIZPRO_QUERY_KEYS.clients,
    queryFn: async () => {
      const res = await bizProService.getClients()
      return res.data
    },
  })
}

export function useBizProClientDetail(id: string) {
  return useQuery({
    queryKey: BIZPRO_QUERY_KEYS.clientDetail(id),
    queryFn: async () => {
      const res = await bizProService.getClientById(id)
      return res.data
    },
    enabled: !!id,
  })
}

export function useBizProDownline() {
  return useQuery({
    queryKey: BIZPRO_QUERY_KEYS.downline,
    queryFn: async () => {
      const res = await bizProService.getDownlineTree()
      return res.data
    },
  })
}

export function useBizProCommissions() {
  return useQuery({
    queryKey: BIZPRO_QUERY_KEYS.commissions,
    queryFn: async () => {
      const res = await bizProService.getCommissions()
      return res.data
    },
  })
}

export function useBizProRecruits() {
  return useQuery({
    queryKey: BIZPRO_QUERY_KEYS.recruits,
    queryFn: async () => {
      const res = await bizProService.getRecruitInvites()
      return res.data
    },
  })
}

export function useSendRecruitInvite() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: {
      candidateName: string
      email: string
      region: string
      sponsorCode: string
    }) => {
      const res = await bizProService.sendRecruitInvite(payload)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BIZPRO_QUERY_KEYS.recruits })
    },
  })
}
