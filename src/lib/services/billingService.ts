import { createStore } from '../createStore'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export interface SubscriptionPlan {
  id: string
  name: string
  rankGroup: 'Rank 1-3 (Account Executive & Senior)' | 'Rank 4-6 (District & Regional Leader)' | 'Rank 7-9 (Executive & National VP)'
  monthlyPrice: number
  annualPrice: number
  priceStatus: 'Confirmed by Client ($25)' | 'Price to be confirmed by client'
  features: string[]
  recommended?: boolean
}

export interface CoachSubscription {
  id: string
  coachId: string
  coachName: string
  coachEmail: string
  coachPhone: string
  planId: string
  planName: string
  monthlyPrice: number
  billingCycle: 'monthly' | 'annual'
  status: 'active' | 'past_due' | 'cancelled'
  startDate: string
  nextBillingDate: string
  cardLast4: string
  cardBrand: string
  discountPercent?: number
  cancelReason?: string
  accessUntil?: string
}

export interface PaymentCard {
  id: string
  brand: 'Visa' | 'Mastercard' | 'Amex' | 'Discover'
  last4: string
  expiry: string
  holderName: string
  isDefault: boolean
}

export interface Invoice {
  id: string
  invoiceNumber: string
  date: string
  dueDate: string
  planName: string
  amount: number
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded'
  paymentMethod: string
  customerName: string
  customerEmail: string
  customerCompany: string
}

export interface BillingProfile {
  activePlanId: string
  planName: string
  monthlyFee: number
  billingCycle: 'monthly' | 'annual'
  status: 'active' | 'past_due' | 'cancelled'
  nextBillingDate: string
  cancelReason?: string
  accessUntil?: string
  autoRenew: boolean
}

export const INITIAL_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan_rookie',
    name: 'B4B Coach Core (Rank 1-3)',
    rankGroup: 'Rank 1-3 (Account Executive & Senior)',
    monthlyPrice: 25,
    annualPrice: 240,
    priceStatus: 'Confirmed by Client ($25)',
    features: [
      'Full CRM & Leads Pipeline Hub Access',
      '16 Commercial Debt & Business Solutions Catalog',
      'AI Marketing Pitch & Client Email Template Hub',
      'Bulletin Sales Scoreboard Producer Rankings',
      'B4B Coach Academy Certification Modules',
      'Direct ACH Commission Settlement',
    ],
  },
  {
    id: 'plan_leader',
    name: 'B4B Coach Leadership (Rank 4-6)',
    rankGroup: 'Rank 4-6 (District & Regional Leader)',
    monthlyPrice: 49,
    annualPrice: 470,
    priceStatus: 'Price to be confirmed by client',
    recommended: true,
    features: [
      'Everything in B4B Coach Core',
      'Team Downline Hierarchy & Multi-Tier Commission Overrides',
      'Regional & District Scoreboards Filter Access',
      'Territory County Allocation & Assignment Dispatcher',
      'Priority Underwriting Pod Direct Line',
      'Candidate Invitation & Sponsor Attribution Code',
    ],
  },
  {
    id: 'plan_executive',
    name: 'B4B Executive Director (Rank 7-9)',
    rankGroup: 'Rank 7-9 (Executive & National VP)',
    monthlyPrice: 99,
    annualPrice: 950,
    priceStatus: 'Price to be confirmed by client',
    features: [
      'Everything in Leadership Plan',
      'Full Federal Reserve District Co-Exclusivity Rights',
      'Syndicated Institutional Debt Facilities Access',
      'Custom White-Label Advisory Subdomain',
      'Dedicated Senior Underwriting Risk Desk Officer',
      'Annual President Circle National Retreat Eligibility',
    ],
  },
]

const INITIAL_BILLING_PROFILE: BillingProfile = {
  activePlanId: 'plan_rookie',
  planName: 'B4B Coach Core (Rank 1-3)',
  monthlyFee: 25,
  billingCycle: 'monthly',
  status: 'active',
  nextBillingDate: '2026-11-01',
  autoRenew: true,
}

