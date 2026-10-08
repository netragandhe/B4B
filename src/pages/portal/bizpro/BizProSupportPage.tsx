import React from 'react'
import { HelpCircle, Mail, Phone, MessageSquare } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'

export const BizProSupportPage: React.FC = () => {
  const { toast } = useToast()

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Support & Executive Help Desk"
        description="Dedicated priority underwriting assistance and technical portal support."
        breadcrumbs={[
          { label: 'Portal', href: '/portal/dashboard' },
          { label: 'Support', icon: <HelpCircle className="w-3.5 h-3.5 text-blue-500" /> },
        ]}
        badge={
          <Badge variant="emerald" size="md">
            Priority VIP Support
          </Badge>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="bento" className="p-5 text-center space-y-3">
          <Mail className="w-8 h-8 text-blue-500 mx-auto" />
          <h4 className="font-bold text-xs">Underwriting Desk</h4>
          <p className="text-[11px] text-slate-500">underwriting@b4bcapital.com</p>
          <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => toast({ title: 'Email Desk', type: 'info' })}>
            Send Email
          </Button>
        </Card>

        <Card variant="bento" className="p-5 text-center space-y-3">
          <Phone className="w-8 h-8 text-emerald-500 mx-auto" />
          <h4 className="font-bold text-xs">Hotline (EST)</h4>
          <p className="text-[11px] text-slate-500">+1 (800) 555-0199</p>
          <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => toast({ title: 'Dialing Hotline', type: 'info' })}>
            Call Support
          </Button>
        </Card>

        <Card variant="bento" className="p-5 text-center space-y-3">
          <MessageSquare className="w-8 h-8 text-amber-500 mx-auto" />
          <h4 className="font-bold text-xs">Live Support Chat</h4>
          <p className="text-[11px] text-slate-500">Available Mon-Fri 8am-8pm</p>
          <Button size="sm" variant="accent" className="w-full text-xs" onClick={() => toast({ title: 'Live Chat Initialized', type: 'info' })}>
            Start Chat
          </Button>
        </Card>
      </div>
    </div>
  )
}
