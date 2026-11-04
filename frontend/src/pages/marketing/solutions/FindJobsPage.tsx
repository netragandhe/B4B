import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Briefcase, ArrowRight } from 'lucide-react'
import { ServicePageLayout } from '@/components/website'

export const FindJobsPage: React.FC = () => {
  return (
    <ServicePageLayout
      number="10"
      title="Find JOBS"
      slug="find-jobs"
      category="Growth"
      iconName="Briefcase"
      ctaText="Speak with a Business Coach"
      hasDocument={true}
    >
      <div className="space-y-6 text-blue-100/90 text-sm leading-relaxed">
        {/* Document Header Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-3 shadow-xl backdrop-blur-md">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            B4B JOB SEARCH
          </h2>
          <p className="text-base font-bold text-[#FFC911] font-heading">
            The Connect for Small Business Solutions
          </p>
          <div className="pt-2">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-sm shadow-lg hover:brightness-110 transition"
            >
              <Briefcase className="w-4 h-4" />
              <span>Open National B4B Job Board</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Search Trending Jobs and Projects */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            Search Trending Jobs and Projects
          </h3>
          <p className="text-xs text-sky-200">
            HOME | POST A JOB | SEARCH BY SALARIES | For Employers | Gigs | [ Login ]
          </p>

          <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-3">
            <h4 className="font-bold text-white text-base">Popular Searches</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'Administrative',
                'Business-to-Business (B2B) Sales',
                'Business-to-Consumer (B2C) Sales',
                'Customer Service',
                'Education',
                'Healthcare',
                'Insurance Sales',
                'Internships',
                'Marketing',
                'Medical Sales',
                'Part-time',
                'Sales',
                'Software Sales',
                'Technology',
                'Warehouse',
                'Web Design',
                'Work from home',
              ].map((item) => (
                <Link
                  key={item}
                  to={`/jobs?q=${encodeURIComponent(item)}`}
                  className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-[#FFC911] hover:text-[#07142B] text-sky-100 transition-colors border border-sky-400/30"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Jobs by Categories */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            Jobs by Categories
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-sky-100">
            {[
              'Advertising Sales Agents',
              'Account Executives',
              'Account manager',
              'Admin / Office',
              'Affiliate Marketer',
              'AI/ML',
              'Airline Pilots',
              'Architect / Engineering',
              'Art / Media / Design',
              'Auto Sales',
              'Automotive & Luxury Goods',
              'B2B Sales',
              'Biotech / Science',
              'Business Development Manager',
              'Business / Mgmt',
              'Chartered Accountant',
              'Chief Executive Officer',
              'Chief Sales Officer',
              'Civil Project Manager',
              'Cloud Computing',
              'Commercial Pilots',
              'Commercial Real Estate',
              'Construction Managers',
              'Corporate Lawyer',
              'Customer Service',
              'Customer Success Manager (CSM)',
              'Data Analytics',
              'Data Scientist',
              'Dinges Fire Company',
              'Digital Sales',
            ].map((cat) => (
              <div key={cat} className="p-2.5 rounded-lg bg-[#081F42]/80 border border-sky-300/20">
                {cat}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ServicePageLayout>
  )
}

export default FindJobsPage
