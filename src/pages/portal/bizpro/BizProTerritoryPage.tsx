import React from 'react'
import { MapPin, Building2, Users } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const BizProTerritoryPage: React.FC = () => {
  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="My Assigned Territory"
        description="Region assignment and market coverage for your sales territory."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'My Territory', icon: <MapPin className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="emerald" size="md">
            Midwest Region (Primary)
          </Badge>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card variant="bento" className="p-5 space-y-2">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Primary Territory: Midwest Hub</h4>
          <p className="text-xs text-slate-500">Includes Illinois, Indiana, Ohio freight & logistics corridor.</p>
          <div className="pt-2 text-xs font-bold text-emerald-600">Active Accounts: 14 Companies</div>
        </Card>

        <Card variant="bento" className="p-5 space-y-2">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Secondary Territory: Great Lakes</h4>
          <p className="text-xs text-slate-500">Includes Michigan manufacturing & industrial accounts.</p>
          <div className="pt-2 text-xs font-bold text-blue-600">Active Accounts: 6 Companies</div>
        </Card>
      </div>
    </div>
  )
}
