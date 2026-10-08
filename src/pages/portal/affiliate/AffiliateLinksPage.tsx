import React, { useState } from 'react'
import { Share2, Plus, Copy, Check, QrCode, X, Search, MousePointerClick, TrendingUp } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'
import { MOCK_TRACKING_LINKS, TrackingLinkItem } from '@/mock-data/affiliateData'

export const AffiliateLinksPage: React.FC = () => {
  const { toast } = useToast()

  const [links, setLinks] = useState<TrackingLinkItem[]>(MOCK_TRACKING_LINKS)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeQrModal, setActiveQrModal] = useState<TrackingLinkItem | null>(null)

  // New Link Form State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newLinkName, setNewLinkName] = useState('')
  const [newChannel, setNewChannel] = useState<'Social Media' | 'Email Newsletter' | 'Website Banner' | 'Direct Referral'>('Social Media')

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    toast({ title: 'Link Copied!', description: 'Referral tracking URL copied to clipboard.', type: 'success' })
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleCreateLink = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLinkName.trim()) return

    const slug = newLinkName.toLowerCase().replace(/\s+/g, '-')
    const url = `https://b4b.com/ref/vance100?utm_source=${slug}`

    const created: TrackingLinkItem = {
      id: `lnk_${Date.now()}`,
      name: newLinkName,
      url: url,
      channel: newChannel,
      clicks: 0,
      conversions: 0,
      conversionRate: '0.0%',
      createdAt: new Date().toISOString().split('T')[0],
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(url)}`,
    }

    setLinks([created, ...links])
    setIsModalOpen(false)
    setNewLinkName('')
    toast({ title: 'Tracking Link Generated', description: `Created link "${newLinkName}".`, type: 'success' })
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="My Unique Referral Tracking Links"
        description="Generate custom referral links tagged by marketing channel with automatic click, conversion, and QR code tracking."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'My Unique Links' }]}
        badge={
          <Badge variant="navy" size="md">
            {links.length} Active Links
          </Badge>
        }
        actions={
          <Button variant="accent" size="sm" onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Create New Link
          </Button>
        }
      />

      {/* TRACKING LINKS TABLE */}
      <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-3 px-4">Campaign / Link Name</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Referral URL</th>
                <th className="py-3 px-4">Clicks</th>
                <th className="py-3 px-4">Conversions</th>
                <th className="py-3 px-4">Conv. Rate</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {links.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{l.name}</td>
                  <td className="py-3 px-4">
                    <Badge variant="navy" size="sm">
                      {l.channel}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">{l.url}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{l.clicks}</td>
                  <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">{l.conversions}</td>
                  <td className="py-3 px-4 font-bold text-purple-600 dark:text-purple-400">{l.conversionRate}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyLink(l.id, l.url)}
                        leftIcon={copiedId === l.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        className="text-xs"
                      >
                        {copiedId === l.id ? 'Copied' : 'Copy'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setActiveQrModal(l)}
                        leftIcon={<QrCode className="w-3.5 h-3.5 text-purple-500" />}
                        className="text-xs"
                      >
                        QR Code
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* CREATE LINK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <Card variant="bento" className="w-full max-w-md p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Create Unique Tracking Link</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLink} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Campaign Name</label>
                <input
                  type="text"
                  value={newLinkName}
                  onChange={(e) => setNewLinkName(e.target.value)}
                  placeholder="e.g. LinkedIn Growth Post Oct 2026"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Channel Tag</label>
                <select
                  value={newChannel}
                  onChange={(e) => setNewChannel(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-bold"
                >
                  <option value="Social Media">Social Media</option>
                  <option value="Email Newsletter">Email Newsletter</option>
                  <option value="Website Banner">Website Banner</option>
                  <option value="Direct Referral">Direct Referral</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="accent" size="sm" leftIcon={<Share2 className="w-4 h-4" />}>
                  Generate Link
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* QR CODE MODAL */}
      {activeQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <Card variant="bento" className="w-full max-w-sm p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <div className="flex justify-end">
              <button onClick={() => setActiveQrModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{activeQrModal.name}</h3>
            <img src={activeQrModal.qrCodeUrl} alt="QR Code" className="w-44 h-44 mx-auto border rounded-xl p-2 bg-white shadow-md" />
            <p className="text-[11px] font-mono text-slate-500 break-all">{activeQrModal.url}</p>
            <Button variant="outline" size="sm" onClick={() => toast({ title: 'QR Code Saved', description: 'Downloaded QR graphic.', type: 'info' })}>
              Download QR Image
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}
