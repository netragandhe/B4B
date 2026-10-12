import React, { useState } from 'react'
import { TrendingUp, CheckCircle2, Clock, FileText, AlertCircle, ShieldCheck } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CLIENT_FUNDING_APP } from '@/mock-data/clientData'
import { formatCurrency } from '@/lib/utils'

const STEP_FEEDBACK: Record<number, string> = {
  0: 'Application submitted successfully — All corporate registration details and preliminary borrowing request ($750,000) logged and approved.',
  1: 'Documentation verified — Full file package including 3 years corporate tax returns, balance sheets, and debt schedules verified by compliance team.',
  2: 'Underwriting review completed — Risk grade A verified. Cash flow analysis confirms strong debt service coverage ratio (DSCR 1.8x).',
  3: 'Credit committee approved — Formal commitment letter issued with Prime + 1.25% pricing and 10-year term sheet locked.',
  4: 'Facility funded and active — Closing documents executed, escrow settled, and working capital line is fully active and ready for draws.',
}

export const ClientFundingStatusPage: React.FC = () => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(4)
  const currentStep = CLIENT_FUNDING_APP.steps[selectedStepIndex] || CLIENT_FUNDING_APP.steps[4]

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Funding & Business Plan Status Tracker"
        description="Monitor real-time underwriting milestones, credit committee approvals, and disbursement schedules."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'Funding & Business Plan' }]}
        badge={
          <Badge variant="emerald" size="md" dot>
            Step {selectedStepIndex + 1}: {currentStep.label} (Active)
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

        {/* Stepper Display - Active Working Clickable Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {CLIENT_FUNDING_APP.steps.map((st, idx) => {
            const isSelected = idx === selectedStepIndex
            return (
              <button
                key={st.label}
                type="button"
                onClick={() => setSelectedStepIndex(idx)}
                className={`p-4 rounded-xl border text-center space-y-2 transition-all cursor-pointer w-full focus:outline-none select-none ${
                  isSelected
                    ? 'bg-emerald-100/80 dark:bg-emerald-900/40 border-emerald-500 ring-2 ring-emerald-500/50 shadow-md scale-[1.02]'
                    : 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 hover:bg-emerald-100/40 shadow-xs'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center font-bold text-xs shadow-xs transition-transform ${
                    isSelected ? 'bg-emerald-600 text-white scale-110 ring-2 ring-emerald-400' : 'bg-emerald-500 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center justify-center gap-1.5">
                  <span>{st.label}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping inline-block" />
                  )}
                </div>
                {st.date && (
                  <div className={`text-[10px] font-semibold ${isSelected ? 'text-emerald-800 dark:text-emerald-300' : 'text-emerald-700 dark:text-emerald-400'}`}>
                    {st.date}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Underwriter Notes Callout */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl space-y-1.5 text-xs">
          <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Milestone Feedback & Details ({currentStep.label})</span>
            </div>
            {currentStep.date && (
              <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                Completed on {currentStep.date}
              </span>
            )}
          </div>
          <p className="text-amber-700 dark:text-amber-200">
            {STEP_FEEDBACK[selectedStepIndex] || CLIENT_FUNDING_APP.underwriterNote}
          </p>
        </div>
      </Card>
    </div>
  )
}
