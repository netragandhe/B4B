import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Building2,
  TrendingUp,
  FileCheck2,
  MessageSquare,
  Calendar,
  Plus,
  Upload,
  PhoneCall,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Zap,
  Award,
  ArrowUpRight,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { useAuth } from '@/hooks/useAuth'
import { CLIENT_ACTIVE_ORDERS, CLIENT_FUNDING_APP, CLIENT_COACH_MESSAGES } from '@/mock-data/clientData'
import { formatCurrency } from '@/lib/utils'

export const ClientDashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title={`Welcome back, ${user?.name || 'Apex Freight Logistics'}!`}
        description="Monitor your active capital facilities, funding application progress, credit scores, and coach advisory sessions."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'Client Dashboard' }]}
        badge={
          <Badge variant="emerald" size="md" dot>
            Business Health: 82 / 100
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/portal/client/documents')}
              leftIcon={<Upload className="w-3.5 h-3.5 text-blue-500" />}
            >
              Upload Document
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => navigate('/portal/client/orders')}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Request a Service
            </Button>
          </div>
        }
      />

      {/* QUICK ACTIONS BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card
          variant="bento"
          onClick={() => navigate('/portal/client/orders')}
          className="p-4 cursor-pointer hover:border-blue-500/50 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                Request a Service
              </h4>
              <p className="text-xs text-slate-500">Apply for 16 financial & advisory services</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
        </Card>

        <Card
          variant="bento"
          onClick={() => navigate('/portal/client/documents')}
          className="p-4 cursor-pointer hover:border-emerald-500/50 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                Upload Document
              </h4>
              <p className="text-xs text-slate-500">Upload P&L, tax returns, or bank statements</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
        </Card>

        <Card
          variant="bento"
          onClick={() => navigate('/portal/client/book-coach')}
          className="p-4 cursor-pointer hover:border-purple-500/50 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">
                Book a Coach Call
              </h4>
              <p className="text-xs text-slate-500">Schedule 1-on-1 strategy with Marcus Vance</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 transition-colors" />
        </Card>
      </div>

      {/* FUNDING APPLICATION TRACKER STEPPER */}
      <Card variant="bento" className="p-6 space-y-4 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="navy" size="sm">
                Active Application
              </Badge>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {CLIENT_FUNDING_APP.facilityName} ({formatCurrency(CLIENT_FUNDING_APP.requestedAmount)})
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">{CLIENT_FUNDING_APP.underwriterNote}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/portal/client/funding-status')}>
            View Full Pipeline
          </Button>
        </div>

        {/* Stepper Timeline */}
        <div className="grid grid-cols-5 gap-2 pt-2">
          {CLIENT_FUNDING_APP.steps.map((st, idx) => {
            const isCurrent = idx === CLIENT_FUNDING_APP.currentStepIndex
            const isDone = idx < CLIENT_FUNDING_APP.currentStepIndex
            return (
              <div key={st.label} className="flex flex-col items-center text-center space-y-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isDone
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                      : isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-500/20 animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span className={`text-xs font-bold ${isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}>
                  {st.label}
                </span>
                {st.date && <span className="text-[10px] text-slate-400">{st.date}</span>}
              </div>
            )
          })}
        </div>
      </Card>

      {/* ACTIVE SERVICES & BUSINESS CREDIT SCORE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ACTIVE SERVICES WITH PROGRESS BARS */}
        <Card variant="default" className="lg:col-span-7 p-5 space-y-4 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span>Active Services & Orders Progress</span>
            </h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/portal/client/orders')}>
              All Orders
            </Button>
          </div>

          <div className="space-y-4">
            {CLIENT_ACTIVE_ORDERS.map((ord) => (
              <div key={ord.id} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{ord.serviceName} </span>
                    <span className="text-slate-500">({formatCurrency(ord.amount)})</span>
                  </div>
                  <Badge variant={ord.status === 'Active' ? 'emerald' : 'amber'} size="sm">
                    {ord.status}
                  </Badge>
                </div>
                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Fulfillment Progress</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{ord.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${ord.progress}%` }} />
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                  <span>Assigned Advisor: {ord.assignedAdvisor}</span>
                  <span>Est: {ord.estimatedCompletion}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* BUSINESS CREDIT SCORE CARD & UPCOMING CALL */}
        <div className="lg:col-span-5 space-y-6">
          {/* Credit Score Widget */}
          <Card variant="bento" className="p-5 space-y-4 border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-900 to-blue-950 text-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Business Credit Bureau Scores
              </span>
              <Badge variant="emerald" size="sm">
                Paydex 82 / 100
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-2">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="text-xl font-bold text-emerald-400 font-heading">82</div>
                <div className="text-[10px] text-slate-400">D&B Paydex</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="text-xl font-bold text-blue-400 font-heading">78</div>
                <div className="text-[10px] text-slate-400">Experian Biz</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="text-xl font-bold text-purple-400 font-heading">81</div>
                <div className="text-[10px] text-slate-400">Equifax Commercial</div>
              </div>
            </div>

            <p className="text-[11px] text-blue-200 text-center">
              Your business credit score qualifies you for Prime SBA and Tier-1 Revolving Lines.
            </p>
          </Card>

          {/* Upcoming Coach Call Card */}
          <Card variant="default" className="p-4 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-purple-500" /> Upcoming Strategy Call
              </span>
              <Badge variant="navy" size="sm">
                Tomorrow 2:00 PM
              </Badge>
            </div>

            <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <Avatar src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" name="Marcus Vance" size="md" />
              <div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">Marcus Vance</div>
                <div className="text-[11px] text-slate-500">Senior Business Coach • SBA Advisory</div>
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={() => navigate('/portal/client/book-coach')} className="w-full text-xs">
              Reschedule or Change Time
            </Button>
          </Card>
        </div>
      </div>

      {/* RECENT COACH MESSAGES SNIPPET */}
      <Card variant="bento" className="p-5 space-y-3 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between border-b pb-2 border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-blue-500" /> Recent Coach Messages
          </h3>
          <Button variant="ghost" size="sm" onClick={() => navigate('/portal/client/messages')}>
            Open Chat Room
          </Button>
        </div>

        <div className="space-y-2">
          {CLIENT_COACH_MESSAGES.map((msg) => (
            <div key={msg.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 text-xs flex items-start gap-3">
              <Avatar src={msg.avatar} name={msg.senderName} size="sm" />
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{msg.senderName}</span>
                  <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
