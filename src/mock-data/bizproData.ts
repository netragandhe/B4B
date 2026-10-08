export interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  stage: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Won' | 'Lost'
  dealValue: number
  source: string
  assignedDate: string
  lastActivity: string
  notes: string[]
}

export interface BizProClient {
  id: string
  name: string
  company: string
  email: string
  avatar: string
  servicesPurchased: string[]
  totalRevenue: number
  status: 'Active' | 'Onboarding' | 'Renewal Due' | 'Inactive'
  joinDate: string
  cfoAssigned: string
}

export interface ServiceItem {
  id: string
  title: string
  category: 'Capital' | 'Advisory' | 'Operations' | 'Growth'
  description: string
  avgTicket: number
  commissionRate: string
  popular?: boolean
  iconName: string
}

export interface RankInfo {
  level: number
  title: string
  isLeader: boolean
  minPersonalVolume: number
  minTeamVolume?: number
  commissionTier: string
  perks: string[]
}

export const BIZPRO_RANKS: RankInfo[] = [
  {
    level: 1,
    title: 'Account Executive',
    isLeader: false,
    minPersonalVolume: 10000,
    commissionTier: '10% Direct Commission',
    perks: ['Standard CRM Portal Access', 'Service Catalog Access'],
  },
  {
    level: 2,
    title: 'Relationship Coordinator II',
    isLeader: false,
    minPersonalVolume: 50000,
    commissionTier: '12% Direct Commission',
    perks: ['AI Marketing Generator', 'Priority Support'],
  },
  {
    level: 3,
    title: 'Senior Executive',
    isLeader: false,
    minPersonalVolume: 150000,
    commissionTier: '15% Direct Commission',
    perks: ['Custom White-label Branding', 'Dedicated Account Manager'],
  },
  {
    level: 4,
    title: 'District Leader',
    isLeader: true,
    minPersonalVolume: 300000,
    minTeamVolume: 500000,
    commissionTier: '18% Direct + 3% Team Override',
    perks: ['Team Management Unlocked', 'Territory Assignment Rights', 'Recruiting Portal'],
  },
  {
    level: 5,
    title: 'Regional Leader',
    isLeader: true,
    minPersonalVolume: 600000,
    minTeamVolume: 1200000,
    commissionTier: '20% Direct + 5% Team Override',
    perks: ['Regional Scoreboard Access', 'Co-op Marketing Budget'],
  },
  {
    level: 6,
    title: 'Channel VP',
    isLeader: true,
    minPersonalVolume: 1000000,
    minTeamVolume: 2500000,
    commissionTier: '22% Direct + 7% Team Override',
    perks: ['National Advisory Board Seat', 'Custom Product Lines'],
  },
  {
    level: 7,
    title: 'Senior Channel VP',
    isLeader: true,
    minPersonalVolume: 2000000,
    minTeamVolume: 5000000,
    commissionTier: '25% Direct + 8% Team Override',
    perks: ['Equity Profit Sharing Pool', 'VIP Retreats'],
  },
  {
    level: 8,
    title: 'National Channel VP',
    isLeader: true,
    minPersonalVolume: 4000000,
    minTeamVolume: 10000000,
    commissionTier: '28% Direct + 10% Team Override',
    perks: ['National Territory Oversight', 'Executive Board Voting'],
  },
  {
    level: 9,
    title: 'Senior National Channel VP',
    isLeader: true,
    minPersonalVolume: 8000000,
    minTeamVolume: 25000000,
    commissionTier: '30% Direct + 12% Team Override',
    perks: ['Lifetime Legacy Bonus', 'Founding Partner Distribution'],
  },
]

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'ld_101',
    name: 'Harrison Ford',
    company: 'Apex Freight LLC',
    email: 'h.ford@apexlogistics.io',
    phone: '+1 (555) 234-8901',
    stage: 'Proposal',
    dealValue: 850000,
    source: 'Inbound Web Lead',
    assignedDate: '2026-09-28',
    lastActivity: '2 hours ago - Proposal Sent',
    notes: ['Client interested in $850k revolving line for 4 new trucks.', 'Requested 13-week CFO model sample.'],
  },
  {
    id: 'ld_102',
    name: 'Samantha Reed',
    company: 'BioTech Solutions Inc',
    email: 's.reed@biotechsol.com',
    phone: '+1 (555) 456-7890',
    stage: 'Qualified',
    dealValue: 1200000,
    source: 'LinkedIn Outreach',
    assignedDate: '2026-10-01',
    lastActivity: '1 day ago - Underwriting Prep',
    notes: ['P&L statements received.', 'Needs revenue-based bridge financing.'],
  },
  {
    id: 'ld_103',
    name: 'Carlos Mendez',
    company: 'Mendez Cold Storage',
    email: 'carlos@mendezstorage.com',
    phone: '+1 (555) 678-1234',
    stage: 'New',
    dealValue: 450000,
    source: 'Affiliate Partner Referral',
    assignedDate: '2026-10-06',
    lastActivity: '3 hours ago - Form Submitted',
    notes: ['Looking to refinance existing equipment lease.'],
  },
  {
    id: 'ld_104',
    name: 'Victoria Vance',
    company: 'Vance Health Systems',
    email: 'v.vance@vancehealth.org',
    phone: '+1 (555) 901-2345',
    stage: 'Contacted',
    dealValue: 600000,
    source: 'Cold Call',
    assignedDate: '2026-10-03',
    lastActivity: 'Yesterday - Intro Call Scheduled',
    notes: ['Discussed Fractional CFO retainer.'],
  },
  {
    id: 'ld_105',
    name: 'Derek Sterling',
    company: 'Sterling E-Commerce',
    email: 'derek@sterlingec.com',
    phone: '+1 (555) 345-6789',
    stage: 'Won',
    dealValue: 350000,
    source: 'Ad Campaign',
    assignedDate: '2026-09-15',
    lastActivity: 'Oct 02 - Line Issued',
    notes: ['Closed $350k revolving facility.', 'Commission paid.'],
  },
  {
    id: 'ld_106',
    name: 'Amanda Lin',
    company: 'Quantum Tech Labs',
    email: 'a.lin@quantumtech.io',
    phone: '+1 (555) 890-1234',
    stage: 'Won',
    dealValue: 950000,
    source: 'Executive Referral',
    assignedDate: '2026-09-01',
    lastActivity: 'Oct 04 - CFO Retainer Signed',
    notes: ['Signed 1-year Fractional CFO retainer plus $950k line.'],
  },
  {
    id: 'ld_107',
    name: 'Robert Duval',
    company: 'Duval Marine Services',
    email: 'r.duval@duvalmarine.com',
    phone: '+1 (555) 123-4567',
    stage: 'Lost',
    dealValue: 200000,
    source: 'Website',
    assignedDate: '2026-08-20',
    lastActivity: 'Sep 10 - Competitor Chosen',
    notes: ['Chose local bank loan due to existing relationship.'],
  },
]

