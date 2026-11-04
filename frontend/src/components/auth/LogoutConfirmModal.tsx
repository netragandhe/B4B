import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, AlertTriangle } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'

export const LogoutConfirmModal: React.FC = () => {
  const { logoutModalOpen, setLogoutModalOpen, logout } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleConfirmLogout = async () => {
    await logout()
    toast({
      title: 'You Have Been Logged Out',
      description: 'Your session has ended. Thank you for using B4B Network.',
      type: 'info',
    })
    navigate('/')
  }

  return (
    <Modal
      isOpen={logoutModalOpen}
      onClose={() => setLogoutModalOpen(false)}
      title="Log Out of Your Account?"
      description="Are you sure you want to end your current session?"
      maxWidth="sm"
    >
      <div className="space-y-4 text-left">
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <span>
            Logging out will require you to sign back in with your email and password to access your corporate portal.
          </span>
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setLogoutModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="accent"
            size="sm"
            pill
            onClick={handleConfirmLogout}
            rightIcon={<LogOut className="w-4 h-4" />}
            className="font-bold bg-rose-600 hover:bg-rose-500 text-white"
          >
            Log Out
          </Button>
        </div>
      </div>
    </Modal>
  )
}
