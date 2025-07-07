import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Button from '@/components/atoms/Button'
import DeviceSelector from '@/components/molecules/DeviceSelector'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import { cn } from '@/utils/cn'
import siteService from '@/services/api/siteService'

const PreviewPage = () => {
  const { siteId } = useParams()
  const [site, setSite] = useState(null)
  const [selectedDevice, setSelectedDevice] = useState('desktop')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadSite = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await siteService.getById(siteId)
      if (data) {
        setSite(data)
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

  const renderElement = (element) => {
    switch (element.type) {
      case 'text':
        return (
          <div
            key={element.id}
            className="absolute"
            style={{
              left: element.position.x,
              top: element.position.y,
              ...element.style
            }}
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
            className="absolute"
            style={{
              left: element.position.x,
              top: element.position.y,
              ...element.style
            }}
          />
        )
      case 'button':
        return (
          <button
            key={element.id}
            className="absolute"
            style={{
              left: element.position.x,
              top: element.position.y,
              ...element.style
            }}
          >
            {element.content}
          </button>
        )
      case 'video':
        return (
          <iframe
            key={element.id}
            src={element.content}
            className="absolute"
            style={{
              left: element.position.x,
              top: element.position.y,
              ...element.style
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )
      default:
        return null
    }
  }

  const deviceFrameClass = {
    mobile: 'device-frame-mobile',
    tablet: 'device-frame-tablet',
    desktop: 'device-frame-desktop'
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
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              <ApperIcon name="ArrowLeft" className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Preview: {site.name}
              </h1>
              <p className="text-sm text-gray-500">{site.domain}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <DeviceSelector
              selectedDevice={selectedDevice}
              onDeviceChange={setSelectedDevice}
            />
            
            <div className="flex items-center space-x-2">
              <Link to={`/editor/${siteId}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ApperIcon name="Edit" className="h-4 w-4" />
                  Edit
                </Button>
              </Link>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ApperIcon name="Share" className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex-1 bg-gray-100 p-8 flex items-center justify-center">
        <div className={cn('relative', deviceFrameClass[selectedDevice])}>
          <div
            className={cn(
              'w-full h-full bg-white relative overflow-hidden',
              selectedDevice === 'mobile' ? 'rounded-2xl' : 
              selectedDevice === 'tablet' ? 'rounded-xl' : 'rounded-lg'
            )}
          >
            {site.elements?.map(renderElement)}
            
            {(!site.elements || site.elements.length === 0) && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <ApperIcon name="Layout" className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Empty Site</h3>
                  <p className="text-sm">No elements to display</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewPage