"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Trash2, Save, Eye, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from "next/image"
import { ProjectCategorySelector } from "@/components/admin/projects/project-category-selector"
import { ProjectMediaManager } from "@/components/admin/projects/project-media-manager"
import { ProjectRelatedSelector } from "@/components/admin/projects/project-related-selector"

// Sample project data
const projects = [
  {
    id: 1,
    title: "King Abdullah Financial District",
    location: "Riyadh",
    category: "Commercial",
    value: "$2.5 Billion",
    status: "Completed",
    date: "2023-05-15",
    completionDate: "2022-12-10",
    client: "Public Investment Fund",
    area: "1.6 million square meters",
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description:
      "A major financial hub in Riyadh featuring modern architecture and sustainable design principles. The King Abdullah Financial District (KAFD) is a key component of Saudi Arabia's Vision 2030, designed to diversify the economy and reduce dependence on oil revenues.",
    features: [
      "State-of-the-art office spaces",
      "Sustainable design with LEED certification",
      "Integrated transportation network",
      "Smart building technology",
      "Mixed-use development with residential and retail spaces",
      "Cultural and entertainment venues",
    ],
    overview:
      "The King Abdullah Financial District (KAFD) is a major business and financial center located in Riyadh, Saudi Arabia. Covering an area of 1.6 million square meters, it is designed to be a sustainable, mixed-use development that will house the headquarters of the Capital Market Authority, the Saudi Stock Exchange (Tadawul), and various financial institutions and multinational corporations. The district features a distinctive architectural style that blends modern design with elements inspired by traditional Saudi culture.",
    challenges:
      "The project faced several challenges during its development, including the need to create a sustainable urban environment in a desert climate, integrating advanced technology systems, and ensuring connectivity with the broader urban infrastructure of Riyadh. These challenges were addressed through innovative design solutions, collaboration with international experts, and a commitment to sustainability principles.",
    results:
      "The completed district has become a landmark in Riyadh's urban landscape, providing a world-class business environment that attracts both local and international companies. The project has contributed to the city's economic development and helped position Saudi Arabia as a regional financial hub. The district's sustainable features have set new standards for green building in the region.",
    relatedProjects: [2, 3, 5],
    featured: true,
    published: true,
  },
  {
    id: 2,
    title: "Jeddah Tower",
    location: "Jeddah",
    category: "Skyscraper",
    value: "$1.2 Billion",
    status: "In Progress",
    date: "2023-06-20",
    completionDate: "2025-12-31",
    client: "Jeddah Economic Company",
    area: "243,866 square meters",
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description: "An iconic skyscraper set to be one of the tallest buildings in the world upon completion.",
    features: [
      "Mixed-use development with residential, hotel, and commercial spaces",
      "Observation deck with panoramic views",
      "Advanced elevator systems",
      "Sustainable design features",
      "Wind resistance technology",
      "Smart building management systems",
    ],
    overview:
      "The Jeddah Tower, previously known as Kingdom Tower, is a skyscraper under construction in Jeddah, Saudi Arabia. Upon completion, it is planned to be the world's first 1 km high building, standing as a new world's tallest building and an engineering marvel. The tower will feature a luxury hotel, office space, serviced apartments, luxury condominiums, and the world's highest observatory.",
    challenges:
      "Building a structure of this height presents numerous engineering challenges, including wind resistance, foundation stability, elevator design, and material selection. The project team has implemented innovative solutions to address these challenges, including a high-performance exterior wall system, a three-legged tapering design to reduce wind loads, and high-strength concrete formulations.",
    results:
      "While still under construction, the Jeddah Tower has already become a symbol of Saudi Arabia's ambition and technological capability. The project is expected to stimulate economic growth in the Jeddah area and serve as a catalyst for the development of the Jeddah Economic City, a new urban area planned around the tower.",
    relatedProjects: [1, 3, 6],
    featured: true,
    published: true,
  },
]

// Categories for filtering
const categories = [
  { value: "commercial", label: "Commercial" },
  { value: "skyscraper", label: "Skyscraper" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "entertainment", label: "Entertainment" },
  { value: "tourism", label: "Tourism" },
  { value: "smart-city", label: "Smart City" },
  { value: "cultural", label: "Cultural" },
]

// Locations for filtering
const locations = [
  { value: "riyadh", label: "Riyadh" },
  { value: "jeddah", label: "Jeddah" },
  { value: "red-sea-coast", label: "Red Sea Coast" },
  { value: "tabuk-province", label: "Tabuk Province" },
]

