"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Download, Edit, Search, Trash, Upload, FolderPlus, Grid, List, X, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MediaUploader } from "@/components/admin/media/media-uploader"
import { MediaReplaceDialog } from "@/components/admin/media/media-replace-dialog"
import { MediaDetailsDialog } from "@/components/admin/media/media-details-dialog"
import { MediaRenameDialog } from "@/components/admin/media/media-rename-dialog"
import { MediaFolderDialog } from "@/components/admin/media/media-folder-dialog"

// Sample data
const initialFolders = [
  { id: 1, name: "Banners", count: 12 },
  { id: 2, name: "Projects", count: 24 },
  { id: 3, name: "Team", count: 8 },
  { id: 4, name: "Services", count: 15 },
  { id: 5, name: "Logos", count: 5 },
]

const initialTags = [
  { id: 1, name: "Hero", count: 8 },
  { id: 2, name: "Background", count: 14 },
  { id: 3, name: "Icon", count: 22 },
  { id: 4, name: "Portrait", count: 10 },
  { id: 5, name: "Product", count: 18 },
]

const initialMedia = [
  {
    id: 1,
    name: "hero-image.jpg",
    type: "image/jpeg",
    size: "1.2 MB",
    dimensions: "1920x1080",
    uploadedOn: "2023-05-10",
    url: "/placeholder.svg?height=300&width=400",
    folder: "Banners",
    tags: ["Hero", "Background"],
  },
  {
    id: 2,
    name: "about-us.jpg",
    type: "image/jpeg",
    size: "0.8 MB",
    dimensions: "1200x800",
    uploadedOn: "2023-05-08",
    url: "/placeholder.svg?height=300&width=400",
    folder: "Banners",
    tags: ["Background"],
  },
  {
    id: 3,
    name: "services-banner.jpg",
    type: "image/jpeg",
    size: "1.5 MB",
    dimensions: "1920x600",
    uploadedOn: "2023-05-05",
    url: "/placeholder.svg?height=300&width=400",
    folder: "Services",
    tags: ["Hero", "Background"],
  },
  {
    id: 4,
    name: "project-thumbnail.jpg",
    type: "image/jpeg",
    size: "0.6 MB",
    dimensions: "800x600",
    uploadedOn: "2023-05-03",
    url: "/placeholder.svg?height=300&width=400",
    folder: "Projects",
    tags: ["Product"],
  },
  {
    id: 5,
    name: "company-logo.png",
    type: "image/png",
    size: "0.3 MB",
    dimensions: "512x512",
    uploadedOn: "2023-04-28",
    url: "/placeholder.svg?height=300&width=400",
    folder: "Logos",
    tags: ["Icon"],
  },
  {
    id: 6,
    name: "team-photo.jpg",
    type: "image/jpeg",
    size: "2.1 MB",
    dimensions: "2000x1333",
    uploadedOn: "2023-04-25",
    url: "/placeholder.svg?height=300&width=400",
    folder: "Team",
    tags: ["Portrait"],
  },
  {
    id: 7,
    name: "service-icon-1.png",
    type: "image/png",
    size: "0.1 MB",
    dimensions: "128x128",
    uploadedOn: "2023-04-20",
    url: "/placeholder.svg?height=300&width=400",
    folder: "Services",
    tags: ["Icon"],
  },
  {
    id: 8,
    name: "service-icon-2.png",
    type: "image/png",
    size: "0.1 MB",
    dimensions: "128x128",
    uploadedOn: "2023-04-20",
    url: "/placeholder.svg?height=300&width=400",
    folder: "Services",
    tags: ["Icon"],
  },
]

