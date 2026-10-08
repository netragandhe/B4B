export interface ScoreboardRep {
  id: string
  rank: number
  name: string
  title: string
  region: string
  avatar: string
  revenue: number
  dealsClosed: number
  activities: number
  trend: 'up' | 'down' | 'neutral'
  category: 'Capital' | 'Advisory' | 'Operations' | 'Growth'
}

export interface FedRegion {
  id: number
  name: string
  code: string
  headOffice: string
  branchCities: string[]
  statesCovered: string[]
  assignedVP: string
  assignedVPAvatar: string
  color: string
  nickname: string
  volume: number
  repsCount: number
  notes: string
}

export const INITIAL_SCOREBOARD: ScoreboardRep[] = [
  {
    id: 'rep_1',
    rank: 1,
    name: 'Monica Bell',
    title: 'Senior National Channel VP',
    region: 'District 2 - New York',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    revenue: 2450000,
    dealsClosed: 28,
    activities: 184,
    trend: 'up',
    category: 'Capital',
  },
  {
    id: 'rep_2',
    rank: 2,
    name: 'David Ross',
    title: 'District Leader',
    region: 'District 7 - Chicago',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    revenue: 1850000,
    dealsClosed: 21,
    activities: 142,
    trend: 'up',
    category: 'Advisory',
  },
  {
    id: 'rep_3',
    rank: 3,
    name: 'Jason Miller',
    title: 'Regional Leader',
    region: 'District 12 - San Francisco',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    revenue: 1620000,
    dealsClosed: 19,
    activities: 130,
    trend: 'up',
    category: 'Capital',
  },
  {
    id: 'rep_4',
    rank: 4,
    name: 'Rachel Adams',
    title: 'Senior Executive',
    region: 'District 6 - Atlanta',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    revenue: 1240000,
    dealsClosed: 15,
    activities: 112,
    trend: 'neutral',
    category: 'Growth',
  },
  {
    id: 'rep_5',
    rank: 5,
    name: 'Kevin Zhao',
    title: 'Channel VP',
    region: 'District 11 - Dallas',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    revenue: 1100000,
    dealsClosed: 13,
    activities: 98,
    trend: 'up',
    category: 'Operations',
  },
  {
    id: 'rep_6',
    rank: 6,
    name: 'Elena Rostova',
    title: 'Senior Executive',
    region: 'District 5 - Richmond',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    revenue: 950000,
    dealsClosed: 11,
    activities: 86,
    trend: 'down',
    category: 'Advisory',
  },
  {
    id: 'rep_7',
    rank: 7,
    name: 'Marcus Vance',
    title: 'Account Executive',
    region: 'District 8 - St. Louis',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    revenue: 820000,
    dealsClosed: 9,
    activities: 74,
    trend: 'up',
    category: 'Capital',
  },
  {
    id: 'rep_8',
    rank: 8,
    name: 'Victoria Lin',
    title: 'Relationship Coordinator II',
    region: 'District 1 - Boston',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    revenue: 710000,
    dealsClosed: 8,
    activities: 65,
    trend: 'neutral',
    category: 'Growth',
  },
]

