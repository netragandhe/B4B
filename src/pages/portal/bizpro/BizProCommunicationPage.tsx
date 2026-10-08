import React, { useState } from 'react'
import {
  MessageSquare,
  Mail,
  Phone,
  Send,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  User,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Tabs } from '@/components/ui/Tabs'
import { Avatar } from '@/components/ui/Avatar'
import { Modal } from '@/components/ui/Modal'
import { FormField } from '@/components/ui/FormField'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/components/ui/Toast'

export const BizProCommunicationPage: React.FC = () => {
  const { toast } = useToast()
  const [channelTab, setChannelTab] = useState('Email')
  const [selectedThreadId, setSelectedThreadId] = useState('th_1')
  const [composeModalOpen, setComposeModalOpen] = useState(false)
  const [replyText, setReplyText] = useState('')

  const threads = [
    {
      id: 'th_1',
      sender: 'Marcus Vance',
      company: 'Apex Freight LLC',
      channel: 'Email',
      subject: 'Revolving Line Term Sheet Verification',
      preview: 'Thanks David, I signed the term sheet for the $850k facility line.',
      time: '10 mins ago',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'th_2',
      sender: 'Harrison Ford',
      company: 'Apex Logistics',
      channel: 'SMS',
      subject: 'SMS: 13-Week CFO Model',
      preview: 'Can we schedule a quick call tomorrow regarding the treasury forecast?',
      time: '1 hour ago',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'th_3',
      sender: 'Samantha Reed',
      company: 'BioTech Solutions',
      channel: 'Chat',
      subject: 'Chat: Equipment Lease Review',
      preview: 'Underwriting requested the updated 2025 tax returns.',
      time: '3 hours ago',
      unread: false,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
  ]

  const activeThread = threads.find((t) => t.id === selectedThreadId) || threads[0]

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim()) return
    setReplyText('')
    toast({
      title: 'Message Dispatched',
      description: `Sent reply via ${activeThread.channel} to ${activeThread.sender}.`,
      type: 'success',
    })
  }

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Communication & Message Desk"
        description="Unified inbox for email campaigns, client SMS messages, and internal chat threads."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Communication', icon: <MessageSquare className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        actions={
          <Button
            variant="accent"
            size="md"
            onClick={() => setComposeModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Compose New Message
          </Button>
        }
      />

      {/* CHANNEL TABS */}
      <Tabs
        tabs={[
          { id: 'Email', label: 'Email Threads' },
          { id: 'SMS', label: 'SMS & Text' },
          { id: 'Chat', label: 'Live Client Chat' },
        ]}
        activeTab={channelTab}
        onChange={setChannelTab}
      />

      {/* MAIN INBOX TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT LIST: THREADS */}
        <Card variant="bento" className="lg:col-span-5 p-3 space-y-2">
          <Input placeholder="Search messages..." leftIcon={<Search className="w-4 h-4" />} className="text-xs mb-2" />
          <div className="space-y-1.5 max-h-[500px] overflow-y-auto custom-scrollbar">
            {threads
              .filter((t) => channelTab === 'Email' || t.channel === channelTab)
              .map((th) => {
                const isSelected = th.id === selectedThreadId
                return (
                  <div
                    key={th.id}
                    onClick={() => setSelectedThreadId(th.id)}
                    className={`p-3 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-blue-50/90 dark:bg-[#12294A] border-blue-500 shadow-xs'
                        : 'bg-white dark:bg-[#0D1E36] border-slate-200 dark:border-[#1E3A5F] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-2">
                        <Avatar src={th.avatar} name={th.sender} size="xs" />
                        <span className="font-bold text-slate-900 dark:text-white truncate">{th.sender}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{th.time}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{th.subject}</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{th.preview}</p>
                  </div>
                )
              })}
          </div>
        </Card>

        {/* RIGHT THREAD VIEW & REPLY BOX */}
        <Card variant="bento" className="lg:col-span-7 p-5 flex flex-col justify-between min-h-[500px]">
          {activeThread ? (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              {/* Thread Header */}
              <div className="pb-3 border-b border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar src={activeThread.avatar} name={activeThread.sender} size="md" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{activeThread.sender}</h3>
                    <p className="text-[11px] text-slate-500">{activeThread.company} • Via {activeThread.channel}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400">{activeThread.time}</span>
              </div>

              {/* Message Content */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-[#12294A] text-xs text-slate-800 dark:text-slate-200 space-y-2 max-w-lg">
                  <p className="font-bold">{activeThread.subject}</p>
                  <p className="leading-relaxed">{activeThread.preview}</p>
                </div>
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="pt-3 border-t border-slate-100 dark:border-[#1E3A5F] space-y-3">
                <Textarea
                  placeholder={`Reply via ${activeThread.channel}...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={3}
                  className="text-xs"
                />
                <div className="flex justify-end">
                  <Button type="submit" variant="primary" size="sm" leftIcon={<Send className="w-3.5 h-3.5" />}>
                    Send Reply
                  </Button>
                </div>
              </form>
            </div>
          ) : null}
        </Card>
      </div>

      {/* COMPOSE MODAL */}
      <Modal
        isOpen={composeModalOpen}
        onClose={() => setComposeModalOpen(false)}
        title="Compose New Message"
        description="Dispatch email or SMS directly to your lead/client."
        maxWidth="md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setComposeModalOpen(false)
            toast({ title: 'Message Dispatched', type: 'success' })
          }}
          className="space-y-4"
        >
          <FormField label="Recipient Email / Phone" required id="comp-recip">
            <Input id="comp-recip" placeholder="m.vance@apexlogistics.io" required />
          </FormField>

          <FormField label="Subject" required id="comp-subj">
            <Input id="comp-subj" placeholder="B4B Capital Line Update" required />
          </FormField>

          <FormField label="Message Body" required id="comp-body">
            <Textarea id="comp-body" placeholder="Write message..." rows={4} required />
          </FormField>

          <div className="pt-3 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setComposeModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" leftIcon={<Send className="w-4 h-4" />}>
              Send Message
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
