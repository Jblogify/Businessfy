"use client"

import { useState } from "react"
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
import { useToast } from "@/hooks/use-toast"

interface MediaFolderDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreateFolder: (folderName: string) => void
}

export function MediaFolderDialog({ isOpen, onClose, onCreateFolder }: MediaFolderDialogProps) {
  const { toast } = useToast()
  const [folderName, setFolderName] = useState<string>("")
  const [isCreating, setIsCreating] = useState<boolean>(false)

  const handleCreateFolder = () => {
    if (!folderName.trim()) {
      toast({
        title: "Invalid name",
        description: "Please enter a valid folder name",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)

    // Simulate API call
    setTimeout(() => {
      setIsCreating(false)
      onCreateFolder(folderName)
      setFolderName("")
    }, 500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>Create a new folder to organize your media files.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="folder-name">Folder Name</Label>
            <Input
              id="folder-name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isCreating}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateFolder}
            disabled={isCreating || !folderName.trim()}
            className="bg-green-700 hover:bg-green-800"
          >
            {isCreating ? "Creating..." : "Create Folder"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
