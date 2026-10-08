export interface JobItem {
  id: string
  title: string
  company: string
  companyLogo: string
  companyRating: number
  category: string
  location: string
  city: string
  state: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Gig'
  isRemote: boolean
  salaryMin: number
  salaryMax: number
  salaryPeriod: 'year' | 'hour' | 'project'
  tags: string[]
  description: string
  requirements: string[]
  benefits: string[]
  postedDate: string
  featured?: boolean
  applicantCount: number
  status?: 'Active' | 'Paused' | 'Closed'
  viewsCount?: number
}

export interface JobCategory {
  id: string
  name: string
  iconName: string
  jobCount: number
  popularKeywords: string[]
}

export interface StateJobCount {
  code: string
  name: string
  count: number
  topCity: string
}

export interface Applicant {
  id: string
  name: string
  avatar: string
  appliedJobTitle: string
  appliedJobId: string
  appliedDate: string
  stage: 'Applied' | 'Screened' | 'Interview' | 'Offer' | 'Hired' | 'Rejected'
  matchScore: number
  experienceYears: number
  location: string
  email: string
  phone: string
  resumeUrl: string
  coverNote: string
}

export const JOB_CATEGORIES: JobCategory[] = [
  { id: 'cat-1', name: 'Account Executives', iconName: 'Briefcase', jobCount: 142, popularKeywords: ['SaaS AE', 'Enterprise AE', 'Mid-Market'] },
  { id: 'cat-2', name: 'B2B Sales', iconName: 'TrendingUp', jobCount: 289, popularKeywords: ['Field Sales', 'Business Development', 'Outbound'] },
  { id: 'cat-3', name: 'B2C Sales', iconName: 'Users', jobCount: 195, popularKeywords: ['Direct Sales', 'Retail Sales', 'Consultative'] },
  { id: 'cat-4', name: 'Insurance Sales', iconName: 'Shield', jobCount: 118, popularKeywords: ['Commercial Lines', 'Life & Health', 'Agency Lead'] },
  { id: 'cat-5', name: 'Software Sales', iconName: 'Code', jobCount: 312, popularKeywords: ['Cloud Solutions', 'API Tech', 'DevOps Tools'] },
  { id: 'cat-6', name: 'Customer Service', iconName: 'Headphones', jobCount: 204, popularKeywords: ['Client Success', 'Support Specialist', 'Account Rep'] },
  { id: 'cat-7', name: 'Marketing', iconName: 'Megaphone', jobCount: 176, popularKeywords: ['Growth Marketing', 'Content Strategy', 'SEO & Paid'] },
  { id: 'cat-8', name: 'Web Design', iconName: 'Palette', jobCount: 94, popularKeywords: ['UI/UX', 'Figma Specialist', 'Frontend Design'] },
  { id: 'cat-9', name: 'AI/ML', iconName: 'Cpu', jobCount: 88, popularKeywords: ['LLM Engineer', 'Prompt Specialist', 'MLOps'] },
  { id: 'cat-10', name: 'Work from home', iconName: 'Home', jobCount: 450, popularKeywords: ['100% Remote', 'Flexible Hours', 'Async Team'] },
  { id: 'cat-11', name: 'Part-time', iconName: 'Clock', jobCount: 132, popularKeywords: ['Weekend Gigs', 'Evening Hours', 'Flex 20hrs'] },
  { id: 'cat-12', name: 'Internships', iconName: 'GraduationCap', jobCount: 75, popularKeywords: ['Paid Intern', 'Summer 2026', 'College Credit'] },
]