const INITIAL_PAYMENT_CARDS: PaymentCard[] = [
  {
    id: 'card_1',
    brand: 'Visa',
    last4: '4242',
    expiry: '12/28',
    holderName: 'Marcus Vance',
    isDefault: true,
  },
  {
    id: 'card_2',
    brand: 'Mastercard',
    last4: '8831',
    expiry: '06/27',
    holderName: 'Marcus Vance',
    isDefault: false,
  },
]

const INITIAL_COACH_SUBSCRIPTIONS: CoachSubscription[] = [
  {
    id: 'sub_1',
    coachId: 'coach_101',
    coachName: 'Marcus Vance',
    coachEmail: 'marcus.vance@b4bamerica.com',
    coachPhone: '(415) 890-1200',
    planId: 'plan_rookie',
    planName: 'B4B Coach Core (Rank 1-3)',
    monthlyPrice: 25,
    billingCycle: 'monthly',
    status: 'active',
    startDate: '2026-08-01',
    nextBillingDate: '2026-11-01',
    cardLast4: '4242',
    cardBrand: 'Visa',
  },
  {
    id: 'sub_2',
    coachId: 'coach_102',
    coachName: 'Elena Rostova',
    coachEmail: 'elena.rostova@b4bamerica.com',
    coachPhone: '(312) 554-9912',
    planId: 'plan_leader',
    planName: 'B4B Coach Leadership (Rank 4-6)',
    monthlyPrice: 49,
    billingCycle: 'monthly',
    status: 'active',
    startDate: '2026-06-15',
    nextBillingDate: '2026-11-15',
    cardLast4: '1092',
    cardBrand: 'Mastercard',
  },
  {
    id: 'sub_3',
    coachId: 'coach_103',
    coachName: 'Derrick Hayes',
    coachEmail: 'derrick.hayes@b4bamerica.com',
    coachPhone: '(214) 778-3011',
    planId: 'plan_executive',
    planName: 'B4B Executive Director (Rank 7-9)',
    monthlyPrice: 99,
    billingCycle: 'monthly',
    status: 'active',
    startDate: '2026-03-01',
    nextBillingDate: '2026-11-01',
    cardLast4: '9943',
    cardBrand: 'Amex',
  },
  {
    id: 'sub_4',
    coachId: 'coach_104',
    coachName: 'Sarah Jenkins',
    coachEmail: 'sarah.j@b4bamerica.com',
    coachPhone: '(404) 912-8833',
    planId: 'plan_rookie',
    planName: 'B4B Coach Core (Rank 1-3)',
    monthlyPrice: 25,
    billingCycle: 'monthly',
    status: 'past_due',
    startDate: '2026-09-01',
    nextBillingDate: '2026-10-01',
    cardLast4: '3341',
    cardBrand: 'Visa',
  },
  {
    id: 'sub_5',
    coachId: 'coach_105',
    coachName: 'James Wilson',
    coachEmail: 'j.wilson@b4bamerica.com',
    coachPhone: '(617) 441-0029',
    planId: 'plan_leader',
    planName: 'B4B Coach Leadership (Rank 4-6)',
    monthlyPrice: 49,
    billingCycle: 'monthly',
    status: 'cancelled',
    startDate: '2026-05-10',
    nextBillingDate: '2026-10-10',
    cancelReason: 'Transitioning to full-time corporate lending desk',
    accessUntil: '2026-10-10',
    cardLast4: '5561',
    cardBrand: 'Discover',
  },
]

const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv_101',
    invoiceNumber: 'INV-2026-101',
    date: '2026-10-01',
    dueDate: '2026-10-01',
    planName: 'B4B Coach Core (Rank 1-3)',
    amount: 25.0,
    status: 'Paid',
    paymentMethod: 'Visa •••• 4242',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.vance@b4bamerica.com',
    customerCompany: 'Vance Capital Advisory LLC',
  },
  {
    id: 'inv_089',
    invoiceNumber: 'INV-2026-089',
    date: '2026-09-01',
    dueDate: '2026-09-01',
    planName: 'B4B Coach Core (Rank 1-3)',
    amount: 25.0,
    status: 'Paid',
    paymentMethod: 'Visa •••• 4242',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.vance@b4bamerica.com',
    customerCompany: 'Vance Capital Advisory LLC',
  },
  {
    id: 'inv_072',
    invoiceNumber: 'INV-2026-072',
    date: '2026-08-01',
    dueDate: '2026-08-01',
    planName: 'B4B Coach Core (Rank 1-3)',
    amount: 25.0,
    status: 'Paid',
    paymentMethod: 'Visa •••• 4242',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.vance@b4bamerica.com',
    customerCompany: 'Vance Capital Advisory LLC',
  },
  {
    id: 'inv_061',
    invoiceNumber: 'INV-2026-061',
    date: '2026-10-01',
    dueDate: '2026-10-05',
    planName: 'B4B Coach Core (Rank 1-3)',
    amount: 25.0,
    status: 'Pending',
    paymentMethod: 'Visa •••• 3341',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@b4bamerica.com',
    customerCompany: 'Jenkins Business Advisors',
  },
]

