import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Palette,
  Globe,
  Upload,
  Check,
  Eye,
  Sparkles,
  Save,
  Laptop,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'

export const BizProBrandingPage: React.FC = () => {
  const { user } = useAuth()
  const { toast } = useToast()

  const [brandName, setBrandName] = useState('Vance Capital Advisory')
  const [subdomain, setSubdomain] = useState('vance-capital')
  const [primaryColor, setPrimaryColor] = useState('#2563EB')
  const [tagline, setTagline] = useState('Premier Commercial Debt & Credit Structuring')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'White-Label Branding Deployed',
      description: `Portal updated at https://${subdomain}.b4b.finance`,
      type: 'success',
    })
  }

  return (
    <>
      <Helmet>
        <title>White-label Branding & Custom Portal | Biz Pro Terminal</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              White-label Branding & Custom Portal
            </h1>
            <Badge variant="navy" size="sm">
              Advisor Co-Branding
            </Badge>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Brand client application forms, loan term sheets, and investor decks with your firm identity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings Form */}
          <Card className="p-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4">
              Brand Identity Configuration
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Brokerage / Advisory Brand Name
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-slate-900 dark:text-slate-100 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Custom Portal Subdomain
                </label>
                <div className="flex items-center">
                  <span className="p-2.5 bg-slate-100 dark:bg-[#0A1628] border border-r-0 border-slate-200 dark:border-[#1E3A5F] rounded-l-xl text-slate-400 font-mono">
                    https://
                  </span>
                  <input
                    type="text"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value)}
                    className="flex-1 p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] text-slate-900 dark:text-slate-100 focus:outline-hidden font-mono"
                  />
                  <span className="p-2.5 bg-slate-100 dark:bg-[#0A1628] border border-l-0 border-slate-200 dark:border-[#1E3A5F] rounded-r-xl text-slate-400 font-mono">
                    .b4b.finance
                  </span>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Tagline / Positioning Statement
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-slate-900 dark:text-slate-100 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Primary Accent Theme Color
                </label>
                <div className="flex items-center gap-3">
                  {[
                    { color: '#2563EB', name: 'Royal Blue' },
                    { color: '#059669', name: 'Emerald' },
                    { color: '#7C3AED', name: 'Purple' },
                    { color: '#D97706', name: 'Amber Gold' },
                    { color: '#0F172A', name: 'Navy' },
                  ].map((c) => (
                    <button
                      key={c.color}
                      type="button"
                      onClick={() => setPrimaryColor(c.color)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform ${
                        primaryColor === c.color ? 'scale-110 border-white shadow-md' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c.color }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" variant="primary" size="sm">
                  <Save className="w-4 h-4 mr-1.5" />
                  Save & Publish Branding
                </Button>
              </div>
            </form>
          </Card>

          {/* Live Mockup Preview */}
          <Card className="p-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E3A5F]">
                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-blue-500" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Live Client Portal Preview
                  </h3>
                </div>
                <Badge variant="emerald" size="sm">
                  SSL Encrypted
                </Badge>
              </div>

              {/* Browser Frame */}
              <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0A1628] overflow-hidden shadow-inner">
                <div className="p-2.5 bg-slate-100 dark:bg-[#12294A] border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <span className="font-mono bg-white dark:bg-[#0D1E36] px-2 py-0.5 rounded-md flex-1 text-center truncate">
                    https://{subdomain}.b4b.finance
                  </span>
                </div>

                <div className="p-6 text-center space-y-3">
                  <div
                    className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center font-black text-white text-lg shadow-md"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {brandName.slice(0, 2).toUpperCase()}
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                    {brandName}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                    {tagline}
                  </p>

                  <div className="pt-2">
                    <button
                      className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-md"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Apply For Commercial Debt
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-[11px] text-slate-400 text-center">
              Powered by OAL Enterprise Banking Backend • Powered with Sponsor Code {user?.sponsorCode || 'BIZ-88219'}
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
