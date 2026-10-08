export interface SolutionFeature {
  title: string
  description: string
  iconName: string
}

export interface SolutionFAQ {
  question: string
  answer: string
}

export interface SolutionItem {
  id: string
  slug: string
  title: string
  shortDesc: string
  category: 'Capital & Finance' | 'Operations & Strategy' | 'Growth & Marketing' | 'Tech & Security'
  badge: string
  iconName: string
  heroHeadline: string
  heroSub: string
  overview: string
  pricingNote?: string
  features: SolutionFeature[]
  benefits: { metric: string; label: string }[]
  faqs: SolutionFAQ[]
  relatedSlugs: string[]
}

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 'sol-01',
    slug: 'accept-payments',
    title: 'Accept Payments',
    shortDesc: 'Modern POS, omnichannel credit card processing, next-day deposits and transparent wholesale merchant rates.',
    category: 'Capital & Finance',
    badge: 'Merchant Services',
    iconName: 'CreditCard',
    heroHeadline: 'Frictionless Payment Processing with Wholesale Interchange-Plus Rates',
    heroSub: 'Eliminate bloated processor junk fees. Accept in-person tap, online payments, mobile invoicing, and recurring subscriptions with 99.99% uptime.',
    overview: 'Whether you run a high-volume diner, a busy auto repair shop, or an e-commerce brand, our merchant solutions lower your effective processing rate while providing modern terminals, automated chargeback defense, and instant Saturday/Sunday batch settlements.',
    features: [
      {
        title: 'Smart Dual-Screen POS Terminals',
        description: 'Pre-configured Clover, Pax, and Dejavoo touch terminals ready for tap-to-pay, chip, and Apple Pay/Google Pay.',
        iconName: 'Smartphone',
      },
      {
        title: 'Interchange-Plus Wholesale Pricing',
        description: 'Zero hidden gateway markups. Transparent wholesale basis point pass-through with no cancellation penalties.',
        iconName: 'Percent',
      },
      {
        title: 'Next-Day & Weekend Funding',
        description: 'Get Friday and Saturday receipts deposited directly into your business checking by Monday morning.',
        iconName: 'Zap',
      },
      {
        title: 'Automated Chargeback Protection',
        description: 'AI-assisted dispute evidence collection that wins back up to 78% of fraudulent consumer chargebacks.',
        iconName: 'ShieldCheck',
      },
    ],
    benefits: [
      { metric: '0.85%', label: 'Average Rate Reduction' },
      { metric: '24h', label: 'Batch Deposit Window' },
      { metric: '100%', label: 'PCI-DSS Level 1 Compliant' },
    ],
    faqs: [
      {
        question: 'Can I keep my existing point-of-sale hardware?',
        answer: 'Yes! In most cases we can reprogram your current hardware or provide complimentary upgraded EMV-compliant hardware.',
      },
      {
        question: 'Are there any early termination or cancellation fees?',
        answer: 'None. All OAL Network payment agreements are strictly month-to-month with no long-term lock-in contracts.',
      },
      {
        question: 'How quickly can our business start processing?',
        answer: 'Underwriting approval typically completes within 4 hours, and terminals ship pre-programmed via overnight courier.',
      },
    ],
    relatedSlugs: ['business-management', 'business-loans', 'bookkeeping-tax-prep'],
  },
  {
    id: 'sol-02',
    slug: 'business-management',
    title: 'Business Management',
    shortDesc: 'All-in-one ERP, employee scheduling, inventory control, and executive operational dashboards.',
    category: 'Operations & Strategy',
    badge: 'Operations',
    iconName: 'LayoutGrid',
    heroHeadline: 'Streamline Daily Operations, Payroll & Multi-Location Workflows',
    heroSub: 'Replace messy spreadsheets with an integrated operating system designed specifically for owner-operators and mid-sized teams.',
    overview: 'Managing inventory shrinkage, employee shifts, compliance deadlines, and vendor orders takes hours every week. We deploy unified operations management software paired with workflow coaching so your business runs like a precision machine.',
    features: [
      {
        title: 'Real-Time Inventory & PO Tracking',
        description: 'Automated reorder triggers, supplier lead-time tracking, and barcode inventory audits across all stores.',
        iconName: 'Boxes',
      },
      {
        title: 'Integrated Shift Scheduling & Payroll',
        description: 'GPS-verified mobile clock-ins, tip pooling automation, and direct one-click wage disbursements.',
        iconName: 'Users',
      },
      {
        title: 'Vendor Contract & Bill Management',
        description: 'Centralized vendor portal with optical character recognition (OCR) invoice parsing and approval workflows.',
        iconName: 'FileCheck',
      },
      {
        title: 'Executive KPI Dashboard',
        description: 'Live mobile visibility into daily labor costs, COGS, gross margins, and top-performing revenue centers.',
        iconName: 'BarChart3',
      },
    ],
    benefits: [
      { metric: '14 hrs', label: 'Saved Per Week on Admin' },
      { metric: '22%', label: 'Reduction in Overtime Costs' },
      { metric: '99.4%', label: 'Inventory Record Accuracy' },
    ],
    faqs: [
      {
        question: 'Does this integrate with QuickBooks or Xero?',
        answer: 'Yes, full two-way automatic synchronization with QuickBooks Online, Desktop, Xero, and Sage.',
      },
      {
        question: 'Will our staff need technical training?',
        answer: 'Your dedicated OAL operations coach conducts live team training and provides video onboarding guides for all staff.',
      },
    ],
    relatedSlugs: ['accept-payments', 'bookkeeping-tax-prep', 'customer-service-academy'],
  },
  {
    id: 'sol-03',
    slug: 'business-branding',
    title: 'Business Branding',
    shortDesc: 'Corporate identity, trademarks, brand guidelines, logo systems, and premium packaging design.',
    category: 'Growth & Marketing',
    badge: 'Brand Strategy',
    iconName: 'Palette',
    heroHeadline: 'Craft an Iconic Brand That Outshines Competitors and Commands Premium Pricing',
    heroSub: 'Elevate your visual identity from mom-and-pop to an authoritative, trustworthy market leader.',
    overview: 'Customers decide whether to trust your company in less than 3 seconds. Our branding directors construct cohesive corporate identities—including vector marks, brand books, uniform design, store signage, and digital collateral that build instant institutional credibility.',
    features: [
      {
        title: 'Comprehensive Brand Identity System',
        description: 'Custom primary mark, sub-marks, typography pairing, curated color palettes, and SVG asset libraries.',
        iconName: 'Sparkles',
      },
      {
        title: 'USP & Brand Voice Messaging Guide',
        description: 'Elevator pitches, positioning statements, and customer-facing copy frameworks tailored to your niche.',
        iconName: 'MessageSquareQuote',
      },
      {
        title: 'Collateral & Signage Production',
        description: 'Print-ready corporate stationary, vehicle wrap schematics, packaging boxes, and digital presentation decks.',
        iconName: 'Layers',
      },
      {
        title: 'USPTO Trademark Clearance Support',
        description: 'Pre-filing name clearance searches to ensure your brand name and logo mark can be defended nationally.',
        iconName: 'ShieldAlert',
      },
    ],
    benefits: [
      { metric: '3.2x', label: 'Customer Trust Lift' },
      { metric: '100%', label: 'Vector & Trademark Ready' },
      { metric: '10 Days', label: 'Average Identity Turnaround' },
    ],
    faqs: [
      {
        question: 'Do I own full copyright and intellectual property?',
        answer: 'Yes, 100% full transfer of commercial ownership, raw source files (.AI, .EPS, .FIG), and trademark rights upon completion.',
      },
      {
        question: 'What if we already have a logo and just need modernization?',
        answer: 'We specialize in brand refreshes—polishing your existing heritage mark into a sleek, modern visual language.',
      },
    ],
    relatedSlugs: ['website-design', 'marketing', 'business-plans'],
  },
  {
    id: 'sol-04',
    slug: 'build-business-credit',
    title: 'Build Business Credit',
    shortDesc: 'Establish Tier 1-4 business credit lines, Dun & Bradstreet PAYDEX 80+ scores without personal guarantees.',
    category: 'Capital & Finance',
    badge: 'Credit Building',
    iconName: 'ShieldCheck',
    heroHeadline: 'Separate Personal & Business Credit to Unlock $100k+ in Non-PG Corporate Lines',
    heroSub: 'Protect your family assets. Build an autonomous corporate credit file with D&B, Experian Commercial, and Equifax Business.',
    overview: 'Most owners make the fatal mistake of personally guaranteeing all debt. We guide you step-by-step through setting up your commercial credit profile, establishing Tier 1 net-30 vendor lines, graduating to revolving store credit, and unlocking cash credit lines that report purely to your EIN.',
    features: [
      {
        title: 'D-U-N-S® Registration & Profile Optimization',
        description: 'Proper SIC/NAICS classification, Secretary of State registry verification, and commercial Bureau sync.',
        iconName: 'FileText',
      },
      {
        title: 'Tier 1 Net-30 Vendor Accounts',
        description: 'Guaranteed approval for starter trade accounts that report prompt payment data directly to D&B and Experian.',
        iconName: 'TrendingUp',
      },
      {
        title: 'Tier 2 & 3 Fleet and Store Credit',
        description: 'Graduate to commercial gas fleet cards, hardware store lines, and commercial supplier accounts without personal SSN checks.',
        iconName: 'Truck',
      },
      {
        title: 'Unsecured Cash Revolvers',
        description: 'Achieve PAYDEX 80+ score to qualify for $50k to $250k institutional business credit cards and bank revolvers.',
        iconName: 'DollarSign',
      },
    ],
    benefits: [
      { metric: '80+', label: 'Target PAYDEX® Score' },
      { metric: '$150k+', label: 'Avg Non-PG Credit Achieved' },
      { metric: '60-90 Days', label: 'Average Profile Maturation' },
    ],
    faqs: [
      {
        question: 'Does this require my personal credit score?',
        answer: 'No. Our methodology builds an independent commercial credit bureau history attached solely to your company EIN.',
      },
      {
        question: 'Will our existing vendors report to credit bureaus?',
        answer: 'We help you convert current supplier trade accounts into bureau-reporting trade references.',
      },
    ],
    relatedSlugs: ['business-loans', 'business-plans', 'accept-payments'],
  },
  {
    id: 'sol-05',
    slug: 'business-plans',
    title: 'Business Plans',
    shortDesc: 'Bank-ready, SBA 7(a) compliant, and investor-grade business plans with 5-year pro-forma financial models.',
    category: 'Operations & Strategy',
    badge: 'Underwriting Ready',
    iconName: 'FileSpreadsheet',
    heroHeadline: 'Institutional Business Plans Designed to Secure Capital & SBA Approvals',
    heroSub: 'Crafted by former credit officers and corporate strategists. Comprehensive market research, SWOT analysis, and 5-year financial models.',
    overview: 'Commercial lenders reject over 70% of loan applications due to deficient business plans and unrealistic projections. We write bespoke, 35-50 page institutional business plans engineered to satisfy strict SBA underwriting guidelines, angel syndicates, and commercial credit committees.',
    pricingNote: 'Custom bank-ready business plan packages start around $2,500 and include 5-year pro-forma financial models, demographic feasibility studies, and direct lender consultation revisions.',
    features: [
      {
        title: '5-Year Pro-Forma Financial Architecture',
        description: 'Dynamic monthly cash flow statements, balance sheets, break-even analyses, and debt-service coverage ratio (DSCR) models.',
        iconName: 'Calculator',
      },
      {
        title: 'SBA 7(a) & 504 SOP Compliance Guarantee',
        description: 'Written to adhere strictly to current Small Business Administration Standard Operating Procedures.',
        iconName: 'Award',
      },
      {
        title: 'Hyper-Local Market & Competitor Research',
        description: 'Demographic heatmaps, customer acquisition cost benchmarks, and primary industry growth projections.',
        iconName: 'Search',
      },
      {
        title: 'Executive Pitch Deck Companion',
        description: 'A polished 12-slide presentation deck designed for angel investors, loan officers, and commercial landlords.',
        iconName: 'Sliders',
      },
    ],
    benefits: [
      { metric: '94.2%', label: 'Bank & SBA Acceptance Rate' },
      { metric: '$2,500', label: 'Packages Start Around' },
      { metric: '5-Year', label: 'Complete Pro-Forma Depth' },
    ],
    faqs: [
      {
        question: 'Why do packages start around $2,500?',
        answer: 'Unlike generic $200 automated templates that banks immediately reject, our plans are authored by veteran fractional CFOs and loan underwriters with bespoke financial modeling, source citations, and unlimited revisions until lender submission.',
      },
      {
        question: 'How long does a full business plan take to complete?',
        answer: 'Standard turnaround is 7 to 10 business days, with rush options available for pending loan committee deadlines.',
      },
      {
        question: 'Will you revise the plan if my lender asks for adjustments?',
        answer: 'Yes! We provide 60 days of complimentary revisions to address any questions from your credit committee or loan officer.',
      },
    ],
    relatedSlugs: ['business-loans', 'build-business-credit', 'business-branding'],
  },
  {
    id: 'sol-06',
    slug: 'business-loans',
    title: 'Business Loans',
    shortDesc: 'Working capital, term loans, SBA loans, equipment financing, and accounts receivable factoring up to $5M.',
    category: 'Capital & Finance',
    badge: 'Capital Sourcing',
    iconName: 'Landmark',
    heroHeadline: 'Access Up to $5,000,000 in Competitive Non-Dilutive Capital',
    heroSub: 'Connect with 40+ institutional private credit funds, regional banks, and non-predatory lenders through a single intake.',
    overview: 'Avoid predatory merchant cash advances with 40%+ factor rates. OAL Network matches creditworthy small businesses with structured working capital, SBA bridge facilities, inventory lines, and equipment loans with transparent amortization schedules.',
    features: [
      {
        title: 'Prime-Linked Working Capital Revolvers',
        description: 'Flexible revolving credit lines starting at Prime + 1.25% with interest charged solely on drawn capital.',
        iconName: 'TrendingUp',
      },
      {
        title: 'SBA 7(a) & Express Loans',
        description: 'Low-cost government guaranteed financing with 10 to 25 year terms for expansion, real estate, and refinancing.',
        iconName: 'Building2',
      },
      {
        title: 'Commercial Equipment & Fleet Leasing',
        description: 'Up to 100% financing on heavy machinery, delivery trucks, medical instruments, and commercial kitchen assets.',
        iconName: 'Truck',
      },
      {
        title: 'Invoice & Accounts Receivable Factoring',
        description: 'Immediate 90% advance against outstanding 30, 60, or 90-day commercial customer invoices.',
        iconName: 'CheckCircle',
      },
    ],
    benefits: [
      { metric: '$5M', label: 'Maximum Facility Ceiling' },
      { metric: '48h', label: 'Initial Term Sheet' },
      { metric: '0%', label: 'Warrant or Equity Dilution' },
    ],
    faqs: [
      {
        question: 'What is the minimum operating history required?',
        answer: 'We have facilities for businesses operating for at least 6 months with $15,000+ monthly revenue, as well as SBA options for established companies.',
      },
      {
        question: 'Will applying trigger a hard credit inquiry?',
        answer: 'No. Our preliminary pre-qualification uses a soft pull that will not impact your credit score.',
      },
    ],
    relatedSlugs: ['build-business-credit', 'business-plans', 'accept-payments'],
  },
  {
    id: 'sol-07',
    slug: 'lead-generation',
    title: 'Lead Generation',
    shortDesc: 'Predictable high-intent customer acquisition pipelines, localized SEO, and automated appointment setting.',
    category: 'Growth & Marketing',
    badge: 'Revenue Growth',
    iconName: 'Target',
    heroHeadline: 'Fill Your Calendar with High-Intent Commercial & Consumer Leads',
    heroSub: 'Stop relying on word-of-mouth. Build an automated lead machine that delivers exclusive quotes and appointments every week.',
    overview: 'Inconsistent lead flow is the #1 killer of small businesses. We build end-to-end customer acquisition engines tailored to your specific trade—combining Google Local Services Ads, programmatic geo-targeting, conversion funnels, and SMS speed-to-lead follow-up.',
    features: [
      {
        title: 'Google Guaranteed & Local Services Ads',
        description: 'Rank at the absolute top of Google with the green checkmark badge, paying only for verified phone calls.',
        iconName: 'Zap',
      },
      {
        title: 'High-Converting Landing Pages',
        description: 'Mobile-first funnel pages built with social proof, urgency triggers, and instant appointment booking.',
        iconName: 'MousePointerClick',
      },
      {
        title: 'Speed-to-Lead SMS & AI Voice Bot',
        description: 'Engage new inquiries within 60 seconds via automated text messages before they call your competitors.',
        iconName: 'MessageSquare',
      },
      {
        title: 'B2B Account-Based Outreach',
        description: 'Direct email and LinkedIn prospecting sequences that get you meetings with corporate decision makers.',
        iconName: 'Users',
      },
    ],
    benefits: [
      { metric: '< 60s', label: 'Average Speed to Lead' },
      { metric: '3.8x', label: 'Average Pipeline ROI' },
      { metric: '100%', label: 'Exclusive (Never Shared)' },
    ],
    faqs: [
      {
        question: 'Are leads shared with my competitors?',
        answer: 'Never. Every lead generated is 100% exclusive to your business and routed directly to your phone or CRM.',
      },
      {
        question: 'How do you track return on investment?',
        answer: 'You receive a live real-time dashboard tracking cost-per-lead, booked appointments, and closed deal revenue.',
      },
    ],
    relatedSlugs: ['marketing', 'website-design', 'customer-service-academy'],
  },
  {
    id: 'sol-08',
    slug: 'customer-service-academy',
    title: 'Customer Service Academy',
    shortDesc: 'Frontline staff training, phone etiquette certification, de-escalation mastery, and 5-star review generation.',
    category: 'Operations & Strategy',
    badge: 'Staff Excellence',
    iconName: 'GraduationCap',
    heroHeadline: 'Turn Frontline Staff into 5-Star Brand Champions & Revenue Drivers',
    heroSub: 'Equip receptionists, dispatchers, and counter staff with certified communication skills that increase retention and drive referrals.',
    overview: 'Losing customers over rude phone etiquette or mishandled complaints costs thousands. Our Customer Service Academy provides video courses, role-playing workshops, script playbooks, and employee certifications that transform customer interactions into glowing 5-star Google reviews.',
    features: [
      {
        title: 'Inbound Call & Dispatch Playbooks',
        description: 'Standard operating scripts for greeting callers, qualifying opportunities, and booking consultations smoothly.',
        iconName: 'PhoneCall',
      },
      {
        title: 'Conflict De-Escalation Mastery',
        description: 'Proven psychological techniques to soothe upset clients and transform service failures into loyal advocates.',
        iconName: 'HeartHandshake',
      },
      {
        title: 'Automated 5-Star Review Funnel',
        description: 'Training staff on how to solicit Google and Yelp reviews naturally at the exact moment of peak satisfaction.',
        iconName: 'Star',
      },
      {
        title: 'Employee Certification & Testing',
        description: 'Interactive quizzes, secret shopper evaluations, and graduation certificates for every team member.',
        iconName: 'Award',
      },
    ],
    benefits: [
      { metric: '+48%', label: 'Increase in 5-Star Reviews' },
      { metric: '82%', label: 'First-Call Resolution Rate' },
      { metric: '100%', label: 'Certified Team Modules' },
    ],
    faqs: [
      {
        question: 'Can the training be completed online?',
        answer: 'Yes! Modules are accessible 24/7 on mobile and desktop with bite-sized 10-minute video lessons.',
      },
      {
        question: 'Is this applicable to remote or in-house teams?',
        answer: 'The curriculum is built for both remote customer support agents and brick-and-mortar storefront staff.',
      },
    ],
    relatedSlugs: ['business-management', 'lead-generation', 'marketing'],
  },
  {
    id: 'sol-09',
    slug: 'cyber-security',
    title: 'Cyber Security',
    shortDesc: 'Ransomware defense, employee phishing simulations, endpoint security, and compliance readiness (HIPAA, PCI).',
    category: 'Tech & Security',
    badge: 'Enterprise Defense',
    iconName: 'ShieldAlert',
    heroHeadline: 'Bank-Grade Cyber Defense Engineered for Vulnerable Small Businesses',
    heroSub: 'Protect your financial accounts, client records, and business reputation from debilitating ransomware attacks.',
    overview: 'Over 60% of small businesses targeted by ransomware shut down within six months. We install enterprise-grade managed detection and response (MDR), dark web credential monitoring, immutable cloud backups, and staff training so your data stays locked down.',
    features: [
      {
        title: '24/7 Managed Endpoint Detection (EDR)',
        description: 'Real-time AI monitoring that blocks zero-day malware, suspicious scripts, and unauthorized access attempts.',
        iconName: 'Cpu',
      },
      {
        title: 'Automated Immutable Cloud Backups',
        description: 'Air-gapped, encrypted daily snapshots that guarantee 100% recovery even if local servers are encrypted by ransomware.',
        iconName: 'Database',
      },
      {
        title: 'Phishing Defense & Staff Drills',
        description: 'Simulated email phishing attacks and instant micro-coaching for employees who accidentally click suspicious links.',
        iconName: 'MailWarning',
      },
      {
        title: 'Regulatory Compliance Audits',
        description: 'Ensure strict compliance with HIPAA, PCI-DSS Level 1, FTC Safeguards Rule, and state privacy mandates.',
        iconName: 'FileCheck2',
      },
    ],
    benefits: [
      { metric: '24/7/365', label: 'SOC Security Monitoring' },
      { metric: '15 Min', label: 'Threat Isolation SLA' },
      { metric: '$1M', label: 'Cyber Insurance Policy Support' },
    ],
    faqs: [
      {
        question: 'Will this slow down our computers?',
        answer: 'Not at all. Our lightweight agent consumes less than 1% of system resources and runs silently in the background.',
      },
      {
        question: 'Do we qualify for cyber liability insurance with this setup?',
        answer: 'Yes! Implementing our protocols satisfies the strict multi-factor authentication (MFA) and EDR requirements demanded by insurers.',
      },
    ],
    relatedSlugs: ['it-solutions', 'insurance', 'website-design'],
  },
  {
    id: 'sol-10',
    slug: 'find-jobs',
    title: 'Find Jobs',
    shortDesc: 'Commercial contract matchmaking, municipal bidding opportunities, and corporate talent placement.',
    category: 'Operations & Strategy',
    badge: 'Talent & Contracts',
    iconName: 'Briefcase',
    heroHeadline: 'Connect with Lucrative Commercial Contracts & Top-Tier Industry Talent',
    heroSub: 'Bid on government and enterprise RFP contracts or recruit certified specialists to scale your operation.',
    overview: 'Whether you are a subcontractor searching for commercial HVAC and trucking contracts or an owner seeking an experienced general manager, our job and contract network connects you directly with verified opportunities across all 50 states.',
    features: [
      {
        title: 'State & Federal RFP Bid Notification',
        description: 'Curated notifications for lucrative municipal, county, and federal contracts matching your exact NAICS codes.',
        iconName: 'Bell',
      },
      {
        title: 'Commercial Subcontractor Network',
        description: 'Direct partnerships with prime contractors seeking qualified minority, veteran, and small business partners.',
        iconName: 'Network',
      },
      {
        title: 'Key Executive & Management Recruitment',
        description: 'Candidate screening and placement for general managers, controllers, operations directors, and head chefs.',
        iconName: 'UserCheck',
      },
      {
        title: 'Prevailing Wage & Certified Payroll Help',
        description: 'Advisory on certified payroll reporting and Davis-Bacon compliance when working government contracts.',
        iconName: 'FileSpreadsheet',
      },
    ],
    benefits: [
      { metric: '1,200+', label: 'Active Monthly Contract Feeds' },
      { metric: '50 States', label: 'National Coverage' },
      { metric: '14 Days', label: 'Average Placement Time' },
    ],
    faqs: [
      {
        question: 'Can you help us get certified as an MBE / WBE / VOSB?',
        answer: 'Yes! Our advisory team assists with all paperwork for federal and state minority, women, and veteran certifications.',
      },
      {
        question: 'How do job seekers apply for roles?',
        answer: 'Job seekers can apply directly through our careers portal with instant skills matching.',
      },
    ],
    relatedSlugs: ['business-management', 'affiliates-partners', 'customer-service-academy'],
  },
  {
    id: 'sol-11',
    slug: 'insurance',
    title: 'Insurance',
    shortDesc: 'General liability, commercial property, workers comp, commercial auto, and cyber liability tailored for SMBs.',
    category: 'Capital & Finance',
    badge: 'Asset Protection',
    iconName: 'Shield',
    heroHeadline: 'Comprehensive Business Insurance with Broad Coverage & Wholesale Premiums',
    heroSub: 'Safeguard your company, commercial vehicles, and key employees against devastating liabilities and lawsuits.',
    overview: 'Don\'t wait for a slip-and-fall or vehicle collision to discover your policy has glaring coverage exclusions. We broker direct quotes through top A-rated commercial carriers, bundling general liability, workers comp, and commercial umbrella policies to cut costs while eliminating dangerous coverage gaps.',
    features: [
      {
        title: 'Commercial General Liability (CGL)',
        description: 'Protection against third-party bodily injury, property damage, advertising liability, and legal defense costs.',
        iconName: 'ShieldCheck',
      },
      {
        title: 'Pay-As-You-Go Workers\' Compensation',
        description: 'Eliminate brutal year-end audit surprises with premiums tied directly to your actual real-time payroll figures.',
        iconName: 'Users',
      },
      {
        title: 'Commercial Auto & Fleet Coverage',
        description: 'High-limit liability, collision, and cargo insurance for box trucks, semi-trucks, service vans, and fleets.',
        iconName: 'Truck',
      },
      {
        title: 'Key Person & Business Overhead Protection',
        description: 'Ensures your business continues paying debt service and bills if an owner or partner suffers a critical medical event.',
        iconName: 'HeartPulse',
      },
    ],
    benefits: [
      { metric: '26%', label: 'Average Premium Savings' },
      { metric: '$2M+', label: 'Standard Aggregate Limits' },
      { metric: 'Same Day', label: 'Certificates of Insurance (COI)' },
    ],
    faqs: [
      {
        question: 'How quickly can I get a Certificate of Insurance (COI) for a job site?',
        answer: 'Instant digital COIs are issued within 15 minutes through our 24/7 client portal.',
      },
      {
        question: 'Can you bundle our policies for an extra discount?',
        answer: 'Yes, bundling General Liability, Property (BOP), and Commercial Auto yields up to 25% in annual multi-policy discounts.',
      },
    ],
    relatedSlugs: ['cyber-security', 'business-loans', 'business-management'],
  },
  {
    id: 'sol-12',
    slug: 'it-solutions',
    title: 'IT Solutions',
    shortDesc: 'Managed IT support, cloud VoIP phone systems, Microsoft 365 / Google Workspace migration, and network hardware.',
    category: 'Tech & Security',
    badge: 'Managed IT',
    iconName: 'Server',
    heroHeadline: 'Enterprise-Caliber IT Support Without the Full-Time Enterprise Overhead',
    heroSub: 'Fast-responding helpdesk support, secure cloud migrations, ultra-reliable VoIP phone trees, and managed Wi-Fi networks.',
    overview: 'When computers crash or phone systems glitch, your revenue grinds to a halt. Our managed IT services provide unlimited helpdesk support, proactive patch management, high-speed business Wi-Fi design, and cloud migrations so your team stays productive anywhere.',
    features: [
      {
        title: 'Unlimited Helpdesk & Remote Support',
        description: 'US-based technicians available via chat, phone, and screen-share with an average response time under 8 minutes.',
        iconName: 'Headphones',
      },
      {
        title: 'Cloud VoIP Business Phone Systems',
        description: 'HD mobile phone apps, automated receptionists, call recording, and SMS texting from your main business number.',
        iconName: 'Phone',
      },
      {
        title: 'Managed Network & Commercial Wi-Fi',
        description: 'Dual-band mesh Wi-Fi with isolated secure guest networks, firewall hardware, and 4G LTE cellular failover.',
        iconName: 'Wifi',
      },
      {
        title: 'Google Workspace & Microsoft 365 Cloud',
        description: 'Professional domain email addresses, cloud file syncing, device encryption, and spam quarantine.',
        iconName: 'Cloud',
      },
    ],
    benefits: [
      { metric: '< 8 Min', label: 'Average Support Response' },
      { metric: '99.9%', label: 'VoIP Phone System Uptime' },
      { metric: '100%', label: 'Cloud Redundancy' },
    ],
    faqs: [
      {
        question: 'Do you offer on-site support if hardware fails?',
        answer: 'Yes! We dispatch field technicians nationwide for physical router replacements, cable runs, and server setups.',
      },
      {
        question: 'Can we port our existing business phone numbers?',
        answer: 'Yes, all existing phone numbers are ported seamlessly with zero interruption to your incoming customer calls.',
      },
    ],
    relatedSlugs: ['cyber-security', 'website-design', 'business-management'],
  },
  {
    id: 'sol-13',
    slug: 'marketing',
    title: 'Marketing',
    shortDesc: 'Social media management, paid search ads (Google/Meta), email automations, and localized billboard campaigns.',
    category: 'Growth & Marketing',
    badge: 'Growth Engines',
    iconName: 'Megaphone',
    heroHeadline: 'Multi-Channel Marketing That Drives Measurable In-Store & Online Revenue',
    heroSub: 'Target high-value local prospects with thumb-stopping creative, precision ad bidding, and automated email nurturing.',
    overview: 'Stop burning cash on ineffective "boosted posts". Our growth team engineers full-funnel marketing campaigns—combining high-intent Google search ads, viral TikTok/Instagram Reels content, automated SMS promotions, and print collateral that turns neighborhood awareness into repeat revenue.',
    features: [
      {
        title: 'Google Search & PMax Ad Campaigns',
        description: 'Bid on exact high-intent keywords like "emergency plumber near me" or "best catering service" with negative keyword pruning.',
        iconName: 'Search',
      },
      {
        title: 'Social Video & Reels Creation',
        description: 'Professional short-form video editing, graphics, and trend-aligned storytelling that build engaged local followers.',
        iconName: 'Video',
      },
      {
        title: 'Automated Email & SMS Sequences',
        description: 'Birthday offers, abandoned cart reminders, VIP loyalty rewards, and reactivation blasts that re-engage past buyers.',
        iconName: 'MailCheck',
      },
      {
        title: 'Retargeting & Lookalike Audiences',
        description: 'Show follow-up ads across the web to anyone who visited your website without calling, boosting conversions by 45%.',
        iconName: 'RefreshCw',
      },
    ],
    benefits: [
      { metric: '4.6x', label: 'Average ROAS on Ad Spend' },
      { metric: '+310%', label: 'Increase in Brand Engagement' },
      { metric: '100%', label: 'Live Attributed Revenue Tracking' },
    ],
    faqs: [
      {
        question: 'What is the recommended monthly ad budget?',
        answer: 'We tailor strategies for budgets starting at $500/month up to $50,000/month, ensuring maximum return on every dollar.',
      },
      {
        question: 'Do you provide detailed performance reports?',
        answer: 'Yes, you get a 24/7 transparent live analytics dashboard and bi-weekly strategy calls with your dedicated marketing manager.',
      },
    ],
    relatedSlugs: ['lead-generation', 'website-design', 'business-branding'],
  },
  {
    id: 'sol-14',
    slug: 'affiliates-partners',
    title: 'Affiliates & Partners',
    shortDesc: 'Monetize referrals, partner with high-commission fintech programs, and build co-marketing alliances.',
    category: 'Operations & Strategy',
    badge: 'Ecosystem Growth',
    iconName: 'Handshake',
    heroHeadline: 'Unlock Recurring Passive Revenue as an OAL Certified Affiliate or Partner',
    heroSub: 'Earn up to $1,500+ per funded referral and recurring revenue shares by recommending solutions your clients already need.',
    overview: 'Whether you are a CPA, business broker, commercial real estate agent, podcaster, or community leader, our partner ecosystem rewards you handsomely for connecting small businesses with our capital facilities, payment solutions, and advisory services.',
    features: [
      {
        title: 'High-Commission Referral Payouts',
        description: 'Earn generous upfront finder fees on funded loans, plus monthly recurring revenue shares on active merchant terminals.',
        iconName: 'DollarSign',
      },
      {
        title: 'Dedicated Partner Dashboard',
        description: 'Track client application progress, funded loan amounts, and accrued commission earnings in real-time.',
        iconName: 'BarChart',
      },
      {
        title: 'Co-Branded Marketing Collateral',
        description: 'Custom landing pages, digital flyers, email templates, and presentations branded with your firm\'s logo.',
        iconName: 'Share2',
      },
      {
        title: 'Fiduciary White-Glove Support',
        description: 'Your referred clients receive priority VIP underwriting and dedicated fractional CFO consultations.',
        iconName: 'ShieldCheck',
      },
    ],
    benefits: [
      { metric: 'Up to $1,500', label: 'Per Funded Facility Referral' },
      { metric: 'Recurring', label: 'Monthly Merchant Rev-Share' },
      { metric: '48h', label: 'Fast Partner Payouts' },
    ],
    faqs: [
      {
        question: 'Who makes an ideal OAL Partner?',
        answer: 'CPAs, commercial real estate brokers, attorneys, bookkeepers, marketing agencies, and community chambers of commerce.',
      },
      {
        question: 'Is there any fee to join the affiliate network?',
        answer: 'No. Joining the OAL Partner Network is 100% free with immediate access to portal tracking and marketing assets.',
      },
    ],
    relatedSlugs: ['business-loans', 'business-management', 'find-jobs'],
  },
  {
    id: 'sol-15',
    slug: 'bookkeeping-tax-prep',
    title: 'Bookkeeping & Tax Prep',
    shortDesc: 'Monthly reconciliation, corporate tax strategy (1120-S, 1065), clean financial statements, and audit defense.',
    category: 'Capital & Finance',
    badge: 'Tax & Compliance',
    iconName: 'FileSpreadsheet',
    heroHeadline: 'Accurate Books & Aggressive Legal Tax Strategy Tailored for Small Businesses',
    heroSub: 'Stop scrambling at tax season. Enjoy monthly reconciled financial statements and proactive legal tax reduction planning.',
    overview: 'Missing deductions and messy bank records don\'t just cause IRS headaches—they disqualify you from bank loans and credit lines. Our certified bookkeepers and CPAs handle monthly reconciliations, payroll tax filings, and tax strategy to slash your taxable liability.',
    features: [
      {
        title: 'Monthly Categorization & Bank Reconciliation',
        description: 'Every receipt, debit, and credit matched accurately in QuickBooks or Xero with zero backlog.',
        iconName: 'CheckSquare',
      },
      {
        title: 'Proactive Corporate Tax Strategy',
        description: 'Legally minimize self-employment taxes through S-Corp election optimization, Section 179 depreciation, and Augusta rules.',
        iconName: 'Scale',
      },
      {
        title: 'Annual Federal & State Tax Filing',
        description: 'Full preparation and electronic filing for Forms 1120-S, 1065, 1120, and Schedule C by licensed CPAs.',
        iconName: 'FileText',
      },
      {
        title: 'CFO-Ready Monthly P&L and Balance Sheet',
        description: 'Detailed monthly financial statements delivered by the 10th of every month, ready for banks and investors.',
        iconName: 'BarChart2',
      },
    ],
    benefits: [
      { metric: '$18,400', label: 'Average Annual Tax Savings' },
      { metric: 'By the 10th', label: 'Monthly Close Delivery' },
      { metric: '100%', label: 'Audit Defense Included' },
    ],
    faqs: [
      {
        question: 'Can you clean up messy historical books from previous years?',
        answer: 'Yes! We specialize in "catch-up bookkeeping" to get multiple back years organized, reconciled, and filed accurately.',
      },
      {
        question: 'Do you handle multi-state sales tax reporting?',
        answer: 'Yes, we automate multi-state economic nexus tracking and state sales tax filings for retail and online stores.',
      },
    ],
    relatedSlugs: ['business-loans', 'business-plans', 'accept-payments'],
  },
  {
    id: 'sol-16',
    slug: 'website-design',
    title: 'Website Design',
    shortDesc: 'Modern mobile-first websites, high-speed performance, SEO architecture, online booking, and e-commerce stores.',
    category: 'Tech & Security',
    badge: 'Digital Presence',
    iconName: 'Globe',
    heroHeadline: 'Stunning, Lightning-Fast Websites Engineered to Convert Visitors into Paying Customers',
    heroSub: 'Leave clunky templates behind. Get a modern, mobile-responsive custom website built for local SEO dominance and instant bookings.',
    overview: 'Your website is your company\'s digital headquarters. If it is slow, outdated, or confusing on mobile phones, prospects immediately bounce to your competitors. We build custom, ultra-fast websites with interactive quote calculators, online appointment booking, and Google search dominance.',
    features: [
      {
        title: 'Custom Mobile-First Responsive Design',
        description: 'Handcrafted layouts that load under 1.2 seconds on 4G mobile devices, ensuring zero lost customers.',
        iconName: 'Smartphone',
      },
      {
        title: 'Integrated Booking & Online Ordering',
        description: 'Allow clients to reserve appointments, request quotes, or purchase products 24 hours a day without calling.',
        iconName: 'CalendarCheck',
      },
      {
        title: 'Local SEO & Schema Architecture',
        description: 'Engineered with structured data markup and localized service keywords so Google ranks you in the local 3-pack.',
        iconName: 'Search',
      },
      {
        title: 'Managed Hosting & Security Maintenance',
        description: 'Ultra-fast CDN hosting, free SSL encryption, daily backups, and unlimited minor content edits included.',
        iconName: 'ShieldCheck',
      },
    ],
    benefits: [
      { metric: '< 1.2s', label: 'Page Load Speed' },
      { metric: '2.9x', label: 'Conversion Rate Increase' },
      { metric: '100%', label: 'Mobile Optimized' },
    ],
    faqs: [
      {
        question: 'How long does a new custom website take to launch?',
        answer: 'Typical turnaround is 7 to 14 business days from kickoff to final deployment.',
      },
      {
        question: 'Will I be able to edit text and photos myself?',
        answer: 'Yes! We provide an intuitive visual content editor and a 20-minute video walkthrough showing how to make updates anytime.',
      },
    ],
    relatedSlugs: ['business-branding', 'lead-generation', 'marketing'],
  },
]

