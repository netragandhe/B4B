import React, { useState } from 'react'
import {
  ShoppingBag,
  Plus,
  Check,
  Search,
  Wallet,
  BarChart3,
  Building2,
  Truck,
  FileCheck,
  DollarSign,
  Receipt,
  Zap,
  ShieldAlert,
  TrendingUp,
  CreditCard,
  Globe,
  ShieldCheck,
  Landmark,
  Users,
  FolderArchive,
  ArrowRight,
  FileText,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Drawer } from '@/components/ui/Drawer'
import { useToast } from '@/components/ui/Toast'
import { THE_16_SERVICES, ServiceItem } from '@/mock-data/bizproData'
import { formatCurrency } from '@/lib/utils'

export const BizProCatalogPage: React.FC = () => {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Proposal items list
  const [proposalItems, setProposalItems] = useState<ServiceItem[]>([])
  const [proposalDrawerOpen, setProposalDrawerOpen] = useState(false)

  const categories = ['all', 'Capital', 'Advisory', 'Operations', 'Growth']

  const filteredServices = THE_16_SERVICES.filter((service) => {
    if (selectedCategory !== 'all' && service.category !== selectedCategory) return false
    if (
      searchQuery &&
      !service.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !service.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }
    return true
  })

  const handleAddToProposal = (service: ServiceItem) => {
    if (proposalItems.some((i) => i.id === service.id)) {
      toast({ title: 'Already in Proposal', description: `${service.title} is already added.`, type: 'info' })
      return
    }
    setProposalItems((prev) => [...prev, service])
    toast({
      title: 'Added to Proposal',
      description: `${service.title} added to proposal builder.`,
      type: 'success',
    })
  }

  const handleRemoveFromProposal = (id: string) => {
    setProposalItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="B4B Core Service Catalog (16 Solutions)"
        description="Browse non-dilutive capital lines, CFO advisory packages, and operational services to generate custom client proposals."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Service Catalog', icon: <ShoppingBag className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="emerald" size="md">
            16 Institutional Solutions
          </Badge>
        }
        actions={
          <Button
            variant="accent"
            size="md"
            onClick={() => setProposalDrawerOpen(true)}
            leftIcon={<FileText className="w-4 h-4" />}
            className="shadow-sm shadow-emerald-500/20"
          >
            <span>View Proposal ({proposalItems.length})</span>
          </Button>
        }
      />

      {/* CATEGORY & SEARCH BAR */}
      <Card variant="default" className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-[#12294A] text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All 16 Services' : cat}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="Search catalog..."
            leftIcon={<Search className="w-4 h-4" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      {/* 16 SERVICES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredServices.map((service) => {
          const inProposal = proposalItems.some((i) => i.id === service.id)

          return (
            <Card
              key={service.id}
              variant="bento"
              className="p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="navy" size="sm">
                    {service.category}
                  </Badge>
                  {service.popular && (
                    <Badge variant="gold" size="sm">
                      Top Seller
                    </Badge>
                  )}
                </div>

                <h4 className="text-xs font-bold font-heading text-slate-900 dark:text-white leading-tight">
                  {service.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#12294A] text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Avg Ticket:</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">{formatCurrency(service.avgTicket)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Commission Rate:</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{service.commissionRate}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-[#1E3A5F] mt-3">
                <Button
                  size="sm"
                  variant={inProposal ? 'outline' : 'primary'}
                  onClick={() => handleAddToProposal(service)}
                  leftIcon={inProposal ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Plus className="w-3.5 h-3.5" />}
                  className="w-full justify-center text-xs"
                >
                  {inProposal ? 'Added to Proposal' : 'Add to Proposal'}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* PROPOSAL DRAWER */}
      <Drawer
        isOpen={proposalDrawerOpen}
        onClose={() => setProposalDrawerOpen(false)}
        title="Custom Client Proposal Builder"
        size="md"
      >
        <div className="space-y-4 text-left">
          {proposalItems.length > 0 ? (
            <>
              <div className="space-y-2">
                {proposalItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] flex items-center justify-between text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                      <p className="text-[10px] text-slate-400">Commission Rate: {item.commissionRate}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromProposal(item.id)}
                      className="text-xs text-rose-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 text-xs space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Total Proposal Items:</span>
                  <span>{proposalItems.length} Solutions</span>
                </div>
                <div className="flex justify-between font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                  <span>Combined Ticket Size:</span>
                  <span>{formatCurrency(proposalItems.reduce((acc, curr) => acc + curr.avgTicket, 0))}</span>
                </div>
              </div>

              <Button
                variant="accent"
                size="md"
                onClick={() => {
                  setProposalDrawerOpen(false)
                  setProposalItems([])
                  toast({ title: 'Proposal Dispatched!', description: 'Generated PDF proposal sent to client.', type: 'success' })
                }}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full justify-center"
              >
                Generate & Dispatch Proposal PDF
              </Button>
            </>
          ) : (
            <p className="text-xs text-slate-500 text-center py-8">
              No services added to proposal yet. Click "Add to Proposal" on any service above.
            </p>
          )}
        </div>
      </Drawer>
    </div>
  )
}
