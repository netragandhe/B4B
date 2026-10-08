import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  MapPin,
  Briefcase,
  TrendingUp,
  Heart,
  Award,
  Calendar,
  Building2,
  CheckCircle2,
  ArrowRight,
  FileText,
  Bell,
  Send,
  Zap,
  Filter,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { MOCK_JOBS, JOB_CATEGORIES, US_STATES_JOB_DATA, JobItem, StateJobCount } from '@/mock-data/jobsBoardData'
import { useToast } from '@/components/ui/Toast'

export const JobSeekerDashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [stateCode, setStateCode] = useState('')
  const [city, setCity] = useState('')
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobItem | null>(null)
  const [coverNote, setCoverNote] = useState('')
  const [isApplying, setIsApplying] = useState(false)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (keyword) params.append('q', keyword)
    if (category) params.append('category', category)
    if (stateCode) params.append('state', stateCode)
    if (city) params.append('city', city)
    navigate(`/portal/seeker/search?${params.toString()}`)
  }

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsApplying(true)
    setTimeout(() => {
      setIsApplying(false)
      toast({
        title: 'Application Submitted!',
        description: `Your profile and resume were sent for "${selectedJobForApply?.title}".`,
        type: 'success',
      })
      setSelectedJobForApply(null)
      setCoverNote('')
    }, 600)
  }

  const recommendedJobs = MOCK_JOBS.slice(0, 4)

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto">
      <SEOHead title="Job Seeker Dashboard | B4B Portal" description="Explore corporate sales and executive openings, track active applications, and manage job alerts." />

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Zap className="w-3.5 h-3.5" /> Candidate Portal • Profile 85% Complete
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Welcome back, Alex! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              You have <strong className="text-emerald-400">3 active applications</strong> in progress and 1 new interview invitation from Nexus FinTech.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="accent"
              size="md"
              pill
              onClick={() => navigate('/portal/seeker/profile')}
              className="font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-900/30"
            >
              <FileText className="w-4 h-4 mr-2" /> Update Resume
            </Button>
            <Button
              variant="outline"
              size="md"
              pill
              onClick={() => navigate('/portal/seeker/alerts')}
              className="border-slate-700 text-slate-200 hover:bg-slate-800"
            >
              <Bell className="w-4 h-4 mr-2" /> Job Alerts
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar Widget */}
      <Card variant="bento" className="p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-md">
        <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <Search className="w-4 h-4 text-blue-500" /> Search Open Jobs & Gigs
        </h2>
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <Input
            placeholder="Keyword (e.g. SaaS AE, Director)..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="h-10 text-xs"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-medium focus:outline-none"
          >
            <option value="">All Categories</option>
            {JOB_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            className="h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-medium focus:outline-none"
          >
            <option value="">All States</option>
            {US_STATES_JOB_DATA.slice(0, 15).map((st: StateJobCount) => (
              <option key={st.code} value={st.code}>
                {st.name} ({st.code})
              </option>
            ))}
          </select>

          <Input
            placeholder="City (e.g. Austin, Remote)..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="h-10 text-xs"
          />

          <Button
            type="submit"
            variant="accent"
            size="md"
            pill
            className="w-full font-bold bg-blue-600 hover:bg-blue-700 text-white"
          >
            SEARCH NOW <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </form>
      </Card>

      {/* Quick Application Status Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="bento" className="p-4 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold">Active Applications</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-heading mt-0.5">3</div>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Award className="w-5 h-5" />
          </div>
        </Card>

        <Card variant="bento" className="p-4 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold">Interviews Scheduled</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-heading mt-0.5">2</div>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <Calendar className="w-5 h-5" />
          </div>
        </Card>

        <Card variant="bento" className="p-4 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold">Offers Received</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-heading mt-0.5">1</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </Card>

        <Card variant="bento" className="p-4 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold">Saved Bookmarks</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-heading mt-0.5">3</div>
          </div>
          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <Heart className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Recommended Jobs List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Recommended for Your Profile
            </h2>
            <p className="text-xs text-slate-500">Based on your executive SaaS & sales background</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/portal/seeker/search')}>
            View All Openings <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedJobs.map((job) => (
            <Card key={job.id} variant="default" hover className="p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="primary" size="sm">
                    {job.category}
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium">{job.postedDate}</span>
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
                  onClick={() => toast({ title: 'Job Saved to Bookmarks', type: 'success' })}
                  className="px-3"
                >
                  <Heart className="w-4 h-4 text-rose-500" />
                </Button>
                <Button
                  variant="accent"
                  size="sm"
                  pill
                  onClick={() => setSelectedJobForApply(job)}
                  className="flex-1 font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Apply Now <Send className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            </Card>
          ))}
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
                  placeholder="Introduce yourself to the hiring manager..."
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
                  disabled={isApplying}
                  className="font-bold bg-emerald-600 text-white"
                >
                  {isApplying ? 'Submitting...' : 'Submit Application Now'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
