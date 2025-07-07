import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@/components/atoms/Button'
import DeviceSelector from '@/components/molecules/DeviceSelector'
import StatusBadge from '@/components/molecules/StatusBadge'
import ApperIcon from '@/components/ApperIcon'

const EditorHeader = ({ 
  siteName, 
  siteStatus, 
  selectedDevice, 
  onDeviceChange, 
  onSave, 
  onPublish, 
  onPreview,
  isSaving 
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            <ApperIcon name="ArrowLeft" className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{siteName}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <StatusBadge status={siteStatus} />
              <span className="text-sm text-gray-500">
                {isSaving ? 'Saving...' : 'Saved'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <DeviceSelector
            selectedDevice={selectedDevice}
            onDeviceChange={onDeviceChange}
          />
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPreview}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Eye" className="h-4 w-4" />
              Preview
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onSave}
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Save" className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            
            <Button
              size="sm"
              onClick={onPublish}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Upload" className="h-4 w-4" />
              Publish
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default EditorHeader