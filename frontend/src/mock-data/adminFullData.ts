import { RankRule, InventoryServiceProduct } from './adminData'

export interface RankDistributionItem {
  rankLevel: number
  title: string
  count: number
  color: string
}

export const RANK_DISTRIBUTION_DATA: RankDistributionItem[] = [
  { rankLevel: 1, title: 'Account Executive', count: 42, color: '#3B82F6' },
  { rankLevel: 2, title: 'Relationship Coordinator II', count: 31, color: '#06B6D4' },
  { rankLevel: 3, title: 'Senior Executive', count: 24, color: '#10B981' },
  { rankLevel: 4, title: 'District Leader', count: 18, color: '#8B5CF6' },
  { rankLevel: 5, title: 'Regional Leader', count: 14, color: '#EC4899' },
  { rankLevel: 6, title: 'Channel VP', count: 9, color: '#F59E0B' },
  { rankLevel: 7, title: 'Senior Channel VP', count: 5, color: '#EF4444' },
  { rankLevel: 8, title: 'National Channel VP', count: 3, color: '#6366F1' },
  { rankLevel: 9, title: 'Senior National Channel VP', count: 2, color: '#D97706' },
]

export interface AdminActivityFeedItem {
  id: string
  user: string
  avatar: string
  action: string
  target: string
  timestamp: string
  category: 'approval' | 'system' | 'commission' | 'job' | 'user'
}

export const ADMIN_ACTIVITY_FEED: AdminActivityFeedItem[] = [
  {
    id: 'act_1',
    user: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    action: 'submitted onboarding credentials for',
    target: 'Apex Commercial Partners (Employer)',
    timestamp: '10 mins ago',
    category: 'approval',
  },
  {
    id: 'act_2',
    user: 'David Ross',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    action: 'requested rank promotion to',
    target: 'Regional Leader (Rank 5)',
    timestamp: '25 mins ago',
    category: 'approval',
  },
  {
    id: 'act_3',
    user: 'Super Admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    action: 'updated commission multiplier for',
    target: 'SBA 7(a) Guarantee Facility',
    timestamp: '1 hour ago',
    category: 'commission',
  },
  {
    id: 'act_4',
    user: 'TechCorp Logistics',
    avatar: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=200&q=80',
    action: 'posted new job position',
    target: 'Senior B2B Sales Executive ($140k)',
    timestamp: '2 hours ago',
    category: 'job',
  },
  {
    id: 'act_5',
    user: 'System Bot',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    action: 're-calculated monthly leaderboard rankings for',
    target: 'October 2026 Scoreboard',
    timestamp: '4 hours ago',
    category: 'system',
  },
]

