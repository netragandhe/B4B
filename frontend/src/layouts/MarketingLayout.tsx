import React, { useState } from 'react'
import { Navbar } from '@/components/website/Navbar'
import { Footer } from '@/components/website/Footer'
import { CoachRequestModal } from '@/components/forms/CoachRequestModal'

export const MarketingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coachModalOpen, setCoachModalOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-[#07142B] text-white transition-colors duration-200 overflow-x-hidden font-body">
      {/* Unified Corporate Navbar: Dark Variant with White Logo Badge */}
      <Navbar variant="dark" onOpenCoachModal={() => setCoachModalOpen(true)} />

      {/* Main Page Body in Signature Midnight Navy Theme */}
      <main className="flex-1 w-full bg-[#07142B] text-white">
        {children}
      </main>

      {/* Unified Corporate Footer */}
      <Footer />

      {/* Global Coach Modal Trigger */}
      <CoachRequestModal
        isOpen={coachModalOpen}
        onClose={() => setCoachModalOpen(false)}
      />
    </div>
  )
}
