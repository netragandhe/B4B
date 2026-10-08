import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldCheck, ArrowRight, RotateCw, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { OtpInput } from '@/components/ui/OtpInput'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'
import { BrandLogo, brandConfig } from '@/config/brand'

export const OtpVerificationPage: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [otpValue, setOtpValue] = useState('')
  const [timer, setTimer] = useState(45)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handleVerify = (code: string) => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: 'Two-Factor Authentication Verified',
        description: `Welcome to ${brandConfig.portalName}! Workspace initialized.`,
        type: 'success',
      })
      navigate('/portal/dashboard')
    }, 600)
  }

  const handleResend = () => {
    setTimer(45)
    toast({
      title: 'New Security Code Sent',
      description: 'Check your mobile device or business email inbox.',
      type: 'info',
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A1628] text-slate-900 dark:text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <BrandLogo size="lg" />
          </Link>
          <div className="flex items-center justify-center gap-2 pt-2">
            <Badge variant="emerald" size="sm" dot>
              Two-Factor Authentication
            </Badge>
          </div>
          <h1 className="text-2xl font-bold font-heading">Verify Security Code</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            We sent a 6-digit authentication code to <strong className="text-slate-800 dark:text-slate-200">{user?.email || 'm.vance@apexlogistics.io'}</strong>.
          </p>
        </div>

        <Card variant="bento" className="p-6 sm:p-8 space-y-6 text-center">
          <div className="space-y-4">
            <OtpInput
              length={6}
              value={otpValue}
              onChange={setOtpValue}
              onComplete={handleVerify}
            />

            <p className="text-xs text-slate-500">
              Enter the 6-digit code or paste it directly.
            </p>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              disabled={otpValue.length < 6}
              isLoading={isSubmitting}
              onClick={() => handleVerify(otpValue)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full justify-center"
            >
              Verify & Enter Terminal
            </Button>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between text-xs">
            <span className="text-slate-500">Didn't receive the code?</span>
            {timer > 0 ? (
              <span className="font-semibold text-slate-400">Resend code in {timer}s</span>
            ) : (
              <button
                onClick={handleResend}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Resend OTP</span>
              </button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
