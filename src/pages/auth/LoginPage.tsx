import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Quote,
  Star,
  CheckCircle2,
  ChevronRight,
  UserCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { FormField } from '@/components/ui/FormField'
import { Badge } from '@/components/ui/Badge'
import { useAuth, UserRole, DEMO_PROFILES } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'
import { BrandLogo, brandConfig } from '@/config/brand'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid business email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const LoginPage: React.FC = () => {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [selectedRole, setSelectedRole] = useState<UserRole>('Client')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: DEMO_PROFILES.Client.email,
      password: 'ApexSecurePassword2026!',
      rememberMe: true,
    },
  })

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    const profile = DEMO_PROFILES[role]
    if (profile) {
      setValue('email', profile.email)
    }
  }

  const onSubmit = (data: LoginFormValues) => {
    setIsSubmitting(true)
    setTimeout(() => {
      login({ email: data.email, role: selectedRole })
      setIsSubmitting(false)
      toast({
        title: `Welcome back, ${DEMO_PROFILES[selectedRole].name}!`,
        description: `Logged in as ${selectedRole} (${DEMO_PROFILES[selectedRole].company})`,
        type: 'success',
      })
      navigate('/portal/dashboard')
    }, 600)
  }

  const rolesList: UserRole[] = ['Client', 'Admin', 'Biz Pro', 'Affiliate', 'Employer', 'Job Seeker']

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 dark:bg-[#0A1628] text-slate-900 dark:text-slate-100 font-sans">
      {/* Left Panel: Branded Dark Gradient & Testimonial Showcase */}
      <div className="lg:w-5/12 xl:w-1/2 bg-gradient-to-br from-[#0A1628] via-[#0D1E36] to-[#12294A] text-white p-8 lg:p-12 xl:p-16 flex flex-col justify-between relative overflow-hidden border-r border-[#1E3A5F]">
        {/* Background glow effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10">
          <Link to="/" className="inline-block mb-10">
            <BrandLogo size="lg" className="text-white" />
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Institutional Growth & Capital Operating System</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold font-heading tracking-tight leading-tight text-white mb-4">
            Empowering modern businesses with capital & CFO intelligence.
          </h1>
          <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
            Access non-dilutive credit lines, automated treasury forecasts, and dedicated fractional CFO advisory in one unified workspace.
          </p>
        </div>

        {/* Center Testimonial Card */}
        <div className="relative z-10 my-10 p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl space-y-4">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <Quote className="w-8 h-8 text-blue-400/40" />
          <p className="text-sm sm:text-base italic text-slate-200 leading-relaxed font-serif">
            "B4B unlocked an $850k revolving facility for Apex Freight without equity dilution. Their fractional CFO team helped us expand our fleet by 40% in under 90 days."
          </p>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={DEMO_PROFILES.Client.avatarUrl}
                alt={DEMO_PROFILES.Client.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/80 shadow-md"
              />
              <div>
                <h4 className="text-xs font-bold text-white">{DEMO_PROFILES.Client.name}</h4>
                <p className="text-[11px] text-slate-400">{DEMO_PROFILES.Client.title}, {DEMO_PROFILES.Client.company}</p>
              </div>
            </div>
            <Badge variant="emerald" size="sm" className="hidden sm:inline-flex">
              $850k Line Issued
            </Badge>
          </div>
        </div>

        {/* Footer Security Badges */}
        <div className="relative z-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>SOC2 Type II & 256-Bit SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-200">Privacy</span>
            <span>•</span>
            <span className="hover:text-slate-200">Security</span>
            <span>•</span>
            <span className="hover:text-slate-200">Compliance</span>
          </div>
        </div>
      </div>

      {/* Right Panel: Login Form & Role Switcher */}
      <div className="lg:w-7/12 xl:w-1/2 p-6 sm:p-12 lg:p-16 flex flex-col justify-center max-w-2xl mx-auto w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white">
              Sign In to Your Workspace
            </h2>
            <Link
              to="/portal/signup"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Create Account</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Select a demo role below or enter your credentials to access your dashboard.
          </p>
        </div>

        {/* DEMO ROLE SELECTOR */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/70 dark:from-[#12294A] dark:to-[#0D1E36] border border-blue-200 dark:border-[#1E3A5F] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Demo Role Previewer (Select Role)</span>
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
              Active: {selectedRole}
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
            {rolesList.map((role) => {
              const active = selectedRole === role
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleSelect(role)}
                  className={`px-2 py-2 rounded-xl text-xs font-bold text-center transition-all ${
                    active
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-500/50 scale-[1.02]'
                      : 'bg-white dark:bg-[#0D1E36] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1E3A5F] border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {role}
                </button>
              )
            })}
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1">
            <span>Demo Profile: <strong className="text-slate-800 dark:text-slate-200">{DEMO_PROFILES[selectedRole].name}</strong> ({DEMO_PROFILES[selectedRole].title})</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">{DEMO_PROFILES[selectedRole].company}</span>
          </div>
        </div>

        {/* Main Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Business Email Address" error={errors.email?.message} required id="login-email">
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
              <input
                type="checkbox"
                className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500"
                {...register('rememberMe')}
              />
              <span>Remember this device</span>
            </label>
            <Link
              to="/portal/forgot-password"
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Forgot password?
            </Link>
          </div>

          <div className="pt-2 space-y-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full justify-center shadow-lg shadow-blue-600/20"
            >
              Sign In as {selectedRole}
            </Button>

            {/* Google Sign In Style */}
            <button
              type="button"
              onClick={() => {
                login({ role: selectedRole })
                toast({
                  title: 'Google SSO Authenticated',
                  description: `Signed in as ${DEMO_PROFILES[selectedRole].name}`,
                  type: 'success',
                })
                navigate('/portal/dashboard')
              }}
              className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-[#1E3A5F] bg-white dark:bg-[#0D1E36] text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-[#12294A] transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google Workspace</span>
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
          <span>Don't have a portal account? </span>
          <Link to="/portal/signup" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Apply & Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}
