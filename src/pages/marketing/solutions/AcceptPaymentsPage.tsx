import React from 'react'
import { ServicePageLayout } from '@/components/website'

export const AcceptPaymentsPage: React.FC = () => {
  return (
    <ServicePageLayout
      number="01"
      title="Accept Payments"
      slug="accept-payments"
      category="Finance"
      iconName="CreditCard"
      ctaText="Speak with a Business Coach"
      hasDocument={true}
    >
      <div className="space-y-6 text-blue-100/90 text-sm leading-relaxed">
        {/* Document Header Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-3 shadow-xl backdrop-blur-md">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Accept Payments – B4B Network
          </h2>
          <p className="text-base font-bold text-[#FFC911] font-heading">
            Accept Payments – Online, ACH Transfers, Mobile, POS
          </p>
          <p className="text-xs font-mono uppercase tracking-wider text-sky-200">
            The Connection for Small Business Solutions
          </p>
        </div>

        {/* Types of Payment Systems */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-5 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            Types of Payment Systems:
          </h3>
          <p>
            There are several types of payment systems that businesses and consumers use to facilitate transactions. Each system has unique features and benefits.
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-2">
              <h4 className="font-bold text-white text-base">1. Credit and Debit Cards</h4>
              <p><strong>Description:</strong> Widely accepted payment methods that allow users to make purchases using funds from their bank accounts (debit) or borrowed funds (credit).</p>
              <div>
                <strong>Advantages:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1 text-sky-100">
                  <li>Fast transaction processing</li>
                  <li>Fraud protection and chargeback options</li>
                  <li>Global acceptance</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-2">
              <h4 className="font-bold text-white text-base">2. Digital Wallets</h4>
              <p><strong>Examples:</strong> PayPal, Google Pay, Apple Pay</p>
              <p><strong>Description:</strong> Electronic systems that store payment information and allow users to make transactions via mobile devices or online.</p>
              <div>
                <strong>Advantages:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1 text-sky-100">
                  <li>Convenience and speed</li>
                  <li>Enhanced security features</li>
                  <li>Supports contactless payments</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-2">
              <h4 className="font-bold text-white text-base">3. Bank Transfers</h4>
              <p><strong>Description:</strong> Direct transfers of funds from one bank account to another, often used for larger transactions.</p>
              <div>
                <strong>Advantages:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1 text-sky-100">
                  <li>Lower transaction fees</li>
                  <li>Secure and traceable</li>
                  <li>Ideal for recurring payments</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-2">
              <h4 className="font-bold text-white text-base">4. Mobile Payments</h4>
              <p><strong>Description:</strong> Payments made using mobile devices, often through apps or contactless technology.</p>
              <div>
                <strong>Advantages:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1 text-sky-100">
                  <li>Quick and easy transactions</li>
                  <li>Increasingly popular among younger consumers</li>
                  <li>Supports various payment methods, including cards and bank accounts</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#081F42]/80 border border-sky-300/30 space-y-2">
              <h4 className="font-bold text-white text-base">5. Cash Payments</h4>
              <p><strong>Description:</strong> Physical currency used to settle transactions, still popular for small purchases.</p>
              <div>
                <strong>Advantages:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1 text-sky-100">
                  <li>Immediate payment without technology</li>
                  <li>No transaction fees</li>
                  <li>Preferred by some consumers for privacy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* How to Choose The Right Online Payment Processing */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            How to Choose The Right Online Payment Processing?
          </h3>
          <p>
            When choosing the right online payment processing small business owners must consider certain factors such as transaction fees, integration capabilities, and customer support. It's very important that you select a payment service provider (PSPs) that meets your specific business needs.
          </p>
          <p>
            Growing your online presence is one of the smartest moves a business can make to acquire new customers and tap into new markets far beyond your local reach.
          </p>
          <p>
            Key factors to consider include fee structures. Monthly or annual flat-rate pricing is simpler, but interchange-plus, which adjusts pricing based on the real cost of each transaction, may end up being cheaper as your business grows.
          </p>
          <p>
            Our B4B Coaches educate business owners on the best devices needed to process payment, the necessary hardware or software to securely handle transactions whether you're looking to process payments online, in person, or over the phone, enhancing convenience for your clients.
          </p>
          <p>
            According to a Visa study, in the past, only major corporations could scale to secure customers across the globe, but today’s small business owners can virtually compete with big companies having a borderless cap.
          </p>
          <p>
            In fact; in 2025, Visa’s Global Digital Shopping Index reported that 56 percent of shoppers say they specifically choose merchants that offer smooth online payment processing increasing conversions and enhancing customer loyalty.
          </p>
          <p>
            In today’s rapidly digitalizing world, leveraging new technology to accept payments more efficiently and securely can be what sets a business apart. Accepting online payments can simplify your business operations, since many platforms offer data and tools for automatic invoicing, financial reporting and inventory tracking.
          </p>
          <p>
            Digital payments typically settle within one to two business days, adding more liquidity and cash flow to your business which makes digital payment more cost efficient than processing a non-digital payment.
          </p>
          <p>
            You will experience a lower your rate of cart abandonment when you provide a variety of payment options to accommodate all your customers. Today’s options include; Credit Cards and Debit cards, which remain the gold standard thanks to their established infrastructure, maintaining a dominant market share.
          </p>
          <p>
            <strong>ACH transfers:</strong> These bank-to-bank money transfers can be a secure and cost-effective way to accept payments directly from a customer’s bank account. ACH transfers take longer to process but their lower processing fees make them very attractive for business-to-business (B2B) payments and high-ticket transactions.
          </p>
          <p>
            <strong>Digital wallets:</strong> Huge demands amongst younger spenders, digital wallets acceptance is a must. Apple Pay, Google Pay, PayPal, Samsung Pay and Venmo offer fast, secure and seamless mobile checkout.
          </p>
          <p>
            <strong>Buy Now, Pay Later (BNPL):</strong> Services like Affirm, Afterpay and Klarna allow customers to pay overtime. BNPL can also attract younger shoppers and increase a business’s average order value.
          </p>
          <p>
            Also, if you plan to expand globally, a B4B Coach can guide you with multi-currency transactions or international payments solutions to scale.
          </p>
        </div>
      </div>
    </ServicePageLayout>
  )
}

export default AcceptPaymentsPage
