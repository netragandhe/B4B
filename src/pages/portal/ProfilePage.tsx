import React, { useState } from 'react'
import {
  User,
  Shield,
  KeyRound,
  Building2,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Smartphone,
  Laptop,
  Globe,
  Clock,
  Lock,
  Save,
  ShieldCheck,
  Award,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { FormField } from '@/components/ui/FormField'
import { OtpInput } from '@/components/ui/OtpInput'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Avatar } from '@/components/ui/Avatar'
import { Tabs } from '@/components/ui/Tabs'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'

export const ProfilePage: React.FC = () => {
  const { user } = useAuth()
  const { toast } = useToast()

  const [activeTab, setActiveTab] = useState('profile')

  // Profile Form State
  const [name, setName] = useState(user?.name || 'Marcus Vance')
  const [company, setCompany] = useState(user?.company || 'Apex Freight & Logistics LLC')
  const [email, setEmail] = useState(user?.email || 'm.vance@apexlogistics.io')
  const [phone, setPhone] = useState('+1 (555) 234-5678')
  const [title, setTitle] = useState('Chief Executive Officer')
  const [address, setAddress] = useState('1200 Avenue of the Americas, Suite 400, New York, NY 10036')
  const [ein] = useState('84-9283741')

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [showOtpPrompt, setShowOtpPrompt] = useState(false)

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Profile Updated Successfully',
      description: 'Your contact and company details have been synced across the B4B platform.',
      type: 'success',
    })
  }

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPassword || newPassword.length < 8) {
      toast({
        title: 'Validation Error',
        description: 'New password must be at least 8 characters long.',
        type: 'error',
      })
      return
    }
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'The new password and confirmation password do not match.',
        type: 'error',
      })
      return
    }
    setShowOtpPrompt(true)
  }

  const handleVerifyOtp = () => {
    if (otpCode.length < 6) {
      toast({
        title: 'Incomplete OTP',
        description: 'Please enter all 6 verification digits.',
        type: 'error',
      })
      return
    }
    setShowOtpPrompt(false)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setOtpCode('')
    toast({
      title: 'Security Credentials Updated',
      description: 'Your account password and 2FA tokens have been successfully updated.',
      type: 'success',
    })
  }

  return (
    <div className="max-w-5xl space-y-6 text-left pb-12">
      {/* Breadcrumb & Title */}
      <div className="space-y-2">
        <Breadcrumb
          items={[
            { label: 'Portal', href: '/portal/dashboard' },
            { label: 'Profile & Account' },
          ]}
        />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              Profile & Account Details
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage your personal credentials, organizational entity details, and security keys.
            </p>
          </div>
          <Badge variant="emerald" size="md" dot>
            Verified Institutional Member
          </Badge>
        </div>
      </div>

      {/* User Header Summary Card */}
      <Card variant="gradient" className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <Avatar
              src={user?.avatarUrl}
              name={name}
              size="lg"
              className="w-20 h-20 text-2xl border-4 border-white dark:border-[#0D1E36] shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full text-white border-2 border-white dark:border-[#0D1E36]">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                {name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow-xs">
                {user?.role || 'Institutional Member'}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-500" />
              {company}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              {email}
              <span className="mx-1.5">•</span>
              <Clock className="w-3.5 h-3.5" />
              Member since Jan 2024
            </p>
          </div>

          <div className="flex sm:flex-col items-end gap-2 w-full sm:w-auto">
            <Badge variant="royal" size="sm">
              Level 4 Access Tier
            </Badge>
            <span className="text-[11px] text-slate-400 font-mono">ID: {user?.id || 'USR-890214'}</span>
          </div>
        </div>
      </Card>

      {/* Navigation Tabs */}
      <Tabs
        tabs={[
          { id: 'profile', label: 'Entity Profile', icon: <User className="w-4 h-4" /> },
          { id: 'security', label: 'Security & 2FA', icon: <KeyRound className="w-4 h-4" /> },
          { id: 'sessions', label: 'Active Sessions', icon: <Laptop className="w-4 h-4" /> },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* TAB 1: Profile & Business Details */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <Card variant="default" className="p-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-[#1E3A5F]">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Personal & Representative Information
              </h3>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Full Representative Name" required>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </FormField>

              <FormField label="Executive Role / Title" required>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </FormField>

              <FormField label="Direct Corporate Email" required>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormField>

              <FormField label="Phone Number" required>
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </FormField>
            </div>
          </Card>

          <Card variant="default" className="p-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-[#1E3A5F]">
              <Building2 className="w-5 h-5 text-emerald-500" />
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Company & Tax Identification
              </h3>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Legal Registered Entity Name" required>
                <Input value={company} onChange={(e) => setCompany(e.target.value)} />
              </FormField>

              <FormField label="Federal Tax ID (EIN)" helperText="Verified with IRS registry">
                <Input value={ein} disabled className="bg-slate-50 dark:bg-[#12294A] cursor-not-allowed opacity-80" />
              </FormField>

              <div className="sm:col-span-2">
                <FormField label="Headquarters Address" required>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                </FormField>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" size="md">
              Reset Form
            </Button>
            <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      )}

      {/* TAB 2: Security & Password */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card variant="default" className="p-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-[#1E3A5F]">
              <KeyRound className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Institutional Access Password
              </h3>
            </div>

            <form onSubmit={handleUpdatePassword} className="mt-5 space-y-4 max-w-xl">
              <FormField label="Current Password" required>
                <PasswordInput
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password..."
                />
              </FormField>

              <FormField label="New Institutional Password" required helperText="Must be at least 8 characters with numbers and symbols.">
                <PasswordInput
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  showStrengthMeter
                  placeholder="Enter strong new password..."
                />
              </FormField>

              <FormField label="Confirm New Password" required>
                <PasswordInput
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password..."
                />
              </FormField>

              {!showOtpPrompt ? (
                <div className="pt-2">
                  <Button type="submit" variant="primary" size="md" leftIcon={<Lock className="w-4 h-4" />}>
                    Update Password & Authenticate
                  </Button>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#12294A] border border-slate-200 dark:border-[#1E3A5F] space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      Enter 6-Digit Authenticator Code
                    </span>
                    <span className="text-slate-400 font-mono">Demo: Enter any 6 digits</span>
                  </div>
                  <OtpInput length={6} value={otpCode} onChange={setOtpCode} />
                  <Button
                    type="button"
                    variant="accent"
                    size="md"
                    onClick={handleVerifyOtp}
                    className="w-full mt-2"
                  >
                    Confirm & Apply Credentials
                  </Button>
                </div>
              )}
            </form>
          </Card>

          {/* 2FA Status Card */}
          <Card variant="default" className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Two-Factor Authentication (2FA)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Hardware tokens and authenticator apps (TOTP) are actively protecting your account.
                  </p>
                </div>
              </div>
              <Badge variant="emerald" size="sm" dot>
                Enabled
              </Badge>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 3: Active Sessions */}
      {activeTab === 'sessions' && (
        <Card variant="default" className="p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#1E3A5F]">
            <div className="flex items-center gap-2">
              <Laptop className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Active Terminal Sessions
              </h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
              onClick={() => {
                toast({
                  title: 'Other Sessions Terminated',
                  description: 'All remote sessions have been revoked.',
                  type: 'success',
                })
              }}
            >
              Sign Out All Other Devices
            </Button>
          </div>

          <div className="mt-4 divide-y divide-slate-100 dark:divide-[#1E3A5F]/60">
            {/* Current Session */}
            <div className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Chrome on Windows 11
                    </span>
                    <Badge variant="emerald" size="sm">
                      Current Session
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    New York, USA • IP 192.168.1.104 • Active now
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Session */}
            <div className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#12294A] text-slate-500 dark:text-slate-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    B4B Mobile App on iPhone 15 Pro
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    New York, USA • IP 104.28.19.42 • Last active 2 hours ago
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                Revoke
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
