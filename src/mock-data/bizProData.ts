export interface BizProRankDefinition {
  rank: number
  title: string
  badgeColor: string
  minPersonalVolume: number
  minTeamVolume: number
  minDirectRecruits: number
  commissionRate: number // e.g. 10%
  teamOverrideRate: number // e.g. 2%
  perks: string[]
  isLeadership: boolean
}

export interface RankRequirementItem {
  id: string
  label: string
  current: number | string
  target: number | string
  completed: boolean
  unit?: string
}

export interface BizProLead {
  id: string
  clientName: string
  contactPerson: string
  email: string
  phone: string
  solution: string
  dealSize: number
  stage: 'New Leads' | 'Discovery Call' | 'Underwriting' | 'Term Sheet' | 'Funded' | 'Archived'
  urgency: 'Urgent (48h)' | 'Normal' | 'Low'
  createdAt: string
  lastActivity: string
  notes: string
}

export interface BizProClient {
  id: string
  businessName: string
  contactPerson: string
  email: string
  phone: string
  industry: string
  activeSolutions: string[]
  totalFundedVolume: number
  commissionGenerated: number
  healthScore: number
  joinedDate: string
  status: 'Active Client' | 'Under Review' | 'Completed'
  facilities: {
    name: string
    limit: number
    rate: string
    drawn: number
  }[]
  documentsCount: number
  lastContactDate: string
}

export interface DownlineMember {
  id: string
  name: string
  title: string
  rank: number
  region: string
  email: string
  phone: string
  avatar: string
  sponsorCode: string
  monthlyVolume: number
  overrideEarned: number
  activeClients: number
  joinedDate: string
  downlineRecruits?: DownlineMember[]
}

export interface LeaderboardEntry {
  rankPosition: number
  name: string
  avatar: string
  bizProRank: number
  bizProTitle: string
  region: string
  monthlyVolume: number
  closedDeals: number
}

export interface CommissionItem {
  id: string
  dealId: string
  clientName: string
  solution: string
  date: string
  grossVolume: number
  commissionRate: number
  amount: number
  type: 'Personal Direct' | 'Team Override (Level 1)' | 'Team Override (Level 2)' | 'Rank Bonus'
  status: 'Paid' | 'Processing' | 'Pending Settlement'
}

export interface RecruitInvite {
  id: string
  candidateName: string
  email: string
  region: string
  sentDate: string
  status: 'Invitation Sent' | 'Opened' | 'Registered' | 'Onboarding Completed'
  sponsorCode: string
}

