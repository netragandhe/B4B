import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, status } = useAuth()
  const location = useLocation()

  if (status === 'loading') {
    return null // AuthContext renders branded full-screen loader
  }

  if (!user || status === 'unauthenticated') {
    const redirectUrl = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/portal/login?redirect=${redirectUrl}`} replace />
  }

  return <>{children}</>
}
