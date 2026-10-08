import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@/hooks/useTheme'
import { AuthProvider } from '@/hooks/useAuth'
import { ToastProvider } from '@/components/ui/Toast'

// Layouts
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { PortalLayout } from '@/layouts/PortalLayout'

// Marketing Pages
import { HomePage } from '@/pages/marketing/HomePage'
import { SolutionsPage } from '@/pages/marketing/SolutionsPage'
import { SolutionPage } from '@/pages/marketing/SolutionPage'
import { JobsPage } from '@/pages/marketing/JobsPage'
import { AffiliatesPage } from '@/pages/marketing/AffiliatesPage'
import { CompanyPage } from '@/pages/marketing/CompanyPage'
import { ContactPage } from '@/pages/marketing/ContactPage'
import { AdvisoryPage } from '@/pages/marketing/AdvisoryPage'
import { ApplyPage } from '@/pages/marketing/ApplyPage'

// Portal Pages
import { PortalLoginPage } from '@/pages/portal/PortalLoginPage'
import { PortalDashboardPage } from '@/pages/portal/PortalDashboardPage'
import { CapitalFacilitiesPage } from '@/pages/portal/CapitalFacilitiesPage'
import { AdvisoryConsultingPage } from '@/pages/portal/AdvisoryConsultingPage'
import { DocumentsPage } from '@/pages/portal/DocumentsPage'
import { SettingsPage } from '@/pages/portal/SettingsPage'

// Design System & 404
import { DesignSystemPage } from '@/pages/DesignSystemPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

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
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <BrowserRouter>
                <Routes>
                  {/* Public Marketing Website */}
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
                    path="/solutions/:slug"
                    element={
                      <MarketingLayout>
                        <SolutionPage />
                      </MarketingLayout>
                    }
                  />
                  <Route
                    path="/jobs"
                    element={
                      <MarketingLayout>
                        <JobsPage />
                      </MarketingLayout>
                    }
                  />
                  <Route
                    path="/affiliates"
                    element={
                      <MarketingLayout>
                        <AffiliatesPage />
                      </MarketingLayout>
                    }
                  />
                  <Route
                    path="/company"
                    element={
                      <MarketingLayout>
                        <CompanyPage />
                      </MarketingLayout>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <MarketingLayout>
                        <ContactPage />
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

                  {/* Dedicated Portal Login Page */}
                  <Route path="/portal/login" element={<PortalLoginPage />} />

                  {/* Hidden Design System Showcase */}
                  <Route path="/design-system" element={<DesignSystemPage />} />

                  {/* Logged-in Client Portal Terminal */}
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

                  {/* 404 Fallback */}
                  <Route
                    path="*"
                    element={
                      <MarketingLayout>
                        <NotFoundPage />
                      </MarketingLayout>
                    }
                  />
                </Routes>
              </BrowserRouter>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}
