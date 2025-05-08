"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash } from "lucide-react"

// Sample data
const initialPages = [
  {
    id: 1,
    title: "Home",
    slug: "/",
    status: "Published",
    lastUpdated: "2023-05-10",
  },
  {
    id: 2,
    title: "About Us",
    slug: "/about",
    status: "Published",
    lastUpdated: "2023-05-08",
  },
  {
    id: 3,
    title: "Services",
    slug: "/services",
    status: "Published",
    lastUpdated: "2023-05-05",
  },
  {
    id: 4,
    title: "Projects",
    slug: "/projects",
    status: "Published",
    lastUpdated: "2023-05-03",
  },
  {
    id: 5,
    title: "News",
    slug: "/news",
    status: "Published",
    lastUpdated: "2023-04-28",
  },
  {
    id: 6,
    title: "Careers",
    slug: "/careers",
    status: "Published",
    lastUpdated: "2023-04-25",
  },
  {
    id: 7,
    title: "Contact",
    slug: "/contact",
    status: "Published",
    lastUpdated: "2023-04-20",
  },
  {
    id: 8,
    title: "Privacy Policy",
    slug: "/privacy-policy",
    status: "Draft",
    lastUpdated: "2023-04-15",
  },
]

export default function PagesAdmin() {
  const [pages, setPages] = useState(initialPages)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPages = pages.filter((page) => page.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleDelete = (id: number) => {
    setPages(pages.filter((page) => page.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pages</h1>
          <p className="text-muted-foreground">Manage your website pages</p>
        </div>
        <Button className="bg-green-700 hover:bg-green-800">
          <Plus className="mr-2 h-4 w-4" />
          Add New Page
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Pages</CardTitle>
          <CardDescription>View and manage all pages on your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search pages..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No pages found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>{page.slug}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          page.status === "Published"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}
                      >
                        {page.status}
                      </span>
                    </TableCell>
                    <TableCell>{page.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 dark:text-red-400"
                            onClick={() => handleDelete(page.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
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
        </CardContent>
      </Card>
    </div>
  )
}
