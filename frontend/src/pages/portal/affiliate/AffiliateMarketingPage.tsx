import React, { useState } from 'react'
import { Sparkles, Download, Eye, FileText, Video, Image as ImageIcon, Mail } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'
import { MOCK_MARKETING_ASSETS, MarketingAssetItem } from '@/mock-data/affiliateData'

export const AffiliateMarketingPage: React.FC = () => {
  const { toast } = useToast()

  const [assets, setAssets] = useState<MarketingAssetItem[]>(MOCK_MARKETING_ASSETS)
  const [activeTab, setActiveTab] = useState<string>('All')

  const handleDownload = (title: string) => {
    toast({
      title: 'Downloading Marketing Asset',
      description: `Downloading "${title}".`,
      type: 'success',
    })
  }

  const filteredAssets = assets.filter((a) => {
    if (activeTab === 'All') return true
    return a.type === activeTab
  })

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Marketing Materials & Promo Collateral"
        description="Download high-converting promotional banners, social media video ads, email copy templates, and PDF solution decks."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'Marketing Materials' }]}
        badge={
          <Badge variant="navy" size="md">
            Brand Kit Vault
          </Badge>
        }
      />

      {/* CATEGORY TABS */}
      <Card variant="default" className="p-3 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'Banner Graphic', 'One-Pager PDF', 'Email Template', 'Video Ad'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </Card>

      {/* ASSETS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAssets.map((ast) => (
          <Card key={ast.id} variant="bento" className="overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col justify-between group">
            <div className="space-y-3">
              {/* Asset Image Thumbnail */}
              <div className="h-40 w-full overflow-hidden bg-slate-900 relative">
                <img
                  src={ast.previewImage}
                  alt={ast.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                <Badge variant="navy" size="sm" className="absolute top-2 left-2 shadow">
                  {ast.type}
                </Badge>
              </div>

              {/* Title & Metadata */}
              <div className="p-4 space-y-2">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2">{ast.title}</h4>
                <div className="text-[11px] text-slate-500 space-y-0.5 font-mono">
                  {ast.dimensions && <div>Dim: {ast.dimensions}</div>}
                  <div>Format: {ast.format} • Size: {ast.fileSize}</div>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDownload(ast.title)}
                leftIcon={<Download className="w-3.5 h-3.5" />}
                className="w-full text-xs"
              >
                Download Asset
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
