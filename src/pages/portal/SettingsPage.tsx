import React, { useState } from 'react'
import {
  Settings,
  Shield,
  KeyRound,
  User,
  Bell,
  CheckCircle2,
  Lock,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { FormField } from '@/components/ui/FormField'
import { Switch } from '@/components/ui/Switch'
import { OtpInput } from '@/components/ui/OtpInput'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/components/ui/Toast'

export const SettingsPage: React.FC = () => {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { toast } = useToast()

  // Profile State
  const [company, setCompany] = useState(user?.company || 'Apex Freight & Logistics LLC')
  const [founder, setFounder] = useState(user?.name || 'Marcus Vance')
  const [email, setEmail] = useState(user?.email || 'm.vance@apexlogistics.io')

  // Password & Security State
  const [newPassword, setNewPassword] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [showOtpPrompt, setShowOtpPrompt] = useState(false)

  // Notification toggles
  const [notifyDraws, setNotifyDraws] = useState(true)
  const [notifyAdvisory, setNotifyAdvisory] = useState(true)
  const [notifyMarketRates, setNotifyMarketRates] = useState(false)

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Profile Updated',
      description: 'Corporate records saved to OAL client registry.',
      type: 'success',
    })
  }

  const handleUpdateSecurity = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPassword) {
      toast({ title: 'Validation Error', description: 'Enter a new password.', type: 'error' })
      return
    }
    setShowOtpPrompt(true)
  }

  const handleVerifyOtp = () => {
    if (otpCode.length < 6) {
      toast({ title: 'Incomplete OTP', description: 'Please enter all 6 verification digits.', type: 'error' })
      return
    }
    setShowOtpPrompt(false)
    setNewPassword('')
    setOtpCode('')
    toast({
      title: 'Credentials Updated',
      description: 'Your 256-bit password and 2FA key have been updated.',
      type: 'success',
    })
  }

  return (
    <div className="max-w-4xl space-y-8 text-left">
      <div className="space-y-2">
        <Breadcrumb items={[{ label: 'Account Settings' }]} />
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
            Client Terminal Settings
          </h1>
          <Badge variant="emerald" size="sm" dot>
            2FA Enforced
          </Badge>
        </div>
      </div>

      {/* Profile Card */}
      <Card variant="default" className="p-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-[#1E3A5F]">
          <User className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
            Entity & Representative Profile
          </h3>
        </div>

        <form onSubmit={handleSaveProfile} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Legal Business Name" required>
              <Input value={company} onChange={(e) => setCompany(e.target.value)} />
            </FormField>
            <FormField label="Managing Representative" required>
              <Input value={founder} onChange={(e) => setFounder(e.target.value)} />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Corporate Email" required>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormField>
            <FormField label="Federal Tax ID (EIN)">
              <Input value="84-9283741" disabled />
            </FormField>
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="primary" size="sm">
              Save Entity Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* Security & Password Strength Card */}
      <Card variant="default" className="p-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-[#1E3A5F]">
          <KeyRound className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
            Security & Password Strength Meter
          </h3>
        </div>

        <form onSubmit={handleUpdateSecurity} className="mt-5 space-y-4 max-w-lg">
          <FormField label="New Institutional Password" helperText="Include uppercase, numbers and symbols.">
            <PasswordInput
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              showStrengthMeter
              placeholder="Enter strong password..."
            />
          </FormField>

          {!showOtpPrompt ? (
            <Button type="submit" variant="outline" size="sm">
              Initiate Security Update
            </Button>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Enter 6-Digit Authenticator Code
                </span>
                <span className="text-slate-400">Demo Code: any 6 digits</span>
              </div>
              <OtpInput length={6} value={otpCode} onChange={setOtpCode} />
              <Button
                type="button"
                variant="accent"
                size="sm"
                onClick={handleVerifyOtp}
                className="w-full mt-2"
              >
                Verify & Save Credentials
              </Button>
            </div>
          )}
        </form>
      </Card>

      {/* Preferences & Appearance Card */}
      <Card variant="default" className="p-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-[#1E3A5F]">
          <Bell className="w-5 h-5 text-emerald-500" />
          <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
            Preferences & Appearance
          </h3>
        </div>

        <div className="mt-5 space-y-4 divide-y divide-slate-100 dark:divide-[#1E3A5F]/60">
          <div className="pt-2">
            <Switch
              checked={theme === 'dark'}
              onChange={() => toggleTheme()}
              label="Dark Theme Mode"
              description="Toggle between high-contrast Navy Dark and Clean Slate Light mode."
            />
          </div>

          <div className="pt-4">
            <Switch
              checked={notifyDraws}
              onChange={setNotifyDraws}
              label="Instant Disbursement Alerts"
              description="Receive SMS and Fedwire tracking confirmation whenever a line draw executes."
            />
          </div>

          <div className="pt-4">
            <Switch
              checked={notifyAdvisory}
              onChange={setNotifyAdvisory}
              label="CFO Strategy Reminders"
              description="Get calendar notifications 24 hours prior to scheduled advisory meetings."
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
