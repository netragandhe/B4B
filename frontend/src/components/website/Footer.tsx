import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText,
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
      className="relative bg-[var(--color-midnight)] text-[var(--color-text-dark)] border-t border-[var(--color-deep-navy)] pt-16 pb-12 overflow-hidden w-full"
    >
      {/* Background USA Map Motif watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 flex items-center justify-center">
        <UsaMapMotif className="w-full max-w-5xl text-[var(--color-logo-gold)]" opacity={0.12} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Top Pre-Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[var(--color-deep-navy)]">
          {/* Col 1: White badge logo container + Vision statement */}
          <div className="lg:col-span-5 space-y-4">
            {/* Round Badge Logo container */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-[3.5px] bg-[linear-gradient(to_bottom,#FFC911_50%,#013CA0_50%)] shadow-2xl inline-block shrink-0">
                <div className="w-full h-full rounded-full bg-white p-1 overflow-hidden flex items-center justify-center">
                  <img
                    src="/brand/logo-full.png"
                    alt="B4B America - The Connection for Small Business Solutions"
                    className="w-full h-full object-contain scale-125"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-none font-['Plus_Jakarta_Sans',sans-serif]">
                  B4B <span className="text-[var(--color-logo-gold)]">AMERICA</span>
                </span>
                <span className="text-xs sm:text-sm text-slate-300 font-bold uppercase tracking-wider mt-1.5">
                  Small Business Solutions
                </span>
              </div>
            </div>

            <p className="text-xs uppercase font-extrabold tracking-widest text-[var(--color-logo-gold)] font-mono">
              {BRAND_IDENTITY.tagline}
            </p>

            <p className="text-[var(--color-text-dark)] text-sm max-w-md leading-relaxed font-normal">
              "{BRAND_IDENTITY.vision}."
            </p>
          </div>

          {/* Col 2: Solutions 1 to 6 (Finance & Credit) */}
          <div className="lg:col-span-2 sm:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-logo-gold)] font-mono">
              Capital & Finance
            </h4>
            <ul className="space-y-2 text-xs text-[var(--color-text-dark)]">
              {financeSolutions.map((sol) => (
                <li key={sol.id}>
                  <Link
                    to={`/?solution=${sol.slug}#solutions-showcase`}
                    className="hover:text-white transition-colors flex items-start gap-1.5 group py-0.5"
                  >
                    <span className="text-[10px] text-[var(--color-logo-blue)] font-mono font-bold shrink-0 pt-0.5">#{sol.number}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform leading-snug break-words">
                      {sol.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Solutions 7 to 14 (Marketing & Growth) */}
          <div className="lg:col-span-3 sm:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-logo-gold)] font-mono">
              Marketing & Growth
            </h4>
            <ul className="space-y-2 text-xs text-[var(--color-text-dark)]">
              {growthSolutions.map((sol) => (
                <li key={sol.id}>
                  <Link
                    to={`/?solution=${sol.slug}#solutions-showcase`}
                    className="hover:text-white transition-colors flex items-start gap-1.5 group py-0.5"
                  >
                    <span className="text-[10px] text-[var(--color-logo-blue)] font-mono font-bold shrink-0 pt-0.5">#{sol.number}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform leading-snug break-words">
                      {sol.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Operations & Technology (B4BAPP) */}
          <div className="lg:col-span-2 sm:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-logo-gold)] font-mono">
              Tech & Operations
            </h4>
            <ul className="space-y-2 text-xs text-[var(--color-text-dark)]">
              {opsTechSolutions.map((sol) => (
                <li key={sol.id}>
                  <Link
                    to={`/?solution=${sol.slug}#solutions-showcase`}
                    className="hover:text-white transition-colors flex items-start gap-1.5 group py-0.5"
                  >
                    <span className="text-[10px] text-[var(--color-logo-blue)] font-mono font-bold shrink-0 pt-0.5">#{sol.number}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform leading-snug break-words">
                      {sol.title}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('software')
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' })
                    } else {
                      window.location.href = '/#software'
                    }
                  }}
                  className="text-xs font-bold text-white hover:text-[var(--color-logo-gold)] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[var(--color-logo-gold)]" />
                  <span>B4BAPP Portal ($25/mo)</span>
                </button>
              </li>
              <li>
                <Link
                  to="/portal/login"
                  className="text-xs text-[var(--color-text-dark)] hover:text-white transition-colors"
                >
                  Biz Pro Portal Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Links & Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-dark)]">
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
              className="hover:text-white cursor-pointer transition-colors text-[var(--color-logo-gold)] font-medium"
            >
              Earnings Disclaimer
            </button>
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
            className="w-full max-w-lg bg-[var(--color-stone)] text-[var(--color-text-light)] p-6 rounded-2xl shadow-2xl border border-[var(--color-deep-navy)] max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-text-light)]/20">
              <h3 className="text-base font-bold text-[var(--color-text-light)] flex items-center gap-2 font-heading">
                <FileText className="w-4 h-4 text-[var(--color-logo-blue)]" />
                {activeLegalModal === 'privacy' && 'Privacy Policy'}
                {activeLegalModal === 'terms' && 'Terms of Service'}
                {activeLegalModal === 'earnings' && 'Earnings & Compensation Disclaimer'}
              </h3>
              <button
                onClick={() => setActiveLegalModal(null)}
                className="text-xs font-bold px-2.5 py-1.5 bg-white rounded-md border border-[var(--color-text-light)]/20 text-[var(--color-text-light)] min-h-[32px] cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-[var(--color-text-light)]/80 leading-relaxed font-body">
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
                  <p className="font-bold text-[var(--color-text-light)]">
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

            <div className="pt-3 border-t border-[#14233B]/20 flex justify-end">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="btn-blue-light"
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
