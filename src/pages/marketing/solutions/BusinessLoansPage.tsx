import React from 'react'
import { ServicePageLayout } from '@/components/website'

export const BusinessLoansPage: React.FC = () => {
  return (
    <ServicePageLayout
      number="06"
      title="Business Loans"
      slug="business-loans"
      category="Finance"
      iconName="Landmark"
      ctaText="Speak with a Business Coach"
      hasDocument={true}
    >
      <div className="space-y-6 text-blue-100/90 text-sm leading-relaxed">
        {/* Document Header Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-3 shadow-xl backdrop-blur-md">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Business Funding, Loans, Financing – B4B Network
          </h2>
          <p className="text-base font-bold text-[#FFC911] font-heading">
            Funding Opportunities to Help Small Business Grow
          </p>
          <p className="text-xs font-mono uppercase tracking-wider text-sky-200">
            The Connection for Small Business Solutions
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <p>
            Being connected to a major financial network of lenders and institutions enhances access to resources, expertise, and opportunities for collaboration. This connection can significantly improve service offerings and funding opportunities to help the small business secure the financing necessary to grow.
          </p>
          <p>
            Unlike banks or local lending institutions, which only lend to the most credit-worthy businesses, our network leverages its relationships with national and near-prime lenders to secure the financing you require. Whether you need to purchase new equipment, finance your accounts receivables, raise working capital, acquire a company, or fix and flip a real estate property, we can help.
          </p>
          <p>
            Our network is well-established, having been in business for years, and has a proven track record of helping businesses in all the 50 states secure funding. We work with a diverse range of industries and cater to all credit categories, ensuring that regardless of your financial situation or sector, we can provide the right solution for your needs.
          </p>
          <p className="font-bold text-[#FFC911]">
            We take pride in helping you to get properly funded when everyone else said no.
          </p>
        </div>

        {/* Industries We Work With */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            Industries We Work With:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sky-100">
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/20">
              <strong className="text-white block">Food Services</strong>
              <span className="text-xs text-sky-200">Hotels, Motels, Restaurants</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/20">
              <strong className="text-white block">Health Care and Social Assistance</strong>
              <span className="text-xs text-sky-200">Nursing Homes, and Home Health Care Services</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/20">
              <strong className="text-white block">Professional, Scientific, and Technical Services</strong>
              <span className="text-xs text-sky-200">Accounting, Consulting Firms, Insurance and Legal</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/20">
              <strong className="text-white block">Retail Trade</strong>
              <span className="text-xs text-sky-200">Clothing Stores, Department Stores, and Electronics Stores</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/20">
              <strong className="text-white block">Manufacturing</strong>
              <span className="text-xs text-sky-200">Furniture, Clothing, and Electronics</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/20">
              <strong className="text-white block">Construction</strong>
              <span className="text-xs text-sky-200">Office Buildings, Home Builders, Home Remodelers, Real Estate Developers, Investors</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/20">
              <strong className="text-white block">Church Financing</strong>
              <span className="text-xs text-sky-200">Finance pews, A/C, heating, organs, sound/video, pianos, computers, purchasing or expansion. Receive low rates and up to 60 months to repay!</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/20">
              <strong className="text-white block">Real Estate, Rental, and Leasing</strong>
              <span className="text-xs text-sky-200">Property Management Companies and Real Estate Brokers</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/20">
              <strong className="text-white block">Administrative and Support Services</strong>
              <span className="text-xs text-sky-200">Temp Agencies and Janitorial Services</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/20">
              <strong className="text-white block">Wholesale Trade</strong>
              <span className="text-xs text-sky-200">Wholesalers and Distributors</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/20">
              <strong className="text-white block">Transportation and Warehousing</strong>
              <span className="text-xs text-sky-200">Trucking Companies, Delivery Services, and Storage Facilities</span>
            </div>
          </div>
        </div>

        {/* Typical Loan Structure */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            Typical Loan Structure:
          </h3>
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-[#FFC911] block">Accounts Receivable Financing</strong>
              <p className="text-xs mt-1">A financial solution that allows businesses to use their outstanding invoices as collateral to secure capital. This method provides quick access to cash flow, helping companies manage their liquidity effectively.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-[#FFC911] block">Business Acquisition Financing</strong>
              <p className="text-xs mt-1">Refers to the funds used to purchase an existing business. This type of financing enables entrepreneurs to acquire a company without needing the full purchase price upfront. It is crucial for facilitating business growth and expansion.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-[#FFC911] block">Business Term Loans</strong>
              <p className="text-xs mt-1">Monetary loans that businesses borrow as a lump sum. These loans are typically repaid over a set period, which can range from one to ten years, and sometimes even longer.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-[#FFC911] block">Additional Available Facilities:</strong>
              <p className="text-xs mt-1 text-sky-200">
                Church Financing • Commercial Bridge Loans • Commercial Real Estate Lending • Construction Equipment Financing • Debt Restructuring • Easy Pay Cash/Financing • Equipment Financing • Fix & Flip Loans • Medical Working Capital • Revenue Based Financing • Securities Based Lending • SBA Loans • Unsecured Business Loans/Lines of Credit
              </p>
            </div>
          </div>
        </div>
      </div>
    </ServicePageLayout>
  )
}

export default BusinessLoansPage
