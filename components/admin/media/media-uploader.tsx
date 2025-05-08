"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
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
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MediaUploaderProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (files: any[]) => void
  folders: { id: number; name: string; count: number }[]
  currentFolder: string | null
}

export function MediaUploader({ isOpen, onClose, onUpload, folders, currentFolder }: MediaUploaderProps) {
  const { toast } = useToast()
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [optimizeImages, setOptimizeImages] = useState<boolean>(true)
  const [selectedFolder, setSelectedFolder] = useState<string>(currentFolder || "")
  const [activeTab, setActiveTab] = useState<string>("upload")
  const [urlInput, setUrlInput] = useState<string>("")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)
      addFiles(selectedFiles)
    }
  }

  const addFiles = (selectedFiles: File[]) => {
    // Filter for image files
    const imageFiles = selectedFiles.filter((file) => file.type.startsWith("image/"))

    if (imageFiles.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please select image files only (JPG, PNG, GIF, etc.)",
        variant: "destructive",
      })
      return
    }

    // Create previews
    const newPreviews = imageFiles.map((file) => URL.createObjectURL(file))

    setFiles((prev) => [...prev, ...imageFiles])
    setPreviews((prev) => [...prev, ...newPreviews])
  }

  const removeFile = (index: number) => {
    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(previews[index])

    setFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files))
    }

    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("border-green-500", "bg-green-50")
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()

    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add("border-green-500", "bg-green-50")
    }
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()

    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("border-green-500", "bg-green-50")
    }
  }, [])

  const handleUpload = () => {
    if (files.length === 0 && urlInput === "") {
      toast({
        title: "No files selected",
        description: "Please select files to upload or enter an image URL",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)

        // Process files
        const uploadedFiles = files.map((file) => ({
          name: file.name,
          type: file.type,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          dimensions: "1920x1080", // This would be determined from the actual image
          url: "/placeholder.svg?height=300&width=400", // This would be the uploaded file URL
        }))

        // Add URL if provided
        if (urlInput) {
          uploadedFiles.push({
            name: urlInput.split("/").pop() || "remote-image.jpg",
            type: "image/jpeg",
            size: "0.5 MB",
            dimensions: "1920x1080",
            url: "/placeholder.svg?height=300&width=400",
          })
        }

        setTimeout(() => {
          setIsUploading(false)
          setUploadProgress(0)
          onUpload(uploadedFiles)

          // Reset state
          setFiles([])
          setPreviews([])
          setUrlInput("")
        }, 500)
      }
    }, 100)
  }

  const handleAddFromUrl = () => {
    if (!urlInput) {
      toast({
        title: "No URL provided",
        description: "Please enter a valid image URL",
        variant: "destructive",
      })
      return
    }

    // Validate URL
    try {
      new URL(urlInput)
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive",
      })
      return
    }

    // In a real implementation, we would fetch the image to validate it
    // For now, we'll just simulate success
    toast({
      title: "URL added",
      description: "Image URL has been added to the upload queue",
    })

    setActiveTab("upload")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Media</DialogTitle>
          <DialogDescription>
            Upload images to your media library. Supported formats: JPG, PNG, GIF, WebP.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
            <TabsTrigger value="url">From URL</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div
              ref={dropZoneRef}
              className="flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-6 transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="mb-2 h-10 w-10 text-gray-400" />
              <p className="mb-2 text-sm font-medium">Drag and drop files here, or click to select files</p>
              <p className="text-xs text-muted-foreground">Maximum file size: 10MB</p>
              <Button variant="outline" className="mt-4" onClick={() => fileInputRef.current?.click()}>
                Select Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {previews.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Selected Files ({files.length})</h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="group relative rounded-md border">
                      <div className="relative aspect-square">
                        <Image
                          src={preview || "/placeholder.svg"}
                          alt={files[index].name}
                          fill
                          className="rounded-md object-cover"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute right-1 top-1 h-6 w-6"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <div className="p-2">
                        <p className="truncate text-xs">{files[index].name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(files[index].size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="folder">Save to folder</Label>
              </div>
              <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                <SelectTrigger>
                  <SelectValue placeholder="Select folder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uncategorized">Uncategorized</SelectItem>
                  {folders.map((folder) => (
                    <SelectItem key={folder.id} value={folder.name}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="optimize" checked={optimizeImages} onCheckedChange={setOptimizeImages} />
              <Label htmlFor="optimize">Optimize images</Label>
            </div>

            {optimizeImages && (
              <div className="rounded-md bg-muted p-3 text-sm">
                <p>Images will be automatically optimized to reduce file size while maintaining quality.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                placeholder="https://example.com/image.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter the URL of an image you want to add to your media library
              </p>
            </div>

            <Button variant="outline" className="w-full" onClick={handleAddFromUrl}>
              Add from URL
            </Button>
          </TabsContent>
        </Tabs>

        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Uploading...</span>
              <span className="text-sm">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={isUploading || (files.length === 0 && urlInput === "")}
            className="bg-green-700 hover:bg-green-800"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
