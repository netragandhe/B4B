import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  MapPin,
  Briefcase,
  TrendingUp,
  Users,
  Shield,
  Code,
  Headphones,
  Megaphone,
  Palette,
  Cpu,
  Home,
  Clock,
  GraduationCap,
  ArrowRight,
  DollarSign,
  Zap,
  Sparkles,
  Building2,
  CheckCircle2,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SEOHead } from '@/components/seo/SEOHead'
import { JOB_CATEGORIES, US_STATES_JOB_DATA, MOCK_JOBS, JobItem } from '@/mock-data/jobsBoardData'

const ICON_MAP: Record<string, React.ElementType> = {
  Briefcase,
  TrendingUp,
  Users,
  Shield,
  Code,
  Headphones,
  Megaphone,
  Palette,
  Cpu,
  Home,
  Clock,
  GraduationCap,
}

export const JobsHomePage: React.FC = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [stateCode, setStateCode] = useState('')
  const [activeTab, setActiveTab] = useState<'popular' | 'category' | 'location' | 'salary' | 'gigs'>('popular')

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const params = new URLSearchParams()
    if (keyword) params.set('q', keyword)
    if (category) params.set('category', category)
    if (stateCode) params.set('state', stateCode)
    navigate(`/jobs/search?${params.toString()}`)
  }

  const popularSearches = [
    { label: 'Work from home', count: '450+ jobs' },
    { label: 'Account Executives', count: '142+ jobs' },
    { label: 'B2B Sales', count: '289+ jobs' },
    { label: 'Software Sales', count: '312+ jobs' },
    { label: 'AI/ML Engineers', count: '88+ jobs' },
    { label: 'Insurance Sales', count: '118+ jobs' },
    { label: 'Customer Service', count: '204+ jobs' },
    { label: 'Internships 2026', count: '75+ jobs' },
  ]

  const salaryTiers = [
    { label: '$50,000 - $80,000', count: '340 jobs', desc: 'Entry to Mid-level Customer Support & B2C Sales' },
    { label: '$80,000 - $120,000', count: '520 jobs', desc: 'Commercial Insurance & Account Managers' },
    { label: '$120,000 - $180,000', count: '410 jobs', desc: 'Senior AE, B2B SaaS & Growth Marketers' },
    { label: '$180,000 - $250,000+', count: '185 jobs', desc: 'Enterprise AE, AI/ML Leads & VP of Sales' },
  ]

  const gigJobs = MOCK_JOBS.filter((j) => j.type === 'Gig' || j.category === 'Part-time')

  return (
    <div className="space-y-16 text-left pb-16">
      <SEOHead
        title="B4B Jobs & Careers Network | Find High-Paying B2B & Tech Sales Roles"
        description="Search thousands of high-paying Account Executive, B2B Sales, Software Sales, AI/ML, and Remote jobs across North America."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-slate-700/50">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>Over 2,400+ Active Roles Verified Today</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading tracking-tight leading-tight">
            Find Your Next High-Paying <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-300">
              B2B Sales & Tech Opportunity
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Discover top-tier Account Executive, Remote SaaS Sales, AI/ML, Insurance, and Work from Home positions with verified compensation transparency.
          </p>

          {/* Search Bar Container */}
          <form
            onSubmit={handleSearch}
            className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3"
          >
            {/* Keyword Input */}
            <div className="flex-1 flex items-center gap-3 px-3 py-2.5 bg-slate-900/60 rounded-xl border border-slate-700/60 focus-within:border-blue-400">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Job title, keyword, or company..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Category Select */}
            <div className="w-full sm:w-48 flex items-center gap-2 px-3 py-2.5 bg-slate-900/60 rounded-xl border border-slate-700/60 focus-within:border-blue-400">
              <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent text-sm text-white focus:outline-none cursor-pointer [&>option]:bg-slate-900 [&>option]:text-white"
              >
                <option value="">All Categories</option>
                {JOB_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* State Select */}
            <div className="w-full sm:w-40 flex items-center gap-2 px-3 py-2.5 bg-slate-900/60 rounded-xl border border-slate-700/60 focus-within:border-blue-400">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                className="w-full bg-transparent text-sm text-white focus:outline-none cursor-pointer [&>option]:bg-slate-900 [&>option]:text-white"
              >
                <option value="">All States</option>
                {US_STATES_JOB_DATA.map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.name} ({st.code})
                  </option>
                ))}
              </select>
            </div>

            {/* SEARCH NOW Button */}
            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full sm:w-auto font-bold tracking-wide shadow-lg shrink-0 px-8 py-3.5 text-sm uppercase bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white"
            >
              SEARCH NOW
            </Button>
          </form>
        </div>
      </section>

      {/* Main Filtered Tabs Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('popular')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'popular'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            🔥 Popular Searches
          </button>

          <button
            onClick={() => setActiveTab('category')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'category'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            📂 By Category
          </button>

          <button
            onClick={() => setActiveTab('location')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'location'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            🗺️ By Location (US Grid)
          </button>

          <button
            onClick={() => setActiveTab('salary')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'salary'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            💰 By Salary
          </button>

          <button
            onClick={() => setActiveTab('gigs')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'gigs'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            ⚡ Gigs & Project Work
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'popular' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Trending Job Keywords</h3>
            <div className="flex flex-wrap gap-3">
              {popularSearches.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(`/jobs/search?q=${encodeURIComponent(item.label)}`)}
                  className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 shadow-xs flex items-center gap-3 text-slate-800 dark:text-slate-200 text-sm font-semibold transition-all group"
                >
                  <Search className="w-3.5 h-3.5 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span>{item.label}</span>
                  <Badge variant="primary" size="sm">
                    {item.count}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'category' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {JOB_CATEGORIES.map((cat) => {
              const IconComp = ICON_MAP[cat.iconName] || Briefcase
              return (
                <Card
                  key={cat.id}
                  variant="default"
                  hover
                  onClick={() => navigate(`/jobs/search?category=${encodeURIComponent(cat.name)}`)}
                  className="p-5 cursor-pointer border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <Badge variant="emerald" size="sm">
                      {cat.jobCount} roles
                    </Badge>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {cat.popularKeywords.join(' • ')}
                  </p>
                </Card>
              )
            })}
          </div>
        )}

        {activeTab === 'location' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Explore Roles Across United States</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Click a state to view open positions</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {US_STATES_JOB_DATA.map((st) => (
                <button
                  key={st.code}
                  onClick={() => navigate(`/jobs/search?state=${st.code}`)}
                  className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400 text-left transition-all hover:shadow-md group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                      {st.code}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{st.count}+</span>
                  </div>
                  <div className="mt-2 text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                    {st.name}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">{st.topCity} area</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'salary' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {salaryTiers.map((tier, idx) => (
              <Card
                key={idx}
                variant="default"
                hover
                onClick={() => navigate(`/jobs/search`)}
                className="p-6 cursor-pointer border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-all"
              >
                <div className="p-2.5 w-fit rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mb-3">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">{tier.label}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{tier.desc}</p>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span>{tier.count}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'gigs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Hourly & High-Ticket Gig Roles</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Project-based and flexible contract work with daily/weekly payouts</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gigJobs.map((job) => (
                <Card key={job.id} variant="default" hover className="p-5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="amber" size="sm">
                        {job.type} Work
                      </Badge>
                      <span className="text-xs text-slate-400">{job.postedDate}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{job.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{job.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                      ${job.salaryMin} - ${job.salaryMax} / {job.salaryPeriod}
                    </span>
                    <Button size="sm" variant="primary" onClick={() => navigate(`/jobs/${job.id}`)}>
                      View & Apply
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Featured Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge variant="emerald" size="sm" className="mb-2">
              Featured Opportunities
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              Hand-Picked Executive & Sales Openings
            </h2>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/jobs/search')}>
            View All 2,400+ Openings <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_JOBS.slice(0, 6).map((job) => (
            <Card
              key={job.id}
              variant="default"
              hover
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="p-6 cursor-pointer flex flex-col justify-between space-y-5 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <div>
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{job.company}</div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">{job.title}</h3>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="primary" size="sm">
                    {job.category}
                  </Badge>
                  {job.isRemote && (
                    <Badge variant="emerald" size="sm">
                      100% Remote
                    </Badge>
                  )}
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Salary Range</div>
                  <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                    ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k / {job.salaryPeriod}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Apply Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Dual CTA Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white space-y-4 shadow-xl">
          <Badge variant="gold" size="sm">
            For Hiring Managers
          </Badge>
          <h3 className="text-2xl font-bold font-heading">Hiring B2B Sales & Tech Talent?</h3>
          <p className="text-sm text-blue-100 leading-relaxed">
            Post your position directly to over 45,000 verified Account Executives, underwriters, and software sales professionals.
          </p>
          <Button
            variant="accent"
            size="md"
            pill
            onClick={() => navigate('/portal/login')}
            className="bg-white text-blue-900 font-bold hover:bg-slate-100"
          >
            Post a Job in 2 Minutes
          </Button>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-4 shadow-xl border border-slate-700">
          <Badge variant="emerald" size="sm">
            For Job Seekers
          </Badge>
          <h3 className="text-2xl font-bold font-heading">Never Miss a High-Paying Role</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Set up custom job alerts matching your target salary, remote preference, and category to receive daily matches.
          </p>
          <Button
            variant="primary"
            size="md"
            pill
            onClick={() => navigate('/portal/login')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
          >
            Create Free Job Alert
          </Button>
        </div>
      </section>
    </div>
  )
}
