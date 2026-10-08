import React from 'react'
import { TrendingUp, Trophy } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { formatCurrency } from '@/lib/utils'

export const BizProScoreboardPage: React.FC = () => {
  const reps = [
    { rank: 1, name: 'Monica Bell', volume: 1200000, deals: 14, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' },
    { rank: 2, name: 'David Ross (You)', volume: 610000, deals: 8, isYou: true, avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80' },
    { rank: 3, name: 'Jason Miller', volume: 580000, deals: 7, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
    { rank: 4, name: 'Rachel Adams', volume: 420000, deals: 5, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
  ]

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Bulletin Scoreboard & National Rankings"
        description="Live leaderboards for top performing sales executives across all territories."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Bulletin Scoreboard', icon: <Trophy className="w-3.5 h-3.5 text-amber-500" /> },
        ]}
      />

      <Card variant="default" className="divide-y divide-slate-100 dark:divide-[#1E3A5F]">
        {reps.map((r) => (
          <div key={r.rank} className="p-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm text-slate-400">#{r.rank}</span>
              <Avatar src={r.avatar} name={r.name} size="sm" />
              <span className="font-bold text-slate-900 dark:text-white">{r.name}</span>
            </div>
            <span className="font-extrabold text-emerald-600 text-sm">{formatCurrency(r.volume)}</span>
          </div>
        ))}
      </Card>
    </div>
  )
}
