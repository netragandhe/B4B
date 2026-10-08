export interface RevenueHistoryPoint {
  month: string
  revenue: number
  expenses: number
  netProfit: number
  growthRate: number
}

export interface CapitalFacility {
  id: string
  title: string
  provider: string
  type: 'Revenue-Based' | 'Revolving Line' | 'SBA 7(a) Bridge' | 'Equipment Lease'
  limit: number
  drawn: number
  available: number
  rate: string
  term: string
  status: 'Active' | 'Approved' | 'In Review' | 'Disbursed'
}

export interface ConsultationSession {
  id: string
  advisorName: string
  advisorRole: string
  advisorAvatar: string
  topic: string
  date: string
  time: string
  status: 'Confirmed' | 'Completed' | 'Pending'
  duration: string
  actionItemsCount: number
}

export interface ApplicationDocument {
  id: string
  name: string
  category: 'Tax & Compliance' | 'Financial Statements' | 'Ownership & Legal' | 'Bank Feeds'
  uploadedAt: string
  size: string
  status: 'Verified' | 'Pending Review' | 'Needs Signature'
  type: string
}

export interface CaseStudy {
  id: string
  clientName: string
  industry: string
  growth: string
  capitalReceived: string
  quote: string
  advisor: string
  avatar: string
}

export const FINANCIAL_METRICS = {
  annualRunRate: 3450000,
  monthlyRevenue: 312500,
  monthlyExpenses: 218000,
  netMargin: 30.2,
  runwayMonths: 18.5,
  creditScore: 785,
  oalHealthScore: 92, // out of 100
  approvedWorkingCapital: 850000,
  totalDrawnCapital: 320000,
}

export const REVENUE_HISTORY: RevenueHistoryPoint[] = [
  { month: 'Jan', revenue: 195000, expenses: 148000, netProfit: 47000, growthRate: 8.5 },
  { month: 'Feb', revenue: 210000, expenses: 152000, netProfit: 58000, growthRate: 7.6 },
  { month: 'Mar', revenue: 235000, expenses: 168000, netProfit: 67000, growthRate: 11.9 },
  { month: 'Apr', revenue: 250000, expenses: 172000, netProfit: 78000, growthRate: 6.4 },
  { month: 'May', revenue: 278000, expenses: 185000, netProfit: 93000, growthRate: 11.2 },
  { month: 'Jun', revenue: 295000, expenses: 198000, netProfit: 97000, growthRate: 6.1 },
  { month: 'Jul', revenue: 312500, expenses: 218000, netProfit: 94500, growthRate: 5.9 },
]

export const CASH_FLOW_FORECAST = [
  { week: 'W1', projectedInflow: 85000, projectedOutflow: 52000, netPosition: 33000 },
  { week: 'W2', projectedInflow: 92000, projectedOutflow: 64000, netPosition: 61000 },
  { week: 'W3', projectedInflow: 115000, projectedOutflow: 71000, netPosition: 105000 },
  { week: 'W4', projectedInflow: 108000, projectedOutflow: 59000, netPosition: 154000 },
]

export const CAPITAL_FACILITIES: CapitalFacility[] = [
  {
    id: 'fac-101',
    title: 'Growth Capital Revolver',
    provider: 'OAL Institutional Syndication',
    type: 'Revolving Line',
    limit: 500000,
    drawn: 200000,
    available: 300000,
    rate: 'Prime + 1.75%',
    term: '24 Months',
    status: 'Active',
  },
  {
    id: 'fac-102',
    title: 'Revenue-Based Expansion Facility',
    provider: 'Horizon Venture Credit',
    type: 'Revenue-Based',
    limit: 250000,
    drawn: 120000,
    available: 130000,
    rate: '1.09x Cap',
    term: '18 Months',
    status: 'Active',
  },
  {
    id: 'fac-103',
    title: 'Fleet & Equipment Lease Modernization',
    provider: 'OAL Capital Partners',
    type: 'Equipment Lease',
    limit: 100000,
    drawn: 0,
    available: 100000,
    rate: '5.9% Fixed',
    term: '36 Months',
    status: 'Approved',
  },
]

export const CONSULTATION_SESSIONS: ConsultationSession[] = [
  {
    id: 'cs-401',
    advisorName: 'Victoria Hastings',
    advisorRole: 'Senior Managing Director & Fractional CFO',
    advisorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    topic: 'Q4 Working Capital Strategy & Debt Cost Optimization',
    date: 'Oct 15, 2026',
    time: '2:00 PM EST',
    status: 'Confirmed',
    duration: '45 mins',
    actionItemsCount: 4,
  },
  {
    id: 'cs-402',
    advisorName: 'Derrick Vance',
    advisorRole: 'Head of Debt Syndication',
    advisorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    topic: 'Underwriting Review: SBA 7(a) Guarantee Expansion',
    date: 'Oct 22, 2026',
    time: '11:30 AM EST',
    status: 'Confirmed',
    duration: '30 mins',
    actionItemsCount: 2,
  },
  {
    id: 'cs-403',
    advisorName: 'Elena Rostova',
    advisorRole: 'Operations & M&A Strategy Partner',
    advisorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    topic: 'Supply Chain Cash Conversion Cycle Diagnostics',
    date: 'Sep 28, 2026',
    time: '3:00 PM EST',
    status: 'Completed',
    duration: '60 mins',
    actionItemsCount: 6,
  },
]

