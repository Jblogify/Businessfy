"use server"

import { createClient } from "@/lib/supabase/server"
import { v4 as uuidv4 } from "uuid"

export async function uploadImage(file: File) {
  try {
    // Create a unique file name to prevent collisions
    const fileExt = file.name.split(".").pop()
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = `page-images/${fileName}`

    // Convert file to ArrayBuffer for upload
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    // Create Supabase client
    const supabase = createClient()

    // Check if the bucket exists, if not create it
    const { data: buckets } = await supabase.storage.listBuckets()
    const bucketName = "media"

    if (!buckets?.find((bucket) => bucket.name === bucketName)) {
      await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 10485760, // 10MB
      })
    }

    // Upload the file
    const { data, error } = await supabase.storage.from(bucketName).upload(filePath, buffer, {
      contentType: file.type,
      upsert: true,
    })

    if (error) {
      console.error("Error uploading image:", error)
      return { success: false, error: error.message }
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filePath)

    return {
      success: true,
      url: publicUrlData.publicUrl,
      path: filePath,
    }
  } catch (error) {
    console.error("Error in uploadImage:", error)
    return {
      success: false,
      error: error.message || "An error occurred while uploading the image",
    }
  }
}
