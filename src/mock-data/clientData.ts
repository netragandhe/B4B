export interface ClientServiceOrder {
  id: string
  serviceName: string
  category: string
  amount: number
  progress: number
  status: 'Processing' | 'In Review' | 'Active' | 'Completed'
  requestedDate: string
  estimatedCompletion: string
  assignedAdvisor: string
}

export interface ClientFundingApplication {
  id: string
  facilityName: string
  requestedAmount: number
  currentStepIndex: number // 0: Applied, 1: Documents, 2: Review, 3: Approved, 4: Funded
  steps: { label: string; date?: string; completed: boolean }[]
  underwriterNote: string
}

export interface ClientInvoice {
  id: string
  invoiceNumber: string
  serviceName: string
  amount: number
  dueDate: string
  issuedDate: string
  status: 'Paid' | 'Unpaid' | 'Overdue'
}

export interface ClientCoachMessage {
  id: string
  sender: 'Coach' | 'Client'
  senderName: string
  avatar: string
  text: string
  timestamp: string
  attachment?: string
}

export const CLIENT_ACTIVE_ORDERS: ClientServiceOrder[] = [
  {
    id: 'ord_101',
    serviceName: 'Business Funding and Loans ($500k)',
    category: 'Capital',
    amount: 500000,
    progress: 75,
    status: 'In Review',
    requestedDate: '2026-09-28',
    estimatedCompletion: '2026-10-12',
    assignedAdvisor: 'Marcus Vance (Senior Advisor)',
  },
  {
    id: 'ord_102',
    serviceName: 'Business Management & Advisory',
    category: 'Advisory',
    amount: 48000,
    progress: 40,
    status: 'Active',
    requestedDate: '2026-09-15',
    estimatedCompletion: '2026-12-31',
    assignedAdvisor: 'Elena Rostova (CFO Advisor)',
  },
  {
    id: 'ord_103',
    serviceName: 'Build Business Credit Score Suite',
    category: 'Growth',
    amount: 12000,
    progress: 60,
    status: 'Active',
    requestedDate: '2026-08-20',
    estimatedCompletion: '2026-11-15',
    assignedAdvisor: 'David Ross (District Leader)',
  },
  {
    id: 'ord_104',
    serviceName: 'Business Funding and Loans (Equipment)',
    category: 'Capital',
    amount: 350000,
    progress: 90,
    status: 'Active',
    requestedDate: '2026-07-10',
    estimatedCompletion: '2026-10-20',
    assignedAdvisor: 'Marcus Vance (Senior Advisor)',
  },
  {
    id: 'ord_105',
    serviceName: 'Bookkeeping and Tax Prep Audit',
    category: 'Operations',
    amount: 25000,
    progress: 100,
    status: 'Completed',
    requestedDate: '2026-06-01',
    estimatedCompletion: '2026-07-15',
    assignedAdvisor: 'Sarah Jenkins (Compliance Advisor)',
  },
  {
    id: 'ord_106',
    serviceName: 'eBOX Enterprise Vault Setup',
    category: 'Operations',
    amount: 24000,
    progress: 100,
    status: 'Completed',
    requestedDate: '2026-05-12',
    estimatedCompletion: '2026-05-30',
    assignedAdvisor: 'David Ross (District Leader)',
  },
]

export const CLIENT_FUNDING_APP: ClientFundingApplication = {
  id: 'app_b4b_884',
  facilityName: 'SBA 7(a) Commercial Expansion Line',
  requestedAmount: 750000,
  currentStepIndex: 2,
  steps: [
    { label: 'Applied', date: 'Sep 20', completed: true },
    { label: 'Documents', date: 'Sep 25', completed: true },
    { label: 'Review', date: 'Oct 02', completed: false },
    { label: 'Approved', completed: false },
    { label: 'Funded', completed: false },
  ],
  underwriterNote: 'Risk grade A — Underwriter is analyzing Q3 P&L statements. Disbursement expected by Oct 14.',
}

export const CLIENT_INVOICES: ClientInvoice[] = [
  {
    id: 'inv_301',
    invoiceNumber: 'INV-2026-0091',
    serviceName: 'Fractional CFO Monthly Retainer (Oct 2026)',
    amount: 4000,
    dueDate: '2026-10-15',
    issuedDate: '2026-10-01',
    status: 'Unpaid',
  },
  {
    id: 'inv_302',
    invoiceNumber: 'INV-2026-0074',
    serviceName: 'Working Capital Line Structuring Fee',
    amount: 2500,
    dueDate: '2026-09-30',
    issuedDate: '2026-09-15',
    status: 'Paid',
  },
  {
    id: 'inv_303',
    invoiceNumber: 'INV-2026-0042',
    serviceName: 'Business Credit Builder Package setup',
    amount: 1200,
    dueDate: '2026-08-30',
    issuedDate: '2026-08-15',
    status: 'Paid',
  },
  {
    id: 'inv_304',
    invoiceNumber: 'INV-2026-0038',
    serviceName: 'Equipment Lease Processing & Origination Fee',
    amount: 3500,
    dueDate: '2026-07-30',
    issuedDate: '2026-07-15',
    status: 'Paid',
  },
  {
    id: 'inv_305',
    invoiceNumber: 'INV-2026-0012',
    serviceName: 'Tax Conversion Audit Deposit',
    amount: 5000,
    dueDate: '2026-06-15',
    issuedDate: '2026-06-01',
    status: 'Paid',
  },
]

export const CLIENT_COACH_MESSAGES: ClientCoachMessage[] = [
  {
    id: 'msg_1',
    sender: 'Coach',
    senderName: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    text: 'Hello! I reviewed your Q3 financials. The revenue growth is solid. Let’s talk about structuring the $750k SBA facility tomorrow.',
    timestamp: 'Yesterday 4:15 PM',
  },
  {
    id: 'msg_2',
    sender: 'Client',
    senderName: 'Apex Freight Team',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    text: 'Thanks Marcus! I uploaded our updated tax returns to the eBOX. Looking forward to our call.',
    timestamp: 'Yesterday 5:30 PM',
  },
  {
    id: 'msg_3',
    sender: 'Coach',
    senderName: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    text: 'Got them! The underwriters marked your tax returns as Verified. Speak tomorrow at 2:00 PM EST.',
    timestamp: 'Today 9:10 AM',
  },
  {
    id: 'msg_4',
    sender: 'Client',
    senderName: 'Apex Freight Team',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    text: 'Great! Also, could you check the status of our equipment lease draw for the 2 new freight trucks?',
    timestamp: 'Today 10:45 AM',
  },
  {
    id: 'msg_5',
    sender: 'Coach',
    senderName: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    text: 'The $350k lease draw has reached 90% completion. Funds will hit your account by Thursday morning.',
    timestamp: 'Today 11:20 AM',
  },
]

export const CLIENT_BOOKING_SLOTS = [
  { id: 'slot_1', time: '09:00 AM EST', available: true },
  { id: 'slot_2', time: '11:30 AM EST', available: true },
  { id: 'slot_3', time: '02:00 PM EST', available: false }, // booked
  { id: 'slot_4', time: '04:00 PM EST', available: true },
]
