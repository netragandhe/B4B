import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Sparkles,
  Copy,
  Check,
  Send,
  Download,
  Share2,
  FileText,
  Globe,
  Mail,
  MessageSquare,
  Wand2,
} from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'

export const BizProAiMarketingPage: React.FC = () => {
  const { user } = useAuth()
  const { toast } = useToast()

  const [campaignType, setCampaignType] = useState<'linkedin' | 'email' | 'sms' | 'caseStudy'>('linkedin')
  const [targetIndustry, setTargetIndustry] = useState('Logistics & Trucking')
  const [loanProduct, setLoanProduct] = useState('Revolving Credit Line ($250k - $1M)')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const sponsorCode = user?.sponsorCode || 'BIZ-88219'

  const templates: Record<string, string> = {
    linkedin: `🚨 Attention Freight & Logistics Founders:

Tired of traditional banks taking 90 days just to decline your working capital application? 

Our private debt syndication desk just funded a $350k revolving facility for a regional carrier in 48 hours—securing fuel float and fleet maintenance with zero equity dilution.

✅ Limits up to $5,000,000
✅ Prime + 1.50% starting rates
✅ Factoring and A/R advance options available

DM me directly or apply through our VIP underwriting desk:
🔗 https://portal.b4b.finance/apply?ref=${sponsorCode}

#CommercialFinance #FleetFunding #LogisticsGrowth #BizPro`,
    email: `Subject: Quick question regarding your Q4 working capital facility

Hi {{First_Name}},

I noticed {{Company_Name}} has been expanding its operations across the Northeast corridor. 

When freight volumes surge, bank lines of credit often lag behind your actual accounts receivable growth. We specialize in non-dilutive credit facilities ($100k - $2M) tailored specifically for transportation operators.

We recently approved a 48-hour revolver at Prime + 1.75% for a peer logistics firm with zero personal collateral pledged.

Would you be open to a 10-minute diagnostic call this Thursday to see what your borrowing capacity looks like?

Best regards,

${user?.name || 'Marcus Vance'}
Senior Commercial Debt Advisor
Direct Phone: (404) 555-0192 | Sponsor Code: ${sponsorCode}
Schedule: https://portal.b4b.finance/schedule/${sponsorCode}`,
    sms: `Hi {{First_Name}}, this is Marcus Vance with the Commercial Deal Desk. We just unlocked a $250k expedited working capital line for your industry. Review your rate in 2 mins: https://portal.b4b.finance/m/${sponsorCode}`,
    caseStudy: `CASE STUDY: How Beacon Ridge Logistics Unlocked $350,000 Working Capital in 48 Hours

THE CHALLENGE:
A growing fleet logistics operator was delayed 6 weeks by a regional bank for an equipment and payroll float revolver, putting crucial route expansion at risk.

THE SOLUTION:
Biz Pro Deal Desk structured a $350,000 revolving credit facility collateralized solely by corporate receivables at Prime + 1.50%.

THE OUTCOME:
- $350k disbursed in 48 hours
- 12 new power units deployed
- $14,250 direct origination fee generated for advisor

Originated by: ${user?.name || 'Marcus Vance'} • Sponsor Code: ${sponsorCode}`,
  }

  const [generatedOutput, setGeneratedOutput] = useState(templates.linkedin)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setGeneratedOutput(templates[campaignType])
      toast({
        title: 'AI Marketing Copy Generated',
        description: `Custom ${campaignType.toUpperCase()} content created with your sponsor code ${sponsorCode}.`,
        type: 'success',
      })
    }, 600)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedOutput)
    setCopied(true)
    toast({
      title: 'Copied to Clipboard',
      description: 'Ready to paste into LinkedIn, outreach campaign, or email client.',
      type: 'success',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Helmet>
        <title>AI Marketing & Campaign Suite | Biz Pro Terminal</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              AI Marketing Suite
            </h1>
            <Badge variant="gold" size="sm">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> AI Engine
            </Badge>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Generate high-converting commercial debt outreach, cold emails, case studies, and social posts with your sponsor attribution code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Form */}
          <Card className="p-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Campaign Parameters
            </h3>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Outreach Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'linkedin', label: 'LinkedIn Post', icon: Globe },
                  { id: 'email', label: 'Cold Email', icon: Mail },
                  { id: 'sms', label: 'SMS Blast', icon: MessageSquare },
                  { id: 'caseStudy', label: 'Case Study', icon: FileText },
                ].map((item) => {
                  const Icon = item.icon
                  const active = campaignType === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setCampaignType(item.id as any)
                        setGeneratedOutput(templates[item.id])
                      }}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                        active
                          ? 'bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-600 dark:text-blue-400 font-bold'
                          : 'bg-slate-50 dark:bg-[#12294A] border-slate-200 dark:border-[#1E3A5F] text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Target Industry
              </label>
              <select
                value={targetIndustry}
                onChange={(e) => setTargetIndustry(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-slate-900 dark:text-slate-100 focus:outline-hidden"
              >
                <option value="Logistics & Trucking">Freight & Logistics</option>
                <option value="Medical Diagnostic Labs">Healthcare & Diagnostic Labs</option>
                <option value="Manufacturing & CNC">Precision Manufacturing & CNC</option>
                <option value="Hospitality & Restaurants">Hospitality & Food Service</option>
                <option value="Construction & Contractors">General Contracting & Trades</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Loan / Debt Solution
              </label>
              <select
                value={loanProduct}
                onChange={(e) => setLoanProduct(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-slate-900 dark:text-slate-100 focus:outline-hidden"
              >
                <option value="Revolving Credit Line ($250k - $1M)">Revolving Credit Line ($250k - $1M)</option>
                <option value="Equipment Lease & Machinery">Equipment Lease & Financing</option>
                <option value="SBA 7(a) Loan ($500k - $5M)">SBA 7(a) Expansion Loan</option>
                <option value="Accounts Receivable Factoring">Accounts Receivable Factoring</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Embedded Sponsor Code
              </label>
              <input
                type="text"
                disabled
                value={sponsorCode}
                className="w-full p-2.5 bg-slate-100 dark:bg-[#0A1628] border border-slate-200 dark:border-[#1E3A5F] rounded-xl font-mono font-bold text-emerald-600 dark:text-emerald-400 cursor-not-allowed"
              />
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              <Wand2 className="w-4 h-4 mr-2" />
              {isGenerating ? 'Synthesizing Copy...' : 'Regenerate with AI'}
            </Button>
          </Card>

          {/* Generated Copy Output Window */}
          <Card className="lg:col-span-2 p-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#1E3A5F]">
                <div className="flex items-center gap-2">
                  <Badge variant="emerald" size="sm">
                    Campaign Ready
                  </Badge>
                  <span className="text-xs text-slate-400">
                    Includes personal link & sponsor code
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    {copied ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                    {copied ? 'Copied!' : 'Copy Copy'}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() =>
                      toast({
                        title: 'Dispatched to Social Media',
                        description: 'Queued to your scheduled LinkedIn post buffer.',
                        type: 'success',
                      })
                    }
                  >
                    <Share2 className="w-3.5 h-3.5 mr-1" /> Post
                  </Button>
                </div>
              </div>

              {/* Code/Text Box */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed min-h-[360px] overflow-y-auto">
                {generatedOutput}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between text-xs text-slate-400">
              <span>All leads capturing this link will appear instantly on your Leads Kanban.</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">100% Attribution Lock</span>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
