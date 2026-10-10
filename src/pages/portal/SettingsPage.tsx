import React, { useState } from 'react'
import {
  Bell,
  SunMoon,
  Globe,
  Sliders,
  Database,
  Clock,
  Save,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Switch } from '@/components/ui/Switch'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Tabs } from '@/components/ui/Tabs'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/components/ui/Toast'

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const { toast } = useToast()

  const [activeTab, setActiveTab] = useState('general')

  // Notification Toggles
  const [notifyDraws, setNotifyDraws] = useState(true)
  const [notifyAdvisory, setNotifyAdvisory] = useState(true)
  const [notifyMarketRates, setNotifyMarketRates] = useState(false)
  const [notifyEmailDigest, setNotifyEmailDigest] = useState(true)
  const [soundEffects, setSoundEffects] = useState(true)

  // System & Regional Preferences
  const [autoLockTimeout, setAutoLockTimeout] = useState('30')
  const [currency, setCurrency] = useState('USD')
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY')
  const [dataSharing, setDataSharing] = useState(false)

  const handleSavePreferences = () => {
    toast({
      title: 'Portal Settings Saved',
      description: 'Your terminal preferences and notification rules have been updated.',
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
            { label: 'Portal Settings' },
          ]}
        />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              Portal & System Settings
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Configure system display preferences, notifications, security timeouts, and regional standards.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSavePreferences}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save All Preferences
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'general', label: 'Appearance & Display', icon: <SunMoon className="w-4 h-4" /> },
          { id: 'notifications', label: 'Alerts & Notifications', icon: <Bell className="w-4 h-4" /> },
          { id: 'system', label: 'System & Security Timeout', icon: <Sliders className="w-4 h-4" /> },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* TAB 1: Appearance & Display */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          <Card variant="default" className="p-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-[#1E3A5F]">
              <SunMoon className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Theme & Interface Appearance
              </h3>
            </div>

            <div className="mt-5 space-y-5 divide-y divide-slate-100 dark:divide-[#1E3A5F]/60">
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
                  checked={soundEffects}
                  onChange={setSoundEffects}
                  label="Audio Feedback & Chimes"
                  description="Play subtle notification chimes when actions succeed or new leads arrive."
                />
              </div>
            </div>
          </Card>

          <Card variant="default" className="p-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-[#1E3A5F]">
              <Globe className="w-5 h-5 text-emerald-500" />
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Regional Standards & Formatting
              </h3>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Base Reporting Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0D1E36] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="USD">USD ($) - US Dollar</option>
                  <option value="EUR">EUR (€) - Euro</option>
                  <option value="GBP">GBP (£) - British Pound</option>
                  <option value="INR">INR (₹) - Indian Rupee</option>
                  <option value="CAD">CAD ($) - Canadian Dollar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Calendar Date Format
                </label>
                <select
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0D1E36] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 10/24/2026)</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 24/10/2026)</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD (ISO 8601)</option>
                </select>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: Alerts & Notifications */}
      {activeTab === 'notifications' && (
        <Card variant="default" className="p-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-[#1E3A5F]">
            <Bell className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              Notification Channels & Triggers
            </h3>
          </div>

          <div className="mt-5 space-y-4 divide-y divide-slate-100 dark:divide-[#1E3A5F]/60">
            <div className="pt-2">
              <Switch
                checked={notifyDraws}
                onChange={setNotifyDraws}
                label="Instant Disbursement & Wire Alerts"
                description="Receive SMS and Fedwire tracking confirmation whenever a capital draw executes."
              />
            </div>

            <div className="pt-4">
              <Switch
                checked={notifyAdvisory}
                onChange={setNotifyAdvisory}
                label="Advisory & Meeting Reminders"
                description="Get calendar notifications 24 hours prior to scheduled executive advisory sessions."
              />
            </div>

            <div className="pt-4">
              <Switch
                checked={notifyMarketRates}
                onChange={setNotifyMarketRates}
                label="Federal Reserve & Rate Index Updates"
                description="Daily morning benchmark digest on Prime, SOFR, and treasury spreads."
              />
            </div>

            <div className="pt-4">
              <Switch
                checked={notifyEmailDigest}
                onChange={setNotifyEmailDigest}
                label="Weekly Portfolio & Pipeline Summary"
                description="Consolidated PDF executive report emailed every Monday at 08:00 EST."
              />
            </div>
          </div>
        </Card>
      )}

      {/* TAB 3: System & Security Timeout */}
      {activeTab === 'system' && (
        <div className="space-y-6">
          <Card variant="default" className="p-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-[#1E3A5F]">
              <Clock className="w-5 h-5 text-violet-500" />
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Session Lifecycle & Inactivity Lock
              </h3>
            </div>

            <div className="mt-5 max-w-lg space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Terminal Auto-Lock Duration
                </label>
                <select
                  value={autoLockTimeout}
                  onChange={(e) => setAutoLockTimeout(e.target.value)}
                  className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0D1E36] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="15">15 Minutes of Inactivity</option>
                  <option value="30">30 Minutes of Inactivity (Recommended)</option>
                  <option value="60">1 Hour of Inactivity</option>
                  <option value="120">2 Hours of Inactivity</option>
                </select>
                <p className="text-xs text-slate-400 mt-1">
                  Locks the terminal screen and requires PIN or biometric re-authentication.
                </p>
              </div>
            </div>
          </Card>

          <Card variant="default" className="p-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-[#1E3A5F]">
              <Database className="w-5 h-5 text-blue-500" />
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                Privacy & Data Telemetry
              </h3>
            </div>

            <div className="mt-5 space-y-4">
              <Switch
                checked={dataSharing}
                onChange={setDataSharing}
                label="Anonymous Platform Performance Diagnostics"
                description="Share anonymous telemetry to help optimize latency and client portal performance."
              />
            </div>
          </Card>

          {/* Demo Data Management */}
          <Card variant="default" className="p-6 border-red-200 dark:border-red-950/60 bg-red-50/30 dark:bg-red-950/10">
            <div className="flex items-center justify-between pb-4 border-b border-red-100 dark:border-red-900/40">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-red-500" />
                <h3 className="text-base font-bold font-heading text-red-900 dark:text-red-300">
                  Demo Data Management
                </h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-red-300 text-red-600 hover:bg-red-100 dark:border-red-800 dark:text-red-400"
                onClick={() => {
                  if (window.confirm('Reset all demo data (bulletin, clients, territory, billing, scoreboard) to original initial state?')) {
                    import('@/lib/services').then((m) => m.resetAllDemoData())
                    toast({
                      title: 'Demo Data Reset',
                      description: 'All portal storage stores have been restored to initial baseline data.',
                      type: 'info',
                    })
                  }
                }}
              >
                Reset All Demo Data
              </Button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-3">
              Restores bulletin posts, territory assignments, client directory records, and scoreboard settings back to their default seed dataset.
            </p>
          </Card>
        </div>
      )}
    </div>
  )
}
