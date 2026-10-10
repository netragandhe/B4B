import { createStore } from '../createStore'

export interface BulletinComment {
  id: string
  authorName: string
  authorRole: string
  authorAvatar?: string
  content: string
  createdAt: string
}

export interface BulletinPost {
  id: string
  title: string
  contentHtml: string
  summary: string
  authorName: string
  authorRole: string
  authorAvatar?: string
  category: 'Company Announcement' | 'Commission Update' | 'Promotion' | 'Training Event' | 'System Alert'
  pinned: boolean
  publishedAt: string
  updatedAt: string
  likesCount: number
  likedByUserIds: string[]
  readByUserIds: string[]
  comments: BulletinComment[]
  attachments?: { name: string; url: string; size?: string }[]
}

const INITIAL_BULLETIN_POSTS: BulletinPost[] = [
  {
    id: 'post_1',
    title: 'Q4 2026 Commercial Debt Facility Expansion & Multiplier Surge',
    summary: 'B4B America announces strategic expansion of SBA bridge financing facilities across all 12 Federal Reserve districts with an enhanced 1.5x commission multiplier for Rank 4+ leaders.',
    contentHtml: `
      <h2>Executive Leadership Announcement</h2>
      <p>We are proud to announce a major expansion of our <strong>Commercial Debt & SBA 7(a) Bridge Lines</strong> across all 12 Federal Reserve Districts. Starting immediately, all accredited B4B Coaches will enjoy expanded funding capacity up to <em>$15M per commercial deal</em>.</p>
      <h3>Key Enhancements:</h3>
      <ul>
        <li><strong>Automated Term Sheets:</strong> Underwriting turnaround reduced to under 48 hours for Grade A commercial borrowers.</li>
        <li><strong>Leader Volume Overrides:</strong> Rank 4+ Regional Directors receive an additional <strong>0.25% override</strong> on downline closed transactions.</li>
        <li><strong>Direct ACH Settlement:</strong> Weekly commissions distributed every Friday at 12:00 PM EST.</li>
      </ul>
      <p>Review the updated Service Catalog in your portal for detailed underwriting matrices and compensation tiers.</p>
    `,
    authorName: 'Executive Chairman',
    authorRole: 'Super Admin',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'Company Announcement',
    pinned: true,
    publishedAt: '2026-10-09T09:00:00Z',
    updatedAt: '2026-10-09T09:00:00Z',
    likesCount: 38,
    likedByUserIds: ['bizpro_1', 'client_1'],
    readByUserIds: ['bizpro_1'],
    comments: [
      {
        id: 'c_1',
        authorName: 'Marcus Vance',
        authorRole: 'B4B Coach (Rank 6)',
        content: 'Incredible news for the Dallas & Atlanta regional teams! Deal velocity is already ramping up.',
        createdAt: '2026-10-09T10:15:00Z',
      },
    ],
  },
  {
    id: 'post_2',
    title: 'New Underwriting Intake System Live: 24-Hour Term Sheets',
    summary: 'Our upgraded debt facility underwriting portal is live. Upload corporate tax returns and receive provisional underwriting term sheets in under 24 hours.',
    contentHtml: `
      <h2>Intake & Underwriting Upgrade</h2>
      <p>The revised client intake workflow is now fully synchronized with our Risk Management engine. B4B Coaches can initiate client files with 1-click sponsor attribution.</p>
      <h3>What this means for your clients:</h3>
      <ol>
        <li>Streamlined financial statement ingestion with OCR.</li>
        <li>Instant risk-tier grading (Grade A, B, C).</li>
        <li>Automated client portal invitation emails.</li>
      </ol>
    `,
    authorName: 'Chief Underwriting Officer',
    authorRole: 'Admin',
    category: 'System Alert',
    pinned: false,
    publishedAt: '2026-10-08T14:30:00Z',
    updatedAt: '2026-10-08T14:30:00Z',
    likesCount: 24,
    likedByUserIds: [],
    readByUserIds: [],
    comments: [],
  },
  {
    id: 'post_3',
    title: 'Top Regional Producer Rankings & Incentive Trip Qualifications',
    summary: 'Announcing the 2026 President’s Circle incentive trip to Maui. Check the live scoreboard to see your rank qualification progress.',
    contentHtml: `
      <h2>2026 President's Circle Maui Retreat</h2>
      <p>Congratulations to our leading producers this quarter! All B4B Coaches reaching <strong>Rank 5 (Regional Leader)</strong> with a minimum of <em>$1.5M in funded quarterly volume</em> earn an all-inclusive trip for two to Hawaii.</p>
      <p>Check the Bulletin Scoreboard tab in your navigation menu for real-time rank positions.</p>
    `,
    authorName: 'VP of National Sales',
    authorRole: 'Admin',
    category: 'Promotion',
    pinned: false,
    publishedAt: '2026-10-06T11:00:00Z',
    updatedAt: '2026-10-06T11:00:00Z',
    likesCount: 45,
    likedByUserIds: ['bizpro_1'],
    readByUserIds: ['bizpro_1'],
    comments: [],
  },
  {
    id: 'post_4',
    title: 'Weekly Masterclass: Structuring $5M+ Equipment Lease Backs',
    summary: 'Join Senior Underwriter David Ross this Thursday at 2:00 PM EST for an exclusive masterclass on commercial equipment sale-leasebacks.',
    contentHtml: `
      <h2>B4B Coach Academy Masterclass</h2>
      <p>Learn how to unlock massive commercial volume using Equipment Sale-Leasebacks for manufacturing and logistics clients.</p>
      <ul>
        <li><strong>Date:</strong> Thursday, October 15, 2026</li>
        <li><strong>Time:</strong> 2:00 PM - 3:00 PM EST</li>
        <li><strong>Access:</strong> Stream directly in your Training & Videos portal tab</li>
      </ul>
    `,
    authorName: 'B4B Coach Academy',
    authorRole: 'Admin',
    category: 'Training Event',
    pinned: false,
    publishedAt: '2026-10-04T16:00:00Z',
    updatedAt: '2026-10-04T16:00:00Z',
    likesCount: 19,
    likedByUserIds: [],
    readByUserIds: [],
    comments: [],
  },
  {
    id: 'post_5',
    title: 'Updated 2026 Compensation Schedule & Direct Deposit Guidelines',
    summary: 'Detailed overview of 9-tier commission rates, personal volume benchmarks, and direct ACH payout timelines.',
    contentHtml: `
      <h2>2026 Compensation & Override Policy</h2>
      <p>Please review our official compensation schedule outlining direct production percentages (15% - 45%) and team volume overrides (2.5% - 10%).</p>
      <p>Ensure your routing number and direct deposit information are verified under <em>Profile & Subscription</em>.</p>
    `,
    authorName: 'Finance Department',
    authorRole: 'Admin',
    category: 'Commission Update',
    pinned: false,
    publishedAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-10-01T08:00:00Z',
    likesCount: 31,
    likedByUserIds: [],
    readByUserIds: [],
    comments: [],
  },
]

