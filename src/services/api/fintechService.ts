import {
  FINANCIAL_METRICS,
  REVENUE_HISTORY,
  CASH_FLOW_FORECAST,
  CAPITAL_FACILITIES,
  CONSULTATION_SESSIONS,
  APPLICATION_DOCUMENTS,
  type CapitalFacility,
  type ConsultationSession,
  type ApplicationDocument,
} from '@/mock-data/fintechData'
import { simulateApiCall, type ApiResponse } from './apiClient'

let localFacilities = [...CAPITAL_FACILITIES]
let localSessions = [...CONSULTATION_SESSIONS]
let localDocuments = [...APPLICATION_DOCUMENTS]
let localMetrics = { ...FINANCIAL_METRICS }

export const fintechService = {
  async getMetrics(): Promise<ApiResponse<typeof FINANCIAL_METRICS>> {
    return simulateApiCall(() => ({ ...localMetrics }))
  },

  async getRevenueHistory(): Promise<ApiResponse<typeof REVENUE_HISTORY>> {
    return simulateApiCall(() => [...REVENUE_HISTORY])
  },

  async getCashFlowForecast(): Promise<ApiResponse<typeof CASH_FLOW_FORECAST>> {
    return simulateApiCall(() => [...CASH_FLOW_FORECAST])
  },

  async getFacilities(): Promise<ApiResponse<CapitalFacility[]>> {
    return simulateApiCall(() => [...localFacilities])
  },

  async executeDraw(facilityId: string, amount: number): Promise<ApiResponse<CapitalFacility>> {
    return simulateApiCall(() => {
      const facility = localFacilities.find((f) => f.id === facilityId)
      if (!facility) throw new Error('Facility not found')
      if (amount > facility.available) throw new Error('Requested amount exceeds available balance')

      facility.drawn += amount
      facility.available -= amount
      localMetrics.totalDrawnCapital += amount

      return { ...facility }
    })
  },

  async getSessions(): Promise<ApiResponse<ConsultationSession[]>> {
    return simulateApiCall(() => [...localSessions])
  },

  async getDocuments(): Promise<ApiResponse<ApplicationDocument[]>> {
    return simulateApiCall(() => [...localDocuments])
  },
}
