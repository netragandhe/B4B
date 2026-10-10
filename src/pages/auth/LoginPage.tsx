import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  Globe,
  Sparkles,
  Shield,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  RefreshCw,
  ShieldCheck,
  Megaphone,
  Building2,
  Share2,
  Briefcase,
  UserCheck,
  Users,
} from 'lucide-react'
import { BrandLogo } from '@/config/brand'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { FormField } from '@/components/ui/FormField'
import { SEOHead } from '@/components/seo/SEOHead'
import { useAuth, UserRole } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

import { getRoleLabel } from '@/config/roles'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, loginAsDemoRole, verifyOtp } = useAuth()
  const { toast } = useToast()

  const [showPassword, setShowPassword] = useState(false)
  const [isShakeError, setIsShakeError] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  // 2-Step OTP State
  const [step, setStep] = useState<'login' | 'otp' | 'pending'>('login')
  const [pendingEmail, setPendingEmail] = useState('')
  const [otpValue, setOtpValue] = useState(['', '', '', '', '', ''])
  const [resendTimer, setResendTimer] = useState(30)
  const [isResendDisabled, setIsResendDisabled] = useState(true)

  const sessionExpired = searchParams.get('sessionExpired') === 'true'
  const redirectUrl = searchParams.get('redirect')

  useEffect(() => {
    if (sessionExpired) {
      toast({
        title: 'Session Expired',
        description: 'You have been logged out due to 15 minutes of inactivity. Please log in again.',
        type: 'warning',
      })
    }
  }, [sessionExpired, toast])

  // OTP Countdown timer
  useEffect(() => {
    let timer: any
    if (step === 'otp' && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1)
      }, 1000)
    } else if (resendTimer === 0) {
      setIsResendDisabled(false)
    }
    return () => clearInterval(timer)
  }, [step, resendTimer])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'client@demo.com',
      password: 'Demo@1234',
      rememberMe: true,
    },
  })

  const handleDemoQuickLogin = async (role: UserRole) => {
    setFormError(null)
    const email = `${role.toLowerCase().replace(/\s+/g, '')}@demo.com`
    setValue('email', email)
    setValue('password', 'Demo@1234')

    try {
      const res = await loginAsDemoRole(role)
      if (res.success) {
        toast({
          title: `Welcome back!`,
          description: `Logged in as ${getRoleLabel(role)} (${res.user?.name}).`,
          type: 'success',
        })
        const targetPath = getRolePath(role)
        navigate(targetPath, { replace: true })
      }
    } catch {
      toast({ title: 'Quick Login Error', type: 'error' })
    }
  }

  const getRolePath = (role: UserRole) => {
    switch (role) {
      case 'Admin':
        return '/portal/admin/dashboard'
      case 'Biz Pro':
        return '/portal/bizpro/bulletin'
      case 'Client':
        return '/portal/client/dashboard'
      case 'Affiliate':
        return '/portal/affiliate/dashboard'
      case 'Employer':
        return '/portal/employer/dashboard'
      case 'Job Seeker':
        return '/portal/seeker/applications'
      default:
        return '/portal/dashboard'
    }
  }

  const resolveSafeTargetPath = (role: UserRole, rawRedirect: string | null) => {
    if (!rawRedirect) return getRolePath(role)
    const decoded = decodeURIComponent(rawRedirect)
    if (decoded.startsWith('/portal/admin') && role !== 'Admin') {
      return getRolePath(role)
    }
    if (decoded.startsWith('/portal/bizpro') && role !== 'Biz Pro' && role !== 'Admin') {
      return getRolePath(role)
    }
    if (decoded.startsWith('/portal/employer') && role !== 'Employer' && role !== 'Admin') {
      return getRolePath(role)
    }
    if (decoded.startsWith('/portal/seeker') && role !== 'Job Seeker' && role !== 'Admin') {
      return getRolePath(role)
    }
    return decoded
  }

  const onSubmit = async (data: LoginFormData) => {
    setFormError(null)
    setIsShakeError(false)

    const res = await login(data.email, data.password, !!data.rememberMe)

    if (res.isPending) {
      setStep('pending')
      return
    }

    if (!res.success) {
      setIsShakeError(true)
      setFormError(res.error || 'Login failed. Please check credentials.')
      toast({ title: 'Authentication Failed', description: res.error, type: 'error' })
      return
    }

    if (res.requiresOtp && res.user) {
      setPendingEmail(data.email)
      setStep('otp')
      toast({ title: '2-Step Verification', description: 'Demo OTP is 123456', type: 'info' })
      return
    }

    if (res.user) {
      toast({
        title: `Welcome, ${res.user.name}!`,
        description: `Successfully signed in to ${res.user.role} portal.`,
        type: 'success',
      })
      const targetPath = resolveSafeTargetPath(res.user.role, redirectUrl)
      navigate(targetPath)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fullCode = otpValue.join('')
    if (fullCode.length < 6) {
      setFormError('Please enter all 6 digits of your verification code.')
      return
    }

    const res = await verifyOtp(pendingEmail, fullCode)
    if (res.success && res.user) {
      toast({
        title: '2-Factor Authentication Verified',
        description: `Access granted as ${res.user.role}.`,
        type: 'success',
      })
      const targetPath = resolveSafeTargetPath(res.user.role, redirectUrl)
      navigate(targetPath)
    } else {
      setFormError(res.error || 'Invalid OTP code.')
      toast({ title: 'Verification Failed', description: 'Demo OTP is 123456', type: 'error' })
    }
  }

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const newOtp = [...otpValue]
    newOtp[index] = val.slice(-1)
    setOtpValue(newOtp)

    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpValue[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 text-slate-900">
      <SEOHead title="Portal Sign In | B4B Executive Platform" description="Sign in to your B4B client, B4B Coach, or corporate portal account." />

      {/* LEFT SIDE PANEL: CLEAN, NATURAL CORPORATE BUSINESS VISUAL */}
      <div className="hidden lg:flex flex-col justify-between p-12 lg:p-14 relative overflow-hidden bg-slate-900 text-white">
        {/* High-Resolution Modern American Business & Financial District Architecture */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85')`,
          }}
        />
        {/* Clean Neutral Dark Glass Gradient Overlay (No heavy blue tint) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-slate-900/40 backdrop-blur-[2px]" />

        {/* 1. TOP HEADER: CLEAN LOGO BADGE */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md shadow-lg hover:bg-white transition-all duration-200"
          >
            <BrandLogo size="md" />
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-white/20 text-slate-200 text-xs font-semibold backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Official Portal</span>
          </div>
        </div>

        {/* 2. CENTER: CLEAN & SPACIOUS BRAND CONTENT */}
        <div className="relative z-10 max-w-lg space-y-6 my-auto">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-amber-300 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Capital • Treasury • Growth</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight leading-snug text-white drop-shadow-md">
              Empowering Main Street Businesses Across America
            </h2>

            <p className="text-sm text-slate-200 leading-relaxed font-normal drop-shadow-sm">
              Institutional capital facilities, revenue-based financing, 13-week CFO treasury modeling, and nationwide B2B executive sales networks.
            </p>
          </div>

          {/* Minimal Key Highlights Row */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/15">
              <div className="text-base font-black text-white">$14.8M+</div>
              <div className="text-[11px] text-slate-300">Funded Facilities</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/15">
              <div className="text-base font-black text-white">12 Districts</div>
              <div className="text-[11px] text-slate-300">Federal Reserve</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/15">
              <div className="text-base font-black text-emerald-400">100% US</div>
              <div className="text-[11px] text-slate-300">Coverage</div>
            </div>
          </div>
        </div>

        {/* 3. FOOTER */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-300 border-t border-white/15 pt-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>256-bit TLS Encrypted • SOC2 Certified</span>
          </div>
          <span>© {new Date().getFullYear()} B4B America</span>
        </div>
      </div>

      {/* RIGHT SIDE PANEL: AUTH FORM & QUICK DEMO LOGIN (LIGHT CLEAN BACKGROUND) */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-10 space-y-6 bg-white text-slate-900">
        <div className="w-full max-w-lg mx-auto space-y-6 text-left">

          {/* Top Header Row with Back to Website Button & Mobile Logo */}
          <div className="flex items-center justify-between gap-4 pb-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-extrabold transition-all border border-slate-200 shadow-xs group"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Website</span>
            </Link>

            {/* Mobile Logo */}
            <div className="lg:hidden">
              <Link to="/">
                <BrandLogo size="md" />
              </Link>
            </div>
          </div>

          {/* STEP: LOGIN */}
          {step === 'login' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`space-y-6 ${isShakeError ? 'animate-shake' : ''}`}
            >
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
                  Sign in to Portal
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Enter your credentials or click any demo role below for 1-click access.
                </p>
              </div>

              {/* DEMO QUICK LOGIN BUTTONS GRID - FULL ROLES FULLY VISIBLE */}
              <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Demo Quick Role Login:
                  </span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full border border-blue-200">
                    1-Click Instant Preview
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { role: 'Admin' as UserRole, label: 'Super Admin', desc: 'Full System Overview', icon: ShieldCheck, color: 'text-purple-600 bg-purple-50 border-purple-200' },
                    { role: 'Biz Pro' as UserRole, label: 'B4B Coach', desc: 'CRM & Scoreboard', icon: Megaphone, color: 'text-blue-600 bg-blue-50 border-blue-200' },
                    { role: 'Client' as UserRole, label: 'SME Client', desc: 'Capital & eBOX', icon: Building2, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
                    { role: 'Affiliate' as UserRole, label: 'Affiliate Partner', desc: 'Referral Pipeline', icon: Share2, color: 'text-amber-600 bg-amber-50 border-amber-200' },
                    { role: 'Employer' as UserRole, label: 'Employer Portal', desc: 'Job Postings & Hiring', icon: Briefcase, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
                    { role: 'Job Seeker' as UserRole, label: 'Job Seeker', desc: 'Applications & Resume', icon: UserCheck, color: 'text-teal-600 bg-teal-50 border-teal-200' },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.role}
                        type="button"
                        onClick={() => handleDemoQuickLogin(item.role)}
                        className="p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-400 text-left transition-all duration-150 shadow-xs hover:shadow-md flex flex-col justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`p-1.5 rounded-lg border ${item.color} group-hover:scale-110 transition-transform shrink-0`}>
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-xs font-extrabold text-slate-900 group-hover:text-blue-700 leading-tight">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 group-hover:text-slate-700 font-medium mt-1.5 pl-0.5">
                          {item.desc}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Error Alert Box */}
              {formError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormField label="Email Address" required error={errors.email?.message}>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <Input
                      type="email"
                      placeholder="name@company.com"
                      className="pl-9 text-xs border-slate-300 focus:border-[#0A3D9C]"
                      {...register('email')}
                    />
                  </div>
                </FormField>

                <FormField label="Password" required error={errors.password?.message}>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-9 pr-10 text-xs border-slate-300 focus:border-[#0A3D9C]"
                      {...register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </FormField>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-slate-600 cursor-pointer font-medium">
                    <input
                      type="checkbox"
                      {...register('rememberMe')}
                      className="w-4 h-4 accent-[#0A3D9C] rounded"
                    />
                    <span>Remember me</span>
                  </label>

                  <Link to="/portal/forgot-password" className="text-[#0A3D9C] hover:underline font-bold">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  pill
                  isLoading={isSubmitting}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full font-bold bg-[#0A3D9C] hover:bg-[#072B6E] text-white shadow-lg mt-2"
                >
                  Sign In to Dashboard
                </Button>
              </form>

              <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-100">
                Don't have an account yet?{' '}
                <Link to="/portal/signup" className="text-[#0A3D9C] font-bold hover:underline">
                  Create New Account
                </Link>
              </div>
            </motion.div>
          )}

          {/* STEP: OTP 2-FACTOR SCREEN */}
          {step === 'otp' && (
            <motion.form
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onSubmit={handleOtpSubmit}
              className="space-y-6"
            >
              <div className="p-3 rounded-full bg-blue-50 text-blue-600 w-fit">
                <KeyRound className="w-6 h-6" />
              </div>

              <div>
                <Badge variant="emerald" size="sm" className="mb-2">
                  2-Factor Authentication
                </Badge>
                <h2 className="text-2xl font-bold text-slate-900 font-heading">Enter Verification Code</h2>
                <p className="text-xs text-slate-500 mt-1">
                  We sent a 6-digit code to <strong className="text-slate-900">{pendingEmail}</strong>. (Demo Code: <span className="font-mono text-emerald-600 font-bold">123456</span>)
                </p>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {formError}
                </div>
              )}

              {/* 6 Digit OTP Inputs */}
              <div className="flex items-center justify-between gap-2">
                {otpValue.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-12 h-14 rounded-xl bg-slate-50 border border-slate-300 focus:border-[#0A3D9C] text-center font-mono font-bold text-xl text-slate-900 focus:outline-none"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <button
                  type="button"
                  disabled={isResendDisabled}
                  onClick={() => {
                    setResendTimer(30)
                    setIsResendDisabled(true)
                    toast({ title: 'Verification Code Resent', description: 'Demo code: 123456', type: 'info' })
                  }}
                  className={`flex items-center gap-1 font-semibold ${
                    isResendDisabled ? 'text-slate-400 cursor-not-allowed' : 'text-[#0A3D9C] hover:underline'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Resend Code {resendTimer > 0 ? `(${resendTimer}s)` : ''}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('login')}
                  className="text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>

              <Button
                type="submit"
                variant="accent"
                size="md"
                pill
                className="w-full font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Verify & Continue
              </Button>
            </motion.form>
          )}

          {/* STEP: PENDING APPROVAL SCREEN */}
          {step === 'pending' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 text-center"
            >
              <div className="p-4 rounded-full bg-amber-50 text-amber-600 w-fit mx-auto">
                <Shield className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <Badge variant="amber" size="md">
                  Application Pending Approval
                </Badge>
                <h2 className="text-2xl font-bold text-slate-900 font-heading">Account Under Executive Review</h2>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Thank you for applying. Your corporate membership application is currently being evaluated by our underwriting risk compliance team.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep('login')}
                className="font-bold text-xs"
              >
                Back to Sign In
              </Button>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  )
}
