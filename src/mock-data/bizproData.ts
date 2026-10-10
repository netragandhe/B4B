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
  monthlyCommissionRange: string
  yearlyIncomeRange: string
  promotionCriteria: string
  commissionTier: string
  perks: string[]
}

export const BIZPRO_RANKS: RankInfo[] = [
  {
    level: 1,
    title: 'Account Executive',
    isLeader: false,
    monthlyCommissionRange: '$0 - $2,500/mo',
    yearlyIncomeRange: 'Up to $30K/yr',
    commissionTier: '$0 - $2,500/mo (Up to $30K/yr)',
    promotionCriteria: '3 consecutive months of personal monthly commission of $3,150 or more qualifies for Rank 2 promotion.',
    perks: ['Standard B4B Coach CRM Access', '16 Solutions Catalog Access', 'AI Outreach Pitch Assistant'],
  },
  {
    level: 2,
    title: 'Relationship Coordinator II',
    isLeader: false,
    monthlyCommissionRange: '$3,150 - $4,175/mo',
    yearlyIncomeRange: '$30K - $50K/yr',
    commissionTier: '$3,150 - $4,175/mo ($30K - $50K/yr)',
    promotionCriteria: '3 consecutive months of personal monthly commission of $4,150 or more qualifies for Rank 3 promotion.',
    perks: ['AI Marketing Copy Generator', 'Priority Underwriting Desk Access', 'Direct Commission Settlement'],
  },
  {
    level: 3,
    title: 'Senior Executive',
    isLeader: false,
    monthlyCommissionRange: '$4,200 - $6,250/mo',
    yearlyIncomeRange: '$50K - $75K/yr',
    commissionTier: '$4,200 - $6,250/mo ($50K - $75K/yr)',
    promotionCriteria: '3 consecutive months of personal monthly commission of $6,300 or more qualifies for District Leadership.',
    perks: ['White-Label Broker Branding', 'Dedicated Account Support Desk'],
  },
  {
    level: 4,
    title: 'District Leader',
    isLeader: true,
    monthlyCommissionRange: '$6,300 - $8,350/mo',
    yearlyIncomeRange: '$75K - $100K/yr',
    commissionTier: '$6,300 - $8,350/mo ($75K - $100K/yr)',
    promotionCriteria: 'District leadership qualification threshold with team recruitment downline volume.',
    perks: ['Territory County Reassignment Rights', 'Team Downline Overrides', 'Recruiter Sponsor Code'],
  },
  {
    level: 5,
    title: 'Regional Leader',
    isLeader: true,
    monthlyCommissionRange: '$8,400 - $14,580/mo',
    yearlyIncomeRange: '$100K - $175K/yr',
    commissionTier: '$8,400 - $14,580/mo ($100K - $175K/yr)',
    promotionCriteria: 'Regional leadership network volume across multiple district territories.',
    perks: ['Regional Leaderboard Filter Access', 'Multi-County Territory Exclusivity'],
  },
  {
    level: 6,
    title: 'Channel VP',
    isLeader: true,
    monthlyCommissionRange: '$15,500 - $20,850/mo',
    yearlyIncomeRange: '$175K - $250K/yr',
    commissionTier: '$15,500 - $20,850/mo ($175K - $250K/yr)',
    promotionCriteria: 'Executive leadership council qualification with statewide channel distribution.',
    perks: ['National Advisory Board Seat', 'Executive Product Allocation'],
  },
  {
    level: 7,
    title: 'Senior Channel VP',
    isLeader: true,
    monthlyCommissionRange: '$21,000 - $27,085/mo',
    yearlyIncomeRange: '$250K - $325K/yr',
    commissionTier: '$21,000 - $27,085/mo ($250K - $325K/yr)',
    promotionCriteria: 'Senior executive leadership spanning multi-state regional channels.',
    perks: ['Executive Committee Representation', 'VIP President Retreats'],
  },
  {
    level: 8,
    title: 'National Channel VP',
    isLeader: true,
    monthlyCommissionRange: '$27,085 - $37,500/mo',
    yearlyIncomeRange: '$325K - $450K/yr',
    commissionTier: '$27,085 - $37,500/mo ($325K - $450K/yr)',
    promotionCriteria: 'Federal Reserve District full co-exclusivity leadership and master channel volume.',
    perks: ['Federal Reserve District Full Co-Exclusivity', 'National Master Overrides'],
  },
  {
    level: 9,
    title: 'Senior National Channel VP',
    isLeader: true,
    monthlyCommissionRange: '$37,650 - $58,350/mo',
    yearlyIncomeRange: '$450K - $700K/yr',
    commissionTier: '$37,650 - $58,350/mo ($450K - $700K/yr)',
    promotionCriteria: 'Highest executive achievement tier across the nationwide B4B network.',
    perks: ['Founding Partner Legacy Designation', 'National Keynote Speaker Designation'],
  },
]