export const FED_REGIONS: FedRegion[] = [
  {
    id: 1,
    name: 'District 1 - Boston',
    code: '1A',
    headOffice: 'Boston, MA',
    branchCities: ['Portland', 'Providence', 'Hartford', 'Manchester'],
    statesCovered: ['Maine', 'Massachusetts', 'New Hampshire', 'Rhode Island', 'Vermont', 'Connecticut (part)'],
    assignedVP: 'Victoria Lin',
    assignedVPAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    color: '#3B82F6', // Blue
    nickname: 'New England Hub',
    volume: 7100000,
    repsCount: 14,
    notes: 'High concentration of BioTech, Life Sciences, and institutional healthcare facilities.',
  },
  {
    id: 2,
    name: 'District 2 - New York',
    code: '2B',
    headOffice: 'New York, NY',
    branchCities: ['Buffalo', 'Rochester', 'Syracuse', 'Albany', 'San Juan'],
    statesCovered: ['New York', 'New Jersey (North)', 'Fairfield CT', 'Puerto Rico', 'US Virgin Islands'],
    assignedVP: 'Monica Bell',
    assignedVPAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    color: '#10B981', // Emerald
    nickname: 'Empire State Corridor',
    volume: 24500000,
    repsCount: 42,
    notes: 'Top performing financial market for M&A advisory, revolving credit lines, and CFO retainers.',
  },
  {
    id: 3,
    name: 'District 3 - Philadelphia',
    code: '3C',
    headOffice: 'Philadelphia, PA',
    branchCities: ['Scranton', 'Allentown', 'Wilmington', 'Camden'],
    statesCovered: ['Pennsylvania (East)', 'New Jersey (South)', 'Delaware'],
    assignedVP: 'Sarah Jenkins',
    assignedVPAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    color: '#8B5CF6', // Purple
    nickname: 'Liberty District',
    volume: 9800000,
    repsCount: 18,
    notes: 'Heavy commercial real estate, logistics, and corporate Delaware governance filings.',
  },
  {
    id: 4,
    name: 'District 4 - Cleveland',
    code: '4D',
    headOffice: 'Cleveland, OH',
    branchCities: ['Cincinnati', 'Pittsburgh', 'Columbus', 'Erie'],
    statesCovered: ['Ohio', 'Pennsylvania (West)', 'Kentucky (East)', 'West Virginia (Panhandle)'],
    assignedVP: 'Jason Miller',
    assignedVPAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    color: '#F59E0B', // Amber
    nickname: 'Rust Belt Industrial',
    volume: 12400000,
    repsCount: 26,
    notes: 'Major industrial manufacturing equipment leasing and inventory revolving lines.',
  },
  {
    id: 5,
    name: 'District 5 - Richmond',
    code: '5E',
    headOffice: 'Richmond, VA',
    branchCities: ['Baltimore', 'Charlotte', 'Charleston', 'Raleigh', 'Roanoke'],
    statesCovered: ['Virginia', 'Maryland', 'North Carolina', 'South Carolina', 'District of Columbia', 'West Virginia'],
    assignedVP: 'Elena Rostova',
    assignedVPAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    color: '#EC4899', // Pink
    nickname: 'Mid-Atlantic Power Belt',
    volume: 15600000,
    repsCount: 31,
    notes: 'Strong government contracting bridge loans and Research Triangle Tech financing.',
  },
  {
    id: 6,
    name: 'District 6 - Atlanta',
    code: '6F',
    headOffice: 'Atlanta, GA',
    branchCities: ['Birmingham', 'Jacksonville', 'Miami', 'Nashville', 'New Orleans'],
    statesCovered: ['Georgia', 'Florida', 'Alabama', 'Tennessee', 'Mississippi', 'Louisiana'],
    assignedVP: 'Rachel Adams',
    assignedVPAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    color: '#06B6D4', // Cyan
    nickname: 'Sunshine Belt',
    volume: 18900000,
    repsCount: 35,
    notes: 'Rapid expansion in logistics, fleet lease financing, and payment processing.',
  },
  {
    id: 7,
    name: 'District 7 - Chicago',
    code: '7G',
    headOffice: 'Chicago, IL',
    branchCities: ['Detroit', 'Des Moines', 'Indianapolis', 'Milwaukee', 'Peoria'],
    statesCovered: ['Illinois', 'Indiana', 'Iowa', 'Michigan', 'Wisconsin'],
    assignedVP: 'David Ross',
    assignedVPAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    color: '#6366F1', // Indigo
    nickname: 'Great Lakes Heartland',
    volume: 21800000,
    repsCount: 38,
    notes: 'Key logistics hub. High demand for 13-week cash flow modeling & working capital revolvers.',
  },
  {
    id: 8,
    name: 'District 8 - St. Louis',
    code: '8H',
    headOffice: 'St. Louis, MO',
    branchCities: ['Little Rock', 'Louisville', 'Memphis', 'Springfield'],
    statesCovered: ['Missouri (East)', 'Arkansas', 'Illinois (South)', 'Indiana (South)', 'Kentucky', 'Mississippi', 'Tennessee'],
    assignedVP: 'Marcus Vance',
    assignedVPAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    color: '#14B8A6', // Teal
    nickname: 'Gateway Corridor',
    volume: 8200000,
    repsCount: 16,
    notes: 'Agribusiness, transportation, and equipment refinancing focus.',
  },
  {
    id: 9,
    name: 'District 9 - Minneapolis',
    code: '9I',
    headOffice: 'Minneapolis, MN',
    branchCities: ['Helena', 'Fargo', 'Sioux Falls', 'Duluth'],
    statesCovered: ['Minnesota', 'Montana', 'North Dakota', 'South Dakota', 'Wisconsin (North)', 'Michigan (UP)'],
    assignedVP: 'Robert Chen',
    assignedVPAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    color: '#F97316', // Orange
    nickname: 'North Star District',
    volume: 6400000,
    repsCount: 12,
    notes: 'Medical device manufacturing, renewable energy bridge lines, and timber leases.',
  },
  {
    id: 10,
    name: 'District 10 - Kansas City',
    code: '10J',
    headOffice: 'Kansas City, MO',
    branchCities: ['Denver', 'Oklahoma City', 'Omaha', 'Wichita', 'Cheyenne'],
    statesCovered: ['Colorado', 'Kansas', 'Nebraska', 'Oklahoma', 'Wyoming', 'Missouri (West)', 'New Mexico (North)'],
    assignedVP: 'Maya Lin',
    assignedVPAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    color: '#84CC16', // Lime
    nickname: 'Plains & Rockies Region',
    volume: 9100000,
    repsCount: 19,
    notes: 'Energy sector credit lines, commercial real estate, and tech startup capital.',
  },
  {
    id: 11,
    name: 'District 11 - Dallas',
    code: '11K',
    headOffice: 'Dallas, TX',
    branchCities: ['El Paso', 'Houston', 'San Antonio', 'Austin', 'Fort Worth'],
    statesCovered: ['Texas', 'Louisiana (North)', 'New Mexico (South)'],
    assignedVP: 'Kevin Zhao',
    assignedVPAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    color: '#EF4444', // Red
    nickname: 'Lone Star Territory',
    volume: 22400000,
    repsCount: 40,
    notes: 'Massive corporate relocation market, energy revolvers, and construction equipment lines.',
  },
  {
    id: 12,
    name: 'District 12 - San Francisco',
    code: '12L',
    headOffice: 'San Francisco, CA',
    branchCities: ['Los Angeles', 'Portland', 'Salt Lake City', 'Seattle', 'Phoenix'],
    statesCovered: ['California', 'Washington', 'Oregon', 'Arizona', 'Nevada', 'Idaho', 'Utah', 'Hawaii', 'Alaska'],
    assignedVP: 'Monica Bell',
    assignedVPAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    color: '#A855F7', // Purple-pink
    nickname: 'Pacific West & Silicon Valley',
    volume: 28500000,
    repsCount: 48,
    notes: 'Silicon Valley tech debt, international trade finance, and entertainment payroll revolvers.',
  },
]
