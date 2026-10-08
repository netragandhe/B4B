import React, { useState } from 'react'
import { CreditCard, DollarSign, Download, CheckCircle2, Clock, X, Lock, ShieldCheck } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'
import { CLIENT_INVOICES, ClientInvoice } from '@/mock-data/clientData'
import { formatCurrency } from '@/lib/utils'
import { exportToCsv, exportToPdf } from '@/lib/exportUtils'

export const ClientPaymentsInvoicesPage: React.FC = () => {
  const { toast } = useToast()

  const [invoices, setInvoices] = useState<ClientInvoice[]>(CLIENT_INVOICES)
  const [selectedInvoice, setSelectedInvoice] = useState<ClientInvoice | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ach'>('card')
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4912')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayNow = (inv: ClientInvoice) => {
    setSelectedInvoice(inv)
  }

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedInvoice) return

    setIsProcessing(true)

    setTimeout(() => {
      setInvoices((prev) =>
        prev.map((i) => (i.id === selectedInvoice.id ? { ...i, status: 'Paid' } : i))
      )
      setIsProcessing(false)
      setSelectedInvoice(null)

      toast({
        title: 'Payment Successful!',
        description: `Paid ${formatCurrency(selectedInvoice.amount)} for invoice ${selectedInvoice.invoiceNumber}. Receipt generated.`,
        type: 'success',
      })
    }, 1200)
  }

  const handleExportCsv = () => {
    const headers = ['Invoice Number', 'Service Name', 'Issued Date', 'Due Date', 'Amount', 'Status']
    const rows = invoices.map((i) => [i.invoiceNumber, i.serviceName, i.issuedDate, i.dueDate, i.amount, i.status])
    exportToCsv('Client_Invoices_Report', headers, rows)
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Payments & Invoices"
        description="View past billing statements, download receipts, and settle open retainer fees via secure Credit Card or ACH transfer."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'Payments & Invoices' }]}
        badge={
          <Badge variant="gold" size="md">
            Billing Center
          </Badge>
        }
        actions={
          <Button variant="outline" size="sm" onClick={handleExportCsv} leftIcon={<Download className="w-3.5 h-3.5" />}>
            Download CSV
          </Button>
        }
      />

      {/* INVOICES TABLE */}
      <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Service Item</th>
                <th className="py-3 px-4">Issued Date</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">{inv.invoiceNumber}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{inv.serviceName}</td>
                  <td className="py-3 px-4 text-slate-500">{inv.issuedDate}</td>
                  <td className="py-3 px-4 text-slate-500">{inv.dueDate}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{formatCurrency(inv.amount)}</td>
                  <td className="py-3 px-4">
                    <Badge variant={inv.status === 'Paid' ? 'emerald' : inv.status === 'Unpaid' ? 'gold' : 'danger'} size="sm" dot>
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {inv.status === 'Unpaid' ? (
                      <Button
                        size="sm"
                        variant="accent"
                        onClick={() => handlePayNow(inv)}
                        leftIcon={<CreditCard className="w-3.5 h-3.5" />}
                        className="text-xs"
                      >
                        Pay Now
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toast({ title: 'Receipt Downloaded', description: `Receipt for ${inv.invoiceNumber} saved.`, type: 'info' })}
                        leftIcon={<Download className="w-3.5 h-3.5" />}
                        className="text-xs"
                      >
                        Receipt
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* PAY NOW MODAL FORM */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <Card variant="bento" className="w-full max-w-lg p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-500" />
                  <span>Secure Payment Checkout</span>
                </h3>
                <p className="text-xs text-slate-500">{selectedInvoice.invoiceNumber} • {selectedInvoice.serviceName}</p>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecutePayment} className="space-y-4 text-xs">
              {/* Payment Amount Display */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 text-[11px] block">Total Amount Due</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white font-heading">{formatCurrency(selectedInvoice.amount)}</span>
                </div>
                <Badge variant="emerald" size="sm" dot>
                  256-Bit SSL Secured
                </Badge>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="font-bold block mb-1">Select Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-lg font-bold border text-center text-xs transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-blue-600 text-white border-blue-600 shadow'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Credit / Debit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ach')}
                    className={`p-2.5 rounded-lg font-bold border text-center text-xs transition-all ${
                      paymentMethod === 'ach'
                        ? 'bg-blue-600 text-white border-blue-600 shadow'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    ACH Bank Transfer
                  </button>
                </div>
              </div>

              {/* Card Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="font-bold block mb-1">Card / Account Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Expiration (MM/YY)</label>
                    <input
                      type="text"
                      defaultValue="08/28"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">CVC Code</label>
                    <input
                      type="text"
                      defaultValue="491"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <Button variant="outline" size="sm" onClick={() => setSelectedInvoice(null)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="accent"
                  size="sm"
                  isLoading={isProcessing}
                  leftIcon={<Lock className="w-3.5 h-3.5" />}
                >
                  Pay {formatCurrency(selectedInvoice.amount)}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
