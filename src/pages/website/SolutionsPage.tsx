import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
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
  Search,
  ArrowRight,
  PhoneCall,
  Layers,
  ChevronRight,
} from 'lucide-react'
import '@/components/website/corporateTheme.css'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { CoachRequestModal } from '@/components/forms/CoachRequestModal'
import { CLIENT_16_SOLUTIONS, BRAND_IDENTITY, SolutionItem } from '@/content/clientContent'

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

export const SolutionsPage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [coachModalOpen, setCoachModalOpen] = useState(false)
  const [selectedSolutionForCoach, setSelectedSolutionForCoach] = useState<SolutionItem | null>(null)
  const [viewMode, setViewMode] = useState<'tile' | 'horizontal'>('tile')

  const categories = ['All', 'Finance', 'Growth', 'Operations', 'Technology']

  const filteredSolutions = CLIENT_16_SOLUTIONS.filter((sol) => {
    if (selectedCategory !== 'All' && sol.category !== selectedCategory) return false
    if (
      searchQuery &&
      !sol.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !sol.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !sol.number.includes(searchQuery)
    ) {
      return false
    }
    return true
  })

  const handleOpenCoach = (solution: SolutionItem) => {
    setSelectedSolutionForCoach(solution)
    setCoachModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#07142B] text-white transition-colors duration-200 font-body">
      <SEOHead
        title="16 Solutions Every Small Business Needs To Thrive | B4B America"
        description="Explore the B4B Business Solutions Network: 16 vital solutions for American small businesses, from accepting payments and business credit to funding, software, and dedicated coaching."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
        {/* Top Breadcrumb & Header */}
        <div className="space-y-4">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: '16 Solutions' }]} />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-300/40 text-xs font-bold text-[#F8C61A] font-mono shadow-sm">
                <Layers className="w-3.5 h-3.5" />
                <span>{BRAND_IDENTITY.solutionsName}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
                16 Solutions Every Small Business Needs to Thrive
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed font-body">
                Connect your enterprise to proven operational, financial, marketing, and technological systems designed to ensure healthy, sustainable business growth.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#0B2C68]/60 border border-sky-300/40 shadow-xs font-mono backdrop-blur-md">
              <button
                onClick={() => setViewMode('tile')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[36px] ${
                  viewMode === 'tile'
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs border border-sky-200/50'
                    : 'text-blue-200/80 hover:text-white'
                }`}
              >
                Tile Wall
              </button>
              <button
                onClick={() => setViewMode('horizontal')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[36px] ${
                  viewMode === 'horizontal'
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs border border-sky-200/50'
                    : 'text-blue-200/80 hover:text-white'
                }`}
              >
                Horizontal Showcase
              </button>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-sky-500/15 via-[#0C2A54]/60 to-blue-600/15 border border-sky-300/40 shadow-md backdrop-blur-xl font-mono">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md border border-sky-200/50'
                    : 'bg-sky-500/15 text-blue-100 hover:text-white hover:bg-sky-500/30 border border-sky-300/30'
                }`}
              >
                {cat === 'All' ? 'All 16 Solutions' : `${cat} Group`}
              </button>
            ))}
          </div>

          {/* Instant Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, number, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#07142B]/90 border border-sky-300/40 text-white placeholder-blue-200/50 focus:outline-none focus:border-sky-300 font-body min-h-[44px]"
            />
          </div>
        </div>

        {/* 16 SOLUTIONS SHOWCASE: Halka Blue Frosted Glass Cards matching Landing Page */}
        {viewMode === 'tile' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSolutions.map((solution, idx) => {
              const IconComp = iconMap[solution.iconName] || Layers
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (idx % 4) * 0.05 }}
                  className="group relative bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 hover:from-[#134485]/95 hover:to-[#0D2E5E]/95 backdrop-blur-xl border border-sky-300/40 hover:border-sky-200/90 shadow-[0_10px_28px_rgba(4,22,54,0.45)] hover:shadow-[0_16px_40px_rgba(14,165,233,0.3)] rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all text-white"
                >
                  <div className="space-y-4">
                    {/* Header: Number Badge + Group Tag + Icon */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black font-mono px-2 py-0.5 rounded bg-[#07142B]/90 text-[#F8C61A] border border-sky-300/40 shadow-xs">
                          #{solution.number}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/25 text-white border border-sky-300/30 font-mono">
                          {solution.category}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-sky-500/30 border border-sky-200/40 text-sky-100 flex items-center justify-center group-hover:bg-[#F8C61A] group-hover:text-[#07142B] transition-colors shadow-xs">
                        <IconComp className="w-5 h-5 stroke-[2.2]" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-extrabold text-white group-hover:text-[#F8C61A] transition-colors leading-snug font-heading">
                      {solution.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-blue-100/80 leading-relaxed font-body">
                      {solution.shortDesc}
                    </p>
                  </div>

                  {/* MANDATORY ACTIONS PER CLIENT RULES (BOTH BUTTONS ON EVERY CARD): */}
                  <div className="pt-6 mt-6 border-t border-sky-300/20 space-y-2.5">
                    {/* Primary Button: Logo Blue Fill, White Text */}
                    <button
                      onClick={() => handleOpenCoach(solution)}
                      className="solution-btn-primary w-full group/btn"
                    >
                      <PhoneCall className="w-4 h-4 text-white shrink-0" />
                      <span className="truncate">{solution.ctaText}</span>
                      <ArrowRight className="w-4 h-4 text-white transition-transform group-hover/btn:translate-x-1 shrink-0" />
                    </button>

                    {/* Secondary Button: Outline Link */}
                    <Link
                      to={`/solutions/${solution.slug}`}
                      className="solution-link-secondary w-full group/link"
                    >
                      <span>Click Here</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSolutions.map((solution, idx) => {
              const IconComp = iconMap[solution.iconName] || Layers
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: (idx % 6) * 0.04 }}
                  className="bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 hover:from-[#134485]/95 hover:to-[#0D2E5E]/95 backdrop-blur-xl border border-sky-300/40 hover:border-sky-200/90 shadow-[0_10px_28px_rgba(4,22,54,0.45)] hover:shadow-[0_16px_40px_rgba(14,165,233,0.3)] rounded-2xl p-5 transition-all flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 text-white"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/30 border border-sky-200/40 text-sky-100 flex items-center justify-center shrink-0">
                      <IconComp className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black font-mono px-2 py-0.5 rounded bg-[#07142B]/90 text-[#F8C61A] border border-sky-300/40">
                          #{solution.number}
                        </span>
                        <span className="text-xs font-bold text-sky-300 font-mono">
                          {solution.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-white font-heading">
                        {solution.title}
                      </h3>
                      <p className="text-xs text-blue-100/80 max-w-3xl font-body">
                        {solution.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex flex-col sm:flex-row items-stretch lg:items-center gap-2.5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-sky-300/20">
                    <button
                      onClick={() => handleOpenCoach(solution)}
                      className="solution-btn-primary group/btn"
                    >
                      <PhoneCall className="w-4 h-4 text-white shrink-0" />
                      <span>{solution.ctaText}</span>
                      <ArrowRight className="w-4 h-4 text-white transition-transform group-hover/btn:translate-x-1" />
                    </button>
                    <Link
                      to={`/solutions/${solution.slug}`}
                      className="solution-link-secondary"
                    >
                      <span>Click Here</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {filteredSolutions.length === 0 && (
          <div className="p-12 text-center text-blue-200/70 text-sm rounded-2xl bg-gradient-to-b from-[#0F356B]/60 to-[#081F42]/80 border border-sky-300/30 font-mono">
            No solutions found matching "{searchQuery}" in category "{selectedCategory}".
          </div>
        )}
      </div>

      {/* Global Coach Lead Modal */}
      <CoachRequestModal
        isOpen={coachModalOpen}
        onClose={() => {
          setCoachModalOpen(false)
          setSelectedSolutionForCoach(null)
        }}
        initialNote={
          selectedSolutionForCoach
            ? `Interested in Solution #${selectedSolutionForCoach.number}: ${selectedSolutionForCoach.title}.`
            : undefined
        }
      />
    </div>
  )
}
