export interface AdminKpi {
  title: string
  value: string
  change: number
  period: string
  caption: string
}

export interface PendingApproval {
  id: string
  type: 'Rank Promotion' | 'High-Value Draw' | 'New Biz Pro Onboarding' | 'Underwriting Term Sheet'
  title: string
  subtitle: string
  amount?: string
  date: string
  status: 'Pending' | 'Approved' | 'Rejected'
}

export interface AdminBizPro {
  id: string
  name: string
  email: string
  company: string
  rank: string
  rankLevel: number
  region: string
  status: 'Active' | 'Pending Review' | 'Suspended'
  joinDate: string
  revenue: number
  avatar: string
}

export interface RankRule {
  level: number
  title: string
  personalMonthlyVolumeMin: number
  personalMonthlyVolumeMax: number
  consecutiveMonthsRequired: number
  requiredTeamMembers: number
  teamOverridePercent: number
  directCommissionPercent: number
}

export interface InventoryServiceProduct {
  id: string
  title: string
  sku: string
  category: 'Capital' | 'Advisory' | 'Operations' | 'Growth'
  basePrice: number
  commissionRate: string
  status: 'Active' | 'Archived' | 'Draft'
  updatedAt: string
}

export const ADMIN_PENDING_APPROVALS: PendingApproval[] = [
  {
    id: 'app_1',
    type: 'Rank Promotion',
    title: 'David Ross — Promotion to Regional Leader (Rank 5)',
    subtitle: 'Achieved $610k Personal Vol + $1.11M Team Vol',
    date: '2026-10-07',
    status: 'Pending',
  },
  {
    id: 'app_2',
    type: 'High-Value Draw',
    title: 'Apex Freight LLC — $300,000 Disbursement Request',
    subtitle: 'Chase Business Account (••• 4912)',
    amount: '$300,000',
    date: '2026-10-08',
    status: 'Pending',
  },
  {
    id: 'app_3',
    type: 'Underwriting Term Sheet',
    title: 'BioTech Solutions Inc — $1.2M SBA Bridge Line',
    subtitle: 'Risk Grade A — 256-Bit Verification Passed',
    amount: '$1,200,000',
    date: '2026-10-06',
    status: 'Pending',
  },
  {
    id: 'app_4',
    type: 'New Biz Pro Onboarding',
    title: 'Kevin Zhao — Account Executive Onboarding',
    subtitle: 'District 11 - Dallas Territory',
    date: '2026-10-05',
    status: 'Pending',
  },
  {
    id: 'app_5',
    type: 'Rank Promotion',
    title: 'Rachel Adams — Promotion to District Leader (Rank 4)',
    subtitle: 'Achieved $320k Personal Vol + $450k Team Vol',
    date: '2026-10-04',
    status: 'Pending',
  },
]

