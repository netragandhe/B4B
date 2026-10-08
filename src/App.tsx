import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/hooks/useTheme'
import { AuthProvider } from '@/hooks/useAuth'
import { ToastProvider } from '@/components/ui/Toast'

// Layouts
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { PortalLayout } from '@/layouts/PortalLayout'

// Marketing Pages
import { HomePage } from '@/pages/marketing/HomePage'
import { SolutionsPage } from '@/pages/marketing/SolutionsPage'
import { AdvisoryPage } from '@/pages/marketing/AdvisoryPage'
import { ApplyPage } from '@/pages/marketing/ApplyPage'

// Portal Pages
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
                {/* 1. Public Marketing Website */}
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

                {/* 2. Hidden Design System Showcase */}
                <Route path="/design-system" element={<DesignSystemPage />} />

                {/* 3. Logged-in Client Portal */}
                <Route
                  path="/portal"
                  element={<Navigate to="/portal/dashboard" replace />}
                />
                <Route
                  path="/portal/dashboard"
                  element={
                    <PortalLayout>
                      <PortalDashboardPage />
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/capital"
                  element={
                    <PortalLayout>
                      <CapitalFacilitiesPage />
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/advisory"
                  element={
                    <PortalLayout>
                      <AdvisoryConsultingPage />
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/documents"
                  element={
                    <PortalLayout>
                      <DocumentsPage />
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/settings"
                  element={
                    <PortalLayout>
                      <SettingsPage />
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
