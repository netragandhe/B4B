import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  MapPin,
  Building2,
  DollarSign,
  Briefcase,
  Mail,
  ArrowLeft,
  Share2,
  CheckCircle2,
  ShieldAlert,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import '@/components/website/corporateTheme.css'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { jobService } from '@/lib/jobService'
import { Job } from '@/mock-data/jobs'
import { JobPostPage } from './JobPostPage'
import { useToast } from '@/components/ui/Toast'

export const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()

  // Fallback: If route parameter is 'post', render the JobPostPage directly
  if (id === 'post') {
    return <JobPostPage />
  }

  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let active = true
    const loadJob = async () => {
      if (!id) return
      try {
        setIsLoading(true)
        const found = await jobService.getJobById(id)
        if (active) setJob(found)
      } catch (err) {
        console.error('Failed to load job details:', err)
      } finally {
        if (active) setIsLoading(false)
      }
    }

    loadJob()
    return () => {
      active = false
    }
  }, [id])

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    toast({
      title: 'Link Copied',
      description: 'Job listing URL copied to clipboard.',
      type: 'success',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#EEF1EC] text-[#14231E] py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-6 w-36 bg-slate-200 rounded animate-pulse" />
          <div className="h-64 bg-white rounded-2xl animate-pulse p-8 border border-slate-200 space-y-4">
            <div className="h-8 bg-slate-200 rounded w-2/3" />
            <div className="h-4 bg-slate-200 rounded w-1/3" />
            <div className="h-24 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#EEF1EC] text-[#14231E] py-20 px-4">
        <SEOHead
          title="Job Not Found | B4B America"
          description="The requested job listing could not be found or has been removed."
        />
        <div className="max-w-md mx-auto bg-white rounded-2xl p-10 text-center shadow-lg border border-slate-200 space-y-5">
          <ShieldAlert className="w-12 h-12 text-slate-400 mx-auto" />
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold font-heading text-[#06201A]">
              Job Listing Not Found
            </h1>
            <p className="text-xs text-slate-600">
              The position you are looking for may have expired or been removed by an administrator.
            </p>
          </div>
          <Link to="/jobs" className="btn-emerald-light inline-flex text-xs">
            <span>Browse Active Jobs</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#EEF1EC] text-[#14231E] font-body transition-colors">
      <SEOHead
        title={`${job.title} at ${job.company} | B4B America Jobs`}
        description={`${job.title} located in ${job.city}, ${job.state}. Compensation: ${job.salary}. Category: ${job.category}.`}
      />

      {/* Header Banner: Forest Black */}
      <section className="bg-[#06201A] text-white pt-8 pb-16 px-4 border-b border-[#0B4A3A]">
        <div className="max-w-5xl mx-auto space-y-5">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Job Finder', href: '/jobs' },
              { label: 'Search Results', href: '/jobs/search' },
              { label: job.title },
            ]}
          />

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-[#0E7A5A]/20 text-[#0E7A5A] border border-[#0E7A5A]/40">
                {job.category}
              </span>

              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#0B4A3A] text-white">
                {job.jobType}
              </span>

              {job.isDemo && (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900 border border-amber-400">
                  DEMO DATA
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight leading-snug">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#B9CBC3]">
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Building2 className="w-4 h-4 text-[#C8793A]" />
                <span>{job.company}</span>
              </span>

              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C8793A]" />
                <span>
                  {job.city}, {job.state}
                </span>
              </span>

              <span className="flex items-center gap-1.5 font-mono text-[#C8793A] font-bold">
                <DollarSign className="w-4 h-4 text-[#C8793A]" />
                <span>{job.salary}</span>
              </span>

              <span className="text-slate-400 font-mono text-[11px]">
                Posted: {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Card */}
      <main className="max-w-5xl mx-auto px-4 -mt-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: JOB DESCRIPTION & REQUIREMENTS */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-200 space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-bold font-heading text-[#06201A] border-b border-slate-100 pb-3">
                Role Overview
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {job.requirements && job.requirements.length > 0 && (
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <h3 className="text-base font-bold font-heading text-[#06201A]">
                  Candidate Requirements
                </h3>
                <ul className="space-y-2.5">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#0E7A5A] shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t border-slate-100 pt-6 flex items-center justify-between text-xs text-slate-500">
              <Link
                to="/jobs/search"
                className="font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Job Search</span>
              </Link>

              <button
                onClick={handleShare}
                className="font-semibold text-[#0E7A5A] hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Link Copied!' : 'Share Position'}</span>
              </button>
            </div>
          </div>

          {/* RIGHT: HOW TO APPLY / CONTACT INFO */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 space-y-6">
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <span className="text-[11px] font-mono uppercase font-bold text-[#C8793A]">
                  Direct Contact
                </span>
                <h3 className="text-base font-bold font-heading text-[#06201A]">
                  Contact Employer
                </h3>
                <p className="text-xs text-slate-500">
                  Send your resume and credentials directly to the hiring coordinator.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#EEF1EC] text-slate-800 space-y-1">
                  <span className="text-[11px] font-mono text-slate-500 uppercase">
                    Hiring Contact Email
                  </span>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#0E7A5A] shrink-0" />
                    <span className="text-xs font-bold font-mono text-[#06201A] truncate">
                      {job.contactEmail}
                    </span>
                  </div>
                </div>

                <a
                  href={`mailto:${job.contactEmail}?subject=Application for ${encodeURIComponent(
                    job.title
                  )} via B4B America`}
                  className="btn-emerald-light w-full justify-center text-xs py-3"
                >
                  <Mail className="w-4 h-4 text-white" />
                  <span>Email Hiring Team</span>
                </a>
              </div>

              <div className="border-t border-slate-100 pt-4 text-[11px] text-slate-400 space-y-1">
                <p>Listing ID: <span className="font-mono">{job.id}</span></p>
                <p>Status: <span className="font-mono text-[#0E7A5A] font-bold uppercase">{job.status}</span></p>
              </div>
            </div>

            {/* Quick Link to Post a Job */}
            <div className="bg-[#06201A] text-white rounded-2xl p-6 border border-[#0B4A3A] space-y-3">
              <span className="text-[10px] font-mono uppercase font-bold text-[#C8793A]">
                Employers
              </span>
              <h4 className="text-sm font-bold font-heading text-white">
                Looking to hire for your team?
              </h4>
              <p className="text-xs text-[#B9CBC3]">
                Post a new role in minutes. Listings reach verified professionals across 12 federal reserve districts.
              </p>
              <Link to="/jobs/post" className="btn-copper-dark w-full justify-center text-xs py-2.5">
                <span>Post a Job Listing</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
