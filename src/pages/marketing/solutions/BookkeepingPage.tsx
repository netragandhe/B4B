import React from 'react'
import { ServicePageLayout } from '@/components/website'

export const BookkeepingPage: React.FC = () => {
  return (
    <ServicePageLayout
      number="15"
      title="Bookkeeping"
      slug="bookkeeping"
      category="Finance"
      iconName="BookOpen"
      ctaText="Speak with a Business Coach"
      hasDocument={false}
    />
  )
}

export default BookkeepingPage
