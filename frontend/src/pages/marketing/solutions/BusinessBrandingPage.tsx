import React from 'react'
import { ServicePageLayout } from '@/components/website'

export const BusinessBrandingPage: React.FC = () => {
  return (
    <ServicePageLayout
      number="03"
      title="Business Branding"
      slug="business-branding"
      category="Growth"
      iconName="Palette"
      ctaText="Speak with a Business Coach"
      hasDocument={true}
    >
      <div className="space-y-6 text-blue-100/90 text-sm leading-relaxed">
        {/* Document Header Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-3 shadow-xl backdrop-blur-md">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Business Branding – Brand Your Business – B4B Network
          </h2>
          <p className="text-base font-bold text-[#FFC911] font-heading">
            Business Branding – Create Business Identity
          </p>
          <p className="text-xs font-mono uppercase tracking-wider text-sky-200">
            The Connection for Small Business Solutions
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <p>
            Brand identity helps business owners determine the company’s vision and goals upfront, providing a clear path to success. Free word-of-mouth marketing increases recognition and exposure, customers tend to recommend brands they like to tell their friends and families. When the brand’s values and mission statement are properly executed it’s much easier to attract valued customers. Customers are more encouraged to purchase a brand that displays credibility and reliability that builds trust.
          </p>
        </div>

        {/* Top 10 Must-Have Branded Products */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            Top 10 Must-Have Branded Products Every Business Needs to Grow:
          </h3>
          <p className="font-bold text-[#FFC911]">Print My LOGO on Everything – B4B BYB Coach</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sky-100">
            <div className="p-3 rounded-lg bg-[#081F42]/80 border border-sky-300/20">1) Caps and Hats</div>
            <div className="p-3 rounded-lg bg-[#081F42]/80 border border-sky-300/20">2) Custom Notebooks</div>
            <div className="p-3 rounded-lg bg-[#081F42]/80 border border-sky-300/20">3) Drinkware (like mugs and tumblers)</div>
            <div className="p-3 rounded-lg bg-[#081F42]/80 border border-sky-300/20">4) Eco-Friendly Products</div>
            <div className="p-3 rounded-lg bg-[#081F42]/80 border border-sky-300/20">5) Keychains</div>
            <div className="p-3 rounded-lg bg-[#081F42]/80 border border-sky-300/20">6) T-shirts</div>
            <div className="p-3 rounded-lg bg-[#081F42]/80 border border-sky-300/20">7) Outdoor and Lifestyle Items</div>
            <div className="p-3 rounded-lg bg-[#081F42]/80 border border-sky-300/20">8) Pens and Writing Instruments</div>
            <div className="p-3 rounded-lg bg-[#081F42]/80 border border-sky-300/20">9) Technology Items (such as power banks and headphones)</div>
            <div className="p-3 rounded-lg bg-[#081F42]/80 border border-sky-300/20">10) Tote Bags</div>
          </div>
          <p className="text-xs text-sky-200 pt-1">These products help create brand visibility and foster customer loyalty.</p>
        </div>

        {/* 10 Golden Rules */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-6 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            10 GOLDEN RULES OF BRANDING A BUSINESS
          </h3>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-2">
              <h4 className="font-bold text-white text-base">1. Define the Business Goals and Values</h4>
              <p>Business goals are the specific accomplishments or targets an organization aims to achieve within a defined time frame, guiding its direction and purpose. Business values are the core fundamental principles that dictate the behavior and decision-making to solidify culture and identity.</p>
              <p>Before starting the brand-building process, defining the business goals and values helps you understand the company’s greater purpose and the necessary measures to execute.</p>
              <div className="pt-2 space-y-1 text-xs">
                <p><strong>Vision Statement:</strong> B4B America’s vision: “The Little Engine That Could, Made All The Small Businesses In America Thrive”</p>
                <p><strong>Mission Statement:</strong> B4B America’s Mission: “We design ideas and turn prospects into clients. We offer solutions for you to build business credit, accept payments and secure business funding. During the growth phase; you may encounter challenges, like integrating new technology with older systems. We work smartly to connect you with the most cost-efficient technology to improve your business operations so you can experience healthy business growth.”</p>
                <p><strong>Values Statement:</strong> B4B Values: “Dreamers, Wake Up, Write A Plan, Design It, Be Ambitious NOW Execute!“</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-2">
              <h4 className="font-bold text-white text-base">2. Research Your Brand’s Target Audience</h4>
              <p>Research similar brands and study their customers, researching the target market allows businesses to understand their potential customers and the marketing strategy that appeals to them. The best way to conduct market research is by defining a user persona, a fictional representation of your ideal customer.</p>
              <p>Analyze their demographics, such as age range, gender and location. Conduct user studies, interviews, and surveys to understand customers’ needs, interests, pain points, and behavior patterns.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-2">
              <h4 className="font-bold text-white text-base">3. Analyze the Competition</h4>
              <p>Analyzing the competition involves assessing your competitors' strengths and weaknesses to identify opportunities and threats in the market. This process helps you refine your business strategies to maintain a competitive edge.</p>
              <p>Analyze their products or services, pricing structure, locations, and promotion strategies. Conduct a SWOT analysis to determine their strengths, weaknesses, opportunities and threats.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-2">
              <h4 className="font-bold text-white text-base">4. Determine the Brand Positioning</h4>
              <p>To determine brand positioning, analyze how your brand is perceived in relation to competitors by assessing factors like customer perceptions, values, and unique selling propositions. Additionally, conduct market research to gather insights into customer preferences and identify your brand's unique attributes that resonate with your target audience.</p>
            </div>
          </div>
        </div>
      </div>
    </ServicePageLayout>
  )
}

export default BusinessBrandingPage
