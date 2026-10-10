import React from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useAuth, UserRole } from '@/hooks/useAuth'

const getRoleDashboard = (role?: UserRole): string => {
  switch (role) {
    case 'Admin':
      return '/portal/admin/dashboard'
    case 'Biz Pro':
      return '/portal/bizpro/dashboard'
    case 'Client':
      return '/portal/client/dashboard'
    case 'Affiliate':
      return '/portal/affiliate/dashboard'
    case 'Employer':
      return '/portal/employer/dashboard'
    case 'Job Seeker':
      return '/portal/seeker/applications'
    default:
      return '/portal/dashboard'
  }
}

export const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, status, dashboardPath } = useAuth()
  const [searchParams] = useSearchParams()

  if (status === 'loading') {
    return null
  }

  if (user && status === 'authenticated') {
    const redirectParam = searchParams.get('redirect')
    const targetPath = redirectParam ? decodeURIComponent(redirectParam) : (dashboardPath || '/portal/dashboard')
    return <Navigate to={targetPath} replace />
  }

  return <>{children}</>
}
