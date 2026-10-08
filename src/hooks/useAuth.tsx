import React, { createContext, useContext, useState } from 'react'

export type UserRole = 'Client' | 'Admin' | 'Biz Pro' | 'Affiliate' | 'Employer' | 'Job Seeker'

export interface UserProfile {
  id: string
  name: string
  
  email: string
  company: string
  role: UserRole
  title: string
  tier: 'Platinum Tier' | 'Gold Tier' | 'Growth Member'
  creditScore: number
  annualRevenue: number
  capitalQualified: number
  avatarUrl?: string
}

export const DEMO_PROFILES: Record<UserRole, UserProfile> = {
  Client: {
    id: 'usr_client_01',
    name: 'Marcus Vance',
    email: 'm.vance@apexlogistics.io',
    company: 'Apex Freight & Logistics LLC',
    role: 'Client',
    title: 'Founder & CEO',
    tier: 'Platinum Tier',
    creditScore: 785,
    annualRevenue: 3450000,
    capitalQualified: 850000,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  Admin: {
    id: 'usr_admin_01',
    name: 'Sarah Jenkins',
    email: 's.jenkins@b4bcapital.com',
    company: 'B4B Capital Operations',
    role: 'Admin',
    title: 'VP of Risk & Underwriting',
    tier: 'Platinum Tier',
    creditScore: 820,
    annualRevenue: 15000000,
    capitalQualified: 5000000,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
  'Biz Pro': {
    id: 'usr_bizpro_01',
    name: 'David Ross',
    email: 'd.ross@advisors.b4b.com',
    company: 'Ross Financial Advisory',
    role: 'Biz Pro',
    title: 'Lead Fractional CFO',
    tier: 'Gold Tier',
    creditScore: 795,
    annualRevenue: 1200000,
    capitalQualified: 1200000,
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
  },
  Affiliate: {
    id: 'usr_affiliate_01',
    name: 'Elena Rostova',
    email: 'e.rostova@partnernet.com',
    company: 'Apex Growth Partners',
    role: 'Affiliate',
    title: 'Senior Referral Director',
    tier: 'Gold Tier',
    creditScore: 760,
    annualRevenue: 850000,
    capitalQualified: 500000,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
  },
  Employer: {
    id: 'usr_employer_01',
    name: 'Robert Chen',
    email: 'r.chen@techscale.io',
    company: 'TechScale Innovations',
    role: 'Employer',
    title: 'Head of People & Ops',
    tier: 'Growth Member',
    creditScore: 740,
    annualRevenue: 2100000,
    capitalQualified: 600000,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  'Job Seeker': {
    id: 'usr_jobseeker_01',
    name: 'Maya Lin',
    email: 'maya.lin@financepro.com',
    company: 'Financial Analytics Candidate',
    role: 'Job Seeker',
    title: 'Senior Financial Analyst',
    tier: 'Growth Member',
    creditScore: 720,
    annualRevenue: 150000,
    capitalQualified: 50000,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
}

interface AuthContextType {
  user: UserProfile | null
  isAuthenticated: boolean
  login: (credentials?: { email?: string; role?: UserRole }) => void
  logout: () => void
  switchRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedRole = localStorage.getItem('b4b_active_role') as UserRole
    if (savedRole && DEMO_PROFILES[savedRole]) {
      return DEMO_PROFILES[savedRole]
    }
    return DEMO_PROFILES.Client // Default logged in as Client for demo
  })

  const login = (credentials?: { email?: string; role?: UserRole }) => {
    const roleToUse = credentials?.role || 'Client'
    const profile = DEMO_PROFILES[roleToUse] || DEMO_PROFILES.Client
    const updatedUser = credentials?.email
      ? { ...profile, email: credentials.email, name: credentials.email.split('@')[0] }
      : profile

    setUser(updatedUser)
    localStorage.setItem('b4b_auth_session', 'active')
    localStorage.setItem('b4b_active_role', roleToUse)
  }

  const switchRole = (newRole: UserRole) => {
    if (DEMO_PROFILES[newRole]) {
      setUser(DEMO_PROFILES[newRole])
      localStorage.setItem('b4b_active_role', newRole)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('b4b_auth_session')
    localStorage.removeItem('b4b_active_role')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
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
