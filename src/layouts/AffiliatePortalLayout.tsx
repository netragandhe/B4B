import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Link2,
  UserPlus,
  Users,
  DollarSign,
  FolderDown,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  ExternalLink,
  Bell,
  ArrowRightLeft,
  Sparkles,
  QrCode,
  CheckCircle2,
} from 'lucide-react'
import { BrandLogo, brandConfig } from '@/config/brand'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/components/ui/Toast'
import { usePartnerProfile, useAffiliateMetrics } from '@/hooks/queries/useAffiliateData'
import { formatCurrency } from '@/lib/utils'

export const AffiliatePortalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const { data: profile } = usePartnerProfile()
  const { data: metrics } = useAffiliateMetrics()

  const navItems = [
    { name: 'Dashboard', href: '/portal/affiliate/dashboard', icon: LayoutDashboard },
    { name: 'My Unique Links', href: '/portal/affiliate/links', icon: Link2, badge: `${metrics?.activeLinksCount || 6} Links` },
    { name: 'Submit Lead', href: '/portal/affiliate/submit-lead', icon: UserPlus, badge: 'Fast Track' },
    { name: 'Referrals', href: '/portal/affiliate/referrals', icon: Users, badge: `${metrics?.fundedDeals || 38} Funded` },
    { name: 'Commissions & Payouts', href: '/portal/affiliate/commissions', icon: DollarSign, badge: formatCurrency(metrics?.pendingPayout || 4350) },
    { name: 'Marketing Materials', href: '/portal/affiliate/marketing', icon: FolderDown, badge: '24 Assets' },
    { name: 'Partner Profile', href: '/portal/affiliate/profile', icon: ShieldCheck },
  ]

  const isActive = (href: string) => {
    if (href === '/portal/affiliate/dashboard' && (location.pathname === '/portal/affiliate' || location.pathname === '/portal/affiliate/dashboard')) {
      return true
    }
    return location.pathname === href
  }

  const handleLogout = () => {
    logout()
    toast({
      title: 'Signed Out',
      description: 'You have exited the partner terminal.',
      type: 'info',
    })
    navigate('/')
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#0A1628] text-slate-900 dark:text-slate-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0D1E36] shrink-0 sticky top-0 h-screen overflow-y-auto">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-100 dark:border-[#1E3A5F]/70">
          <Link to="/" className="flex items-center gap-2">
            <BrandLogo size="md" />
          </Link>
          <div className="mt-3 flex items-center justify-between">
            <Badge variant="emerald" size="sm" className="text-[10px] tracking-wide font-bold">
              Partner & Affiliate Hub
            </Badge>
            <span className="flex items-center gap-1 text-[11px] text-emerald-500 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Tracking Active
            </span>
          </div>
        </div>

        {/* Partner Profile Badge Card */}
        <div className="p-4 mx-4 my-3.5 rounded-2xl bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-blue-50/50 dark:from-[#0d2a2a] dark:to-[#0D1E36] border border-emerald-200/80 dark:border-emerald-900/60 shadow-xs">
          <div className="flex items-center gap-3">
            <Avatar name={profile?.fullName || 'Alex Vance'} size="md" status="online" />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                {profile?.fullName || 'Alex Vance'}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {profile?.businessName || 'Vance Advisory Group'}
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-emerald-200/60 dark:border-emerald-900/60 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-400">Partner Tier</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              {profile?.partnerTier || 'Platinum VIP'}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Partner Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#12294A] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Quick Submit Lead Action in Sidebar */}
        <div className="p-4 mx-4 my-2 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-blue-900 dark:text-blue-300">Fast Lead Routing</span>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">48-Hr SLA</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2.5">
            Submit a warm commercial prospect directly to underwriting.
          </p>
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate('/portal/affiliate/submit-lead')}
            className="w-full text-xs h-8"
            leftIcon={<UserPlus className="w-3.5 h-3.5" />}
          >
            Submit Direct Lead
          </Button>
        </div>

        {/* Switcher & Sign Out */}
        <div className="p-4 border-t border-slate-100 dark:border-[#1E3A5F]/70 space-y-1">
          <Link
            to="/bizpro/dashboard"
            className="flex items-center justify-between px-3 py-2 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-colors font-medium"
          >
            <span className="flex items-center gap-2">
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Biz Pro Terminal</span>
            </span>
          </Link>
          <Link
            to="/portal/dashboard"
            className="flex items-center justify-between px-3 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#12294A] rounded-lg transition-colors font-medium"
          >
            <span className="flex items-center gap-2">
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Switch to Client Terminal</span>
            </span>
          </Link>

          <Link
            to="/affiliates"
            className="flex items-center justify-between px-3 py-2 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-[#12294A] rounded-lg transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Partner Program Overview</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Terminal</span>
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-16 border-b border-slate-200 dark:border-[#1E3A5F] bg-white/80 dark:bg-[#0D1E36]/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#12294A]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-500 dark:text-slate-400">Partner:</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{profile?.fullName || 'Alex Vance'}</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <Badge variant="emerald" size="sm" dot>
                {profile?.partnerTier || 'Platinum VIP (25% Boost)'}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Accrued payout pill */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-600 dark:text-slate-300">Ready Payout:</span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(metrics?.pendingPayout || 4350)}
              </span>
            </div>

            {/* Quick Switch Button to Biz Pro */}
            <Link
              to="/bizpro/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#1E3A5F] text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-[#12294A] transition-colors"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-blue-500" />
              <span>Biz Pro Terminal</span>
            </Link>

            {/* Quick Switch Button */}
            <Link
              to="/portal/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#1E3A5F] text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#12294A] transition-colors"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500" />
              <span>Client Terminal</span>
            </Link>

            {/* Notification bell */}
            <button
              onClick={() =>
                toast({
                  title: 'Partner Alerts',
                  description: '1 new referral funded ($1,750 commission pending approval).',
                  type: 'info',
                })
              }
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#12294A] relative"
              aria-label="Partner Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#12294A]"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* User Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-[#1E3A5F]">
              <Avatar name={profile?.fullName || 'Alex Vance'} size="sm" />
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex text-xs font-semibold text-slate-500 hover:text-red-600 dark:text-slate-400"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content Slot */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-[#0D1E36] p-5 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#1E3A5F]">
                <BrandLogo size="md" />
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                        active
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#12294A]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white/20">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-[#1E3A5F] space-y-2">
              <Link
                to="/portal/dashboard"
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center gap-2 text-xs text-blue-600 font-semibold"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Switch to Client Terminal</span>
              </Link>
              <Link
                to="/affiliates"
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center gap-2 text-xs text-slate-500"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Partner Overview</span>
              </Link>
              <button
                onClick={() => {
                  setMobileSidebarOpen(false)
                  handleLogout()
                }}
                className="flex items-center gap-2 text-xs text-red-600"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
