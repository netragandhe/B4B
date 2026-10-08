# B4B America — Small Business Solutions & Capital Platform

> **The Connection for Small Business Solutions**  
> A high-performance small business & fintech web platform with institutional capital access, fractional CFO advisory, B2B sales CRM, job board, and complete 6-role enterprise portal.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Branding & Design Tokens](#branding--design-tokens)
3. [Quick Start & Run Instructions](#quick-start--run-instructions)
4. [Portals & Features](#portals--features)
   - [Public Marketing Experience](#1-public-marketing-experience)
   - [Client Financial Terminal](#2-client-financial-terminal)
   - [Affiliate, Partner & Influencer Portal](#3-affiliate-partner--influencer-portal)
4. [Architecture & Folder Structure](#architecture--folder-structure)
5. [How to Customize](#how-to-customize)
   - [Change Brand Name & Company Info](#how-to-change-the-brand-name)
   - [Change Theme Colors & Tokens](#how-to-change-colors-and-theme)
   - [Modify Navigation Menus](#how-to-modify-navigation-menus)
6. [Swapping Mock Data for Real Backend APIs](#swapping-mock-data-for-real-backend-apis)
7. [Accessibility, Responsiveness & Performance](#accessibility-responsiveness--performance)

---

## Project Overview

OAL Network connects small businesses with:
- **16 Core Solutions**: Working capital loans, revolving credit, EIN business credit builder (Tiers 1–4), merchant POS systems, SBA business plans, fractional CFO treasury advisory, bookkeeping, and web design.
- **Client Financial Terminal**: Real-time financial scoreboard, liquidity runway analytics, capital line draws, consultation booking, and encrypted document vault.
- **Affiliate / Partner / Influencer Portal**: Complete turnkey portal for brokers, CPAs, affiliates, and digital creators to monetize business traffic with custom links, QR codes, lead intake forms, referral tracking tables, automated ACH direct deposit payouts, and marketing media kits.

Built with **React 19**, **Vite 8**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **TanStack Query v5**, and **Recharts**.

---

## Branding & Design Tokens

### Logo Assets (`public/brand/`)
* **`logo-full.png` / `logo-full.svg`**: USA Map + B4B + AMERICA. Used for Hero, Login side panels, Footers, and PDF Exports.
* **`logo-wordmark.svg` / `logo-wordmark-dark.svg`**: B4B + AMERICA (no map). Used for Sticky Header Navbar & Expanded Portal Sidebar.
* **`logo-icon.svg`**: B4B square badge. Used for Collapsed Sidebar, Favicon, Mobile Top Bar, and PWA icons.

### Brand Color Tokens (`src/index.css`)
* **Primary Blue**: `#0A3D9C` (`--brand-blue-600`) — Primary buttons, main titles, dark text on yellow.
* **Dark Blue Surfaces**: `#072B6E` (`--brand-blue-800`), `#051E4D` (`--brand-blue-900`) — Header, sidebar, and dark mode surfaces.
* **Light Blue Tints**: `#F0F4FC` (`--brand-blue-50`), `#E6EDFA` (`--brand-blue-100`) — Hover highlights, secondary badges.
* **Accent Yellow**: `#FFC800` (`--brand-yellow-500`) — Key CTAs, active highlights, scoreboard rankings.
* **Yellow Hover**: `#E6B400` (`--brand-yellow-600`) — Button hover & pressed states.

### Clear Space & Typography Rules
1. Maintain clear space around the logo equal to the height of the letter "B".
2. Never stretch or distort the logo aspect ratio.
3. Text on yellow background must **always be dark blue (`#0A3D9C`)**, never white, to guarantee WCAG AA contrast compliance.

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
- **Client Terminal Sidebar**: In [`src/layouts/PortalLayout.tsx`](file:///d:/Kiaan%20Project/B4b/src/layouts/PortalLayout.tsx), edit the `navItems` array.
- **Partner Hub Sidebar**: In [`src/layouts/AffiliatePortalLayout.tsx`](file:///d:/Kiaan%20Project/B4b/src/layouts/AffiliatePortalLayout.tsx), edit the `navItems` array.

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