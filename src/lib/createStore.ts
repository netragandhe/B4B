import { useSyncExternalStore } from 'react'
import { storage } from './storage'

export interface Store<T> {
  useStore: () => T
  get: () => T
  set: (updater: T | ((prev: T) => T)) => void
  reset: () => void
}

/**
 * Creates a lightweight reactive store backed by versioned localStorage.
 * Synchronizes across React 19 component renders and cross-tab/window storage events.
 */
export function createStore<T>(key: string, initialData: T): Store<T> {
  // In-memory cached snapshot for fast sync reads
  let currentSnapshot: T = storage.get(key, initialData)
  const listeners = new Set<() => void>()

  function notify() {
    listeners.forEach((listener) => listener())
  }

  function subscribe(onStoreChange: () => void) {
    listeners.add(onStoreChange)

    // Listen to custom window events (same tab)
    const handleCustomEvent = (e: Event) => {
      const custom = e as CustomEvent<{ key: string; value: T }>
      if (custom.detail?.key === key || e.type === 'b4b:store-reset') {
        currentSnapshot = storage.get(key, initialData)
        onStoreChange()
      }
    }

    // Listen to native storage events (other tabs)
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === `b4b_v1_${key}` || e.key === null) {
        currentSnapshot = storage.get(key, initialData)
        onStoreChange()
      }
    }

    window.addEventListener('b4b:store-change', handleCustomEvent)
    window.addEventListener('b4b:store-reset', handleCustomEvent)
    window.addEventListener('storage', handleStorageEvent)

    return () => {
      listeners.delete(onStoreChange)
      window.removeEventListener('b4b:store-change', handleCustomEvent)
      window.removeEventListener('b4b:store-reset', handleCustomEvent)
      window.removeEventListener('storage', handleStorageEvent)
    }
  }

  function getSnapshot(): T {
    return currentSnapshot
  }

  function set(updater: T | ((prev: T) => T)) {
    const nextValue = typeof updater === 'function' ? (updater as (prev: T) => T)(currentSnapshot) : updater
    currentSnapshot = nextValue
    storage.set(key, nextValue)
    notify()
  }

  function reset() {
    currentSnapshot = initialData
    storage.set(key, initialData)
    notify()
  }

  return {
    useStore: () => useSyncExternalStore(subscribe, getSnapshot, getSnapshot),
    get: () => currentSnapshot,
    set,
    reset,
  }
}
