import React from 'react'
import DOMPurify from 'dompurify'

interface SafeHtmlProps {
  html: string
  className?: string
}

export const SafeHtml: React.FC<SafeHtmlProps> = ({ html, className = '' }) => {
  const sanitized = DOMPurify.sanitize(html, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target'],
  })

  return (
    <div
      className={`prose prose-sm dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  )
}
