/**
 * B4B AMERICA — VERIFIED CLIENT CONTENT & METADATA
 * 
 * Sourced strictly from official client documentation:
 * - What is B4B America (3).docx
 * - 1_ Company - B4B America.docx
 * - _ Solutions home - B4B America.docx
 * - B4BAPP - software.docx
 * - B4B America - Territory - software.docx
 * 
 * CLIENT RULES ENFORCED:
 * 1. Company name is strictly "B4B America" / "B4B Network", NEVER "OAL".
 * 2. No invented numbers or stats; facts strictly from client documents or [CLIENT TO CONFIRM].
 * 3. Every service keeps "Click Here" and "Speak with a Business Coach" (Lead Gen: "Speak with an Advisor").
 */

export interface SolutionItem {
  id: string
  number: string
  title: string
  slug: string
  category: 'Finance' | 'Operations' | 'Growth' | 'Technology'
  shortDesc: string
  ctaText: string
  linkText: string
  iconName: string
}

export interface TerritoryRegion {
  id: number
  regionNumber: number
  name: string
  headOffice: string
  coverage: string
}

export const BRAND_IDENTITY = {
  name: 'B4B America',
  networkName: 'B4B Network',
  solutionsName: 'The B4B Business Solutions Network',
  tagline: 'The Connection for Small Business Solutions',
  subTagline: 'We Help the Small Business Thrive!',
  vision: 'The Little Engine That Could, Made All The Small Businesses In America Thrive',
  mission:
    'We design ideas and turn prospects into clients. We offer solutions for you to build business credit, accept payments and secure business funding. During the growth phase, you may encounter challenges, like integrating new technology with older systems. We work smartly to connect you with the most cost-efficient technology to improve your business operations so you can experience healthy business growth.',
  mantra: 'Dreamers, Wake Up, Write A Plan, Design It, Be Ambitious NOW Execute!',
  mantraSteps: [
    { step: '01', title: 'Wake Up', desc: 'Acknowledge your potential and recognize the opportunity.' },
    { step: '02', title: 'Write A Plan', desc: 'Structure clear financial projections and operational roadmaps.' },
    { step: '03', title: 'Design It', desc: 'Craft your brand identity, logos, and high-converting systems.' },
    { step: '04', title: 'Be Ambitious', desc: 'Set institutional growth targets for your market and community.' },
    { step: '05', title: 'NOW Execute!', desc: 'Deploy capital, activate marketing, and scale fearlessly.' },
  ],
  pillars: [
    {
      title: 'Brand Identity',
      desc: 'Design your logo and give birth to your brand. Adding company branding on promotional products builds lasting customer recognition.',
    },
    {
      title: 'Business Funding',
      desc: 'Guidance on loans, lines of credit, and non-predatory funding options tailored to business cash flow.',
    },
    {
      title: 'Business Planning',
      desc: 'Preparing comprehensive business plans and financial models to attract lenders and investors.',
    },
    {
      title: 'Marketing Solutions',
      desc: 'Targeted marketing campaigns combining grassroots methods, mainstream channels, and SEO.',
    },
    {
      title: 'Technology & Software',
      desc: 'Modernizing small businesses with custom CRM/ERP tools and cost-efficient business systems.',
    },
  ],
}

/**
 * 16 SOLUTIONS EVERY SMALL BUSINESS NEEDS TO THRIVE
 * Strictly matching the numbering and names from "_ Solutions home - B4B America.docx"
 */
