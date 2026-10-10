import React, { useState } from 'react'
import {
  Sparkles,
  ArrowRight,
  Check,
  AlertCircle,
  Mail,
  Lock,
  Search,
  Calendar,
  Layers,
  Sliders,
  DollarSign,
  TrendingUp,
  Shield,
  ExternalLink,
} from 'lucide-react'
import {
  Button,
  Input,
  PasswordInput,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Switch,
  DatePicker,
  FileUpload,
  OtpInput,
  FormField,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatCard,
  Badge,
  Avatar,
  Tabs,
  Modal,
  Drawer,
  Tooltip,
  Skeleton,
  EmptyState,
  DataTable,
  Stepper,
  Breadcrumb,
  CountUp,
  useToast,
} from '@/components/ui'
import { BrandLogo, brandConfig } from '@/config/brand'

export const DesignSystemPage: React.FC = () => {
  const { toast } = useToast()

  // State for interactive component demos
  const [activeTab, setActiveTab] = useState('segmented-1')
  const [activeUnderlineTab, setActiveUnderlineTab] = useState('tab-1')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [checkboxState, setCheckboxState] = useState(true)
  const [switchState, setSwitchState] = useState(true)
  const [radioState, setRadioState] = useState('revolving')
  const [otpVal, setOtpVal] = useState('849201')
  const [passwordVal, setPasswordVal] = useState('FintechSec!99')
  const [stepperStep, setStepperStep] = useState(1)

  // B4B America Brand Color Tokens
  const colorSwatches = [
    { name: '--navy-900', hex: 'var(--navy-900)', class: 'bg-[var(--navy-900)]', dark: true },
    { name: '--navy-800', hex: 'var(--navy-800)', class: 'bg-[var(--navy-800)]', dark: true },
    { name: '--navy-950', hex: 'var(--navy-950)', class: 'bg-[var(--navy-950)]', dark: true },
    { name: '--blue-600', hex: 'var(--blue-600)', class: 'bg-[var(--blue-600)]', dark: true },
    { name: '--blue-400', hex: 'var(--blue-400)', class: 'bg-[var(--blue-400)]', dark: false },
    { name: '--sky-50', hex: 'var(--sky-50)', class: 'bg-[var(--sky-50)]', dark: false },
    { name: '--gold-500', hex: 'var(--gold-500)', class: 'bg-[var(--gold-500)]', dark: false },
    { name: '--green-600', hex: 'var(--green-600)', class: 'bg-[var(--green-600)]', dark: true },
  ]

  // Demo DataTable sample
  const sampleTableData = [
    { id: '1', facility: 'Growth Capital Revolver', limit: '$500,000', status: 'Active', rate: 'Prime + 1.25%' },
    { id: '2', facility: 'Revenue-Based Credit', limit: '$250,000', status: 'Active', rate: '1.09x Cap' },
    { id: '3', facility: 'Equipment Leasing Line', limit: '$100,000', status: 'Underwriting', rate: '5.9% Fixed' },
    { id: '4', facility: 'SBA 7(a) Guarantee Bridge', limit: '$750,000', status: 'Pending Review', rate: 'Prime + 2.25%' },
    { id: '5', facility: 'Accounts Receivable Line', limit: '$350,000', status: 'Active', rate: 'Prime + 1.5%' },
  ]

  const sampleTableColumns = [
    { key: 'facility', header: 'Facility Name', sortable: true },
    { key: 'limit', header: 'Facility Limit', sortable: true },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (item: any) => (
        <Badge variant={item.status === 'Active' ? 'emerald' : 'gold'} size="sm" dot>
          {item.status}
        </Badge>
      ),
    },
    { key: 'rate', header: 'Pricing Rate' },
  ]

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-12 px-4 sm:px-6 lg:px-8 text-left transition-colors">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Title Bar & Quick Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BrandLogo size="md" />
              <Badge variant="navy" size="md">
                Master Design System
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[var(--text)] mt-1">
              Fintech Component & Token Library
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              Interactive review of all color variables, button variants, input states, cards, and modal dialogs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                window.location.href = '/'
              }}
              rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
            >
              Back to App
            </Button>
          </div>
        </div>

        {/* SECTION 1: COLOR PALETTE */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              1. Color Tokens & CSS Variables
            </h2>
            <span className="text-xs text-slate-500">Light & Dark Mode Dynamic Variables</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {colorSwatches.map((swatch) => (
              <div
                key={swatch.name}
                className="rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--surface)] shadow-xs"
              >
                <div className={`h-16 w-full ${swatch.class} flex items-end p-2`}>
                  <span
                    className={`text-[10px] font-mono font-bold ${
                      swatch.dark ? 'text-white' : 'text-[var(--navy-900)]'
                    }`}
                  >
                    {swatch.hex}
                  </span>
                </div>
                <div className="p-2.5 text-left">
                  <p className="text-xs font-bold text-[var(--text)] truncate">
                    {swatch.name.split(' ')[0]}
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)] truncate">{swatch.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 1B: B4B AMERICA BRAND LOGO VARIANTS */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-heading flex items-center gap-2 text-[var(--text)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold-500)]" />
            1B. B4B America Logo Variants & Clear Space
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default" className="p-6 space-y-3 border border-[var(--border)] text-center flex flex-col items-center justify-center">
              <Badge variant="primary" size="sm">Full Logo (`variant="full"`)</Badge>
              <div className="p-4 bg-[var(--surface)] rounded-xl w-full flex items-center justify-center">
                <BrandLogo variant="full" size="lg" />
              </div>
              <p className="text-xs text-[var(--text-muted)]">Used for Hero, Login side panels, Footers, and PDF Exports.</p>
            </Card>

            <Card variant="default" className="p-6 space-y-3 border border-[var(--border)] text-center flex flex-col items-center justify-center">
              <Badge variant="success" size="sm">Wordmark (`variant="wordmark"`)</Badge>
              <div className="p-4 bg-[var(--surface)] rounded-xl w-full flex items-center justify-center">
                <BrandLogo variant="wordmark" size="md" />
              </div>
              <p className="text-xs text-[var(--text-muted)]">Used for Sticky Header Navbar & Expanded Portal Sidebar.</p>
            </Card>

            <Card variant="default" className="p-6 space-y-3 border border-[var(--border)] text-center flex flex-col items-center justify-center">
              <Badge variant="gold" size="sm">Square Icon (`variant="icon"`)</Badge>
              <div className="p-4 bg-[var(--surface)] rounded-xl w-full flex items-center justify-center">
                <BrandLogo variant="icon" size="lg" />
              </div>
              <p className="text-xs text-[var(--text-muted)]">Used for Collapsed Sidebar, Favicon, Mobile Top Bar, PWA.</p>
            </Card>
          </div>
        </section>

        {/* SECTION 2: BUTTON VARIANTS & SIZES */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-heading flex items-center gap-2 text-[var(--text)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--green-600)]" />
            2. Button Variants, Sizes & States
          </h2>

          <Card variant="default" className="p-6 space-y-6">
            {/* Variants */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                Style Variants (sm, md, lg, Pill)
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary (Gradient Royal)</Button>
                <Button variant="accent">Accent (Emerald)</Button>
                <Button variant="outline">Outline Glass</Button>
                <Button variant="secondary">Secondary Slate</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger Destructive</Button>
                <Button variant="gold">Gold Scoreboard</Button>
                <Button variant="primary" pill rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Pill Main CTA
                </Button>
              </div>
            </div>

            {/* Sizes & States */}
            <div className="pt-4 border-t border-[var(--border)]">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Sizes & Dynamic States (Loading, Disabled, Icons)
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" variant="primary">Small (sm)</Button>
                <Button size="md" variant="primary">Medium (md)</Button>
                <Button size="lg" variant="primary">Large (lg)</Button>
                <Button variant="primary" isLoading>Loading State</Button>
                <Button variant="outline" disabled>Disabled State</Button>
                <Button variant="accent" leftIcon={<Sparkles className="w-4 h-4" />}>
                  Left Icon
                </Button>
                <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Right Icon
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* SECTION 3: FORM INPUT CONTROLS */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-heading flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            3. Form Controls & Validation States (10px Radius)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Col: Inputs & Password */}
            <Card variant="default" className="p-6 space-y-4">
              <FormField label="Standard Text Input" helperText="10px border radius with focus ring">
                <Input placeholder="Enter business name..." />
              </FormField>

              <FormField label="Input with Left Icon">
                <Input placeholder="name@company.com" leftIcon={<Mail className="w-4 h-4" />} />
              </FormField>

              <FormField label="Inline Error State (Zod Style)" error="EIN format must be 9 digits (XX-XXXXXXX)" required>
                <Input placeholder="12-3456789" error="Invalid format" />
              </FormField>

              <FormField label="Password Input with Strength Meter">
                <PasswordInput
                  value={passwordVal}
                  onChange={(e) => setPasswordVal(e.target.value)}
                  showStrengthMeter
                />
              </FormField>

              <FormField label="Textarea Component">
                <Textarea placeholder="Explain your small business funding requirements..." />
              </FormField>
            </Card>

            {/* Right Col: Select, Date, OTP, Checks, Radios */}
            <Card variant="default" className="p-6 space-y-4">
              <FormField label="Custom Accessible Select">
                <Select
                  options={[
                    { label: 'Revolving Line ($500k)', value: 'rev' },
                    { label: 'Revenue-Based Credit ($250k)', value: 'rbc' },
                    { label: 'Equipment Lease ($100k)', value: 'eq' },
                  ]}
                />
              </FormField>

              <FormField label="Date Picker (10px Radius)">
                <DatePicker defaultValue="2026-10-15" />
              </FormField>

              <FormField label="OTP Code Input (Interactive Auto-Focus)">
                <OtpInput length={6} value={otpVal} onChange={setOtpVal} />
              </FormField>

              <div className="pt-2 space-y-3">
                <Checkbox
                  checked={checkboxState}
                  onChange={(e) => setCheckboxState(e.target.checked)}
                  label="Interactive Checkbox Component"
                  description="Custom styled checkmark with accessible focus ring."
                />

                <Switch
                  checked={switchState}
                  onChange={setSwitchState}
                  label="Interactive Switch Toggle"
                  description="Smooth sliding thumb animation for boolean settings."
                />
              </div>

              <div className="pt-2">
                <label className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 block mb-2">
                  Radio Group Cards
                </label>
                <RadioGroup
                  name="demoRadio"
                  value={radioState}
                  onChange={setRadioState}
                  options={[
                    { label: 'Revolving Working Capital', value: 'revolving', description: 'Draw on demand' },
                    { label: 'Fixed Term Loan', value: 'fixed', description: 'Predetermined payment schedules' },
                  ]}
                />
              </div>
            </Card>
          </div>

          {/* Drag & Drop FileUpload Demo */}
          <Card variant="default" className="p-6">
            <h3 className="text-sm font-bold font-heading mb-3">
              Drag & Drop File Upload Component
            </h3>
            <FileUpload />
          </Card>
        </section>

        {/* SECTION 4: CARDS & STATCARDS */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-heading flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            4. Cards & Fintech KPI StatCards (12px Radius)
          </h2>

          {/* StatCards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Pre-Approved Capital"
              value="$850,000"
              change={14.2}
              changePeriod="vs last month"
              icon={<DollarSign className="w-5 h-5" />}
              variant="royal"
            />
            <StatCard
              title="Net Cash Margin"
              value="30.2%"
              change={4.8}
              changePeriod="expansion"
              icon={<TrendingUp className="w-5 h-5" />}
              variant="emerald"
            />
            <StatCard
              title="Operating Burn"
              value="$62,000"
              change={-3.1}
              changePeriod="cost reduction"
              icon={<Layers className="w-5 h-5" />}
              variant="default"
            />
            <StatCard
              title="OAL Scoreboard Rank"
              value="92 / 100"
              change={2.0}
              changePeriod="Tier 1 Institutional"
              icon={<Shield className="w-5 h-5 text-amber-500" />}
              variant="gold"
            />
          </div>

          {/* Card Variants */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <Card variant="default" className="p-5">
              <span className="text-xs font-bold uppercase text-slate-400">Variant: Default</span>
              <h4 className="text-sm font-bold mt-2">Clean Border Card</h4>
              <p className="text-xs text-slate-500 mt-1">Light/Dark neutral border and solid card surface.</p>
            </Card>

            <Card variant="glass" className="p-5">
              <span className="text-xs font-bold uppercase text-slate-400">Variant: Glass</span>
              <h4 className="text-sm font-bold mt-2">Soft Glassmorphism</h4>
              <p className="text-xs text-slate-500 mt-1">16px backdrop blur with translucent layer.</p>
            </Card>

            <Card variant="bento" className="p-5">
              <span className="text-xs font-bold uppercase text-slate-400">Variant: Bento</span>
              <h4 className="text-sm font-bold mt-2">Bento Grid Aesthetic</h4>
              <p className="text-xs text-slate-500 mt-1">Slightly elevated with subtle contrast borders.</p>
            </Card>

            <Card variant="default" hover className="p-5">
              <span className="text-xs font-bold uppercase text-slate-400">Hover: Lift Enabled</span>
              <h4 className="text-sm font-bold mt-2">Interactive Hover Lift</h4>
              <p className="text-xs text-slate-500 mt-1">Hover over this card to see smooth elevation shift.</p>
            </Card>
          </div>
        </section>

        {/* SECTION 5: BADGES, AVATARS, TABS & STEPPERS */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-heading flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            5. Badges, Avatars, Tabs & Stepper
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="default" className="p-6 space-y-4">
              <h3 className="text-sm font-bold font-heading">Badges & Tags</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="emerald" dot>Emerald Success</Badge>
                <Badge variant="gold" dot>Gold Score</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="navy">Navy 900</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>

              <h3 className="text-sm font-bold font-heading pt-3 border-t border-[var(--border)]">
                Avatars with Fallbacks & Statuses
              </h3>
              <div className="flex items-center gap-3">
                <Avatar name="Victoria Hastings" size="sm" status="online" />
                <Avatar name="Marcus Vance" size="md" status="online" />
                <Avatar name="Derrick Vance" size="lg" status="busy" />
                <Avatar
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                  size="xl"
                  status="online"
                />
              </div>

              <h3 className="text-sm font-bold font-heading pt-3 border-t border-[var(--border)]">
                Breadcrumb Navigation
              </h3>
              <Breadcrumb items={[{ label: 'Client Portal', href: '/portal/dashboard' }, { label: 'Capital' }, { label: 'Draw' }]} />
            </Card>

            <Card variant="default" className="p-6 space-y-4">
              <h3 className="text-sm font-bold font-heading">Segmented & Underline Tabs</h3>
              <Tabs
                variant="segmented"
                activeTab={activeTab}
                onChange={setActiveTab}
                tabs={[
                  { id: 'segmented-1', label: 'All Facilities', badge: 3 },
                  { id: 'segmented-2', label: 'In Review' },
                  { id: 'segmented-3', label: 'Archived' },
                ]}
              />

              <div className="pt-2">
                <Tabs
                  variant="underline"
                  activeTab={activeUnderlineTab}
                  onChange={setActiveUnderlineTab}
                  tabs={[
                    { id: 'tab-1', label: 'Financial Summary' },
                    { id: 'tab-2', label: 'Tax Filings' },
                    { id: 'tab-3', label: 'Covenants' },
                  ]}
                />
              </div>

              <h3 className="text-sm font-bold font-heading pt-3 border-t border-[var(--border)]">
                Interactive Stepper Component
              </h3>
              <Stepper
                currentStep={stepperStep}
                onStepClick={setStepperStep}
                steps={[
                  { title: 'Entity', description: 'Legal name' },
                  { title: 'Revenue', description: 'Financials' },
                  { title: 'Underwrite', description: 'Verification' },
                  { title: 'Approved', description: 'Disbursement' },
                ]}
              />
            </Card>
          </div>
        </section>

        {/* SECTION 6: MODALS, DRAWERS, TOASTS, SKELETONS & DATA TABLE */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-heading flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            6. Modals, Drawers, Toasts, Tooltips & DataTable
          </h2>

          <Card variant="default" className="p-6 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                Open Demo Modal
              </Button>

              <Button variant="outline" onClick={() => setIsDrawerOpen(true)}>
                Open Slide-Over Drawer
              </Button>

              <Button
                variant="accent"
                onClick={() =>
                  toast({
                    title: 'Disbursement Approved',
                    description: 'Funds dispatched via Fedwire.',
                    type: 'success',
                  })
                }
              >
                Trigger Success Toast
              </Button>

              <Button
                variant="danger"
                onClick={() =>
                  toast({
                    title: 'Action Required',
                    description: 'Missing 2025 Schedule K-1 filing.',
                    type: 'error',
                  })
                }
              >
                Trigger Error Toast
              </Button>

              <Tooltip content="Fiduciary standard guarantee under OAL Network charter" position="top">
                <Button variant="secondary">Hover for Tooltip</Button>
              </Tooltip>
            </div>

            {/* Skeleton Loaders & Empty State */}
            <div className="pt-4 border-t border-[var(--border)] grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-[var(--text-muted)]">Skeleton Loaders</p>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex gap-2 pt-1">
                  <Skeleton className="h-8 w-20 rounded-lg" />
                  <Skeleton className="h-8 w-20 rounded-lg" />
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2">Empty State Component</p>
                <EmptyState
                  title="No Invoices Pending"
                  description="All receivables for current cycle have been liquidated."
                  action={<Button size="sm" variant="outline">Refresh Feeds</Button>}
                />
              </div>
            </div>

            {/* DataTable */}
            <div className="pt-6 border-t border-[var(--border)]">
              <h3 className="text-sm font-bold font-heading mb-3">
                Interactive DataTable (Search, Sort, Pagination)
              </h3>
              <DataTable
                data={sampleTableData}
                columns={sampleTableColumns}
                searchKey="facility"
                pageSize={3}
              />
            </div>
          </Card>
        </section>

        {/* Interactive Modal Demo */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="OAL Design System Modal"
          description="Accessible dialog box with escape key listener, backdrop blur and clean animations."
          footer={
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Got it
            </Button>
          }
        >
          <div className="text-xs text-[var(--text-muted)] space-y-2">
            <p>This modal is fully keyboard-accessible and locks background scrolling.</p>
            <p className="font-semibold text-[var(--text)]">
              Includes customizable title, description, body slots, and action footer.
            </p>
          </div>
        </Modal>

        {/* Interactive Drawer Demo */}
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title="Slide-Over Drawer Component"
          description="Side panel suitable for detailed facility audit logs or forms."
          footer={
            <Button variant="primary" size="sm" onClick={() => setIsDrawerOpen(false)}>
              Close Panel
            </Button>
          }
        >
          <div className="text-xs text-[var(--text-muted)] space-y-3">
            <p>Slide over panels provide deep dive information without losing context.</p>
            <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
              <p className="font-bold text-[var(--text)]">Terminal Telemetry:</p>
              <p className="text-[var(--text-muted)] mt-1">Status: Active Synchronized</p>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  )
}
