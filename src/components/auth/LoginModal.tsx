import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { FormField } from '@/components/ui/FormField'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'
import { brandConfig } from '@/config/brand'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid business email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'm.vance@apexlogistics.io',
      password: 'ApexSecurePassword2026!',
    },
  })

  const onSubmit = (data: LoginFormValues) => {
    setIsSubmitting(true)
    setTimeout(() => {
      login({ email: data.email })
      setIsSubmitting(false)
      onClose()
      toast({
        title: 'Logged in successfully',
        description: `Welcome back to ${brandConfig.portalName}`,
        type: 'success',
      })
      navigate('/portal/dashboard')
    }, 600)
  }

  const handleInstantDemoLogin = () => {
    login()
    onClose()
    toast({
      title: 'Demo Session Activated',
      description: 'Logged in as Marcus Vance (CEO, Apex Freight & Logistics LLC)',
      type: 'info',
    })
    navigate('/portal/dashboard')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span>Sign In to {brandConfig.portalName}</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold">
            256-Bit Encrypted
          </span>
        </div>
      }
      description="Access your capital facilities, cash flow forecasts, and fractional CFO advisory sessions."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Demo Fast Track Banner */}
        <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-[#12294A] border border-blue-200 dark:border-blue-900/60 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="text-slate-700 dark:text-slate-300">
              Reviewing the demo? Use instant 1-click access.
            </span>
          </div>
          <Button
            type="button"
            size="sm"
            variant="primary"
            onClick={handleInstantDemoLogin}
            className="shrink-0 text-xs py-1 h-7"
          >
            Instant Portal Access
          </Button>
        </div>

        <FormField label="Business Email" error={errors.email?.message} required id="login-email">
          <Input
            id="login-email"
            placeholder="name@company.com"
            leftIcon={<Mail className="w-4 h-4" />}
            {...register('email')}
          />
        </FormField>

        <FormField label="Password" error={errors.password?.message} required id="login-password">
          <PasswordInput
            id="login-password"
            placeholder="••••••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
            {...register('password')}
          />
        </FormField>

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-blue-600" />
            <span>Remember this device</span>
          </label>
          <a
            href="#forgot"
            onClick={(e) => {
              e.preventDefault()
              toast({ title: 'Password Reset', description: 'Reset link dispatched to email.', type: 'info' })
            }}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Forgot password?
          </a>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full"
          >
            Authenticate & Open Portal
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>SOC2 Type II Certified • Bank-grade encrypted credentials</span>
          </div>
        </div>
      </form>
    </Modal>
  )
}
