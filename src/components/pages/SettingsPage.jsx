import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import FormField from '@/components/molecules/FormField'
import ApperIcon from '@/components/ApperIcon'
import { toast } from 'react-toastify'

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    siteName: 'SiteForge',
    defaultDomain: 'siteforge.com',
    autoSave: true,
    emailNotifications: true,
    darkMode: false,
    language: 'en'
  })

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    // In a real app, this would save to an API
    toast.success('Settings saved successfully')
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        siteName: 'SiteForge',
        defaultDomain: 'siteforge.com',
        autoSave: true,
        emailNotifications: true,
        darkMode: false,
        language: 'en'
      })
      toast.success('Settings reset to default')
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Configure your SiteForge preferences
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ApperIcon name="Globe" className="h-5 w-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              label="Site Name"
              value={settings.siteName}
              onChange={(e) => handleSettingChange('siteName', e.target.value)}
              placeholder="Enter your site name"
            />
            
            <FormField
              label="Default Domain"
              value={settings.defaultDomain}
              onChange={(e) => handleSettingChange('defaultDomain', e.target.value)}
              placeholder="Enter default domain"
            />
            
            <FormField
              label="Language"
              type="select"
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              options={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Spanish' },
                { value: 'fr', label: 'French' },
                { value: 'de', label: 'German' }
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ApperIcon name="Bell" className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Email Notifications</h4>
                <p className="text-sm text-gray-500">
                  Receive emails about site updates and publishing
                </p>
              </div>
              <Button
                variant={settings.emailNotifications ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
              >
                {settings.emailNotifications ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Auto Save</h4>
                <p className="text-sm text-gray-500">
                  Automatically save changes while editing
                </p>
              </div>
              <Button
                variant={settings.autoSave ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
              >
                {settings.autoSave ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ApperIcon name="Palette" className="h-5 w-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Dark Mode</h4>
                <p className="text-sm text-gray-500">
                  Use dark theme for the interface
                </p>
              </div>
              <Button
                variant={settings.darkMode ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSettingChange('darkMode', !settings.darkMode)}
              >
                {settings.darkMode ? 'Dark' : 'Light'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ApperIcon name="Shield" className="h-5 w-5" />
              Security & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <ApperIcon name="Key" className="h-4 w-4 mr-2" />
                Change Password
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <ApperIcon name="Download" className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                <ApperIcon name="Trash2" className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <ApperIcon name="RotateCcw" className="h-4 w-4" />
            Reset to Default
          </Button>
          <Button
            onClick={handleSave}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Save" className="h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage