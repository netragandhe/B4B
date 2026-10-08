import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  User,
  Mail,
  Lock,
  Building,
  DollarSign,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react'
import { Stepper, Step } from '@/components/ui/Stepper'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { FormField } from '@/components/ui/FormField'
import { Select } from '@/components/ui/Select'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'
import { BrandLogo, brandConfig } from '@/config/brand'

export const SignupPage: React.FC = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    companyName: '',
    industry: 'Logistics & Transportation',
    annualRevenue: '$1M - $5M',
    plan: 'Gold Tier',
  })

  const steps: Step[] = [
    { title: 'Account Details', description: 'Personal credentials' },
    { title: 'Business Info', description: 'Company & revenue' },
    { title: 'Plan & Tier', description: 'Select advisory level' },
  ]

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Final Submit
      setIsSubmitting(true)
      setTimeout(() => {
        login({ email: formData.email, role: 'Client' })
        setIsSubmitting(false)
        toast({
          title: 'Account Created Successfully!',
          description: `Welcome to ${brandConfig.portalName}, ${formData.fullName}`,
          type: 'success',
        })
        navigate('/portal/otp-verification')
      }, 700)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A1628] text-slate-900 dark:text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full mx-auto space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-block">
            <BrandLogo size="lg" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">
            Apply for Capital & Client Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Set up your organization workspace in 3 quick steps.
          </p>
        </div>

        {/* Stepper Header */}
        <div className="bg-white dark:bg-[#0D1E36] p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-[#1E3A5F] shadow-sm">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Form Card */}
        <Card variant="bento" className="p-6 sm:p-8 space-y-6">
          {/* STEP 1: ACCOUNT DETAILS */}
          {currentStep === 0 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-slate-100 dark:border-[#1E3A5F] pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Step 1: Account Credentials
                </h3>
                <p className="text-xs text-slate-500">Enter your primary executive account details.</p>
              </div>

              <FormField label="Full Name" required id="signup-name">
                <Input
                  id="signup-name"
                  placeholder="e.g. Marcus Vance"
                  leftIcon={<User className="w-4 h-4" />}
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                />
              </FormField>

              <FormField label="Work Email Address" required id="signup-email">
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="name@company.com"
                  leftIcon={<Mail className="w-4 h-4" />}
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </FormField>

              <FormField label="Create Password" required id="signup-password">
                <PasswordInput
                  id="signup-password"
                  placeholder="At least 8 characters"
                  leftIcon={<Lock className="w-4 h-4" />}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                />
              </FormField>
            </div>
          )}

          {/* STEP 2: BUSINESS INFO */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-slate-100 dark:border-[#1E3A5F] pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Step 2: Business Profile & Revenue
                </h3>
                <p className="text-xs text-slate-500">Helps us pre-qualify capital lines instantly.</p>
              </div>

              <FormField label="Legal Business Name" required id="signup-company">
                <Input
                  id="signup-company"
                  placeholder="Apex Freight & Logistics LLC"
                  leftIcon={<Building className="w-4 h-4" />}
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                />
              </FormField>

              <FormField label="Primary Industry" required id="signup-industry">
                <Select
                  id="signup-industry"
                  options={[
                    { label: 'Logistics & Transportation', value: 'Logistics & Transportation' },
                    { label: 'Software & Technology', value: 'Software & Technology' },
                    { label: 'Healthcare & Life Sciences', value: 'Healthcare & Life Sciences' },
                    { label: 'Manufacturing & Industrial', value: 'Manufacturing & Industrial' },
                    { label: 'E-commerce & Retail', value: 'E-commerce & Retail' },
                  ]}
                  value={formData.industry}
                  onChange={(e) => handleChange('industry', e.target.value)}
                />
              </FormField>

              <FormField label="Estimated Annual Revenue" required id="signup-revenue">
                <Select
                  id="signup-revenue"
                  options={[
                    { label: '$250k - $1M', value: '$250k - $1M' },
                    { label: '$1M - $5M', value: '$1M - $5M' },
                    { label: '$5M - $15M', value: '$5M - $15M' },
                    { label: '$15M+', value: '$15M+' },
                  ]}
                  value={formData.annualRevenue}
                  onChange={(e) => handleChange('annualRevenue', e.target.value)}
                />
              </FormField>
            </div>
          )}

          {/* STEP 3: PLAN SELECTION */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-slate-100 dark:border-[#1E3A5F] pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Step 3: Select Advisory Tier
                </h3>
                <p className="text-xs text-slate-500">Choose your capital and CFO advisory scope.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    tier: 'Gold Tier',
                    badge: 'Popular',
                    capital: 'Up to $500k Line',
                    features: ['Monthly CFO Call', '13-Week Treasury Model', 'Standard Line Access'],
                  },
                  {
                    tier: 'Platinum Tier',
                    badge: 'Institutional',
                    capital: 'Up to $2.5M Line',
                    features: ['Weekly Fractional CFO', 'Custom Treasury Models', '24-hr Capital Draw'],
                  },
                ].map((plan) => {
                  const selected = formData.plan === plan.tier
                  return (
                    <div
                      key={plan.tier}
                      onClick={() => handleChange('plan', plan.tier)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selected
                          ? 'bg-blue-50/80 dark:bg-[#12294A] border-blue-600 shadow-md ring-2 ring-blue-500/40'
                          : 'bg-white dark:bg-[#0D1E36] border-slate-200 dark:border-[#1E3A5F] hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{plan.tier}</span>
                        <Badge variant={selected ? 'primary' : 'navy'} size="sm">
                          {plan.badge}
                        </Badge>
                      </div>
                      <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
                        {plan.capital}
                      </p>
                      <ul className="mt-3 space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Stepper Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
            {currentStep > 0 ? (
              <Button variant="outline" size="sm" onClick={handleBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Previous Step
              </Button>
            ) : (
              <Link to="/portal/login" className="text-xs text-slate-500 hover:underline">
                Already have an account? Sign In
              </Link>
            )}

            <Button
              variant="primary"
              size="sm"
              isLoading={isSubmitting}
              onClick={handleNext}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {currentStep === steps.length - 1 ? 'Complete Setup & Verify' : 'Continue'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
