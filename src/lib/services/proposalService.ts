/**
 * B4B AMERICA — EXECUTIVE COMMERCIAL PROPOSAL GENERATION SERVICE
 * 
 * Sourced directly from official client requirements:
 * - Generates high-end branded PDF proposals matching the $1M Technology aesthetic.
 * - Auto-indexes generated proposals into eBOX Vault for seamless continuity.
 * - Formatted for corporate clients, fractional CFO desks, and lending underwriters.
 */

import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { ServiceItem } from '@/mock-data/bizproData'
import { formatCurrency } from '@/lib/utils'
import { eboxService } from './eboxService'

export interface GenerateProposalInput {
  clientName?: string
  clientCompany?: string
  coachName?: string
  coachTitle?: string
  items: ServiceItem[]
}

export const generateCommercialProposalPdf = async (input: GenerateProposalInput): Promise<string> => {
  const doc = new jsPDF()

  const clientCompany = input.clientCompany || 'Apex Freight & Logistics LLC'
  const clientName = input.clientName || 'Marcus Vance (CEO)'
  const coachName = input.coachName || 'David Ross'
  const coachTitle = input.coachTitle || 'Senior Commercial Advisor & Fractional CFO'
  const dateStr = new Date().toISOString().split('T')[0]
  const proposalRef = `PROP-B4B-${Date.now().toString().slice(-6)}`
  const totalValue = input.items.reduce((acc, curr) => acc + curr.avgTicket, 0)

  // ==========================================
  // TOP ROYAL BLUE HEADER BANNER
  // ==========================================
  doc.setFillColor(1, 60, 160) // #013CA0 B4B Royal Blue
  doc.rect(0, 0, 210, 42, 'F')

  // GOLD ACCENT STRIP
  doc.setFillColor(255, 201, 17) // #FFC911 B4B Sunshine Gold
  doc.rect(0, 42, 210, 3.5, 'F')

  // LOGO & BANNER TEXT
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(255, 255, 255)
  doc.text('B4B AMERICA', 14, 22)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.setTextColor(220, 235, 255)
  doc.text('Commercial Capital • Fractional CFO Advisory • Strategic Growth', 14, 32)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(255, 201, 17)
  doc.text('OFFICIAL CLIENT PROPOSAL', 196, 24, { align: 'right' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(255, 255, 255)
  doc.text(`Ref: ${proposalRef}`, 196, 32, { align: 'right' })

  // ==========================================
  // PROPOSAL METADATA CARD
  // ==========================================
  doc.setFillColor(244, 247, 252) // #F4F7FC
  doc.setDrawColor(226, 232, 240)
  doc.roundedRect(14, 52, 182, 34, 2, 2, 'FD')

  // Left Column: Client Info
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(100, 116, 139)
  doc.text('PREPARED FOR:', 20, 60)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(7, 20, 43)
  doc.text(clientCompany, 20, 68)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(71, 85, 105)
  doc.text(`Attn: ${clientName}`, 20, 75)
  doc.text(`Federal Reserve District 6-F (Atlanta Regional Div)`, 20, 81)

  // Right Column: Coach & Date Info
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(100, 116, 139)
  doc.text('PREPARED BY:', 115, 60)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(7, 20, 43)
  doc.text(coachName, 115, 68)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(71, 85, 105)
  doc.text(coachTitle, 115, 75)
  doc.text(`Issue Date: ${dateStr} • Valid for 30 Days`, 115, 81)

  // ==========================================
  // EXECUTIVE SUMMARY PARAGRAPH
  // ==========================================
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(7, 20, 43)
  doc.text('1. EXECUTIVE SUMMARY & ENGAGEMENT SCOPE', 14, 96)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(71, 85, 105)
  const execSummary = `Based on underwriting assessment and corporate treasury reviews, B4B America proposes the structured implementation of the non-dilutive solutions detailed below. This turnkey engagement delivers working capital liquidity, institutional advisory governance, and proprietary operational accelerators without equity forfeiture or burdensome covenants.`
  doc.text(doc.splitTextToSize(execSummary, 182), 14, 103)

  // ==========================================
  // SOLUTIONS SCHEDULE TABLE
  // ==========================================
  autoTable(doc, {
    startY: 116,
    head: [['#', 'Solution Module', 'Category', 'Deployment Scope', 'Est. Facility / Value']],
    body: input.items.map((item, index) => [
      `0${index + 1}`,
      item.title,
      item.category.toUpperCase(),
      item.description.length > 70 ? item.description.slice(0, 68) + '...' : item.description,
      formatCurrency(item.avgTicket),
    ]),
    foot: [
      [
        '',
        'COMBINED COMMERCIAL PROPOSAL COMMITMENT',
        '',
        `${input.items.length} Solutions Scheduled`,
        formatCurrency(totalValue),
      ],
    ],
    theme: 'grid',
    headStyles: {
      fillColor: [1, 60, 160],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
    },
    footStyles: {
      fillColor: [7, 20, 43],
      textColor: [255, 201, 17],
      fontStyle: 'bold',
      fontSize: 9.5,
    },
    styles: {
      fontSize: 8.5,
      cellPadding: 4,
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { fontStyle: 'bold', cellWidth: 55 },
      2: { cellWidth: 28 },
      3: { cellWidth: 60 },
      4: { halign: 'right', fontStyle: 'bold', cellWidth: 29 },
    },
  })

  // ==========================================
  // TERMS & BINDING AUTHORIZATION BLOCK
  // ==========================================
  const tableY = (doc as any).lastAutoTable.finalY + 12

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(7, 20, 43)
  doc.text('2. UNDERWRITING COMMITMENT & AUTHORIZATION', 14, tableY)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(71, 85, 105)
  const termsText =
    'By executing below, both parties confirm intent to initiate due diligence, document verification, and facility onboarding under B4B America Master Underwriting Protocols. All capital disbursements remain subject to final verification and UCC-1 lien filings.'
  doc.text(doc.splitTextToSize(termsText, 182), 14, tableY + 6)

  // Signature lines
  const sigY = tableY + 28
  doc.setDrawColor(203, 213, 225)
  doc.line(14, sigY + 10, 90, sigY + 10)
  doc.line(116, sigY + 10, 196, sigY + 10)

  doc.setFontSize(8)
  doc.setTextColor(100, 116, 139)
  doc.text(`Authorized Client Representative: ${clientName}`, 14, sigY + 15)
  doc.text(`B4B Fiduciary Executive: ${coachName}`, 116, sigY + 15)

  // Bottom Security Footer
  doc.setFontSize(7.5)
  doc.setTextColor(148, 163, 184)
  doc.text(
    'B4B America Corporate Headquarters • 12 Federal Reserve Regional Coverage • Multi-Tenant Protected • Strictly Confidential',
    105,
    286,
    { align: 'center' }
  )

  const filename = `B4B_Proposal_${clientCompany.replace(/[^a-zA-Z0-9]/g, '_')}_${dateStr}.pdf`
  doc.save(filename)

  // Auto-index into eBOX Vault for seamless ecosystem continuity!
  try {
    await eboxService.addItem({
      title: filename,
      category: 'capital-docs',
      fileType: 'pdf',
      size: '3.4 MB',
      uploadedBy: `${coachName} (B4B Coach Desk)`,
      status: 'Verified',
      tags: ['Proposal', 'Commercial Financing', clientCompany],
      description: `Official generated commercial proposal for ${clientCompany} including ${input.items.length} structured solutions.`,
      securityLevel: 'Encrypted',
    })
  } catch (err) {
    console.error('Failed to auto-index proposal to eBOX:', err)
  }

  return filename
}
