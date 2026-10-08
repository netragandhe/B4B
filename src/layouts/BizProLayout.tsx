import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  UserCheck,
  Building2,
  MessageSquare,
  Sparkles,
  Layers,
  DollarSign,
  Award,
  Trophy,
  GraduationCap,
  MapPin,
  Palette,
  HelpCircle,
  CreditCard,
  Users2,
  Percent,
  UserPlus,
  Medal,
  Globe,
  BarChart3,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  ArrowRightLeft,
  ChevronDown,
  ShieldAlert,
  Sliders,
} from 'lucide-react'
import { BrandLogo } from '@/config/brand'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { useAuth, RANK_TITLES } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/components/ui/Toast'

export const BizProLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout, setRank } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const currentRank = user?.rank || 4
  const isLeadershipUnlocked = currentRank >= 4

  // 14 Base Menu Items
  const baseNavItems = [
    { name: 'Dashboard', href: '/bizpro/dashboard', icon: LayoutDashboard },
    { name: 'Leads', href: '/bizpro/leads', icon: UserCheck, badge: '24 Active' },
    { name: 'Clients', href: '/bizpro/clients', icon: Building2 },
    { name: 'Communication', href: '/bizpro/communication', icon: MessageSquare, badge: '3' },
    { name: 'AI Marketing', href: '/bizpro/marketing', icon: Sparkles },
    { name: 'Service Catalog', href: '/bizpro/services', icon: Layers, badge: '16' },
    { name: 'My Commissions', href: '/bizpro/commissions', icon: DollarSign, badge: '$14.2k' },
    { name: 'My Rank & Promotion', href: '/bizpro/rank', icon: Award },
    { name: 'Bulletin Scoreboard', href: '/bizpro/scoreboard', icon: Trophy },
    { name: 'Training', href: '/bizpro/training', icon: GraduationCap },
    { name: 'My Territory', href: '/bizpro/territory', icon: MapPin },
    { name: 'White-label Branding', href: '/bizpro/branding', icon: Palette },
    { name: 'Support', href: '/bizpro/support', icon: HelpCircle },
    { name: 'Profile & Subscription', href: '/bizpro/subscription', icon: CreditCard, badge: '$25/mo' },
  ]

  // 6 Leadership Extra Items (Unlocked at Rank 4+)
  const leadershipNavItems = [
    { name: 'My Team', href: '/bizpro/team', icon: Users2, badge: '5 Direct' },
    { name: 'Team Commission', href: '/bizpro/team-commissions', icon: Percent, badge: '$9.7k' },
    { name: 'Recruit', href: '/bizpro/recruit', icon: UserPlus, badge: 'Invite' },
    { name: 'Team Scoreboard', href: '/bizpro/team-scoreboard', icon: Medal },
    { name: 'Territory Assignment', href: '/bizpro/territory-assignment', icon: Globe },
    { name: 'Team Reports', href: '/bizpro/team-reports', icon: BarChart3 },
  ]

  const isActive = (href: string) => {
    if (href === '/bizpro/dashboard' && (location.pathname === '/bizpro' || location.pathname === '/bizpro/dashboard')) {
      return true
    }
    return location.pathname === href
  }

  const handleRankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRank = Number(e.target.value)
    setRank(newRank)
    toast({
      title: `Rank Switched to Rank ${newRank}`,
      description: newRank >= 4
        ? `Upgraded to ${RANK_TITLES[newRank]} — Leadership menus (6 items) UNLOCKED!`
        : `Switched to ${RANK_TITLES[newRank]} — Base menus (14 items) displayed.`,
      type: newRank >= 4 ? 'success' : 'info',
    })
  }

  const handleLogout = () => {
    logout()
    toast({ title: 'Signed Out', description: 'Exited Biz Pro terminal.', type: 'info' })
    navigate('/')
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#0A1628] text-slate-900 dark:text-slate-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0D1E36] shrink-0 sticky top-0 h-screen overflow-y-auto">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 dark:border-[#1E3A5F]/70">
          <Link to="/" className="flex items-center gap-2">
            <BrandLogo size="md" />
          </Link>
          <div className="mt-3 flex items-center justify-between">
            <Badge variant="navy" size="sm" className="text-[10px] tracking-wide font-bold">
              Biz Pro Terminal
            </Badge>
            <span className="flex items-center gap-1 text-[11px] text-emerald-500 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Sponsor: {user?.sponsorCode || 'BIZ-88219'}
            </span>
          </div>
        </div>

        {/* User Rank Card */}
        <div className="p-3.5 mx-3.5 my-3 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-blue-50/50 to-slate-50 dark:from-[#132847] dark:to-[#0D1E36] border border-blue-200/80 dark:border-[#1E3A5F] shadow-xs">
          <div className="flex items-center gap-3">
            <Avatar name={user?.name || 'Marcus Vance'} size="md" status="online" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                  {user?.name || 'Marcus Vance'}
                </span>
              </div>
              <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 truncate">
                Rank {currentRank} • {RANK_TITLES[currentRank]}
              </p>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-blue-200/50 dark:border-[#1E3A5F] space-y-1 text-[10px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center justify-between">
              <span>Territory Region:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[140px]">
                {user?.region?.split('(')[0] || 'Northeast'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Platform Membership:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                $25/mo Active
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 space-y-4 pb-6">
          {/* Base Menu (14 items) */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
              Biz Pro Core (14)
            </p>
            {baseNavItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#12294A] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                        active
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Rank 4+ Leadership Extra Menu (6 items) */}
          <div className="pt-2 border-t border-slate-100 dark:border-[#1E3A5F]/60">
            <div className="px-3 mb-1.5 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 dark:text-amber-400 flex items-center gap-1">
                <Award className="w-3 h-3" />
                <span>Rank 4+ Leadership (6)</span>
              </span>
              {!isLeadershipUnlocked && (
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded">
                  Locked
                </span>
              )}
            </div>

            {isLeadershipUnlocked ? (
              <div className="space-y-1 animate-fadeIn">
                {leadershipNavItems.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        active
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-amber-50/60 dark:hover:bg-amber-950/20 hover:text-amber-600 dark:hover:text-amber-400'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${active ? 'text-slate-950' : 'text-amber-500'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                            active
                              ? 'bg-slate-950/20 text-slate-950'
                              : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="p-3 mx-1 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700 text-[11px] text-slate-400">
                <p className="font-semibold text-slate-600 dark:text-slate-300">
                  Leadership Features Locked
                </p>
                <p className="text-[10px] mt-0.5">
                  Reach Rank 4 (Regional Director) to unlock downline tree, team overrides, recruiting and team reports.
                </p>
                <Link
                  to="/bizpro/rank"
                  className="mt-2 inline-block text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Rank Roadmap →
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Footer & Switcher */}
        <div className="p-3 border-t border-slate-100 dark:border-[#1E3A5F]/70 space-y-1">
          <Link
            to="/portal/dashboard"
            className="flex items-center justify-between px-3 py-2 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#12294A] rounded-lg transition-colors"
          >
            <span className="flex items-center gap-2">
              <ArrowRightLeft className="w-3.5 h-3.5 text-blue-500" />
              <span>Client Terminal</span>
            </span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-16 border-b border-slate-200 dark:border-[#1E3A5F] bg-white/85 dark:bg-[#0D1E36]/85 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#12294A]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-500 dark:text-slate-400">Biz Pro:</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{user?.name}</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <Badge variant={currentRank >= 4 ? 'emerald' : 'primary'} size="sm" dot>
                Rank {currentRank} — {RANK_TITLES[currentRank]}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* DEV-ONLY "Change Rank" Dropdown */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-xs shadow-xs">
              <Sliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <label htmlFor="dev-rank-select" className="text-[11px] font-bold text-amber-800 dark:text-amber-300 hidden md:inline">
                [DEV Rank]:
              </label>
              <select
                id="dev-rank-select"
                value={currentRank}
                onChange={handleRankChange}
                className="bg-transparent font-bold text-amber-900 dark:text-amber-200 text-xs focus:outline-hidden cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((r) => (
                  <option key={r} value={r} className="bg-white dark:bg-[#0D1E36] text-slate-900 dark:text-white">
                    Rank {r}: {RANK_TITLES[r]} {r >= 4 ? '★ (Leadership Unlocked)' : '(Base)'}
                  </option>
                ))}
              </select>
            </div>

            {/* Switch to Client Terminal */}
            <Link
              to="/portal/dashboard"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#1E3A5F] text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#12294A] transition-colors"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-blue-500" />
              <span>Client Terminal</span>
            </Link>

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
              <Avatar name={user?.name || 'Marcus Vance'} size="sm" />
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex text-xs font-semibold text-slate-500 hover:text-red-600 dark:text-slate-400"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-[#0D1E36] p-5 shadow-2xl flex flex-col justify-between overflow-y-auto">
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

              {/* Dev Rank Switcher in Mobile Drawer */}
              <div className="my-3 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs">
                <span className="block font-bold text-amber-800 dark:text-amber-300 text-[11px] mb-1">
                  DEV: Switch Biz Pro Rank
                </span>
                <select
                  value={currentRank}
                  onChange={handleRankChange}
                  className="w-full bg-white dark:bg-[#0D1E36] p-1.5 rounded-lg border text-xs"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((r) => (
                    <option key={r} value={r}>
                      Rank {r}: {RANK_TITLES[r]} {r >= 4 ? '★ (Leadership)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 space-y-1">
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Core Menus (14)
                </p>
                {baseNavItems.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                        active
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#12294A]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.2 rounded-full font-bold bg-white/20">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}

                {isLeadershipUnlocked && (
                  <div className="pt-2">
                    <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-1">
                      Rank 4+ Leadership (6)
                    </p>
                    {leadershipNavItems.map((item) => {
                      const Icon = item.icon
                      const active = isActive(item.href)
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setMobileSidebarOpen(false)}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                            active
                              ? 'bg-amber-500 text-slate-950 font-bold'
                              : 'text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-amber-500" />
                            <span>{item.name}</span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-[#1E3A5F] space-y-2">
              <Link
                to="/portal/dashboard"
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center gap-2 text-xs text-blue-600 font-semibold"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Client Terminal</span>
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
