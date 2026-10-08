import React from 'react'
import { TrendingUp, CheckCircle2, Clock, FileText, AlertCircle, ShieldCheck } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CLIENT_FUNDING_APP } from '@/mock-data/clientData'
import { formatCurrency } from '@/lib/utils'

export const ClientFundingStatusPage: React.FC = () => {
  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Funding & Business Plan Status Tracker"
        description="Monitor real-time underwriting milestones, credit committee approvals, and disbursement schedules."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'Funding & Business Plan' }]}
        badge={
          <Badge variant="amber" size="md" dot>
            Step 3: Underwriting Review
          </Badge>
        }
      />

      {/* STEPPER TRACKER */}
      <Card variant="bento" className="p-6 space-y-6 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {CLIENT_FUNDING_APP.facilityName}
            </h3>
            <p className="text-xs text-slate-500">Requested Amount: {formatCurrency(CLIENT_FUNDING_APP.requestedAmount)}</p>
          </div>
          <Badge variant="emerald" size="md">
            Underwriter: Marcus Vance
          </Badge>
        </div>

        {/* Stepper Display */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {CLIENT_FUNDING_APP.steps.map((st, idx) => {
            const isCurrent = idx === CLIENT_FUNDING_APP.currentStepIndex
            const isDone = idx < CLIENT_FUNDING_APP.currentStepIndex
            return (
              <div
                key={st.label}
                className={`p-4 rounded-xl border text-center space-y-2 transition-all ${
                  isDone
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                    : isCurrent
                    ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-400 dark:border-blue-600 ring-2 ring-blue-500/20'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center font-bold text-xs ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-blue-600 text-white animate-pulse'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">{st.label}</div>
                {st.date && <div className="text-[10px] text-slate-500">{st.date}</div>}
              </div>
            )
          })}
        </div>

        {/* Underwriter Notes Callout */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl space-y-1 text-xs">
          <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span>Underwriter Feedback & Next Action</span>
          </div>
          <p className="text-amber-700 dark:text-amber-200">{CLIENT_FUNDING_APP.underwriterNote}</p>
        </div>
      </Card>
    </div>
  )
}
