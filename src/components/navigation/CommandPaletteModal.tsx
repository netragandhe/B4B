import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  Briefcase,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Command,
} from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { SOLUTIONS_DATA } from '@/mock-data/solutions'
import { brandConfig } from '@/config/brand'
import { usePermission } from '@/hooks/usePermission'

interface CommandPaletteModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenCoachModal?: () => void
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onOpenCoachModal,
}) => {
  const navigate = useNavigate()
  const { getMenusForRole } = usePermission()
  const allowedMenus = getMenusForRole()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          // Open state is managed externally, but we trigger if handled here
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [isOpen])

  // Filter Solutions
  const matchedSolutions = SOLUTIONS_DATA.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase())
  )

  // Navigation Items: Public pages + dynamically allowed portal menus from RBAC
  const quickLinks = [
    { label: 'All 16 Small Business Solutions', href: '/solutions', category: 'Pages' },
    { label: 'Careers & Join Our Team', href: '/jobs', category: 'Company' },
    { label: 'Affiliates, Partners & Influencers', href: '/affiliates', category: 'Partners' },
    { label: 'About OAL Network (Vision & Values)', href: '/company', category: 'Company' },
    { label: 'Contact Business Advisory Desk', href: '/contact', category: 'Support' },
    ...allowedMenus.map((m) => ({
      label: `${m.label} (${m.group})`,
      href: m.route,
      category: m.module,
    })),
  ].filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelectSolution = (slug: string) => {
    onClose()
    navigate(`/solutions/${slug}`)
  }

  const handleSelectLink = (href: string) => {
    onClose()
    navigate(href)
  }

  const handleTriggerCoach = () => {
    onClose()
    if (onOpenCoachModal) onOpenCoachModal()
    else navigate('/contact')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Palette Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0D1E36] rounded-2xl border border-slate-200 dark:border-[#1E3A5F] shadow-2xl overflow-hidden z-10 animate-scaleUp text-left">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-[#1E3A5F] flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search solutions, credit, loans, jobs, or type 'coach'..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
            ESC to close
          </span>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Quick Action: Speak with coach */}
          {(!query || 'coach'.includes(query.toLowerCase()) || 'speak'.includes(query.toLowerCase())) && (
            <div
              onClick={handleTriggerCoach}
              className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-[#12294A] dark:to-emerald-950/30 border border-blue-200 dark:border-[#1E3A5F] flex items-center justify-between cursor-pointer hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Speak with a Dedicated Business Coach
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Complimentary 20-minute 1-on-1 strategy and funding diagnostic.
                  </p>
                </div>
              </div>
              <Badge variant="emerald" size="sm">
                Instant Action
              </Badge>
            </div>
          )}

          {/* Solutions Category */}
          {matchedSolutions.length > 0 && (
            <div>
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                16 Core Business Solutions ({matchedSolutions.length})
              </p>
              <div className="space-y-1">
                {matchedSolutions.map((sol) => (
                  <div
                    key={sol.id}
                    onClick={() => handleSelectSolution(sol.slug)}
                    className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#12294A] cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div className="min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                          {sol.title}
                        </span>
                        <Badge variant="primary" size="sm" className="text-[9px]">
                          {sol.badge}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {sol.shortDesc}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Links */}
          {quickLinks.length > 0 && (
            <div>
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Quick Navigation ({quickLinks.length})
              </p>
              <div className="space-y-1">
                {quickLinks.map((item) => (
                  <div
                    key={item.href}
                    onClick={() => handleSelectLink(item.href)}
                    className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#12294A] cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {item.label}
                    </span>
                    <Badge variant="outline" size="sm" className="text-[10px]">
                      {item.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedSolutions.length === 0 && quickLinks.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400">
              No matching solutions or pages found for "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-50 dark:bg-[#0A1628]/80 border-t border-slate-200 dark:border-[#1E3A5F] flex items-center justify-between text-[11px] text-slate-400">
          <span>{brandConfig.brandName} Knowledge Search</span>
          <span>Tip: Press <kbd className="font-mono font-bold text-slate-600 dark:text-slate-300">Ctrl+K</kbd> anywhere</span>
        </div>
      </div>
    </div>
  )
}
