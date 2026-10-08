import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home, Layers, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SEOHead } from '@/components/seo/SEOHead'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 text-center">
      <SEOHead title="Page Not Found" description="The requested page could not be located." />

      <Card variant="bento" className="p-8 sm:p-12 max-w-lg w-full space-y-6 border-slate-200 dark:border-[#1E3A5F]">
        <div className="space-y-2">
          <Badge variant="danger" size="md">
            404 Error
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black font-heading text-slate-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
            The small business resource or terminal page you are looking for has been moved or does not exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button variant="primary" size="md" pill leftIcon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
          <Link to="/solutions">
            <Button variant="outline" size="md" pill leftIcon={<Layers className="w-4 h-4" />}>
              Browse 16 Solutions
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
