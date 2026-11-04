import React from 'react'
import { ServicePageLayout } from '@/components/website'

export const LeadGenerationPage: React.FC = () => {
  return (
    <ServicePageLayout
      number="07"
      title="Lead Generation -  Solutions - B4B Network"
      slug="lead-generation"
      category="Growth"
      iconName="Target"
      ctaText="Speak with an Advisor"
      hasDocument={true}
    >
      <div className="space-y-6 text-blue-100/90 text-sm leading-relaxed">
        {/* Document Header Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-3 shadow-xl backdrop-blur-md">
          <p className="text-base font-bold text-white font-heading">
            Lead generation services focus on attracting and capturing consumer interest in products or services to create potential customers. Our network employs various strategies to gather contact information from interested individuals.
          </p>
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-logo-gold)]">
            The Connect for Small Business Solutions
          </p>
        </div>

        {/* Client Document Body */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <p>
            Implementing the correct strategies to attract potential customers, including creating high-quality content that addresses the needs of target audience and optimizing websites for SEO to ensure visibility in search results. We also work with teams that leverage social media platforms to engage with users and utilize sales intelligence tools to identify and prioritize qualified leads.
          </p>
          <p>
            We measure campaign success using key metrics like conversion rates, qualified leads (MQLs and SQLs), and customer acquisition cost (CAC). These metrics help track how effectively campaigns turn prospects into customers and optimize strategies for better results.
          </p>
          <p>
            Lead generation companies prioritize rapid lead acquisition through tactical methods, often resulting in a high volume of leads but with a short-term focus. In contrast, traditional marketing agencies adopt a broader approach, emphasizing brand development and long-term customer relationships. This fundamental difference influences how businesses should choose their partners based on their specific growth objectives.
          </p>
        </div>
      </div>
    </ServicePageLayout>
  )
}

export default LeadGenerationPage
