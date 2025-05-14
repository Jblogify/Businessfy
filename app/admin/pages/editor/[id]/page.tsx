"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { PageEditor } from "@/components/admin/pages/page-editor"
import { PageSeo } from "@/components/admin/pages/page-seo"
import { PageSettings } from "@/components/admin/pages/page-settings"
import { ArrowLeft, Save } from "lucide-react"

// Sample data for a page
const samplePage = {
  id: 1,
  title: "About Us",
  slug: "/about",
  content:
    "<h1>About Our Company</h1><p>Welcome to our company page. We are dedicated to providing the best service to our customers.</p><h2>Our Mission</h2><p>Our mission is to deliver high-quality products and exceptional service.</p><h2>Our Team</h2><p>We have a team of experienced professionals who are passionate about what they do.</p>",
  seo: {
    title: "About Us | Company Name",
    description: "Learn about our company, our mission, and our team.",
    keywords: "company, about us, mission, team",
  },
  settings: {
    status: "Published",
    visibility: "Public",
    publishDate: "2023-05-08",
    template: "Default",
    parentPage: null,
    order: 2,
  },
}

export default function PageEditorPage({ params }) {
  const { id } = params
  const isNew = id === "new"
  const [page, setPage] = useState(
    isNew
      ? {
          id: "new",
          title: "",
          slug: "",
          content: "",
          seo: {
            title: "",
            description: "",
            keywords: "",
          },
          settings: {
            status: "Draft",
            visibility: "Public",
            publishDate: new Date().toISOString().split("T")[0],
            template: "Default",
            parentPage: null,
            order: 999,
          },
        }
      : null,
  )
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("content")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isNew) {
      // In a real app, fetch the page data from an API
      // For now, we'll just use the sample data
      setPage(samplePage)
    }
  }, [isNew])

  const handleTitleChange = (e) => {
    setPage({
      ...page,
      title: e.target.value,
      seo: {
        ...page.seo,
        title: e.target.value ? `${e.target.value} | Company Name` : "",
      },
    })
  }

  const handleSlugChange = (e) => {
    setPage({
      ...page,
      slug: e.target.value.startsWith("/") ? e.target.value : `/${e.target.value}`,
    })
  }

  const handleContentChange = (content) => {
    setPage({
      ...page,
      content,
    })
  }

  const handleSeoChange = (seo) => {
    setPage({
      ...page,
      seo,
    })
  }

  const handleSettingsChange = (settings) => {
    setPage({
      ...page,
      settings,
    })
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, this would save to a database
    console.log("Saving page:", page)

    setIsSaving(false)

    toast({
      title: "Page saved",
      description: `The page "${page.title}" has been saved.`,
    })

    if (isNew) {
      router.push("/admin/pages")
    }
  }

  if (!page) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin/pages")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{isNew ? "Create New Page" : "Edit Page"}</h1>
            <p className="text-muted-foreground">
              {isNew ? "Create a new page for your website" : `Editing "${page.title}"`}
            </p>
          </div>
        </div>
        <Button
          onClick={handleSave}
          className="bg-business-600 hover:bg-business-700"
          disabled={isSaving || !page.title}
        >
          {isSaving ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Page
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Page Details</CardTitle>
          <CardDescription>Enter the basic information for this page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Page Title</Label>
              <Input id="title" placeholder="Enter page title" value={page.title} onChange={handleTitleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Page URL</Label>
              <Input id="slug" placeholder="/page-url" value={page.slug} onChange={handleSlugChange} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Page Content</CardTitle>
              <CardDescription>Edit the content of your page</CardDescription>
            </CardHeader>
            <CardContent>
              <PageEditor content={page.content} onChange={handleContentChange} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="seo" className="mt-4">
          <PageSeo seo={page.seo} onChange={handleSeoChange} />
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
          <PageSettings settings={page.settings} onChange={handleSettingsChange} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
