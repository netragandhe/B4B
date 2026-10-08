import React from 'react'
import { Helmet } from 'react-helmet-async'
import {
  MapPin,
  ShieldCheck,
  Building2,
  Users,
  TrendingUp,
  Globe,
  Award,
  Layers,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'

export const BizProTerritoryPage: React.FC = () => {
  const { user } = useAuth()
  const { toast } = useToast()

  const counties = [
    { name: 'New York Metro (Manhattan, Brooklyn, Queens)', businesses: '184,000', advisor: 'David Vance (Rank 2)', status: 'Active Coverage' },
    { name: 'Northern New Jersey (Bergen, Essex, Hudson)', businesses: '96,000', advisor: 'Chloe Morrison (Rank 3)', status: 'Active Coverage' },
    { name: 'Fairfield County & Southern CT', businesses: '48,000', advisor: 'Samuel Zhang (Rank 1)', status: 'Active Coverage' },
    { name: 'Philadelphia Metro & Eastern PA', businesses: '112,000', advisor: 'Ashley Cruz (Rank 2)', status: 'Active Coverage' },
    { name: 'Long Island & Westchester, NY', businesses: '62,000', advisor: 'Jessica Thorne (Rank 1)', status: 'Active Coverage' },
  ]

  return (
    <>
      <Helmet>
        <title>My Territory & Regional Rights | Biz Pro Terminal</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                My Territory Rights & Mapping
              </h1>
              <Badge variant="emerald" size="sm">
                Exclusivity Granted
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Designated geographical domain: {user?.region || 'Northeast Region (NY, NJ, CT, PA)'}.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                title: 'Territory Certificate',
                description: 'Regional exclusivity legal instrument downloaded.',
                type: 'success',
              })
            }
          >
            <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-500" />
            Exclusivity Agreement
          </Button>
        </div>

        {/* Territory Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <span className="text-xs text-slate-500 dark:text-slate-400">Total Commercial Entities</span>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              502,000 B2B
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">Qualified borrowing base</p>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <span className="text-xs text-slate-500 dark:text-slate-400">Total Regional Population</span>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              28.4 Million
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Major tri-state economic hub</p>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <span className="text-xs text-slate-500 dark:text-slate-400">Active Advisors Deployed</span>
            <div className="mt-2 text-2xl font-extrabold text-blue-600 dark:text-blue-400">
              8 Advisors
            </div>
            <p className="text-[11px] text-slate-400 mt-1">5 Direct + 3 Secondary Pods</p>
          </Card>

          <Card className="p-4 bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
            <span className="text-xs text-slate-500 dark:text-slate-400">Monthly Debt Demand</span>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              $42.0M Est.
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">SBA, lines & equipment</p>
          </Card>
        </div>

        {/* Territory Allocation Breakdown Table */}
        <Card className="bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
          <div className="p-4 border-b border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Sub-Territory County Allocations
            </h3>
            <Badge variant="primary" size="sm">
              5 Operating Zones
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-[#1E3A5F] text-slate-400 uppercase text-[10px] font-semibold bg-slate-50/50 dark:bg-[#12294A]/40">
                  <th className="p-3.5">Zone & County</th>
                  <th className="p-3.5">Commercial Businesses</th>
                  <th className="p-3.5">Assigned Lead Advisor</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1E3A5F]/60">
                {counties.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-[#12294A] transition-colors">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                        <span>{c.name}</span>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-slate-700 dark:text-slate-300">
                      {c.businesses}
                    </td>
                    <td className="p-3.5 font-semibold text-blue-600 dark:text-blue-400">
                      {c.advisor}
                    </td>
                    <td className="p-3.5">
                      <Badge variant="emerald" size="sm" dot>
                        {c.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  )
}
