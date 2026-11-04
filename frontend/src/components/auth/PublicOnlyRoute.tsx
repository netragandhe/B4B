import React from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { isPathAllowedForRole, getDefaultLandingPath } from '@/context/AuthContext'

export const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, status } = useAuth()
  const [searchParams] = useSearchParams()

  if (status === 'loading') {
    return null
  }

  if (user && status === 'authenticated') {
    const redirectParam = searchParams.get('redirect')
    const decodedRedirect = redirectParam ? decodeURIComponent(redirectParam) : null
    const isAllowed = decodedRedirect && isPathAllowedForRole(decodedRedirect, user.role)
    const targetPath = isAllowed ? decodedRedirect : getDefaultLandingPath(user.role)
    return <Navigate to={targetPath} replace />
  }

  return <>{children}</>
}
