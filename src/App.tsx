import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@/hooks/useTheme'
import { AuthProvider } from '@/hooks/useAuth'
import { ToastProvider } from '@/components/ui/Toast'
import { PageLoadingFallback } from '@/components/ui/PageLoadingFallback'

// Layouts
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { PortalLayout } from '@/layouts/PortalLayout'
import { AffiliatePortalLayout } from '@/layouts/AffiliatePortalLayout'
import { BizProLayout } from '@/layouts/BizProLayout'

// Lazy-Loaded Marketing Pages
const HomePage = lazy(() => import('@/pages/marketing/HomePage').then((m) => ({ default: m.HomePage })))
const SolutionsPage = lazy(() => import('@/pages/marketing/SolutionsPage').then((m) => ({ default: m.SolutionsPage })))
const SolutionPage = lazy(() => import('@/pages/marketing/SolutionPage').then((m) => ({ default: m.SolutionPage })))
const JobsPage = lazy(() => import('@/pages/marketing/JobsPage').then((m) => ({ default: m.JobsPage })))
const AffiliatesPage = lazy(() => import('@/pages/marketing/AffiliatesPage').then((m) => ({ default: m.AffiliatesPage })))
const CompanyPage = lazy(() => import('@/pages/marketing/CompanyPage').then((m) => ({ default: m.CompanyPage })))
const ContactPage = lazy(() => import('@/pages/marketing/ContactPage').then((m) => ({ default: m.ContactPage })))
const AdvisoryPage = lazy(() => import('@/pages/marketing/AdvisoryPage').then((m) => ({ default: m.AdvisoryPage })))
const ApplyPage = lazy(() => import('@/pages/marketing/ApplyPage').then((m) => ({ default: m.ApplyPage })))

// Lazy-Loaded Client Portal Pages
const PortalLoginPage = lazy(() => import('@/pages/portal/PortalLoginPage').then((m) => ({ default: m.PortalLoginPage })))
const PortalDashboardPage = lazy(() => import('@/pages/portal/PortalDashboardPage').then((m) => ({ default: m.PortalDashboardPage })))
const CapitalFacilitiesPage = lazy(() => import('@/pages/portal/CapitalFacilitiesPage').then((m) => ({ default: m.CapitalFacilitiesPage })))
const AdvisoryConsultingPage = lazy(() => import('@/pages/portal/AdvisoryConsultingPage').then((m) => ({ default: m.AdvisoryConsultingPage })))
const DocumentsPage = lazy(() => import('@/pages/portal/DocumentsPage').then((m) => ({ default: m.DocumentsPage })))
const SettingsPage = lazy(() => import('@/pages/portal/SettingsPage').then((m) => ({ default: m.SettingsPage })))

// Lazy-Loaded Affiliate / Partner / Influencer Portal Pages
const AffiliateDashboardPage = lazy(() => import('@/pages/portal/affiliate/AffiliateDashboardPage').then((m) => ({ default: m.AffiliateDashboardPage })))
const AffiliateLinksPage = lazy(() => import('@/pages/portal/affiliate/AffiliateLinksPage').then((m) => ({ default: m.AffiliateLinksPage })))
const SubmitLeadPage = lazy(() => import('@/pages/portal/affiliate/SubmitLeadPage').then((m) => ({ default: m.SubmitLeadPage })))
const ReferralsPage = lazy(() => import('@/pages/portal/affiliate/ReferralsPage').then((m) => ({ default: m.ReferralsPage })))
const CommissionsPage = lazy(() => import('@/pages/portal/affiliate/CommissionsPage').then((m) => ({ default: m.CommissionsPage })))
const MarketingMaterialsPage = lazy(() => import('@/pages/portal/affiliate/MarketingMaterialsPage').then((m) => ({ default: m.MarketingMaterialsPage })))
const PartnerProfilePage = lazy(() => import('@/pages/portal/affiliate/PartnerProfilePage').then((m) => ({ default: m.PartnerProfilePage })))

