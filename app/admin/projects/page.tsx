import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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
  },
  {
    id: 2,
    title: "Jeddah Tower",
    location: "Jeddah",
    category: "Skyscraper",
    value: "$1.2 Billion",
    status: "In Progress",
    date: "2023-06-20",
  },
  {
    id: 3,
    title: "Riyadh Metro",
    location: "Riyadh",
    category: "Infrastructure",
    value: "$22.5 Billion",
    status: "In Progress",
    date: "2023-04-10",
  },
  {
    id: 4,
    title: "Qiddiya Entertainment City",
    location: "Riyadh",
    category: "Entertainment",
    value: "$8 Billion",
    status: "In Progress",
    date: "2023-07-05",
  },
  {
    id: 5,
    title: "Red Sea Project",
    location: "Red Sea Coast",
    category: "Tourism",
    value: "$10 Billion",
    status: "In Progress",
    date: "2023-03-25",
  },
]

export default function ProjectsAdminPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your projects here.</p>
        </div>
        <Button asChild className="bg-green-700 hover:bg-green-800">
          <Link href="/admin/projects/edit/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Projects</CardTitle>
          <CardDescription>You have {projects.length} projects in total.</CardDescription>
          <div className="flex items-center gap-2 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search projects..." className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
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
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm" className="mr-2">
                      <Link href={`/admin/projects/edit/${project.id}`}>Edit</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
