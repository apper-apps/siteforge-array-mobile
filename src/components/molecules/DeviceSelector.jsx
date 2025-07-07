import React from 'react'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { cn } from '@/utils/cn'

const DeviceSelector = ({ selectedDevice, onDeviceChange, className }) => {
  const devices = [
    { id: 'mobile', icon: 'Smartphone', label: 'Mobile' },
    { id: 'tablet', icon: 'Tablet', label: 'Tablet' },
    { id: 'desktop', icon: 'Monitor', label: 'Desktop' }
  ]

  return (
    <div className={cn('flex bg-gray-100 rounded-lg p-1', className)}>
      {devices.map((device) => (
        <Button
          key={device.id}
          variant={selectedDevice === device.id ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onDeviceChange(device.id)}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 text-sm',
            selectedDevice === device.id 
              ? 'bg-white shadow-sm' 
              : 'bg-transparent hover:bg-gray-200'
          )}
        >
          <ApperIcon name={device.icon} className="h-4 w-4" />
          {device.label}
        </Button>
      ))}
    </div>
  )
}

export default DeviceSelector