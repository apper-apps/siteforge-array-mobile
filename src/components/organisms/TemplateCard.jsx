import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const TemplateCard = ({ template, onSelect, onPreview }) => {
  return (
    <Card className="template-card">
      <CardContent className="p-0">
        <div className="aspect-video relative overflow-hidden rounded-t-xl">
          <img 
            src={template.thumbnail} 
            alt={template.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <Badge variant="secondary" className="bg-white/90 text-gray-900">
                {template.category}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPreview(template.Id)}
                className="bg-white/90 text-gray-900 hover:bg-white"
              >
                <ApperIcon name="Eye" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{template.description}</p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={() => onSelect(template.Id)}
          className="w-full flex items-center justify-center gap-2"
        >
          <ApperIcon name="Plus" className="h-4 w-4" />
          Use Template
        </Button>
      </CardFooter>
    </Card>
  )
}

export default TemplateCard