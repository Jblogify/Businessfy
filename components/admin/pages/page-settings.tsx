"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

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
        <CardDescription>Configure how your page appears and behaves</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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
          <Label htmlFor="template">Page Template</Label>
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

        <div className="space-y-2">
          <Label htmlFor="parent-page">Parent Page</Label>
          <Select
            value={settings.parentPage || "none"}
            onValueChange={(value) => handleChange("parentPage", value === "none" ? null : value)}
          >
            <SelectTrigger id="parent-page">
              <SelectValue placeholder="Select parent page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None (Top Level)</SelectItem>
              <SelectItem value="1">About Us</SelectItem>
              <SelectItem value="2">Services</SelectItem>
              <SelectItem value="3">Products</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Setting a parent page will make this page appear as a child in the navigation
          </p>
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
          <p className="text-xs text-muted-foreground">Pages are displayed in ascending order (1 comes before 2)</p>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="show-in-nav"
            checked={settings.showInNav !== false}
            onCheckedChange={(checked) => handleChange("showInNav", checked)}
          />
          <Label htmlFor="show-in-nav">Show in Navigation Menu</Label>
        </div>
      </CardContent>
    </Card>
  )
}
