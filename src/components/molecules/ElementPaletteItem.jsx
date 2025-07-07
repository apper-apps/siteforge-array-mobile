import React from 'react'
import { useDrag } from 'react-dnd'
import ApperIcon from '@/components/ApperIcon'
import { cn } from '@/utils/cn'

const ElementPaletteItem = ({ element, className }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'element',
    item: { 
      type: element.type,
      element: element 
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div
      ref={drag}
      className={cn(
        'element-palette-item',
        isDragging && 'opacity-50',
        className
      )}
    >
      <ApperIcon name={element.icon} className="h-5 w-5 text-primary-600" />
      <div>
        <p className="font-medium text-gray-900">{element.name}</p>
        <p className="text-sm text-gray-500">{element.description}</p>
      </div>
    </div>
  )
}

export default ElementPaletteItem