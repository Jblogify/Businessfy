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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Download, Folder, X, Plus, Copy, Link } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MediaDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  media: any
  tags: { id: number; name: string; count: number }[]
  onUpdateTags: (newTags: string[]) => void
}

export function MediaDetailsDialog({ isOpen, onClose, media, tags, onUpdateTags }: MediaDetailsDialogProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<string>("preview")
  const [newTag, setNewTag] = useState<string>("")
  const [mediaTags, setMediaTags] = useState<string[]>(media.tags || [])

  const handleAddTag = () => {
    if (!newTag.trim()) return

    if (mediaTags.includes(newTag.trim())) {
      toast({
        title: "Tag already exists",
        description: `The tag "${newTag.trim()}" already exists for this media.`,
        variant: "destructive",
      })
      return
    }

    const updatedTags = [...mediaTags, newTag.trim()]
    setMediaTags(updatedTags)
    onUpdateTags(updatedTags)
    setNewTag("")
  }

  const handleRemoveTag = (tag: string) => {
    const updatedTags = mediaTags.filter((t) => t !== tag)
    setMediaTags(updatedTags)
    onUpdateTags(updatedTags)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Media Details</DialogTitle>
          <DialogDescription>View and manage details for "{media.name}".</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-md border">
              <Image src={media.url || "/placeholder.svg"} alt={media.name} fill className="object-contain" />
            </div>

            <div className="flex justify-center">
              <Button variant="outline" className="mx-1">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" className="mx-1" onClick={() => copyToClipboard(media.url)}>
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
                  <span className="text-sm">{media.name}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>File Type</Label>
                <div className="flex items-center rounded-md border p-2">
                  <span className="text-sm">{media.type}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Dimensions</Label>
                <div className="flex items-center rounded-md border p-2">
                  <span className="text-sm">{media.dimensions}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>File Size</Label>
                <div className="flex items-center rounded-md border p-2">
                  <span className="text-sm">{media.size}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Upload Date</Label>
                <div className="flex items-center rounded-md border p-2">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{media.uploadedOn}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Folder</Label>
                <div className="flex items-center rounded-md border p-2">
                  <Folder className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{media.folder || "Uncategorized"}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {mediaTags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
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
                  />
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
              <p className="text-sm text-muted-foreground">This image is used in the following locations:</p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between rounded-md border p-2">
                  <div className="flex items-center">
                    <Link className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Home Page - Hero Section</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-md border p-2">
                  <div className="flex items-center">
                    <Link className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">About Page - Team Section</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-md border p-4">
              <h3 className="mb-2 text-sm font-medium">HTML Code</h3>
              <div className="rounded-md bg-muted p-2">
                <code className="text-xs">
                  {`<img src="${media.url}" alt="${media.name}" width="${media.dimensions.split("x")[0]}" height="${media.dimensions.split("x")[1]}" />`}
                </code>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() =>
                  copyToClipboard(
                    `<img src="${media.url}" alt="${media.name}" width="${media.dimensions.split("x")[0]}" height="${media.dimensions.split("x")[1]}" />`,
                  )
                }
              >
                <Copy className="mr-2 h-3 w-3" />
                Copy Code
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