const bulletinStore = createStore<BulletinPost[]>('bulletin_posts', INITIAL_BULLETIN_POSTS)

export const bulletinService = {
  usePosts: () => bulletinStore.useStore(),
  getPosts: () => bulletinStore.get(),

  getPostById: (id: string) => {
    return bulletinStore.get().find((p) => p.id === id)
  },

  createPost: (post: Omit<BulletinPost, 'id' | 'publishedAt' | 'updatedAt' | 'likesCount' | 'likedByUserIds' | 'readByUserIds' | 'comments'>) => {
    const newPost: BulletinPost = {
      ...post,
      id: `post_${Date.now()}`,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likesCount: 0,
      likedByUserIds: [],
      readByUserIds: [],
      comments: [],
    }
    bulletinStore.set((prev) => [newPost, ...prev])
    return newPost
  },

  updatePost: (id: string, updates: Partial<BulletinPost>) => {
    bulletinStore.set((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    )
  },

  deletePost: (id: string) => {
    bulletinStore.set((prev) => prev.filter((p) => p.id !== id))
  },

  toggleLike: (postId: string, userId: string) => {
    bulletinStore.set((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p
        const alreadyLiked = p.likedByUserIds.includes(userId)
        const updatedLiked = alreadyLiked
          ? p.likedByUserIds.filter((uid) => uid !== userId)
          : [...p.likedByUserIds, userId]
        return {
          ...p,
          likedByUserIds: updatedLiked,
          likesCount: updatedLiked.length,
        }
      })
    )
  },

  markAsRead: (postId: string, userId: string) => {
    bulletinStore.set((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p
        if (p.readByUserIds.includes(userId)) return p
        return {
          ...p,
          readByUserIds: [...p.readByUserIds, userId],
        }
      })
    )
  },

  addComment: (postId: string, comment: Omit<BulletinComment, 'id' | 'createdAt'>) => {
    const newComment: BulletinComment = {
      ...comment,
      id: `c_${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    bulletinStore.set((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p
        return {
          ...p,
          comments: [...p.comments, newComment],
        }
      })
    )
    return newComment
  },

  reset: () => bulletinStore.reset(),
}
