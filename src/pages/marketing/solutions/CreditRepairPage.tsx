import React from 'react'
import { ServicePageLayout } from '@/components/website'

export const CreditRepairPage: React.FC = () => {
  return (
    <ServicePageLayout
      number="04"
      title="Credit Repair & Build Business Credit"
      slug="credit-repair"
      category="Finance"
      iconName="ShieldCheck"
      ctaText="Speak with a Business Coach"
      hasDocument={false}
    />
  )
}

export default CreditRepairPage
