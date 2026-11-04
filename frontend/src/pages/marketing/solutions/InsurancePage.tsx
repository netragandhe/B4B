import React from 'react'
import { ServicePageLayout } from '@/components/website'

export const InsurancePage: React.FC = () => {
  return (
    <ServicePageLayout
      number="11"
      title="Insurance"
      slug="insurance"
      category="Finance"
      iconName="Shield"
      ctaText="Speak with a Business Coach"
      hasDocument={true}
    >
      <div className="space-y-6 text-blue-100/90 text-sm leading-relaxed">
        {/* Document Header Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-3 shadow-xl backdrop-blur-md">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Insurance - B4B Solutions – B4B Network
          </h2>
          <p className="text-base font-bold text-[#FFC911] font-heading">
            Comprehensive Commercial Risk Protection
          </p>
          <p className="text-xs font-mono uppercase tracking-wider text-sky-200">
            The Connection for Small Business Solutions
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <p>
            Business insurance is a type of coverage designed to protect businesses from financial losses due to unexpected events. This includes various risks such as liability claims, employee injuries, property damage, and lawsuits. The primary goal of business insurance is to safeguard both business assets and personal livelihoods from potentially costly claims.
          </p>
        </div>

        {/* 12 Types of Policies */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            12 types of business insurance policies every business should consider:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sky-100">
            {[
              'Business Interruption Insurance',
              'Commercial Property Insurance',
              'Commercial Vehicle Insurance',
              'Cyber Insurance',
              'Directors’ and Officers’ (D&O) Insurance',
              'Excess Liability Insurance',
              'General Liability Insurance',
              'Health Insurance',
              'Product Liability Insurance',
              'Professional Liability Insurance',
              'Tools and Equipment Insurance',
              'Workers’ Compensation Insurance',
            ].map((pol, i) => (
              <div key={pol} className="p-3 rounded-lg bg-[#081F42]/80 border border-sky-300/20">
                {i + 1}. {pol}
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-2">
              <h4 className="font-bold text-white text-base">1. Business Interruption Insurance (BI Coverage)</h4>
              <p>Business interruption insurance is designed to protect businesses from income loss when they cannot operate due to unforeseen events, such as natural disasters or accidents. This type of insurance helps cover Lost Profits, Business Loan Repayments, Employee Salaries, Taxes but not limited to Mortgage or Rent on Commercial Space during the period of disruption.</p>
              <p className="text-xs text-sky-200">Business interruption insurance entails a 48 to 72-hour waiting period to kick in. This is indicated in your policy’s restoration period, which initially lasts for 30 days but can be extended for up to a year.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-2">
              <h4 className="font-bold text-white text-base">2. Commercial Property Insurance</h4>
              <p>Commercial property insurance is designed to protect a business's physical assets from various risks. This includes coverage for buildings, equipment, and inventory against incidents such as fire, theft, and vandalism. It is crucial for businesses to have this insurance to ensure their operations can withstand unexpected events.</p>
              <p className="text-xs text-sky-200">Commercial property insurance is typically bundled with general liability insurance in a business owner’s policy (BOP), which is a form of small business insurance. Some BOPs also include business interruption coverage.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-2">
              <h4 className="font-bold text-white text-base">3. Commercial Vehicle Insurance</h4>
              <p>Commercial vehicle insurance is a specific type of business insurance designed to cover vehicles used for business purposes. This insurance protects businesses from financial losses that may arise from accidents, damage, or liabilities associated with the operation of these vehicles.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-2">
              <h4 className="font-bold text-white text-base">4. Cyber Insurance</h4>
              <p>Cyber insurance is a specialized insurance product designed to protect businesses from risks associated with information technology infrastructure and activities. It covers various costs related to data breaches, cyberattacks, and other cybersecurity incidents.</p>
            </div>
          </div>
        </div>
      </div>
    </ServicePageLayout>
  )
}

export default InsurancePage
