# B4B AMERICA PLATFORM — ALL 6 DASHBOARDS API AUDIT
**Date:** 2026-11-03  
**Status:** Audit & Architecture Roadmap  
**Target:** 100% Real API & MySQL Integration

---

## 1. Executive Summary
The platform consists of **6 distinct role dashboards** and **33 MySQL tables** orchestrated via Prisma ORM. Currently, user authentication (`/api/v1/auth/login`) is connected to MySQL, but the internal dashboard screens rely on local mock datasets (`clientData.ts`, `adminFullData.ts`, `jobsBoardData.ts`, etc.). This audit maps all 6 dashboards to their required database entities and concrete API endpoints.

---

## 2. Dashboard Audit Matrix

### Dashboard 1: Admin Dashboard (`/portal/admin/*`)
| Page / Module | Features & Actions | Required API Endpoints | MySQL Tables | Integration Status |
| :--- | :--- | :--- | :--- | :--- |
| **Overview** (`AdminOverviewPage`) | Platform KPIs, quick stats, active users | `GET /api/v1/admin/stats` | `user`, `bizproprofile`, `lead`, `job` | 🟡 Endpoint drafted (`/dashboard/stats`), needs UI call |
| **BizPro Management** (`AdminBizProManagementPage`) | Verify, rank update, approve coach | `GET/PUT /api/v1/admin/bizpros` | `user`, `bizproprofile`, `rankrule` | 🔴 Mock Data |
| **Rank Rules** (`AdminRankRulesPage`) | Configure 9 levels, quotas, earnings | `GET/PUT /api/v1/admin/ranks` | `rankrule` | 🔴 Mock Data |
| **Commission Maker** (`AdminCommissionMakerPage`) | Commission split rules, matrices | `GET/POST /api/v1/admin/commissions` | `commissionrule`, `commissionledger` | 🔴 Mock Data |
| **Services Inventory** (`AdminServicesInventoryPage`) | Manage 16 services & products | `GET/POST/PUT /api/v1/admin/services` | `serviceproduct` | 🔴 Mock Data |
| **Subscriptions** (`AdminSubscriptionsPage`) | Plans, active memberships | `GET /api/v1/admin/subscriptions` | `subscription`, `subscriptionplan` | 🔴 Mock Data |
| **Jobs Moderation** (`AdminJobsModerationPage`) | Approve/reject posted jobs | `GET/PUT /api/v1/admin/jobs` | `job` | 🔴 Mock Data |
| **Affiliates** (`AdminAffiliatesPage`) | Approve affiliates, review payouts | `GET/PUT /api/v1/admin/affiliates` | `affiliateprofile`, `affiliatepayout` | 🔴 Mock Data |
| **Scoreboard Settings** (`AdminScoreboardSettingsPage`) | Point weighting, quarterly rules | `GET/PUT /api/v1/admin/scoreboard` | `scoreboardsetting`, `scoreboardentry` | 🔴 Mock Data |
| **CMS & Training** (`AdminCmsEditorPage`, `AdminTrainingCmsPage`) | Content edit, modules upload | `GET/POST /api/v1/admin/cms`, `/training` | `cmspage`, `trainingmodule` | 🔴 Mock Data |
| **Roles & Permissions** (`AdminRolesPermissionsPage`) | 18 modules matrix, toggling actions | `GET/PUT /api/v1/admin/roles-permissions`| `rolepermission` | 🔴 Mock Data |

---

### Dashboard 2: B4B Coach / BizPro Dashboard (`/portal/bizpro/*`)
| Page / Module | Features & Actions | Required API Endpoints | MySQL Tables | Integration Status |
| :--- | :--- | :--- | :--- | :--- |
| **Coach Overview** (`BizProDashboardPage`) | Volume, active leads, rank progress | `GET /api/v1/bizpro/dashboard` | `bizproprofile`, `lead`, `rankrule` | 🔴 Mock Data |
| **Leads** (`BizProLeadsPage`) | List leads, change status, add notes | `GET/POST/PUT /api/v1/bizpro/leads` | `lead` | 🔴 Mock Data |
| **Clients** (`BizProClientsPage`) | Assigned client files & status | `GET /api/v1/bizpro/clients` | `clientprofile`, `user` | 🔴 Mock Data |
| **Commissions** (`BizProCommissionsPage`) | Earned payouts, ledger records | `GET /api/v1/bizpro/commissions` | `commissionledger` | 🔴 Mock Data |
| **Rank** (`BizProRankPage`, `CoachRankPage`) | Current tier, next rank requirements | `GET /api/v1/bizpro/rank` | `rankrule`, `bizproprofile` | 🔴 Mock Data |
| **Scoreboard** (`BizProScoreboardPage`) | District leaderboard rankings | `GET /api/v1/bizpro/scoreboard` | `scoreboardentry`, `scoreboardsetting` | 🔴 Mock Data |
| **Territory** (`BizProTerritoryPage`) | District maps, claims, assignments | `GET /api/v1/bizpro/territory` | `territorydistrict`, `territorynote` | 🔴 Mock Data |
| **Catalog** (`BizProCatalogPage`) | Products to sell/recommend | `GET /api/v1/bizpro/catalog` | `serviceproduct` | 🔴 Mock Data |
| **Team** (`BizProTeamPage`) | Downline coaches (Rank >= 4) | `GET /api/v1/bizpro/team` | `bizproprofile` | 🔴 Mock Data |

