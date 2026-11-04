import React from 'react'
import { ServicePageLayout } from '@/components/website'

export const BookkeepingPage: React.FC = () => {
  return (
    <ServicePageLayout
      number="15"
      title="Tax Prep & Services – B4B Solutions – B4B America"
      slug="bookkeeping"
      category="Finance"
      iconName="BookOpen"
      ctaText="Speak with a Business Coach"
      hasDocument={true}
    >
      <div className="space-y-6 text-blue-100/90 text-sm leading-relaxed">
        {/* Document Header Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-3 shadow-xl backdrop-blur-md">
          <p className="text-base font-bold text-white font-heading">
            When selecting bookkeeping software for small businesses, several options stand out based on features, pricing, and suitability for different business sizes.
          </p>
          <p className="text-sm text-sky-100">
            Choosing the right bookkeeping software depends on your business size and specific needs.
          </p>
          <p className="text-sm text-sky-100">
            Wave is excellent for those looking for free options, while QuickBooks offers more comprehensive features for growing businesses.  Zoho Books is tailored for micro-businesses, making it a great choice for those with lower revenue.
          </p>
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-logo-gold)] pt-1">
            B4B Bookkeeping & Tax Prep - The Connection for Small Business Solutions
          </p>
        </div>

        {/* Key Features of Business Bookkeeping Software */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-5 shadow-xl backdrop-blur-md">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white font-heading">
              Key Features of Business Bookkeeping Software
            </h3>
            <p className="text-sky-200">
              When selecting bookkeeping software for your business, consider the following essential features:
            </p>
          </div>

          <div className="space-y-4 pt-1">
            {/* Bank Sync and Automation */}
            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/20 space-y-2">
              <h4 className="font-bold text-white font-heading text-base">
                Bank Sync and Automation
              </h4>
              <p className="text-xs text-sky-100">
                <strong className="text-white">Automatic Transaction Syncing:</strong> The software should automatically sync transactions from bank accounts and credit cards.
              </p>
              <p className="text-xs text-sky-100">
                <strong className="text-white">Intelligent Categorization:</strong> It should categorize transactions intelligently and learn over time to reduce manual entry.
              </p>
            </div>

            {/* Clear and Usable Financial Reporting */}
            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/20 space-y-2">
              <h4 className="font-bold text-white font-heading text-base">
                Clear and Usable Financial Reporting
              </h4>
              <p className="text-xs text-sky-100">
                <strong className="text-white">User-Friendly Reports:</strong> Look for software that generates clear income statements, balance sheets, and cash flow reports.
              </p>
              <p className="text-xs text-sky-100">
                <strong className="text-white">Real-Time Updates:</strong> Reports should update in real time and be easy to export for stakeholders.
              </p>
            </div>

            {/* Multi-User Access with Role-Based Permissions */}
            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/20 space-y-2">
              <h4 className="font-bold text-white font-heading text-base">
                Multi-User Access with Role-Based Permissions
              </h4>
              <p className="text-xs text-sky-100">
                <strong className="text-white">Collaborative Features:</strong> The software should support multiple users, allowing collaboration among team members.
              </p>
              <p className="text-xs text-sky-100">
                <strong className="text-white">Controlled Access:</strong> Role-based permissions ensure that sensitive information is protected while allowing necessary access to relevant users.
              </p>
            </div>

            {/* Scalability */}
            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/20 space-y-2">
              <h4 className="font-bold text-white font-heading text-base">
                Scalability
              </h4>
              <p className="text-xs text-sky-100">
                <strong className="text-white">Growth Support:</strong> The software should be capable of handling increased complexity as your business grows, accommodating higher transaction volumes and additional features as needed.
              </p>
            </div>
          </div>
        </div>

        {/* Accuracy and Compliance Conclusion */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <p>
            Business bookkeeping software enhances financial reporting accuracy by automating data entry and standardizing processes, which reduces the likelihood of human errors. It also provides real-time insights and generates reports that reflect true company performance, ensuring compliance with accounting standards.
          </p>
        </div>
      </div>
    </ServicePageLayout>
  )
}

export default BookkeepingPage
