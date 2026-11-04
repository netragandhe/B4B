import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { KeyRound, ArrowLeft } from 'lucide-react'
import { BrandLogo } from '@/config/brand'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SEOHead } from '@/components/seo/SEOHead'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'

export const OtpVerificationPage: React.FC = () => {
  const navigate = useNavigate()
  const { verifyOtp } = useAuth()
  const { toast } = useToast()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const newOtp = [...otp]
    newOtp[index] = val.slice(-1)
    setOtp(newOtp)

    if (val && index < 5) {
      const nextInput = document.getElementById(`standalone-otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    const fullCode = otp.join('')
    if (fullCode === '123456') {
      toast({ title: 'OTP Verified', type: 'success' })
      navigate('/portal/dashboard')
    } else {
      toast({ title: 'Invalid OTP Code', description: 'Demo code is 123456', type: 'error' })
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center px-6 py-12 text-left">
      <SEOHead title="Verify OTP | B4B Network" description="Enter 6-digit verification code." />

      <div className="max-w-md mx-auto w-full space-y-6">
        <Link to="/">
          <BrandLogo size="md" />
        </Link>

        <form onSubmit={handleVerify} className="p-8 rounded-2xl bg-slate-800 border border-slate-700 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-heading text-white">2-Step Verification</h1>
              <p className="text-xs text-slate-400">Demo Code: <span className="font-mono text-emerald-400 font-bold">123456</span></p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            {otp.map((d, i) => (
              <input
                key={i}
                id={`standalone-otp-${i}`}
                type="text"
                maxLength={1}
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                className="w-12 h-14 rounded-xl bg-slate-900 border border-slate-700 text-center font-mono font-bold text-xl text-white focus:outline-none focus:border-blue-400"
              />
            ))}
          </div>

          <Button type="submit" variant="accent" size="md" pill className="w-full font-bold bg-blue-600 hover:bg-blue-500 text-white">
            Verify Code
          </Button>
        </form>
      </div>
    </div>
  )
}