export const INDUSTRIES_SERVED = [
  { name: 'Restaurants & Bars', icon: 'UtensilsCrossed', highlight: 'POS + Working Capital' },
  { name: 'Trucking & Freight', icon: 'Truck', highlight: 'Equipment Lines + Factoring' },
  { name: 'Salons & Spas', icon: 'Scissors', highlight: 'Online Booking + Brand' },
  { name: 'Churches & Non-Profits', icon: 'Church', highlight: 'Payment Gateways + Grants' },
  { name: 'Real Estate & Property', icon: 'Building', highlight: 'Lead Gen + Legal Structuring' },
  { name: 'Healthcare & Clinics', icon: 'Stethoscope', highlight: 'HIPAA IT + Medical Billing' },
  { name: 'Construction & Trades', icon: 'Hammer', highlight: 'Bid Contracts + Equipment' },
  { name: 'Auto Repair & Sales', icon: 'Car', highlight: 'Inventory Revolver + POS' },
  { name: 'Retail & Boutiques', icon: 'ShoppingBag', highlight: 'Omnichannel eCommerce' },
  { name: 'Daycares & Education', icon: 'Baby', highlight: 'Tuition Auto-Debit + Insurance' },
  { name: 'Professional Services', icon: 'Briefcase', highlight: 'Fractional CFO + Tax Strategy' },
  { name: 'Manufacturing & Plants', icon: 'Factory', highlight: 'SBA 504 + Commercial Credit' },
]

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Free Discovery & Needs Audit',
    description: 'We analyze your current operations, credit profile, and cash flow gaps in a 20-minute consultation.',
  },
  {
    step: '02',
    title: 'Bespoke Blueprint & Solution Mapping',
    description: 'You receive a customized action plan selecting the exact solutions (from capital to branding) needed to scale.',
  },
  {
    step: '03',
    title: 'Rapid Capital & Tool Deployment',
    description: 'We wire funding, deploy modern software, build web assets, and set up merchant systems in days, not months.',
  },
  {
    step: '04',
    title: '1-on-1 Business Coaching & Execution',
    description: 'Your dedicated business coach reviews metrics monthly, ensuring your business stays profitable and growing.',
  },
]

