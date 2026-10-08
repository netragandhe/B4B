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
}

const DEMO_USER: UserProfile = {
  id: 'usr_8892',
  name: 'Marcus Vance',
  email: 'm.vance@apexlogistics.io',
  company: 'Apex Freight & Logistics LLC',
  role: 'Founder & CEO',
  tier: 'Platinum Tier',
  creditScore: 785,
  annualRevenue: 3450000,
  capitalQualified: 850000,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
}

interface AuthContextType {
  user: UserProfile | null
  isAuthenticated: boolean
  login: (credentials?: { email: string; password?: string }) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('oal_auth_session')
    if (saved === 'active') return DEMO_USER
    return DEMO_USER // Default logged in for seamless demo exploration
  })

  const login = (credentials?: { email?: string }) => {
    const updatedUser = credentials?.email 
      ? { ...DEMO_USER, email: credentials.email, name: credentials.email.split('@')[0] }
      : DEMO_USER
    setUser(updatedUser)
    localStorage.setItem('oal_auth_session', 'active')
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('oal_auth_session')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
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
