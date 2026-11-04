# B4B America — Developer 2 Portal Audit Report (`AUDIT-PORTAL.md`)

**Date:** 2026-10-10  
**Auditor:** Developer 2 (Portal Lead)  
**Target Scope:** Portal Routes, RBAC Permissions, Menu Mappings, Navigation & Session Continuity, Interactive Element Classification.  
**Constraint:** Audit ONLY. No production code changes made during this phase.

---

## 1. Route vs. Menu Mapping Audit

### A. Missing Routes (Menu Item exists, but NO Route in `App.tsx`)
| Menu ID | Menu Label | Target `href` / `route` | Defined In | Impact |
|---|---|---|---|---|
| `teamCommissions` | Team Commission | `/portal/bizpro/team-commissions` | `menus.ts` (L77), `menuCatalog.ts` (L396) | **404 / Broken Link:** Rank 4+ Biz Pro clicking menu item hits fallback redirect. |
| `recruit` | Recruit / Onboard | `/portal/bizpro/recruit` | `menus.ts` (L78), `menuCatalog.ts` (L411) | **404 / Broken Link:** Rank 4+ Biz Pro cannot access onboarding/recruiting portal. |
| `teamReports` | Team Reports | `/portal/bizpro/team-reports` | `menus.ts` (L81), `menuCatalog.ts` (L452) | **404 / Broken Link:** Rank 4+ Biz Pro cannot view downline volume reports. |
| `admin-clients` | Clients Directory | `/portal/admin/clients` | `menuCatalog.ts` (L117) | **Missing Admin Route:** Admin cannot access global client directory. |
| `admin-territory` | Territory Management | `/portal/admin/territory` | `menuCatalog.ts` (L71) | **Route Mismatch:** Admin menu expects `/portal/admin/territory`, route only exists at `/portal/territory`. |
| `affiliate-commissions` | Commissions & Payouts | `/portal/affiliate/commissions` | `menuCatalog.ts` (L619) | **Route Mismatch:** Menu Catalog uses `/portal/affiliate/commissions`, `App.tsx` has `/portal/affiliate/payouts`. |

### B. Missing Pages / Missing Client Features
| Feature / Page | Current State | Required Route | Root Cause |
|---|---|---|---|
| **B4B Bulletin** | **Missing:** Only `BulletinScoreboardPage.tsx` exists (which is only the scoreboard). No announcement feed, top performers widget, or pinned updates. | `/portal/bizpro/bulletin` (Coach landing) & `/portal/admin/bulletin` (Admin CMS) | `BizProBulletinPage.tsx` was never created. |
| **Admin Subscriptions** | **Wrong Component:** Route `/portal/admin/subscriptions` renders `<AdminBizProManagementPage />`. | `/portal/admin/subscriptions` | Copy-paste route element in `App.tsx` (L373). |

### C. Unrouted Marketing & Public Pages (Exist in filesystem, but NOT in `App.tsx`)
| File Path | Component | Intended Route |
|---|---|---|
| `src/pages/marketing/CompanyPage.tsx` | `CompanyPage` | `/company` |
| `src/pages/marketing/ContactPage.tsx` | `ContactPage` | `/contact` |
| `src/pages/marketing/AffiliatesPage.tsx` | `AffiliatesPage` | `/affiliates` |
| `src/pages/marketing/SolutionPage.tsx` | `SolutionPage` | `/solutions/:slug` |
| `src/pages/marketing/JobsPage.tsx` | `JobsPage` | `/jobs/all` |
| `src/pages/NotFoundPage.tsx` | `NotFoundPage` | Proper 404 handler (currently redirects `*` to `/`) |

### D. Pages Reachable Only by Direct URL (No Sidebar Menu Item)
- `/portal/capital` (`CapitalFacilitiesPage`)
- `/portal/advisory` (`AdvisoryConsultingPage`)
- `/portal/documents` (`DocumentsPage`)
- `/portal/profile` (`ProfilePage`) — accessible via top-right avatar dropdown only
- `/portal/settings` (`SettingsPage`) — accessible via top-right avatar dropdown only
- `/portal/bizpro/branding` (`BizProBrandingPage`) — omitted from `menus.ts` `baseKeys`
- `/portal/bizpro/support` (`BizProSupportPage`) — omitted from `menus.ts` `baseKeys`
- `/design-system` (`DesignSystemPage`)

---

## 2. Interactive Element Classification Matrix

Elements are classified into 4 categories:
1. **Real**: Fully functional and persists state across page refreshes (e.g. `localStorage`, token auth).
2. **Local**: Functional in UI but state is held only in memory (`useState`), reset upon page refresh.
3. **Toast-only**: Fires a `toast()` notification simulating success, but performs no state change or persistence.
4. **Dead**: No handler, `href="#"`, empty `onClick={() => {}}`, or unresponsive.

