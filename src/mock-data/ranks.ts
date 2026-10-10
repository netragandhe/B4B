/**
 * Ranks and Promotions Mock Data & Types
 * Sourced strictly from client document:
 * "Leadership Qualification - B4B America software.docx"
 *
 * Rules:
 * 1. No invented numbers or stats.
 * 2. Unconfirmed or conflicting items labeled [CLIENT TO CONFIRM].
 * 3. 9 strictly ordered ranks (cannot be reordered).
 */

export interface RankData {
  id: string
  level: number // 1 to 9
  name: string
  statusTitle: string // e.g. "Entry Level", "Level II / (2)"
  monthlyCommissionMin: number | null
  monthlyCommissionMax: number | null
  yearlyIncomeMin: number | null
  yearlyIncomeMax: number | null
  yearlyIncomeDisplay: string // e.g. "$30,000.00 or Less", "30-50k"
  requiredConsecutiveMonths: number | null
  requiredTeamMembers: number | null
  requiredTeamMonthlyCommissionMin: number | null
  requiredTeamMonthlyCommissionMax: number | null
  experienceRequirement: string // e.g. "2+ years", "3-5 years"
  termsDescription: string // Rich text HTML for terms and qualification criteria
  clientNotes: string[] // Conflicting or missing details flagged for client
}

export interface RanksPolicyDocument {
  id: string
  title: string
  generalPolicyTerms: string // Rich text HTML for "Promotion Policy and General Terms"
  ranks: RankData[] // All 9 ranks
  lastEditedBy: string
  lastEditedAt: string // ISO string
  publishedAt?: string | null
  publishedBy?: string | null
  version: number
  isPublished: boolean
}

export interface RankVersion {
  id: string
  versionNumber: number
  label: string // e.g. "Draft Autosave", "Published v1.0", "Manual Save"
  timestamp: string
  editedBy: string
  document: RanksPolicyDocument
}

export interface CoachChecklistItem {
  id: string
  label: string
  requiredText: string
  currentText: string
  completed: boolean
}

export interface CoachProgress {
  coachId: string
  coachName: string
  currentRankLevel: number
  currentRankTitle: string
  targetRankLevel: number
  targetRankTitle: string
  personalMonthlyCommissionCurrent: number
  personalMonthlyCommissionTarget: number
  consecutiveMonthsCurrent: number
  consecutiveMonthsTarget: number
  activeTeamMembersCurrent: number
  activeTeamMembersTarget: number
  teamMonthlyCommissionCurrent: number
  teamMonthlyCommissionTarget: number
  experienceYearsCurrent: number
  checklist: CoachChecklistItem[]
}

/**
 * Initial 9 Ranks from client document
 */
