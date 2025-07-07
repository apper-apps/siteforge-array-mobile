import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { cn } from '@/utils/cn'

const SiteCanvas = ({ elements, onElementAdd, onElementSelect, selectedElement, device = 'desktop' }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'element',
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset()
      const canvasRect = document.getElementById('canvas').getBoundingClientRect()
      const x = Math.floor((offset.x - canvasRect.left) / 20) * 20
      const y = Math.floor((offset.y - canvasRect.top) / 20) * 20

      const newElement = {
        id: `${item.type}-${Date.now()}`,
        type: item.type,
        content: getDefaultContent(item.type),
        style: getDefaultStyle(item.type),
        position: { x, y },
        responsive: {}
      }

      onElementAdd(newElement)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  const getDefaultContent = (type) => {
    switch (type) {
      case 'text':
        return 'Enter your text here'
      case 'image':
        return 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop'
      case 'button':
        return 'Click Me'
      case 'video':
        return 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      case 'form':
        return 'Contact Form'
      default:
        return 'Element'
    }
  }

  const getDefaultStyle = (type) => {
    switch (type) {
      case 'text':
        return {
          fontSize: '1rem',
          fontWeight: 'normal',
          textAlign: 'left',
          color: '#1f2937'
        }
      case 'image':
        return {
          width: '300px',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '0.5rem'
        }
      case 'button':
        return {
          backgroundColor: '#5b21b6',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          fontSize: '1rem',
          fontWeight: '500',
          border: 'none',
          cursor: 'pointer'
        }
      case 'video':
        return {
          width: '560px',
          height: '315px',
          border: 'none',
          borderRadius: '0.5rem'
        }
      default:
        return {}
    }
  }

  const renderElement = (element) => {
    const isSelected = selectedElement?.id === element.id
    
    switch (element.type) {
      case 'text':
        return (
          <div
            key={element.id}
            className={cn(
              'absolute cursor-pointer p-2 rounded transition-all duration-200',
              isSelected ? 'element-selected' : 'hover:element-hover'
            )}
            style={{
              left: element.position.x,
              top: element.position.y,
              ...element.style
            }}
            onClick={() => onElementSelect(element)}
          >
            {element.content}
          </div>
        )
      case 'image':
        return (
          <img
            key={element.id}
            src={element.content}
            alt={element.alt || 'Image'}
            className={cn(
              'absolute cursor-pointer rounded transition-all duration-200',
              isSelected ? 'element-selected' : 'hover:element-hover'
            )}
            style={{
              left: element.position.x,
              top: element.position.y,
              ...element.style
            }}
            onClick={() => onElementSelect(element)}
          />
        )
      case 'button':
        return (
          <button
            key={element.id}
            className={cn(
              'absolute cursor-pointer rounded transition-all duration-200',
              isSelected ? 'element-selected' : 'hover:element-hover'
            )}
            style={{
              left: element.position.x,
              top: element.position.y,
              ...element.style
            }}
            onClick={() => onElementSelect(element)}
          >
            {element.content}
          </button>
        )
      case 'video':
        return (
          <iframe
            key={element.id}
            src={element.content}
            className={cn(
              'absolute cursor-pointer rounded transition-all duration-200',
              isSelected ? 'element-selected' : 'hover:element-hover'
            )}
            style={{
              left: element.position.x,
              top: element.position.y,
              ...element.style
            }}
            onClick={() => onElementSelect(element)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )
      default:
        return (
          <div
            key={element.id}
            className={cn(
              'absolute cursor-pointer p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded transition-all duration-200',
              isSelected ? 'element-selected' : 'hover:element-hover'
            )}
            style={{
              left: element.position.x,
              top: element.position.y
            }}
            onClick={() => onElementSelect(element)}
          >
            <ApperIcon name="Square" className="h-8 w-8 text-gray-400" />
          </div>
        )
    }
  }

  const deviceFrameClass = {
    mobile: 'device-frame-mobile',
    tablet: 'device-frame-tablet',
    desktop: 'device-frame-desktop'
  }

  return (
    <div className="flex-1 canvas-area canvas-grid p-8 flex items-center justify-center">
      <div className={cn('relative', deviceFrameClass[device])}>
        <div
          id="canvas"
          ref={drop}
          className={cn(
            'w-full h-full bg-white relative overflow-hidden',
            device === 'mobile' ? 'rounded-2xl' : 
            device === 'tablet' ? 'rounded-xl' : 'rounded-lg',
            isOver && 'drop-zone-active'
          )}
        >
          <AnimatePresence>
            {elements.map((element) => (
              <motion.div
                key={element.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {renderElement(element)}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {elements.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <ApperIcon name="MousePointer" className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Start Building</h3>
                <p className="text-sm">Drag elements from the palette to get started</p>
              </div>
            </div>
          )}
          
          {isOver && (
            <div className="absolute inset-0 bg-primary-50 bg-opacity-50 border-2 border-dashed border-primary-400 rounded-lg flex items-center justify-center">
              <div className="text-primary-600 text-center">
                <ApperIcon name="Plus" className="h-8 w-8 mx-auto mb-2" />
                <p className="font-medium">Drop element here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SiteCanvas