"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  LinkIcon,
  ImageIcon,
  Undo,
  Redo,
  Quote,
  Minus,
} from "lucide-react"
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
import { useToast } from "@/hooks/use-toast"
import { uploadImage } from "@/actions/upload-image"
import { createClient } from "@/lib/supabase/client"

interface RichTextEditorProps {
  initialContent?: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({
  initialContent = "",
  onChange,
  placeholder = "Start writing...",
}: RichTextEditorProps) {
  const { toast } = useToast()
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [galleryImages, setGalleryImages] = useState<any[]>([])
  const [isLoadingGallery, setIsLoadingGallery] = useState(false)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-md max-w-full h-auto",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-business-600 underline hover:text-business-700",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && initialContent && editor.isEmpty) {
      editor.commands.setContent(initialContent)
    }
  }, [editor, initialContent])

  const fetchGalleryImages = useCallback(async () => {
    setIsLoadingGallery(true)
    try {
      const supabase = createClient()
      const { data: files, error } = await supabase.storage.from("media").list("page-images", {
        sortBy: { column: "created_at", order: "desc" },
        limit: 20,
      })

      if (error) {
        throw error
      }

      // Get public URLs for each file
      const imagePromises = files
        .filter((file) => !file.id.endsWith("/")) // Filter out folders
        .map(async (file) => {
          const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(`page-images/${file.name}`)

          return {
            id: file.id,
            name: file.name,
            url: publicUrlData.publicUrl,
            created_at: file.created_at,
          }
        })

      const imageData = await Promise.all(imagePromises)
      setGalleryImages(imageData)
    } catch (error) {
      console.error("Error fetching gallery images:", error)
      toast({
        title: "Error",
        description: "Failed to load gallery images",
        variant: "destructive",
      })
    } finally {
      setIsLoadingGallery(false)
    }
  }, [toast])

  useEffect(() => {
    if (isImageDialogOpen) {
      fetchGalleryImages()
    }
  }, [isImageDialogOpen, fetchGalleryImages])

  const handleLinkSubmit = useCallback(() => {
    if (editor && linkUrl) {
      // If text is selected, turn it into a link
      if (editor.state.selection.empty && linkText) {
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`)
          .run()
      } else {
        editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl, target: "_blank" }).run()
      }

      setIsLinkDialogOpen(false)
      setLinkUrl("")
      setLinkText("")
    }
  }, [editor, linkUrl, linkText])

  const handleImageSubmit = useCallback(async () => {
    if (!editor) return

    if (selectedGalleryImage) {
      // Insert selected gallery image
      editor
        .chain()
        .focus()
        .setImage({
          src: selectedGalleryImage,
          alt: imageAlt,
        })
        .run()

      setIsImageDialogOpen(false)
      setImageUrl("")
      setImageAlt("")
      setSelectedGalleryImage(null)
      return
    }

    if (imageFile) {
      // Upload and insert image file
      setIsUploading(true)
      try {
        const result = await uploadImage(imageFile)

        if (!result.success) {
          throw new Error(result.error || "Failed to upload image")
        }

        editor
          .chain()
          .focus()
          .setImage({
            src: result.url,
            alt: imageAlt,
          })
          .run()

        setIsImageDialogOpen(false)
        setImageFile(null)
        setImageAlt("")
      } catch (error) {
        console.error("Error uploading image:", error)
        toast({
          title: "Upload failed",
          description: error instanceof Error ? error.message : "Failed to upload image",
          variant: "destructive",
        })
      } finally {
        setIsUploading(false)
      }
    } else if (imageUrl) {
      // Insert image from URL
      editor
        .chain()
        .focus()
        .setImage({
          src: imageUrl,
          alt: imageAlt,
        })
        .run()

      setIsImageDialogOpen(false)
      setImageUrl("")
      setImageAlt("")
    }
  }, [editor, imageUrl, imageAlt, imageFile, selectedGalleryImage, toast])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        })
        return
      }

      setImageFile(file)
      // Auto-generate alt text from filename
      if (!imageAlt) {
        const fileName = file.name.split(".")[0].replace(/-/g, " ")
        setImageAlt(fileName)
      }
    }
  }

  const handleSelectGalleryImage = (url: string) => {
    setSelectedGalleryImage(url)
  }

  if (!editor) {
    return null
  }

  return (
    <div className="rich-text-editor border rounded-md">
      <div className="flex flex-wrap gap-1 border-b p-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-muted" : ""}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-muted" : ""}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "bg-muted" : ""}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "bg-muted" : ""}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "bg-muted" : ""}
        >
          <Code className="h-4 w-4" />
        </Button>
        <span className="mx-1 h-6 w-px bg-border" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive("heading", { level: 3 }) ? "bg-muted" : ""}
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <span className="mx-1 h-6 w-px bg-border" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-muted" : ""}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-muted" : ""}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "bg-muted" : ""}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="h-4 w-4" />
        </Button>
        <span className="mx-1 h-6 w-px bg-border" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "bg-muted" : ""}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={editor.isActive({ textAlign: "center" }) ? "bg-muted" : ""}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "bg-muted" : ""}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <span className="mx-1 h-6 w-px bg-border" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsLinkDialogOpen(true)}
          className={editor.isActive("link") ? "bg-muted" : ""}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setIsImageDialogOpen(true)}>
          <ImageIcon className="h-4 w-4" />
        </Button>
        <span className="mx-1 h-6 w-px bg-border" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <EditorContent editor={editor} className="prose prose-sm max-w-none p-4 focus:outline-none" />

      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex rounded-md border bg-background shadow-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "bg-muted" : ""}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "bg-muted" : ""}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive("underline") ? "bg-muted" : ""}
            >
              <UnderlineIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLinkDialogOpen(true)}
              className={editor.isActive("link") ? "bg-muted" : ""}
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          </div>
        </BubbleMenu>
      )}

      {/* Link Dialog */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
            <DialogDescription>Add a link to your content. Enter the URL and optional text.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                Text
              </Label>
              <Input
                id="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Link text (optional)"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLinkDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleLinkSubmit} disabled={!linkUrl}>
              Insert Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
            <DialogDescription>Add an image to your content from URL, upload, or gallery.</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="upload">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="url">URL</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image-url" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="image-url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image-alt" className="text-right">
                  Alt Text
                </Label>
                <Input
                  id="image-alt"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Image description for accessibility"
                  className="col-span-3"
                />
              </div>
            </TabsContent>

            <TabsContent value="upload" className="space-y-4 py-4">
              <div className="grid gap-4">
                <Label htmlFor="image-file">Upload Image</Label>
                <Input id="image-file" type="file" accept="image/*" onChange={handleFileChange} />
                {imageFile && (
                  <div className="rounded-md border p-2">
                    <p className="text-sm font-medium">{imageFile.name}</p>
                    <p className="text-xs text-muted-foreground">{(imageFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="upload-alt" className="text-right">
                    Alt Text
                  </Label>
                  <Input
                    id="upload-alt"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Image description for accessibility"
                    className="col-span-3"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="py-4">
              <div className="mb-4">
                <Label htmlFor="gallery-alt">Alt Text</Label>
                <Input
                  id="gallery-alt"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Image description for accessibility"
                  className="mt-1"
                />
              </div>

              <div className="h-[300px] overflow-y-auto rounded-md border p-2">
                {isLoadingGallery ? (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-muted-foreground">Loading gallery images...</p>
                  </div>
                ) : galleryImages.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-muted-foreground">No images found in gallery</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {galleryImages.map((image) => (
                      <div
                        key={image.id}
                        className={`relative aspect-square cursor-pointer overflow-hidden rounded-md border ${
                          selectedGalleryImage === image.url ? "ring-2 ring-business-600" : ""
                        }`}
                        onClick={() => handleSelectGalleryImage(image.url)}
                      >
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImageDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleImageSubmit}
              disabled={isUploading || (!imageUrl && !imageFile && !selectedGalleryImage)}
            >
              {isUploading ? "Uploading..." : "Insert Image"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
