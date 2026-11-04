import { createStore } from '../createStore'

export interface FedDistrict {
  id: string
  number: number
  code: string
  name: string
  headquarters: string
  states: string[]
  nickname?: string
  notes?: string
  assignedLeaderId?: string
  assignedLeaderName?: string
  activeCoachesCount: number
  monthlyVolumeTarget: number
  currentVolume: number
  exclusivityStatus: 'Open' | 'Allocated' | 'Exclusive'
  fipsCodes?: string[]
}

const INITIAL_FED_DISTRICTS: FedDistrict[] = [
  {
    id: 'fed_1',
    number: 1,
    code: '1-A',
    name: 'Boston',
    nickname: 'New England Hub',
    headquarters: 'Boston, MA',
    states: ['ME', 'NH', 'VT', 'MA', 'RI', 'CT'],
    assignedLeaderName: 'Sarah Jenkins (Rank 5)',
    activeCoachesCount: 14,
    monthlyVolumeTarget: 2500000,
    currentVolume: 1850000,
    exclusivityStatus: 'Allocated',
    notes: 'Covers ME, MA, NH, RI, VT and CT except Fairfield county.',
  },
  {
    id: 'fed_2',
    number: 2,
    code: '2-B',
    name: 'New York',
    nickname: 'Empire Tri-State & PR',
    headquarters: 'New York, NY',
    states: ['NY', 'NJ', 'PR', 'VI'],
    assignedLeaderName: 'Alexander Hayes (Rank 7)',
    activeCoachesCount: 32,
    monthlyVolumeTarget: 6000000,
    currentVolume: 5400000,
    exclusivityStatus: 'Exclusive',
    notes: 'Covers NY state, Fairfield CT, 12 northern NJ counties, PR and US Virgin Islands.',
  },
  {
    id: 'fed_3',
    number: 3,
    code: '3-C',
    name: 'Philadelphia',
    nickname: 'Keystone Atlantic',
    headquarters: 'Philadelphia, PA',
    states: ['PA', 'NJ', 'DE'],
    assignedLeaderName: 'Elena Rostova (Rank 4)',
    activeCoachesCount: 12,
    monthlyVolumeTarget: 2200000,
    currentVolume: 1950000,
    exclusivityStatus: 'Allocated',
    notes: 'Covers eastern PA, southern NJ, and DE.',
  },
  {
    id: 'fed_4',
    number: 4,
    code: '4-D',
    name: 'Cleveland',
    nickname: 'Rust Belt & Ohio Valley',
    headquarters: 'Cleveland, OH',
    states: ['OH', 'PA', 'WV', 'KY'],
    assignedLeaderName: 'Michael Vance (Rank 5)',
    activeCoachesCount: 16,
    monthlyVolumeTarget: 3000000,
    currentVolume: 2750000,
    exclusivityStatus: 'Allocated',
    notes: 'Covers OH, western PA, eastern KY, and northern WV panhandle.',
  },
  {
    id: 'fed_5',
    number: 5,
    code: '5-E',
    name: 'Richmond',
    nickname: 'Mid-Atlantic Capital',
    headquarters: 'Richmond, VA',
    states: ['MD', 'VA', 'WV', 'NC', 'SC', 'DC'],
    assignedLeaderName: 'David Ross (Rank 6)',
    activeCoachesCount: 22,
    monthlyVolumeTarget: 4200000,
    currentVolume: 3900000,
    exclusivityStatus: 'Exclusive',
    notes: 'Covers MD, VA, NC, SC, WV (except northern panhandle) and DC.',
  },
  {
    id: 'fed_6',
    number: 6,
    code: '6-F',
    name: 'Atlanta',
    nickname: 'Southeast Corridor',
    headquarters: 'Atlanta, GA',
    states: ['AL', 'FL', 'GA', 'LA', 'MS', 'TN'],
    assignedLeaderName: 'Marcus Vance (Rank 6)',
    activeCoachesCount: 28,
    monthlyVolumeTarget: 5500000,
    currentVolume: 5100000,
    exclusivityStatus: 'Exclusive',
    notes: 'Covers AL, FL, GA, eastern TN, southern MS, and southern LA.',
  },
  {
    id: 'fed_7',
    number: 7,
    code: '7-G',
    name: 'Chicago',
    nickname: 'Great Lakes Hub',
    headquarters: 'Chicago, IL',
    states: ['IL', 'IN', 'IA', 'MI', 'WI'],
    assignedLeaderName: 'Robert Sterling (Rank 5)',
    activeCoachesCount: 24,
    monthlyVolumeTarget: 4800000,
    currentVolume: 4200000,
    exclusivityStatus: 'Allocated',
    notes: 'Covers IA, northern IL, northern IN, southern WI, and lower peninsula MI.',
  },
  {
    id: 'fed_8',
    number: 8,
    code: '8-H',
    name: 'St. Louis',
    nickname: 'Gateway Central',
    headquarters: 'St. Louis, MO',
    states: ['AR', 'IL', 'IN', 'KY', 'MS', 'MO', 'TN'],
    assignedLeaderName: 'Rachel Adams (Rank 4)',
    activeCoachesCount: 10,
    monthlyVolumeTarget: 1800000,
    currentVolume: 1450000,
    exclusivityStatus: 'Open',
    notes: 'Covers AR and portions of IL, IN, KY, MS, MO, and western TN.',
  },
  {
    id: 'fed_9',
    number: 9,
    code: '9-I',
    name: 'Minneapolis',
    nickname: 'Northwest Plains',
    headquarters: 'Minneapolis, MN',
    states: ['MN', 'MT', 'ND', 'SD', 'WI', 'MI'],
    assignedLeaderName: 'Thomas Wright (Rank 4)',
    activeCoachesCount: 9,
    monthlyVolumeTarget: 1600000,
    currentVolume: 1200000,
    exclusivityStatus: 'Open',
    notes: 'Covers MN, MT, ND, SD, northwestern WI, and upper peninsula MI.',
  },
  {
    id: 'fed_10',
    number: 10,
    code: '10-J',
    name: 'Kansas City',
    nickname: 'Heartland Plains',
    headquarters: 'Kansas City, MO',
    states: ['CO', 'KS', 'NE', 'OK', 'WY', 'NM', 'MO'],
    assignedLeaderName: 'Jonathan Reed (Rank 5)',
    activeCoachesCount: 15,
    monthlyVolumeTarget: 2800000,
    currentVolume: 2400000,
    exclusivityStatus: 'Allocated',
    notes: 'Covers CO, KS, NE, OK, WY, western MO, and northern NM.',
  },
  {
    id: 'fed_11',
    number: 11,
    code: '11-K',
    name: 'Dallas',
    nickname: 'Lone Star Southwest',
    headquarters: 'Dallas, TX',
    states: ['TX', 'LA', 'NM'],
    assignedLeaderName: 'Carlos Ramirez (Rank 7)',
    activeCoachesCount: 35,
    monthlyVolumeTarget: 7000000,
    currentVolume: 6800000,
    exclusivityStatus: 'Exclusive',
    notes: 'Covers TX, northern LA, and southern NM.',
  },
  {
    id: 'fed_12',
    number: 12,
    code: '12-L',
    name: 'San Francisco',
    nickname: 'Pacific West Coast',
    headquarters: 'San Francisco, CA',
    states: ['AK', 'AZ', 'CA', 'HI', 'ID', 'NV', 'OR', 'UT', 'WA', 'GU', 'AS', 'MP'],
    assignedLeaderName: 'Kimberly Chen (Rank 6)',
    activeCoachesCount: 30,
    monthlyVolumeTarget: 6500000,
    currentVolume: 6100000,
    exclusivityStatus: 'Exclusive',
    notes: 'Covers AK, AZ, CA, HI, ID, NV, OR, UT, WA, Guam, American Samoa, and Northern Mariana Islands.',
  },
]

const territoryStore = createStore<FedDistrict[]>('territory_districts', INITIAL_FED_DISTRICTS)

export const territoryService = {
  useDistricts: () => territoryStore.useStore(),
  getDistricts: () => territoryStore.get(),

  getDistrictById: (id: string) => {
    return territoryStore.get().find((d) => d.id === id)
  },

  getDistrictByState: (stateCode: string) => {
    return territoryStore.get().find((d) => d.states.includes(stateCode.toUpperCase()))
  },

  updateDistrict: (id: string, updates: Partial<FedDistrict>) => {
    territoryStore.set((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
    )
  },

  reassignLeader: (districtId: string, leaderName: string, status: FedDistrict['exclusivityStatus'] = 'Allocated') => {
    territoryStore.set((prev) =>
      prev.map((d) =>
        d.id === districtId
          ? {
              ...d,
              assignedLeaderName: leaderName,
              exclusivityStatus: status,
            }
          : d
      )
    )
  },

  reset: () => territoryStore.reset(),
}
