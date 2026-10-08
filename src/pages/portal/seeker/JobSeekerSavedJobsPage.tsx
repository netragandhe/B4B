import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Heart,
  Briefcase,
  MapPin,
  Trash2,
  Send,
  CheckCircle2,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { MOCK_JOBS, JobItem } from '@/mock-data/jobsBoardData'
import { useToast } from '@/components/ui/Toast'

export const JobSeekerSavedJobsPage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [savedJobs, setSavedJobs] = useState<JobItem[]>(MOCK_JOBS.slice(0, 6))

  const removeBookmark = (id: string) => {
    setSavedJobs(savedJobs.filter((j) => j.id !== id))
    toast({ title: 'Removed job bookmark', type: 'info' })
  }

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto">
      <SEOHead title="Saved Bookmarked Jobs | Job Seeker Portal" description="Access saved job listings and apply with 1 click." />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'Job Seeker Portal', href: '/portal/dashboard' }, { label: 'Saved Jobs' }]} />
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white mt-2">
            My Saved Bookmarks
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">{savedJobs.length} roles bookmarked for quick application</p>
        </div>

        <Button variant="outline" size="sm" onClick={() => navigate('/jobs/search')}>
          <Briefcase className="w-4 h-4 mr-1.5" /> Search More Jobs
        </Button>
      </div>

      {savedJobs.length === 0 ? (
        <Card variant="default" className="p-12 text-center space-y-4 border border-slate-200 dark:border-slate-800">
          <Heart className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No saved jobs yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">Browse the job board and click the heart icon on roles you are interested in.</p>
          <Button variant="primary" size="sm" onClick={() => navigate('/jobs/search')}>
            Browse Job Search
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map((job) => (
            <Card key={job.id} variant="default" hover className="p-6 cursor-pointer flex flex-col justify-between space-y-4 border border-slate-200 dark:border-slate-800">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="primary" size="sm">
                    {job.category}
                  </Badge>
                  <button onClick={() => removeBookmark(job.id)} className="text-rose-500 hover:text-rose-600 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">{job.title}</h3>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">{job.company}</div>
                </div>

                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" /> {job.location} • {job.type}
                </div>

                <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                  ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k / {job.salaryPeriod}
                </div>
              </div>

              <Button
                variant="accent"
                size="sm"
                pill
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="w-full font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
              >
                Apply for this Role <Send className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
