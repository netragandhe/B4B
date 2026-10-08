# Responsive Design & Mobile Guidelines for B4B America Platform

This document outlines the mobile-first responsive architecture, design standards, and reusable component guidelines implemented across the B4B America platform.

---

## 1. Breakpoint System (Tailwind Standardized)

| Breakpoint Tier | Target Devices | Width Range | Usage Rules |
| :--- | :--- | :--- | :--- |
| **Mobile (Base)** | Small & standard smartphones | `320px` – `639px` | Base styles (mobile-first). Single column layouts, 44px+ touch targets, 16px input font size. |
| **Tablet (`sm:` / `md:`)** | Large phones, foldables, tablets | `640px` – `1023px` | 2-column grids, horizontal tab bars, auto-collapsing sidebars. |
| **Desktop (`lg:`)** | Laptops & standard monitors | `1024px` – `1535px` | 3-4 column grids, full collapsible sidebar, desktop tables. |
| **Large Desktop (`xl:` / `2xl:`)** | Ultra-wide monitors | `1536px+` | Max container width constrained to `max-w-[1440px] mx-auto`. |

---

## 2. Core Mobile Architectural Rules

### A. Zero Horizontal Scroll Policy
- Main layout containers must use `overflow-x-hidden`.
- Dynamic data tables, code viewports, and SVG maps MUST be wrapped inside explicit overflow containers (`overflow-x-auto`) or rendered via `<ResponsiveTable>`.

### B. Touch Target & Typography Enforcement
- **Inputs & Interactive Controls**: Minimum height `44px` (`min-h-[44px]`).
- **Input Font Size**: `text-base sm:text-sm` (16px base font on mobile to prevent automatic iOS Safari zoom-on-focus).
- **Body Text**: Minimum `14px` (`text-sm`).
- **Safe Area Insets**: Use `pb-[calc(1rem+env(safe-area-inset-bottom))]` for bottom sticky bars and modals.

---

## 3. Key Responsive Components

### A. `<ResponsiveTable>` (`src/components/ui/ResponsiveTable.tsx`)
Converts standard tabular data into responsive stacked executive cards on mobile while retaining full `<table>` presentation on desktop.

```tsx
import { ResponsiveTable, Column } from '@/components/ui/ResponsiveTable'

const columns: Column<MyDataType>[] = [
  { header: 'Client Name', accessorKey: 'name', isPrimary: true },
  { header: 'Revenue', render: (row) => `$${row.amount}` },
  { header: 'Status', render: (row) => <Badge>{row.status}</Badge> }
]

<ResponsiveTable
  data={myRecords}
  columns={columns}
  keyExtractor={(item) => item.id}
  searchPlaceholder="Search clients..."
/>
```

### B. Mobile Bottom Navigation Bar (`src/layouts/PortalLayout.tsx`)
- Displays fixed at bottom on mobile (`lg:hidden fixed bottom-0 left-0 right-0 z-40`).
- Renders top 4 role-specific menu items + a "More" drawer trigger.
- Integrates iOS `env(safe-area-inset-bottom)`.

### C. Mobile Bottom Sheets (`src/components/ui/Modal.tsx`)
- On small screens (`< 640px`), modals render as full-width bottom sheets (`items-end rounded-t-3xl`).
- On tablet/desktop (`≥ 640px`), modals automatically center as dialog cards (`sm:items-center sm:rounded-2xl`).

### D. Responsive Kanban & Data Pipelines
- On mobile (`< 768px`), Kanban pipelines render a horizontal stage pill filter tab (`All`, `New`, `Screening`, `Interview`, `Offer`, `Hired`, `Rejected`) for single-stage focus, alongside swipeable columns.

---

## 4. Performance & PWA Features

1. **Web App Manifest**: Configured at `/manifest.json` with stand-alone display mode, theme colors, and PWA icons.
2. **Apple Touch Metadata**: Configured in `index.html` with `apple-mobile-web-app-capable` and `viewport-fit=cover`.
3. **Lazy Loading**: Heavy components (SVG territory maps, charts, and drawers) use lazy loading and skeleton states.
