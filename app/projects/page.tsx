import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Filter, Grid, List, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ProjectEditButton } from "@/components/admin/project-edit-button"

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
    image: "/placeholder.svg?height=300&width=400",
    description: "A major financial hub in Riyadh featuring modern architecture and sustainable design principles.",
  },
  {
    id: 2,
    title: "Jeddah Tower",
    location: "Jeddah",
    category: "Skyscraper",
    value: "$1.2 Billion",
    status: "In Progress",
    date: "2023-06-20",
    image: "/placeholder.svg?height=300&width=400",
    description: "An iconic skyscraper set to be one of the tallest buildings in the world upon completion.",
  },
  {
    id: 3,
    title: "Riyadh Metro",
    location: "Riyadh",
    category: "Infrastructure",
    value: "$22.5 Billion",
    status: "In Progress",
    date: "2023-04-10",
    image: "/placeholder.svg?height=300&width=400",
    description: "A comprehensive public transportation system to serve the growing population of Riyadh.",
  },
  {
    id: 4,
    title: "Qiddiya Entertainment City",
    location: "Riyadh",
    category: "Entertainment",
    value: "$8 Billion",
    status: "In Progress",
    date: "2023-07-05",
    image: "/placeholder.svg?height=300&width=400",
    description: "A major entertainment complex featuring theme parks, sports venues, and cultural attractions.",
  },
  {
    id: 5,
    title: "Red Sea Project",
    location: "Red Sea Coast",
    category: "Tourism",
    value: "$10 Billion",
    status: "In Progress",
    date: "2023-03-25",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "A luxury tourism destination along the Red Sea coast with a focus on sustainability and conservation.",
  },
  {
    id: 6,
    title: "Neom City",
    location: "Tabuk Province",
    category: "Smart City",
    value: "$500 Billion",
    status: "In Progress",
    date: "2023-08-12",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "A futuristic smart city being built from the ground up with cutting-edge technology and sustainability.",
  },
  {
    id: 7,
    title: "Diriyah Gate",
    location: "Riyadh",
    category: "Cultural",
    value: "$17 Billion",
    status: "In Progress",
    date: "2023-02-18",
    image: "/placeholder.svg?height=300&width=400",
    description: "A cultural and heritage project to restore and develop the historic Diriyah area.",
  },
  {
    id: 8,
    title: "Amaala",
    location: "Red Sea Coast",
    category: "Tourism",
    value: "$7 Billion",
    status: "In Progress",
    date: "2023-09-30",
    image: "/placeholder.svg?height=300&width=400",
    description: "An ultra-luxury wellness tourism destination along the northwestern coast of Saudi Arabia.",
  },
]

// Categories for filtering
const categories = [
  { value: "all", label: "All Categories" },
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
  { value: "all", label: "All Locations" },
  { value: "riyadh", label: "Riyadh" },
  { value: "jeddah", label: "Jeddah" },
  { value: "red-sea-coast", label: "Red Sea Coast" },
  { value: "tabuk-province", label: "Tabuk Province" },
]

// Statuses for filtering
const statuses = [
  { value: "all", label: "All Statuses" },
  { value: "completed", label: "Completed" },
  { value: "in-progress", label: "In Progress" },
]

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[300px] overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <Image
            src="/placeholder.svg?height=300&width=1920"
            alt="Projects"
            width={1920}
            height={300}
            className="object-cover w-full h-full"
          />
          <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center text-white">
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">Our Projects</h1>
            <p className="max-w-3xl text-lg">
              Explore our portfolio of innovative projects across Saudi Arabia, showcasing our expertise and commitment
              to excellence.
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-gray-50">
          <div className="container">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search projects..." className="pl-10" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                  <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none rounded-l-md">
                      <Grid className="h-4 w-4" />
                      <span className="sr-only">Grid view</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none rounded-r-md bg-muted">
                      <List className="h-4 w-4" />
                      <span className="sr-only">List view</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.value} value={location.value}>
                          {location.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Select date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Project Value Range</h3>
                  <span className="text-sm text-muted-foreground">$0 - $500B</span>
                </div>
                <Slider defaultValue={[0, 500]} max={500} step={10} />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12">
          <div className="container">
            <Tabs defaultValue="all" className="space-y-8">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="all">All Projects</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                </TabsList>
                <p className="text-sm text-muted-foreground">Showing {projects.length} projects</p>
              </div>

              <TabsContent value="all" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects
                    .filter((project) => project.status === "Completed")
                    .map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="in-progress" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects
                    .filter((project) => project.status === "In Progress")
                    .map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-12 flex justify-center">
              <Button variant="outline" className="mr-2">
                Previous
              </Button>
              <Button variant="outline" className="bg-green-700 text-white hover:bg-green-800">
                1
              </Button>
              <Button variant="outline" className="ml-2">
                Next
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        <div
          className={cn(
            "absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-xs font-semibold",
            project.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800",
          )}
        >
          {project.status}
        </div>
        <div className="relative h-[200px]">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        </div>
      </div>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{project.category}</span>
          <span className="text-sm font-medium text-green-700">{project.value}</span>
        </div>
        <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
        <div className="mb-4 flex items-center text-sm text-muted-foreground">
          <span>{project.location}</span>
          <span className="mx-2">•</span>
          <span>{format(new Date(project.date), "MMM dd, yyyy")}</span>
        </div>
        <p className="mb-4 text-muted-foreground">{project.description}</p>
        <div className="flex gap-2">
          <Button asChild className="flex-1 bg-green-700 hover:bg-green-800">
            <Link href={`/projects/${project.id}`}>View Details</Link>
          </Button>
          <ProjectEditButton projectId={project.id} />
        </div>
      </CardContent>
    </Card>
  )
}