// Lazy-Loaded Biz Pro Role Dashboard Pages
const BizProDashboardPage = lazy(() => import('@/pages/portal/bizpro/BizProDashboardPage').then((m) => ({ default: m.BizProDashboardPage })))
const BizProLeadsPage = lazy(() => import('@/pages/portal/bizpro/BizProLeadsPage').then((m) => ({ default: m.BizProLeadsPage })))
const BizProClientsPage = lazy(() => import('@/pages/portal/bizpro/BizProClientsPage').then((m) => ({ default: m.BizProClientsPage })))
const BizProCommunicationPage = lazy(() => import('@/pages/portal/bizpro/BizProCommunicationPage').then((m) => ({ default: m.BizProCommunicationPage })))
const BizProAiMarketingPage = lazy(() => import('@/pages/portal/bizpro/BizProAiMarketingPage').then((m) => ({ default: m.BizProAiMarketingPage })))
const BizProServicesPage = lazy(() => import('@/pages/portal/bizpro/BizProServicesPage').then((m) => ({ default: m.BizProServicesPage })))
const BizProCommissionsPage = lazy(() => import('@/pages/portal/bizpro/BizProCommissionsPage').then((m) => ({ default: m.BizProCommissionsPage })))
const BizProRankPage = lazy(() => import('@/pages/portal/bizpro/BizProRankPage').then((m) => ({ default: m.BizProRankPage })))
const BizProScoreboardPage = lazy(() => import('@/pages/portal/bizpro/BizProScoreboardPage').then((m) => ({ default: m.BizProScoreboardPage })))
const BizProTrainingPage = lazy(() => import('@/pages/portal/bizpro/BizProTrainingPage').then((m) => ({ default: m.BizProTrainingPage })))
const BizProTerritoryPage = lazy(() => import('@/pages/portal/bizpro/BizProTerritoryPage').then((m) => ({ default: m.BizProTerritoryPage })))
const BizProBrandingPage = lazy(() => import('@/pages/portal/bizpro/BizProBrandingPage').then((m) => ({ default: m.BizProBrandingPage })))
const BizProSupportPage = lazy(() => import('@/pages/portal/bizpro/BizProSupportPage').then((m) => ({ default: m.BizProSupportPage })))
const BizProSubscriptionPage = lazy(() => import('@/pages/portal/bizpro/BizProSubscriptionPage').then((m) => ({ default: m.BizProSubscriptionPage })))
// Rank 4+ Leadership Extra Pages
const BizProTeamPage = lazy(() => import('@/pages/portal/bizpro/BizProTeamPage').then((m) => ({ default: m.BizProTeamPage })))
const BizProTeamCommissionsPage = lazy(() => import('@/pages/portal/bizpro/BizProTeamCommissionsPage').then((m) => ({ default: m.BizProTeamCommissionsPage })))
const BizProRecruitPage = lazy(() => import('@/pages/portal/bizpro/BizProRecruitPage').then((m) => ({ default: m.BizProRecruitPage })))
const BizProTeamScoreboardPage = lazy(() => import('@/pages/portal/bizpro/BizProTeamScoreboardPage').then((m) => ({ default: m.BizProTeamScoreboardPage })))
const BizProTerritoryAssignmentPage = lazy(() => import('@/pages/portal/bizpro/BizProTerritoryAssignmentPage').then((m) => ({ default: m.BizProTerritoryAssignmentPage })))
const BizProTeamReportsPage = lazy(() => import('@/pages/portal/bizpro/BizProTeamReportsPage').then((m) => ({ default: m.BizProTeamReportsPage })))

