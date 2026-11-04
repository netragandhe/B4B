import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  PhoneCall,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Landmark,
  Target,
  LayoutGrid,
  Server,
  Layers,
  CreditCard,
  Palette,
  ShieldCheck,
  FileSpreadsheet,
  GraduationCap,
  ShieldAlert,
  Briefcase,
  Shield,
  Megaphone,
  Handshake,
  BookOpen,
  Globe,
} from 'lucide-react'
import { CLIENT_16_SOLUTIONS, SolutionItem } from '@/content/clientContent'
import { SOLUTION_IMAGES } from '@/content/solutionImages'

interface SolutionDetailModalProps {
  solution: SolutionItem | null
  isOpen: boolean
  onClose: () => void
  onOpenCoachModal: (solution: SolutionItem) => void
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

export const SolutionDetailModal: React.FC<SolutionDetailModalProps> = ({
  solution,
  isOpen,
  onClose,
  onOpenCoachModal,
  onSelectSolution,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !solution) return
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, solution])

  if (!isOpen || !solution) return null

  const currentIndex = CLIENT_16_SOLUTIONS.findIndex((s) => s.id === solution.id)
  const prevSolution =
    CLIENT_16_SOLUTIONS[(currentIndex - 1 + CLIENT_16_SOLUTIONS.length) % CLIENT_16_SOLUTIONS.length]
  const nextSolution = CLIENT_16_SOLUTIONS[(currentIndex + 1) % CLIENT_16_SOLUTIONS.length]

  const handlePrev = () => {
    if (onSelectSolution) {
      onSelectSolution(prevSolution)
    }
  }

  const handleNext = () => {
    if (onSelectSolution) {
      onSelectSolution(nextSolution)
    }
  }

  const IconComp = iconMap[solution.iconName] || Layers

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#07142B]/85 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-br from-[#0F356B]/95 via-[#0C2A54]/95 to-[#081F42]/98 border border-sky-300/40 shadow-[0_24px_70px_rgba(2,132,199,0.35)] text-white overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#013CA0]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#FFC911]/12 rounded-full blur-3xl pointer-events-none" />

          {/* Modal Header Bar: Solution info + Navigation & Close */}
          <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-sky-300/25 relative z-10 shrink-0 bg-[#07142B]/50 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-black font-mono px-2.5 py-1 rounded bg-[#FFC911] text-[#07142B] shadow-sm">
                #{solution.number}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Prev Solution Button */}
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-lg bg-[#07142B]/80 hover:bg-[#0C43A3] text-sky-200 hover:text-white flex items-center justify-center border border-sky-300/30 transition cursor-pointer"
                title={`Previous: #${prevSolution.number} ${prevSolution.title}`}
                aria-label="Previous Solution"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Next Solution Button */}
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-lg bg-[#07142B]/80 hover:bg-[#0C43A3] text-sky-200 hover:text-white flex items-center justify-center border border-sky-300/30 transition cursor-pointer"
                title={`Next: #${nextSolution.number} ${nextSolution.title}`}
                aria-label="Next Solution"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-8 h-8 ml-1 rounded-lg bg-[#07142B]/80 hover:bg-red-500/80 text-sky-200 hover:text-white flex items-center justify-center border border-sky-300/30 transition cursor-pointer"
                title="Close Modal"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto px-5 sm:px-8 py-6 space-y-6 relative z-10 flex-1 text-left">
            {/* Visual Photo Header with Zoom & Icon */}
            <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden border border-sky-300/30 shadow-lg shrink-0 bg-slate-900">
              <img
                src={SOLUTION_IMAGES[solution.id]}
                alt={solution.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07142B] via-[#07142B]/40 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFC911]">
                    Solution #{solution.number}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight leading-tight">
                    {solution.title}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-[#0C43A3] text-[#FFC911] border border-sky-300/40 flex items-center justify-center shadow-md shrink-0">
                  <IconComp className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#07142B]/85 border border-sky-300/25 space-y-2 backdrop-blur-md">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFC911]">
                Service Overview:
              </h3>
              <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-body">
                {solution.shortDesc}
              </p>
            </div>

            {/* Category-Specific Framework Details */}
            {solution.category === 'Finance' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#07142B]/85 border border-sky-300/25 space-y-3 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#FFC911] font-bold text-xs uppercase tracking-wider font-mono">
                  <Landmark className="w-4 h-4" />
                  <span>Financial Facility Protocol</span>
                </div>
                <h4 className="text-base font-bold text-white font-heading">
                  Underwriting & Credit Architecture
                </h4>
                <p className="text-xs sm:text-sm text-[#B8C4D9] leading-relaxed">
                  Tailored guidance on capital options, revenue-based terms, and commercial credit building. Connect with institutional lenders and transparent terms without predatory prepayment traps.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-[#0C2A54]/60 border border-sky-300/20">
                    <p className="text-xs font-bold text-white">Corporate Credit</p>
                    <p className="text-[11px] text-sky-200/80 font-mono">Dun & Bradstreet, Experian Commercial</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0C2A54]/60 border border-sky-300/20">
                    <p className="text-xs font-bold text-white">Dedicated Support</p>
                    <p className="text-[11px] text-sky-200/80 font-mono">1-on-1 Assigned Business Coach</p>
                  </div>
                </div>
              </div>
            )}

            {solution.category === 'Growth' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#07142B]/85 border border-sky-300/25 space-y-3 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#FFC911] font-bold text-xs uppercase tracking-wider font-mono">
                  <Target className="w-4 h-4" />
                  <span>Market Acquisition Framework</span>
                </div>
                <h4 className="text-base font-bold text-white font-heading">
                  Brand Identity & Customer Acquisition
                </h4>
                <p className="text-xs sm:text-sm text-[#B8C4D9] leading-relaxed">
                  Design ideas and turn prospects into clients. Full-spectrum marketing combining consumer insights, grassroots activations, digital presence, and promotional branding.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-[#0C2A54]/60 border border-sky-300/20">
                    <p className="text-xs font-bold text-white">Promotional Products</p>
                    <p className="text-[11px] text-sky-200/80 font-mono">High-visibility physical brand placement</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0C2A54]/60 border border-sky-300/20">
                    <p className="text-xs font-bold text-white">Outreach Pipelines</p>
                    <p className="text-[11px] text-sky-200/80 font-mono">Grassroots, mainstream channels & SEO</p>
                  </div>
                </div>
              </div>
            )}

            {solution.category === 'Operations' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#07142B]/85 border border-sky-300/25 space-y-3 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#FFC911] font-bold text-xs uppercase tracking-wider font-mono">
                  <LayoutGrid className="w-4 h-4" />
                  <span>Operations & Systems Modernization</span>
                </div>
                <h4 className="text-base font-bold text-white font-heading">
                  Streamlined Business Management
                </h4>
                <p className="text-xs sm:text-sm text-[#B8C4D9] leading-relaxed">
                  Hands-on operational consulting, streamlining day-to-day workflow, customer service team excellence, and reducing overhead costs during critical scaling phases.
                </p>
              </div>
            )}

            {solution.category === 'Technology' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#07142B]/85 border border-sky-300/25 space-y-3 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#FFC911] font-bold text-xs uppercase tracking-wider font-mono">
                  <Server className="w-4 h-4" />
                  <span>Cost-Efficient Tech Integration</span>
                </div>
                <h4 className="text-base font-bold text-white font-heading">
                  Modern Small Business Software & Defense
                </h4>
                <p className="text-xs sm:text-sm text-[#B8C4D9] leading-relaxed">
                  We work smartly to connect you with the most cost-efficient technology to improve your business operations so you can experience healthy business growth.
                </p>
                <div className="p-3 rounded-xl bg-[#0C2A54]/60 border border-sky-300/20 text-xs text-blue-100 font-medium">
                  Integrated with <strong className="text-[#FFC911]">B4BAPP</strong> CRM/ERP Portal ($25/mo) for mobile telemetry.
                </div>
              </div>
            )}

            {/* Implementation Deliverables Checklist */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#07142B]/85 border border-sky-300/25 space-y-3 backdrop-blur-md">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFC911]">
                Core Implementation Deliverables:
              </h4>
              <div className="space-y-2 text-xs sm:text-sm text-blue-100/90 font-body">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC911] shrink-0" />
                  <span>30-minute diagnostic review with assigned industry coach</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC911] shrink-0" />
                  <span>Direct phone callback within 1 business hour</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC911] shrink-0" />
                  <span>Custom blueprint tailored to your specific trade sector</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Bar: Primary Action CTA */}
          <div className="px-5 sm:px-8 py-4 border-t border-sky-300/25 bg-[#07142B]/75 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 relative z-10">
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-white font-heading">
                Ready to activate Solution #{solution.number}?
              </p>
              <p className="text-[11px] text-[#B8C4D9]">
                Assigned specialist will call you within 1 business hour.
              </p>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="btn-outline-dark !py-2.5 !px-5 !text-xs cursor-pointer font-bold"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose()
                  onOpenCoachModal(solution)
                }}
                className="btn-gold-dark !py-2.5 !px-6 !text-xs cursor-pointer flex-1 sm:flex-initial"
              >
                <PhoneCall className="w-4 h-4 text-[#07142B] shrink-0" />
                <span className="truncate">{solution.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-[#07142B] shrink-0" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
