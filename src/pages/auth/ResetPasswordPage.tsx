import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { FormField } from '@/components/ui/FormField'
import { Card } from '@/components/ui/Card'
import { useToast } from '@/components/ui/Toast'
import { BrandLogo } from '@/config/brand'

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast({ title: 'Passwords mismatch', description: 'Ensure passwords match.', type: 'error' })
      return
    }
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: 'Password Updated',
        description: 'Your new password has been updated securely. Please sign in.',
        type: 'success',
      })
      navigate('/portal/login')
    }, 600)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A1628] text-slate-900 dark:text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <BrandLogo size="lg" />
          </Link>
          <h1 className="text-2xl font-bold font-heading">Set New Password</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Choose a strong, encrypted password for your portal access.
          </p>
        </div>

        <Card variant="bento" className="p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="New Password" required id="reset-password">
              <PasswordInput
                id="reset-password"
                placeholder="At least 8 characters"
                leftIcon={<Lock className="w-4 h-4" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormField>

            <FormField label="Confirm New Password" required id="reset-confirm-password">
              <PasswordInput
                id="reset-confirm-password"
                placeholder="Re-enter new password"
                leftIcon={<Lock className="w-4 h-4" />}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </FormField>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full justify-center"
            >
              Update Password & Sign In
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
