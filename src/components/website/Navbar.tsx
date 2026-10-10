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
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCoachModal }) => {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [internalCoachModalOpen, setInternalCoachModalOpen] = useState(false)

  const handleOpenCoach = () => {
    if (onOpenCoachModal) {
      onOpenCoachModal()
    } else {
      setInternalCoachModalOpen(true)
    }
  }

  const navLinks = [
    { name: '16 Solutions', href: '/solutions', badge: '16' },
    { name: 'Advisory & CFO', href: '/advisory' },
    { name: 'B4BAPP Software', href: '/#software' },
    { name: 'Job Finder', href: '/jobs', badge: 'Hiring' },
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
      {/* Top National Announcement Bar: Forest Black (#06201A) */}
      <div className="bg-[#06201A] text-[#B9CBC3] text-xs py-2 px-4 border-b border-[#0B4A3A]/70 font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-[#C8793A] text-[#06201A] text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shrink-0 tracking-wider">
              National Network
            </span>
            <span className="text-[#B9CBC3] truncate font-medium">
              16 Core Solutions across 12 Federal Reserve Territory Divisions
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 shrink-0 text-xs">
            <button
              onClick={handleOpenCoach}
              className="text-[#C8793A] hover:underline font-bold inline-flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#C8793A]" />
              <span>Dedicated Coach Desk</span>
            </button>
            <span className="text-[#0B4A3A]">|</span>
            <Link
              to="/apply"
              className="text-[#B9CBC3] hover:text-white transition-colors font-medium inline-flex items-center gap-1"
            >
              <span>Pre-qualify in 3 mins</span>
              <ArrowRight className="w-3 h-3 text-[#C8793A]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar: Forest Black (#06201A) */}
      <header className="sticky top-0 z-40 w-full bg-[#06201A]/95 backdrop-blur-md border-b border-[#0B4A3A]/60 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* LEFT: Logo on Soft Stone (#EEF1EC) Badge */}
          <div className="flex items-center mr-6 sm:mr-8 shrink-0">
            <Link
              to="/"
              className="flex items-center group focus:outline-none"
              aria-label="B4B America Home"
            >
              {/* Soft Stone Badge Container for Logo on Dark Background */}
              <div className="bg-[#EEF1EC] px-3 py-1.5 rounded-xl border border-[#EEF1EC]/40 shadow-xs flex items-center justify-center transition-transform group-hover:scale-[1.02]">
                <img
                  src="/brand/logo-full.png"
                  alt="B4B America - The Connection for Small Business Solutions"
                  className="h-[32px] md:h-[38px] w-auto max-h-[40px] object-contain shrink-0"
                  style={{ aspectRatio: 'auto' }}
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-semibold transition-colors flex items-center gap-1.5 py-1 relative ${
                    active
                      ? 'text-white'
                      : 'text-[#B9CBC3] hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold font-mono bg-[#0B4A3A] text-[#C8793A] border border-[#C8793A]/30">
                      {link.badge}
                    </span>
                  )}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8793A] rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Action Controls: Search + Auth + Copper Coach CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#B9CBC3] hover:text-white bg-[#0B4A3A]/40 border border-[#0B4A3A] hover:border-[#C8793A] transition-all min-h-[44px]"
              aria-label="Open search directory"
            >
              <Search className="w-4 h-4 text-[#C8793A]" />
              <span className="hidden xl:inline">Search Directory</span>
              <kbd className="hidden xl:inline text-[10px] font-mono px-1.5 py-0.5 bg-[#06201A] border border-[#0B4A3A] rounded text-[#B9CBC3]">
                ⌘K
              </kbd>
            </button>

            {/* Auth Button: Secondary Outline */}
            {user ? (
              <button
                onClick={() => navigate('/portal/dashboard')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#0B4A3A]/60 border border-[#0B4A3A] hover:bg-[#0B4A3A] transition-colors min-h-[44px]"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#C8793A]" />
                <span>Back to Portal</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/portal/login')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#0B4A3A]/60 border border-[#0B4A3A] hover:bg-[#0B4A3A] transition-colors min-h-[44px]"
              >
                <LogIn className="w-3.5 h-3.5 text-[#C8793A]" />
                <span>Log In</span>
              </button>
            )}

            {/* MANDATORY CTA: Copper Fill on Dark, Forest Black Text, Arrow Icon Hover Lift */}
            {/* Desktop / Tablet Full Button */}
            <button
              onClick={handleOpenCoach}
              className="!hidden sm:!inline-flex btn-copper-dark group"
            >
              <PhoneCall className="w-4 h-4 text-[#06201A] shrink-0" />
              <span className="whitespace-nowrap">Speak with a Business Coach</span>
              <ArrowRight className="w-4 h-4 text-[#06201A] transition-transform group-hover:translate-x-1 shrink-0" />
            </button>

            {/* Mobile (360px) Tap Target Icon Button */}
            <button
              onClick={handleOpenCoach}
              className="sm:!hidden flex items-center justify-center p-2.5 rounded-xl bg-[#C8793A] text-[#06201A] hover:bg-[#d8894a] shadow-md min-w-[44px] min-h-[44px] shrink-0"
              aria-label="Speak with a Business Coach"
            >
              <PhoneCall className="w-4 h-4 text-[#06201A]" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden p-2.5 rounded-xl text-[#B9CBC3] hover:text-white hover:bg-[#0B4A3A]/50 border border-[#0B4A3A] min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0"
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
