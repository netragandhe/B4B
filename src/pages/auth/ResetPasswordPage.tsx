import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Lock, CheckCircle2 } from 'lucide-react'
import { BrandLogo } from '@/config/brand'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { FormField } from '@/components/ui/FormField'
import { SEOHead } from '@/components/seo/SEOHead'
import { authService } from '@/lib/auth/authService'
import { useToast } from '@/components/ui/Toast'

const schema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [success, setSuccess] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')

  const getPasswordStrength = (pass: string) => {
    let score = 0
    if (pass.length >= 6) score += 1
    if (pass.length >= 10) score += 1
    if (/[A-Z]/.test(pass)) score += 1
    if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score += 1
    return score
  }

  const strengthScore = getPasswordStrength(passwordInput)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const res = await authService.resetPassword('mock_token', data.password)
    setSuccess(true)
    toast({ title: 'Password Reset Successful', description: res.message, type: 'success' })
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center px-6 py-12">
      <SEOHead title="Set New Password | B4B Network" description="Set your new portal password." />

      <div className="max-w-md mx-auto w-full space-y-6 text-left">
        <div className="pb-4">
          <Link to="/">
            <BrandLogo size="md" />
          </Link>
        </div>

        {!success ? (
          <div className="space-y-6 bg-slate-800/80 p-8 rounded-2xl border border-slate-700">
            <div>
              <h1 className="text-2xl font-bold font-heading text-white">Set New Password</h1>
              <p className="text-xs text-slate-400 mt-1">Please enter your new password below.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField label="New Password" required error={errors.password?.message}>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register('password', {
                    onChange: (e) => setPasswordInput(e.target.value),
                  })}
                />
              </FormField>

              {passwordInput && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-400">Password Strength:</span>
                    <span className={strengthScore >= 3 ? 'text-emerald-400' : 'text-rose-400'}>
                      {strengthScore >= 4 ? 'Strong' : strengthScore >= 2 ? 'Medium' : 'Weak'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        strengthScore >= 4 ? 'bg-emerald-500 w-full' : strengthScore >= 2 ? 'bg-amber-400 w-2/3' : 'bg-rose-500 w-1/3'
                      }`}
                    />
                  </div>
                </div>
              )}

              <FormField label="Confirm New Password" required error={errors.confirmPassword?.message}>
                <Input type="password" placeholder="••••••••" {...register('confirmPassword')} />
              </FormField>

              <Button type="submit" variant="accent" size="md" pill isLoading={isSubmitting} className="w-full font-bold bg-emerald-600 hover:bg-emerald-500 text-white">
                Update Password
              </Button>
            </form>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-800 border border-slate-700 text-center space-y-4">
            <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400 w-fit mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white">Password Updated!</h2>
            <p className="text-xs text-slate-300">Your password has been changed successfully.</p>
            <Button variant="accent" size="sm" pill onClick={() => navigate('/portal/login')} className="w-full font-bold bg-blue-600 text-white">
              Sign In Now
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
