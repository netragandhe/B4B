import React, { useState } from 'react'
import {
  FileText,
  UploadCloud,
  Download,
  Trash2,
  CheckCircle,
  FileSpreadsheet,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { FileUpload } from '@/components/ui/FileUpload'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { APPLICATION_DOCUMENTS, type ApplicationDocument } from '@/mock-data/fintechData'
import { useToast } from '@/components/ui/Toast'

export const DocumentsPage: React.FC = () => {
  const { toast } = useToast()
  const [documents, setDocuments] = useState<ApplicationDocument[]>(APPLICATION_DOCUMENTS)

  const handleFilesSelected = (files: File[]) => {
    const newDocs: ApplicationDocument[] = files.map((f, i) => ({
      id: `doc-new-${Date.now()}-${i}`,
      name: f.name,
      category: 'Financial Statements',
      uploadedAt: 'Today',
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      status: 'Pending Review',
      type: f.name.endsWith('.pdf') ? 'PDF' : 'XLSX',
    }))

    setDocuments((prev) => [...newDocs, ...prev])
    toast({
      title: 'Files Uploaded & Encrypted',
      description: `${files.length} document(s) added to your institutional underwriting vault.`,
      type: 'success',
    })
  }

  const columns: Column<ApplicationDocument>[] = [
    {
      key: 'name',
      header: 'Document Name',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-2.5">
          <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs sm:max-w-md">
            {item.name}
          </span>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (item) => (
        <span className="text-xs text-slate-500 dark:text-slate-400">{item.category}</span>
      ),
    },
    {
      key: 'size',
      header: 'Size',
      sortable: true,
      render: (item) => <span className="text-xs text-slate-400">{item.size}</span>,
    },
    {
      key: 'uploadedAt',
      header: 'Uploaded Date',
      sortable: true,
      render: (item) => <span className="text-xs text-slate-500">{item.uploadedAt}</span>,
    },
    {
      key: 'status',
      header: 'Compliance Status',
      sortable: true,
      render: (item) => (
        <Badge
          variant={
            item.status === 'Verified'
              ? 'emerald'
              : item.status === 'Needs Signature'
              ? 'gold'
              : 'default'
          }
          size="sm"
          dot={item.status === 'Verified'}
        >
          {item.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Action',
      render: (item) => (
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => toast({ title: 'Downloading', description: `Decrypted ${item.name}`, type: 'info' })}
            aria-label="Download document"
          >
            <Download className="w-3.5 h-3.5 text-slate-500 hover:text-blue-600" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-8 text-left">
      <div className="space-y-2">
        <Breadcrumb items={[{ label: 'Documents & Filings' }]} />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              Underwriting Vault & Filings
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              SOC2 Type II bank-grade encrypted corporate repository for tax returns, P&L, and loan covenants.
            </p>
          </div>
          <Badge variant="navy" size="md">
            Vault 256-Bit AES
          </Badge>
        </div>
      </div>

      {/* Upload Zone */}
      <Card variant="default" className="p-6">
        <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white mb-3">
          Upload New Financial Statements or Filings
        </h3>
        <FileUpload onFilesSelected={handleFilesSelected} />
      </Card>

      {/* Interactive DataTable */}
      <Card variant="bento" className="p-6">
        <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-4">
          Repository Records
        </h3>

        <DataTable
          data={documents}
          columns={columns}
          searchKey="name"
          filterOptions={{
            key: 'category',
            label: 'Categories',
            options: [
              { label: 'Tax & Compliance', value: 'Tax & Compliance' },
              { label: 'Financial Statements', value: 'Financial Statements' },
              { label: 'Ownership & Legal', value: 'Ownership & Legal' },
              { label: 'Bank Feeds', value: 'Bank Feeds' },
            ],
          }}
          pageSize={5}
        />
      </Card>
    </div>
  )
}
