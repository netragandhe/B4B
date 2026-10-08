import React, { useState, useMemo } from 'react'
import {
  ShoppingBag,
  Search,
  Plus,
  Edit3,
  FileSpreadsheet,
  Printer,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Upload,
  Save,
  Trash2,
  CheckCircle2,
  X,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'
import { InventoryServiceProduct } from '@/mock-data/adminData'
import { GENERATE_100_INVENTORY_PRODUCTS } from '@/mock-data/adminFullData'
import { formatCurrency } from '@/lib/utils'
import { exportToCsv, exportToPdf } from '@/lib/exportUtils'

export const AdminServicesInventoryPage: React.FC = () => {
  const { toast } = useToast()

  const [products, setProducts] = useState<InventoryServiceProduct[]>(() => GENERATE_100_INVENTORY_PRODUCTS())
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('All')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Archived' | 'Draft'>('All')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Partial<InventoryServiceProduct> | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleOpenAddModal = () => {
    setEditingProduct({
      id: `prd_${String(products.length + 1).padStart(3, '0')}`,
      title: '',
      sku: `SKU-B4B-${String(products.length + 1).padStart(3, '0')}`,
      category: 'Capital',
      basePrice: 50000,
      commissionRate: '3.0%',
      status: 'Active',
      updatedAt: new Date().toISOString().split('T')[0],
    })
    setImagePreview(null)
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (p: InventoryServiceProduct) => {
    setEditingProduct(p)
    setImagePreview('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=200&q=80')
    setIsModalOpen(true)
  }

  const handleSaveProduct = () => {
    if (!editingProduct?.title) {
      toast({ title: 'Validation Error', description: 'Product title is required.', type: 'warning' })
      return
    }

    const exists = products.some((p) => p.id === editingProduct.id)
    if (exists) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? ({ ...p, ...editingProduct } as InventoryServiceProduct) : p))
      )
      toast({ title: 'Service Updated', description: `Saved changes to ${editingProduct.title}.`, type: 'success' })
    } else {
      setProducts([editingProduct as InventoryServiceProduct, ...products])
      toast({ title: 'Service Created', description: `Added ${editingProduct.title} to inventory.`, type: 'success' })
    }

    setIsModalOpen(false)
  }

  const handleDeleteProduct = (id: string, title: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    toast({ title: 'Service Removed', description: `${title} archived from inventory.`, type: 'info' })
  }

  // Filter & Sort logic across 100 items
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCat = categoryFilter === 'All' || p.category === categoryFilter
        const matchesStatus = statusFilter === 'All' || p.status === statusFilter

        return matchesSearch && matchesCat && matchesStatus
      })
      .sort((a, b) => {
        return sortOrder === 'asc' ? a.basePrice - b.basePrice : b.basePrice - a.basePrice
      })
  }, [products, searchQuery, categoryFilter, statusFilter, sortOrder])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(start, start + itemsPerPage)
  }, [filteredProducts, currentPage, itemsPerPage])

  const handleExportCsv = () => {
    const headers = ['ID', 'Title', 'SKU', 'Category', 'Base Price', 'Commission Rate', 'Status', 'Updated At']
    const rows = products.map((p) => [
      p.id,
      p.title,
      p.sku,
      p.category,
      p.basePrice,
      p.commissionRate,
      p.status,
      p.updatedAt,
    ])
    exportToCsv('Service_Products_Inventory_100', headers, rows)
    toast({ title: 'CSV Exported', description: 'Full 100 service catalog downloaded.', type: 'success' })
  }

  const handleExportPdf = () => {
    const headers = ['ID', 'Title', 'SKU', 'Category', 'Base Price', 'Commission Rate', 'Status']
    const rows = products.map((p) => [
      p.id,
      p.title,
      p.sku,
      p.category,
      formatCurrency(p.basePrice),
      p.commissionRate,
      p.status,
    ])
    exportToPdf('Service Products & Inventory Master Catalog', headers, rows)
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Service Products & Inventory Manager"
        description="Catalog manager supporting up to 100 financial services, pricing tiers, commission rates, and asset media."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Service Inventory', icon: <ShoppingBag className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="navy" size="md">
            {products.length} Total Services
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExportCsv} leftIcon={<FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />}>
              CSV
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPdf} leftIcon={<Printer className="w-3.5 h-3.5 text-blue-600" />}>
              PDF Report
            </Button>
            <Button variant="accent" size="sm" onClick={handleOpenAddModal} leftIcon={<Plus className="w-4 h-4" />}>
              Add New Service
            </Button>
          </div>
        }
      />

      {/* FILTER BAR & CONTROLS */}
      <Card variant="default" className="p-4 space-y-3 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search 100 services by title or SKU..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            >
              <option value="All">Category: All</option>
              <option value="Capital">Capital</option>
              <option value="Advisory">Advisory</option>
              <option value="Operations">Operations</option>
              <option value="Growth">Growth</option>
            </select>

            {/* Sort price toggle */}
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
            >
              <ArrowUpDown className="w-3 h-3" />
              <span>Price ({sortOrder.toUpperCase()})</span>
            </button>

            {/* Rows per page selector */}
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="px-2 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            >
              <option value={10}>10 / page</option>
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          {(['All', 'Active', 'Archived', 'Draft'] as const).map((st) => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st)
                setCurrentPage(1)
              }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </Card>

      {/* CATALOG DATA TABLE */}
      <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-3 px-4">Service Product Title</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Base Facility Price</th>
                <th className="py-3 px-4">Commission Rate</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{p.title}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{p.sku}</td>
                    <td className="py-3 px-4">
                      <Badge variant="navy" size="sm">
                        {p.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(p.basePrice)}
                    </td>
                    <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">{p.commissionRate}</td>
                    <td className="py-3 px-4">
                      <Badge variant={p.status === 'Active' ? 'emerald' : p.status === 'Draft' ? 'amber' : 'danger'} size="sm" dot>
                        {p.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button size="sm" variant="outline" onClick={() => handleOpenEditModal(p)} leftIcon={<Edit3 className="w-3.5 h-3.5" />}>
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteProduct(p.id, p.title)} className="text-rose-500 hover:bg-rose-50 border-rose-200">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No services found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        <div className="p-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs text-slate-500">
            Page {currentPage} of {totalPages} ({filteredProducts.length} filtered out of {products.length} total services)
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* ADD / EDIT SERVICE MODAL */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <Card variant="bento" className="w-full max-w-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {products.some((p) => p.id === editingProduct.id) ? 'Edit Service Product' : 'Add New Service Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">Service Title</label>
                <input
                  type="text"
                  value={editingProduct.title || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  placeholder="e.g. Revenue-Based Working Capital Line"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold block mb-1">SKU Code</label>
                  <input
                    type="text"
                    value={editingProduct.sku || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Category</label>
                  <select
                    value={editingProduct.category || 'Capital'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
                  >
                    <option value="Capital">Capital</option>
                    <option value="Advisory">Advisory</option>
                    <option value="Operations">Operations</option>
                    <option value="Growth">Growth</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold block mb-1">Base Price ($)</label>
                  <input
                    type="number"
                    value={editingProduct.basePrice || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, basePrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Commission Rate (%)</label>
                  <input
                    type="text"
                    value={editingProduct.commissionRate || '3.0%'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, commissionRate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
                  />
                </div>
              </div>

              {/* Image Upload Simulator */}
              <div>
                <label className="font-bold block mb-1">Product Media Image Upload</label>
                <div className="p-4 border-2 border-dashed rounded-xl border-slate-300 dark:border-slate-700 text-center space-y-2">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                  <div className="text-slate-500">Drag & drop service icon/banner image, or click to browse</div>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setImagePreview(URL.createObjectURL(e.target.files[0]))
                      }
                    }}
                    className="text-[11px] text-slate-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="accent" size="sm" onClick={handleSaveProduct} leftIcon={<Save className="w-4 h-4" />}>
                Save Product
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