export const APPLICATION_DOCUMENTS: ApplicationDocument[] = [
  {
    id: 'doc-01',
    name: '2025_Federal_Corporate_Tax_Return_1120S.pdf',
    category: 'Tax & Compliance',
    uploadedAt: 'Sep 12, 2026',
    size: '4.8 MB',
    status: 'Verified',
    type: 'PDF',
  },
  {
    id: 'doc-02',
    name: 'ApexLogistics_Trailing_12M_PL_BalanceSheet.xlsx',
    category: 'Financial Statements',
    uploadedAt: 'Oct 02, 2026',
    size: '1.2 MB',
    status: 'Verified',
    type: 'XLSX',
  },
  {
    id: 'doc-03',
    name: 'Commercial_Fleet_Vehicle_Titles_Schedule.pdf',
    category: 'Ownership & Legal',
    uploadedAt: 'Oct 04, 2026',
    size: '3.1 MB',
    status: 'Needs Signature',
    type: 'PDF',
  },
  {
    id: 'doc-04',
    name: 'Q3_Plaid_Bank_Feed_Reconciliation.csv',
    category: 'Bank Feeds',
    uploadedAt: 'Oct 06, 2026',
    size: '890 KB',
    status: 'Verified',
    type: 'CSV',
  },
  {
    id: 'doc-05',
    name: 'Corporate_Articles_of_Incorporation_Restated.pdf',
    category: 'Ownership & Legal',
    uploadedAt: 'Sep 15, 2026',
    size: '2.4 MB',
    status: 'Verified',
    type: 'PDF',
  },
]

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    clientName: 'Apex Freight Systems',
    industry: 'Logistics & Supply Chain',
    growth: '142% Annual Revenue Growth',
    capitalReceived: '$850,000 Secured',
    quote: 'OAL Network eliminated our 60-day receivables gap with a customized revolver. Their fractional CFO advisory was the difference between stagnating and scaling across 4 states.',
    advisor: 'Victoria Hastings, Partner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'cs-2',
    clientName: 'Kallisto BioTech Instruments',
    industry: 'Medical Devices & Labs',
    growth: '$2.1M Run-rate in 14 Mo',
    capitalReceived: '$1,200,000 Revenue-Based Facility',
    quote: 'Instead of diluting 25% of our equity to early seed investors, OAL Network structured non-dilutive capital linked to our purchase orders.',
    advisor: 'Derrick Vance, Debt Syndication',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'cs-3',
    clientName: 'ModernCraft Modulars',
    industry: 'Sustainable Construction',
    growth: '3.4x Capacity Expansion',
    capitalReceived: '$650,000 Equipment Lease',
    quote: 'The advisory team evaluated our financial models within 48 hours. By day 7, our production machinery was funded and our cash conversion cycle improved by 34 days.',
    advisor: 'Elena Rostova, Operations Partner',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
]

export const CONSULTING_SOLUTIONS = [
  {
    id: 'sol-1',
    title: 'Institutional Capital Sourcing',
    tag: 'Non-Dilutive Debt & Lines',
    description: 'We connect creditworthy small businesses with top-tier private credit funds, regional banks, and revenue-based facilities with transparent underwriting.',
    features: ['Direct access to $50k - $5M capital facilities', 'Competitive rates from Prime + 1.25%', 'Fast turnaround (48-72 hours approvals)', 'No predatory daily ACH debits'],
    icon: 'TrendingUp',
  },
  {
    id: 'sol-2',
    title: 'Fractional CFO & Treasury',
    tag: 'Strategic Financial Leadership',
    description: 'Get senior-level CFO guidance without executive salary overhead. We optimize cash conversion, tax deductions, working capital, and investor reporting.',
    features: ['13-week rolling cash flow forecasting', 'Working capital cycle optimization', 'KPI dashboard & unit economics audits', 'Board & lender-ready packages'],
    icon: 'Briefcase',
  },
  {
    id: 'sol-3',
    title: 'M&A & Expansion Advisory',
    tag: 'Growth & Exit Readiness',
    description: 'Navigate strategic acquisitions, partner buyouts, franchise expansions, and enterprise valuation enhancements with proven transaction specialists.',
    features: ['Business valuation benchmarking', 'Acquisition financing structures', 'Due diligence prep & data room assembly', 'Transition & synergy integration'],
    icon: 'ShieldCheck',
  },
]
