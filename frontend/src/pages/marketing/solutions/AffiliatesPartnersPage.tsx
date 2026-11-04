import React from 'react'
import { ServicePageLayout } from '@/components/website'

export const AffiliatesPartnersPage: React.FC = () => {
  return (
    <ServicePageLayout
      number="14"
      title="Affiliates / Partners / Influencers"
      slug="affiliates-partners"
      category="Growth"
      iconName="Handshake"
      ctaText="Speak with a Business Coach"
      hasDocument={true}
    >
      <div className="space-y-6 text-blue-100/90 text-sm leading-relaxed">
        {/* Document Header Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-3 shadow-xl backdrop-blur-md">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Affiliates and Partners – B4B
          </h2>
          <p className="text-base font-bold text-[#FFC911] font-heading">
            Earn Commissions and Scale Collaborative Revenue
          </p>
          <p className="text-xs font-mono uppercase tracking-wider text-sky-200">
            The Connect for Small Business Solutions
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <p>
            The B4B Affiliate programs allow individuals, businesses and influencers to join our network and earn commissions by promoting products or services. Affiliates use unique links to track sales or actions generated through their promotions or they can manually submit leads through our lead pipeline. When a customer makes a purchase using an affiliate link or lead submission, the affiliate earns a commission.
          </p>
        </div>

        {/* Pillars */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-1">
              <h4 className="font-bold text-[#FFC911] text-base">Influencers</h4>
              <p>The B4B America Influencers collaboration can enhance Influencer credibility and provide a lucrative financial compensation, while also making it possible for brands to reach targeted audiences through authentic endorsements. This mutual benefit can lead to increased engagement and sales for both parties.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-1">
              <h4 className="font-bold text-[#FFC911] text-base">Partners</h4>
              <p>By leveraging these benefits, B4B Partners can effectively scale their operations and enhance their competitive edge in the market. They have an opportunity to expand their market reach and reduce sales and marketing costs by using established networks and relationships. It also allows sharing resources, expertise, and risks, potentially leading to increased revenue and growth.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-1">
              <h4 className="font-bold text-[#FFC911] text-base">Referral Program</h4>
              <p>B4B America referral programs are structured processes that allow current clients, individuals and staff to refer business or refer potential candidates for open positions. These programs offer several advantages that can significantly enhance the hiring process or provide incentives on B4B Product / service solutions to recognize and reward these individuals.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-2">
              <h4 className="font-bold text-[#FFC911] text-base">Careers & Guiding Creed</h4>
              <ul className="list-disc list-inside space-y-1 text-sky-100 text-xs">
                <li>We Respect Hardwork but we prefer to Work Smart!</li>
                <li>We work in the Industry of Innovations, So We’re Always Learning!</li>
                <li>We Have An Eye to Recognize & Reward Exceptional Talent!</li>
                <li>Our Leaders Offer You Wisdom and Opportunities to Climb and Excel</li>
                <li>We Promote Winning Having Integrity & Intelligence</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ServicePageLayout>
  )
}

export default AffiliatesPartnersPage
