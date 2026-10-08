import React, { useRef, useState } from 'react'
import { UploadCloud, FileText, CheckCircle2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface UploadedFile {
  name: string
  size: number
  type: string
  status?: 'ready' | 'uploading' | 'complete'
}

export interface FileUploadProps {
  accept?: string
  maxSizeMB?: number
  multiple?: boolean
  label?: string
  helperText?: string
  onFilesSelected?: (files: File[]) => void
  className?: string
  error?: string
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = '.pdf,.csv,.xlsx,.doc,.docx,.png,.jpg',
  maxSizeMB = 15,
  multiple = true,
  onFilesSelected,
  className,
  error,
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [fileList, setFileList] = useState<UploadedFile[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files))
    }
  }

  const processFiles = (newFiles: File[]) => {
    const formatted: UploadedFile[] = newFiles.map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type,
      status: 'complete',
    }))

    setFileList((prev) => (multiple ? [...prev, ...formatted] : formatted))
    onFilesSelected?.(newFiles)
  }

  const removeFile = (index: number) => {
    setFileList((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className={cn('w-full space-y-3', className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 group',
          isDragOver
            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 scale-[0.99]'
            : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0D1E36]/50 hover:bg-slate-100/70 dark:hover:bg-[#12294A]/70 hover:border-blue-400',
          error && 'border-red-400 dark:border-red-600 bg-red-50/20'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="sr-only"
        />

        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
          <UploadCloud className="w-6 h-6" />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            <span className="text-blue-600 dark:text-blue-400 hover:underline">Click to upload</span> or drag & drop documents
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Financial statements, P&L, Tax returns or invoices (up to {maxSizeMB}MB)
          </p>
        </div>
      </div>

      {/* Uploaded Files List */}
      {fileList.length > 0 && (
        <div className="space-y-2">
          {fileList.map((file, idx) => (
            <div
              key={`${file.name}-${idx}`}
              className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1E36] text-xs shadow-sm animate-fadeIn"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                <div className="truncate">
                  <p className="font-medium text-slate-800 dark:text-slate-200 truncate">{file.name}</p>
                  <p className="text-[11px] text-slate-500">{formatFileSize(file.size)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Ready
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(idx)
                  }}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
