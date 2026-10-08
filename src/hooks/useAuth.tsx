import React, { createContext, useContext, useState } from 'react'

export interface UserProfile {
  id: string
  name: string
  email: string
  company: string
  role: string
  tier: 'Platinum Tier' | 'Gold Tier' | 'Growth Member'
  creditScore: number
  annualRevenue: number
  capitalQualified: number
  avatarUrl?: string
  // Biz Pro Role Attributes
  rank: number // 1 to 9
  rankTitle: string
  region: string
  sponsorCode: string
  subscriptionStatus: 'active' | 'trial' | 'past_due'
  subscriptionPrice: number // $25/month
}

export const RANK_TITLES: Record<number, string> = {
  1: 'Associate Advisor',
  2: 'Senior Advisor',
  3: 'Managing Advisor',
  4: 'Regional Director',
  5: 'Senior Regional Director',
  6: 'Vice President',
  7: 'Senior Vice President',
  8: 'Executive Managing Director',
  9: 'National Partner',
}

const DEMO_USER: UserProfile = {
  id: 'usr_8892',
  name: 'Marcus Vance',
  email: 'm.vance@apexlogistics.io',
  company: 'Apex Freight & Logistics LLC',
  role: 'Founder & Biz Pro Director',
  tier: 'Platinum Tier',
  creditScore: 785,
  annualRevenue: 3450000,
  capitalQualified: 850000,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  // Biz Pro Role Attributes
  rank: 4, // Default Rank 4 so Rank 4+ leadership menus and features are active
  rankTitle: 'Regional Director',
  region: 'Northeast Region (NY, NJ, CT, PA)',
  sponsorCode: 'BIZ-88219',
  subscriptionStatus: 'active',
  subscriptionPrice: 25,
}

interface AuthContextType {
  user: UserProfile | null
  isAuthenticated: boolean
  login: (credentials?: { email: string; password?: string }) => void
  logout: () => void
  setRank: (rank: number) => void
  setRegion: (region: string) => void
  updateUser: (updates: Partial<UserProfile>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('oal_auth_session')
    const savedRank = localStorage.getItem('oal_bizpro_rank')
    const parsedRank = savedRank ? Number(savedRank) : 4
    const initialUser: UserProfile = {
      ...DEMO_USER,
      rank: parsedRank,
      rankTitle: RANK_TITLES[parsedRank] || 'Regional Director',
    }
    if (saved === 'active') return initialUser
    return initialUser // Default logged in for seamless demo exploration
  })

  const setRank = (rankNum: number) => {
    const clampedRank = Math.min(Math.max(rankNum, 1), 9)
    localStorage.setItem('oal_bizpro_rank', clampedRank.toString())
    setUser((prev) =>
      prev
        ? {
            ...prev,
            rank: clampedRank,
            rankTitle: RANK_TITLES[clampedRank] || 'Regional Director',
          }
        : null
    )
  }

  const setRegion = (newRegion: string) => {
    setUser((prev) => (prev ? { ...prev, region: newRegion } : null))
  }

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null))
  }

  const login = (credentials?: { email?: string }) => {
    const updatedUser: UserProfile = credentials?.email
      ? {
          ...DEMO_USER,
          email: credentials.email,
          name: credentials.email.split('@')[0],
        }
      : DEMO_USER
    setUser(updatedUser)
    localStorage.setItem('oal_auth_session', 'active')
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('oal_auth_session')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        setRank,
        setRegion,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