export const BIZPRO_RANKS: BizProRankDefinition[] = [
  {
    rank: 1,
    title: 'Associate Advisor',
    badgeColor: 'primary',
    minPersonalVolume: 0,
    minTeamVolume: 0,
    minDirectRecruits: 0,
    commissionRate: 5.0,
    teamOverrideRate: 0.0,
    perks: ['Standard CRM access', 'Basic collateral library', 'Direct client referral commissions (5%)'],
    isLeadership: false,
  },
  {
    rank: 2,
    title: 'Senior Advisor',
    badgeColor: 'primary',
    minPersonalVolume: 25000,
    minTeamVolume: 0,
    minDirectRecruits: 0,
    commissionRate: 7.5,
    teamOverrideRate: 0.0,
    perks: ['Priority underwriting review', 'Co-branded business cards & PDFs', 'Direct commission boost (7.5%)'],
    isLeadership: false,
  },
  {
    rank: 3,
    title: 'Managing Advisor',
    badgeColor: 'royal',
    minPersonalVolume: 50000,
    minTeamVolume: 0,
    minDirectRecruits: 0,
    commissionRate: 10.0,
    teamOverrideRate: 0.0,
    perks: ['White-label lead landing pages', 'Access to Fractional CFO deal desks', 'Direct commission rate (10%)'],
    isLeadership: false,
  },
  {
    rank: 4,
    title: 'Regional Director',
    badgeColor: 'emerald',
    minPersonalVolume: 100000,
    minTeamVolume: 250000,
    minDirectRecruits: 3,
    commissionRate: 12.5,
    teamOverrideRate: 2.0,
    perks: [
      '★ TEAM LEADERSHIP UNLOCKED',
      '2.0% Team downline commission overrides',
      'My Team Org-Tree view & recruitment tools',
      'Regional territory exclusivity assignment',
      'Team scoreboard & producer analytics',
    ],
    isLeadership: true,
  },
  {
    rank: 5,
    title: 'Senior Regional Director',
    badgeColor: 'emerald',
    minPersonalVolume: 150000,
    minTeamVolume: 500000,
    minDirectRecruits: 5,
    commissionRate: 15.0,
    teamOverrideRate: 3.0,
    perks: [
      '3.0% Level 1 overrides + 1.0% Level 2 overrides',
      'Dedicated institutional debt desk pod',
      'Expense allowance & sponsored local events',
    ],
    isLeadership: true,
  },
  {
    rank: 6,
    title: 'Vice President',
    badgeColor: 'gold',
    minPersonalVolume: 200000,
    minTeamVolume: 1000000,
    minDirectRecruits: 8,
    commissionRate: 17.5,
    teamOverrideRate: 4.0,
    perks: [
      '4.0% Team overrides',
      'Multi-state territory licensing',
      'Annual luxury leadership summit invitation',
    ],
    isLeadership: true,
  },
  {
    rank: 7,
    title: 'Senior Vice President',
    badgeColor: 'gold',
    minPersonalVolume: 250000,
    minTeamVolume: 2500000,
    minDirectRecruits: 12,
    commissionRate: 20.0,
    teamOverrideRate: 5.0,
    perks: [
      '5.0% Team overrides',
      'Executive equity participation pool',
      'Private syndication fund allocations',
    ],
    isLeadership: true,
  },
  {
    rank: 8,
    title: 'Executive Managing Director',
    badgeColor: 'navy',
    minPersonalVolume: 350000,
    minTeamVolume: 5000000,
    minDirectRecruits: 18,
    commissionRate: 22.5,
    teamOverrideRate: 6.0,
    perks: [
      '6.0% Team overrides across multi-tier hierarchy',
      'Voting seat on National Underwriting Committee',
      'Full white-label enterprise brokerage portal',
    ],
    isLeadership: true,
  },
  {
    rank: 9,
    title: 'National Partner',
    badgeColor: 'gold',
    minPersonalVolume: 500000,
    minTeamVolume: 10000000,
    minDirectRecruits: 25,
    commissionRate: 25.0,
    teamOverrideRate: 7.0,
    perks: [
      'Top-tier 25% personal commissions + 7.0% national override pool',
      'Lifetime profit-sharing partnership unit',
      'Co-ownership in secondary debt syndication vehicles',
    ],
    isLeadership: true,
  },
]

