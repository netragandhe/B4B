import React from 'react'
import { ServicePageLayout } from '@/components/website'

export const BusinessSolutionsPage: React.FC = () => {
  return (
    <ServicePageLayout
      number="02"
      title="Business Solutions"
      slug="business-solutions"
      category="Operations"
      iconName="LayoutGrid"
      ctaText="Speak with a Business Coach"
      hasDocument={true}
    >
      <div className="space-y-6 text-blue-100/90 text-sm leading-relaxed">
        {/* Document Header Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-3 shadow-xl backdrop-blur-md">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Business Management – B4B Solutions
          </h2>
          <p className="text-base font-bold text-[#FFC911] font-heading">
            Business Management – Teamwork Makes the DREAM Work!!
          </p>
          <p className="text-xs font-mono uppercase tracking-wider text-sky-200">
            The Connection for Small Business Solutions
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <p>
            Business management tools are essential applications and systems that assist organizations in enhancing their processes. They automate routine tasks and functions, which lead to improved efficiency and productivity across various business platforms.
          </p>
          <p>
            The following tools are highly regarded for their ability to streamline operations, enhance communication, and boost productivity across various business environments:
          </p>
          <p>
            These tools cater to different business needs, from project management to customer relationship management, making them essential for effective administration and business management.
          </p>
        </div>

        {/* Key Functions */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            Key Functions of Business Management Tools
          </h3>
          <p>These tools can be categorized based on their functions, which include:</p>
          <ul className="space-y-2 text-sky-100 list-disc list-inside">
            <li><strong>Project Management:</strong> Tools that help plan, execute, and monitor projects effectively.</li>
            <li><strong>Customer Relationship Management (CRM):</strong> Applications designed to manage interactions with customers and improve service.</li>
            <li><strong>Financial Tracking:</strong> Systems that assist in budgeting, accounting, and financial reporting.</li>
            <li><strong>Data Management:</strong> Tools for data input, validation, and consolidation to support decision-making.</li>
          </ul>
        </div>

        {/* Importance */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            Importance of Business Management Tools
          </h3>
          <p>Implementing the right business management tools can provide several advantages:</p>
          <ul className="space-y-2 text-sky-100 list-disc list-inside">
            <li><strong>Increased Efficiency:</strong> Automation of routine tasks allows employees to focus on higher-value activities.</li>
            <li><strong>Cost Savings:</strong> Effective tools can help identify profitable investments and reduce errors.</li>
            <li><strong>Improved Customer Service:</strong> CRM tools enhance customer engagement and retention.</li>
            <li><strong>Better Decision-Making:</strong> Access to consolidated data supports informed strategic decisions.</li>
          </ul>
        </div>

        {/* Popular Tools */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            Popular Business Management Tools
          </h3>
          <p>Here are some widely used business management tools that cater to various organizational needs:</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {['Canva', 'Google Workspace', 'HubSpot', 'Invoicera', 'Shopify', 'Mailchimp', 'Slack', 'Workstatus', 'Xero', 'Zoom'].map((tool) => (
              <div key={tool} className="p-3 rounded-xl bg-[#081F42]/80 border border-sky-300/30 text-center font-bold text-white text-xs">
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ServicePageLayout>
  )
}

export default BusinessSolutionsPage
