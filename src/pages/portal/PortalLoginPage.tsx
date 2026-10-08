import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, Building2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { FormField } from '@/components/ui/FormField'
import { Badge } from '@/components/ui/Badge'
import { BrandLogo, brandConfig } from '@/config/brand'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'
import { SEOHead } from '@/components/seo/SEOHead'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Valid business email address required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const PortalLoginPage: React.FC = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
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
      toast({
        title: 'Authentication Successful',
        description: `Welcome to ${brandConfig.portalName}`,
        type: 'success',
      })
      navigate('/portal/dashboard')
    }, 600)
  }

  const handleInstantDemoLogin = () => {
    login()
    toast({
      title: 'Demo Session Initialized',
      description: 'Logged in as Marcus Vance (CEO, Apex Freight & Logistics LLC)',
      type: 'info',
    })
    navigate('/portal/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-[#0A1628] text-slate-900 dark:text-slate-100">
      <SEOHead title="Client Terminal Login" description="Sign in to your OAL Network client terminal." />

      <div className="w-full max-w-md space-y-6 text-left">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <BrandLogo size="lg" className="justify-center" />
          </Link>
          <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white mt-2">
            Client Terminal Sign In
          </h2>
          <p className="text-xs text-slate-500">
            Access your pre-approved facilities, cash flow scoreboard, and CFO sessions.
          </p>
        </div>

        <Card variant="bento" className="p-6 sm:p-8 border-slate-200 dark:border-[#1E3A5F] shadow-xl space-y-5">
          {/* Quick Demo Fast-Track Card */}
          <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-[#12294A] border border-blue-200 dark:border-blue-900/60 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Reviewing the portal?
              </span>
            </div>
            <Button
              type="button"
              size="sm"
              variant="primary"
              onClick={handleInstantDemoLogin}
              className="shrink-0 text-xs py-1 h-7 font-bold"
            >
              1-Click Instant Login
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField label="Business Email" required error={errors.email?.message}>
              <Input
                placeholder="name@company.com"
                leftIcon={<Mail className="w-4 h-4" />}
                {...register('email')}
              />
            </FormField>

            <FormField label="Password" required error={errors.password?.message}>
              <PasswordInput
                placeholder="••••••••••••"
                leftIcon={<Lock className="w-4 h-4" />}
                {...register('password')}
              />
            </FormField>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                <span>Remember this terminal</span>
              </label>
              <a href="#reset" onClick={(e) => { e.preventDefault(); toast({ title: 'Password Reset', description: 'Reset instructions dispatched.', type: 'info' }) }} className="text-blue-600 dark:text-blue-400 hover:underline">
                Forgot password?
              </a>
            </div>

            <div className="pt-2 space-y-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full font-bold shadow-md shadow-blue-500/20"
              >
                Authenticate & Open Terminal
              </Button>
            </div>
          </form>

          <div className="pt-2 border-t border-slate-100 dark:border-[#1E3A5F] text-center">
            <Link to="/" className="text-xs text-slate-500 hover:text-blue-600 font-medium">
              ← Return to Public Website
            </Link>
          </div>
        </Card>

        <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>SOC2 Type II Certified • 256-Bit Encrypted Data Tunnel</span>
        </p>
      </div>
    </div>
  )
}
