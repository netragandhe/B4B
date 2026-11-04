import React, { useState } from 'react'
import {
  Globe,
  Save,
  Eye,
  Plus,
  Trash2,
  HelpCircle,
  FileText,
  Sparkles,
  CheckCircle2,
  Edit3,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'
import { CMS_16_SOLUTION_PAGES, CmsSolutionPage } from '@/mock-data/adminFullData'

export const AdminCmsEditorPage: React.FC = () => {
  const { toast } = useToast()

  const [pages, setPages] = useState<CmsSolutionPage[]>(CMS_16_SOLUTION_PAGES)
  const [selectedSlug, setSelectedSlug] = useState<string>(CMS_16_SOLUTION_PAGES[0].slug)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Current active page state
  const activePage = pages.find((p) => p.slug === selectedSlug) || pages[0]

  // Form field state
  const [formData, setFormData] = useState<CmsSolutionPage>(activePage)

  const handleSelectPage = (slug: string) => {
    setSelectedSlug(slug)
    const page = pages.find((p) => p.slug === slug)
    if (page) {
      setFormData(page)
    }
  }

  const handleFieldChange = (field: keyof CmsSolutionPage, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // FAQ Management
  const handleAddFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: 'New Frequently Asked Question', answer: 'Clear detailed response answer.' }],
    }))
  }

  const handleFaqChange = (index: number, key: 'question' | 'answer', value: string) => {
    setFormData((prev) => {
      const updated = [...prev.faqs]
      updated[index] = { ...updated[index], [key]: value }
      return { ...prev, faqs: updated }
    })
  }

  const handleRemoveFaq = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }))
  }

  const handleSave = () => {
    setPages((prev) =>
      prev.map((p) => (p.slug === formData.slug ? { ...formData, lastUpdated: new Date().toISOString().split('T')[0] } : p))
    )
    toast({
      title: 'CMS Page Published',
      description: `Updated website solution page "${formData.title}" successfully.`,
      type: 'success',
    })
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Website Solution Pages CMS Editor"
        description="Manage page titles, SEO metadata, hero section headlines, body copy, and FAQs for all 16 solution landing pages."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Website Content CMS', icon: <Globe className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="navy" size="md">
            16 Solution Pages
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              leftIcon={<Eye className="w-3.5 h-3.5" />}
            >
              {isPreviewOpen ? 'Hide Live Preview' : 'Show Live Preview'}
            </Button>
            <Button variant="accent" size="sm" onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>
              Publish Changes
            </Button>
          </div>
        }
      />

      {/* SELECTOR BAR FOR ALL 16 PAGES */}
      <Card variant="default" className="p-4 border border-slate-200 dark:border-slate-800 space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
          Select Solution Page to Edit (16 Available):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {pages.map((p) => (
            <button
              key={p.slug}
              onClick={() => handleSelectPage(p.slug)}
              className={`p-2 rounded-lg text-left text-xs transition-all border ${
                formData.slug === p.slug
                  ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-400'
              }`}
            >
              <div className="truncate font-semibold">{p.title.split(' ')[0]}</div>
              <div className="text-[10px] opacity-80 truncate">{p.slug}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* MAIN EDITOR FORM & LIVE PREVIEW GRID */}
      <div className={`grid grid-cols-1 ${isPreviewOpen ? 'lg:grid-cols-2' : ''} gap-6`}>
        {/* EDITOR FORM */}
        <Card variant="default" className="p-6 border border-slate-200 dark:border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-blue-500" />
              <span>Editing: {formData.title}</span>
            </h3>
            <span className="text-xs text-slate-400">Last updated: {formData.lastUpdated}</span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Page Title & Slug */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Page Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">URL Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  disabled
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Meta Description */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">SEO Meta Description</label>
              <textarea
                rows={2}
                value={formData.metaDescription}
                onChange={(e) => handleFieldChange('metaDescription', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Hero Headline */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Hero Main Title</label>
              <input
                type="text"
                value={formData.heroTitle}
                onChange={(e) => handleFieldChange('heroTitle', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Subheadline */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Subheadline / Pitch</label>
              <input
                type="text"
                value={formData.subheadline}
                onChange={(e) => handleFieldChange('subheadline', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Main Body Copy */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Main Solution Copy / Text</label>
              <textarea
                rows={5}
                value={formData.bodyText}
                onChange={(e) => handleFieldChange('bodyText', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* FAQ List Editor */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-purple-500" />
                  <span>Frequently Asked Questions ({formData.faqs.length})</span>
                </h4>
                <Button variant="outline" size="sm" onClick={handleAddFaq} leftIcon={<Plus className="w-3 h-3" />}>
                  Add FAQ
                </Button>
              </div>

              {formData.faqs.map((faq, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900/60 border rounded-xl border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-500 text-[11px]">FAQ #{idx + 1}</span>
                    <button onClick={() => handleRemoveFaq(idx)} className="text-rose-500 hover:text-rose-700">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Question..."
                    value={faq.question}
                    onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                  />
                  <textarea
                    rows={2}
                    placeholder="Answer..."
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* LIVE PREVIEW CARD */}
        {isPreviewOpen && (
          <Card variant="bento" className="p-6 border border-slate-200 dark:border-slate-800 space-y-6 bg-slate-950 text-white">
            <div className="flex items-center justify-between border-b pb-3 border-slate-800">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Live Website Preview Mode
              </span>
              <Badge variant="navy" size="sm">
                /solutions/{formData.slug}
              </Badge>
            </div>

            {/* Hero Mock */}
            <div className="space-y-3 py-4 text-center">
              <h1 className="text-2xl font-black font-heading bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
                {formData.heroTitle || 'Your Hero Title Here'}
              </h1>
              <p className="text-sm text-slate-300 max-w-lg mx-auto">{formData.subheadline}</p>
            </div>

            {/* Body Copy Mock */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
              <h4 className="font-bold text-white text-sm">Solution Overview</h4>
              <p className="leading-relaxed">{formData.bodyText}</p>
            </div>

            {/* FAQs Preview Mock */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>Frequently Asked Questions</span>
              </h4>
              <div className="space-y-2">
                {formData.faqs.map((f, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <div className="font-bold text-xs text-blue-300">Q: {f.question}</div>
                    <div className="text-xs text-slate-400">A: {f.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
