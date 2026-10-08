import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/hooks/useTheme'
import { AuthProvider, useAuth } from '@/hooks/useAuth'
import { PermissionProvider } from '@/lib/rbac/PermissionContext'
import { ToastProvider } from '@/components/ui/Toast'
import { RoleGuard } from '@/components/auth/RoleGuard'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { PublicOnlyRoute } from '@/components/auth/PublicOnlyRoute'
import { Forbidden403Page } from '@/pages/portal/Forbidden403Page'

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

// Client Portal Pages
import { EboxPage } from '@/pages/portal/EboxPage'
import { PortalDashboardPage } from '@/pages/portal/PortalDashboardPage'
import { CapitalFacilitiesPage } from '@/pages/portal/CapitalFacilitiesPage'
import { AdvisoryConsultingPage } from '@/pages/portal/AdvisoryConsultingPage'
import { DocumentsPage } from '@/pages/portal/DocumentsPage'
import { SettingsPage } from '@/pages/portal/SettingsPage'
import { ClientDashboardPage } from '@/pages/portal/client/ClientDashboardPage'
import { ClientOrdersPage } from '@/pages/portal/client/ClientOrdersPage'
import { ClientFundingStatusPage } from '@/pages/portal/client/ClientFundingStatusPage'
import { ClientDocumentsAreaPage } from '@/pages/portal/client/ClientDocumentsAreaPage'
import { ClientCoachMessagesPage } from '@/pages/portal/client/ClientCoachMessagesPage'
import { ClientPaymentsInvoicesPage } from '@/pages/portal/client/ClientPaymentsInvoicesPage'
import { ClientBookCoachPage } from '@/pages/portal/client/ClientBookCoachPage'
import { ClientSupportPage } from '@/pages/portal/client/ClientSupportPage'

// Affiliate Portal Pages
import { AffiliateDashboardPage } from '@/pages/portal/affiliate/AffiliateDashboardPage'
import { AffiliateLinksPage } from '@/pages/portal/affiliate/AffiliateLinksPage'
import { AffiliateSubmitLeadPage } from '@/pages/portal/affiliate/AffiliateSubmitLeadPage'
import { AffiliateReferralsPage } from '@/pages/portal/affiliate/AffiliateReferralsPage'
import { AffiliatePayoutsPage } from '@/pages/portal/affiliate/AffiliatePayoutsPage'
import { AffiliateMarketingPage } from '@/pages/portal/affiliate/AffiliateMarketingPage'
import { AffiliateProfilePage } from '@/pages/portal/affiliate/AffiliateProfilePage'

// Gamified Bulletin Scoreboard & Territory Management Pages
import { BulletinScoreboardPage } from '@/pages/portal/BulletinScoreboardPage'
import { TerritoryManagementPage } from '@/pages/portal/TerritoryManagementPage'

// Biz Pro CRM Pages
import { BizProDashboardPage } from '@/pages/portal/bizpro/BizProDashboardPage'
import { BizProLeadsPage } from '@/pages/portal/bizpro/BizProLeadsPage'
import { BizProClientsPage } from '@/pages/portal/bizpro/BizProClientsPage'
import { BizProCommunicationPage } from '@/pages/portal/bizpro/BizProCommunicationPage'
import { BizProMarketingPage } from '@/pages/portal/bizpro/BizProMarketingPage'
import { BizProCatalogPage } from '@/pages/portal/bizpro/BizProCatalogPage'
import { BizProCommissionsPage } from '@/pages/portal/bizpro/BizProCommissionsPage'
import { BizProRankPage } from '@/pages/portal/bizpro/BizProRankPage'
import { BizProScoreboardPage } from '@/pages/portal/bizpro/BizProScoreboardPage'
import { BizProTrainingPage } from '@/pages/portal/bizpro/BizProTrainingPage'
import { BizProTerritoryPage } from '@/pages/portal/bizpro/BizProTerritoryPage'
import { BizProBrandingPage } from '@/pages/portal/bizpro/BizProBrandingPage'
import { BizProSupportPage } from '@/pages/portal/bizpro/BizProSupportPage'
import { BizProSubscriptionPage } from '@/pages/portal/bizpro/BizProSubscriptionPage'
import { BizProTeamPage } from '@/pages/portal/bizpro/BizProTeamPage'