// 100 MOCK INVENTORY SERVICES GENERATOR
export const GENERATE_100_INVENTORY_PRODUCTS = (): InventoryServiceProduct[] => {
  const CORE_16_NAMES: { title: string; category: 'Capital' | 'Advisory' | 'Operations' | 'Growth'; price: number; rate: string }[] = [
    { title: 'Accept Payments', category: 'Operations', price: 65000, rate: '10.0%' },
    { title: 'Business Management', category: 'Advisory', price: 48000, rate: '15.0%' },
    { title: 'Business Branding (Print My LOGO)', category: 'Growth', price: 15000, rate: '20.0%' },
    { title: 'Build Business Credit', category: 'Growth', price: 12000, rate: '25.0%' },
    { title: 'Business Plan Writing', category: 'Advisory', price: 8500, rate: '25.0%' },
    { title: 'Business Funding and Loans', category: 'Capital', price: 350000, rate: '3.5%' },
    { title: 'Lead Generation', category: 'Growth', price: 22000, rate: '18.0%' },
    { title: 'Customer Service Academy', category: 'Operations', price: 18000, rate: '20.0%' },
    { title: 'Cyber Security', category: 'Operations', price: 36000, rate: '15.0%' },
    { title: 'Find Jobs (B4B Jobs)', category: 'Growth', price: 14000, rate: '20.0%' },
    { title: 'Insurance', category: 'Capital', price: 28000, rate: '12.0%' },
    { title: 'IT Solutions', category: 'Operations', price: 45000, rate: '15.0%' },
    { title: 'Marketing', category: 'Growth', price: 32000, rate: '18.0%' },
    { title: 'Affiliates and Partners', category: 'Growth', price: 20000, rate: '25.0%' },
    { title: 'Bookkeeping and Tax Prep', category: 'Advisory', price: 24000, rate: '20.0%' },
    { title: 'Web Design Pros', category: 'Growth', price: 25000, rate: '20.0%' },
  ]

  const prefixes = [
    'Express', 'Enterprise', 'Syndicated', 'Tier-1', 'Regional', 'Custom', 'Corporate',
    'Commercial', 'Prime', 'Advanced', 'Integrated', 'Turnkey', 'Direct', 'Institutional'
  ]

  const products: InventoryServiceProduct[] = []

  // First 16 are the primary client solutions
  CORE_16_NAMES.forEach((core, idx) => {
    products.push({
      id: `prd_${String(idx + 1).padStart(3, '0')}`,
      title: core.title,
      sku: `SKU-B4B-${String(idx + 1).padStart(3, '0')}`,
      category: core.category,
      basePrice: core.price,
      commissionRate: core.rate,
      status: 'Active',
      updatedAt: '2026-10-01',
    })
  })

  // Next 84 products are specialized packages and tier variations of the 16 solutions
  for (let i = 17; i <= 100; i++) {
    const coreTemplate = CORE_16_NAMES[(i - 1) % CORE_16_NAMES.length]
    const pIndex = (i - 1) % prefixes.length
    const price = Math.round(coreTemplate.price * (1 + ((i % 5) * 0.25)))
    const status: 'Active' | 'Archived' | 'Draft' = i % 15 === 0 ? 'Archived' : i % 9 === 0 ? 'Draft' : 'Active'

    products.push({
      id: `prd_${String(i).padStart(3, '0')}`,
      title: `${prefixes[pIndex]} ${coreTemplate.title} Package #${i}`,
      sku: `SKU-B4B-${String(i).padStart(3, '0')}`,
      category: coreTemplate.category,
      basePrice: price,
      commissionRate: coreTemplate.rate,
      status: status,
      updatedAt: `2026-10-${String((i % 28) + 1).padStart(2, '0')}`,
    })
  }

  return products
}

// 16 SOLUTION PAGES CMS DATA
export interface CmsSolutionPage {
  id: string
  slug: string
  title: string
  metaDescription: string
  heroTitle: string
  subheadline: string
  bodyText: string
  faqs: { question: string; answer: string }[]
  lastUpdated: string
}

