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

  interface NavLinkItem {
    name: string
    href: string
    badge?: string
  }

  const navLinks: NavLinkItem[] = [
    { name: '16 Solutions', href: '/solutions' },
    { name: 'Advisory & CFO', href: '/advisory' },
    { name: 'B4BAPP Software', href: '/#software' },
    { name: 'Job Finder', href: '/jobs' },
    { name: 'Affiliates', href: '/affiliates' },
    { name: 'Apply For Capital', href: '/apply' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false
    return location.pathname === path
  }

  return (
    <>
      {/* Top National Announcement Bar */}
      <div className={`text-xs py-2 px-4 border-b font-mono transition-colors ${
        isLight
          ? 'bg-[#E9EDF4] text-[#14233B] border-[#14233B]/10'
          : 'bg-[#07142B] text-[#B8C4D9] border-[#0D2147]'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full shrink-0 tracking-wider shadow-xs ${
              isLight
                ? 'bg-[#0C43A3] text-white'
                : 'bg-[#F8C61A] text-[#07142B]'
            }`}>
              National Network
            </span>
            <span className={`truncate font-bold ${isLight ? 'text-[#14233B]' : 'text-white'}`}>
              16 Core Solutions across 12 Federal Reserve Territory Divisions
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 shrink-0 text-xs">
            <button
              onClick={handleOpenCoach}
              className={`hover:underline font-extrabold inline-flex items-center gap-1.5 cursor-pointer uppercase tracking-wider ${
                isLight ? 'text-[#0C43A3]' : 'text-[#F8C61A]'
              }`}
            >
              <PhoneCall className={`w-3.5 h-3.5 ${isLight ? 'text-[#0C43A3]' : 'text-[#F8C61A]'}`} />
              <span>Dedicated Coach Desk</span>
            </button>
            <span className={isLight ? 'text-slate-400 font-bold' : 'text-[#0D2147]'}>|</span>
            <Link
              to="/apply"
              className={`transition-colors font-bold inline-flex items-center gap-1 ${
                isLight ? 'text-[#14233B] hover:text-[#0C43A3]' : 'text-[#B8C4D9] hover:text-white'
              }`}
            >
              <span>Pre-qualify in 3 mins</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isLight ? 'text-[#0C43A3]' : 'text-[#F8C61A]'}`} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`sticky top-0 z-40 w-full backdrop-blur-md transition-colors ${
        isLight
          ? 'bg-[#E9EDF4]/95 border-b border-[#14233B]/10 shadow-xs text-[#14233B]'
          : 'bg-[#07142B]/95 border-b border-[#0D2147] shadow-lg text-white'
      }`}>
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-5 xl:px-8 h-18 lg:h-20 flex items-center justify-between gap-2 xl:gap-3 2xl:gap-6">
          {/* LEFT: Logo - 40px high desktop (32px mobile), clear space, on dark background put on white rounded badge */}
          <div className="flex items-center shrink-0">
            <Link
              to="/"
              className="flex items-center group focus:outline-none"
              aria-label="B4B America Home"
            >
              <div className={`p-1.5 rounded-xl transition-transform group-hover:scale-[1.02] ${
                isLight
                  ? 'bg-transparent'
                  : 'bg-white border border-white/80 shadow-md'
              }`}>
                <img
                  src="/brand/logo-full.png"
                  alt="B4B America - The Connection for Small Business Solutions"
                  className="h-8 md:h-10 w-auto max-h-[40px] object-contain shrink-0"
                  style={{ aspectRatio: 'auto' }}
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-7 shrink">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-xs xl:text-[13px] 2xl:text-sm font-extrabold tracking-tight transition-colors flex items-center gap-1 xl:gap-1.5 px-1 xl:px-1.5 py-1 whitespace-nowrap shrink-0 relative ${
                    isLight
                      ? active
                        ? 'text-[#0C43A3]'
                        : 'text-[#14233B] hover:text-[#0C43A3]'
                      : active
                        ? 'text-white'
                        : 'text-[#B8C4D9] hover:text-white'
                  }`}
                >
                  <span className="font-extrabold whitespace-nowrap">{link.name}</span>
                  {link.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold font-mono whitespace-nowrap ${
                      isLight
                        ? 'bg-blue-50 text-[#0C43A3] border border-blue-200'
                        : 'bg-[#0D2147] text-[#F8C61A] border border-[#F8C61A]/30'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                  {active && (
                    <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                      isLight ? 'bg-[#0C43A3]' : 'bg-[#F8C61A]'
                    }`} />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Action Controls: Search + Auth + Coach CTA */}
          <div className="flex items-center gap-1.5 xl:gap-2 2xl:gap-2.5 shrink-0">
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className={`flex items-center gap-1.5 p-2 xl:px-2.5 xl:py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer shrink-0 ${
                isLight
                  ? 'text-[#14233B] hover:text-[#0C43A3] bg-white border border-[#14233B]/15 hover:border-[#0C43A3]'
                  : 'text-[#B8C4D9] hover:text-white bg-[#0D2147]/60 border border-[#0D2147] hover:border-[#F8C61A]'
              }`}
              aria-label="Open search directory"
              title="Search Directory (⌘K)"
            >
              <Search className={`w-3.5 h-3.5 xl:w-4 xl:h-4 ${isLight ? 'text-[#0C43A3]' : 'text-[#F8C61A]'}`} />
              <span className="hidden 2xl:inline whitespace-nowrap">Search Directory</span>
              <kbd className={`hidden 2xl:inline text-[10px] font-mono px-1 py-0.5 rounded ${
                isLight
                  ? 'bg-[#E9EDF4] border border-[#14233B]/15 text-[#14233B]'
                  : 'bg-[#07142B] border border-[#0D2147] text-[#B8C4D9]'
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
                    : 'text-white bg-[#0D2147] border border-[#0D2147] hover:border-[#F8C61A]'
                }`}
              >
                <UserCheck className={`w-3.5 h-3.5 ${isLight ? 'text-[#0C43A3]' : 'text-[#F8C61A]'}`} />
                <span className="hidden xl:inline">Back to Portal</span>
                <span className="xl:hidden">Portal</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/portal/login')}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-colors min-h-[44px] whitespace-nowrap cursor-pointer shrink-0 ${
                  isLight
                    ? 'text-[#14233B] hover:text-[#0C43A3] bg-transparent border border-[#14233B]/20 hover:border-[#0C43A3]'
                    : 'text-white bg-[#0D2147] border border-[#0D2147] hover:border-[#F8C61A]'
                }`}
              >
                <LogIn className={`w-3.5 h-3.5 ${isLight ? 'text-[#0C43A3]' : 'text-[#F8C61A]'}`} />
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
                  : 'text-[#B8C4D9] hover:text-white hover:bg-[#0D2147] border-[#0D2147]'
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
            className="w-full max-w-sm bg-[#07142B] text-white h-full p-6 flex flex-col justify-between shadow-2xl border-l border-[#0D2147] animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header with Logo on white rounded badge */}
              <div className="flex items-center justify-between pb-5 border-b border-[#0D2147]">
                <div className="bg-white px-2.5 py-1.5 rounded-xl shadow-md">
                  <img
                    src="/brand/logo-full.png"
                    alt="B4B America"
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#B8C4D9] hover:text-white hover:bg-[#0D2147]"
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
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#B8C4D9] bg-[#0D2147]/60 border border-[#0D2147] min-h-[44px]"
                >
                  <Search className="w-4 h-4 text-[#F8C61A]" />
                  <span>Search 16 solutions, B4BAPP, trades...</span>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileDrawerOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl text-sm font-bold text-[#B8C4D9] hover:text-white hover:bg-[#0D2147]/70 transition-colors min-h-[44px]"
                  >
                    <span>{link.name}</span>
                    {link.badge ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-[#0D2147] text-[#F8C61A] border border-[#F8C61A]/30">
                        {link.badge}
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[#0C43A3]" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom Mobile Action Buttons */}
            <div className="pt-6 border-t border-[#0D2147] flex flex-col gap-3">
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
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-[#0D2147] border border-[#0D2147] min-h-[44px]"
                >
                  <UserCheck className="w-4 h-4 text-[#F8C61A]" />
                  <span>Back to Portal ({user.email || 'Logged In'})</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false)
                    navigate('/portal/login')
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-[#0D2147] border border-[#0D2147] min-h-[44px]"
                >
                  <LogIn className="w-4 h-4 text-[#F8C61A]" />
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
