import React, { useState } from 'react'
import {
  Wallet,
  PlusCircle,
  FileText,
  ShieldCheck,
  ArrowUpRight,
  Landmark,
  CheckCircle2,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { PageTransition } from '@/components/animations/PageTransition'
import { PageLoadingFallback } from '@/components/ui/PageLoadingFallback'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import { useCapitalFacilities, useExecuteDraw } from '@/hooks/queries/useFintechData'
import { formatCurrency } from '@/lib/utils'
import { useToast } from '@/components/ui/Toast'
import type { CapitalFacility } from '@/mock-data/fintechData'

export const CapitalFacilitiesPage: React.FC = () => {
  const { toast } = useToast()
  const { data: facilities, isLoading, isError, refetch } = useCapitalFacilities()
  const { mutate: executeDraw, isPending: isDrawing } = useExecuteDraw()

  const [selectedFacility, setSelectedFacility] = useState<CapitalFacility | null>(null)
  const [drawModalOpen, setDrawModalOpen] = useState(false)
  const [drawAmount, setDrawAmount] = useState('75000')

  const handleOpenDraw = (fac: CapitalFacility) => {
    setSelectedFacility(fac)
    setDrawAmount(Math.min(50000, fac.available).toString())
    setDrawModalOpen(true)
  }

  const handleConfirmDraw = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFacility) return

    executeDraw(
      { facilityId: selectedFacility.id, amount: Number(drawAmount) },
      {
        onSuccess: () => {
          setDrawModalOpen(false)
          toast({
            title: 'Disbursement Wire Initiated',
            description: `Wired ${formatCurrency(Number(drawAmount))} from ${selectedFacility.title} into your operating account.`,
            type: 'success',
          })
        },
        onError: (err: any) => {
          toast({
            title: 'Disbursement Failed',
            description: err.message || 'Unable to disburse funds.',
            type: 'error',
          })
        },
      }
    )
  }

  if (isLoading) return <PageLoadingFallback />
  if (isError) {
    return (
      <ErrorState
        title="Could not load capital facilities"
        message="Unable to connect to the institutional syndicate feed. Please retry."
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <PageTransition>
      <div className="space-y-8 text-left">
        <div className="space-y-2">
          <Breadcrumb items={[{ label: 'Capital Facilities' }]} />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                Institutional Capital Facilities
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Manage your active revolving credit lines, equipment leases, and syndicate allocations.
              </p>
            </div>
            {facilities && facilities.length > 0 && (
              <Button
                variant="accent"
                size="md"
                pill
                onClick={() => handleOpenDraw(facilities[0])}
                leftIcon={<PlusCircle className="w-4 h-4" />}
              >
                Draw Working Capital
              </Button>
            )}
          </div>
        </div>

        {/* Facilities Grid */}
        {(!facilities || facilities.length === 0) ? (
          <EmptyState
            icon={<Wallet className="w-8 h-8 text-blue-500" />}
            title="No facilities active"
            description="Your pre-approved credit lines and term loans will appear here once underwriting completes."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facilities.map((fac) => {
              const pct = Math.round((fac.drawn / fac.limit) * 100)
              return (
                <Card key={fac.id} variant="default" className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="primary" size="sm">
                        {fac.type}
                      </Badge>
                      <Badge variant={fac.status === 'Active' ? 'emerald' : 'gold'} size="sm" dot>
                        {fac.status}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                      {fac.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{fac.provider}</p>

                    <div className="my-5 p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200/60 dark:border-[#1E3A5F] space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Credit Limit:</span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {formatCurrency(fac.limit)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Rate Structure:</span>
                        <span className="font-semibold">{fac.rate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Tenor:</span>
                        <span className="font-semibold">{fac.term}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                        <span>Drawn: {formatCurrency(fac.drawn)} ({pct}%)</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {formatCurrency(fac.available)} Avail.
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => toast({ title: 'Covenant Summary', description: 'Debt service coverage ratio healthy at 2.4x.', type: 'info' })}
                    >
                      Covenants
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => handleOpenDraw(fac)}
                    >
                      Draw Funds
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {/* Disbursement Wire Modal */}
        <Modal
          isOpen={drawModalOpen && !!selectedFacility}
          onClose={() => setDrawModalOpen(false)}
          title={`Draw Capital — ${selectedFacility?.title || ''}`}
          description="Verify amount and disbursement bank. Funds disburse through automated Fedwire."
          maxWidth="md"
        >
          {selectedFacility && (
            <form onSubmit={handleConfirmDraw} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Available Line:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(selectedFacility.available)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Disbursement Fee:</span>
                  <span className="font-bold">0.00% (Included)</span>
                </div>
              </div>

              <FormField label="Draw Amount ($)" required>
                <Input
                  type="number"
                  max={selectedFacility.available}
                  value={drawAmount}
                  onChange={(e) => setDrawAmount(e.target.value)}
                  placeholder="50000"
                />
              </FormField>

              <FormField label="Destination Bank">
                <Input value="JPMorgan Chase Commercial Checking (••• 4912)" disabled />
              </FormField>

              <div className="pt-3 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setDrawModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="accent" pill isLoading={isDrawing}>
                  Confirm Wire
                </Button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </PageTransition>
  )
}
