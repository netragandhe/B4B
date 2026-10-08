/**
 * Reusable mock API client with realistic network delay and type-safe envelopes.
 * Ready to be swapped with axios/fetch instances when connecting to real backend services.
 */

export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
  timestamp: string
}

const DEFAULT_DELAY_MS = 250

export async function simulateApiCall<T>(
  resolver: () => T | Promise<T>,
  delayMs: number = DEFAULT_DELAY_MS
): Promise<ApiResponse<T>> {
  await new Promise((resolve) => setTimeout(resolve, delayMs))
  const data = await resolver()
  return {
    data,
    status: 200,
    timestamp: new Date().toISOString(),
  }
}
