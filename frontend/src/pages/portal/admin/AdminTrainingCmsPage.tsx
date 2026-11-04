import React, { useState } from 'react'
import { GraduationCap, Video, Plus, Trash2, Edit3, Save, CheckCircle2 } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'

export interface TrainingModule {
  id: string
  title: string
  category: string
  minRankRequired: number
  duration: string
  videoUrl: string
  status: 'Published' | 'Draft'
}

export const INITIAL_TRAINING_MODULES: TrainingModule[] = [
  { id: 'tr_1', title: 'Enterprise Working Capital Underwriting Standards', category: 'Capital', minRankRequired: 1, duration: '24 mins', videoUrl: 'https://youtube.com/embed/demo1', status: 'Published' },
  { id: 'tr_2', title: 'District Leadership & Team Commission Structure', category: 'Leadership', minRankRequired: 4, duration: '38 mins', videoUrl: 'https://youtube.com/embed/demo2', status: 'Published' },
  { id: 'tr_3', title: 'SBA 7(a) Guarantee Application Mastery', category: 'Government Debt', minRankRequired: 2, duration: '45 mins', videoUrl: 'https://youtube.com/embed/demo3', status: 'Published' },
  { id: 'tr_4', title: 'National Channel VP Territory Expansion Masterclass', category: 'Executive', minRankRequired: 7, duration: '52 mins', videoUrl: 'https://youtube.com/embed/demo4', status: 'Draft' },
]

export const AdminTrainingCmsPage: React.FC = () => {
  const { toast } = useToast()

  const [modules, setModules] = useState<TrainingModule[]>(INITIAL_TRAINING_MODULES)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<TrainingModule>>({})

  const handleEdit = (mod: TrainingModule) => {
    setEditingId(mod.id)
    setFormData(mod)
  }

  const handleCreateNew = () => {
    const newMod: TrainingModule = {
      id: `tr_${Date.now()}`,
      title: 'New B4B Coach Training Video',
      category: 'Capital',
      minRankRequired: 1,
      duration: '15 mins',
      videoUrl: 'https://youtube.com/embed/demo',
      status: 'Draft',
    }
    setModules([newMod, ...modules])
    setEditingId(newMod.id)
    setFormData(newMod)
  }

  const handleSave = () => {
    if (!editingId) return
    setModules((prev) =>
      prev.map((m) => (m.id === editingId ? ({ ...m, ...formData } as TrainingModule) : m))
    )
    setEditingId(null)
    toast({
      title: 'Training Module Saved',
      description: 'Training video asset updated.',
      type: 'success',
    })
  }

  const handleDelete = (id: string) => {
    setModules((prev) => prev.filter((m) => m.id !== id))
    toast({ title: 'Module Deleted', description: 'Training module removed.', type: 'info' })
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="B4B Coach Training Content CMS"
        description="Manage video modules, onboarding courses, and rank-gated training videos for B4B Coaches."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Training CMS', icon: <GraduationCap className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="navy" size="md">
            Academy CMS
          </Badge>
        }
        actions={
          <Button variant="accent" size="sm" onClick={handleCreateNew} leftIcon={<Plus className="w-4 h-4" />}>
            Add Training Video
          </Button>
        }
      />

      {/* TRAINING MODULES LIST */}
      <Card variant="default" className="card-halka-blue overflow-hidden bg-[#EEF4FC] border-[#BFDBFE] rounded-xl shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#DFECFB] border-b border-blue-200 text-slate-700 font-bold">
                <th className="py-3 px-4">Course Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Min Rank Required</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {modules.map((m) => (
                <tr key={m.id} className="bg-white/70 hover:bg-blue-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <Video className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{m.title}</span>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="navy" size="sm">
                      {m.category}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-700">
                    Rank {m.minRankRequired}+
                  </td>
                  <td className="py-3 px-4 text-slate-500">{m.duration}</td>
                  <td className="py-3 px-4">
                    <Badge variant={m.status === 'Published' ? 'emerald' : 'amber'} size="sm" dot>
                      {m.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(m)} leftIcon={<Edit3 className="w-3.5 h-3.5" />} className="bg-white border-blue-200 text-slate-700 hover:bg-blue-50">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(m.id)} className="text-rose-600 border-rose-200 hover:bg-rose-50 bg-white">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* EDIT MODAL / INLINE EDITOR */}
      {editingId && (
        <Card variant="default" className="card-halka-blue p-6 border border-[#BFDBFE] bg-[#EEF4FC] rounded-xl space-y-4 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900">Edit Training Module Asset</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Category</label>
              <input
                type="text"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Min Rank Required (1-9)</label>
              <input
                type="number"
                min={1}
                max={9}
                value={formData.minRankRequired || 1}
                onChange={(e) => setFormData({ ...formData, minRankRequired: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditingId(null)} className="bg-white border-slate-200 text-slate-700">
              Cancel
            </Button>
            <Button variant="accent" size="sm" onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>
              Save Module
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