export const INITIAL_9_RANKS: RankData[] = [
  {
    id: 'rank-1',
    level: 1,
    name: 'Account Executive',
    statusTitle: 'Entry Level',
    monthlyCommissionMin: 0,
    monthlyCommissionMax: 2500,
    yearlyIncomeMin: 0,
    yearlyIncomeMax: 30000,
    yearlyIncomeDisplay: '$30,000.00 or Less',
    requiredConsecutiveMonths: 3,
    requiredTeamMembers: 0,
    requiredTeamMonthlyCommissionMin: null,
    requiredTeamMonthlyCommissionMax: null,
    experienceRequirement: 'None (Entry Level)',
    termsDescription: `<p><strong>Title Description:</strong> Better Business Relations Account Executive [Entry Level].</p>
<p><strong>Personal Monthly Commission (PMC):</strong> $0 - $2,500.00 PMC.</p>
<p><strong>Approximate Yearly Income:</strong> $30,000.00 or Less.</p>
<p><strong>Promotion Requirement:</strong> When rep generates <strong>3 consecutive</strong> Personal Monthly Commissions (PMC) of <strong>$3,150.00+</strong>, rep will be automatically promoted to <em>"Relationship Coordinator II"</em>.</p>`,
    clientNotes: [
      'Automatic promotion triggers at 3 consecutive months of $3,150.00+ PMC.',
    ],
  },
  {
    id: 'rank-2',
    level: 2,
    name: 'Relationship Coordinator II',
    statusTitle: 'Level II / (2)',
    monthlyCommissionMin: 3150,
    monthlyCommissionMax: 4175,
    yearlyIncomeMin: 30000,
    yearlyIncomeMax: 50000,
    yearlyIncomeDisplay: '$30,000 - $50,000 (30-50k)',
    requiredConsecutiveMonths: 3,
    requiredTeamMembers: 0,
    requiredTeamMonthlyCommissionMin: null,
    requiredTeamMonthlyCommissionMax: null,
    experienceRequirement: 'Demonstrated consistency at Level 1',
    termsDescription: `<p><strong>Title Description:</strong> Relationship Coordinator II [Level II / (2)].</p>
<p><strong>Personal Monthly Commission (PMC):</strong> $3,150.00 - $4,175.00 PMC.</p>
<p><strong>Approximate Yearly Income:</strong> $30,000 - $50,000.</p>
<p><strong>Promotion Requirement:</strong> When rep generates <strong>3 consecutive</strong> Personal Monthly Incomes (PMI) of <strong>$4,150.00+</strong>, rep will be automatically promoted to <em>"Senior Executive"</em>.</p>`,
    clientNotes: [
      'Document notes a $650 gap between Level 1 max ($2,500.00) and Level 2 min ($3,150.00). [CLIENT TO CONFIRM if intermediate commission tier applies].',
    ],
  },
  {
    id: 'rank-3',
    level: 3,
    name: 'Senior Executive',
    statusTitle: 'Level III / (3)',
    monthlyCommissionMin: 4200,
    monthlyCommissionMax: 6250,
    yearlyIncomeMin: 50000,
    yearlyIncomeMax: 75000,
    yearlyIncomeDisplay: '$50,000 - $75,000 (50-75k)',
    requiredConsecutiveMonths: 3,
    requiredTeamMembers: 3,
    requiredTeamMonthlyCommissionMin: null,
    requiredTeamMonthlyCommissionMax: null,
    experienceRequirement: '1+ years proven performance',
    termsDescription: `<p><strong>Title Description:</strong> Senior Executive [Level III / (3)].</p>
<p><strong>Personal Monthly Commission (PMC):</strong> $4,200.00 - $6,250.00 PMC.</p>
<p><strong>Approximate Yearly Income:</strong> $50,000 - $75,000.</p>
<p><strong>Promotion Requirement:</strong> Rep will be promoted when produced <strong>(3) Three</strong> Personal Monthly Incomes (PMI) of <strong>$6,250.00+</strong> and have recruited <strong>3 active team members</strong>.</p>`,
    clientNotes: [
      '[CLIENT TO CONFIRM: Document text says "promoted to Area Manager", but official Level 4 title is "District Leader". Confirmation needed on whether Area Manager is synonymous or an alternate track].',
    ],
  },
  {
    id: 'rank-4',
    level: 4,
    name: 'District Leader',
    statusTitle: 'Level IV / (4)',
    monthlyCommissionMin: 6300,
    monthlyCommissionMax: 8350,
    yearlyIncomeMin: 75000,
    yearlyIncomeMax: 100000,
    yearlyIncomeDisplay: '$75,000 - $100,000 (75-100K)',
    requiredConsecutiveMonths: 3,
    requiredTeamMembers: 3,
    requiredTeamMonthlyCommissionMin: 50000,
    requiredTeamMonthlyCommissionMax: null,
    experienceRequirement: 'Veteran with 2+ years of experience',
    termsDescription: `<p><strong>Title Description:</strong> District Leader [Level IV / (4)].</p>
<p><strong>Personal Monthly Commission (PMC):</strong> $6,300.00 - $8,350.00 PMC.</p>
<p><strong>Approximate Yearly Income:</strong> $75,000 - $100,000.</p>
<p><strong>Experience:</strong> Considered a veteran with <strong>2+ years of experience</strong>.</p>
<p><strong>Promotion Requirement:</strong></p>
<ul>
  <li>Must produce <strong>(3) Three consecutive</strong> (PMC) of <strong>$8,350.00+</strong> and have recruited <strong>Three (3) active team members</strong> (SE, RC, or AE); <em>OR</em></li>
  <li>Team Monthly Commission (TMC) of <strong>$50,000.00</strong>.</li>
</ul>`,
    clientNotes: [
      'Alternative qualification pathway: Personal commission & 3 team members OR $50,000 TMC.',
    ],
  },
  {
    id: 'rank-5',
    level: 5,
    name: 'Regional Leader',
    statusTitle: 'Level V / (5)',
    monthlyCommissionMin: 8400,
    monthlyCommissionMax: 14580,
    yearlyIncomeMin: 100000,
    yearlyIncomeMax: 175000,
    yearlyIncomeDisplay: '$100,000 - $175,000 (100-175K)',
    requiredConsecutiveMonths: 3,
    requiredTeamMembers: 2,
    requiredTeamMonthlyCommissionMin: 51000,
    requiredTeamMonthlyCommissionMax: 100000,
    experienceRequirement: '2 - 3 years experience',
    termsDescription: `<p><strong>Title Description:</strong> Regional Leader [Level V / (5)].</p>
<p><strong>Personal Monthly Commission (PMC):</strong> $8,400.00 - $14,580.00 PMC.</p>
<p><strong>Approximate Yearly Income:</strong> $100,000 - $175,000.</p>
<p><strong>Experience:</strong> 2 - 3 years experience.</p>
<p><strong>Promotion Requirement:</strong></p>
<ul>
  <li>Promotes <strong>One (1) Area Manager</strong> or <strong>2 Senior Executives</strong>;</li>
  <li>Displays <strong>(3) Three (PMC)</strong> of <strong>$8,350.00+</strong>; <em>OR</em></li>
  <li>Team Monthly Commission [TMC] of <strong>$51,000.00 - $100,000.00</strong>.</li>
</ul>`,
    clientNotes: [
      '[CLIENT TO CONFIRM: Document specifies promoting 1 Area Manager or 2 Senior Executives].',
    ],
  },
  {
    id: 'rank-6',
    level: 6,
    name: 'Channel VP',
    statusTitle: 'Level VI / (6)',
    monthlyCommissionMin: 15500,
    monthlyCommissionMax: 20850,
    yearlyIncomeMin: 175000,
    yearlyIncomeMax: 250000,
    yearlyIncomeDisplay: '$175,000 - $250,000 (175-250K)',
    requiredConsecutiveMonths: null,
    requiredTeamMembers: 2,
    requiredTeamMonthlyCommissionMin: 101000,
    requiredTeamMonthlyCommissionMax: 300000,
    experienceRequirement: '3 - 5 years experience',
    termsDescription: `<p><strong>Title Description:</strong> Channel VP [Level VI / (6)].</p>
<p><strong>Personal Monthly Commission (PMC):</strong> $15,500.00 - $20,850.00 PMC.</p>
<p><strong>Approximate Yearly Income:</strong> $175,000 - $250,000.</p>
<p><strong>Experience:</strong> 3 - 5 years experience.</p>
<p><strong>Promotion Requirement:</strong></p>
<ul>
  <li>Must promote <strong>Two (2) Regional Leaders</strong>, <strong>Six (6) Area Managers</strong>, or <strong>Ten (10) Senior Executives</strong>;</li>
  <li>Maintains Personal Monthly Commission <strong>$8,350.00+</strong>; <em>OR</em></li>
  <li>Team Monthly Commission [TMC] <strong>$101,000.00 - $300,000.00</strong>.</li>
</ul>`,
    clientNotes: [
      '[CLIENT TO CONFIRM: Consecutive months maintenance unspecified; listed as "Maintains PMC $8,350.00+ or TMC $101,000 - $300,000"].',
    ],
  },
  {
    id: 'rank-7',
    level: 7,
    name: 'Senior Channel VP',
    statusTitle: 'Level VII / (7)',
    monthlyCommissionMin: 21000,
    monthlyCommissionMax: 27085,
    yearlyIncomeMin: 250000,
    yearlyIncomeMax: 325000,
    yearlyIncomeDisplay: '$250,000 - $325,000 (250-325K)',
    requiredConsecutiveMonths: null,
    requiredTeamMembers: 10,
    requiredTeamMonthlyCommissionMin: 300000,
    requiredTeamMonthlyCommissionMax: 750000,
    experienceRequirement: '4 - 7 years experience',
    termsDescription: `<p><strong>Title Description:</strong> Senior Channel VP [Level VII / (7)].</p>
<p><strong>Personal Monthly Commission (PMC):</strong> $21,000.00 - $27,085.00 PMC.</p>
<p><strong>Approximate Yearly Income:</strong> $250,000 - $325,000.</p>
<p><strong>Experience:</strong> 4 - 7 years experience.</p>
<p><strong>Promotion Requirement:</strong></p>
<ul>
  <li>Must directly produce <strong>Ten (10) Regional Leaders</strong>, <strong>Eight (8) Area Managers</strong>, or <strong>Twenty (20) Senior Executives</strong>;</li>
  <li>Maintains Personal Monthly Commission <strong>$8,350.00+</strong>; <em>OR</em></li>
  <li>Team Monthly Commission [TMC] <strong>$300,000.00 - $750,000.00</strong>.</li>
</ul>`,
    clientNotes: [
      '[CLIENT TO CONFIRM: Identical team production requirements (10 RL, 8 AM, or 20 SE) appear verbatim across Levels 7, 8, and 9 in client doc].',
    ],
  },
  {
    id: 'rank-8',
    level: 8,
    name: 'National Channel VP',
    statusTitle: 'Level VIII / (8)',
    monthlyCommissionMin: 27085,
    monthlyCommissionMax: 37500,
    yearlyIncomeMin: 325000,
    yearlyIncomeMax: 450000,
    yearlyIncomeDisplay: '$325,000 - $450,000 (325-450K)',
    requiredConsecutiveMonths: null,
    requiredTeamMembers: 10,
    requiredTeamMonthlyCommissionMin: 750000,
    requiredTeamMonthlyCommissionMax: 2000000,
    experienceRequirement: '5 - 8 years experience',
    termsDescription: `<p><strong>Title Description:</strong> National Channel VP [Level VIII / (8)].</p>
<p><strong>Personal Monthly Commission (PMC):</strong> $27,085.00 - $37,500.00 PMC.</p>
<p><strong>Approximate Yearly Income:</strong> $325,000 - $450,000.</p>
<p><strong>Experience:</strong> 5 - 8 years experience.</p>
<p><strong>Promotion Requirement:</strong></p>
<ul>
  <li>Must directly produce <strong>Ten (10) Regional Leaders</strong>, <strong>Eight (8) Area Managers</strong>, or <strong>Twenty (20) Senior Executives</strong>;</li>
  <li>Maintains Personal Monthly Commission <strong>$8,350.00+</strong>; <em>OR</em></li>
  <li>Team Monthly Commission [TMC] <strong>$750,000.00 - $2,000,000.00 ($2 Million)</strong>.</li>
</ul>`,
    clientNotes: [
      '[CLIENT TO CONFIRM: Team member production requirements identical to Level 7 and Level 9].',
    ],
  },
  {
    id: 'rank-9',
    level: 9,
    name: 'Senior National Channel VP',
    statusTitle: 'Level IX / (9)',
    monthlyCommissionMin: 37650,
    monthlyCommissionMax: 58350,
    yearlyIncomeMin: 450000,
    yearlyIncomeMax: 700000,
    yearlyIncomeDisplay: '$450,000 - $700,000 (450-700K)',
    requiredConsecutiveMonths: null,
    requiredTeamMembers: 10,
    requiredTeamMonthlyCommissionMin: 2000000,
    requiredTeamMonthlyCommissionMax: 5000000,
    experienceRequirement: '5 - 8 years experience',
    termsDescription: `<p><strong>Title Description:</strong> Senior National Channel VP [Level IX / (9)].</p>
<p><strong>Personal Monthly Commission (PMC):</strong> $37,650.00 - $58,350.00 PMC.</p>
<p><strong>Approximate Yearly Income:</strong> $450,000 - $700,000.</p>
<p><strong>Experience:</strong> 5 - 8 years experience.</p>
<p><strong>Promotion Requirement:</strong></p>
<ul>
  <li>Must directly produce <strong>Ten (10) Regional Leaders</strong>, <strong>Eight (8) Area Managers</strong>, or <strong>Twenty (20) Senior Executives</strong>;</li>
  <li>Maintains Personal Monthly Commission <strong>$8,350.00+</strong>; <em>OR</em></li>
  <li>Team Monthly Commission [TMC] <strong>$2,000,000.00 - $5,000,000.00 ($2M - $5M)</strong>.</li>
</ul>`,
    clientNotes: [
      '[CLIENT TO CONFIRM: Client document lists typo "$$37,650.00 - 58,35000"; interpreted as $37,650 - $58,350 PMC].',
      '[CLIENT TO CONFIRM: Chief Business Development & Sales Officer (CBDSO) - [ TBA ] / B4B America is noted above/below Level 9].',
    ],
  },
]

