/**
 * Typed, versioned localStorage helper with cross-tab and reactive window event dispatching.
 */

const STORAGE_PREFIX = 'b4b_v1_'

export const storage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const raw = localStorage.getItem(`${STORAGE_PREFIX}${key}`)
      if (raw === null) return defaultValue
      return JSON.parse(raw) as T
    } catch (e) {
      console.warn(`[storage] Failed to parse key "${key}":`, e)
      return defaultValue
    }
  },

  set<T>(key: string, value: T): void {
    try {
      const fullKey = `${STORAGE_PREFIX}${key}`
      localStorage.setItem(fullKey, JSON.stringify(value))
      // Notify same-window listeners
      window.dispatchEvent(
        new CustomEvent('b4b:store-change', {
          detail: { key, value },
        })
      )
    } catch (e) {
      console.error(`[storage] Failed to save key "${key}":`, e)
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${key}`)
      window.dispatchEvent(
        new CustomEvent('b4b:store-change', {
          detail: { key, value: null },
        })
      )
    } catch (e) {
      console.error(`[storage] Failed to remove key "${key}":`, e)
    }
  },

  clearAll(): void {
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(k)
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k))
    window.dispatchEvent(new CustomEvent('b4b:store-reset'))
  },
}
