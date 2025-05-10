"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, X, Eye, ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectMediaManagerProps {
  mainImage: string | null
  galleryImages: string[]
  onMainImageChange: (image: string | null) => void
  onGalleryImagesChange: (images: string[]) => void
}

export function ProjectMediaManager({
  mainImage,
  galleryImages,
  onMainImageChange,
  onGalleryImagesChange,
}: ProjectMediaManagerProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // In a real app, you would upload this file to your server or cloud storage
    // For this example, we'll just create an object URL
    const imageUrl = URL.createObjectURL(files[0])
    onMainImageChange(imageUrl)
  }

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // In a real app, you would upload these files to your server or cloud storage
    // For this example, we'll just create object URLs
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
    onGalleryImagesChange([...galleryImages, ...newImages])
  }

  const removeMainImage = () => {
    onMainImageChange(null)
  }

  const removeGalleryImage = (index: number) => {
    const updatedImages = galleryImages.filter((_, i) => i !== index)
    onGalleryImagesChange(updatedImages)
  }

  const previewImageHandler = (image: string) => {
    setPreviewImage(image)
    setIsPreviewOpen(true)
  }

  const moveGalleryImage = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === galleryImages.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const updatedImages = [...galleryImages]
    const temp = updatedImages[index]
    updatedImages[index] = updatedImages[newIndex]
    updatedImages[newIndex] = temp
    onGalleryImagesChange(updatedImages)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent, type: "main" | "gallery") => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (!files || files.length === 0) return

    // Check if files are images
    const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"))
    if (imageFiles.length === 0) return

    if (type === "main") {
      const imageUrl = URL.createObjectURL(imageFiles[0])
      onMainImageChange(imageUrl)
    } else {
      const newImages = imageFiles.map((file) => URL.createObjectURL(file))
      onGalleryImagesChange([...galleryImages, ...newImages])
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Main Image</h3>
        <div className="space-y-2">
          {mainImage ? (
            <div className="relative rounded-md border overflow-hidden">
              <div className="relative aspect-video h-[300px]">
                <Image src={mainImage || "/placeholder.svg"} alt="Main project image" fill className="object-cover" />
              </div>
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white/80 hover:bg-white"
                  onClick={() => previewImageHandler(mainImage)}
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Preview</span>
                </Button>
                <Button type="button" variant="destructive" size="icon" className="h-8 w-8" onClick={removeMainImage}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </div>
          ) : (
            <div
              className={cn(
                "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100",
                isDragging && "border-blue-500 bg-blue-50",
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, "main")}
            >
              <label
                htmlFor="main-image-upload"
                className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 5MB)</p>
                </div>
                <input
                  id="main-image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleMainImageUpload}
                />
              </label>
            </div>
          )}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Gallery Images</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative group rounded-md border overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="h-7 w-7 bg-white/80 hover:bg-white"
                  onClick={() => previewImageHandler(image)}
                >
                  <Eye className="h-3 w-3" />
                  <span className="sr-only">Preview</span>
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => removeGalleryImage(index)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
              <div className="absolute left-2 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="h-7 w-7 bg-white/80 hover:bg-white"
                  onClick={() => moveGalleryImage(index, "up")}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-3 w-3" />
                  <span className="sr-only">Move up</span>
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="h-7 w-7 bg-white/80 hover:bg-white"
                  onClick={() => moveGalleryImage(index, "down")}
                  disabled={index === galleryImages.length - 1}
                >
                  <ArrowDown className="h-3 w-3" />
                  <span className="sr-only">Move down</span>
                </Button>
              </div>
            </div>
          ))}

          <div
            className={cn(
              "flex flex-col items-center justify-center aspect-video border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100",
              isDragging && "border-blue-500 bg-blue-50",
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "gallery")}
          >
            <label
              htmlFor="gallery-image-upload"
              className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-xs text-gray-500">
                  <span className="font-semibold">Add Images</span>
                </p>
              </div>
              <input
                id="gallery-image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleGalleryImageUpload}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            {previewImage && (
              <Image src={previewImage || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
