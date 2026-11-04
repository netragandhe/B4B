import React, { useState, useMemo, useEffect } from 'react'
import {
  FolderArchive,
  Search,
  Grid,
  List,
  Upload,
  Filter,
  FileText,
  FileSpreadsheet,
  FileCode,
  FileCheck,
  ShieldCheck,
  Lock,
  Download,
  Share2,
  Trash2,
  Eye,
  Plus,
  AlertTriangle,
  Info,
  CheckCircle2,
  Clock,
  Sparkles,
  Tag,
  Layers,
  HardDrive,
  FileBadge,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Drawer } from '@/components/ui/Drawer'
import { Modal } from '@/components/ui/Modal'
import { FileUpload } from '@/components/ui/FileUpload'
import { EmptyState } from '@/components/ui/EmptyState'
import { useToast } from '@/components/ui/Toast'
import { EBOX_CATEGORIES, EBOX_ITEMS, EboxItem } from '@/mock-data/ebox'
import { eboxService } from '@/lib/services/eboxService'
import { Can } from '@/components/auth/Can'

export const EboxPage: React.FC = () => {
  const { toast } = useToast()

  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [fileTypeFilter, setFileTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  // Selected item for slide-over Preview Drawer
  const [selectedItem, setSelectedItem] = useState<EboxItem | null>(null)
  const [drawerTab, setDrawerTab] = useState<'overview' | 'preview' | 'audit'>('overview')
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false)

  // Items State (persisted via eboxService)
  const [items, setItems] = useState<EboxItem[]>(EBOX_ITEMS)

  useEffect(() => {
    const fetchVaultItems = async () => {
      try {
        const loaded = await eboxService.getAllItems()
        if (loaded && loaded.length > 0) {
          setItems(loaded)
        }
      } catch (err) {
        console.error('Failed to load items from eboxService:', err)
      }
    }
    fetchVaultItems()
  }, [])

  // Filtered Items logic
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false
      }
      // Search filter
      if (
        searchQuery &&
        !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false
      }
      // File type filter
      if (fileTypeFilter !== 'all' && item.fileType !== fileTypeFilter) {
        return false
      }
      // Status filter
      if (statusFilter !== 'all' && item.status !== statusFilter) {
        return false
      }
      return true
    })
  }, [items, selectedCategory, searchQuery, fileTypeFilter, statusFilter])

  // Summary Metrics
  const totalVerified = useMemo(() => items.filter((i) => i.status === 'Verified').length, [items])
  const totalActionReq = useMemo(() => items.filter((i) => i.status === 'Required Action' || i.status === 'Pending Review').length, [items])

  const handleDeleteItem = async (id: string) => {
    try {
      await eboxService.deleteItem(id)
      setItems((prev) => prev.filter((i) => i.id !== id))
      if (selectedItem?.id === id) {
        setSelectedItem(null)
      }
      toast({
        title: 'Item Archived',
        description: 'The file has been permanently unindexed from active vault view.',
        type: 'info',
      })
    } catch (err) {
      console.error(err)
    }
  }

  const [selectedUploadFile, setSelectedUploadFile] = useState<File | null>(null)

  const handleDownloadFile = (item: EboxItem) => {
    try {
      eboxService.downloadRealPdf(item)
      toast({
        title: 'Executive PDF Generated',
        description: `Downloaded official cryptographically styled PDF for "${item.title}".`,
        type: 'success',
      })
    } catch (err) {
      console.error(err)
      toast({
        title: 'Download Failed',
        description: 'Could not compile PDF document.',
        type: 'error',
      })
    }
  }

  const handleShareLink = (item: EboxItem) => {
    const shareUrl = `${window.location.origin}/portal/ebox?doc=${encodeURIComponent(item.id)}`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl)
      toast({
        title: 'Shareable Link Copied!',
        description: `Secure link for "${item.title}" copied to clipboard.`,
        type: 'success',
      })
    } else {
      toast({
        title: 'Share Link Generated',
        description: shareUrl,
        type: 'info',
      })
    }
  }

  const handleSimulatedUpload = async () => {
    const filename = selectedUploadFile ? selectedUploadFile.name : `Commercial_Vault_Document_${Math.floor(Math.random() * 1000)}.pdf`
    const ext = filename.split('.').pop()?.toLowerCase() || 'pdf'
    const fileSize = selectedUploadFile ? `${(selectedUploadFile.size / (1024 * 1024)).toFixed(1)} MB` : '3.8 MB'

    const newItem = await eboxService.addItem({
      title: filename,
      category: (selectedCategory === 'all' ? 'capital-docs' : selectedCategory) as any,
      fileType: (ext === 'xlsx' || ext === 'csv' || ext === 'docx' ? ext : 'pdf') as any,
      size: fileSize,
      uploadedBy: 'Marcus Vance (Executive)',
      status: 'Verified',
      tags: ['Verified Deposit', 'Underwriting Vault', 'Delaware Corp'],
      description: 'Official corporate document committed to eBOX multi-tenant vault repository.',
      securityLevel: 'Encrypted',
    })

    setItems((prev) => [newItem, ...prev])
    setUploadModalOpen(false)
    setSelectedUploadFile(null)
    toast({
      title: 'Upload Committed to Vault',
      description: `${newItem.title} is now indexed with SHA-256 verification.`,
      type: 'success',
    })
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'xlsx':
      case 'csv':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
      case 'docx':
        return <FileCode className="w-5 h-5 text-blue-500" />
      case 'pdf':
      default:
        return <FileText className="w-5 h-5 text-rose-500" />
    }
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      {/* PAGE HEADER */}
      <PageHeader
        title="eBOX Vault Repository"
        description="Encrypted corporate document locker for credit agreements, quarterly audits, 13-week cash models, and compliance filings."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'eBOX Vault', icon: <FolderArchive className="w-3.5 h-3.5 text-emerald-500" /> },
        ]}
        badge={
          <Badge variant="emerald" size="md" className="shadow-xs font-bold">
            <Lock className="w-3 h-3 mr-1" /> 256-Bit Encrypted
          </Badge>
        }
        actions={
          <Button
            variant="accent"
            size="md"
            onClick={() => setUploadModalOpen(true)}
            leftIcon={<Upload className="w-4 h-4" />}
            className="shadow-sm font-bold cursor-pointer"
          >
            Upload Document
          </Button>
        }
      />

      {/* DEMO NOTICE BANNER */}
      <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>
          <strong>Frontend Vault Preview:</strong> Uploads, document preview drawers, and PDF downloads operate in local memory for interface demonstration. Cloud synchronization and multi-tenant live access will connect to backend storage services upon deployment.
        </span>
      </div>

      {/* TOP VAULT METRICS KPIs - CLICKABLE FILTERS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          type="button"
          onClick={() => {
            setSelectedCategory('all')
            setStatusFilter('all')
            setFileTypeFilter('all')
            setSearchQuery('')
          }}
          className={`p-4 rounded-xl text-left transition-all border cursor-pointer ${
            statusFilter === 'all' && selectedCategory === 'all'
              ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-400 shadow-sm'
              : 'bg-white dark:bg-[#0D1E36] border-slate-200 dark:border-[#1E3A5F] hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Indexed Files</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{items.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <FolderArchive className="w-5 h-5" />
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter(statusFilter === 'Verified' ? 'all' : 'Verified')}
          className={`p-4 rounded-xl text-left transition-all border cursor-pointer ${
            statusFilter === 'Verified'
              ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-400 shadow-sm'
              : 'bg-white dark:bg-[#0D1E36] border-slate-200 dark:border-[#1E3A5F] hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Verified & Audited</p>
              <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{totalVerified}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter(statusFilter === 'Pending Review' ? 'all' : 'Pending Review')}
          className={`p-4 rounded-xl text-left transition-all border cursor-pointer ${
            statusFilter === 'Pending Review'
              ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-400 shadow-sm'
              : 'bg-white dark:bg-[#0D1E36] border-slate-200 dark:border-[#1E3A5F] hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Pending Review</p>
              <h3 className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{totalActionReq}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => toast({ title: 'Vault Capacity Status', description: '42.8 MB of 10 GB encrypted storage utilized.', type: 'info' })}
          className="p-4 rounded-xl text-left transition-all bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] hover:border-purple-300 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Vault Capacity</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">42.8 MB</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <HardDrive className="w-5 h-5" />
            </div>
          </div>
        </button>
      </div>

      {/* CATEGORY FILTER CHIPS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {EBOX_CATEGORIES.map((cat) => {
          const active = selectedCategory === cat.id
          const count =
            cat.id === 'all'
              ? items.length
              : items.filter((i) => i.category === cat.id).length

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all border ${
                active
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white dark:bg-[#0D1E36] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#1E3A5F] hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  active ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* SEARCH, FILTERS & VIEW TOGGLE BAR */}
      <Card variant="default" className="p-3.5 flex flex-col md:flex-row items-center justify-between gap-3 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
        <div className="flex-1 w-full">
          <Input
            placeholder="Search documents by name, tags, or contents..."
            leftIcon={<Search className="w-4 h-4" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-xs h-9"
          />
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto shrink-0">
          {/* File Type Filter */}
          <Select
            options={[
              { label: 'All Formats', value: 'all' },
              { label: 'PDF Files', value: 'pdf' },
              { label: 'Spreadsheets (.xlsx/.csv)', value: 'xlsx' },
              { label: 'Word Docs (.docx)', value: 'docx' },
            ]}
            value={fileTypeFilter}
            onChange={(e) => setFileTypeFilter(e.target.value)}
            className="text-xs h-9"
          />

          {/* Status Filter */}
          <Select
            options={[
              { label: 'All Statuses', value: 'all' },
              { label: 'Verified', value: 'Verified' },
              { label: 'Pending Review', value: 'Pending Review' },
              { label: 'Required Action', value: 'Required Action' },
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs h-9"
          />

          {/* Grid vs Table Toggle */}
          <div className="flex items-center p-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* ITEMS DISPLAY */}
      {filteredItems.length > 0 ? (
        viewMode === 'grid' ? (
          /* COMPACT MODERN GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="p-4 rounded-xl transition-all flex flex-col justify-between group cursor-pointer bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] hover:border-blue-500 dark:hover:border-blue-500 shadow-xs hover:shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                      {getFileIcon(item.fileType)}
                    </div>
                    <Badge
                      variant={
                        item.status === 'Verified'
                          ? 'emerald'
                          : item.status === 'Pending Review'
                          ? 'amber'
                          : 'danger'
                      }
                      size="sm"
                      className="text-[10px] py-0 px-1.5 font-bold"
                    >
                      {item.status}
                    </Badge>
                  </div>

                  <h4
                    className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                    title={item.title}
                  >
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {item.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-medium text-slate-500 dark:text-slate-400 text-[10px]">
                    {item.size} • {item.updatedAt}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedItem(item)
                      }}
                      className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                      title="Inspect Document"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDownloadFile(item)
                      }}
                      className="p-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-slate-800 text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer"
                      title="Download"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ENTERPRISE TABLE VIEW */
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0D1E36]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Document Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Security</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Last Modified</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                          {getFileIcon(item.fileType)}
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                          {item.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 capitalize">
                      {item.category.replace('-', ' ')}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        <Lock className="w-3 h-3 text-emerald-500" /> {item.securityLevel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                      {item.size}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px]">
                      {item.updatedAt}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          item.status === 'Verified'
                            ? 'emerald'
                            : item.status === 'Pending Review'
                            ? 'amber'
                            : 'danger'
                        }
                        size="sm"
                        className="text-[10px] py-0 px-1.5 font-bold"
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedItem(item)
                          }}
                        >
                          View
                        </Button>
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownloadFile(item)
                          }}
                          leftIcon={<Download className="w-3 h-3" />}
                        >
                          Download
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        /* EMPTY STATE */
        <Card variant="default" className="p-12 text-center bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
          <EmptyState
            title="No eBOX Vault Items Found"
            description="No documents or artifacts match your current category or search filters."
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setFileTypeFilter('all')
                  setStatusFilter('all')
                }}
              >
                Reset All Filters
              </Button>
            }
          />
        </Card>
      )}

      {/* ITEM PREVIEW DRAWER (SLIDE-OVER) */}
      <Drawer
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title="eBOX Vault Inspection"
        size="lg"
      >
        {selectedItem && (
          <div className="space-y-5 text-left">
            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setDrawerTab('overview')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  drawerTab === 'overview'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => setDrawerTab('preview')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  drawerTab === 'preview'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <FileBadge className="w-3.5 h-3.5 text-amber-500" />
                Live Document
              </button>
              <button
                type="button"
                onClick={() => setDrawerTab('audit')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  drawerTab === 'audit'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Audit Trail
              </button>
            </div>

            {/* TAB 1: OVERVIEW */}
            {drawerTab === 'overview' && (
              <div className="space-y-5">
                {/* Header info */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-[#12294A] dark:to-[#0D1E36] border border-blue-100 dark:border-[#1E3A5F] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getFileIcon(selectedItem.fileType)}
                      <Badge variant="emerald" size="sm">
                        {selectedItem.status}
                      </Badge>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">{selectedItem.size}</span>
                  </div>

                  <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Detailed Metadata Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F]">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Security Level</span>
                    <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                      <Lock className="w-3.5 h-3.5 text-emerald-500" />
                      {selectedItem.securityLevel} (AES-256)
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F]">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Uploaded By</span>
                    <p className="font-bold text-slate-900 dark:text-white truncate mt-0.5">
                      {selectedItem.uploadedBy}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F]">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Date Indexed</span>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                      {selectedItem.updatedAt}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F]">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Format</span>
                    <p className="font-bold text-slate-900 dark:text-white uppercase mt-0.5">
                      .{selectedItem.fileType}
                    </p>
                  </div>
                </div>

                {/* Tags section */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Vault Tags</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItem.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Inspection Summary */}
                <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-amber-900 dark:text-amber-200">Fiduciary Attestation Attached</p>
                    <p className="text-amber-700 dark:text-amber-300 text-[11px] mt-0.5">
                      Document verified by B4B Chief Underwriting Officer for non-dilutive commercial capital requirements.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: LIVE DOCUMENT SHEET PREVIEW */}
            {drawerTab === 'preview' && (
              <div className="space-y-4">
                {/* Simulated Document Paper */}
                <div className="bg-white dark:bg-[#07142B] border-2 border-slate-200 dark:border-[#1E3A5F] rounded-xl p-5 shadow-md relative overflow-hidden">
                  {/* Gold top bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#013CA0] via-[#FFC911] to-[#013CA0]" />

                  {/* Document Header */}
                  <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4 mt-1">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-sm tracking-wider text-[#013CA0] dark:text-blue-400">B4B AMERICA</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-[#013CA0] dark:text-blue-300 font-bold">VAULT</span>
                      </div>
                      <p className="text-[9px] text-slate-400 mt-0.5">OFFICIAL COMMERCIAL UNDERWRITING RECORD</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-500 font-bold block">{selectedItem.id.toUpperCase()}</span>
                      <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">● SOC-2 CERTIFIED</span>
                    </div>
                  </div>

                  {/* Title & Metadata Box */}
                  <div className="mb-4">
                    <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase leading-snug">
                      {selectedItem.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Category: <span className="font-bold text-slate-700 dark:text-slate-300 capitalize">{selectedItem.category.replace('-', ' ')}</span> • Size: <span className="font-mono">{selectedItem.size}</span>
                    </p>
                  </div>

                  {/* Dynamic Underwriting Content Snippet */}
                  <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 mb-4">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Executive Underwriting Extract</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">STATUS: ACTIVE</span>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      {selectedItem.category === 'capital-docs' && (
                        <>Facility Agreement Schedule: Authorized non-dilutive commercial liquidity line approved up to $15,000,000. Interest structure benchmarked to SOFR + 3.25%, amortized across 60 months with UCC-1 senior secured standing.</>
                      )}
                      {selectedItem.category === 'financial-models' && (
                        <>Financial Model Reconciliation: Dynamic 13-week cash flow pro-forma approved. Debt Service Coverage Ratio (DSCR): 2.45x, adjusted annualized EBITDA: $8.2M with zero covenant breaches.</>
                      )}
                      {selectedItem.category === 'compliance' && (
                        <>Governance & Regulatory Compliance: Delaware § 141 corporate resolutions and SOC-2 Type II attestation audited and deposited with B4B escrow fiduciary network.</>
                      )}
                      {selectedItem.category !== 'capital-docs' && selectedItem.category !== 'financial-models' && selectedItem.category !== 'compliance' && (
                        <>{selectedItem.description || 'Verified commercial client documentation indexed within the B4B America multi-tenant security gateway.'}</>
                      )}
                    </p>
                  </div>

                  {/* Stamp / Seal Block */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-900 dark:text-white">UNDERWRITING VALIDATED</p>
                        <p className="text-[9px] text-slate-400">Marcus Vance & David Ross</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-mono text-slate-400 block">SHA-256 VALIDATED</span>
                      <span className="text-[9px] text-slate-400">{selectedItem.updatedAt}</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 text-center">
                  This document preview is cryptographically verified against the B4B immutable vault registry.
                </p>
              </div>
            )}

            {/* TAB 3: AUDIT TRAIL & VERIFICATION */}
            {drawerTab === 'audit' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cryptographic SHA-256 Checksum</span>
                    <Badge variant="emerald" size="sm">Valid</Badge>
                  </div>
                  <p className="font-mono text-[10px] text-slate-700 dark:text-slate-300 break-all bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800 select-all">
                    e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F]">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Encryption Standard</span>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">AES-256-GCM Envelope</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F]">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Malware Scan</span>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> 0 Threats Found
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F]">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Multi-Tenant Vault</span>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">Tenant Isolation v4</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F]">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Fiduciary Jurisdiction</span>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">Delaware (DGCL § 141)</p>
                  </div>
                </div>

                {/* Event Timeline */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Chain of Custody Events</h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-white dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-[11px]">Integrity Attestation Passed</p>
                          <p className="text-[10px] text-slate-500">Automated ledger audit verified signature</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">10:42 AM</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-blue-500 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-[11px]">Vault Index Registered</p>
                          <p className="text-[10px] text-slate-500">Committed to immutable storage cluster</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{selectedItem.updatedAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Persistent Action buttons at bottom */}
            <div className="pt-4 border-t border-slate-100 dark:border-[#1E3A5F] space-y-2">
              <Button
                variant="accent"
                size="md"
                onClick={() => handleDownloadFile(selectedItem)}
                leftIcon={<Download className="w-4 h-4" />}
                className="w-full justify-center shadow-xs font-bold cursor-pointer"
              >
                Download Cryptographic PDF
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShareLink(selectedItem)}
                  leftIcon={<Share2 className="w-3.5 h-3.5" />}
                  className="flex-1 justify-center text-xs cursor-pointer"
                >
                  Share Link
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteItem(selectedItem.id)}
                  leftIcon={<Trash2 className="w-3.5 h-3.5 text-rose-500" />}
                  className="flex-1 justify-center text-xs border-rose-200 text-rose-600 hover:bg-rose-50 cursor-pointer"
                >
                  Archive Item
                </Button>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* FILE UPLOAD MODAL */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload to eBOX Vault"
        description="Index documents directly into your secure eBOX repository."
        maxWidth="md"
      >
        <div className="space-y-4">
          <FileUpload
            label="Drag & drop document or spreadsheet"
            hint="Supported: PDF, XLSX, DOCX, CSV up to 50MB"
            onFilesSelected={(files) => {
              if (files.length > 0) setSelectedUploadFile(files[0])
            }}
          />

          <div className="pt-2 flex items-center justify-end gap-3">
            <Button variant="outline" onClick={() => setUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="accent" onClick={handleSimulatedUpload} leftIcon={<Upload className="w-4 h-4" />}>
              Commit Upload to eBOX
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

