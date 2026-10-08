import React from 'react'
import { Clock, ShieldAlert, LogOut, RefreshCw } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

export const IdleTimeoutModal: React.FC = () => {
  const { isIdleWarningOpen, idleSecondsLeft, extendSession, logout } = useAuth()

  return (
    <Modal
      isOpen={isIdleWarningOpen}
      onClose={extendSession}
      title="Session Expiring Due to Inactivity"
      description="You have been idle for 14 minutes."
      maxWidth="sm"
    >
      <div className="space-y-5 text-left">
        <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 text-center border border-slate-700">
          <Clock className="w-8 h-8 text-amber-400 mx-auto animate-bounce" />
          <div>
            <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Session Expires In</div>
            <div className="text-3xl font-black font-mono text-amber-400 mt-1">
              00:{idleSecondsLeft < 10 ? `0${idleSecondsLeft}` : idleSecondsLeft}
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Click <strong>Stay Logged In</strong> to refresh your security token and keep working.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={logout}
            rightIcon={<LogOut className="w-4 h-4" />}
            className="text-slate-600 dark:text-slate-300"
          >
            Log Out Now
          </Button>

          <Button
            type="button"
            variant="accent"
            size="sm"
            pill
            onClick={extendSession}
            className="font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-1.5" /> Stay Logged In
          </Button>
        </div>
      </div>
    </Modal>
  )
}
