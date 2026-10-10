import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Layers, ArrowLeft, LayoutDashboard, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SEOHead } from '@/components/seo/SEOHead'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 sm:p-6 text-center">
      <SEOHead title="404 Page Not Found | B4B America" description="The requested page could not be located." />

      <Card
        variant="default"
        className="p-8 sm:p-12 max-w-lg w-full space-y-6 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F] shadow-xl rounded-2xl"
      >
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-wider border border-blue-200 dark:border-blue-800/60">
            <span>404 Error • Resource Unavailable</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black font-heading text-slate-900 dark:text-white">
            Page Not Found
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
            The small business terminal page, directory tool, or portal resource you are looking for has been moved or does not exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/portal/dashboard" className="w-full sm:w-auto">
            <Button variant="accent" size="md" pill leftIcon={<LayoutDashboard className="w-4 h-4" />} className="w-full sm:w-auto">
              Go to Portal
            </Button>
          </Link>
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="outline" size="md" pill leftIcon={<Home className="w-4 h-4" />} className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
          <Link to="/solutions" className="w-full sm:w-auto">
            <Button variant="ghost" size="md" pill leftIcon={<Layers className="w-4 h-4" />} className="w-full sm:w-auto">
              16 Solutions
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

