import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  Building2,
  Compass,
  Check,
  Activity,
  Play,
  Pause,
  Cpu,
  Layers,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  UtensilsCrossed,
  Sparkles,
  HardHat,
  Search,
  X,
} from 'lucide-react'
import '@/components/website/corporateTheme.css'
import { SearchModal } from '@/components/website/SearchModal'
import { SolutionDetailModal } from '@/components/website/SolutionDetailModal'
import { CoachRequestModal, CoachLeadForm } from '@/components/forms/CoachRequestModal'
import { SEOHead } from '@/components/seo/SEOHead'
import {
  CLIENT_16_SOLUTIONS,
  BRAND_IDENTITY,
  B4BAPP_SOFTWARE,
  TERRITORY_DIVISIONS,
  SolutionItem,
} from '@/content/clientContent'
import heroBgImg from '@/content/images/hero-widescreen-bg.jpg'
import softwareBackdropImg from '@/content/images/software-backdrop.jpg'
import industryTruckImg from '@/content/images/industry-truck.webp'
import industryRestaurantImg from '@/content/images/industry-restaurant.jpg'
import industrySalonImg from '@/content/images/industry-salon.jpg'
import industryConstructionImg from '@/content/images/industry-construction.jpg'
import solutionsBackdropImg from '@/content/images/solutions-backdrop.jpg'
import industriesBackdropImg from '@/content/images/industries-backdrop.jpg'
import advisoryBackdropImg from '@/content/images/advisory-backdrop.jpg'
import { SOLUTION_IMAGES } from '@/content/solutionImages'

interface FeaturedIndustryItem {
  id: string
  name: string
  image: string
  icon?: React.ElementType | null
}

const FEATURED_INDUSTRIES: FeaturedIndustryItem[] = [
  {
    id: 'ind-truck',
    name: 'Freight Trucking & Transportation',
    image: industryTruckImg,
    icon: null,
  },
  {
    id: 'ind-restaurant',
    name: 'Restaurants, Snack Bars, Sports Bars & Lounges',
    image: industryRestaurantImg,
    icon: UtensilsCrossed,
  },
  {
    id: 'ind-salon',
    name: 'Beauty Salons',
    image: industrySalonImg,
    icon: Sparkles,
  },
  {
    id: 'ind-construction',
    name: 'Construction & Residential Remodelers',
    image: industryConstructionImg,
    icon: HardHat,
  },
]

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

