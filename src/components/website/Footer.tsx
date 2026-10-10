import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Shield,
  PhoneCall,
  Mail,
  MapPin,
  ExternalLink,
  Lock,
  FileText,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import './corporateTheme.css'
import { UsaMapMotif } from './UsaMapMotif'
import { CLIENT_16_SOLUTIONS, BRAND_IDENTITY } from '@/content/clientContent'

export const Footer: React.FC = () => {
  const [activeLegalModal, setActiveLegalModal] = useState<string | null>(null)

  const financeSolutions = CLIENT_16_SOLUTIONS.filter((s) => s.category === 'Finance')
  const growthSolutions = CLIENT_16_SOLUTIONS.filter((s) => s.category === 'Growth')
  const opsTechSolutions = CLIENT_16_SOLUTIONS.filter(
    (s) => s.category === 'Operations' || s.category === 'Technology'
  )

  return (
    <footer
      data-redesigned="true"
      data-theme="dark"
      className="relative bg-[#06201A] text-[#B9CBC3] border-t border-[#0B4A3A]/70 pt-16 pb-12 overflow-hidden"
    >
      {/* Background USA Map Motif watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 flex items-center justify-center">
        <UsaMapMotif className="w-full max-w-5xl text-[#C8793A]" opacity={0.12} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Top Pre-Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[#0B4A3A]">
          {/* Col 1: Soft Stone badge logo container + Vision statement */}
          <div className="lg:col-span-5 space-y-4">
            {/* Soft Stone badge container on dark background */}
            <div className="bg-[#EEF1EC] rounded-xl p-3 inline-block shadow-lg border border-[#EEF1EC]/40">
              <img
                src="/brand/logo-full.png"
                alt="B4B America - The Connection for Small Business Solutions"
                className="h-10 sm:h-12 w-auto object-contain"
                loading="lazy"
              />
            </div>

            <p className="text-xs uppercase font-extrabold tracking-widest text-[#C8793A] font-mono">
              {BRAND_IDENTITY.tagline}
            </p>

            <p className="text-[#B9CBC3] text-sm max-w-md leading-relaxed font-normal">
              "{BRAND_IDENTITY.vision}." We connect American entrepreneurs to 16 vital solutions,
              from non-dilutive credit lines and business planning to payment processing and custom software.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 text-xs text-[#B9CBC3]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C8793A] shrink-0" />
                <span>Financial District, New York, NY</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#C8793A] shrink-0" />
                <span>+1 (888) 540-B4BA</span>
              </div>
            </div>
          </div>

          {/* Col 2: Solutions 1 to 6 (Finance & Credit) */}
          <div className="lg:col-span-2 sm:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8793A] font-mono">
              Capital & Finance
            </h4>
            <ul className="space-y-2 text-xs text-[#B9CBC3]">
              {financeSolutions.map((sol) => (
                <li key={sol.id}>
                  <Link
                    to={`/solutions#${sol.slug}`}
                    className="hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-[10px] text-[#0E7A5A] font-mono font-bold">#{sol.number}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform truncate">
                      {sol.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Solutions 7 to 14 (Marketing & Growth) */}
          <div className="lg:col-span-3 sm:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8793A] font-mono">
              Marketing & Growth
            </h4>
            <ul className="space-y-2 text-xs text-[#B9CBC3]">
              {growthSolutions.map((sol) => (
                <li key={sol.id}>
                  <Link
                    to={`/solutions#${sol.slug}`}
                    className="hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-[10px] text-[#0E7A5A] font-mono font-bold">#{sol.number}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform truncate">
                      {sol.title}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/apply"
                  className="text-[#C8793A] font-semibold hover:underline inline-flex items-center gap-1 mt-1 font-mono text-xs"
                >
                  <span>Pre-Qualify Capital Desk</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Operations & Technology (B4BAPP) */}
          <div className="lg:col-span-2 sm:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8793A] font-mono">
              Tech & Operations
            </h4>
            <ul className="space-y-2 text-xs text-[#B9CBC3]">
              {opsTechSolutions.map((sol) => (
                <li key={sol.id}>
                  <Link
                    to={`/solutions#${sol.slug}`}
                    className="hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-[10px] text-[#0E7A5A] font-mono font-bold">#{sol.number}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform truncate">
                      {sol.title}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#software"
                  className="text-xs font-bold text-white hover:text-[#C8793A] transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C8793A]" />
                  <span>B4BAPP Portal ($25/mo)</span>
                </a>
              </li>
              <li>
                <Link
                  to="/portal/login"
                  className="text-xs text-[#B9CBC3] hover:text-white transition-colors"
                >
                  Biz Pro Portal Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 12 Territory Division Micro-Bar */}
        <div className="py-6 border-b border-[#0B4A3A] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#B9CBC3]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8793A] animate-pulse" />
            <span className="text-white font-semibold">12 Territory Divisions:</span>
            <span>Covering all 50 states via Federal Reserve District geographic framework.</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded bg-[#0B4A3A] text-white">
              Boston
            </span>
            <span className="px-2 py-0.5 rounded bg-[#0B4A3A] text-white">
              New York
            </span>
            <span className="px-2 py-0.5 rounded bg-[#0B4A3A] text-white">
              Chicago
            </span>
            <span className="px-2 py-0.5 rounded bg-[#0B4A3A] text-white">
              Dallas
            </span>
            <span className="px-2 py-0.5 rounded bg-[#0B4A3A] text-white">
              San Francisco
            </span>
            <span className="text-[#C8793A] font-bold">+ 7 More Hubs</span>
          </div>
        </div>

        {/* Bottom Legal Links & Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#B9CBC3]">
          <p>© {new Date().getFullYear()} B4B America • B4B Network. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-white cursor-pointer transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-white cursor-pointer transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => setActiveLegalModal('earnings')}
              className="hover:text-white cursor-pointer transition-colors text-[#C8793A] font-medium"
            >
              Earnings Disclaimer
            </button>
            <Link
              to="/design-system"
              className="text-[#B9CBC3] hover:text-white transition-colors"
            >
              Design Tokens
            </Link>
          </div>
        </div>
      </div>

      {/* Legal Modals */}
      {activeLegalModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveLegalModal(null)}
        >
          <div
            className="w-full max-w-lg bg-[#EEF1EC] text-[#14231E] p-6 rounded-2xl shadow-2xl border border-[#0B4A3A] max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#14231E]/20">
              <h3 className="text-base font-bold text-[#14231E] flex items-center gap-2 font-heading">
                <FileText className="w-4 h-4 text-[#0E7A5A]" />
                {activeLegalModal === 'privacy' && 'Privacy Policy'}
                {activeLegalModal === 'terms' && 'Terms of Service'}
                {activeLegalModal === 'earnings' && 'Earnings & Compensation Disclaimer'}
              </h3>
              <button
                onClick={() => setActiveLegalModal(null)}
                className="text-xs font-bold px-2 py-1 bg-white rounded-md border border-[#14231E]/20 text-[#14231E]"
              >
                Close
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-[#14231E]/80 leading-relaxed font-body">
              {activeLegalModal === 'privacy' && (
                <>
                  <p>
                    B4B America ("we", "us", "B4B Network") takes business data privacy seriously.
                    All information collected through our coach request forms, credit assessments,
                    and onboarding portals is strictly protected with SSL encryption.
                  </p>
                  <p>
                    We never sell, rent, or trade applicant financial data or contact details to
                    unauthorized third-party brokers.
                  </p>
                </>
              )}

              {activeLegalModal === 'terms' && (
                <>
                  <p>
                    By accessing B4B America, our software application B4BAPP, or requesting
                    consultation with our network of business coaches, you agree to these Terms.
                  </p>
                  <p>
                    B4B America acts as a commercial advisory and business solutions aggregator.
                    Approval for financing lines, credit tiers, and merchant rates is subject to
                    underwriting guidelines and state commercial compliance.
                  </p>
                </>
              )}

              {activeLegalModal === 'earnings' && (
                <>
                  <p className="font-bold text-[#14231E]">
                    Mandatory Client & Affiliate Earnings Disclosure:
                  </p>
                  <p>
                    Statements of potential earnings, business valuation gains, and commercial
                    funding allocations reflect modeled business projections and are not guarantees.
                    Results depend on industry, commercial credit score, operational discipline,
                    market conditions, and individual execution.
                  </p>
                  <p>
                    B4BAPP Biz Pro commission structures scale based on rank achievement
                    (from Account Executive to Senior National Channel VP) through verified sales
                    performance across our 100 inventory product categories.
                  </p>
                </>
              )}
            </div>

            <div className="pt-3 border-t border-[#14231E]/20 flex justify-end">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="btn-emerald-light"
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
