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
import { Upload, X, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { uploadImage } from "@/actions/upload-image"

interface ImageUploaderProps {
  isOpen: boolean
  onClose: () => void
  onUploadComplete: () => void
  folders: string[]
}

export function ImageUploader({ isOpen, onClose, onUploadComplete, folders }: ImageUploaderProps) {
  const { toast } = useToast()
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [optimizeImages, setOptimizeImages] = useState<boolean>(true)
  const [selectedFolder, setSelectedFolder] = useState<string>("Uncategorized")
  const [activeTab, setActiveTab] = useState<string>("upload")
  const [urlInput, setUrlInput] = useState<string>("")
  const [altTexts, setAltTexts] = useState<Record<number, string>>({})

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

    // Initialize alt texts with filenames (without extension)
    const newAltTexts = { ...altTexts }
    imageFiles.forEach((file, index) => {
      const fileIndex = files.length + index
      const fileName = file.name.split(".")[0].replace(/-/g, " ")
      newAltTexts[fileIndex] = fileName
    })

    setFiles((prev) => [...prev, ...imageFiles])
    setPreviews((prev) => [...prev, ...newPreviews])
    setAltTexts(newAltTexts)
  }

  const removeFile = (index: number) => {
    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(previews[index])

    setFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviews((prev) => prev.filter((_, i) => i !== index))

    // Update alt texts
    const newAltTexts = { ...altTexts }
    delete newAltTexts[index]

    // Reindex the remaining alt texts
    const updatedAltTexts: Record<number, string> = {}
    Object.entries(newAltTexts).forEach(([key, value]) => {
      const numKey = Number.parseInt(key)
      if (numKey > index) {
        updatedAltTexts[numKey - 1] = value
      } else {
        updatedAltTexts[numKey] = value
      }
    })

    setAltTexts(updatedAltTexts)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files))
    }

    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("border-business-500", "bg-business-50")
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()

    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add("border-business-500", "bg-business-50")
    }
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()

    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("border-business-500", "bg-business-50")
    }
  }, [])

  const handleAltTextChange = (index: number, value: string) => {
    setAltTexts((prev) => ({
      ...prev,
      [index]: value,
    }))
  }

  const handleUpload = async () => {
    if (files.length === 0 && urlInput === "") {
      toast({
        title: "No files selected",
        description: "Please select files to upload or enter an image URL",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Upload files one by one
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const altText = altTexts[i] || file.name.split(".")[0].replace(/-/g, " ")

        // Update progress
        setUploadProgress(Math.round((i / files.length) * 100))

        // Upload the file
        const result = await uploadImage(file)

        if (!result.success) {
          throw new Error(result.error || "Failed to upload image")
        }
      }

      // Set progress to 100% when done
      setUploadProgress(100)

      // Show success message
      toast({
        title: "Upload complete",
        description: `Successfully uploaded ${files.length} image(s)`,
      })

      // Reset state and close dialog
      setTimeout(() => {
        setFiles([])
        setPreviews([])
        setUrlInput("")
        setAltTexts({})
        setIsUploading(false)
        onUploadComplete()
      }, 500)
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload images",
        variant: "destructive",
      })
      setIsUploading(false)
    }
  }

  const handleAddFromUrl = async () => {
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

    setIsUploading(true)

    try {
      // Fetch the image from the URL
      const response = await fetch(urlInput)
      if (!response.ok) {
        throw new Error("Failed to fetch image from URL")
      }

      // Convert to blob and then to File
      const blob = await response.blob()
      const fileName = urlInput.split("/").pop() || "image.jpg"
      const file = new File([blob], fileName, { type: blob.type })

      // Add to files state
      setFiles([file])
      setPreviews([URL.createObjectURL(file)])
      setAltTexts({ 0: fileName.split(".")[0].replace(/-/g, " ") })

      // Switch to upload tab
      setActiveTab("upload")
      setIsUploading(false)

      toast({
        title: "Image added",
        description: "Image from URL has been added and is ready to upload",
      })
    } catch (error) {
      console.error("Error fetching image from URL:", error)
      toast({
        title: "Error",
        description: "Failed to fetch image from the provided URL",
        variant: "destructive",
      })
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Images</DialogTitle>
          <DialogDescription>Upload images to your gallery. Supported formats: JPG, PNG, GIF, WebP.</DialogDescription>
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
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Selected Files ({files.length})</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {previews.map((preview, index) => (
                    <div key={index} className="rounded-md border p-2">
                      <div className="relative aspect-video mb-2">
                        <Image
                          src={preview || "/placeholder.svg"}
                          alt={files[index].name}
                          fill
                          className="rounded-md object-contain"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute right-1 top-1 h-6 w-6"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="truncate text-xs font-medium mb-1">{files[index].name}</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        {(files[index].size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <div className="space-y-1">
                        <Label htmlFor={`alt-text-${index}`} className="text-xs">
                          Alt Text
                        </Label>
                        <Input
                          id={`alt-text-${index}`}
                          value={altTexts[index] || ""}
                          onChange={(e) => handleAltTextChange(index, e.target.value)}
                          placeholder="Describe this image"
                          className="h-8 text-xs"
                        />
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
                  <SelectItem value="Uncategorized">Uncategorized</SelectItem>
                  {folders.map((folder) => (
                    <SelectItem key={folder} value={folder}>
                      {folder}
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
              <p className="text-xs text-muted-foreground">Enter the URL of an image you want to add to your gallery</p>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Note</AlertTitle>
              <AlertDescription>Make sure you have permission to use images from external sources.</AlertDescription>
            </Alert>

            <Button variant="outline" className="w-full" onClick={handleAddFromUrl} disabled={isUploading || !urlInput}>
              {isUploading ? "Processing..." : "Add from URL"}
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
            className="bg-business-600 hover:bg-business-700"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