export const BIZPRO_DASHBOARD_DATA = {
  personalVolume: 142500,
  volumeChange: 14.8,
  volumeSparkline: [85, 92, 105, 110, 128, 134, 142.5],
  
  personalCommissions: 14250,
  commissionsChange: 18.2,
  commissionsSparkline: [8.5, 9.2, 10.5, 11.0, 12.8, 13.4, 14.25],

  activePipelineLeads: 24,
  leadsChange: 8.5,
  leadsSparkline: [14, 16, 18, 19, 21, 22, 24],

  closingRate: 68,
  closingRateChange: 5.1,
  closingSparkline: [58, 60, 62, 61, 65, 66, 68],

  // Extra leadership KPIs for Rank 4+
  teamOverrideVolume: 485000,
  teamVolumeChange: 22.4,
  teamVolumeSparkline: [280, 310, 360, 395, 430, 460, 485],

  teamCommissions: 9700,
  teamCommissionsChange: 24.1,
  teamCommissionsSparkline: [5.6, 6.2, 7.2, 7.9, 8.6, 9.2, 9.7],

  // Next Promotion Progress (towards Rank 5 for a Rank 4 user)
  promotionProgressPercentage: 78,
  nextRankTitle: 'Rank 5: Senior Regional Director',
  requirementsChecklist: [
    {
      id: 'req-1',
      label: 'Personal Closed Volume',
      current: '$142,500',
      target: '$150,000',
      completed: false,
    },
    {
      id: 'req-2',
      label: 'Team Downline Volume',
      current: '$485,000',
      target: '$500,000',
      completed: false,
    },
    {
      id: 'req-3',
      label: 'Active Direct Recruits',
      current: '5 Active',
      target: '5 Recruits',
      completed: true,
    },
    {
      id: 'req-4',
      label: 'Advanced SBA Underwriting Exam',
      current: 'Certified (Score 98%)',
      target: 'Pass Certification',
      completed: true,
    },
    {
      id: 'req-5',
      label: 'Active Platform Subscription',
      current: 'Paid ($25/mo Active)',
      target: 'Good Standing',
      completed: true,
    },
  ],

  // Lead Funnel Conversion Stages
  leadFunnel: [
    { stage: 'Inquiries Received', count: 120, conversion: '100%' },
    { stage: 'Discovery Calls', count: 64, conversion: '53.3%' },
    { stage: 'Underwriting File Review', count: 38, conversion: '31.6%' },
    { stage: 'Term Sheets Delivered', count: 22, conversion: '18.3%' },
    { stage: 'Funded / Deal Closed', count: 14, conversion: '11.6%' },
  ],

  // Monthly Revenue Trend for Recharts
  monthlyRevenueTrend: [
    { month: 'May', personalRevenue: 92000, personalCommission: 9200, teamOverride: 5600 },
    { month: 'Jun', personalRevenue: 105000, personalCommission: 10500, teamOverride: 6800 },
    { month: 'Jul', personalRevenue: 110000, personalCommission: 11000, teamOverride: 7400 },
    { month: 'Aug', personalRevenue: 128000, personalCommission: 12800, teamOverride: 8200 },
    { month: 'Sep', personalRevenue: 134000, personalCommission: 13400, teamOverride: 8900 },
    { month: 'Oct', personalRevenue: 142500, personalCommission: 14250, teamOverride: 9700 },
  ],

  // Top 5 Regional Bulletin Leaderboard
  top5Leaderboard: [
    {
      rankPosition: 1,
      name: 'Marcus Vance (You)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bizProRank: 4,
      bizProTitle: 'Regional Director',
      region: 'Northeast Region',
      monthlyVolume: 142500,
      closedDeals: 14,
    },
    {
      rankPosition: 2,
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      bizProRank: 5,
      bizProTitle: 'Sr. Regional Director',
      region: 'Southeast Region',
      monthlyVolume: 138000,
      closedDeals: 12,
    },
    {
      rankPosition: 3,
      name: 'David Cho',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bizProRank: 4,
      bizProTitle: 'Regional Director',
      region: 'West Coast Region',
      monthlyVolume: 122400,
      closedDeals: 11,
    },
    {
      rankPosition: 4,
      name: 'Elena Gomez',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      bizProRank: 3,
      bizProTitle: 'Managing Advisor',
      region: 'Midwest Region',
      monthlyVolume: 98500,
      closedDeals: 9,
    },
    {
      rankPosition: 5,
      name: 'Michael Ross',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
      bizProRank: 4,
      bizProTitle: 'Regional Director',
      region: 'Mid-Atlantic',
      monthlyVolume: 89000,
      closedDeals: 8,
    },
  ] as LeaderboardEntry[],
}

