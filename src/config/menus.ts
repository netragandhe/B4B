import {
  FolderArchive,
  LayoutDashboard,
  Wallet,
  Users,
  Megaphone,
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
  Target,
  MessageSquare,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  Trophy,
  Video,
  MapPin,
  Palette,
  HelpCircle,
  CreditCard,
  UserPlus,
  BarChart2,
  Map,
  ShieldCheck,
  Lock,
  Sliders,
  Layers,
  Globe,
  FileCode,
  PlusCircle,
  Search,
  Heart,
  Bell,
} from 'lucide-react'
import { UserRole, User } from '@/mock-data/users'
import { AppModule, evalPermission, DEFAULT_PERMISSIONS } from './permissions'

export interface MenuItem {
  id: string
  name: string
  href: string
  icon: any
  module: AppModule
  badge?: string
  badgeVariant?: 'emerald' | 'primary' | 'amber' | 'gold' | 'purple'
  isHighlighted?: boolean
  isLeaderOnly?: boolean
}

export const ALL_MENU_ITEMS: Record<string, MenuItem> = {
  ebox: { id: 'ebox', name: 'eBOX', href: '/portal/ebox', icon: FolderArchive, module: 'ebox', badge: 'New', badgeVariant: 'emerald', isHighlighted: true },
  dashboard: { id: 'dashboard', name: 'Dashboard Overview', href: '/portal/dashboard', icon: LayoutDashboard, module: 'dashboard' },
  
  // Biz Pro Core & Leader
  bulletin: { id: 'bulletin', name: 'B4B Bulletin', href: '/portal/bizpro/bulletin', icon: Megaphone, module: 'dashboard', badge: 'Live', badgeVariant: 'primary' },
  bizproDashboard: { id: 'bizpro-dash', name: 'Sales Dashboard', href: '/portal/bizpro/dashboard', icon: LayoutDashboard, module: 'dashboard' },
  leads: { id: 'leads', name: 'Leads CRM', href: '/portal/bizpro/leads', icon: Target, module: 'leads', badge: '24 Active', badgeVariant: 'primary' },
  clients: { id: 'clients', name: 'Clients Directory', href: '/portal/bizpro/clients', icon: Users, module: 'clients' },
  communication: { id: 'communication', name: 'Communication Inbox', href: '/portal/bizpro/communication', icon: MessageSquare, module: 'messages', badge: '3 Unread', badgeVariant: 'amber' },
  marketing: { id: 'marketing', name: 'AI Marketing Hub', href: '/portal/bizpro/marketing', icon: Sparkles, module: 'dashboard' },
  catalog: { id: 'catalog', name: 'Service Catalog', href: '/portal/bizpro/catalog', icon: ShoppingBag, module: 'inventory', badge: '16 Services' },
  commissions: { id: 'commissions', name: 'My Commissions', href: '/portal/bizpro/commissions', icon: Wallet, module: 'commissionMaker', badge: '$14.2k', badgeVariant: 'gold' },
  rank: { id: 'rank', name: 'My Rank & Promotion', href: '/portal/bizpro/rank', icon: Trophy, module: 'rankRules' },
  scoreboard: { id: 'scoreboard', name: 'Bulletin Scoreboard', href: '/portal/scoreboard', icon: TrendingUp, module: 'scoreboard' },
  training: { id: 'training', name: 'Training & Videos', href: '/portal/bizpro/training', icon: Video, module: 'training' },
  territory: { id: 'territory', name: 'Territory Management', href: '/portal/territory', icon: MapPin, module: 'territory' },
  
  // Leader Specific (Rank >= 4)
  team: { id: 'team', name: 'My Team', href: '/portal/bizpro/team', icon: Users, module: 'bizproManagement', badge: '4 Reps', badgeVariant: 'purple', isLeaderOnly: true },
  teamCommissions: { id: 'team-commissions', name: 'Team Commission', href: '/portal/bizpro/team-commissions', icon: BarChart3, module: 'commissionMaker', isLeaderOnly: true },
  recruit: { id: 'recruit', name: 'Recruit / Onboard', href: '/portal/bizpro/recruit', icon: UserPlus, module: 'bizproManagement', isLeaderOnly: true },
  teamScoreboard: { id: 'team-scoreboard', name: 'Team Scoreboard', href: '/portal/scoreboard', icon: BarChart2, module: 'scoreboard', isLeaderOnly: true },
  territoryAssignment: { id: 'territory-assignment', name: 'Territory Assignment', href: '/portal/territory', icon: Map, module: 'territory', isLeaderOnly: true },
  teamReports: { id: 'team-reports', name: 'Team Reports', href: '/portal/bizpro/team-reports', icon: FileText, module: 'reports', isLeaderOnly: true },

  // Admin Specific
  adminBizPro: { id: 'admin-bizpro', name: 'B4B Coach Management', href: '/portal/admin/bizpro', icon: Users, module: 'bizproManagement', badge: '148 Active', badgeVariant: 'primary' },
  adminBulletin: { id: 'admin-bulletin', name: 'Bulletin CMS', href: '/portal/admin/bulletin', icon: Megaphone, module: 'cms' },
  rankRules: { id: 'rank-rules', name: 'Rank & Promotion Rules', href: '/portal/admin/rank-rules', icon: Trophy, module: 'rankRules' },
  commissionMaker: { id: 'commission-maker', name: 'Commission Maker', href: '/portal/admin/commission-maker', icon: Sliders, module: 'commissionMaker', badge: 'Rule Builder', badgeVariant: 'gold' },
  servicesInventory: { id: 'services', name: 'Service Inventory', href: '/portal/admin/services', icon: ShoppingBag, module: 'inventory', badge: '100 Items' },
  adminSubscriptions: { id: 'subscriptions', name: 'Subscriptions & Billing', href: '/portal/admin/subscriptions', icon: CreditCard, module: 'billing' },
  adminLeads: { id: 'admin-leads', name: 'All Leads Database', href: '/portal/admin/leads', icon: Target, module: 'leads' },
  scoreboardSettings: { id: 'scoreboard-settings', name: 'Scoreboard Settings', href: '/portal/admin/scoreboard-settings', icon: Sliders, module: 'scoreboard' },
  jobsModeration: { id: 'jobs-moderation', name: 'Jobs Moderation', href: '/portal/admin/jobs-moderation', icon: ShieldCheck, module: 'jobs', badge: '5 Pending', badgeVariant: 'amber' },
  affiliates: { id: 'affiliates', name: 'Affiliates Management', href: '/portal/admin/affiliates', icon: Share2, module: 'affiliates' },
  websiteContent: { id: 'website-content', name: 'Website Content (CMS)', href: '/portal/admin/cms', icon: Globe, module: 'cms' },
  trainingContent: { id: 'training-content', name: 'Training Content', href: '/portal/admin/training-cms', icon: GraduationCap, module: 'training' },
  rolesPermissions: { id: 'roles-permissions', name: 'Roles & Permissions', href: '/portal/admin/roles-permissions', icon: Lock, module: 'rolesPermissions', badge: 'Matrix', badgeVariant: 'purple' },
  adminReports: { id: 'reports', name: 'Reports & Analytics', href: '/portal/admin/reports', icon: BarChart3, module: 'reports' },

  // Employer Specific
  employerDashboard: { id: 'employer-dash', name: 'Employer Dashboard', href: '/portal/employer/dashboard', icon: LayoutDashboard, module: 'dashboard' },
  postJob: { id: 'post-job', name: 'Post a Job', href: '/portal/employer/post-job', icon: PlusCircle, module: 'jobs', badge: 'Hire Fast', badgeVariant: 'emerald' },
  myJobs: { id: 'my-jobs', name: 'My Posted Jobs', href: '/portal/employer/jobs', icon: Briefcase, module: 'jobs', badge: '4 Active', badgeVariant: 'primary' },
  applicants: { id: 'applicants', name: 'Applicants Kanban', href: '/portal/employer/applicants', icon: Users, module: 'jobs', badge: '18 Candidates', badgeVariant: 'amber' },
  companyProfile: { id: 'company-profile', name: 'Company Profile', href: '/portal/employer/profile', icon: Building2, module: 'profile' },
  employerBilling: { id: 'employer-billing', name: 'Billing & Plan', href: '/portal/employer/billing', icon: CreditCard, module: 'billing' },
  employerMessages: { id: 'employer-messages', name: 'Applicant Messages', href: '/portal/employer/messages', icon: MessageSquare, module: 'messages', badge: '2 New', badgeVariant: 'emerald' },

  // Job Seeker Specific
  seekerDashboard: { id: 'seeker-dashboard', name: 'Dashboard', href: '/portal/seeker/dashboard', icon: LayoutDashboard, module: 'dashboard' },
  searchJobs: { id: 'search-jobs', name: 'Search Jobs & Gigs', href: '/portal/seeker/search', icon: Search, module: 'jobs' },
  savedJobs: { id: 'saved-jobs', name: 'Saved Jobs', href: '/portal/seeker/saved', icon: Heart, module: 'jobs', badge: '3 Bookmarks', badgeVariant: 'purple' },
  myApplications: { id: 'my-applications', name: 'My Applications', href: '/portal/seeker/applications', icon: Award, module: 'jobs', badge: '2 Active', badgeVariant: 'emerald' },
  seekerProfile: { id: 'profile-resume', name: 'Profile & Resume', href: '/portal/seeker/profile', icon: FileText, module: 'profile' },
  jobAlerts: { id: 'job-alerts', name: 'Job Alerts', href: '/portal/seeker/alerts', icon: Bell, module: 'jobs' },
  seekerMessages: { id: 'seeker-messages', name: 'Employer Inbox', href: '/portal/seeker/messages', icon: MessageSquare, module: 'messages' },

  // Client Specific
  clientOrders: { id: 'client-orders', name: 'My Services & Orders', href: '/portal/client/orders', icon: ShoppingBag, module: 'inventory', badge: '3 Active', badgeVariant: 'primary' },
  clientFundingStatus: { id: 'client-funding', name: 'Funding & Business Plan', href: '/portal/client/funding-status', icon: TrendingUp, module: 'dashboard', badge: 'Under Review', badgeVariant: 'amber' },
  clientDocuments: { id: 'client-documents', name: 'Documents', href: '/portal/client/documents', icon: FileCheck2, module: 'ebox' },
  clientMessages: { id: 'client-messages', name: 'Messages with Coach', href: '/portal/client/messages', icon: MessageSquare, module: 'messages', badge: '1 New', badgeVariant: 'emerald' },
  clientInvoices: { id: 'client-invoices', name: 'Payments & Invoices', href: '/portal/client/invoices', icon: CreditCard, module: 'billing', badge: '1 Due', badgeVariant: 'gold' },
  clientBookCoach: { id: 'client-book-coach', name: 'Book a Coach', href: '/portal/client/book-coach', icon: Zap, module: 'dashboard' },
  clientSupport: { id: 'client-support', name: 'Support', href: '/portal/client/support', icon: HelpCircle, module: 'messages' },

  // Affiliate Specific
  affiliateLinks: { id: 'affiliate-links', name: 'My Unique Links', href: '/portal/affiliate/links', icon: Share2, module: 'leads', badge: '5 Active', badgeVariant: 'purple' },
  affiliateSubmitLead: { id: 'affiliate-submit-lead', name: 'Submit Lead', href: '/portal/affiliate/submit-lead', icon: UserPlus, module: 'leads', badge: 'Fast Track', badgeVariant: 'emerald' },
  affiliateReferrals: { id: 'affiliate-referrals', name: 'Referral Pipeline', href: '/portal/affiliate/referrals', icon: Target, module: 'leads', badge: '15 Deals', badgeVariant: 'primary' },
  affiliatePayouts: { id: 'affiliate-payouts', name: 'Commissions & Payouts', href: '/portal/affiliate/payouts', icon: Wallet, module: 'billing', badge: '$24.5k', badgeVariant: 'gold' },
  affiliateMarketing: { id: 'affiliate-marketing', name: 'Marketing Materials', href: '/portal/affiliate/marketing', icon: Sparkles, module: 'ebox' },
  affiliateProfile: { id: 'affiliate-profile', name: 'Partner Profile', href: '/portal/affiliate/profile', icon: Settings, module: 'profile' },
}

