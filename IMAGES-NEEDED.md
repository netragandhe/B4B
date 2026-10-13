# IMAGES-NEEDED.md - B4B America Image Asset Specification

This document lists all photo asset requirements for the B4B America public technology platform.
Per client rules:
- **No AI-generated images**
- **Real professional business photography only**, supplied in `src/content/images/`
- **Format**: Modern WebP format with high resolution and compression optimization
- **Contrast Requirement**: High-contrast Midnight Navy overlay (60-75%) applied programmatically for absolute text legibility
- **No person photos next to a name or quote** (Client rule: no invented testimonials or person associations)
- **Fallback status**: Until photos are supplied by client/Dev B, all slots seamlessly fall back to corporate Midnight Navy to Deep Navy gradient architecture (`#07142B` to `#0D2147`) rendered via `<PhotoBackground />`.

---

## Required Image Slots

| Slot ID | Intended Location | Purpose / Subject | Suggested Aspect / Dimensions | Overlay | Current Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `hero-bg.webp` | `src/content/images/hero-bg.webp` | Homepage Hero Header. Real photo of commercial payment transaction. | 1920x1080 (16:9), WebP | 70% Midnight Navy (`#07142B`) | **SUPPLIED & ACTIVE** (Eager loaded) |
| `b4bapp-preview.webp` | `src/content/images/b4bapp-preview.webp` | B4BAPP Technology Section. Real photo of telemetry analytics dashboard monitor. | 1600x1000 (16:10), WebP | 65% Midnight Navy (`#07142B`) | **SUPPLIED & ACTIVE** (Lazy loaded) |
| `philosophy-bg.webp` | `src/content/images/philosophy-bg.webp` | Company / Philosophy Section. Small business enterprise architecture, collaborative commerce meeting. | 1920x900, WebP | 75% Midnight Navy (`#07142B`) | **MISSING** (Using Navy Gradient Fallback) |
| `industry-contractors.webp` | `src/content/images/industry-contractors.webp` | Commercial Construction & Specialty Trade Contractors. | 800x600 (4:3), WebP | 60% Midnight Navy (`#07142B`) | **MISSING** (Using Navy Gradient Fallback) |
| `industry-medical.webp` | `src/content/images/industry-medical.webp` | Healthcare Practices, Clinics & Diagnostic Facilities. | 800x600 (4:3), WebP | 60% Midnight Navy (`#07142B`) | **MISSING** (Using Navy Gradient Fallback) |
| `industry-professional.webp` | `src/content/images/industry-professional.webp` | Accounting, Legal, Engineering & Advisory Firms. | 800x600 (4:3), WebP | 60% Midnight Navy (`#07142B`) | **MISSING** (Using Navy Gradient Fallback) |
| `industry-hospitality.webp` | `src/content/images/industry-hospitality.webp` | Commercial Hospitality, Foodservice & Independent Lodging. | 800x600 (4:3), WebP | 60% Midnight Navy (`#07142B`) | **MISSING** (Using Navy Gradient Fallback) |
| `contact-bg.webp` | `src/content/images/contact-bg.webp` | Contact Section / Federal Reserve District Operations. | 1920x800, WebP | 75% Midnight Navy (`#07142B`) | **MISSING** (Using Navy Gradient Fallback) |

---

## Technical Integration Details
- Target folder: `src/content/images/`
- Render Component: `src/components/website/PhotoBackground.tsx`
- Features: `loading="lazy"`, responsive object-fit (`object-cover`), explicit aria/alt descriptions, and accessible contrast compliance (WCAG AAA with `#07142B` overlay).
