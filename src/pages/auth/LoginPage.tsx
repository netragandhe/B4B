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
    <div className="min-h-screen bg-gradient-to-br from-[#0244B5] via-[#013CA0] to-[#01266B] text-slate-900 font-sans flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-[#FFC911] selection:text-black">
      <SEOHead title="Portal Sign In | B4B Executive Platform" description="Sign in to your B4B client, B4B Coach, or corporate portal account." />

      {/* 1. Atmospheric Translucent Blue Background Elements */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400/25 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/35 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-400/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] pointer-events-none" />

      {/* Top Header Link */}
      <div className="relative z-10 w-full max-w-[400px] sm:max-w-[420px] flex items-center justify-between mb-8 sm:mb-10 px-1">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold backdrop-blur-md transition-all border border-white/20 shadow-sm group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Website</span>
        </Link>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-[11px] font-semibold backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Official Portal</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CENTER LIGHT YELLOW CARD (Matching Logo Color #FFC911)                 */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[400px] sm:max-w-[420px]">
        {/* ROUND LOGO BADGE (OVERLAPPING TOP EDGE) */}
        <div className="absolute -top-14 sm:-top-16 left-1/2 -translate-x-1/2 z-20">
          <Link
            to="/"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white shadow-[0_14px_35px_rgba(0,0,0,0.25)] border-[5px] border-[#FFC911] p-3 flex items-center justify-center hover:scale-105 transition-transform duration-200 group block"
            title="B4B America"
          >
            <img
              src="/brand/logo-full.png"
              alt="B4B America Logo"
              className="w-full h-full object-contain filter drop-shadow-xs"
            />
          </Link>
        </div>

        {/* THE LIGHT YELLOW PAGE CONTAINER */}
        <div className="w-full bg-gradient-to-b from-[#FFD438] via-[#FFC911] to-[#FFBD0A] rounded-[28px] sm:rounded-[32px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45),0_0_35px_rgba(255,201,17,0.3)] border border-yellow-200/50 pt-18 sm:pt-20 pb-8 px-6 sm:px-8 text-slate-900">

          {/* STEP: LOGIN */}
          {step === 'login' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`space-y-4 ${isShakeError ? 'animate-shake' : ''}`}
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
                  <div className="flex items-stretch rounded-xl overflow-hidden shadow-xs bg-white border border-yellow-600/20 focus-within:ring-2 focus-within:ring-[#013CA0] transition-all">
                    <div className="w-12 bg-[#013CA0] flex items-center justify-center text-white shrink-0">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <input
                      type="email"
                      placeholder="username"
                      className="flex-1 h-12 px-3.5 bg-white text-slate-900 placeholder:text-slate-400 font-semibold text-sm focus:outline-none"
                      {...register('email')}
                    />
                  </div>
                  {errors.email?.message && (
                    <p className="text-[11px] font-bold text-rose-950 mt-1 pl-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field with iconic dark icon badge */}
                <div>
                  <div className="flex items-stretch rounded-xl overflow-hidden shadow-xs bg-white border border-yellow-600/20 focus-within:ring-2 focus-within:ring-[#013CA0] transition-all">
                    <div className="w-12 bg-[#013CA0] flex items-center justify-center text-white shrink-0">
                      <Lock className="w-4 h-4 text-white" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="password"
                      className="flex-1 h-12 px-3.5 bg-white text-slate-900 placeholder:text-slate-400 font-semibold text-sm focus:outline-none"
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
                    <p className="text-[11px] font-bold text-rose-950 mt-1 pl-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-start text-xs pt-0.5 font-bold text-[#0B2545]">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      {...register('rememberMe')}
                      className="w-4 h-4 accent-[#0B2545] rounded cursor-pointer"
                    />
                    <span>Remember me</span>
                  </label>
                </div>

                {/* WHITE COLOR BUTTON WITH BLACK TEXT */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-black font-black text-sm uppercase tracking-wider shadow-[0_8px_20px_rgba(0,0,0,0.18)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  ) : (
                    <span>Login</span>
                  )}
                </button>
              </form>

              {/* Bottom Signup and Forgot Password Links */}
              <div className="text-center space-y-1.5 pt-2 text-xs font-bold text-[#0B2545]">
                <p>
                  Don't have an account?{' '}
                  <Link to="/portal/signup" className="underline font-black text-black hover:text-[#0B2545]">
                    Sign Up
                  </Link>
                </p>
                <p>
                  <Link to="/portal/forgot-password" className="hover:underline font-semibold text-[#0B2545]/90 hover:text-black">
                    Forgot your password?
                  </Link>
                </p>
              </div>

              {/* 1-Click Demo Quick Role Access */}
              <div className="pt-3 mt-3 border-t border-black/10">
                <div className="flex items-center justify-between text-[11px] font-extrabold text-[#0B2545] mb-2">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#0B2545]" /> 1-Click Demo Preview:
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
                      className="py-1 px-1.5 rounded-lg bg-white/80 hover:bg-white text-[#0B2545] hover:text-black font-extrabold text-[11px] shadow-2xs hover:shadow-xs transition-all border border-black/5 truncate cursor-pointer text-center"
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
              className="space-y-5"
            >
              <div className="p-3 rounded-2xl bg-white/90 text-[#0B2545] w-fit mx-auto shadow-sm">
                <KeyRound className="w-6 h-6" />
              </div>

              <div className="text-center">
                <Badge variant="primary" size="sm" className="mb-2 bg-white text-[#0B2545] font-black border-0">
                  2-Factor Authentication
                </Badge>
                <h2 className="text-2xl font-black text-[#0B2545] font-heading">Verification Code</h2>
                <p className="text-xs text-[#0B2545]/80 mt-1 font-semibold">
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
                    className="w-10 sm:w-12 h-12 sm:h-14 rounded-xl bg-white border-0 text-center font-mono font-black text-xl text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-[#0B2545] font-bold">
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
                  className="hover:underline"
                >
                  Cancel
                </button>
              </div>

              {/* WHITE BUTTON WITH BLACK TEXT */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-white hover:bg-slate-50 text-black font-black text-sm uppercase tracking-wider shadow-lg transition-all cursor-pointer"
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
              className="space-y-5 text-center py-2"
            >
              <div className="p-3.5 rounded-2xl bg-white text-amber-600 w-fit mx-auto shadow-sm">
                <Shield className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h2 className="text-xl font-black text-[#0B2545] font-heading">Application Under Review</h2>
                <p className="text-xs text-[#0B2545]/85 leading-relaxed font-semibold">
                  Your corporate membership application is currently being evaluated by our underwriting compliance team.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setStep('login')}
                className="w-full h-11 rounded-xl bg-white hover:bg-slate-50 text-black font-black text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                Back to Sign In
              </button>
            </motion.div>
          )}

        </div>
      </div>

      {/* Footer Branding */}
      <div className="relative z-10 text-center text-xs text-blue-200/70 mt-6 font-medium">
        © {new Date().getFullYear()} B4B America • The Connection for Small Business Solutions
      </div>
    </div>
  )
}

