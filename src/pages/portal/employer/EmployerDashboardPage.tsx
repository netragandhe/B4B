import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Briefcase,
  Users,
  Calendar,
  UserCheck,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Eye,
  Building2,
  Clock,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from 'recharts'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { CountUp } from '@/components/ui/CountUp'
import { SEOHead } from '@/components/seo/SEOHead'
import { MOCK_JOBS, MOCK_APPLICANTS } from '@/mock-data/jobsBoardData'

export const EmployerDashboardPage: React.FC = () => {
  const navigate = useNavigate()

  // Job Performance Chart Data
  const performanceData = [
    { month: 'May', views: 820, applications: 24 },
    { month: 'Jun', views: 1240, applications: 38 },
    { month: 'Jul', views: 1890, applications: 52 },
    { month: 'Aug', views: 2450, applications: 68 },
    { month: 'Sep', views: 3100, applications: 82 },
    { month: 'Oct', views: 3840, applications: 148 },
  ]

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <SEOHead
        title="Employer Talent Command Center | B4B Portal"
        description="Manage corporate job postings, applicant pipelines, interviews, and employer brand."
      />

      <PageHeader
        title="Talent & Hiring Command Center"
        description="Nexus FinTech Solutions • Manage active job postings, candidate pipelines, applicant views, and hiring analytics."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'Employer Dashboard' }]}
        badge={
          <Badge variant="navy" size="md">
            Employer Control Center
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/portal/employer/jobs')} leftIcon={<Briefcase className="w-3.5 h-3.5" />}>
              My Jobs (4)
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => navigate('/portal/employer/post-job')}
              leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
            >
              Post a Job
            </Button>
          </div>
        }
      />

      {/* 4 STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Job Openings"
          value="4 Roles"
          change={12.5}
          changePeriod="4 active positions"
          icon={<Briefcase className="w-5 h-5 text-blue-500" />}
          variant="royal"
        />

        <StatCard
          title="Total Applicants"
          value={<CountUp value={148} />}
          change={24.0}
          changePeriod="+18 new this week"
          icon={<Users className="w-5 h-5 text-emerald-500" />}
          variant="emerald"
        />

        <StatCard
          title="Job Listing Views"
          value={<CountUp value={3840} />}
          change={32.0}
          changePeriod="Trailing 30 days"
          icon={<Eye className="w-5 h-5 text-amber-500" />}
          variant="gold"
        />

        <StatCard
          title="Hires Made (YTD)"
          value="12 Hires"
          change={15.0}
          changePeriod="Avg time-to-hire: 12 days"
          icon={<UserCheck className="w-5 h-5 text-purple-500" />}
          variant="default"
        />
      </div>

      {/* JOB PERFORMANCE CHART & RECENT APPLICANTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Performance Chart */}
        <Card variant="bento" className="lg:col-span-7 p-5 space-y-4 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Job Performance Analytics (Views vs Applications)
              </h3>
              <p className="text-xs text-slate-500">Candidate impression velocity across posted roles.</p>
            </div>
            <Badge variant="emerald" size="sm">
              3.85% Conversion Rate
            </Badge>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#0D1E36',
                    borderRadius: '10px',
                    border: '1px solid #1E3A5F',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="views" name="Job Views" stroke="#2563EB" strokeWidth={2} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="applications" name="Applications" stroke="#10B981" strokeWidth={2} fill="url(#colorApps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Applicants Feed */}
        <Card variant="default" className="lg:col-span-5 p-5 space-y-4 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Candidate Feed</h3>
              <p className="text-xs text-slate-500">Live stream of new applicants</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/portal/employer/applicants')}>
              Kanban Board
            </Button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-3">
            {MOCK_APPLICANTS.map((applicant) => (
              <div key={applicant.id} className="pt-3 flex items-center justify-between gap-3 text-xs first:pt-0">
                <div className="flex items-center gap-3">
                  <Avatar src={applicant.avatar} name={applicant.name} size="md" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{applicant.name}</span>
                      <Badge variant="emerald" size="sm">
                        {applicant.matchScore}% Match
                      </Badge>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {applicant.appliedJobTitle} • {applicant.location}
                    </div>
                  </div>
                </div>

                <Badge
                  variant={
                    applicant.stage === 'Interview'
                      ? 'amber'
                      : applicant.stage === 'Offer' || applicant.stage === 'Hired'
                      ? 'emerald'
                      : 'primary'
                  }
                  size="sm"
                >
                  {applicant.stage}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