export const BIZPRO_LEADS: BizProLead[] = [
  {
    id: 'lead-801',
    clientName: 'Beacon Ridge Logistics Corp',
    contactPerson: 'Thomas Albright',
    email: 't.albright@beaconridge.com',
    phone: '(404) 555-0192',
    solution: 'Business Loans & Revolver',
    dealSize: 350000,
    stage: 'Term Sheet',
    urgency: 'Urgent (48h)',
    createdAt: 'Oct 04, 2026',
    lastActivity: 'Term sheet under corporate officer review.',
    notes: 'Needs $350k working capital facility for fuel float & fleet maintenance.',
  },
  {
    id: 'lead-802',
    clientName: 'NovaCraft Architectural Millwork',
    contactPerson: 'Elena Rostova',
    email: 'elena@novacraftmill.com',
    phone: '(312) 555-4421',
    solution: 'Equipment Lease & Line',
    dealSize: 200000,
    stage: 'Funded',
    urgency: 'Normal',
    createdAt: 'Sep 28, 2026',
    lastActivity: 'Disbursed into checking. Commission approved.',
    notes: 'Funded CNC milling machinery through OAL equipment desk.',
  },
  {
    id: 'lead-803',
    clientName: 'Vanguard Medical Diagnostic Labs',
    contactPerson: 'Dr. Gregory Hayes',
    email: 'ghayes@vanguarddx.com',
    phone: '(617) 555-8832',
    solution: 'Revenue-Based Working Capital',
    dealSize: 500000,
    stage: 'Funded',
    urgency: 'Normal',
    createdAt: 'Sep 15, 2026',
    lastActivity: 'Client receiving daily reporting. Paid out.',
    notes: '$500k facility structured against healthcare insurer receivables.',
  },
  {
    id: 'lead-804',
    clientName: 'Cascade Artisan Bakeries LLC',
    contactPerson: 'Marie Dupont',
    email: 'marie@cascadebakery.com',
    phone: '(206) 555-3199',
    solution: 'Merchant POS & Processing',
    dealSize: 75000,
    stage: 'Discovery Call',
    urgency: 'Normal',
    createdAt: 'Oct 06, 2026',
    lastActivity: 'Discovery briefing scheduled for Oct 10 at 2 PM.',
    notes: 'Switching 4 retail locations from legacy processor to OAL POS.',
  },
  {
    id: 'lead-805',
    clientName: 'Zenith Solar Clean Energy',
    contactPerson: 'Marcus Bennett',
    email: 'mbennett@zenithsolar.org',
    phone: '(512) 555-7714',
    solution: 'Build Business Credit (Tier 1-4)',
    dealSize: 45000,
    stage: 'New Leads',
    urgency: 'Normal',
    createdAt: 'Oct 07, 2026',
    lastActivity: 'Lead received from regional web campaign.',
    notes: 'Wants to establish 80+ Paydex score and commercial trade lines.',
  },
  {
    id: 'lead-806',
    clientName: 'Summit Peak Hospitality Group',
    contactPerson: 'Chloe Sutherland',
    email: 'chloe@summithospitality.com',
    phone: '(720) 555-9011',
    solution: 'SBA 7(a) Business Plan Package',
    dealSize: 28000,
    stage: 'Underwriting',
    urgency: 'Urgent (48h)',
    createdAt: 'Oct 02, 2026',
    lastActivity: 'Pro-forma financial model sent to SBA underwriter.',
    notes: '$1.4M boutique hotel expansion project in Denver.',
  },
  {
    id: 'lead-807',
    clientName: 'AeroDrone Survey Systems',
    contactPerson: 'Lucas Sterling',
    email: 'lsterling@aerodrone.tech',
    phone: '(415) 555-2290',
    solution: 'Fractional CFO & Treasury',
    dealSize: 60000,
    stage: 'Discovery Call',
    urgency: 'Low',
    createdAt: 'Oct 05, 2026',
    lastActivity: 'Initial diagnostic meeting notes drafted.',
    notes: 'Series A startup seeking 13-week cash forecasting model.',
  },
]

export const BIZPRO_CLIENTS: BizProClient[] = [
  {
    id: 'cli-101',
    businessName: 'Apex Freight & Logistics LLC',
    contactPerson: 'Marcus Vance',
    email: 'm.vance@apexlogistics.io',
    phone: '(404) 555-0192',
    industry: 'Freight & Transportation',
    activeSolutions: ['Growth Capital Revolver', 'Fractional CFO Retainer'],
    totalFundedVolume: 850000,
    commissionGenerated: 14250,
    healthScore: 92,
    joinedDate: 'Jan 15, 2026',
    status: 'Active Client',
    facilities: [
      { name: 'Growth Revolver', limit: 500000, rate: 'Prime + 1.75%', drawn: 200000 },
      { name: 'Revenue Expansion', limit: 250000, rate: '1.09x Cap', drawn: 120000 },
      { name: 'Fleet Equipment Lease', limit: 100000, rate: '5.9% Fixed', drawn: 0 },
    ],
    documentsCount: 8,
    lastContactDate: 'Today',
  },
  {
    id: 'cli-102',
    businessName: 'NovaCraft Architectural Millwork',
    contactPerson: 'Elena Rostova',
    email: 'elena@novacraftmill.com',
    phone: '(312) 555-4421',
    industry: 'Manufacturing & Construction',
    activeSolutions: ['Equipment Lease & Machinery', 'Build Business Credit'],
    totalFundedVolume: 200000,
    commissionGenerated: 2400,
    healthScore: 88,
    joinedDate: 'Mar 10, 2026',
    status: 'Active Client',
    facilities: [
      { name: 'CNC Equipment Lease', limit: 200000, rate: '6.2% Fixed', drawn: 200000 },
    ],
    documentsCount: 5,
    lastContactDate: 'Oct 06, 2026',
  },
  {
    id: 'cli-103',
    businessName: 'Vanguard Medical Diagnostic Labs',
    contactPerson: 'Dr. Gregory Hayes',
    email: 'ghayes@vanguarddx.com',
    phone: '(617) 555-8832',
    industry: 'Healthcare Diagnostics',
    activeSolutions: ['Revenue-Based Working Capital'],
    totalFundedVolume: 500000,
    commissionGenerated: 6250,
    healthScore: 95,
    joinedDate: 'Feb 22, 2026',
    status: 'Active Client',
    facilities: [
      { name: 'Accounts Receivable Facility', limit: 500000, rate: '1.08x Factor', drawn: 380000 },
    ],
    documentsCount: 12,
    lastContactDate: 'Sep 30, 2026',
  },
]