| Page | Element / Action | Classification | Source File & Location | Issue Description |
|---|---|---|---|---|
| `TerritoryManagementPage` | District Search & Filter | **Local** | `TerritoryManagementPage.tsx:47` | Memory-only filter. |
| `TerritoryManagementPage` | Edit Territory Notes (Save) | **Local** | `TerritoryManagementPage.tsx:66` | Updates `useState(regions)`, wiped on refresh. |
| `TerritoryManagementPage` | Reassign Senior VP Modal | **Local** | `TerritoryManagementPage.tsx:74` | Updates `useState(regions)`, wiped on refresh. |
| `TerritoryManagementPage` | Interactive Map | **Dead** | `TerritoryManagementPage.tsx:102` | Static card grid; no interactive map or D3 SVG. |
| `BizProClientsPage` | Client Search | **Local** | `BizProClientsPage.tsx:35` | Memory-only filter across 5 static records. |
| `BizProClientsPage` | Add Client Button | **Dead** | `BizProClientsPage.tsx` | Missing Add Client button and modal. |
| `BizProClientsPage` | Edit / Delete Client | **Dead** | `BizProClientsPage.tsx` | No edit or delete capability. |
| `BizProClientsPage` | Drawer: Assign CFO / Book Call | **Toast-only** | `BizProClientsPage.tsx:190` | Triggers toast, does not update client data. |
| `BizProClientsPage` | Drawer: Document Upload / Notes | **Dead** | `BizProClientsPage.tsx:210` | Static tabs without upload action. |
| `BizProSubscriptionPage` | Upgrade / Downgrade Plan | **Toast-only** | `BizProSubscriptionPage.tsx:95` | Shows modal with static tier, does not store choice. |
| `BizProSubscriptionPage` | Update Payment Method Form | **Toast-only** | `BizProSubscriptionPage.tsx:31` | Fires toast on submit, does not update card details. |
| `BizProSubscriptionPage` | Download Invoice PDF | **Dead** | `BizProSubscriptionPage.tsx:188` | No PDF generation (jspdf not hooked). |
| `AdminScoreboardSettingsPage` | Save Settings Button | **Toast-only** | `AdminScoreboardSettingsPage.tsx:18` | Displays toast; settings are NOT saved or applied. |
| `AdminScoreboardSettingsPage` | Reset Leaderboard Button | **Toast-only** | `AdminScoreboardSettingsPage.tsx:26` | Displays toast; does not archive or reset scoreboard. |
| `BulletinScoreboardPage` | Filters (Today/Week/Month/Year) | **Local** | `BulletinScoreboardPage.tsx:42` | Filter state in `useState`; scoreboard ignores settings. |
| `BulletinScoreboardPage` | TV Mode Fullscreen Toggle | **Local** | `BulletinScoreboardPage.tsx:78` | Local DOM fullscreen toggle. |
| `BizProLeadsPage` | Drag-and-Drop Stage Transition | **Local** | `BizProLeadsPage.tsx:120` | Updates `useState(leads)`, resets to default on refresh. |
| `BizProLeadsPage` | Add New Lead Form | **Local** | `BizProLeadsPage.tsx:145` | Appends to `useState`, lost on reload. |
| `BizProLeadsPage` | Export CSV Button | **Real** | `BizProLeadsPage.tsx:98` | Downloads generated CSV blob in browser. |
| `BizProMarketingPage` | Generate AI Sequence Form | **Local** | `BizProMarketingPage.tsx:64` | Generates prompt output in `useState`. |
| `BizProTrainingPage` | Video Module Complete Check | **Toast-only** | `BizProTrainingPage.tsx:82` | Shows toast; does not persist completed modules. |
| `BizProBrandingPage` | Save White-Label Domain Form | **Toast-only** | `BizProBrandingPage.tsx:54` | Shows toast; does not persist branding configs. |
| `SettingsPage` | Security: Change Password Form | **Toast-only** | `SettingsPage.tsx:85` | Shows toast without validating or changing password. |
| `SettingsPage` | Notification Preferences Form | **Toast-only** | `SettingsPage.tsx:112` | Shows toast; settings reset to default on refresh. |
| `AdminBizProManagementPage` | Suspend / Activate Coach | **Toast-only** | `AdminBizProManagementPage.tsx:142` | Shows toast; does not mutate user store. |
| `AdminServicesInventoryPage` | Add / Edit Service Modal | **Local** | `AdminServicesInventoryPage.tsx:110` | Mutates local array only. |
| `AdminRolesPermissionsPage` | Permission Matrix Save | **Real** | `AdminRolesPermissionsPage.tsx:90` | Persists dynamic RBAC matrix to `localStorage`. |
| `PortalLayout` | Mobile Navigation Drawer | **Real** | `PortalLayout.tsx:50` | Responsive layout toggle. |
| `PortalLayout` | Global Search Trigger (Ctrl+K) | **Real** | `PortalLayout.tsx:103` | Modal search filtering against dynamic catalog. |
| `PortalLayout` | Theme Toggle (Light / Dark) | **Real** | `PortalLayout.tsx:369` | Persists `theme` preference in `localStorage`. |

---

## 3. RBAC & Sidebar Permission Analysis (403 Risks)

