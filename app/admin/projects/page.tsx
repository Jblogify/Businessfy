"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import {
  ArrowUpDown,
  ChevronDown,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Pencil,
} from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

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
    featured: true,
  },
  {
    id: 2,
    title: "Jeddah Tower",
    location: "Jeddah",
    category: "Skyscraper",
    value: "$1.2 Billion",
    status: "In Progress",
    date: "2023-06-20",
    featured: true,
  },
  {
    id: 3,
    title: "Riyadh Metro",
    location: "Riyadh",
    category: "Infrastructure",
    value: "$22.5 Billion",
    status: "In Progress",
    date: "2023-04-10",
    featured: false,
  },
  {
    id: 4,
    title: "Qiddiya Entertainment City",
    location: "Riyadh",
    category: "Entertainment",
    value: "$8 Billion",
    status: "In Progress",
    date: "2023-07-05",
    featured: true,
  },
  {
    id: 5,
    title: "Red Sea Project",
    location: "Red Sea Coast",
    category: "Tourism",
    value: "$10 Billion",
    status: "In Progress",
    date: "2023-03-25",
    featured: true,
  },
  {
    id: 6,
    title: "Neom City",
    location: "Tabuk Province",
    category: "Smart City",
    value: "$500 Billion",
    status: "In Progress",
    date: "2023-08-12",
    featured: true,
  },
  {
    id: 7,
    title: "Diriyah Gate",
    location: "Riyadh",
    category: "Cultural",
    value: "$17 Billion",
    status: "In Progress",
    date: "2023-02-18",
    featured: false,
  },
  {
    id: 8,
    title: "Amaala",
    location: "Red Sea Coast",
    category: "Tourism",
    value: "$7 Billion",
    status: "In Progress",
    date: "2023-09-30",
    featured: false,
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

export default function ProjectsAdminPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedProjects, setSelectedProjects] = useState<number[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null)
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false)

  // Filter projects based on search term and filters
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || project.category.toLowerCase() === selectedCategory
    const matchesLocation = selectedLocation === "all" || project.location.toLowerCase() === selectedLocation
    const matchesStatus = selectedStatus === "all" || project.status.toLowerCase().replace(" ", "-") === selectedStatus
    const matchesFeatured = !showFeaturedOnly || project.featured

    return matchesSearch && matchesCategory && matchesLocation && matchesStatus && matchesFeatured
  })

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "title") {
      return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    } else if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === "value") {
      const aValue = Number.parseFloat(a.value.replace(/[^0-9.]/g, ""))
      const bValue = Number.parseFloat(b.value.replace(/[^0-9.]/g, ""))
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue
    }
    return 0
  })

  // Paginate projects
  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage)
  const paginatedProjects = sortedProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handle sort
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedProjects.length === paginatedProjects.length) {
      setSelectedProjects([])
    } else {
      setSelectedProjects(paginatedProjects.map((project) => project.id))
    }
  }

  // Handle select project
  const handleSelectProject = (id: number) => {
    if (selectedProjects.includes(id)) {
      setSelectedProjects(selectedProjects.filter((projectId) => projectId !== id))
    } else {
      setSelectedProjects([...selectedProjects, id])
    }
  }

  // Handle delete project
  const handleDeleteProject = (id: number) => {
    setProjectToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  // Confirm delete project
  const confirmDeleteProject = () => {
    // In a real app, you would call an API to delete the project
    console.log(`Deleting project ${projectToDelete}`)
    setIsDeleteDialogOpen(false)
    setProjectToDelete(null)
    // Refresh the projects list
    // router.refresh()
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedProjects.length > 0) {
      setIsBulkDeleteDialogOpen(true)
    }
  }

  // Confirm bulk delete
  const confirmBulkDelete = () => {
    // In a real app, you would call an API to delete the projects
    console.log(`Deleting projects ${selectedProjects.join(", ")}`)
    setIsBulkDeleteDialogOpen(false)
    setSelectedProjects([])
    // Refresh the projects list
    // router.refresh()
  }

  // Export projects
  const handleExport = () => {
    // In a real app, you would generate a CSV or Excel file
    console.log("Exporting projects")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your projects here.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild className="bg-green-700 hover:bg-green-800">
            <Link href="/admin/projects/edit/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Projects</CardTitle>
              <CardDescription>You have {projects.length} projects in total.</CardDescription>
            </div>
            {selectedProjects.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{selectedProjects.length} selected</span>
                <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected
                </Button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 pt-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <div className="mb-2">
                      <label className="text-xs font-medium">Category</label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select category" />
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
                    <div className="mb-2">
                      <label className="text-xs font-medium">Location</label>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select location" />
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
                    <div className="mb-2">
                      <label className="text-xs font-medium">Status</label>
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select status" />
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
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={showFeaturedOnly}
                        onCheckedChange={(checked) => setShowFeaturedOnly(checked as boolean)}
                      />
                      <label
                        htmlFor="featured"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Featured only
                      </label>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => setItemsPerPage(Number.parseInt(value))}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="10 per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 per page</SelectItem>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="20">20 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={paginatedProjects.length > 0 && selectedProjects.length === paginatedProjects.length}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                    <div className="flex items-center">
                      Title
                      {sortBy === "title" && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortOrder === "asc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("value")}>
                    <div className="flex items-center">
                      Value
                      {sortBy === "value" && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortOrder === "asc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                    <div className="flex items-center">
                      Date
                      {sortBy === "date" && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortOrder === "asc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No projects found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProjects.includes(project.id)}
                          onCheckedChange={() => handleSelectProject(project.id)}
                          aria-label={`Select project ${project.title}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>{project.category}</TableCell>
                      <TableCell>{project.location}</TableCell>
                      <TableCell>{project.value}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            project.status === "Completed"
                              ? "border-green-200 bg-green-100 text-green-800"
                              : "border-blue-200 bg-blue-100 text-blue-800"
                          }
                        >
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(new Date(project.date), "MMM dd, yyyy")}</TableCell>
                      <TableCell>
                        {project.featured ? (
                          <Badge variant="default" className="bg-amber-500">
                            Featured
                          </Badge>
                        ) : (
                          <Badge variant="outline">No</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/projects/edit/${project.id}`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/projects/${project.id}`} target="_blank">
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProject(project.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink isActive={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

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
            <Button variant="destructive" onClick={confirmDeleteProject}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Delete Dialog */}
      <Dialog open={isBulkDeleteDialogOpen} onOpenChange={setIsBulkDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Projects</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedProjects.length} projects? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBulkDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmBulkDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
