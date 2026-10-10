import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  ArrowRight,
  Shield,
  Layers,
  ChevronRight,
} from 'lucide-react'
import { BrandLogo, brandConfig } from '@/config/brand'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

export const MarketingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const navLinks: Array<{ name: string; href: string; badge?: string }> = [
    { name: 'Solutions', href: '/solutions' },
    { name: 'Job Finder', href: '/jobs', badge: 'Hiring' },
    { name: 'Advisory & CFO', href: '/advisory' },
    { name: 'Apply For Capital', href: '/apply' },
    { name: 'Affiliates', href: '/affiliates' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] transition-colors duration-200 overflow-x-hidden">
      {/* Top Advisory Banner */}
      <div className="bg-[var(--navy-900)] text-[var(--gold-500)] text-xs py-2 px-4 border-b border-[var(--navy-800)]">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-[var(--gold-500)]/10 text-[var(--gold-500)] text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-[var(--gold-500)]/30">
              Q4 Allocation
            </span>
            <span className="truncate">
              $15M In Non-Dilutive Capital Lines Open for Qualified Small Businesses
            </span>
          </div>
          <Link
            to="/apply"
            className="hidden sm:inline-flex items-center gap-1 text-[var(--gold-500)] hover:underline font-semibold text-xs shrink-0"
          >
            <span>Pre-qualify in 3 mins</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 w-full bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <BrandLogo variant="wordmark" size="md" showTagline={false} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  isActive(link.href)
                    ? 'text-[var(--blue-600)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-[var(--sky-50)] text-[var(--blue-600)]">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Controls: Log In (leads to /portal/login) + Main CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* WEBSITE LOG IN BUTTON -> Navigates to /portal/login or Dashboard if authenticated */}
            {user ? (
              <Button
                variant="secondary"
                size="md"
                onClick={() => navigate('/portal/dashboard')}
                className="font-semibold"
              >
                My Dashboard ({user.role})
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="md"
                onClick={() => navigate('/portal/login')}
                className="font-semibold"
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[var(--text)] hover:bg-[var(--sky-50)]"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[var(--border)] bg-[var(--surface)] px-4 pt-3 pb-6 space-y-4 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-[var(--text)] hover:bg-[var(--sky-50)]"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex flex-col gap-2.5">
              <Button
                variant="secondary"
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
      <footer data-theme="dark" className="bg-[var(--navy-950)] text-white border-t border-[var(--navy-800)] pt-16 pb-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[var(--navy-800)]">
            {/* Col 1: Brand Info */}
            <div className="md:col-span-2 space-y-4">
              <BrandLogo variant="full" size="lg" showTagline />
              <p className="text-[var(--text-muted)] text-sm max-w-sm leading-relaxed">
                {brandConfig.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] pt-2">
                <Shield className="w-4 h-4 shrink-0 text-[var(--gold-500)]" />
                <span>Non-dilutive institutional capital network with fiduciary advisory.</span>
              </div>
            </div>

            {/* Col 2: Solutions */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Capital Solutions
              </h4>
              <ul className="space-y-2.5 text-sm text-[var(--text-muted)]">
                <li><Link to="/solutions" className="hover:text-[var(--gold-500)] transition-colors">Revenue-Based Credit</Link></li>
                <li><Link to="/solutions" className="hover:text-[var(--gold-500)] transition-colors">Working Capital Revolvers</Link></li>
                <li><Link to="/solutions" className="hover:text-[var(--gold-500)] transition-colors">Equipment Financing</Link></li>
                <li><Link to="/solutions" className="hover:text-[var(--gold-500)] transition-colors">SBA 7(a) Guarantee Bridge</Link></li>
                <li><Link to="/apply" className="hover:text-[var(--gold-500)] transition-colors">Pre-Qualification Check</Link></li>
              </ul>
            </div>

            {/* Col 3: Consulting & Platform */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Consulting Services
              </h4>
              <ul className="space-y-2.5 text-sm text-[var(--text-muted)]">
                <li><Link to="/advisory" className="hover:text-[var(--gold-500)] transition-colors">Fractional CFO Services</Link></li>
                <li><Link to="/advisory" className="hover:text-[var(--gold-500)] transition-colors">Cash Conversion Audit</Link></li>
                <li><Link to="/advisory" className="hover:text-[var(--gold-500)] transition-colors">M&A & Expansion Strategy</Link></li>
                <li><Link to="/portal/login" className="hover:text-[var(--gold-500)] transition-colors">Client Terminal Login</Link></li>
                <li><Link to="/design-system" className="hover:text-[var(--gold-500)] transition-colors">Design System Showcase</Link></li>
              </ul>
            </div>

            {/* Col 4: Corporate & Compliance */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Contact & Office
              </h4>
              <div className="space-y-2.5 text-sm text-[var(--text-muted)]">
                <p className="text-white font-medium">{brandConfig.headquarters}</p>
                <p>{brandConfig.phone}</p>
                <p>{brandConfig.contactEmail}</p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] bg-[var(--navy-900)] text-[var(--text-muted)] border border-[var(--navy-800)]">
                    <span className="w-2 h-2 rounded-full bg-[var(--green-600)]" />
                    Capital desk open (EST)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Disclosure */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
            <p>© {new Date().getFullYear()} {brandConfig.brandName}. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-[var(--gold-500)] cursor-pointer">Security & Encryption</span>
              <span className="hover:text-[var(--gold-500)] cursor-pointer">Privacy Policy</span>
              <span className="hover:text-[var(--gold-500)] cursor-pointer">Terms of Service</span>
              <Link to="/design-system" className="text-[var(--text-muted)] hover:text-[var(--gold-500)] font-medium">
                UI Kit
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
