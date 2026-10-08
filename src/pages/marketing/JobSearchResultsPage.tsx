import React, { useState, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  Search,
  MapPin,
  Filter,
  DollarSign,
  Heart,
  Briefcase,
  SlidersHorizontal,
  ChevronRight,
  ArrowUpDown,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { SEOHead } from '@/components/seo/SEOHead'
import { JOB_CATEGORIES, US_STATES_JOB_DATA, MOCK_JOBS, JobItem } from '@/mock-data/jobsBoardData'
import { useToast } from '@/components/ui/Toast'

export const JobSearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  // Initial Filter State from URL
  const [keyword, setKeyword] = useState(searchParams.get('q') || '')
  const [selectedCat, setSelectedCat] = useState(searchParams.get('category') || '')
  const [selectedState, setSelectedState] = useState(searchParams.get('state') || '')
  const [minSalary, setMinSalary] = useState(Number(searchParams.get('minSalary')) || 30000)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [isRemoteOnly, setIsRemoteOnly] = useState(false)
  const [sortBy, setSortBy] = useState<'relevant' | 'salary' | 'newest'>('relevant')

  const [savedJobIds, setSavedJobIds] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const toggleSaveJob = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (savedJobIds.includes(id)) {
      setSavedJobIds(savedJobIds.filter((j) => j !== id))
      toast({ title: 'Removed from Saved Jobs', type: 'info' })
    } else {
      setSavedJobIds([...savedJobIds, id])
      toast({ title: 'Job Saved to Bookmarks', description: 'Access bookmarked roles anytime in your Job Seeker Portal.', type: 'success' })
    }
  }

  const toggleJobType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const resetFilters = () => {
    setKeyword('')
    setSelectedCat('')
    setSelectedState('')
    setMinSalary(30000)
    setSelectedTypes([])
    setIsRemoteOnly(false)
    setSearchParams(new URLSearchParams())
  }

  // Filter Logic
  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      if (keyword && !job.title.toLowerCase().includes(keyword.toLowerCase()) && !job.company.toLowerCase().includes(keyword.toLowerCase()) && !job.description.toLowerCase().includes(keyword.toLowerCase())) {
        return false
      }
      if (selectedCat && job.category !== selectedCat) {
        return false
      }
      if (selectedState && job.state !== selectedState) {
        return false
      }
      if (job.salaryPeriod === 'year' && job.salaryMax < minSalary) {
        return false
      }
      if (selectedTypes.length > 0 && !selectedTypes.includes(job.type)) {
        return false
      }
      if (isRemoteOnly && !job.isRemote) {
        return false
      }
      return true
    }).sort((a, b) => {
      if (sortBy === 'salary') return b.salaryMax - a.salaryMax
      if (sortBy === 'newest') return a.postedDate.localeCompare(b.postedDate)
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    })
  }, [keyword, selectedCat, selectedState, minSalary, selectedTypes, isRemoteOnly, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      <SEOHead
        title="Job Search Results | High Paying B2B Sales & Tech Opportunities"
        description="Filter and search verified job opportunities in Account Executive, B2B Sales, Software Sales, AI/ML, and Remote roles."
      />

      {/* Top Header Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full sm:flex-1 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="w-full sm:w-48 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none cursor-pointer [&>option]:bg-slate-900"
            >
              <option value="">All Categories</option>
              {JOB_CATEGORIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-40 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none cursor-pointer [&>option]:bg-slate-900"
            >
              <option value="">All States</option>
              {US_STATES_JOB_DATA.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {(keyword || selectedCat || selectedState || selectedTypes.length > 0 || isRemoteOnly) && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs text-rose-500 hover:text-rose-600">
              <X className="w-3.5 h-3.5 mr-1" /> Clear Filters
            </Button>
          )}
          <Button variant="primary" size="sm" className="font-bold">
            Filter Results
          </Button>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters & Results Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-500" /> Refine Search
            </h3>
          </div>

          {/* 100% Remote Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> 100% Remote Jobs Only
            </span>
            <input
              type="checkbox"
              checked={isRemoteOnly}
              onChange={(e) => setIsRemoteOnly(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
            />
          </div>

          {/* Minimum Salary Range Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 dark:text-slate-400">Minimum Annual Salary</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">${(minSalary / 1000).toFixed(0)}k+</span>
            </div>
            <input
              type="range"
              min="30000"
              max="200000"
              step="10000"
              value={minSalary}
              onChange={(e) => setMinSalary(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Job Type Checkboxes */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Job Type</h4>
            {['Full-time', 'Part-time', 'Contract', 'Internship', 'Gig'].map((type) => (
              <label key={type} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleJobType(type)}
                  className="w-4 h-4 accent-blue-600 rounded"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

          {/* Categories Radio */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Category</h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="cat"
                  checked={selectedCat === ''}
                  onChange={() => setSelectedCat('')}
                  className="accent-blue-600"
                />
                <span>All Categories</span>
              </label>
              {JOB_CATEGORIES.map((cat) => (
                <label key={cat.id} className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="cat"
                      checked={selectedCat === cat.name}
                      onChange={() => setSelectedCat(cat.name)}
                      className="accent-blue-600"
                    />
                    <span className="truncate max-w-[130px]">{cat.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">({cat.jobCount})</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Results Main Content */}
        <main className="lg:col-span-3 space-y-6">
          {/* Results Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                {filteredJobs.length} Open Positions Found
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showing verified opportunities matching your criteria
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" /> Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                <option value="relevant">Most Relevant</option>
                <option value="salary">Highest Salary</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Job List Feed */}
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 w-fit mx-auto text-slate-400">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No exact matching roles found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your search terms or lowering your minimum salary threshold.
              </p>
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => {
                const isSaved = savedJobIds.includes(job.id)
                return (
                  <Card
                    key={job.id}
                    variant="default"
                    hover
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="p-6 cursor-pointer border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={job.companyLogo}
                          alt={job.company}
                          className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{job.company}</span>
                            <span className="text-xs text-amber-500 font-bold">★ {job.companyRating}</span>
                          </div>
                          <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <Badge variant="primary" size="sm">
                              {job.category}
                            </Badge>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {job.location}
                            </span>
                            <Badge variant="gold" size="sm">
                              {job.type}
                            </Badge>
                            {job.isRemote && (
                              <Badge variant="emerald" size="sm">
                                100% Remote
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3">
                        <button
                          onClick={(e) => toggleSaveJob(e, job.id)}
                          className={`p-2 rounded-xl border transition-colors ${
                            isSaved
                              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-500'
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
                        </button>
                        <div className="text-right">
                          <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                            ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k
                          </div>
                          <div className="text-[10px] text-slate-400 font-semibold">{job.postedDate}</div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {job.tags.map((tag, i) => (
                          <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <Button variant="accent" size="sm" pill className="font-bold">
                        Apply Now <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Pagination UI */}
          {filteredJobs.length > 0 && (
            <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500">Page 1 of 3</span>
              <div className="flex items-center gap-1.5">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="primary" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
