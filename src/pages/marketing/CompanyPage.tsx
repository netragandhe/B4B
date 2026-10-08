import React from 'react'
import { Link } from 'react-router-dom'
import {
  Compass,
  Award,
  Users,
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowRight,
  Target,
  Heart,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { brandConfig } from '@/config/brand'

export const CompanyPage: React.FC = () => {
  const leadership = [
    {
      name: 'Victoria Hastings, CPA/CFA',
      role: 'Co-Founder & Chief Advisory Officer',
      bio: '22 years corporate finance & fractional CFO leadership. Ex-Goldman Sachs, guided over $400M in debt syndications.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Derrick Vance',
      role: 'Head of Debt Syndication & Credit',
      bio: 'Former senior credit officer at KeyBank Commercial. Architect of OAL’s non-dilutive credit underwriting model.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Elena Rostova',
      role: 'Partner, Operations & M&A Strategy',
      bio: 'Private equity operating partner who has led 18 small-market corporate acquisitions and valuation turnarounds.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 text-left">
      <SEOHead
        title="About OAL Network — Vision & Mission"
        description="The story and vision behind OAL Network. The Little Engine That Could, Made All The Small Businesses In America Thrive."
      />

      {/* Header */}
      <div className="space-y-4">
        <Breadcrumb items={[{ label: 'Company' }]} />
        <Badge variant="primary" size="md">
          About {brandConfig.brandName}
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
          The Connection for Small Business Solutions
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-3xl text-sm sm:text-base leading-relaxed">
          We built {brandConfig.brandName} because independent businesses deserve the same sophisticated financing, technology, and strategic advisory that Wall Street enterprises take for granted.
        </p>
      </div>

      {/* Vision & Values Spotlight Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card variant="bento" className="p-8 space-y-4 border-blue-200 dark:border-[#1E3A5F]">
          <Badge variant="primary" size="sm">
            Our Vision
          </Badge>
          <h3 className="text-2xl font-black font-heading text-slate-900 dark:text-white">
            "The Little Engine That Could, Made All The Small Businesses In America Thrive."
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Main Street founders are the true backbone of the American economy. When banks turn them away or offer predatory loans, we step in as the reliable engine that provides capital, builds business credit, and coaches owners to lasting independence.
          </p>
        </Card>

        <Card variant="bento" className="p-8 space-y-4 border-amber-200 dark:border-[#1E3A5F]">
          <Badge variant="gold" size="sm">
            Our Core Mantra
          </Badge>
          <h3 className="text-2xl font-black font-heading text-slate-900 dark:text-white">
            "Dreamers, Wake Up, Write A Plan, Design It, Be Ambitious NOW Execute!"
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Ideas without execution remain dreams. We help entrepreneurs put pen to paper, engineer 5-year financial models, build an institutional visual identity, and execute fearlessly.
          </p>
        </Card>
      </div>

      {/* Leadership Bench */}
      <div className="space-y-8">
        <div>
          <Badge variant="emerald" size="md">
            Leadership & Advisory
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white mt-2">
            The Partners Guiding Our Fiduciary Mission
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Over six decades of combined corporate finance, debt syndication, and small business operations experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadership.map((l) => (
            <Card key={l.name} variant="default" className="p-6 text-center flex flex-col items-center justify-between">
              <div>
                <img
                  src={l.avatar}
                  alt={l.name}
                  className="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-blue-500/20 mb-4 mx-auto"
                />
                <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  {l.name}
                </h4>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                  {l.role}
                </p>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  {l.bio}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-[#1E3A5F] w-full">
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Fiduciary Advisor
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900 to-[#0A1628] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold font-heading">Ready to Work with an OAL Business Coach?</h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Book a complimentary 30-minute discovery call to review your financing, operations, or credit profile.
          </p>
        </div>
        <Link to="/contact">
          <Button variant="accent" size="lg" pill rightIcon={<ArrowRight className="w-4 h-4" />}>
            Connect with a Coach
          </Button>
        </Link>
      </div>
    </div>
  )
}
