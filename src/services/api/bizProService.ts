import {
  BIZPRO_RANKS,
  BIZPRO_DASHBOARD_DATA,
  BIZPRO_LEADS,
  BIZPRO_CLIENTS,
  BIZPRO_DOWNLINE_TREE,
  BIZPRO_COMMISSIONS_STATEMENT,
  BIZPRO_RECRUIT_INVITES,
  type BizProLead,
  type BizProClient,
  type DownlineMember,
  type CommissionItem,
  type RecruitInvite,
} from '@/mock-data/bizProData'
import { simulateApiCall, type ApiResponse } from './apiClient'

let localLeads = [...BIZPRO_LEADS]
let localClients = [...BIZPRO_CLIENTS]
let localInvites = [...BIZPRO_RECRUIT_INVITES]
let localCommissions = [...BIZPRO_COMMISSIONS_STATEMENT]

export const bizProService = {
  async getDashboardData(): Promise<ApiResponse<typeof BIZPRO_DASHBOARD_DATA>> {
    return simulateApiCall(() => ({ ...BIZPRO_DASHBOARD_DATA }))
  },

  async getRanks(): Promise<ApiResponse<typeof BIZPRO_RANKS>> {
    return simulateApiCall(() => [...BIZPRO_RANKS])
  },

  async getLeads(stage?: string): Promise<ApiResponse<BizProLead[]>> {
    return simulateApiCall(() => {
      if (!stage || stage === 'All') return [...localLeads]
      return localLeads.filter((l) => l.stage === stage)
    })
  },

  async createLead(newLead: Omit<BizProLead, 'id' | 'createdAt' | 'lastActivity'>): Promise<ApiResponse<BizProLead>> {
    return simulateApiCall(() => {
      const created: BizProLead = {
        ...newLead,
        id: `lead-${Date.now()}`,
        createdAt: 'Today',
        lastActivity: 'Lead created in Biz Pro CRM terminal.',
      }
      localLeads = [created, ...localLeads]
      return created
    })
  },

  async updateLeadStage(id: string, stage: BizProLead['stage']): Promise<ApiResponse<BizProLead>> {
    return simulateApiCall(() => {
      const lead = localLeads.find((l) => l.id === id)
      if (!lead) throw new Error('Lead not found')
      lead.stage = stage
      lead.lastActivity = `Stage shifted to ${stage} on ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      return { ...lead }
    })
  },

  async getClients(): Promise<ApiResponse<BizProClient[]>> {
    return simulateApiCall(() => [...localClients])
  },

  async getClientById(id: string): Promise<ApiResponse<BizProClient | undefined>> {
    return simulateApiCall(() => localClients.find((c) => c.id === id))
  },

  async getDownlineTree(): Promise<ApiResponse<DownlineMember[]>> {
    return simulateApiCall(() => [...BIZPRO_DOWNLINE_TREE])
  },

  async getCommissions(): Promise<ApiResponse<CommissionItem[]>> {
    return simulateApiCall(() => [...localCommissions])
  },

  async getRecruitInvites(): Promise<ApiResponse<RecruitInvite[]>> {
    return simulateApiCall(() => [...localInvites])
  },

  async sendRecruitInvite(invite: {
    candidateName: string
    email: string
    region: string
    sponsorCode: string
  }): Promise<ApiResponse<RecruitInvite>> {
    return simulateApiCall(() => {
      const created: RecruitInvite = {
        id: `rec-${Date.now()}`,
        candidateName: invite.candidateName,
        email: invite.email,
        region: invite.region,
        sentDate: 'Today',
        status: 'Invitation Sent',
        sponsorCode: invite.sponsorCode,
      }
      localInvites = [created, ...localInvites]
      return created
    })
  },
}
