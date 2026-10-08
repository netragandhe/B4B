import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
  Search,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SEOHead } from '@/components/seo/SEOHead'
import { SOLUTIONS_DATA } from '@/mock-data/solutions'

export const SolutionsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const iconMap: Record<string, React.ElementType> = {
    CreditCard, LayoutGrid, Palette, ShieldCheck, FileSpreadsheet, Landmark,
    Target, GraduationCap, ShieldAlert, Briefcase, Shield, Server, Megaphone,
    Handshake, BookOpen, Globe,
  }

  const categories = [
    'All',
    'Capital & Finance',
    'Operations & Strategy',
    'Growth & Marketing',
    'Tech & Security',
  ]

  const filteredSolutions = SOLUTIONS_DATA.filter((sol) => {
    if (selectedCategory !== 'All' && sol.category !== selectedCategory) return false
    if (
      searchQuery &&
      !sol.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !sol.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      <SEOHead
        title="16 Core Small Business Solutions"
        description="Explore OAL Network's 16 core solutions: business loans, building business credit, SBA plans, payment processing, web design, marketing, and fractional CFO advisory."
      />

      {/* Header */}
      <div className="space-y-4">
        <Breadcrumb items={[{ label: 'Solutions' }]} />
        <Badge variant="primary" size="md">
          The 16 Solutions Directory
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
          Every Essential Solution for Independent Small Businesses
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-3xl text-sm sm:text-base leading-relaxed">
          Select any solution below to explore in-depth features, transparent pricing models, FAQs, and connect directly with a dedicated industry coach.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#12294A] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#1C3A65]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="Search solutions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          />
        </div>
      </div>

      {/* 16 Solutions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredSolutions.map((sol) => {
          const IconComponent = iconMap[sol.iconName] || Briefcase
          return (
            <Link
              key={sol.id}
              to={`/solutions/${sol.slug}`}
              className="group block h-full text-left focus:outline-none"
            >
              <Card
                variant="default"
                hover
                className="p-5 h-full flex flex-col justify-between group-hover:border-blue-500 group-hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <Badge variant="outline" size="sm" className="text-[10px]">
                      {sol.badge}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                    {sol.shortDesc}
                  </p>

                  {sol.pricingNote && (
                    <div className="mt-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      Starts around $2,500
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Explore Solution</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          )
        })}
      </div>

      {filteredSolutions.length === 0 && (
        <div className="p-12 text-center text-slate-400 text-sm">
          No solutions found matching "{searchQuery}" in category "{selectedCategory}".
        </div>
      )}
    </div>
  )
}
