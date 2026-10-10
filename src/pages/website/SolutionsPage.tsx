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
  Sparkles,
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
    <div className="min-h-screen bg-[#EEF1EC] text-[#14231E] transition-colors duration-200 font-body">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#14231E]/15 text-xs font-bold text-[#0E7A5A] font-mono">
                <Layers className="w-3.5 h-3.5" />
                <span>{BRAND_IDENTITY.solutionsName}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#14231E] tracking-tight">
                16 Solutions Every Small Business Needs to Thrive
              </h1>
              <p className="text-[#14231E]/75 text-sm sm:text-base leading-relaxed font-body">
                Connect your enterprise to proven operational, financial, marketing, and technological systems designed to ensure healthy, sustainable business growth.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white border border-[#14231E]/15 shadow-xs font-mono">
              <button
                onClick={() => setViewMode('tile')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'tile'
                    ? 'bg-[#0E7A5A] text-white shadow-xs'
                    : 'text-[#14231E]/70 hover:text-[#14231E]'
                }`}
              >
                Tile Wall
              </button>
              <button
                onClick={() => setViewMode('horizontal')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'horizontal'
                    ? 'bg-[#0E7A5A] text-white shadow-xs'
                    : 'text-[#14231E]/70 hover:text-[#14231E]'
                }`}
              >
                Horizontal Showcase
              </button>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#14231E]/15 shadow-xs font-mono">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#06201A] text-[#C8793A] shadow-xs'
                    : 'bg-[#EEF1EC] text-[#14231E] border border-[#14231E]/10 hover:border-[#0E7A5A]'
                }`}
              >
                {cat === 'All' ? 'All 16 Solutions' : `${cat} Group`}
              </button>
            ))}
          </div>

          {/* Instant Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#14231E]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, number, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-[#EEF1EC] border border-[#14231E]/15 text-[#14231E] placeholder-[#14231E]/50 focus:outline-none focus:border-[#0E7A5A] font-body"
            />
          </div>
        </div>

        {/* 16 SOLUTIONS SHOWCASE: White Cards on Soft Stone (#EEF1EC) */}
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
                  className="group relative bg-white border border-[#14231E]/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#0E7A5A] hover:-translate-y-1 hover:shadow-xl transition-all"
                >
                  <div className="space-y-4">
                    {/* Header: Number Badge + Group Tag + Icon */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black font-mono px-2 py-0.5 rounded bg-[#06201A] text-[#C8793A]">
                          #{solution.number}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEF1EC] text-[#0E7A5A] border border-[#14231E]/10 font-mono">
                          {solution.category}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#EEF1EC] text-[#0E7A5A] flex items-center justify-center group-hover:bg-[#0E7A5A] group-hover:text-white transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-extrabold text-[#14231E] group-hover:text-[#0E7A5A] transition-colors leading-snug font-heading">
                      {solution.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-[#14231E]/70 leading-relaxed font-body">
                      {solution.shortDesc}
                    </p>
                  </div>

                  {/* MANDATORY ACTIONS PER CLIENT RULES (BOTH BUTTONS ON EVERY CARD): */}
                  <div className="pt-6 mt-6 border-t border-[#14231E]/10 space-y-2.5">
                    {/* Primary Button On Light: Emerald Fill, White Text */}
                    <button
                      onClick={() => handleOpenCoach(solution)}
                      className="btn-emerald-light w-full group/btn"
                    >
                      <PhoneCall className="w-4 h-4 text-white shrink-0" />
                      <span>{solution.ctaText}</span>
                      <ArrowRight className="w-4 h-4 text-white transition-transform group-hover/btn:translate-x-1 shrink-0" />
                    </button>

                    {/* Secondary Button On Light: 1.5px Outline */}
                    <Link
                      to={`/solutions/${solution.slug}`}
                      className="btn-outline-light w-full group/link"
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
                  className="bg-white border border-[#14231E]/10 rounded-2xl p-5 hover:border-[#0E7A5A] hover:shadow-md transition-all flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-[#EEF1EC] text-[#0E7A5A] flex items-center justify-center shrink-0">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black font-mono px-2 py-0.5 rounded bg-[#06201A] text-[#C8793A]">
                          #{solution.number}
                        </span>
                        <span className="text-xs font-bold text-[#0E7A5A] font-mono">
                          {solution.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-[#14231E] font-heading">
                        {solution.title}
                      </h3>
                      <p className="text-xs text-[#14231E]/70 max-w-3xl font-body">
                        {solution.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex flex-col sm:flex-row items-stretch lg:items-center gap-2.5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#14231E]/10">
                    <button
                      onClick={() => handleOpenCoach(solution)}
                      className="btn-emerald-light group/btn"
                    >
                      <PhoneCall className="w-4 h-4 text-white shrink-0" />
                      <span>{solution.ctaText}</span>
                      <ArrowRight className="w-4 h-4 text-white transition-transform group-hover/btn:translate-x-1" />
                    </button>
                    <Link
                      to={`/solutions/${solution.slug}`}
                      className="btn-outline-light"
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
          <div className="p-12 text-center text-[#14231E]/60 text-sm rounded-2xl bg-white border border-[#14231E]/10 font-mono">
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
