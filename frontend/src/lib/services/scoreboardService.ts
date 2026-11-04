import { createStore } from '../createStore'

export interface ScoreboardProducer {
  id: string
  rankPosition: number
  name: string
  roleTitle: string
  rankLevel: number
  region: string
  avatar: string
  fundedVolume: number
  dealsClosed: number
  recruitsCount: number
  points: number
  category: 'Capital' | 'Advisory' | 'Operations' | 'Growth'
  team: string
  changeDirection: 'up' | 'down' | 'same'
  changeDelta: number
  badge?: string
}

export interface ScoreboardSettings {
  rankingMetric: 'revenue' | 'deals' | 'points' | 'weighted'
  revenueWeight: number // e.g. 60%
  dealsWeight: number // e.g. 25%
  pointsWeight: number // e.g. 15%
  pointsPerDeal: number // 100
  pointsPerLead: number // 10
  pointsPerRecruit: number // 250
  allowedTimeframes: ('Today' | 'Week' | 'Month' | 'Year')[]
  defaultTimeframe: 'Today' | 'Week' | 'Month' | 'Year'
  showRevenueNumbers: boolean
  showCoachNames: boolean
  showRegions: boolean
  resetPeriod: 'Monthly' | 'Quarterly'
  autoArchive: boolean
  tvModeBanner: string
  tvRefreshIntervalSec: number
  tvAutoScrollSpeed: 'Slow (30s)' | 'Medium (15s)' | 'Fast (8s)'
  tvTheme: 'navy' | 'dark' | 'gold'
  lastResetDate?: string
}

export interface ScoreboardAuditEntry {
  id: string
  timestamp: string
  adminUser: string
  action: string
  details: string
}

export interface ArchivedScoreboardPeriod {
  periodId: string
  periodName: string
  archivedDate: string
  winnerName: string
  winnerVolume: number
  topProducers: ScoreboardProducer[]
}

export const INITIAL_SCOREBOARD_SETTINGS: ScoreboardSettings = {
  rankingMetric: 'revenue',
  revenueWeight: 60,
  dealsWeight: 25,
  pointsWeight: 15,
  pointsPerDeal: 100,
  pointsPerLead: 10,
  pointsPerRecruit: 250,
  allowedTimeframes: ['Today', 'Week', 'Month', 'Year'],
  defaultTimeframe: 'Month',
  showRevenueNumbers: true,
  showCoachNames: true,
  showRegions: true,
  resetPeriod: 'Monthly',
  autoArchive: true,
  tvModeBanner: 'B4B AMERICA NATIONAL SALES SCOREBOARD — LIVE OCTOBER 2026 LEADERBOARD',
  tvRefreshIntervalSec: 5,
  tvAutoScrollSpeed: 'Medium (15s)',
  tvTheme: 'navy',
  lastResetDate: '2026-10-01',
}

export const INITIAL_PRODUCERS: ScoreboardProducer[] = [
  {
    id: 'prod_1',
    rankPosition: 1,
    name: 'Carlos Ramirez',
    roleTitle: 'Executive Director (Rank 7)',
    rankLevel: 7,
    region: 'Dallas (11-K)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    fundedVolume: 6800000,
    dealsClosed: 14,
    recruitsCount: 8,
    points: 4850,
    category: 'Capital',
    team: 'Lone Star Capital Group',
    changeDirection: 'up',
    changeDelta: 1,
    badge: 'National Champion',
  },
  {
    id: 'prod_2',
    rankPosition: 2,
    name: 'Kimberly Chen',
    roleTitle: 'Regional Director (Rank 6)',
    rankLevel: 6,
    region: 'San Francisco (12-L)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    fundedVolume: 6100000,
    dealsClosed: 11,
    recruitsCount: 6,
    points: 4120,
    category: 'Growth',
    team: 'Pacific Tech Advisory',
    changeDirection: 'same',
    changeDelta: 0,
    badge: 'Top Tech Financer',
  },
  {
    id: 'prod_3',
    rankPosition: 3,
    name: 'Alexander Hayes',
    roleTitle: 'Executive Director (Rank 7)',
    rankLevel: 7,
    region: 'New York (2-B)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    fundedVolume: 5400000,
    dealsClosed: 9,
    recruitsCount: 5,
    points: 3600,
    category: 'Capital',
    team: 'Empire Financial Partners',
    changeDirection: 'up',
    changeDelta: 2,
  },
  {
    id: 'prod_4',
    rankPosition: 4,
    name: 'Marcus Vance',
    roleTitle: 'Regional Leader (Rank 5)',
    rankLevel: 5,
    region: 'Atlanta (6-F)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    fundedVolume: 5100000,
    dealsClosed: 12,
    recruitsCount: 9,
    points: 3890,
    category: 'Advisory',
    team: 'Southeast Capital Advisors',
    changeDirection: 'down',
    changeDelta: 1,
    badge: 'Recruiting Champion',
  },
  {
    id: 'prod_5',
    rankPosition: 5,
    name: 'Robert Sterling',
    roleTitle: 'Regional Leader (Rank 5)',
    rankLevel: 5,
    region: 'Chicago (7-G)',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    fundedVolume: 4200000,
    dealsClosed: 8,
    recruitsCount: 4,
    points: 2950,
    category: 'Operations',
    team: 'Midwest Commercial Team',
    changeDirection: 'same',
    changeDelta: 0,
  },
  {
    id: 'prod_6',
    rankPosition: 6,
    name: 'David Ross',
    roleTitle: 'Regional Leader (Rank 6)',
    rankLevel: 6,
    region: 'Richmond (5-E)',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    fundedVolume: 3900000,
    dealsClosed: 7,
    recruitsCount: 3,
    points: 2600,
    category: 'Capital',
    team: 'Chesapeake Advisory',
    changeDirection: 'up',
    changeDelta: 3,
  },
  {
    id: 'prod_7',
    rankPosition: 7,
    name: 'Michael Vance',
    roleTitle: 'Regional Leader (Rank 5)',
    rankLevel: 5,
    region: 'Cleveland (4-D)',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    fundedVolume: 2750000,
    dealsClosed: 6,
    recruitsCount: 2,
    points: 1980,
    category: 'Operations',
    team: 'Great Lakes Lending',
    changeDirection: 'down',
    changeDelta: 1,
  },
  {
    id: 'prod_8',
    rankPosition: 8,
    name: 'Jonathan Reed',
    roleTitle: 'District Leader (Rank 4)',
    rankLevel: 4,
    region: 'Kansas City (10-J)',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    fundedVolume: 2400000,
    dealsClosed: 5,
    recruitsCount: 2,
    points: 1750,
    category: 'Growth',
    team: 'Heartland Business Advisory',
    changeDirection: 'same',
    changeDelta: 0,
  },
]