export default function MediaAdmin() {
  const { toast } = useToast()
  const [media, setMedia] = useState(initialMedia)
  const [folders, setFolders] = useState(initialFolders)
  const [tags, setTags] = useState(initialTags)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>("newest")

  // Dialogs state
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isReplaceDialogOpen, setIsReplaceDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null)

  // Filter media based on search, folder, and tags
  const filteredMedia = media.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFolder = currentFolder ? item.folder === currentFolder : true
    const matchesTags = selectedTags.length > 0 ? selectedTags.every((tag) => item.tags.includes(tag)) : true

    return matchesSearch && matchesFolder && matchesTags
  })

  // Sort media
  const sortedMedia = [...filteredMedia].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.uploadedOn).getTime() - new Date(a.uploadedOn).getTime()
      case "oldest":
        return new Date(a.uploadedOn).getTime() - new Date(b.uploadedOn).getTime()
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      case "size-asc":
        return Number.parseFloat(a.size) - Number.parseFloat(b.size)
      case "size-desc":
        return Number.parseFloat(b.size) - Number.parseFloat(a.size)
      default:
        return 0
    }
  })

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this media item? This action cannot be undone.")) {
      setMedia(media.filter((item) => item.id !== id))
      toast({
        title: "Media deleted",
        description: "The media item has been deleted successfully.",
      })
    }
  }

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return

    if (
      window.confirm(
        `Are you sure you want to delete ${selectedItems.length} selected items? This action cannot be undone.`,
      )
    ) {
      setMedia(media.filter((item) => !selectedItems.includes(item.id)))
      setSelectedItems([])
      toast({
        title: "Media deleted",
        description: `${selectedItems.length} media items have been deleted successfully.`,
      })
    }
  }

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    if (selectedItems.length === sortedMedia.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(sortedMedia.map((item) => item.id))
    }
  }

  const handleTagFilter = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setCurrentFolder(null)
    setSelectedTags([])
  }

  const openReplaceDialog = (item: any) => {
    setSelectedMedia(item)
    setIsReplaceDialogOpen(true)
  }

  const openDetailsDialog = (item: any) => {
    setSelectedMedia(item)
    setIsDetailsDialogOpen(true)
  }

  const openRenameDialog = (item: any) => {
    setSelectedMedia(item)
    setIsRenameDialogOpen(true)
  }

  const handleReplaceMedia = (id: number, newData: any) => {
    setMedia(
      media.map((item) =>
        item.id === id ? { ...item, ...newData, uploadedOn: new Date().toISOString().split("T")[0] } : item,
      ),
    )
    setIsReplaceDialogOpen(false)
    toast({
      title: "Media replaced",
      description: "The media item has been replaced successfully.",
    })
  }

  const handleRenameMedia = (id: number, newName: string) => {
    setMedia(media.map((item) => (item.id === id ? { ...item, name: newName } : item)))
    setIsRenameDialogOpen(false)
    toast({
      title: "Media renamed",
      description: "The media item has been renamed successfully.",
    })
  }

  const handleCreateFolder = (folderName: string) => {
    const newFolder = {
      id: folders.length + 1,
      name: folderName,
      count: 0,
    }
    setFolders([...folders, newFolder])
    setIsFolderDialogOpen(false)
    toast({
      title: "Folder created",
      description: `Folder "${folderName}" has been created successfully.`,
    })
  }

  const handleAddMedia = (newMediaItems: any[]) => {
    const highestId = media.reduce((max, item) => Math.max(max, item.id), 0)

    const newMedia = newMediaItems.map((item, index) => ({
      id: highestId + index + 1,
      name: item.name,
      type: item.type,
      size: item.size,
      dimensions: item.dimensions || "Unknown",
      uploadedOn: new Date().toISOString().split("T")[0],
      url: item.url || "/placeholder.svg?height=300&width=400",
      folder: currentFolder || "Uncategorized",
      tags: [],
    }))

    setMedia([...media, ...newMedia])
    setIsUploadDialogOpen(false)
    toast({
      title: "Media uploaded",
      description: `${newMediaItems.length} media items have been uploaded successfully.`,
    })
  }

  const updateMediaTags = (id: number, newTags: string[]) => {
    setMedia(media.map((item) => (item.id === id ? { ...item, tags: newTags } : item)))

    // Update tag counts and add new tags if necessary
    const allTags = new Set<string>()
    media.forEach((item) => {
      if (item.id === id) {
        newTags.forEach((tag) => allTags.add(tag))
      } else {
        item.tags.forEach((tag) => allTags.add(tag))
      }
    })

    const updatedTags = Array.from(allTags).map((tagName) => {
      const existingTag = tags.find((t) => t.name === tagName)
      if (existingTag) {
        return existingTag
      }
      return {
        id: tags.length + 1,
        name: tagName,
        count: 1,
      }
    })

    setTags(updatedTags)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media</h1>
          <p className="text-muted-foreground">Manage your media files</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setIsFolderDialogOpen(true)}>
            <FolderPlus className="h-4 w-4" />
            <span className="sr-only">New Folder</span>
          </Button>
          <Button className="bg-green-700 hover:bg-green-800" onClick={() => setIsUploadDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Media
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Sidebar */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-medium">Folders</h3>
                <div className="space-y-1">
                  <div
                    className={`flex cursor-pointer items-center justify-between rounded-md px-2 py-1 hover:bg-muted ${currentFolder === null ? "bg-muted" : ""}`}
                    onClick={() => setCurrentFolder(null)}
                  >
                    <span className="text-sm">All Files</span>
                    <Badge variant="outline">{media.length}</Badge>
                  </div>
                  {folders.map((folder) => (
                    <div
                      key={folder.id}
                      className={`flex cursor-pointer items-center justify-between rounded-md px-2 py-1 hover:bg-muted ${currentFolder === folder.name ? "bg-muted" : ""}`}
                      onClick={() => setCurrentFolder(folder.name)}
                    >
                      <span className="text-sm">{folder.name}</span>
                      <Badge variant="outline">{folder.count}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium">Tags</h3>
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant={selectedTags.includes(tag.name) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleTagFilter(tag.name)}
                    >
                      {tag.name} ({tag.count})
                    </Badge>
                  ))}
                </div>
              </div>

              {(searchTerm || currentFolder || selectedTags.length > 0) && (
                <Button variant="ghost" className="w-full text-sm" onClick={clearFilters}>
                  <X className="mr-2 h-3 w-3" />
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <CardTitle>Media Library</CardTitle>
                <CardDescription>
                  {filteredMedia.length} {filteredMedia.length === 1 ? "item" : "items"}
                  {currentFolder ? ` in ${currentFolder}` : ""}
                  {selectedTags.length > 0 ? ` with tags: ${selectedTags.join(", ")}` : ""}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={viewMode === "grid" ? "bg-muted" : ""}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                  <span className="sr-only">Grid View</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={viewMode === "list" ? "bg-muted" : ""}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">List View</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search media..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="size-asc">Size (Small to Large)</SelectItem>
                    <SelectItem value="size-desc">Size (Large to Small)</SelectItem>
                  </SelectContent>
                </Select>
                {selectedItems.length > 0 && (
                  <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Selected
                  </Button>
                )}
              </div>
            </div>

            {selectedItems.length > 0 && (
              <div className="mb-4 flex items-center justify-between rounded-md bg-muted p-2">
                <div className="flex items-center">
                  <Checkbox
                    id="select-all"
                    checked={selectedItems.length === sortedMedia.length && sortedMedia.length > 0}
                    onCheckedChange={handleSelectAll}
                    className="mr-2"
                  />
                  <Label htmlFor="select-all">
                    {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"} selected
                  </Label>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedItems([])}>
                  Clear Selection
                </Button>
              </div>
            )}

            {sortedMedia.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-md border border-dashed py-12">
                <p className="mb-4 text-center text-muted-foreground">No media files found</p>
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(true)}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Media
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {sortedMedia.map((item) => (
                  <div key={item.id} className="group relative overflow-hidden rounded-md border bg-background">
                    <div className="absolute left-2 top-2 z-10">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => handleSelectItem(item.id)}
                        className="h-4 w-4 rounded-sm bg-white/80"
                      />
                    </div>
                    <div className="relative aspect-square cursor-pointer" onClick={() => openDetailsDialog(item)}>
                      <Image src={item.url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="p-2">
                      <p className="truncate text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.dimensions} • {item.size}
                      </p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openRenameDialog(item)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Rename</span>
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openReplaceDialog(item)}
                        >
                          <RefreshCw className="h-4 w-4" />
                          <span className="sr-only">Replace</span>
                        </Button>
                        <Button variant="secondary" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="w-[40px] px-4 py-3 text-left">
                        <Checkbox
                          checked={selectedItems.length === sortedMedia.length && sortedMedia.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="px-4 py-3 text-left font-medium">File</th>
                      <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Dimensions</th>
                      <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Size</th>
                      <th className="hidden px-4 py-3 text-left font-medium lg:table-cell">Uploaded</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedMedia.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="px-4 py-3">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={() => handleSelectItem(item.id)}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-md">
                              <Image
                                src={item.url || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.type}</p>
                            </div>
                          </div>
                        </td>
                        <td className="hidden px-4 py-3 md:table-cell">{item.dimensions}</td>
                        <td className="hidden px-4 py-3 md:table-cell">{item.size}</td>
                        <td className="hidden px-4 py-3 lg:table-cell">{item.uploadedOn}</td>
                        <td className="px-4 py-3 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <circle cx="12" cy="12" r="1" />
                                  <circle cx="12" cy="5" r="1" />
                                  <circle cx="12" cy="19" r="1" />
                                </svg>
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => openDetailsDialog(item)}>View Details</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openRenameDialog(item)}>Rename</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openReplaceDialog(item)}>Replace</DropdownMenuItem>
                              <DropdownMenuItem>Download</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(item.id)}>
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upload Dialog */}
      <MediaUploader
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        onUpload={handleAddMedia}
        folders={folders}
        currentFolder={currentFolder}
      />

      {/* Replace Dialog */}
      {selectedMedia && (
        <MediaReplaceDialog
          isOpen={isReplaceDialogOpen}
          onClose={() => setIsReplaceDialogOpen(false)}
          media={selectedMedia}
          onReplace={(newData) => handleReplaceMedia(selectedMedia.id, newData)}
        />
      )}

      {/* Details Dialog */}
      {selectedMedia && (
        <MediaDetailsDialog
          isOpen={isDetailsDialogOpen}
          onClose={() => setIsDetailsDialogOpen(false)}
          media={selectedMedia}
          tags={tags}
          onUpdateTags={(newTags) => updateMediaTags(selectedMedia.id, newTags)}
        />
      )}

      {/* Rename Dialog */}
      {selectedMedia && (
        <MediaRenameDialog
          isOpen={isRenameDialogOpen}
          onClose={() => setIsRenameDialogOpen(false)}
          media={selectedMedia}
          onRename={(newName) => handleRenameMedia(selectedMedia.id, newName)}
        />
      )}

      {/* Folder Dialog */}
      <MediaFolderDialog
        isOpen={isFolderDialogOpen}
        onClose={() => setIsFolderDialogOpen(false)}
        onCreateFolder={handleCreateFolder}
      />
    </div>
  )
}