// Super Admin Pages
import { AdminOverviewPage } from '@/pages/portal/admin/AdminOverviewPage'
import { AdminBizProManagementPage } from '@/pages/portal/admin/AdminBizProManagementPage'
import { AdminRankRulesPage } from '@/pages/portal/admin/AdminRankRulesPage'
import { AdminCommissionMakerPage } from '@/pages/portal/admin/AdminCommissionMakerPage'
import { AdminServicesInventoryPage } from '@/pages/portal/admin/AdminServicesInventoryPage'
import { AdminRolesPermissionsPage } from '@/pages/portal/admin/AdminRolesPermissionsPage'
import { AdminReportsAnalyticsPage } from '@/pages/portal/admin/AdminReportsAnalyticsPage'
import { AdminJobsModerationPage } from '@/pages/portal/admin/AdminJobsModerationPage'
import { AdminCmsEditorPage } from '@/pages/portal/admin/AdminCmsEditorPage'
import { AdminAffiliatesPage } from '@/pages/portal/admin/AdminAffiliatesPage'
import { AdminScoreboardSettingsPage } from '@/pages/portal/admin/AdminScoreboardSettingsPage'
import { AdminTrainingCmsPage } from '@/pages/portal/admin/AdminTrainingCmsPage'

// Job Board Pages
import { JobsHomePage } from '@/pages/marketing/JobsHomePage'
import { JobSearchResultsPage } from '@/pages/marketing/JobSearchResultsPage'
import { JobDetailPage } from '@/pages/marketing/JobDetailPage'

// Employer Portal Pages
import { EmployerDashboardPage } from '@/pages/portal/employer/EmployerDashboardPage'
import { EmployerPostJobPage } from '@/pages/portal/employer/EmployerPostJobPage'
import { EmployerMyJobsPage } from '@/pages/portal/employer/EmployerMyJobsPage'
import { EmployerApplicantsPage } from '@/pages/portal/employer/EmployerApplicantsPage'
import { EmployerProfileBillingPage } from '@/pages/portal/employer/EmployerProfileBillingPage'

// Job Seeker Portal Pages
import { JobSeekerDashboardPage } from '@/pages/portal/seeker/JobSeekerDashboardPage'
import { JobSeekerSearchJobsPage } from '@/pages/portal/seeker/JobSeekerSearchJobsPage'
import { JobSeekerSavedJobsPage } from '@/pages/portal/seeker/JobSeekerSavedJobsPage'
import { JobSeekerApplicationsPage } from '@/pages/portal/seeker/JobSeekerApplicationsPage'
import { JobSeekerProfilePage } from '@/pages/portal/seeker/JobSeekerProfilePage'
import { JobSeekerAlertsInboxPage } from '@/pages/portal/seeker/JobSeekerAlertsInboxPage'

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

