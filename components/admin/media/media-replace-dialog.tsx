"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
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
import { Upload, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface MediaReplaceDialogProps {
  isOpen: boolean
  onClose: () => void
  media: any
  onReplace: (newData: any) => void
}

export function MediaReplaceDialog({ isOpen, onClose, media, onReplace }: MediaReplaceDialogProps) {
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [keepFilename, setKeepFilename] = useState<boolean>(true)
  const [keepMetadata, setKeepMetadata] = useState<boolean>(true)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Clean up preview URL when component unmounts
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]

      // Check if file is an image
      if (!selectedFile.type.startsWith("image/")) {
        toast({
          title: "Invalid file",
          description: "Please select an image file (JPG, PNG, GIF, etc.)",
          variant: "destructive",
        })
        return
      }

      // Check file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        })
        return
      }

      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0]

      // Check if file is an image
      if (!selectedFile.type.startsWith("image/")) {
        toast({
          title: "Invalid file",
          description: "Please select an image file (JPG, PNG, GIF, etc.)",
          variant: "destructive",
        })
        return
      }

      // Check file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        })
        return
      }

      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }

    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("border-green-500", "bg-green-50")
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()

    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add("border-green-500", "bg-green-50")
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()

    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("border-green-500", "bg-green-50")
    }
  }

  const handleReplace = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to replace the current image",
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

        setTimeout(() => {
          setIsUploading(false)
          setUploadProgress(0)

          // Prepare new data
          const newData = {
            name: keepFilename ? media.name : file.name,
            type: file.type,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            dimensions: keepMetadata ? media.dimensions : "1920x1080", // This would be determined from the actual image
            url: "/placeholder.svg?height=300&width=400", // This would be the uploaded file URL
          }

          onReplace(newData)

          // Reset state
          setFile(null)
          setPreview(null)
        }, 500)
      }
    }, 100)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Replace Image</DialogTitle>
          <DialogDescription>
            Upload a new image to replace "{media.name}". The original image will be permanently replaced.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Current Image</Label>
              <div className="relative aspect-square rounded-md border">
                <Image
                  src={media.url || "/placeholder.svg"}
                  alt={media.name}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              <p className="truncate text-xs">{media.name}</p>
              <p className="text-xs text-muted-foreground">
                {media.dimensions} • {media.size}
              </p>
            </div>

            <div className="space-y-2">
              <Label>New Image</Label>
              {preview ? (
                <div className="relative aspect-square rounded-md border">
                  <Image
                    src={preview || "/placeholder.svg"}
                    alt={file?.name || "New image"}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
              ) : (
                <div
                  ref={dropZoneRef}
                  className="flex aspect-square flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 transition-colors"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mb-2 h-8 w-8 text-gray-400" />
                  <p className="text-center text-xs text-muted-foreground">Drag and drop or click to select</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              )}
              {file && (
                <>
                  <p className="truncate text-xs">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </>
              )}
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Replacing this image will update it everywhere it's used on the website.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch id="keep-filename" checked={keepFilename} onCheckedChange={setKeepFilename} />
              <Label htmlFor="keep-filename">Keep original filename</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="keep-metadata" checked={keepMetadata} onCheckedChange={setKeepMetadata} />
              <Label htmlFor="keep-metadata">Preserve metadata (tags, folder, etc.)</Label>
            </div>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Uploading...</span>
                <span className="text-sm">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button onClick={handleReplace} disabled={isUploading || !file} className="bg-green-700 hover:bg-green-800">
            {isUploading ? "Replacing..." : "Replace Image"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