export const CMS_16_SOLUTION_PAGES: CmsSolutionPage[] = [
  {
    id: 'sol_1',
    slug: 'working-capital',
    title: 'Revenue-Based Working Capital Lines',
    metaDescription: 'Flexible business working capital lines up to $5M with same-day liquidity.',
    heroTitle: 'Unlocking Liquidity for Fast-Growing Enterprise Operations',
    subheadline: 'Non-dilutive revolving funding tailored to recurring invoice cycles.',
    bodyText: 'Our working capital facilities empower mid-market businesses to bridge cash flow gaps, execute seasonal inventory purchasing, and capture supplier discounts without giving up equity or restrictive bank covenants.',
    faqs: [
      { question: 'What is the maximum line size?', answer: 'Facilities range from $50,000 up to $5,000,000 depending on trailing revenue.' },
      { question: 'How quickly are funds disbursed?', answer: 'Decisions are rendered in under 4 hours with funding delivered within 24 hours.' },
    ],
    lastUpdated: '2026-10-06',
  },
  {
    id: 'sol_2',
    slug: 'equipment-financing',
    title: 'Heavy Equipment & Fleet Financing',
    metaDescription: '100% equipment loan and lease financing with flexible repayment terms.',
    heroTitle: 'Modernize Equipment & Vehicle Fleets with Zero Upfront Capital',
    subheadline: 'Customized lease structures, application-only approvals up to $350,000.',
    bodyText: 'Acquire critical machinery, transportation fleets, healthcare technology, and industrial equipment with zero capital expenditure out of pocket. Structured options include Section 179 tax optimization lease plans.',
    faqs: [
      { question: 'Can soft costs like shipping be included?', answer: 'Yes, up to 25% of total project cost can include installation and warranty.' },
    ],
    lastUpdated: '2026-10-04',
  },
  {
    id: 'sol_3',
    slug: 'sba-loans',
    title: 'SBA 7(a) & 504 Government Guarantee Loans',
    metaDescription: 'Low-rate government backed loans up to $5M with terms up to 25 years.',
    heroTitle: 'Long-Term Low Rate SBA Capital for Business Acquisition & Real Estate',
    subheadline: 'Preferred lender processing for rapid term sheet execution.',
    bodyText: 'SBA financing provides the longest amortizations and lowest interest rates for working capital, owner-occupied commercial property, debt refinancing, and business acquisitions.',
    faqs: [
      { question: 'What credit score is required?', answer: 'Min 680 FICO recommended for principal owners holding 20%+ equity.' },
    ],
    lastUpdated: '2026-10-02',
  },
  {
    id: 'sol_4',
    slug: 'commercial-real-estate',
    title: 'Commercial Real Estate Financing & Bridge Loans',
    metaDescription: 'Acquisition, refinancing, and construction debt for commercial properties.',
    heroTitle: 'Institutional CRE Capital for Industrial, Retail, and Multifamily Portfolios',
    subheadline: 'Competitive LTV up to 80% with fast closing bridge options.',
    bodyText: 'From owner-occupied warehouses to value-add multifamily developments, our real estate capital desk structures senior debt, mezzanine financing, and short-term bridge loans.',
    faqs: [
      { question: 'What is the minimum loan amount?', answer: '$500,000 minimum loan size up to $50,000,000.' },
    ],
    lastUpdated: '2026-09-29',
  },
  {
    id: 'sol_5',
    slug: 'invoice-factoring',
    title: 'Invoice Factoring & Accounts Receivable Lines',
    metaDescription: 'Convert unpaid B2B invoices into immediate cash flow.',
    heroTitle: 'Turn Slow 60/90-Day B2B Invoices into Instant Working Capital',
    subheadline: 'Non-recourse credit risk protection for B2B manufacturers and distributors.',
    bodyText: 'Eliminate cash flow stress caused by net-60 terms. Upload approved invoices and receive up to 90% advance rates within hours while we manage credit verification.',
    faqs: [
      { question: 'Is factoring confidential?', answer: 'We offer both recourse and non-recourse confidential billing options.' },
    ],
    lastUpdated: '2026-10-01',
  },
  {
    id: 'sol_6',
    slug: 'merchant-cash-advance',
    title: 'Merchant Cash Advance & Daily Sales Funding',
    metaDescription: 'Short-term cash advances based on daily credit card and POS volume.',
    heroTitle: 'Flexible Daily Revenue Advances for Retail & Restaurant Enterprise',
    subheadline: 'No fixed monthly payment — repayment adjusts with daily revenue.',
    bodyText: 'Tailored for businesses with high credit card transaction volume. Repayment flexes automatically with daily sales volume so cash flow is never strained during slow weeks.',
    faqs: [
      { question: 'What is required for approval?', answer: '3 months of business bank statements showing $15,000+ monthly sales.' },
    ],
    lastUpdated: '2026-09-25',
  },
  {
    id: 'sol_7',
    slug: 'franchise-loans',
    title: 'Franchise Funding & Multi-Unit Expansion',
    metaDescription: 'Turnkey capital packages for franchise acquisition, remodel, and multi-unit rollouts.',
    heroTitle: 'Accelerate Multi-Unit Franchise Growth with Turnkey Debt Capital',
    subheadline: 'Pre-approved programs for Tier 1 national franchise brands.',
    bodyText: 'Whether acquiring your second location or rolling out 10 new territories, our franchise desk works directly with franchisors to streamline underwriting.',
    faqs: [
      { question: 'Which franchise brands are pre-approved?', answer: 'Over 250 national food, fitness, and service franchises.' },
    ],
    lastUpdated: '2026-09-28',
  },
  {
    id: 'sol_8',
    slug: 'healthcare-financing',
    title: 'Healthcare & Practice Acquisition Financing',
    metaDescription: 'Specialized funding for medical, dental, and veterinary practices.',
    heroTitle: 'Dedicated Practice Capital for Medical & Dental Professionals',
    subheadline: 'Practice buy-ins, technology upgrades, and patient AR financing.',
    bodyText: 'Engineered specifically for licensed doctors, dentists, optometrists, and veterinarians. Structured terms include deferred payment options for new practice start-ups.',
    faqs: [
      { question: 'Are practice buy-ins supported?', answer: 'Yes, 100% partner buy-in financing is available.' },
    ],
    lastUpdated: '2026-09-22',
  },
  {
    id: 'sol_9',
    slug: 'ma-advisory',
    title: 'M&A Advisory & Business Acquisition Capital',
    metaDescription: 'Strategic transaction advisory and leveraged buyout funding.',
    heroTitle: 'Buyout & M&A Financing for Corporate Strategic Acquisitions',
    subheadline: 'Senior debt, seller note leverage, and equity co-investment.',
    bodyText: 'Execute transformative strategic acquisitions. Our senior CFO advisors structure complete capital stacks combining bank debt, SBA leverage, and mezzanine facilities.',
    faqs: [
      { question: 'What EBITDA range do you target?', answer: '$500,000 to $10,000,000 trailing EBITDA.' },
    ],
    lastUpdated: '2026-10-05',
  },
  {
    id: 'sol_10',
    slug: 'debt-restructuring',
    title: 'Corporate Debt Restructuring & Refinancing',
    metaDescription: 'Consolidate high-cost short-term debt into single manageable monthly terms.',
    heroTitle: 'Consolidate Expensive Debt & Cut Monthly Payments by up to 60%',
    subheadline: 'Replace high-interest daily/weekly advances with long-term bank debt.',
    bodyText: 'Regain operational control by refinancing aggressive cash advances and high-interest short term loans into a single low-rate monthly term facility.',
    faqs: [
      { question: 'Can existing MCAs be paid off?', answer: 'Yes, full payoff and lien subordination is included.' },
    ],
    lastUpdated: '2026-09-18',
  },
  {
    id: 'sol_11',
    slug: 'asset-backed-lines',
    title: 'Asset-Backed Lending (ABL) & Inventory Facilities',
    metaDescription: 'Leverage inventory, machinery, and real estate for revolving credit lines.',
    heroTitle: 'High-Capacity ABL Credit Lines Secured by Physical Balance Sheet Assets',
    subheadline: 'Revolving lines from $1M to $25M based on collateral valuations.',
    bodyText: 'Unlock maximum borrowing power from physical inventory, equipment, and unencumbered real estate. Designed for asset-rich mid-market enterprises.',
    faqs: [
      { question: 'What advance rate is provided on inventory?', answer: 'Up to 65% on Net Liquidation Value (NOLV).' },
    ],
    lastUpdated: '2026-09-30',
  },
  {
    id: 'sol_12',
    slug: 'trade-credit-facilities',
    title: 'International Trade & Import/Export Credit Facilities',
    metaDescription: 'Letters of credit and supply chain financing for cross-border trade.',
    heroTitle: 'Global Supply Chain & Import Letters of Credit',
    subheadline: 'Direct supplier payments without tying up local bank credit lines.',
    bodyText: 'Facilitate large international procurement orders. We issue Letters of Credit (LC) and Standby LC directly to overseas manufacturers.',
    faqs: [
      { question: 'Which countries are supported?', answer: 'Over 140 WTO countries across North America, Europe, and Asia.' },
    ],
    lastUpdated: '2026-09-20',
  },
  {
    id: 'sol_13',
    slug: 'bridge-financing',
    title: 'Short-Term Bridge & Liquidity Facilities',
    metaDescription: 'Rapid 3 to 18 month bridge debt to close urgent transactions.',
    heroTitle: 'Instant Commercial Bridge Capital Executed in 48 Hours',
    subheadline: 'Customized exit strategy underwriting for urgent capital needs.',
    bodyText: 'When timing is critical, our bridge debt desk delivers rapid capital to fund property acquisitions, buyout opportunities, or seasonal inventory surges.',
    faqs: [
      { question: 'What is the interest rate range?', answer: '8% to 14% annual interest based on LTV and collateral risk.' },
    ],
    lastUpdated: '2026-09-15',
  },
  {
    id: 'sol_14',
    slug: 'mezzanine-capital',
    title: 'Mezzanine Capital & Subordinated Growth Debt',
    metaDescription: 'Subordinated growth capital to fill equity gaps in major projects.',
    heroTitle: 'Subordinated Growth Capital with Minimal Equity Dilution',
    subheadline: 'Hybrid debt/equity structures to fund organic expansion.',
    bodyText: 'Fill the gap between senior bank debt and equity. Mezzanine capital provides long-term patient capital with flexible interest and equity warrants.',
    faqs: [
      { question: 'What is the typical investment size?', answer: '$2,000,000 to $15,000,000.' },
    ],
    lastUpdated: '2026-09-12',
  },
  {
    id: 'sol_15',
    slug: 'payroll-funding',
    title: 'Staffing & Payroll Revolving Lines',
    metaDescription: 'Dedicated weekly payroll lines for staffing agencies and government contractors.',
    heroTitle: 'Never Miss Weekly Payroll During Rapid Staffing Expansion',
    subheadline: 'Weekly automated draw schedules aligned with client billing cycles.',
    bodyText: 'Specifically engineered for healthcare, IT, and industrial staffing firms. Advance cash weekly based on verified timesheets so payroll is guaranteed.',
    faqs: [
      { question: 'How is weekly payroll funded?', answer: 'Funds are wired directly to your payroll processor every Thursday.' },
    ],
    lastUpdated: '2026-09-27',
  },
  {
    id: 'sol_16',
    slug: 'business-credit-builder',
    title: 'Business Credit Builder & Treasury Optimization',
    metaDescription: 'Build enterprise Paydex 80+ scores and optimize corporate cash management.',
    heroTitle: 'Corporate Credit Score Building & Treasury Optimization Suite',
    subheadline: 'Establish high vendor credit limits independent of personal SSN.',
    bodyText: 'Separate corporate credit from personal guarantees. Build Dun & Bradstreet, Experian Commercial, and Equifax Business credit profiles to unlock uncollateralized credit lines.',
    faqs: [
      { question: 'How long does credit building take?', answer: 'Clients achieve 80+ Paydex scores within 60 to 90 days.' },
    ],
    lastUpdated: '2026-10-03',
  },
]

