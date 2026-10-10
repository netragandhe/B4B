import React, { useState } from 'react'
import {
  Video,
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Sparkles,
  Check,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'
import { createStore } from '@/lib/createStore'

interface CourseItem {
  id: string
  title: string
  duration: string
  modules: number
  progress: number
  thumbnail: string
  description: string
  videoUrl: string
  transcript: string
}

const INITIAL_COURSES: CourseItem[] = [
  {
    id: 'crs_1',
    title: 'B4B Capital Products Masterclass',
    duration: '45 mins',
    modules: 6,
    progress: 100,
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80',
    description: 'In-depth breakdown of non-dilutive revolving lines, equipment leases, and SBA 7(a) guarantee bridges.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    transcript: 'Welcome to B4B Capital Products Masterclass. In this module we cover qualifying small business revenue models and matching debt products to borrower capital needs.',
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
    transcript: 'Positioning fractional CFO retainers requires highlighting cash runway extension, debt service coverage, and gross margin optimization.',
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
    transcript: 'When clients compare B4B non-dilutive credit lines to traditional bank loans, emphasize speed, non-dilution, and minimal restrictive covenants.',
  },
]

const coursesStore = createStore<CourseItem[]>('coach_training_courses', INITIAL_COURSES)

export const BizProTrainingPage: React.FC = () => {
  const { toast } = useToast()
  const courses = coursesStore.useStore()
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null)

  const handleMarkComplete = (courseId: string) => {
    coursesStore.set((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, progress: 100 } : c))
    )
    if (selectedCourse?.id === courseId) {
      setSelectedCourse((prev) => (prev ? { ...prev, progress: 100 } : null))
    }
    toast({
      title: 'Course Completed! 🎉',
      description: 'You have earned 100 activity points on the National Bulletin Scoreboard.',
      type: 'success',
    })
  }

  const completedCount = courses.filter((c) => c.progress === 100).length

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Training Academy & Certification Hub"
        description="Master B4B commercial capital products, underwriting objections, and fractional CFO advisory sales."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/bizpro/bulletin' },
          { label: 'Training Academy', icon: <Video className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="emerald" size="md">
            {completedCount} of {courses.length} Certified
          </Badge>
        }
      />

      {/* COURSE CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((crs) => (
          <Card key={crs.id} variant="bento" className="p-4 flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-900">
                <img
                  src={crs.thumbnail}
                  alt={crs.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
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
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    {crs.duration} • {crs.modules} Modules
                  </span>
                  <Badge variant={crs.progress === 100 ? 'emerald' : 'primary'} size="sm">
                    {crs.progress === 100 ? 'Completed' : `${crs.progress}% Progress`}
                  </Badge>
                </div>
                <h4 className="text-sm font-bold font-heading text-white group-hover:text-blue-400">
                  {crs.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                  {crs.description}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${crs.progress}%` }} />
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedCourse(crs)}
                leftIcon={<Play className="w-3.5 h-3.5" />}
                className="w-full justify-center text-xs"
              >
                {crs.progress === 100 ? 'Review Lesson' : 'Watch Video Lesson'}
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
          <div className="space-y-4 text-left text-xs">
            <div className="aspect-video w-full rounded-2xl bg-slate-950 overflow-hidden shadow-2xl relative flex items-center justify-center border border-slate-800">
              <div className="text-center space-y-3 p-6">
                <div className="w-16 h-16 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center mx-auto">
                  <Play className="w-8 h-8 fill-blue-400 ml-1" />
                </div>
                <p className="text-sm font-bold text-white">{selectedCourse.title}</p>
                <p className="text-xs text-slate-400">Interactive HD Video Stream Connected (Sandbox)</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-slate-400">Lesson Transcript & Summary</h4>
              <p className="text-slate-300 leading-relaxed font-sans">
                {selectedCourse.transcript}
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <Button variant="outline" onClick={() => setSelectedCourse(null)}>
                Close
              </Button>
              {selectedCourse.progress < 100 ? (
                <Button
                  variant="accent"
                  onClick={() => handleMarkComplete(selectedCourse.id)}
                  className="font-bold gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  Mark Course Complete
                </Button>
              ) : (
                <Badge variant="emerald" size="md">
                  ✓ Certified & Points Awarded
                </Badge>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