export const INITIAL_GENERAL_POLICY = `<h2>Biz Pro Title Ranking & Leadership Qualifications</h2>
<p><strong>Business Development Levels – Ranking – B4B America / B4B Network</strong></p>
<p><em>Executive Leadership Directive | Chief Business Development & Sales Officer (CBDSO) - [ TBA ] / BBR AMERICA</em></p>
<hr />
<p>This document governs the official advancement criteria, commission structures, and qualification thresholds across all nine (9) career ranks within B4B America. All promotions undergo monthly audit based on verified Personal Monthly Commission (PMC) or Team Monthly Commission (TMC) volume.</p>
<h3>Core Promotion Guidelines:</h3>
<ul>
  <li><strong>Consecutive Performance:</strong> Commission qualification thresholds require sustained consecutive monthly performance as specified per rank tier.</li>
  <li><strong>Team Leadership Equivalency:</strong> At leadership tiers (District Leader and above), qualification may be fulfilled through either direct team structure production or verified aggregate Team Monthly Commission (TMC).</li>
  <li><strong>Audit & Verification:</strong> All rank upgrades are audited at month-end closing prior to override disbursement.</li>
</ul>`

export const INITIAL_RANKS_DOCUMENT: RanksPolicyDocument = {
  id: 'ranks-doc-v1',
  title: 'B4B America Leadership Qualifications & Rank Promotion Policy',
  generalPolicyTerms: INITIAL_GENERAL_POLICY,
  ranks: INITIAL_9_RANKS,
  lastEditedBy: 'System Administrator',
  lastEditedAt: '2026-10-10T12:00:00.000Z',
  publishedAt: '2026-10-10T12:00:00.000Z',
  publishedBy: 'System Administrator',
  version: 1,
  isPublished: true,
}