// JOBS MODERATION MOCK DATA
export interface AdminJobPost {
  id: string
  title: string
  employerName: string
  companyLogo: string
  category: string
  location: string
  salary: string
  postedDate: string
  status: 'Pending Approval' | 'Approved' | 'Flagged' | 'Rejected'
  applicantsCount: number
}

export const ADMIN_JOBS_QUEUE: AdminJobPost[] = [
  {
    id: 'job_mod_1',
    title: 'Senior B2B Commercial Sales VP',
    employerName: 'Apex Freight Logistics LLC',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=200&q=80',
    category: 'B2B Sales',
    location: 'Chicago, IL (Hybrid)',
    salary: '$140,000 - $180,000 + Comm',
    postedDate: '2026-10-08',
    status: 'Pending Approval',
    applicantsCount: 6,
  },
  {
    id: 'job_mod_2',
    title: 'SBA 7(a) Loan Underwriting Specialist',
    employerName: 'Empire Financial Group',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80',
    category: 'Software Sales',
    location: 'New York, NY (Remote)',
    salary: '$110,000 - $135,000',
    postedDate: '2026-10-07',
    status: 'Pending Approval',
    applicantsCount: 12,
  },
  {
    id: 'job_mod_3',
    title: 'Fractional CFO & Treasury Manager',
    employerName: 'Pacific West Capital Advisory',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=200&q=80',
    category: 'Account Executives',
    location: 'San Francisco, CA',
    salary: '$160,000 - $210,000',
    postedDate: '2026-10-06',
    status: 'Approved',
    applicantsCount: 24,
  },
  {
    id: 'job_mod_4',
    title: 'Work From Home Insurance & Sales Rep',
    employerName: 'Global Shield Risk Partners',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80',
    category: 'Insurance Sales',
    location: 'Work from home',
    salary: '$75,000 - $120,000',
    postedDate: '2026-10-05',
    status: 'Flagged',
    applicantsCount: 3,
  },
  {
    id: 'job_mod_5',
    title: 'B2C Merchant Services Account Executive',
    employerName: 'SwiftPay Systems Corp',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80',
    category: 'B2C Sales',
    location: 'Dallas, TX',
    salary: '$65,000 - $90,000',
    postedDate: '2026-10-04',
    status: 'Pending Approval',
    applicantsCount: 8,
  },
]

