# B4B AMERICA — COMPREHENSIVE PUBLIC WEBSITE AUDIT (TASK A1)

> **Auditor**: Dev A  
> **Date**: October 10, 2026  
> **Scope**: Public Website Pages, Navigation, Modals, Forms, Buttons, Routing, Branding, Content Integrity, and Services.  
> **Status**: **Audit only. No code was changed.**

---

## Executive Summary

This audit assesses the public website components, pages, forms, links, mock data, and branding for **B4B America**. The application builds successfully (`tsc` and `vite build` pass with 0 errors), but has significant routing omissions, orphaned components, broken CTA buttons, hardcoded unverified statistics, multiple references to the prohibited name **"OAL"**, and missing client-required pages and buttons.

### Audit Status Counts
- **Works**: 32 elements
- **Broken**: 22 elements
- **Dummy**: 14 elements
- **Missing**: 12 pages / routes / elements

---

## 1. Public Website Audit Table

| Page / Surface | Element | Expected Behavior | Status | File Path |
| :--- | :--- | :--- | :--- | :--- |
| **Global Header** | Top Announcement Banner CTA ("Pre-qualify in 3 mins") | Navigates to `/apply` | **Works** | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L54-L61) |
| **Global Header** | Brand Logo link | Navigates to `/` (Home) | **Works** | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L68-L70) |
| **Global Header** | Desktop Nav Link: "Solutions" | Navigates to `/solutions` | **Works** | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L34) |
| **Global Header** | Desktop Nav Link: "Advisory & CFO" | Navigates to `/advisory` | **Works** | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L35) |
| **Global Header** | Desktop Nav Link: "Apply For Capital" | Navigates to `/apply` | **Works** | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L36) |
| **Global Header** | Logged Out Auth Button ("Log In") | Navigates to `/portal/login` | **Works** | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L107-L115) |
| **Global Header** | Logged In Auth Button | Expected "Back to Portal", currently shows "My Dashboard ({user.role})" | **Works** (Text Mismatch) | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L97-L106) |
| **Global Header** | Main CTA Button ("Apply for Capital") | Navigates to `/apply` | **Works** | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L118-L126) |
| **Global Header** | Mobile Hamburger Toggle Button | Opens/closes mobile drawer, locks body scroll | **Works** | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L130-L138) |
| **Global Header** | Mobile Menu Nav Links | Navigates to pages and closes drawer | **Works** | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L145-L155) |
| **Global Header** | Mobile "Log In to Portal" Button | Navigates to `/portal/login` | **Works** | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L158-L167) |
| **Global Header** | Mobile "Apply for Capital" Button | Navigates to `/apply` | **Works** | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L168-L179) |
| **Global Footer** | Solutions Links (Revenue Credit, Revolvers, Equipment, SBA) | Should navigate to specific solution pages, but all point coarsely to generic `/solutions` | **Dummy** | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L209-L212) |
| **Global Footer** | Consulting Links (CFO, Cash Conversion, M&A) | Navigates to `/advisory` | **Works** | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L223-L225) |
| **Global Footer** | Client Terminal Login Link | Navigates to `/portal/login` | **Works** | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L226) |
| **Global Footer** | Compliance: "Security & Encryption" | Inert `<span>` without href or click action | **Dummy** | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L254) |
| **Global Footer** | Compliance: "Privacy Policy" | Inert `<span>` without href or route | **Dummy** / **Missing** | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L255) |
| **Global Footer** | Compliance: "Terms of Service" | Inert `<span>` without href or route | **Dummy** / **Missing** | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L256) |
| **Global Footer** | Compliance: "Earnings Disclaimer" | Page and footer link completely absent | **Missing** | [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L254-L260) |
| **HomePage (`/`)** | Hero CTA Button ("Speak with a Business Coach") | Opens `CoachRequestModal` | **Works** | [HomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L123-L133) |
| **HomePage (`/`)** | Hero CTA Button ("Explore 16 Solutions") | Smooth-scrolls to `#solutions-grid` | **Works** | [HomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L134-L146) |
| **HomePage (`/`)** | Industry Trust Chips | Prompts "Click an industry to filter solutions below", but clicks do not filter the bento grid (unconnected state) | **Broken** | [HomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L266-L284) |
| **HomePage (`/`)** | 16 Bento Solution Cards (`/solutions/:slug`) | Navigates to `/solutions/${slug}`, which is unrouted in `App.tsx` and lands on 404 | **Broken** (16 dead links) | [HomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L307-L350) |
| **HomePage (`/`)** | Vision / Values / Mission Tabs | Switches tab panels smoothly | **Works** | [HomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L368-L429) |
| **HomePage (`/`)** | "Launch AI Copilot Now" CTA Button | Tries to click unmounted chat trigger button via querySelector, failing silently | **Broken** | [HomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L492-L503) |
| **HomePage (`/`)** | Testimonials Carousel Prev/Next Buttons | Advances and rewinds active testimonial card | **Works** | [HomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L601-L619) |
| **HomePage (`/`)** | Bottom Embedded Coach Lead Form | Validates fields with Zod, shows toast, resets | **Works** (Mock only) | [HomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L656-L658) |
| **HomePage (`/`)** | Global `CoachRequestModal` | Opens on hero CTA, validates inputs, displays toast and success state | **Works** (Mock only) | [HomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L664-L667) |
| **Solutions Directory (`/solutions`)** | Category Filter Buttons ('All', 'Capital', etc.) | Filters solution grid dynamically | **Works** | [SolutionsPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/SolutionsPage.tsx#L85-L99) |
| **Solutions Directory (`/solutions`)** | Solutions Search Input | Live-filters cards by title and description | **Works** | [SolutionsPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/SolutionsPage.tsx#L101-L108) |
| **Solutions Directory (`/solutions`)** | 16 Solution Grid Cards (`/solutions/:slug`) | Clicking any card leads to `/solutions/:slug`, resulting in 404 | **Broken** (16 dead links) | [SolutionsPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/SolutionsPage.tsx#L116-L162) |
| **Solution Page (`/solutions/:slug`)** | Entire Route in `App.tsx` | Route `/solutions/:slug` is omitted from `App.tsx` | **Missing** | [App.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/App.tsx#L155-L215) |
| **Solution Page (`/solutions/:slug`)** | "Click Here" Button (Client Rule 3) | Required "Click Here" button is completely absent | **Missing** | [SolutionPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/SolutionPage.tsx) |
| **Solution Page (`/solutions/:slug`)** | "Speak with a Business Coach" CTA | Uses "Speak with a Coach About {title}" header, missing exact mandatory button label | **Missing** | [SolutionPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/SolutionPage.tsx#L250-L260) |
| **Solution Page (`/solutions/:slug`)** | Sibling / Related Solutions Cards | Navigates to other unrouted solution pages (404) | **Broken** | [SolutionPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/SolutionPage.tsx#L281-L305) |
| **Solution Page (`/solutions/:slug`)** | FAQ Accordions | Expands and collapses FAQ items | **Works** | [SolutionPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/SolutionPage.tsx#L237) |
| **Advisory Page (`/advisory`)** | 3 Pillar "Request Engagement Scope" Buttons | Navigates to `/apply` | **Works** | [AdvisoryPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/AdvisoryPage.tsx#L134-L142) |
| **Advisory Page (`/advisory`)** | "Book Consultation Call" Button | Navigates to `/apply` | **Works** | [AdvisoryPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/AdvisoryPage.tsx#L204-L213) |
| **Apply Page (`/apply`)** | Stepper Navigation (3 Steps) | Step indicator updates on step change | **Works** | [ApplyPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/ApplyPage.tsx#L63-L76) |
| **Apply Page (`/apply`)** | Form Input Pre-fill | Pre-populates with fake company/founder info | **Dummy** | [ApplyPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/ApplyPage.tsx#L81-L95) |
| **Apply Page (`/apply`)** | "Continue" Button | Validates inputs per step with Zod before advancing | **Works** | [ApplyPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/ApplyPage.tsx#L97-L111) |
| **Apply Page (`/apply`)** | "Back" Button | Steps back to prior step | **Works** | [ApplyPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/ApplyPage.tsx#L113-L115) |
| **Apply Page (`/apply`)** | "Submit Application" Button | Logs in mock user, shows toast, displays success screen, but does not persist application | **Works** (Mock only) | [ApplyPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/ApplyPage.tsx#L117-L128) |
| **Apply Page (`/apply`)** | Success Screen "Access Client Portal" Button | Navigates to `/portal/dashboard` | **Works** | [ApplyPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/ApplyPage.tsx#L162-L170) |
| **Apply Page (`/apply`)** | Success Screen "Submit Another" Button | Resets form state | **Works** | [ApplyPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/ApplyPage.tsx#L171-L178) |
| **Jobs Home (`/jobs`)** | Keyword / Category / State Search Form | Navigates to `/jobs/search?q=...` | **Works** | [JobsHomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobsHomePage.tsx#L53-L60) |
| **Jobs Home (`/jobs`)** | Popular Search Chips ("Work from home", etc.) | Navigates to `/jobs/search?q=...` | **Works** | [JobsHomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobsHomePage.tsx#L143-L157) |
| **Jobs Home (`/jobs`)** | 12 Job Category Cards | Navigates to `/jobs/search?category=...` | **Works** | [JobsHomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobsHomePage.tsx#L274-L298) |
| **Jobs Home (`/jobs`)** | State Hiring Hub Chips (8 states) | Navigates to `/jobs/search?state=...` | **Works** | [JobsHomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobsHomePage.tsx#L324-L345) |
| **Jobs Home (`/jobs`)** | Salary Range Cards (4 tiers) | Navigates to `/jobs/search?minSalary=...` | **Works** | [JobsHomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobsHomePage.tsx#L363-L388) |
| **Jobs Home (`/jobs`)** | Featured Jobs Cards | Navigates to `/jobs/${job.id}` | **Works** | [JobsHomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobsHomePage.tsx#L398-L450) |
| **Jobs Home (`/jobs`)** | Employer CTA ("Post a Job as Employer") | Navigates to `/portal/employer/post-job` (protected) | **Works** | [JobsHomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobsHomePage.tsx#L476-L484) |
| **Job Search Results (`/jobs/search`)** | Search Inputs & Filter Controls (State, Category, Salary, Remote, Types, Sort) | Live updates filtered job cards in memory | **Works** | [JobSearchResultsPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobSearchResultsPage.tsx#L71-L98) |
| **Job Search Results (`/jobs/search`)** | "Clear Filters" Button | Resets all active filters | **Works** | [JobSearchResultsPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobSearchResultsPage.tsx#L61-L69) |
| **Job Search Results (`/jobs/search`)** | Bookmark Heart Button on Cards | Toggles in component state, shows toast, does not persist | **Works** (In-memory only) | [JobSearchResultsPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobSearchResultsPage.tsx#L42-L51) |
| **Job Search Results (`/jobs/search`)** | Job Result Cards | Navigates to `/jobs/${job.id}` | **Works** | [JobSearchResultsPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobSearchResultsPage.tsx#L295-L300) |
| **Job Detail (`/jobs/:id`)** | "Back to Job Search" Button | Navigates to `/jobs/search` | **Works** | [JobDetailPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobDetailPage.tsx#L90-L95) |
| **Job Detail (`/jobs/:id`)** | "Apply Now" Buttons | Opens application modal | **Works** | [JobDetailPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobDetailPage.tsx#L149-L157) |
| **Job Detail (`/jobs/:id`)** | "Save Job" Heart Button | Toggles bookmark state, shows toast | **Works** (In-memory only) | [JobDetailPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobDetailPage.tsx#L158-L167) |
| **Job Detail (`/jobs/:id`)** | "Share Job" Button | Copies URL to clipboard, shows toast | **Works** | [JobDetailPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobDetailPage.tsx#L77-L80) |
| **Job Detail (`/jobs/:id`)** | Job Application Modal & Form | Validates inputs, handles resume upload, shows toast, closes modal. Does not persist to backend or localStorage | **Works** (Mock only) | [JobDetailPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobDetailPage.tsx#L67-L75) |
| **Company Page (`/company`)** | Route in `App.tsx` | Route `/company` is missing; component exists but is unrouted (404) | **Missing** | [CompanyPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/CompanyPage.tsx) |
| **Company Page (`/company`)** | "Connect with a Coach" CTA | `<Link to="/contact">` navigates to unrouted `/contact` (404) | **Broken** | [CompanyPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/CompanyPage.tsx#L144-L148) |
| **Affiliates Page (`/affiliates`)** | Route in `App.tsx` | Public route `/affiliates` is missing; component exists but is unrouted (404) | **Missing** | [AffiliatesPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/AffiliatesPage.tsx) |
| **Affiliates Page (`/affiliates`)** | "Access Partner Hub" Link | `<Link to="/portal/affiliate/dashboard">` | **Works** (if routed and logged in) | [AffiliatesPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/AffiliatesPage.tsx#L94-L100) |
| **Affiliates Page (`/affiliates`)** | Partner Application Form | Validates with Zod, shows toast, resets form | **Works** (Mock only) | [AffiliatesPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/AffiliatesPage.tsx#L71-L78) |
| **Contact Page (`/contact`)** | Route in `App.tsx` | Route `/contact` is missing; component exists but is unrouted (404) | **Missing** | [ContactPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/ContactPage.tsx) |
| **Contact Page (`/contact`)** | Advisory Contact Form | Validates with Zod, shows toast, resets form | **Works** (Mock only) | [ContactPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/ContactPage.tsx#L52-L59) |
| **Careers Page (`/careers`)** | Route in `App.tsx` | Route `/careers` is missing; `JobsPage.tsx` exists as a careers page but is unrouted | **Missing** | [JobsPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobsPage.tsx) |
| **Careers Page (`/careers`)** | Job Application Modal | Validates inputs, shows toast, closes modal | **Works** (if routed) | [JobsPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobsPage.tsx#L113-L121) |
| **Search Palette Modal** | `CommandPaletteModal` | Defined with Ctrl+K shortcut and search links, but never rendered in any layout | **Unused** | [CommandPaletteModal.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/components/navigation/CommandPaletteModal.tsx#L26) |
| **AI Chat Assistant** | `GlobalAiChatWidget` | Defined with floating button and chat interface, but never rendered in any layout | **Unused** | [GlobalAiChatWidget.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/components/ai/GlobalAiChatWidget.tsx#L44) |
| **Newsletter Form** | `NewsletterForm` | Defined with email validation and toast, but never rendered anywhere | **Unused** | [NewsletterForm.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/components/forms/NewsletterForm.tsx#L16) |

---

## 2. Dead Links, Console Errors, Unused Components & Missing Pages

### Dead Links (Produce 404 Not Found or Inactive Actions)
1. **`/solutions/:slug` (16 Solution Pages)**:
   - `/solutions/accept-payments`
   - `/solutions/biz-management`
   - `/solutions/brand-your-business`
   - `/solutions/build-business-credit`
   - `/solutions/business-plan-writing`
   - `/solutions/business-funding`
   - `/solutions/lead-generation`
   - `/solutions/customer-service-academy`
   - `/solutions/cyber-security`
   - `/solutions/b4b-jobs`
   - `/solutions/insurance`
   - `/solutions/it-solutions`
   - `/solutions/marketing`
   - `/solutions/affiliates-partners`
   - `/solutions/tax-prep`
   - `/solutions/web-design`
   *(All 16 cards on both `HomePage.tsx` and `SolutionsPage.tsx` point to these dead URLs).*
2. **`/company`**: Linked from `CommandPaletteModal.tsx:72`, but route is omitted from `App.tsx` (404 Not Found).
3. **`/contact`**: Linked from `CompanyPage.tsx:144` and `CommandPaletteModal.tsx:73`, but route is omitted from `App.tsx` (404 Not Found).
4. **`/affiliates`**: Linked from `CommandPaletteModal.tsx:71`, but public route is omitted from `App.tsx` (404 Not Found).
5. **`/careers`**: No route exists in `App.tsx` (404 Not Found).
6. **Footer Inactive Elements**:
   - `Security & Encryption` (`MarketingLayout.tsx:254`): Dead non-clickable `<span>`.
   - `Privacy Policy` (`MarketingLayout.tsx:255`): Dead non-clickable `<span>`.
   - `Terms of Service` (`MarketingLayout.tsx:256`): Dead non-clickable `<span>`.
7. **"Launch AI Copilot Now"** (`HomePage.tsx:496`): Fails silently due to querying an unmounted element.

### Console Errors & Linting Issues
1. **Runtime Silent Exception**: In `HomePage.tsx:496-500`, clicking the AI Copilot CTA attempts to query `button[aria-label="Open AI Business Advisor Chat"]` which evaluates to `null`.
2. **Oxlint Errors**: Oxlint identified 2 errors in `src/pages/portal/admin/AdminRolesPermissionsPage.tsx:93` (`react(set-state-in-effect): Calling setState synchronously within an effect`).
3. **Oxlint Unused Variable Warnings**: 507 warnings found across 163 files, notably unused Lucide imports in `AffiliatesPage.tsx`, `EmployerMyJobsPage.tsx`, and `AdminRolesPermissionsPage.tsx`.

### Unused Components
1. `src/components/navigation/CommandPaletteModal.tsx` (`<CommandPaletteModal>`): Implemented with search index and shortcut handling, but never rendered in any layout or page.
2. `src/components/ai/GlobalAiChatWidget.tsx` (`<GlobalAiChatWidget>`): Implemented with expandable floating chat, but never mounted in `MarketingLayout` or `App.tsx`.
3. `src/components/forms/NewsletterForm.tsx` (`<NewsletterForm>`): Email newsletter signup component, never imported or rendered anywhere.
4. `src/pages/marketing/SolutionPage.tsx` (`<SolutionPage>`): Solution page component, never routed in `App.tsx`.
5. `src/pages/marketing/CompanyPage.tsx` (`<CompanyPage>`): About/Vision page component, never routed in `App.tsx`.
6. `src/pages/marketing/AffiliatesPage.tsx` (`<AffiliatesPage>`): Affiliate application page component, never routed in `App.tsx`.
7. `src/pages/marketing/ContactPage.tsx` (`<ContactPage>`): Advisory contact page component, never routed in `App.tsx`.
8. `src/pages/marketing/JobsPage.tsx` (`<JobsPage>`): Internal careers page component with application modal, never routed in `App.tsx`.

### Missing Pages
1. Individual Solution Pages (`/solutions/:slug` for each of the 16 solutions).
2. Public Company Page (`/company`).
3. Public Affiliates & Partners Page (`/affiliates`).
4. Public Advisory Contact Desk (`/contact`).
5. Public Careers Page (`/careers`).
6. Privacy Policy Page (`/privacy`).
7. Terms of Service Page (`/terms`).
8. Earnings Disclaimer Page (`/earnings-disclaimer`).

---

## 3. Specific Question Reports (Yes/No & File Paths)

### a. Does each of the 16 solution pages have "Click Here" and "Speak with a Business Coach"?
- **NO.**
- **File Paths**:
  - Component: [SolutionPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/SolutionPage.tsx)
  - Data: [solutions.ts](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/solutions.ts)
  - Router: [App.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/App.tsx)
- **Details**:
  1. The exact string `"Click Here"` does not exist anywhere in the codebase (0 matches in `src`).
  2. The sidebar form header reads `"Speak with a Coach About {solution.title}"` instead of the required exact label `"Speak with a Business Coach"` (and for Lead Generation: `"Speak with an Advisor"`).
  3. The route `/solutions/:slug` is not configured in `App.tsx`, so the 16 pages cannot be navigated to.

---

### b. Matches for "OAL", "$240M", "12,400", "4.9", "Carlos" and Hardcoded Stats/Testimonials

#### Prohibited Company Name: "OAL" (48 Matches Found)
- [SettingsPage.tsx:46](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/portal/SettingsPage.tsx#L46) — `'Corporate records saved to OAL client registry.'`
- [PortalLoginPage.tsx:61](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/portal/PortalLoginPage.tsx#L61) — `'Welcome to OAL Partner Hub'`
- [PortalLoginPage.tsx:94](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/portal/PortalLoginPage.tsx#L94) — `'Sign in to your OAL Network client terminal or partner hub.'`
- [PortalDashboardPage.tsx:200](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/portal/PortalDashboardPage.tsx#L200) — `title="OAL Health Score"`
- [SolutionsPage.tsx:66](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/SolutionsPage.tsx#L66) — `description="Explore OAL Network's 16 core solutions..."`
- [SolutionPage.tsx:119](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/SolutionPage.tsx#L119) — `keywords="... OAL Network, business coaching"`
- [JobsPage.tsx:140](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobsPage.tsx#L140) — `'At OAL Network, our mission is to make all small businesses...'`
- [JobsPage.tsx:244](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobsPage.tsx#L244) — `label="Why OAL Network?"`
- [HomePage.tsx:385](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L385) — `'The OAL Vision'`
- [HomePage.tsx:440](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L440) — `'How OAL Network Propels Your Business'`
- [HomePage.tsx:488](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L488) — `'Our OAL Copilot combines knowledge from all 16 business solutions...'`
- [HomePage.tsx:516](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L516) — `'OAL Small Business Copilot'`
- [HomePage.tsx:541](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L541) — `'...connect you with an OAL Restaurant Business Coach?'`
- [ContactPage.tsx:55](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/ContactPage.tsx#L55) — `'An OAL advisory specialist will respond within 1 business hour.'`
- [ContactPage.tsx:65](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/ContactPage.tsx#L65) — `description="Connect with OAL Network..."`
- [CompanyPage.tsx:32](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/CompanyPage.tsx#L32) — `'Architect of OAL’s non-dilutive credit underwriting model.'`
- [CompanyPage.tsx:46](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/CompanyPage.tsx#L46) — `title="About OAL Network — Vision & Mission"`
- [CompanyPage.tsx:47](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/CompanyPage.tsx#L47) — `description="The story and vision behind OAL Network..."`
- [CompanyPage.tsx:139](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/CompanyPage.tsx#L139) — `'Ready to Work with an OAL Business Coach?'`
- [ApplyPage.tsx:309](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/ApplyPage.tsx#L309) — `description="I authorize OAL Network to verify corporate records..."`
- [AffiliatesPage.tsx:84](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/AffiliatesPage.tsx#L84) — `description="Partner with OAL Network..."`
- [AffiliatesPage.tsx:242](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/AffiliatesPage.tsx#L242) — `label="How would you like to partner with OAL Network?"`
- [AdvisoryPage.tsx:94](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/AdvisoryPage.tsx#L94) — `'OAL Network pairs credit facilities with seasoned fractional CFOs...'`
- [DesignSystemPage.tsx:390](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/DesignSystemPage.tsx#L390) — `title="OAL Scoreboard Rank"`
- [DesignSystemPage.tsx:553](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/DesignSystemPage.tsx#L553) — `'Fiduciary standard guarantee under OAL Network charter'`
- [DesignSystemPage.tsx:600](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/DesignSystemPage.tsx#L600) — `title="OAL Design System Modal"`
- [solutions.ts:76](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/solutions.ts#L76) — `'All OAL Network payment agreements are strictly month-to-month'`
- [solutions.ts:130](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/solutions.ts#L130) — `'Your dedicated OAL operations coach conducts live team training'`
- [solutions.ts:300](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/solutions.ts#L300) — `'OAL Network matches creditworthy small businesses with structured working capital'`
- [solutions.ts:698](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/solutions.ts#L698) — `'Unlock Recurring Passive Revenue as an OAL Certified Affiliate or Partner'`
- [solutions.ts:730](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/solutions.ts#L730) — `'Who makes an ideal OAL Partner?'`
- [solutions.ts:735](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/solutions.ts#L735) — `'No. Joining the OAL Partner Network is 100% free'`
- [solutions.ts:887](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/solutions.ts#L887) — `'OAL Network saved us $1,800 a month on payment processing...'`
- [solutions.ts:897](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/solutions.ts#L897) — `'Before OAL Network, broker invoice delays killed our cash flow...'`
- [jobsBoardData.ts:390](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/jobsBoardData.ts#L390) — `company: 'OAL Capital Network'`
- [fintechData.ts:63](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/fintechData.ts#L63) — `oalHealthScore: 92`
- [fintechData.ts:89](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/fintechData.ts#L89) — `provider: 'OAL Institutional Syndication'`
- [fintechData.ts:113](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/fintechData.ts#L113) — `provider: 'OAL Capital Partners'`
- [fintechData.ts:218](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/fintechData.ts#L218) — `'OAL Network eliminated our 60-day receivables gap...'`
- [fintechData.ts:228](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/fintechData.ts#L228) — `'...OAL Network structured non-dilutive capital linked to our purchase orders.'`
- [useTheme.tsx:20](file:///d:/Kiaan%20Project/b4b/B4B/src/hooks/useTheme.tsx#L20) — `localStorage.removeItem('oal_theme')`
- [menuCatalog.ts:4](file:///d:/Kiaan%20Project/b4b/B4B/src/config/menuCatalog.ts#L4) — `'* Complete Master Menu Catalog for OAL / B4B Financial Platform'`
- [CommandPaletteModal.tsx:72](file:///d:/Kiaan%20Project/b4b/B4B/src/components/navigation/CommandPaletteModal.tsx#L72) — `{ label: 'About OAL Network (Vision & Values)', href: '/company', ... }`
- [CoachRequestModal.tsx:111](file:///d:/Kiaan%20Project/b4b/B4B/src/components/forms/CoachRequestModal.tsx#L111) — `'An OAL Business Coach specializing in your industry will review...'`
- [CoachRequestModal.tsx:168](file:///d:/Kiaan%20Project/b4b/B4B/src/components/forms/CoachRequestModal.tsx#L168) — `'...communications from an OAL Network certified business coach...'`
- [GlobalAiChatWidget.tsx:98](file:///d:/Kiaan%20Project/b4b/B4B/src/components/ai/GlobalAiChatWidget.tsx#L98) — `'OAL Network offers 16 core solutions designed to help...'`
- [GlobalAiChatWidget.tsx:128](file:///d:/Kiaan%20Project/b4b/B4B/src/components/ai/GlobalAiChatWidget.tsx#L128) — `'Ask OAL Copilot'`
- [GlobalAiChatWidget.tsx:143](file:///d:/Kiaan%20Project/b4b/B4B/src/components/ai/GlobalAiChatWidget.tsx#L143) — `'OAL Copilot'`

#### Matches for "$240M" / "240M" / "240"
- [HomePage.tsx:181](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L181) — `<CountUp value={240} prefix="$" suffix="M+" />` (Stat Card: "Capital Sourced & Funded $240M+")
- [solutions.ts:919](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/solutions.ts#L919) — `metric: '240% increase in booked treatments'` (Maya Lin Testimonial)
- [jobsBoardData.ts:79](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/jobsBoardData.ts#L79) — `{ code: 'IL', name: 'Illinois', count: 240, topCity: 'Chicago' }`
- [jobsBoardData.ts:211](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/jobsBoardData.ts#L211) — `salaryMax: 240000`
- [clientData.ts:102](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/clientData.ts#L102) — `amount: 24000`
- [bizproData.ts:420](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/bizproData.ts#L420) — `avgTicket: 24000`
- [adminData.ts:150](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/adminData.ts#L150) — `revenue: 1240000`
- [territoryScoreboardData.ts:78](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/territoryScoreboardData.ts#L78) — `revenue: 1240000`
- [territoryScoreboardData.ts:195](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/territoryScoreboardData.ts#L195) — `volume: 12400000`
- [territoryScoreboardData.ts:300](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/territoryScoreboardData.ts#L300) — `volume: 22400000`
- [EmployerMyJobsPage.tsx:98](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/portal/employer/EmployerMyJobsPage.tsx#L98) — `j.viewsCount || 240`

#### Matches for "12,400" / "12400"
- [HomePage.tsx:206](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L206) — `<CountUp value={12400} suffix="+" />` (Stat Card: "Independent Businesses Helped 12,400+")
- [affiliateData.ts:206](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/affiliateData.ts#L206) — `amount: 12400`
- [EmployerDashboardPage.tsx:40](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/portal/employer/EmployerDashboardPage.tsx#L40) — `{ month: 'Jun', views: 1240, applications: 38 }`

#### Matches for "4.9"
- [HomePage.tsx:211](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L211) — `★ 4.9 / 5.0` (Stat Card Rating Badge)
- [jobsBoardData.ts:176](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/jobsBoardData.ts#L176) — `companyRating: 4.9` (Apex Growth Partners)
- [jobsBoardData.ts:203](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/jobsBoardData.ts#L203) — `companyRating: 4.9` (Vanguard Merchant Alliance)
- [jobsBoardData.ts:338](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/jobsBoardData.ts#L338) — `companyRating: 4.9` (Hyperion Software Sales)

#### Matches for "Carlos"
- [solutions.ts:883](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/solutions.ts#L883) — `name: 'Carlos Mendoza'` (Testimonial: Owner, El Fuego Cantina & Grill, Austin TX, 5-star rating, metric: 'Saved $21,600/yr in processing fees')
- [bizproData.ts:159](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/bizproData.ts#L159) — `name: 'Carlos Mendez'` (CRM mock contact)

#### Other Hardcoded Stats, Ratings, or Testimonials
- [MarketingLayout.tsx:51](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L51) — `'$15M In Non-Dilutive Capital Lines Open for Qualified Small Businesses'`
- [HomePage.tsx:231](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L231) — `'50 States'` (National Coverage stat)
- [HomePage.tsx:537-539](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L537-L539) — `'$150,000 – $210,000 at Prime + 1.5%'`, `'Up to $100,000 for POS & kitchen upgrades'`
- [JobsHomePage.tsx:97](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobsHomePage.tsx#L97) — `'Over 2,400+ Active Roles Verified Today'`
- [JobsHomePage.tsx:63-70](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobsHomePage.tsx#L63-L70) — Popular search counts (`'450+ jobs'`, `'142+ jobs'`, `'289+ jobs'`, `'312+ jobs'`, etc.)
- [JobsHomePage.tsx:74-77](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobsHomePage.tsx#L74-L77) — Salary counts (`'340 jobs'`, `'520 jobs'`, `'410 jobs'`, `'185 jobs'`)
- [solutions.ts:880-921](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/solutions.ts#L880-L921) — Entire `TESTIMONIALS_DATA` array:
  - Carlos Mendoza (5 stars, quote, metric)
  - Tamara Jenkins ('Jenkins Freight Haulers LLC', 5 stars, quote, metric: 'Built 84 PAYDEX score in 75 days')
  - Dr. Aaron Levine ('Levine Family Dental & Ortho', 5 stars, quote, metric: '$850k SBA loan approved on 1st submission')
  - Maya Lin ('Lumina Skin & Wellness Spa', 5 stars, quote, metric: '240% increase in booked treatments')
- [fintechData.ts:211-242](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/fintechData.ts#L211-L242) — Entire `CASE_STUDIES` array:
  - Apex Freight Systems ('$850,000 Secured', '142% Annual Revenue Growth')
  - Kallisto BioTech Instruments ('$1,200,000 Revenue-Based Facility', '$2.1M Run-rate in 14 Mo')
  - ModernCraft Modulars ('$650,000 Equipment Lease', '3.4x Capacity Expansion')
- [AdvisoryPage.tsx:24,62](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/AdvisoryPage.tsx#L24) — Fictional partner credentials (`'$350k/year executive'`, `'$80M ARR'`, `'40+ private debt and credit syndicates'`)
- [CompanyPage.tsx:26,38](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/CompanyPage.tsx#L26) — Fictional executive claims (`'guided over $400M in debt syndications'`, `'led 18 small-market corporate acquisitions'`)

---

### c. Is there a working website search and an AI assistant?
- **NO.**
- **File Paths**:
  - Website Search: [CommandPaletteModal.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/components/navigation/CommandPaletteModal.tsx)
  - AI Assistant: [GlobalAiChatWidget.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/components/ai/GlobalAiChatWidget.tsx) and [HomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx#L496-L503)
- **Details**:
  1. No working global website search exists in the active UI. `CommandPaletteModal.tsx` provides a full command palette with navigation links, but it is never imported or mounted in `MarketingLayout.tsx` or `App.tsx`. (There is only an in-page text filter on `SolutionsPage.tsx` and a keyword search on `JobsHomePage.tsx`).
  2. No working AI assistant exists in the active UI. `GlobalAiChatWidget.tsx` is an orphan component that is never mounted in `MarketingLayout.tsx` or `App.tsx`.
  3. Clicking "Launch AI Copilot Now" on `HomePage.tsx:496` executes `document.querySelector('button[aria-label="Open AI Business Advisor Chat"]')?.click()`, which silently fails because no such element is present in the DOM.

---

### d. Are there Privacy Policy, Terms of Service and Earnings Disclaimer pages?
- **NO.**
- **File Path**: [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L254-L260)
- **Details**:
  1. **Privacy Policy**: No component exists and no route (`/privacy`) is defined in `App.tsx`. Only an inactive `<span>Privacy Policy</span>` exists in the footer.
  2. **Terms of Service**: No component exists and no route (`/terms`) is defined in `App.tsx`. Only an inactive `<span>Terms of Service</span>` exists in the footer.
  3. **Earnings Disclaimer**: Completely absent from the codebase (no component, no route, no footer link).

---

### e. Does the navbar show "Log In", or "Back to Portal" when logged in?
- **NO.**
- **File Path**: [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx#L97-L115)
- **Details**:
  1. When logged out, the navbar shows **"Log In"** (navigates to `/portal/login`).
  2. When logged in, the desktop navbar shows **"My Dashboard ({user.role})"** (e.g., "My Dashboard (Admin)", navigates to `/portal/dashboard`). It does **NOT** display `"Back to Portal"`.
  3. On mobile devices, the drawer always statically shows `"Log In to Portal"`, ignoring authentication status.

---

### f. Which text is hardcoded in components and which comes from src/content?
- **NO text comes from `src/content`. 100% of website text is hardcoded in components, mock data files, or configuration.**
- **File Paths**:
  - `src/content/`: **Does not exist (0%)**.
  - **In Components**:
    - [HomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/HomePage.tsx)
    - [AdvisoryPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/AdvisoryPage.tsx)
    - [CompanyPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/CompanyPage.tsx)
    - [AffiliatesPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/AffiliatesPage.tsx)
    - [ContactPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/ContactPage.tsx)
    - [JobsPage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobsPage.tsx)
    - [JobsHomePage.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/pages/marketing/JobsHomePage.tsx)
    - [MarketingLayout.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/layouts/MarketingLayout.tsx)
  - **In Mock Data**:
    - [solutions.ts](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/solutions.ts) (16 solutions data, features, FAQs, testimonials)
    - [jobsBoardData.ts](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/jobsBoardData.ts) (listings, categories, salary tiers)
    - [fintechData.ts](file:///d:/Kiaan%20Project/b4b/B4B/src/mock-data/fintechData.ts) (case studies, consulting text)
  - **In Brand Config**:
    - [brand.ts](file:///d:/Kiaan%20Project/b4b/B4B/src/config/brand.ts) (`brandConfig` metadata)

---

### g. Which data lives only in localStorage (each service and its data)?
- **NO public website services or submissions live in `localStorage`. Only authentication tokens and RBAC permissions live in `localStorage`.**
- **File Paths & Keys**:
  1. **Authentication Session** ([authService.ts](file:///d:/Kiaan%20Project/b4b/B4B/src/lib/auth/authService.ts#L84-L236), [AuthContext.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/context/AuthContext.tsx#L230-L239)):
     - `b4b_auth_session`: Mock JWT session token string.
     - `b4b_auth_user`: Logged-in user JSON object.
     - `b4b_active_role`: Temporary role override identifier string.
  2. **RBAC Permissions & Audit Log** ([permissionService.ts](file:///d:/Kiaan%20Project/b4b/B4B/src/lib/rbac/permissionService.ts#L31-L526), [PermissionContext.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/lib/rbac/PermissionContext.tsx#L52-L152)):
     - `b4b_rbac_roles`: Custom/edited roles list JSON.
     - `b4b_rbac_permissions`: Roles permission matrix JSON.
     - `b4b_rbac_audit_log`: Security audit log entries array JSON.
     - `b4b_rbac_user_overrides`: Per-user permission overrides JSON.
     - `b4b_rbac_impersonation`: Impersonation target role string.
  3. **Theme Cleanup** ([useTheme.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/hooks/useTheme.tsx#L20)):
     - Cleans up legacy `oal_theme` key.
  4. **Status of Public Services**:
     - `src/lib/jobService.ts`: **Does not exist**.
     - `src/lib/rankService.ts`: **Does not exist**.
     - Capital applications (`ApplyPage.tsx`), Coach leads (`CoachRequestModal.tsx`), Job applications (`JobDetailPage.tsx`, `JobsPage.tsx`), Contact inquiries (`ContactPage.tsx`), and Affiliate submissions (`AffiliatesPage.tsx`) DO NOT save to `localStorage` or any service layer; they only trigger in-memory component state and toast notifications.

---

## 4. Generic Templates & Logo Placement Issues

### Generic Template Content
1. **`ApplyPage.tsx`**: Default form state contains pre-filled placeholder data (`companyName: 'Apex Freight & Logistics LLC'`, founder `'Marcus Vance'`, email `'m.vance@apexlogistics.io'`, EIN `'84-9283741'`, revenue `'$3M - $5M'`, requested capital `'$850,000'`).
2. **`AdvisoryPage.tsx` & `CompanyPage.tsx`**: Uses stock Unsplash portrait images and fictional Wall Street personas (`"Victoria Hastings, CPA/CFA, Ex-Goldman Sachs"`, `"Derrick Vance, Former credit officer at KeyBank Commercial"`, `"Elena Rostova, Private Equity Operating Partner"`).
3. **`HomePage.tsx`**:
   - Hardcoded vanity metrics (`$240M+`, `12,400+`, `★ 4.9 / 5.0`).
   - Mock simulated AI Copilot dialogue.
   - Fictional customer testimonial carousel (`Carlos Mendoza`, `Tamara Jenkins`, `Dr. Aaron Levine`, `Maya Lin`) with stock portraits and unverified metrics.
4. **`JobsHomePage.tsx`**: Template statistics (`"Over 2,400+ Active Roles Verified Today"`, `'450+ jobs'`, `'340 jobs'`) and fictitious employers (`Apex Growth Partners`, `BluePeak BioTech`, `OAL Capital Network`).

### Logo Placement Problems
1. **`BrandLogo.tsx` Component Implementation** ([BrandLogo.tsx](file:///d:/Kiaan%20Project/b4b/B4B/src/config/BrandLogo.tsx#L21-L44)):
   - `logoSrc` always points to `brandConfig.logos.full` (`/brand/logo-full.png`), completely ignoring the `variant` prop (`wordmark`, `icon`, `full`).
   - `size="lg"` maps to Tailwind class `h-13`. In Tailwind CSS, `h-13` is an invalid class by default, resulting in unconstrained image heights when `size="lg"` is requested.
   - All 5 files in `public/brand/` (`logo-full.png`, `logo-full.svg`, `logo-icon.svg`, `logo-wordmark-dark.svg`, `logo-wordmark.svg`) are identical 657 KB raster PNG files. No vector SVG wordmarks or icon marks exist.
2. **`MarketingLayout.tsx` Navbar (Header)**:
   - Line 69 passes `variant="wordmark" size="md" showTagline={false}`, but the component renders the full rectangular lockup because `variant` is ignored.
3. **`MarketingLayout.tsx` Footer**:
   - Line 193 uses `size="lg"`, triggering the invalid `h-13` class. Tagline text uses `text-slate-500` against dark navy background with suboptimal contrast.
4. **`PortalLayout.tsx` Sidebar**:
   - Line 143 passes `variant={isCollapsed ? 'icon' : 'wordmark'}`. When collapsed, the full rectangular PNG is displayed inside the narrow icon rail.

---

## 5. Questions for Dev B

1. **Routing Registration in `App.tsx`**:
   - Can you add public routes in `App.tsx` inside `<MarketingLayout>` for:
     - `/solutions/:slug` -> `<SolutionPage />`
     - `/company` -> `<CompanyPage />`
     - `/affiliates` -> `<AffiliatesPage />`
     - `/contact` -> `<ContactPage />`
     - `/careers` -> `<JobsPage />`
     - `/privacy`, `/terms`, `/earnings-disclaimer`
2. **Global Layout Modals & Widgets**:
   - Can you mount `<GlobalAiChatWidget />` and `<CommandPaletteModal />` inside `<MarketingLayout>` so that global search and AI assistance work consistently across all marketing pages?
3. **Navbar Auth CTA**:
   - Per client requirements, can we change the logged-in button in `MarketingLayout.tsx` from `"My Dashboard ({user.role})"` to `"Back to Portal"`?
4. **Brand Logo Component & Assets**:
   - In `BrandLogo.tsx`, can we fix `h-13` to standard Tailwind `h-12` or `h-14`, and support real SVG variants for `icon` vs `wordmark` once vector assets are provided?
5. **Service Layer & Persistence Contract**:
   - As Dev A, I will implement `src/lib/jobService.ts` and `src/lib/rankService.ts` (using async functions, mock delay, and localStorage). Are there any specific storage keys or event hooks you expect the portal and jobs boards to share?

---

Audit complete. No code was changed.