export const US_STATES_JOB_DATA: StateJobCount[] = [
  { code: 'CA', name: 'California', count: 620, topCity: 'San Francisco' },
  { code: 'NY', name: 'New York', count: 480, topCity: 'New York City' },
  { code: 'TX', name: 'Texas', count: 390, topCity: 'Austin' },
  { code: 'FL', name: 'Florida', count: 310, topCity: 'Miami' },
  { code: 'IL', name: 'Illinois', count: 240, topCity: 'Chicago' },
  { code: 'PA', name: 'Pennsylvania', count: 180, topCity: 'Philadelphia' },
  { code: 'OH', name: 'Ohio', count: 155, topCity: 'Cleveland' },
  { code: 'GA', name: 'Georgia', count: 220, topCity: 'Atlanta' },
  { code: 'NC', name: 'North Carolina', count: 195, topCity: 'Charlotte' },
  { code: 'WA', name: 'Washington', count: 275, topCity: 'Seattle' },
  { code: 'CO', name: 'Colorado', count: 210, topCity: 'Denver' },
  { code: 'MA', name: 'Massachusetts', count: 260, topCity: 'Boston' },
]

export const MOCK_JOBS: JobItem[] = [
  {
    id: 'job-101',
    title: 'Senior Enterprise Account Executive',
    company: 'Nexus FinTech Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    companyRating: 4.8,
    category: 'Account Executives',
    location: 'New York, NY',
    city: 'New York City',
    state: 'NY',
    type: 'Full-time',
    isRemote: true,
    salaryMin: 130000,
    salaryMax: 210000,
    salaryPeriod: 'year',
    tags: ['Remote', 'Uncapped OTE', 'B2B SaaS', 'Fintech'],
    description: 'Lead enterprise deal cycles for our merchant processing & commercial line of credit infrastructure across North America. Target Fortune 2000 CFOs and procurement leaders.',
    requirements: [
      '5+ years closing enterprise SaaS or Fintech deals',
      'Consistent history of exceeding $1.5M annual quota',
      'Strong network of finance & treasury executives',
    ],
    benefits: ['401(k) matching 6%', '100% health, dental & vision cover', 'Annual company retreat', 'Equity grant'],
    postedDate: '2 hours ago',
    featured: true,
    applicantCount: 18,
  },
  {
    id: 'job-102',
    title: 'B2B Commercial Credit Advisor',
    company: 'Apex Capital Group',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&auto=format&fit=crop&q=80',
    companyRating: 4.6,
    category: 'B2B Sales',
    location: 'Chicago, IL',
    city: 'Chicago',
    state: 'IL',
    type: 'Full-time',
    isRemote: false,
    salaryMin: 85000,
    salaryMax: 140000,
    salaryPeriod: 'year',
    tags: ['Hybrid', 'Base + Commission', 'Commercial Banking'],
    description: 'Help small to medium enterprise owners acquire SBA debt facilities, equipment financing, and working capital lines of credit.',
    requirements: [
      '3+ years in commercial lending or financial services sales',
      'Deep understanding of balance sheets and corporate tax forms',
      'Exceptional consultative communication',
    ],
    benefits: ['Competitive base + uncapped monthly bonuses', 'Flexible hybrid schedule', 'Health coverage'],
    postedDate: '1 day ago',
    featured: true,
    applicantCount: 24,
  },
  {
    id: 'job-103',
    title: 'Commercial Lines Insurance Specialist',
    company: 'Vanguard Shield Underwriters',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&auto=format&fit=crop&q=80',
    companyRating: 4.7,
    category: 'Insurance Sales',
    location: 'Dallas, TX',
    city: 'Dallas',
    state: 'TX',
    type: 'Full-time',
    isRemote: true,
    salaryMin: 75000,
    salaryMax: 125000,
    salaryPeriod: 'year',
    tags: ['100% Remote', 'Property & Casualty', 'Residual Commissions'],
    description: 'Sell comprehensive commercial property, casualty, liability, and cyber insurance policies to mid-sized business clients.',
    requirements: [
      'Active Property & Casualty (P&C) license required',
      'Proven inbound & outbound lead conversion track record',
      'Proficiency with Salesforce or HubSpot CRM',
    ],
    benefits: ['Residual lifetime commission structure', 'Wellness stipend $150/mo', 'Work from home stipend'],
    postedDate: '3 days ago',
    featured: false,
    applicantCount: 14,
  },
  {
    id: 'job-104',
    title: 'Senior Software Sales Manager',
    company: 'CloudFlow Operations',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120&auto=format&fit=crop&q=80',
    companyRating: 4.9,
    category: 'Software Sales',
    location: 'Austin, TX',
    city: 'Austin',
    state: 'TX',
    type: 'Full-time',
    isRemote: true,
    salaryMin: 140000,
    salaryMax: 230000,
    salaryPeriod: 'year',
    tags: ['Work from home', 'Equity package', 'AI Automation'],
    description: 'Drive expansion for our cloud workflow and workflow automation engine across manufacturing, logistics, and retail clients.',
    requirements: [
      '4+ years selling cloud platforms or enterprise software',
      'Demonstrated experience leading multi-stakeholder RFP responses',
      'Strong technical acumen in cloud architecture',
    ],
    benefits: ['Unlimited PTO', 'Health & Dental 100% paid', 'Home office setup allocation $2,000'],
    postedDate: 'Just now',
    featured: true,
    applicantCount: 9,
  },
  {
    id: 'job-105',
    title: 'AI / Machine Learning Prompt & Growth Engineer',
    company: 'Synthetix AI Systems',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    companyRating: 4.9,
    category: 'AI/ML',
    location: 'San Francisco, CA',
    city: 'San Francisco',
    state: 'CA',
    type: 'Full-time',
    isRemote: true,
    salaryMin: 160000,
    salaryMax: 240000,
    salaryPeriod: 'year',
    tags: ['AI/ML', 'Remote', 'Cutting Edge', 'Generative AI'],
    description: 'Architect prompt pipelines, fine-tune LLMs for financial forecasting, and deploy conversational autonomous sales agents for enterprise clients.',
    requirements: [
      'Degree in Computer Science, Data Science, or equivalent practical experience',
      'Proficiency in Python, LangChain, OpenAI APIs, PyTorch',
      'Experience building consumer-facing AI agents',
    ],
    benefits: ['Generous stock options', 'Flexible working hours', 'Top tier health insurance'],
    postedDate: '5 hours ago',
    featured: true,
    applicantCount: 31,
  },
  {
    id: 'job-106',
    title: 'Customer Service & Account Manager',
    company: 'Veritas Financial',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&auto=format&fit=crop&q=80',
    companyRating: 4.5,
    category: 'Customer Service',
    location: 'Atlanta, GA',
    city: 'Atlanta',
    state: 'GA',
    type: 'Full-time',
    isRemote: true,
    salaryMin: 55000,
    salaryMax: 78000,
    salaryPeriod: 'year',
    tags: ['Work from home', 'Client Success', 'Health Benefits'],
    description: 'Provide white-glove onboarding and account optimization for mid-tier merchant clients utilizing our portal services.',
    requirements: [
      '2+ years in customer support or account management',
      'Warm telephone demeanor and sharp problem solving',
      'Comfortable managing Zendesk or Intercom tickets',
    ],
    benefits: ['401(k) matching', 'Comprehensive health coverage', 'Paid training'],
    postedDate: '2 days ago',
    featured: false,
    applicantCount: 42,
  },
  {
    id: 'job-107',
    title: 'Lead Growth Marketing Specialist',
    company: 'HyperGrowth Media',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&auto=format&fit=crop&q=80',
    companyRating: 4.7,
    category: 'Marketing',
    location: 'Miami, FL',
    city: 'Miami',
    state: 'FL',
    type: 'Full-time',
    isRemote: true,
    salaryMin: 90000,
    salaryMax: 130000,
    salaryPeriod: 'year',
    tags: ['Paid Media', 'Meta & Google Ads', 'Conversion Rate Optimization'],
    description: 'Own paid acquisition campaigns across Meta, Google Ads, LinkedIn, and TikTok to drive low-CAC B2B and B2C sales leads.',
    requirements: [
      '3+ years managing $50k+/mo ad spend',
      'Expertise in GA4, Google Tag Manager, and attribution models',
      'Strong copywriting and visual creative testing skills',
    ],
    benefits: ['Performance bonuses', 'Remote allowance', 'Flexible vacation'],
    postedDate: '4 days ago',
    featured: false,
    applicantCount: 19,
  },
  {
    id: 'job-108',
    title: 'Senior UI/UX Web Designer',
    company: 'PixelCraft Digital',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120&auto=format&fit=crop&q=80',
    companyRating: 4.8,
    category: 'Web Design',
    location: 'Seattle, WA',
    city: 'Seattle',
    state: 'WA',
    type: 'Full-time',
    isRemote: true,
    salaryMin: 110000,
    salaryMax: 155000,
    salaryPeriod: 'year',
    tags: ['Figma', 'UI/UX Design', 'Design System'],
    description: 'Design sleek, accessible, dynamic web interfaces and web applications using modern glassmorphism aesthetic guidelines and design systems.',
    requirements: [
      '4+ years designing web platforms or SaaS tools',
      'Mastery of Figma, interactive prototyping, and component libraries',
      'Understanding of HTML/CSS capabilities and responsive layouts',
    ],
    benefits: ['MacBook Pro equipment budget', 'Learning stipend $1,000/yr', 'Health benefits'],
    postedDate: '1 week ago',
    featured: false,
    applicantCount: 28,
  },
  {
    id: 'job-109',
    title: 'B2C Sales Representative (High Commission)',
    company: 'Direct Solar & Energy',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    companyRating: 4.4,
    category: 'B2C Sales',
    location: 'Phoenix, AZ',
    city: 'Phoenix',
    state: 'AZ',
    type: 'Full-time',
    isRemote: false,
    salaryMin: 60000,
    salaryMax: 120000,
    salaryPeriod: 'year',
    tags: ['Commission Only', 'Top Pay', 'Immediate Start'],
    description: 'Consult homeowners on clean energy transition and government tax credits. Full training provided with daily pre-qualified leads.',
    requirements: [
      'Self-motivated with energetic communication skills',
      'Reliable transportation for residential visits',
      'Previous direct sales experience is a bonus',
    ],
    benefits: ['Daily commission payouts', 'Company vehicle allowance', 'Gas card'],
    postedDate: '3 days ago',
    featured: false,
    applicantCount: 15,
  },
  {
    id: 'job-110',
    title: 'High-Ticket Sales Closer (Gig & Commission)',
    company: 'Growth Velocity Agency',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&auto=format&fit=crop&q=80',
    companyRating: 4.9,
    category: 'Gigs',
    location: 'Remote (US)',
    city: 'Remote',
    state: 'CA',
    type: 'Gig',
    isRemote: true,
    salaryMin: 80,
    salaryMax: 150,
    salaryPeriod: 'hour',
    tags: ['Gig Work', 'High Ticket', 'Flexible Hours'],
    description: 'Close inbound booked strategy calls for $5,000 - $25,000 consulting programs. 15% flat commission paid immediately upon collection.',
    requirements: [
      'Track record of closing high-ticket phone/Zoom calls',
      'Disciplined daily schedule with fast follow-up execution',
      'Clean quiet video setup for client Zoom meetings',
    ],
    benefits: ['100% remote', 'Payout within 24 hours of deal closing'],
    postedDate: 'Yesterday',
    featured: true,
    applicantCount: 37,
  },
  {
    id: 'job-111',
    title: 'Part-Time Client Onboarding Assistant',
    company: 'BlueRiver Advisory',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&auto=format&fit=crop&q=80',
    companyRating: 4.6,
    category: 'Part-time',
    location: 'Denver, CO',
    city: 'Denver',
    state: 'CO',
    type: 'Part-time',
    isRemote: true,
    salaryMin: 28,
    salaryMax: 35,
    salaryPeriod: 'hour',
    tags: ['Part-time', '20 hrs/week', 'Work from home'],
    description: 'Assisting small business clients with document verification, KYC compliance checks, and scheduled portal check-ins.',
    requirements: [
      'High attention to detail and organized file management',
      'Availability for 4 hours daily Monday to Friday',
      'Proficiency in Microsoft Excel / Google Sheets',
    ],
    benefits: ['Flexible morning or afternoon shift', 'Paid holidays'],
    postedDate: '4 days ago',
    featured: false,
    applicantCount: 22,
  },
  {
    id: 'job-112',
    title: 'FinTech Growth & Business Analyst Intern',
    company: 'OAL Capital Network',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120&auto=format&fit=crop&q=80',
    companyRating: 5.0,
    category: 'Internships',
    location: 'New York, NY',
    city: 'New York City',
    state: 'NY',
    type: 'Internship',
    isRemote: true,
    salaryMin: 30,
    salaryMax: 40,
    salaryPeriod: 'hour',
    tags: ['Paid Internship', 'Summer 2026', 'Mentorship'],
    description: 'Join our business development & product team to evaluate small business credit data, analyze market expansion, and assist executive leaders.',
    requirements: [
      'Currently pursuing Bachelor or Master degree in Finance, Economics, or Business',
      'Analytical mindset with strong financial modeling interest',
      'Strong teamwork and initiative',
    ],
    benefits: ['Direct executive mentorship', 'Full-time job offer opportunity post graduation'],
    postedDate: '2 days ago',
    featured: true,
    applicantCount: 56,
  }
]