export const BIZPRO_CLIENTS: BizProClient[] = [
  {
    id: 'cli_301',
    name: 'Marcus Vance',
    company: 'Apex Freight & Logistics LLC',
    email: 'm.vance@apexlogistics.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    servicesPurchased: ['Revolving Line ($850k)', 'Fractional CFO Advisory', 'eBOX Vault'],
    totalRevenue: 850000,
    status: 'Active',
    joinDate: '2026-06-12',
    cfoAssigned: 'David Ross',
  },
  {
    id: 'cli_302',
    name: 'Derek Sterling',
    company: 'Sterling E-Commerce Group',
    email: 'derek@sterlingec.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    servicesPurchased: ['Revenue-Based Credit', 'Tax Conversion Audit'],
    totalRevenue: 350000,
    status: 'Active',
    joinDate: '2026-07-20',
    cfoAssigned: 'Sarah Jenkins',
  },
  {
    id: 'cli_303',
    name: 'Amanda Lin',
    company: 'Quantum Tech Labs',
    email: 'a.lin@quantumtech.io',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    servicesPurchased: ['Fractional CFO', 'SBA 7(a) Guarantee Bridge'],
    totalRevenue: 950000,
    status: 'Active',
    joinDate: '2026-08-05',
    cfoAssigned: 'David Ross',
  },
  {
    id: 'cli_304',
    name: 'Gregory Peck',
    company: 'Peck Manufacturing',
    email: 'g.peck@peckmfg.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    servicesPurchased: ['Equipment Financing', 'Payroll Revolver'],
    totalRevenue: 520000,
    status: 'Renewal Due',
    joinDate: '2025-11-14',
    cfoAssigned: 'Michael Chang',
  },
]

