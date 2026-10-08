import React, { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

export interface CountUpProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

export const CountUp: React.FC<CountUpProps> = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.5,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: duration * 1000,
  })
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        const formatted = new Intl.NumberFormat('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(latest)
        ref.current.textContent = `${prefix}${formatted}${suffix}`
      }
    })
    return () => unsubscribe()
  }, [springValue, prefix, suffix, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
