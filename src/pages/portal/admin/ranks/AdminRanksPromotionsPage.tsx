import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  Trophy,
  Save,
  RotateCcw,
  History,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Send,
  Layers,
  Info,
  DollarSign,
  Users,
  Calendar,
  ShieldAlert,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'
import { useAuth } from '@/hooks/useAuth'
import {
  RankData,
  RanksPolicyDocument,
  RankVersion,
  INITIAL_RANKS_DOCUMENT,
} from '@/mock-data/ranks'
import { rankService, sanitizeHtml, ValidationNotice } from '@/lib/rankService'
import { RichTextEditor } from './RichTextEditor'

export const AdminRanksPromotionsPage: React.FC = () => {
  const { user } = useAuth()
  const { toast } = useToast()

  const authorName = user?.name || 'Administrator'

  // Document state
  const [documentData, setDocumentData] =
    useState<RanksPolicyDocument>(INITIAL_RANKS_DOCUMENT)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  // Autosave and dirty tracking
  const [isDirty, setIsDirty] = useState(false)
  const [autosaveStatus, setAutosaveStatus] = useState<string>('All changes saved')
  const autosaveTimerRef = useRef<any>(null)

  // Preview Mode
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  // Collapsible accordion states for the 9 ranks
  const [expandedRankIds, setExpandedRankIds] = useState<Record<string, boolean>>({
    'rank-1': true,
    'rank-2': true,
    'rank-3': true,
    'rank-4': true,
    'rank-5': true,
    'rank-6': true,
    'rank-7': true,
    'rank-8': true,
    'rank-9': true,
  })

  // Version History Modal
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [versions, setVersions] = useState<RankVersion[]>([])
  const [isRestoring, setIsRestoring] = useState(false)

  // Validation notices (non-blocking warnings)
  const [validationNotices, setValidationNotices] = useState<ValidationNotice[]>([])

  // Load initial document on mount
  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const doc = await rankService.getRanksDocument()
        setDocumentData(doc)
        setValidationNotices(rankService.validateRanksDocument(doc))
        const history = await rankService.getVersionHistory()
        setVersions(history)
      } catch (err) {
        console.error('Failed to load ranks document:', err)
        toast({
          title: 'Error loading ranks',
          description: 'Could not load ranks configuration from storage.',
          type: 'error',
        })
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [toast])

  // Recalculate validation warnings when document data changes
  useEffect(() => {
    if (!isLoading) {
      setValidationNotices(rankService.validateRanksDocument(documentData))
    }
  }, [documentData, isLoading])

  // Debounced Autosave Trigger
  const triggerAutosave = useCallback(
    (newDoc: RanksPolicyDocument) => {
      setIsDirty(true)
      setAutosaveStatus('Saving draft in background...')

      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current)
      }

      autosaveTimerRef.current = setTimeout(async () => {
        try {
          const saved = await rankService.saveDraft(newDoc, authorName)
          setDocumentData(saved)
          setIsDirty(false)
          const timeStr = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
          setAutosaveStatus(`Draft autosaved at ${timeStr}`)
        } catch (e) {
          console.error('Autosave failed:', e)
          setAutosaveStatus('Autosave failed. Click Save to retry.')
        }
      }, 2500)
    },
    [authorName]
  )

  // General Policy text updater
  const handleGeneralPolicyChange = (html: string) => {
    const updated = {
      ...documentData,
      generalPolicyTerms: html,
    }
    setDocumentData(updated)
    triggerAutosave(updated)
  }

  // Field updater per rank
  const handleRankFieldChange = (
    rankId: string,
    field: keyof RankData,
    value: any
  ) => {
    const updatedRanks = documentData.ranks.map((r) => {
      if (r.id === rankId) {
        return { ...r, [field]: value }
      }
      return r
    })

    const updated = {
      ...documentData,
      ranks: updatedRanks,
    }
    setDocumentData(updated)
    triggerAutosave(updated)
  }

  // Manual Save Draft
  const handleManualSave = async () => {
    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current)
    }
    setIsSaving(true)
    try {
      const saved = await rankService.saveDraft(
        documentData,
        authorName,
        { createVersion: true, versionLabel: `Manual Draft Save (${new Date().toLocaleTimeString()})` }
      )
      setDocumentData(saved)
      setIsDirty(false)
      const timeStr = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setAutosaveStatus(`Draft saved at ${timeStr}`)

      const updatedHistory = await rankService.getVersionHistory()
      setVersions(updatedHistory)

      toast({
        title: 'Draft Saved Successfully',
        description: 'All 9 ranks and general promotion terms saved to version history.',
        type: 'success',
      })
    } catch (e) {
      console.error('Manual save failed:', e)
      toast({
        title: 'Save Failed',
        description: 'Could not save rank draft.',
        type: 'error',
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Publish Document
  const handlePublish = async () => {
    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current)
    }
    setIsPublishing(true)
    try {
      const published = await rankService.publishDocument(documentData, authorName)
      setDocumentData(published)
      setIsDirty(false)
      setAutosaveStatus('Published to Live Coach Portal')

      const updatedHistory = await rankService.getVersionHistory()
      setVersions(updatedHistory)

      toast({
        title: 'Policy & Ranks Published!',
        description: `Version ${published.version}.0 is now live for all coaches on /portal/coach/rank.`,
        type: 'success',
      })
    } catch (e) {
      console.error('Publish failed:', e)
      toast({
        title: 'Publish Failed',
        description: 'Failed to publish ranks document.',
        type: 'error',
      })
    } finally {
      setIsPublishing(false)
    }
  }

  // Open Version History Modal
  const handleOpenHistory = async () => {
    try {
      const hist = await rankService.getVersionHistory()
      setVersions(hist)
      setShowHistoryModal(true)
    } catch (e) {
      console.error('Failed to load version history:', e)
    }
  }

  // Restore a Version
  const handleRestoreVersion = async (versionId: string) => {
    setIsRestoring(true)
    try {
      const restored = await rankService.restoreVersion(versionId, authorName)
      setDocumentData(restored)
      setIsDirty(false)
      setAutosaveStatus(`Restored version at ${new Date().toLocaleTimeString()}`)
      setShowHistoryModal(false)

      const updatedHistory = await rankService.getVersionHistory()
      setVersions(updatedHistory)

      toast({
        title: 'Version Restored',
        description: 'Loaded selected version snapshot into the active editor.',
        type: 'info',
      })
    } catch (e) {
      console.error('Restore failed:', e)
      toast({
        title: 'Restore Failed',
        description: 'Could not restore selected version.',
        type: 'error',
      })
    } finally {
      setIsRestoring(false)
    }
  }

  // Accordion toggle helpers
  const toggleRank = (rankId: string) => {
    setExpandedRankIds((prev) => ({
      ...prev,
      [rankId]: !prev[rankId],
    }))
  }

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {}
    documentData.ranks.forEach((r) => {
      allExpanded[r.id] = true
    })
    setExpandedRankIds(allExpanded)
  }

  const collapseAll = () => {
    const allCollapsed: Record<string, boolean> = {}
    documentData.ranks.forEach((r) => {
      allCollapsed[r.id] = false
    })
    setExpandedRankIds(allCollapsed)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 space-y-4">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          Loading Ranks & Promotion Rules...
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto pb-16">
      {/* HEADER & METADATA */}
      <PageHeader
        title="Ranks and Promotions Administration"
        description="Configure qualification terms, commission tiers, and advancement rules across B4B's 9 executive career ranks."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Admin', href: '/portal/admin/overview' },
          { label: 'Ranks & Promotions' },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={isPreviewMode ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="w-4 h-4 mr-1.5" />
              {isPreviewMode ? 'Back to Editor' : 'Preview Live'}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenHistory}
            >
              <History className="w-4 h-4 mr-1.5" />
              Version History ({versions.length})
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={isSaving}
              onClick={handleManualSave}
            >
              <Save className="w-4 h-4 mr-1.5" />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </Button>

            <Button
              variant="primary"
              size="sm"
              disabled={isPublishing}
              onClick={handlePublish}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
            >
              <Send className="w-4 h-4 mr-1.5" />
              {isPublishing ? 'Publishing...' : 'Publish to Coaches'}
            </Button>
          </div>
        }
      />

      {/* STATUS & AUDIT BAR */}
      <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isDirty
                  ? 'bg-amber-500 animate-pulse'
                  : 'bg-emerald-500'
              }`}
            />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {autosaveStatus}
            </span>
          </div>

          <span className="text-slate-300 dark:text-slate-700">|</span>

          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>
              Last edited by{' '}
              <strong className="text-slate-900 dark:text-slate-100">
                {documentData.lastEditedBy || 'Administrator'}
              </strong>{' '}
              at{' '}
              {new Date(documentData.lastEditedAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              on {new Date(documentData.lastEditedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge
            variant={documentData.isPublished ? 'success' : 'amber'}
            size="sm"
          >
            {documentData.isPublished
              ? `Published (v${documentData.version}.0)`
              : 'Working Draft (Unpublished)'}
          </Badge>

          <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
            Strict Sequence: 9 Immutable Tiers
          </span>
        </div>
      </div>

      {/* NON-BLOCKING VALIDATION WARNINGS (Client document rules) */}
      {validationNotices.length > 0 && (
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-700/60 bg-amber-50/70 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-200 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Document Policy Validation ({validationNotices.length} Notices)
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-200/80 dark:bg-amber-800/60 text-amber-950 dark:text-amber-100">
              Non-blocking Warnings (Save Permitted)
            </span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 pl-1 text-[11.5px]">
            {validationNotices.map((notice, i) => (
              <li key={i} className="leading-snug">
                {notice.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* PROMOTION POLICY AND GENERAL TERMS (TOP RICH TEXT SECTION) */}
      <Card className="p-6 space-y-4 shadow-sm border border-[var(--border)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="space-y-0.5">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Promotion Policy and General Terms
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Overarching executive leadership governance and advancement rules applied across all 9 ranks.
            </p>
          </div>
          <Badge variant="royal" size="sm">
            Top Executive Policy
          </Badge>
        </div>

        {isPreviewMode ? (
          <div
            className="prose prose-sm dark:prose-invert max-w-none p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-[var(--border)]"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(documentData.generalPolicyTerms),
            }}
          />
        ) : (
          <RichTextEditor
            label="General Promotion Policy Editor"
            value={documentData.generalPolicyTerms}
            onChange={handleGeneralPolicyChange}
            minHeight="140px"
            placeholder="Write general policy, audit terms, and leadership directives..."
          />
        )}
      </Card>

      {/* RANKS SECTION CONTROLS */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-600" />
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
            Individual Rank Tiers (All 9 Tiers)
          </h2>
          <span className="text-xs text-slate-500 font-normal">
            (Strict order preserved; cannot be reordered)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={expandAll}>
            Expand All
          </Button>
          <span className="text-slate-300">|</span>
          <Button variant="ghost" size="sm" onClick={collapseAll}>
            Collapse All
          </Button>
        </div>
      </div>

      {/* ALL 9 RANK TIERS */}
      <div className="space-y-4">
        {documentData.ranks.map((rank) => {
          const isExpanded = !!expandedRankIds[rank.id]
          return (
            <Card
              key={rank.id}
              className={`border transition-all shadow-xs overflow-hidden ${
                isExpanded
                  ? 'border-emerald-300 dark:border-emerald-800/60 ring-1 ring-emerald-500/10'
                  : 'border-[var(--border)] hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* CARD ACCORDION HEADER */}
              <div
                onClick={() => toggleRank(rank.id)}
                className="w-full p-4.5 bg-slate-50/75 dark:bg-slate-900/40 flex items-center justify-between gap-4 cursor-pointer select-none transition-colors hover:bg-slate-100/70 dark:hover:bg-slate-900/70"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">
                    #{rank.level}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                        {rank.name}
                      </h3>
                      <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                        {rank.statusTitle || `Level ${rank.level}`}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                      <span>
                        PMC Range:{' '}
                        <strong className="text-slate-800 dark:text-slate-200">
                          ${(rank.monthlyCommissionMin ?? 0).toLocaleString()} – $
                          {(rank.monthlyCommissionMax ?? 0).toLocaleString()}
                        </strong>
                      </span>
                      <span>•</span>
                      <span>
                        Est. Yearly:{' '}
                        <strong className="text-slate-800 dark:text-slate-200">
                          {rank.yearlyIncomeDisplay || '—'}
                        </strong>
                      </span>
                      {rank.requiredConsecutiveMonths && (
                        <>
                          <span>•</span>
                          <span>
                            {rank.requiredConsecutiveMonths} Consec. Months
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {rank.clientNotes && rank.clientNotes.length > 0 && (
                    <Badge variant="amber" size="sm" className="hidden sm:inline-flex text-[10px]">
                      {rank.clientNotes.length} Client Notice
                    </Badge>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500" />
                  )}
                </div>
              </div>

              {/* CARD ACCORDION BODY */}
              {isExpanded && (
                <div className="p-5 space-y-5 border-t border-[var(--border)] bg-[var(--surface)] animate-fadeIn">
                  {/* CLIENT CONFIRMATION & GAP CALLOUTS */}
                  {rank.clientNotes && rank.clientNotes.length > 0 && (
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                      <div className="font-semibold flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Client Document Notes & Clarifications:</span>
                      </div>
                      <ul className="list-disc list-inside pl-1 text-[11px] space-y-0.5 text-amber-800 dark:text-amber-300">
                        {rank.clientNotes.map((note, idx) => (
                          <li key={idx}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* FIELD GRID: RANGES, TEAM, & MONTHS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    {/* Rank Name */}
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">
                        Rank Name (Immutable Tier #{rank.level})
                      </label>
                      <input
                        type="text"
                        disabled={isPreviewMode}
                        value={rank.name}
                        onChange={(e) =>
                          handleRankFieldChange(rank.id, 'name', e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white font-medium focus:border-emerald-500 outline-none"
                      />
                    </div>

                    {/* Monthly Commission Min & Max */}
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                        <span>Personal Monthly Comm. (PMC)</span>
                        <span className="text-[10px] text-slate-400 font-normal">Min / Max ($)</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          disabled={isPreviewMode}
                          value={rank.monthlyCommissionMin ?? ''}
                          onChange={(e) =>
                            handleRankFieldChange(
                              rank.id,
                              'monthlyCommissionMin',
                              e.target.value === '' ? null : Number(e.target.value)
                            )
                          }
                          placeholder="Min $"
                          className="w-1/2 px-2.5 py-2 rounded-lg border border-[var(--border)] bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white font-mono focus:border-emerald-500 outline-none"
                        />
                        <span className="text-slate-400">–</span>
                        <input
                          type="number"
                          disabled={isPreviewMode}
                          value={rank.monthlyCommissionMax ?? ''}
                          onChange={(e) =>
                            handleRankFieldChange(
                              rank.id,
                              'monthlyCommissionMax',
                              e.target.value === '' ? null : Number(e.target.value)
                            )
                          }
                          placeholder="Max $"
                          className="w-1/2 px-2.5 py-2 rounded-lg border border-[var(--border)] bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white font-mono focus:border-emerald-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Yearly Income Range & Display */}
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                        <span>Approx. Yearly Income</span>
                        <span className="text-[10px] text-slate-400 font-normal">Display String</span>
                      </label>
                      <input
                        type="text"
                        disabled={isPreviewMode}
                        value={rank.yearlyIncomeDisplay}
                        onChange={(e) =>
                          handleRankFieldChange(
                            rank.id,
                            'yearlyIncomeDisplay',
                            e.target.value
                          )
                        }
                        placeholder="$30,000.00 or Less"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white font-medium focus:border-emerald-500 outline-none"
                      />
                    </div>

                    {/* Consecutive Months */}
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">
                        Consecutive Months Required
                      </label>
                      <input
                        type="number"
                        disabled={isPreviewMode}
                        value={rank.requiredConsecutiveMonths ?? ''}
                        onChange={(e) =>
                          handleRankFieldChange(
                            rank.id,
                            'requiredConsecutiveMonths',
                            e.target.value === '' ? null : Number(e.target.value)
                          )
                        }
                        placeholder="e.g. 3"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white font-mono focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* SECOND ROW: TEAM CRITERIA & EXPERIENCE */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Required Team Members */}
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">
                        Required Team Members / Mentored Leaders
                      </label>
                      <input
                        type="number"
                        disabled={isPreviewMode}
                        value={rank.requiredTeamMembers ?? ''}
                        onChange={(e) =>
                          handleRankFieldChange(
                            rank.id,
                            'requiredTeamMembers',
                            e.target.value === '' ? null : Number(e.target.value)
                          )
                        }
                        placeholder="0 (None) or e.g. 3"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white font-mono focus:border-emerald-500 outline-none"
                      />
                    </div>

                    {/* Team Monthly Commission (TMC) */}
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                        <span>Team Monthly Commission (TMC)</span>
                        <span className="text-[10px] text-slate-400 font-normal">Min / Max ($)</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          disabled={isPreviewMode}
                          value={rank.requiredTeamMonthlyCommissionMin ?? ''}
                          onChange={(e) =>
                            handleRankFieldChange(
                              rank.id,
                              'requiredTeamMonthlyCommissionMin',
                              e.target.value === '' ? null : Number(e.target.value)
                            )
                          }
                          placeholder="Min TMC"
                          className="w-1/2 px-2.5 py-2 rounded-lg border border-[var(--border)] bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white font-mono focus:border-emerald-500 outline-none"
                        />
                        <span className="text-slate-400">–</span>
                        <input
                          type="number"
                          disabled={isPreviewMode}
                          value={rank.requiredTeamMonthlyCommissionMax ?? ''}
                          onChange={(e) =>
                            handleRankFieldChange(
                              rank.id,
                              'requiredTeamMonthlyCommissionMax',
                              e.target.value === '' ? null : Number(e.target.value)
                            )
                          }
                          placeholder="Max TMC"
                          className="w-1/2 px-2.5 py-2 rounded-lg border border-[var(--border)] bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white font-mono focus:border-emerald-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Experience Requirement */}
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">
                        Experience Requirement
                      </label>
                      <input
                        type="text"
                        disabled={isPreviewMode}
                        value={rank.experienceRequirement}
                        onChange={(e) =>
                          handleRankFieldChange(
                            rank.id,
                            'experienceRequirement',
                            e.target.value
                          )
                        }
                        placeholder="e.g. 2 - 3 years experience"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white font-medium focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* TERMS AND DESCRIPTION: RICH TEXT EDITOR */}
                  <div className="space-y-1.5 pt-2">
                    <label className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center justify-between">
                      <span>Terms, Rules, and Qualification Description</span>
                      <span className="text-[11px] font-normal text-slate-500">
                        Supports bold, italic, headings, lists, tables, links, undo/redo
                      </span>
                    </label>

                    {isPreviewMode ? (
                      <div
                        className="prose prose-sm dark:prose-invert max-w-none p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-[var(--border)]"
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtml(rank.termsDescription),
                        }}
                      />
                    ) : (
                      <RichTextEditor
                        value={rank.termsDescription}
                        onChange={(html) =>
                          handleRankFieldChange(rank.id, 'termsDescription', html)
                        }
                        minHeight="120px"
                        placeholder={`Write qualification rules, maintenance terms, and description for ${rank.name}...`}
                      />
                    )}
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* VERSION HISTORY MODAL */}
      <Modal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        title="Version History & Restore Point"
        description="Review all drafts, auto-saves, and published snapshots. Click restore to revert to any previous state."
        maxWidth="2xl"
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {versions.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              No version history snapshots available yet.
            </div>
          ) : (
            <div className="space-y-3">
              {versions.map((ver) => {
                const isCurrent =
                  ver.document.lastEditedAt === documentData.lastEditedAt

                return (
                  <div
                    key={ver.id}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs transition-colors ${
                      isCurrent
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                        : 'border-[var(--border)] bg-[var(--surface)] hover:bg-slate-50/60 dark:hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {ver.label}
                        </span>
                        {isCurrent && (
                          <Badge variant="success" size="sm">
                            Active State
                          </Badge>
                        )}
                        <Badge variant="outline" size="sm">
                          v{ver.versionNumber}.0
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px]">
                        <span>Edited by {ver.editedBy}</span>
                        <span>•</span>
                        <span>
                          {new Date(ver.timestamp).toLocaleDateString()} at{' '}
                          {new Date(ver.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Button
                        variant={isCurrent ? 'ghost' : 'outline'}
                        size="sm"
                        disabled={isCurrent || isRestoring}
                        onClick={() => handleRestoreVersion(ver.id)}
                      >
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        {isCurrent ? 'Current' : 'Restore Version'}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}
export default AdminRanksPromotionsPage
