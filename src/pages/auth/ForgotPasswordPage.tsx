import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { BrandLogo } from '@/config/brand'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { FormField } from '@/components/ui/FormField'
import { SEOHead } from '@/components/seo/SEOHead'
import { authService } from '@/lib/auth/authService'
import { useToast } from '@/components/ui/Toast'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type FormData = z.infer<typeof schema>

export const ForgotPasswordPage: React.FC = () => {
  const { toast } = useToast()
  const [submitted, setSubmitted] = useState(false)
  const [sentEmail, setSentEmail] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setSentEmail(data.email)
    const res = await authService.forgotPassword(data.email)
    setSubmitted(true)
    toast({ title: 'Password Reset Dispatched', description: res.message, type: 'info' })
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center px-6 py-12">
      <SEOHead title="Forgot Password | B4B Network" description="Recover your portal account password." />

      <div className="max-w-md mx-auto w-full space-y-6 text-left">
        <div className="pb-4">
          <Link to="/">
            <BrandLogo size="md" />
          </Link>
        </div>

        {!submitted ? (
          <div className="space-y-6 bg-slate-800/80 p-8 rounded-2xl border border-slate-700">
            <div>
              <h1 className="text-2xl font-bold font-heading text-white">Reset Your Password</h1>
              <p className="text-xs text-slate-400 mt-1">
                Enter your account email address to receive password reset instructions.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField label="Email Address" required error={errors.email?.message}>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <Input type="email" placeholder="name@company.com" className="pl-9 text-xs" {...register('email')} />
                </div>
              </FormField>

              <Button type="submit" variant="accent" size="md" pill isLoading={isSubmitting} className="w-full font-bold bg-blue-600 hover:bg-blue-500 text-white">
                Send Reset Link
              </Button>
            </form>

            <div className="text-center pt-2">
              <Link to="/portal/login" className="text-xs font-semibold text-slate-400 hover:text-white flex items-center justify-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-800 border border-slate-700 text-center space-y-4">
            <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400 w-fit mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white">Check Your Inbox</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              We dispatched reset instructions to <strong className="text-white">{sentEmail}</strong>.
            </p>
            <div className="pt-2">
              <Link to="/portal/login" className="text-xs text-blue-400 font-bold hover:underline">
                Return to Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
