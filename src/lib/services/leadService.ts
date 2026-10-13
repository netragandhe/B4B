/**
 * B4B AMERICA — SHARED LEADS PERSISTENCE SERVICE
 * 
 * Sourced directly from official client requirements:
 * - Direct Affiliate Lead Submissions automatically route to Biz Pro CRM pipeline.
 * - Persistent storage with localStorage fallback.
 * - Status transitions (New -> Contacted -> Qualified -> Proposal -> Won -> Lost).
 */

import { Lead, INITIAL_LEADS } from '@/mock-data/bizproData'

const LEADS_STORAGE_KEY = 'b4b_leads_store'

export interface CreateLeadInput {
  name: string
  company: string
  email: string
  phone: string
  dealValue: string | number
  serviceInterest?: string
  notes?: string
  source?: string
}

class LeadService {
  private getStore(): Lead[] {
    try {
      const data = localStorage.getItem(LEADS_STORAGE_KEY)
      if (!data) {
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(INITIAL_LEADS))
        return [...INITIAL_LEADS]
      }
      return JSON.parse(data)
    } catch (err) {
      console.error('Failed to read leads store:', err)
      return [...INITIAL_LEADS]
    }
  }

  private saveStore(leads: Lead[]): void {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads))
    } catch (err) {
      console.error('Failed to save leads store:', err)
    }
  }

  async getLeads(): Promise<Lead[]> {
    return this.getStore()
  }

  async addLead(input: CreateLeadInput): Promise<Lead> {
    const leads = this.getStore()
    const numericValue = typeof input.dealValue === 'string' ? parseFloat(input.dealValue) || 250000 : input.dealValue

    const newLead: Lead = {
      id: `lead_${Date.now()}`,
      name: input.name,
      company: input.company || 'Prospective Enterprise Client',
      email: input.email,
      phone: input.phone || '(555) 000-0000',
      dealValue: numericValue,
      stage: 'New',
      source: input.source || 'Affiliate Referral',
      assignedDate: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now',
      notes: input.notes ? [input.notes] : [`Referred for ${input.serviceInterest || 'Commercial Financing'} via B4B Network`],
    }

    const updated = [newLead, ...leads]
    this.saveStore(updated)
    return newLead
  }

  async updateStage(id: string, stage: Lead['stage']): Promise<Lead | null> {
    const leads = this.getStore()
    const lead = leads.find((l) => l.id === id)
    if (!lead) return null
    lead.stage = stage
    lead.lastActivity = 'Today'
    this.saveStore(leads)
    return lead
  }

  async addNote(id: string, note: string): Promise<Lead | null> {
    const leads = this.getStore()
    const lead = leads.find((l) => l.id === id)
    if (!lead) return null
    lead.notes = [...lead.notes, note]
    lead.lastActivity = 'Today'
    this.saveStore(leads)
    return lead
  }

  async deleteLead(id: string): Promise<boolean> {
    const leads = this.getStore()
    const updated = leads.filter((l) => l.id !== id)
    this.saveStore(updated)
    return true
  }
}

export const leadService = new LeadService()
