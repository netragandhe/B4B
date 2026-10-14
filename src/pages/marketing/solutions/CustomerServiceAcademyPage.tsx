import React from 'react'
import { ServicePageLayout } from '@/components/website'

export const CustomerServiceAcademyPage: React.FC = () => {
  return (
    <ServicePageLayout
      number="08"
      title="Customer Service Academy"
      slug="customer-service-academy"
      category="Operations"
      iconName="GraduationCap"
      ctaText="Speak with a Business Coach"
      hasDocument={false}
    />
  )
}

export default CustomerServiceAcademyPage
