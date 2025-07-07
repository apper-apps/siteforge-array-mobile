import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter } from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import StatusBadge from '@/components/molecules/StatusBadge'
import ApperIcon from '@/components/ApperIcon'
import { formatDistance } from 'date-fns'

const SiteCard = ({ site, onEdit, onDelete, onPublish, onArchive }) => {
  const handleAction = (action, e) => {
    e.preventDefault()
    e.stopPropagation()
    action(site.Id)
  }

  return (
    <Card className="card-hover group">
      <CardContent className="p-0">
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center">
          <ApperIcon name="Globe" className="h-12 w-12 text-gray-400" />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {site.name}
            </h3>
            <StatusBadge status={site.status} />
          </div>
          <p className="text-sm text-gray-600 mb-2">{site.domain}</p>
          <p className="text-xs text-gray-500">
            Updated {formatDistance(new Date(site.updatedAt), new Date(), { addSuffix: true })}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleAction(onEdit, e)}
            className="flex items-center gap-1"
          >
            <ApperIcon name="Edit" className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => handleAction(onDelete, e)}
            className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <ApperIcon name="Trash2" className="h-4 w-4" />
            Delete
          </Button>
        </div>
        <div className="flex space-x-2">
          {site.status === 'draft' && (
            <Button
              size="sm"
              onClick={(e) => handleAction(onPublish, e)}
              className="flex items-center gap-1"
            >
              <ApperIcon name="Upload" className="h-4 w-4" />
              Publish
            </Button>
          )}
          {site.status === 'live' && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => handleAction(onArchive, e)}
              className="flex items-center gap-1"
            >
              <ApperIcon name="Archive" className="h-4 w-4" />
              Archive
            </Button>
          )}
          <Link to={`/preview/${site.Id}`}>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ApperIcon name="Eye" className="h-4 w-4" />
              Preview
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export default SiteCard