import React, { useState } from 'react'
import {
  Sliders,
  Save,
  RefreshCw,
  Tv,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  History,
  Archive,
  Shield,
  Eye,
  EyeOff,
  RotateCcw,
  Check,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { FormField } from '@/components/ui/FormField'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'
import { useAuth } from '@/context/AuthContext'
import {
  scoreboardService,
  ScoreboardSettings,
} from '@/lib/services/scoreboardService'
import { formatCurrency } from '@/lib/utils'

export const AdminScoreboardSettingsPage: React.FC = () => {
  const { toast } = useToast()
  const { user } = useAuth()

  // Service stores
  const settings = scoreboardService.useSettings()
  const auditLogs = scoreboardService.useAuditLog()
  const archives = scoreboardService.useArchives()

  // Form State initialized with service data
  const [formData, setFormData] = useState<ScoreboardSettings>({ ...settings })
  const [resetModalOpen, setResetModalOpen] = useState(false)
  const [activeSubTab, setActiveSubTab] = useState<'settings' | 'history' | 'archives'>('settings')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    scoreboardService.updateSettings(formData, user?.name || 'Super Admin')
    toast({
      title: 'Scoreboard Settings Saved',
      description: 'Leaderboard parameters, ranking formula, and TV Mode configuration updated.',
      type: 'success',
    })
  }

  const handleResetToDefaults = () => {
    scoreboardService.resetSettingsToDefault(user?.name || 'Super Admin')
    setFormData(scoreboardService.getSettings())
    toast({
      title: 'Settings Reset to Default',
      description: 'Restored original default ranking metrics and display parameters.',
      type: 'info',
    })
  }

  const handleConfirmLeaderboardReset = () => {
    scoreboardService.archiveAndResetLeaderboard(user?.name || 'Super Admin')
    setResetModalOpen(false)
    toast({
      title: 'Leaderboard Archived & Reset',
      description: 'Current period standings archived to history and live producer scores reset to zero.',
      type: 'success',
    })
  }

  const handleTimeframeToggle = (tf: 'Today' | 'Week' | 'Month' | 'Year') => {
    setFormData((prev) => {
      const exists = prev.allowedTimeframes.includes(tf)
      const updated = exists
        ? prev.allowedTimeframes.filter((t) => t !== tf)
        : [...prev.allowedTimeframes, tf]

      // Ensure at least one timeframe is selected
      if (updated.length === 0) return prev
      return {
        ...prev,
        allowedTimeframes: updated,
        defaultTimeframe: updated.includes(prev.defaultTimeframe) ? prev.defaultTimeframe : updated[0],
      }
    })
  }

  return (
    <div className="space-y-8 text-left max-w-6xl mx-auto">
      <PageHeader
        title="Bulletin Scoreboard Settings & Controls"
        description="Configure live leaderboard ranking algorithms, point allocations, display privacy rules, and office TV Mode screens."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/admin/dashboard' },
          { label: 'Scoreboard Settings', icon: <Sliders className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="navy" size="md">
            Gamification Engine Active
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setResetModalOpen(true)}
              leftIcon={<Archive className="w-3.5 h-3.5 text-amber-500" />}
            >
              Reset / Archive Standings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetToDefaults}
              leftIcon={<RotateCcw className="w-3.5 h-3.5 text-slate-400" />}
            >
              Reset Defaults
            </Button>
          </div>
        }
      />

      {/* TABS HEADER */}
      <div className="flex border-b border-slate-800 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveSubTab('settings')}
          className={`pb-3 transition-colors relative ${
            activeSubTab === 'settings'
              ? 'text-blue-400 border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Algorithm & Display Settings
        </button>
        <button
          onClick={() => setActiveSubTab('history')}
          className={`pb-3 transition-colors relative ${
            activeSubTab === 'history'
              ? 'text-blue-400 border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Settings Audit Log ({auditLogs.length})
        </button>
        <button
          onClick={() => setActiveSubTab('archives')}
          className={`pb-3 transition-colors relative ${
            activeSubTab === 'archives'
              ? 'text-blue-400 border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Archived Competitions ({archives.length})
        </button>
      </div>

      {activeSubTab === 'settings' && (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* RANKING ALGORITHM & METRICS */}
            <Card variant="default" className="p-6 space-y-5 border-slate-800">
              <div className="flex items-center justify-between border-b pb-3 border-slate-800">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Ranking Metric & Scoring Engine</span>
                </h3>
                <Badge variant="emerald" size="sm">
                  Active Metric: {formData.rankingMetric.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-1.5">Primary Ranking Metric</label>
                  <select
                    value={formData.rankingMetric}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        rankingMetric: e.target.value as any,
                      }))
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  >
                    <option value="revenue">Total Funded Commercial Volume ($ USD)</option>
                    <option value="deals">Total Closed Advisory / Debt Deals</option>
                    <option value="points">Total Gamified Activity Points</option>
                    <option value="weighted">Custom Weighted Composite Score</option>
                  </select>
                </div>

                {/* WEIGHT SLIDERS IF WEIGHTED */}
                {formData.rankingMetric === 'weighted' && (
                  <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 space-y-3">
                    <div className="font-bold text-blue-300">Composite Formula Weights:</div>

                    <div>
                      <div className="flex justify-between font-medium mb-1 text-slate-300">
                        <span>Funded Volume Weight: {formData.revenueWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.revenueWeight}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, revenueWeight: Number(e.target.value) }))
                        }
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-medium mb-1 text-slate-300">
                        <span>Deals Closed Weight: {formData.dealsWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.dealsWeight}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, dealsWeight: Number(e.target.value) }))
                        }
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-medium mb-1 text-slate-300">
                        <span>Activity Points Weight: {formData.pointsWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.pointsWeight}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, pointsWeight: Number(e.target.value) }))
                        }
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* POINTS PER ACTION */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <FormField label="Pts per Deal" required id="pts-deal">
                    <Input
                      id="pts-deal"
                      type="number"
                      value={formData.pointsPerDeal}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, pointsPerDeal: Number(e.target.value) }))
                      }
                      required
                    />
                  </FormField>
                  <FormField label="Pts per Lead" required id="pts-lead">
                    <Input
                      id="pts-lead"
                      type="number"
                      value={formData.pointsPerLead}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, pointsPerLead: Number(e.target.value) }))
                      }
                      required
                    />
                  </FormField>
                  <FormField label="Pts per Recruit" required id="pts-recruit">
                    <Input
                      id="pts-recruit"
                      type="number"
                      value={formData.pointsPerRecruit}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, pointsPerRecruit: Number(e.target.value) }))
                      }
                      required
                    />
                  </FormField>
                </div>

                {/* TIMEFRAMES */}
                <div className="pt-2">
                  <label className="font-bold text-slate-300 block mb-1.5">Enabled Timeframe Tabs for Coaches</label>
                  <div className="flex flex-wrap gap-2">
                    {(['Today', 'Week', 'Month', 'Year'] as const).map((tf) => {
                      const selected = formData.allowedTimeframes.includes(tf)
                      return (
                        <button
                          type="button"
                          key={tf}
                          onClick={() => handleTimeframeToggle(tf)}
                          className={`px-3 py-1.5 rounded-lg font-bold border transition-colors flex items-center gap-1.5 ${
                            selected
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'bg-slate-900 border-slate-700 text-slate-400'
                          }`}
                        >
                          {selected && <Check className="w-3 h-3" />}
                          {tf}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </Card>

            {/* PRIVACY & DISPLAY TOGGLES */}
            <Card variant="default" className="p-6 space-y-5 border-slate-800">
              <div className="flex items-center justify-between border-b pb-3 border-slate-800">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>Privacy & Visibility Controls</span>
                </h3>
                <Badge variant="royal" size="sm">
                  Live Toggles
                </Badge>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <div className="font-bold text-white">Show Revenue Numbers ($ USD)</div>
                    <div className="text-[11px] text-slate-400">
                      When disabled, exact funded dollars are hidden from non-admin coaches.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.showRevenueNumbers}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, showRevenueNumbers: e.target.checked }))
                    }
                    className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <div className="font-bold text-white">Show Coach Names Publicly</div>
                    <div className="text-[11px] text-slate-400">
                      When disabled, coaches are masked with anonymous IDs (e.g. Coach #3).
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.showCoachNames}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, showCoachNames: e.target.checked }))
                    }
                    className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <div className="font-bold text-white">Show Federal Reserve Regions</div>
                    <div className="text-[11px] text-slate-400">
                      Display geographic district tags next to producer entries.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.showRegions}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, showRegions: e.target.checked }))
                    }
                    className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <FormField label="Reset Period Cycle" required id="reset-cycle">
                    <select
                      id="reset-cycle"
                      value={formData.resetPeriod}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, resetPeriod: e.target.value as any }))
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    >
                      <option value="Monthly">Monthly Reset</option>
                      <option value="Quarterly">Quarterly Reset</option>
                    </select>
                  </FormField>

                  <FormField label="Auto-Archive Past Standings" required id="auto-archive">
                    <select
                      id="auto-archive"
                      value={formData.autoArchive ? 'true' : 'false'}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, autoArchive: e.target.value === 'true' }))
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    >
                      <option value="true">Enabled (Snapshot on Reset)</option>
                      <option value="false">Disabled</option>
                    </select>
                  </FormField>
                </div>
              </div>
            </Card>

            {/* TV MODE SCREEN CONFIGURATION */}
            <Card variant="default" className="lg:col-span-2 p-6 space-y-5 border-slate-800">
              <div className="flex items-center justify-between border-b pb-3 border-slate-800">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Tv className="w-4 h-4 text-purple-400" />
                  <span>Office TV Display & Screen Cast Preferences</span>
                </h3>
                <Badge variant="navy" size="sm">
                  Fullscreen Display Engine
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="md:col-span-3">
                  <FormField label="Header Ticker Banner Text" required id="tv-banner">
                    <Input
                      id="tv-banner"
                      value={formData.tvModeBanner}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, tvModeBanner: e.target.value }))
                      }
                      required
                    />
                  </FormField>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Live Sync Interval (Seconds)</label>
                  <select
                    value={formData.tvRefreshIntervalSec}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        tvRefreshIntervalSec: Number(e.target.value),
                      }))
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  >
                    <option value={3}>3 Seconds (High Frequency)</option>
                    <option value={5}>5 Seconds (Standard Live)</option>
                    <option value={15}>15 Seconds</option>
                    <option value={30}>30 Seconds</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">TV Auto-Scroll Pace</label>
                  <select
                    value={formData.tvAutoScrollSpeed}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        tvAutoScrollSpeed: e.target.value as any,
                      }))
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  >
                    <option value="Slow (30s)">Slow (30s)</option>
                    <option value="Medium (15s)">Medium (15s)</option>
                    <option value="Fast (8s)">Fast (8s)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">TV Display Theme</label>
                  <select
                    value={formData.tvTheme}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        tvTheme: e.target.value as any,
                      }))
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  >
                    <option value="navy">Deep Navy Blue (Standard)</option>
                    <option value="dark">Midnight Black (OLED)</option>
                    <option value="gold">Gold & Bronze Champions</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="submit" variant="accent" size="md" className="font-bold gap-2">
              <Save className="w-4 h-4" />
              Save & Apply Scoreboard Settings
            </Button>
          </div>
        </form>
      )}

      {/* TAB 2: AUDIT LOG */}
      {activeSubTab === 'history' && (
        <Card variant="default" className="divide-y divide-slate-800 overflow-hidden">
          <div className="p-4 bg-slate-900/80 font-bold text-xs text-slate-300">
            Scoreboard Settings Modification Audit Trail
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Admin User</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-900/40">
                    <td className="py-3 px-4 text-slate-400 font-mono">{log.timestamp}</td>
                    <td className="py-3 px-4 font-bold text-white">{log.adminUser}</td>
                    <td className="py-3 px-4">
                      <Badge variant="royal" size="sm">
                        {log.action}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 3: ARCHIVED COMPETITIONS */}
      {activeSubTab === 'archives' && (
        <div className="space-y-4">
          {archives.map((arch) => (
            <Card key={arch.periodId} variant="bento" className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-base text-white">{arch.periodName}</h4>
                  <span className="text-xs text-slate-400">Archived on {arch.archivedDate}</span>
                </div>
                <Badge variant="gold" size="md">
                  Winner: {arch.winnerName} ({formatCurrency(arch.winnerVolume)})
                </Badge>
              </div>

              <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300">
                {arch.topProducers.slice(0, 3).map((p, i) => (
                  <div key={p.id} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-white">#{i + 1} {p.name}</span>
                    <span className="text-emerald-400 font-bold">{formatCurrency(p.fundedVolume)}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* RESET & ARCHIVE LEADERBOARD MODAL */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Archive Period & Reset Live Standings"
        description="Are you sure you want to close this competition cycle?"
        maxWidth="md"
      >
        <div className="space-y-4 text-left text-xs">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>Permanent Archival & Score Reset</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              This action will create a permanent historical snapshot of current rankings in the archives and reset all live coach funded volume, deals, and points to <strong>0</strong> for the new cycle.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setResetModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmLeaderboardReset}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
            >
              Confirm Archive & Reset
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
