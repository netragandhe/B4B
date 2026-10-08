export interface AffiliateMetrics {
  totalEarnings: number
  pendingPayout: number
  paidOut: number
  totalClicks: number
  totalLeads: number
  fundedDeals: number
  conversionRate: number
  epc: number // Earnings per click
  activeLinksCount: number
  partnerTier: 'Silver Partner' | 'Gold Partner' | 'Platinum VIP Partner'
  tierBonusPercentage: number
  clicksGrowth: number
  leadsGrowth: number
  earningsGrowth: number
}

export interface MonthlyPerformancePoint {
  month: string
  clicks: number
  leads: number
  fundedDeals: number
  earnings: number
}

export interface UniqueLink {
  id: string
  title: string
  category: 'General' | 'Loans' | 'Credit' | 'Payments' | 'Advisory' | 'Jobs'
  targetUrl: string
  shortUrl: string
  slug: string
  utmCampaign: string
  clicks: number
  leads: number
  conversions: number
  earnings: number
  createdAt: string
  status: 'Active' | 'Paused'
}

export type ReferralStatus =
  | 'Lead In Review'
  | 'Consultation Booked'
  | 'Underwriting'
  | 'Pre-Approved'
  | 'Funded'
  | 'Paid Out'
  | 'Disqualified'

export interface ReferralItem {
  id: string
  companyName: string
  contactName: string
  contactEmail: string
  contactPhone: string
  solutionNeeded: string
  dealSize: number
  commissionEarned: number
  submissionDate: string
  lastUpdated: string
  status: ReferralStatus
  notes: string
  trackingSlug: string
}

export interface CommissionPayout {
  id: string
  payoutPeriod: string
  amount: number
  payoutDate: string
  payoutMethod: 'Direct Deposit (ACH)' | 'Wire Transfer' | 'PayPal Business'
  referenceNumber: string
  status: 'Completed' | 'Processing' | 'Scheduled'
  statementUrl: string
  dealsIncludedCount: number
}

export interface MarketingAsset {
  id: string
  title: string
  category: 'Banners & Ads' | 'Email Templates' | 'Social Media Swipe' | 'One-Pagers & PDFs' | 'Video & Reels' | 'Brand & Logos'
  fileType: 'PNG' | 'SVG' | 'PDF' | 'HTML' | 'MP4'
  dimensions: string
  fileSize: string
  previewUrl: string
  description: string
  copyContent?: string
  downloadUrl: string
  tags: string[]
}

export interface PartnerProfile {
  id: string
  fullName: string
  businessName: string
  email: string
  phone: string
  partnerType: 'Affiliate Partner' | 'Strategic CPA / Broker' | 'Creator & Influencer'
  partnerTier: 'Silver Partner' | 'Gold Partner' | 'Platinum VIP Partner'
  tierBonusPercentage: number
  customSlug: string
  taxFormStatus: 'W-9 Verified' | 'Needs W-9' | '1099-NEC Submitted'
  payoutMethod: {
    type: 'Direct Deposit (ACH)' | 'Wire Transfer' | 'PayPal'
    accountEnding: string
    bankName: string
    routingEnding: string
  }
  notificationPreferences: {
    emailLeads: boolean
    emailPayouts: boolean
    weeklyDigest: boolean
    smsAlerts: boolean
  }
  bio: string
  website: string
  joinedDate: string
}

export const AFFILIATE_METRICS: AffiliateMetrics = {
  totalEarnings: 24850,
  pendingPayout: 4350,
  paidOut: 20500,
  totalClicks: 18420,
  totalLeads: 342,
  fundedDeals: 38,
  conversionRate: 11.1,
  epc: 1.35,
  activeLinksCount: 6,
  partnerTier: 'Platinum VIP Partner',
  tierBonusPercentage: 25,
  clicksGrowth: 22.8,
  leadsGrowth: 14.5,
  earningsGrowth: 18.4,
}

