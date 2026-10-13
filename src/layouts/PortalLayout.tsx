import React, { useState, useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  Sun,
  Moon,
  ExternalLink,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Shield,
  CheckCircle2,
  FolderArchive,
  Command,
  Globe,
} from 'lucide-react'
import { BrandLogo } from '@/config/brand'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { useAuth, UserRole } from '@/hooks/useAuth'
import { DEMO_PROFILES } from '@/mock-data/users'
import { usePermission } from '@/hooks/usePermission'
import { normalizeRoleId } from '@/lib/rbac/permissionService'
import { RoleId, Menu as MenuItemCatalog } from '@/lib/rbac/types'
import { MenuIcon } from '@/components/navigation/MenuIcon'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/components/ui/Toast'
import { LogoutConfirmModal } from '@/components/auth/LogoutConfirmModal'
import { IdleTimeoutModal } from '@/components/auth/IdleTimeoutModal'

const roleOptionsList: { role: UserRole; label: string; icon: string }[] = [
  { role: 'Admin', label: 'Super Admin', icon: '🛡️' },
  { role: 'Biz Pro', label: 'B4B Coach', icon: '📢' },
  { role: 'Client', label: 'SME Client', icon: '🏢' },
  { role: 'Affiliate', label: 'Affiliate Partner', icon: '🤝' },
  { role: 'Employer', label: 'Employer', icon: '👔' },
  { role: 'Job Seeker', label: 'Job Seeker', icon: '💼' },
]

