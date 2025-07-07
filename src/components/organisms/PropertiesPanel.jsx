import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card'
import FormField from '@/components/molecules/FormField'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const PropertiesPanel = ({ selectedElement, onUpdateElement }) => {
  const [properties, setProperties] = useState(selectedElement || {})

  const handlePropertyChange = (property, value) => {
    const updatedProperties = { ...properties, [property]: value }
    setProperties(updatedProperties)
    onUpdateElement?.(updatedProperties)
  }

  if (!selectedElement) {
    return (
      <div className="properties-panel w-80 h-screen overflow-y-auto">
        <div className="p-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ApperIcon name="MousePointer" className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Element Selected</h3>
              <p className="text-sm text-gray-600 text-center">
                Select an element from the canvas to edit its properties
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="properties-panel w-80 h-screen overflow-y-auto">
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ApperIcon name="Settings" className="h-5 w-5" />
              Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <FormField
                label="Element ID"
                value={properties.id || ''}
                onChange={(e) => handlePropertyChange('id', e.target.value)}
                disabled
              />
              
              <FormField
                label="Element Type"
                value={properties.type || ''}
                disabled
              />

              {properties.type === 'text' && (
                <>
                  <FormField
                    label="Content"
                    value={properties.content || ''}
                    onChange={(e) => handlePropertyChange('content', e.target.value)}
                  />
                  <FormField
                    label="Font Size"
                    type="select"
                    value={properties.style?.fontSize || '1rem'}
                    onChange={(e) => handlePropertyChange('style', { ...properties.style, fontSize: e.target.value })}
                    options={[
                      { value: '0.875rem', label: 'Small' },
                      { value: '1rem', label: 'Medium' },
                      { value: '1.125rem', label: 'Large' },
                      { value: '1.5rem', label: 'X-Large' },
                      { value: '2rem', label: 'XX-Large' }
                    ]}
                  />
                </>
              )}

              {properties.type === 'image' && (
                <>
                  <FormField
                    label="Image URL"
                    value={properties.content || ''}
                    onChange={(e) => handlePropertyChange('content', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <FormField
                    label="Alt Text"
                    value={properties.alt || ''}
                    onChange={(e) => handlePropertyChange('alt', e.target.value)}
                  />
                </>
              )}

              {properties.type === 'button' && (
                <>
                  <FormField
                    label="Button Text"
                    value={properties.content || ''}
                    onChange={(e) => handlePropertyChange('content', e.target.value)}
                  />
                  <FormField
                    label="Button Style"
                    type="select"
                    value={properties.variant || 'primary'}
                    onChange={(e) => handlePropertyChange('variant', e.target.value)}
                    options={[
                      { value: 'primary', label: 'Primary' },
                      { value: 'secondary', label: 'Secondary' },
                      { value: 'outline', label: 'Outline' }
                    ]}
                  />
                  <FormField
                    label="Link URL"
                    value={properties.href || ''}
                    onChange={(e) => handlePropertyChange('href', e.target.value)}
                    placeholder="https://example.com"
                  />
                </>
              )}
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Spacing</h4>
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  label="Margin Top"
                  type="select"
                  value={properties.style?.marginTop || '0'}
                  onChange={(e) => handlePropertyChange('style', { ...properties.style, marginTop: e.target.value })}
                  options={[
                    { value: '0', label: 'None' },
                    { value: '0.5rem', label: 'Small' },
                    { value: '1rem', label: 'Medium' },
                    { value: '1.5rem', label: 'Large' },
                    { value: '2rem', label: 'X-Large' }
                  ]}
                />
                <FormField
                  label="Margin Bottom"
                  type="select"
                  value={properties.style?.marginBottom || '0'}
                  onChange={(e) => handlePropertyChange('style', { ...properties.style, marginBottom: e.target.value })}
                  options={[
                    { value: '0', label: 'None' },
                    { value: '0.5rem', label: 'Small' },
                    { value: '1rem', label: 'Medium' },
                    { value: '1.5rem', label: 'Large' },
                    { value: '2rem', label: 'X-Large' }
                  ]}
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => onUpdateElement?.({ ...properties, deleted: true })}
              >
                <ApperIcon name="Trash2" className="h-4 w-4" />
                Delete Element
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PropertiesPanel