import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  Sun,
  Moon,
  Search,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  MessageSquare,
  Phone,
  Briefcase,
  Users,
  Compass,
} from 'lucide-react'
import { BrandLogo, brandConfig } from '@/config/brand'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useTheme } from '@/hooks/useTheme'
import { CommandPaletteModal } from '@/components/navigation/CommandPaletteModal'
import { CoachRequestModal } from '@/components/forms/CoachRequestModal'
import { NewsletterForm } from '@/components/forms/NewsletterForm'
import { GlobalAiChatWidget } from '@/components/ai/GlobalAiChatWidget'

export const MarketingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchPaletteOpen, setSearchPaletteOpen] = useState(false)
  const [coachModalOpen, setCoachModalOpen] = useState(false)

  // Listen for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchPaletteOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Solutions', href: '/solutions', badge: '16' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Affiliates', href: '/affiliates' },
    { name: 'Company', href: '/company' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0A1628] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Advisory Banner */}
      <div className="bg-gradient-to-r from-[#0A1628] via-[#12294A] to-blue-900 text-white text-xs py-2 px-4 border-b border-blue-950/40 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
              National Network
            </span>
            <span className="truncate">
              The Connection for Small Business Solutions — Helping 12,400+ Independent Businesses Thrive
            </span>
          </div>
          <button
            onClick={() => setCoachModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold hover:underline text-xs shrink-0"
          >
            <span>Speak with a Coach</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-[#1E3A5F]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <BrandLogo size="md" showTagline={false} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-semibold transition-colors flex items-center gap-1.5 py-1 ${
                  isActive(link.href)
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
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

          {/* Right Controls: Search Icon + Theme + Log In + Speak with Coach */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Global Search Icon (Ctrl+K) */}
            <button
              onClick={() => setSearchPaletteOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-white/70 dark:bg-[#0D1E36]/70 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#12294A] transition-colors text-xs"
              title="Search solutions and jobs (Ctrl+K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="hidden xl:inline text-slate-400">Search...</span>
              <kbd className="hidden xl:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-white/70 dark:bg-[#0D1E36]/70 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#12294A] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Log In Button (Outline) navigates to /portal/login */}
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/portal/login')}
              className="font-semibold text-xs h-10"
            >
              Log In
            </Button>

            {/* "Speak with a Business Coach" Primary Button */}
            <Button
              variant="primary"
              size="md"
              pill
              onClick={() => setCoachModalOpen(true)}
              rightIcon={<Sparkles className="w-3.5 h-3.5" />}
              className="text-xs font-bold shadow-md shadow-blue-500/20"
            >
              Speak with a Business Coach
            </Button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              onClick={() => setSearchPaletteOpen(true)}
              className="p-2 rounded-lg border border-slate-200 dark:border-[#1E3A5F] text-slate-600 dark:text-slate-300"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-[#1E3A5F] text-slate-600 dark:text-slate-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
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

        {/* Mobile Hamburger Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0D1E36] px-4 pt-3 pb-6 space-y-4 animate-fadeIn text-left">
            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                    isActive(link.href)
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#12294A]'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <Badge variant="primary" size="sm">
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#1E3A5F] flex flex-col gap-2.5">
              <Button
                variant="primary"
                pill
                className="w-full justify-center text-xs"
                onClick={() => {
                  setMobileMenuOpen(false)
                  setCoachModalOpen(true)
                }}
              >
                Speak with a Business Coach
              </Button>
              <Button
                variant="outline"
                className="w-full justify-center text-xs"
                onClick={() => {
                  setMobileMenuOpen(false)
                  navigate('/portal/login')
                }}
              >
                Log In to Client Terminal
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main View Area */}
      <main className="flex-1">{children}</main>

      {/* 4-Column Footer */}
      <footer className="bg-[#0A1628] text-white border-t border-[#1E3A5F] pt-16 pb-12 mt-20 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Newsletter Strip */}
          <div className="p-8 rounded-2xl bg-[#0D1E36] border border-[#1E3A5F] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Stay Ahead of Market Rates & Playbooks</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Join 28,000+ Small Business Owners Receiving Our Weekly Memo
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                Real-time prime rate updates, non-dilutive grant opportunities, tax strategy deadlines, and operational growth playbooks.
              </p>
            </div>
            <div className="lg:col-span-5">
              <NewsletterForm />
            </div>
          </div>

          {/* 4 Main Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-8 border-b border-slate-800">
            {/* Column 1: Solutions */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>16 Core Solutions</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link to="/solutions/accept-payments" className="hover:text-white transition-colors">Accept Payments</Link></li>
                <li><Link to="/solutions/business-loans" className="hover:text-white transition-colors">Business Loans & Credit Lines</Link></li>
                <li><Link to="/solutions/build-business-credit" className="hover:text-white transition-colors">Build Business Credit (Tier 1-4)</Link></li>
                <li><Link to="/solutions/business-plans" className="hover:text-white transition-colors">SBA Business Plans (starts ~$2,500)</Link></li>
                <li><Link to="/solutions/lead-generation" className="hover:text-white transition-colors">High-Intent Lead Generation</Link></li>
                <li><Link to="/solutions/bookkeeping-tax-prep" className="hover:text-white transition-colors">Bookkeeping & Tax Strategy</Link></li>
                <li><Link to="/solutions/website-design" className="hover:text-white transition-colors">Custom Website Design & SEO</Link></li>
                <li><Link to="/solutions" className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 pt-1">View All 16 Solutions →</Link></li>
              </ul>
            </div>

            {/* Column 2: Company & Careers */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>Company & Culture</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><Link to="/company" className="hover:text-white transition-colors">Our Vision & Mission</Link></li>
                <li><Link to="/company" className="hover:text-white transition-colors">Values: Dreamers NOW Execute</Link></li>
                <li><Link to="/jobs" className="hover:text-white transition-colors flex items-center gap-1.5"><span>Careers & Join Our Team</span><Badge variant="emerald" size="sm" className="text-[9px]">Hiring</Badge></Link></li>
                <li><Link to="/advisory" className="hover:text-white transition-colors">Fractional CFO Advisory Bench</Link></li>
                <li><Link to="/design-system" className="hover:text-amber-400 transition-colors">Design System Showcase</Link></li>
                <li><Link to="/portal/login" className="hover:text-white transition-colors">Client Terminal Login</Link></li>
              </ul>
            </div>

            {/* Column 3: Partners & Community */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Partners & Community</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><Link to="/affiliates" className="hover:text-white transition-colors">Affiliate Referral Network</Link></li>
                <li><Link to="/affiliates" className="hover:text-white transition-colors">CPA & Broker Strategic Partners</Link></li>
                <li><Link to="/affiliates" className="hover:text-white transition-colors">Creator & Influencer Program</Link></li>
                <li><Link to="/solutions/customer-service-academy" className="hover:text-white transition-colors">Customer Service Academy</Link></li>
                <li><Link to="/solutions/find-jobs" className="hover:text-white transition-colors">Commercial Contract Matching</Link></li>
              </ul>
            </div>

            {/* Column 4: Contact & Social */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>Connect with OAL</span>
              </h4>
              <div className="space-y-2 text-xs text-slate-400">
                <p className="text-white font-semibold">{brandConfig.brandName}</p>
                <p>{brandConfig.headquarters}</p>
                <p className="text-emerald-400 font-semibold">{brandConfig.phone}</p>
                <p>{brandConfig.contactEmail}</p>

                {/* Social Icons */}
                <div className="pt-3 flex items-center gap-3">
                  <a href="#twitter" aria-label="X / Twitter" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="#linkedin" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="#facebook" aria-label="Facebook" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/></svg>
                  </a>
                  <a href="#youtube" aria-label="YouTube" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 pt-2">
            <p>© {new Date().getFullYear()} {brandConfig.brandName}. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/contact" className="hover:text-slate-400">Security & Privacy</Link>
              <Link to="/contact" className="hover:text-slate-400">Terms of Service</Link>
              <Link to="/design-system" className="text-blue-400 hover:text-blue-300">Design System</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Interactive Modals & AI Chat */}
      <CommandPaletteModal
        isOpen={searchPaletteOpen}
        onClose={() => setSearchPaletteOpen(false)}
        onOpenCoachModal={() => setCoachModalOpen(true)}
      />

      <CoachRequestModal
        isOpen={coachModalOpen}
        onClose={() => setCoachModalOpen(false)}
      />

      <GlobalAiChatWidget />
    </div>
  )
}
