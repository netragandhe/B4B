import React, { useState } from 'react'
import {
  Building2,
  CreditCard,
  MessageSquare,
  Globe,
  Upload,
  CheckCircle2,
  Send,
  PlusCircle,
  Clock,
  Download,
  FileSpreadsheet,
  Printer,
  Sparkles,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { PageHeader } from '@/components/ui/PageHeader'
import { useToast } from '@/components/ui/Toast'
import { formatCurrency } from '@/lib/utils'
import { exportToCsv, exportToPdf } from '@/lib/exportUtils'

export const EmployerProfileBillingPage: React.FC<{ defaultTab?: 'profile' | 'billing' | 'messages' }> = ({
  defaultTab = 'profile',
}) => {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState(defaultTab)

  // Profile Form State
  const [companyName, setCompanyName] = useState('Nexus FinTech Solutions')
  const [industry, setIndustry] = useState('FinTech & Commercial Capital')
  const [companySize, setCompanySize] = useState('50-200 Employees')
  const [website, setWebsite] = useState('https://nexusfintech.example.com')
  const [bio, setBio] = useState('Leading merchant processing & corporate line of credit infrastructure across North America.')
  const [cultureNotes, setCultureNotes] = useState('Remote-first culture, uncapped sales commission, fast-paced enterprise scaling.')
  const [logoPreview, setLogoPreview] = useState<string | null>(
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80'
  )

  // Billing State
  const [billingInvoices, setBillingInvoices] = useState([
    { id: 'inv_emp_1', date: '2026-10-01', plan: 'Employer Pro Subscription (Oct 2026)', amount: 299, status: 'Paid' },
    { id: 'inv_emp_2', date: '2026-09-01', plan: 'Employer Pro Subscription (Sep 2026)', amount: 299, status: 'Paid' },
    { id: 'inv_emp_3', date: '2026-08-15', plan: 'Featured Job Boost Credit (1 Post)', amount: 149, status: 'Paid' },
  ])

  // Messages State
  const [selectedThread, setSelectedThread] = useState('Sarah Jenkins')
  const [replyText, setReplyText] = useState('')
  const [messages, setMessages] = useState([
    { sender: 'Sarah Jenkins', text: 'Hi! Thank you for scheduling the interview. Looking forward to speaking with the VP of Sales.', time: '10:14 AM' },
    { sender: 'You', text: 'Great! See you on Zoom tomorrow at 2:00 PM EST.', time: '10:20 AM' },
  ])

  const sendReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim()) return
    setMessages([...messages, { sender: 'You', text: replyText, time: 'Just now' }])
    setReplyText('')
    toast({ title: 'Message Sent to Candidate', type: 'success' })
  }

  const handleExportInvoicesCsv = () => {
    const headers = ['Invoice ID', 'Date', 'Plan Item', 'Amount', 'Status']
    const rows = billingInvoices.map((i) => [i.id, i.date, i.plan, i.amount, i.status])
    exportToCsv('Employer_Billing_Invoices', headers, rows)
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Employer Brand Profile & Billing Management"
        description="Manage company branding, logo media, job posting subscription tier, invoices, and candidate messages."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'Company Profile & Billing' }]}
        badge={
          <Badge variant="navy" size="md">
            Enterprise Employer
          </Badge>
        }
      />

      {/* TABS BAR */}
      <Card variant="default" className="p-3 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            🏢 Company Brand Profile
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'billing'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            💳 Plan Tiers & Invoices
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'messages'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            💬 Candidate Inbox
          </button>
        </div>
      </Card>

      {/* TAB 1: COMPANY PROFILE WITH LOGO UPLOAD */}
      {activeTab === 'profile' && (
        <Card variant="bento" className="p-6 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Public Corporate Employer Profile</h3>
            <Badge variant="emerald" size="sm">Verified Employer</Badge>
          </div>

          <div className="space-y-4 text-xs">
            {/* Logo Upload Simulator */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo" className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-400">
                  Logo
                </div>
              )}
              <div className="space-y-1">
                <div className="font-bold text-slate-900 dark:text-white">Company Logo Media</div>
                <div className="text-[11px] text-slate-500">Square PNG or JPG (Recommended: 400x400)</div>
                <label className="inline-block mt-1">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setLogoPreview(URL.createObjectURL(e.target.files[0]))
                        toast({ title: 'Logo Uploaded', description: 'Updated company logo graphic.', type: 'success' })
                      }
                    }}
                  />
                  <span className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" /> Upload Logo
                  </span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold block mb-1">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-bold text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Industry Sector</label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold block mb-1">Company Size</label>
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-bold"
                >
                  <option value="1-10 Employees">1-10 Employees</option>
                  <option value="10-50 Employees">10-50 Employees</option>
                  <option value="50-200 Employees">50-200 Employees</option>
                  <option value="200+ Employees">200+ Employees</option>
                </select>
              </div>
              <div>
                <label className="font-bold block mb-1">Website URL</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="font-bold block mb-1">About Company Summary</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Company Culture & Perks Highlights</label>
              <textarea
                rows={2}
                value={cultureNotes}
                onChange={(e) => setCultureNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="accent"
                size="sm"
                onClick={() => toast({ title: 'Profile Updated', description: 'Company profile saved.', type: 'success' })}
              >
                Save Brand Profile
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 2: BILLING & PLAN CARDS */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          {/* PLAN CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="bento" className="p-5 border border-slate-200 dark:border-slate-800 space-y-3">
              <Badge variant="navy" size="sm">Starter Tier</Badge>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Single Posting</h3>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-heading">$199 <span className="text-xs font-normal text-slate-500">/ post</span></div>
              <ul className="text-xs text-slate-500 space-y-1 pt-2">
                <li>• 30-Day Active Listing</li>
                <li>• Candidate Inbox Access</li>
              </ul>
              <Button variant="outline" size="sm" onClick={() => toast({ title: 'Plan Selected', type: 'info' })} className="w-full text-xs">Select Plan</Button>
            </Card>

            <Card variant="bento" className="p-5 border-2 border-blue-500 bg-gradient-to-br from-slate-900 to-blue-950 text-white space-y-3 shadow-xl">
              <Badge variant="gold" size="sm">Most Popular</Badge>
              <h3 className="font-bold text-lg text-white">Employer Pro</h3>
              <div className="text-2xl font-black text-emerald-400 font-heading">$299 <span className="text-xs font-normal text-slate-300">/ month</span></div>
              <ul className="text-xs text-blue-200 space-y-1 pt-2">
                <li>• 5 Active Job Postings</li>
                <li>• Talent Match Recommendations</li>
                <li>• Uncapped Candidate Messaging</li>
              </ul>
              <Button variant="accent" size="sm" onClick={() => toast({ title: 'Current Plan Active', type: 'success' })} className="w-full text-xs">Current Active Plan</Button>
            </Card>

            <Card variant="bento" className="p-5 border border-slate-200 dark:border-slate-800 space-y-3">
              <Badge variant="navy" size="sm">Enterprise Tier</Badge>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Unlimited Hiring</h3>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-heading">$799 <span className="text-xs font-normal text-slate-500">/ month</span></div>
              <ul className="text-xs text-slate-500 space-y-1 pt-2">
                <li>• Unlimited Active Postings</li>
                <li>• Dedicated Recruiter Manager</li>
                <li>• Featured Homepage Placement</li>
              </ul>
              <Button variant="outline" size="sm" onClick={() => toast({ title: 'Upgrade Requested', type: 'info' })} className="w-full text-xs">Upgrade to Enterprise</Button>
            </Card>
          </div>

          {/* INVOICES TABLE */}
          <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Billing & Invoice Statements</h3>
              <Button variant="outline" size="sm" onClick={handleExportInvoicesCsv} leftIcon={<FileSpreadsheet className="w-3.5 h-3.5" />}>
                Export CSV
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                    <th className="py-3 px-4">Invoice ID</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {billingInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">{inv.id}</td>
                      <td className="py-3 px-4 text-slate-500">{inv.date}</td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{inv.plan}</td>
                      <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(inv.amount)}</td>
                      <td className="py-3 px-4">
                        <Badge variant="emerald" size="sm" dot>{inv.status}</Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toast({ title: 'Downloading Receipt', description: `Receipt for ${inv.id} saved.`, type: 'info' })}
                          leftIcon={<Download className="w-3.5 h-3.5" />}
                        >
                          Receipt
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 3: CANDIDATE MESSAGES */}
      {activeTab === 'messages' && (
        <Card variant="default" className="p-0 border border-slate-200 dark:border-slate-800 overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[500px]">
          <div className="border-r border-slate-200 dark:border-slate-800 p-4 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Candidate Conversations</h4>
            <div
              onClick={() => setSelectedThread('Sarah Jenkins')}
              className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Sarah Jenkins</span>
                <span className="text-[10px] text-slate-400">10:20 AM</span>
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-1">See you on Zoom tomorrow at 2:00 PM EST.</p>
            </div>
          </div>

          <div className="md:col-span-2 p-6 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-sm text-slate-900 dark:text-white">Conversation with {selectedThread}</span>
              <Badge variant="emerald" size="sm">Interview Stage</Badge>
            </div>

            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.sender === 'You' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3 rounded-2xl max-w-sm text-xs leading-relaxed ${
                      m.sender === 'You'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1">{m.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={sendReply} className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <input
                type="text"
                placeholder="Type reply message..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
              <Button type="submit" variant="accent" size="sm" pill className="font-bold bg-blue-600 text-white">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </div>
  )
}
