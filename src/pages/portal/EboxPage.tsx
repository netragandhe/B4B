import React, { useState, useMemo } from 'react'
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
} from 'lucide-react'
// TODO: eBOX scope pending client confirmation
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
import { Can } from '@/components/auth/Can'

export const EboxPage: React.FC = () => {
  const { toast } = useToast()

  // TODO: eBOX scope pending client confirmation
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [fileTypeFilter, setFileTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Selected item for slide-over Preview Drawer
  const [selectedItem, setSelectedItem] = useState<EboxItem | null>(null)
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false)

  // Items State (allows soft deleting or uploading in demo)
  const [items, setItems] = useState<EboxItem[]>(EBOX_ITEMS)

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

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
    if (selectedItem?.id === id) {
      setSelectedItem(null)
    }
    toast({
      title: 'Item Archived',
      description: 'The file has been moved to eBOX archived storage.',
      type: 'info',
    })
  }

  const handleSimulatedUpload = () => {
    const newItem: EboxItem = {
      id: `ebx_${Date.now()}`,
      title: `Uploaded_Vault_Document_${Math.floor(Math.random() * 1000)}.pdf`,
      category: selectedCategory === 'all' ? 'capital-docs' : selectedCategory,
      fileType: 'pdf',
      size: '2.4 MB',
      updatedAt: new Date().toISOString().split('T')[0],
      uploadedBy: 'Current User',
      status: 'Verified',
      tags: ['New Upload', 'eBOX Vault'],
      description: 'Document dispatches successfully committed to eBOX vault.',
      securityLevel: 'Encrypted',
    }
    setItems((prev) => [newItem, ...prev])
    setUploadModalOpen(false)
    toast({
      title: 'Upload Successful',
      description: `${newItem.title} is now indexed in eBOX.`,
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
    <div className="space-y-6 text-left">
      {/* DEV MODE BANNER FOR CLIENT CONFIRMATION */}
      {/* TODO: eBOX scope pending client confirmation */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-amber-100/60 to-amber-50 dark:from-amber-950/60 dark:via-amber-900/40 dark:to-amber-950/60 border border-amber-300 dark:border-amber-700/60 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-amber-900 dark:text-amber-200">
                eBOX Scope Pending Client Confirmation
              </span>
              <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-300">
                DEV NOTICE
              </span>
            </div>
            <p className="text-amber-700 dark:text-amber-300 mt-0.5">
              Generic repository data model active in <code className="font-mono bg-amber-200/50 dark:bg-amber-950 px-1 py-0.5 rounded">src/mock-data/ebox.ts</code>. Easily customizable once client provides finalized requirements.
            </p>
          </div>
        </div>

        <Badge variant="gold" size="sm" className="shrink-0 hidden sm:inline-flex">
          Priority Feature
        </Badge>
      </div>

      {/* PAGE HEADER */}
      <PageHeader
        title="eBOX Vault Repository"
        description="Secure, encrypted document vault for credit agreements, quarterly audits, 13-week cash models, and compliance filings."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'eBOX', icon: <FolderArchive className="w-3.5 h-3.5 text-emerald-500" /> },
        ]}
        badge={
          <Badge variant="emerald" size="md">
            Encrypted & Synced
          </Badge>
        }
        actions={
          <Can menuId="shared-ebox" action="create" disableInstead={true} tooltip="Create permission required to upload documents to eBOX">
            <Button
              variant="accent"
              size="md"
              onClick={() => setUploadModalOpen(true)}
              leftIcon={<Upload className="w-4 h-4" />}
              className="shadow-sm shadow-emerald-500/20"
            >
              Upload to eBOX
            </Button>
          </Can>
        }
      />

      {/* MAIN TWO-COLUMN FLEXIBLE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: CATEGORIES / FOLDER LIST */}
        <Card variant="bento" className="lg:col-span-3 p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#1E3A5F]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <FolderArchive className="w-4 h-4 text-emerald-500" />
              <span>Vault Categories</span>
            </h3>
            <span className="text-[11px] font-semibold text-slate-400">
              {items.length} Total
            </span>
          </div>

          <div className="space-y-1">
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
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#12294A]'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.3 rounded-full font-bold ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-[#12294A] text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </Card>

        {/* RIGHT COLUMN: MAIN SEARCH, FILTERS, & ITEM GRID/LIST */}
        <div className="lg:col-span-9 space-y-4">
          {/* SEARCH & FILTERS BAR */}
          <Card variant="default" className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex-1 w-full">
              <Input
                placeholder="Search eBOX items by name, tags, or description..."
                leftIcon={<Search className="w-4 h-4" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              {/* File Type Filter */}
              <Select
                options={[
                  { label: 'All File Types', value: 'all' },
                  { label: 'PDF Documents', value: 'pdf' },
                  { label: 'Spreadsheets (XLSX/CSV)', value: 'xlsx' },
                  { label: 'Word Docs (DOCX)', value: 'docx' },
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

              {/* Grid vs List View Toggle */}
              <div className="flex items-center p-1 rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-slate-50 dark:bg-[#12294A]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-[#0D1E36] text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-[#0D1E36] text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>

          {/* ITEM DISPLAY VIEW */}
          {filteredItems.length > 0 ? (
            viewMode === 'grid' ? (
              /* GRID VIEW */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    variant="bento"
                    className="p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-all flex flex-col justify-between group cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] flex items-center justify-center shrink-0">
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
                        >
                          {item.status}
                        </Badge>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold px-2 py-0.2 rounded bg-slate-100 dark:bg-[#12294A] text-slate-600 dark:text-slate-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between text-[11px] text-slate-400">
                      <span>{item.size} • {item.updatedAt}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedItem(item)
                          }}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#12294A] text-slate-500"
                          title="Preview Item"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toast({ title: 'Download Dispatched', description: `Downloading ${item.title}`, type: 'info' })
                          }}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#12294A] text-slate-500"
                          title="Download"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              /* LIST VIEW */
              <Card variant="default" className="divide-y divide-slate-100 dark:divide-[#1E3A5F]">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="p-4 hover:bg-slate-50/80 dark:hover:bg-[#12294A]/40 cursor-pointer flex items-center justify-between gap-4 transition-colors text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] flex items-center justify-center shrink-0">
                        {getFileIcon(item.fileType)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white truncate">
                            {item.title}
                          </span>
                          <Badge
                            variant={
                              item.status === 'Verified'
                                ? 'emerald'
                                : item.status === 'Pending Review'
                                ? 'amber'
                                : 'danger'
                            }
                            size="sm"
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {item.uploadedBy} • {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-slate-400 text-[11px] shrink-0">
                      <span className="hidden sm:inline-block font-mono">{item.size}</span>
                      <span className="hidden md:inline-block">{item.updatedAt}</span>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedItem(item)
                          }}
                          className="h-7 text-xs"
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            toast({ title: 'Download Started', description: item.title, type: 'info' })
                          }}
                          leftIcon={<Download className="w-3.5 h-3.5" />}
                          className="h-7 text-xs"
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </Card>
            )
          ) : (
            /* EMPTY STATE WHEN NO RESULTS MATCH */
            <Card variant="bento" className="p-12 text-center">
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
        </div>
      </div>

      {/* ITEM PREVIEW DRAWER (SLIDE-OVER) */}
      <Drawer
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title="eBOX Item Inspection"
        size="md"
      >
        {selectedItem && (
          <div className="space-y-6 text-left">
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
                  {selectedItem.securityLevel}
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

            {/* Action buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-[#1E3A5F] space-y-2">
              <Button
                variant="accent"
                size="md"
                onClick={() => toast({ title: 'Downloading file...', description: selectedItem.title, type: 'success' })}
                leftIcon={<Download className="w-4 h-4" />}
                className="w-full justify-center"
              >
                Download Encrypted File
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast({ title: 'Shareable Link Copied', description: 'Link copied to clipboard.', type: 'info' })}
                  leftIcon={<Share2 className="w-3.5 h-3.5" />}
                  className="flex-1 justify-center text-xs"
                >
                  Share Link
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteItem(selectedItem.id)}
                  leftIcon={<Trash2 className="w-3.5 h-3.5 text-rose-500" />}
                  className="flex-1 justify-center text-xs border-rose-200 text-rose-600 hover:bg-rose-50"
                >
                  Archive Item
                </Button>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* MOCK FILE UPLOAD MODAL */}
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
