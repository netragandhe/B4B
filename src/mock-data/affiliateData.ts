export type PartnerType = 'Affiliate' | 'Partner' | 'Influencer'

export interface TrackingLinkItem {
  id: string
  name: string
  url: string
  channel: 'Social Media' | 'Email Newsletter' | 'Website Banner' | 'Direct Referral'
  clicks: number
  conversions: number
  conversionRate: string
  createdAt: string
  qrCodeUrl: string
}

export interface AffiliateReferralDeal {
  id: string
  clientName: string
  company: string
  serviceInterest: string
  dealSize: number
  estimatedCommission: number
  status: 'New Lead' | 'Contacted' | 'Underwriting Review' | 'Funded' | 'Closed/Lost'
  submittedDate: string
}

export interface PayoutRecord {
  id: string
  payoutId: string
  date: string
  amount: number
  method: 'ACH Direct Deposit' | 'Wire Transfer' | 'PayPal'
  status: 'Paid' | 'Processing'
}

export interface MarketingAssetItem {
  id: string
  title: string
  type: 'Banner Graphic' | 'Social Post' | 'Email Template' | 'One-Pager PDF' | 'Video Ad'
  dimensions?: string
  format: string
  fileSize: string
  previewImage: string
}

export const MOCK_TRACKING_LINKS: TrackingLinkItem[] = [
  {
    id: 'lnk_1',
    name: 'Main Bio Link — Capital Hub',
    url: 'https://b4b.com/ref/vance100?utm_source=bio',
    channel: 'Social Media',
    clicks: 840,
    conversions: 22,
    conversionRate: '2.6%',
    createdAt: '2026-08-10',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://b4b.com/ref/vance100',
  },
  {
    id: 'lnk_2',
    name: 'Weekly Newsletter Banner',
    url: 'https://b4b.com/ref/vance100?utm_source=newsletter',
    channel: 'Email Newsletter',
    clicks: 420,
    conversions: 11,
    conversionRate: '2.6%',
    createdAt: '2026-09-01',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://b4b.com/ref/vance100-news',
  },
  {
    id: 'lnk_3',
    name: 'Blog Review Article CTA',
    url: 'https://b4b.com/ref/vance100?utm_source=blog',
    channel: 'Website Banner',
    clicks: 160,
    conversions: 5,
    conversionRate: '3.1%',
    createdAt: '2026-09-15',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://b4b.com/ref/vance100-blog',
  },
]

export const MOCK_AFFILIATE_REFERRALS: AffiliateReferralDeal[] = [
  {
    id: 'ref_101',
    clientName: 'Thomas Wright',
    company: 'Wright Construction LLC',
    serviceInterest: 'Heavy Equipment & Fleet Financing',
    dealSize: 450000,
    estimatedCommission: 6750,
    status: 'Funded',
    submittedDate: '2026-09-18',
  },
  {
    id: 'ref_102',
    clientName: 'Amanda Chen',
    company: 'Pacific Trade Imports',
    serviceInterest: 'Revenue-Based Working Capital Line',
    dealSize: 600000,
    estimatedCommission: 9000,
    status: 'Funded',
    submittedDate: '2026-09-22',
  },
  {
    id: 'ref_103',
    clientName: 'Robert Gomez',
    company: 'Gomez Logistics Corp',
    serviceInterest: 'SBA 7(a) Guarantee Bridge Funding',
    dealSize: 850000,
    estimatedCommission: 12750,
    status: 'Underwriting Review',
    submittedDate: '2026-10-01',
  },
  {
    id: 'ref_104',
    clientName: 'Sarah Jenkins',
    company: 'Jenkins Medical Spa',
    serviceInterest: 'Healthcare & Practice Acquisition Financing',
    dealSize: 300000,
    estimatedCommission: 4500,
    status: 'Contacted',
    submittedDate: '2026-10-04',
  },
  {
    id: 'ref_105',
    clientName: 'David Sterling',
    company: 'Sterling Tech Ventures',
    serviceInterest: 'Fractional CFO & Treasury Advisory',
    dealSize: 48000,
    estimatedCommission: 1200,
    status: 'New Lead',
    submittedDate: '2026-10-07',
  },
]

export const MOCK_PAYOUT_RECORDS: PayoutRecord[] = [
  {
    id: 'pay_1',
    payoutId: 'PAY-2026-0941',
    date: '2026-10-01',
    amount: 15750,
    method: 'ACH Direct Deposit',
    status: 'Paid',
  },
  {
    id: 'pay_2',
    payoutId: 'PAY-2026-0812',
    date: '2026-09-01',
    amount: 8750,
    method: 'ACH Direct Deposit',
    status: 'Paid',
  },
  {
    id: 'pay_3',
    payoutId: 'PAY-2026-0705',
    date: '2026-08-01',
    amount: 5200,
    method: 'Wire Transfer',
    status: 'Paid',
  },
]

export const MOCK_MARKETING_ASSETS: MarketingAssetItem[] = [
  {
    id: 'ast_1',
    title: 'Working Capital $5M Display Banner Pack',
    type: 'Banner Graphic',
    dimensions: '1200x628 & 300x250',
    format: 'PNG Zip',
    fileSize: '14.5 MB',
    previewImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'ast_2',
    title: 'SBA 7(a) Funding Guide for Small Business Owners',
    type: 'One-Pager PDF',
    format: 'PDF',
    fileSize: '3.2 MB',
    previewImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'ast_3',
    title: 'High-Converting B2B Email Outreach Templates',
    type: 'Email Template',
    format: 'HTML & TXT',
    fileSize: '1.1 MB',
    previewImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'ast_4',
    title: 'Social Media Reel & Story Video Ads Pack',
    type: 'Video Ad',
    dimensions: '1080x1920 (9:16 Vertical)',
    format: 'MP4',
    fileSize: '48.0 MB',
    previewImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
  },
]
