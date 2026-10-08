import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  CheckCheck,
  Shield,
  Phone,
  Video,
  Building2,
  Users2,
  FileText,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

interface MessageThread {
  id: string
  title: string
  type: 'underwriting' | 'client' | 'team'
  lastMessage: string
  time: string
  unread: number
  avatar: string
  online?: boolean
}

export const BizProCommunicationPage: React.FC = () => {
  const { toast } = useToast()
  const [selectedThreadId, setSelectedThreadId] = useState('th-1')
  const [messageInput, setMessageInput] = useState('')
  const [messages, setMessages] = useState<Record<string, Array<{ sender: string; text: string; time: string; isMe: boolean }>>>({
    'th-1': [
      { sender: 'Senior Underwriting Desk', text: 'Marcus, we reviewed Beacon Ridge Logistics Corp file. The 12-month debt service coverage ratio is 1.42x.', time: '10:15 AM', isMe: false },
      { sender: 'Marcus Vance', text: 'Excellent! Are we cleared for term sheet generation on the $350k revolving line?', time: '10:22 AM', isMe: true },
      { sender: 'Senior Underwriting Desk', text: 'Yes, term sheet is ready in your portal documents tab. Interest rate set at Prime + 1.50%.', time: '10:30 AM', isMe: false },
    ],
    'th-2': [
      { sender: 'Elena Rostova (NovaCraft)', text: 'Hi Marcus, the CNC machine draw came through this morning. Thank you for expediting!', time: 'Yesterday', isMe: false },
      { sender: 'Marcus Vance', text: 'Thrilled to hear it, Elena! Let me know if you need the invoice schedules for tax filing.', time: 'Yesterday', isMe: true },
    ],
    'th-3': [
      { sender: 'David Vance (Rank 2)', text: 'Marcus, I have a $500k manufacturing deal in Long Island. Could we do a deal desk review together?', time: 'Oct 06', isMe: false },
      { sender: 'Marcus Vance', text: 'Absolutely David. Book a slot on my calendar tomorrow at 3 PM and we will structure it together.', time: 'Oct 06', isMe: true },
    ],
  })

  const threads: MessageThread[] = [
    {
      id: 'th-1',
      title: 'Senior Underwriting Desk Pod 4',
      type: 'underwriting',
      lastMessage: 'Term sheet ready in portal documents tab.',
      time: '10:30 AM',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      online: true,
    },
    {
      id: 'th-2',
      title: 'Elena Rostova (NovaCraft)',
      type: 'client',
      lastMessage: 'CNC machine draw came through this morning.',
      time: 'Yesterday',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'th-3',
      title: 'David Vance (Senior Advisor)',
      type: 'team',
      lastMessage: 'Could we do a deal desk review together?',
      time: 'Oct 06',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
  ]

  const activeThread = threads.find((t) => t.id === selectedThreadId) || threads[0]
  const currentChat = messages[selectedThreadId] || []

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim()) return

    const newMsg = {
      sender: 'Marcus Vance',
      text: messageInput.trim(),
      time: 'Just now',
      isMe: true,
    }

    setMessages((prev) => ({
      ...prev,
      [selectedThreadId]: [...(prev[selectedThreadId] || []), newMsg],
    }))
    setMessageInput('')
  }

  return (
    <>
      <Helmet>
        <title>Communication & Deal Desk | Biz Pro Terminal</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Communication & Deal Desk
            </h1>
            <Badge variant="primary" size="sm">
              Live Messaging
            </Badge>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Direct channels with corporate underwriters, portfolio clients, and downline team advisors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[640px]">
          {/* Threads Sidebar */}
          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] flex flex-col">
            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-hidden"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {threads.map((thread) => {
                const isSelected = thread.id === selectedThreadId
                return (
                  <div
                    key={thread.id}
                    onClick={() => setSelectedThreadId(thread.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-500/50'
                        : 'bg-white dark:bg-[#0D1E36] border-slate-200/60 dark:border-[#1E3A5F]/60 hover:bg-slate-50 dark:hover:bg-[#12294A]'
                    }`}
                  >
                    <Avatar name={thread.title} src={thread.avatar} size="md" status={thread.online ? 'online' : undefined} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">
                          {thread.title}
                        </span>
                        <span className="text-[10px] text-slate-400">{thread.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {thread.lastMessage}
                      </p>
                      <Badge
                        variant={
                          thread.type === 'underwriting'
                            ? 'royal'
                            : thread.type === 'team'
                            ? 'emerald'
                            : 'primary'
                        }
                        size="sm"
                        className="mt-1.5 text-[9px]"
                      >
                        {thread.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Active Chat Window */}
          <Card className="lg:col-span-2 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] flex flex-col justify-between overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar name={activeThread.title} src={activeThread.avatar} size="sm" />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {activeThread.title}
                  </h3>
                  <span className="text-[11px] text-emerald-500 flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Encrypted Banking Channel
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    toast({
                      title: 'Direct Call Initiated',
                      description: `Connecting to ${activeThread.title} secure phone bridge.`,
                      type: 'info',
                    })
                  }
                >
                  <Phone className="w-3.5 h-3.5 mr-1" /> Call
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-[#0A1628]/40">
              {currentChat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] text-slate-400 mb-1 px-1">{msg.sender} • {msg.time}</span>
                  <div
                    className={`max-w-md p-3 rounded-2xl text-xs ${
                      msg.isMe
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] text-slate-900 dark:text-slate-100 rounded-tl-none shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  toast({
                    title: 'Attach File',
                    description: 'Select financial model or agreement to upload.',
                    type: 'info',
                  })
                }
                className="p-2 text-slate-400 hover:text-blue-600 rounded-xl hover:bg-slate-100 dark:hover:bg-[#12294A]"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <input
                type="text"
                placeholder="Type your message to underwriting or client..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 p-2.5 bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-hidden"
              />
              <Button type="submit" variant="primary" size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </>
  )
}
