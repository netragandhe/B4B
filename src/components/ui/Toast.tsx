import React, { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastItem {
  id: string
  title: string
  description?: string
  type: ToastType
  duration?: number
}

interface ToastContextType {
  toasts: ToastItem[]
  toast: (options: Omit<ToastItem, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    ({ title, description, type = 'info', duration = 4000 }: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9)
      const newItem: ToastItem = { id, title, description, type, duration }
      setToasts((prev) => [...prev, newItem])

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id)
        }, duration)
      }
    },
    [removeToast]
  )

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[var(--green-600)] shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-[var(--gold-500)] shrink-0" />,
    info: <Info className="w-5 h-5 text-[var(--blue-600)] shrink-0" />,
  }

  return (
    <ToastContext.Provider value={{ toasts, toast, removeToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl bg-[var(--surface)] text-left transition-all transform animate-slideUp',
              t.type === 'success' && 'border-[var(--green-600)]/40 shadow-[var(--green-600)]/10',
              t.type === 'error' && 'border-red-500/40 shadow-red-500/10',
              t.type === 'warning' && 'border-[var(--gold-500)]/40 shadow-[var(--gold-500)]/10',
              t.type === 'info' && 'border-[var(--blue-600)]/40 shadow-[var(--blue-600)]/10'
            )}
          >
            {icons[t.type]}
            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-bold text-[var(--text)]">{t.title}</h5>
              {t.description && (
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="p-0.5 text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
