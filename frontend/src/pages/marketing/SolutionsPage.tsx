import React, { useEffect } from 'react'
import { SolutionsPage as WebsiteSolutionsPage } from '@/pages/website/SolutionsPage'

export const SolutionsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    })
  }, [])

  return <WebsiteSolutionsPage />
}

export default SolutionsPage
