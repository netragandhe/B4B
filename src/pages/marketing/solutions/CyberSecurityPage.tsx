import React from 'react'
import { ServicePageLayout } from '@/components/website'

export const CyberSecurityPage: React.FC = () => {
  return (
    <ServicePageLayout
      number="09"
      title="Cyber Security"
      slug="cyber-security"
      category="Technology"
      iconName="ShieldAlert"
      ctaText="Speak with a Business Coach"
      hasDocument={true}
    >
      <div className="space-y-6 text-blue-100/90 text-sm leading-relaxed">
        {/* Document Header Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-3 shadow-xl backdrop-blur-md">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Cybersecurity – B4B Solutions – B4B Network
          </h2>
          <p className="text-base font-bold text-[#FFC911] font-heading">
            Proactive Cybersecurity to Protect Sensitive Data and Maintain Operational Continuity
          </p>
          <p className="text-xs font-mono uppercase tracking-wider text-sky-200">
            The Connection for Small Business Solutions
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <p>
            Cyber threats have become more advanced, frequent, and damaging. Businesses that treat cybersecurity as an afterthought risk financial losses, downtime, and reputational harm. A proactive approach to cybersecurity is essential to protect sensitive data and maintain operational continuity.
          </p>
          <p>
            A layered approach to cybersecurity helps organizations protect their assets by implementing multiple security measures, ensuring that if one layer fails, others remain intact. This strategy not only enhances security but also promotes compliance and resilience against evolving cyber threats.
          </p>
          <p>
            Cybersecurity companies play a crucial role in safeguarding digital environments. Their primary objective is to protect systems, networks, and data from unauthorized access, theft, or damage. Having a solid cybersecurity plan in place implements security measures to defend against cyber threats and continuously monitor systems for potential vulnerabilities and attacks.
          </p>
          <p>
            Cybersecurity Advisors develop strategies by creating a structured Incident Response Plan (IRP) that outlines roles, responsibilities, and communication protocols, ensuring a coordinated response to security incidents. It also emphasizes the importance of training and simulations to prepare teams for effective incident management.
          </p>
          <p>
            Key technologies used by cybersecurity companies to protect data include encryption tools, firewalls, antivirus software, and network security monitoring tools. These technologies help secure sensitive information from unauthorized access and cyber threats.
          </p>
        </div>

        {/* 10 Types of Cybersecurity Services */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F356B]/90 via-[#0C2A54]/90 to-[#081F42]/95 border border-sky-300/40 space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-white font-heading">
            10 Types of Cybersecurity Services Every Business Needs
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-white block">1. Application Security</strong>
              <p className="text-xs mt-1">Application security (AppSec) refers to the processes, practices, and tools used to protect software applications from vulnerabilities and cyber threats throughout their entire development lifecycle. This includes the phases of design, development, deployment, and maintenance. This protection is crucial for maintaining data integrity, operational continuity, and user trust.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-white block">2. Cloud Security Services</strong>
              <p className="text-xs mt-1">Cloud security services are designed to protect data, applications, and infrastructure in cloud environments from cyber threats and unauthorized access. Effective cloud security addresses unique challenges such as managing disparate systems and maintaining data integrity. Cloud security is crucial for businesses adopting multi-cloud and hybrid strategies ensuring compliance and safeguarding sensitive information.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-white block">3. Data Security and Encryption Services</strong>
              <p className="text-xs mt-1">Data security is crucial for protecting sensitive information from unauthorized access, loss, or misuse throughout its lifecycle. This converts data into unreadable formats using encryption algorithms, ensuring that unauthorized users cannot access it. It plays a vital role in maintaining customer trust, ensuring compliance with regulations, and supporting overall business resilience.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-white block">4. Email Security Services</strong>
              <p className="text-xs mt-1">Phishing emails are the most common initial attack vector for cyber threats. These threats produce malware to compromise email accounts. They are designed to deceive recipients by revealing sensitive information by impersonating trusted individuals or organizations. Email Security services aim to safeguard sensitive information and to deliver secure communication.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-white block">5. Endpoint Security</strong>
              <p className="text-xs mt-1">Endpoint security is a cybersecurity approach designed to protect devices, or endpoints, that connect to a network, such as laptops, tablets, and mobile devices, from malicious activities and threats. It involves using solutions like endpoint protection platforms (EPP) to detect and prevent security threats.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-white block">6. Identity and Access Management (IAM)</strong>
              <p className="text-xs mt-1">Identity and Access Management (IAM) is a crucial framework that helps organizations control who can access their systems and data. It ensures that only authorized users have the right access, which is vital in preventing breaches caused by stolen or misused credentials.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-white block">7. Incident Response and Recovery Services</strong>
              <p className="text-xs mt-1">Incident response and recovery services are essential for organizations facing cybersecurity incidents, such as data breaches or cyberattacks. This involves a structured approach to identify, analyze, and respond to security incidents effectively to restore normal operations while minimizing damage.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-white block">8. Managed Security Services (MSS)</strong>
              <p className="text-xs mt-1">Managed Security Services (MSS) offer 24/7 monitoring, detection, and response, allowing companies to outsource their security operations instead of maintaining a full in-house Security Operations Center (SOC). This approach provides access to expert resources and can be more cost-effective for many organizations.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-white block">9. Network Security Services</strong>
              <p className="text-xs mt-1">Network security is crucial for protecting your IT system. It prevents unauthorized access to sensitive data and systems, ensuring that only authorized users can interact with critical information. This protection is vital for maintaining the integrity, confidentiality, and availability of your network.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#081F42]/80 border border-sky-300/30">
              <strong className="text-white block">10. Threat Intelligence Services</strong>
              <p className="text-xs mt-1">Threat intelligence services are essential for organizations aiming to enhance their cybersecurity to navigate the complex landscape of cyber threats. This proactive approach allows organizations to identify, analyze, and mitigate risks before they escalate.</p>
            </div>
          </div>
        </div>
      </div>
    </ServicePageLayout>
  )
}

export default CyberSecurityPage
