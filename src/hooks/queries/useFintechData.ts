import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fintechService } from '@/services/api/fintechService'

export const FINTECH_QUERY_KEYS = {
  metrics: ['fintech', 'metrics'] as const,
  revenueHistory: ['fintech', 'revenueHistory'] as const,
  cashFlowForecast: ['fintech', 'cashFlowForecast'] as const,
  facilities: ['fintech', 'facilities'] as const,
  sessions: ['fintech', 'sessions'] as const,
  documents: ['fintech', 'documents'] as const,
}

export function useFinancialMetrics() {
  return useQuery({
    queryKey: FINTECH_QUERY_KEYS.metrics,
    queryFn: async () => {
      const res = await fintechService.getMetrics()
      return res.data
    },
  })
}

export function useRevenueHistory() {
  return useQuery({
    queryKey: FINTECH_QUERY_KEYS.revenueHistory,
    queryFn: async () => {
      const res = await fintechService.getRevenueHistory()
      return res.data
    },
  })
}

export function useCashFlowForecast() {
  return useQuery({
    queryKey: FINTECH_QUERY_KEYS.cashFlowForecast,
    queryFn: async () => {
      const res = await fintechService.getCashFlowForecast()
      return res.data
    },
  })
}

export function useCapitalFacilities() {
  return useQuery({
    queryKey: FINTECH_QUERY_KEYS.facilities,
    queryFn: async () => {
      const res = await fintechService.getFacilities()
      return res.data
    },
  })
}

export function useExecuteDraw() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ facilityId, amount }: { facilityId: string; amount: number }) => {
      const res = await fintechService.executeDraw(facilityId, amount)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FINTECH_QUERY_KEYS.facilities })
      queryClient.invalidateQueries({ queryKey: FINTECH_QUERY_KEYS.metrics })
    },
  })
}

export function useConsultationSessions() {
  return useQuery({
    queryKey: FINTECH_QUERY_KEYS.sessions,
    queryFn: async () => {
      const res = await fintechService.getSessions()
      return res.data
    },
  })
}

export function useApplicationDocuments() {
  return useQuery({
    queryKey: FINTECH_QUERY_KEYS.documents,
    queryFn: async () => {
      const res = await fintechService.getDocuments()
      return res.data
    },
  })
}