export const ADMIN_BIZPRO_LIST: AdminBizPro[] = [
  {
    id: 'bp_1',
    name: 'David Ross',
    email: 'd.ross@advisors.b4b.com',
    company: 'Ross Financial Advisory',
    rank: 'District Leader',
    rankLevel: 4,
    region: 'District 7 - Chicago',
    status: 'Active',
    joinDate: '2025-04-12',
    revenue: 610000,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'bp_2',
    name: 'Monica Bell',
    email: 'm.bell@nycapital.b4b.com',
    company: 'Empire Financial Corp',
    rank: 'Senior National Channel VP',
    rankLevel: 9,
    region: 'District 2 - New York',
    status: 'Active',
    joinDate: '2024-01-10',
    revenue: 2450000,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'bp_3',
    name: 'Jason Miller',
    email: 'j.miller@sfadvisors.com',
    company: 'Pacific West Capital',
    rank: 'Regional Leader',
    rankLevel: 5,
    region: 'District 12 - San Francisco',
    status: 'Active',
    joinDate: '2024-08-20',
    revenue: 1620000,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'bp_4',
    name: 'Rachel Adams',
    email: 'r.adams@southeastcap.com',
    company: 'Sunshine Growth Partners',
    rank: 'Senior Executive',
    rankLevel: 3,
    region: 'District 6 - Atlanta',
    status: 'Active',
    joinDate: '2025-02-15',
    revenue: 1240000,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'bp_5',
    name: 'Kevin Zhao',
    email: 'k.zhao@dallasfinance.com',
    company: 'Lone Star Capital LLC',
    rank: 'Channel VP',
    rankLevel: 6,
    region: 'District 11 - Dallas',
    status: 'Pending Review',
    joinDate: '2026-09-01',
    revenue: 1100000,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
]

export const INITIAL_RANK_RULES: RankRule[] = [
  {
    level: 1,
    title: 'Account Executive',
    personalMonthlyVolumeMin: 10000,
    personalMonthlyVolumeMax: 49999,
    consecutiveMonthsRequired: 1,
    requiredTeamMembers: 0,
    directCommissionPercent: 10,
    teamOverridePercent: 0,
  },
  {
    level: 2,
    title: 'Relationship Coordinator II',
    personalMonthlyVolumeMin: 50000,
    personalMonthlyVolumeMax: 149999,
    consecutiveMonthsRequired: 2,
    requiredTeamMembers: 0,
    directCommissionPercent: 12,
    teamOverridePercent: 0,
  },
  {
    level: 3,
    title: 'Senior Executive',
    personalMonthlyVolumeMin: 150000,
    personalMonthlyVolumeMax: 299999,
    consecutiveMonthsRequired: 2,
    requiredTeamMembers: 1,
    directCommissionPercent: 15,
    teamOverridePercent: 0,
  },
  {
    level: 4,
    title: 'District Leader',
    personalMonthlyVolumeMin: 300000,
    personalMonthlyVolumeMax: 599999,
    consecutiveMonthsRequired: 3,
    requiredTeamMembers: 3,
    directCommissionPercent: 18,
    teamOverridePercent: 3,
  },
  {
    level: 5,
    title: 'Regional Leader',
    personalMonthlyVolumeMin: 600000,
    personalMonthlyVolumeMax: 999999,
    consecutiveMonthsRequired: 3,
    requiredTeamMembers: 5,
    directCommissionPercent: 20,
    teamOverridePercent: 5,
  },
  {
    level: 6,
    title: 'Channel VP',
    personalMonthlyVolumeMin: 1000000,
    personalMonthlyVolumeMax: 1999999,
    consecutiveMonthsRequired: 3,
    requiredTeamMembers: 8,
    directCommissionPercent: 22,
    teamOverridePercent: 7,
  },
  {
    level: 7,
    title: 'Senior Channel VP',
    personalMonthlyVolumeMin: 2000000,
    personalMonthlyVolumeMax: 3999999,
    consecutiveMonthsRequired: 4,
    requiredTeamMembers: 12,
    directCommissionPercent: 25,
    teamOverridePercent: 8,
  },
  {
    level: 8,
    title: 'National Channel VP',
    personalMonthlyVolumeMin: 4000000,
    personalMonthlyVolumeMax: 7999999,
    consecutiveMonthsRequired: 4,
    requiredTeamMembers: 20,
    directCommissionPercent: 28,
    teamOverridePercent: 10,
  },
  {
    level: 9,
    title: 'Senior National Channel VP',
    personalMonthlyVolumeMin: 8000000,
    personalMonthlyVolumeMax: 25000000,
    consecutiveMonthsRequired: 6,
    requiredTeamMembers: 30,
    directCommissionPercent: 30,
    teamOverridePercent: 12,
  },
]

export const ADMIN_INVENTORY_PRODUCTS: InventoryServiceProduct[] = [
  { id: 'prd_01', title: 'Revenue-Based Working Capital Line', sku: 'SKU-CAP-001', category: 'Capital', basePrice: 250000, commissionRate: '3.5%', status: 'Active', updatedAt: '2026-10-04' },
  { id: 'prd_02', title: 'Fractional CFO & Treasury Advisory', sku: 'SKU-ADV-002', category: 'Advisory', basePrice: 48000, commissionRate: '15.0%', status: 'Active', updatedAt: '2026-10-02' },
  { id: 'prd_03', title: 'Equipment & Fleet Lease Financing', sku: 'SKU-CAP-003', category: 'Capital', basePrice: 350000, commissionRate: '2.5%', status: 'Active', updatedAt: '2026-09-28' },
  { id: 'prd_04', title: 'SBA 7(a) Guarantee Bridge Funding', sku: 'SKU-CAP-004', category: 'Capital', basePrice: 1200000, commissionRate: '2.0%', status: 'Active', updatedAt: '2026-10-01' },
  { id: 'prd_05', title: 'Tax & Cash Conversion Audit', sku: 'SKU-OPS-005', category: 'Operations', basePrice: 25000, commissionRate: '20.0%', status: 'Active', updatedAt: '2026-09-15' },
  { id: 'prd_06', title: 'Payroll & Inventory Revolving Line', sku: 'SKU-CAP-006', category: 'Capital', basePrice: 180000, commissionRate: '3.0%', status: 'Active', updatedAt: '2026-10-05' },
  { id: 'prd_07', title: 'Invoice Factoring & AR Advance', sku: 'SKU-CAP-007', category: 'Capital', basePrice: 400000, commissionRate: '2.0%', status: 'Active', updatedAt: '2026-09-20' },
  { id: 'prd_08', title: 'Merchant Cash Advance Bridge', sku: 'SKU-CAP-008', category: 'Capital', basePrice: 100000, commissionRate: '5.0%', status: 'Active', updatedAt: '2026-08-30' },
  { id: 'prd_09', title: 'Business Credit Score Builder Program', sku: 'SKU-GRO-009', category: 'Growth', basePrice: 12000, commissionRate: '25.0%', status: 'Active', updatedAt: '2026-09-10' },
  { id: 'prd_10', title: 'M&A & Expansion Advisory Retainer', sku: 'SKU-ADV-010', category: 'Advisory', basePrice: 1500000, commissionRate: '2.5%', status: 'Active', updatedAt: '2026-10-03' },
]
