import React from 'react'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const StatusBadge = ({ status }) => {
  const statusConfig = {
    live: {
      variant: 'success',
      icon: 'Globe',
      text: 'Live'
    },
    draft: {
      variant: 'warning',
      icon: 'Edit',
      text: 'Draft'
    },
    archived: {
      variant: 'secondary',
      icon: 'Archive',
      text: 'Archived'
    }
  }

  const config = statusConfig[status] || statusConfig.draft

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <ApperIcon name={config.icon} className="h-3 w-3" />
      {config.text}
    </Badge>
  )
}

export default StatusBadge