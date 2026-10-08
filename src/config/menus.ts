import {
  FolderArchive,
  LayoutDashboard,
  Wallet,
  Users,
  FileCheck2,
  Settings,
  ShieldAlert,
  BarChart3,
  Building2,
  Briefcase,
  Share2,
  Award,
  GraduationCap,
  FileText,
  UserCheck,
  Zap,
} from 'lucide-react'
import { UserRole } from '@/hooks/useAuth'

export interface MenuItem {
  id: string
  name: string
  href: string
  icon: any
  badge?: string
  badgeVariant?: 'emerald' | 'primary' | 'amber' | 'gold' | 'purple'
  isHighlighted?: boolean
}

export const MENU_CONFIG: Record<UserRole, MenuItem[]> = {
  Client: [
    {
      id: 'ebox',
      name: 'eBOX',
      href: '/portal/ebox',
      icon: FolderArchive,
      badge: 'New',
      badgeVariant: 'emerald',
      isHighlighted: true,
    },
    {
      id: 'dashboard',
      name: 'Financial Scoreboard',
      href: '/portal/dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'capital',
      name: 'Capital Facilities',
      href: '/portal/capital',
      icon: Wallet,
      badge: '$850k',
      badgeVariant: 'primary',
    },
    {
      id: 'advisory',
      name: 'Advisory & CFO',
      href: '/portal/advisory',
      icon: Users,
      badge: '2 Pending',
      badgeVariant: 'amber',
    },
    {
      id: 'documents',
      name: 'Documents & Filings',
      href: '/portal/documents',
      icon: FileCheck2,
    },
    {
      id: 'settings',
      name: 'Account Settings',
      href: '/portal/settings',
      icon: Settings,
    },
  ],

  Admin: [
    {
      id: 'ebox',
      name: 'eBOX',
      href: '/portal/ebox',
      icon: FolderArchive,
      badge: 'New',
      badgeVariant: 'emerald',
      isHighlighted: true,
    },
    {
      id: 'dashboard',
      name: 'Ops & Risk Command',
      href: '/portal/dashboard',
      icon: ShieldAlert,
    },
    {
      id: 'underwriting',
      name: 'Underwriting Queue',
      href: '/portal/capital',
      icon: Wallet,
      badge: '12 Reviews',
      badgeVariant: 'amber',
    },
    {
      id: 'clients',
      name: 'Client Directory',
      href: '/portal/advisory',
      icon: Users,
    },
    {
      id: 'audits',
      name: 'System Audit Logs',
      href: '/portal/documents',
      icon: FileCheck2,
    },
    {
      id: 'settings',
      name: 'System Admin Settings',
      href: '/portal/settings',
      icon: Settings,
    },
  ],

  'Biz Pro': [
    {
      id: 'ebox',
      name: 'eBOX',
      href: '/portal/ebox',
      icon: FolderArchive,
      badge: 'New',
      badgeVariant: 'emerald',
      isHighlighted: true,
    },
    {
      id: 'dashboard',
      name: 'CFO Advisor Portal',
      href: '/portal/dashboard',
      icon: BarChart3,
    },
    {
      id: 'portfolio',
      name: 'Client Portfolio',
      href: '/portal/advisory',
      icon: Building2,
      badge: '8 Active',
      badgeVariant: 'primary',
    },
    {
      id: 'forecasts',
      name: 'Treasury Models',
      href: '/portal/capital',
      icon: Wallet,
    },
    {
      id: 'documents',
      name: 'Client Vault',
      href: '/portal/documents',
      icon: FileCheck2,
    },
    {
      id: 'settings',
      name: 'Practice Settings',
      href: '/portal/settings',
      icon: Settings,
    },
  ],

  Affiliate: [
    {
      id: 'ebox',
      name: 'eBOX',
      href: '/portal/ebox',
      icon: FolderArchive,
      badge: 'New',
      badgeVariant: 'emerald',
      isHighlighted: true,
    },
    {
      id: 'dashboard',
      name: 'Partner Overview',
      href: '/portal/dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'referrals',
      name: 'Referral Pipeline',
      href: '/portal/advisory',
      icon: Share2,
      badge: '15 Deals',
      badgeVariant: 'purple',
    },
    {
      id: 'commissions',
      name: 'Commission Vault',
      href: '/portal/capital',
      icon: Wallet,
      badge: '$24.5k',
      badgeVariant: 'gold',
    },
    {
      id: 'collateral',
      name: 'Marketing Assets',
      href: '/portal/documents',
      icon: FileText,
    },
    {
      id: 'settings',
      name: 'Affiliate Settings',
      href: '/portal/settings',
      icon: Settings,
    },
  ],

  Employer: [
    {
      id: 'ebox',
      name: 'eBOX',
      href: '/portal/ebox',
      icon: FolderArchive,
      badge: 'New',
      badgeVariant: 'emerald',
      isHighlighted: true,
    },
    {
      id: 'dashboard',
      name: 'Talent & Ops Command',
      href: '/portal/dashboard',
      icon: Briefcase,
    },
    {
      id: 'jobs',
      name: 'Corporate Openings',
      href: '/portal/advisory',
      icon: UserCheck,
      badge: '4 Roles',
      badgeVariant: 'primary',
    },
    {
      id: 'capital',
      name: 'Payroll Facility',
      href: '/portal/capital',
      icon: Wallet,
    },
    {
      id: 'contracts',
      name: 'Employment Contracts',
      href: '/portal/documents',
      icon: FileCheck2,
    },
    {
      id: 'settings',
      name: 'Company Settings',
      href: '/portal/settings',
      icon: Settings,
    },
  ],

  'Job Seeker': [
    {
      id: 'ebox',
      name: 'eBOX',
      href: '/portal/ebox',
      icon: FolderArchive,
      badge: 'New',
      badgeVariant: 'emerald',
      isHighlighted: true,
    },
    {
      id: 'dashboard',
      name: 'Career Scoreboard',
      href: '/portal/dashboard',
      icon: GraduationCap,
    },
    {
      id: 'applications',
      name: 'My Applications',
      href: '/portal/advisory',
      icon: Award,
      badge: '3 Active',
      badgeVariant: 'emerald',
    },
    {
      id: 'certifications',
      name: 'Credential Vault',
      href: '/portal/documents',
      icon: FileCheck2,
    },
    {
      id: 'mentorship',
      name: 'CFO Coaching',
      href: '/portal/capital',
      icon: Zap,
    },
    {
      id: 'settings',
      name: 'Profile Settings',
      href: '/portal/settings',
      icon: Settings,
    },
  ],
}
