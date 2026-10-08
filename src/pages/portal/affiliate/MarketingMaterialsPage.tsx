import React, { useState } from 'react'
import {
  FolderDown,
  Download,
  Copy,
  Check,
  Search,
  Eye,
  FileText,
  Video,
  Image as ImageIcon,
  Code2,
  Mail,
  Share2,
  Tag,
  Sparkles,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { PageLoadingFallback } from '@/components/ui/PageLoadingFallback'
import { SEOHead } from '@/components/seo/SEOHead'
import { PageTransition } from '@/components/animations/PageTransition'
import { useMarketingAssets } from '@/hooks/queries/useAffiliateData'
import { useToast } from '@/components/ui/Toast'
import type { MarketingAsset } from '@/mock-data/affiliateData'

export const MarketingMaterialsPage: React.FC = () => {
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [swipeModalAsset, setSwipeModalAsset] = useState<MarketingAsset | null>(null)
  const [copiedSwipe, setCopiedSwipe] = useState(false)
  const [embedModalAsset, setEmbedModalAsset] = useState<MarketingAsset | null>(null)
  const [copiedEmbed, setCopiedEmbed] = useState(false)

  const { data: assets, isLoading, isError, refetch } = useMarketingAssets(selectedCategory)

  const categories = [
    'All',
    'Banners & Ads',
    'Email Templates',
    'Social Media Swipe',
    'One-Pagers & PDFs',
    'Video & Reels',
    'Brand & Logos',
  ]

  const handleDownloadAsset = (asset: MarketingAsset) => {
    toast({
      title: 'Download Initialized',
      description: `Downloading ${asset.title} (${asset.fileSize}).`,
      type: 'success',
    })
  }

  const handleCopySwipe = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedSwipe(true)
      toast({
        title: 'Swipe Copy Copied',
        description: 'Ready to paste into your newsletter or social campaign.',
        type: 'success',
      })
      setTimeout(() => setCopiedSwipe(false), 2000)
    } catch {
      toast({ title: 'Copy Failed', description: 'Could not access clipboard.', type: 'error' })
    }
  }

  const handleCopyEmbed = async (html: string) => {
    try {
      await navigator.clipboard.writeText(html)
      setCopiedEmbed(true)
      toast({
        title: 'Embed Code Copied',
        description: 'HTML banner snippet copied to clipboard.',
        type: 'success',
      })
      setTimeout(() => setCopiedEmbed(false), 2000)
    } catch {
      toast({ title: 'Copy Failed', description: 'Could not access clipboard.', type: 'error' })
    }
  }

  if (isLoading) return <PageLoadingFallback />
  if (isError) {
    return (
      <ErrorState
        title="Could not load marketing materials"
        message="Unable to fetch partner media kits and swipe files."
        onRetry={() => refetch()}
      />
    )
  }

  const filteredAssets = (assets || []).filter((a) => {
    const q = searchQuery.toLowerCase()
    return (
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
    )
  })

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Email Templates':
        return <Mail className="w-4 h-4 text-emerald-500" />
      case 'Social Media Swipe':
        return <Share2 className="w-4 h-4 text-blue-500" />
      case 'One-Pagers & PDFs':
        return <FileText className="w-4 h-4 text-red-500" />
      case 'Video & Reels':
        return <Video className="w-4 h-4 text-amber-500" />
      default:
        return <ImageIcon className="w-4 h-4 text-indigo-500" />
    }
  }

  return (
    <PageTransition>
      <div className="space-y-8 text-left">
        <SEOHead
          title="Marketing Materials & Creative Assets | OAL Partner Hub"
          description="Download compliant banner ads, email copy sequences, social media swipe files, and one-pagers."
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                Marketing Materials & Media Kit
              </h1>
              <Badge variant="royal" size="sm">
                {(assets || []).length} Verified Assets
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Tested high-conversion creative assets, swipe files, and regulatory-approved marketing collateral.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                title: 'Full Media Kit Downloaded',
                description: 'Complete ZIP bundle containing all 24 partner assets dispatched.',
                type: 'success',
              })
            }
            leftIcon={<Download className="w-3.5 h-3.5" />}
            className="text-xs font-semibold"
          >
            Download Full Media Kit (ZIP)
          </Button>
        </div>

        {/* Filter Tabs & Search */}
        <Card variant="bento" className="p-4 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Search assets, dimensions, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#12294A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Assets Grid */}
        {filteredAssets.length === 0 ? (
          <EmptyState
            icon={<FolderDown className="w-8 h-8 text-blue-500" />}
            title="No marketing materials match your search"
            description="Try adjusting your category filter or search keywords."
            action={
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All')
                }}
              >
                Reset Filters
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAssets.map((asset) => (
              <Card
                key={asset.id}
                variant="default"
                className="overflow-hidden flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-600 transition-all hover:-translate-y-0.5"
              >
                <div>
                  {/* Thumbnail Preview */}
                  <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden group">
                    <img
                      src={asset.previewUrl}
                      alt={asset.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <Badge variant="navy" size="sm" className="backdrop-blur-md bg-slate-900/80 text-[10px]">
                        {asset.fileType}
                      </Badge>
                    </div>
                    <div className="absolute top-2.5 right-2.5">
                      <span className="text-[10px] font-mono font-bold bg-white/90 dark:bg-[#0D1E36]/90 px-2 py-0.5 rounded-md text-slate-800 dark:text-slate-200">
                        {asset.fileSize}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold">
                      {getCategoryIcon(asset.category)}
                      <span>{asset.category}</span>
                      <span>•</span>
                      <span className="font-mono text-[10px]">{asset.dimensions}</span>
                    </div>

                    <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white line-clamp-1">
                      {asset.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {asset.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {asset.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 pt-0 border-t border-slate-100 dark:border-[#1E3A5F] mt-3 flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleDownloadAsset(asset)}
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                    className="flex-1 text-xs font-semibold"
                  >
                    Download
                  </Button>

                  {asset.copyContent && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSwipeModalAsset(asset)}
                      leftIcon={<Copy className="w-3.5 h-3.5 text-blue-500" />}
                      className="text-xs font-semibold"
                    >
                      Copy Swipe
                    </Button>
                  )}

                  {asset.category === 'Banners & Ads' && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEmbedModalAsset(asset)}
                      leftIcon={<Code2 className="w-3.5 h-3.5" />}
                      className="text-xs"
                      title="Embed HTML banner"
                      aria-label="Embed HTML banner"
                    />
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Modal: Swipe File Text Copy */}
        <Modal
          isOpen={!!swipeModalAsset}
          onClose={() => setSwipeModalAsset(null)}
          title={swipeModalAsset?.title || 'Swipe File Copy'}
          description="Copy and customize this high-converting copy for your email blast or social feed."
          maxWidth="md"
        >
          {swipeModalAsset?.copyContent && (
            <div className="space-y-4 text-left text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] max-h-72 overflow-y-auto whitespace-pre-line font-mono text-[11px] text-slate-800 dark:text-slate-200 leading-relaxed">
                {swipeModalAsset.copyContent}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400">
                  Includes partner affiliate link tag
                </span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSwipeModalAsset(null)}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleCopySwipe(swipeModalAsset.copyContent!)}
                    leftIcon={copiedSwipe ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    className="font-bold"
                  >
                    {copiedSwipe ? 'Copied!' : 'Copy to Clipboard'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Modal: Banner HTML Embed Code */}
        <Modal
          isOpen={!!embedModalAsset}
          onClose={() => setEmbedModalAsset(null)}
          title="HTML Responsive Banner Embed Code"
          description="Paste this HTML snippet directly into your blog sidebar, newsletter footer, or web page."
          maxWidth="md"
        >
          {embedModalAsset && (
            <div className="space-y-4 text-left text-xs">
              <div className="p-4 rounded-xl bg-slate-900 text-blue-200 font-mono text-[11px] max-h-56 overflow-y-auto leading-relaxed border border-slate-700">
                {`<a href="https://oalnetwork.com/?ref=alex_vance" target="_blank" rel="noopener noreferrer">
  <img src="${embedModalAsset.previewUrl}" alt="OAL Network Small Business Solutions" width="728" height="90" style="max-width:100%;height:auto;border-radius:8px;" />
</a>`}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => setEmbedModalAsset(null)}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    handleCopyEmbed(
                      `<a href="https://oalnetwork.com/?ref=alex_vance" target="_blank" rel="noopener noreferrer"><img src="${embedModalAsset.previewUrl}" alt="OAL Network" style="max-width:100%;height:auto;border-radius:8px;" /></a>`
                    )
                  }
                  leftIcon={copiedEmbed ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  className="font-bold"
                >
                  {copiedEmbed ? 'Snippet Copied!' : 'Copy HTML Code'}
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </PageTransition>
  )
}
