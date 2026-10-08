import React, { useState } from 'react'
import {
  Link2,
  PlusCircle,
  Copy,
  Check,
  QrCode,
  Search,
  ExternalLink,
  Sparkles,
  BarChart3,
  TrendingUp,
  SlidersHorizontal,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { FormField } from '@/components/ui/FormField'
import { Modal } from '@/components/ui/Modal'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { PageLoadingFallback } from '@/components/ui/PageLoadingFallback'
import { SEOHead } from '@/components/seo/SEOHead'
import { PageTransition } from '@/components/animations/PageTransition'
import { QrCodeGenerator } from '@/components/qr/QrCodeGenerator'
import { useAffiliateLinks, useCreateAffiliateLink } from '@/hooks/queries/useAffiliateData'
import { useToast } from '@/components/ui/Toast'
import { formatCurrency } from '@/lib/utils'

const createLinkSchema = z.object({
  title: z.string().min(3, 'Link title must be at least 3 characters'),
  category: z.enum(['General', 'Loans', 'Credit', 'Payments', 'Advisory', 'Jobs']),
  targetPage: z.string().min(1, 'Target page required'),
  slug: z.string().min(2, 'Custom slug required').regex(/^[a-z0-9-]+$/, 'Alphanumeric and dashes only'),
  utmCampaign: z.string().min(2, 'Campaign identifier required'),
})

type CreateLinkFormData = z.infer<typeof createLinkSchema>

export const AffiliateLinksPage: React.FC = () => {
  const { toast } = useToast()
  const { data: links, isLoading, isError, refetch } = useAffiliateLinks()
  const { mutate: createLink, isPending: isCreating } = useCreateAffiliateLink()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [activeQrLink, setActiveQrLink] = useState<{ title: string; url: string }>({
    title: 'Primary Link',
    url: 'https://oalnetwork.com/?ref=alex_vance',
  })
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLinkFormData>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      category: 'Loans',
      targetPage: '/solutions/business-loans',
      slug: 'growth-capital',
      utmCampaign: 'partner_custom_campaign',
    },
  })

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      toast({
        title: 'Referral Link Copied',
        description: 'URL copied with your partner tracking parameters.',
        type: 'success',
      })
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      toast({ title: 'Copy Failed', description: 'Could not access clipboard.', type: 'error' })
    }
  }

  const handleOpenQr = (title: string, url: string) => {
    setActiveQrLink({ title, url })
    setQrModalOpen(true)
  }

  const onSubmit = (data: CreateLinkFormData) => {
    createLink(
      {
        title: data.title,
        category: data.category,
        targetUrl: `https://oalnetwork.com${data.targetPage}?ref=alex_vance&utm_campaign=${data.utmCampaign}`,
        slug: data.slug,
        utmCampaign: data.utmCampaign,
      },
      {
        onSuccess: () => {
          toast({
            title: 'New Unique Link Created!',
            description: `oal.link/${data.slug} is now live with real-time click and lead tracking.`,
            type: 'success',
          })
          reset()
          setCreateModalOpen(false)
        },
        onError: () => {
          toast({
            title: 'Creation Failed',
            description: 'Could not create link. Try another slug.',
            type: 'error',
          })
        },
      }
    )
  }

  if (isLoading) return <PageLoadingFallback />
  if (isError) {
    return (
      <ErrorState
        title="Could not load unique links"
        message="Unable to fetch partner tracking URLs. Please retry."
        onRetry={() => refetch()}
      />
    )
  }

  const filteredLinks = (links || []).filter((l) => {
    const matchesCategory = selectedCategory === 'All' || l.category === selectedCategory
    const matchesSearch =
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.shortUrl.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <PageTransition>
      <div className="space-y-8 text-left">
        <SEOHead
          title="My Unique Referral Links | OAL Partner Hub"
          description="Manage your custom affiliate tracking links and download print-ready QR codes."
        />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                My Unique Links
              </h1>
              <Badge variant="royal" size="sm">
                {(links || []).length} Active Links
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Create and manage tagged referral links with custom UTM tags, short URLs, and instant QR codes.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => setCreateModalOpen(true)}
            leftIcon={<PlusCircle className="w-4 h-4" />}
            className="font-bold shadow-md shadow-blue-500/20 shrink-0"
          >
            Create New Link
          </Button>
        </div>

        {/* Search & Category Filter Controls */}
        <Card variant="bento" className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search by title, slug, or shortlink..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['All', 'General', 'Loans', 'Credit', 'Payments', 'Advisory'].map((cat) => (
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
        </Card>

        {/* Links Grid */}
        {filteredLinks.length === 0 ? (
          <EmptyState
            icon={<Link2 className="w-8 h-8 text-blue-500" />}
            title="No referral links found"
            description="No links match your current filter criteria. Create a custom campaign link to start tracking referrals."
            action={
              <Button size="sm" variant="primary" onClick={() => setCreateModalOpen(true)}>
                Generate New Link
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLinks.map((link) => (
              <Card
                key={link.id}
                variant="default"
                className="p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Badge variant="navy" size="sm" className="text-[10px] uppercase font-bold tracking-wider">
                        {link.category}
                      </Badge>
                      <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white mt-1">
                        {link.title}
                      </h3>
                    </div>

                    <Badge variant="emerald" size="sm">
                      {link.status}
                    </Badge>
                  </div>

                  {/* Shortlink Box */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold truncate">
                      {link.shortUrl}
                    </span>
                    <button
                      onClick={() => handleCopy(link.id, link.targetUrl)}
                      className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 shrink-0"
                      title="Copy URL"
                      aria-label="Copy URL"
                    >
                      {copiedId === link.id ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 truncate">
                    Target: <span className="font-mono">{link.targetUrl}</span>
                  </p>
                </div>

                {/* Performance stats row */}
                <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100 dark:border-[#1E3A5F] text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Clicks</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {link.clicks.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Leads</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {link.leads}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Deals</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {link.conversions}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Earnings</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(link.earnings)}
                    </span>
                  </div>
                </div>

                {/* Actions row */}
                <div className="flex items-center gap-2 pt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(link.id, link.targetUrl)}
                    leftIcon={copiedId === link.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    className="flex-1 text-xs font-semibold"
                  >
                    {copiedId === link.id ? 'Copied' : 'Copy Link'}
                  </Button>

                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleOpenQr(link.title, link.targetUrl)}
                    leftIcon={<QrCode className="w-3.5 h-3.5 text-blue-500" />}
                    className="flex-1 text-xs font-semibold"
                  >
                    View QR Code
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Modal: Create New Unique Link */}
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Create New Tracking Link"
          description="Generate a campaign link with custom tracking tags and branded shortlink."
          maxWidth="md"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField label="Campaign Title" required error={errors.title?.message}>
              <Input placeholder="e.g. Q4 LinkedIn Outreach - Equipment Loans" {...register('title')} />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField label="Category" required error={errors.category?.message}>
                <Select
                  options={[
                    { label: 'Business Loans', value: 'Loans' },
                    { label: 'Business Credit Builder', value: 'Credit' },
                    { label: 'Merchant POS', value: 'Payments' },
                    { label: 'CFO Advisory & Plans', value: 'Advisory' },
                    { label: 'General Ecosystem', value: 'General' },
                  ]}
                  {...register('category')}
                />
              </FormField>

              <FormField label="Destination Landing Page" required error={errors.targetPage?.message}>
                <Select
                  options={[
                    { label: 'All 16 Solutions Hub (/)', value: '/' },
                    { label: 'Business Loans (/solutions/business-loans)', value: '/solutions/business-loans' },
                    { label: 'Business Credit (/solutions/build-business-credit)', value: '/solutions/build-business-credit' },
                    { label: 'Accept Payments (/solutions/accept-payments)', value: '/solutions/accept-payments' },
                    { label: 'Fractional CFO (/advisory)', value: '/advisory' },
                  ]}
                  {...register('targetPage')}
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField label="Custom Slug (oal.link/...)" required error={errors.slug?.message}>
                <Input placeholder="fall-capital-2026" {...register('slug')} />
              </FormField>

              <FormField label="UTM Campaign Tag" required error={errors.utmCampaign?.message}>
                <Input placeholder="partner_linkedin_promo" {...register('utmCampaign')} />
              </FormField>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2.5">
              <Button type="button" variant="outline" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isCreating}>
                Generate Unique Link
              </Button>
            </div>
          </form>
        </Modal>

        {/* Modal: QR Code Generator */}
        <Modal
          isOpen={qrModalOpen}
          onClose={() => setQrModalOpen(false)}
          title={activeQrLink.title}
          description="Live vector QR code with real-time partner lead tracking."
          maxWidth="md"
        >
          <div className="flex justify-center py-2">
            <QrCodeGenerator url={activeQrLink.url} title={activeQrLink.title} />
          </div>
        </Modal>
      </div>
    </PageTransition>
  )
}
