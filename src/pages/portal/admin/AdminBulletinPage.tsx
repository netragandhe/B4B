import React, { useState, useMemo } from 'react'
import {
  Megaphone,
  Plus,
  Edit2,
  Trash2,
  Pin,
  Search,
  Calendar,
  Eye,
  Heart,
  MessageSquare,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/Switch'
import { RichTextEditor } from '@/components/ui/RichTextEditor'
import { SafeHtml } from '@/components/ui/SafeHtml'
import { useToast } from '@/components/ui/Toast'
import { useAuth } from '@/hooks/useAuth'
import { bulletinService, BulletinPost } from '@/lib/services/bulletinService'

export const AdminBulletinPage: React.FC = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const posts = bulletinService.usePosts()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [editorModalOpen, setEditorModalOpen] = useState(false)
  const [previewModalPost, setPreviewModalPost] = useState<BulletinPost | null>(null)
  const [editingPostId, setEditingPostId] = useState<string | null>(null)

  // Form State
  const [formTitle, setFormTitle] = useState('')
  const [formSummary, setFormSummary] = useState('')
  const [formCategory, setFormCategory] = useState<BulletinPost['category']>('Company Announcement')
  const [formPinned, setFormPinned] = useState(false)
  const [formContentHtml, setFormContentHtml] = useState('')

  const categories = [
    'All',
    'Company Announcement',
    'Commission Update',
    'Promotion',
    'Training Event',
    'System Alert',
  ]

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory
      return matchesSearch && matchesCat
    })
  }, [posts, searchQuery, selectedCategory])

  const handleOpenCreateModal = () => {
    setEditingPostId(null)
    setFormTitle('')
    setFormSummary('')
    setFormCategory('Company Announcement')
    setFormPinned(false)
    setFormContentHtml('<h2>Announcement Headline</h2><p>Write your official update here...</p>')
    setEditorModalOpen(true)
  }

  const handleOpenEditModal = (post: BulletinPost) => {
    setEditingPostId(post.id)
    setFormTitle(post.title)
    setFormSummary(post.summary)
    setFormCategory(post.category)
    setFormPinned(post.pinned)
    setFormContentHtml(post.contentHtml)
    setEditorModalOpen(true)
  }

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formTitle.trim()) {
      toast({ title: 'Validation Error', description: 'Please provide a title for the announcement.', type: 'error' })
      return
    }

    if (editingPostId) {
      bulletinService.updatePost(editingPostId, {
        title: formTitle,
        summary: formSummary,
        category: formCategory,
        pinned: formPinned,
        contentHtml: formContentHtml,
      })
      toast({
        title: 'Announcement Updated',
        description: `"${formTitle}" has been saved successfully.`,
        type: 'success',
      })
    } else {
      bulletinService.createPost({
        title: formTitle,
        summary: formSummary,
        category: formCategory,
        pinned: formPinned,
        contentHtml: formContentHtml,
        authorName: user?.name || 'Super Admin',
        authorRole: 'Super Admin',
        authorAvatar: user?.avatar,
      })
      toast({
        title: 'Announcement Published',
        description: `New bulletin "${formTitle}" is now live for all B4B Coaches.`,
        type: 'success',
      })
    }

    setEditorModalOpen(false)
  }

  const handleDeletePost = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      bulletinService.deletePost(id)
      toast({
        title: 'Announcement Deleted',
        description: `"${title}" was removed from the bulletin system.`,
        type: 'info',
      })
    }
  }

  const handleTogglePin = (post: BulletinPost) => {
    bulletinService.updatePost(post.id, { pinned: !post.pinned })
    toast({
      title: !post.pinned ? 'Post Pinned' : 'Post Unpinned',
      description: `"${post.title}" pinned status updated.`,
      type: 'success',
    })
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto pb-12">
      <PageHeader
        title="Bulletin & Announcement CMS"
        description="Author, publish, pin, and manage national communications distributed across the B4B Coach network."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Bulletin CMS', icon: <Megaphone className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="navy" size="md">
            Super Admin Control
          </Badge>
        }
        actions={
          <Button
            variant="accent"
            size="sm"
            onClick={handleOpenCreateModal}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Create Announcement
          </Button>
        }
      />

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search announcements..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* DATA TABLE / POSTS LIST */}
      <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-3 px-4">Pinned</th>
                <th className="py-3 px-4">Title & Excerpt</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Engagement</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleTogglePin(post)}
                        className={`p-1.5 rounded transition-colors ${
                          post.pinned ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' : 'text-slate-300 hover:text-slate-600'
                        }`}
                        title={post.pinned ? 'Unpin' : 'Pin to top'}
                      >
                        <Pin className={`w-4 h-4 ${post.pinned ? 'fill-amber-500' : ''}`} />
                      </button>
                    </td>

                    <td className="py-3 px-4 max-w-md">
                      <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{post.title}</div>
                      <div className="text-slate-500 text-[11px] line-clamp-1 mt-0.5">{post.summary}</div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <Badge
                        variant={
                          post.category === 'Company Announcement'
                            ? 'navy'
                            : post.category === 'Commission Update'
                            ? 'gold'
                            : post.category === 'Promotion'
                            ? 'emerald'
                            : 'royal'
                        }
                        size="sm"
                      >
                        {post.category}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-slate-500">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3 text-slate-500 text-xs">
                        <span className="flex items-center gap-1 text-rose-500">
                          <Heart className="w-3.5 h-3.5 fill-rose-500" /> {post.likesCount}
                        </span>
                        <span className="flex items-center gap-1 text-blue-500">
                          <MessageSquare className="w-3.5 h-3.5" /> {post.comments.length}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPreviewModalPost(post)}
                          title="Preview"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEditModal(post)}
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-blue-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePost(post.id, post.title)}
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No announcements found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* CREATE / EDIT MODAL */}
      {editorModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setEditorModalOpen(false)}
          title={editingPostId ? 'Edit Announcement' : 'Create New Executive Bulletin'}
          description="Author content using the rich text editor. Changes reflect immediately across all B4B Coach dashboards."
          maxWidth="2xl"
        >
          <form onSubmit={handleSavePost} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Announcement Title *
              </label>
              <Input
                placeholder="e.g. Q4 Commercial Debt Facility Expansion..."
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as any)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  <option value="Company Announcement">Company Announcement</option>
                  <option value="Commission Update">Commission Update</option>
                  <option value="Promotion">Promotion</option>
                  <option value="Training Event">Training Event</option>
                  <option value="System Alert">System Alert</option>
                </select>
              </div>

              <div className="flex items-center pt-5">
                <Switch
                  checked={formPinned}
                  onChange={setFormPinned}
                  label="Pin to Hero Banner"
                  description="Displays prominently at top"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Summary / Excerpt
              </label>
              <textarea
                value={formSummary}
                onChange={(e) => setFormSummary(e.target.value)}
                rows={2}
                placeholder="Brief 1-2 sentence executive summary for the feed card..."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Article Content (Rich Text)
              </label>
              <RichTextEditor
                content={formContentHtml}
                onChange={setFormContentHtml}
                placeholder="Write full article body..."
              />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <Button variant="outline" size="sm" type="button" onClick={() => setEditorModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="accent" size="sm" type="submit">
                {editingPostId ? 'Save Changes' : 'Publish Announcement'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* PREVIEW MODAL */}
      {previewModalPost && (
        <Modal
          isOpen={true}
          onClose={() => setPreviewModalPost(null)}
          title={previewModalPost.title}
          description={`Category: ${previewModalPost.category} • Author: ${previewModalPost.authorName}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-left">
            <SafeHtml html={previewModalPost.contentHtml} />
            <div className="pt-4 border-t flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setPreviewModalPost(null)}>
                Close Preview
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