export const MONTHLY_PERFORMANCE: MonthlyPerformancePoint[] = [
  { month: 'Apr', clicks: 1850, leads: 32, fundedDeals: 3, earnings: 2100 },
  { month: 'May', clicks: 2200, leads: 41, fundedDeals: 5, earnings: 3250 },
  { month: 'Jun', clicks: 2650, leads: 48, fundedDeals: 6, earnings: 3900 },
  { month: 'Jul', clicks: 2900, leads: 54, fundedDeals: 6, earnings: 4150 },
  { month: 'Aug', clicks: 3400, leads: 62, fundedDeals: 7, earnings: 4800 },
  { month: 'Sep', clicks: 3920, leads: 70, fundedDeals: 8, earnings: 5650 },
  { month: 'Oct', clicks: 1500, leads: 35, fundedDeals: 3, earnings: 2150 },
]

export const UNIQUE_LINKS: UniqueLink[] = [
  {
    id: 'link-01',
    title: 'Primary Small Business Ecosystem Hub',
    category: 'General',
    targetUrl: 'https://oalnetwork.com/?ref=alex_vance',
    shortUrl: 'https://oal.link/alex-hub',
    slug: 'alex-hub',
    utmCampaign: 'partner_ecosystem_q4',
    clicks: 8420,
    leads: 146,
    conversions: 18,
    earnings: 11400,
    createdAt: 'Jan 15, 2026',
    status: 'Active',
  },
  {
    id: 'link-02',
    title: 'Business Loans & Revolver Fast-Track',
    category: 'Loans',
    targetUrl: 'https://oalnetwork.com/solutions/business-loans?ref=alex_vance',
    shortUrl: 'https://oal.link/alex-loans',
    slug: 'alex-loans',
    utmCampaign: 'growth_capital_direct',
    clicks: 4180,
    leads: 92,
    conversions: 12,
    earnings: 7850,
    createdAt: 'Feb 02, 2026',
    status: 'Active',
  },
  {
    id: 'link-03',
    title: 'Business Credit Builder (Tier 1-4 Vendors)',
    category: 'Credit',
    targetUrl: 'https://oalnetwork.com/solutions/build-business-credit?ref=alex_vance',
    shortUrl: 'https://oal.link/alex-credit',
    slug: 'alex-credit',
    utmCampaign: 'ein_credit_builder',
    clicks: 2940,
    leads: 58,
    conversions: 5,
    earnings: 2750,
    createdAt: 'Mar 10, 2026',
    status: 'Active',
  },
  {
    id: 'link-04',
    title: 'Merchant POS & Payment Processing Terminal',
    category: 'Payments',
    targetUrl: 'https://oalnetwork.com/solutions/accept-payments?ref=alex_vance',
    shortUrl: 'https://oal.link/alex-pos',
    slug: 'alex-pos',
    utmCampaign: 'pos_revshare_deal',
    clicks: 1650,
    leads: 28,
    conversions: 2,
    earnings: 1450,
    createdAt: 'Apr 18, 2026',
    status: 'Active',
  },
  {
    id: 'link-05',
    title: 'SBA Business Plan & Lender Deck Drafting',
    category: 'Advisory',
    targetUrl: 'https://oalnetwork.com/solutions/business-plans?ref=alex_vance',
    shortUrl: 'https://oal.link/alex-plans',
    slug: 'alex-plans',
    utmCampaign: 'sba_package_funnel',
    clicks: 890,
    leads: 14,
    conversions: 1,
    earnings: 900,
    createdAt: 'Jun 05, 2026',
    status: 'Active',
  },
  {
    id: 'link-06',
    title: 'Fractional CFO & Treasury Advisory Bench',
    category: 'Advisory',
    targetUrl: 'https://oalnetwork.com/advisory?ref=alex_vance',
    shortUrl: 'https://oal.link/alex-cfo',
    slug: 'alex-cfo',
    utmCampaign: 'cfo_retainer_pitch',
    clicks: 340,
    leads: 4,
    conversions: 0,
    earnings: 500,
    createdAt: 'Aug 22, 2026',
    status: 'Active',
  },
]

