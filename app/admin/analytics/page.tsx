"use client"

import { useEffect, useState } from "react"
import type { DateRange } from "react-day-picker"
import { format, subDays } from "date-fns"
import { Eye, MousePointerClick, Users, Clock, ArrowUpDown, Globe, Smartphone } from "lucide-react"

import { fetchAnalyticsData } from "@/lib/analytics"
import { DateRangePicker } from "@/components/admin/date-range-picker"
import { AnalyticsLineChart } from "@/components/admin/analytics/line-chart"
import { AnalyticsBarChart } from "@/components/admin/analytics/bar-chart"
import { AnalyticsPieChart } from "@/components/admin/analytics/pie-chart"
import { StatsCard } from "@/components/admin/analytics/stats-card"
import { GASetup } from "@/components/admin/analytics/ga-setup"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnalyticsPage() {
  const [isGAConnected, setIsGAConnected] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })
  const [overviewData, setOverviewData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedMetric, setSelectedMetric] = useState("pageviews")

  // Check if Google Analytics is connected
  useEffect(() => {
    const measurementId = localStorage.getItem("ga_measurement_id")
    if (measurementId) {
      setIsGAConnected(true)
    }
    setIsLoading(false)
  }, [])

  // Fetch analytics data when date range changes
  useEffect(() => {
    if (isGAConnected && dateRange?.from && dateRange?.to) {
      fetchData()
    }
  }, [isGAConnected, dateRange])

  const fetchData = async () => {
    if (!dateRange?.from || !dateRange?.to) return

    setIsLoading(true)
    try {
      const fromDate = format(dateRange.from, "yyyy-MM-dd")
      const toDate = format(dateRange.to, "yyyy-MM-dd")

      const data = await fetchAnalyticsData(fromDate, toDate)
      setOverviewData(data)
    } catch (error) {
      console.error("Error fetching analytics data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Add this function after the fetchData function
  const exportDataAsCSV = () => {
    if (!overviewData.length) return

    // Create CSV header
    let csvContent = "data:text/csv;charset=utf-8,"
    csvContent += "Date,Pageviews,Sessions,Users\n"

    // Add data rows
    overviewData.forEach((item) => {
      csvContent += `${item.date},${item.pageviews},${item.sessions},${item.users}\n`
    })

    // Create download link
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute(
      "download",
      `analytics_${format(dateRange?.from || new Date(), "yyyy-MM-dd")}_to_${format(dateRange?.to || new Date(), "yyyy-MM-dd")}.csv`,
    )
    document.body.appendChild(link)

    // Trigger download
    link.click()
    document.body.removeChild(link)
  }

  const handleGASetup = () => {
    setIsGAConnected(true)
    fetchData()
  }

  // Mock data for other charts
  const deviceData = [
    { name: "Desktop", value: 4200 },
    { name: "Mobile", value: 3800 },
    { name: "Tablet", value: 1200 },
  ]

  const browserData = [
    { name: "Chrome", users: 5200 },
    { name: "Safari", users: 2100 },
    { name: "Firefox", users: 1300 },
    { name: "Edge", users: 900 },
    { name: "Others", users: 700 },
  ]

  const countryData = [
    { name: "Saudi Arabia", users: 6500 },
    { name: "UAE", users: 1200 },
    { name: "Kuwait", users: 800 },
    { name: "Qatar", users: 600 },
    { name: "Others", users: 1100 },
  ]

  const sourceData = [
    { name: "Direct", users: 3200 },
    { name: "Organic Search", users: 2800 },
    { name: "Social", users: 1500 },
    { name: "Referral", users: 1200 },
    { name: "Email", users: 500 },
  ]

  // Calculate totals for stats cards
  const calculateTotal = (data: any[], key: string) => {
    return data.reduce((sum, item) => sum + item[key], 0)
  }

  const pageviews = overviewData.length ? calculateTotal(overviewData, "pageviews") : 0
  const sessions = overviewData.length ? calculateTotal(overviewData, "sessions") : 0
  const users = overviewData.length ? calculateTotal(overviewData, "users") : 0

  // Calculate average session duration (mock data)
  const avgSessionDuration = "2m 45s"

  // Calculate bounce rate (mock data)
  const bounceRate = "42.5%"

  if (isLoading && !isGAConnected) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isGAConnected) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Connect Google Analytics to view website performance metrics</p>
        </div>
        <GASetup onSetup={handleGASetup} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track and analyze your website performance</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
          <Button variant="outline" onClick={fetchData} disabled={isLoading}>
            Refresh
          </Button>
          <Button variant="outline" onClick={exportDataAsCSV} disabled={!overviewData.length}>
            Export CSV
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <StatsCard
              title="Page Views"
              value={pageviews.toLocaleString()}
              description="Total page views"
              icon={Eye}
              trend={{ value: 12.5, isPositive: true }}
            />
            <StatsCard
              title="Users"
              value={users.toLocaleString()}
              description="Unique visitors"
              icon={Users}
              trend={{ value: 8.3, isPositive: true }}
            />
            <StatsCard
              title="Sessions"
              value={sessions.toLocaleString()}
              description="Total sessions"
              icon={MousePointerClick}
              trend={{ value: 5.7, isPositive: true }}
            />
            <StatsCard
              title="Avg. Session Duration"
              value={avgSessionDuration}
              description="Time per session"
              icon={Clock}
              trend={{ value: 3.2, isPositive: true }}
            />
            <StatsCard
              title="Bounce Rate"
              value={bounceRate}
              description="Single page sessions"
              icon={ArrowUpDown}
              trend={{ value: 2.1, isPositive: false }}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center">
                <div className="flex-1">
                  <CardTitle>Website Traffic</CardTitle>
                  <CardDescription>Traffic overview for the selected period</CardDescription>
                </div>
                <div>
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pageviews">Page Views</SelectItem>
                      <SelectItem value="sessions">Sessions</SelectItem>
                      <SelectItem value="users">Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <AnalyticsLineChart
                    data={overviewData}
                    title=""
                    dataKeys={[
                      {
                        key: selectedMetric,
                        name: selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1),
                        color: "#15803d",
                      },
                    ]}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnalyticsPieChart
              data={deviceData}
              title="Device Category"
              description="Traffic by device type"
              dataKey="value"
              nameKey="name"
              colors={["#15803d", "#4ade80", "#86efac"]}
            />
            <AnalyticsBarChart
              data={browserData}
              title="Top Browsers"
              description="Users by browser"
              dataKeys={[{ key: "users", name: "Users", color: "#15803d" }]}
            />
            <AnalyticsBarChart
              data={sourceData}
              title="Traffic Sources"
              description="Users by traffic source"
              dataKeys={[{ key: "users", name: "Users", color: "#15803d" }]}
            />
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Users"
              value={users.toLocaleString()}
              description="Unique visitors"
              icon={Users}
              trend={{ value: 8.3, isPositive: true }}
            />
            <StatsCard
              title="New Users"
              value={(users * 0.65).toLocaleString()}
              description="First-time visitors"
              icon={Users}
              trend={{ value: 12.1, isPositive: true }}
            />
            <StatsCard
              title="Sessions per User"
              value="1.8"
              description="Average sessions per user"
              icon={MousePointerClick}
              trend={{ value: 3.5, isPositive: true }}
            />
            <StatsCard
              title="Pages per Session"
              value="3.2"
              description="Average pages viewed"
              icon={Eye}
              trend={{ value: 1.2, isPositive: true }}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <AnalyticsBarChart
              data={countryData}
              title="Top Countries"
              description="Users by country"
              dataKeys={[{ key: "users", name: "Users", color: "#15803d" }]}
            />
            <Card>
              <CardHeader>
                <CardTitle>Demographics</CardTitle>
                <CardDescription>User age and gender distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">
                  Demographics data visualization will be displayed here
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <AnalyticsPieChart
              data={deviceData}
              title="Device Category"
              description="Traffic by device type"
              dataKey="value"
              nameKey="name"
              colors={["#15803d", "#4ade80", "#86efac"]}
            />
            <Card>
              <CardHeader>
                <CardTitle>Mobile Devices</CardTitle>
                <CardDescription>Top mobile devices used</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "iPhone", model: "iPhone 13", percentage: "28%" },
                    { name: "Samsung", model: "Galaxy S21", percentage: "22%" },
                    { name: "iPhone", model: "iPhone 12", percentage: "15%" },
                    { name: "Xiaomi", model: "Redmi Note 10", percentage: "8%" },
                    { name: "Samsung", model: "Galaxy A52", percentage: "7%" },
                  ].map((device, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                        <Smartphone className="h-4 w-4 text-green-700 dark:text-green-300" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{device.name}</p>
                        <p className="text-sm text-muted-foreground">{device.model}</p>
                      </div>
                      <div className="text-sm font-medium">{device.percentage}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Browsers</CardTitle>
                <CardDescription>Top browsers used</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Chrome", version: "91.0.4472", percentage: "52%" },
                    { name: "Safari", version: "14.1.2", percentage: "21%" },
                    { name: "Firefox", version: "89.0", percentage: "13%" },
                    { name: "Edge", version: "91.0.864", percentage: "9%" },
                    { name: "Opera", version: "77.0.4054", percentage: "5%" },
                  ].map((browser, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                        <Globe className="h-4 w-4 text-green-700 dark:text-green-300" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{browser.name}</p>
                        <p className="text-sm text-muted-foreground">{browser.version}</p>
                      </div>
                      <div className="text-sm font-medium">{browser.percentage}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="acquisition" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Organic Traffic"
              value={(users * 0.45).toLocaleString()}
              description="From search engines"
              icon={Globe}
              trend={{ value: 15.3, isPositive: true }}
            />
            <StatsCard
              title="Direct Traffic"
              value={(users * 0.32).toLocaleString()}
              description="Direct visits"
              icon={MousePointerClick}
              trend={{ value: 5.7, isPositive: true }}
            />
            <StatsCard
              title="Referral Traffic"
              value={(users * 0.15).toLocaleString()}
              description="From other websites"
              icon={Globe}
              trend={{ value: 8.2, isPositive: true }}
            />
            <StatsCard
              title="Social Traffic"
              value={(users * 0.08).toLocaleString()}
              description="From social media"
              icon={Users}
              trend={{ value: 12.5, isPositive: true }}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <AnalyticsBarChart
              data={sourceData}
              title="Traffic Sources"
              description="Users by traffic source"
              dataKeys={[{ key: "users", name: "Users", color: "#15803d" }]}
            />
            <Card>
              <CardHeader>
                <CardTitle>Top Referrers</CardTitle>
                <CardDescription>Websites sending traffic to you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "google.com", visits: "3,245", percentage: "42%" },
                    { name: "facebook.com", visits: "1,876", percentage: "24%" },
                    { name: "twitter.com", visits: "982", percentage: "13%" },
                    { name: "linkedin.com", visits: "754", percentage: "10%" },
                    { name: "instagram.com", visits: "521", percentage: "7%" },
                  ].map((referrer, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                        <Globe className="h-4 w-4 text-green-700 dark:text-green-300" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{referrer.name}</p>
                        <p className="text-sm text-muted-foreground">{referrer.visits} visits</p>
                      </div>
                      <div className="text-sm font-medium">{referrer.percentage}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Search Keywords</CardTitle>
              <CardDescription>Top keywords driving traffic to your site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-muted-foreground py-8">
                  <p>Keyword data is limited due to privacy restrictions in Google Analytics.</p>
                  <p>Consider using Google Search Console for more detailed keyword data.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Page Views"
              value={pageviews.toLocaleString()}
              description="Total page views"
              icon={Eye}
              trend={{ value: 12.5, isPositive: true }}
            />
            <StatsCard
              title="Pages / Session"
              value="3.2"
              description="Average pages per session"
              icon={Eye}
              trend={{ value: 1.2, isPositive: true }}
            />
            <StatsCard
              title="Avg. Time on Page"
              value="1m 45s"
              description="Average time spent on a page"
              icon={Clock}
              trend={{ value: 5.3, isPositive: true }}
            />
            <StatsCard
              title="Bounce Rate"
              value={bounceRate}
              description="Single page sessions"
              icon={ArrowUpDown}
              trend={{ value: 2.1, isPositive: false }}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most viewed pages on your website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { path: "/", title: "Home", views: "12,345", percentage: "28%" },
                    { path: "/about", title: "About Us", views: "8,765", percentage: "20%" },
                    { path: "/services", title: "Services", views: "6,543", percentage: "15%" },
                    { path: "/projects", title: "Projects", views: "4,321", percentage: "10%" },
                    { path: "/contact", title: "Contact", views: "3,210", percentage: "7%" },
                  ].map((page, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                        <Eye className="h-4 w-4 text-green-700 dark:text-green-300" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{page.title}</p>
                        <p className="text-sm text-muted-foreground">{page.path}</p>
                      </div>
                      <div className="text-sm font-medium">{page.views}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Exit Pages</CardTitle>
                <CardDescription>Pages where users leave your website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { path: "/contact", title: "Contact", exits: "4,567", percentage: "25%" },
                    { path: "/projects", title: "Projects", exits: "3,456", percentage: "19%" },
                    { path: "/", title: "Home", exits: "2,345", percentage: "13%" },
                    { path: "/services", title: "Services", exits: "1,987", percentage: "11%" },
                    { path: "/about", title: "About Us", exits: "1,654", percentage: "9%" },
                  ].map((page, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                        <ArrowUpDown className="h-4 w-4 text-green-700 dark:text-green-300" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{page.title}</p>
                        <p className="text-sm text-muted-foreground">{page.path}</p>
                      </div>
                      <div className="text-sm font-medium">{page.exits}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Page Load Time</CardTitle>
              <CardDescription>Average page load time by page</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <AnalyticsBarChart
                  data={[
                    { name: "Home", loadTime: 1.2 },
                    { name: "About Us", loadTime: 1.5 },
                    { name: "Services", loadTime: 1.8 },
                    { name: "Projects", loadTime: 2.1 },
                    { name: "Contact", loadTime: 1.3 },
                  ]}
                  title=""
                  dataKeys={[{ key: "loadTime", name: "Load Time (seconds)", color: "#15803d" }]}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Conversion Rate"
              value="3.2%"
              description="Overall conversion rate"
              icon={MousePointerClick}
              trend={{ value: 0.5, isPositive: true }}
            />
            <StatsCard
              title="Goal Completions"
              value="1,234"
              description="Total goal completions"
              icon={MousePointerClick}
              trend={{ value: 12.3, isPositive: true }}
            />
            <StatsCard
              title="Abandonment Rate"
              value="68.5%"
              description="Form abandonment rate"
              icon={ArrowUpDown}
              trend={{ value: 2.1, isPositive: false }}
            />
            <StatsCard
              title="Avg. Value"
              value="$45.67"
              description="Average conversion value"
              icon={Users}
              trend={{ value: 5.4, isPositive: true }}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Conversion by Goal</CardTitle>
                <CardDescription>Completion rate by goal type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <AnalyticsBarChart
                    data={[
                      { name: "Contact Form", completions: 567, rate: 4.2 },
                      { name: "Newsletter Signup", completions: 432, rate: 3.8 },
                      { name: "Project Inquiry", completions: 321, rate: 2.9 },
                      { name: "Download Brochure", completions: 289, rate: 2.5 },
                      { name: "Request Quote", completions: 156, rate: 1.8 },
                    ]}
                    title=""
                    dataKeys={[{ key: "rate", name: "Conversion Rate (%)", color: "#15803d" }]}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Conversion by Source</CardTitle>
                <CardDescription>Conversion rate by traffic source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <AnalyticsBarChart
                    data={[
                      { name: "Organic Search", rate: 3.8 },
                      { name: "Direct", rate: 4.2 },
                      { name: "Referral", rate: 2.9 },
                      { name: "Social", rate: 2.1 },
                      { name: "Email", rate: 5.3 },
                    ]}
                    title=""
                    dataKeys={[{ key: "rate", name: "Conversion Rate (%)", color: "#15803d" }]}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Goal Funnel Visualization</CardTitle>
              <CardDescription>Visualize user flow through conversion funnel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full flex items-center justify-center text-muted-foreground">
                <p>Funnel visualization will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