export const CLIENT_16_SOLUTIONS: SolutionItem[] = [
  {
    id: 'sol-01',
    number: '01',
    title: 'Accept Payments',
    slug: 'accept-payments',
    category: 'Finance',
    shortDesc: 'Modern payment processing and POS terminals with transparent rates and zero long-term contract lock-ins.',
    ctaText: 'Speak with a Business Coach',
    linkText: 'Click Here',
    iconName: 'CreditCard',
  },
  {
    id: 'sol-02',
    number: '02',
    title: 'Business Solutions',
    slug: 'biz-management',
    category: 'Operations',
    shortDesc: 'Hands-on operational consulting, streamlining day-to-day workflow, and reducing overhead costs.',
    ctaText: 'Speak with a Business Coach',
    linkText: 'Click Here',
    iconName: 'LayoutGrid',
  },
  {
    id: 'sol-03',
    number: '03',
    title: 'Business Branding',
    slug: 'brand-your-business',
    category: 'Growth',
    shortDesc: 'Custom logo design, corporate brand identity kits, and professional promotional product printing.',
    ctaText: 'Speak with a Business Coach',
    linkText: 'Click Here',
    iconName: 'Palette',
  },
  {
    id: 'sol-04',
    number: '04',
    title: 'Credit Repair & Build Business Credit',
    slug: 'build-business-credit',
    category: 'Finance',
    shortDesc: 'Establish distinct corporate credit profiles (Dun & Bradstreet, Experian Commercial) to reach PAYDEX 80+.',
    ctaText: 'Speak with a Business Coach',
    linkText: 'Click Here',
    iconName: 'ShieldCheck',
  },
  {
    id: 'sol-05',
    number: '05',
    title: 'Business Plans',
    slug: 'business-plan-writing',
    category: 'Finance',
    shortDesc: 'Investor and lender-ready 5-year business plans with comprehensive financial forecasting and SBA alignment.',
    ctaText: 'Speak with a Business Coach',
    linkText: 'Click Here',
    iconName: 'FileSpreadsheet',
  },
  {
    id: 'sol-06',
    number: '06',
    title: 'Business Loans',
    slug: 'business-funding',
    category: 'Finance',
    shortDesc: 'Connecting creditworthy businesses with structured working capital, equipment leases, and expansion lines.',
    ctaText: 'Speak with a Business Coach',
    linkText: 'Click Here',
    iconName: 'Landmark',
  },
  {
    id: 'sol-07',
    number: '07',
    title: 'Lead Generation',
    slug: 'lead-generation',
    category: 'Growth',
    shortDesc: 'Targeted customer acquisition pipelines utilizing grassroots outreach, mainstream media, and localized SEO.',
    ctaText: 'Speak with an Advisor', // Rule 3: Lead Gen uses "Speak with an Advisor"
    linkText: 'Click Here',
    iconName: 'Target',
  },
  {
    id: 'sol-08',
    number: '08',
    title: 'Customer Service Academy',
    slug: 'customer-service-academy',
    category: 'Operations',
    shortDesc: 'Structured training programs that empower front desk and client-facing teams to maximize conversion.',
    ctaText: 'Speak with a Business Coach',
    linkText: 'Click Here',
    iconName: 'GraduationCap',
  },
  {
    id: 'sol-09',
    number: '09',
    title: 'Cyber Security',
    slug: 'cyber-security',
    category: 'Technology',
    shortDesc: 'Enterprise-grade threat protection, employee security training, data backup, and compliance defense.',
    ctaText: 'Speak with a Business Coach',
    linkText: 'Click Here',
    iconName: 'ShieldAlert',
  },
  {
    id: 'sol-10',
    number: '10',
    title: 'Find JOBS',
    slug: 'b4b-jobs',
    category: 'Growth',
    shortDesc: 'National corporate and small-business recruitment board connecting employers with vetted sales and tech talent.',
    ctaText: 'Speak with a Business Coach',
    linkText: 'Click Here',
    iconName: 'Briefcase',
  },
  {
    id: 'sol-11',
    number: '11',
    title: 'Insurance',
    slug: 'insurance',
    category: 'Finance',
    shortDesc: 'Comprehensive commercial general liability, property, worker compensation, and business interruption coverage.',
    ctaText: 'Speak with a Business Coach',
    linkText: 'Click Here',
    iconName: 'Shield',
  },
  {
    id: 'sol-12',
    number: '12',
    title: 'IT Solutions',
    slug: 'it-solutions',
    category: 'Technology',
    shortDesc: 'End-to-end small business IT management, POS networking, cloud infrastructure, and technical help desk.',
    ctaText: 'Speak with a Business Coach',
    linkText: 'Click Here',
    iconName: 'Server',
  },
  {
    id: 'sol-13',
    number: '13',
    title: 'Marketing Solutions',
    slug: 'marketing',
    category: 'Growth',
    shortDesc: 'Full-spectrum campaigns combining consumer insights, grassroots activations, digital presence, and branding.',
    ctaText: 'Speak with a Business Coach',
    linkText: 'Click Here',
    iconName: 'Megaphone',
  },
  {
    id: 'sol-14',
    number: '14',
    title: 'Affiliates / Partners / Influencers',
    slug: 'affiliates-partners',
    category: 'Growth',
    shortDesc: 'Lucrative revenue-sharing partnership opportunities for CPAs, commercial brokers, consultants, and creators.',
    ctaText: 'Speak with a Business Coach',
    linkText: 'Click Here',
    iconName: 'Handshake',
  },
  {
    id: 'sol-15',
    number: '15',
    title: 'Bookkeeping',
    slug: 'tax-prep',
    category: 'Finance',
    shortDesc: 'Accurate monthly bookkeeping, tax preparation compliance, P&L reporting, and balance sheet reconciliation.',
    ctaText: 'Speak with a Business Coach',
    linkText: 'Click Here',
    iconName: 'BookOpen',
  },
  {
    id: 'sol-16',
    number: '16',
    title: 'Website Design & Development',
    slug: 'web-design',
    category: 'Technology',
    shortDesc: 'High-speed, mobile-responsive custom websites engineered to convert online traffic into paying customers.',
    ctaText: 'Speak with a Business Coach',
    linkText: 'Click Here',
    iconName: 'Globe',
  },
]

