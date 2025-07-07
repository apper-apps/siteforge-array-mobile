import React from 'react'
import { cn } from '@/utils/cn'

const Loading = ({ className }) => {
  return (
    <div className={cn('animate-pulse space-y-4', className)}>
      <div className="skeleton h-8 w-3/4"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-5/6"></div>
      <div className="skeleton h-32 w-full"></div>
      <div className="flex space-x-4">
        <div className="skeleton h-10 w-24"></div>
        <div className="skeleton h-10 w-24"></div>
      </div>
    </div>
  )
}

export const SiteCardSkeleton = () => (
  <div className="card animate-pulse">
    <div className="p-6">
      <div className="skeleton-image mb-4"></div>
      <div className="skeleton h-6 w-3/4 mb-2"></div>
      <div className="skeleton h-4 w-full mb-2"></div>
      <div className="skeleton h-4 w-2/3 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="skeleton h-6 w-16"></div>
        <div className="skeleton-button w-20"></div>
      </div>
    </div>
  </div>
)

export const TemplateCardSkeleton = () => (
  <div className="template-card animate-pulse">
    <div className="skeleton-image h-48"></div>
    <div className="p-4">
      <div className="skeleton h-6 w-3/4 mb-2"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  </div>
)

export default Loading