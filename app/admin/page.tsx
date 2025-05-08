import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, FileText, MessageSquare, Users } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Jalal Nasser admin dashboard.</p>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">+1 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+5 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Recent activity on the website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "Page Updated",
                      page: "Home",
                      user: "Admin",
                      time: "2 hours ago",
                    },
                    {
                      action: "User Created",
                      page: "Users",
                      user: "Admin",
                      time: "5 hours ago",
                    },
                    {
                      action: "Media Uploaded",
                      page: "Media",
                      user: "Editor",
                      time: "1 day ago",
                    },
                    {
                      action: "Page Created",
                      page: "Services",
                      user: "Admin",
                      time: "2 days ago",
                    },
                    {
                      action: "Message Received",
                      page: "Contact",
                      user: "System",
                      time: "3 days ago",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                        <FileText className="h-4 w-4 text-green-700 dark:text-green-300" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{item.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.page} by {item.user}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">{item.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Messages from the contact form</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Mohammed Al-Saud",
                      email: "mohammed@example.com",
                      message: "I would like to inquire about your services.",
                      time: "2 hours ago",
                    },
                    {
                      name: "Fatima Al-Rashid",
                      email: "fatima@example.com",
                      message: "Please send me more information about your projects.",
                      time: "1 day ago",
                    },
                    {
                      name: "Abdullah Al-Qahtani",
                      email: "abdullah@example.com",
                      message: "I am interested in working with your company.",
                      time: "3 days ago",
                    },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center">
                        <div className="font-medium">{item.name}</div>
                        <div className="ml-auto text-sm text-muted-foreground">{item.time}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{item.email}</div>
                      <div className="text-sm">{item.message}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Website traffic and user engagement metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Analytics charts will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view reports</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Reports will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
