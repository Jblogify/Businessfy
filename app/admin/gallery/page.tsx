"use client"

import { Skeleton } from "@/components/ui/skeleton"

import dynamic from "next/dynamic"

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

// Dynamically import the gallery component with no SSR
const GalleryPageContent = dynamic(() => import("@/components/admin/gallery/gallery-page-content"), {
  ssr: false,
  loading: () => (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <Skeleton className="h-96 w-full" />
        </div>
        <div className="md:col-span-3">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    </div>
  ),
})

export default function GalleryPage() {
  return <GalleryPageContent />
}
