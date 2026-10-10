import { createStore } from '../createStore'

export interface ClientDebtFacility {
  id: string
  name: string
  amount: number
  rate: string
  term: string
  status: 'Underwriting' | 'Approved' | 'Active Funded' | 'Paid Off'
}

export interface ClientRecord {
  id: string
  companyName: string
  contactPerson: string
  email: string
  phone: string
  industry: string
  region: string
  status: 'Active Client' | 'Underwriting Intake' | 'Prospect' | 'Inactive'
  assignedCoachName: string
  assignedCoachId: string
  totalFundedVolume: number
  activeFacilities: ClientDebtFacility[]
  notes: { id: string; text: string; author: string; date: string }[]
  tags: string[]
  createdDate: string
}

const INITIAL_CLIENTS: ClientRecord[] = [
  {
    id: 'cli_1',
    companyName: 'Apex Freight LLC',
    contactPerson: 'David Miller',
    email: 'dmiller@apexfreight.com',
    phone: '+1 (555) 234-5678',
    industry: 'Logistics & Transportation',
    region: 'Dallas (11-K)',
    status: 'Active Client',
    assignedCoachName: 'Carlos Ramirez (Rank 7)',
    assignedCoachId: 'bizpro_1',
    totalFundedVolume: 850000,
    activeFacilities: [
      {
        id: 'fac_1',
        name: 'Accounts Receivable Line of Credit',
        amount: 500000,
        rate: '7.85% SOFR+',
        term: '24 Months Revolving',
        status: 'Active Funded',
      },
      {
        id: 'fac_2',
        name: 'Heavy Equipment Lease-Back',
        amount: 350000,
        rate: '6.50% Fixed',
        term: '60 Months',
        status: 'Active Funded',
      },
    ],
    notes: [
      {
        id: 'n_1',
        text: 'Initial SBA term sheet approved. Funding wire completed on time.',
        author: 'Carlos Ramirez',
        date: '2026-09-15',
      },
    ],
    tags: ['SBA 7a', 'Logistics', 'Grade A'],
    createdDate: '2026-08-10',
  },
  {
    id: 'cli_2',
    companyName: 'BioTech Solutions Inc',
    contactPerson: 'Dr. Evelyn Reed',
    email: 'ereed@biotechsolutions.io',
    phone: '+1 (555) 345-6789',
    industry: 'Life Sciences / Pharma',
    region: 'Boston (1-A)',
    status: 'Underwriting Intake',
    assignedCoachName: 'Sarah Jenkins (Rank 5)',
    assignedCoachId: 'bizpro_2',
    totalFundedVolume: 1200000,
    activeFacilities: [
      {
        id: 'fac_3',
        name: 'SBA Bridge Line of Credit',
        amount: 1200000,
        rate: '8.25%',
        term: '36 Months',
        status: 'Underwriting',
      },
    ],
    notes: [
      {
        id: 'n_2',
        text: 'Financial statements ingested. Awaiting secondary tax verification.',
        author: 'Sarah Jenkins',
        date: '2026-10-06',
      },
    ],
    tags: ['Biotech', 'High Volume', 'Intake'],
    createdDate: '2026-09-20',
  },
  {
    id: 'cli_3',
    companyName: 'Precision Metalworks Corp',
    contactPerson: 'Robert Hall',
    email: 'rhall@precisionmetal.com',
    phone: '+1 (555) 456-7890',
    industry: 'Industrial Manufacturing',
    region: 'Chicago (7-G)',
    status: 'Active Client',
    assignedCoachName: 'Robert Sterling (Rank 5)',
    assignedCoachId: 'bizpro_3',
    totalFundedVolume: 2400000,
    activeFacilities: [
      {
        id: 'fac_4',
        name: 'Commercial Real Estate Refinance',
        amount: 2400000,
        rate: '6.95% Fixed',
        term: '120 Months',
        status: 'Active Funded',
      },
    ],
    notes: [
      {
        id: 'n_3',
        text: 'CRE appraisal completed at $3.6M valuation.',
        author: 'Robert Sterling',
        date: '2026-07-22',
      },
    ],
    tags: ['Manufacturing', 'CRE', 'VIP'],
    createdDate: '2026-06-14',
  },
  {
    id: 'cli_4',
    companyName: 'Solstice Hospitality Group',
    contactPerson: 'Maria Santos',
    email: 'msantos@solsticehotels.com',
    phone: '+1 (555) 567-8901',
    industry: 'Hospitality & Leisure',
    region: 'Atlanta (6-F)',
    status: 'Active Client',
    assignedCoachName: 'Marcus Vance (Rank 6)',
    assignedCoachId: 'bizpro_4',
    totalFundedVolume: 3500000,
    activeFacilities: [
      {
        id: 'fac_5',
        name: 'Senior Secured Term Facility',
        amount: 3500000,
        rate: '7.45%',
        term: '84 Months',
        status: 'Active Funded',
      },
    ],
    notes: [
      {
        id: 'n_4',
        text: 'Quarterly debt service coverage ratio verified at 1.85x.',
        author: 'Marcus Vance',
        date: '2026-09-30',
      },
    ],
    tags: ['Hospitality', 'Syndicated', 'Grade A'],
    createdDate: '2026-05-12',
  },
]

const clientStore = createStore<ClientRecord[]>('clients_directory', INITIAL_CLIENTS)

export const clientService = {
  useClients: () => clientStore.useStore(),
  getClients: () => clientStore.get(),

  getClientById: (id: string) => {
    return clientStore.get().find((c) => c.id === id)
  },

  createClient: (data: Omit<ClientRecord, 'id' | 'createdDate' | 'notes' | 'activeFacilities' | 'totalFundedVolume'>) => {
    const newClient: ClientRecord = {
      ...data,
      id: `cli_${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
      totalFundedVolume: 0,
      activeFacilities: [],
      notes: [
        {
          id: `n_${Date.now()}`,
          text: 'Client registered into B4B CRM directory.',
          author: data.assignedCoachName || 'System',
          date: new Date().toISOString().split('T')[0],
        },
      ],
    }
    clientStore.set((prev) => [newClient, ...prev])
    return newClient
  },

  updateClient: (id: string, updates: Partial<ClientRecord>) => {
    clientStore.set((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    )
  },

  deleteClient: (id: string) => {
    clientStore.set((prev) => prev.filter((c) => c.id !== id))
  },

  addFacility: (clientId: string, facility: Omit<ClientDebtFacility, 'id'>) => {
    const newFacility: ClientDebtFacility = {
      ...facility,
      id: `fac_${Date.now()}`,
    }
    clientStore.set((prev) =>
      prev.map((c) => {
        if (c.id !== clientId) return c
        const updatedFacilities = [...c.activeFacilities, newFacility]
        const totalVolume = updatedFacilities.reduce((sum, f) => sum + f.amount, 0)
        return {
          ...c,
          activeFacilities: updatedFacilities,
          totalFundedVolume: totalVolume,
        }
      })
    )
    return newFacility
  },

  addNote: (clientId: string, text: string, author: string) => {
    const newNote = {
      id: `n_${Date.now()}`,
      text,
      author,
      date: new Date().toISOString().split('T')[0],
    }
    clientStore.set((prev) =>
      prev.map((c) => {
        if (c.id !== clientId) return c
        return {
          ...c,
          notes: [newNote, ...c.notes],
        }
      })
    )
  },

  reset: () => clientStore.reset(),
}
