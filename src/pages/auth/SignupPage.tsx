import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import {
  Users,
  Briefcase,
  Trophy,
  Share2,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  Building2,
  Sparkles,
  CreditCard,
} from 'lucide-react'
import { BrandLogo } from '@/config/brand'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { FormField } from '@/components/ui/FormField'
import { SEOHead } from '@/components/seo/SEOHead'
import { useAuth, UserRole } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'

const signupSchema = z.object({
  accountType: z.enum(['Admin', 'Biz Pro', 'Client', 'Affiliate', 'Employer', 'Job Seeker']),
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
  companyName: z.string().optional(),
  industry: z.string().optional(),
  state: z.string().optional(),
  referralCode: z.string().optional(),
  socialLink: z.string().optional(),
  website: z.string().optional(),
  terms: z.boolean().refine((v) => v === true, { message: 'You must accept the terms' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type SignupFormData = z.infer<typeof signupSchema>

export const SignupPage: React.FC = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const { toast } = useToast()

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [selectedRole, setSelectedRole] = useState<UserRole>('Client')
  const [passwordInput, setPasswordInput] = useState('')

  // Calculate Password Strength score (0 to 4)
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
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      accountType: 'Client',
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: true,
    },
  })

  const formValues = watch()

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    setValue('accountType', role)
    setStep(2)
  }

  const onFinalSubmit = async (data: SignupFormData) => {
    const res = await signup(data)
    if (res.success && res.user) {
      toast({
        title: '🎉 Account Created Successfully!',
        description: `Welcome ${res.user.name}. Your ${res.user.role} account is ready.`,
        type: 'success',
      })
      setStep(5) // Success step
    } else {
      toast({
        title: 'Registration Error',
        description: res.error || 'Failed to create account.',
        type: 'error',
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between p-6 sm:p-12">
      <SEOHead title="Create Account | B4B Network" description="Join B4B Capital Network as a Client, B4B Coach, Affiliate, Employer, or Job Seeker." />

      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <Link to="/">
            <BrandLogo size="md" />
          </Link>

          <div className="text-xs text-slate-400">
            Already have an account?{' '}
            <Link to="/portal/login" className="text-blue-400 font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>

        {/* Stepper Header Bar */}
        <div className="grid grid-cols-5 gap-2">
          {[
            { s: 1, label: '1. Role' },
            { s: 2, label: '2. Account' },
            { s: 3, label: '3. Details' },
            { s: 4, label: '4. Plan' },
            { s: 5, label: '5. Verify' },
          ].map((item) => (
            <div
              key={item.s}
              className={`py-2.5 text-center text-xs font-bold rounded-xl border transition-all ${
                step === item.s
                  ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                  : step > item.s
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400'
                  : 'bg-slate-800/60 border-slate-700 text-slate-500'
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* STEP 1: CHOOSE ACCOUNT TYPE */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-left">
            <div className="text-center space-y-2">
              <Badge variant="emerald" size="md">
                Get Started
              </Badge>
              <h1 className="text-3xl font-extrabold font-heading text-white">Choose Your Account Role</h1>
              <p className="text-xs text-slate-400">Select the account type that matches your goal on B4B</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { role: 'Client', icon: Users, title: 'Small Business Client', desc: 'Access debt facilities, business credit, POS terminals, & CFO advisory.' },
                { role: 'Biz Pro', icon: Trophy, title: 'B4B Coach', desc: 'Sell 16 commercial solutions, earn commissions, & climb the 9-rank scoreboard.' },
                { role: 'Affiliate', icon: Share2, title: 'Affiliate & Partner', desc: 'Refer small business clients, track pipeline, & earn recurring revenue.' },
                { role: 'Employer', icon: Briefcase, title: 'Corporate Employer', desc: 'Post open jobs, manage candidate pipelines, & hire top sales talent.' },
                { role: 'Job Seeker', icon: GraduationCap, title: 'Job Seeker Candidate', desc: 'Find high-paying Account Executive, SaaS, & remote opportunities.' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => handleRoleSelect(item.role as UserRole)}
                    className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-blue-400 hover:bg-slate-800 text-left space-y-3 transition-all hover:-translate-y-1 group cursor-pointer"
                  >
                    <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform w-fit">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base text-white group-hover:text-blue-400">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* STEP 2: ACCOUNT CREDENTIALS */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-left max-w-xl mx-auto">
            <h2 className="text-2xl font-bold font-heading text-white">Step 2: Basic Account Info</h2>

            <div className="space-y-4">
              <FormField label="Full Name" required error={errors.fullName?.message}>
                <Input placeholder="John Doe" {...register('fullName')} />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Email Address" required error={errors.email?.message}>
                  <Input type="email" placeholder="john@company.com" {...register('email')} />
                </FormField>

                <FormField label="Phone Number" required error={errors.phone?.message}>
                  <Input placeholder="(555) 000-0000" {...register('phone')} />
                </FormField>
              </div>

              <FormField label="Password" required error={errors.password?.message}>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register('password', {
                    onChange: (e) => setPasswordInput(e.target.value),
                  })}
                />
              </FormField>

              {/* Password Strength Meter */}
              {passwordInput && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-400">Password Strength:</span>
                    <span className={strengthScore >= 3 ? 'text-emerald-400' : strengthScore >= 2 ? 'text-amber-400' : 'text-rose-400'}>
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

              <FormField label="Confirm Password" required error={errors.confirmPassword?.message}>
                <Input type="password" placeholder="••••••••" {...register('confirmPassword')} />
              </FormField>

              <div className="flex items-center justify-between pt-4">
                <Button type="button" variant="outline" size="sm" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
                </Button>
                <Button type="button" variant="primary" size="sm" onClick={() => setStep(3)}>
                  Next: Role Details <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: ROLE-SPECIFIC DETAILS */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-left max-w-xl mx-auto">
            <h2 className="text-2xl font-bold font-heading text-white">Step 3: {selectedRole} Details</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (selectedRole === 'Biz Pro') {
                  setStep(4)
                } else {
                  handleSubmit(onFinalSubmit)(e)
                }
              }}
              className="space-y-4"
            >
              {selectedRole === 'Client' && (
                <>
                  <FormField label="Business Name">
                    <Input placeholder="Apex Freight LLC" {...register('companyName')} />
                  </FormField>
                  <FormField label="Industry / Sector">
                    <Input placeholder="Logistics & Transportation" {...register('industry')} />
                  </FormField>
                </>
              )}

              {selectedRole === 'Biz Pro' && (
                <>
                  <FormField label="Sponsor / Referral Code (Optional)">
                    <Input placeholder="e.g. ROSS785" {...register('referralCode')} />
                  </FormField>
                  <FormField label="Target Territory / State">
                    <Input placeholder="e.g. Illinois / Chicago District" {...register('state')} />
                  </FormField>
                </>
              )}

              {selectedRole === 'Affiliate' && (
                <>
                  <FormField label="Partner Type">
                    <Input placeholder="Creator / Agency / Influencer" />
                  </FormField>
                  <FormField label="Website or Social Profile">
                    <Input placeholder="https://instagram.com/..." {...register('socialLink')} />
                  </FormField>
                </>
              )}

              {selectedRole === 'Employer' && (
                <>
                  <FormField label="Corporate Company Name">
                    <Input placeholder="TechScale Innovations" {...register('companyName')} />
                  </FormField>
                  <FormField label="Corporate Website">
                    <Input placeholder="https://company.example.com" {...register('website')} />
                  </FormField>
                </>
              )}

              {selectedRole === 'Job Seeker' && (
                <>
                  <FormField label="Primary Sales / Tech Skill">
                    <Input placeholder="B2B Account Executive / SaaS Sales" />
                  </FormField>
                </>
              )}

              <div className="flex items-center justify-between pt-4">
                <Button type="button" variant="outline" size="sm" onClick={() => setStep(2)}>
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
                </Button>
                <Button type="submit" variant="accent" size="sm" pill isLoading={isSubmitting} className="font-bold bg-emerald-600 text-white">
                  {selectedRole === 'Biz Pro' ? 'Next: Plan Selection' : 'Create Account'} <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* STEP 4: B4B COACH PLAN SELECTION */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-left max-w-xl mx-auto">
            <h2 className="text-2xl font-bold font-heading text-white">Step 4: B4B Coach Starter Plan</h2>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 border border-blue-500 space-y-4">
              <Badge variant="gold" size="sm">
                Recommended
              </Badge>
              <h3 className="text-xl font-bold">B4B Coach Membership</h3>
              <div className="text-3xl font-black text-emerald-400">$25 / month</div>
              <p className="text-xs text-blue-200">
                Includes full access to eBOX, AI Marketing Hub, Lead CRM, and 16 Solution items.
              </p>
            </div>

            <Button
              type="button"
              variant="accent"
              size="md"
              pill
              onClick={handleSubmit(onFinalSubmit)}
              isLoading={isSubmitting}
              className="w-full font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              Complete Registration & Pay $25 <CreditCard className="w-4 h-4 ml-1.5" />
            </Button>
          </motion.div>
        )}

        {/* STEP 5: SUCCESS CONFIRMATION */}
        {step === 5 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 text-center max-w-md mx-auto">
            <div className="p-4 rounded-full bg-emerald-500/20 text-emerald-400 w-fit mx-auto">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <h2 className="text-3xl font-extrabold font-heading text-white">Welcome to B4B Network!</h2>
            <p className="text-xs text-slate-300">
              Your account has been created. Click below to enter your personalized dashboard.
            </p>

            <Button
              variant="accent"
              size="md"
              pill
              onClick={() => navigate(`/portal/${selectedRole === 'Job Seeker' ? 'seeker/applications' : selectedRole.toLowerCase().replace(/\s+/g, '')}`)}
              className="w-full font-bold bg-gradient-to-r from-blue-600 to-emerald-500 text-white"
            >
              Go to My Dashboard <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
