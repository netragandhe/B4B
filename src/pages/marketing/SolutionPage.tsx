import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  CreditCard,
  LayoutGrid,
  Palette,
  ShieldCheck,
  FileSpreadsheet,
  Landmark,
  Target,
  GraduationCap,
  ShieldAlert,
  Briefcase,
  Shield,
  Server,
  Megaphone,
  Handshake,
  BookOpen,
  Globe,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  DollarSign,
  HelpCircle,
  TrendingUp,
  Cpu,
  Smartphone,
  Percent,
  Zap,
  Boxes,
  Users,
  FileCheck,
  BarChart3,
  MessageSquareQuote,
  Layers,
  FileText,
  Truck,
  Calculator,
  Award,
  Search,
  Sliders,
  Building2,
  CheckCircle,
  MousePointerClick,
  MessageSquare,
  HeartHandshake,
  Star,
  Database,
  MailWarning,
  FileCheck2,
  Bell,
  Network,
  UserCheck,
  HeartPulse,
  Headphones,
  Phone,
  Wifi,
  Cloud,
  Video,
  MailCheck,
  RefreshCw,
  BarChart,
  Share2,
  CheckSquare,
  Scale,
  BarChart2,
  CalendarCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Accordion } from '@/components/ui/Accordion'
import { CoachLeadForm } from '@/components/forms/CoachRequestModal'
import { SEOHead } from '@/components/seo/SEOHead'
import { SOLUTIONS_DATA, type SolutionItem } from '@/mock-data/solutions'

export const SolutionPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()

  const solution = SOLUTIONS_DATA.find((s) => s.slug === slug)

  if (!solution) {
    return <Navigate to="/solutions" replace />
  }

  // Icon map
  const iconMap: Record<string, React.ElementType> = {
    CreditCard, LayoutGrid, Palette, ShieldCheck, FileSpreadsheet, Landmark,
    Target, GraduationCap, ShieldAlert, Briefcase, Shield, Server, Megaphone,
    Handshake, BookOpen, Globe, Smartphone, Percent, Zap, Boxes, Users,
    FileCheck, BarChart3, Sparkles, MessageSquareQuote, Layers, FileText,
    TrendingUp, Truck, DollarSign, Calculator, Award, Search, Sliders,
    Building2, CheckCircle, MousePointerClick, MessageSquare, PhoneCall,
    HeartHandshake, Star, Cpu, Database, MailWarning, FileCheck2, Bell,
    Network, UserCheck, HeartPulse, Headphones, Phone, Wifi, Cloud, Video,
    MailCheck, RefreshCw, BarChart, Share2, CheckSquare, Scale, BarChart2,
    CalendarCheck,
  }

  const MainIcon = iconMap[solution.iconName] || Briefcase

  const relatedSolutions = SOLUTIONS_DATA.filter((s) =>
    solution.relatedSlugs.includes(s.slug)
  )

  const faqItems = solution.faqs.map((f, i) => ({
    id: `faq-${i}`,
    title: f.question,
    content: f.answer,
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 text-left">
      <SEOHead
        title={solution.title}
        description={solution.shortDesc}
        keywords={`${solution.title}, small business ${solution.category.toLowerCase()}, OAL Network, business coaching`}
      />

      {/* Top Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Solutions', href: '/solutions' },
          { label: solution.title },
        ]}
      />

      {/* Hero Section */}
      <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white via-white to-blue-50/50 dark:from-[#0D1E36] dark:via-[#0D1E36] dark:to-[#12294A] border border-slate-200 dark:border-[#1E3A5F] shadow-xl overflow-hidden">
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary" size="md">
              {solution.category}
            </Badge>
            <Badge variant="emerald" size="md">
              {solution.badge}
            </Badge>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/25 shrink-0">
              <MainIcon className="w-6 h-6" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              {solution.heroHeadline}
            </h1>
          </div>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {solution.heroSub}
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-[#1E3A5F]/70">
            {solution.benefits.map((b) => (
              <div key={b.label}>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-blue-600 dark:text-blue-400">
                  {b.metric}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two-Column Layout: Left Content & Right Sticky Coach Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Main Content */}
        <div className="lg:col-span-7 space-y-12">
          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              Overview & Strategic Value
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {solution.overview}
            </p>
          </div>

          {/* Special Pricing Note (specifically for Business Plans & others) */}
          {solution.pricingNote && (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500/30 flex items-start gap-3.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold font-heading text-emerald-900 dark:text-emerald-300">
                  Pricing & Deliverable Structure
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed">
                  {solution.pricingNote}
                </p>
              </div>
            </div>
          )}

          {/* Core Features List with Icons */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              What Is Included in {solution.title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {solution.features.map((feat) => {
                const FeatIcon = iconMap[feat.iconName] || CheckCircle2
                return (
                  <Card key={feat.title} variant="default" className="p-5 space-y-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <FeatIcon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {feat.description}
                    </p>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Accordion / FAQ Section */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-500">
                Common questions about implementation, costs, and timeline.
              </p>
            </div>

            <Accordion items={faqItems} />
          </div>
        </div>

        {/* Right Sticky Sidebar: "Speak with a Business Coach" */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <Card variant="bento" className="p-6 sm:p-7 border-blue-200 dark:border-[#1E3A5F] shadow-xl space-y-4">
            <div className="space-y-1.5 pb-3 border-b border-slate-100 dark:border-[#1E3A5F]">
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dedicated Advisory</span>
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                Speak with a Coach About {solution.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Receive an immediate customized assessment for your business. No pressure, no obligations.
              </p>
            </div>

            <CoachLeadForm
              initialNote={`Interested in ${solution.title}. Please review our eligibility.`}
              isInline
            />
          </Card>
        </div>
      </div>

      {/* Related Solutions Grid */}
      {relatedSolutions.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-slate-200 dark:border-[#1E3A5F]">
          <div>
            <Badge variant="navy" size="md">
              Complementary Solutions
            </Badge>
            <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mt-1">
              Solutions Often Paired with {solution.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedSolutions.map((rel) => {
              const RelIcon = iconMap[rel.iconName] || Briefcase
              return (
                <Link
                  key={rel.id}
                  to={`/solutions/${rel.slug}`}
                  className="group block focus:outline-none"
                >
                  <Card variant="default" hover className="p-5 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                        <RelIcon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white group-hover:text-blue-600">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {rel.shortDesc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between text-xs font-semibold text-blue-600">
                      <span>View details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
