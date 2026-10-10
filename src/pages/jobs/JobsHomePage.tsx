import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  ArrowRight,
  Sparkles,
  Building2,
  Clock,
  Filter,
  CheckCircle2,
  PhoneCall,
  PlusCircle,
  Tag,
  Flame,
  ChevronRight,
  TrendingUp,
} from 'lucide-react'
import '@/components/website/corporateTheme.css'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { CoachRequestModal } from '@/components/forms/CoachRequestModal'
import { jobService } from '@/lib/jobService'
import {
  Job,
  POPULAR_SEARCHES_CLIENT,
  JOB_CATEGORIES_CLIENT,
  JOB_LOCATIONS_CLIENT,
  SALARY_RANGES_CLIENT,
  GIGS_CLIENT,
} from '@/mock-data/jobs'

export const JobsHomePage: React.FC = () => {
  const navigate = useNavigate()

  // Search input state
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [stateCode, setStateCode] = useState('')
  const [city, setCity] = useState('')

  // Browse active tab
  const [activeTab, setActiveTab] = useState<
    'popular' | 'category' | 'location' | 'salary' | 'gigs'
  >('popular')

  // Trending jobs state
  const [trendingJobs, setTrendingJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [coachModalOpen, setCoachModalOpen] = useState(false)

  useEffect(() => {
    let mounted = true
    const loadJobs = async () => {
      try {
        setIsLoading(true)
        const res = await jobService.getJobs({ limit: 6 })
        if (mounted) {
          setTrendingJobs(res.jobs)
        }
      } catch (err) {
        console.error('Failed to load featured jobs:', err)
      } finally {
        if (mounted) setIsLoading(false)
      }
    }
    loadJobs()
    return () => {
      mounted = false
    }
  }, [])

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const params = new URLSearchParams()
    if (keyword.trim()) params.set('q', keyword.trim())
    if (category.trim() && category !== 'All') params.set('category', category.trim())
    if (stateCode.trim() && stateCode !== 'All') params.set('state', stateCode.trim())
    if (city.trim() && city !== 'All') params.set('city', city.trim())
    navigate(`/jobs/search?${params.toString()}`)
  }

  const handleQuickFilter = (type: 'category' | 'state' | 'city' | 'salary' | 'q', val: string) => {
    const params = new URLSearchParams()
    params.set(type, val)
    navigate(`/jobs/search?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-[#EEF1EC] text-[#14231E] font-body transition-colors">
      <SEOHead
        title="B4B America Jobs | The Connect for Small Business Solutions"
        description="Search trending small business jobs, sales roles, gigs, and corporate career opportunities across 12 federal reserve territory divisions."
      />

      {/* Top Secondary Job Bar (from client document line 7) */}
      <div className="bg-[#06201A] text-[#B9CBC3] text-xs py-2.5 px-4 border-b border-[#0B4A3A] font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <Link to="/jobs" className="text-white hover:text-[#C8793A] font-bold">
              HOME
            </Link>
            <span className="text-[#0B4A3A]">|</span>
            <Link
              to="/jobs/post"
              className="text-[#C8793A] hover:underline font-bold inline-flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>POST A JOB</span>
            </Link>
            <span className="text-[#0B4A3A]">|</span>
            <button
              onClick={() => {
                setActiveTab('salary')
                document.getElementById('browse-sections')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              SEARCH BY SALARIES
            </button>
            <span className="text-[#0B4A3A]">|</span>
            <button
              onClick={() => {
                setActiveTab('gigs')
                document.getElementById('browse-sections')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Gigs
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/portal/login"
              className="px-2.5 py-1 rounded-md bg-[#0B4A3A]/60 text-white hover:bg-[#0B4A3A] transition-colors border border-[#0B4A3A]"
            >
              [ Login ]
            </Link>
          </div>
        </div>
      </div>

      {/* HERO & SEARCH BAR: Forest Black (#06201A) */}
      <section className="bg-[#06201A] text-white pt-12 pb-20 px-4 border-b border-[#0B4A3A]">
        <div className="max-w-6xl mx-auto space-y-8 text-center sm:text-left">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: '16 Solutions', href: '/solutions' },
              { label: 'Job Finder (#10)' },
            ]}
          />

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B4A3A]/60 border border-[#0B4A3A]">
              <span className="w-2 h-2 rounded-full bg-[#C8793A] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B9CBC3]">
                B4B Solution #10 • Employment & Talent Exchange
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
              The Connect for Small Business Solutions
            </h1>

            <p className="text-sm sm:text-base text-[#B9CBC3] max-w-2xl font-normal">
              Search trending jobs, commercial contracts, sales roles, and independent gigs across 12 federal reserve territory divisions.
            </p>
          </div>

          {/* MAIN SEARCH PANEL: [ Keyword ] [ Category ] [ State ] [ City ] [ SEARCH NOW ] */}
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white p-3 sm:p-4 rounded-2xl shadow-2xl border border-[#0B4A3A] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center text-slate-800"
          >
            {/* 1. Keyword */}
            <div className="lg:col-span-3 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Job title, skills, keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0E7A5A] text-slate-900"
              />
            </div>

            {/* 2. Category */}
            <div className="lg:col-span-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0E7A5A] text-slate-900 bg-white"
              >
                <option value="">All Categories</option>
                {JOB_CATEGORIES_CLIENT.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. State */}
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="State (e.g. NY, TX)"
                maxLength={2}
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value.toUpperCase())}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium uppercase focus:outline-none focus:ring-2 focus:ring-[#0E7A5A] text-slate-900"
              />
            </div>

            {/* 4. City */}
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="City (e.g. NYC, Austin)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0E7A5A] text-slate-900"
              />
            </div>

            {/* 5. SEARCH NOW Button */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#C8793A] hover:bg-[#d8894a] text-[#06201A] font-extrabold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>SEARCH NOW</span>
                <ArrowRight className="w-4 h-4 text-[#06201A] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </form>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#B9CBC3]">
            <span className="font-mono text-[#C8793A] font-bold">Hiring for your company?</span>
            <Link
              to="/jobs/post"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B4A3A] text-white hover:bg-[#0E7A5A] transition-colors font-bold"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#C8793A]" />
              <span>Post a Job Listing</span>
            </Link>
          </div>
        </div>
      </section>

      {/* BROWSE SECTIONS (Client Document Line 11) */}
      <section id="browse-sections" className="max-w-6xl mx-auto px-4 py-16 space-y-8">
        <div className="text-center sm:text-left space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0E7A5A]">
            Official Directory Taxonomies
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#06201A]">
            Search Trending Jobs and Projects
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {[
            { id: 'popular', label: 'Popular Searches' },
            { id: 'category', label: 'Jobs by Categories' },
            { id: 'location', label: 'by Locations' },
            { id: 'salary', label: 'by Salary' },
            { id: 'gigs', label: 'Gigs' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0E7A5A] text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 min-h-[180px]">
          {activeTab === 'popular' && (
            <div className="flex flex-wrap gap-2.5">
              {POPULAR_SEARCHES_CLIENT.map((item) => (
                <button
                  key={item}
                  onClick={() => handleQuickFilter('q', item)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#EEF1EC] text-slate-800 hover:bg-[#0E7A5A] hover:text-white transition-colors text-xs font-semibold cursor-pointer border border-slate-200 hover:border-[#0E7A5A]"
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'category' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {JOB_CATEGORIES_CLIENT.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleQuickFilter('category', cat)}
                  className="p-3 text-left rounded-xl bg-[#EEF1EC]/70 hover:bg-[#0E7A5A] hover:text-white transition-all text-xs font-semibold text-slate-800 border border-slate-200 hover:border-[#0E7A5A] flex items-center justify-between group cursor-pointer"
                >
                  <span className="truncate">{cat}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white shrink-0 ml-1" />
                </button>
              ))}
            </div>
          )}

          {activeTab === 'location' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {JOB_LOCATIONS_CLIENT.map((loc) => (
                <button
                  key={`${loc.city}-${loc.state}`}
                  onClick={() => {
                    const p = new URLSearchParams()
                    p.set('city', loc.city)
                    p.set('state', loc.state)
                    navigate(`/jobs/search?${p.toString()}`)
                  }}
                  className="p-3 text-left rounded-xl bg-[#EEF1EC]/70 hover:bg-[#0E7A5A] hover:text-white transition-all text-xs font-semibold text-slate-800 border border-slate-200 hover:border-[#0E7A5A] flex items-center justify-between group cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#C8793A] group-hover:text-white shrink-0" />
                    <span>
                      {loc.city}, {loc.state}
                    </span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white shrink-0" />
                </button>
              ))}
            </div>
          )}

          {activeTab === 'salary' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {SALARY_RANGES_CLIENT.map((sal) => (
                <button
                  key={sal.label}
                  onClick={() => {
                    const p = new URLSearchParams()
                    p.set('minSalary', String(sal.min))
                    if (sal.max < 1000000) p.set('maxSalary', String(sal.max))
                    navigate(`/jobs/search?${p.toString()}`)
                  }}
                  className="p-5 rounded-2xl bg-[#06201A] text-white hover:bg-[#0B4A3A] transition-all text-left space-y-2 border border-[#0B4A3A] cursor-pointer group"
                >
                  <DollarSign className="w-5 h-5 text-[#C8793A]" />
                  <p className="text-sm font-bold text-white group-hover:text-[#C8793A] transition-colors">
                    {sal.label}
                  </p>
                  <p className="text-[11px] font-mono text-[#B9CBC3]">
                    Search roles in this compensation bracket &rarr;
                  </p>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'gigs' && (
            <div className="flex flex-wrap gap-2.5">
              {GIGS_CLIENT.map((gig) => (
                <button
                  key={gig}
                  onClick={() => handleQuickFilter('q', gig)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#EEF1EC] text-slate-800 hover:bg-[#C8793A] hover:text-[#06201A] transition-colors text-xs font-semibold cursor-pointer border border-slate-200 hover:border-[#C8793A]"
                >
                  {gig}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FEATURED / TRENDING JOBS GRID */}
      <section className="max-w-6xl mx-auto px-4 pb-20 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C8793A]">
              Live Board Listings
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#06201A]">
              Latest Approved Openings
            </h2>
          </div>

          <Link
            to="/jobs/search"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7A5A] hover:underline"
          >
            <span>View All Search Results</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-56 bg-white rounded-2xl animate-pulse border border-slate-200 p-6 space-y-4"
              >
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-6 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
                <div className="h-10 bg-slate-200 rounded-xl" />
              </div>
            ))}
          </div>
        ) : trendingJobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center space-y-4 border border-slate-200">
            <Briefcase className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No Jobs Found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              There are currently no active listings. Post a job to appear here!
            </p>
            <Link to="/jobs/post" className="btn-emerald-light inline-flex">
              <span>Post the First Job</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200 hover:border-[#0E7A5A] transition-all flex flex-col justify-between space-y-5 cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-full bg-[#0E7A5A]/10 text-[#0E7A5A] border border-[#0E7A5A]/30">
                      {job.category}
                    </span>
                    {job.isDemo && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                        DEMO DATA
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-heading text-[#06201A] group-hover:text-[#0E7A5A] transition-colors leading-snug">
                    {job.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-800">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>
                        {job.city}, {job.state}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="font-mono">{job.jobType}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C8793A] font-mono">
                    {job.salary}
                  </span>

                  <span className="text-xs font-bold text-[#0E7A5A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Role</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Advisory Modal for Coach consultation */}
      <CoachRequestModal
        isOpen={coachModalOpen}
        onClose={() => setCoachModalOpen(false)}
        initialIndustry="B4B Jobs & Talent Advisory"
      />
    </div>
  )
}
