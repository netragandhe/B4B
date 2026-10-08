import React, { useState } from 'react'
import { Sliders, Save, RefreshCw, Tv, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'

export const AdminScoreboardSettingsPage: React.FC = () => {
  const { toast } = useToast()

  const [refreshInterval, setRefreshInterval] = useState(10)
  const [revenueWeight, setRevenueWeight] = useState(70)
  const [dealCountWeight, setDealCountWeight] = useState(30)
  const [tvModeBanner, setTvModeBanner] = useState('B4B NATIONAL SALES SCOREBOARD — LIVE OCTOBER 2026 LEADERBOARD')
  const [autoScrollSpeed, setAutoScrollSpeed] = useState('Medium (15s)')

  const handleSave = () => {
    toast({
      title: 'Scoreboard Settings Saved',
      description: 'Live Leaderboard parameters and TV Mode configuration updated.',
      type: 'success',
    })
  }

  const handleResetLeaderboard = () => {
    toast({
      title: 'Leaderboard Resynced',
      description: 'Simulated real-time ranking algorithms reset for all 9 ranks.',
      type: 'info',
    })
  }

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      <PageHeader
        title="Bulletin Scoreboard Settings & Controls"
        description="Configure live leaderboard refresh rates, ranking weighting metrics, and office TV Mode display preferences."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Scoreboard Settings', icon: <Sliders className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="navy" size="md">
            Gamification Engine
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleResetLeaderboard} leftIcon={<RefreshCw className="w-3.5 h-3.5 text-amber-500" />}>
              Reset Leaderboard
            </Button>
            <Button variant="accent" size="sm" onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>
              Save Settings
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEADERBOARD WEIGHTING & ALGORITHM */}
        <Card variant="default" className="p-6 border border-slate-200 dark:border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Ranking Algorithm Weighting</span>
            </h3>
            <Badge variant="emerald" size="sm">
              Live Formula
            </Badge>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300">Revenue Weight ({revenueWeight}%)</span>
                <span className="text-slate-500">Deals Weight ({100 - revenueWeight}%)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={revenueWeight}
                onChange={(e) => {
                  const val = Number(e.target.value)
                  setRevenueWeight(val)
                  setDealCountWeight(100 - val)
                }}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Real-Time Simulated Refresh Rate (Seconds)
              </label>
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              >
                <option value={5}>5 Seconds (High Frequency)</option>
                <option value={10}>10 Seconds (Standard)</option>
                <option value={30}>30 Seconds (Low Frequency)</option>
                <option value={60}>60 Seconds</option>
              </select>
            </div>
          </div>
        </Card>

        {/* TV MODE DISPLAY CONFIGURATION */}
        <Card variant="default" className="p-6 border border-slate-200 dark:border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Tv className="w-4 h-4 text-purple-500" />
              <span>Office TV Mode Screen Banner</span>
            </h3>
            <Badge variant="navy" size="sm">
              Fullscreen Display
            </Badge>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Header Ticker Text</label>
              <input
                type="text"
                value={tvModeBanner}
                onChange={(e) => setTvModeBanner(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">TV Auto-Scroll Pace</label>
              <select
                value={autoScrollSpeed}
                onChange={(e) => setAutoScrollSpeed(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              >
                <option value="Slow (30s)">Slow (30s per page)</option>
                <option value="Medium (15s)">Medium (15s per page)</option>
                <option value="Fast (8s)">Fast (8s per page)</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