---

### Dashboard 3: Client Dashboard (`/portal/client/*`)
| Page / Module | Features & Actions | Required API Endpoints | MySQL Tables | Integration Status |
| :--- | :--- | :--- | :--- | :--- |
| **Client Overview** (`ClientDashboardPage`) | Business Health (82/100), quick links | `GET /api/v1/client/dashboard` | `clientprofile`, `fundingapplication` | 🔴 Mock Data (`clientData.ts`) |
| **Funding Status** (`ClientFundingStatusPage`) | SBA loan application, checklist | `GET/POST /api/v1/client/funding` | `fundingapplication` | 🔴 Mock Data |
| **Orders & Services** (`ClientOrdersPage`) | Active advisory service requests | `GET/POST /api/v1/client/orders` | `serviceproduct`, `lead` | 🔴 Mock Data |
| **Invoices** (`ClientPaymentsInvoicesPage`) | View billing, pay invoices | `GET /api/v1/client/invoices` | `invoice` | 🔴 Mock Data |
| **Documents** (`ClientDocumentsAreaPage`) | P&L, Tax forms, Bank statements | `GET/POST /api/v1/client/documents` | `eboxdocument` | 🔴 Mock Data |
| **Book Coach** (`ClientBookCoachPage`) | Schedule 1-on-1 strategy sessions | `GET/POST /api/v1/client/coaching` | `clientprofile`, `bizproprofile` | 🔴 Mock Data |

---

### Dashboard 4: Affiliate Dashboard (`/portal/affiliate/*`)
| Page / Module | Features & Actions | Required API Endpoints | MySQL Tables | Integration Status |
| :--- | :--- | :--- | :--- | :--- |
| **Overview** (`AffiliateDashboardPage`) | Clicks, referrals, commissions | `GET /api/v1/affiliate/dashboard` | `affiliateprofile` | 🔴 Mock Data |
| **Referral Links** (`AffiliateLinksPage`) | Custom affiliate referral slug | `GET /api/v1/affiliate/links` | `affiliateprofile` | 🔴 Mock Data |
| **Submit Lead** (`AffiliateSubmitLeadPage`) | Direct client lead submission | `POST /api/v1/affiliate/leads` | `lead`, `affiliateprofile` | 🔴 Mock Data |
| **Referrals** (`AffiliateReferralsPage`) | Converted leads and status tracking | `GET /api/v1/affiliate/referrals` | `lead` | 🔴 Mock Data |
| **Payouts** (`AffiliatePayoutsPage`) | Scheduled and paid payouts | `GET /api/v1/affiliate/payouts` | `affiliatepayout` | 🔴 Mock Data |

---

### Dashboard 5: Employer Dashboard (`/portal/employer/*`)
| Page / Module | Features & Actions | Required API Endpoints | MySQL Tables | Integration Status |
| :--- | :--- | :--- | :--- | :--- |
| **Overview** (`EmployerDashboardPage`) | Active job posts, total applicants | `GET /api/v1/employer/dashboard` | `employerprofile`, `job` | 🔴 Mock Data |
| **Post Job** (`EmployerPostJobPage`) | Create new job vacancy | `POST /api/v1/employer/jobs` | `job` | 🔴 Mock Data |
| **My Jobs** (`EmployerMyJobsPage`) | Manage active, draft, closed jobs | `GET/PUT /api/v1/employer/jobs` | `job` | 🔴 Mock Data |
| **Applicants** (`EmployerApplicantsPage`) | Review applicant CVs, update status | `GET/PUT /api/v1/employer/applicants` | `jobapplication`, `jobseekerprofile`| 🔴 Mock Data |

---

### Dashboard 6: Job Seeker Dashboard (`/portal/seeker/*`)
| Page / Module | Features & Actions | Required API Endpoints | MySQL Tables | Integration Status |
| :--- | :--- | :--- | :--- | :--- |
| **Overview** (`JobSeekerDashboardPage`) | Submitted applications, saved jobs | `GET /api/v1/seeker/dashboard` | `jobseekerprofile`, `jobapplication`| 🔴 Mock Data |
| **Job Search** (`JobSeekerSearchJobsPage`) | Filter published jobs by tag/city | `GET /api/v1/seeker/jobs` | `job` | 🔴 Mock Data |
| **Applications** (`JobSeekerApplicationsPage`)| Track review / interview status | `GET /api/v1/seeker/applications` | `jobapplication`, `job` | 🔴 Mock Data |
| **Profile** (`JobSeekerProfilePage`) | Resume, skills, portfolio | `GET/PUT /api/v1/seeker/profile` | `jobseekerprofile`, `user` | 🔴 Mock Data |

---

## 3. Implementation Plan
1. **Module Routes & Controllers:** Construct dedicated routers in `backend/src/modules/` for:
   - `admin.routes.ts`
   - `bizpro.routes.ts`
   - `client.routes.ts`
   - `affiliate.routes.ts`
   - `employer.routes.ts`
   - `seeker.routes.ts`
2. **Frontend Service Bridge:** Update corresponding frontend services in `frontend/src/lib/services/` to call `apiRequest()` instead of returning static arrays.
3. **Automated Verification:** Test data flow across all 6 dashboards with verified 200 HTTP responses.

