"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Copy, Download, Plus, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ImageDetailsProps {
  isOpen: boolean
  onClose: () => void
  image: any
  folders: string[]
  tags: string[]
  onUpdate: (updatedImage: any) => void
}

export function ImageDetails({ isOpen, onClose, image, folders, tags, onUpdate }: ImageDetailsProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<string>("preview")
  const [editedImage, setEditedImage] = useState({ ...image })
  const [newTag, setNewTag] = useState<string>("")
  const [isUpdating, setIsUpdating] = useState(false)

  const handleAltTextChange = (value: string) => {
    setEditedImage({
      ...editedImage,
      metadata: {
        ...editedImage.metadata,
        alt: value,
      },
    })
  }

  const handleFolderChange = (value: string) => {
    setEditedImage({
      ...editedImage,
      metadata: {
        ...editedImage.metadata,
        folder: value,
      },
    })
  }

  const handleAddTag = () => {
    if (!newTag.trim()) return

    // Check if tag already exists
    const currentTags = editedImage.metadata.tags || []
    if (currentTags.includes(newTag.trim())) {
      toast({
        title: "Tag already exists",
        description: `The tag "${newTag.trim()}" already exists for this image.`,
      })
      return
    }

    setEditedImage({
      ...editedImage,
      metadata: {
        ...editedImage.metadata,
        tags: [...currentTags, newTag.trim()],
      },
    })
    setNewTag("")
  }

  const handleRemoveTag = (tag: string) => {
    setEditedImage({
      ...editedImage,
      metadata: {
        ...editedImage.metadata,
        tags: (editedImage.metadata.tags || []).filter((t: string) => t !== tag),
      },
    })
  }

  const handleSaveChanges = async () => {
    setIsUpdating(true)
    try {
      await onUpdate(editedImage)
    } finally {
      setIsUpdating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Image Details</DialogTitle>
          <DialogDescription>View and edit details for "{image.name}"</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-md border">
              <Image
                src={image.url || "/placeholder.svg"}
                alt={editedImage.metadata.alt || image.name}
                fill
                className="object-contain"
                sizes="(max-width: 700px) 100vw, 700px"
              />
            </div>

            <div className="flex justify-center gap-2">
              <Button variant="outline" onClick={() => window.open(image.url, "_blank")}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" onClick={() => copyToClipboard(image.url)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy URL
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>File Name</Label>
                <div className="flex items-center rounded-md border p-2">
                  <span className="text-sm">{image.name}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>File Type</Label>
                <div className="flex items-center rounded-md border p-2">
                  <span className="text-sm">{image.contentType}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Dimensions</Label>
                <div className="flex items-center rounded-md border p-2">
                  <span className="text-sm">
                    {editedImage.metadata.width && editedImage.metadata.height
                      ? `${editedImage.metadata.width} × ${editedImage.metadata.height}`
                      : "Unknown"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>File Size</Label>
                <div className="flex items-center rounded-md border p-2">
                  <span className="text-sm">{formatFileSize(image.size)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Upload Date</Label>
                <div className="flex items-center rounded-md border p-2">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formatDate(image.created_at)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="folder">Folder</Label>
                <Select value={editedImage.metadata.folder || "Uncategorized"} onValueChange={handleFolderChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select folder" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Uncategorized">Uncategorized</SelectItem>
                    {folders.map((folder) => (
                      <SelectItem key={folder} value={folder}>
                        {folder}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="alt-text">Alt Text</Label>
                <Input
                  id="alt-text"
                  value={editedImage.metadata.alt || ""}
                  onChange={(e) => handleAltTextChange(e.target.value)}
                  placeholder="Describe this image for accessibility"
                />
                <p className="text-xs text-muted-foreground">
                  Provide a description of the image for screen readers and accessibility.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {(editedImage.metadata.tags || []).map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove tag</span>
                    </Button>
                  </Badge>
                ))}

                <div className="flex items-center gap-1">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag..."
                    className="h-8 w-32"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                    list="available-tags"
                  />
                  <datalist id="available-tags">
                    {tags.map((tag) => (
                      <option key={tag} value={tag} />
                    ))}
                  </datalist>
                  <Button variant="outline" size="sm" className="h-8 px-2" onClick={handleAddTag}>
                    <Plus className="h-3 w-3" />
                    <span className="sr-only">Add tag</span>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="mb-2 text-sm font-medium">Usage Information</h3>
              <p className="text-sm text-muted-foreground">
                This section shows where this image is used across your site.
              </p>

              <div className="mt-4">
                <p className="text-sm text-muted-foreground italic">
                  Usage tracking is not available in the current version.
                </p>
              </div>
            </div>

            <div className="rounded-md border p-4">
              <h3 className="mb-2 text-sm font-medium">HTML Code</h3>
              <div className="rounded-md bg-muted p-2">
                <code className="text-xs">
                  {`<img src="${image.url}" alt="${editedImage.metadata.alt || image.name}" />`}
                </code>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() =>
                  copyToClipboard(`<img src="${image.url}" alt="${editedImage.metadata.alt || image.name}" />`)
                }
              >
                <Copy className="mr-2 h-3 w-3" />
                Copy Code
              </Button>
            </div>

            <div className="rounded-md border p-4">
              <h3 className="mb-2 text-sm font-medium">Markdown Code</h3>
              <div className="rounded-md bg-muted p-2">
                <code className="text-xs">{`![${editedImage.metadata.alt || image.name}](${image.url})`}</code>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => copyToClipboard(`![${editedImage.metadata.alt || image.name}](${image.url})`)}
              >
                <Copy className="mr-2 h-3 w-3" />
                Copy Code
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isUpdating}>
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} disabled={isUpdating} className="bg-business-600 hover:bg-business-700">
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
