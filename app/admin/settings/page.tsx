"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { PasswordSettings } from "@/components/admin/settings/password-settings"
import { ProfileSettings } from "@/components/admin/settings/profile-settings"
import { TwoFactorSettings } from "@/components/admin/settings/two-factor-settings"
import { AppearanceSettings } from "@/components/admin/settings/appearance-settings"
import { AlertCircle, Bell, Lock, Palette, User } from "lucide-react"
import { NotificationSettings } from "@/components/admin/settings/notification-settings"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Password</span>
          </TabsTrigger>
          <TabsTrigger value="2fa" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>

        <Card>
          <TabsContent value="profile" className="p-6">
            <ProfileSettings />
          </TabsContent>
          <TabsContent value="password" className="p-6">
            <PasswordSettings />
          </TabsContent>
          <TabsContent value="2fa" className="p-6">
            <TwoFactorSettings />
          </TabsContent>
          <TabsContent value="appearance" className="p-6">
            <AppearanceSettings />
          </TabsContent>
          <TabsContent value="notifications" className="p-6">
            <NotificationSettings />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  )
}