export const REFERRALS_DATA: ReferralItem[] = [
  {
    id: 'ref-1001',
    companyName: 'Beacon Ridge Logistics Corp',
    contactName: 'Thomas Albright',
    contactEmail: 't.albright@beaconridge.com',
    contactPhone: '(404) 555-0192',
    solutionNeeded: 'Business Loans & Revolver ($350k)',
    dealSize: 350000,
    commissionEarned: 1750,
    submissionDate: 'Oct 04, 2026',
    lastUpdated: 'Oct 07, 2026',
    status: 'Pre-Approved',
    notes: 'Underwriting term sheet sent. Final corporate resolutions signature pending.',
    trackingSlug: 'alex-loans',
  },
  {
    id: 'ref-1002',
    companyName: 'NovaCraft Architectural Millwork',
    contactName: 'Elena Rostova',
    contactEmail: 'elena@novacraftmill.com',
    contactPhone: '(312) 555-4421',
    solutionNeeded: 'Equipment Financing & Line ($200k)',
    dealSize: 200000,
    commissionEarned: 1200,
    submissionDate: 'Sep 28, 2026',
    lastUpdated: 'Oct 06, 2026',
    status: 'Funded',
    notes: 'Capital facility disbursed into client bank account. Commission scheduled for Oct 15 payout.',
    trackingSlug: 'alex-hub',
  },
  {
    id: 'ref-1003',
    companyName: 'Vanguard Medical Diagnostic Labs',
    contactName: 'Dr. Gregory Hayes',
    contactEmail: 'ghayes@vanguarddx.com',
    contactPhone: '(617) 555-8832',
    solutionNeeded: 'Revenue-Based Working Capital ($500k)',
    dealSize: 500000,
    commissionEarned: 2500,
    submissionDate: 'Sep 15, 2026',
    lastUpdated: 'Oct 01, 2026',
    status: 'Paid Out',
    notes: 'Commission paid via ACH deposit ref #ACH-20260930-884.',
    trackingSlug: 'alex-loans',
  },
  {
    id: 'ref-1004',
    companyName: 'Cascade Artisan Bakeries LLC',
    contactName: 'Marie Dupont',
    contactEmail: 'marie@cascadebakery.com',
    contactPhone: '(206) 555-3199',
    solutionNeeded: 'POS Systems & Merchant Credit ($75k)',
    dealSize: 750000,
    commissionEarned: 650,
    submissionDate: 'Oct 02, 2026',
    lastUpdated: 'Oct 05, 2026',
    status: 'Consultation Booked',
    notes: 'Call scheduled with merchant technology specialist on Oct 10.',
    trackingSlug: 'alex-pos',
  },
  {
    id: 'ref-1005',
    companyName: 'Zenith Solar Clean Energy',
    contactName: 'Marcus Bennett',
    contactEmail: 'mbennett@zenithsolar.org',
    contactPhone: '(512) 555-7714',
    solutionNeeded: 'Build Business Credit Tier 1-4',
    dealSize: 45000,
    commissionEarned: 450,
    submissionDate: 'Oct 06, 2026',
    lastUpdated: 'Oct 07, 2026',
    status: 'Lead In Review',
    notes: 'Lead received from direct partner intake form. Dedicated coach assigned.',
    trackingSlug: 'direct-submission',
  },
  {
    id: 'ref-1006',
    companyName: 'Summit Peak Hospitality Group',
    contactName: 'Chloe Sutherland',
    contactEmail: 'chloe@summithospitality.com',
    contactPhone: '(720) 555-9011',
    solutionNeeded: 'SBA 7(a) Business Plan Package',
    dealSize: 28000,
    commissionEarned: 500,
    submissionDate: 'Sep 20, 2026',
    lastUpdated: 'Sep 29, 2026',
    status: 'Funded',
    notes: 'Plan delivered and lender-approved for $1.4M SBA acquisition loan.',
    trackingSlug: 'alex-plans',
  },
  {
    id: 'ref-1007',
    companyName: 'Triton Marine Freight Logistics',
    contactName: 'Captain Daniel Ortiz',
    contactEmail: 'dortiz@tritonmarine.com',
    contactPhone: '(305) 555-6672',
    solutionNeeded: 'Receivables Factoring Line ($400k)',
    dealSize: 400000,
    commissionEarned: 1800,
    submissionDate: 'Aug 24, 2026',
    lastUpdated: 'Sep 12, 2026',
    status: 'Paid Out',
    notes: 'Paid via bi-weekly payout batch #ACH-20260915-402.',
    trackingSlug: 'alex-hub',
  },
  {
    id: 'ref-1008',
    companyName: 'AeroDrone Survey Systems',
    contactName: 'Lucas Sterling',
    contactEmail: 'lsterling@aerodrone.tech',
    contactPhone: '(415) 555-2290',
    solutionNeeded: 'Fractional CFO Retainer',
    dealSize: 60000,
    commissionEarned: 600,
    submissionDate: 'Oct 01, 2026',
    lastUpdated: 'Oct 04, 2026',
    status: 'Underwriting',
    notes: 'Initial financial diagnostic completed. Scope agreement out for review.',
    trackingSlug: 'alex-cfo',
  },
]