// Statuses for filtering
const statuses = [
  { value: "completed", label: "Completed" },
  { value: "in-progress", label: "In Progress" },
]

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  location: z.string({
    required_error: "Please select a location.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  value: z.string().min(1, {
    message: "Value is required.",
  }),
  status: z.string({
    required_error: "Please select a status.",
  }),
  date: z.date({
    required_error: "Please select a start date.",
  }),
  completionDate: z.date({
    required_error: "Please select a completion date.",
  }),
  client: z.string().min(2, {
    message: "Client must be at least 2 characters.",
  }),
  area: z.string().min(1, {
    message: "Area is required.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  overview: z.string().min(10, {
    message: "Overview must be at least 10 characters.",
  }),
  challenges: z.string().min(10, {
    message: "Challenges must be at least 10 characters.",
  }),
  results: z.string().min(10, {
    message: "Results must be at least 10 characters.",
  }),
  features: z.array(z.string()).min(1, {
    message: "At least one feature is required.",
  }),
  relatedProjects: z.array(z.number()).optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
})

export default function ProjectEditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const isNew = params.id === "new"
  const projectId = isNew ? null : Number.parseInt(params.id)

  const [features, setFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState("")
  const [mainImage, setMainImage] = useState<string | null>(null)
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [relatedProjects, setRelatedProjects] = useState<number[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const [isSaveSuccessful, setIsSaveSuccessful] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isUnsavedChangesDialogOpen, setIsUnsavedChangesDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      category: "",
      value: "",
      status: "",
      client: "",
      area: "",
      description: "",
      overview: "",
      challenges: "",
      results: "",
      features: [],
      relatedProjects: [],
      featured: false,
      published: true,
    },
  })

  useEffect(() => {
    if (!isNew && projectId) {
      const project = projects.find((p) => p.id === projectId)
      if (project) {
        form.reset({
          title: project.title,
          location: project.location.toLowerCase().replace(" ", "-"),
          category: project.category.toLowerCase().replace(" ", "-"),
          value: project.value,
          status: project.status.toLowerCase().replace(" ", "-"),
          date: new Date(project.date),
          completionDate: new Date(project.completionDate),
          client: project.client,
          area: project.area,
          description: project.description,
          overview: project.overview,
          challenges: project.challenges,
          results: project.results,
          features: project.features,
          relatedProjects: project.relatedProjects,
          featured: project.featured,
          published: project.published,
        })
        setFeatures(project.features)
        setMainImage(project.image)
        setGalleryImages(project.gallery)
        setRelatedProjects(project.relatedProjects)
      }
    }

    // Listen for form changes to detect unsaved changes
    const subscription = form.watch(() => {
      setHasUnsavedChanges(true)
    })

    return () => subscription.unsubscribe()
  }, [isNew, projectId, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setIsSaveSuccessful(true)
      setHasUnsavedChanges(false)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setIsSaveSuccessful(false)
      }, 3000)
    }, 1500)
  }

  const handleDelete = () => {
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, you would call an API to delete the project
    console.log(`Deleting project ${projectId}`)
    setIsDeleteDialogOpen(false)
    router.push("/admin/projects")
  }

  const handlePreview = () => {
    setIsPreviewDialogOpen(true)
  }

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setIsUnsavedChangesDialogOpen(true)
    } else {
      router.push("/admin/projects")
    }
  }

  const confirmCancel = () => {
    setIsUnsavedChangesDialogOpen(false)
    router.push("/admin/projects")
  }

  const addFeature = () => {
    if (newFeature.trim() !== "") {
      const updatedFeatures = [...features, newFeature.trim()]
      setFeatures(updatedFeatures)
      form.setValue("features", updatedFeatures)
      setNewFeature("")
      setHasUnsavedChanges(true)
    }
  }

  const removeFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index)
    setFeatures(updatedFeatures)
    form.setValue("features", updatedFeatures)
    setHasUnsavedChanges(true)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "main" | "gallery") => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // In a real app, you would upload these files to your server or cloud storage
    // For this example, we'll just create object URLs
    if (type === "main") {
      setMainImage(URL.createObjectURL(files[0]))
    } else {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setGalleryImages([...galleryImages, ...newImages])
    }
    setHasUnsavedChanges(true)
  }

  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index))
    setHasUnsavedChanges(true)
  }

  const handleRelatedProjectsChange = (selectedProjects: number[]) => {
    setRelatedProjects(selectedProjects)
    form.setValue("relatedProjects", selectedProjects)
    setHasUnsavedChanges(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/projects">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{isNew ? "Add New Project" : "Edit Project"}</h1>
            <p className="text-muted-foreground">{isNew ? "Create a new project" : "Update project information"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {!isNew && (
            <>
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </>
          )}
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" form="project-form" className="bg-green-700 hover:bg-green-800" disabled={isSubmitting}>
            {isSubmitting ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isNew ? "Create Project" : "Save Changes"}
              </>
            )}
          </Button>
        </div>
      </div>

      {isSaveSuccessful && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Project has been {isNew ? "created" : "updated"} successfully.</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form id="project-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="related">Related Projects</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the basic details of the project.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter project title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="client"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter client name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <ProjectCategorySelector value={field.value} onChange={field.onChange} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a location" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {locations.map((location) => (
                                <SelectItem key={location.value} value={location.value}>
                                  {location.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Value</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. $10 Million" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Area</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 10,000 square meters" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {statuses.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="completionDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Completion Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a brief description of the project"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>This will be displayed on the project card.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Content</CardTitle>
                  <CardDescription>Add detailed information about the project.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="overview"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Overview</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a detailed overview of the project"
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="challenges"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Challenges</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the challenges faced during the project"
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="results"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Results</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the results and outcomes of the project"
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="features"
                    render={() => (
                      <FormItem>
                        <FormLabel>Key Features</FormLabel>
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add a key feature"
                              value={newFeature}
                              onChange={(e) => setNewFeature(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault()
                                  addFeature()
                                }
                              }}
                            />
                            <Button type="button" onClick={addFeature}>
                              Add
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {features.map((feature, index) => (
                              <div key={index} className="flex items-center justify-between rounded-md border p-3">
                                <span>{feature}</span>
                                <Button type="button" variant="ghost" size="sm" onClick={() => removeFeature(index)}>
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                  <span className="sr-only">Remove</span>
                                </Button>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
                  <CardDescription>Upload images for the project.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ProjectMediaManager
                    mainImage={mainImage}
                    galleryImages={galleryImages}
                    onMainImageChange={(image) => {
                      setMainImage(image)
                      setHasUnsavedChanges(true)
                    }}
                    onGalleryImagesChange={(images) => {
                      setGalleryImages(images)
                      setHasUnsavedChanges(true)
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="related" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Related Projects</CardTitle>
                  <CardDescription>Select projects that are related to this one.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectRelatedSelector
                    selectedProjects={relatedProjects}
                    onChange={handleRelatedProjectsChange}
                    currentProjectId={projectId}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Configure project settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Featured Project</FormLabel>
                          <FormDescription>
                            Featured projects will be displayed prominently on the website.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Published</FormLabel>
                          <FormDescription>
                            Published projects are visible on the website. Unpublished projects are only visible in the
                            admin dashboard.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </Form>

      {/* Delete Project Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Project Preview</DialogTitle>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto">
            <div className="space-y-4">
              <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
                <Image
                  src={mainImage || "/placeholder.svg"}
                  alt={form.getValues("title")}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <Badge className="mb-2 bg-green-700">{form.getValues("category")}</Badge>
                  <h2 className="text-3xl font-bold">{form.getValues("title")}</h2>
                  <p className="text-sm opacity-90">{form.getValues("location")}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="col-span-2 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold">Overview</h3>
                    <p className="mt-2 text-muted-foreground">{form.getValues("overview")}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">Challenges</h3>
                    <p className="mt-2 text-muted-foreground">{form.getValues("challenges")}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">Results</h3>
                    <p className="mt-2 text-muted-foreground">{form.getValues("results")}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">Gallery</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      {galleryImages.map((image, index) => (
                        <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-4 text-lg font-bold">Project Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Client:</span>
                        <span>{form.getValues("client")}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Location:</span>
                        <span>{form.getValues("location")}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Value:</span>
                        <span>{form.getValues("value")}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Area:</span>
                        <span>{form.getValues("area")}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Status:</span>
                        <span>{form.getValues("status")}</span>
                      </div>
                    </div>

                    <h3 className="mb-2 mt-6 text-lg font-bold">Key Features</h3>
                    <ul className="space-y-2">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-green-700">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsPreviewDialogOpen(false)}>Close Preview</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unsaved Changes Dialog */}
      <Dialog open={isUnsavedChangesDialogOpen} onOpenChange={setIsUnsavedChangesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Are you sure you want to leave this page? Your changes will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUnsavedChangesDialogOpen(false)}>
              Continue Editing
            </Button>
            <Button variant="destructive" onClick={confirmCancel}>
              Discard Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