export const BIZPRO_DOWNLINE_TREE: DownlineMember[] = [
  {
    id: 'down-01',
    name: 'David Vance',
    title: 'Senior Advisor (Rank 2)',
    rank: 2,
    region: 'New York Metro (NY)',
    email: 'd.vance@apexlogistics.io',
    phone: '(212) 555-9011',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    sponsorCode: 'BIZ-88219-01',
    monthlyVolume: 92000,
    overrideEarned: 1840,
    activeClients: 7,
    joinedDate: 'Feb 15, 2026',
    downlineRecruits: [
      {
        id: 'down-01-a',
        name: 'Jessica Thorne',
        title: 'Associate Advisor (Rank 1)',
        rank: 1,
        region: 'Long Island, NY',
        email: 'jthorne@advisorhub.io',
        phone: '(516) 555-7721',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        sponsorCode: 'BIZ-88219-01-A',
        monthlyVolume: 42000,
        overrideEarned: 420,
        activeClients: 3,
        joinedDate: 'Jun 01, 2026',
      },
      {
        id: 'down-01-b',
        name: 'Robert Lang',
        title: 'Associate Advisor (Rank 1)',
        rank: 1,
        region: 'White Plains, NY',
        email: 'rlang@advisorhub.io',
        phone: '(914) 555-3301',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        sponsorCode: 'BIZ-88219-01-B',
        monthlyVolume: 38000,
        overrideEarned: 380,
        activeClients: 3,
        joinedDate: 'Jul 15, 2026',
      },
    ],
  },
  {
    id: 'down-02',
    name: 'Chloe Morrison',
    title: 'Managing Advisor (Rank 3)',
    rank: 3,
    region: 'Northern New Jersey (NJ)',
    email: 'cmorrison@apexlogistics.io',
    phone: '(201) 555-4488',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80',
    sponsorCode: 'BIZ-88219-02',
    monthlyVolume: 148000,
    overrideEarned: 2960,
    activeClients: 11,
    joinedDate: 'Mar 01, 2026',
    downlineRecruits: [
      {
        id: 'down-02-a',
        name: 'Brian Patel',
        title: 'Senior Advisor (Rank 2)',
        rank: 2,
        region: 'Jersey City & Newark, NJ',
        email: 'bpatel@advisorhub.io',
        phone: '(732) 555-9988',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
        sponsorCode: 'BIZ-88219-02-A',
        monthlyVolume: 85000,
        overrideEarned: 850,
        activeClients: 6,
        joinedDate: 'Apr 20, 2026',
      },
    ],
  },
  {
    id: 'down-03',
    name: 'Samuel Zhang',
    title: 'Associate Advisor (Rank 1)',
    rank: 1,
    region: 'Fairfield County (CT)',
    email: 'szhang@apexlogistics.io',
    phone: '(203) 555-1234',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    sponsorCode: 'BIZ-88219-03',
    monthlyVolume: 52000,
    overrideEarned: 1040,
    activeClients: 4,
    joinedDate: 'Aug 10, 2026',
  },
  {
    id: 'down-04',
    name: 'Ashley Cruz',
    title: 'Senior Advisor (Rank 2)',
    rank: 2,
    region: 'Philadelphia & Eastern PA',
    email: 'acruz@apexlogistics.io',
    phone: '(215) 555-6622',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    sponsorCode: 'BIZ-88219-04',
    monthlyVolume: 78000,
    overrideEarned: 1560,
    activeClients: 5,
    joinedDate: 'Apr 12, 2026',
  },
  {
    id: 'down-05',
    name: 'Anthony Rossi',
    title: 'Associate Advisor (Rank 1)',
    rank: 1,
    region: 'Bergen County, NJ',
    email: 'arossi@apexlogistics.io',
    phone: '(201) 555-8819',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    sponsorCode: 'BIZ-88219-05',
    monthlyVolume: 32000,
    overrideEarned: 640,
    activeClients: 2,
    joinedDate: 'Sep 01, 2026',
  },
]

