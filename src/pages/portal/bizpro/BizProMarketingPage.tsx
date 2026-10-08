import React, { useState } from 'react'
import {
  Sparkles,
  Copy,
  Save,
  Check,
  Send,
  FileText,
  Share2,
  Bookmark,
  Zap,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Badge } from '@/components/ui/Badge'
import { Tabs } from '@/components/ui/Tabs'
import { useToast } from '@/components/ui/Toast'

export const BizProMarketingPage: React.FC = () => {
  const { toast } = useToast()
  const [prompt, setPrompt] = useState('Write a high-converting cold email for logistics CEOs offering a $850k revolving working capital line.')
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState('Email Copy')

  // Mock Generated Campaigns
  const [generatedOutput, setGeneratedOutput] = useState<{
    emailCopy: string
    socialPosts: string[]
    campaignStrategy: string
  }>({
    emailCopy: `Subject: Non-dilutive $850k capital line for Apex Freight fleets\n\nHi {{FirstName}},\n\nNoticing the recent freight rate expansion across Midwest routes, I wanted to introduce B4B Capital's non-dilutive revolving lines up to $850,000.\n\nKey highlights:\n- No equity dilution or personal guarantees required.\n- Fast 48-hour disbursement into Chase / primary checking.\n- Includes a dedicated fractional CFO for 13-week treasury forecasting.\n\nWould you have 10 minutes this Thursday for a quick pre-qualification call?\n\nBest regards,\nDavid Ross\nDistrict Leader | B4B Capital Network`,
    socialPosts: [
      '🚚 Scaling your fleet in Q4? Unlock up to $850k in non-dilutive working capital with B4B. Fast 48-hr funding + Fractional CFO advisory included. DM me to check your rate!',
      '💡 Why dilute your equity when you can access institutional revenue-based credit? B4B provides small businesses with transparent, non-dilutive capital lines up to $2.5M.',
    ],
    campaignStrategy: 'Target logistics and transportation executives with $1M+ annual revenue. Focus messaging on fleet expansion without equity dilution.',
  })

  const [savedCampaigns, setSavedCampaigns] = useState([
    {
      id: 'cmp_1',
      title: 'Q4 Freight Logistics Capital Push',
      type: 'Cold Email',
      date: '2026-10-05',
    },
    {
      id: 'cmp_2',
      title: 'SBA 7(a) Guarantee Bridge Campaign',
      type: 'LinkedIn Campaign',
      date: '2026-10-02',
    },
  ])

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: 'AI Marketing Copy Generated!',
        description: 'New campaign copy generated based on your prompt.',
        type: 'success',
      })
    }, 700)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({ title: 'Copied to Clipboard', type: 'info' })
  }

  const handleSaveCampaign = () => {
    const newCamp = {
      id: `cmp_${Date.now()}`,
      title: prompt.slice(0, 35) + '...',
      type: activeTab,
      date: new Date().toISOString().split('T')[0],
    }
    setSavedCampaigns((prev) => [newCamp, ...prev])
    toast({ title: 'Campaign Saved', description: 'Added to your saved marketing vault.', type: 'success' })
  }

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="AI Marketing & Campaign Generator"
        description="Generate high-converting cold email sequences, social posts, and campaign strategy using B4B AI."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'AI Marketing', icon: <Sparkles className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="emerald" size="md">
            AI Marketing Engine 3.0
          </Badge>
        }
      />

      {/* PROMPT GENERATOR BOX */}
      <Card variant="bento" className="p-6 space-y-4">
        <form onSubmit={handleGenerate} className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Describe Your Marketing Objective or Target Audience</span>
          </label>

          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            placeholder="e.g. Write a cold outreach sequence targeting BioTech founders needing equipment financing..."
            className="text-xs"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Tip: Specify industry, deal size, or capital product for personalized copy.
            </span>
            <Button
              type="submit"
              variant="accent"
              isLoading={isGenerating}
              leftIcon={<Zap className="w-4 h-4" />}
              className="shadow-md shadow-emerald-500/20"
            >
              Generate Campaign Copy
            </Button>
          </div>
        </form>
      </Card>

      {/* GENERATED OUTPUT & SAVED CAMPAIGNS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* GENERATED CONTENT VIEW */}
        <Card variant="bento" className="lg:col-span-8 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E3A5F]">
            <Tabs
              tabs={[
                { id: 'Email Copy', label: 'Email Copy' },
                { id: 'Social Posts', label: 'Social Media' },
                { id: 'Strategy', label: 'Campaign Strategy' },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            <Button size="sm" variant="outline" onClick={handleSaveCampaign} leftIcon={<Save className="w-3.5 h-3.5 text-emerald-500" />} className="text-xs">
              Save Campaign
            </Button>
          </div>

          {/* TAB CONTENT */}
          {activeTab === 'Email Copy' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                {generatedOutput.emailCopy}
              </div>
              <Button size="sm" variant="ghost" onClick={() => handleCopy(generatedOutput.emailCopy)} leftIcon={<Copy className="w-3.5 h-3.5" />} className="text-xs">
                Copy Email Copy
              </Button>
            </div>
          )}

          {activeTab === 'Social Posts' && (
            <div className="space-y-3 animate-fadeIn">
              {generatedOutput.socialPosts.map((post, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] text-xs text-slate-800 dark:text-slate-200 space-y-2">
                  <p>{post}</p>
                  <Button size="sm" variant="ghost" onClick={() => handleCopy(post)} leftIcon={<Copy className="w-3 h-3" />} className="h-6 text-[11px]">
                    Copy Post #{idx + 1}
                  </Button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Strategy' && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#12294A] text-xs text-slate-700 dark:text-slate-300 leading-relaxed animate-fadeIn">
              <p className="font-bold mb-1">Targeting & Positioning Strategy:</p>
              <p>{generatedOutput.campaignStrategy}</p>
            </div>
          )}
        </Card>

        {/* SAVED CAMPAIGNS VAULT */}
        <Card variant="bento" className="lg:col-span-4 p-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Bookmark className="w-4 h-4 text-emerald-500" />
            <span>Saved Marketing Vault</span>
          </h3>

          <div className="space-y-2">
            {savedCampaigns.map((camp) => (
              <div key={camp.id} className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                  <span className="truncate">{camp.title}</span>
                  <Badge variant="navy" size="sm">{camp.type}</Badge>
                </div>
                <p className="text-[10px] text-slate-400">Saved: {camp.date}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
