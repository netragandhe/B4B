import React, { useState } from 'react'
import { cn } from '@/lib/utils'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  status?: 'online' | 'offline' | 'busy'
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  name,
  size = 'md',
  status,
  className,
  ...props
}) => {
  const [imageError, setImageError] = useState(false)

  const sizeMap = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  }

  const getInitials = (n?: string) => {
    if (!n) return 'U'
    const parts = n.trim().split(' ')
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  return (
    <div className={cn('relative inline-block select-none', className)} {...props}>
      <div
        className={cn(
          'rounded-full overflow-hidden flex items-center justify-center font-bold tracking-tight border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xs',
          sizeMap[size]
        )}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-[#0D1E36]',
            size === 'xs' || size === 'sm' ? 'w-2 h-2' : 'w-3 h-3',
            status === 'online' && 'bg-emerald-500',
            status === 'offline' && 'bg-slate-400',
            status === 'busy' && 'bg-amber-500'
          )}
        />
      )}
    </div>
  )
}
