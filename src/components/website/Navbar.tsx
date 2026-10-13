import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Search,
  Menu,
  X,
  ArrowRight,
  PhoneCall,
  UserCheck,
  LogIn,
  ChevronDown,
  Briefcase,
  Share2,
  Building2,
  Laptop,
} from 'lucide-react'
import './corporateTheme.css'
import { useAuth } from '@/hooks/useAuth'
import { SearchModal } from './SearchModal'
import { CoachRequestModal } from '@/components/forms/CoachRequestModal'

interface NavbarProps {
  onOpenCoachModal?: () => void
  variant?: 'dark' | 'light'
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCoachModal, variant = 'light' }) => {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [internalCoachModalOpen, setInternalCoachModalOpen] = useState(false)

  const isLight = variant === 'light'

  const handleOpenCoach = () => {
    if (onOpenCoachModal) {
      onOpenCoachModal()
    } else {
      setInternalCoachModalOpen(true)
    }
  }

  const [moreMenuOpen, setMoreMenuOpen] = useState(false)

  interface NavLinkItem {
    name: string
    href: string
    badge?: string
  }

  interface DropdownItem {
    name: string
    href: string
    desc: string
    icon: any
  }

  const primaryLinks: NavLinkItem[] = [
    { name: 'Home', href: '/' },
    { name: '16 Solutions', href: '/solutions' },
    { name: 'Apply For Capital', href: '/apply' },
    { name: 'Advisory & CFO', href: '/advisory' },
  ]

  const dropdownLinks: DropdownItem[] = [
    { name: 'B4BAPP Software', href: '/#software', desc: 'Enterprise SaaS & client portal tools', icon: Laptop },
    { name: 'Job Finder', href: '/jobs', desc: 'Explore career & corporate opportunities', icon: Briefcase },
    { name: 'Affiliates', href: '/affiliates', desc: 'Partner program & referral pipeline', icon: Share2 },
    { name: 'Company', href: '/company', desc: 'About B4B America vision & values', icon: Building2 },
    { name: 'Contact', href: '/contact', desc: 'Connect with support & advisory desk', icon: PhoneCall },
  ]

  const allNavLinks: NavLinkItem[] = [
    ...primaryLinks,
    ...dropdownLinks.map(d => ({ name: d.name, href: d.href })),
  ]

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false
    return location.pathname === path
  }

  const isMoreActive = dropdownLinks.some(link => isActive(link.href))

  return (
    <>
      {/* Main Sticky Navbar - Exact Logo Blue #013CA0 */}
      <header className={`sticky top-0 z-40 w-full backdrop-blur-md transition-colors ${
        isLight
          ? 'bg-[#E9EDF4]/95 border-b border-[#14233B]/10 shadow-xs text-[#14233B]'
          : 'bg-[#013CA0] border-b border-[#012E7A] shadow-lg text-white'
      }`}>
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-5 xl:px-8 h-20 lg:h-24 flex items-center justify-between gap-2 xl:gap-3 2xl:gap-6">
          {/* LEFT: Logo - Round badge */}
          <div className="flex items-center shrink-0">
            <Link
              to="/"
              className="flex items-center gap-3.5 group focus:outline-none py-1"
              aria-label="B4B America Home"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-[3px] bg-[linear-gradient(to_bottom,#FFC911_50%,#013CA0_50%)] shadow-xl transition-transform group-hover:scale-105 shrink-0">
                <div className="w-full h-full rounded-full bg-white p-1 overflow-hidden flex items-center justify-center">
                  <img
                    src="/brand/logo-full.png"
                    alt="B4B America - The Connection for Small Business Solutions"
                    className="w-full h-full object-contain scale-125 shrink-0 transition-transform group-hover:scale-130"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl md:text-2xl tracking-tight leading-none text-white font-['Plus_Jakarta_Sans',sans-serif]">
                  B4B <span className="text-[#FFC911]">AMERICA</span>
                </span>
                <span className="text-[11px] md:text-xs font-bold text-blue-100 tracking-wider uppercase mt-1">
                  Small Business Solutions
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-4 shrink">
            {primaryLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-xs xl:text-[13px] 2xl:text-sm font-extrabold tracking-tight transition-colors flex items-center gap-1 xl:gap-1.5 px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 relative ${
                    isLight
                      ? active
                        ? 'text-[#0C43A3]'
                        : 'text-[#14233B] hover:text-[#0C43A3]'
                      : active
                        ? 'text-white'
                        : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="font-extrabold whitespace-nowrap">{link.name}</span>
                  {link.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold font-mono whitespace-nowrap ${
                      isLight
                        ? 'bg-blue-50 text-[#0C43A3] border border-blue-200'
                        : 'bg-[#FFC911] text-[#013CA0] border border-white/20'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                  {active && (
                    <span className={`absolute bottom-0 left-2.5 right-2.5 h-0.5 rounded-full ${
                      isLight ? 'bg-[#0C43A3]' : 'bg-[#FFC911]'
                    }`} />
                  )}
                </Link>
              )
            })}

            {/* Dropdown Menu: More */}
            <div
              className="relative"
              onMouseEnter={() => setMoreMenuOpen(true)}
              onMouseLeave={() => setMoreMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={`text-xs xl:text-[13px] 2xl:text-sm font-extrabold tracking-tight transition-colors flex items-center gap-1 xl:gap-1.5 px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 relative cursor-pointer ${
                  isMoreActive
                    ? isLight ? 'text-[#0C43A3]' : 'text-white'
                    : isLight ? 'text-[#14233B] hover:text-[#0C43A3]' : 'text-white/85 hover:text-white hover:bg-white/10'
                }`}
                aria-expanded={moreMenuOpen}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreMenuOpen ? 'rotate-180' : ''}`} />
                {isMoreActive && (
                  <span className={`absolute bottom-0 left-2.5 right-2.5 h-0.5 rounded-full ${
                    isLight ? 'bg-[#0C43A3]' : 'bg-[#FFC911]'
                  }`} />
                )}
              </button>

              {/* Dropdown Menu Card */}
              {moreMenuOpen && (
                <div className="absolute top-full right-0 lg:left-0 pt-2 z-50 w-72">
                  <div className={`rounded-2xl shadow-2xl p-2 border backdrop-blur-xl ${
                    isLight
                      ? 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-300/50'
                      : 'bg-[#002B7A] border-white/20 text-white shadow-2xl'
                  }`}>
                    {dropdownLinks.map((item) => {
                      const Icon = item.icon
                      const active = isActive(item.href)
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setMoreMenuOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-all group ${
                            active
                              ? isLight ? 'bg-blue-50 text-[#0C43A3]' : 'bg-[#013CA0] text-white border border-white/20'
                              : isLight ? 'hover:bg-slate-100 text-slate-700 hover:text-black' : 'hover:bg-white/10 text-white/85 hover:text-white'
                          }`}
                        >
                          <div className={`p-2 rounded-lg shrink-0 transition-colors ${
                            isLight
                              ? 'bg-slate-100 text-[#0C43A3] group-hover:bg-[#0C43A3] group-hover:text-white'
                              : 'bg-white/10 text-[#FFC911] group-hover:bg-[#FFC911] group-hover:text-[#013CA0]'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold leading-tight">
                              {item.name}
                            </span>
                            <span className={`text-[10px] leading-tight mt-0.5 ${isLight ? 'text-slate-500' : 'text-blue-200/80'}`}>
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Controls: Search + Auth + Coach CTA */}
          <div className="flex items-center gap-1.5 xl:gap-2 2xl:gap-2.5 shrink-0">
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className={`flex items-center gap-1.5 p-2 xl:px-2.5 xl:py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer shrink-0 ${
                isLight
                  ? 'text-[#14233B] hover:text-[#0C43A3] bg-white border border-[#14233B]/15 hover:border-[#0C43A3]'
                  : 'text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#FFC911]'
              }`}
              aria-label="Open search directory"
              title="Search Directory (⌘K)"
            >
              <Search className={`w-3.5 h-3.5 xl:w-4 xl:h-4 ${isLight ? 'text-[#0C43A3]' : 'text-[#FFC911]'}`} />
              <span className="hidden 2xl:inline whitespace-nowrap">Search Directory</span>
              <kbd className={`hidden 2xl:inline text-[10px] font-mono px-1 py-0.5 rounded ${
                isLight
                  ? 'bg-[#E9EDF4] border border-[#14233B]/15 text-[#14233B]'
                  : 'bg-black/25 border border-white/15 text-blue-100'
              }`}>
                ⌘K
              </kbd>
            </button>

            {/* Auth Button */}
            {user ? (
              <button
                onClick={() => navigate('/portal/dashboard')}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-colors min-h-[44px] whitespace-nowrap cursor-pointer shrink-0 ${
                  isLight
                    ? 'text-[#14233B] bg-white hover:bg-slate-50 border border-[#14233B]/15'
                    : 'text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#FFC911]'
                }`}
              >
                <UserCheck className={`w-3.5 h-3.5 ${isLight ? 'text-[#0C43A3]' : 'text-[#FFC911]'}`} />
                <span className="hidden xl:inline">Back to Portal</span>
                <span className="xl:hidden">Portal</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/portal/login')}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-colors min-h-[44px] whitespace-nowrap cursor-pointer shrink-0 ${
                  isLight
                    ? 'text-[#14233B] hover:text-[#0C43A3] bg-transparent border border-[#14233B]/20 hover:border-[#0C43A3]'
                    : 'text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#FFC911]'
                }`}
              >
                <LogIn className={`w-3.5 h-3.5 ${isLight ? 'text-[#0C43A3]' : 'text-[#FFC911]'}`} />
                <span>Log In</span>
              </button>
            )}

            {/* MANDATORY CTA: Speak with a Business Coach (48px height, 12px radius) */}
            <button
              onClick={handleOpenCoach}
              className={`!hidden sm:!inline-flex group !min-h-[48px] !h-[48px] !px-3.5 2xl:!px-4 !text-xs shrink-0 cursor-pointer ${
                isLight ? 'btn-blue-light' : 'btn-gold-dark'
              }`}
            >
              <PhoneCall className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-white' : 'text-[#07142B]'}`} />
              <span className="hidden 2xl:inline whitespace-nowrap">Speak with a Business Coach</span>
              <span className="inline 2xl:hidden whitespace-nowrap">Speak with Coach</span>
              <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 shrink-0 ${
                isLight ? 'text-white' : 'text-[#07142B]'
              }`} />
            </button>

            {/* Mobile (360px) Tap Target Icon Button (44px min tap target) */}
            <button
              onClick={handleOpenCoach}
              className={`sm:!hidden flex items-center justify-center p-2.5 rounded-xl shadow-md min-w-[44px] min-h-[44px] shrink-0 ${
                isLight
                  ? 'bg-[#0C43A3] text-white hover:brightness-105'
                  : 'bg-[#F8C61A] text-[#07142B] hover:brightness-105'
              }`}
              aria-label="Speak with a Business Coach"
            >
              <PhoneCall className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle (44px min tap target) */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className={`lg:hidden p-2.5 rounded-xl border min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0 ${
                isLight
                  ? 'text-[#14233B] hover:bg-slate-200 border-[#14233B]/15'
                  : 'text-white hover:bg-white/10 border-white/20'
              }`}
              aria-label="Open mobile navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Responsive 360-1024px) */}
      {mobileDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-[#002B7A] text-white h-full p-6 flex flex-col justify-between shadow-2xl border-l border-white/15 animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header with Round Badge Logo */}
              <div className="flex items-center justify-between pb-5 border-b border-white/15">
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-16 rounded-full p-[3px] bg-[linear-gradient(to_bottom,#FFC911_50%,#013CA0_50%)] shadow-md shrink-0">
                    <div className="w-full h-full rounded-full bg-white p-1 overflow-hidden flex items-center justify-center">
                      <img
                        src="/brand/logo-full.png"
                        alt="B4B America"
                        className="w-full h-full object-contain scale-125"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-xl text-white tracking-tight leading-none">
                      B4B <span className="text-[#FFC911]">AMERICA</span>
                    </span>
                    <span className="text-[11px] text-blue-100 font-bold uppercase tracking-wider mt-1">
                      Small Business Solutions
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-blue-100 hover:text-white hover:bg-white/10"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search Bar Trigger */}
              <div className="mt-5">
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false)
                    setSearchModalOpen(true)
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-blue-100 bg-white/10 border border-white/15 min-h-[44px]"
                >
                  <Search className="w-4 h-4 text-[#FFC911]" />
                  <span>Search 16 solutions, B4BAPP, trades...</span>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col gap-2">
                {allNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileDrawerOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl text-sm font-bold text-blue-100 hover:text-white hover:bg-white/10 transition-colors min-h-[44px]"
                  >
                    <span>{link.name}</span>
                    {link.badge ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-[#FFC911] text-[#013CA0]">
                        {link.badge}
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[#FFC911]" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom Mobile Action Buttons */}
            <div className="pt-6 border-t border-white/15 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileDrawerOpen(false)
                  handleOpenCoach()
                }}
                className="btn-gold-dark w-full justify-center group"
              >
                <PhoneCall className="w-4 h-4 text-[#07142B]" />
                <span>Speak with a Business Coach</span>
                <ArrowRight className="w-4 h-4 text-[#07142B] transition-transform group-hover:translate-x-1" />
              </button>

              {user ? (
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false)
                    navigate('/portal/dashboard')
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-white/10 border border-white/20 min-h-[44px]"
                >
                  <UserCheck className="w-4 h-4 text-[#FFC911]" />
                  <span>Back to Portal ({user.email || 'Logged In'})</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false)
                    navigate('/portal/login')
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-white/10 border border-white/20 min-h-[44px]"
                >
                  <LogIn className="w-4 h-4 text-[#FFC911]" />
                  <span>Log In to Portal</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Modals for Search & Coach Lead Form */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectSolution={(sol) => {
          navigate(`/solutions#${sol.slug}`)
        }}
      />

      <CoachRequestModal
        isOpen={internalCoachModalOpen}
        onClose={() => setInternalCoachModalOpen(false)}
      />
    </>
  )
}
