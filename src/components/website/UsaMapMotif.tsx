import React from 'react'

interface UsaMapMotifProps {
  className?: string
  opacity?: number
  variant?: 'subtle' | 'bold' | 'watermark'
}

/**
 * Modern geometric USA Map motif derived from the B4B America national emblem.
 * Uses Emerald (#0E7A5A) grid and Copper (#C8793A) connection lines.
 */
export const UsaMapMotif: React.FC<UsaMapMotifProps> = ({
  className = '',
  opacity = 0.08,
  variant = 'subtle',
}) => {
  const strokeColor = variant === 'bold' ? '#0E7A5A' : 'currentColor'

  return (
    <svg
      viewBox="0 0 960 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <pattern id="usa-grid-pattern" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#0E7A5A" fillOpacity="0.35" />
        </pattern>
        <linearGradient id="usa-gradient-shimmer" x1="0" y1="0" x2="960" y2="600" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0E7A5A" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#C8793A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06201A" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Stylized geometric continental USA landform outline */}
      <path
        d="M 120 180 
           L 180 140 L 260 145 L 340 150 L 420 140 L 490 142 L 560 155 L 640 150 L 710 130 L 780 115 L 830 110 L 860 145 L 870 180 
           L 845 220 L 855 260 L 820 300 L 810 340 L 835 390 L 815 440 L 790 445 L 770 410 L 760 360 L 720 380 L 680 390 
           L 630 420 L 590 425 L 560 415 L 530 435 L 490 470 L 450 495 L 430 450 L 400 440 L 380 430 L 340 420 L 310 410 
           L 270 415 L 230 430 L 190 440 L 175 425 L 180 380 L 170 330 L 140 290 L 130 240 Z"
        stroke={strokeColor}
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="url(#usa-grid-pattern)"
      />

      {/* Internal Regional Coordinates & Network Connections across 12 Divisions */}
      <g stroke="#C8793A" strokeWidth="1.75" strokeDasharray="4 4" strokeOpacity="0.6">
        <line x1="840" y1="170" x2="820" y2="230" />
        <line x1="820" y1="230" x2="800" y2="280" />
        <line x1="800" y1="280" x2="740" y2="380" />
        <line x1="620" y1="260" x2="600" y2="340" />
        <line x1="600" y1="340" x2="520" y2="450" />
        <line x1="550" y1="200" x2="530" y2="320" />
        <line x1="530" y1="320" x2="520" y2="450" />
        <line x1="160" y1="310" x2="190" y2="160" />
        <line x1="160" y1="310" x2="380" y2="300" />
        <line x1="380" y1="300" x2="530" y2="320" />
      </g>

      {/* Key Federal Reserve Hub Node Pinpoints */}
      <g fill="#0E7A5A">
        <circle cx="840" cy="170" r="6" fill="#C8793A" /> {/* Boston */}
        <circle cx="820" cy="230" r="7" fill="#C8793A" /> {/* New York */}
        <circle cx="800" cy="280" r="6" fill="#C8793A" /> {/* Philadelphia */}
        <circle cx="730" cy="270" r="6" /> {/* Cleveland */}
        <circle cx="760" cy="330" r="6" /> {/* Richmond */}
        <circle cx="740" cy="380" r="6.5" fill="#C8793A" /> {/* Atlanta */}
        <circle cx="620" cy="260" r="7" fill="#C8793A" /> {/* Chicago */}
        <circle cx="600" cy="340" r="6" /> {/* St. Louis */}
        <circle cx="550" cy="200" r="6" /> {/* Minneapolis */}
        <circle cx="530" cy="320" r="6" /> {/* Kansas City */}
        <circle cx="520" cy="450" r="7" fill="#C8793A" /> {/* Dallas */}
        <circle cx="160" cy="310" r="7" fill="#C8793A" /> {/* San Francisco */}
      </g>
    </svg>
  )
}
