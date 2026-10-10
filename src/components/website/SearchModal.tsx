import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  X,
  ArrowRight,
  CreditCard,
  LayoutGrid,
  Palette,
  ShieldCheck,
  FileSpreadsheet,
  Landmark,
  Target,
  GraduationCap,
  ShieldAlert,
  Briefcase,
  Shield,
  Server,
  Megaphone,
  Handshake,
  BookOpen,
  Globe,
  MapPin,
  Cpu,
  Layers,
} from 'lucide-react'
import './corporateTheme.css'
import {
  CLIENT_16_SOLUTIONS,
  B4BAPP_SOFTWARE,
  TERRITORY_DIVISIONS,
  INDUSTRIES_SERVED,
  SolutionItem,
} from '@/content/clientContent'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectSolution?: (solution: SolutionItem) => void
}

const iconMap: Record<string, React.ElementType> = {
  CreditCard,
  LayoutGrid,
  Palette,
  ShieldCheck,
  FileSpreadsheet,
  Landmark,
  Target,
  GraduationCap,
  ShieldAlert,
  Briefcase,
  Shield,
  Server,
  Megaphone,
  Handshake,
  BookOpen,
  Globe,
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSolution,
}) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const q = query.toLowerCase().trim()

  const matchedSolutions = CLIENT_16_SOLUTIONS.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.shortDesc.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
  )

  const matchedSoftwareFeatures = [
    ...B4BAPP_SOFTWARE.crmFeatures.map((f) => ({ feature: f, type: 'CRM Feature' })),
    ...B4BAPP_SOFTWARE.erpFeatures.map((f) => ({ feature: f, type: 'ERP Feature' })),
  ].filter((f) => f.feature.toLowerCase().includes(q))

  const matchedTerritories = TERRITORY_DIVISIONS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.headOffice.toLowerCase().includes(q) ||
      t.coverage.toLowerCase().includes(q)
  )

  const matchedIndustries = INDUSTRIES_SERVED.filter((i) =>
    i.toLowerCase().includes(q)
  ).slice(0, 8)

  const hasResults =
    matchedSolutions.length > 0 ||
    matchedSoftwareFeatures.length > 0 ||
    matchedTerritories.length > 0 ||
    matchedIndustries.length > 0

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search B4B America Directory"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#EEF1EC] text-[#14231E] border border-[#0B4A3A] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#14231E]/15 gap-3 bg-white">
          <Search className="w-5 h-5 text-[#0E7A5A] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 16 solutions, B4BAPP tools, territories, industries..."
            className="w-full bg-transparent text-sm sm:text-base text-[#14231E] placeholder-[#14231E]/50 focus:outline-none font-body"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#14231E]/50 hover:text-[#14231E] rounded-md"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-[#EEF1EC] text-[#06201A] border border-[#14231E]/20 font-mono shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Tags when query is empty */}
        {query.length === 0 ? (
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#14231E]/70 mb-3 font-mono">
                Quick Recommendations
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Accept Payments',
                  'Credit Repair & Build Business Credit',
                  'Business Loans',
                  'B4BAPP Software',
                  'Lead Generation',
                  'Website Design',
                  '12 Territory Divisions',
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-[#14231E] border border-[#14231E]/15 hover:border-[#0E7A5A] hover:text-[#0E7A5A] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#14231E]/15">
              <p className="text-xs font-bold uppercase tracking-wider text-[#14231E]/70 mb-3 font-mono">
                Popular Categories
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Finance Solutions', count: '6 services' },
                  { label: 'Growth & Marketing', count: '4 services' },
                  { label: 'Operations & Staff', count: '3 services' },
                  { label: 'Technology & Web', count: '3 services' },
                ].map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => setQuery(cat.label.split(' ')[0])}
                    className="p-3 text-left rounded-xl bg-white border border-[#14231E]/15 hover:border-[#C8793A] transition-all group"
                  >
                    <p className="text-xs font-bold text-[#14231E] group-hover:text-[#0E7A5A]">
                      {cat.label}
                    </p>
                    <p className="text-[11px] text-[#14231E]/60">{cat.count}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : !hasResults ? (
          <div className="p-8 text-center space-y-2">
            <p className="text-sm font-semibold text-[#14231E]">
              No matching client resources found for "{query}"
            </p>
            <p className="text-xs text-[#14231E]/70">
              Try searching for "Loans", "Credit", "B4BAPP", "Payments", or an industry name.
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Matched 16 Solutions */}
            {matchedSolutions.length > 0 && (
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#14231E]/70 px-2 mb-2 flex items-center justify-between font-mono">
                  <span>Solutions ({matchedSolutions.length})</span>
                  <span className="text-[10px] text-[#0E7A5A]">Official 16</span>
                </p>
                <div className="space-y-1">
                  {matchedSolutions.map((sol) => {
                    const IconComp = iconMap[sol.iconName] || Layers
                    return (
                      <div
                        key={sol.id}
                        onClick={() => {
                          onSelectSolution?.(sol)
                          onClose()
                        }}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white transition-colors cursor-pointer group border border-transparent hover:border-[#14231E]/15"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#0E7A5A]/10 text-[#0E7A5A] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0E7A5A] group-hover:text-white transition-colors">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#06201A] bg-[#C8793A] px-1.5 py-0.5 rounded text-[10px] font-mono">
                              #{sol.number}
                            </span>
                            <span className="text-sm font-bold text-[#14231E] truncate font-heading">
                              {sol.title}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EEF1EC] text-[#0E7A5A] border border-[#14231E]/15 font-medium">
                              {sol.category}
                            </span>
                          </div>
                          <p className="text-xs text-[#14231E]/70 line-clamp-1 mt-0.5">
                            {sol.shortDesc}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#14231E]/40 group-hover:text-[#0E7A5A] group-hover:translate-x-0.5 transition-all shrink-0 mt-1.5" />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Matched B4BAPP Software Features */}
            {matchedSoftwareFeatures.length > 0 && (
              <div className="pt-2 border-t border-[#14231E]/15">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#14231E]/70 px-2 mb-2 flex items-center gap-1.5 font-mono">
                  <Cpu className="w-3.5 h-3.5 text-[#C8793A]" />
                  <span>B4BAPP Software Features ({matchedSoftwareFeatures.length})</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {matchedSoftwareFeatures.map((feat, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg bg-white border border-[#14231E]/15 flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-[#14231E] truncate">
                        {feat.feature}
                      </span>
                      <span className="text-[10px] text-[#14231E]/60 shrink-0 ml-2">
                        {feat.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matched Territory Divisions */}
            {matchedTerritories.length > 0 && (
              <div className="pt-2 border-t border-[#14231E]/15">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#14231E]/70 px-2 mb-2 flex items-center gap-1.5 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#0E7A5A]" />
                  <span>Territory Divisions ({matchedTerritories.length})</span>
                </p>
                <div className="space-y-1">
                  {matchedTerritories.map((terr) => (
                    <div
                      key={terr.id}
                      className="p-2 rounded-lg bg-white border border-[#14231E]/15 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-[#14231E]">
                          Division #{terr.regionNumber}: {terr.name}
                        </span>
                        <p className="text-[11px] text-[#14231E]/70">
                          HQ: {terr.headOffice} • Coverage: {terr.coverage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matched Industries */}
            {matchedIndustries.length > 0 && (
              <div className="pt-2 border-t border-[#14231E]/15">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#14231E]/70 px-2 mb-2 font-mono">
                  Trades & Industries Served ({matchedIndustries.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {matchedIndustries.map((ind) => (
                    <span
                      key={ind}
                      className="px-2.5 py-1 rounded-md text-xs bg-white text-[#14231E] border border-[#14231E]/15"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-white border-t border-[#14231E]/15 flex items-center justify-between text-[11px] text-[#14231E]/70 font-mono">
          <span>Search B4B America Directory</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  )
}
