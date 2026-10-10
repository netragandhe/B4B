import React, { useRef, useEffect, useState, useCallback } from 'react'
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Table as TableIcon,
  Undo,
  Redo,
  RemoveFormatting,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  minHeight?: string
  className?: string
  disabled?: boolean
  label?: string
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write terms, rules, and qualification criteria...',
  minHeight = '140px',
  className,
  disabled = false,
  label,
}) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const isUpdatingRef = useRef(false)
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [savedSelection, setSavedSelection] = useState<Range | null>(null)

  // Synchronize internal HTML with value prop without overwriting active editing cursor
  useEffect(() => {
    if (!editorRef.current) return
    if (isUpdatingRef.current) return

    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ''
    }
  }, [value])

  const handleInput = useCallback(() => {
    if (!editorRef.current) return
    isUpdatingRef.current = true
    const html = editorRef.current.innerHTML
    onChange(html)
    setTimeout(() => {
      isUpdatingRef.current = false
    }, 50)
  }, [onChange])

  const executeCommand = (command: string, arg?: string) => {
    if (disabled || !editorRef.current) return
    editorRef.current.focus()
    document.execCommand(command, false, arg)
    handleInput()
  }

  const handleFormatBlock = (tag: string) => {
    executeCommand('formatBlock', tag)
  }

  const handleOpenLinkModal = () => {
    if (disabled) return
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      setSavedSelection(selection.getRangeAt(0).cloneRange())
    }
    setLinkUrl('')
    setShowLinkModal(true)
  }

  const handleApplyLink = (e: React.FormEvent) => {
    e.preventDefault()
    setShowLinkModal(false)
    if (!linkUrl.trim()) return

    if (savedSelection && window.getSelection) {
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(savedSelection)
    }

    const formattedUrl = linkUrl.startsWith('http://') || linkUrl.startsWith('https://') || linkUrl.startsWith('mailto:')
      ? linkUrl
      : `https://${linkUrl}`

    executeCommand('createLink', formattedUrl)
  }

  const handleInsertTable = () => {
    if (disabled) return
    const tableHtml = `
      <table style="width: 100%; border-collapse: collapse; margin: 12px 0; border: 1px solid #cbd5e1;">
        <thead>
          <tr style="background-color: #f1f5f9;">
            <th style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left; font-size: 12px;">Criteria</th>
            <th style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left; font-size: 12px;">Requirement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 6px 10px; font-size: 12px;">Performance Metric</td>
            <td style="border: 1px solid #cbd5e1; padding: 6px 10px; font-size: 12px;">Enter standard value</td>
          </tr>
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 6px 10px; font-size: 12px;">Audit Window</td>
            <td style="border: 1px solid #cbd5e1; padding: 6px 10px; font-size: 12px;">3 consecutive months</td>
          </tr>
        </tbody>
      </table>
      <p></p>
    `
    executeCommand('insertHTML', tableHtml)
  }

  return (
    <div className={cn('w-full flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-xs transition-colors focus-within:border-[var(--blue-600)]', className)}>
      {label && (
        <div className="px-3.5 pt-2.5 pb-1 text-xs font-bold text-[var(--text)] tracking-wider">
          {label}
        </div>
      )}

      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-1 p-1.5 border-b border-[var(--border)] bg-slate-50/75 dark:bg-slate-900/60 select-none">
        {/* Headings */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => handleFormatBlock('<h1>')}
          className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors disabled:opacity-40"
          title="Heading 1"
          aria-label="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => handleFormatBlock('<h2>')}
          className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors disabled:opacity-40"
          title="Heading 2"
          aria-label="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => handleFormatBlock('<h3>')}
          className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors disabled:opacity-40"
          title="Heading 3"
          aria-label="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <span className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

        {/* Text styling */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => executeCommand('bold')}
          className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-40"
          title="Bold (Ctrl+B)"
          aria-label="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => executeCommand('italic')}
          className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-40"
          title="Italic (Ctrl+I)"
          aria-label="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <span className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

        {/* Lists */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => executeCommand('insertUnorderedList')}
          className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-40"
          title="Bullet List"
          aria-label="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => executeCommand('insertOrderedList')}
          className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-40"
          title="Numbered List"
          aria-label="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <span className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

        {/* Link and Table */}
        <button
          type="button"
          disabled={disabled}
          onClick={handleOpenLinkModal}
          className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-40"
          title="Insert Link"
          aria-label="Insert Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={handleInsertTable}
          className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-40"
          title="Insert Table"
          aria-label="Insert Table"
        >
          <TableIcon className="w-4 h-4" />
        </button>

        <span className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

        {/* Undo and Redo */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => executeCommand('undo')}
          className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-40"
          title="Undo (Ctrl+Z)"
          aria-label="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => executeCommand('redo')}
          className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-40"
          title="Redo (Ctrl+Y)"
          aria-label="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => executeCommand('removeFormat')}
          className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-40 ml-auto"
          title="Clear Formatting"
          aria-label="Clear Formatting"
        >
          <RemoveFormatting className="w-4 h-4" />
        </button>
      </div>

      {/* LINK POPUP */}
      {showLinkModal && (
        <form
          onSubmit={handleApplyLink}
          className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800 border-b border-[var(--border)] text-xs animate-fadeIn"
        >
          <span className="font-semibold text-slate-600 dark:text-slate-300">URL:</span>
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-2.5 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:border-blue-500"
            autoFocus
          />
          <button
            type="submit"
            className="px-2.5 py-1 rounded bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={() => setShowLinkModal(false)}
            className="px-2 py-1 rounded text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
        </form>
      )}

      {/* EDITABLE CANVAS */}
      <div
        ref={editorRef}
        contentEditable={!disabled}
        onInput={handleInput}
        style={{ minHeight }}
        data-placeholder={placeholder}
        className={cn(
          'p-3.5 text-sm text-[var(--text)] outline-none leading-relaxed transition-opacity overflow-y-auto',
          'prose prose-sm dark:prose-invert max-w-none',
          'empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none',
          disabled && 'opacity-60 cursor-not-allowed bg-slate-50/50 dark:bg-slate-900/50'
        )}
      />
    </div>
  )
}