// AFFILIATES MOCK DATA
export interface AdminAffiliate {
  id: string
  name: string
  email: string
  company: string
  referralCode: string
  totalReferrals: number
  fundedVolume: number
  commissionPaid: number
  status: 'Active' | 'Pending Review' | 'Suspended'
  joinDate: string
}

export const ADMIN_AFFILIATES_LIST: AdminAffiliate[] = [
  {
    id: 'aff_1',
    name: 'Marcus Vance',
    email: 'm.vance@vancemarketing.com',
    company: 'Vance Digital Growth',
    referralCode: 'VANCE-BIZ-100',
    totalReferrals: 38,
    fundedVolume: 2850000,
    commissionPaid: 42750,
    status: 'Active',
    joinDate: '2025-01-15',
  },
  {
    id: 'aff_2',
    name: 'Elena Rostova',
    email: 'elena@growthlink.io',
    company: 'GrowthLink Affiliates',
    referralCode: 'ELENA-ROST-50',
    totalReferrals: 24,
    fundedVolume: 1920000,
    commissionPaid: 28800,
    status: 'Active',
    joinDate: '2025-03-10',
  },
  {
    id: 'aff_3',
    name: 'Brian Thorne',
    email: 'brian@thornegroup.com',
    company: 'Thorne Capital Media',
    referralCode: 'THORNE-CAP-99',
    totalReferrals: 15,
    fundedVolume: 1100000,
    commissionPaid: 16500,
    status: 'Active',
    joinDate: '2025-06-20',
  },
  {
    id: 'aff_4',
    name: 'Jessica Lee',
    email: 'j.lee@fintechreferrals.com',
    company: 'Fintech Referrals LLC',
    referralCode: 'LEE-FINTECH-88',
    totalReferrals: 9,
    fundedVolume: 640000,
    commissionPaid: 9600,
    status: 'Pending Review',
    joinDate: '2026-09-02',
  },
]
