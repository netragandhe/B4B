import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/hooks/useTheme'
import { AuthProvider } from '@/hooks/useAuth'
import { ToastProvider } from '@/components/ui/Toast'
import { RoleGuard } from '@/components/auth/RoleGuard'

// Layouts
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { PortalLayout } from '@/layouts/PortalLayout'

// Marketing Pages
import { HomePage } from '@/pages/marketing/HomePage'
import { SolutionsPage } from '@/pages/marketing/SolutionsPage'
import { AdvisoryPage } from '@/pages/marketing/AdvisoryPage'
import { ApplyPage } from '@/pages/marketing/ApplyPage'

// Auth Pages
import { LoginPage } from '@/pages/auth/LoginPage'
import { SignupPage } from '@/pages/auth/SignupPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage'
import { OtpVerificationPage } from '@/pages/auth/OtpVerificationPage'

// Portal Pages
import { EboxPage } from '@/pages/portal/EboxPage'
import { PortalDashboardPage } from '@/pages/portal/PortalDashboardPage'
import { CapitalFacilitiesPage } from '@/pages/portal/CapitalFacilitiesPage'
import { AdvisoryConsultingPage } from '@/pages/portal/AdvisoryConsultingPage'
import { DocumentsPage } from '@/pages/portal/DocumentsPage'
import { SettingsPage } from '@/pages/portal/SettingsPage'

// Design System Showcase
import { DesignSystemPage } from '@/pages/DesignSystemPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                {/* ------------------------------------------------------------------ */}
                {/* 1. Public Marketing Website Routes */}
                {/* ------------------------------------------------------------------ */}
                <Route
                  path="/"
                  element={
                    <MarketingLayout>
                      <HomePage />
                    </MarketingLayout>
                  }
                />
                <Route
                  path="/solutions"
                  element={
                    <MarketingLayout>
                      <SolutionsPage />
                    </MarketingLayout>
                  }
                />
                <Route
                  path="/advisory"
                  element={
                    <MarketingLayout>
                      <AdvisoryPage />
                    </MarketingLayout>
                  }
                />
                <Route
                  path="/apply"
                  element={
                    <MarketingLayout>
                      <ApplyPage />
                    </MarketingLayout>
                  }
                />

                {/* Hidden Design System Showcase */}
                <Route path="/design-system" element={<DesignSystemPage />} />

                {/* ------------------------------------------------------------------ */}
                {/* 2. Authentication Routes (Under /portal/...) */}
                {/* ------------------------------------------------------------------ */}
                <Route path="/portal/login" element={<LoginPage />} />
                <Route path="/portal/signup" element={<SignupPage />} />
                <Route path="/portal/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/portal/reset-password" element={<ResetPasswordPage />} />
                <Route path="/portal/otp-verification" element={<OtpVerificationPage />} />

                {/* ------------------------------------------------------------------ */}
                {/* 3. Logged-in Portal Routes */}
                {/* ------------------------------------------------------------------ */}
                <Route
                  path="/portal"
                  element={<Navigate to="/portal/dashboard" replace />}
                />

                {/* TOP PRIORITY: eBOX Page */}
                <Route
                  path="/portal/ebox"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Client', 'Admin', 'Biz Pro', 'Affiliate', 'Employer', 'Job Seeker']}>
                        <EboxPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />

                {/* Portal Dashboard */}
                <Route
                  path="/portal/dashboard"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Client', 'Admin', 'Biz Pro', 'Affiliate', 'Employer', 'Job Seeker']}>
                        <PortalDashboardPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />

                {/* Capital Facilities */}
                <Route
                  path="/portal/capital"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Client', 'Admin', 'Biz Pro', 'Employer', 'Affiliate', 'Job Seeker']}>
                        <CapitalFacilitiesPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />

                {/* Advisory & CFO Consulting */}
                <Route
                  path="/portal/advisory"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Client', 'Admin', 'Biz Pro', 'Employer', 'Affiliate', 'Job Seeker']}>
                        <AdvisoryConsultingPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />

                {/* Documents & Filings */}
                <Route
                  path="/portal/documents"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Client', 'Admin', 'Biz Pro', 'Employer', 'Affiliate', 'Job Seeker']}>
                        <DocumentsPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />

                {/* Settings */}
                <Route
                  path="/portal/settings"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Client', 'Admin', 'Biz Pro', 'Employer', 'Affiliate', 'Job Seeker']}>
                        <SettingsPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
