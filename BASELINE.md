# B4B America — Developer Baseline Documentation

## 1. Project Overview & Running Locally

The project is built on **React 19 + TypeScript + Vite 8 + Tailwind CSS 4 + React Router 7**, configured with `@/` path alias pointing to `src/`.

### Commands
- **Install Dependencies:**
  ```bash
  npm install
  ```
- **Run Local Development Server:**
  ```bash
  npm run dev
  ```
  Launches Vite development server on `http://localhost:5173`.

- **Production Build:**
  ```bash
  npm run build
  ```
  Executes TypeScript typecheck (`tsc -b`) and Vite bundle build (`vite build`).

- **Lint Codebase:**
  ```bash
  npm run lint
  ```
  Runs `oxlint src` with zero errors.

---

## 2. Demo User Accounts

All demo credentials use password: `Demo@1234`

| Role | Email | Name | Context / Details |
|---|---|---|---|
| **Admin** | `admin@demo.com` | Sarah Jenkins | Super Admin & VP of Operations (Platinum Tier) |
| **Biz Pro (B4B Coach)** | `bizpro@demo.com` | David Ross | District Sales Leader (Rank 4, District 7 - Chicago) |
| **Client** | `client@demo.com` | Marcus Vance | Apex Freight & Logistics LLC (Platinum Tier) |
| **Affiliate** | `affiliate@demo.com` | Elena Rostova | Senior Affiliate Partner (Apex Growth Influencer Network) |
| **Employer** | `employer@demo.com` | Robert Chen | Head of Talent & Operations (TechScale Innovations Inc) |
| **Job Seeker** | `jobseeker@demo.com` | Maya Lin | Senior B2B SaaS Account Executive (Growth Member) |
| **Pending Client** | `pending@demo.com` | Jordan Taylor | Managing Director (Taylor Capital Drafts - Pending status) |

---

## 3. Route List (`src/App.tsx`) Grouped by Role

### A. Public Website & Job Board
- `/` — Marketing Home (`HomePage`)
- `/solutions` — Solutions Listing (`SolutionsPage`)
- `/advisory` — Advisory & CFO Services (`AdvisoryPage`)
- `/apply` — Application Page (`ApplyPage`)
- `/jobs` — Job Board Home (`JobsHomePage`)
- `/jobs/search` — Job Search Results (`JobSearchResultsPage`)
- `/jobs/:id` — Job Detail Page (`JobDetailPage`)
- `/design-system` — UI Token Showcase (`DesignSystemPage`)

### B. Authentication Routes (`PublicOnlyRoute`)
- `/portal/login` — Login Screen (`LoginPage`)
- `/portal/signup` — Registration (`SignupPage`)
- `/portal/forgot-password` — Password Recovery (`ForgotPasswordPage`)
- `/portal/reset-password` — Password Reset (`ResetPasswordPage`)
- `/portal/otp-verification` — 2FA / OTP Verification (`OtpVerificationPage`)

### C. Shared Portal Routes (Accessible across authenticated roles)
- `/portal` — Redirects to `/portal/dashboard`
- `/portal/dashboard` — Role-based dynamic landing dashboard (`DynamicDashboardRouter`)
- `/portal/ebox` — Priority eBOX Document Storage (`EboxPage`)
- `/portal/scoreboard` — Gamified Bulletin Sales Scoreboard (`BulletinScoreboardPage`)
- `/portal/territory` — Gamified Territory Management (`TerritoryManagementPage`)
- `/portal/capital` — Capital Facilities & Liquidity Lines (`CapitalFacilitiesPage`)
- `/portal/advisory` — Advisory & Consulting Area (`AdvisoryConsultingPage`)
- `/portal/documents` — Documents & Filings Area (`DocumentsPage`)
- `/portal/profile` — User Profile (`ProfilePage`)
- `/portal/settings` — Account Settings & Preferences (`SettingsPage`)

### D. Super Admin Routes (`RoleGuard: Admin`)
- `/portal/admin/dashboard` — Super Admin Overview (`AdminOverviewPage`)
- `/portal/admin/bizpro` — Biz Pro Management (`AdminBizProManagementPage`)
- `/portal/admin/rank-rules` — Rank Rules Editor (`AdminRankRulesPage`)
- `/portal/admin/commission-maker` — Commission Structure (`AdminCommissionMakerPage`)
- `/portal/admin/services` — Services Inventory (`AdminServicesInventoryPage`)
- `/portal/admin/subscriptions` — Subscription Management (`AdminBizProManagementPage`)
- `/portal/admin/leads` — Lead Flow Admin (`BizProLeadsPage`)
- `/portal/admin/scoreboard-settings` — Scoreboard Settings & Rules (`AdminScoreboardSettingsPage`)
- `/portal/admin/jobs-moderation` — Job Posting Moderation (`AdminJobsModerationPage`)
- `/portal/admin/affiliates` — Affiliates Management (`AdminAffiliatesPage`)
- `/portal/admin/cms` — Marketing CMS Editor (`AdminCmsEditorPage`)
- `/portal/admin/training-cms` — Training Management (`AdminTrainingCmsPage`)
- `/portal/admin/roles-permissions` — RBAC & Matrix Permissions (`AdminRolesPermissionsPage`)
- `/portal/admin/reports` — Analytics & Executive Reports (`AdminReportsAnalyticsPage`)

