import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Wallet,
  Users,
  FileCheck2,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  ExternalLink,
  PlusCircle,
  Bell,
  Search,
} from 'lucide-react'
import { BrandLogo, brandConfig } from '@/config/brand'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/components/ui/Toast'

export const PortalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const navItems = [
    { name: 'Financial Scoreboard', href: '/portal/dashboard', icon: LayoutDashboard },
    { name: 'Capital Facilities', href: '/portal/capital', icon: Wallet, badge: '$850k' },
    { name: 'Advisory & CFO', href: '/portal/advisory', icon: Users, badge: '2 Pending' },
    { name: 'Documents & Filings', href: '/portal/documents', icon: FileCheck2 },
    { name: 'Account Settings', href: '/portal/settings', icon: Settings },
  ]

  const isActive = (href: string) => location.pathname === href

  const handleLogout = () => {
    logout()
    toast({
      title: 'Logged Out',
      description: 'You have been safely signed out of your client terminal.',
      type: 'info',
    })
    navigate('/')
  }

  const handleQuickDraw = () => {
    toast({
      title: 'Draw Request Initialized',
      description: 'Select an active facility to draw funds into your operating account.',
      type: 'info',
    })
    navigate('/portal/capital')
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
            <Badge variant="navy" size="sm" className="text-[10px] tracking-wide">
              {brandConfig.portalName}
            </Badge>
            <span className="flex items-center gap-1 text-[11px] text-emerald-500 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Synced
            </span>
          </div>
        </div>

        {/* Company Profile Card */}
        <div className="p-4 mx-4 my-4 rounded-xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 dark:from-[#12294A] dark:to-[#0D1E36] border border-blue-100 dark:border-[#1E3A5F]">
          <div className="flex items-center gap-3">
            <Avatar name={user?.name || 'Marcus Vance'} size="md" status="online" />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                {user?.company || 'Apex Freight LLC'}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {user?.role || 'Founder & CEO'}
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-blue-200/50 dark:border-[#1E3A5F] flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-400">Credit Score</span>
            <span className="font-bold text-amber-500 flex items-center gap-1">
              785 <span className="text-[9px] text-emerald-500 font-normal">Tier A</span>
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-1.5">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Terminal Navigation
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
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#12294A] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Quick Capital Action in Sidebar */}
        <div className="p-4 mx-4 my-2 rounded-xl border border-emerald-200 dark:border-emerald-950/60 bg-emerald-50/50 dark:bg-emerald-950/20">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-emerald-800 dark:text-emerald-300">Ready Draw</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">$300,000</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2.5">
            Available on 24-hr disbursement.
          </p>
          <Button
            size="sm"
            variant="accent"
            onClick={handleQuickDraw}
            className="w-full text-xs h-8"
            leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
          >
            Draw Working Capital
          </Button>
        </div>

        {/* Footer of Sidebar */}
        <div className="p-4 border-t border-slate-100 dark:border-[#1E3A5F]/70 space-y-1">
          <Link
            to="/"
            className="flex items-center justify-between px-3 py-2 text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-[#12294A] rounded-lg transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
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
        {/* Top Portal Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-slate-200 dark:border-[#1E3A5F] bg-white/80 dark:bg-[#0D1E36]/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#12294A]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-500 dark:text-slate-400">Client:</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{user?.company}</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <Badge variant="gold" size="sm" dot>
                {user?.tier || 'Platinum Tier'}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick pre-approved indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-slate-600 dark:text-slate-300">Total Facility:</span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400">$850,000</span>
            </div>

            {/* Notification bell */}
            <button
              onClick={() => toast({ title: 'Notifications', description: 'All covenants and quarterly reports verified.', type: 'info' })}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#12294A] relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
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
              <Avatar name={user?.name} size="sm" />
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
                          ? 'bg-blue-600 text-white'
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
                to="/"
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center gap-2 text-xs text-slate-500"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Marketing Website</span>
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
