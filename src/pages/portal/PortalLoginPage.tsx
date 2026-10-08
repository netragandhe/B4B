import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, Building2, Users } from 'lucide-react'
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
  const [portalMode, setPortalMode] = useState<'client' | 'partner'>('client')

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

  const handleSwitchMode = (mode: 'client' | 'partner') => {
    setPortalMode(mode)
    if (mode === 'partner') {
      setValue('email', 'alex@vanceadvisory.com')
    } else {
      setValue('email', 'm.vance@apexlogistics.io')
    }
  }

  const onSubmit = (data: LoginFormValues) => {
    setIsSubmitting(true)
    setTimeout(() => {
      login({ email: data.email })
      setIsSubmitting(false)
      toast({
        title: 'Authentication Successful',
        description: portalMode === 'partner' ? 'Welcome to OAL Partner Hub' : `Welcome to ${brandConfig.portalName}`,
        type: 'success',
      })
      if (portalMode === 'partner') {
        navigate('/portal/affiliate/dashboard')
      } else {
        navigate('/portal/dashboard')
      }
    }, 600)
  }

  const handleInstantClientLogin = () => {
    login()
    toast({
      title: 'Demo Session Initialized',
      description: 'Logged in as Marcus Vance (CEO, Apex Freight & Logistics LLC)',
      type: 'info',
    })
    navigate('/portal/dashboard')
  }

  const handleInstantPartnerLogin = () => {
    login({ email: 'alex@vanceadvisory.com' })
    toast({
      title: 'Partner Session Initialized',
      description: 'Logged in as Alex Vance (Platinum Partner, Vance Advisory Group)',
      type: 'success',
    })
    navigate('/portal/affiliate/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-[#0A1628] text-slate-900 dark:text-slate-100">
      <SEOHead title="Portal Terminal Login" description="Sign in to your OAL Network client terminal or partner hub." />

      <div className="w-full max-w-md space-y-6 text-left">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <BrandLogo size="lg" className="justify-center" />
          </Link>
          <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white mt-2">
            Terminal Sign In
          </h2>
          <p className="text-xs text-slate-500">
            Secure multi-tenant gateway for business clients and certified partners.
          </p>
        </div>

        {/* Portal Mode Tabs */}
        <div className="flex p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-xs font-semibold">
          <button
            onClick={() => handleSwitchMode('client')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
              portalMode === 'client'
                ? 'bg-white dark:bg-[#0D1E36] text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Client Terminal</span>
          </button>
          <button
            onClick={() => handleSwitchMode('partner')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
              portalMode === 'partner'
                ? 'bg-white dark:bg-[#0D1E36] text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Partner Hub</span>
          </button>
        </div>

        <Card variant="bento" className="p-6 sm:p-8 border-slate-200 dark:border-[#1E3A5F] shadow-xl space-y-5">
          {/* Quick Demo Fast-Track Card */}
          <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-[#12294A] border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                1-Click Instant Demo Exploration:
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleInstantClientLogin}
                className="text-xs py-1 h-7 font-bold text-blue-600 dark:text-blue-400"
              >
                Client Portal
              </Button>
              <Button
                type="button"
                size="sm"
                variant="accent"
                onClick={handleInstantPartnerLogin}
                className="text-xs py-1 h-7 font-bold"
              >
                Partner Hub
              </Button>
            </div>
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
              <a
                href="#reset"
                onClick={(e) => {
                  e.preventDefault()
                  toast({ title: 'Password Reset', description: 'Reset instructions dispatched.', type: 'info' })
                }}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <div className="pt-2 space-y-2">
              <Button
                type="submit"
                variant={portalMode === 'partner' ? 'accent' : 'primary'}
                size="lg"
                isLoading={isSubmitting}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full font-bold shadow-md shadow-blue-500/20"
              >
                {portalMode === 'partner' ? 'Sign In to Partner Hub' : 'Authenticate & Open Terminal'}
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
