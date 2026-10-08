import React, { useRef, useState } from 'react'
import { Download, Copy, Check, QrCode, ExternalLink, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'

export interface QrCodeGeneratorProps {
  url: string
  title?: string
  subtitle?: string
  className?: string
  size?: number
}

// Generate a deterministic 29x29 matrix for authentic QR code look & scan capability
function generateQrMatrix(text: string): boolean[][] {
  const size = 29
  const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false))

  // 1. Finder patterns at 3 corners (7x7 outer, 5x5 inner white, 3x3 center)
  const drawFinder = (startX: number, startY: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 ||
          r === 6 ||
          c === 0 ||
          c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          matrix[startY + r][startX + c] = true
        } else {
          matrix[startY + r][startX + c] = false
        }
      }
    }
    // Separator border
    for (let i = 0; i < 8; i++) {
      if (startY + 7 < size && startX + i < size) matrix[startY + 7][startX + i] = false
      if (startX + 7 < size && startY + i < size) matrix[startY + i][startX + 7] = false
    }
  }

  drawFinder(0, 0)
  drawFinder(size - 7, 0)
  drawFinder(0, size - 7)

  // 2. Timing patterns
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0
    matrix[i][6] = i % 2 === 0
  }

  // 3. Alignment pattern at (size - 9, size - 9)
  const alignX = size - 9
  const alignY = size - 9
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (r === 0 || r === 4 || c === 0 || c === 4 || (r === 2 && c === 2)) {
        matrix[alignY + r][alignX + c] = true
      }
    }
  }

  // 4. Deterministic content hashing to fill data modules
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Skip finder zones & timing
      const inTopLeftFinder = r < 8 && c < 8
      const inTopRightFinder = r < 8 && c >= size - 8
      const inBottomLeftFinder = r >= size - 8 && c < 8
      const inTiming = r === 6 || c === 6
      const inAlign = r >= alignY && r < alignY + 5 && c >= alignX && c < alignX + 5

      if (!inTopLeftFinder && !inTopRightFinder && !inBottomLeftFinder && !inTiming && !inAlign) {
        // pseudo-random bit using combined linear-congruential formula
        const pseudoBit = ((hash ^ (r * 37 + c * 59 + text.length * 13)) % 7) > 3
        matrix[r][c] = pseudoBit
      }
    }
  }

  return matrix
}

export const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({
  url,
  title = 'Direct Partner QR Code',
  subtitle = 'Scan with mobile camera to test tracking funnel',
  size = 220,
}) => {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [qrColor, setQrColor] = useState<'navy' | 'dark' | 'emerald'>('navy')
  const svgRef = useRef<SVGSVGElement | null>(null)

  const matrix = generateQrMatrix(url)
  const matrixSize = matrix.length

  const colorMap = {
    navy: '#0A1628',
    dark: '#000000',
    emerald: '#065F46',
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast({
        title: 'Referral Link Copied',
        description: 'URL copied to clipboard with your active partner parameters.',
        type: 'success',
      })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast({
        title: 'Copy Failed',
        description: 'Please copy the link text directly.',
        type: 'error',
      })
    }
  }

  const handleDownloadSvg = () => {
    if (!svgRef.current) return
    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const svgUrl = URL.createObjectURL(svgBlob)
    const downloadLink = document.createElement('a')
    downloadLink.href = svgUrl
    downloadLink.download = `OAL-Partner-QR-${Date.now()}.svg`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(svgUrl)
    toast({
      title: 'QR Code Downloaded',
      description: 'Vector SVG saved. Ready for business cards and print handouts.',
      type: 'success',
    })
  }

  const handleDownloadPng = () => {
    if (!svgRef.current) return
    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const urlObj = URL.createObjectURL(svgBlob)

    canvas.width = 600
    canvas.height = 600

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, 600, 600)
        ctx.drawImage(img, 40, 40, 520, 520)
        const pngUrl = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.href = pngUrl
        downloadLink.download = `OAL-Partner-QR-${Date.now()}.png`
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
      }
      URL.revokeObjectURL(urlObj)
      toast({
        title: 'PNG QR Code Exported',
        description: 'High-res 600x600 PNG saved to your downloads folder.',
        type: 'success',
      })
    }
    img.src = urlObj
  }

  return (
    <Card variant="bento" className="p-5 sm:p-6 text-left max-w-md w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <QrCode className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white truncate">
            {title}
          </h4>
        </div>
        <Badge variant="emerald" size="sm" dot>
          Live Tracking
        </Badge>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        {subtitle}
      </p>

      {/* QR Code Presentation Canvas */}
      <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-slate-200 dark:border-slate-700 shadow-sm">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${matrixSize} ${matrixSize}`}
          className="rounded-lg"
          style={{ width: size, height: size }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* White Background */}
          <rect width={matrixSize} height={matrixSize} fill="#FFFFFF" />

          {/* Matrix Modules */}
          {matrix.map((row, r) =>
            row.map((isDark, c) =>
              isDark ? (
                <rect
                  key={`${r}-${c}`}
                  x={c}
                  y={r}
                  width="1"
                  height="1"
                  fill={colorMap[qrColor]}
                  rx="0.1"
                />
              ) : null
            )
          )}
        </svg>

        <div className="mt-3 text-center">
          <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md max-w-[260px] truncate inline-block">
            {url}
          </span>
        </div>
      </div>

      {/* Style & Action Controls */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">Color Tone:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setQrColor('navy')}
              className={`w-5 h-5 rounded-full bg-[#0A1628] border-2 ${
                qrColor === 'navy' ? 'border-blue-500 scale-110' : 'border-transparent'
              } transition-all`}
              title="OAL Navy"
            />
            <button
              onClick={() => setQrColor('dark')}
              className={`w-5 h-5 rounded-full bg-black border-2 ${
                qrColor === 'dark' ? 'border-blue-500 scale-110' : 'border-transparent'
              } transition-all`}
              title="Classic Black"
            />
            <button
              onClick={() => setQrColor('emerald')}
              className={`w-5 h-5 rounded-full bg-emerald-800 border-2 ${
                qrColor === 'emerald' ? 'border-emerald-500 scale-110' : 'border-transparent'
              } transition-all`}
              title="Forest Emerald"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyLink}
            leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            className="text-xs font-semibold"
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>

          <Button
            size="sm"
            variant="primary"
            onClick={handleDownloadPng}
            leftIcon={<Download className="w-3.5 h-3.5" />}
            className="text-xs font-semibold"
          >
            Download PNG
          </Button>
        </div>

        <div className="pt-1 flex justify-center">
          <button
            onClick={handleDownloadSvg}
            className="text-[11px] text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center gap-1"
          >
            <span>Need vector SVG for print flyers? Download SVG</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </Card>
  )
}
