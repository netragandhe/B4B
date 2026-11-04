import React from 'react'
import { ServicePageLayout } from '@/components/website'

export const ItSolutionsPage: React.FC = () => {
  return (
    <ServicePageLayout
      number="12"
      title="IT Solutions"
      slug="it-solutions"
      category="Technology"
      iconName="Server"
      ctaText="Speak with a Business Coach"
      hasDocument={true}
    >
      <div className="space-y-6 text-blue-100/90 text-sm leading-relaxed">
        {/* Document Header Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-3 shadow-xl backdrop-blur-md">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            IT Solutions – B4B Solutions
          </h2>
          <p className="text-base font-bold text-[#FFC911] font-heading">
            B4B IT Network - The Connection for Small Business Solutions
          </p>
          <p className="text-xs text-sky-200">
            Information technology (IT) oversee the use of computers, telecommunication systems, and other devices to create, process, store, retrieve, and transmit information.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <p>
            Information technology (IT) helps businesses streamline operations, improve decision-making, and enhance customer service by automating processes, leveraging cloud computing, and utilizing data analytics. This leads to increased productivity, cost savings, and better overall performance.
          </p>
          <p>
            Businesses require IT solutions to effectively navigate the complexities of the modern digital landscape.
          </p>
        </div>

        {/* IT Solutions Most Businesses Need for Growth */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            IT Solutions Most Businesses Need for Growth:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-sky-100">
            {[
              'Advanced Analytics Tools',
              'Artificial Intelligence Applications',
              'Business Intelligence',
              'Cloud Services',
              'Communication Services',
              'Cybersecurity Services',
              'Customer Relationship Management Systems',
              'Data Backup and Recovery Systems',
              'Enterprise Resource Planning Software',
              'Hardware Support',
              'Help Desk Support',
              'Managed IT Services',
              'Mobile Device Management',
              'Information Reporting',
              'Internet of Things Connectivity (IOT)',
              'IT Consulting',
              'IT Repair Services',
              'Monitoring Services',
              'Network Support Services',
              'Remote Support',
              'Remote Work Technologies',
              'SaaS (Software-as-a-Service)',
              'Server Support',
              'Technology Infrastructure Support',
              'Troubleshooting and Technical Support',
              'VoIP (Voice over Internet Protocol)',
            ].map((sol) => (
              <div key={sol} className="p-2.5 rounded-lg bg-[#081F42]/80 border border-sky-300/20">
                {sol}
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Analytics Details */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            Advanced Analytics Tools
          </h3>
          <p>
            Advanced analytics tools are designed to analyze large volumes of data using sophisticated techniques. They go beyond traditional analytics by employing methods such as machine learning (ML), artificial intelligence (AI), and data mining. These tools help organizations uncover hidden patterns, predict future trends, and automate decision-making processes.
          </p>
          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-[#FFC911] block">1. Finance (FinTech)</strong>
              <p className="text-xs mt-1">Risk Management: Analyze market trends and assess risks. Fraud Detection: Identify unusual patterns that may indicate fraudulent activities. Investment Analysis: Predict stock performance and optimize portfolios.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-[#FFC911] block">2. Healthcare</strong>
              <p className="text-xs mt-1">Patient Care: Analyze patient data to improve treatment outcomes. Operational Efficiency: Streamline processes and reduce costs through data insights. Predictive Analytics: Forecast patient admissions and resource needs.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-[#FFC911] block">3. Marketing & Retail</strong>
              <p className="text-xs mt-1">Customer Insights: Understand consumer behavior and preferences. Campaign Optimization: Measure the effectiveness of marketing strategies. Inventory Management: Optimize stock levels based on sales forecasts.</p>
            </div>
          </div>
        </div>
      </div>
    </ServicePageLayout>
  )
}

export default ItSolutionsPage
