/**
 * Federal Reserve District State & Territory Mapping.
 * 
 * Note on Split States:
 * In the official Federal Reserve system, 12 states are divided between multiple Federal Reserve districts:
 * - Missouri (MO): Split between District 8 (St. Louis) and District 10 (Kansas City).
 * - Illinois (IL): Split between District 7 (Chicago) and District 8 (St. Louis).
 * - Indiana (IN): Split between District 7 (Chicago) and District 8 (St. Louis).
 * - Kentucky (KY): Split between District 4 (Cleveland) and District 8 (St. Louis).
 * - Tennessee (TN): Split between District 6 (Atlanta) and District 8 (St. Louis).
 * - Mississippi (MS): Split between District 6 (Atlanta) and District 8 (St. Louis).
 * - Louisiana (LA): Split between District 6 (Atlanta) and District 11 (Dallas).
 * - New Mexico (NM): Split between District 10 (Kansas City) and District 11 (Dallas).
 * - Pennsylvania (PA): Split between District 3 (Philadelphia) and District 4 (Cleveland).
 * - New Jersey (NJ): Split between District 2 (New York) and District 3 (Philadelphia).
 * - Wisconsin (WI): Split between District 7 (Chicago) and District 9 (Minneapolis).
 * - Michigan (MI): Split between District 7 (Chicago) and District 9 (Minneapolis - Upper Peninsula).
 * 
 * In this baseline map, each state is mapped to its primary district headquarters and includes municipality seeds.
 */

export interface StateTerritoryInfo {
  fips: string
  code: string
  name: string
  primaryDistrict: number
  districtName: string
  splitNote?: string
  cities: { name: string; county: string; zip: string }[]
}

