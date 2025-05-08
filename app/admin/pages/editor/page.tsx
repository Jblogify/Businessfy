"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Eye, ImageIcon, Save } from "lucide-react"
import Link from "next/link"

export default function PageEditor() {
  const [title, setTitle] = useState("About Us")
  const [slug, setSlug] = useState("/about")
  const [content, setContent] = useState(`
# About Jalal Nasser

Founded in 1995, Jalal Nasser has grown to become one of the most respected companies in Saudi Arabia. With a commitment to excellence and innovation, we have successfully completed numerous projects across the Kingdom.

## Our Mission

Our mission is to deliver high-quality services that meet the unique needs of our clients. We pride ourselves on our ability to combine traditional values with modern approaches.

## Our Vision

To be the leading company in our field, recognized for our excellence, innovation, and commitment to sustainable development.

## Our Values

- Excellence
- Integrity
- Innovation
- Teamwork
- Sustainability
  `)
  const [status, setStatus] = useState("published")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/pages">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Edit Page</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button className="bg-green-700 hover:bg-green-800">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <Label htmlFor="title" className="mb-2 block">
                  Page Title
                </Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mb-2" />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Permalink:</span>
                  <Input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-auto flex-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="content" className="mb-2 block">
                  Content
                </Label>
                <Tabs defaultValue="write">
                  <TabsList className="mb-2">
                    <TabsTrigger value="write">Write</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="write">
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="min-h-[400px] font-mono"
                    />
                  </TabsContent>
                  <TabsContent value="preview">
                    <div className="min-h-[400px] rounded-md border p-4">
                      <div className="prose max-w-none dark:prose-invert">
                        <h1>About Jalal Nasser</h1>
                        <p>
                          Founded in 1995, Jalal Nasser has grown to become one of the most respected companies in Saudi
                          Arabia. With a commitment to excellence and innovation, we have successfully completed
                          numerous projects across the Kingdom.
                        </p>
                        <h2>Our Mission</h2>
                        <p>
                          Our mission is to deliver high-quality services that meet the unique needs of our clients. We
                          pride ourselves on our ability to combine traditional values with modern approaches.
                        </p>
                        <h2>Our Vision</h2>
                        <p>
                          To be the leading company in our field, recognized for our excellence, innovation, and
                          commitment to sustainable development.
                        </p>
                        <h2>Our Values</h2>
                        <ul>
                          <li>Excellence</li>
                          <li>Integrity</li>
                          <li>Innovation</li>
                          <li>Teamwork</li>
                          <li>Sustainability</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="status" className="mb-2 block">
                    Status
                  </Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-2 block">Featured Image</Label>
                  <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-4">
                    <ImageIcon className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      Drag and drop an image here, or click to select a file
                    </p>
                    <Button variant="outline" size="sm">
                      Select Image
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="meta-title" className="mb-2 block">
                    Meta Title
                  </Label>
                  <Input id="meta-title" className="mb-2" />
                  <Label htmlFor="meta-description" className="mb-2 block">
                    Meta Description
                  </Label>
                  <Textarea id="meta-description" className="h-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