const INITIAL_AUDIT_LOG: ScoreboardAuditEntry[] = [
  {
    id: 'audit_1',
    timestamp: '2026-10-01 09:00 AM',
    adminUser: 'Super Admin',
    action: 'Scoreboard Reset',
    details: 'Archived September 2026 leaderboard and initialized October 2026 standings.',
  },
  {
    id: 'audit_2',
    timestamp: '2026-10-05 02:15 PM',
    adminUser: 'Super Admin',
    action: 'Settings Update',
    details: 'Adjusted ranking metric weights: 60% Volume, 25% Deals, 15% Points.',
  },
]

const INITIAL_ARCHIVED: ArchivedScoreboardPeriod[] = [
  {
    periodId: 'period_2026_09',
    periodName: 'September 2026 National Competition',
    archivedDate: '2026-09-30',
    winnerName: 'Carlos Ramirez',
    winnerVolume: 7450000,
    topProducers: INITIAL_PRODUCERS.slice(0, 5),
  },
]

const settingsStore = createStore<ScoreboardSettings>('scoreboard_settings', INITIAL_SCOREBOARD_SETTINGS)
const producersStore = createStore<ScoreboardProducer[]>('scoreboard_producers', INITIAL_PRODUCERS)
const auditLogStore = createStore<ScoreboardAuditEntry[]>('scoreboard_audit_log', INITIAL_AUDIT_LOG)
const archiveStore = createStore<ArchivedScoreboardPeriod[]>('scoreboard_archives', INITIAL_ARCHIVED)

export const scoreboardService = {
  // Settings
  useSettings: () => settingsStore.useStore(),
  getSettings: () => settingsStore.get(),
  updateSettings: (updates: Partial<ScoreboardSettings>, adminName = 'Super Admin') => {
    settingsStore.set((prev) => ({ ...prev, ...updates }))

    const auditEntry: ScoreboardAuditEntry = {
      id: `audit_${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      adminUser: adminName,
      action: 'Settings Update',
      details: `Updated settings: ${Object.keys(updates).join(', ')}`,
    }
    auditLogStore.set((prev) => [auditEntry, ...prev])
  },
  resetSettingsToDefault: (adminName = 'Super Admin') => {
    settingsStore.set(INITIAL_SCOREBOARD_SETTINGS)
    const auditEntry: ScoreboardAuditEntry = {
      id: `audit_${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      adminUser: adminName,
      action: 'Reset Settings to Default',
      details: 'Restored all original default gamification and TV mode configurations.',
    }
    auditLogStore.set((prev) => [auditEntry, ...prev])
  },

  // Producers
  useProducers: () => producersStore.useStore(),
  getProducers: () => producersStore.get(),
  updateProducers: (producers: ScoreboardProducer[]) => {
    producersStore.set(producers)
  },

  // Leaderboard Archive & Reset
  archiveAndResetLeaderboard: (adminName = 'Super Admin') => {
    const currentProducers = producersStore.get()
    const sorted = [...currentProducers].sort((a, b) => b.fundedVolume - a.fundedVolume)
    const topWinner = sorted[0]

    const newArchive: ArchivedScoreboardPeriod = {
      periodId: `period_${Date.now()}`,
      periodName: `Competition Period Ended ${new Date().toLocaleDateString()}`,
      archivedDate: new Date().toISOString().split('T')[0],
      winnerName: topWinner ? topWinner.name : 'None',
      winnerVolume: topWinner ? topWinner.fundedVolume : 0,
      topProducers: sorted,
    }

    archiveStore.set((prev) => [newArchive, ...prev])

    // Reset producer scores
    const resetProducers = currentProducers.map((p, idx) => ({
      ...p,
      rankPosition: idx + 1,
      fundedVolume: 0,
      dealsClosed: 0,
      points: 0,
      changeDirection: 'same' as const,
      changeDelta: 0,
    }))

    producersStore.set(resetProducers)

    // Audit log
    const auditEntry: ScoreboardAuditEntry = {
      id: `audit_${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      adminUser: adminName,
      action: 'Leaderboard Archived & Standings Reset',
      details: `Standings archived to history (${newArchive.periodName}). Standings reset for all coaches.`,
    }
    auditLogStore.set((prev) => [auditEntry, ...prev])
  },

  // Audit Logs
  useAuditLog: () => auditLogStore.useStore(),
  getAuditLog: () => auditLogStore.get(),

  // Archives
  useArchives: () => archiveStore.useStore(),
  getArchives: () => archiveStore.get(),

  reset: () => {
    settingsStore.reset()
    producersStore.reset()
    auditLogStore.reset()
    archiveStore.reset()
  },
}
