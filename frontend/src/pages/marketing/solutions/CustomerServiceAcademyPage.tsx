import React from 'react'
import { ServicePageLayout } from '@/components/website'

export const CustomerServiceAcademyPage: React.FC = () => {
  return (
    <ServicePageLayout
      number="08"
      title="The Customer Service Academy – B4B Solutions – B4B Network"
      slug="customer-service-academy"
      category="Operations"
      iconName="GraduationCap"
      ctaText="Speak with a Business Coach"
      hasDocument={true}
    >
      <div className="space-y-6 text-blue-100/90 text-sm leading-relaxed">
        {/* Document Header Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-3 shadow-xl backdrop-blur-md">
          <p className="text-base font-bold text-white font-heading">
            Customer service training is essential because it equips employees and staff with the skills and knowledge needed to effectively handle customer interactions, leading to improved customer satisfaction and loyalty. Additionally, it helps create a positive brand reputation and can differentiate a company from its competitors.
          </p>
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-logo-gold)]">
            The Connection for Small Business Solutions
          </p>
        </div>

        {/* Overview Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <p>
            Customer service training is crucial for several reasons, as it directly impacts both employee performance and customer satisfaction.
          </p>
        </div>

        {/* 2-Column Table: Key Benefits (Benefit | Description) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            Key Benefits
          </h3>
          <div className="overflow-x-auto rounded-xl border border-sky-300/30">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[var(--color-midnight)] border-b border-sky-300/30 text-white font-heading">
                  <th className="py-3 px-4 font-bold text-[var(--color-logo-gold)] w-1/3">Benefit</th>
                  <th className="py-3 px-4 font-bold text-[var(--color-logo-gold)] w-2/3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-300/20 text-blue-100">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white align-top">Skill Development</td>
                  <td className="py-3 px-4 text-sky-100 align-top">Training equips employees with essential skills to handle customer interactions effectively.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white align-top">Improved Customer Satisfaction</td>
                  <td className="py-3 px-4 text-sky-100 align-top">Well-trained staff can resolve issues more efficiently, leading to happier customers.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white align-top">Increased Customer Loyalty</td>
                  <td className="py-3 px-4 text-sky-100 align-top">Satisfied customers are more likely to return and recommend the business to others.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white align-top">Enhanced Brand Reputation</td>
                  <td className="py-3 px-4 text-sky-100 align-top">Consistent, high-quality service helps build a positive image for the company.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white align-top">Competitive Advantage</td>
                  <td className="py-3 px-4 text-sky-100 align-top">A strong customer service training program can set a company apart from its competitors.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Continuous Learning Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            Continuous Learning
          </h3>
          <p>
            <strong className="text-white">Ongoing Training:</strong> Customer service training should not be a one-time event. Continuous learning helps employees stay up-to-updated on best practices and evolving customer expectations.
          </p>
          <p>
            <strong className="text-white">Real-World Application:</strong> Training often includes role-playing and simulations, allowing employees to practice their skills in a controlled environment.
          </p>
        </div>

        {/* Conclusion Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            Conclusion
          </h3>
          <p>
            Investing in customer service training is essential for fostering a culture of service excellence. It not only enhances employee capabilities but also significantly contributes to overall business success by improving customer experience and loyalty.
          </p>
        </div>
      </div>
    </ServicePageLayout>
  )
}

export default CustomerServiceAcademyPage
