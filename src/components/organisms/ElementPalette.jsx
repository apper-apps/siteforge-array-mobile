import React from 'react'
import ElementPaletteItem from '@/components/molecules/ElementPaletteItem'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card'

const ElementPalette = () => {
  const elements = [
    {
      type: 'text',
      name: 'Text',
      description: 'Add text content',
      icon: 'Type'
    },
    {
      type: 'image',
      name: 'Image',
      description: 'Add an image',
      icon: 'Image'
    },
    {
      type: 'button',
      name: 'Button',
      description: 'Add a button',
      icon: 'Square'
    },
    {
      type: 'video',
      name: 'Video',
      description: 'Embed video',
      icon: 'Video'
    },
    {
      type: 'form',
      name: 'Form',
      description: 'Contact form',
      icon: 'FileText'
    },
    {
      type: 'row',
      name: 'Row',
      description: 'Layout row',
      icon: 'Rows'
    },
    {
      type: 'column',
      name: 'Column',
      description: 'Layout column',
      icon: 'Columns'
    },
    {
      type: 'html',
      name: 'HTML',
      description: 'Custom code',
      icon: 'Code'
    }
  ]

  return (
    <div className="editor-panel w-80 h-screen overflow-y-auto">
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Elements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {elements.map((element) => (
              <ElementPaletteItem
                key={element.type}
                element={element}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ElementPalette