export const COMMISSIONS_PAYOUTS: CommissionPayout[] = [
  {
    id: 'payout-2026-10-01',
    payoutPeriod: 'Sep 16 - Sep 30, 2026',
    amount: 4350,
    payoutDate: 'Oct 15, 2026 (Scheduled)',
    payoutMethod: 'Direct Deposit (ACH)',
    referenceNumber: 'ACH-20261015-PENDING',
    status: 'Scheduled',
    statementUrl: '#statement-oct15',
    dealsIncludedCount: 3,
  },
  {
    id: 'payout-2026-09-15',
    payoutPeriod: 'Sep 01 - Sep 15, 2026',
    amount: 5200,
    payoutDate: 'Sep 30, 2026',
    payoutMethod: 'Direct Deposit (ACH)',
    referenceNumber: 'ACH-20260930-884',
    status: 'Completed',
    statementUrl: '#statement-sep30',
    dealsIncludedCount: 4,
  },
  {
    id: 'payout-2026-08-31',
    payoutPeriod: 'Aug 16 - Aug 31, 2026',
    amount: 4600,
    payoutDate: 'Sep 15, 2026',
    payoutMethod: 'Direct Deposit (ACH)',
    referenceNumber: 'ACH-20260915-402',
    status: 'Completed',
    statementUrl: '#statement-sep15',
    dealsIncludedCount: 3,
  },
  {
    id: 'payout-2026-08-15',
    payoutPeriod: 'Aug 01 - Aug 15, 2026',
    amount: 3850,
    payoutDate: 'Aug 30, 2026',
    payoutMethod: 'Direct Deposit (ACH)',
    referenceNumber: 'ACH-20260830-192',
    status: 'Completed',
    statementUrl: '#statement-aug30',
    dealsIncludedCount: 3,
  },
  {
    id: 'payout-2026-07-31',
    payoutPeriod: 'Jul 16 - Jul 31, 2026',
    amount: 3450,
    payoutDate: 'Aug 15, 2026',
    payoutMethod: 'Direct Deposit (ACH)',
    referenceNumber: 'ACH-20260815-055',
    status: 'Completed',
    statementUrl: '#statement-aug15',
    dealsIncludedCount: 2,
  },
  {
    id: 'payout-2026-07-15',
    payoutPeriod: 'Jul 01 - Jul 15, 2026',
    amount: 3400,
    payoutDate: 'Jul 30, 2026',
    payoutMethod: 'Direct Deposit (ACH)',
    referenceNumber: 'ACH-20260730-719',
    status: 'Completed',
    statementUrl: '#statement-jul30',
    dealsIncludedCount: 2,
  },
]

