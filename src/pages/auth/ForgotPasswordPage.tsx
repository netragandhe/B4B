import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, ArrowLeft, Send, CheckCircle2, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { FormField } from '@/components/ui/FormField'
import { Card } from '@/components/ui/Card'
import { useToast } from '@/components/ui/Toast'
import { BrandLogo } from '@/config/brand'

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      toast({
        title: 'Password Reset Link Dispatched',
        description: `Check your inbox at ${email} for instructions.`,
        type: 'info',
      })
    }, 600)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A1628] text-slate-900 dark:text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <BrandLogo size="lg" />
          </Link>
          <h1 className="text-2xl font-bold font-heading">Reset Workspace Password</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter your registered business email to receive secure recovery instructions.
          </p>
        </div>

        <Card variant="bento" className="p-6 sm:p-8 space-y-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField label="Registered Business Email" required id="forgot-email">
                <Input
                  id="forgot-email"
                  type="email"
                  placeholder="m.vance@apexlogistics.io"
                  leftIcon={<Mail className="w-4 h-4" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormField>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                rightIcon={<Send className="w-4 h-4" />}
                className="w-full justify-center"
              >
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4 py-4 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Reset Link Sent!</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                We've dispatched password reset credentials to <strong className="text-slate-800 dark:text-slate-200">{email}</strong>. Please check your spam or inbox folder.
              </p>
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/portal/reset-password')}
                  className="w-full justify-center text-xs"
                >
                  Simulate Opening Email Link (Reset Password)
                </Button>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 dark:border-[#1E3A5F] text-center">
            <Link
              to="/portal/login"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
