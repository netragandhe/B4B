import React, { useState } from 'react'
import { MessageSquare, Send, Paperclip, PhoneCall, Video, CheckCircle2 } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { useToast } from '@/components/ui/Toast'
import { CLIENT_COACH_MESSAGES, ClientCoachMessage } from '@/mock-data/clientData'

export const ClientCoachMessagesPage: React.FC = () => {
  const { toast } = useToast()

  const [messages, setMessages] = useState<ClientCoachMessage[]>(CLIENT_COACH_MESSAGES)
  const [inputText, setInputText] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const newMsg: ClientCoachMessage = {
      id: `msg_${Date.now()}`,
      sender: 'Client',
      senderName: 'Apex Freight Team',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      text: inputText,
      timestamp: 'Just now',
    }

    setMessages([...messages, newMsg])
    setInputText('')

    // Simulate auto-reply from coach after 2s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg_reply_${Date.now()}`,
          sender: 'Coach',
          senderName: 'Marcus Vance',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
          text: 'Thanks for the update! I am checking your request with the senior credit committee right now.',
          timestamp: 'Just now',
        },
      ])
      toast({
        title: 'New Reply from Marcus Vance',
        description: 'Your coach responded to your message.',
        type: 'info',
      })
    }, 1500)
  }

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      <PageHeader
        title="Messages with Assigned Business Coach"
        description="Direct line of communication with Senior Advisor Marcus Vance for underwriting, strategy, and facility consultation."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'Coach Messages' }]}
        badge={
          <Badge variant="emerald" size="md" dot>
            Coach Online
          </Badge>
        }
      />

      {/* CHAT CONTAINER CARD */}
      <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col h-[560px]">
        {/* Chat Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" name="Marcus Vance" size="md" />
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">Marcus Vance</div>
              <div className="text-xs text-slate-500">Senior Business Coach • SBA Advisory Desk</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="emerald" size="sm">
              Online Now
            </Badge>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-white dark:bg-slate-950">
          {messages.map((m) => {
            const isMe = m.sender === 'Client'
            return (
              <div key={m.id} className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                <Avatar src={m.avatar} name={m.senderName} size="sm" />
                <div className={`max-w-md p-3 rounded-2xl text-xs space-y-1 ${
                  isMe
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none'
                }`}>
                  <div className="flex items-center justify-between text-[10px] opacity-75 gap-2">
                    <span className="font-bold">{m.senderName}</span>
                    <span>{m.timestamp}</span>
                  </div>
                  <p className="leading-relaxed">{m.text}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Message Input Footer */}
        <form onSubmit={handleSendMessage} className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <button
            type="button"
            onClick={() => toast({ title: 'Attachment', description: 'File picker opened', type: 'info' })}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message to your Business Coach..."
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Button type="submit" variant="accent" size="sm" leftIcon={<Send className="w-3.5 h-3.5" />}>
            Send
          </Button>
        </form>
      </Card>
    </div>
  )
}
