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
          description: `Logged in as ${role} (${res.user?.name}).`,
          type: 'success',
        })
        const targetPath = redirectUrl ? decodeURIComponent(redirectUrl) : getRolePath(role)
        navigate(targetPath)
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
        return '/portal/bizpro/dashboard'
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
      const targetPath = redirectUrl ? decodeURIComponent(redirectUrl) : getRolePath(res.user.role)
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
      const targetPath = redirectUrl ? decodeURIComponent(redirectUrl) : getRolePath(res.user.role)
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
      <SEOHead title="Portal Sign In | B4B Executive Platform" description="Sign in to your B4B client, Biz Pro, or corporate portal account." />

      {/* LEFT SIDE PANEL: BRANDED GRADIENT & EXECUTIVE SHOWCASE */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-gradient-to-br from-[#051E4D] via-[#072B6E] to-[#0A3D9C] border-r border-slate-200 text-white">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-[-50px] left-[-50px] w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-50px] right-[-50px] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* PROMINENT HIGH-VISIBILITY LOGO HEADER */}
        <div className="relative z-10 flex items-center gap-4">
          <Link to="/" className="inline-block group">
            <div className="p-3 bg-white rounded-2xl shadow-2xl border border-amber-400/30 group-hover:scale-105 transition-transform duration-300">
              <img
                src="/brand/logo-full.png"
                alt="B4B America Logo"
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </div>
          </Link>
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-[#FFC800]">
              Capital & Advisory Network
            </div>
            <div className="text-sm font-extrabold text-white">
              B4B America Executive Portal
            </div>
          </div>
        </div>

        {/* CENTER EXECUTIVE FEATURE & TESTIMONIAL CARDS */}
        <div className="relative z-10 max-w-lg space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="gold" size="md" className="shadow-md">
              Verified Executive Gateway
            </Badge>
            <Badge variant="emerald" size="sm" dot>
              System Online
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight leading-tight text-white drop-shadow-sm">
            Empowering Main Street Businesses Across America
          </h2>

          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            Institutional capital, revenue-based financing, 13-week CFO treasury modeling, and B2B executive sales networks.
          </p>

          {/* Floating Glass Testimonial Card */}
          <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-3 shadow-xl">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Sparkles key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-bold text-white ml-2">5.0 Executive Verified</span>
            </div>

            <p className="text-xs text-slate-100 italic leading-relaxed">
              "B4B Network transformed our capital stack. We secured $850k in working capital debt facilities within 10 days."
            </p>

            <div className="pt-2 flex items-center gap-3 border-t border-white/15">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Marcus Vance"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#FFC800] shadow-md"
              />
              <div>
                <div className="text-xs font-extrabold text-white">Marcus Vance</div>
                <div className="text-[11px] text-slate-300">CEO, Apex Freight & Logistics LLC</div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Network Volume</div>
              <div className="text-base font-black text-emerald-400 mt-0.5">$14.8M+ Funded</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Active Sales Reps</div>
              <div className="text-base font-black text-amber-400 mt-0.5">148 Biz Pros</div>
            </div>
          </div>
        </div>

        {/* FOOTER DISCLOSURE */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-300 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>256-bit TLS Encrypted & SOC2 Compliant</span>
          </div>
          <span>© {new Date().getFullYear()} B4B America</span>
        </div>
      </div>

      {/* RIGHT SIDE PANEL: AUTH FORM & QUICK DEMO LOGIN (LIGHT CLEAN BACKGROUND) */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 space-y-8 bg-white text-slate-900">
        <div className="w-full max-w-md mx-auto space-y-6 text-left">

          {/* Top Header Row with Back to Website Button & Mobile Logo */}
          <div className="flex items-center justify-between gap-4 pb-2">
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
                <img src="/brand/logo-full.png" alt="B4B America" className="h-9 w-auto object-contain" />
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
                  Enter your corporate credentials or click a quick demo role below.
                </p>
              </div>

              {/* DEMO QUICK LOGIN BUTTONS ROW */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Demo Quick Role Login:
                  </span>
                  <span className="text-[10px] text-slate-400">1-Click Preview</span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {(['Admin', 'Biz Pro', 'Client', 'Affiliate', 'Employer', 'Job Seeker'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => handleDemoQuickLogin(r)}
                      className="py-2 px-1.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 text-[11px] font-bold text-slate-800 hover:text-[#0A3D9C] transition-all text-center truncate shadow-xs"
                    >
                      {r}
                    </button>
                  ))}
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
