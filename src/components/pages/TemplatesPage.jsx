import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import TemplateCard from '@/components/organisms/TemplateCard'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import { TemplateCardSkeleton } from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { cn } from '@/utils/cn'
import templateService from '@/services/api/templateService'
import siteService from '@/services/api/siteService'

const TemplatesPage = () => {
  const [templates, setTemplates] = useState([])
  const [filteredTemplates, setFilteredTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const navigate = useNavigate()

  const categories = [
    { id: 'all', name: 'All Templates', icon: 'Grid3x3' },
    { id: 'portfolio', name: 'Portfolio', icon: 'User' },
    { id: 'landing', name: 'Landing Page', icon: 'Zap' },
    { id: 'link-in-bio', name: 'Link in Bio', icon: 'Link' },
    { id: 'blog', name: 'Blog', icon: 'FileText' },
    { id: 'product', name: 'Product', icon: 'Package' }
  ]

  const loadTemplates = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await templateService.getAll()
      setTemplates(data)
      setFilteredTemplates(data)
    } catch (err) {
      setError('Failed to load templates. Please try again.')
      console.error('Error loading templates:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTemplates()
  }, [])

  useEffect(() => {
    let filtered = templates

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredTemplates(filtered)
  }, [searchTerm, selectedCategory, templates])

  const handleSelectTemplate = async (templateId) => {
    try {
      const template = await templateService.getById(templateId)
      if (template) {
        const siteName = `${template.name} Site`
        const domain = `${siteName.toLowerCase().replace(/\s+/g, '-')}.siteforge.com`
        
        const newSite = await siteService.create({
          name: siteName,
          domain: domain,
          template: template.category,
          elements: template.elements,
          settings: template.settings
        })
        
        toast.success('Site created successfully')
        navigate(`/editor/${newSite.Id}`)
      }
    } catch (err) {
      toast.error('Failed to create site from template')
      console.error('Error creating site:', err)
    }
  }

  const handlePreviewTemplate = (templateId) => {
    // In a real app, this would open a preview modal or page
    console.log('Preview template:', templateId)
    toast.info('Template preview feature coming soon!')
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="skeleton h-8 w-48"></div>
            <div className="skeleton h-4 w-64"></div>
          </div>
        </div>
        <div className="skeleton h-10 w-80"></div>
        <div className="skeleton h-12 w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <TemplateCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={loadTemplates}
      />
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
          <p className="text-gray-600 mt-2">
            Choose from our professionally designed templates
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ApperIcon name="ArrowLeft" className="h-4 w-4" />
          Back to Sites
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          placeholder="Search templates..."
          onSearch={setSearchTerm}
          className="flex-1 max-w-md"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2"
          >
            <ApperIcon name={category.icon} className="h-4 w-4" />
            {category.name}
          </Button>
        ))}
      </div>

      {filteredTemplates.length === 0 ? (
        <Empty
          title="No templates found"
          description={searchTerm ? 
            "No templates match your search criteria. Try adjusting your search terms." :
            "No templates available in this category."
          }
          actionLabel="View All Templates"
          onAction={() => setSelectedCategory('all')}
          icon="Layers"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.Id}
              template={template}
              onSelect={handleSelectTemplate}
              onPreview={handlePreviewTemplate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TemplatesPage