/**
 * B4BAPP SOFTWARE SPECIFICATIONS
 * From "B4BAPP - software.docx"
 */
export const B4BAPP_SOFTWARE = {
  name: 'B4BAPP',
  category: 'CRM / ERP & Mobile App Portal',
  description:
    'A specialized CRM/ERP website and mobile application portal designed exclusively for B4B America Biz Pros and small business owners to access tools for building, managing, and tracking their business.',
  pricing: '$25 per month (Entry subscription for Biz Pros, scales with ranking)',
  crmFeatures: [
    'White-Label CRM for Biz Pros',
    'Client Management & Record Tracking',
    'Lead Management & Pipeline Ingestion',
    'Integrated Communication Tools',
    'AI Marketing & Campaigns',
    'Training Tutorials & Video Library',
  ],
  erpFeatures: [
    'Purchase Order Management & Reporting',
    'Inventory Description & Tracking (up to 100 service products)',
    'Sales, Order Analytics & Procurement',
    'Customized Commission Maker',
    'Territory Management across 12 Divisions',
    'Bulletin Sales Scoreboard with Category Leaderboards',
  ],
  scoreboard: {
    title: 'Bulletin Sales Scoreboard',
    desc: 'Tracks and displays real-time production results from the leaders in each inventory category. Team members and Biz Pros can monitor both individual achievements and aggregate team milestones.',
  },
  ranks: [
    'Account Executive [Entry Level]',
    'Relationship Coordinator II',
    'Senior Executive',
    'District Leader',
    'Regional Leader',
    'Channel VP',
    'Senior Channel VP',
    'National Channel VP',
    'Senior National Channel VP [Highest Level]',
  ],
}

/**
 * 12 USA TERRITORY DIVISIONS (FEDERAL RESERVE DISTRICT MODEL)
 * From "B4B America - Territory - software.docx"
 */
