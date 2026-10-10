import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  ArrowRight,
  Minimize2,
  Trash2,
  HelpCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { brandConfig } from '@/config/brand'

interface ChatMessage {
  id: string
  sender: 'ai' | 'user'
  text: string
  actionLink?: { label: string; url: string }
  timestamp: string
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm-1',
    sender: 'ai',
    text: `Hello! I'm your ${brandConfig.shortName} Small Business AI Copilot. I can guide you through our 16 solutions, credit-building steps, SBA loan criteria, or connect you with a live coach. What can I assist you with today?`,
    timestamp: 'Just now',
  },
]

const PROMPT_SUGGESTIONS = [
  'How do I build business credit without a PG?',
  'How much does a custom business plan cost?',
  'What are the requirements for business loans?',
  'Can you lower our credit card processing fees?',
  'How does Fractional CFO coaching work?',
]

export const GlobalAiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen, isTyping])

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage.trim()
    if (!text) return

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInputMessage('')
    setIsTyping(true)

    // AI Response Logic (Mock Expert Fintech Copilot)
    setTimeout(() => {
      let aiResponseText = ''
      let actionLink: { label: string; url: string } | undefined

      const lower = text.toLowerCase()
      if (lower.includes('credit') || lower.includes('paydex') || lower.includes('pg')) {
        aiResponseText = `Building corporate credit without personal guarantees requires establishing a clean D-U-N-S® profile and graduating through 4 tiers: starting with Net-30 vendor trade accounts (Tier 1), moving to fleet and store accounts (Tier 2-3), and unlocking uncollateralized bank revolvers (Tier 4). Most of our clients reach an 80+ PAYDEX score in 60-90 days.`
        actionLink = { label: 'Explore Build Business Credit Solution', url: '/solutions/build-business-credit' }
      } else if (lower.includes('business plan') || lower.includes('cost') || lower.includes('plan')) {
        aiResponseText = `Our bespoke bank-ready and SBA 7(a) compliant business plans start around $2,500. They include 5-year pro-forma financial models (cash flows, balance sheets, break-even analysis), market research, and 60 days of complimentary lender revisions until submission.`
        actionLink = { label: 'View Business Plans Package', url: '/solutions/business-plans' }
      } else if (lower.includes('loan') || lower.includes('capital') || lower.includes('funding')) {
        aiResponseText = `We arrange facilities up to $5,000,000—including Prime-linked working capital revolvers, revenue-based facilities, SBA 7(a) guarantee bridges, and equipment leases. Preliminary pre-qualification takes under 3 minutes with zero impact to your personal credit score.`
        actionLink = { label: 'Pre-Qualify for Business Loans', url: '/apply' }
      } else if (lower.includes('payment') || lower.includes('fee') || lower.includes('pos') || lower.includes('merchant')) {
        aiResponseText = `We offer true interchange-plus wholesale merchant rates with next-day and weekend batch funding. We also deploy smart touch POS hardware and automated chargeback protection that saves businesses an average of $1,200+/month.`
        actionLink = { label: 'Accept Payments & POS Rates', url: '/solutions/accept-payments' }
      } else if (lower.includes('cfo') || lower.includes('coach') || lower.includes('consulting')) {
        aiResponseText = `Our fractional CFOs and business coaches are former corporate controllers and commercial credit officers. You get 1-on-1 strategy calls, 13-week cash forecasting, and debt covenant management without executive salary overhead.`
        actionLink = { label: 'Meet the Advisory Practice', url: '/advisory' }
      } else {
        aiResponseText = `Thank you for your question! OAL Network offers 16 core solutions designed to help independent small businesses thrive—from capital sourcing and business credit to payment processing, marketing, and fractional CFO guidance. Would you like to connect with a live business coach?`
        actionLink = { label: 'Speak with a Live Coach', url: '/contact' }
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        actionLink,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 700)
  }

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[var(--blue-600)] text-white shadow-xl shadow-[var(--blue-600)]/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-[var(--blue-600)]/30 select-none"
          aria-label="Open AI Business Advisor Chat"
        >
          <div className="relative">
            <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[var(--green-600)] ring-2 ring-[var(--surface)] animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-tight pr-1">Ask OAL Copilot</span>
        </button>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 sm:right-6 z-50 w-[92vw] sm:w-[410px] h-[580px] max-h-[85vh] rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-2xl flex flex-col overflow-hidden animate-scaleUp text-left">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[var(--navy-950)] via-[var(--navy-900)] to-[var(--navy-800)] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[var(--blue-600)] text-white flex items-center justify-center shadow-md">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold tracking-tight">OAL Business Copilot</h4>
                  <Badge variant="emerald" size="sm" dot className="text-[9px] py-0 px-1.5">
                    Online
                  </Badge>
                </div>
                <p className="text-[10px] text-[var(--sky-50)]/80">Small Business Intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages(INITIAL_MESSAGES)}
                className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10"
                title="Reset conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-[var(--bg)]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-[var(--sky-50)] text-[var(--blue-600)] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className="max-w-[80%] space-y-1.5">
                  <div
                    className={`p-3 rounded-2xl leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[var(--blue-600)] text-white rounded-br-xs shadow-sm'
                        : 'bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] rounded-bl-xs shadow-xs'
                    }`}
                  >
                    <p>{m.text}</p>
                    {m.actionLink && (
                      <div className="mt-2.5 pt-2 border-t border-[var(--border)]">
                        <Link
                          to={m.actionLink.url}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 font-bold text-[var(--blue-600)] hover:underline"
                        >
                          <span>{m.actionLink.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] block px-1">{m.timestamp}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs pl-8">
                <span className="w-2 h-2 rounded-full bg-[var(--blue-600)] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[var(--blue-400)] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[var(--navy-800)] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px]">Analyzing solution database...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2 border-t border-[var(--border)] bg-[var(--surface)] overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
            {PROMPT_SUGGESTIONS.map((sug) => (
              <button
                key={sug}
                onClick={() => handleSendMessage(sug)}
                className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-[var(--sky-50)] hover:bg-[var(--blue-600)] text-[var(--navy-900)] hover:text-white border border-[var(--border)] transition-colors shrink-0"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Text Input Footer */}
          <div className="p-3 bg-[var(--surface)] border-t border-[var(--border)] flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about loans, credit, tax prep, POS..."
              className="flex-1 h-9 px-3 text-xs bg-[var(--bg)] rounded-xl border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-[var(--blue-600)]/20"
            />
            <Button
              size="sm"
              variant="primary"
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim()}
              className="h-9 px-3 rounded-xl"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