export const TESTIMONIALS_DATA = [
  {
    id: 't-1',
    name: 'Carlos Mendoza',
    business: 'El Fuego Cantina & Grill',
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    quote: 'OAL Network saved us $1,800 a month on payment processing and provided a $150k expansion loan in 3 days. Our business coach helped us launch a second location smoothly.',
    rating: 5,
    metric: 'Saved $21,600/yr in processing fees',
  },
  {
    id: 't-2',
    name: 'Tamara Jenkins',
    business: 'Jenkins Freight Haulers LLC',
    location: 'Atlanta, GA',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    quote: 'Before OAL Network, broker invoice delays killed our cash flow. They set up our business credit, got us commercial equipment leases, and gave us an actual growth blueprint.',
    rating: 5,
    metric: 'Built 84 PAYDEX score in 75 days',
  },
  {
    id: 't-3',
    name: 'Dr. Aaron Levine',
    business: 'Levine Family Dental & Ortho',
    location: 'Denver, CO',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    quote: 'Their business plan team wrote an SBA 7(a) package that secured our $850k practice purchase. Their Customer Service Academy trained our front desk to convert 30% more consultations.',
    rating: 5,
    metric: '$850k SBA loan approved on 1st submission',
  },
  {
    id: 't-4',
    name: 'Maya Lin',
    business: 'Lumina Skin & Wellness Spa',
    location: 'Seattle, WA',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    quote: 'They built our luxury branding, redesigned our website with automatic booking, and created a lead engine that filled our appointment books for 6 straight months.',
    rating: 5,
    metric: '240% increase in booked treatments',
  },
]