export const THE_16_SERVICES: ServiceItem[] = [
  {
    id: 'srv_1',
    title: 'Revenue-Based Working Capital Line',
    category: 'Capital',
    description: 'Flexible credit line backed by monthly recurring cash receipts. Fast 48-hour approval.',
    avgTicket: 250000,
    commissionRate: '3.5%',
    popular: true,
    iconName: 'Wallet',
  },
  {
    id: 'srv_2',
    title: 'Fractional CFO & Treasury Advisory',
    category: 'Advisory',
    description: 'Dedicated veteran CFO providing 13-week cash flow modeling and board decks.',
    avgTicket: 48000,
    commissionRate: '15.0%',
    popular: true,
    iconName: 'BarChart3',
  },
  {
    id: 'srv_3',
    title: 'Equipment & Fleet Financing',
    category: 'Capital',
    description: '100% LTV lease financing for heavy machinery, vehicle fleets, and technology assets.',
    avgTicket: 350000,
    commissionRate: '2.5%',
    iconName: 'Truck',
  },
  {
    id: 'srv_4',
    title: 'SBA 7(a) Guarantee Bridge',
    category: 'Capital',
    description: 'Low-interest long-term government backed loans up to $5M with speed bridge funding.',
    avgTicket: 1200000,
    commissionRate: '2.0%',
    popular: true,
    iconName: 'Building2',
  },
  {
    id: 'srv_5',
    title: 'Tax & Cash Conversion Audit',
    category: 'Operations',
    description: 'Comprehensive audit to unlock R&D tax credits and reduce working capital lag.',
    avgTicket: 25000,
    commissionRate: '20.0%',
    iconName: 'FileCheck',
  },
  {
    id: 'srv_6',
    title: 'Payroll & Inventory Revolver',
    category: 'Capital',
    description: 'Short-term funding line to smooth seasonal payroll and large vendor PO spikes.',
    avgTicket: 180000,
    commissionRate: '3.0%',
    iconName: 'DollarSign',
  },
  {
    id: 'srv_7',
    title: 'Invoice Factoring & Accounts Receivable',
    category: 'Capital',
    description: 'Immediate 90% advance against outstanding 30/60/90 day commercial invoices.',
    avgTicket: 400000,
    commissionRate: '2.0%',
    iconName: 'Receipt',
  },
  {
    id: 'srv_8',
    title: 'Merchant Cash Advance Bridge',
    category: 'Capital',
    description: 'Emergency liquidity bridge for high-volume credit card processing businesses.',
    avgTicket: 100000,
    commissionRate: '5.0%',
    iconName: 'Zap',
  },
  {
    id: 'srv_9',
    title: 'Business Credit Score Builder',
    category: 'Growth',
    description: 'Structured program to build Dun & Bradstreet Paydex and Experian Business scores.',
    avgTicket: 12000,
    commissionRate: '25.0%',
    iconName: 'ShieldAlert',
  },
  {
    id: 'srv_10',
    title: 'M&A & Expansion Capital Advisory',
    category: 'Advisory',
    description: 'Fiduciary representation for business acquisitions, buyouts, and partner liquidity.',
    avgTicket: 1500000,
    commissionRate: '2.5%',
    popular: true,
    iconName: 'TrendingUp',
  },
  {
    id: 'srv_11',
    title: 'Institutional Payment Processing',
    category: 'Operations',
    description: 'Next-day settlement merchant processing with interchange-plus transparent pricing.',
    avgTicket: 60000,
    commissionRate: '10.0%',
    iconName: 'CreditCard',
  },
  {
    id: 'srv_12',
    title: 'Corporate Branding & Web Terminal',
    category: 'Growth',
    description: 'Enterprise brand identity, custom web application, and digital client portal setup.',
    avgTicket: 35000,
    commissionRate: '20.0%',
    iconName: 'Globe',
  },
  {
    id: 'srv_13',
    title: 'Legal & KYB Compliance Vault',
    category: 'Operations',
    description: 'FinCEN BOI filings, operating agreement reviews, and corporate governance.',
    avgTicket: 15000,
    commissionRate: '20.0%',
    iconName: 'ShieldCheck',
  },
  {
    id: 'srv_14',
    title: 'Commercial Real Estate Financing',
    category: 'Capital',
    description: 'Owner-occupied and investment CRE acquisition, refinancing, and bridge loans.',
    avgTicket: 2500000,
    commissionRate: '1.5%',
    iconName: 'Landmark',
  },
  {
    id: 'srv_15',
    title: 'HR & Executive Talent Acquisition',
    category: 'Growth',
    description: 'Retained executive search for C-suite financial, operations, and revenue leaders.',
    avgTicket: 40000,
    commissionRate: '18.0%',
    iconName: 'Users',
  },
  {
    id: 'srv_16',
    title: 'eBOX Enterprise Vault System',
    category: 'Operations',
    description: 'Dedicated encrypted document vault and audit repository with SOC2 compliance.',
    avgTicket: 24000,
    commissionRate: '25.0%',
    popular: true,
    iconName: 'FolderArchive',
  },
]

export const BIZPRO_TEAM = [
  {
    id: 'rep_01',
    name: 'Jason Miller',
    role: 'Senior Executive (Rank 3)',
    volume: 185000,
    deals: 6,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
  },
  {
    id: 'rep_02',
    name: 'Rachel Adams',
    role: 'Relationship Coordinator II (Rank 2)',
    volume: 120000,
    deals: 4,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
  },
  {
    id: 'rep_03',
    name: 'Kevin Zhao',
    role: 'Account Executive (Rank 1)',
    volume: 45000,
    deals: 2,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'Onboarding',
  },
  {
    id: 'rep_04',
    name: 'Monica Bell',
    role: 'Senior Executive (Rank 3)',
    volume: 210000,
    deals: 7,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
  },
]
