"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Grid, List, Search, Upload, Trash, Download, Info, Copy, FolderPlus, X, MoreVertical } from "lucide-react"
import { ImageUploader } from "@/components/admin/gallery/image-uploader"
import { ImageDetails } from "@/components/admin/gallery/image-details"
import { CreateFolderDialog } from "@/components/admin/gallery/create-folder-dialog"
import { DeleteConfirmDialog } from "@/components/admin/gallery/delete-confirm-dialog"

// Types
interface ImageItem {
  id: string
  name: string
  url: string
  size: number
  contentType: string
  created_at: string
  metadata: {
    width?: number
    height?: number
    folder?: string
    tags?: string[]
    alt?: string
  }
}

interface Folder {
  name: string
  count: number
}

interface Tag {
  name: string
  count: number
}

export default function GalleryPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const supabase = createClient()

  // State
  const [images, setImages] = useState<ImageItem[]>([])
  const [filteredImages, setFilteredImages] = useState<ImageItem[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Dialog states
  const [isUploaderOpen, setIsUploaderOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)

  // Load images from Supabase
  useEffect(() => {
    fetchImages()
  }, [])

  // Apply filters and sorting
  useEffect(() => {
    let result = [...images]

    // Apply folder filter
    if (currentFolder) {
      result = result.filter((img) => img.metadata?.folder === currentFolder)
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      result = result.filter((img) => {
        const imageTags = img.metadata?.tags || []
        return selectedTags.every((tag) => imageTags.includes(tag))
      })
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (img) =>
          img.name.toLowerCase().includes(term) ||
          (img.metadata?.alt || "").toLowerCase().includes(term) ||
          (img.metadata?.tags || []).some((tag) => tag.toLowerCase().includes(term)),
      )
    }

    // Apply sorting
    result = sortImages(result, sortBy)

    setFilteredImages(result)
  }, [images, currentFolder, selectedTags, searchTerm, sortBy])

  const fetchImages = async () => {
    setIsLoading(true)
    try {
      const { data: files, error } = await supabase.storage.from("media").list("page-images", {
        sortBy: { column: "created_at", order: "desc" },
      })

      if (error) {
        throw error
      }

      // Get public URLs and metadata for each file
      const imagePromises = files
        .filter((file) => !file.id.endsWith("/")) // Filter out folders
        .map(async (file) => {
          const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(`page-images/${file.name}`)

          // Get metadata if available
          const { data: metadata, error: metadataError } = await supabase.storage
            .from("media")
            .getMetadata(`page-images/${file.name}`)

          if (metadataError) {
            console.error("Error fetching metadata:", metadataError)
          }

          // Extract folder and tags from metadata or filename
          const fileNameParts = file.name.split("-")
          const possibleFolder = fileNameParts.length > 1 ? fileNameParts[0] : "Uncategorized"

          return {
            id: file.id,
            name: file.name,
            url: publicUrlData.publicUrl,
            size: file.metadata.size,
            contentType: file.metadata.mimetype || "image/jpeg",
            created_at: file.created_at,
            metadata: {
              width: metadata?.width || 0,
              height: metadata?.height || 0,
              folder: metadata?.folder || possibleFolder,
              tags: metadata?.tags || [],
              alt: metadata?.alt || file.name.replace(/\.[^/.]+$/, "").replace(/-/g, " "),
            },
          }
        })

      const imageData = await Promise.all(imagePromises)
      setImages(imageData)

      // Extract folders and tags
      const folderMap = new Map<string, number>()
      const tagMap = new Map<string, number>()

      imageData.forEach((img) => {
        // Count folders
        const folder = img.metadata?.folder || "Uncategorized"
        folderMap.set(folder, (folderMap.get(folder) || 0) + 1)

        // Count tags
        const imageTags = img.metadata?.tags || []
        imageTags.forEach((tag) => {
          tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
        })
      })

      // Convert maps to arrays
      setFolders(
        Array.from(folderMap.entries()).map(([name, count]) => ({
          name,
          count,
        })),
      )

      setTags(
        Array.from(tagMap.entries()).map(([name, count]) => ({
          name,
          count,
        })),
      )
    } catch (error) {
      console.error("Error fetching images:", error)
      toast({
        title: "Error",
        description: "Failed to load images. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const sortImages = (imagesToSort: ImageItem[], sortOption: string) => {
    return [...imagesToSort].sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "size-asc":
          return a.size - b.size
        case "size-desc":
          return b.size - a.size
        default:
          return 0
      }
    })
  }

  const handleSelectImage = (id: string) => {
    setSelectedImages((prev) => (prev.includes(id) ? prev.filter((imageId) => imageId !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    if (selectedImages.length === filteredImages.length) {
      setSelectedImages([])
    } else {
      setSelectedImages(filteredImages.map((img) => img.id))
    }
  }

  const openImageDetails = (image: ImageItem) => {
    setSelectedImage(image)
    setIsDetailsOpen(true)
  }

  const handleDeleteImages = async () => {
    try {
      // Delete selected images
      for (const id of selectedImages) {
        const image = images.find((img) => img.id === id)
        if (image) {
          const { error } = await supabase.storage.from("media").remove([`page-images/${image.name}`])
          if (error) throw error
        }
      }

      // Refresh the image list
      await fetchImages()
      setSelectedImages([])

      toast({
        title: "Success",
        description: `${selectedImages.length} image(s) deleted successfully.`,
      })

      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error("Error deleting images:", error)
      toast({
        title: "Error",
        description: "Failed to delete images. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCreateFolder = async (folderName: string) => {
    // In Supabase Storage, we don't actually create folders,
    // but we can update metadata on images to associate them with folders
    setFolders((prev) => [...prev, { name: folderName, count: 0 }])
    setIsFolderDialogOpen(false)

    toast({
      title: "Success",
      description: `Folder "${folderName}" created successfully.`,
    })
  }

  const handleTagFilter = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setCurrentFolder(null)
    setSelectedTags([])
  }

  const handleUploadComplete = () => {
    fetchImages()
    setIsUploaderOpen(false)
  }

  const handleUpdateImage = async (updatedImage: ImageItem) => {
    try {
      // Update metadata in Supabase
      const { error } = await supabase.storage.from("media").updateMetadata(`page-images/${updatedImage.name}`, {
        customMetadata: {
          alt: updatedImage.metadata.alt,
          folder: updatedImage.metadata.folder,
          tags: updatedImage.metadata.tags?.join(","),
        },
      })

      if (error) throw error

      // Update local state
      setImages((prev) => prev.map((img) => (img.id === updatedImage.id ? updatedImage : img)))

      toast({
        title: "Success",
        description: "Image details updated successfully.",
      })

      setIsDetailsOpen(false)
    } catch (error) {
      console.error("Error updating image:", error)
      toast({
        title: "Error",
        description: "Failed to update image details. Please try again.",
        variant: "destructive",
      })
    }
  }

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "URL Copied",
      description: "Image URL copied to clipboard.",
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Image Gallery</h1>
          <p className="text-muted-foreground">Manage your images for use across the site</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setIsFolderDialogOpen(true)}>
            <FolderPlus className="h-4 w-4" />
            <span className="sr-only">New Folder</span>
          </Button>
          <Button className="bg-business-600 hover:bg-business-700" onClick={() => setIsUploaderOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Images
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
                    className={`flex cursor-pointer items-center justify-between rounded-md px-2 py-1 hover:bg-muted ${
                      currentFolder === null ? "bg-muted" : ""
                    }`}
                    onClick={() => setCurrentFolder(null)}
                  >
                    <span className="text-sm">All Images</span>
                    <Badge variant="outline">{images.length}</Badge>
                  </div>
                  {folders.map((folder) => (
                    <div
                      key={folder.name}
                      className={`flex cursor-pointer items-center justify-between rounded-md px-2 py-1 hover:bg-muted ${
                        currentFolder === folder.name ? "bg-muted" : ""
                      }`}
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
                      key={tag.name}
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
                <CardTitle>Image Library</CardTitle>
                <CardDescription>
                  {filteredImages.length} {filteredImages.length === 1 ? "image" : "images"}
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
                  placeholder="Search images..."
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
                {selectedImages.length > 0 && (
                  <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Selected
                  </Button>
                )}
              </div>
            </div>

            {selectedImages.length > 0 && (
              <div className="mb-4 flex items-center justify-between rounded-md bg-muted p-2">
                <div className="flex items-center">
                  <Checkbox
                    id="select-all"
                    checked={selectedImages.length === filteredImages.length && filteredImages.length > 0}
                    onCheckedChange={handleSelectAll}
                    className="mr-2"
                  />
                  <Label htmlFor="select-all">
                    {selectedImages.length} {selectedImages.length === 1 ? "image" : "images"} selected
                  </Label>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedImages([])}>
                  Clear Selection
                </Button>
              </div>
            )}

            {isLoading ? (
              viewMode === "grid" ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <Skeleton className="aspect-square w-full rounded-md" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="p-4">
                    <div className="space-y-4">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <Skeleton className="h-12 w-12 rounded-md" />
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-3 w-1/4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            ) : filteredImages.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-md border border-dashed py-12">
                <p className="mb-4 text-center text-muted-foreground">No images found</p>
                <Button variant="outline" onClick={() => setIsUploaderOpen(true)}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Images
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {filteredImages.map((image) => (
                  <div key={image.id} className="group relative overflow-hidden rounded-md border bg-background">
                    <div className="absolute left-2 top-2 z-10">
                      <Checkbox
                        checked={selectedImages.includes(image.id)}
                        onCheckedChange={() => handleSelectImage(image.id)}
                        className="h-4 w-4 rounded-sm bg-white/80"
                      />
                    </div>
                    <div className="relative aspect-square cursor-pointer" onClick={() => openImageDetails(image)}>
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.metadata.alt || image.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-2">
                      <p className="truncate text-sm font-medium">{image.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(image.size)} • {formatDate(image.created_at)}
                      </p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            openImageDetails(image)
                          }}
                        >
                          <Info className="h-4 w-4" />
                          <span className="sr-only">Details</span>
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            copyImageUrl(image.url)
                          }}
                        >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy URL</span>
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(image.url, "_blank")
                          }}
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedImages([image.id])
                            setIsDeleteDialogOpen(true)
                          }}
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
                          checked={selectedImages.length === filteredImages.length && filteredImages.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="px-4 py-3 text-left font-medium">Image</th>
                      <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Size</th>
                      <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Folder</th>
                      <th className="hidden px-4 py-3 text-left font-medium lg:table-cell">Uploaded</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredImages.map((image) => (
                      <tr key={image.id} className="border-b">
                        <td className="px-4 py-3">
                          <Checkbox
                            checked={selectedImages.includes(image.id)}
                            onCheckedChange={() => handleSelectImage(image.id)}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-md">
                              <Image
                                src={image.url || "/placeholder.svg"}
                                alt={image.metadata.alt || image.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{image.name}</p>
                              <p className="text-xs text-muted-foreground">{image.contentType}</p>
                            </div>
                          </div>
                        </td>
                        <td className="hidden px-4 py-3 md:table-cell">{formatFileSize(image.size)}</td>
                        <td className="hidden px-4 py-3 md:table-cell">{image.metadata.folder || "Uncategorized"}</td>
                        <td className="hidden px-4 py-3 lg:table-cell">{formatDate(image.created_at)}</td>
                        <td className="px-4 py-3 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => openImageDetails(image)}>View Details</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => copyImageUrl(image.url)}>Copy URL</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => window.open(image.url, "_blank")}>
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  setSelectedImages([image.id])
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
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

      {/* Image Uploader Dialog */}
      <ImageUploader
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
        onUploadComplete={handleUploadComplete}
        folders={folders.map((f) => f.name)}
      />

      {/* Image Details Dialog */}
      {selectedImage && (
        <ImageDetails
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          image={selectedImage}
          folders={folders.map((f) => f.name)}
          tags={tags.map((t) => t.name)}
          onUpdate={handleUpdateImage}
        />
      )}

      {/* Create Folder Dialog */}
      <CreateFolderDialog
        isOpen={isFolderDialogOpen}
        onClose={() => setIsFolderDialogOpen(false)}
        onCreateFolder={handleCreateFolder}
        existingFolders={folders.map((f) => f.name)}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteImages}
        itemCount={selectedImages.length}
        itemType="image"
      />
    </div>
  )
}
