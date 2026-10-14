import React from 'react'
import { ServicePageLayout } from '@/components/website'

export const LeadGenerationPage: React.FC = () => {
  return (
    <ServicePageLayout
      number="07"
      title="Lead Generation"
      slug="lead-generation"
      category="Growth"
      iconName="Target"
      ctaText="Speak with an Advisor"
      hasDocument={false}
    />
  )
}

export default LeadGenerationPage
