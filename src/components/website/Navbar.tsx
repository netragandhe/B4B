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
          ? 'bg-[#EEF1EC] text-black border-slate-300'
          : 'bg-[#06201A] text-[#B9CBC3] border-[#0B4A3A]/70'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full shrink-0 tracking-wider shadow-xs ${
              isLight
                ? 'bg-[#0E7A5A] text-white'
                : 'bg-[#C8793A] text-[#06201A]'
            }`}>
              National Network
            </span>
            <span className={`truncate font-bold ${isLight ? 'text-black' : 'text-white'}`}>
              16 Core Solutions across 12 Federal Reserve Territory Divisions
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 shrink-0 text-xs">
            <button
              onClick={handleOpenCoach}
              className={`hover:underline font-extrabold inline-flex items-center gap-1.5 cursor-pointer uppercase tracking-wider ${
                isLight ? 'text-[#0E7A5A]' : 'text-[#C8793A]'
              }`}
            >
              <PhoneCall className={`w-3.5 h-3.5 ${isLight ? 'text-[#0E7A5A]' : 'text-[#C8793A]'}`} />
              <span>Dedicated Coach Desk</span>
            </button>
            <span className={isLight ? 'text-slate-400 font-bold' : 'text-[#0B4A3A]'}>|</span>
            <Link
              to="/apply"
              className={`transition-colors font-bold inline-flex items-center gap-1 ${
                isLight ? 'text-black hover:text-[#0E7A5A]' : 'text-[#B9CBC3] hover:text-white'
              }`}
            >
              <span>Pre-qualify in 3 mins</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isLight ? 'text-[#0E7A5A]' : 'text-[#C8793A]'}`} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`sticky top-0 z-40 w-full backdrop-blur-md transition-colors ${
        isLight
          ? 'bg-white/95 border-b border-slate-200/80 shadow-xs text-[#14231E]'
          : 'bg-[#06201A]/95 border-b border-[#0B4A3A]/60 shadow-lg text-white'
      }`}>
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-5 xl:px-8 h-18 lg:h-20 flex items-center justify-between gap-2 xl:gap-3 2xl:gap-6">
          {/* LEFT: Logo */}
          <div className="flex items-center shrink-0">
            <Link
              to="/"
              className="flex items-center group focus:outline-none"
              aria-label="B4B America Home"
            >
              <div className={`p-1 rounded-xl transition-transform group-hover:scale-[1.02] ${
                isLight
                  ? 'bg-transparent'
                  : 'bg-[#EEF1EC] border border-[#EEF1EC]/40 shadow-xs'
              }`}>
                <img
                  src="/brand/logo-full.png"
                  alt="B4B America - The Connection for Small Business Solutions"
                  className="h-[30px] md:h-[34px] xl:h-[38px] w-auto max-h-[40px] object-contain shrink-0"
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
                        ? 'text-[#0E7A5A]'
                        : 'text-black hover:text-[#0E7A5A]'
                      : active
                        ? 'text-white'
                        : 'text-[#B9CBC3] hover:text-white'
                  }`}
                >
                  <span className="font-extrabold whitespace-nowrap">{link.name}</span>
                  {link.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold font-mono whitespace-nowrap ${
                      isLight
                        ? 'bg-emerald-50 text-[#0E7A5A] border border-emerald-200'
                        : 'bg-[#0B4A3A] text-[#C8793A] border border-[#C8793A]/30'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                  {active && (
                    <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                      isLight ? 'bg-[#0E7A5A]' : 'bg-[#C8793A]'
                    }`} />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Action Controls: Search + Auth + Coach CTA */}
          <div className="flex items-center gap-1.5 xl:gap-2 2xl:gap-2.5 shrink-0">
            {/* Quick Search Button: Compact icon on standard laptops, expanded on wide displays */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className={`flex items-center gap-1.5 p-2 xl:px-2.5 xl:py-2 rounded-xl text-xs font-bold transition-all min-h-[38px] xl:min-h-[42px] cursor-pointer shrink-0 ${
                isLight
                  ? 'text-black hover:text-[#0E7A5A] bg-slate-100/80 border border-slate-300 hover:border-[#0E7A5A]'
                  : 'text-[#B9CBC3] hover:text-white bg-[#0B4A3A]/40 border border-[#0B4A3A] hover:border-[#C8793A]'
              }`}
              aria-label="Open search directory"
              title="Search Directory (⌘K)"
            >
              <Search className={`w-3.5 h-3.5 xl:w-4 xl:h-4 ${isLight ? 'text-[#0E7A5A]' : 'text-[#C8793A]'}`} />
              <span className="hidden 2xl:inline whitespace-nowrap">Search Directory</span>
              <kbd className={`hidden 2xl:inline text-[10px] font-mono px-1 py-0.5 rounded ${
                isLight
                  ? 'bg-white border border-slate-300 text-slate-800'
                  : 'bg-[#06201A] border border-[#0B4A3A] text-[#B9CBC3]'
              }`}>
                ⌘K
              </kbd>
            </button>

            {/* Auth Button */}
            {user ? (
              <button
                onClick={() => navigate('/portal/dashboard')}
                className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-xs font-extrabold transition-colors min-h-[38px] xl:min-h-[42px] whitespace-nowrap cursor-pointer shrink-0 ${
                  isLight
                    ? 'text-black bg-slate-100 hover:bg-slate-200 border border-slate-300'
                    : 'text-white bg-[#0B4A3A]/60 border border-[#0B4A3A] hover:bg-[#0B4A3A]'
                }`}
              >
                <UserCheck className={`w-3.5 h-3.5 ${isLight ? 'text-[#0E7A5A]' : 'text-[#C8793A]'}`} />
                <span className="hidden xl:inline">Back to Portal</span>
                <span className="xl:hidden">Portal</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/portal/login')}
                className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-xs font-extrabold transition-colors min-h-[38px] xl:min-h-[42px] whitespace-nowrap cursor-pointer shrink-0 ${
                  isLight
                    ? 'text-black hover:text-[#0E7A5A] bg-transparent border border-slate-300 hover:border-slate-400'
                    : 'text-white bg-[#0B4A3A]/60 border border-[#0B4A3A] hover:bg-[#0B4A3A]'
                }`}
              >
                <LogIn className={`w-3.5 h-3.5 ${isLight ? 'text-[#0E7A5A]' : 'text-[#C8793A]'}`} />
                <span>Log In</span>
              </button>
            )}

            {/* MANDATORY CTA: Speak with a Business Coach */}
            <button
              onClick={handleOpenCoach}
              className={`!hidden sm:!inline-flex group !min-h-[38px] xl:!min-h-[42px] !h-[38px] xl:!h-[42px] !px-2.5 xl:!px-3.5 2xl:!px-4 !text-xs shrink-0 cursor-pointer ${
                isLight ? 'btn-emerald-light' : 'btn-copper-dark'
              }`}
            >
              <PhoneCall className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-white' : 'text-[#06201A]'}`} />
              <span className="hidden 2xl:inline whitespace-nowrap">Speak with a Business Coach</span>
              <span className="inline 2xl:hidden whitespace-nowrap">Speak with Coach</span>
              <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 shrink-0 ${
                isLight ? 'text-white' : 'text-[#06201A]'
              }`} />
            </button>

            {/* Mobile (360px) Tap Target Icon Button */}
            <button
              onClick={handleOpenCoach}
              className={`sm:!hidden flex items-center justify-center p-2.5 rounded-xl shadow-md min-w-[44px] min-h-[44px] shrink-0 ${
                isLight
                  ? 'bg-[#0E7A5A] text-white hover:bg-[#0B4A3A]'
                  : 'bg-[#C8793A] text-[#06201A] hover:bg-[#d8894a]'
              }`}
              aria-label="Speak with a Business Coach"
            >
              <PhoneCall className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className={`lg:hidden p-2.5 rounded-xl border min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0 ${
                isLight
                  ? 'text-[#14231E] hover:bg-slate-100 border-slate-200'
                  : 'text-[#B9CBC3] hover:text-white hover:bg-[#0B4A3A]/50 border-[#0B4A3A]'
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
            className="w-full max-w-sm bg-[#06201A] text-white h-full p-6 flex flex-col justify-between shadow-2xl border-l border-[#0B4A3A] animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#0B4A3A]">
                <div className="bg-[#EEF1EC] px-3 py-1.5 rounded-xl border border-[#EEF1EC]/40">
                  <img
                    src="/brand/logo-full.png"
                    alt="B4B America"
                    className="h-[30px] w-auto object-contain"
                  />
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-[#B9CBC3] hover:text-white hover:bg-[#0B4A3A]"
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
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#B9CBC3] bg-[#0B4A3A]/40 border border-[#0B4A3A]"
                >
                  <Search className="w-4 h-4 text-[#C8793A]" />
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
                    className="flex items-center justify-between p-3 rounded-xl text-sm font-bold text-[#B9CBC3] hover:text-white hover:bg-[#0B4A3A]/50 transition-colors"
                  >
                    <span>{link.name}</span>
                    {link.badge ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-[#0B4A3A] text-[#C8793A] border border-[#C8793A]/30">
                        {link.badge}
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[#0E7A5A]" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom Mobile Action Buttons */}
            <div className="pt-6 border-t border-[#0B4A3A] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileDrawerOpen(false)
                  handleOpenCoach()
                }}
                className="btn-copper-dark w-full justify-center group"
              >
                <PhoneCall className="w-4 h-4 text-[#06201A]" />
                <span>Speak with a Business Coach</span>
                <ArrowRight className="w-4 h-4 text-[#06201A] transition-transform group-hover:translate-x-1" />
              </button>

              {user ? (
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false)
                    navigate('/portal/dashboard')
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0B4A3A]/60 border border-[#0B4A3A]"
                >
                  <UserCheck className="w-4 h-4 text-[#C8793A]" />
                  <span>Back to Portal ({user.email || 'Logged In'})</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false)
                    navigate('/portal/login')
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0B4A3A]/60 border border-[#0B4A3A]"
                >
                  <LogIn className="w-4 h-4 text-[#C8793A]" />
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
