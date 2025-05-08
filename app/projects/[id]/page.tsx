import { Card } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building, DollarSign, CheckCircle, ArrowLeft, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"

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
  },
]

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const projectId = Number.parseInt(params.id)
  const project = projects.find((p) => p.id === projectId) || projects[0]

  const relatedProjects = project.relatedProjects
    ? project.relatedProjects.map((id) => projects.find((p) => p.id === id)).filter(Boolean)
    : []

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          <div className="container relative z-20 flex h-full flex-col items-start justify-end pb-16">
            <Link href="/projects" className="mb-6 flex items-center text-white hover:text-green-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-green-700">{project.category}</Badge>
              <Badge variant="outline" className="text-white border-white">
                {project.status}
              </Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">{project.title}</h1>
            <div className="flex flex-wrap gap-6 text-white">
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-green-400" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center">
                <Building className="mr-2 h-4 w-4 text-green-400" />
                <span>{project.client}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-green-400" />
                <span>{project.value}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-green-400" />
                <span>{format(new Date(project.date), "MMM dd, yyyy")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Tabs defaultValue="overview" className="space-y-8">
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="challenges">Challenges</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4">
                    <h2 className="text-2xl font-bold">Project Overview</h2>
                    <p className="text-muted-foreground">{project.overview}</p>
                  </TabsContent>
                  <TabsContent value="challenges" className="space-y-4">
                    <h2 className="text-2xl font-bold">Challenges</h2>
                    <p className="text-muted-foreground">{project.challenges}</p>
                  </TabsContent>
                  <TabsContent value="results" className="space-y-4">
                    <h2 className="text-2xl font-bold">Results</h2>
                    <p className="text-muted-foreground">{project.results}</p>
                  </TabsContent>
                </Tabs>

                <div className="mt-12">
                  <h2 className="mb-6 text-2xl font-bold">Project Gallery</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.gallery.map((image, index) => (
                      <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${project.title} - Gallery image ${index + 1}`}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="mb-4 text-xl font-bold">Project Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Client:</span>
                      <span>{project.client}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Location:</span>
                      <span>{project.location}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Project Value:</span>
                      <span>{project.value}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Area:</span>
                      <span>{project.area}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Start Date:</span>
                      <span>{format(new Date(project.date), "MMM dd, yyyy")}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Completion Date:</span>
                      <span>{format(new Date(project.completionDate), "MMM dd, yyyy")}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="font-medium">Status:</span>
                      <span className={project.status === "Completed" ? "text-green-700" : "text-blue-700"}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="mb-4 text-xl font-bold">Key Features</h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-700 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <Button className="w-full bg-green-700 hover:bg-green-800">Request Information</Button>
                    <Button variant="outline" className="w-full">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Project
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container">
              <h2 className="mb-8 text-2xl font-bold">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject) => (
                  <Card key={relatedProject.id} className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative h-[200px]">
                      <Image
                        src={relatedProject.image || "/placeholder.svg"}
                        alt={relatedProject.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-semibold">{relatedProject.title}</h3>
                      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{relatedProject.description}</p>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/projects/${relatedProject.id}`}>View Project</Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