// Stores
const plansStore = createStore<SubscriptionPlan[]>('billing_plans', INITIAL_PLANS)
const profileStore = createStore<BillingProfile>('billing_profile', INITIAL_BILLING_PROFILE)
const cardsStore = createStore<PaymentCard[]>('billing_cards', INITIAL_PAYMENT_CARDS)
const subscriptionsStore = createStore<CoachSubscription[]>('billing_subscriptions', INITIAL_COACH_SUBSCRIPTIONS)
const invoicesStore = createStore<Invoice[]>('billing_invoices', INITIAL_INVOICES)

export const billingService = {
  // Plans
  usePlans: () => plansStore.useStore(),
  getPlans: () => plansStore.get(),
  updatePlan: (id: string, updates: Partial<SubscriptionPlan>) => {
    plansStore.set((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    )
  },

  // Coach Profile
  useProfile: () => profileStore.useStore(),
  getProfile: () => profileStore.get(),
  updateProfile: (updates: Partial<BillingProfile>) => {
    profileStore.set((prev) => ({ ...prev, ...updates }))
  },

  // Cards
  useCards: () => cardsStore.useStore(),
  getCards: () => cardsStore.get(),
  addCard: (card: Omit<PaymentCard, 'id' | 'isDefault'>) => {
    const newCard: PaymentCard = {
      id: `card_${Date.now()}`,
      ...card,
      isDefault: cardsStore.get().length === 0,
    }
    cardsStore.set((prev) => [...prev, newCard])
    return newCard
  },
  setDefaultCard: (cardId: string) => {
    cardsStore.set((prev) =>
      prev.map((c) => ({
        ...c,
        isDefault: c.id === cardId,
      }))
    )
  },
  deleteCard: (cardId: string) => {
    cardsStore.set((prev) => prev.filter((c) => c.id !== cardId))
  },

  // Upgrade / Downgrade Plan
  changePlan: (planId: string, user: { name: string; email: string; company?: string }) => {
    const plans = plansStore.get()
    const plan = plans.find((p) => p.id === planId)
    if (!plan) return

    profileStore.set((prev) => ({
      ...prev,
      activePlanId: plan.id,
      planName: plan.name,
      monthlyFee: plan.monthlyPrice,
      status: 'active',
      cancelReason: undefined,
      accessUntil: undefined,
    }))

    const defaultCard = cardsStore.get().find((c) => c.isDefault) || cardsStore.get()[0]

    // Generate immediate invoice
    const newInvoice: Invoice = {
      id: `inv_${Date.now()}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
      planName: plan.name,
      amount: plan.monthlyPrice,
      status: 'Paid',
      paymentMethod: defaultCard ? `${defaultCard.brand} •••• ${defaultCard.last4}` : 'Card on File',
      customerName: user.name,
      customerEmail: user.email,
      customerCompany: user.company || 'B4B Coach Advisory',
    }

    invoicesStore.set((prev) => [newInvoice, ...prev])
    return newInvoice
  },

  // Cancel / Reactivate
  cancelSubscription: (reason: string) => {
    const today = new Date()
    const nextMonth = new Date(today.setMonth(today.getMonth() + 1))
    const accessUntil = nextMonth.toISOString().split('T')[0]

    profileStore.set((prev) => ({
      ...prev,
      status: 'cancelled',
      cancelReason: reason,
      accessUntil,
      autoRenew: false,
    }))
  },
  reactivateSubscription: () => {
    profileStore.set((prev) => ({
      ...prev,
      status: 'active',
      cancelReason: undefined,
      accessUntil: undefined,
      autoRenew: true,
    }))
  },

  // Invoices
  useInvoices: () => invoicesStore.useStore(),
  getInvoices: () => invoicesStore.get(),
  payInvoice: (invoiceId: string) => {
    invoicesStore.set((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: 'Paid' } : inv))
    )
  },
  refundInvoice: (invoiceId: string) => {
    invoicesStore.set((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: 'Refunded' } : inv))
    )
  },

  // Admin Subscriptions
  useSubscriptions: () => subscriptionsStore.useStore(),
  getSubscriptions: () => subscriptionsStore.get(),
  updateSubscription: (id: string, updates: Partial<CoachSubscription>) => {
    subscriptionsStore.set((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, ...updates } : sub))
    )
  },

  // PDF Generator
  generatePdfInvoice: (invoice: Invoice) => {
    const doc = new jsPDF()

    // Top Navy Header
    doc.setFillColor(13, 30, 54) // #0D1E36
    doc.rect(0, 0, 210, 38, 'F')

    doc.setFontSize(20)
    doc.setTextColor(255, 255, 255)
    doc.text('B4B AMERICA', 14, 22)
    doc.setFontSize(10)
    doc.setTextColor(165, 180, 252)
    doc.text('Commercial Capital & B4B Coach Advisory Platform', 14, 30)

    doc.setFontSize(16)
    doc.setTextColor(255, 255, 255)
    doc.text('INVOICE / RECEIPT', 196, 24, { align: 'right' })

    // Invoice Meta
    doc.setFontSize(10)
    doc.setTextColor(51, 65, 85)
    doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 14, 52)
    doc.text(`Date of Issue: ${invoice.date}`, 14, 58)
    doc.text(`Due Date: ${invoice.dueDate}`, 14, 64)
    doc.text(`Status: ${invoice.status.toUpperCase()}`, 14, 70)

    doc.text(`Billed To:`, 130, 52)
    doc.setFont('helvetica', 'bold')
    doc.text(invoice.customerName, 130, 58)
    doc.setFont('helvetica', 'normal')
    doc.text(invoice.customerCompany || 'B4B Coach Partner', 130, 64)
    doc.text(invoice.customerEmail, 130, 70)

    // Table of items
    autoTable(doc, {
      startY: 82,
      head: [['Description', 'Billing Period', 'Qty', 'Unit Price', 'Total']],
      body: [
        [
          invoice.planName,
          `${invoice.date} to ${new Date(new Date(invoice.date).setMonth(new Date(invoice.date).getMonth() + 1)).toISOString().split('T')[0]}`,
          '1',
          `$${invoice.amount.toFixed(2)}`,
          `$${invoice.amount.toFixed(2)}`,
        ],
      ],
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 9, cellPadding: 5 },
    })

    const finalY = (doc as any).lastAutoTable?.finalY || 120

    // Summary Box
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Payment Method:', 14, finalY + 15)
    doc.setFont('helvetica', 'normal')
    doc.text(invoice.paymentMethod, 55, finalY + 15)

    doc.setFont('helvetica', 'bold')
    doc.text('Total Amount:', 130, finalY + 15)
    doc.setFontSize(14)
    if (invoice.status === 'Paid') {
      doc.setTextColor(16, 185, 129) // Emerald
    } else if (invoice.status === 'Refunded') {
      doc.setTextColor(239, 68, 68) // Red
    } else {
      doc.setTextColor(245, 158, 11) // Amber
    }
    doc.text(`$${invoice.amount.toFixed(2)} USD`, 196, finalY + 15, { align: 'right' })

    // Footer
    doc.setFontSize(8)
    doc.setTextColor(148, 163, 184)
    doc.text(
      'Thank you for partnering with B4B America. For billing questions, contact support@b4bamerica.com',
      105,
      280,
      { align: 'center' }
    )

    doc.save(`${invoice.invoiceNumber}.pdf`)
  },

  reset: () => {
    plansStore.reset()
    profileStore.reset()
    cardsStore.reset()
    subscriptionsStore.reset()
    invoicesStore.reset()
  },
}
