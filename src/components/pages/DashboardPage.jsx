import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import SiteCard from '@/components/organisms/SiteCard'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import { SiteCardSkeleton } from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import siteService from '@/services/api/siteService'

const DashboardPage = () => {
  const [sites, setSites] = useState([])
  const [filteredSites, setFilteredSites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const loadSites = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await siteService.getAll()
      setSites(data)
      setFilteredSites(data)
    } catch (err) {
      setError('Failed to load sites. Please try again.')
      console.error('Error loading sites:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSites()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = sites.filter(site =>
        site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        site.domain.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredSites(filtered)
    } else {
      setFilteredSites(sites)
    }
  }, [searchTerm, sites])

  const handleEdit = (siteId) => {
    navigate(`/editor/${siteId}`)
  }

  const handleDelete = async (siteId) => {
    if (window.confirm('Are you sure you want to delete this site?')) {
      try {
        await siteService.delete(siteId)
        setSites(sites.filter(site => site.Id !== siteId))
        toast.success('Site deleted successfully')
      } catch (err) {
        toast.error('Failed to delete site')
        console.error('Error deleting site:', err)
      }
    }
  }

  const handlePublish = async (siteId) => {
    try {
      const updatedSite = await siteService.publish(siteId)
      setSites(sites.map(site => 
        site.Id === siteId ? updatedSite : site
      ))
      toast.success('Site published successfully')
    } catch (err) {
      toast.error('Failed to publish site')
      console.error('Error publishing site:', err)
    }
  }

  const handleArchive = async (siteId) => {
    try {
      const updatedSite = await siteService.archive(siteId)
      setSites(sites.map(site => 
        site.Id === siteId ? updatedSite : site
      ))
      toast.success('Site archived successfully')
    } catch (err) {
      toast.error('Failed to archive site')
      console.error('Error archiving site:', err)
    }
  }

  const handleCreateNew = () => {
    navigate('/templates')
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="skeleton h-8 w-48"></div>
            <div className="skeleton h-4 w-64"></div>
          </div>
          <div className="skeleton h-10 w-32"></div>
        </div>
        <div className="skeleton h-10 w-80"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SiteCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={loadSites}
      />
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Sites</h1>
          <p className="text-gray-600 mt-2">
            Manage and edit your website projects
          </p>
        </div>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <ApperIcon name="Plus" className="h-5 w-5" />
          Create New Site
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          placeholder="Search sites..."
          onSearch={setSearchTerm}
          className="flex-1 max-w-md"
        />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ApperIcon name="Filter" className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ApperIcon name="SortAsc" className="h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      {filteredSites.length === 0 ? (
        <Empty
          title="No sites found"
          description={searchTerm ? 
            "No sites match your search criteria. Try adjusting your search terms." :
            "You haven't created any sites yet. Get started by creating your first site from a template."
          }
          actionLabel="Create New Site"
          onAction={handleCreateNew}
          icon="Plus"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site) => (
            <SiteCard
              key={site.Id}
              site={site}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPublish={handlePublish}
              onArchive={handleArchive}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default DashboardPage