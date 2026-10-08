import React, { useState, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  Search,
  MapPin,
  Briefcase,
  Filter,
  Heart,
  Send,
  CheckCircle2,
  Building2,
  DollarSign,
  Globe,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { MOCK_JOBS, JOB_CATEGORIES, US_STATES_JOB_DATA, JobItem, StateJobCount } from '@/mock-data/jobsBoardData'
import { useToast } from '@/components/ui/Toast'

export const JobSeekerSearchJobsPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [keyword, setKeyword] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [selectedState, setSelectedState] = useState(searchParams.get('state') || 'All')
  const [jobType, setJobType] = useState('All')
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [minSalary, setMinSalary] = useState<number>(0)
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-1', 'job-3'])
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobItem | null>(null)
  const [coverNote, setCoverNote] = useState('')
  const [isSubmittingApp, setIsSubmittingApp] = useState(false)

  const toggleSaveJob = (id: string) => {
    if (savedJobIds.includes(id)) {
      setSavedJobIds(savedJobIds.filter((jId) => jId !== id))
      toast({ title: 'Removed from Saved Jobs', type: 'info' })
    } else {
      setSavedJobIds([...savedJobIds, id])
      toast({ title: 'Saved to Bookmarks!', type: 'success' })
    }
  }

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter((j) => {
      const matchesKeyword =
        !keyword ||
        j.title.toLowerCase().includes(keyword.toLowerCase()) ||
        j.company.toLowerCase().includes(keyword.toLowerCase()) ||
        j.category.toLowerCase().includes(keyword.toLowerCase())

      const matchesCategory = category === 'All' || j.category === category
      const matchesState = selectedState === 'All' || j.state === selectedState
      const matchesJobType = jobType === 'All' || j.type === jobType
      const matchesRemote = !remoteOnly || j.isRemote
      const matchesSalary = j.salaryMin >= minSalary

      return matchesKeyword && matchesCategory && matchesState && matchesJobType && matchesRemote && matchesSalary
    })
  }, [keyword, category, selectedState, jobType, remoteOnly, minSalary])

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingApp(true)
    setTimeout(() => {
      setIsSubmittingApp(false)
      toast({
        title: 'Application Sent!',
        description: `Application for "${selectedJobForApply?.title}" submitted successfully.`,
        type: 'success',
      })
      setSelectedJobForApply(null)
      setCoverNote('')
    }, 600)
  }

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto">
      <SEOHead title="Search Jobs & Gigs | Job Seeker Portal" description="Filter and search executive sales, tech, work-from-home, and gig listings." />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'Job Seeker Portal', href: '/portal/seeker/dashboard' }, { label: 'Search Jobs & Gigs' }]} />
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white mt-2">
            Search Jobs & Gigs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">Discover top corporate openings and contract gigs with verified compensation</p>
        </div>

        <Badge variant="emerald" size="md">
          {filteredJobs.length} Positions Available
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          <Card variant="default" className="p-5 space-y-5 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-500" /> Filter Openings
              </h3>
              <button
                onClick={() => {
                  setKeyword('')
                  setCategory('All')
                  setSelectedState('All')
                  setJobType('All')
                  setRemoteOnly(false)
                  setMinSalary(0)
                }}
                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Keyword Search */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 dark:text-white">Keyword</label>
              <Input
                placeholder="Search job title or keyword..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="text-xs h-9"
              />
            </div>

            {/* Job Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 dark:text-white">Job Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="All">All Categories</option>
                {JOB_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* US State */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 dark:text-white">Location State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="All">All States</option>
                {US_STATES_JOB_DATA.map((st: StateJobCount) => (
                  <option key={st.code} value={st.code}>
                    {st.name} ({st.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Job Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 dark:text-white">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="All">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Gig">Gig / Freelance</option>
              </select>
            </div>

            {/* Min Base Salary */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-900 dark:text-white">
                <span>Min Base Salary</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">${(minSalary / 1000).toFixed(0)}k+</span>
              </div>
              <input
                type="range"
                min={0}
                max={200000}
                step={10000}
                value={minSalary}
                onChange={(e) => setMinSalary(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Remote Only Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-500" /> Work From Home Only
              </span>
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="rounded-md text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
              />
            </div>
          </Card>
        </div>

        {/* Results Grid */}
        <div className="space-y-4 lg:col-span-3">
          {filteredJobs.length === 0 ? (
            <Card variant="default" className="p-12 text-center space-y-4 border border-slate-200 dark:border-slate-800">
              <Search className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No jobs match your selected criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">Try resetting filters or searching with broader keywords.</p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setKeyword('')
                  setCategory('All')
                  setSelectedState('All')
                  setJobType('All')
                  setRemoteOnly(false)
                  setMinSalary(0)
                }}
              >
                Reset All Filters
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredJobs.map((job) => {
                const isSaved = savedJobIds.includes(job.id)
                return (
                  <Card key={job.id} variant="default" hover className="p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="primary" size="sm">
                          {job.category}
                        </Badge>
                        <button
                          onClick={() => toggleSaveJob(job.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isSaved ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40' : 'text-slate-400 hover:text-rose-500'
                          }`}
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">{job.title}</h3>
                        <div className="text-xs text-slate-500 font-semibold flex items-center gap-2 mt-0.5">
                          <Building2 className="w-3.5 h-3.5 text-blue-500" /> {job.company}
                        </div>
                      </div>

                      <div className="text-xs text-slate-400 flex items-center gap-3">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                        <span>• {job.type}</span>
                        {job.isRemote && <span className="text-emerald-500 font-bold">• Remote</span>}
                      </div>

                      <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                        ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k / {job.salaryPeriod}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                        className="text-xs"
                      >
                        View Details
                      </Button>
                      <Button
                        variant="accent"
                        size="sm"
                        pill
                        onClick={() => setSelectedJobForApply(job)}
                        className="flex-1 font-bold bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                      >
                        Apply Now <Send className="w-3 h-3 ml-1.5" />
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* 1-Click Apply Modal */}
      {selectedJobForApply && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <Card variant="default" className="w-full max-w-lg p-6 space-y-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <Badge variant="primary" size="sm">Quick Apply</Badge>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mt-1">
                  Apply for {selectedJobForApply.title}
                </h3>
                <span className="text-xs text-slate-400">{selectedJobForApply.company} • {selectedJobForApply.location}</span>
              </div>
              <button
                onClick={() => setSelectedJobForApply(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4 text-left">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <div className="font-bold text-slate-900 dark:text-white">Applicant Profile: Alex Mercer</div>
                <div className="text-slate-500">Email: alex.mercer@demo.com | Phone: (555) 234-8900</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-4 h-4" /> Attached Resume: Alex_Mercer_Executive_Resume_2026.pdf
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 dark:text-white">
                  Cover Note / Pitch (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Introduce your sales achievements to the hiring manager..."
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedJobForApply(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="accent"
                  size="sm"
                  pill
                  disabled={isSubmittingApp}
                  className="font-bold bg-emerald-600 text-white"
                >
                  {isSubmittingApp ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
