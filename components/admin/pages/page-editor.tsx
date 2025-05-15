"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  LinkIcon,
  Undo,
  Redo,
  Code,
  Quote,
  Minus,
  Upload,
  X,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { uploadImage } from "@/actions/upload-image"
import { useToast } from "@/hooks/use-toast"

export function PageEditor({ content, onChange }) {
  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [imageTab, setImageTab] = useState("url")
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef(null)
  const { toast } = useToast()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your page content...",
      }),
      Image.configure({
        allowBase64: true,
        inline: false,
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    if (imageTab === "url" && imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt }).run()
      setImageUrl("")
      setImageAlt("")
      setImageDialogOpen(false)
    } else if (imageTab === "upload" && uploadedImage) {
      editor.chain().focus().setImage({ src: uploadedImage.url, alt: imageAlt }).run()
      setUploadedImage(null)
      setImageAlt("")
      setImageDialogOpen(false)
    }
  }

  const addLink = () => {
    if (linkUrl) {
      // If text is selected, turn it into a link
      if (editor.state.selection.content().size > 0) {
        editor.chain().focus().setLink({ href: linkUrl }).run()
      }
      // If no text is selected but linkText is provided, insert a new link
      else if (linkText) {
        editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run()
      }
      setLinkUrl("")
      setLinkText("")
      setLinkDialogOpen(false)
    }
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG, GIF, etc.)",
        variant: "destructive",
      })
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage({
        preview: e.target.result,
        file,
        name: file.name,
      })
    }
    reader.readAsDataURL(file)

    // Upload the file
    try {
      setIsUploading(true)
      setUploadProgress(0)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const result = await uploadImage(file)
      clearInterval(progressInterval)
      setUploadProgress(100)

      if (result.success) {
        setUploadedImage({
          ...uploadedImage,
          url: result.url,
        })
        toast({
          title: "Image uploaded",
          description: "Your image has been uploaded successfully.",
        })
      } else {
        throw new Error(result.error || "Failed to upload image")
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your image.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.type.startsWith("image/")) {
        fileInputRef.current.files = files
        handleFileChange({ target: { files } })
      } else {
        toast({
          title: "Invalid file type",
          description: "Please drop an image file (JPEG, PNG, GIF, etc.)",
          variant: "destructive",
        })
      }
    }
  }

  const clearUploadedImage = () => {
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8">
              <Heading1 className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
              <Heading1 className="h-4 w-4 mr-2" />
              Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
              <Heading2 className="h-4 w-4 mr-2" />
              Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
              <Heading3 className="h-4 w-4 mr-2" />
              Heading 3
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="sm"
          className={`h-8 ${editor.isActive("bold") ? "bg-muted" : ""}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={`h-8 ${editor.isActive("italic") ? "bg-muted" : ""}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={`h-8 ${editor.isActive("bulletList") ? "bg-muted" : ""}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={`h-8 ${editor.isActive("orderedList") ? "bg-muted" : ""}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={`h-8 ${editor.isActive("blockquote") ? "bg-muted" : ""}`}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={`h-8 ${editor.isActive("codeBlock") ? "bg-muted" : ""}`}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-8"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <div className="border-l mx-1 h-8"></div>

        <Button
          variant="ghost"
          size="sm"
          className={`h-8 ${editor.isActive({ textAlign: "left" }) ? "bg-muted" : ""}`}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={`h-8 ${editor.isActive({ textAlign: "center" }) ? "bg-muted" : ""}`}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={`h-8 ${editor.isActive({ textAlign: "right" }) ? "bg-muted" : ""}`}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight className="h-4 w-4" />
        </Button>

        <div className="border-l mx-1 h-8"></div>

        <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8">
              <ImageIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Insert Image</DialogTitle>
              <DialogDescription>Add an image to your content</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="url" value={imageTab} onValueChange={setImageTab} className="mt-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="url">Image URL</TabsTrigger>
                <TabsTrigger value="upload">Upload Image</TabsTrigger>
              </TabsList>

              <TabsContent value="url" className="mt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="image-url">Image URL</Label>
                    <Input
                      id="image-url"
                      placeholder="https://example.com/image.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>

                  {imageUrl && (
                    <div className="border rounded-md p-2 mt-2">
                      <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                      <div className="relative bg-muted/30 rounded-md flex items-center justify-center h-[150px] overflow-hidden">
                        <img
                          src={imageUrl || "/placeholder.svg"}
                          alt="Preview"
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=150&width=300"
                            e.currentTarget.classList.add("opacity-50")
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="upload" className="mt-4">
                <div className="grid gap-4">
                  <div
                    className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2 ${
                      uploadedImage ? "border-business-600/50 bg-business-50/50" : "border-muted-foreground/25"
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    {!uploadedImage ? (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground/50" />
                        <p className="text-sm text-muted-foreground text-center">
                          Drag and drop an image here, or click to select
                        </p>
                        <Input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                          disabled={isUploading}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                        >
                          Select Image
                        </Button>
                      </>
                    ) : (
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium truncate max-w-[300px]">{uploadedImage.name}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={clearUploadedImage}
                            disabled={isUploading}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="relative bg-muted/30 rounded-md flex items-center justify-center h-[150px] overflow-hidden">
                          <img
                            src={uploadedImage.preview || "/placeholder.svg"}
                            alt="Preview"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        {isUploading && (
                          <div className="mt-2">
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-business-600 transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 text-center">
                              Uploading... {uploadProgress}%
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="grid gap-2 mt-4">
              <Label htmlFor="image-alt">Alt Text (for accessibility)</Label>
              <Input
                id="image-alt"
                placeholder="Descriptive text for the image"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
              />
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setImageDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={addImage}
                className="bg-business-600 hover:bg-business-700"
                disabled={
                  (imageTab === "url" && !imageUrl) || (imageTab === "upload" && (!uploadedImage || isUploading))
                }
              >
                Insert Image
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className={`h-8 ${editor.isActive("link") ? "bg-muted" : ""}`}>
              <LinkIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insert Link</DialogTitle>
              <DialogDescription>Enter the URL and text for the link</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="link-url">URL</Label>
                <Input
                  id="link-url"
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                />
              </div>
              {editor.state.selection.content().size === 0 && (
                <div className="grid gap-2">
                  <Label htmlFor="link-text">Link Text</Label>
                  <Input
                    id="link-text"
                    placeholder="Click here"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addLink} className="bg-business-600 hover:bg-business-700">
                Insert Link
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="border-l mx-1 h-8"></div>

        <Button
          variant="ghost"
          size="sm"
          className="h-8"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-8"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4 min-h-[400px]">
        <EditorContent editor={editor} className="prose prose-sm sm:prose max-w-none focus:outline-none" />
      </div>
    </div>
  )
}