export const BIZPRO_COMMISSIONS_STATEMENT: CommissionItem[] = [
  {
    id: 'comm-901',
    dealId: 'DL-2026-1002',
    clientName: 'NovaCraft Architectural Millwork',
    solution: 'Equipment Lease & Machinery',
    date: 'Oct 06, 2026',
    grossVolume: 200000,
    commissionRate: 12.5,
    amount: 2500,
    type: 'Personal Direct',
    status: 'Paid',
  },
  {
    id: 'comm-902',
    dealId: 'DL-2026-0928',
    clientName: 'Vanguard Medical Diagnostics',
    solution: 'Revenue-Based Facility',
    date: 'Sep 30, 2026',
    grossVolume: 500000,
    commissionRate: 12.5,
    amount: 6250,
    type: 'Personal Direct',
    status: 'Paid',
  },
  {
    id: 'comm-903',
    dealId: 'DL-2026-0925',
    clientName: 'Summit Peak Hospitality',
    solution: 'SBA 7(a) Business Plan Package',
    date: 'Sep 29, 2026',
    grossVolume: 28000,
    commissionRate: 12.5,
    amount: 500,
    type: 'Personal Direct',
    status: 'Paid',
  },
  {
    id: 'comm-904',
    dealId: 'TM-2026-1001',
    clientName: 'Chloe Morrison Downline (5 Deals)',
    solution: 'Downline Team Volume ($148,000)',
    date: 'Oct 01, 2026',
    grossVolume: 148000,
    commissionRate: 2.0,
    amount: 2960,
    type: 'Team Override (Level 1)',
    status: 'Paid',
  },
  {
    id: 'comm-905',
    dealId: 'TM-2026-1002',
    clientName: 'David Vance Downline (3 Deals)',
    solution: 'Downline Team Volume ($92,000)',
    date: 'Oct 01, 2026',
    grossVolume: 92000,
    commissionRate: 2.0,
    amount: 1840,
    type: 'Team Override (Level 1)',
    status: 'Paid',
  },
  {
    id: 'comm-906',
    dealId: 'TM-2026-1003',
    clientName: 'Level 2 Overrides (Brian Patel, Jessica Thorne)',
    solution: 'Secondary Downline Volume ($127,000)',
    date: 'Oct 01, 2026',
    grossVolume: 127000,
    commissionRate: 1.0,
    amount: 1270,
    type: 'Team Override (Level 2)',
    status: 'Paid',
  },
  {
    id: 'comm-907',
    dealId: 'DL-2026-1004',
    clientName: 'Beacon Ridge Logistics Corp',
    solution: 'Revolving Credit Line ($350k)',
    date: 'Oct 07, 2026',
    grossVolume: 350000,
    commissionRate: 12.5,
    amount: 4375,
    type: 'Personal Direct',
    status: 'Processing',
  },
]

export const BIZPRO_RECRUIT_INVITES: RecruitInvite[] = [
  {
    id: 'rec-01',
    candidateName: 'Gregory Vance, CPA',
    email: 'gregory@vancecpa.com',
    region: 'Northeast Region (NY)',
    sentDate: 'Oct 02, 2026',
    status: 'Onboarding Completed',
    sponsorCode: 'BIZ-88219',
  },
  {
    id: 'rec-02',
    candidateName: 'Patricia Lin, Commercial Broker',
    email: 'patricia@lincommercial.com',
    region: 'Northeast Region (CT)',
    sentDate: 'Oct 04, 2026',
    status: 'Registered',
    sponsorCode: 'BIZ-88219',
  },
  {
    id: 'rec-03',
    candidateName: 'Jonathan Hall, Financial Planner',
    email: 'jhall@hallwealth.io',
    region: 'Northeast Region (NJ)',
    sentDate: 'Oct 06, 2026',
    status: 'Opened',
    sponsorCode: 'BIZ-88219',
  },
  {
    id: 'rec-04',
    candidateName: 'Melissa Howard',
    email: 'mhoward@capitalpulse.com',
    region: 'Northeast Region (PA)',
    sentDate: 'Oct 07, 2026',
    status: 'Invitation Sent',
    sponsorCode: 'BIZ-88219',
  },
]
