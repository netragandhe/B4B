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
  Sparkles,
  Shield,
  AlertCircle,
  KeyRound,
  RefreshCw,
  ShieldCheck,
  Megaphone,
  Building2,
  Share2,
  Briefcase,
  UserCheck,
} from 'lucide-react'
import { BrandLogo } from '@/config/brand'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { FormField } from '@/components/ui/FormField'
import { SEOHead } from '@/components/seo/SEOHead'
import { useAuth, UserRole } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'
import heroBgImg from '@/content/images/hero-widescreen-bg.jpg'
import { getRoleLabel } from '@/config/roles'

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

  const [selectedRole, setSelectedRole] = useState<UserRole>('Client')

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
    setSelectedRole(role)
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
        return '/portal/seeker/dashboard'
      default:
        return '/portal/client/dashboard'
    }
  }

  const resolveSafeTargetPath = (role: UserRole, rawRedirect: string | null) => {
    if (!rawRedirect) return getRolePath(role)
    const decoded = decodeURIComponent(rawRedirect)
    if (decoded === '/portal/dashboard' || decoded === '/portal' || decoded === '/portal/') {
      return getRolePath(role)
    }
    if (role === 'Admin' && decoded.startsWith('/portal/admin')) return decoded
    if (role === 'Biz Pro' && decoded.startsWith('/portal/bizpro')) return decoded
    if (role === 'Client' && decoded.startsWith('/portal/client')) return decoded
    if (role === 'Affiliate' && decoded.startsWith('/portal/affiliate')) return decoded
    if (role === 'Employer' && decoded.startsWith('/portal/employer')) return decoded
    if (role === 'Job Seeker' && decoded.startsWith('/portal/seeker')) return decoded
    return getRolePath(role)
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
      navigate(targetPath, { replace: true })
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
      navigate(targetPath, { replace: true })
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
    <div className="min-h-screen bg-[#07142B] text-white font-['Plus_Jakarta_Sans',sans-serif] flex flex-col items-center justify-center pt-24 sm:pt-28 pb-10 sm:pb-14 px-4 sm:px-6 relative overflow-x-hidden selection:bg-[#FFC911] selection:text-black">
      <SEOHead title="Portal Sign In | B4B Executive Platform" description="Sign in to your B4B client, B4B Coach, or corporate portal account." />

      {/* 1. Background Photo Layer Matching Landing Page Hero Section */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={heroBgImg}
          alt="B4B America Background"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Luminous blue gradient overlay matching Landing Page */}
        <div className="absolute inset-0 bg-[#0A2A5E]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08204D]/90 via-[#0B2C68]/65 to-[#08204D]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07142B]/60 via-transparent to-[#07142B]/95" />
      </div>

      {/* Ambient lighting accents matching Landing Page */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/25 rounded-full blur-3xl pointer-events-none z-[1]" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none z-[1]" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-[#013CA0]/30 rounded-full blur-3xl pointer-events-none z-[1]" />

      {/* Top Header Navigation (Screen Left & Right Corners) */}
      <header className="absolute top-4 sm:top-6 left-0 right-0 z-20 px-4 sm:px-8 flex items-center justify-between pointer-events-none">
        <Link
          to="/"
          className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/15 hover:bg-sky-500/25 text-white text-xs font-semibold backdrop-blur-md transition-all border border-sky-300/30 shadow-sm group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-[#FFC911]" />
          <span>Back to Website</span>
        </Link>

        <div className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-300/30 text-white text-xs font-semibold backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FFC911] animate-pulse" />
          <span className="font-mono text-[#FFC911] text-[11px] font-bold uppercase tracking-wider">Official Portal</span>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. CENTER #f0d23f YELLOW GLASS CARD                                       */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[400px] sm:max-w-[430px] mt-6 sm:mt-8">
        {/* ROUND LOGO BADGE (OVERLAPPING TOP EDGE) */}
        <div className="absolute -top-14 sm:-top-16 left-1/2 -translate-x-1/2 z-20">
          <Link
            to="/"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[4px] bg-[linear-gradient(to_bottom,#f0d23f_50%,#013CA0_50%)] shadow-[0_14px_35px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-200 group block"
            title="B4B America"
          >
            <div className="w-full h-full rounded-full bg-white p-3 flex items-center justify-center shadow-inner">
              <img
                src="/brand/logo-full.png"
                alt="B4B America Logo"
                className="w-full h-full object-contain filter drop-shadow-xs"
              />
            </div>
          </Link>
        </div>

        {/* THE #f0d23f YELLOW GLASS CONTAINER */}
        <div className="relative bg-gradient-to-b from-[#f8e16c]/94 via-[#f0d23f]/90 to-[#e4c632]/86 backdrop-blur-2xl rounded-3xl sm:rounded-[32px] pt-18 sm:pt-20 pb-8 px-6 sm:px-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55),0_0_50px_rgba(240,210,63,0.45),inset_0_1px_2px_rgba(255,255,255,0.9)] border-2 border-white/70 overflow-hidden w-full text-slate-900">
          {/* Subtle internal glass shimmer */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-52 h-52 bg-white/15 rounded-full blur-2xl pointer-events-none" />

          {/* Card Subheader Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#07142B]/15 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#013CA0] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#013CA0]" />
              </span>
              <span className="font-mono text-[11px] font-black uppercase tracking-wider text-[#07142B]">
                Live Executive Portal
              </span>
            </div>
            <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#07142B]/10 text-[#07142B] border border-[#07142B]/20 font-bold">
              256-bit SSL
            </span>
          </div>

          {/* STEP: LOGIN */}
          {step === 'login' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`relative z-10 space-y-4 ${isShakeError ? 'animate-shake' : ''}`}
            >
              {/* Error Alert Box */}
              {formError && (
                <div className="p-3 rounded-xl bg-rose-600/15 border border-rose-700/30 text-xs text-rose-950 font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-800 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                {/* Username / Email Field with iconic dark icon badge */}
                <div>
                  <div className="flex items-stretch rounded-xl overflow-hidden bg-white border border-[#07142B]/15 focus-within:border-[#013CA0] focus-within:ring-2 focus-within:ring-[#013CA0]/30 transition-all shadow-xs">
                    <div className="w-12 bg-[#013CA0] flex items-center justify-center text-white shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      placeholder="Username / Email"
                      className="flex-1 h-12 px-3.5 bg-white text-slate-900 placeholder:text-slate-400 font-medium text-sm focus:outline-none"
                      {...register('email')}
                    />
                  </div>
                  {errors.email?.message && (
                    <p className="text-[11px] font-semibold text-rose-950 mt-1 pl-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field with iconic dark icon badge */}
                <div>
                  <div className="flex items-stretch rounded-xl overflow-hidden bg-white border border-[#07142B]/15 focus-within:border-[#013CA0] focus-within:ring-2 focus-within:ring-[#013CA0]/30 transition-all shadow-xs">
                    <div className="w-12 bg-[#013CA0] flex items-center justify-center text-white shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="flex-1 h-12 px-3.5 bg-white text-slate-900 placeholder:text-slate-400 font-medium text-sm focus:outline-none"
                      {...register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="px-3 bg-white text-slate-400 hover:text-slate-700 cursor-pointer flex items-center justify-center"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password?.message && (
                    <p className="text-[11px] font-semibold text-rose-950 mt-1 pl-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-start text-xs pt-0.5 font-bold text-[#01266B]">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      {...register('rememberMe')}
                      className="w-4 h-4 accent-[#013CA0] rounded cursor-pointer"
                    />
                    <span>Remember me</span>
                  </label>
                </div>

                {/* ROYAL BLUE ACTION BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-[#013CA0] hover:bg-[#024BC7] active:bg-[#002B7A] text-white font-black text-sm uppercase tracking-wider shadow-[0_8px_20px_rgba(1,60,160,0.35)] hover:shadow-[0_10px_25px_rgba(1,60,160,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <>
                      <span>Login to Portal</span>
                      <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Signup and Forgot Password Links */}
              <div className="text-center space-y-1.5 pt-2 text-xs font-semibold text-[#01266B]">
                <p>
                  Don't have an account?{' '}
                  <Link to="/portal/signup" className="underline font-black text-[#01266B] hover:text-black">
                    Sign Up
                  </Link>
                </p>
                <p>
                  <Link to="/portal/forgot-password" className="hover:underline font-medium text-[#01266B]/90 hover:text-black">
                    Forgot your password?
                  </Link>
                </p>
              </div>

              {/* 1-Click Demo Quick Role Access */}
              <div className="pt-3.5 mt-3.5 border-t border-[#07142B]/15">
                <div className="flex items-center justify-between text-xs font-bold text-[#01266B] mb-2">
                  <span className="flex items-center gap-1.5 font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-[#013CA0]" /> 1-Click Demo Preview:
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { role: 'Admin' as UserRole, label: 'Admin' },
                    { role: 'Biz Pro' as UserRole, label: 'B4B Coach' },
                    { role: 'Client' as UserRole, label: 'Client' },
                    { role: 'Affiliate' as UserRole, label: 'Affiliate' },
                    { role: 'Employer' as UserRole, label: 'Employer' },
                    { role: 'Job Seeker' as UserRole, label: 'Job Seeker' },
                  ].map((item) => (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => handleDemoQuickLogin(item.role)}
                      className={`h-9 px-2 rounded-xl text-xs tracking-tight transition-all duration-150 cursor-pointer text-center flex items-center justify-center text-white border ${
                        selectedRole === item.role
                          ? 'bg-[#002261] font-bold border-2 border-white shadow-md ring-2 ring-white/50 scale-[1.02]'
                          : 'bg-[#013CA0] hover:bg-[#024BC7] font-semibold border-white/10 hover:shadow-xs'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP: OTP 2-FACTOR SCREEN */}
          {step === 'otp' && (
            <motion.form
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onSubmit={handleOtpSubmit}
              className="relative z-10 space-y-5"
            >
              <div className="p-3 rounded-2xl bg-white text-[#013CA0] w-fit mx-auto shadow-sm">
                <KeyRound className="w-6 h-6" />
              </div>

              <div className="text-center">
                <Badge variant="primary" size="sm" className="mb-2 bg-[#013CA0] text-white font-black border-0">
                  2-Factor Authentication
                </Badge>
                <h2 className="text-2xl font-black text-slate-900 font-heading">Verification Code</h2>
                <p className="text-xs text-slate-800 mt-1 font-semibold">
                  Sent to <strong>{pendingEmail}</strong>. (Demo: <span className="font-mono font-black text-black">123456</span>)
                </p>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-rose-600/15 border border-rose-700/30 text-xs text-rose-950 font-bold">
                  {formError}
                </div>
              )}

              {/* 6 Digit OTP Inputs */}
              <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                {otpValue.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-10 sm:w-12 h-12 sm:h-14 rounded-xl bg-white border-0 text-center font-mono font-black text-xl text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-[#013CA0]"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-900 font-bold">
                <button
                  type="button"
                  disabled={isResendDisabled}
                  onClick={() => {
                    setResendTimer(30)
                    setIsResendDisabled(true)
                    toast({ title: 'Verification Code Resent', description: 'Demo code: 123456', type: 'info' })
                  }}
                  className={`flex items-center gap-1 ${
                    isResendDisabled ? 'text-black/40 cursor-not-allowed' : 'hover:underline text-black'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Resend {resendTimer > 0 ? `(${resendTimer}s)` : ''}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('login')}
                  className="hover:underline text-slate-900"
                >
                  Cancel
                </button>
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#013CA0] hover:bg-[#024BC7] text-white font-black text-sm uppercase tracking-wider shadow-lg transition-all cursor-pointer"
              >
                Verify & Continue
              </button>
            </motion.form>
          )}

          {/* STEP: PENDING APPROVAL SCREEN */}
          {step === 'pending' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 space-y-5 text-center py-2"
            >
              <div className="p-3.5 rounded-2xl bg-white text-amber-600 w-fit mx-auto shadow-sm">
                <Shield className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h2 className="text-xl font-black text-slate-900 font-heading">Application Under Review</h2>
                <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                  Your corporate membership application is currently being evaluated by our underwriting compliance team.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setStep('login')}
                className="w-full h-11 rounded-xl bg-[#013CA0] hover:bg-[#024BC7] text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                Back to Sign In
              </button>
            </motion.div>
          )}

        </div>
      </div>

      {/* Footer Branding */}
      <div className="relative z-10 text-center text-xs text-sky-300/60 mt-6 font-medium">
        © {new Date().getFullYear()} B4B America • The Connection for Small Business Solutions
      </div>
    </div>
  )
}