export const INITIAL_COACH_PROGRESS: CoachProgress = {
  coachId: 'coach-david-ross',
  coachName: 'David Ross',
  currentRankLevel: 4,
  currentRankTitle: 'District Leader',
  targetRankLevel: 5,
  targetRankTitle: 'Regional Leader',
  personalMonthlyCommissionCurrent: 7850,
  personalMonthlyCommissionTarget: 8350,
  consecutiveMonthsCurrent: 2,
  consecutiveMonthsTarget: 3,
  activeTeamMembersCurrent: 2,
  activeTeamMembersTarget: 2, // 1 Area Manager or 2 Senior Executives
  teamMonthlyCommissionCurrent: 64200,
  teamMonthlyCommissionTarget: 100000,
  experienceYearsCurrent: 2.5,
  checklist: [
    {
      id: 'chk-1',
      label: 'Personal Monthly Commission (PMC)',
      requiredText: '$8,350.00+ for 3 consecutive months',
      currentText: '$7,850.00 (Month 2 of 3 completed)',
      completed: false,
    },
    {
      id: 'chk-2',
      label: 'Leadership Experience',
      requiredText: '2 - 3 years verified experience',
      currentText: '2.5 years active veteran status',
      completed: true,
    },
    {
      id: 'chk-3',
      label: 'Direct Mentorship Production',
      requiredText: 'Promote 1 Area Manager or 2 Senior Executives',
      currentText: '2 Senior Executives promoted and active',
      completed: true,
    },
    {
      id: 'chk-4',
      label: 'Alternative Team Monthly Commission (TMC)',
      requiredText: '$51,000.00 - $100,000.00 TMC',
      currentText: '$64,200.00 achieved this cycle (Qualified)',
      completed: true,
    },
  ],
}
