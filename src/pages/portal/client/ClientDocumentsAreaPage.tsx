import React, { useState } from 'react'
import { FileCheck2, Upload, Search, Download, Trash2, CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'

export interface ClientDocumentItem {
  id: string
  name: string
  category: 'Tax Return' | 'Bank Statement' | 'Legal' | 'Financials'
  uploadedDate: string
  fileSize: string
  status: 'Verified' | 'Pending Review' | 'Action Needed'
}

export const INITIAL_CLIENT_DOCS: ClientDocumentItem[] = [
  { id: 'doc_1', name: '2025_Corporate_Tax_Return_1120S.pdf', category: 'Tax Return', uploadedDate: '2026-09-25', fileSize: '4.2 MB', status: 'Verified' },
  { id: 'doc_2', name: 'Chase_Business_Bank_Statement_Aug2026.pdf', category: 'Bank Statement', uploadedDate: '2026-09-28', fileSize: '2.8 MB', status: 'Verified' },
  { id: 'doc_3', name: 'Articles_of_Incorporation_Apex.pdf', category: 'Legal', uploadedDate: '2026-09-20', fileSize: '1.5 MB', status: 'Verified' },
  { id: 'doc_4', name: 'Q3_2026_Profit_Loss_Statement.pdf', category: 'Financials', uploadedDate: '2026-10-02', fileSize: '3.1 MB', status: 'Pending Review' },
  { id: 'doc_5', name: 'Commercial_Lease_Agreement_2026.pdf', category: 'Legal', uploadedDate: '2026-10-05', fileSize: '5.0 MB', status: 'Action Needed' },
]

export const ClientDocumentsAreaPage: React.FC = () => {
  const { toast } = useToast()

  const [docs, setDocs] = useState<ClientDocumentItem[]>(INITIAL_CLIENT_DOCS)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      const newDoc: ClientDocumentItem = {
        id: `doc_${Date.now()}`,
        name: file.name,
        category: 'Financials',
        uploadedDate: new Date().toISOString().split('T')[0],
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        status: 'Pending Review',
      }
      setDocs([newDoc, ...docs])
      toast({
        title: 'Document Uploaded',
        description: `"${file.name}" sent to underwriting vault for review.`,
        type: 'success',
      })
    }
  }

  const handleDelete = (id: string, name: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id))
    toast({ title: 'Document Removed', description: `${name} deleted from vault.`, type: 'info' })
  }

  const filteredDocs = docs.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCat = categoryFilter === 'All' || d.category === categoryFilter
    return matchesSearch && matchesCat
  })

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      <PageHeader
        title="Secure Document Vault & Filings"
        description="Upload underwriting documents, financial statements, and corporate tax records directly to your encrypted eBOX."
        breadcrumbs={[{ label: 'Portal', href: '/portal/dashboard' }, { label: 'Documents Area' }]}
        badge={
          <Badge variant="navy" size="md">
            256-Bit Encrypted Vault
          </Badge>
        }
      />

      {/* DRAG AND DROP UPLOADER AREA */}
      <Card variant="bento" className="p-6 border-2 border-dashed border-blue-400 dark:border-blue-700 bg-blue-50/30 dark:bg-blue-950/20 text-center space-y-3">
        <Upload className="w-10 h-10 text-blue-500 mx-auto" />
        <div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Drag & Drop Underwriting Documents</h4>
          <p className="text-xs text-slate-500">Supports PDF, XLSX, PNG, or DOCX (Max 25MB per file)</p>
        </div>
        <div>
          <label className="inline-block">
            <input type="file" onChange={handleFileUpload} className="hidden" />
            <span className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-1.5 shadow-md shadow-blue-500/20">
              <Upload className="w-3.5 h-3.5" /> Select File from Computer
            </span>
          </label>
        </div>
      </Card>

      {/* SEARCH AND FILTER BAR */}
      <Card variant="default" className="p-4 space-y-3 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search uploaded documents..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>

          <div className="flex items-center gap-1.5">
            {['All', 'Tax Return', 'Bank Statement', 'Legal', 'Financials'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  categoryFilter === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* DOCUMENTS TABLE */}
      <Card variant="default" className="overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="py-3 px-4">Document Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Date Uploaded</th>
                <th className="py-3 px-4">Verification Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredDocs.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>{d.name}</span>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="navy" size="sm">
                      {d.category}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500">{d.fileSize}</td>
                  <td className="py-3 px-4 text-slate-500">{d.uploadedDate}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={d.status === 'Verified' ? 'emerald' : d.status === 'Pending Review' ? 'amber' : 'danger'}
                      size="sm"
                      dot
                    >
                      {d.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          toast({ title: 'Downloading Document', description: `Started download of ${d.name}`, type: 'info' })
                        }
                        leftIcon={<Download className="w-3.5 h-3.5" />}
                      >
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(d.id, d.name)}
                        className="text-rose-500 hover:bg-rose-50 border-rose-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
