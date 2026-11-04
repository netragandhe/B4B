import React from 'react'
import { ServicePageLayout } from '@/components/website'

export const CreditRepairPage: React.FC = () => {
  return (
    <ServicePageLayout
      number="04"
      title="Build Business Credit – B4B Network"
      slug="credit-repair"
      category="Finance"
      iconName="ShieldCheck"
      ctaText="Speak with a Business Coach"
      hasDocument={true}
    >
      <div className="space-y-6 text-blue-100/90 text-sm leading-relaxed">
        {/* Document Header Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-3 shadow-xl backdrop-blur-md">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Build Business Credit
          </h2>
          <p className="text-base font-bold text-[var(--color-logo-gold)] font-heading">
            Get Your Free Business Credit Report, Establish Tradelines and Monitor Your Business Credit
          </p>
          <p className="text-xs font-mono uppercase tracking-wider text-sky-200">
            The Connection for Small Business Solutions
          </p>
        </div>

        {/* Client Document Body */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <p>
            Building business credit without relying on personal credit involves several key steps. This process differentiates your business's financial identity from your personal finances, which can protect your personal assets and improve your business's financial standing.
          </p>
          <p>
            Building business credit can also aid in securing financing with better terms, negotiate favorable agreements with vendors and suppliers and protect your personal finances by keeping them separate from your business.  It also enhances your business's credibility and financial reputation, making it easier to grow and manage operations.
          </p>
          <p>
            Building business credit encourages better financial practices, helping business owners manage their cash flow effectively. A strong credit profile can open doors to future financing opportunities, supporting long-term business expansion.
          </p>
          <p>
            By focusing on building business credit, entrepreneurs can create a solid foundation for their business, ensuring they are well-positioned to seize opportunities and navigate challenges.
          </p>
        </div>
      </div>
    </ServicePageLayout>
  )
}

export default CreditRepairPage