export const MOCK_APPLICANTS: Applicant[] = [
  {
    id: 'app-1',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    appliedJobTitle: 'Senior Enterprise Account Executive',
    appliedJobId: 'job-101',
    appliedDate: '2 hours ago',
    stage: 'Interview',
    matchScore: 96,
    experienceYears: 6,
    location: 'New York, NY',
    email: 'sarah.jenkins@example.com',
    phone: '(212) 555-0192',
    resumeUrl: '/resumes/sarah_jenkins_resume.pdf',
    coverNote: 'Over 6 years closing multi-million dollar SaaS deals at Salesforce and Stripe. Excited to drive enterprise growth at Nexus FinTech.',
  },
  {
    id: 'app-2',
    name: 'Michael Chang',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    appliedJobTitle: 'AI / Machine Learning Prompt & Growth Engineer',
    appliedJobId: 'job-105',
    appliedDate: '5 hours ago',
    stage: 'Offer',
    matchScore: 98,
    experienceYears: 4,
    location: 'San Francisco, CA',
    email: 'michael.chang@example.com',
    phone: '(415) 555-0183',
    resumeUrl: '/resumes/michael_chang_resume.pdf',
    coverNote: 'Master in CS from Stanford. Built autonomous customer support agents using OpenAI GPT-4 with 99.4% intent resolution.',
  },
  {
    id: 'app-3',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    appliedJobTitle: 'B2B Commercial Credit Advisor',
    appliedJobId: 'job-102',
    appliedDate: '1 day ago',
    stage: 'Screened',
    matchScore: 89,
    experienceYears: 5,
    location: 'Chicago, IL',
    email: 'elena.rostova@example.com',
    phone: '(312) 555-0144',
    resumeUrl: '/resumes/elena_rostova_resume.pdf',
    coverNote: '5 years underwriting SBA 7(a) loans at Chase Commercial Banking. Passionate about empowering small business owners with capital.',
  },
  {
    id: 'app-4',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    appliedJobTitle: 'Commercial Lines Insurance Specialist',
    appliedJobId: 'job-103',
    appliedDate: '2 days ago',
    stage: 'Applied',
    matchScore: 82,
    experienceYears: 3,
    location: 'Dallas, TX',
    email: 'marcus.vance@example.com',
    phone: '(214) 555-0177',
    resumeUrl: '/resumes/marcus_vance_resume.pdf',
    coverNote: 'Licensed P&C agent in Texas with $850k annual written premium volume in commercial trucking and construction accounts.',
  },
  {
    id: 'app-5',
    name: 'Jessica Alba-Perez',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    appliedJobTitle: 'Senior UI/UX Web Designer',
    appliedJobId: 'job-108',
    appliedDate: '3 days ago',
    stage: 'Hired',
    matchScore: 99,
    experienceYears: 7,
    location: 'Seattle, WA',
    email: 'jessica.perez@example.com',
    phone: '(206) 555-0121',
    resumeUrl: '/resumes/jessica_perez_resume.pdf',
    coverNote: 'Designed enterprise design systems for Microsoft and Airbnb. Excited to create world-class dashboard interfaces.',
  }
]