const TELEMETRY_TICKER = [
  '16 Core Solutions Active',
  '12 Federal Reserve Divisions Live',
  '100% Verified Network Readiness',
  '1-on-1 Dedicated Coach Support',
  '32 Trade & Commerce Sectors',
  'B4BAPP Enterprise CRM/ERP Ready',
  'Coast-to-Coast Pre-Qualification in 3 Mins',
]

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const [coachModalOpen, setCoachModalOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null)
  const [selectedSolutionForCoach, setSelectedSolutionForCoach] = useState<SolutionItem | null>(null)
  const [activeDivisionIndex, setActiveDivisionIndex] = useState<number>(1) // Default Div #2 (NY & Atlantic)
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true)
  const [activeIndustryFilter, setActiveIndustryFilter] = useState<string>('')

  // 16 Solutions Display Controls
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel')
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true)
  const sliderRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef<boolean>(false)
  const scrollPosRef = useRef<number>(0)
  const isHoveringCardRef = useRef<boolean>(false)

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

  // Infinite seamless repetition for smooth continuous sliding
  const repeatCount = Math.max(3, Math.ceil(12 / Math.max(1, filteredSolutions.length)))
  const displaySolutions = Array(repeatCount).fill(filteredSolutions).flat()

  // URL search param listener for direct solution links (?solution=slug)
  useEffect(() => {
    const solSlug = searchParams.get('solution')
    if (solSlug) {
      const el = document.getElementById('solutions-showcase')
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    }
  }, [searchParams])

  // URL hash listener for smooth scroll (#solutions-showcase)
  useEffect(() => {
    if (
      location.hash === '#solutions-showcase' ||
      location.hash === '#solutions' ||
      location.hash === '#solutions-grid'
    ) {
      const el = document.getElementById('solutions-showcase')
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 150)
      }
    }
  }, [location.hash])

  // Auto-cycle through the 12 Federal Reserve Territory Divisions every 4 seconds
  useEffect(() => {
    if (!isAutoCycling) return
    const interval = setInterval(() => {
      setActiveDivisionIndex((prev) => (prev + 1) % TERRITORY_DIVISIONS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoCycling])

  // Continuous Silky-Smooth Automated Sliding (Active 60fps rAF Engine)
  useEffect(() => {
    const track = sliderRef.current
    if (!track || viewMode !== 'carousel' || !isAutoPlay) return

    let animId: number
    const baseSpeed = 1.15 // Silky smooth continuous glide speed

    const step = () => {
      if (!isDraggingRef.current && track) {
        // When user hovers on a card, slow down to 0.35x speed so card can be clicked easily without stopping motion
        const speed = isHoveringCardRef.current ? 0.35 : baseSpeed
        scrollPosRef.current += speed

        const singleCycleWidth = track.scrollWidth / repeatCount
        if (singleCycleWidth > 0 && scrollPosRef.current >= singleCycleWidth) {
          scrollPosRef.current -= singleCycleWidth
        }

        track.scrollLeft = scrollPosRef.current
      } else if (track) {
        scrollPosRef.current = track.scrollLeft
      }

      animId = requestAnimationFrame(step)
    }

    animId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animId)
  }, [viewMode, isAutoPlay, filteredSolutions.length, repeatCount])

  // Reset scroll on filter or search change
  useEffect(() => {
    if (sliderRef.current) {
      scrollPosRef.current = 0
      sliderRef.current.scrollLeft = 0
    }
  }, [selectedCategory, searchQuery])

  // Manual Previous & Next buttons (smoothly advance forward/backward by 1 card)
  const slideNext = useCallback(() => {
    const track = sliderRef.current
    if (!track) return
    const cardStep = 370 + 24
    scrollPosRef.current += cardStep
    const singleCycleWidth = track.scrollWidth / repeatCount
    if (singleCycleWidth > 0 && scrollPosRef.current >= singleCycleWidth) {
      scrollPosRef.current -= singleCycleWidth
    }
    track.scrollTo({ left: scrollPosRef.current, behavior: 'smooth' })
  }, [repeatCount])

  const slidePrev = useCallback(() => {
    const track = sliderRef.current
    if (!track) return
    const cardStep = 370 + 24
    scrollPosRef.current -= cardStep
    const singleCycleWidth = track.scrollWidth / repeatCount
    if (singleCycleWidth > 0 && scrollPosRef.current < 0) {
      scrollPosRef.current += singleCycleWidth
    }
    track.scrollTo({ left: scrollPosRef.current, behavior: 'smooth' })
  }, [repeatCount])

  // Reusable Solution Card renderer with high-fidelity role photography
  const renderSolutionCard = (
    solution: SolutionItem,
    isCarouselItem: boolean = false,
    keyOverride?: string
  ) => {
    const IconComp = iconMap[solution.iconName] || Layers
    const solutionImg = SOLUTION_IMAGES[solution.id]

    return (
      <Link
        key={keyOverride || solution.id}
        to={`/solutions/${solution.slug}`}
        onClick={() => {
          window.scrollTo(0, 0)
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
        }}
        onMouseEnter={() => {
          isHoveringCardRef.current = true
        }}
        onMouseLeave={() => {
          isHoveringCardRef.current = false
        }}
        className={`group relative flex flex-col justify-between rounded-2xl overflow-hidden bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 hover:from-[#134485]/95 hover:to-[#0D2E5E]/95 backdrop-blur-xl border border-sky-300/40 hover:border-sky-200/90 shadow-[0_10px_28px_rgba(4,22,54,0.45)] hover:shadow-[0_16px_40px_rgba(14,165,233,0.3)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer text-white text-left ${
          isCarouselItem
            ? 'shrink-0 w-[290px] sm:w-[330px] lg:w-[360px] min-h-[440px]'
            : 'w-full min-h-[440px]'
        }`}
      >
        {/* Visual Role Image Header */}
        <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#06142E] shrink-0">
          {solutionImg ? (
            <img
              src={solutionImg}
              alt={`${solution.title} - B4B America commercial business solution`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out pointer-events-none"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#013CA0] to-[#07142B] flex items-center justify-center">
              <IconComp className="w-12 h-12 text-sky-400/50" />
            </div>
          )}

          {/* Ambient Gradient Overlays for high text contrast and seamless integration */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C2A54] via-transparent to-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-sky-950/20 group-hover:bg-transparent transition-colors pointer-events-none" />

          {/* Top Badges: Category Pill & Solution Number Badge */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-white bg-sky-500/35 backdrop-blur-md px-2.5 py-1 rounded-full border border-sky-200/40 shadow-xs">
              {solution.category}
            </span>
            <span className="text-[11px] font-mono font-black text-white bg-[#013CA0] group-hover:bg-[#F8C61A] group-hover:text-[#07142B] backdrop-blur-md px-2.5 py-1 rounded-full border border-sky-300/40 shadow-xs transition-colors">
              {solution.number}
            </span>
          </div>

          {/* Floating Glowing Role Icon at Bottom-Right of Image */}
          <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-sky-500/30 backdrop-blur-md text-sky-100 shadow-md border border-sky-200/50 flex items-center justify-center group-hover:bg-[#F8C61A] group-hover:text-[#07142B] group-hover:scale-110 transition-all duration-300">
            <IconComp className="w-5 h-5 stroke-[2.2]" />
          </div>
        </div>

        {/* Card Content & Action Buttons */}
        <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-extrabold text-white font-heading group-hover:text-[#F8C61A] transition-colors line-clamp-2 leading-snug min-h-[48px] flex items-center">
              {solution.title}
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/80 font-body leading-relaxed line-clamp-3 min-h-[58px]">
              {solution.shortDesc}
            </p>
          </div>

          {/* Action Buttons Row */}
          <div className="pt-4 border-t border-sky-300/20 space-y-2.5">
            {/* Primary Button: Speak with a Business Coach / Advisor */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setSelectedSolutionForCoach(solution)
                setCoachModalOpen(true)
              }}
              className="solution-btn-primary w-full group/btn cursor-pointer !min-h-[44px] !py-2.5"
            >
              <PhoneCall className="w-4 h-4 text-white shrink-0" />
              <span className="truncate">{solution.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-white transition-transform group-hover/btn:translate-x-1 shrink-0" />
            </button>

            {/* Secondary Visual Link: Click Here */}
            <div className="solution-link-secondary w-full group/link !py-1 text-xs flex items-center justify-center cursor-pointer">
              <span>Click Here</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Selected territory details
  const selectedTerritory =
    TERRITORY_DIVISIONS[activeDivisionIndex] ||
    TERRITORY_DIVISIONS[0]

  return (
    <div className="min-h-screen bg-[#07142B] text-white transition-colors duration-200 overflow-x-hidden font-body">
      <SEOHead
        title="B4B America | The Connection for Small Business Solutions"
        description="The Connection for Small Business Solutions. 16 vital solutions for American small businesses: business credit repair, funding lines, merchant payments, custom software, and 1-on-1 coaching across 12 territory divisions."
      />

      {/* =========================================================================
          SECTION 1. HERO (CRISP LUMINOUS BLUE WITH CLEAN BORDER)
          ========================================================================= */}
      <section className="relative py-20 text-white border-b border-sky-400/25 overflow-hidden">
        {/* Background Photo Layer */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src={heroBgImg}
            alt="B4B America commercial business commerce operations"
            loading="eager"
            decoding="sync"
            className="w-full h-full object-cover object-center"
          />
          {/* Luminous clean blue overlay */}
          <div className="absolute inset-0 bg-[#0A2A5E]/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08204D]/85 via-[#0B2C68]/50 to-[#08204D]/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07142B] opacity-80" />
        </div>

        {/* Ambient lighting accent */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/25 rounded-full blur-3xl pointer-events-none z-[1]" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Asymmetric Corporate Typography */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Top Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-300/40 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F8C61A] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#F8C61A] font-mono">
                  NATIONAL SMALL BUSINESS OPERATING NETWORK
                </span>
              </div>

              {/* Tagline as Main Headline */}
              <div className="space-y-3">
                <h1 className="text-[28px] lg:text-[36px] font-extrabold font-heading text-white leading-tight tracking-tight">
                  {BRAND_IDENTITY.tagline.split('Small Business')[0]}
                  <span className="text-[#F8C61A]">
                    Small Business
                  </span>{' '}
                  Solutions.
                </h1>

                <p className="text-lg sm:text-xl font-bold text-[#B8C4D9] font-heading">
                  {BRAND_IDENTITY.subTagline}
                </p>
              </div>

              {/* Client Mission Statement Excerpt */}
              <p className="text-base sm:text-lg text-[#B8C4D9] max-w-xl leading-relaxed font-normal">
                {BRAND_IDENTITY.missionShort}
              </p>

              {/* TWO MANDATORY CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => setCoachModalOpen(true)}
                  className="btn-gold-dark group"
                >
                  <PhoneCall className="w-4 h-4 text-[#07142B] shrink-0" />
                  <span>Speak with a Business Coach</span>
                  <ArrowRight className="w-4 h-4 text-[#07142B] transition-transform group-hover:translate-x-1 shrink-0" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('solutions-showcase')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="btn-outline-dark group"
                >
                  <Layers className="w-4 h-4 text-[#F8C61A] shrink-0" />
                  <span>Explore 16 Solutions</span>
                  <ArrowRight className="w-4 h-4 text-white/70 transition-transform group-hover:translate-x-1 shrink-0" />
                </button>
              </div>

              {/* Fact Indicators with Big Gold Numbers */}
              <div className="pt-6 border-t border-sky-300/25 grid grid-cols-3 gap-3.5 max-w-xl text-left font-mono">
                <div className="p-3 rounded-xl bg-sky-500/20 border border-sky-300/35 backdrop-blur-md space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#F8C61A] tabular-nums">16</p>
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                  </div>
                  <p className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">Core Solutions</p>
                  <p className="text-[10px] sm:text-[11px] text-blue-100 font-sans">Payments to software</p>
                </div>
                <div className="p-3 rounded-xl bg-sky-500/20 border border-sky-300/35 backdrop-blur-md space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#F8C61A] tabular-nums">12</p>
                    <span className="w-2 h-2 rounded-full bg-[#F8C61A]" />
                  </div>
                  <p className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">Fed Divisions</p>
                  <p className="text-[10px] sm:text-[11px] text-blue-100 font-sans">Coast-to-coast coverage</p>
                </div>
                <div className="p-3 rounded-xl bg-sky-500/20 border border-sky-300/35 backdrop-blur-md space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#F8C61A] tabular-nums">32</p>
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                  </div>
                  <p className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">Trade Sectors</p>
                  <p className="text-[10px] sm:text-[11px] text-blue-100 font-sans">Trades & commerce</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Compact Auto-Cycling & Auto-Scrolling Telemetry Widget */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 shrink-0"
            >
              <div
                onMouseEnter={() => setIsAutoCycling(false)}
                onMouseLeave={() => setIsAutoCycling(true)}
                className="relative bg-gradient-to-br from-sky-600/25 via-[#1658B3]/30 to-sky-700/25 text-white rounded-3xl p-4 sm:p-5 shadow-[0_16px_48px_rgba(2,132,199,0.25)] border border-sky-300/40 overflow-hidden w-full backdrop-blur-2xl transition-all"
              >
                <div className="absolute top-0 right-0 w-56 h-56 bg-[#013CA0]/25 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#FFC911]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-3.5">
                  {/* Card Header Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFC911] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFC911]" />
                      </span>
                      <span className="font-mono text-xs font-black uppercase tracking-wider text-[#FFC911]">
                        Live Executive Telemetry
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-[#07142B] text-[#B8C4D9] border border-white/10 font-bold">
                        Div {selectedTerritory.regionNumber} of 12
                      </span>
                      <button
                        onClick={() =>
                          setActiveDivisionIndex((prev) =>
                            prev === 0 ? TERRITORY_DIVISIONS.length - 1 : prev - 1
                          )
                        }
                        className="w-6 h-6 rounded-md bg-[#07142B] hover:bg-[#013CA0] text-[#B8C4D9] hover:text-white flex items-center justify-center transition border border-white/10 cursor-pointer"
                        title="Previous Division"
                        aria-label="Previous Division"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() =>
                          setActiveDivisionIndex((prev) => (prev + 1) % TERRITORY_DIVISIONS.length)
                        }
                        className="w-6 h-6 rounded-md bg-[#07142B] hover:bg-[#013CA0] text-[#B8C4D9] hover:text-white flex items-center justify-center transition border border-white/10 cursor-pointer"
                        title="Next Division"
                        aria-label="Next Division"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 3 Top KPIs Strip */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-xl bg-[#07142B]/90 border border-white/5 space-y-0.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#B8C4D9] block">Readiness</span>
                      <p className="text-base sm:text-lg font-black font-mono text-white">100%</p>
                      <span className="text-[10px] font-bold text-emerald-400 font-mono block">Verified</span>
                    </div>
                    <div className="p-2 rounded-xl bg-[#07142B]/90 border border-white/5 space-y-0.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#B8C4D9] block">Solutions</span>
                      <p className="text-base sm:text-lg font-black font-mono text-[#FFC911]">16</p>
                      <span className="text-[10px] font-bold text-[#FFC911] font-mono block">Active Suite</span>
                    </div>
                    <div className="p-2 rounded-xl bg-[#07142B]/90 border border-white/5 space-y-0.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#B8C4D9] block">Support</span>
                      <p className="text-base sm:text-lg font-black font-mono text-white">1-on-1</p>
                      <span className="text-[10px] font-bold text-blue-300 font-mono block">Dedicated</span>
                    </div>
                  </div>

                  {/* Auto-Cycling Division Showcase Box */}
                  <div className="relative rounded-xl bg-[#07142B]/90 border border-white/10 p-3.5 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedTerritory.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded-full bg-[#013CA0] text-white tracking-wider inline-block">
                              Federal Reserve Div #{selectedTerritory.regionNumber}
                            </span>
                            <h3 className="text-sm sm:text-base font-extrabold text-white mt-1 leading-snug">
                              {selectedTerritory.name}
                            </h3>
                          </div>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#0D2147] text-[#FFC911] border border-[#FFC911]/30 font-bold shrink-0">
                            HQ: {selectedTerritory.headOffice}
                          </span>
                        </div>

                        <p className="text-xs text-[#B8C4D9] leading-relaxed line-clamp-2">
                          <strong className="text-white">States Covered: </strong>
                          <span>{selectedTerritory.coverage}</span>
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Auto-cycle Progress Line */}
                    <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between gap-3">
                      <div className="flex-1 bg-white/10 h-1 rounded-full overflow-hidden">
                        {isAutoCycling && (
                          <motion.div
                            key={activeDivisionIndex}
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 4, ease: 'linear' }}
                            className="h-full bg-gradient-to-r from-[#013CA0] to-[#FFC911]"
                          />
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-[#B8C4D9]/70 shrink-0">
                        {isAutoCycling ? 'Auto-cycling (4s)' : 'Paused (hover)'}
                      </span>
                    </div>
                  </div>

                  {/* 12 Mini Division Quick Selector Bars */}
                  <div className="flex items-center justify-between gap-1 px-0.5">
                    {TERRITORY_DIVISIONS.map((terr, idx) => (
                      <button
                        key={terr.id}
                        onClick={() => setActiveDivisionIndex(idx)}
                        className={`h-1.5 flex-1 rounded-full transition-all cursor-pointer ${
                          activeDivisionIndex === idx
                            ? 'bg-[#FFC911] shadow-xs scale-y-125'
                            : 'bg-white/15 hover:bg-white/40'
                        }`}
                        title={`Div ${terr.regionNumber}: ${terr.name}`}
                        aria-label={`Jump to Division ${terr.regionNumber}`}
                      />
                    ))}
                  </div>

                  {/* Connect with Division Coach CTA */}
                  <button
                    onClick={() => setCoachModalOpen(true)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FFC911] to-[#FFBD0A] hover:brightness-105 active:scale-[0.99] text-[#07142B] font-bold text-xs flex items-center justify-between transition shadow-md group cursor-pointer"
                  >
                    <span className="flex items-center gap-2 font-mono">
                      <PhoneCall className="w-3.5 h-3.5 text-[#07142B]" />
                      <span>Connect with Div #{selectedTerritory.regionNumber} Coach</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Auto-scrolling Continuous Live Ticker Marquee */}
                  <div className="overflow-hidden relative w-full py-1.5 bg-[#07142B]/80 rounded-lg border border-white/5">
                    <motion.div
                      className="flex items-center gap-6 whitespace-nowrap text-[11px] font-mono font-medium text-[#B8C4D9]"
                      animate={{ x: ['0%', '-50%'] }}
                      transition={{ repeat: Infinity, ease: 'linear', duration: 22 }}
                    >
                      {[...TELEMETRY_TICKER, ...TELEMETRY_TICKER].map((item, i) => (
                        <span key={i} className="flex items-center gap-2 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC911]" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2. 16 SOLUTIONS (RESPONSIVE TILE WALL & SLIDING CAROUSEL WITH 3D BACKDROP)
          ========================================================================= */}
      <section id="solutions-showcase" className="py-20 text-white relative border-b border-sky-400/25 overflow-hidden">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src={solutionsBackdropImg}
            alt="B4B Solutions 3D technology ecosystem backdrop"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center scale-100"
          />
          <div className="absolute inset-0 bg-[#0A2A5E]/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08204D]/85 via-[#0B2C68]/55 to-[#08204D]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07142B] via-transparent to-[#07142B] opacity-75" />
        </div>

        {/* Ambient lighting accent */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none z-[1]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl pointer-events-none z-[1]" />

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header + View Mode Switcher */}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-8 text-center md:text-left">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-300/40 shadow-sm text-xs font-bold text-[#F8C61A] font-mono">
                <Layers className="w-3.5 h-3.5 text-[#F8C61A]" />
                <span>THE B4B BUSINESS SOLUTIONS NETWORK</span>
              </div>

              <h2 className="text-[28px] lg:text-[40px] font-extrabold font-heading text-white tracking-tight leading-tight">
                16 Solutions Every Small Business Needs to Thrive
              </h2>

              <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-body">
                Connect your enterprise to proven operational, financial, marketing, and technological systems designed to ensure healthy, sustainable business growth.
              </p>
            </div>

            {/* View Mode Switcher: Sliding Carousel / Grid View */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#0B2C68]/70 border border-sky-300/40 shadow-md font-mono backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setViewMode('carousel')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 min-h-[38px] ${
                    viewMode === 'carousel'
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md border border-sky-200/50'
                      : 'text-blue-200/80 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Sliding Carousel</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 min-h-[38px] ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md border border-sky-200/50'
                      : 'text-blue-200/80 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Grid View (All 16)</span>
                </button>
              </div>

              {/* Header Navigation Controls (when in carousel view) */}
              {viewMode === 'carousel' && (
                <div className="hidden sm:flex items-center gap-1.5 font-mono">
                  <button
                    type="button"
                    onClick={slidePrev}
                    aria-label="Previous solution card"
                    className="w-10 h-10 rounded-xl bg-[#0B2C68]/70 hover:bg-[#013CA0] border border-sky-300/40 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                    title="Previous Solution"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={slideNext}
                    aria-label="Next solution card"
                    className="w-10 h-10 rounded-xl bg-[#0B2C68]/70 hover:bg-[#013CA0] border border-sky-300/40 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                    title="Next Solution"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-sky-500/15 via-[#0C2A54]/70 to-blue-600/15 border border-sky-300/40 shadow-lg backdrop-blur-xl font-mono mb-8">
            {/* Category Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[40px] ${
                    selectedCategory === cat
                      ? 'bg-[#013CA0] text-white shadow-md border border-sky-300/60'
                      : 'bg-white/10 text-blue-100 border border-white/15 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {cat === 'All' ? 'All 16 Solutions' : `${cat} Group`}
                </button>
              ))}
            </div>

            {/* Instant Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-sky-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by title, number, keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl text-xs sm:text-sm bg-[#07142B]/90 border border-sky-300/40 text-white placeholder-blue-200/50 focus:outline-none focus:border-sky-300 font-body min-h-[40px]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* VIEW MODE 1: SLIDING CAROUSEL (Continuous Silky-Smooth Automated Slider) */}
          {viewMode === 'carousel' && (
            <div className="relative">
              {/* Slider Status & Quick Navigation Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 px-1">
                {/* Auto-sliding indicator & Play/Pause */}
                <div className="flex items-center gap-3 text-xs font-mono text-sky-200">
                  <button
                    type="button"
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/35 border border-sky-300/40 text-white transition shadow-sm cursor-pointer"
                    title={isAutoPlay ? 'Pause automated sliding' : 'Resume automated sliding'}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isAutoPlay ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                      }`}
                    />
                    {isAutoPlay ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-[#F8C61A]" />
                        <span className="font-bold">Automated Sliding: ACTIVE</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-[#F8C61A]" />
                        <span className="font-bold">Automated Sliding: PAUSED</span>
                      </>
                    )}
                  </button>

                  <span className="text-[11px] text-blue-200/70 hidden sm:inline">
                    • Continuous automated motion • Hover card to slow down • Drag or click arrows
                  </span>
                </div>

                {/* Mobile/Tablet Arrow Controls & Solution Count */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-sky-200 bg-[#0C2A54]/80 px-2.5 py-1.5 rounded-lg border border-sky-300/30">
                    <strong className="text-[#F8C61A]">{filteredSolutions.length}</strong> Solutions Active
                  </span>

                  <div className="flex sm:hidden items-center gap-1.5">
                    <button
                      type="button"
                      onClick={slidePrev}
                      aria-label="Previous card"
                      className="w-8 h-8 rounded-lg bg-[#0B2C68]/80 hover:bg-[#013CA0] border border-sky-300/40 text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={slideNext}
                      aria-label="Next card"
                      className="w-8 h-8 rounded-lg bg-[#0B2C68]/80 hover:bg-[#013CA0] border border-sky-300/40 text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Relative Track Wrapper with Floating Side Buttons */}
              <div className="relative group/track">
                {/* Floating Left Arrow (Desktop) */}
                <button
                  type="button"
                  onClick={slidePrev}
                  aria-label="Previous solution card"
                  className="hidden md:flex absolute -left-4 lg:-left-6 top-24 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#07142B]/95 hover:bg-[#013CA0] border border-sky-300/50 hover:border-sky-200 text-white items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                {/* Floating Right Arrow (Desktop) */}
                <button
                  type="button"
                  onClick={slideNext}
                  aria-label="Next solution card"
                  className="hidden md:flex absolute -right-4 lg:-right-6 top-24 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#07142B]/95 hover:bg-[#013CA0] border border-sky-300/50 hover:border-sky-200 text-white items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Continuous Automated Sliding Track */}
                <div
                  ref={sliderRef}
                  onMouseDown={() => {
                    isDraggingRef.current = true
                  }}
                  onMouseUp={() => {
                    isDraggingRef.current = false
                    if (sliderRef.current) scrollPosRef.current = sliderRef.current.scrollLeft
                  }}
                  onTouchStart={() => {
                    isDraggingRef.current = true
                  }}
                  onTouchEnd={() => {
                    isDraggingRef.current = false
                    if (sliderRef.current) scrollPosRef.current = sliderRef.current.scrollLeft
                  }}
                  onScroll={() => {
                    if (isDraggingRef.current && sliderRef.current) {
                      scrollPosRef.current = sliderRef.current.scrollLeft
                    }
                  }}
                  className="flex gap-6 overflow-x-auto pb-6 pt-2 px-1 items-stretch select-none cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {displaySolutions.map((solution, idx) =>
                    renderSolutionCard(solution, true, `${solution.id}-${idx}`)
                  )}
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: GRID VIEW (All 16 Cards with Role Images) */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredSolutions.map((solution) => renderSolutionCard(solution, false))}
            </div>
          )}

          {/* =========================================================================
              CENTRAL ACTION ROW BELOW 16 CARDS: ONE "Click Here" AND ONE "Speak with a Business Coach"
              ========================================================================= */}
          <div className="mt-10 pt-8 border-t border-sky-300/20 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* "Click Here" */}
            <Link
              to="/solutions"
              onClick={() => {
                window.scrollTo(0, 0)
                document.documentElement.scrollTop = 0
                document.body.scrollTop = 0
              }}
              className="btn-outline-dark group flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] whitespace-nowrap shrink-0 text-sm font-bold cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#F8C61A] shrink-0" />
              <span className="whitespace-nowrap">Click Here</span>
              <ArrowRight className="w-4 h-4 text-white/70 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>

            {/* "Speak with a Business Coach" (opens the popup form) */}
            <button
              type="button"
              onClick={() => {
                setSelectedSolutionForCoach(null)
                setCoachModalOpen(true)
              }}
              className="btn-gold-dark group flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] whitespace-nowrap shrink-0 text-sm font-bold cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#07142B] shrink-0" />
              <span className="whitespace-nowrap">Speak with a Business Coach</span>
              <ArrowRight className="w-4 h-4 text-[#07142B] transition-transform group-hover:translate-x-1 shrink-0" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3. CRM & ERP SPOTLIGHT: B4BAPP
          ========================================================================= */}
      <section id="software" className="py-24 text-white relative border-b border-sky-400/25 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src={softwareBackdropImg}
            alt="B4BAPP Enterprise CRM and ERP 3D technology dashboard visual"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0A2A5E]/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08204D]/85 via-[#0B2C68]/55 to-[#08204D]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07142B] via-transparent to-[#07142B] opacity-75" />
        </div>

        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/25 rounded-full blur-3xl pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Text Content & Features */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-300/40 shadow-sm">
                <Cpu className="w-3.5 h-3.5 text-[#F8C61A]" />
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#F8C61A] font-mono">
                  {B4BAPP_SOFTWARE.name} • {B4BAPP_SOFTWARE.category}
                </span>
              </div>

              <h2 className="text-[28px] lg:text-[36px] font-extrabold font-heading text-white tracking-tight leading-tight">
                Enterprise CRM & ERP Designed For Small Business Pros
              </h2>

              <p className="text-[16px] text-blue-50 leading-relaxed font-normal">
                {B4BAPP_SOFTWARE.description}
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-gradient-to-r from-sky-500/25 to-blue-600/20 hover:from-sky-500/35 hover:to-blue-600/30 backdrop-blur-xl border border-sky-300/40 hover:border-sky-200/80 shadow-[0_8px_24px_rgba(14,165,233,0.16)] transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md border border-sky-200/50">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[18px] font-extrabold text-white font-heading tracking-tight leading-snug">
                      Automated Job Costing & Invoicing
                    </h4>
                    <p className="text-[15px] text-blue-50 leading-relaxed font-normal">
                      Instant PO management, inventory descriptions for up to 100 service products, and procurement tracking.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-gradient-to-r from-sky-500/25 to-blue-600/20 hover:from-sky-500/35 hover:to-blue-600/30 backdrop-blur-xl border border-sky-300/40 hover:border-[#F8C61A]/80 shadow-[0_8px_24px_rgba(14,165,233,0.16)] transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F8C61A] to-[#F5B800] text-[#07142B] flex items-center justify-center shrink-0 shadow-md font-bold border border-white/40">
                    <Activity className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[18px] font-extrabold text-white font-heading tracking-tight leading-snug">
                      Pipeline & Deal Tracking
                    </h4>
                    <p className="text-[15px] text-blue-50 leading-relaxed font-normal">
                      White-label CRM lead intake, automated communication feeds, and conversion analytics for Biz Pros.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-gradient-to-r from-sky-500/25 to-blue-600/20 hover:from-sky-500/35 hover:to-blue-600/30 backdrop-blur-xl border border-sky-300/40 hover:border-sky-200/80 shadow-[0_8px_24px_rgba(14,165,233,0.16)] transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md border border-sky-200/50">
                    <TrendingUp className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[18px] font-extrabold text-white font-heading tracking-tight leading-snug">
                      Bulletin Sales Scoreboard & Career Ladder
                    </h4>
                    <p className="text-[15px] text-blue-50 leading-relaxed font-normal">
                      Real-time category leaderboards and 9-tier Biz Pro career progression from Account Executive to Senior National VP.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-600/30 via-blue-600/25 to-sky-500/25 backdrop-blur-2xl border border-sky-300/45 shadow-[0_12px_36px_rgba(14,165,233,0.22)] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="space-y-1">
                  <p className="text-[12px] font-extrabold text-[#F8C61A] tracking-wider uppercase font-mono">
                    Biz Pro Access Subscription
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#F8C61A] font-heading tracking-tight">
                      $25
                    </span>
                    <span className="text-[15px] font-bold text-white">
                      / month
                    </span>
                  </div>
                  <p className="text-[14px] text-blue-100/90 leading-relaxed">
                    Entry subscription for Biz Pros, scales with ranking
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => navigate('/portal/login')}
                    className="btn-gold-dark"
                  >
                    Portal Login
                  </button>
                  <button
                    onClick={() => setCoachModalOpen(true)}
                    className="btn-outline-dark"
                  >
                    Request Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Corporate Philosophy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-sky-600/25 via-[#1658B3]/30 to-sky-700/25 backdrop-blur-2xl border border-sky-300/40 p-6 sm:p-8 space-y-6 text-left shadow-[0_16px_48px_rgba(2,132,199,0.25)] relative">
                <div className="flex items-center justify-between border-b border-sky-200/25 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-5 h-5 text-[#F8C61A]" />
                    <h3 className="text-[18px] sm:text-[20px] font-extrabold text-white font-heading tracking-tight">
                      Corporate Philosophy & 5 Foundations
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F8C61A]/15 text-[#F8C61A] border border-[#F8C61A]/30">
                    B4B MANTRA
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-sky-500/15 border border-sky-300/30 backdrop-blur-md space-y-2">
                  <p className="text-[15px] sm:text-[16px] text-white/95 leading-relaxed italic font-body">
                    "{BRAND_IDENTITY.vision}."
                  </p>
                  <p className="text-[14px] text-blue-100">
                    The B4B America Mantra:{' '}
                    <strong className="text-[#F8C61A] font-mono font-bold not-italic">
                      {BRAND_IDENTITY.mantra}
                    </strong>
                  </p>
                </div>

                <div className="space-y-3">
                  {BRAND_IDENTITY.mantraSteps.map((step) => (
                    <div
                      key={step.step}
                      className="p-3.5 sm:p-4 rounded-xl bg-sky-500/20 hover:bg-sky-400/30 border border-sky-200/35 hover:border-[#F8C61A]/70 backdrop-blur-md flex items-center justify-between gap-4 transition-all duration-200 group shadow-xs"
                    >
                      <div className="flex items-start gap-3.5">
                        <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F8C61A]/25 to-[#F8C61A]/10 border border-[#F8C61A]/40 text-[#F8C61A] font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform mt-0.5">
                          {step.step}
                        </span>
                        <div className="space-y-0.5">
                          <p className="text-[16px] font-extrabold text-white font-heading tracking-wide">
                            {step.title}
                          </p>
                          <p className="text-[14px] text-blue-50 leading-relaxed font-normal">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-sky-200 shrink-0 group-hover:text-[#F8C61A] group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-sky-200/25 flex items-center justify-between">
                  <span className="text-[14px] sm:text-[15px] text-blue-100 font-medium">
                    Biz Pro Career Framework:
                  </span>
                  <span className="text-[#F8C61A] font-bold font-mono text-[13px] sm:text-[14px]">
                    9-Tier Ranking Ladder
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4. INDUSTRIES WE SERVE
          ========================================================================= */}
      <section className="py-24 text-white relative border-b border-sky-400/25 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src={industriesBackdropImg}
            alt="B4B Commercial Industries 3D trade logistics and buildings grid"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0A2A5E]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08204D]/80 via-[#0B2C68]/50 to-[#08204D]/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07142B] via-transparent to-[#07142B] opacity-70" />
        </div>

        <div className="absolute top-1/2 left-1/3 w-[650px] h-[650px] bg-sky-400/25 rounded-full blur-3xl pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-300/40 text-xs font-bold text-[#F8C61A] font-mono shadow-sm">
                <Building2 className="w-3.5 h-3.5 text-[#F8C61A]" />
                <span>SECTOR SPECIALIZATION</span>
              </div>
              <h2 className="text-[28px] lg:text-[36px] font-extrabold font-heading text-white tracking-tight leading-tight">
                Industries We Serve
              </h2>
              <p className="text-base text-blue-100/90">
                Tailored solutions for 32 key business trades operating in towns and cities across America.
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs font-bold text-sky-300 font-mono">
                Click any trade to speak with a specialized coach
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_INDUSTRIES.map((ind) => {
              const IconComp = ind.icon
              return (
                <div
                  key={ind.id}
                  onClick={() => {
                    setActiveIndustryFilter(ind.name)
                    setCoachModalOpen(true)
                  }}
                  className="industry-photo-tile group relative rounded-2xl aspect-[4/3] overflow-hidden cursor-pointer bg-gradient-to-r from-sky-500/25 to-blue-600/20 hover:from-sky-500/35 hover:to-blue-600/30 backdrop-blur-xl border border-sky-300/40 hover:border-sky-200/80 shadow-[0_8px_24px_rgba(14,165,233,0.16)] hover:shadow-[0_16px_40px_rgba(14,165,233,0.28)] hover:-translate-y-2 transition-all duration-300"
                >
                  {ind.image ? (
                    <img
                      src={ind.image}
                      alt={ind.name}
                      loading="lazy"
                      className="tile-img"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-sky-600/25 via-[#1658B3]/30 to-sky-700/25 flex items-center justify-center p-6 relative">
                      {IconComp && (
                        <div className="w-16 h-16 rounded-2xl bg-sky-500/20 border border-sky-200/35 flex items-center justify-center text-[#F8C61A] group-hover:scale-110 transition-transform duration-300">
                          <IconComp className="w-8 h-8 stroke-[1.75]" />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="tile-overlay" />

                  <div className="tile-title">
                    <span className="tile-title-underline">
                      {ind.name}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => {
                setActiveIndustryFilter('')
                setCoachModalOpen(true)
              }}
              className="inline-flex items-center gap-2 text-sm font-bold text-sky-300 hover:text-[#F8C61A] hover:underline font-mono min-h-[44px] cursor-pointer"
            >
              <span>Explore tailored solutions for all 32 commercial trade sectors</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5. ADVISORY INTAKE & DEMO DESK
          ========================================================================= */}
      <section className="py-24 text-white relative border-b border-sky-400/25 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src={advisoryBackdropImg}
            alt="B4B Advisory Intake 3D executive coaching workspace"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0A2A5E]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08204D]/80 via-[#0B2C68]/50 to-[#08204D]/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07142B] via-transparent to-[#07142B] opacity-70" />
        </div>

        <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] bg-sky-400/25 rounded-full blur-3xl pointer-events-none z-[1]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-sky-600/25 via-[#103E7E]/35 to-sky-700/25 backdrop-blur-2xl rounded-3xl border border-sky-300/40 shadow-[0_20px_60px_rgba(2,132,199,0.25)] p-8 sm:p-12 overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Platform Demo Pitch */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-300/40 text-xs font-bold text-[#F8C61A] font-mono shadow-sm">
                  <Play className="w-3.5 h-3.5 text-[#F8C61A] fill-current" />
                  <span>ON-DEMAND ADVISORY DESK</span>
                </div>

                <h2 className="text-[28px] lg:text-[36px] font-extrabold font-heading text-white tracking-tight leading-tight">
                  Speak with a Business Coach
                </h2>

                <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                  Book a consultation or live system walkthrough with an executive business coach. 
                  Learn how to optimize working capital, POS rates, and software workflow across all 16 solutions.
                </p>

                <div className="space-y-3 pt-2 text-xs text-white font-medium">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-sky-500/20 border border-sky-200/35 backdrop-blur-md shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#F8C61A] shrink-0" />
                    <span>Dedicated 1-on-1 business coach review</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-sky-500/20 border border-sky-200/35 backdrop-blur-md shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#F8C61A] shrink-0" />
                    <span>Custom solutions blueprint tailored to your trade sector</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-sky-500/20 border border-sky-200/35 backdrop-blur-md shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#F8C61A] shrink-0" />
                    <span>Capital guidance across 12 Federal Reserve Divisions</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-sky-500/15 border border-sky-300/30 backdrop-blur-md flex items-center gap-4 text-xs font-mono text-blue-100">
                  <div>
                    <p className="font-bold text-white">Direct Advisory Desk:</p>
                    <p>+1 (888) 540-B4BA</p>
                  </div>
                  <div>
                    <p className="font-bold text-white">Corporate Support:</p>
                    <p>advisory@b4bamerica.com</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Embedded Consultation Intake Form */}
              <div className="lg:col-span-7 bg-gradient-to-br from-sky-600/25 via-[#1658B3]/30 to-sky-700/25 backdrop-blur-2xl p-6 sm:p-8 rounded-2xl border border-sky-300/40 shadow-[0_16px_48px_rgba(2,132,199,0.25)] text-white advisory-form-glass">
                <div className="space-y-2 mb-6 text-left border-b border-sky-200/25 pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-extrabold font-heading text-white">
                      Schedule Executive Consultation
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-[#F8C61A] font-bold border border-sky-300/40">
                      ⚡ 60-Second Setup
                    </span>
                  </div>
                  <p className="text-xs text-blue-100">
                    Connect directly with a dedicated coach within 1 business hour.
                  </p>
                </div>

                <CoachLeadForm
                  isInline
                  initialIndustry={activeIndustryFilter}
                  onSuccess={() => {
                    setActiveIndustryFilter('')
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Global Coach Modal Triggered by Buttons */}
      <CoachRequestModal
        isOpen={coachModalOpen}
        onClose={() => {
          setCoachModalOpen(false)
          setSelectedSolutionForCoach(null)
        }}
        initialIndustry={activeIndustryFilter}
        initialNote={
          selectedSolutionForCoach
            ? `Regarding Solution #${selectedSolutionForCoach.number}: ${selectedSolutionForCoach.title}`
            : undefined
        }
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectSolution={(sol) => {
          setSelectedSolution(sol)
        }}
      />

      {/* Interactive Solution Detail Modal (Opens in-place on current page without navigation) */}
      <SolutionDetailModal
        isOpen={!!selectedSolution}
        solution={selectedSolution}
        onClose={() => setSelectedSolution(null)}
        onSelectSolution={(sol) => setSelectedSolution(sol)}
        onOpenCoachModal={(sol) => {
          setSelectedSolution(null)
          setSelectedSolutionForCoach(sol)
          setCoachModalOpen(true)
        }}
      />
    </div>
  )
}

export default HomePage
