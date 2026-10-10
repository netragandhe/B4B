/**
 * B4B AMERICA — JOB FINDER SERVICE LAYER
 * 
 * Sourced directly from official client requirements:
 * - Public job posting with status: 'pending' awaiting Admin moderation.
 * - Search by Keyword, Category, State, City, Salary, Job Type.
 * - Admin moderation: Approve, Reject with reason, Remove.
 * - Asynchronous methods with localStorage persistence and mock latency.
 */

import { Job, JobFilters, INITIAL_DEMO_JOBS } from '@/mock-data/jobs'

const STORAGE_KEY = 'b4b_jobs_store'

// Helper for simulated async network delay
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms))

export type CreateJobInput = {
  title: string
  company: string
  category: string
  state: string
  city: string
  salary: string
  salaryMin?: number
  salaryMax?: number
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Gig' | 'Commission' | 'Internship'
  description: string
  requirements?: string[]
  contactEmail: string
}

class JobService {
  private getStore(): Job[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (!data) {
        // Initialize with verified demo jobs
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_JOBS))
        return [...INITIAL_DEMO_JOBS]
      }
      return JSON.parse(data)
    } catch (err) {
      console.error('Failed to read job store from localStorage:', err)
      return [...INITIAL_DEMO_JOBS]
    }
  }

  private saveStore(jobs: Job[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
    } catch (err) {
      console.error('Failed to save job store to localStorage:', err)
    }
  }

  /**
   * Public Search: Only returns APPROVED jobs
   */
  async getJobs(filters: JobFilters = {}): Promise<{
    jobs: Job[]
    total: number
    page: number
    totalPages: number
  }> {
    await delay(180)
    const allJobs = this.getStore()

    // Public search only surfaces approved jobs
    let results = allJobs.filter((j) => j.status === 'approved')

    // 1. Keyword search (title, company, description, category)
    if (filters.keyword && filters.keyword.trim()) {
      const kw = filters.keyword.trim().toLowerCase()
      results = results.filter(
        (j) =>
          j.title.toLowerCase().includes(kw) ||
          j.company.toLowerCase().includes(kw) ||
          j.description.toLowerCase().includes(kw) ||
          j.category.toLowerCase().includes(kw)
      )
    }

    // 2. Category filter
    if (filters.category && filters.category.trim() && filters.category !== 'All') {
      const cat = filters.category.trim().toLowerCase()
      results = results.filter((j) => j.category.toLowerCase().includes(cat))
    }

    // 3. State filter
    if (filters.state && filters.state.trim() && filters.state !== 'All') {
      const st = filters.state.trim().toUpperCase()
      results = results.filter((j) => j.state.toUpperCase() === st)
    }

    // 4. City filter
    if (filters.city && filters.city.trim() && filters.city !== 'All') {
      const ct = filters.city.trim().toLowerCase()
      results = results.filter((j) => j.city.toLowerCase().includes(ct))
    }

    // 5. Min Salary filter
    if (filters.minSalary && filters.minSalary > 0) {
      results = results.filter((j) => j.salaryMax >= filters.minSalary!)
    }

    // 6. Max Salary filter
    if (filters.maxSalary && filters.maxSalary > 0) {
      results = results.filter((j) => j.salaryMin <= filters.maxSalary!)
    }

    // 7. Job Types filter
    if (filters.jobTypes && filters.jobTypes.length > 0) {
      results = results.filter((j) => filters.jobTypes!.includes(j.jobType))
    }

    // 8. Sorting
    if (filters.sortBy === 'salary_high') {
      results.sort((a, b) => b.salaryMax - a.salaryMax)
    } else if (filters.sortBy === 'salary_low') {
      results.sort((a, b) => a.salaryMin - b.salaryMin)
    } else {
      // Default: newest first
      results.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    }

    const total = results.length
    const page = filters.page && filters.page > 0 ? filters.page : 1
    const limit = filters.limit && filters.limit > 0 ? filters.limit : 9
    const totalPages = Math.ceil(total / limit) || 1

    const startIndex = (page - 1) * limit
    const paginated = results.slice(startIndex, startIndex + limit)

    return {
      jobs: paginated,
      total,
      page,
      totalPages,
    }
  }

  /**
   * Get single job by ID
   */
  async getJobById(id: string): Promise<Job | null> {
    await delay(120)
    const allJobs = this.getStore()
    const job = allJobs.find((j) => j.id === id)
    return job || null
  }

  /**
   * Public Post a Job: Created with status = 'pending' awaiting Admin moderation
   */
  async postJob(input: CreateJobInput): Promise<Job> {
    await delay(250)
    const allJobs = this.getStore()

    // Simple numeric estimate if min/max not provided
    let sMin = input.salaryMin || 60000
    let sMax = input.salaryMax || 95000
    if (!input.salaryMin && input.salary) {
      const match = input.salary.match(/\$?(\d+)[kK]?/g)
      if (match && match.length > 0) {
        const nums = match.map((m) => {
          const clean = m.replace(/[\$,]/g, '')
          return clean.toLowerCase().endsWith('k')
            ? parseInt(clean) * 1000
            : parseInt(clean)
        })
        sMin = Math.min(...nums)
        sMax = Math.max(...nums)
      }
    }

    const newJob: Job = {
      id: `job-user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: input.title.trim(),
      company: input.company.trim(),
      category: input.category.trim(),
      state: input.state.trim().toUpperCase(),
      city: input.city.trim(),
      salary: input.salary.trim(),
      salaryMin: sMin,
      salaryMax: sMax,
      jobType: input.jobType,
      description: input.description.trim(),
      requirements: input.requirements || [],
      contactEmail: input.contactEmail.trim().toLowerCase(),
      status: 'pending', // Awaiting Admin Moderation
      isDemo: false,
      createdAt: new Date().toISOString(),
    }

    // Insert at front of jobs list
    allJobs.unshift(newJob)
    this.saveStore(allJobs)
    return newJob
  }

  /**
   * Admin Operations: Retrieve all jobs (Pending, Approved, Rejected)
   */
  async getAllJobsForAdmin(): Promise<Job[]> {
    await delay(150)
    const allJobs = this.getStore()
    return [...allJobs].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  /**
   * Admin Operation: Approve a job listing
   */
  async approveJob(id: string): Promise<Job> {
    await delay(150)
    const allJobs = this.getStore()
    const index = allJobs.findIndex((j) => j.id === id)
    if (index === -1) {
      throw new Error(`Job not found with ID ${id}`)
    }

    allJobs[index] = {
      ...allJobs[index],
      status: 'approved',
      rejectionReason: undefined,
    }
    this.saveStore(allJobs)
    return allJobs[index]
  }

  /**
   * Admin Operation: Reject a job listing with reason
   */
  async rejectJob(id: string, reason: string): Promise<Job> {
    await delay(150)
    const allJobs = this.getStore()
    const index = allJobs.findIndex((j) => j.id === id)
    if (index === -1) {
      throw new Error(`Job not found with ID ${id}`)
    }

    allJobs[index] = {
      ...allJobs[index],
      status: 'rejected',
      rejectionReason: reason.trim(),
    }
    this.saveStore(allJobs)
    return allJobs[index]
  }

  /**
   * Admin Operation: Remove a job listing
   */
  async removeJob(id: string): Promise<boolean> {
    await delay(150)
    const allJobs = this.getStore()
    const filtered = allJobs.filter((j) => j.id !== id)
    if (filtered.length === allJobs.length) {
      return false
    }
    this.saveStore(filtered)
    return true
  }

  /**
   * Reset store back to initial demo jobs
   */
  async resetToDemoJobs(): Promise<Job[]> {
    await delay(150)
    this.saveStore(INITIAL_DEMO_JOBS)
    return [...INITIAL_DEMO_JOBS]
  }
}

export const jobService = new JobService()
