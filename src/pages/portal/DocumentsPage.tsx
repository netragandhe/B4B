import React, { useState, useEffect } from 'react'
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
import { PageTransition } from '@/components/animations/PageTransition'
import { PageLoadingFallback } from '@/components/ui/PageLoadingFallback'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import { useApplicationDocuments } from '@/hooks/queries/useFintechData'
import { useToast } from '@/components/ui/Toast'
import type { ApplicationDocument } from '@/mock-data/fintechData'

export const DocumentsPage: React.FC = () => {
  const { toast } = useToast()
  const { data: initialDocs, isLoading, isError, refetch } = useApplicationDocuments()
  const [documents, setDocuments] = useState<ApplicationDocument[]>([])

  useEffect(() => {
    if (initialDocs) {
      setDocuments(initialDocs)
    }
  }, [initialDocs])

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

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id))
    toast({
      title: 'Document Removed',
      description: 'Document purged from your data room.',
      type: 'info',
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
        <Badge variant="primary" size="sm">
          {item.category}
        </Badge>
      ),
    },
    {
      key: 'size',
      header: 'File Size',
      render: (item) => (
        <span className="text-xs text-slate-500 font-mono">{item.size}</span>
      ),
    },
    {
      key: 'uploadedAt',
      header: 'Uploaded Date',
      sortable: true,
      render: (item) => (
        <span className="text-xs text-slate-500">{item.uploadedAt}</span>
      ),
    },
    {
      key: 'status',
      header: 'Verification Status',
      sortable: true,
      render: (item) => (
        <Badge
          variant={
            item.status === 'Verified'
              ? 'emerald'
              : item.status === 'Needs Signature'
              ? 'danger'
              : 'gold'
          }
          size="sm"
          dot
        >
          {item.status}
        </Badge>
      ),
    },
    {
      key: 'id',
      header: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              toast({
                title: 'Download Initialized',
                description: `Downloading ${item.name}`,
                type: 'info',
              })
            }
            leftIcon={<Download className="w-3.5 h-3.5 text-blue-500" />}
            className="h-8 text-xs"
          >
            Download
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleDelete(item.id)}
            leftIcon={<Trash2 className="w-3.5 h-3.5 text-red-500" />}
            className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40"
          />
        </div>
      ),
    },
  ]

  if (isLoading) return <PageLoadingFallback />
  if (isError) {
    return (
      <ErrorState
        title="Could not load document room"
        message="Unable to connect to the secure compliance vault. Please retry."
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <PageTransition>
      <div className="space-y-8 text-left">
        <div className="space-y-2">
          <Breadcrumb items={[{ label: 'Documents & Filings' }]} />
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
            Secure Documents & Underwriting Vault
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            SOC2 Type II encrypted repository for P&L schedules, bank feed statements, and tax returns.
          </p>
        </div>

        {/* Upload Zone */}
        <Card variant="bento" className="p-6">
          <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white mb-3">
            Upload Compliance & Underwriting Assets
          </h3>
          <FileUpload
            maxSizeMB={25}
            multiple={true}
            accept=".pdf,.xlsx,.csv,.zip"
            onFilesSelected={handleFilesSelected}
          />
        </Card>

        {/* Documents Table */}
        {documents.length === 0 ? (
          <EmptyState
            icon={<FileText className="w-8 h-8 text-blue-500" />}
            title="No documents uploaded yet"
            description="Drag and drop your tax filings or financial statements to complete underwriting."
          />
        ) : (
          <Card variant="default" className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Uploaded Records & Filings
              </h3>
              <Badge variant="emerald" size="sm">
                {documents.filter((d) => d.status === 'Verified').length} of {documents.length} Verified
              </Badge>
            </div>
            <DataTable
              data={documents}
              columns={columns}
              searchKey="name"
              searchPlaceholder="Search files by name..."
              pageSize={10}
            />
          </Card>
        )}
      </div>
    </PageTransition>
  )
}
