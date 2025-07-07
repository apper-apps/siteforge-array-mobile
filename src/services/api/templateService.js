import templateData from '@/services/mockData/templates.json'

class TemplateService {
  constructor() {
    this.templates = [...templateData]
  }

  async delay(ms = 200) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getAll() {
    await this.delay()
    return [...this.templates]
  }

  async getById(id) {
    await this.delay()
    const template = this.templates.find(template => template.Id === parseInt(id))
    return template ? { ...template } : null
  }

  async getByCategory(category) {
    await this.delay()
    return this.templates.filter(template => template.category === category)
  }
}

export default new TemplateService()