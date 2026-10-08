import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Globe,
  MapPin,
  Users,
  Plus,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  Building2,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useAuth, RANK_TITLES } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'

export const BizProTerritoryAssignmentPage: React.FC = () => {
  const { user, setRank } = useAuth()
  const { toast } = useToast()

  const currentRank = user?.rank || 4
  const isLeadershipUnlocked = currentRank >= 4

  const [assignments, setAssignments] = useState([
    { id: 't-1', county: 'New York County (Manhattan)', advisor: 'David Vance (Rank 2)', status: 'Assigned', leads: 42 },
    { id: 't-2', county: 'Kings & Queens County, NY', advisor: 'Jessica Thorne (Rank 1)', status: 'Assigned', leads: 28 },
    { id: 't-3', county: 'Bergen & Hudson County, NJ', advisor: 'Chloe Morrison (Rank 3)', status: 'Assigned', leads: 35 },
    { id: 't-4', county: 'Essex & Union County, NJ', advisor: 'Brian Patel (Rank 2)', status: 'Assigned', leads: 19 },
    { id: 't-5', county: 'Fairfield County, CT', advisor: 'Samuel Zhang (Rank 1)', status: 'Assigned', leads: 22 },
    { id: 't-6', county: 'Philadelphia County, PA', advisor: 'Ashley Cruz (Rank 2)', status: 'Assigned', leads: 31 },
    { id: 't-7', county: 'Westchester County, NY', advisor: 'Unassigned (Open Territory)', status: 'Available', leads: 14 },
  ])

  if (!isLeadershipUnlocked) {
    return (
      <div className="space-y-6">
        <Helmet>
          <title>Territory Assignment (Locked) | Biz Pro Terminal</title>
        </Helmet>

        <Card className="p-8 text-center bg-white dark:bg-[#0D1E36] border-2 border-dashed border-amber-300 dark:border-amber-800/80 max-w-2xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <Badge variant="gold" size="md">
              Rank 4+ Leadership Gate
            </Badge>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-2">
              Territory Assignment Unlocked at Rank 4
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
              Delegating county and zip code assignments to junior advisors requires Rank 4 (Regional Director) status.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/bizpro/rank">
              <Button variant="outline" size="sm">
                View Rank Roadmap
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setRank(4)
                toast({
                  title: 'Dev Preview: Upgraded to Rank 4',
                  description: 'Regional Director activated — Territory Assignment is now live!',
                  type: 'success',
                })
              }}
            >
              <Sliders className="w-4 h-4 mr-1.5" />
              Preview Rank 4 (Instant Unlock)
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const handleAssignOpen = (id: string) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, advisor: 'Robert Lang (Rank 1)', status: 'Assigned' } : a))
    )
    toast({
      title: 'Territory Assigned Successfully',
      description: 'Dispatched Westchester County to Robert Lang (Rank 1).',
      type: 'success',
    })
  }

  return (
    <>
      <Helmet>
        <title>Territory Assignment & Dispatch | Biz Pro Terminal</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Territory Assignment & Dispatch
              </h1>
              <Badge variant="emerald" size="sm">
                Leadership Control
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Dispatch geographical counties and municipal B2B inbound leads across your sponsored downline team.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              toast({
                title: 'Add County Territory',
                description: 'County allocation modal opened.',
                type: 'info',
              })
            }
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Sub-Territory
          </Button>
        </div>

        {/* Territory Table */}
        <Card className="bg-white dark:bg-[#0D1E36] border border-slate-200 dark:border-[#1E3A5F]">
          <div className="p-4 border-b border-slate-100 dark:border-[#1E3A5F] flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Assigned Regional Coverage Zones
            </h3>
            <Badge variant="primary" size="sm">
              7 Zones Managed
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-[#1E3A5F] text-slate-400 uppercase text-[10px] font-semibold bg-slate-50/50 dark:bg-[#12294A]/40">
                  <th className="p-3.5">Zone & County</th>
                  <th className="p-3.5">Assigned Downline Advisor</th>
                  <th className="p-3.5">Active Inbound Leads</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1E3A5F]/60">
                {assignments.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-[#12294A] transition-colors">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                        <span>{item.county}</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`font-semibold ${
                          item.status === 'Available'
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {item.advisor}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-700 dark:text-slate-300">
                      {item.leads} Inbounds
                    </td>
                    <td className="p-3.5">
                      <Badge variant={item.status === 'Assigned' ? 'emerald' : 'gold'} size="sm" dot>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-right">
                      {item.status === 'Available' ? (
                        <Button variant="primary" size="sm" onClick={() => handleAssignOpen(item.id)}>
                          Assign Advisor
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            toast({
                              title: `Reassigning ${item.county}`,
                              description: 'Select replacement advisor from downline roster.',
                              type: 'info',
                            })
                          }
                        >
                          Reassign
                        </Button>
                      )}
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
