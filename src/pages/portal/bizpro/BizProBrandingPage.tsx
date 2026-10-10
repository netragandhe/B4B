import React, { useState } from 'react'
import {
  Palette,
  Upload,
  Globe,
  Eye,
  CheckCircle2,
  Sparkles,
  Save,
  Shield,
  ArrowRight,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { FormField } from '@/components/ui/FormField'
import { Badge } from '@/components/ui/Badge'
import { FileUpload } from '@/components/ui/FileUpload'
import { useToast } from '@/components/ui/Toast'
import { createStore } from '@/lib/createStore'

interface BrandSettings {
  firmName: string
  subdomain: string
  primaryColor: string
  accentColor: string
  customDomain: string
  logoUrl: string
}

const INITIAL_BRAND: BrandSettings = {
  firmName: 'Ross Financial Advisory',
  subdomain: 'ross-financial',
  primaryColor: '#2563EB',
  accentColor: '#10B981',
  customDomain: 'advisors.rossfinancial.com',
  logoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80',
}

const brandStore = createStore<BrandSettings>('coach_brand_settings', INITIAL_BRAND)

export const BizProBrandingPage: React.FC = () => {
  const { toast } = useToast()
  const brandData = brandStore.useStore()
  const [formData, setFormData] = useState<BrandSettings>(brandData)

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault()
    brandStore.set(formData)
    toast({
      title: 'White-label Customization Saved',
      description: `Your custom portal branding is live at ${formData.subdomain}.b4bamerica.com`,
      type: 'success',
    })
  }

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto">
      <PageHeader
        title="White-label Branding & Custom Domain"
        description="Customize client proposals, portal landing pages, and email templates with your custom logo and color palette."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/bizpro/bulletin' },
          { label: 'White-label / Branding', icon: <Palette className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="gold" size="md">
            Rank 3+ Unlocked
          </Badge>
        }
      />

      {/* FORM AND LIVE PREVIEW TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* BRANDING FORM */}
        <Card variant="bento" className="lg:col-span-6 p-6 space-y-5">
          <form onSubmit={handleSaveBranding} className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Brand Configuration
            </h3>

            <FormField label="Practice / Firm Name" required id="brand-firm">
              <Input
                id="brand-firm"
                value={formData.firmName}
                onChange={(e) => setFormData((prev) => ({ ...prev, firmName: e.target.value }))}
                required
              />
            </FormField>

            <FormField label="Custom Subdomain / URL" required id="brand-subdomain">
              <Input
                id="brand-subdomain"
                value={formData.subdomain}
                onChange={(e) => setFormData((prev) => ({ ...prev, subdomain: e.target.value }))}
                leftIcon={<Globe className="w-4 h-4" />}
                required
              />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Primary Theme Color" required id="brand-pcolor">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData((prev) => ({ ...prev, primaryColor: e.target.value }))}
                    className="w-10 h-10 rounded-xl cursor-pointer border border-slate-700 bg-slate-900"
                  />
                  <Input
                    value={formData.primaryColor}
                    onChange={(e) => setFormData((prev) => ({ ...prev, primaryColor: e.target.value }))}
                    className="font-mono text-xs"
                  />
                </div>
              </FormField>

              <FormField label="Accent Color" required id="brand-acolor">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.accentColor}
                    onChange={(e) => setFormData((prev) => ({ ...prev, accentColor: e.target.value }))}
                    className="w-10 h-10 rounded-xl cursor-pointer border border-slate-700 bg-slate-900"
                  />
                  <Input
                    value={formData.accentColor}
                    onChange={(e) => setFormData((prev) => ({ ...prev, accentColor: e.target.value }))}
                    className="font-mono text-xs"
                  />
                </div>
              </FormField>
            </div>

            <FormField label="Upload Firm Logo" id="brand-logo">
              <FileUpload label="Upload custom transparent PNG logo (200x60px)" maxSizeMB={5} />
            </FormField>

            <div className="pt-2">
              <Button
                type="submit"
                variant="accent"
                size="md"
                leftIcon={<Save className="w-4 h-4" />}
                className="w-full justify-center font-bold"
              >
                Publish White-Label Branding
              </Button>
            </div>
          </form>
        </Card>

        {/* LIVE INTERACTIVE PREVIEW CARD */}
        <Card variant="bento" className="lg:col-span-6 p-6 space-y-4 bg-slate-900 text-white border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Live Client Portal Preview</span>
            </span>
            <Badge variant="emerald" size="sm">
              Live Real-Time
            </Badge>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs"
                  style={{ backgroundColor: formData.primaryColor }}
                >
                  {formData.firmName.slice(0, 2).toUpperCase()}
                </div>
                <span className="font-extrabold text-sm text-white">{formData.firmName}</span>
              </div>
              <span className="text-[10px] text-slate-400">Powered by B4B America</span>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold text-white">Commercial Capital Facility Proposal</h4>
              <p className="text-xs text-slate-400">Prepared for Apex Freight & Logistics LLC</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <span>Approved Line Amount:</span>
              <span className="font-extrabold text-base text-emerald-400">$850,000</span>
            </div>

            <button
              type="button"
              className="w-full py-2.5 rounded-xl font-bold text-xs text-white transition-opacity shadow-md"
              style={{ backgroundColor: formData.primaryColor }}
            >
              Accept Proposal & Open eBOX Vault
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