export const TERRITORY_DIVISIONS: TerritoryRegion[] = [
  { id: 1, regionNumber: 1, name: 'New England Division', headOffice: 'Boston, MA', coverage: 'ME, MA, NH, RI, VT, CT' },
  { id: 2, regionNumber: 2, name: 'New York & Atlantic Division', headOffice: 'New York, NY', coverage: 'NY, Northern NJ, Puerto Rico, USVI' },
  { id: 3, regionNumber: 3, name: 'Mid-Atlantic Division', headOffice: 'Philadelphia, PA', coverage: 'DE, Southern NJ, Eastern PA' },
  { id: 4, regionNumber: 4, name: 'Appalachian Division', headOffice: 'Cleveland, OH', coverage: 'OH, Eastern KY, Western PA, Northern WV' },
  { id: 5, regionNumber: 5, name: 'Capital & Carolinas Division', headOffice: 'Richmond, VA', coverage: 'MD, VA, NC, SC, WV, DC' },
  { id: 6, regionNumber: 6, name: 'Southeast & Gulf Coast Division', headOffice: 'Atlanta, GA', coverage: 'AL, FL, GA, Eastern TN, Southern LA, Southern MS' },
  { id: 7, regionNumber: 7, name: 'Midwest Lakes Division', headOffice: 'Chicago, IL', coverage: 'IA, Northern IN, Northern IL, Southern MI, Southern WI' },
  { id: 8, regionNumber: 8, name: 'Central Mississippi Division', headOffice: 'St. Louis, MO', coverage: 'AR, Southern IL, Southern IN, Western KY, Northern MS, Eastern MO, Western TN' },
  { id: 9, regionNumber: 9, name: 'Upper Midwest Division', headOffice: 'Minneapolis, MN', coverage: 'MN, MT, ND, SD, Upper Peninsula MI, Northern WI' },
  { id: 10, regionNumber: 10, name: 'Great Plains & Rockies Division', headOffice: 'Kansas City, MO', coverage: 'CO, KS, NE, OK, WY, Western MO, Northern NM' },
  { id: 11, regionNumber: 11, name: 'Southwest Energy Division', headOffice: 'Dallas, TX', coverage: 'TX, Northern LA, Southern NM' },
  { id: 12, regionNumber: 12, name: 'Pacific & Western Territories', headOffice: 'San Francisco, CA', coverage: 'AK, AZ, CA, HI, ID, NV, OR, UT, WA, Guam, American Samoa' },
]

/**
 * 32 INDUSTRIES / TRADES WE SERVE
 * Exact list from "1_ Company - B4B America.docx"
 */
export const INDUSTRIES_SERVED: string[] = [
  'Accountants',
  'Amusement and Recreation',
  'Automotive Repair Industries',
  'Beauty Salons',
  'Beer, Wine and Liquor Stores',
  'Churches',
  'Construction & Residential Remodelers',
  'Convenience Stores',
  'Day Care Services',
  'Dental Offices & Chiropractors',
  'Electrical Contractors',
  'Engineering Services',
  'Fitness and Recreational Sports',
  'Food Trucks',
  'Freight Trucking & Transportation',
  'Gasoline Stations',
  'Health and Wellness',
  'Home Healthcare Services',
  'Hotels & Motels',
  'Insurance Agencies',
  'Landscaping Services',
  'Offices of Lawyers',
  'Online Education',
  'Personal Care Services',
  'Pharmacies and Drug Stores',
  'Offices of Physicians',
  'Plumbing, Heating & AC',
  'Professional Tech Services & Clean Energy',
  'Restaurants, Snack Bars, Sports Bars & Lounges',
  'Retail Trade',
  'Supermarkets',
  'Veterinary Services',
]

/**
 * VERIFIED FACTS FOR STATS DISPLAY (NO INVENTED NUMBERS)
 * All facts directly extracted from client documentation.
 */
export const VERIFIED_STATS = [
  {
    value: '16',
    label: 'Core Business Solutions',
    detail: 'From payments & funding to IT & branding',
    source: 'Solutions Home Document',
  },
  {
    value: '12',
    label: 'Territory Divisions',
    detail: 'Federal Reserve District framework covering all 50 states',
    source: 'Territory Software Document',
  },
  {
    value: '32+',
    label: 'Trade Sectors Served',
    detail: 'Restaurants, freight, healthcare, construction, retail & more',
    source: 'Company Document',
  },
  {
    value: '100',
    label: 'Service Product Tracking',
    detail: 'Configurable inventory catalog inside B4BAPP ERP',
    source: 'B4BAPP Document',
  },
  {
    value: '$25/mo',
    label: 'B4BAPP Entry Access',
    detail: 'Monthly Biz Pro CRM/ERP portal subscription',
    source: 'B4BAPP Document',
  },
  {
    value: '1-on-1',
    label: 'Dedicated Business Coach',
    detail: 'Personalized guidance on systems, credit & capital',
    source: 'Company Document',
  },
]
