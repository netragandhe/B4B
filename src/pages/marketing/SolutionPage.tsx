import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import {
  AcceptPaymentsPage,
  BusinessSolutionsPage,
  BusinessBrandingPage,
  CreditRepairPage,
  BusinessPlansPage,
  BusinessLoansPage,
  LeadGenerationPage,
  CustomerServiceAcademyPage,
  CyberSecurityPage,
  FindJobsPage,
  InsurancePage,
  ItSolutionsPage,
  MarketingSolutionsPage,
  AffiliatesPartnersPage,
  BookkeepingPage,
  WebsiteDesignPage,
} from './solutions'

const SLUG_COMPONENT_MAP: Record<string, React.FC> = {
  // Official 16 slugs
  'accept-payments': AcceptPaymentsPage,
  'business-solutions': BusinessSolutionsPage,
  'business-branding': BusinessBrandingPage,
  'credit-repair': CreditRepairPage,
  'business-plans': BusinessPlansPage,
  'business-loans': BusinessLoansPage,
  'lead-generation': LeadGenerationPage,
  'customer-service-academy': CustomerServiceAcademyPage,
  'cyber-security': CyberSecurityPage,
  'find-jobs': FindJobsPage,
  'insurance': InsurancePage,
  'it-solutions': ItSolutionsPage,
  'marketing-solutions': MarketingSolutionsPage,
  'affiliates-partners': AffiliatesPartnersPage,
  'bookkeeping': BookkeepingPage,
  'website-design': WebsiteDesignPage,

  // Backward compatibility alias bridges
  'biz-management': BusinessSolutionsPage,
  'brand-your-business': BusinessBrandingPage,
  'build-business-credit': CreditRepairPage,
  'business-plan-writing': BusinessPlansPage,
  'business-funding': BusinessLoansPage,
  'b4b-jobs': FindJobsPage,
  'marketing': MarketingSolutionsPage,
  'tax-prep': BookkeepingPage,
  'web-design': WebsiteDesignPage,
}

export const SolutionPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()

  if (!slug) {
    return <Navigate to="/solutions" replace />
  }

  const MatchedComponent = SLUG_COMPONENT_MAP[slug]

  if (!MatchedComponent) {
    return <Navigate to="/solutions" replace />
  }

  return <MatchedComponent />
}

export default SolutionPage
