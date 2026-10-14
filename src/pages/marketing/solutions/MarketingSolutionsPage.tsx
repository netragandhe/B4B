import React from 'react'
import { ServicePageLayout } from '@/components/website'

export const MarketingSolutionsPage: React.FC = () => {
  return (
    <ServicePageLayout
      number="13"
      title="Marketing Solutions"
      slug="marketing-solutions"
      category="Growth"
      iconName="Megaphone"
      ctaText="Speak with a Business Coach"
      hasDocument={true}
    >
      <div className="space-y-6 text-blue-100/90 text-sm leading-relaxed">
        {/* Document Header Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-3 shadow-xl backdrop-blur-md">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Marketing – B4B Marketing Network
          </h2>
          <p className="text-base font-bold text-[#FFC911] font-heading">
            Creating, Communicating, Delivering, and Exchanging Value
          </p>
          <p className="text-xs font-mono uppercase tracking-wider text-sky-200">
            The Connection for Small Business Solutions
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <p>
            Marketing is the process of creating, communicating, delivering, and exchanging offerings that have value for customers. It encompasses a wide range of activities aimed at promoting products or services to attract and retain customers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-white block">Key Components of Marketing:</strong>
              <ul className="list-disc list-inside mt-1 text-xs space-y-1 text-sky-200">
                <li><strong>Creating Value:</strong> Developing products or services that meet customer needs.</li>
                <li><strong>Communicating Value:</strong> Informing potential customers about benefits and features.</li>
                <li><strong>Delivering Value:</strong> Ensuring products or services are accessible.</li>
                <li><strong>Exchanging Value:</strong> Facilitating mutually satisfying transactions.</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-white block">Importance of Marketing:</strong>
              <ul className="list-disc list-inside mt-1 text-xs space-y-1 text-sky-200">
                <li><strong>Customer Acquisition:</strong> Attracting new customers is essential for business growth.</li>
                <li><strong>Customer Retention:</strong> Building loyalty among existing customers helps sustain revenue.</li>
                <li><strong>Brand Awareness:</strong> Effective marketing increases visibility and recognition of a brand.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Four Ps of Marketing */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            The Four Ps of Marketing
          </h3>
          <p>
            The 4 Ps of marketing are Product (what you sell), Price (what you charge), Place (where customers buy), and Promotion (how you communicate your offering). These four elements work together to form a complete marketing strategy.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-[#081F42]/80 border border-sky-300/20 text-center">
              <span className="font-bold text-[#FFC911] block">Product</span>
              <span className="text-[11px] text-sky-200">What is being offered</span>
            </div>
            <div className="p-3 rounded-xl bg-[#081F42]/80 border border-sky-300/20 text-center">
              <span className="font-bold text-[#FFC911] block">Price</span>
              <span className="text-[11px] text-sky-200">Cost reflecting value</span>
            </div>
            <div className="p-3 rounded-xl bg-[#081F42]/80 border border-sky-300/20 text-center">
              <span className="font-bold text-[#FFC911] block">Place</span>
              <span className="text-[11px] text-sky-200">Distribution channels</span>
            </div>
            <div className="p-3 rounded-xl bg-[#081F42]/80 border border-sky-300/20 text-center">
              <span className="font-bold text-[#FFC911] block">Promotion</span>
              <span className="text-[11px] text-sky-200">Communication methods</span>
            </div>
          </div>
        </div>

        {/* Types of Marketing */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            Types of Marketing Channels Deployed:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-sky-100">
            {[
              'Account-Based Marketing',
              'Acquisition Marketing',
              'Advertising Marketing',
              'Affiliate Marketing',
              'B2B Marketing',
              'B2C Marketing',
              'Behavioral Marketing',
              'Brand Marketing',
              'Cause Marketing',
              'Content Marketing',
              'Conversational Marketing',
              'Digital Marketing',
              'Direct Mail Marketing',
              'Email Marketing',
              'Emotional Marketing',
              'Event Marketing',
              'Global Marketing',
              'Guerilla Marketing',
              'Inbound Marketing',
              'Influencer Marketing',
              'Local Marketing',
              'Mobile Marketing',
              'Neuromarketing',
              'Network Event Marketing',
              'Nostalgia Marketing',
              'Organic Marketing',
              'Outbound Marketing',
              'Outreach Marketing',
              'Partnership Marketing',
            ].map((type) => (
              <div key={type} className="p-2.5 rounded-lg bg-[#081F42]/80 border border-sky-300/20">
                {type}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ServicePageLayout>
  )
}

export default MarketingSolutionsPage