### E. Biz Pro (B4B Coach) CRM Routes (`RoleGuard: Biz Pro, Admin`)
- `/portal/bizpro/dashboard` — Coach Performance Dashboard (`BizProDashboardPage`)
- `/portal/bizpro/leads` — Pipeline & Lead Manager (`BizProLeadsPage`)
- `/portal/bizpro/clients` — Client Directory (`BizProClientsPage`)
- `/portal/bizpro/communication` — Client & Team Communication (`BizProCommunicationPage`)
- `/portal/bizpro/marketing` — Marketing Toolkit & Assets (`BizProMarketingPage`)
- `/portal/bizpro/catalog` — Service & Product Catalog (`BizProCatalogPage`)
- `/portal/bizpro/commissions` — Commission Tracker & Payouts (`BizProCommissionsPage`)
- `/portal/bizpro/rank` — Career Level & Rank Progression (`BizProRankPage`)
- `/portal/bizpro/training` — Coach Academy & Courses (`BizProTrainingPage`)
- `/portal/bizpro/scoreboard` — Coach Leaderboard View (`BizProScoreboardPage`)
- `/portal/bizpro/territory` — District & Region Territory (`BizProTerritoryPage`)
- `/portal/bizpro/branding` — Personal Brand & Collateral (`BizProBrandingPage`)
- `/portal/bizpro/support` — Dedicated Coach Support (`BizProSupportPage`)
- `/portal/bizpro/subscription` — Subscription & Membership (`BizProSubscriptionPage`)
- `/portal/bizpro/team` — Downline / Team Management (`BizProTeamPage`)

### F. Client Portal Routes (`RoleGuard: Client, Admin`)
- `/portal/client/dashboard` — Client Dashboard (`ClientDashboardPage`)
- `/portal/client/orders` — Orders & Active Services (`ClientOrdersPage`)
- `/portal/client/funding-status` — Funding Application Tracker (`ClientFundingStatusPage`)
- `/portal/client/documents` — Secure Document Vault (`ClientDocumentsAreaPage`)
- `/portal/client/messages` — Coach Messages (`ClientCoachMessagesPage`)
- `/portal/client/invoices` — Billing & Invoices (`ClientPaymentsInvoicesPage`)
- `/portal/client/book-coach` — Session Scheduling (`ClientBookCoachPage`)
- `/portal/client/support` — Client Support Helpdesk (`ClientSupportPage`)

### G. Affiliate Portal Routes (`RoleGuard: Affiliate, Admin`)
- `/portal/affiliate/dashboard` — Affiliate Overview (`AffiliateDashboardPage`)
- `/portal/affiliate/links` — Referral Links & Tracking (`AffiliateLinksPage`)
- `/portal/affiliate/submit-lead` — Lead Submission Form (`AffiliateSubmitLeadPage`)
- `/portal/affiliate/referrals` — Referred Clients (`AffiliateReferralsPage`)
- `/portal/affiliate/payouts` — Commissions & Payout History (`AffiliatePayoutsPage`)
- `/portal/affiliate/marketing` — Marketing Banners & Swag (`AffiliateMarketingPage`)
- `/portal/affiliate/profile` — Partner Profile (`AffiliateProfilePage`)

### H. Employer Portal Routes (`RoleGuard: Employer, Admin`)
- `/portal/employer/dashboard` — Employer Overview (`EmployerDashboardPage`)
- `/portal/employer/post-job` — Post a Job Listing (`EmployerPostJobPage`)
- `/portal/employer/jobs` — My Posted Jobs (`EmployerMyJobsPage`)
- `/portal/employer/applicants` — Candidate Applications (`EmployerApplicantsPage`)
- `/portal/employer/profile` — Company Profile (`EmployerProfileBillingPage defaultTab="profile"`)
- `/portal/employer/billing` — Employer Billing (`EmployerProfileBillingPage defaultTab="billing"`)
- `/portal/employer/messages` — Candidate Communications (`EmployerProfileBillingPage defaultTab="messages"`)

### I. Job Seeker Portal Routes (`RoleGuard: Job Seeker, Admin`)
- `/portal/seeker/dashboard` — Seeker Overview (`JobSeekerDashboardPage`)
- `/portal/seeker/search` — Search Jobs (`JobSeekerSearchJobsPage`)
- `/portal/seeker/saved` — Saved Jobs (`JobSeekerSavedJobsPage`)
- `/portal/seeker/applications` — Active Applications (`JobSeekerApplicationsPage`)
- `/portal/seeker/profile` — Resume & Candidate Profile (`JobSeekerProfilePage`)
- `/portal/seeker/alerts` — Job Alerts (`JobSeekerAlertsInboxPage defaultTab="alerts"`)
- `/portal/seeker/messages` — Employer Messages (`JobSeekerAlertsInboxPage defaultTab="messages"`)

### J. System & Error Routes
- `/403` — Access Forbidden (`Forbidden403Page`)
- `*` — Catch-all redirect to `/`
