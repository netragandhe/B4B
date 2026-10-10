import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Megaphone,
  Pin,
  Heart,
  MessageSquare,
  Search,
  Calendar,
  Share2,
  ChevronRight,
  Sparkles,
  Send,
  Trophy,
  TrendingUp,
  Target,
  Users,
  MapPin,
  Wallet,
  Clock,
  Video,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { Modal } from '@/components/ui/Modal'
import { SafeHtml } from '@/components/ui/SafeHtml'
import { useToast } from '@/components/ui/Toast'
import { useAuth } from '@/hooks/useAuth'
import { bulletinService, BulletinPost } from '@/lib/services/bulletinService'
import { scoreboardService } from '@/lib/services/scoreboardService'
import { formatCurrency } from '@/lib/utils'

export const BizProBulletinPage: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const posts = bulletinService.usePosts()
  const topProducers = scoreboardService.useProducers().slice(0, 3)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [activePostModal, setActivePostModal] = useState<BulletinPost | null>(null)
  const [openCommentsPostId, setOpenCommentsPostId] = useState<string | null>(null)
  const [newCommentText, setNewCommentText] = useState<string>('')

  const categories = [
    'All',
    'Company Announcement',
    'Commission Update',
    'Promotion',
    'Training Event',
    'System Alert',
  ]

  const userId = user?.email || 'bizpro_user'

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory
      return matchesSearch && matchesCat
    })
  }, [posts, searchQuery, selectedCategory])

  const pinnedPost = useMemo(() => {
    return posts.find((p) => p.pinned)
  }, [posts])

  const handleOpenPost = (post: BulletinPost) => {
    bulletinService.markAsRead(post.id, userId)
    setActivePostModal(post)
  }

  const handleToggleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    bulletinService.toggleLike(postId, userId)
  }

  const handleAddComment = (postId: string) => {
    if (!newCommentText.trim()) return

    bulletinService.addComment(postId, {
      authorName: user?.name || 'B4B Coach',
      authorRole: user?.rankTitle || 'B4B Coach',
      authorAvatar: user?.avatar,
      content: newCommentText.trim(),
    })

    setNewCommentText('')
    toast({
      title: 'Comment Posted',
      description: 'Your response has been added to the bulletin discussion.',
      type: 'success',
    })
  }

  const handleShare = (post: BulletinPost, e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/portal/bizpro/bulletin#${post.id}`)
      toast({
        title: 'Link Copied',
        description: 'Bulletin link copied to clipboard.',
        type: 'success',
      })
    }
  }

  const currentDateFormatted = useMemo(() => {
    return new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }, [])

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto pb-12">
      {/* PAGE HEADER WITH CURRENT DATE & WELCOME */}
      <PageHeader
        title={`Welcome, ${user?.name || 'Coach'} — National Bulletin`}
        description={`Today is ${currentDateFormatted}. Official B4B America executive announcements, commercial rollouts, and network communications.`}
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'B4B Bulletin', icon: <Megaphone className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="emerald" size="md">
            Live Feed
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/portal/bizpro/dashboard')}
              leftIcon={<TrendingUp className="w-3.5 h-3.5 text-blue-500" />}
            >
              Sales Dashboard
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => navigate('/portal/bizpro/leads')}
              leftIcon={<Target className="w-3.5 h-3.5" />}
            >
              Leads CRM
            </Button>
          </div>
        }
      />

      {/* PINNED POST HERO BANNER */}
      {pinnedPost && (
        <Card
          variant="bento"
          className="p-6 relative overflow-hidden border-2 border-blue-500/40 bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="gold" size="sm" className="flex items-center gap-1 font-bold">
                  <Pin className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>PINNED ANNOUNCEMENT</span>
                </Badge>
                <Badge variant="navy" size="sm">
                  {pinnedPost.category}
                </Badge>
                <span className="text-xs text-slate-400">
                  {new Date(pinnedPost.publishedAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {pinnedPost.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                {pinnedPost.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Avatar src={pinnedPost.authorAvatar} name={pinnedPost.authorName} size="xs" />
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{pinnedPost.authorName}</span>
                  <span className="text-slate-400">• {pinnedPost.authorRole}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-rose-500">
                    <Heart className="w-3.5 h-3.5 fill-rose-500" /> {pinnedPost.likesCount}
                  </span>
                  <span className="flex items-center gap-1 text-blue-400">
                    <MessageSquare className="w-3.5 h-3.5" /> {pinnedPost.comments.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col gap-2 shrink-0 justify-end">
              <Button
                variant="accent"
                size="md"
                onClick={() => handleOpenPost(pinnedPost)}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Read Announcement
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* 2-COLUMN MAIN CONTENT: FEED + SIDEBAR WIDGETS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: FEED (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* SEARCH & CATEGORY FILTERS */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bulletins & updates..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
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

          {/* BULLETIN FEED LIST */}
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <Card variant="default" className="p-12 text-center text-slate-500 space-y-2">
                <Megaphone className="w-10 h-10 mx-auto text-slate-400 opacity-40" />
                <p className="text-sm font-semibold">No announcements found matching your criteria.</p>
                <p className="text-xs text-slate-400">Try changing your search term or category filter.</p>
              </Card>
            ) : (
              filteredPosts.map((post) => {
                const isRead = post.readByUserIds.includes(userId)
                const isLiked = post.likedByUserIds.includes(userId)
                const isCommentsOpen = openCommentsPostId === post.id

                return (
                  <Card
                    key={post.id}
                    variant="default"
                    className={`p-5 transition-all hover:border-blue-300 dark:hover:border-blue-900 ${
                      !isRead ? 'border-l-4 border-l-blue-600' : ''
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Top Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              post.category === 'Company Announcement'
                                ? 'navy'
                                : post.category === 'Commission Update'
                                ? 'gold'
                                : post.category === 'Promotion'
                                ? 'emerald'
                                : post.category === 'Training Event'
                                ? 'royal'
                                : 'amber'
                            }
                            size="sm"
                          >
                            {post.category}
                          </Badge>

                          {!isRead && (
                            <Badge variant="primary" size="sm">
                              New
                            </Badge>
                          )}

                          {post.pinned && (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                              <Pin className="w-3 h-3" /> Pinned
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Title & Excerpt */}
                      <div>
                        <h3
                          onClick={() => handleOpenPost(post)}
                          className="text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                        >
                          {post.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed line-clamp-3">
                          {post.summary}
                        </p>
                      </div>

                      {/* Bottom Footer Action Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                        <div className="flex items-center gap-2">
                          <Avatar src={post.authorAvatar} name={post.authorName} size="xs" />
                          <span className="font-semibold text-slate-700 dark:text-slate-200">{post.authorName}</span>
                          <span className="text-slate-400 hidden sm:inline">• {post.authorRole}</span>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                          {/* Like button */}
                          <button
                            onClick={(e) => handleToggleLike(post.id, e)}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors ${
                              isLiked
                                ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 font-bold'
                                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
                            <span>{post.likesCount}</span>
                          </button>

                          {/* Comments toggle button */}
                          <button
                            onClick={() => setOpenCommentsPostId(isCommentsOpen ? null : post.id)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{post.comments.length}</span>
                          </button>

                          {/* Share button */}
                          <button
                            onClick={(e) => handleShare(post, e)}
                            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                            title="Share bulletin"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Read Full Post Button */}
                          <Button variant="outline" size="sm" onClick={() => handleOpenPost(post)}>
                            Read More
                          </Button>
                        </div>
                      </div>

                      {/* COMMENTS ACCORDION */}
                      {isCommentsOpen && (
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-900/40 p-3 rounded-xl">
                          <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                            Discussion ({post.comments.length})
                          </h4>

                          {post.comments.length > 0 ? (
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                              {post.comments.map((c) => (
                                <div key={c.id} className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-1">
                                  <div className="flex items-center justify-between text-[11px]">
                                    <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                                      <span>{c.authorName}</span>
                                      <span className="text-slate-400 font-normal">({c.authorRole})</span>
                                    </div>
                                    <span className="text-slate-400">
                                      {new Date(c.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-700 dark:text-slate-300">{c.content}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400 italic">No comments yet. Start the conversation!</p>
                          )}

                          {/* Comment Input */}
                          <div className="flex items-center gap-2 pt-1">
                            <input
                              type="text"
                              value={newCommentText}
                              onChange={(e) => setNewCommentText(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                              placeholder="Write a response or question..."
                              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <Button
                              variant="accent"
                              size="sm"
                              onClick={() => handleAddComment(post.id)}
                              leftIcon={<Send className="w-3 h-3" />}
                            >
                              Post
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                )
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR WIDGETS (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* QUICK PORTAL SHORTCUTS */}
          <Card variant="default" className="p-4 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Coach Quick Actions</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate('/portal/bizpro/leads')}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-blue-500 transition-colors text-left"
              >
                <Target className="w-4 h-4 text-blue-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Leads CRM</div>
                  <div className="text-[10px] text-slate-500">Pipeline & stages</div>
                </div>
              </button>

              <button
                onClick={() => navigate('/portal/bizpro/clients')}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-blue-500 transition-colors text-left"
              >
                <Users className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Clients</div>
                  <div className="text-[10px] text-slate-500">Debt facilities</div>
                </div>
              </button>

              <button
                onClick={() => navigate('/portal/territory')}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-blue-500 transition-colors text-left"
              >
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Territory</div>
                  <div className="text-[10px] text-slate-500">12 Fed districts</div>
                </div>
              </button>

              <button
                onClick={() => navigate('/portal/bizpro/commissions')}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-blue-500 transition-colors text-left"
              >
                <Wallet className="w-4 h-4 text-violet-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Payouts</div>
                  <div className="text-[10px] text-slate-500">Commissions</div>
                </div>
              </button>
            </div>
          </Card>

          {/* TOP PERFORMERS WIDGET (from Scoreboard) */}
          <Card variant="default" className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>Top Producers (October)</span>
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-[11px] h-6 px-2 text-blue-600"
                onClick={() => navigate('/portal/scoreboard')}
              >
                Full Scoreboard
              </Button>
            </div>

            <div className="space-y-2.5">
              {topProducers.map((prod, idx) => (
                <div
                  key={prod.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        idx === 0
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                          : idx === 1
                          ? 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
                          : 'bg-amber-900/20 text-amber-700 dark:text-amber-400'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <Avatar src={prod.avatar} name={prod.name} size="xs" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white leading-none">{prod.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{prod.region}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(prod.fundedVolume)}</div>
                    <div className="text-[10px] text-slate-400">{prod.dealsClosed} deals</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* UPCOMING NATIONAL CALLS & EVENTS */}
          <Card variant="default" className="p-4 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-500" />
              <span>Upcoming Live Sessions</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Commercial Underwriting Q&A</span>
                  <Badge variant="emerald" size="sm">Thu 2:00 PM</Badge>
                </div>
                <p className="text-[11px] text-slate-500">Live deal structuring with Chief Underwriting Officer.</p>
                <div className="flex items-center gap-1 text-[10px] text-blue-500 pt-1 font-semibold">
                  <Video className="w-3 h-3" /> Academy Stream Live
                </div>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">National Leadership Roundtable</span>
                  <Badge variant="navy" size="sm">Oct 20</Badge>
                </div>
                <p className="text-[11px] text-slate-500">Quarterly volume review and President Circle updates.</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 pt-1">
                  <Clock className="w-3 h-3" /> 11:00 AM - 12:30 PM EST
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* FULL POST DETAIL MODAL */}
      {activePostModal && (
        <Modal
          isOpen={true}
          onClose={() => setActivePostModal(null)}
          title={activePostModal.title}
          description={`Published ${new Date(activePostModal.publishedAt).toLocaleDateString()} • By ${activePostModal.authorName} (${activePostModal.authorRole})`}
          maxWidth="2xl"
        >
          <div className="space-y-5 text-left">
            <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Badge variant="navy" size="sm">
                {activePostModal.category}
              </Badge>
              {activePostModal.pinned && (
                <Badge variant="gold" size="sm">
                  Pinned Announcement
                </Badge>
              )}
            </div>

            {/* Sanitized HTML Content */}
            <SafeHtml html={activePostModal.contentHtml} />

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleToggleLike(activePostModal.id, e)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 font-bold text-xs"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  <span>{activePostModal.likesCount} Likes</span>
                </button>
              </div>

              <Button variant="outline" size="sm" onClick={() => setActivePostModal(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
