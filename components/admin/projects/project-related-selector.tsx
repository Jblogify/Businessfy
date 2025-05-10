"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"

// Sample project data
const projects = [
  {
    id: 1,
    title: "King Abdullah Financial District",
    location: "Riyadh",
    category: "Commercial",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "Jeddah Tower",
    location: "Jeddah",
    category: "Skyscraper",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "Riyadh Metro",
    location: "Riyadh",
    category: "Infrastructure",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    title: "Qiddiya Entertainment City",
    location: "Riyadh",
    category: "Entertainment",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    title: "Red Sea Project",
    location: "Red Sea Coast",
    category: "Tourism",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 6,
    title: "Neom City",
    location: "Tabuk Province",
    category: "Smart City",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 7,
    title: "Diriyah Gate",
    location: "Riyadh",
    category: "Cultural",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 8,
    title: "Amaala",
    location: "Red Sea Coast",
    category: "Tourism",
    image: "/placeholder.svg?height=300&width=400",
  },
]

interface ProjectRelatedSelectorProps {
  selectedProjects: number[]
  onChange: (selectedProjects: number[]) => void
  currentProjectId: number | null
}

export function ProjectRelatedSelector({ selectedProjects, onChange, currentProjectId }: ProjectRelatedSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [availableProjects, setAvailableProjects] = useState(projects)

  useEffect(() => {
    // Filter out the current project
    const filtered = projects.filter((project) => project.id !== currentProjectId)
    setAvailableProjects(filtered)
  }, [currentProjectId])

  const filteredProjects = availableProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleToggleProject = (projectId: number) => {
    if (selectedProjects.includes(projectId)) {
      onChange(selectedProjects.filter((id) => id !== projectId))
    } else {
      onChange([...selectedProjects, projectId])
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedProjects.map((id) => {
          const project = availableProjects.find((p) => p.id === id)
          if (!project) return null

          return (
            <Badge key={id} variant="secondary" className="px-3 py-1">
              {project.title}
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                onClick={() => handleToggleProject(id)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </Badge>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-1">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No projects found matching your search.
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50">
              <Checkbox
                id={`project-${project.id}`}
                checked={selectedProjects.includes(project.id)}
                onCheckedChange={() => handleToggleProject(project.id)}
              />
              <div className="relative h-12 w-12 overflow-hidden rounded">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <label htmlFor={`project-${project.id}`} className="block text-sm font-medium truncate cursor-pointer">
                  {project.title}
                </label>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{project.category}</span>
                  <span>•</span>
                  <span>{project.location}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
