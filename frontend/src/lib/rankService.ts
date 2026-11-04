/**
 * Rank Service Layer
 * Manages Ranks and Promotions document draft, publish, autosave,
 * version history, range validation warnings, HTML sanitization, and coach progress.
 *
 * Persists to localStorage with simulated asynchronous latency.
 */

import {
  RankData,
  RanksPolicyDocument,
  RankVersion,
  CoachProgress,
  INITIAL_RANKS_DOCUMENT,
  INITIAL_COACH_PROGRESS,
} from '../mock-data/ranks'

const STORAGE_KEYS = {
  CURRENT_DOC: 'b4b_ranks_document',
  PUBLISHED_DOC: 'b4b_ranks_published',
  VERSIONS: 'b4b_ranks_versions',
  COACH_PROGRESS: 'b4b_ranks_coach_progress',
}

const SIMULATED_DELAY_MS = 120

const delay = (ms = SIMULATED_DELAY_MS) =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Robust, client-side HTML sanitizer
 * Strips script tags, style tags, iframes, object, embed, forms,
 * on* event handlers, and unsafe javascript: or data: hrefs.
 */
export function sanitizeHtml(rawHtml: string): string {
  if (!rawHtml || typeof rawHtml !== 'string') return ''

  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    // Basic fallback for non-DOM environments
    return rawHtml
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/on\w+='[^']*'/gi, '')
  }

  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(rawHtml, 'text/html')

    const DANGEROUS_TAGS = [
      'script',
      'style',
      'iframe',
      'object',
      'embed',
      'form',
      'input',
      'button',
      'textarea',
      'select',
      'link',
      'meta',
      'base',
      'applet',
    ]

    DANGEROUS_TAGS.forEach((tag) => {
      const elements = doc.querySelectorAll(tag)
      elements.forEach((el) => el.remove())
    })

    // Walk all remaining elements and clean attributes
    const allElements = doc.querySelectorAll('*')
    allElements.forEach((el) => {
      // Remove all on* event handler attributes
      const attributeNames = Array.from(el.attributes).map((attr) => attr.name)
      attributeNames.forEach((attrName) => {
        const lower = attrName.toLowerCase()
        if (lower.startsWith('on')) {
          el.removeAttribute(attrName)
        }
        // Clean unsafe javascript: and vbscript: URIs
        if (lower === 'href' || lower === 'src' || lower === 'action') {
          const val = (el.getAttribute(attrName) || '').trim().toLowerCase()
          if (
            val.startsWith('javascript:') ||
            val.startsWith('vbscript:') ||
            val.startsWith('data:text/html')
          ) {
            el.removeAttribute(attrName)
          }
        }
      })
    })

    return doc.body.innerHTML
  } catch (err) {
    console.error('Error sanitizing HTML:', err)
    return rawHtml.replace(/<[^>]*>?/gm, '')
  }
}

export interface ValidationNotice {
  rankLevel?: number
  message: string
  type: 'warning' | 'info'
}

