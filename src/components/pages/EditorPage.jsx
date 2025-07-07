import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import EditorHeader from '@/components/organisms/EditorHeader'
import ElementPalette from '@/components/organisms/ElementPalette'
import SiteCanvas from '@/components/organisms/SiteCanvas'
import PropertiesPanel from '@/components/organisms/PropertiesPanel'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import siteService from '@/services/api/siteService'

const EditorPage = () => {
  const { siteId } = useParams()
  const navigate = useNavigate()
  const [site, setSite] = useState(null)
  const [elements, setElements] = useState([])
  const [selectedElement, setSelectedElement] = useState(null)
  const [selectedDevice, setSelectedDevice] = useState('desktop')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  const loadSite = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await siteService.getById(siteId)
      if (data) {
        setSite(data)
        setElements(data.elements || [])
      } else {
        setError('Site not found')
      }
    } catch (err) {
      setError('Failed to load site. Please try again.')
      console.error('Error loading site:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSite()
  }, [siteId])

  const handleElementAdd = (element) => {
    setElements([...elements, element])
    setSelectedElement(element)
  }

  const handleElementSelect = (element) => {
    setSelectedElement(element)
  }

  const handleElementUpdate = (updatedElement) => {
    if (updatedElement.deleted) {
      setElements(elements.filter(el => el.id !== updatedElement.id))
      setSelectedElement(null)
    } else {
      setElements(elements.map(el => 
        el.id === updatedElement.id ? updatedElement : el
      ))
      setSelectedElement(updatedElement)
    }
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      const updatedSite = await siteService.update(siteId, {
        ...site,
        elements: elements
      })
      setSite(updatedSite)
      toast.success('Site saved successfully')
    } catch (err) {
      toast.error('Failed to save site')
      console.error('Error saving site:', err)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    try {
      const updatedSite = await siteService.publish(siteId)
      setSite(updatedSite)
      toast.success('Site published successfully')
    } catch (err) {
      toast.error('Failed to publish site')
      console.error('Error publishing site:', err)
    }
  }

  const handlePreview = () => {
    navigate(`/preview/${siteId}`)
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Error
          message={error}
          onRetry={loadSite}
        />
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <EditorHeader
        siteName={site.name}
        siteStatus={site.status}
        selectedDevice={selectedDevice}
        onDeviceChange={setSelectedDevice}
        onSave={handleSave}
        onPublish={handlePublish}
        onPreview={handlePreview}
        isSaving={isSaving}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <ElementPalette />
        
        <SiteCanvas
          elements={elements}
          onElementAdd={handleElementAdd}
          onElementSelect={handleElementSelect}
          selectedElement={selectedElement}
          device={selectedDevice}
        />
        
        <PropertiesPanel
          selectedElement={selectedElement}
          onUpdateElement={handleElementUpdate}
        />
      </div>
    </div>
  )
}

export default EditorPage