export const THE_16_SERVICES: ServiceItem[] = [
  {
    id: 'srv_1',
    title: 'Accept Payments',
    category: 'Operations',
    description: 'Next-day settlement merchant payment processing, zero-fee surcharging, and POS terminals with transparent interchange rates.',
    avgTicket: 65000,
    commissionRate: '10.0%',
    popular: true,
    iconName: 'CreditCard',
  },
  {
    id: 'srv_2',
    title: 'Business Management',
    category: 'Advisory',
    description: 'Fractional CFO leadership, treasury management, 13-week cash flow projections, and operating margin optimization.',
    avgTicket: 48000,
    commissionRate: '15.0%',
    popular: true,
    iconName: 'BarChart3',
  },
  {
    id: 'srv_3',
    title: 'Business Branding (Print My LOGO)',
    category: 'Growth',
    description: 'Commercial merchandise, corporate uniforms, large-format event signage, high-impact marketing collateral, and brand identity kits.',
    avgTicket: 15000,
    commissionRate: '20.0%',
    iconName: 'Palette',
  },
  {
    id: 'srv_4',
    title: 'Build Business Credit',
    category: 'Growth',
    description: 'Structured Tier 1-4 vendor trade lines to establish 80+ Dun & Bradstreet Paydex and Experian Business credit scores.',
    avgTicket: 12000,
    commissionRate: '25.0%',
    popular: true,
    iconName: 'ShieldCheck',
  },
  {
    id: 'srv_5',
    title: 'Business Plan Writing',
    category: 'Advisory',
    description: 'Bank-grade SBA and institutional investor business plans complete with 5-year financial models and market feasibility analysis.',
    avgTicket: 8500,
    commissionRate: '25.0%',
    iconName: 'FileText',
  },
  {
    id: 'srv_6',
    title: 'Business Funding and Loans',
    category: 'Capital',
    description: 'SBA 7(a) & 504 loans, working capital revolvers, equipment leasing, and bridge facilities up to $5,000,000.',
    avgTicket: 350000,
    commissionRate: '3.5%',
    popular: true,
    iconName: 'Wallet',
  },
  {
    id: 'srv_7',
    title: 'Lead Generation',
    category: 'Growth',
    description: 'Multi-channel B2B lead generation pipelines, targeted executive lists, AI outbound sequences, and appointment setting.',
    avgTicket: 22000,
    commissionRate: '18.0%',
    iconName: 'Zap',
  },
  {
    id: 'srv_8',
    title: 'Customer Service Academy',
    category: 'Operations',
    description: 'Corporate customer experience certification, client retention protocols, frontline support training, and call center QA audits.',
    avgTicket: 18000,
    commissionRate: '20.0%',
    iconName: 'Award',
  },
  {
    id: 'srv_9',
    title: 'Cyber Security',
    category: 'Operations',
    description: 'SOC2 readiness, vulnerability testing, endpoint monitoring, employee phishing defense training, and cyber liability prep.',
    avgTicket: 36000,
    commissionRate: '15.0%',
    iconName: 'ShieldAlert',
  },
  {
    id: 'srv_10',
    title: 'Find Jobs (B4B Jobs)',
    category: 'Growth',
    description: 'Dedicated national commercial recruitment board connecting qualified financial, sales, and operations talent with growing businesses.',
    avgTicket: 14000,
    commissionRate: '20.0%',
    iconName: 'Users',
  },
  {
    id: 'srv_11',
    title: 'Insurance',
    category: 'Capital',
    description: 'Commercial general liability, key-person life insurance, workers comp, errors & omissions, and business owner policies (BOP).',
    avgTicket: 28000,
    commissionRate: '12.0%',
    iconName: 'Shield',
  },
  {
    id: 'srv_12',
    title: 'IT Solutions',
    category: 'Operations',
    description: 'Managed IT infrastructure, cloud migration, automated backup continuity, and enterprise helpdesk support systems.',
    avgTicket: 45000,
    commissionRate: '15.0%',
    iconName: 'Globe',
  },
  {
    id: 'srv_13',
    title: 'Marketing',
    category: 'Growth',
    description: 'Full-funnel digital advertising, local SEO domination, video marketing campaigns, and conversion rate optimization.',
    avgTicket: 32000,
    commissionRate: '18.0%',
    popular: true,
    iconName: 'TrendingUp',
  },
  {
    id: 'srv_14',
    title: 'Affiliates and Partners',
    category: 'Growth',
    description: 'Turnkey affiliate revenue sharing framework enabling certified partners to monetize commercial client referrals.',
    avgTicket: 20000,
    commissionRate: '25.0%',
    iconName: 'Sparkles',
  },
  {
    id: 'srv_15',
    title: 'Bookkeeping and Tax Prep',
    category: 'Advisory',
    description: 'Monthly GAAP accrual bookkeeping, quarterly tax estimates, corporate tax filing, and R&D payroll tax credit recovery.',
    avgTicket: 24000,
    commissionRate: '20.0%',
    iconName: 'FileCheck',
  },
  {
    id: 'srv_16',
    title: 'Web Design Pros',
    category: 'Growth',
    description: 'High-converting custom web applications, responsive corporate websites, and secure client portal integrations.',
    avgTicket: 25000,
    commissionRate: '20.0%',
    popular: true,
    iconName: 'Globe',
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
    notes: ['Client interested in $850k revolving line for 4 new trucks.', 'Requested Business Funding package.'],
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
    notes: ['P&L statements received.', 'Needs Business Management & Working Capital bridge.'],
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
    notes: ['Looking to refinance existing equipment lease with Build Business Credit.'],
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
    notes: ['Discussed Bookkeeping and Tax Prep.'],
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
    lastActivity: 'Oct 02 - Facility Issued',
    notes: ['Closed $350k Accept Payments & Working Capital.', 'Commission paid.'],
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
    lastActivity: 'Oct 04 - Retainer Signed',
    notes: ['Signed 1-year Business Management advisory plus Cyber Security protocol.'],
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
    servicesPurchased: ['Business Funding and Loans', 'Business Management', 'Accept Payments'],
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
    servicesPurchased: ['Accept Payments', 'Bookkeeping and Tax Prep'],
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
    servicesPurchased: ['Business Management', 'Cyber Security', 'Web Design Pros'],
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
    servicesPurchased: ['Business Funding and Loans', 'Build Business Credit'],
    totalRevenue: 520000,
    status: 'Renewal Due',
    joinDate: '2025-11-14',
    cfoAssigned: 'Michael Chang',
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
