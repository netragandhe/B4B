# OAL Network — Small Business Solutions Platform

> **The Connection for Small Business Solutions**  
> A high-performance fintech & small business web platform with institutional capital access, fractional CFO advisory, and a complete Affiliate / Partner / Influencer portal.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Quick Start & Run Instructions](#quick-start--run-instructions)
3. [Portals & Features](#portals--features)
   - [Public Marketing Experience](#1-public-marketing-experience)
   - [Client Financial Terminal](#2-client-financial-terminal)
   - [Affiliate, Partner & Influencer Portal](#3-affiliate-partner--influencer-portal)
4. [Architecture & Folder Structure](#architecture--folder-structure)
5. [How to Customize](#how-to-customize)
   - [Change Brand Name & Company Info](#how-to-change-the-brand-name)
   - [Change Theme Colors & Tokens](#how-to-change-colors-and-theme)
   - [Modify Navigation Menus](#how-to-modify-navigation-menus)
6. [Dynamic Permissions & RBAC System](#dynamic-permissions--rbac-system)
   - [Data Model & Core Types](#data-model--core-types)
   - [Safety Rules & Security Invariants](#safety-rules--security-invariants)
   - [Admin Roles & Permissions Cockpit](#admin-roles--permissions-cockpit)
   - [How to Add a New Menu to the Catalog](#how-to-add-a-new-menu-to-the-catalog)
   - [How to Add a New Action](#how-to-add-a-new-action)
   - [How to Replace permissionService with a Real Backend](#how-to-replace-permissionservice-with-a-real-backend)
   - [Using <Can> and usePermission in Code](#using-can-and-usepermission-in-code)
7. [Swapping Mock Data for Real Backend APIs](#swapping-mock-data-for-real-backend-apis)
8. [Accessibility, Responsiveness & Performance](#accessibility-responsiveness--performance)

---

## Project Overview

OAL Network connects small businesses with:
- **16 Core Solutions**: Working capital loans, revolving credit, EIN business credit builder (Tiers 1–4), merchant POS systems, SBA business plans, fractional CFO treasury advisory, bookkeeping, and web design.
- **Client Financial Terminal**: Real-time financial scoreboard, liquidity runway analytics, capital line draws, consultation booking, and encrypted document vault.
- **Affiliate / Partner / Influencer Portal**: Complete turnkey portal for brokers, CPAs, affiliates, and digital creators to monetize business traffic with custom links, QR codes, lead intake forms, referral tracking tables, automated ACH direct deposit payouts, and marketing media kits.

Built with **React 19**, **Vite 8**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **TanStack Query v5**, and **Recharts**.

---

## Quick Start & Run Instructions

### Prerequisites
- Node.js `18.x` or higher
- npm `9.x` or higher

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) (or the port Vite outputs in your terminal) in your browser.

### 3. Production Build
```bash
npm run build
```
This runs TypeScript type checking (`tsc -b`) and bundles optimized, code-split chunks with Vite into the `/dist` directory.

### 4. Preview Production Build
```bash
npm run preview
```

### 5. Linting
```bash
npm run lint
```

---

## Portals & Features

### 1. Public Marketing Experience
- **Home Page (`/`)**: Hero section, trust badges, 16 core solutions grid, interactive revenue calculator, video testimonials, fractional CFO spotlight, and newsletter subscription.
- **Solutions Index & Detail (`/solutions` & `/solutions/:slug`)**: Filterable solution cards by category with dedicated detail pages, pricing tiers, FAQs, and step-by-step application flows.
- **Commercial Apply (`/apply`)**: Multi-step capital and solution intake application.
- **Careers & Jobs (`/jobs`)**: Job listings with filtering and application modal.
- **Advisory Bench (`/advisory`)**: Fractional CFO and managing director profiles with scheduling.
- **Global Search (`⌘K` / `Ctrl+K`)**: Instant modal search for solutions, pages, and partner tools.
- **AI Coach Widget**: Floating conversational assistant available across the application.

### 2. Client Financial Terminal (`/portal/*`)
- **Financial Scoreboard (`/portal/dashboard`)**: KPI metric cards (Pre-Approved Capital, Utilization, Runway, Health Score), trailing 7-month revenue/expenses Recharts chart, and rolling 13-week cash flow forecast.
- **Capital Facilities (`/portal/capital`)**: Revolving credit lines, equipment leases, and live capital draw wire modal.
- **Advisory & CFO (`/portal/advisory`)**: 1-on-1 strategy sessions, video conference links, and action item checklists.
- **Documents Vault (`/portal/documents`)**: Encrypted document upload repository for tax returns, P&L schedules, and bank feeds with verification badges.
- **Account Settings (`/portal/settings`)**: Company profile, password updates with 2FA/OTP verification, and notification preferences.

### 3. Affiliate, Partner & Influencer Portal (`/portal/affiliate/*`)
- **Partner Dashboard (`/portal/affiliate/dashboard`)**:
  - Live KPI cards: Total commissions earned, accrued balance ready for payout, clicks, leads, funded deals, conversion rate, and earnings per click (EPC).
  - Trailing performance area chart with Recharts.
  - Master referral link box with 1-click clipboard copy and QR code modal.
  - Top performing links widget and recent referral feed.
- **My Unique Links (`/portal/affiliate/links`)**:
  - Custom link generator with slug selection and campaign UTM tags (`oal.link/[slug]`).
  - Interactive SVG & PNG **QR Code Generator** with color customization, vector SVG download, and PNG export.
  - Per-link conversion tracking (clicks, leads, deals, revenue).
- **Direct Lead Intake Form (`/portal/affiliate/submit-lead`)**:
  - Underwriting fast-track form for commercial partners to route warm prospects directly.
  - Automated estimated commission calculation (0.5%–2.5%).
  - Non-circumvent protection and 48-hour SLA guarantee.
- **Referrals Pipeline Table (`/portal/affiliate/referrals`)**:
  - Searchable, filterable referrals table by status (`Lead In Review`, `Consultation Booked`, `Underwriting`, `Pre-Approved`, `Funded`, `Paid Out`).
  - Referral detail modal with client contact information, status timeline, and underwriting notes.
  - One-click CSV export of the entire referral database.
- **Commissions & Payouts (`/portal/affiliate/commissions`)**:
  - Accrued balance display with 1-click "Request Instant ACH Payout" modal.
  - Verified bank account details (Chase Business Premier ACH).
  - Bi-weekly payout schedule details and 25% Platinum bonus tier.
  - Payout history table with date, reference number, amount, status badge, and itemized PDF statement download.
- **Marketing Materials & Media Kit (`/portal/affiliate/marketing`)**:
  - Categorized creative library: Display Banners, Done-For-You Email Templates, Social Media Swipe Files, One-Pagers, Video Reels, and Official Brand Logos.
  - 1-click swipe copy modal for newsletters and social captions.
  - HTML responsive banner embed snippet generator.
- **Partner Profile & Settings (`/portal/affiliate/profile`)**:
  - Tier benefits status (Platinum VIP Partner with +25% bonus).
  - Custom master referral slug editor.
  - IRS Form W-9 verification status badge.
  - Notification switches (Lead progression emails, Payout receipts, Weekly executive digest, SMS alerts).

---

## Architecture & Folder Structure

```
d:\Kiaan Project\B4b\
├── public/                     # Static public assets
├── src/
│   ├── assets/                 # SVGs, icons, and static images
│   ├── components/
│   │   ├── ai/                 # GlobalAiChatWidget
│   │   ├── animations/         # PageTransition (Framer Motion)
│   │   ├── forms/              # CoachRequestModal, NewsletterForm
│   │   ├── navigation/         # CommandPaletteModal (⌘K)
│   │   ├── qr/                 # QrCodeGenerator (SVG/PNG matrix generator)
│   │   ├── seo/                # SEOHead (Dynamic meta tags & titles)
│   │   └── ui/                 # 30+ reusable design system components
│   │       ├── Button.tsx      # Multi-variant button with active:scale-[0.98]
│   │       ├── Card.tsx        # Bento, glass, and standard cards
│   │       ├── Badge.tsx       # Status badges (royal, emerald, gold, navy)
│   │       ├── DataTable.tsx   # Generic sortable, searchable data table
│   │       ├── EmptyState.tsx  # Customizable empty states with actions
│   │       ├── ErrorState.tsx  # Error cards with retry triggers
│   │       ├── FormField.tsx   # Accessible form wrappers with error/hint
│   │       ├── Modal.tsx       # Accessible dialog modal
│   │       ├── Skeleton.tsx    # Pulse loading skeleton primitives
│   │       └── PageLoadingFallback.tsx # Lazy route loading skeleton
│   ├── config/
│   │   ├── brand.ts            # Central brand configuration (name, phone, email)
│   │   └── BrandLogo.tsx       # Dynamic responsive SVG brand logo
│   ├── hooks/
│   │   ├── queries/            # TanStack React Query hooks
│   │   │   ├── useAffiliateData.ts # Metrics, links, leads, payouts, profile
│   │   │   └── useFintechData.ts   # Scoreboard, facilities, calendar, docs
│   │   ├── useAuth.tsx         # Multi-tenant authentication context
│   │   └── useTheme.tsx        # Dark / Light mode toggle & persistence
│   ├── layouts/
│   │   ├── MarketingLayout.tsx     # Public site navbar, search & 4-col footer
│   │   ├── PortalLayout.tsx        # Client Financial Terminal sidebar & header
│   │   └── AffiliatePortalLayout.tsx # Dedicated Partner & Influencer Hub layout
│   ├── lib/
│   │   └── utils.ts            # cn() class merger, formatCurrency()
│   ├── mock-data/
│   │   ├── affiliateData.ts    # Comprehensive partner metrics, links, referrals
│   │   ├── fintechData.ts      # Capital facilities, P&L, case studies
│   │   └── solutions.ts        # 16 Core Small Business Solutions
│   ├── pages/
│   │   ├── marketing/          # Public marketing pages
│   │   └── portal/
│   │       ├── affiliate/      # 7 Affiliate/Partner Portal pages
│   │       │   ├── AffiliateDashboardPage.tsx
│   │       │   ├── AffiliateLinksPage.tsx
│   │       │   ├── SubmitLeadPage.tsx
│   │       │   ├── ReferralsPage.tsx
│   │       │   ├── CommissionsPage.tsx
│   │       │   ├── MarketingMaterialsPage.tsx
│   │       │   └── PartnerProfilePage.tsx
│   │       ├── CapitalFacilitiesPage.tsx
│   │       ├── AdvisoryConsultingPage.tsx
│   │       ├── DocumentsPage.tsx
│   │       ├── PortalDashboardPage.tsx
│   │       ├── PortalLoginPage.tsx
│   │       └── SettingsPage.tsx
│   ├── services/
│   │   └── api/
│   │       ├── apiClient.ts        # Standard ApiResponse<T> simulation
│   │       ├── affiliateService.ts # Partner API methods
│   │       └── fintechService.ts   # Client Terminal API methods
│   ├── App.tsx                 # Route-level code-splitting with React.lazy
│   ├── index.css               # Design tokens, color palette, glassmorphism
│   └── main.tsx                # React root mount
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## How to Customize

### How to Change the Brand Name
All brand identity strings are centralized in **[`src/config/brand.ts`](file:///d:/Kiaan%20Project/B4b/src/config/brand.ts)**:
```typescript
export const brandConfig = {
  brandName: "OAL Network",
  shortName: "OAL",
  tagline: "The Connection for Small Business Solutions",
  description: "Bridging ambitious small businesses with institutional capital...",
  contactEmail: "advisory@oalnetwork.com",
  phone: "+1 (888) 540-OALN",
  headquarters: "Financial District, New York, NY",
  portalName: "OAL Client Terminal",
}
```
Updating this file will automatically update headers, footers, page titles, login screens, and meta tags throughout the entire application.

### How to Change Colors and Theme
All color tokens and CSS variables are defined in **[`src/index.css`](file:///d:/Kiaan%20Project/B4b/src/index.css)**:
```css
:root {
  /* Brand Primary: Royal Blue */
  --primary: #2563EB;
  --primary-hover: #1D4ED8;
  
  /* Brand Accent: Emerald Green */
  --accent: #10B981;
  --accent-hover: #059669;

  /* Scoreboard & Badges: Gold */
  --warning: #F59E0B;

  /* Navy Background Tones */
  --navy-900: #0A1628;
  --navy-800: #0D1E36;
  --navy-700: #12294A;
}
```
To change the brand palette (e.g. from Royal Blue to Violet or Crimson), simply change `--primary` and `--accent` in `:root` and `.dark`.

### How to Modify Navigation Menus
- **Public Navigation**: In [`src/layouts/MarketingLayout.tsx`](file:///d:/Kiaan%20Project/B4b/src/layouts/MarketingLayout.tsx), edit the `navLinks` array:
  ```typescript
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Solutions', href: '/solutions', badge: '16' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Affiliates', href: '/affiliates' },
    { name: 'Company', href: '/company' },
    { name: 'Contact', href: '/contact' },
  ]
  ```
- **Portal Navigation**: Controlled dynamically through the RBAC System without modifying any code. See below.

---

## Dynamic Permissions & RBAC System

The platform features an enterprise-grade, code-free **Role-Based Access Control (RBAC)** architecture that allows Administrators to configure portal menus, action permissions, data scopes, and custom roles directly from the `/portal/admin/roles-permissions` screen in real time.

### Data Model & Core Types

All core interfaces are defined in **[`src/lib/rbac/types.ts`](file:///d:/Kiaan%20Project/B4b/src/lib/rbac/types.ts)**:

```typescript
// 1. Menu Catalog Entry
export interface Menu {
  id: string              // e.g. 'affiliate-reports'
  label: string           // e.g. 'Reports & Analytics'
  icon: string            // Lucide icon name (e.g. 'BarChart3')
  route: string           // e.g. '/portal/affiliate/reports'
  module: ModuleGroup     // 'Dashboard' | 'Leads and Clients' | 'Commission and Rank' | ...
  group: string           // e.g. 'Analytics'
  parentId?: string       // Optional parent menu id
  order: number           // Sort order
  isCore?: boolean        // If true, menu cannot be disabled (e.g. Dashboard, Profile)
  isLeaderOnly?: boolean  // Biz Pro leader menu (requires minRank >= 4)
  minRank?: number        // Explicit minimum rank requirement
}

// 2. Permission Entry per (Role, Menu)
export interface PermissionItem {
  view: boolean           // Master visibility flag
  create: boolean         // Ability to create / add items
  edit: boolean           // Ability to edit / update items
  delete: boolean         // Ability to delete items (dangerous)
  approve: boolean        // Ability to approve requests / deals (dangerous)
  export: boolean         // Ability to export CSV/PDF (dangerous)
  scope: 'all' | 'team' | 'own' | 'none' // Data boundary
  minRank?: number        // Rank threshold for Biz Pro
}

// 3. Role Definition
export interface Role {
  id: string              // 'admin' | 'bizpro' | 'client' | 'affiliate' | 'employer' | 'jobseeker' | custom
  name: string            // Display name
  description: string     // Description
  isSystem: boolean       // System roles cannot be deleted
  status: 'active' | 'inactive'
  userCount?: number      // Current active user count
}
```

The master menu catalog (`MENU_CATALOG`) in **[`src/config/menuCatalog.ts`](file:///d:/Kiaan%20Project/B4b/src/config/menuCatalog.ts)** contains **68 comprehensive portal menus** covering:
- Admin (16 menus)
- Biz Pro (14 base menus + 6 leader menus)
- Client (8 menus)
- Affiliate (7 menus)
- Employer (7 menus)
- Job Seeker (6 menus)
- Shared Utilities (eBOX, Messages, Notifications, Profile, Settings)

Baseline defaults are stored in **[`src/config/defaultPermissions.ts`](file:///d:/Kiaan%20Project/B4b/src/config/defaultPermissions.ts)** for 1-click restoration.

---

### Safety Rules & Security Invariants

The permission engine enforces rigid safety invariants in both the backend store and UI controls:
1. **Admin Lockout Protection**: For the `admin` role, `admin-roles-permissions`, `admin-overview`, and `shared-settings` are permanently locked ON. They cannot be turned off, preventing accidental administrative lockouts.
2. **Core Menus**: Menus marked with `isCore: true` (e.g. Dashboard, Profile, Settings) cannot be removed from any role.
3. **Action-Requires-View Dependency**:
   - Turning `view` OFF automatically forces all actions (`create`, `edit`, `delete`, `approve`, `export`) to `false` and scope to `'none'`.
   - Turning ANY action ON automatically switches `view` to `true`.
4. **Scope Enforcing**: If an action is allowed but the scope is `'none'`, the system automatically denies access.
5. **System Roles Undeletable**: Default roles (`admin`, `bizpro`, `client`, `affiliate`, `employer`, `jobseeker`) cannot be deleted. Custom roles can only be deleted when their assigned user count is 0.
6. **Dangerous Action Flags**: Actions like `Delete`, `Approve`, and `Export` display amber shield warnings with confirmation prompts.
7. **Cross-Tab Synchronization**: All permission mutations broadcast an `rbac_permissions_updated` custom event and listen to the browser's `storage` event, instantly updating active sessions across tabs with a notification toast: *"Your access was updated"*.

---

### Admin Roles & Permissions Cockpit

Accessible at **`/portal/admin/roles-permissions`** (Admin only):
- **Role Selector & Management**: Role badges, user counts, **Add Role** modal, **Clone Role** modal, and **Delete Custom Role**.
- **Matrix Tab**:
  - Full catalog of menus grouped by module (`Dashboard`, `Leads & Clients`, `Commission & Rank`, `Territory`, `Jobs`, `Billing`, `Content`, `Reports`, `System`, `Shared`).
  - Search filter, enabled/disabled status toggle, and module-level "Select All" actions.
  - Granular controls: Show in Menu toggle, 6 action checkboxes, Scope dropdown (`All`, `Team`, `Own`, `None`), and Min Rank selector.
- **Compare Roles Tab**:
  - Side-by-side matrix comparing all roles across all 68 menus with inline toggle switches to quickly align permissions across departments.
- **Preview & Impersonation Tab**:
  - Live interactive preview of the desktop sidebar and mobile navigation bar that the selected role will receive.
  - **"Open portal as this role" Impersonation**: Generates a session impersonating the target role, complete with a sticky top exit banner (*"Viewing as [Role] — Exit"*) and audit log registration.
- **Audit Log Tab**:
  - Real-time immutable record of every permission adjustment: timestamp, admin name, target role, menu modified, old values, and new values, with date/role filtering and 1-click **Export CSV**.
- **Import / Export Matrix**:
  - 1-click JSON backup export and schema-validated JSON import.
- **Pending Changes Bar**:
  - Floating bottom bar with pending counter (`Changes pending: X`), **Discard**, **Reset to Role Default**, **Reset All**, and **Save Changes** with an itemized diff confirmation modal.

---

### User-Level Access Overrides

On the Biz Pro Management user drawer (**`/portal/admin/bizpro`**), admins can switch to the **"Custom Access"** tab to grant or revoke specific menus for an individual user without modifying their base role. Overridden items are flagged with a royal purple `User Override` badge and supercede the role baseline in real time.

---

### How to Add a New Menu to the Catalog

To add a new menu to any portal:
1. Open **[`src/config/menuCatalog.ts`](file:///d:/Kiaan%20Project/B4b/src/config/menuCatalog.ts)**.
2. Append a new `Menu` entry to `MENU_CATALOG`:
   ```typescript
   {
     id: 'bizpro-ai-contracts',
     label: 'AI Contract Review',
     icon: 'FileText',                       // Any valid Lucide icon name
     route: '/portal/bizpro/ai-contracts',
     module: 'Leads and Clients',            // Module category
     group: 'Smart Tools',                   // Sidebar group
     order: 15,
     isCore: false,                          // Set true only if core item
     minRank: 2,                             // Optional: Biz Pro rank threshold
   }
   ```
3. Open **[`src/config/defaultPermissions.ts`](file:///d:/Kiaan%20Project/B4b/src/config/defaultPermissions.ts)** and define default permissions for target roles:
   ```typescript
   // In defaultBizproPermissions:
   'bizpro-ai-contracts': {
     view: true,
     create: true,
     edit: false,
     delete: false,
     approve: false,
     export: true,
     scope: 'own',
     minRank: 2,
   }
   ```
4. The menu will immediately appear in the Admin Permission Matrix, role preview, command palette, and sidebars without any additional wiring.

---

### How to Add a New Action

If your application requires a new granular action (e.g. `publish` or `archive`):
1. In **[`src/lib/rbac/types.ts`](file:///d:/Kiaan%20Project/B4b/src/lib/rbac/types.ts)**:
   - Add the action to `PermissionAction`:
     ```typescript
     export type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'export' | 'publish'
     ```
   - Update `PermissionItem`:
     ```typescript
     export interface PermissionItem {
       // ...existing actions
       publish?: boolean
     }
     ```
2. In **[`src/lib/rbac/permissionService.ts`](file:///d:/Kiaan%20Project/B4b/src/lib/rbac/permissionService.ts)**:
   - Include `publish` in `enforceSafetyRules()`:
     ```typescript
     if (!cleanItem.view) {
       cleanItem.publish = false
     }
     if (cleanItem.publish) {
       cleanItem.view = true
     }
     ```
3. In **[`src/pages/portal/admin/AdminRolesPermissionsPage.tsx`](file:///d:/Kiaan%20Project/B4b/src/pages/portal/admin/AdminRolesPermissionsPage.tsx)**:
   - Add a checkbox column in the matrix table for `publish`.
4. In your UI components, use `<Can menuId="your-menu" action="publish">`.

---

### How to Replace permissionService with a Real Backend

[`src/lib/rbac/permissionService.ts`](file:///d:/Kiaan%20Project/B4b/src/lib/rbac/permissionService.ts) is the **single interface point** for all RBAC storage and mutations. Currently, it uses `localStorage` with mock network delays for demonstration.

To connect a production REST or GraphQL API:
1. Open **[`src/lib/rbac/permissionService.ts`](file:///d:/Kiaan%20Project/B4b/src/lib/rbac/permissionService.ts)**.
2. Replace local storage reads/writes with API calls:
   ```typescript
   // Fetch full matrix
   export async function getPermissions(): Promise<Record<string, Record<string, PermissionItem>>> {
     const res = await fetch('/api/v1/rbac/permissions', {
       headers: { Authorization: `Bearer ${getAuthToken()}` }
     })
     return res.json()
   }

   // Update single permission
   export async function updatePermission(
     roleId: RoleId,
     menuId: string,
     patch: Partial<PermissionItem>,
     adminUser = 'Current Admin'
   ): Promise<PermissionItem> {
     const res = await fetch(`/api/v1/rbac/permissions/${roleId}/${menuId}`, {
       method: 'PATCH',
       headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
       body: JSON.stringify({ patch, adminUser })
     })
     return res.json()
   }

   // Bulk save from the Admin matrix
   export async function bulkUpdate(
     roleId: RoleId,
     patches: Record<string, Partial<PermissionItem>>,
     adminUser = 'Current Admin'
   ): Promise<void> {
     await fetch(`/api/v1/rbac/permissions/${roleId}/bulk`, {
       method: 'PUT',
       headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
       body: JSON.stringify({ patches, adminUser })
     })
   }
   ```
3. The rest of the application (`PermissionContext`, `RoleGuard`, `<Can>`, sidebar navigation, mobile nav) will continue to work seamlessly without modifying a single line of component code.

---

### Using `<Can>` and `usePermission` in Code

#### 1. Button / Action Guarding with `<Can>`
Use `<Can>` to conditionally render or disable action buttons:
```tsx
import { Can } from '../../components/auth/Can'

// Option A: Hide completely if unauthorized
<Can menuId="bizpro-leads" action="create">
  <Button onClick={openCreateModal}>
    <Plus className="w-4 h-4 mr-2" /> Add Lead
  </Button>
</Can>

// Option B: Render disabled with explanatory tooltip
<Can 
  menuId="affiliate-payouts" 
  action="delete" 
  disableInstead 
  tooltip="You do not have permission to delete payout records."
>
  <Button variant="danger">
    Delete Transaction
  </Button>
</Can>
```

#### 2. Programmatic Permission Checks with `usePermission`
```tsx
import { usePermission } from '../../hooks/usePermission'

export function MyComponent() {
  const { can, scopeOf, canSeeMenu, getMenusForRole } = usePermission()

  // Check action permissions
  const canExport = can('bizpro-commission', 'export')
  
  // Check data scope ('all' | 'team' | 'own' | 'none')
  const userScope = scopeOf('bizpro-leads')
  
  // Filter queries based on scope
  useEffect(() => {
    if (userScope === 'all') fetchAllLeads()
    else if (userScope === 'team') fetchTeamLeads()
    else fetchMyLeads()
  }, [userScope])

  return (
    <div>
      {canExport && <ExportButton />}
    </div>
  )
}
```

#### 3. Route Guarding with `RoleGuard`
Every protected route is wrapped in `<RoleGuard>`:
```tsx
<Route
  path="/portal/affiliate/referrals"
  element={
    <RoleGuard menuId="affiliate-referrals">
      <AffiliateReferralsPage />
    </RoleGuard>
  }
/>
```
If an unauthorized user navigates directly to the URL, they are shown a branded `403 Forbidden` page with a *"Return to Dashboard"* action.

---

## Swapping Mock Data for Real Backend APIs

The codebase is built with an **API Service Layer Pattern** paired with **TanStack React Query**:

```
UI Component (e.g., AffiliateDashboardPage)
     ↓
Query Hook (e.g., useAffiliateMetrics)
     ↓
Service Layer (e.g., affiliateService.getMetrics)
     ↓
apiClient.ts (Mock or Real fetch / axios)
```

### Steps to Connect Real REST/GraphQL Endpoints:
1. Open **[`src/services/api/affiliateService.ts`](file:///d:/Kiaan%20Project/B4b/src/services/api/affiliateService.ts)**.
2. Replace `simulateApiCall` with standard `fetch` or `axios` calls:
   ```typescript
   // Before:
   async getMetrics(): Promise<ApiResponse<AffiliateMetrics>> {
     return simulateApiCall(() => ({ ...localMetrics }))
   }

   // After:
   async getMetrics(): Promise<ApiResponse<AffiliateMetrics>> {
     const response = await fetch('/api/v1/affiliate/metrics', {
       headers: { Authorization: `Bearer ${getAuthToken()}` }
     })
     return response.json()
   }
   ```
3. **No UI component or page code needs to be modified.** All caching, background revalidation, loading states, error handling, and optimistic mutations are automatically managed by TanStack Query!

---

## Accessibility, Responsiveness & Performance

### Accessibility (WCAG 2.1 AA)
- Form inputs have associated `<label>` tags with matching `htmlFor` and error `aria-describedby` messages.
- Color contrast exceeds WCAG AA 4.5:1 ratio across both light and dark themes.
- Interactive elements feature clear `focus-visible:ring-2` focus rings for keyboard navigation.
- Screen-reader labels (`aria-label`) on icon-only buttons.

### Responsiveness
Tested across critical breakpoints:
- **360px (Mobile)**: Drawer menus, single-column flex/grid layouts, horizontal table scrolling, touch targets (`min-h-[40px]`).
- **768px (Tablet)**: Two-column grid layouts, condensed headers.
- **1280px (Desktop)**: Fixed 72px sidebars, full bento grids, composite charts.
- **1920px (Full HD / Ultrawide)**: Centered `max-w-7xl` content wrappers.

### Performance
- **Code-Splitting via `React.lazy()`**: Every marketing and portal route is loaded on demand.
- **Lightweight Bundles**: Average lazy route chunk size is under 15 kB.
- **Image Optimization**: WebP/JPG assets with `loading="lazy"`.
- **Vector Graphics**: Resolution-independent SVGs for logos and QR codes.

---

## License & Credits
© 2026 **OAL Network**. All rights reserved. Built for American Small Businesses.