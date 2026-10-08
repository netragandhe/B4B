export type UserRole = 'Admin' | 'Biz Pro' | 'Client' | 'Affiliate' | 'Employer' | 'Job Seeker'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string
  avatarUrl?: string
  status: 'active' | 'pending' | 'suspended'
  company?: string
  title?: string
  rank?: number // 1 to 9 for Biz Pro
  rankLevel?: number
  rankTitle?: string
  region?: string
  phone?: string
  sponsorCode?: string
  creditScore?: number
  annualRevenue?: number
  capitalQualified?: number
  tier?: 'Platinum Tier' | 'Gold Tier' | 'Growth Member'
  createdAt?: string
}

export const DEMO_PASSWORD = 'Demo@1234'

export const DEMO_PROFILES: Record<UserRole, User> = {
  Admin: {
    id: 'usr_admin_01',
    name: 'Sarah Jenkins',
    email: 'admin@demo.com',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    company: 'B4B Executive Board',
    title: 'Super Admin & VP of Operations',
    tier: 'Platinum Tier',
    creditScore: 820,
    annualRevenue: 15000000,
    capitalQualified: 5000000,
    createdAt: '2025-01-10',
  },
  'Biz Pro': {
    id: 'usr_bizpro_01',
    name: 'David Ross',
    email: 'bizpro@demo.com',
    role: 'Biz Pro',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    company: 'Ross Financial Advisory',
    title: 'District Sales Leader',
    rank: 4,
    rankLevel: 4,
    rankTitle: 'District Leader (Rank 4)',
    region: 'District 7 - Chicago',
    phone: '(312) 555-0199',
    tier: 'Gold Tier',
    creditScore: 795,
    annualRevenue: 1200000,
    capitalQualified: 1200000,
    createdAt: '2025-02-15',
  },
  Client: {
    id: 'usr_client_01',
    name: 'Marcus Vance',
    email: 'client@demo.com',
    role: 'Client',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    company: 'Apex Freight & Logistics LLC',
    title: 'Founder & CEO',
    phone: '(212) 555-0144',
    tier: 'Platinum Tier',
    creditScore: 785,
    annualRevenue: 3450000,
    capitalQualified: 850000,
    createdAt: '2025-03-01',
  },
  Affiliate: {
    id: 'usr_affiliate_01',
    name: 'Elena Rostova',
    email: 'affiliate@demo.com',
    role: 'Affiliate',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    company: 'Apex Growth Influencer Network',
    title: 'Senior Affiliate Partner',
    phone: '(415) 555-0188',
    tier: 'Gold Tier',
    creditScore: 760,
    annualRevenue: 850000,
    capitalQualified: 500000,
    createdAt: '2025-03-12',
  },
  Employer: {
    id: 'usr_employer_01',
    name: 'Robert Chen',
    email: 'employer@demo.com',
    role: 'Employer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    company: 'TechScale Innovations Inc',
    title: 'Head of Talent & Operations',
    phone: '(206) 555-0122',
    tier: 'Growth Member',
    creditScore: 740,
    annualRevenue: 2100000,
    capitalQualified: 600000,
    createdAt: '2025-03-20',
  },
  'Job Seeker': {
    id: 'usr_jobseeker_01',
    name: 'Maya Lin',
    email: 'jobseeker@demo.com',
    role: 'Job Seeker',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    title: 'Senior B2B SaaS Account Executive',
    phone: '(512) 555-0177',
    tier: 'Growth Member',
    creditScore: 720,
    annualRevenue: 150000,
    capitalQualified: 50000,
    createdAt: '2025-04-02',
  },
}

export const MOCK_USERS: Record<string, User> = {
  'admin@demo.com': DEMO_PROFILES.Admin,
  'bizpro@demo.com': DEMO_PROFILES['Biz Pro'],
  'client@demo.com': DEMO_PROFILES.Client,
  'affiliate@demo.com': DEMO_PROFILES.Affiliate,
  'employer@demo.com': DEMO_PROFILES.Employer,
  'jobseeker@demo.com': DEMO_PROFILES['Job Seeker'],
  'pending@demo.com': {
    id: 'usr_pending_01',
    name: 'Jordan Taylor',
    email: 'pending@demo.com',
    role: 'Client',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    status: 'pending',
    company: 'Taylor Capital Drafts',
    title: 'Managing Director',
    createdAt: '2025-04-10',
  },
}