// Dynamic Dashboard Router based on active user role
const DynamicDashboardRouter: React.FC = () => {
  const { user } = useAuth()
  if (user?.role === 'Admin') {
    return <AdminOverviewPage />
  }
  if (user?.role === 'Biz Pro') {
    return <BizProDashboardPage />
  }
  if (user?.role === 'Employer') {
    return <EmployerDashboardPage />
  }
  if (user?.role === 'Job Seeker') {
    return <JobSeekerApplicationsPage />
  }
  if (user?.role === 'Client') {
    return <ClientDashboardPage />
  }
  if (user?.role === 'Affiliate') {
    return <AffiliateDashboardPage />
  }
  return <PortalDashboardPage />
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <PermissionProvider>
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

                {/* Public Job Board Routes */}
                <Route
                  path="/jobs"
                  element={
                    <MarketingLayout>
                      <JobsHomePage />
                    </MarketingLayout>
                  }
                />
                <Route
                  path="/jobs/search"
                  element={
                    <MarketingLayout>
                      <JobSearchResultsPage />
                    </MarketingLayout>
                  }
                />
                <Route
                  path="/jobs/:id"
                  element={
                    <MarketingLayout>
                      <JobDetailPage />
                    </MarketingLayout>
                  }
                />

                {/* Design System Showcase */}
                <Route path="/design-system" element={<DesignSystemPage />} />

                {/* 2. Authentication Routes */}
                <Route
                  path="/portal/login"
                  element={
                    <PublicOnlyRoute>
                      <LoginPage />
                    </PublicOnlyRoute>
                  }
                />
                <Route
                  path="/portal/signup"
                  element={
                    <PublicOnlyRoute>
                      <SignupPage />
                    </PublicOnlyRoute>
                  }
                />
                <Route
                  path="/portal/forgot-password"
                  element={
                    <PublicOnlyRoute>
                      <ForgotPasswordPage />
                    </PublicOnlyRoute>
                  }
                />
                <Route
                  path="/portal/reset-password"
                  element={
                    <PublicOnlyRoute>
                      <ResetPasswordPage />
                    </PublicOnlyRoute>
                  }
                />
                <Route
                  path="/portal/otp-verification"
                  element={
                    <PublicOnlyRoute>
                      <OtpVerificationPage />
                    </PublicOnlyRoute>
                  }
                />

                {/* 3. Logged-in Portal Routes */}
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

                {/* GAMIFIED BULLETIN SALES SCOREBOARD PAGE */}
                <Route
                  path="/portal/scoreboard"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Client', 'Admin', 'Biz Pro', 'Affiliate', 'Employer', 'Job Seeker']}>
                        <BulletinScoreboardPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />

                {/* GAMIFIED TERRITORY MANAGEMENT PAGE */}
                <Route
                  path="/portal/territory"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Client', 'Admin', 'Biz Pro', 'Affiliate', 'Employer', 'Job Seeker']}>
                        <TerritoryManagementPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />

                {/* Dynamic Dashboard (Admin Overview, Biz Pro CRM or Client Scoreboard) */}
                <Route
                  path="/portal/dashboard"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Client', 'Admin', 'Biz Pro', 'Affiliate', 'Employer', 'Job Seeker']}>
                        <DynamicDashboardRouter />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />

                {/* ------------------------------------------------------------------ */}
                {/* SUPER ADMIN DASHBOARD ROUTES */}
                {/* ------------------------------------------------------------------ */}
                <Route
                  path="/portal/admin/dashboard"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Admin']}>
                        <AdminOverviewPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/admin/bizpro"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Admin']}>
                        <AdminBizProManagementPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/admin/rank-rules"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Admin']}>
                        <AdminRankRulesPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/admin/commission-maker"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Admin']}>
                        <AdminCommissionMakerPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/admin/services"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Admin']}>
                        <AdminServicesInventoryPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/admin/subscriptions"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Admin']}>
                        <AdminBizProManagementPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/admin/leads"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Admin']}>
                        <BizProLeadsPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/admin/scoreboard-settings"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Admin']}>
                        <AdminScoreboardSettingsPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/admin/jobs-moderation"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Admin']}>
                        <AdminJobsModerationPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/admin/affiliates"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Admin']}>
                        <AdminAffiliatesPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/admin/cms"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Admin']}>
                        <AdminCmsEditorPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/admin/training-cms"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Admin']}>
                        <AdminTrainingCmsPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/admin/roles-permissions"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Admin']}>
                        <AdminRolesPermissionsPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/admin/reports"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Admin']}>
                        <AdminReportsAnalyticsPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />

                {/* ------------------------------------------------------------------ */}
                {/* CLIENT PORTAL ROUTES */}
                {/* ------------------------------------------------------------------ */}
                <Route
                  path="/portal/client/dashboard"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Client', 'Admin']}>
                        <ClientDashboardPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/client/orders"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Client', 'Admin']}>
                        <ClientOrdersPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/client/funding-status"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Client', 'Admin']}>
                        <ClientFundingStatusPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/client/documents"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Client', 'Admin']}>
                        <ClientDocumentsAreaPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/client/messages"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Client', 'Admin']}>
                        <ClientCoachMessagesPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/client/invoices"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Client', 'Admin']}>
                        <ClientPaymentsInvoicesPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/client/book-coach"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Client', 'Admin']}>
                        <ClientBookCoachPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/client/support"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Client', 'Admin']}>
                        <ClientSupportPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />

                {/* ------------------------------------------------------------------ */}
                {/* AFFILIATE PORTAL ROUTES */}
                {/* ------------------------------------------------------------------ */}
                <Route
                  path="/portal/affiliate/dashboard"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Affiliate', 'Admin']}>
                        <AffiliateDashboardPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/affiliate/links"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Affiliate', 'Admin']}>
                        <AffiliateLinksPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/affiliate/submit-lead"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Affiliate', 'Admin']}>
                        <AffiliateSubmitLeadPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/affiliate/referrals"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Affiliate', 'Admin']}>
                        <AffiliateReferralsPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/affiliate/payouts"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Affiliate', 'Admin']}>
                        <AffiliatePayoutsPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/affiliate/marketing"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Affiliate', 'Admin']}>
                        <AffiliateMarketingPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/affiliate/profile"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Affiliate', 'Admin']}>
                        <AffiliateProfilePage />
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

                {/* Advisory & CFO */}
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

                {/* BIZ PRO ROUTES */}
                <Route
                  path="/portal/bizpro/dashboard"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                        <BizProDashboardPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/bizpro/leads"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                        <BizProLeadsPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/bizpro/clients"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                        <BizProClientsPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/bizpro/communication"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                        <BizProCommunicationPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/bizpro/marketing"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                        <BizProMarketingPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/bizpro/catalog"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                        <BizProCatalogPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/bizpro/commissions"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                        <BizProCommissionsPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/bizpro/rank"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                        <BizProRankPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/bizpro/training"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                        <BizProTrainingPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />

                {/* Employer Portal Routes */}
                <Route
                  path="/portal/employer/dashboard"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Employer', 'Admin']}>
                        <EmployerDashboardPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/employer/post-job"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Employer', 'Admin']}>
                        <EmployerPostJobPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/employer/jobs"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Employer', 'Admin']}>
                        <EmployerMyJobsPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/employer/applicants"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Employer', 'Admin']}>
                        <EmployerApplicantsPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/employer/profile"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Employer', 'Admin']}>
                        <EmployerProfileBillingPage defaultTab="profile" />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/employer/billing"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Employer', 'Admin']}>
                        <EmployerProfileBillingPage defaultTab="billing" />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/employer/messages"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Employer', 'Admin']}>
                        <EmployerProfileBillingPage defaultTab="messages" />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />

                {/* Job Seeker Portal Routes */}
                <Route
                  path="/portal/seeker/dashboard"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Job Seeker', 'Admin']}>
                        <JobSeekerDashboardPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/seeker/search"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Job Seeker', 'Admin']}>
                        <JobSeekerSearchJobsPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/seeker/saved"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Job Seeker', 'Admin']}>
                        <JobSeekerSavedJobsPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/seeker/applications"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Job Seeker', 'Admin']}>
                        <JobSeekerApplicationsPage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/seeker/profile"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Job Seeker', 'Admin']}>
                        <JobSeekerProfilePage />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/seeker/alerts"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Job Seeker', 'Admin']}>
                        <JobSeekerAlertsInboxPage defaultTab="alerts" />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />
                <Route
                  path="/portal/seeker/messages"
                  element={
                    <PortalLayout>
                      <RoleGuard allowedRoles={['Job Seeker', 'Admin']}>
                        <JobSeekerAlertsInboxPage defaultTab="messages" />
                      </RoleGuard>
                    </PortalLayout>
                  }
                />

                {/* 403 Forbidden Access Route */}
                <Route
                  path="/403"
                  element={
                    <PortalLayout>
                      <Forbidden403Page />
                    </PortalLayout>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </PermissionProvider>
      </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