1. **Auto-Switching Antipattern:**
   - In [`PortalLayout.tsx`](file:///d:/Kiaan%20Work/B4B/B4B/src/layouts/PortalLayout.tsx#L86-L100) and [`RoleGuard.tsx`](file:///d:/Kiaan%20Work/B4B/B4B/src/components/auth/RoleGuard.tsx#L30-L34), navigating to any role URL silently mutates the active user's role in `localStorage` via `switchRole()`.
   - **Critical Flaw:** A logged-in `Client` navigating to `/portal/admin/dashboard` is silently converted into an `Admin` rather than receiving a `403 Forbidden` response.
2. **Missing Module Permissions:**
   - In [`menus.ts`](file:///d:/Kiaan%20Work/B4B/B4B/src/config/menus.ts#L201-L203), menu items are filtered by `evalPermission(role, rankLevel, item.module, 'view', DEFAULT_PERMISSIONS)`.
   - If a Biz Pro has `rankLevel < 4`, leader items are omitted. However, direct navigation to `/portal/bizpro/team` is not prevented by `RoleGuard` unless `minBizProRank={4}` is explicitly enforced on that route in `App.tsx`.
3. **Roles Permitted on Scoreboard & Territory:**
   - In `App.tsx` (L284, L296), `/portal/scoreboard` and `/portal/territory` allow `Client`, `Affiliate`, `Employer`, and `Job Seeker` in `allowedRoles`, conflicting with the client document stating Territory and Scoreboard are specific to Coaches and Super Admin.

---

## 4. Website ↔ Portal Flow Audit (Breakdown Analysis)

### Root Cause Analysis:
1. **Absence of a "Marketing Website" Link in Portal Header:**
   - In [`PortalLayout.tsx`](file:///d:/Kiaan%20Work/B4B/B4B/src/layouts/PortalLayout.tsx), the brand logo in the top bar links directly to `/portal/dashboard`. There is no dedicated, visible link or button to navigate back to the marketing homepage (`/`).
2. **Loss of Portal Session State on Return:**
   - When a user navigates to the marketing website (e.g. by typing `/` or visiting a link), the marketing navbar ([`MarketingLayout.tsx:110-128`](file:///d:/Kiaan%20Work/B4B/B4B/src/layouts/MarketingLayout.tsx#L110-L128)) renders a `My Dashboard ({user.role})` button pointing strictly to `/portal/dashboard`.
   - It does not remember which deep page the user was on (e.g. `/portal/bizpro/clients` or `/portal/territory`).
3. **Mobile Marketing Drawer Navigation Bug:**
   - In [`MarketingLayout.tsx:184`](file:///d:/Kiaan%20Work/B4B/B4B/src/layouts/MarketingLayout.tsx#L184), the mobile drawer button is hardcoded to `navigate('/portal/login')`, completely ignoring whether `user` is already authenticated.
   - When clicked while logged in, the user hits `/portal/login` wrapped by `<PublicOnlyRoute>`.
4. **PublicOnlyRoute Redirection Discrepancy:**
   - In [`PublicOnlyRoute.tsx:18`](file:///d:/Kiaan%20Work/B4B/B4B/src/components/auth/PublicOnlyRoute.tsx#L18), `Job Seeker` is redirected to `/portal/seeker/applications` instead of `/portal/seeker/dashboard`.

---

## 5. Summary Counts & Priority Action Plan

### Element Classification Counts:
- **Real (Persistent / Operational):** 6 (17%)
- **Local (`useState` only / Lost on reload):** 9 (26%)
- **Toast-only (Simulated / Fake action):** 11 (31%)
- **Dead (Missing handlers / 404 targets):** 9 (26%)
- **Total Key Interactive Targets Audited:** 35

### Priority Ranking (What blocks the client most):
1. **P2 (Route Architecture & Lazy Loading):** Split `App.tsx` monolith (1.9MB bundle), route unlinked marketing pages, create proper 404 handler, and fix all missing menu route paths.
2. **P3 (Website ↔ Portal Session & Navigation):** Add "Marketing Website" link, preserve previous portal route in `sessionStorage`, fix mobile navbar login button, and disable silent role-switching.
3. **P4 ("B4B Coach" Brand Renaming):** Replace all visible "Biz Pro" user-facing terminology across menus, tables, badges, and headers with "B4B Coach".
4. **P5 (Shared Data Layer & Libraries):** Implement versioned `localStorage` store with reactive pub/sub, install TopoJSON/D3 map dependencies, jsPDF, and DOMPurify.
5. **P6 (B4B Bulletin):** Build `BizProBulletinPage` (first landing screen for Coaches) and `AdminBulletinPage` for managing announcements.
6. **P7 (Territory Management):** Replace static cards with real interactive D3 Federal Reserve map, district notes, and coach assignment persistence.
7. **P8 (Client Directory):** Rebuild Client Directory with CRUD operations, Zod validation modal, search/filter, and CSV export.
8. **P9 (Subscription & Billing):** Replace invented plans with client rank-tiered plans ($25/mo base), payment card form, and jsPDF invoice generator.
9. **P10 (Scoreboard & Settings):** Connect Admin Scoreboard Settings to live Scoreboard display with persistent metric weighting and period archiving.