/**
 * Derives menu items dynamically for any role & rankLevel from permissions matrix
 */
export function getMenuItemsForRole(role: UserRole, rankLevel: number = 1): MenuItem[] {
  const roleDefinitions: Record<UserRole, string[]> = {
    Admin: [
      'dashboard',
      'adminBizPro',
      'adminBulletin',
      'rankRules',
      'commissionMaker',
      'territory',
      'servicesInventory',
      'affiliates',
      'jobsModeration',
      'rolesPermissions',
      'ebox',
    ],
    'Biz Pro': [
      'bulletin',
      'bizproDashboard',
      'leads',
      'clients',
      'communication',
      'catalog',
      'commissions',
      'rank',
      'training',
      'ebox',
    ],
    Client: [
      'dashboard',
      'clientOrders',
      'clientFundingStatus',
      'clientMessages',
      'clientInvoices',
      'ebox',
    ],
    Affiliate: [
      'dashboard',
      'affiliateLinks',
      'affiliateReferrals',
      'affiliatePayouts',
      'ebox',
    ],
    Employer: [
      'employerDashboard',
      'postJob',
      'myJobs',
      'applicants',
      'employerMessages',
    ],
    'Job Seeker': [
      'seekerDashboard',
      'searchJobs',
      'myApplications',
      'seekerProfile',
      'seekerMessages',
    ],
  }

  const baseKeys = roleDefinitions[role] || roleDefinitions.Client
  const items: MenuItem[] = baseKeys.map((key) => ALL_MENU_ITEMS[key]).filter(Boolean)

  // Filter items based on permission matrix view access
  const filtered = items.filter((item) => {
    return evalPermission(role, rankLevel, item.module, 'view', DEFAULT_PERMISSIONS)
  })

  // Dynamically insert Biz Pro leader extra menus if rank >= 4
  if (role === 'Biz Pro' && rankLevel >= 4) {
    const leaderItems: MenuItem[] = [
      ALL_MENU_ITEMS.team,
    ]

    const rankIdx = filtered.findIndex((i) => i.id === 'rank')
    if (rankIdx !== -1) {
      filtered.splice(rankIdx + 1, 0, ...leaderItems)
    } else {
      filtered.push(...leaderItems)
    }
  }

  return filtered
}

export const getBizProMenuItems = (rankLevel: number = 4): MenuItem[] => {
  return getMenuItemsForRole('Biz Pro', rankLevel)
}

export const MENU_CONFIG: Record<UserRole, MenuItem[]> = {
  Admin: getMenuItemsForRole('Admin', 1),
  'Biz Pro': getMenuItemsForRole('Biz Pro', 4),
  Client: getMenuItemsForRole('Client', 1),
  Affiliate: getMenuItemsForRole('Affiliate', 1),
  Employer: getMenuItemsForRole('Employer', 1),
  'Job Seeker': getMenuItemsForRole('Job Seeker', 1),
}
