import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Filter,
  ArrowRight,
  ArrowLeft,
  Building2,
  Clock,
  Sparkles,
  RotateCcw,
  PlusCircle,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react'
import '@/components/website/corporateTheme.css'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { jobService } from '@/lib/jobService'
import {
  Job,
  JOB_CATEGORIES_CLIENT,
  SALARY_RANGES_CLIENT,
} from '@/mock-data/jobs'

export const JobSearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // State from URL
  const queryKeyword = searchParams.get('q') || ''
  const queryCategory = searchParams.get('category') || ''
  const queryState = searchParams.get('state') || ''
  const queryCity = searchParams.get('city') || ''
  const queryMinSalary = Number(searchParams.get('minSalary')) || 0
  const querySort = (searchParams.get('sortBy') as any) || 'newest'
  const queryPage = Number(searchParams.get('page')) || 1

  // Local search inputs
  const [keywordInput, setKeywordInput] = useState(queryKeyword)
  const [categoryInput, setCategoryInput] = useState(queryCategory)
  const [stateInput, setStateInput] = useState(queryState)
  const [cityInput, setCityInput] = useState(queryCity)

  // Filters
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [minSalaryFilter, setMinSalaryFilter] = useState<number>(queryMinSalary)
  const [sortBy, setSortBy] = useState<'newest' | 'salary_high' | 'salary_low' | 'relevance'>(querySort)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Results state
  const [jobs, setJobs] = useState<Job[]>([])
  const [totalJobs, setTotalJobs] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(queryPage)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Sync state if URL changes
  useEffect(() => {
    setKeywordInput(queryKeyword)
    setCategoryInput(queryCategory)
    setStateInput(queryState)
    setCityInput(queryCity)
    setMinSalaryFilter(queryMinSalary)
    setCurrentPage(queryPage)
  }, [queryKeyword, queryCategory, queryState, queryCity, queryMinSalary, queryPage])

  // Fetch jobs via jobService
  useEffect(() => {
    let active = true
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        setHasError(false)

        const res = await jobService.getJobs({
          keyword: queryKeyword,
          category: queryCategory,
          state: queryState,
          city: queryCity,
          minSalary: minSalaryFilter,
          jobTypes: selectedTypes.length > 0 ? selectedTypes : undefined,
          sortBy: sortBy,
          page: currentPage,
          limit: 9,
        })

        if (active) {
          setJobs(res.jobs)
          setTotalJobs(res.total)
          setTotalPages(res.totalPages)
        }
      } catch (err) {
        console.error('Job search failed:', err)
        if (active) setHasError(true)
      } finally {
        if (active) setIsLoading(false)
      }
    }

    fetchJobs()
    return () => {
      active = false
    }
  }, [
    queryKeyword,
    queryCategory,
    queryState,
    queryCity,
    minSalaryFilter,
    selectedTypes,
    sortBy,
    currentPage,
  ])

  // Trigger search submit
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const nextParams = new URLSearchParams()
    if (keywordInput.trim()) nextParams.set('q', keywordInput.trim())
    if (categoryInput.trim() && categoryInput !== 'All') nextParams.set('category', categoryInput.trim())
    if (stateInput.trim() && stateInput !== 'All') nextParams.set('state', stateInput.trim().toUpperCase())
    if (cityInput.trim() && cityInput !== 'All') nextParams.set('city', cityInput.trim())
    if (minSalaryFilter > 0) nextParams.set('minSalary', String(minSalaryFilter))
    nextParams.set('page', '1')
    setSearchParams(nextParams)
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setKeywordInput('')
    setCategoryInput('')
    setStateInput('')
    setCityInput('')
    setSelectedTypes([])
    setMinSalaryFilter(0)
    setSortBy('newest')
    setCurrentPage(1)
    setSearchParams({})
  }

  const toggleJobType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-[#EEF1EC] text-[#14231E] font-body transition-colors">
      <SEOHead
        title="Search Jobs | B4B America Talent Exchange"
        description="Filter and search verified small business jobs, sales opportunities, and executive positions across 12 federal reserve territory divisions."
      />

      {/* Header Search Band: Forest Black */}
      <section className="bg-[#06201A] text-white pt-8 pb-12 px-4 border-b border-[#0B4A3A]">
        <div className="max-w-7xl mx-auto space-y-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Job Finder', href: '/jobs' },
              { label: 'Search Results' },
            ]}
          />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C8793A]">
                Public Career Database
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight">
                Search Small Business Jobs
              </h1>
            </div>

            <Link to="/jobs/post" className="btn-copper-dark inline-flex self-start md:self-auto text-xs py-2.5">
              <PlusCircle className="w-4 h-4 text-[#06201A]" />
              <span>Post a Job Listing</span>
            </Link>
          </div>

          {/* Search Bar Inputs */}
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white p-3 rounded-2xl shadow-xl border border-[#0B4A3A] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center text-slate-800"
          >
            <div className="lg:col-span-3 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Keyword, job title, company"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0E7A5A] text-slate-900"
              />
            </div>

            <div className="lg:col-span-3">
              <select
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
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

            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="State (e.g. NY)"
                maxLength={2}
                value={stateInput}
                onChange={(e) => setStateInput(e.target.value.toUpperCase())}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium uppercase focus:outline-none focus:ring-2 focus:ring-[#0E7A5A] text-slate-900"
              />
            </div>

            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="City (e.g. Austin)"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0E7A5A] text-slate-900"
              />
            </div>

            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#0E7A5A] hover:bg-[#0B4A3A] text-white font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Search className="w-4 h-4 text-white" />
                <span>SEARCH</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Main Results Viewport */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between pb-2">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold flex items-center gap-2 text-slate-800"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#0E7A5A]" />
              <span>{mobileFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
            </button>

            <span className="text-xs font-mono font-bold text-slate-500">
              {totalJobs} Jobs Found
            </span>
          </div>

          {/* LEFT SIDEBAR: FILTERS */}
          <aside
            className={`lg:col-span-3 space-y-6 ${
              mobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#0E7A5A]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 font-heading">
                    Filters
                  </h2>
                </div>

                <button
                  onClick={handleResetFilters}
                  className="text-xs text-slate-500 hover:text-[#C8793A] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Filter 1: Job Types */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-heading">
                  Job Type
                </label>
                <div className="space-y-2">
                  {[
                    'Full-time',
                    'Part-time',
                    'Contract',
                    'Gig',
                    'Commission',
                    'Internship',
                  ].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleJobType(type)}
                        className="rounded text-[#0E7A5A] focus:ring-[#0E7A5A] h-4 w-4"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter 2: Min Salary Bracket */}
              <div className="space-y-3 border-t border-slate-100 pt-5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-heading">
                  Minimum Salary
                </label>
                <div className="space-y-2">
                  {[
                    { label: 'Any Compensation', val: 0 },
                    { label: '$50,000+ / yr', val: 50000 },
                    { label: '$75,000+ / yr', val: 75000 },
                    { label: '$100,000+ / yr', val: 100000 },
                    { label: '$150,000+ / yr', val: 150000 },
                    { label: '$225,000+ / yr', val: 225000 },
                  ].map((bracket) => (
                    <label
                      key={bracket.label}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer select-none"
                    >
                      <input
                        type="radio"
                        name="minSalary"
                        checked={minSalaryFilter === bracket.val}
                        onChange={() => {
                          setMinSalaryFilter(bracket.val)
                          setCurrentPage(1)
                        }}
                        className="text-[#0E7A5A] focus:ring-[#0E7A5A] h-4 w-4"
                      />
                      <span>{bracket.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT RESULTS AREA */}
          <div className="lg:col-span-9 space-y-6">
            {/* Results Header Bar: Total Count + Sort */}
            <div className="bg-white rounded-xl px-5 py-3 shadow-xs border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-mono font-bold text-slate-700">
                Showing{' '}
                <strong className="text-[#06201A]">
                  {jobs.length} of {totalJobs}
                </strong>{' '}
                approved positions
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as any)
                    setCurrentPage(1)
                  }}
                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0E7A5A]"
                >
                  <option value="newest">Newest Listed</option>
                  <option value="salary_high">Salary (Highest First)</option>
                  <option value="salary_low">Salary (Lowest First)</option>
                </select>
              </div>
            </div>

            {/* States: Loading, Error, Empty, or List */}
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-36 bg-white rounded-2xl animate-pulse border border-slate-200 p-6 space-y-3"
                  >
                    <div className="h-4 bg-slate-200 rounded w-1/4" />
                    <div className="h-6 bg-slate-200 rounded w-1/2" />
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : hasError ? (
              <div className="bg-white rounded-2xl p-12 text-center space-y-4 border border-red-200">
                <h3 className="text-base font-bold text-red-800">
                  Unable to load job listings
                </h3>
                <p className="text-xs text-slate-500">
                  An error occurred while querying the jobs database.
                </p>
                <button onClick={handleResetFilters} className="btn-emerald-light inline-flex text-xs">
                  <span>Reset Search</span>
                </button>
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center space-y-5 border border-slate-200 shadow-sm">
                <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#06201A] font-heading">
                    No matching roles found
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Try broadening your keywords, clearing state filters, or exploring other salary tiers.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button onClick={handleResetFilters} className="btn-outline-light text-xs">
                    <span>Clear All Filters</span>
                  </button>

                  <Link to="/jobs/post" className="btn-emerald-light text-xs inline-flex">
                    <span>Post a New Job</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200 hover:border-[#0E7A5A] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 cursor-pointer group"
                  >
                    <div className="space-y-2.5 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-full bg-[#0E7A5A]/10 text-[#0E7A5A] border border-[#0E7A5A]/30">
                          {job.category}
                        </span>

                        <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {job.jobType}
                        </span>

                        {job.isDemo && (
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                            DEMO DATA
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold font-heading text-[#06201A] group-hover:text-[#0E7A5A] transition-colors leading-snug">
                        {job.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                        <span className="flex items-center gap-1 font-semibold text-slate-800">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{job.company}</span>
                        </span>

                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {job.city}, {job.state}
                          </span>
                        </span>

                        <span className="flex items-center gap-1 font-mono text-[#C8793A] font-bold">
                          <DollarSign className="w-3.5 h-3.5 text-[#C8793A]" />
                          <span>{job.salary}</span>
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>
                    </div>

                    <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <button className="btn-emerald-light text-xs py-2 px-4 group-hover:bg-[#0B4A3A]">
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-1" />
                      </button>

                      <span className="text-[11px] font-mono text-slate-400">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="pt-6 flex items-center justify-center gap-3">
                    <button
                      disabled={currentPage <= 1}
                      onClick={() => {
                        const next = currentPage - 1
                        setCurrentPage(next)
                        searchParams.set('page', String(next))
                        setSearchParams(searchParams)
                        window.scrollTo({ top: 200, behavior: 'smooth' })
                      }}
                      className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <span className="text-xs font-mono font-bold text-slate-700 px-3">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      disabled={currentPage >= totalPages}
                      onClick={() => {
                        const next = currentPage + 1
                        setCurrentPage(next)
                        searchParams.set('page', String(next))
                        setSearchParams(searchParams)
                        window.scrollTo({ top: 200, behavior: 'smooth' })
                      }}
                      className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