export const MARKETING_MATERIALS: MarketingAsset[] = [
  {
    id: 'asset-01',
    title: 'Small Business Working Capital Display Banners (Web Suite)',
    category: 'Banners & Ads',
    fileType: 'PNG',
    dimensions: '300x250, 728x90, 160x600, 1200x628',
    fileSize: '4.2 MB ZIP',
    previewUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    description: 'High-conversion responsive banner ads highlighting zero-dilution working capital up to $850k.',
    downloadUrl: '#download-banners-zip',
    tags: ['Display Ads', 'Google Ads', 'Affiliate Banners'],
  },
  {
    id: 'asset-02',
    title: 'Done-For-You Email Campaign: "Unlock Growth Capital in 48 Hours"',
    category: 'Email Templates',
    fileType: 'HTML',
    dimensions: 'Responsive Email HTML + TXT',
    fileSize: '45 KB',
    previewUrl: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=600&q=80',
    description: 'Tested email sequence with 38% open rate for small business owners and commercial clients.',
    copyContent: `Subject: Quick question about {{company}}'s Q4 cash runway\n\nHi {{name}},\n\nIf you've been exploring non-dilutive credit facilities or working capital lines to scale operations this quarter, OAL Network has streamlined approvals in under 48 hours.\n\n- Capital amounts: $50k to $5,000,000\n- Transparent rates & zero daily ACH debits\n- 1-on-1 advisor matching\n\nCheck your indicative rate here: {{affiliate_link}}\n\nBest,\n{{partner_name}}`,
    downloadUrl: '#download-email-html',
    tags: ['Email Copy', 'Newsletter', 'Cold Outreach'],
  },
  {
    id: 'asset-03',
    title: 'Social Media Carousel & LinkedIn Authority Swipe File',
    category: 'Social Media Swipe',
    fileType: 'PNG',
    dimensions: '1080x1080 (Square) & 1080x1350 (Portrait)',
    fileSize: '12.8 MB',
    previewUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    description: '10-slide educational carousel breakdown: "How to Build a Tier 1-4 Business Credit Profile without Personal Guarantees".',
    copyContent: `Most small business owners don't realize their personal credit doesn't have to carry their business.\n\nHere is how top operators establish an 80+ Paydex score and qualify for six-figure vendor credit lines...\n\nTap the link in my bio to run your complimentary business credit diagnostic: {{affiliate_link}}`,
    downloadUrl: '#download-social-carousel',
    tags: ['LinkedIn', 'Instagram', 'Twitter/X', 'Swipe Copy'],
  },
  {
    id: 'asset-04',
    title: 'OAL Network Solutions One-Pager & Partner Pitch Deck (PDF)',
    category: 'One-Pagers & PDFs',
    fileType: 'PDF',
    dimensions: 'A4 Printable & High-Res Digital',
    fileSize: '3.6 MB',
    previewUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    description: 'Client-facing PDF summarizing all 16 core small business solutions, pricing transparent tiers, and loan qualifications.',
    downloadUrl: '#download-onepager-pdf',
    tags: ['Client Deck', 'Sales Handout', 'Printable PDF'],
  },
  {
    id: 'asset-05',
    title: 'Brand Vector Kit, Logo Pack & Official Partner Badges',
    category: 'Brand & Logos',
    fileType: 'SVG',
    dimensions: 'Vector SVG, Dark / Light PNG (4k)',
    fileSize: '1.8 MB',
    previewUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    description: 'Official "OAL Certified Partner" badges for your website footer, email signature, and landing pages.',
    downloadUrl: '#download-badges-pack',
    tags: ['Logos', 'Badges', 'SVG', 'Trust Seal'],
  },
  {
    id: 'asset-06',
    title: 'Short-Form Video Hooks & TikTok/Reels Scripts',
    category: 'Video & Reels',
    fileType: 'MP4',
    dimensions: '1080x1920 (9:16 Vertical)',
    fileSize: '24.5 MB',
    previewUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=600&q=80',
    description: 'High-energy video hooks with text overlays demonstrating SBA loan eligibility and invoice factoring.',
    copyContent: `Hook: "If you're still using your personal credit card for business expenses in 2026, stop scrolling right now."\n\nValue: "Separating your EIN credit is step #1 to accessing prime working capital lines without collateral risk..."`,
    downloadUrl: '#download-video-reels',
    tags: ['Reels', 'TikTok', 'YouTube Shorts'],
  },
]

export const PARTNER_PROFILE: PartnerProfile = {
  id: 'partner-9921',
  fullName: 'Alex Vance',
  businessName: 'Vance Advisory & Media Group LLC',
  email: 'alex@vanceadvisory.com',
  phone: '+1 (555) 782-9901',
  partnerType: 'Strategic CPA / Broker',
  partnerTier: 'Platinum VIP Partner',
  tierBonusPercentage: 25,
  customSlug: 'alex-vance',
  taxFormStatus: 'W-9 Verified',
  payoutMethod: {
    type: 'Direct Deposit (ACH)',
    accountEnding: '9184',
    bankName: 'JPMorgan Chase Business Premier',
    routingEnding: '0421',
  },
  notificationPreferences: {
    emailLeads: true,
    emailPayouts: true,
    weeklyDigest: true,
    smsAlerts: false,
  },
  bio: 'Commercial finance consultant and business growth strategist helping regional businesses access debt syndication and merchant capital solutions.',
  website: 'https://vanceadvisory.com',
  joinedDate: 'Jan 15, 2026',
}