export const STATE_TERRITORY_MAP: Record<string, StateTerritoryInfo> = {
  '01': {
    fips: '01',
    code: 'AL',
    name: 'Alabama',
    primaryDistrict: 6,
    districtName: 'Atlanta',
    cities: [
      { name: 'Birmingham', county: 'Jefferson', zip: '35203' },
      { name: 'Huntsville', county: 'Madison', zip: '35801' },
      { name: 'Mobile', county: 'Mobile', zip: '36602' },
    ],
  },
  '02': {
    fips: '02',
    code: 'AK',
    name: 'Alaska',
    primaryDistrict: 12,
    districtName: 'San Francisco',
    cities: [
      { name: 'Anchorage', county: 'Anchorage', zip: '99501' },
      { name: 'Fairbanks', county: 'Fairbanks North Star', zip: '99701' },
    ],
  },
  '04': {
    fips: '04',
    code: 'AZ',
    name: 'Arizona',
    primaryDistrict: 12,
    districtName: 'San Francisco',
    cities: [
      { name: 'Phoenix', county: 'Maricopa', zip: '85001' },
      { name: 'Tucson', county: 'Pima', zip: '85701' },
      { name: 'Scottsdale', county: 'Maricopa', zip: '85251' },
    ],
  },
  '05': {
    fips: '05',
    code: 'AR',
    name: 'Arkansas',
    primaryDistrict: 8,
    districtName: 'St. Louis',
    cities: [
      { name: 'Little Rock', county: 'Pulaski', zip: '72201' },
      { name: 'Fayetteville', county: 'Washington', zip: '72701' },
    ],
  },
  '06': {
    fips: '06',
    code: 'CA',
    name: 'California',
    primaryDistrict: 12,
    districtName: 'San Francisco',
    cities: [
      { name: 'Los Angeles', county: 'Los Angeles', zip: '90001' },
      { name: 'San Francisco', county: 'San Francisco', zip: '94102' },
      { name: 'San Diego', county: 'San Diego', zip: '92101' },
      { name: 'San Jose', county: 'Santa Clara', zip: '95113' },
    ],
  },
  '08': {
    fips: '08',
    code: 'CO',
    name: 'Colorado',
    primaryDistrict: 10,
    districtName: 'Kansas City',
    cities: [
      { name: 'Denver', county: 'Denver', zip: '80202' },
      { name: 'Colorado Springs', county: 'El Paso', zip: '80903' },
      { name: 'Boulder', county: 'Boulder', zip: '80301' },
    ],
  },
  '09': {
    fips: '09',
    code: 'CT',
    name: 'Connecticut',
    primaryDistrict: 1,
    districtName: 'Boston',
    cities: [
      { name: 'Hartford', county: 'Hartford', zip: '06103' },
      { name: 'Stamford', county: 'Fairfield', zip: '06901' },
      { name: 'New Haven', county: 'New Haven', zip: '06510' },
    ],
  },
  '10': {
    fips: '10',
    code: 'DE',
    name: 'Delaware',
    primaryDistrict: 3,
    districtName: 'Philadelphia',
    cities: [
      { name: 'Wilmington', county: 'New Castle', zip: '19801' },
      { name: 'Dover', county: 'Kent', zip: '19901' },
    ],
  },
  '11': {
    fips: '11',
    code: 'DC',
    name: 'District of Columbia',
    primaryDistrict: 5,
    districtName: 'Richmond',
    cities: [
      { name: 'Washington', county: 'District of Columbia', zip: '20001' },
    ],
  },
  '12': {
    fips: '12',
    code: 'FL',
    name: 'Florida',
    primaryDistrict: 6,
    districtName: 'Atlanta',
    cities: [
      { name: 'Miami', county: 'Miami-Dade', zip: '33101' },
      { name: 'Orlando', county: 'Orange', zip: '32801' },
      { name: 'Tampa', county: 'Hillsborough', zip: '33602' },
      { name: 'Jacksonville', county: 'Duval', zip: '32099' },
    ],
  },
  '13': {
    fips: '13',
    code: 'GA',
    name: 'Georgia',
    primaryDistrict: 6,
    districtName: 'Atlanta',
    cities: [
      { name: 'Atlanta', county: 'Fulton', zip: '30303' },
      { name: 'Savannah', county: 'Chatham', zip: '31401' },
      { name: 'Augusta', county: 'Richmond', zip: '30901' },
    ],
  },
  '15': {
    fips: '15',
    code: 'HI',
    name: 'Hawaii',
    primaryDistrict: 12,
    districtName: 'San Francisco',
    cities: [
      { name: 'Honolulu', county: 'Honolulu', zip: '96813' },
    ],
  },
  '16': {
    fips: '16',
    code: 'ID',
    name: 'Idaho',
    primaryDistrict: 12,
    districtName: 'San Francisco',
    cities: [
      { name: 'Boise', county: 'Ada', zip: '83702' },
    ],
  },
  '17': {
    fips: '17',
    code: 'IL',
    name: 'Illinois',
    primaryDistrict: 7,
    districtName: 'Chicago',
    splitNote: 'Northern IL is in District 7 (Chicago); Southern IL is in District 8 (St. Louis).',
    cities: [
      { name: 'Chicago', county: 'Cook', zip: '60601' },
      { name: 'Naperville', county: 'DuPage', zip: '60540' },
      { name: 'Peoria', county: 'Peoria', zip: '61602' },
    ],
  },
  '18': {
    fips: '18',
    code: 'IN',
    name: 'Indiana',
    primaryDistrict: 7,
    districtName: 'Chicago',
    splitNote: 'Northern IN is in District 7 (Chicago); Southern IN is in District 8 (St. Louis).',
    cities: [
      { name: 'Indianapolis', county: 'Marion', zip: '46204' },
      { name: 'Fort Wayne', county: 'Allen', zip: '46802' },
    ],
  },
  '19': {
    fips: '19',
    code: 'IA',
    name: 'Iowa',
    primaryDistrict: 7,
    districtName: 'Chicago',
    cities: [
      { name: 'Des Moines', county: 'Polk', zip: '50309' },
      { name: 'Cedar Rapids', county: 'Linn', zip: '52401' },
    ],
  },
  '20': {
    fips: '20',
    code: 'KS',
    name: 'Kansas',
    primaryDistrict: 10,
    districtName: 'Kansas City',
    cities: [
      { name: 'Wichita', county: 'Sedgwick', zip: '67202' },
      { name: 'Overland Park', county: 'Johnson', zip: '66210' },
    ],
  },
  '21': {
    fips: '21',
    code: 'KY',
    name: 'Kentucky',
    primaryDistrict: 4,
    districtName: 'Cleveland',
    splitNote: 'Eastern KY is in District 4 (Cleveland); Western KY is in District 8 (St. Louis).',
    cities: [
      { name: 'Louisville', county: 'Jefferson', zip: '40202' },
      { name: 'Lexington', county: 'Fayette', zip: '40507' },
    ],
  },
  '22': {
    fips: '22',
    code: 'LA',
    name: 'Louisiana',
    primaryDistrict: 6,
    districtName: 'Atlanta',
    splitNote: 'Southern LA is in District 6 (Atlanta); Northern LA is in District 11 (Dallas).',
    cities: [
      { name: 'New Orleans', county: 'Orleans', zip: '70112' },
      { name: 'Baton Rouge', county: 'East Baton Rouge', zip: '70801' },
      { name: 'Shreveport', county: 'Caddo', zip: '71101' },
    ],
  },
  '23': {
    fips: '23',
    code: 'ME',
    name: 'Maine',
    primaryDistrict: 1,
    districtName: 'Boston',
    cities: [
      { name: 'Portland', county: 'Cumberland', zip: '04101' },
    ],
  },
  '24': {
    fips: '24',
    code: 'MD',
    name: 'Maryland',
    primaryDistrict: 5,
    districtName: 'Richmond',
    cities: [
      { name: 'Baltimore', county: 'Baltimore City', zip: '21201' },
      { name: 'Bethesda', county: 'Montgomery', zip: '20814' },
    ],
  },
  '25': {
    fips: '25',
    code: 'MA',
    name: 'Massachusetts',
    primaryDistrict: 1,
    districtName: 'Boston',
    cities: [
      { name: 'Boston', county: 'Suffolk', zip: '02108' },
      { name: 'Cambridge', county: 'Middlesex', zip: '02138' },
      { name: 'Worcester', county: 'Worcester', zip: '01608' },
    ],
  },
  '26': {
    fips: '26',
    code: 'MI',
    name: 'Michigan',
    primaryDistrict: 7,
    districtName: 'Chicago',
    splitNote: 'Lower MI is in District 7 (Chicago); Upper Peninsula is in District 9 (Minneapolis).',
    cities: [
      { name: 'Detroit', county: 'Wayne', zip: '48226' },
      { name: 'Grand Rapids', county: 'Kent', zip: '49503' },
    ],
  },
  '27': {
    fips: '27',
    code: 'MN',
    name: 'Minnesota',
    primaryDistrict: 9,
    districtName: 'Minneapolis',
    cities: [
      { name: 'Minneapolis', county: 'Hennepin', zip: '55401' },
      { name: 'St. Paul', county: 'Ramsey', zip: '55102' },
    ],
  },
  '28': {
    fips: '28',
    code: 'MS',
    name: 'Mississippi',
    primaryDistrict: 6,
    districtName: 'Atlanta',
    splitNote: 'Southern MS is in District 6 (Atlanta); Northern MS is in District 8 (St. Louis).',
    cities: [
      { name: 'Jackson', county: 'Hinds', zip: '39201' },
    ],
  },
  '29': {
    fips: '29',
    code: 'MO',
    name: 'Missouri',
    primaryDistrict: 8,
    districtName: 'St. Louis',
    splitNote: 'Eastern MO is in District 8 (St. Louis); Western MO is in District 10 (Kansas City).',
    cities: [
      { name: 'St. Louis', county: 'St. Louis City', zip: '63101' },
      { name: 'Kansas City', county: 'Jackson', zip: '64106' },
    ],
  },
  '30': {
    fips: '30',
    code: 'MT',
    name: 'Montana',
    primaryDistrict: 9,
    districtName: 'Minneapolis',
    cities: [
      { name: 'Billings', county: 'Yellowstone', zip: '59101' },
    ],
  },
  '31': {
    fips: '31',
    code: 'NE',
    name: 'Nebraska',
    primaryDistrict: 10,
    districtName: 'Kansas City',
    cities: [
      { name: 'Omaha', county: 'Douglas', zip: '68102' },
      { name: 'Lincoln', county: 'Lancaster', zip: '68508' },
    ],
  },
  '32': {
    fips: '32',
    code: 'NV',
    name: 'Nevada',
    primaryDistrict: 12,
    districtName: 'San Francisco',
    cities: [
      { name: 'Las Vegas', county: 'Clark', zip: '89101' },
      { name: 'Reno', county: 'Washoe', zip: '89501' },
    ],
  },
  '33': {
    fips: '33',
    code: 'NH',
    name: 'New Hampshire',
    primaryDistrict: 1,
    districtName: 'Boston',
    cities: [
      { name: 'Manchester', county: 'Hillsborough', zip: '03101' },
    ],
  },
  '34': {
    fips: '34',
    code: 'NJ',
    name: 'New Jersey',
    primaryDistrict: 2,
    districtName: 'New York',
    splitNote: 'Northern NJ is in District 2 (New York); Southern NJ is in District 3 (Philadelphia).',
    cities: [
      { name: 'Newark', county: 'Essex', zip: '07102' },
      { name: 'Jersey City', county: 'Hudson', zip: '07302' },
      { name: 'Trenton', county: 'Mercer', zip: '08608' },
    ],
  },
  '35': {
    fips: '35',
    code: 'NM',
    name: 'New Mexico',
    primaryDistrict: 10,
    districtName: 'Kansas City',
    splitNote: 'Northern NM is in District 10 (Kansas City); Southern NM is in District 11 (Dallas).',
    cities: [
      { name: 'Albuquerque', county: 'Bernalillo', zip: '87102' },
      { name: 'Santa Fe', county: 'Santa Fe', zip: '87501' },
    ],
  },
  '36': {
    fips: '36',
    code: 'NY',
    name: 'New York',
    primaryDistrict: 2,
    districtName: 'New York',
    cities: [
      { name: 'New York', county: 'New York', zip: '10005' },
      { name: 'Buffalo', county: 'Erie', zip: '14202' },
      { name: 'Rochester', county: 'Monroe', zip: '14604' },
      { name: 'Albany', county: 'Albany', zip: '12207' },
    ],
  },
  '37': {
    fips: '37',
    code: 'NC',
    name: 'North Carolina',
    primaryDistrict: 5,
    districtName: 'Richmond',
    cities: [
      { name: 'Charlotte', county: 'Mecklenburg', zip: '28202' },
      { name: 'Raleigh', county: 'Wake', zip: '27601' },
      { name: 'Durham', county: 'Durham', zip: '27701' },
    ],
  },
  '38': {
    fips: '38',
    code: 'ND',
    name: 'North Dakota',
    primaryDistrict: 9,
    districtName: 'Minneapolis',
    cities: [
      { name: 'Fargo', county: 'Cass', zip: '58102' },
    ],
  },
  '39': {
    fips: '39',
    code: 'OH',
    name: 'Ohio',
    primaryDistrict: 4,
    districtName: 'Cleveland',
    cities: [
      { name: 'Cleveland', county: 'Cuyahoga', zip: '44114' },
      { name: 'Columbus', county: 'Franklin', zip: '43215' },
      { name: 'Cincinnati', county: 'Hamilton', zip: '45202' },
    ],
  },
  '40': {
    fips: '40',
    code: 'OK',
    name: 'Oklahoma',
    primaryDistrict: 10,
    districtName: 'Kansas City',
    cities: [
      { name: 'Oklahoma City', county: 'Oklahoma', zip: '73102' },
      { name: 'Tulsa', county: 'Tulsa', zip: '74103' },
    ],
  },
  '41': {
    fips: '41',
    code: 'OR',
    name: 'Oregon',
    primaryDistrict: 12,
    districtName: 'San Francisco',
    cities: [
      { name: 'Portland', county: 'Multnomah', zip: '97201' },
    ],
  },
  '42': {
    fips: '42',
    code: 'PA',
    name: 'Pennsylvania',
    primaryDistrict: 3,
    districtName: 'Philadelphia',
    splitNote: 'Eastern PA is in District 3 (Philadelphia); Western PA is in District 4 (Cleveland).',
    cities: [
      { name: 'Philadelphia', county: 'Philadelphia', zip: '19107' },
      { name: 'Pittsburgh', county: 'Allegheny', zip: '15219' },
      { name: 'Allentown', county: 'Lehigh', zip: '18101' },
    ],
  },
  '44': {
    fips: '44',
    code: 'RI',
    name: 'Rhode Island',
    primaryDistrict: 1,
    districtName: 'Boston',
    cities: [
      { name: 'Providence', county: 'Providence', zip: '02903' },
    ],
  },
  '45': {
    fips: '45',
    code: 'SC',
    name: 'South Carolina',
    primaryDistrict: 5,
    districtName: 'Richmond',
    cities: [
      { name: 'Charleston', county: 'Charleston', zip: '29401' },
      { name: 'Columbia', county: 'Richland', zip: '29201' },
      { name: 'Greenville', county: 'Greenville', zip: '29601' },
    ],
  },
  '46': {
    fips: '46',
    code: 'SD',
    name: 'South Dakota',
    primaryDistrict: 9,
    districtName: 'Minneapolis',
    cities: [
      { name: 'Sioux Falls', county: 'Minnehaha', zip: '57104' },
    ],
  },
  '47': {
    fips: '47',
    code: 'TN',
    name: 'Tennessee',
    primaryDistrict: 6,
    districtName: 'Atlanta',
    splitNote: 'Eastern/Middle TN is in District 6 (Atlanta); Western TN is in District 8 (St. Louis).',
    cities: [
      { name: 'Nashville', county: 'Davidson', zip: '37201' },
      { name: 'Memphis', county: 'Shelby', zip: '38103' },
      { name: 'Knoxville', county: 'Knox', zip: '37902' },
    ],
  },
  '48': {
    fips: '48',
    code: 'TX',
    name: 'Texas',
    primaryDistrict: 11,
    districtName: 'Dallas',
    cities: [
      { name: 'Dallas', county: 'Dallas', zip: '75201' },
      { name: 'Houston', county: 'Harris', zip: '77002' },
      { name: 'Austin', county: 'Travis', zip: '78701' },
      { name: 'San Antonio', county: 'Bexar', zip: '78205' },
    ],
  },
  '49': {
    fips: '49',
    code: 'UT',
    name: 'Utah',
    primaryDistrict: 12,
    districtName: 'San Francisco',
    cities: [
      { name: 'Salt Lake City', county: 'Salt Lake', zip: '84101' },
    ],
  },
  '50': {
    fips: '50',
    code: 'VT',
    name: 'Vermont',
    primaryDistrict: 1,
    districtName: 'Boston',
    cities: [
      { name: 'Burlington', county: 'Chittenden', zip: '05401' },
    ],
  },
  '51': {
    fips: '51',
    code: 'VA',
    name: 'Virginia',
    primaryDistrict: 5,
    districtName: 'Richmond',
    cities: [
      { name: 'Richmond', county: 'Richmond City', zip: '23219' },
      { name: 'Virginia Beach', county: 'Virginia Beach City', zip: '23451' },
      { name: 'Norfolk', county: 'Norfolk City', zip: '23510' },
    ],
  },
  '53': {
    fips: '53',
    code: 'WA',
    name: 'Washington',
    primaryDistrict: 12,
    districtName: 'San Francisco',
    cities: [
      { name: 'Seattle', county: 'King', zip: '98101' },
      { name: 'Spokane', county: 'Spokane', zip: '99201' },
    ],
  },
  '54': {
    fips: '54',
    code: 'WV',
    name: 'West Virginia',
    primaryDistrict: 5,
    districtName: 'Richmond',
    splitNote: 'Southern WV is in District 5 (Richmond); Northern Panhandle is in District 4 (Cleveland).',
    cities: [
      { name: 'Charleston', county: 'Kanawha', zip: '25301' },
    ],
  },
  '55': {
    fips: '55',
    code: 'WI',
    name: 'Wisconsin',
    primaryDistrict: 7,
    districtName: 'Chicago',
    splitNote: 'Southern WI is in District 7 (Chicago); Northern/Western WI is in District 9 (Minneapolis).',
    cities: [
      { name: 'Milwaukee', county: 'Milwaukee', zip: '53202' },
      { name: 'Madison', county: 'Dane', zip: '53703' },
    ],
  },
  '56': {
    fips: '56',
    code: 'WY',
    name: 'Wyoming',
    primaryDistrict: 10,
    districtName: 'Kansas City',
    cities: [
      { name: 'Cheyenne', county: 'Laramie', zip: '82001' },
    ],
  },
}

export const FED_DISTRICT_COLORS: Record<number, string> = {
  1: '#3B82F6',  // Boston - Blue
  2: '#1D4ED8',  // New York - Royal
  3: '#06B6D4',  // Philadelphia - Cyan
  4: '#0D9488',  // Cleveland - Teal
  5: '#10B981',  // Richmond - Emerald
  6: '#059669',  // Atlanta - Dark Emerald
  7: '#8B5CF6',  // Chicago - Purple
  8: '#7C3AED',  // St. Louis - Violet
  9: '#F59E0B',  // Minneapolis - Amber
  10: '#D97706', // Kansas City - Warm Gold
  11: '#EA580C', // Dallas - Orange
  12: '#DC2626', // San Francisco - Red
}
