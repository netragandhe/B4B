import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  GraduationCap,
  Play,
  CheckCircle2,
  Clock,
  Award,
  FileText,
  Download,
  BookOpen,
  Sparkles,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

export const BizProTrainingPage: React.FC = () => {
  const { toast } = useToast()

  const modules = [
    {
      id: 'mod-1',
      title: 'Advanced SBA 7(a) & 504 Underwriting Masterclass',
      category: 'Credit & Underwriting',
      lessons: 12,
      duration: '4.5 Hours',
      status: 'Completed',
      score: '98%',
      description: 'Master debt service coverage ratio calculations, add-back adjustments, and packaging files for tier-1 approval.',
    },
    {
      id: 'mod-2',
      title: 'Commercial Term Sheet Presentation & Closing Script',
      category: 'Sales & Closing',
      lessons: 8,
      duration: '3.0 Hours',
      status: 'Completed',
      score: '100%',
      description: 'Overcome client rate objections, pitch revolving float structures, and accelerate term sheet signature velocity.',
    },
    {
      id: 'mod-3',
      title: 'Building a 7-Figure Downline: Leadership & Overrides',
      category: 'Team Leadership',
      lessons: 10,
      duration: '3.8 Hours',
      status: 'In Progress',
      progress: 70,
      description: 'How to recruit producing commercial brokers, train Junior Advisors, and build passive monthly overrides.',
    },
    {
      id: 'mod-4',
      title: 'Syndicated Debt & Secondary Market Participations',
      category: 'Capital Markets',
      lessons: 14,
      duration: '5.2 Hours',
      status: 'Available',
      description: 'Structure multi-million dollar syndications with private credit funds and family offices.',
    },
  ]

  const scripts = [
    { title: 'Cold Calling Freight & Logistics Owners Script.pdf', size: '1.2 MB' },
    { title: '13-Week Cash Flow & DSCR Calculator.xlsx', size: '3.4 MB' },
    { title: 'Commercial Debt Objection Handling Matrix.pdf', size: '890 KB' },
    { title: 'Downline Recruiter Pitch Deck.pptx', size: '4.8 MB' },
  ]

  return (
    <>
      <Helmet>
        <title>Training & Certification Academy | Biz Pro Terminal</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Biz Pro Academy & Certifications
              </h1>
              <Badge variant="emerald" size="sm">
                2 Certifications Earned
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Master commercial deal underwriting, script delivery, and downline leadership systems.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                title: 'Certificate Downloaded',
                description: 'Certified Commercial Debt Advisor (CCDA) credential verified.',
                type: 'success',
              })
            }
          >
            <Award className="w-4 h-4 mr-1.5" />
            View Verified Certificate
          </Button>
        </div>

        {/* Featured Video / Course Banner */}
        <Card className="p-6 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white border-0 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <Badge variant="gold" size="sm">
              Current Active Track
            </Badge>
            <h2 className="text-xl font-black">
              Building a 7-Figure Downline: Leadership & Overrides
            </h2>
            <p className="text-xs text-blue-200 leading-relaxed">
              Lesson 7: Structuring compensation incentives and managing territory quotas across Rank 1–3 Junior Advisors.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs">
              <span className="font-semibold text-emerald-400">70% Completed</span>
              <div className="w-40 bg-blue-950 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() =>
              toast({
                title: 'Resuming Video Lesson',
                description: 'Playing Lesson 7: Territory Quota Structuring.',
                type: 'info',
              })
            }
          >
            <Play className="w-4 h-4 mr-2 fill-current" /> Resume Lesson
          </Button>
        </Card>

        {/* Course Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {modules.map((mod) => (
            <Card
              key={mod.id}
              className="p-5 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="navy" size="sm">
                    {mod.category}
                  </Badge>
                  <Badge
                    variant={
                      mod.status === 'Completed'
                        ? 'emerald'
                        : mod.status === 'In Progress'
                        ? 'gold'
                        : 'default'
                    }
                    size="sm"
                  >
                    {mod.status} {mod.score ? `(${mod.score})` : ''}
                  </Badge>
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-3">
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {mod.description}
                </p>

                <div className="flex items-center gap-4 mt-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {mod.lessons} Lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {mod.duration}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    toast({
                      title: `Accessing ${mod.title}`,
                      description: 'Loading interactive curriculum modules.',
                      type: 'info',
                    })
                  }
                >
                  {mod.status === 'Completed' ? 'Review Course' : 'Start Track'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Downloads Library */}
        <Card className="p-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4">
            Underwriter Collateral & Field Scripts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {scripts.map((s, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate max-w-[200px] sm:max-w-xs">
                      {s.title}
                    </span>
                    <span className="text-[10px] text-slate-400">{s.size}</span>
                  </div>
                </div>
                <button
                  onClick={() =>
                    toast({
                      title: `Downloading ${s.title}`,
                      description: 'Resource saved to your computer.',
                      type: 'success',
                    })
                  }
                  className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
