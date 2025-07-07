import siteData from '@/services/mockData/sites.json'

class SiteService {
  constructor() {
    this.sites = [...siteData]
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getAll() {
    await this.delay()
    return [...this.sites]
  }

  async getById(id) {
    await this.delay()
    const site = this.sites.find(site => site.Id === parseInt(id))
    return site ? { ...site } : null
  }

  async create(siteData) {
    await this.delay()
    const newSite = {
      ...siteData,
      Id: Math.max(...this.sites.map(s => s.Id)) + 1,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.sites.push(newSite)
    return { ...newSite }
  }

  async update(id, data) {
    await this.delay()
    const index = this.sites.findIndex(site => site.Id === parseInt(id))
    if (index === -1) return null
    
    this.sites[index] = {
      ...this.sites[index],
      ...data,
      updatedAt: new Date().toISOString()
    }
    return { ...this.sites[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.sites.findIndex(site => site.Id === parseInt(id))
    if (index === -1) return false
    
    this.sites.splice(index, 1)
    return true
  }

  async publish(id) {
    await this.delay()
    const index = this.sites.findIndex(site => site.Id === parseInt(id))
    if (index === -1) return null
    
    this.sites[index] = {
      ...this.sites[index],
      status: 'live',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    return { ...this.sites[index] }
  }

  async archive(id) {
    await this.delay()
    const index = this.sites.findIndex(site => site.Id === parseInt(id))
    if (index === -1) return null
    
    this.sites[index] = {
      ...this.sites[index],
      status: 'archived',
      archivedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    return { ...this.sites[index] }
  }

  async restore(id) {
    await this.delay()
    const index = this.sites.findIndex(site => site.Id === parseInt(id))
    if (index === -1) return null
    
    this.sites[index] = {
      ...this.sites[index],
      status: 'draft',
      restoredAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    return { ...this.sites[index] }
  }
}

export default new SiteService()