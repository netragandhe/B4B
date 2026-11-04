import React, { useState } from 'react'
import {
  Bell,
  MessageSquare,
  PlusCircle,
  Trash2,
  Send,
  CheckCircle2,
  Building2,
  SlidersHorizontal,
  Mail,
  DollarSign,
  Clock,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { FormField } from '@/components/ui/FormField'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { MOCK_JOBS, JOB_CATEGORIES, US_STATES_JOB_DATA, StateJobCount } from '@/mock-data/jobsBoardData'
import { useToast } from '@/components/ui/Toast'

export const JobSeekerAlertsInboxPage: React.FC<{ defaultTab?: 'alerts' | 'messages' }> = ({
  defaultTab = 'alerts',
}) => {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState(defaultTab)

  // Job Alerts State
  const [alerts, setAlerts] = useState([
    {
      id: 'al-1',
      name: 'Remote Account Executive Jobs',
      category: 'Account Executives',
      state: 'All States',
      minSalary: '$120,000',
      frequency: 'Daily',
      active: true,
    },
    {
      id: 'al-2',
      name: 'Software Sales in Austin TX',
      category: 'Software Sales',
      state: 'TX',
      minSalary: '$140,000',
      frequency: 'Instant',
      active: true,
    },
  ])

  // New Alert Form State
  const [newKeyword, setNewKeyword] = useState('')
  const [newCategory, setNewCategory] = useState('B2B Sales')
  const [newState, setNewState] = useState('All States')
  const [newMinSalary, setNewMinSalary] = useState('$100,000')
  const [newFrequency, setNewFrequency] = useState<'Instant' | 'Daily' | 'Weekly'>('Daily')

  // Employer Inbox Messages State
  const [selectedThreadId, setSelectedThreadId] = useState('thread-1')
  const [replyText, setReplyText] = useState('')

  const [messageThreads, setMessageThreads] = useState([
    {
      id: 'thread-1',
      company: 'Nexus FinTech Solutions',
      role: 'Senior Enterprise Account Executive',
      recruiter: 'Sarah Jenkins (VP Talent)',
      unread: true,
      lastDate: 'Yesterday at 4:15 PM',
      messages: [
        {
          id: 'm-1',
          sender: 'employer',
          senderName: 'Sarah Jenkins',
          text: 'Hi Alex! Thank you for applying for the Senior Enterprise Account Executive position. Our VP of Sales reviewed your background and would like to invite you for a 30-min video interview.',
          timestamp: 'Yesterday at 4:15 PM',
        },
        {
          id: 'm-2',
          sender: 'seeker',
          senderName: 'Alex Mercer',
          text: 'Thank you Sarah! I am available Thursday or Friday afternoon. Looking forward to discussing the role.',
          timestamp: 'Yesterday at 5:02 PM',
        },
        {
          id: 'm-3',
          sender: 'employer',
          senderName: 'Sarah Jenkins',
          text: 'Great! Calendar invite sent for Thursday at 2:00 PM EST. See you then!',
          timestamp: 'Today at 9:30 AM',
        },
      ],
    },
    {
      id: 'thread-2',
      company: 'Apex Capital Group',
      role: 'B2B Commercial Credit Advisor',
      recruiter: 'David Miller',
      unread: false,
      lastDate: '3 days ago',
      messages: [
        {
          id: 'm-4',
          sender: 'employer',
          senderName: 'David Miller',
          text: 'Hello Alex, we received your commercial credit advisor application packet. We will reach out once team reviews.',
          timestamp: '3 days ago',
        },
      ],
    },
  ])

  const addAlert = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newKeyword.trim()) {
      toast({ title: 'Please enter alert keyword', type: 'error' })
      return
    }
    const newAlert = {
      id: `al-${Date.now()}`,
      name: newKeyword.trim(),
      category: newCategory,
      state: newState,
      minSalary: newMinSalary,
      frequency: newFrequency,
      active: true,
    }
    setAlerts([...alerts, newAlert])
    setNewKeyword('')
    toast({ title: 'New Job Alert Rule Created!', type: 'success' })
  }

  const toggleAlertStatus = (id: string) => {
    setAlerts(
      alerts.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    )
    toast({ title: 'Alert rule updated', type: 'info' })
  }

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id))
    toast({ title: 'Alert rule removed', type: 'info' })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim()) return

    setMessageThreads((prev) =>
      prev.map((t) => {
        if (t.id === selectedThreadId) {
          return {
            ...t,
            messages: [
              ...t.messages,
              {
                id: `m-${Date.now()}`,
                sender: 'seeker',
                senderName: 'Alex Mercer',
                text: replyText.trim(),
                timestamp: 'Just now',
              },
            ],
          }
        }
        return t
      })
    )
    setReplyText('')
    toast({ title: 'Message Sent to Employer!', type: 'success' })
  }

  const activeThread = messageThreads.find((t) => t.id === selectedThreadId) || messageThreads[0]

  return (
    <div className="space-y-8 text-left max-w-6xl mx-auto">
      <SEOHead title="Job Alerts & Messages | Job Seeker Portal" description="Manage custom job alerts and direct employer candidate inbox." />

      <Breadcrumb items={[{ label: 'Job Seeker Portal', href: '/portal/seeker/dashboard' }, { label: 'Alerts & Messages' }]} />

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('alerts')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'alerts'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Bell className="w-4 h-4" /> Job Alerts ({alerts.filter((a) => a.active).length} Active)
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'messages'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Employer Inbox
        </button>
      </div>

      {/* TAB 1: JOB ALERTS MANAGER */}
      {activeTab === 'alerts' && (
        <div className="space-y-6">
          {/* Create Alert Card */}
          <Card variant="default" className="p-6 space-y-4 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-blue-500" /> Create Custom Job Alert Rule
            </h3>
            
            <form onSubmit={addAlert} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <FormField label="Alert Title / Keyword" required>
                  <Input
                    placeholder="e.g. Remote SaaS AE $150k+"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    className="text-xs h-9"
                  />
                </FormField>

                <FormField label="Job Category">
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
                  >
                    {JOB_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Target State">
                  <select
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="All States">All States / Remote</option>
                    {US_STATES_JOB_DATA.map((st: StateJobCount) => (
                      <option key={st.code} value={st.code}>
                        {st.name} ({st.code})
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Notification Frequency">
                  <select
                    value={newFrequency}
                    onChange={(e) => setNewFrequency(e.target.value as any)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="Instant">Instant Push Notification</option>
                    <option value="Daily">Daily Digest</option>
                    <option value="Weekly">Weekly Summary</option>
                  </select>
                </FormField>
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" variant="accent" size="sm" pill className="font-bold bg-blue-600 text-white px-6">
                  <PlusCircle className="w-4 h-4 mr-1.5" /> Save Job Alert Rule
                </Button>
              </div>
            </form>
          </Card>

          {/* Active Alert Rules Table */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Active Job Alert Rules ({alerts.length})
            </h4>

            {alerts.map((al) => (
              <Card key={al.id} variant="default" className="p-4 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{al.name}</span>
                    <Badge variant={al.active ? 'emerald' : 'outline'} size="sm">
                      {al.active ? 'Active' : 'Paused'}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3">
                    <span>Category: <strong>{al.category}</strong></span>
                    <span>State: <strong>{al.state}</strong></span>
                    <span>Min Salary: <strong>{al.minSalary}</strong></span>
                    <span>Frequency: <strong>{al.frequency}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleAlertStatus(al.id)}
                    className="text-xs"
                  >
                    {al.active ? 'Pause Rule' : 'Activate Rule'}
                  </Button>
                  <button
                    onClick={() => deleteAlert(al.id)}
                    className="text-rose-500 hover:text-rose-600 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: EMPLOYER MESSAGES INBOX */}
      {activeTab === 'messages' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Threads Sidebar */}
          <Card variant="default" className="p-4 space-y-3 border border-slate-200 dark:border-slate-800 md:col-span-1">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              Conversations ({messageThreads.length})
            </h3>

            <div className="space-y-2">
              {messageThreads.map((thread) => (
                <div
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={`p-3 rounded-xl cursor-pointer text-xs space-y-1 transition-all ${
                    selectedThreadId === thread.id
                      ? 'bg-blue-50 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-700'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                    <span>{thread.company}</span>
                    {thread.unread && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                  </div>
                  <div className="text-slate-500 line-clamp-1">{thread.role}</div>
                  <div className="text-[10px] text-slate-400">{thread.lastDate}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Conversation Panel */}
          <Card variant="default" className="p-6 border border-slate-200 dark:border-slate-800 md:col-span-2 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">{activeThread.company}</h3>
                  <div className="text-xs text-slate-400">Re: {activeThread.role} • Recruiter: {activeThread.recruiter}</div>
                </div>
                <Badge variant="emerald" size="sm">Verified Employer</Badge>
              </div>

              {/* Chat Messages Log */}
              <div className="space-y-3 min-h-[240px] max-h-[360px] overflow-y-auto pr-2">
                {activeThread.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-xl max-w-[85%] text-xs space-y-1 ${
                      m.sender === 'seeker'
                        ? 'ml-auto bg-blue-600 text-white rounded-br-none'
                        : 'mr-auto bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none'
                    }`}
                  >
                    <div className="font-bold opacity-90">{m.senderName}</div>
                    <div className="leading-relaxed">{m.text}</div>
                    <div className="text-[10px] opacity-75 text-right mt-1">{m.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reply Form */}
            <form onSubmit={handleSendMessage} className="flex gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <input
                type="text"
                placeholder="Type your message to recruiter..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
              <Button type="submit" variant="accent" size="sm" pill className="font-bold bg-blue-600 text-white">
                <Send className="w-4 h-4 mr-1" /> Send
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