class RankService {
  private initStorage() {
    if (typeof window === 'undefined') return

    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_DOC)) {
      localStorage.setItem(
        STORAGE_KEYS.CURRENT_DOC,
        JSON.stringify(INITIAL_RANKS_DOCUMENT)
      )
    }

    if (!localStorage.getItem(STORAGE_KEYS.PUBLISHED_DOC)) {
      localStorage.setItem(
        STORAGE_KEYS.PUBLISHED_DOC,
        JSON.stringify(INITIAL_RANKS_DOCUMENT)
      )
    }

    if (!localStorage.getItem(STORAGE_KEYS.VERSIONS)) {
      const initialVersion: RankVersion = {
        id: 'ver-initial',
        versionNumber: 1,
        label: 'Initial Published Document (v1.0)',
        timestamp: INITIAL_RANKS_DOCUMENT.publishedAt || new Date().toISOString(),
        editedBy: INITIAL_RANKS_DOCUMENT.lastEditedBy,
        document: INITIAL_RANKS_DOCUMENT,
      }
      localStorage.setItem(
        STORAGE_KEYS.VERSIONS,
        JSON.stringify([initialVersion])
      )
    }

    if (!localStorage.getItem(STORAGE_KEYS.COACH_PROGRESS)) {
      localStorage.setItem(
        STORAGE_KEYS.COACH_PROGRESS,
        JSON.stringify(INITIAL_COACH_PROGRESS)
      )
    }
  }

  /**
   * Get the current working draft / document
   */
  async getRanksDocument(): Promise<RanksPolicyDocument> {
    await delay()
    this.initStorage()
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_DOC)
      if (raw) {
        return JSON.parse(raw) as RanksPolicyDocument
      }
    } catch (e) {
      console.error('Failed to read ranks doc from localStorage:', e)
    }
    return INITIAL_RANKS_DOCUMENT
  }

  /**
   * Get the published document (read-only for Coach & public)
   */
  async getPublishedDocument(): Promise<RanksPolicyDocument> {
    await delay()
    this.initStorage()
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PUBLISHED_DOC)
      if (raw) {
        return JSON.parse(raw) as RanksPolicyDocument
      }
    } catch (e) {
      console.error('Failed to read published ranks doc from localStorage:', e)
    }
    return INITIAL_RANKS_DOCUMENT
  }

  /**
   * Save a draft (manual save or autosave)
   */
  async saveDraft(
    doc: RanksPolicyDocument,
    authorName = 'Admin',
    options?: { createVersion?: boolean; versionLabel?: string }
  ): Promise<RanksPolicyDocument> {
    await delay()
    this.initStorage()

    // Ensure 9 ranks preserve strict level order 1-9
    const sortedRanks = [...doc.ranks].sort((a, b) => a.level - b.level)

    const updatedDoc: RanksPolicyDocument = {
      ...doc,
      ranks: sortedRanks,
      lastEditedBy: authorName,
      lastEditedAt: new Date().toISOString(),
      isPublished: false,
    }

    localStorage.setItem(STORAGE_KEYS.CURRENT_DOC, JSON.stringify(updatedDoc))

    if (options?.createVersion) {
      await this.createVersionSnapshot(
        updatedDoc,
        options.versionLabel || `Draft Save (${new Date().toLocaleTimeString()})`,
        authorName
      )
    }

    return updatedDoc
  }

  /**
   * Publish document to live coach view
   */
  async publishDocument(
    doc: RanksPolicyDocument,
    authorName = 'Admin'
  ): Promise<RanksPolicyDocument> {
    await delay()
    this.initStorage()

    const sortedRanks = [...doc.ranks].sort((a, b) => a.level - b.level)
    const newVersionNum = (doc.version || 1) + 1
    const now = new Date().toISOString()

    const publishedDoc: RanksPolicyDocument = {
      ...doc,
      ranks: sortedRanks,
      lastEditedBy: authorName,
      lastEditedAt: now,
      publishedAt: now,
      publishedBy: authorName,
      version: newVersionNum,
      isPublished: true,
    }

    // Save to both working doc and published doc
    localStorage.setItem(STORAGE_KEYS.CURRENT_DOC, JSON.stringify(publishedDoc))
    localStorage.setItem(STORAGE_KEYS.PUBLISHED_DOC, JSON.stringify(publishedDoc))

    // Record published version snapshot
    await this.createVersionSnapshot(
      publishedDoc,
      `Published v${newVersionNum}.0`,
      authorName
    )

    return publishedDoc
  }

  /**
   * Create a version snapshot
   */
  private async createVersionSnapshot(
    doc: RanksPolicyDocument,
    label: string,
    authorName: string
  ): Promise<RankVersion> {
    const versions = await this.getVersionHistory()
    const newVersion: RankVersion = {
      id: `ver-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      versionNumber: doc.version,
      label,
      timestamp: new Date().toISOString(),
      editedBy: authorName,
      document: JSON.parse(JSON.stringify(doc)),
    }

    // Keep up to 25 latest versions
    const updatedVersions = [newVersion, ...versions].slice(0, 25)
    localStorage.setItem(
      STORAGE_KEYS.VERSIONS,
      JSON.stringify(updatedVersions)
    )
    return newVersion
  }

  /**
   * Get version history
   */
  async getVersionHistory(): Promise<RankVersion[]> {
    this.initStorage()
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.VERSIONS)
      if (raw) {
        const parsed = JSON.parse(raw) as RankVersion[]
        return parsed.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
      }
    } catch (e) {
      console.error('Failed to get versions:', e)
    }
    return []
  }

  /**
   * Restore a historical version
   */
  async restoreVersion(
    versionId: string,
    authorName = 'Admin'
  ): Promise<RanksPolicyDocument> {
    await delay()
    const versions = await this.getVersionHistory()
    const target = versions.find((v) => v.id === versionId)
    if (!target) {
      throw new Error(`Version ID ${versionId} not found`)
    }

    const restoredDoc: RanksPolicyDocument = {
      ...JSON.parse(JSON.stringify(target.document)),
      lastEditedBy: authorName,
      lastEditedAt: new Date().toISOString(),
      isPublished: false,
    }

    localStorage.setItem(STORAGE_KEYS.CURRENT_DOC, JSON.stringify(restoredDoc))

    // Record restore event in version history
    await this.createVersionSnapshot(
      restoredDoc,
      `Restored from "${target.label}"`,
      authorName
    )

    return restoredDoc
  }

  /**
   * Get Coach advancement progress
   */
  async getCoachProgress(_coachId?: string): Promise<CoachProgress> {
    await delay()
    this.initStorage()
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.COACH_PROGRESS)
      if (raw) {
        return JSON.parse(raw) as CoachProgress
      }
    } catch (e) {
      console.error('Failed to load coach progress:', e)
    }
    return INITIAL_COACH_PROGRESS
  }

  /**
   * Update Coach advancement progress
   */
  async updateCoachProgress(progress: CoachProgress): Promise<CoachProgress> {
    await delay()
    this.initStorage()
    localStorage.setItem(
      STORAGE_KEYS.COACH_PROGRESS,
      JSON.stringify(progress)
    )
    return progress
  }

  /**
   * Validation rule generator:
   * Client documents contain intentional gaps, ambiguous rules, and duplicate text.
   * This returns WARNING notices only and MUST NEVER block saving or publishing.
   */
  validateRanksDocument(doc: RanksPolicyDocument): ValidationNotice[] {
    const notices: ValidationNotice[] = []

    if (!doc.ranks || doc.ranks.length !== 9) {
      notices.push({
        message: `Expected all 9 ranks to be configured; found ${doc.ranks?.length || 0} ranks.`,
        type: 'warning',
      })
    }

    // Sort to inspect sequence
    const sorted = [...(doc.ranks || [])].sort((a, b) => a.level - b.level)

    sorted.forEach((rank, idx) => {
      // Range consistency check (Min > Max)
      if (
        rank.monthlyCommissionMin !== null &&
        rank.monthlyCommissionMax !== null &&
        rank.monthlyCommissionMin > rank.monthlyCommissionMax
      ) {
        notices.push({
          rankLevel: rank.level,
          message: `Rank ${rank.level} (${rank.name}): Monthly commission minimum ($${rank.monthlyCommissionMin.toLocaleString()}) exceeds maximum ($${rank.monthlyCommissionMax.toLocaleString()}).`,
          type: 'warning',
        })
      }

      if (
        rank.yearlyIncomeMin !== null &&
        rank.yearlyIncomeMax !== null &&
        rank.yearlyIncomeMin > rank.yearlyIncomeMax
      ) {
        notices.push({
          rankLevel: rank.level,
          message: `Rank ${rank.level} (${rank.name}): Yearly income minimum ($${rank.yearlyIncomeMin.toLocaleString()}) exceeds maximum ($${rank.yearlyIncomeMax.toLocaleString()}).`,
          type: 'warning',
        })
      }

      // Check gaps between adjacent ranks
      if (idx > 0) {
        const prev = sorted[idx - 1]
        if (
          prev.monthlyCommissionMax !== null &&
          rank.monthlyCommissionMin !== null &&
          rank.monthlyCommissionMin > prev.monthlyCommissionMax + 1
        ) {
          const gap = rank.monthlyCommissionMin - prev.monthlyCommissionMax
          notices.push({
            rankLevel: rank.level,
            message: `Gap of $${gap.toLocaleString()} between Rank ${prev.level} max ($${prev.monthlyCommissionMax.toLocaleString()}) and Rank ${rank.level} min ($${rank.monthlyCommissionMin.toLocaleString()}). [CLIENT TO CONFIRM: Gap is present in client document].`,
            type: 'info',
          })
        }
      }

      // Check specific client document gaps
      if (rank.level === 3) {
        notices.push({
          rankLevel: 3,
          message: `Rank 3: Client document mentions promotion to "Area Manager", but Level 4 is titled "District Leader". [CLIENT TO CONFIRM].`,
          type: 'info',
        })
      }

      if (rank.level === 7 || rank.level === 8 || rank.level === 9) {
        notices.push({
          rankLevel: rank.level,
          message: `Rank ${rank.level} (${rank.name}): Identical team production requirements (10 RL, 8 AM, 20 SE) listed across Levels 7, 8, and 9 in client doc. [CLIENT TO CONFIRM].`,
          type: 'info',
        })
      }

      if (rank.level === 9) {
        notices.push({
          rankLevel: 9,
          message: `Rank 9: Document contains typo "$$37,650.00 - 58,35000"; interpreted as $37,650 - $58,350 PMC. [CLIENT TO CONFIRM].`,
          type: 'info',
        })
      }
    })

    return notices
  }
}

export const rankService = new RankService()