// Design System & 404
const DesignSystemPage = lazy(() => import('@/pages/DesignSystemPage').then((m) => ({ default: m.DesignSystemPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
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
                <Suspense fallback={<PageLoadingFallback />}>
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

                    {/* Affiliate / Partner / Influencer Portal */}
                    <Route
                      path="/portal/affiliate"
                      element={<Navigate to="/portal/affiliate/dashboard" replace />}
                    />
                    <Route
                      path="/portal/affiliate/dashboard"
                      element={
                        <AffiliatePortalLayout>
                          <AffiliateDashboardPage />
                        </AffiliatePortalLayout>
                      }
                    />
                    <Route
                      path="/portal/affiliate/links"
                      element={
                        <AffiliatePortalLayout>
                          <AffiliateLinksPage />
                        </AffiliatePortalLayout>
                      }
                    />
                    <Route
                      path="/portal/affiliate/submit-lead"
                      element={
                        <AffiliatePortalLayout>
                          <SubmitLeadPage />
                        </AffiliatePortalLayout>
                      }
                    />
                    <Route
                      path="/portal/affiliate/referrals"
                      element={
                        <AffiliatePortalLayout>
                          <ReferralsPage />
                        </AffiliatePortalLayout>
                      }
                    />
                    <Route
                      path="/portal/affiliate/commissions"
                      element={
                        <AffiliatePortalLayout>
                          <CommissionsPage />
                        </AffiliatePortalLayout>
                      }
                    />
                    <Route
                      path="/portal/affiliate/marketing"
                      element={
                        <AffiliatePortalLayout>
                          <MarketingMaterialsPage />
                        </AffiliatePortalLayout>
                      }
                    />
                    <Route
                      path="/portal/affiliate/profile"
                      element={
                        <AffiliatePortalLayout>
                          <PartnerProfilePage />
                        </AffiliatePortalLayout>
                      }
                    />

                    {/* Friendly Aliases for Affiliate Portal */}
                    <Route
                      path="/affiliate-portal"
                      element={<Navigate to="/portal/affiliate/dashboard" replace />}
                    />
                    <Route
                      path="/affiliates/portal"
                      element={<Navigate to="/portal/affiliate/dashboard" replace />}
                    />

                    {/* Biz Pro Role Terminal (14 Base Menus + 6 Rank 4+ Leadership Menus) */}
                    <Route
                      path="/bizpro"
                      element={<Navigate to="/bizpro/dashboard" replace />}
                    />
                    <Route
                      path="/bizpro/dashboard"
                      element={
                        <BizProLayout>
                          <BizProDashboardPage />
                        </BizProLayout>
                      }
                    />
                    <Route
                      path="/bizpro/leads"
                      element={
                        <BizProLayout>
                          <BizProLeadsPage />
                        </BizProLayout>
                      }
                    />
                    <Route
                      path="/bizpro/clients"
                      element={
                        <BizProLayout>
                          <BizProClientsPage />
                        </BizProLayout>
                      }
                    />
                    <Route
                      path="/bizpro/communication"
                      element={
                        <BizProLayout>
                          <BizProCommunicationPage />
                        </BizProLayout>
                      }
                    />
                    <Route
                      path="/bizpro/marketing"
                      element={
                        <BizProLayout>
                          <BizProAiMarketingPage />
                        </BizProLayout>
                      }
                    />
                    <Route
                      path="/bizpro/services"
                      element={
                        <BizProLayout>
                          <BizProServicesPage />
                        </BizProLayout>
                      }
                    />
                    <Route
                      path="/bizpro/commissions"
                      element={
                        <BizProLayout>
                          <BizProCommissionsPage />
                        </BizProLayout>
                      }
                    />
                    <Route
                      path="/bizpro/rank"
                      element={
                        <BizProLayout>
                          <BizProRankPage />
                        </BizProLayout>
                      }
                    />
                    <Route
                      path="/bizpro/scoreboard"
                      element={
                        <BizProLayout>
                          <BizProScoreboardPage />
                        </BizProLayout>
                      }
                    />
                    <Route
                      path="/bizpro/training"
                      element={
                        <BizProLayout>
                          <BizProTrainingPage />
                        </BizProLayout>
                      }
                    />
                    <Route
                      path="/bizpro/territory"
                      element={
                        <BizProLayout>
                          <BizProTerritoryPage />
                        </BizProLayout>
                      }
                    />
                    <Route
                      path="/bizpro/branding"
                      element={
                        <BizProLayout>
                          <BizProBrandingPage />
                        </BizProLayout>
                      }
                    />
                    <Route
                      path="/bizpro/support"
                      element={
                        <BizProLayout>
                          <BizProSupportPage />
                        </BizProLayout>
                      }
                    />
                    <Route
                      path="/bizpro/subscription"
                      element={
                        <BizProLayout>
                          <BizProSubscriptionPage />
                        </BizProLayout>
                      }
                    />

                    {/* Rank 4+ Leadership Extra Menus */}
                    <Route
                      path="/bizpro/team"
                      element={
                        <BizProLayout>
                          <BizProTeamPage />
                        </BizProLayout>
                      }
                    />
                    <Route
                      path="/bizpro/team-commissions"
                      element={
                        <BizProLayout>
                          <BizProTeamCommissionsPage />
                        </BizProLayout>
                      }
                    />
                    <Route
                      path="/bizpro/recruit"
                      element={
                        <BizProLayout>
                          <BizProRecruitPage />
                        </BizProLayout>
                      }
                    />
                    <Route
                      path="/bizpro/team-scoreboard"
                      element={
                        <BizProLayout>
                          <BizProTeamScoreboardPage />
                        </BizProLayout>
                      }
                    />
                    <Route
                      path="/bizpro/territory-assignment"
                      element={
                        <BizProLayout>
                          <BizProTerritoryAssignmentPage />
                        </BizProLayout>
                      }
                    />
                    <Route
                      path="/bizpro/team-reports"
                      element={
                        <BizProLayout>
                          <BizProTeamReportsPage />
                        </BizProLayout>
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
                </Suspense>
              </BrowserRouter>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}