export const PortalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, switchRole, setLogoutModalOpen } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()

  // Sidebar States
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  // Top Bar Dropdown States
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'eBOX Vault Updated',
      desc: 'David Ross uploaded CashFlow_Forecast_Model_13Week.xlsx',
      time: '10 mins ago',
      read: false,
    },
    {
      id: 2,
      title: 'Facility Disbursement Ready',
      desc: '$50,000 draw processed for Chase Business Account.',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      title: 'CFO Call Confirmed',
      desc: 'Strategy review with David Ross scheduled for tomorrow 10:00 AM.',
      time: '3 hours ago',
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  // Track and persist last visited portal route with active user role in sessionStorage for portal <-> website continuity
  useEffect(() => {
    if (location.pathname.startsWith('/portal') && !location.pathname.includes('/login') && user?.role) {
      try {
        sessionStorage.setItem(
          'b4b_last_portal_path',
          JSON.stringify({ path: location.pathname + location.search, role: user.role })
        )
      } catch {
        // ignore
      }
    }
  }, [location.pathname, location.search, user?.role])

  // Quick keyboard shortcut for search (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchModalOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const { getMenusForRole } = usePermission()

  // Derive target role directly from current route and authenticated user
  const currentRoleId = useMemo<RoleId>(() => {
    const path = location.pathname
    if (path.startsWith('/portal/admin')) return 'admin'
    if (path.startsWith('/portal/bizpro')) return 'bizpro'
    if (path.startsWith('/portal/affiliate')) return 'affiliate'
    if (path.startsWith('/portal/employer')) return 'employer'
    if (path.startsWith('/portal/seeker')) return 'jobseeker'
    if (path.startsWith('/portal/client')) return 'client'
    return normalizeRoleId(user?.role)
  }, [location.pathname, user?.role])

  const allowedMenus = useMemo<MenuItemCatalog[]>(() => {
    return getMenusForRole(currentRoleId)
  }, [getMenusForRole, currentRoleId])

  const roleDisplayInfo = useMemo(() => {
    switch (currentRoleId) {
      case 'admin':
        return {
          title: 'Super Admin',
          badge: 'Super Admin',
          badgeVariant: 'purple' as const,
          menuHeader: 'Super Admin Menu',
          user: user?.role === 'Admin' ? user : DEMO_PROFILES.Admin,
        }
      case 'bizpro':
        return {
          title: 'B4B Coach',
          badge: 'B4B Coach',
          badgeVariant: 'amber' as const,
          menuHeader: 'B4B Coach Menu',
          user: user?.role === 'Biz Pro' ? user : DEMO_PROFILES['Biz Pro'],
        }
      case 'affiliate':
        return {
          title: 'Affiliate Partner',
          badge: 'Affiliate Partner',
          badgeVariant: 'emerald' as const,
          menuHeader: 'Affiliate Partner Menu',
          user: user?.role === 'Affiliate' ? user : DEMO_PROFILES.Affiliate,
        }
      case 'employer':
        return {
          title: 'Employer Portal',
          badge: 'Employer Portal',
          badgeVariant: 'primary' as const,
          menuHeader: 'Employer Portal Menu',
          user: user?.role === 'Employer' ? user : DEMO_PROFILES.Employer,
        }
      case 'jobseeker':
        return {
          title: 'Job Seeker',
          badge: 'Job Seeker',
          badgeVariant: 'primary' as const,
          menuHeader: 'Job Seeker Menu',
          user: user?.role === 'Job Seeker' ? user : DEMO_PROFILES['Job Seeker'],
        }
      case 'client':
      default:
        return {
          title: 'SME Client',
          badge: 'SME Client',
          badgeVariant: 'navy' as const,
          menuHeader: 'SME Client Menu',
          user: user?.role === 'Client' ? user : DEMO_PROFILES.Client,
        }
    }
  }, [currentRoleId, user])

  const isActive = (href: string) => {
    const cleanHref = href.split('?')[0].replace(/\/$/, '')
    const cleanCurrent = location.pathname.replace(/\/$/, '')
    return cleanHref === cleanCurrent
  }

  const getHomeRoute = () => {
    switch (user?.role) {
      case 'Admin':
        return '/portal/admin/dashboard'
      case 'Biz Pro':
        return '/portal/bizpro/bulletin'
      case 'Client':
        return '/portal/client/dashboard'
      case 'Affiliate':
        return '/portal/affiliate/dashboard'
      case 'Employer':
        return '/portal/employer/dashboard'
      case 'Job Seeker':
        return '/portal/seeker/dashboard'
      default:
        return '/portal/dashboard'
    }
  }

  const handleLogout = () => {
    setLogoutModalOpen(true)
  }

  const handleSwitchRole = (newRole: UserRole) => {
    switchRole(newRole)
    setRoleDropdownOpen(false)
    setProfileMenuOpen(false)
    const roleRoutes: Record<UserRole, string> = {
      Admin: '/portal/admin/dashboard',
      'Biz Pro': '/portal/bizpro/bulletin',
      Client: '/portal/client/dashboard',
      Affiliate: '/portal/affiliate/dashboard',
      Employer: '/portal/employer/dashboard',
      'Job Seeker': '/portal/seeker/dashboard',
    }
    navigate(roleRoutes[newRole] || '/portal/dashboard')
    toast({
      title: `Switched to ${newRole}`,
      description: `Active dashboard workspace updated.`,
      type: 'success',
    })
  }

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        !target.closest('.role-switcher-dropdown') &&
        !target.closest('.profile-menu-dropdown') &&
        !target.closest('.notification-bell-dropdown')
      ) {
        setRoleDropdownOpen(false)
        setProfileMenuOpen(false)
        setNotificationsOpen(false)
      }
    }
    window.addEventListener('click', handleOutsideClick)
    return () => window.removeEventListener('click', handleOutsideClick)
  }, [])

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    toast({ title: 'Notifications cleared', type: 'info' })
  }

  return (
    <div className="min-h-screen flex bg-[#F4F7FC] dark:bg-[#07142B] text-slate-900 dark:text-slate-100 font-sans">
      {/* ========================================================================= */}
      {/* DESKTOP COLLAPSIBLE SIDEBAR */}
      {/* ========================================================================= */}
      <aside
        className={`hidden lg:flex flex-col border-r border-slate-200 dark:border-[#1E3A6E] bg-white dark:bg-[#0D2147] shrink-0 sticky top-0 h-screen transition-all duration-300 z-40 ${
          isCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-[#1E3A6E] flex items-center justify-between">
          <Link to={getHomeRoute()} className="flex items-center gap-2.5 truncate overflow-hidden">
            <BrandLogo variant={isCollapsed ? 'icon' : 'wordmark'} size={isCollapsed ? 'sm' : 'md'} showTagline={false} />
          </Link>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-[#1E3A6E] bg-slate-50 dark:bg-[#162E5A]/50 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* User Role Card snippet (Compact & Sleek) */}
        {!isCollapsed && (
          <div className="mx-3 my-2 p-2.5 rounded-xl bg-blue-50/50 dark:bg-[#162E5A]/40 border border-blue-100/80 dark:border-[#1E3A6E] flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar
                src={roleDisplayInfo.user?.avatarUrl || roleDisplayInfo.user?.avatar}
                name={roleDisplayInfo.user?.name || roleDisplayInfo.title}
                size="sm"
                status="online"
                className="w-8 h-8 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate leading-tight">
                  {roleDisplayInfo.user?.company || roleDisplayInfo.user?.name || roleDisplayInfo.title}
                </h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <Badge variant={roleDisplayInfo.badgeVariant} size="sm" className="text-[9px] px-1.5 py-0 font-bold">
                    {roleDisplayInfo.badge}
                  </Badge>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {roleDisplayInfo.user?.title || roleDisplayInfo.title}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Role Navigation Links */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto custom-scrollbar">
          {!isCollapsed && (
            <div className="px-2 mb-2 flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                {roleDisplayInfo.menuHeader}
              </span>
              <span className="text-[10px] font-bold text-[#013CA0] dark:text-[#FFC911] bg-blue-100/70 dark:bg-[#162E5A] px-1.5 py-0.2 rounded-full">
                {allowedMenus.length}
              </span>
            </div>
          )}

          {allowedMenus.map((item) => {
            const active = isActive(item.route)
            return (
              <Link
                key={item.id}
                to={item.route}
                title={isCollapsed ? item.label : undefined}
                className={`flex items-center ${
                  isCollapsed ? 'justify-center py-3' : 'px-3.5 py-2.5'
                } rounded-xl text-xs font-semibold transition-all relative ${
                  active
                    ? 'bg-[#013CA0] text-white shadow-md shadow-[#013CA0]/30 font-bold border-l-4 border-l-[#FFC911]'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-blue-50/70 dark:hover:bg-white/10 hover:text-[#013CA0] dark:hover:text-[#FFC911]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <MenuIcon
                    name={item.icon}
                    className={`w-4 h-4 shrink-0 ${
                      active ? 'text-white' : 'text-slate-400 dark:text-slate-400'
                    }`}
                  />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer Controls */}
        <div className="p-3 border-t border-slate-100 dark:border-[#1E3A6E] space-y-1">
          <Link
            to="/"
            title="Marketing Website"
            className={`w-full flex items-center ${
              isCollapsed ? 'justify-center p-2' : 'justify-between px-3 py-2'
            } text-xs text-slate-600 dark:text-slate-300 hover:bg-blue-50/70 dark:hover:bg-white/10 rounded-lg transition-colors`}
          >
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#013CA0] dark:text-[#FFC911]" />
              {!isCollapsed && <span>Marketing Website</span>}
            </div>
            {!isCollapsed && <ExternalLink className="w-3 h-3 text-slate-400" />}
          </Link>

          <button
            onClick={handleLogout}
            title="Sign Out"
            className={`w-full flex items-center ${
              isCollapsed ? 'justify-center p-2' : 'justify-between px-3 py-2'
            } text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer`}
          >
            {!isCollapsed && <span>Sign Out</span>}
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN VIEW AREA */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 h-16 border-b border-slate-200 dark:border-[#1E3A6E] bg-white/90 dark:bg-[#0D2147]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Left section: Mobile menu + Global Search trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-[#1E3A6E] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#162E5A]/50 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Search Bar Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-[#1E3A6E] bg-slate-50/80 dark:bg-[#162E5A]/40 text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#162E5A]/60 transition-colors w-64 lg:w-80 cursor-pointer"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="flex-1 text-left truncate">Search facilities, eBOX, advisory...</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-[#07142B] border border-slate-200 dark:border-[#1E3A6E] rounded text-slate-400">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </button>
          </div>

          {/* Right section: Quick role indicator, Notifications, Theme toggle, Profile menu */}
          <div className="flex items-center gap-2.5">
            {/* Quick link to public marketing website */}
            <Link to="/" className="hidden sm:flex">
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-8 border-slate-200 dark:border-[#1E3A6E] text-slate-600 dark:text-slate-300 hover:text-[#013CA0] dark:hover:text-[#FFC911]"
                leftIcon={<Globe className="w-3.5 h-3.5 text-[#013CA0] dark:text-[#FFC911]" />}
              >
                <span>Marketing Website</span>
                <ExternalLink className="w-3 h-3 text-slate-400 ml-0.5" />
              </Button>
            </Link>

            {/* Quick eBOX shortcut button in top bar */}
            <Link to="/portal/ebox" className="hidden md:flex">
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-8 border-blue-200 dark:border-[#1E3A6E] text-[#013CA0] dark:text-[#FFC911] hover:bg-blue-50 dark:hover:bg-[#162E5A]/50"
                leftIcon={<FolderArchive className="w-3.5 h-3.5 text-[#013CA0] dark:text-[#FFC911]" />}
              >
                <span>eBOX</span>
                <span className="px-1 py-0.1 text-[9px] rounded font-extrabold bg-[#FFC911] text-[#07142B]">
                  NEW
                </span>
              </Button>
            </Link>

            {/* Quick Role Switcher Dropdown */}
            <div className="relative role-switcher-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setRoleDropdownOpen(!roleDropdownOpen)
                  setNotificationsOpen(false)
                  setProfileMenuOpen(false)
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-xl border border-slate-200 dark:border-[#1E3A6E] bg-slate-50 dark:bg-[#162E5A]/50 text-slate-700 dark:text-slate-200 hover:border-[#013CA0] hover:text-[#013CA0] dark:hover:text-[#FFC911] transition-all cursor-pointer"
                title="Switch Portal Role Workspace"
              >
                <Shield className="w-3.5 h-3.5 text-[#013CA0] dark:text-[#FFC911]" />
                <span className="hidden sm:inline font-bold">{roleDisplayInfo.badge}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${roleDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#0D2147] border border-slate-200 dark:border-[#1E3A6E] rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn space-y-1">
                  <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-[#1E3A6E]">
                    Switch Role Workspace
                  </div>
                  {roleOptionsList.map((item) => (
                    <button
                      key={item.role}
                      onClick={() => handleSwitchRole(item.role)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                        user?.role === item.role
                          ? 'bg-[#013CA0] text-white font-bold border-l-3 border-l-[#FFC911]'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-blue-50/70 dark:hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {user?.role === item.role && <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC911]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell Dropdown */}
            <div className="relative notification-bell-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setNotificationsOpen(!notificationsOpen)
                  setRoleDropdownOpen(false)
                  setProfileMenuOpen(false)
                }}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#162E5A]/50 relative transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FFC911] ring-2 ring-white dark:ring-[#0D2147] animate-pulse" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#0D2147] border border-slate-200 dark:border-[#1E3A6E] rounded-2xl shadow-2xl p-4 z-50 animate-fadeIn space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#1E3A6E]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">Notifications</span>
                      {unreadCount > 0 && (
                        <Badge variant="primary" size="sm">
                          {unreadCount} New
                        </Badge>
                      )}
                    </div>
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-[#013CA0] dark:text-[#FFC911] hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl border text-xs transition-colors ${
                          n.read
                            ? 'bg-slate-50/50 dark:bg-[#162E5A]/20 border-slate-100 dark:border-[#1E3A6E]/40 text-slate-500'
                            : 'bg-blue-50/80 dark:bg-[#162E5A]/60 border-blue-200/60 dark:border-[#1E3A6E] text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] mt-0.5 text-slate-600 dark:text-slate-400">{n.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-[#1E3A6E] text-center">
                    <Link
                      to="/portal/ebox"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs font-semibold text-[#013CA0] dark:text-[#FFC911] hover:underline"
                    >
                      View all activity in eBOX
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#162E5A]/50 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#FFC911]" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Profile Dropdown Menu */}
            <div className="relative pl-2 border-l border-slate-200 dark:border-[#1E3A6E] profile-menu-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setProfileMenuOpen(!profileMenuOpen)
                  setRoleDropdownOpen(false)
                  setNotificationsOpen(false)
                }}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-[#162E5A]/50 transition-colors cursor-pointer"
              >
                <Avatar src={user?.avatarUrl} name={user?.name || 'Marcus Vance'} size="sm" />
                <span className="hidden sm:block text-left">
                  <span className="block text-xs font-bold leading-tight text-slate-900 dark:text-white">
                    {user?.name}
                  </span>
                  <span className="block text-[10px] text-[#013CA0] dark:text-[#FFC911] font-semibold">
                    {user?.role}
                  </span>
                </span>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#0D2147] border border-slate-200 dark:border-[#1E3A6E] rounded-2xl shadow-2xl p-4 z-50 animate-fadeIn space-y-3">
                  <div className="pb-3 border-b border-slate-100 dark:border-[#1E3A6E] space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{user?.name}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#013CA0] text-white border border-[#FFC911]/40">
                        {user?.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                    <p className="text-[11px] text-slate-400 font-medium truncate">{user?.company}</p>
                  </div>

                  {/* Quick Role Switch inside Profile Menu */}
                  <div className="pb-2 border-b border-slate-100 dark:border-[#1E3A6E] space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                      Switch Active Role
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {roleOptionsList.map((item) => (
                        <button
                          key={item.role}
                          onClick={() => handleSwitchRole(item.role)}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors text-left cursor-pointer ${
                            user?.role === item.role
                              ? 'bg-[#013CA0] text-white font-bold border-l-2 border-l-[#FFC911]'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-blue-50/70 dark:hover:bg-white/10'
                          }`}
                        >
                          <span>{item.icon}</span>
                          <span className="truncate">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1 space-y-1">
                    <Link
                      to="/"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-blue-50/70 dark:hover:bg-white/10 rounded-lg transition-colors font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-[#013CA0] dark:text-[#FFC911]" />
                        <span>Marketing Website</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </Link>
                    <Link
                      to="/portal/profile"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-blue-50/70 dark:hover:bg-white/10 rounded-lg transition-colors font-medium"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Profile & Account</span>
                    </Link>
                    <Link
                      to="/portal/settings"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-blue-50/70 dark:hover:bg-white/10 rounded-lg transition-colors font-medium"
                    >
                      <Settings className="w-3.5 h-3.5 text-slate-400" />
                      <span>Portal Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false)
                        handleLogout()
                      }}
                      className="w-full flex items-center justify-between gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg font-semibold transition-colors cursor-pointer"
                    >
                      <span>Sign Out Terminal</span>
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT SLOT */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto pb-24 lg:pb-8">{children}</main>
      </div>

      {/* ========================================================================= */}
      {/* GLOBAL SEARCH MODAL (Built from dynamic getMenusForRole) */}
      {/* ========================================================================= */}
      <Modal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        title="Global Workspace Search"
        description="Search across all permitted portal modules, documents, and settings."
        maxWidth="md"
      >
        <div className="space-y-4">
          <Input
            placeholder="Type a menu, module or action name..."
            leftIcon={<Search className="w-4 h-4" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />

          <div className="space-y-1.5 max-h-64 overflow-y-auto">
            {allowedMenus
              .filter(
                (item) =>
                  item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.group.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSearchModalOpen(false)
                    navigate(item.route)
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-[#1E3A6E] hover:border-[#013CA0] bg-slate-50/50 dark:bg-[#162E5A]/30 cursor-pointer flex items-center justify-between text-xs transition-all hover:bg-blue-50/80 dark:hover:bg-[#162E5A]/60"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <MenuIcon name={item.icon} className="w-4 h-4 text-[#013CA0] dark:text-[#FFC911] shrink-0" />
                    <span className="font-bold text-slate-900 dark:text-white truncate">{item.label}</span>
                  </div>
                  <Badge variant="navy" size="sm" className="shrink-0 text-[10px]">
                    {item.module}
                  </Badge>
                </div>
              ))}
          </div>
        </div>
      </Modal>

      {/* ========================================================================= */}
      {/* MOBILE BOTTOM NAVIGATION BAR */}
      {/* ========================================================================= */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0D2147]/95 backdrop-blur-md border-t border-slate-200 dark:border-[#1E3A6E] px-3 py-2 flex items-center justify-around shadow-lg">
        {allowedMenus.slice(0, 4).map((item) => {
          const active = isActive(item.route)
          return (
            <Link
              key={item.id}
              to={item.route}
              className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${
                active ? 'text-[#013CA0] dark:text-[#FFC911]' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <MenuIcon name={item.icon} className={`w-4 h-4 ${active ? 'text-[#013CA0] dark:text-[#FFC911]' : 'text-slate-400'}`} />
              <span className="truncate max-w-[64px]">{item.label}</span>
            </Link>
          )
        })}

        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="flex flex-col items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
        >
          <Menu className="w-4 h-4 text-slate-400" />
          <span>More ({allowedMenus.length})</span>
        </button>
      </nav>

      {/* ========================================================================= */}
      {/* MOBILE SIDEBAR DRAWER */}
      {/* ========================================================================= */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-[#0D2147] p-5 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#1E3A6E]">
                <BrandLogo size="md" />
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Role Switcher Info */}
              <div className="mt-4 p-3 rounded-xl bg-blue-50/80 dark:bg-[#162E5A]/50 border border-blue-200/50 dark:border-[#1E3A6E] text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Role: {roleDisplayInfo.badge}
                </span>
                <p className="font-bold text-slate-900 dark:text-white truncate">{roleDisplayInfo.user?.name}</p>
              </div>

              <div className="mt-4 space-y-1.5 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {allowedMenus.map((item) => {
                  const active = isActive(item.route)
                  return (
                    <Link
                      key={item.id}
                      to={item.route}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                        active
                          ? 'bg-[#013CA0] text-white font-bold border-l-4 border-l-[#FFC911]'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-blue-50/70 dark:hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <MenuIcon
                          name={item.icon}
                          className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-400'}`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-[#1E3A6E] space-y-2">
              <Link
                to="/"
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center gap-2 text-xs text-slate-500 hover:text-[#013CA0] dark:hover:text-[#FFC911]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Marketing Website</span>
              </Link>
              <button
                onClick={() => {
                  setMobileSidebarOpen(false)
                  handleLogout()
                }}
                className="flex items-center gap-2 text-xs font-semibold text-red-600 cursor-pointer"
              >
                <span>Sign Out</span>
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Global Auth Modals */}
      <LogoutConfirmModal />
      <IdleTimeoutModal />
    </div>
  )
}
