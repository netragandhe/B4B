const fs = require('fs');
const p = 'd:/Kiaan Project/b4b2/frontend/src/pages/portal/admin/AdminOverviewPage.tsx';
let c = fs.readFileSync(p, 'utf8');

const oldHandler = `  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault()
    setInviteModalOpen(false)
    toast({
      title: 'Invitation Dispatched',
      description: \`Official onboarding invitation sent to \${inviteForm.email} for \${inviteForm.region}.\`,
      type: 'success',
    })
    setInviteForm({
      name: '',
      email: '',
      phone: '',
      region: 'District 7 - Chicago',
      initialRank: '1',
    })
  }`;

const newHandler = `  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await apiRequest('/admin/invite-coach', {
        method: 'POST',
        body: JSON.stringify(inviteForm),
      })
      if (res.success) {
        toast({
          title: 'Invitation Dispatched',
          description: res.message || \`Official onboarding invitation sent to \${inviteForm.email} for \${inviteForm.region}.\`,
          type: 'success',
        })
        setInviteModalOpen(false)
        setInviteForm({
          name: '',
          email: '',
          phone: '',
          region: 'District 7 - Chicago',
          initialRank: '1',
        })
      } else {
        toast({
          title: 'Invitation Failed',
          description: res.error || 'Failed to dispatch coach invitation.',
          type: 'error',
        })
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err?.message || 'Server connection error.',
        type: 'error',
      })
    }
  }`;

const oldCRLF = oldHandler.replace(/\n/g, '\r\n');
const newCRLF = newHandler.replace(/\n/g, '\r\n');

if (c.includes(oldCRLF)) {
  c = c.replace(oldCRLF, newCRLF);
  fs.writeFileSync(p, c, 'utf8');
  console.log('REPLACED CRLF');
} else if (c.includes(oldHandler)) {
  c = c.replace(oldHandler, newHandler);
  fs.writeFileSync(p, c, 'utf8');
  console.log('REPLACED LF');
} else {
  console.log('NOT FOUND');
}

