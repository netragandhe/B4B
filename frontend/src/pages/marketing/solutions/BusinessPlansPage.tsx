import React from 'react'
import { ServicePageLayout } from '@/components/website'

export const BusinessPlansPage: React.FC = () => {
  return (
    <ServicePageLayout
      number="05"
      title="Business Plans"
      slug="business-plans"
      category="Finance"
      iconName="FileSpreadsheet"
      ctaText="Speak with a Business Coach"
      hasDocument={true}
    >
      <div className="space-y-6 text-blue-100/90 text-sm leading-relaxed">
        {/* Document Header Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-3 shadow-xl backdrop-blur-md">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Business Plan Writing – B4B Network
          </h2>
          <p className="text-base font-bold text-[#FFC911] font-heading">
            Business Plan Writing
          </p>
          <p className="text-xs font-mono uppercase tracking-wider text-sky-200">
            The Connection for Small Business Solutions
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <p>
            A business plan serves as a crucial tool for entrepreneurs, providing a structured approach to launching and managing a business. It helps you clarify your goals and strategies while also identifying potential risks to guide your business. Additionally, it is often essential for securing funding from investors or lenders, as it demonstrates your preparedness and the viability of your business idea.
          </p>
          <p>
            Having a business plan is not just a formality; it is a vital component of a successful business strategy. Most people know how to successfully plan an event but don't know how to plan a successful business.
          </p>
        </div>

        {/* Plan Types */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            Business Plan Categories & Purposes
          </h3>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-1">
              <h4 className="font-bold text-[#FFC911] text-base">[ Business Acquisition ]</h4>
              <p>A business acquisition plan is a detailed document that outlines the strategy for purchasing another business, including the rationale for the acquisition, financial analysis, and integration plans. It serves as a roadmap to ensure the transaction aligns with strategic goals and helps secure funding from investors or lenders.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-1">
              <h4 className="font-bold text-[#FFC911] text-base">[ Corporate Franchises ]</h4>
              <p>A corporate franchise plan is a strategic document that outlines how a franchisor intends to expand its business through franchising. It serves as a roadmap for both the franchisor and franchisees, ensuring that brand standards are maintained while providing support to franchisees.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-1">
              <h4 className="font-bold text-[#FFC911] text-base">[ E2/EB5/L1/EB-2 NIW Immigration Visa ]</h4>
              <p>The E-2, EB-5, L-1, and EB-2 NIW visas each have specific business plan requirements tailored to their immigration goals. The E-2 visa business plan focuses on showing a substantial investment in a real, operating U.S. business, while the EB-5 plan must demonstrate job creation and significant capital investment. The L-1 visa plan highlights the transfer of a qualified employee to a U.S. branch, and the EB-2 NIW plan emphasizes the applicant's extraordinary ability or national interest.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-1">
              <h4 className="font-bold text-[#FFC911] text-base">[ Government Contracts ]</h4>
              <p>A business plan for government contract approval is essential for demonstrating your business's capability and eligibility to secure government contracts. This document outlines your business's goals, strategies, and operational plans tailored to meet government requirements.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-1">
              <h4 className="font-bold text-[#FFC911] text-base">[ Grant Writing ]</h4>
              <p>Grant writing is the process of creating proposals to obtain funding from various grant-making institutions, including foundations, corporations, and government agencies. The goal is to secure financial support for projects or programs that align with the funder's objectives.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-1">
              <h4 className="font-bold text-[#FFC911] text-base">[ In-house Purpose ]</h4>
              <p>An in-house business plan is essential for any business, regardless of its size or stage. It serves multiple critical functions that contribute to the overall success and sustainability of the organization. It provides direction, supports growth, attracts funding, manages risks, and enhances communication within the organization.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-1">
              <h4 className="font-bold text-[#FFC911] text-base">[ Landlord and Tenant Rentals ]</h4>
              <p>A business plan is crucial for any entrepreneur or business owner. It serves multiple purposes that contribute to the success and sustainability of a business.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-1">
              <h4 className="font-bold text-[#FFC911] text-base">[ Not For Profit ]</h4>
              <p>A nonprofit business plan is a strategic document that outlines how an organization will achieve its mission. It serves as a roadmap for stakeholders, including donors and board members, detailing the organization's goals, operational plans, and financial strategies.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-1">
              <h4 className="font-bold text-[#FFC911] text-base">[ Strategic Alliance, Merger or Partnership ]</h4>
              <p>In today’s economy, businesses are looking for ways to grow and cut their expenses. Many organizations have found that an alliance or merger is a great way to rise to the top. The B4B Biz Plan Network has the resources to design and deliver the right plan so you can attract the right partner for a strategic alliance.</p>
            </div>
          </div>
        </div>

        {/* Pricing note */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-2 shadow-xl backdrop-blur-md">
          <h4 className="font-bold text-white text-base">Plan Pricing Structure</h4>
          <p>
            Business plans pricing varies based on the complexity starting at approximately $2,500 and can exceed $25,000+ for projects requiring larger funding. Prices are determined based on business industry, location, purpose of the plan, funding amount, and other factors that may require an extensive amount of research.
          </p>
        </div>
      </div>
    </ServicePageLayout>
  )
}

export default BusinessPlansPage
