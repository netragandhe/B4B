import React, { useState } from 'react'
import {
  Video,
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Sparkles,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'

export const BizProTrainingPage: React.FC = () => {
  const { toast } = useToast()
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null)

  const courses = [
    {
      id: 'crs_1',
      title: 'B4B Capital Products Masterclass',
      duration: '45 mins',
      modules: 6,
      progress: 100,
      thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80',
      description: 'In-depth breakdown of non-dilutive revolving lines, equipment leases, and SBA 7(a) guarantee bridges.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      transcript: 'Welcome to B4B Capital Products Masterclass. In this module we cover qualifying small business revenue models...',
    },
    {
      id: 'crs_2',
      title: 'Closing 6-Figure Fractional CFO Retainers',
      duration: '60 mins',
      modules: 8,
      progress: 60,
      thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80',
      description: 'How to position 13-week treasury cash forecasting and board decks to CEO prospects.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgWgQ',
      transcript: 'Positioning fractional CFO retainers requires highlighting cash runway extension and gross margin audit...',
    },
    {
      id: 'crs_3',
      title: 'Underwriting & Objection Handling 101',
      duration: '35 mins',
      modules: 4,
      progress: 25,
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80',
      description: 'Overcoming bank loan objections and navigating UCC-1 lien searches with risk underwriting.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      transcript: 'When clients compare B4B non-dilutive credit lines to traditional bank loans, emphasize speed and zero equity dilution...',
    },
  ]

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Training Academy & Video Library"
        description="Master B4B capital products, underwriting objections, and fractional CFO retainer sales."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Training & Videos', icon: <Video className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="emerald" size="md">
            Certification Active
          </Badge>
        }
      />

      {/* COURSE CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((crs) => (
          <Card key={crs.id} variant="bento" className="p-4 flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-900">
                <img src={crs.thumbnail} alt={crs.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" />
                <button
                  onClick={() => setSelectedCourse(crs)}
                  className="absolute inset-0 flex items-center justify-center bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">{crs.duration} • {crs.modules} Modules</span>
                  <Badge variant={crs.progress === 100 ? 'emerald' : 'primary'} size="sm">
                    {crs.progress === 100 ? 'Completed' : `${crs.progress}% Progress`}
                  </Badge>
                </div>
                <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white group-hover:text-blue-600">
                  {crs.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                  {crs.description}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#1E3A5F]">
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${crs.progress}%` }} />
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedCourse(crs)}
                leftIcon={<Play className="w-3.5 h-3.5" />}
                className="w-full justify-center text-xs"
              >
                Watch Video Lesson
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* VIDEO PLAYER MODAL */}
      <Modal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        title={selectedCourse?.title || 'Training Video Lesson'}
        maxWidth="lg"
      >
        {selectedCourse && (
          <div className="space-y-4 text-left">
            <div className="aspect-video w-full rounded-2xl bg-slate-950 overflow-hidden shadow-2xl relative flex items-center justify-center border border-slate-800">
              <div className="text-center space-y-3 p-6">
                <div className="w-16 h-16 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center mx-auto">
                  <Play className="w-8 h-8 fill-blue-400 ml-1" />
                </div>
                <p className="text-sm font-bold text-white">{selectedCourse.title}</p>
                <p className="text-xs text-slate-400">Interactive HD Video Stream Ready</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#12294A] text-xs space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-slate-400">Lesson Transcript & Summary</h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-mono">
                {selectedCourse.transcript}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
