import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
  Shield,
  Layers,
  ChevronRight,
} from 'lucide-react'
import { BrandLogo, brandConfig } from '@/config/brand'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/hooks/useTheme'
import { useAuth } from '@/hooks/useAuth'

export const MarketingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks: Array<{ name: string; href: string; badge?: string }> = [
    { name: 'Solutions', href: '/solutions' },
    { name: 'Advisory & CFO', href: '/advisory' },
    { name: 'Apply For Capital', href: '/apply' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0A1628] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Advisory Banner */}
      <div className="bg-gradient-to-r from-[#0A1628] via-[#12294A] to-blue-900 text-white text-xs py-2 px-4 border-b border-blue-950/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
              Q4 Allocation
            </span>
            <span className="truncate">
              $15M In Non-Dilutive Capital Lines Open for Qualified Small Businesses
            </span>
          </div>
          <Link
            to="/apply"
            className="hidden sm:inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold hover:underline text-xs shrink-0"
          >
            <span>Pre-qualify in 3 mins</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-[#1E3A5F]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <BrandLogo size="md" showTagline={false} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  isActive(link.href)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Controls: Theme Toggle + Log In (leads to /portal/login) + Main CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-white/70 dark:bg-[#0D1E36]/70 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#12294A] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* WEBSITE LOG IN BUTTON -> Navigates to /portal/login or Dashboard if authenticated */}
            {user ? (
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/portal/dashboard')}
                className="font-semibold border-emerald-500/50 text-emerald-600 dark:text-emerald-400"
              >
                My Dashboard ({user.role})
              </Button>
            ) : (
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/portal/login')}
                className="font-semibold border-slate-300 dark:border-[#1E3A5F]"
              >
                Log In
              </Button>
            )}

            {/* Main CTA */}
            <Button
              variant="primary"
              size="md"
              pill
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/apply')}
            >
              Apply for Capital
            </Button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-[#1E3A5F] text-slate-600 dark:text-slate-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0D1E36] px-4 pt-3 pb-6 space-y-4 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#12294A]"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#1E3A5F] flex flex-col gap-2.5">
              <Button
                variant="outline"
                className="w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false)
                  navigate('/portal/login')
                }}
              >
                Log In to Portal
              </Button>
              <Button
                variant="primary"
                pill
                className="w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false)
                  navigate('/apply')
                }}
              >
                Apply for Capital
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#0A1628] text-white border-t border-[#1E3A5F] pt-16 pb-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
            {/* Col 1: Brand Info */}
            <div className="md:col-span-2 space-y-4">
              <BrandLogo size="lg" className="text-white" />
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                {brandConfig.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400 pt-2">
                <Shield className="w-4 h-4 shrink-0" />
                <span>Non-dilutive institutional capital network with fiduciary advisory.</span>
              </div>
            </div>

            {/* Col 2: Solutions */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                Capital Solutions
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li><Link to="/solutions" className="hover:text-white transition-colors">Revenue-Based Credit</Link></li>
                <li><Link to="/solutions" className="hover:text-white transition-colors">Working Capital Revolvers</Link></li>
                <li><Link to="/solutions" className="hover:text-white transition-colors">Equipment Financing</Link></li>
                <li><Link to="/solutions" className="hover:text-white transition-colors">SBA 7(a) Guarantee Bridge</Link></li>
                <li><Link to="/apply" className="hover:text-emerald-400 transition-colors">Pre-Qualification Check</Link></li>
              </ul>
            </div>

            {/* Col 3: Consulting & Platform */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                Consulting Services
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li><Link to="/advisory" className="hover:text-white transition-colors">Fractional CFO Services</Link></li>
                <li><Link to="/advisory" className="hover:text-white transition-colors">Cash Conversion Audit</Link></li>
                <li><Link to="/advisory" className="hover:text-white transition-colors">M&A & Expansion Strategy</Link></li>
                <li><Link to="/portal/login" className="hover:text-white transition-colors">Client Terminal Login</Link></li>
                <li><Link to="/design-system" className="hover:text-amber-400 transition-colors">Design System Showcase</Link></li>
              </ul>
            </div>

            {/* Col 4: Corporate & Compliance */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                Contact & Office
              </h4>
              <div className="space-y-2.5 text-sm text-slate-400">
                <p className="text-white font-medium">{brandConfig.headquarters}</p>
                <p>{brandConfig.phone}</p>
                <p>{brandConfig.contactEmail}</p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Capital desk open (EST)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Disclosure */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} {brandConfig.brandName}. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-slate-400 cursor-pointer">Security & Encryption</span>
              <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
              <Link to="/design-system" className="text-blue-400 hover:text-blue-300 font-medium">
                UI Kit
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
