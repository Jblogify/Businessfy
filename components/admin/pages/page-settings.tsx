"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PageSettings({ settings, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...settings,
      [field]: value,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Settings</CardTitle>
        <CardDescription>Configure additional settings for this page</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={settings.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="visibility">Visibility</Label>
            <Select value={settings.visibility} onValueChange={(value) => handleChange("visibility", value)}>
              <SelectTrigger id="visibility">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Public">Public</SelectItem>
                <SelectItem value="Private">Private</SelectItem>
                <SelectItem value="Password Protected">Password Protected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="publish-date">Publish Date</Label>
            <Input
              id="publish-date"
              type="date"
              value={settings.publishDate}
              onChange={(e) => handleChange("publishDate", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="template">Template</Label>
            <Select value={settings.template} onValueChange={(value) => handleChange("template", value)}>
              <SelectTrigger id="template">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Default">Default</SelectItem>
                <SelectItem value="Full Width">Full Width</SelectItem>
                <SelectItem value="Sidebar">Sidebar</SelectItem>
                <SelectItem value="Landing Page">Landing Page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="parent-page">Parent Page</Label>
          <Select
            value={settings.parentPage || ""}
            onValueChange={(value) => handleChange("parentPage", value === "" ? null : value)}
          >
            <SelectTrigger id="parent-page">
              <SelectValue placeholder="Select parent page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="1">Home</SelectItem>
              <SelectItem value="2">About Us</SelectItem>
              <SelectItem value="3">Services</SelectItem>
              <SelectItem value="4">Projects</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">Optional: Select a parent page to create a hierarchy</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="order">Menu Order</Label>
          <Input
            id="order"
            type="number"
            min="1"
            value={settings.order}
            onChange={(e) => handleChange("order", Number.parseInt(e.target.value))}
          />
          <p className="text-xs text-muted-foreground">Controls the order of this page in navigation menus</p>
        </div>
      </CardContent>
    </Card>
  )
}
