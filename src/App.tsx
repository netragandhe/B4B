import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/hooks/useTheme'
import { AuthProvider, useAuth } from '@/hooks/useAuth'
import { PermissionProvider } from '@/lib/rbac/PermissionContext'
import { ToastProvider } from '@/components/ui/Toast'
import { RoleGuard } from '@/components/auth/RoleGuard'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { PublicOnlyRoute } from '@/components/auth/PublicOnlyRoute'
import { Skeleton } from '@/components/ui/Skeleton'

// Layouts
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { PortalLayout } from '@/layouts/PortalLayout'

// ============================================================================
// LAZY-LOADED PAGE COMPONENTS (Code Splitting for Optimal Bundle Performance)
// ============================================================================

// Marketing Pages
const HomePage = React.lazy(() => import('@/pages/marketing/HomePage').then((m) => ({ default: m.HomePage })))
const SolutionsPage = React.lazy(() => import('@/pages/marketing/SolutionsPage').then((m) => ({ default: m.SolutionsPage })))
const SolutionPage = React.lazy(() => import('@/pages/marketing/SolutionPage').then((m) => ({ default: m.SolutionPage })))
const AdvisoryPage = React.lazy(() => import('@/pages/marketing/AdvisoryPage').then((m) => ({ default: m.AdvisoryPage })))
const ApplyPage = React.lazy(() => import('@/pages/marketing/ApplyPage').then((m) => ({ default: m.ApplyPage })))
const CompanyPage = React.lazy(() => import('@/pages/marketing/CompanyPage').then((m) => ({ default: m.CompanyPage })))
const ContactPage = React.lazy(() => import('@/pages/marketing/ContactPage').then((m) => ({ default: m.ContactPage })))
const AffiliatesPage = React.lazy(() => import('@/pages/marketing/AffiliatesPage').then((m) => ({ default: m.AffiliatesPage })))
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

// Job Board Pages
const JobsHomePage = React.lazy(() => import('@/pages/marketing/JobsHomePage').then((m) => ({ default: m.JobsHomePage })))
const JobSearchResultsPage = React.lazy(() => import('@/pages/marketing/JobSearchResultsPage').then((m) => ({ default: m.JobSearchResultsPage })))
const JobsPage = React.lazy(() => import('@/pages/marketing/JobsPage').then((m) => ({ default: m.JobsPage })))
const JobDetailPage = React.lazy(() => import('@/pages/marketing/JobDetailPage').then((m) => ({ default: m.JobDetailPage })))

// Auth Pages
const LoginPage = React.lazy(() => import('@/pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })))
const SignupPage = React.lazy(() => import('@/pages/auth/SignupPage').then((m) => ({ default: m.SignupPage })))
const ForgotPasswordPage = React.lazy(() => import('@/pages/auth/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })))
const ResetPasswordPage = React.lazy(() => import('@/pages/auth/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })))
const OtpVerificationPage = React.lazy(() => import('@/pages/auth/OtpVerificationPage').then((m) => ({ default: m.OtpVerificationPage })))

// Shared Portal Pages
const EboxPage = React.lazy(() => import('@/pages/portal/EboxPage').then((m) => ({ default: m.EboxPage })))
const PortalDashboardPage = React.lazy(() => import('@/pages/portal/PortalDashboardPage').then((m) => ({ default: m.PortalDashboardPage })))
const CapitalFacilitiesPage = React.lazy(() => import('@/pages/portal/CapitalFacilitiesPage').then((m) => ({ default: m.CapitalFacilitiesPage })))
const AdvisoryConsultingPage = React.lazy(() => import('@/pages/portal/AdvisoryConsultingPage').then((m) => ({ default: m.AdvisoryConsultingPage })))
const DocumentsPage = React.lazy(() => import('@/pages/portal/DocumentsPage').then((m) => ({ default: m.DocumentsPage })))
const ProfilePage = React.lazy(() => import('@/pages/portal/ProfilePage').then((m) => ({ default: m.ProfilePage })))
const SettingsPage = React.lazy(() => import('@/pages/portal/SettingsPage').then((m) => ({ default: m.SettingsPage })))
const BulletinScoreboardPage = React.lazy(() => import('@/pages/portal/BulletinScoreboardPage').then((m) => ({ default: m.BulletinScoreboardPage })))
const TerritoryManagementPage = React.lazy(() => import('@/pages/portal/TerritoryManagementPage').then((m) => ({ default: m.TerritoryManagementPage })))
const Forbidden403Page = React.lazy(() => import('@/pages/portal/Forbidden403Page').then((m) => ({ default: m.Forbidden403Page })))
const DesignSystemPage = React.lazy(() => import('@/pages/DesignSystemPage').then((m) => ({ default: m.DesignSystemPage })))

// Biz Pro (B4B Coach) Pages
const BizProDashboardPage = React.lazy(() => import('@/pages/portal/bizpro/BizProDashboardPage').then((m) => ({ default: m.BizProDashboardPage })))
const BizProLeadsPage = React.lazy(() => import('@/pages/portal/bizpro/BizProLeadsPage').then((m) => ({ default: m.BizProLeadsPage })))
const BizProClientsPage = React.lazy(() => import('@/pages/portal/bizpro/BizProClientsPage').then((m) => ({ default: m.BizProClientsPage })))
const BizProCommunicationPage = React.lazy(() => import('@/pages/portal/bizpro/BizProCommunicationPage').then((m) => ({ default: m.BizProCommunicationPage })))
const BizProMarketingPage = React.lazy(() => import('@/pages/portal/bizpro/BizProMarketingPage').then((m) => ({ default: m.BizProMarketingPage })))
const BizProCatalogPage = React.lazy(() => import('@/pages/portal/bizpro/BizProCatalogPage').then((m) => ({ default: m.BizProCatalogPage })))
const BizProCommissionsPage = React.lazy(() => import('@/pages/portal/bizpro/BizProCommissionsPage').then((m) => ({ default: m.BizProCommissionsPage })))
const BizProRankPage = React.lazy(() => import('@/pages/portal/bizpro/BizProRankPage').then((m) => ({ default: m.BizProRankPage })))
const BizProScoreboardPage = React.lazy(() => import('@/pages/portal/bizpro/BizProScoreboardPage').then((m) => ({ default: m.BizProScoreboardPage })))
const BizProTrainingPage = React.lazy(() => import('@/pages/portal/bizpro/BizProTrainingPage').then((m) => ({ default: m.BizProTrainingPage })))
const BizProTerritoryPage = React.lazy(() => import('@/pages/portal/bizpro/BizProTerritoryPage').then((m) => ({ default: m.BizProTerritoryPage })))
const BizProBrandingPage = React.lazy(() => import('@/pages/portal/bizpro/BizProBrandingPage').then((m) => ({ default: m.BizProBrandingPage })))
const BizProSupportPage = React.lazy(() => import('@/pages/portal/bizpro/BizProSupportPage').then((m) => ({ default: m.BizProSupportPage })))
const BizProSubscriptionPage = React.lazy(() => import('@/pages/portal/bizpro/BizProSubscriptionPage').then((m) => ({ default: m.BizProSubscriptionPage })))
const BizProTeamPage = React.lazy(() => import('@/pages/portal/bizpro/BizProTeamPage').then((m) => ({ default: m.BizProTeamPage })))
const BizProBulletinPage = React.lazy(() => import('@/pages/portal/bizpro/BizProBulletinPage').then((m) => ({ default: m.BizProBulletinPage })))

// Super Admin Pages
const AdminOverviewPage = React.lazy(() => import('@/pages/portal/admin/AdminOverviewPage').then((m) => ({ default: m.AdminOverviewPage })))
const AdminBizProManagementPage = React.lazy(() => import('@/pages/portal/admin/AdminBizProManagementPage').then((m) => ({ default: m.AdminBizProManagementPage })))
const AdminRankRulesPage = React.lazy(() => import('@/pages/portal/admin/AdminRankRulesPage').then((m) => ({ default: m.AdminRankRulesPage })))
const AdminCommissionMakerPage = React.lazy(() => import('@/pages/portal/admin/AdminCommissionMakerPage').then((m) => ({ default: m.AdminCommissionMakerPage })))
const AdminServicesInventoryPage = React.lazy(() => import('@/pages/portal/admin/AdminServicesInventoryPage').then((m) => ({ default: m.AdminServicesInventoryPage })))
const AdminRolesPermissionsPage = React.lazy(() => import('@/pages/portal/admin/AdminRolesPermissionsPage').then((m) => ({ default: m.AdminRolesPermissionsPage })))
const AdminReportsAnalyticsPage = React.lazy(() => import('@/pages/portal/admin/AdminReportsAnalyticsPage').then((m) => ({ default: m.AdminReportsAnalyticsPage })))
const AdminJobsModerationPage = React.lazy(() => import('@/pages/portal/admin/AdminJobsModerationPage').then((m) => ({ default: m.AdminJobsModerationPage })))
const AdminCmsEditorPage = React.lazy(() => import('@/pages/portal/admin/AdminCmsEditorPage').then((m) => ({ default: m.AdminCmsEditorPage })))
const AdminAffiliatesPage = React.lazy(() => import('@/pages/portal/admin/AdminAffiliatesPage').then((m) => ({ default: m.AdminAffiliatesPage })))
const AdminScoreboardSettingsPage = React.lazy(() => import('@/pages/portal/admin/AdminScoreboardSettingsPage').then((m) => ({ default: m.AdminScoreboardSettingsPage })))
const AdminTrainingCmsPage = React.lazy(() => import('@/pages/portal/admin/AdminTrainingCmsPage').then((m) => ({ default: m.AdminTrainingCmsPage })))
const AdminBulletinPage = React.lazy(() => import('@/pages/portal/admin/AdminBulletinPage').then((m) => ({ default: m.AdminBulletinPage })))
const AdminSubscriptionsPage = React.lazy(() => import('@/pages/portal/admin/AdminSubscriptionsPage').then((m) => ({ default: m.AdminSubscriptionsPage })))

// Client Portal Pages
const ClientDashboardPage = React.lazy(() => import('@/pages/portal/client/ClientDashboardPage').then((m) => ({ default: m.ClientDashboardPage })))
const ClientOrdersPage = React.lazy(() => import('@/pages/portal/client/ClientOrdersPage').then((m) => ({ default: m.ClientOrdersPage })))
const ClientFundingStatusPage = React.lazy(() => import('@/pages/portal/client/ClientFundingStatusPage').then((m) => ({ default: m.ClientFundingStatusPage })))
const ClientDocumentsAreaPage = React.lazy(() => import('@/pages/portal/client/ClientDocumentsAreaPage').then((m) => ({ default: m.ClientDocumentsAreaPage })))
const ClientCoachMessagesPage = React.lazy(() => import('@/pages/portal/client/ClientCoachMessagesPage').then((m) => ({ default: m.ClientCoachMessagesPage })))
const ClientPaymentsInvoicesPage = React.lazy(() => import('@/pages/portal/client/ClientPaymentsInvoicesPage').then((m) => ({ default: m.ClientPaymentsInvoicesPage })))
const ClientBookCoachPage = React.lazy(() => import('@/pages/portal/client/ClientBookCoachPage').then((m) => ({ default: m.ClientBookCoachPage })))
const ClientSupportPage = React.lazy(() => import('@/pages/portal/client/ClientSupportPage').then((m) => ({ default: m.ClientSupportPage })))

// Affiliate Portal Pages
const AffiliateDashboardPage = React.lazy(() => import('@/pages/portal/affiliate/AffiliateDashboardPage').then((m) => ({ default: m.AffiliateDashboardPage })))
const AffiliateLinksPage = React.lazy(() => import('@/pages/portal/affiliate/AffiliateLinksPage').then((m) => ({ default: m.AffiliateLinksPage })))
const AffiliateSubmitLeadPage = React.lazy(() => import('@/pages/portal/affiliate/AffiliateSubmitLeadPage').then((m) => ({ default: m.AffiliateSubmitLeadPage })))
const AffiliateReferralsPage = React.lazy(() => import('@/pages/portal/affiliate/AffiliateReferralsPage').then((m) => ({ default: m.AffiliateReferralsPage })))
const AffiliatePayoutsPage = React.lazy(() => import('@/pages/portal/affiliate/AffiliatePayoutsPage').then((m) => ({ default: m.AffiliatePayoutsPage })))
const AffiliateMarketingPage = React.lazy(() => import('@/pages/portal/affiliate/AffiliateMarketingPage').then((m) => ({ default: m.AffiliateMarketingPage })))
const AffiliateProfilePage = React.lazy(() => import('@/pages/portal/affiliate/AffiliateProfilePage').then((m) => ({ default: m.AffiliateProfilePage })))

// Employer Portal Pages
const EmployerDashboardPage = React.lazy(() => import('@/pages/portal/employer/EmployerDashboardPage').then((m) => ({ default: m.EmployerDashboardPage })))
const EmployerPostJobPage = React.lazy(() => import('@/pages/portal/employer/EmployerPostJobPage').then((m) => ({ default: m.EmployerPostJobPage })))
const EmployerMyJobsPage = React.lazy(() => import('@/pages/portal/employer/EmployerMyJobsPage').then((m) => ({ default: m.EmployerMyJobsPage })))
const EmployerApplicantsPage = React.lazy(() => import('@/pages/portal/employer/EmployerApplicantsPage').then((m) => ({ default: m.EmployerApplicantsPage })))
const EmployerProfileBillingPage = React.lazy(() => import('@/pages/portal/employer/EmployerProfileBillingPage').then((m) => ({ default: m.EmployerProfileBillingPage })))

// Job Seeker Portal Pages
const JobSeekerDashboardPage = React.lazy(() => import('@/pages/portal/seeker/JobSeekerDashboardPage').then((m) => ({ default: m.JobSeekerDashboardPage })))
const JobSeekerSearchJobsPage = React.lazy(() => import('@/pages/portal/seeker/JobSeekerSearchJobsPage').then((m) => ({ default: m.JobSeekerSearchJobsPage })))
const JobSeekerSavedJobsPage = React.lazy(() => import('@/pages/portal/seeker/JobSeekerSavedJobsPage').then((m) => ({ default: m.JobSeekerSavedJobsPage })))
const JobSeekerApplicationsPage = React.lazy(() => import('@/pages/portal/seeker/JobSeekerApplicationsPage').then((m) => ({ default: m.JobSeekerApplicationsPage })))
const JobSeekerProfilePage = React.lazy(() => import('@/pages/portal/seeker/JobSeekerProfilePage').then((m) => ({ default: m.JobSeekerProfilePage })))
const JobSeekerAlertsInboxPage = React.lazy(() => import('@/pages/portal/seeker/JobSeekerAlertsInboxPage').then((m) => ({ default: m.JobSeekerAlertsInboxPage })))

// ============================================================================
// SUSPENSE FALLBACK LOADER
// ============================================================================
const PageLoadingFallback: React.FC = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-4 max-w-4xl mx-auto w-full animate-fadeIn">
    <div className="w-full space-y-3">
      <Skeleton className="h-10 w-1/3 rounded-xl" />
      <Skeleton className="h-4 w-2/3 rounded-lg" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-4">
      <Skeleton className="h-32 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
    </div>
    <div className="w-full pt-2">
      <Skeleton className="h-64 rounded-2xl" />
    </div>
  </div>
)

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
        <ToastProvider>
          <AuthProvider>
            <PermissionProvider>
              <BrowserRouter>
                <Suspense fallback={<PageLoadingFallback />}>
                  <Routes>
                    {/* ======================================================== */}
                    {/* 1. PUBLIC MARKETING WEBSITE ROUTES                       */}
                    {/* ======================================================== */}
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
                      path="/affiliates"
                      element={
                        <MarketingLayout>
                          <AffiliatesPage />
                        </MarketingLayout>
                      }
                    />

                    {/* ======================================================== */}
                    {/* PUBLIC JOB BOARD (SPECIFIC PATHS BEFORE PARAMETERIZED)   */}
                    {/* ======================================================== */}
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
                      path="/jobs/all"
                      element={
                        <MarketingLayout>
                          <JobsPage />
                        </MarketingLayout>
                      }
                    />
                    {/* Note for Dev 1: Future /jobs/post and /jobs/gigs routes will be added here before /jobs/:id */}
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

                    {/* ======================================================== */}
                    {/* 2. AUTHENTICATION ROUTES                                */}
                    {/* ======================================================== */}
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

                    {/* ======================================================== */}
                    {/* 3. LOGGED-IN PORTAL SHARED ROUTES                       */}
                    {/* ======================================================== */}
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
                          <RoleGuard allowedRoles={['Admin', 'Biz Pro', 'Client', 'Affiliate', 'Employer', 'Job Seeker']}>
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
                          <RoleGuard allowedRoles={['Admin', 'Biz Pro', 'Client', 'Affiliate', 'Employer', 'Job Seeker']}>
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

                    {/* Profile */}
                    <Route
                      path="/portal/profile"
                      element={
                        <PortalLayout>
                          <RoleGuard allowedRoles={['Client', 'Admin', 'Biz Pro', 'Employer', 'Affiliate', 'Job Seeker']}>
                            <ProfilePage />
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

                    {/* Territory */}
                    <Route
                      path="/portal/territory"
                      element={
                        <PortalLayout>
                          <RoleGuard allowedRoles={['Admin', 'Biz Pro']}>
                            <TerritoryManagementPage />
                          </RoleGuard>
                        </PortalLayout>
                      }
                    />

                    {/* ======================================================== */}
                    {/* 4. SUPER ADMIN PORTAL ROUTES                             */}
                    {/* ======================================================== */}
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
                      path="/portal/admin/territory"
                      element={
                        <PortalLayout>
                          <RoleGuard allowedRoles={['Admin']}>
                            <TerritoryManagementPage />
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
                            <AdminSubscriptionsPage />
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
                      path="/portal/admin/clients"
                      element={
                        <PortalLayout>
                          <RoleGuard allowedRoles={['Admin']}>
                            <BizProClientsPage />
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
                      path="/portal/admin/bulletin"
                      element={
                        <PortalLayout>
                          <RoleGuard allowedRoles={['Admin']}>
                            <AdminBulletinPage />
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

                    {/* ======================================================== */}
                    {/* 5. BIZ PRO (B4B COACH) PORTAL ROUTES                    */}
                    {/* ======================================================== */}
                    <Route
                      path="/portal/bizpro/bulletin"
                      element={
                        <PortalLayout>
                          <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                            <BizProBulletinPage />
                          </RoleGuard>
                        </PortalLayout>
                      }
                    />
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
                    <Route
                      path="/portal/bizpro/scoreboard"
                      element={
                        <PortalLayout>
                          <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                            <BizProScoreboardPage />
                          </RoleGuard>
                        </PortalLayout>
                      }
                    />
                    <Route
                      path="/portal/bizpro/territory"
                      element={
                        <PortalLayout>
                          <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                            <BizProTerritoryPage />
                          </RoleGuard>
                        </PortalLayout>
                      }
                    />
                    <Route
                      path="/portal/bizpro/branding"
                      element={
                        <PortalLayout>
                          <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                            <BizProBrandingPage />
                          </RoleGuard>
                        </PortalLayout>
                      }
                    />
                    <Route
                      path="/portal/bizpro/support"
                      element={
                        <PortalLayout>
                          <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                            <BizProSupportPage />
                          </RoleGuard>
                        </PortalLayout>
                      }
                    />
                    <Route
                      path="/portal/bizpro/subscription"
                      element={
                        <PortalLayout>
                          <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                            <BizProSubscriptionPage />
                          </RoleGuard>
                        </PortalLayout>
                      }
                    />
                    <Route
                      path="/portal/bizpro/team"
                      element={
                        <PortalLayout>
                          <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                            <BizProTeamPage />
                          </RoleGuard>
                        </PortalLayout>
                      }
                    />
                    <Route
                      path="/portal/bizpro/team-commissions"
                      element={
                        <PortalLayout>
                          <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                            <BizProCommissionsPage />
                          </RoleGuard>
                        </PortalLayout>
                      }
                    />
                    <Route
                      path="/portal/bizpro/recruit"
                      element={
                        <PortalLayout>
                          <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                            <BizProTeamPage />
                          </RoleGuard>
                        </PortalLayout>
                      }
                    />
                    <Route
                      path="/portal/bizpro/team-scoreboard"
                      element={
                        <PortalLayout>
                          <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                            <BizProScoreboardPage />
                          </RoleGuard>
                        </PortalLayout>
                      }
                    />
                    <Route
                      path="/portal/bizpro/territory-assignment"
                      element={
                        <PortalLayout>
                          <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                            <TerritoryManagementPage />
                          </RoleGuard>
                        </PortalLayout>
                      }
                    />
                    <Route
                      path="/portal/bizpro/team-reports"
                      element={
                        <PortalLayout>
                          <RoleGuard allowedRoles={['Biz Pro', 'Admin']}>
                            <AdminReportsAnalyticsPage />
                          </RoleGuard>
                        </PortalLayout>
                      }
                    />

                    {/* ======================================================== */}
                    {/* 6. CLIENT PORTAL ROUTES                                 */}
                    {/* ======================================================== */}
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

                    {/* ======================================================== */}
                    {/* 7. AFFILIATE PORTAL ROUTES                               */}
                    {/* ======================================================== */}
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
                      path="/portal/affiliate/commissions"
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

                    {/* ======================================================== */}
                    {/* 8. EMPLOYER PORTAL ROUTES                                */}
                    {/* ======================================================== */}
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

                    {/* ======================================================== */}
                    {/* 9. JOB SEEKER PORTAL ROUTES                              */}
                    {/* ======================================================== */}
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

                    {/* ======================================================== */}
                    {/* 10. ERROR & 404 CATCH-ALL ROUTES                         */}
                    {/* ======================================================== */}
                    <Route
                      path="/403"
                      element={
                        <PortalLayout>
                          <Forbidden403Page />
                        </PortalLayout>
                      }
                    />

                    {/* Proper 404 Page (inside MarketingLayout) instead of redirect */}
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
            </PermissionProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
